import {
    Account,
    Avatars,
    Client,
    Databases,
    ID,
    Query,
    Storage,
  } from "react-native-appwrite";
  
  export const appwriteConfig = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.jsm.easycollect",
    projectId: "66dda27000097b085c36",
    storageId: "660d0e59e293896f1eaf",
    databaseId: "66dda6360007448e254f",
    userCollectionId: "66dda6a6001d2ac28326",
    videoCollectionId: "66dda76c000ab3407646",
    bookingId:"66ec40cb001dd43dbd02",
  };
  
  const client = new Client();
  
  client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform);
  
  const account = new Account(client);
  const storage = new Storage(client);
  const avatars = new Avatars(client);
  const databases = new Databases(client);



  export async function getUpdate() {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const query = [Query.equal('accountId', currentAccount.$id)] && [Query.equal('status', "PENDING")];
    const documents = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.bookingId, query);

    if (documents.total > 0) {
      documentId = documents.documents[0].$id; // Get the ID of the first document
    // Proceed to update the document using this ID
    } 

    console.log(documentId)

    databases.updateDocument(appwriteConfig.databaseId, appwriteConfig.bookingId, documentId, {status:"CONFIRMED"})
    .then(response => {
        console.log('Document updated successfully:', response);
    })
    .catch(error => {
        console.error('Error updating document:', error);
    });
  }

  
  
  // Register user
  export async function createUser(email, password, username, phone , room_number) {
    try {
      const newAccount = await account.create(
        ID.unique(),
        email,
        password,
        username,
        phone,
        room_number
      );
  
      if (!newAccount) throw Error;
  
      const avatarUrl = avatars.getInitials(username);
  
      await signIn(email, password);
  
      const newUser = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        ID.unique(),
        {
          accountId: newAccount.$id,
          email: email,
          username: username,
          avatar: avatarUrl,
          phone: phone ,
          room_number : room_number ,
          password:password
        }
      );
  
      return newUser;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  // Sign In
  export async function signIn(email, password) {
    try {
      const session = await account.createEmailPasswordSession(email, password);
  
      return session;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  // Get Account
  export async function getAccount() {
    try {
      const currentAccount = await account.get();
  
      return currentAccount;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  // Get Current User
  export async function getCurrentUser() {
    try {
      const currentAccount = await getAccount();
      if (!currentAccount) throw Error;
  
      const currentUser = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [Query.equal("accountId", currentAccount.$id)]
      );
  
      if (!currentUser) throw Error;
  
      return currentUser.documents[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  
  // Sign Out
  export async function signOut() {
    try {
      const session = await account.deleteSession("current");
  
      return session;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  // Upload File
  export async function uploadFile(file, type) {
    if (!file) return;
  
    const { mimeType, ...rest } = file;
    const asset = { type: mimeType, ...rest };
  
    try {
      const uploadedFile = await storage.createFile(
        appwriteConfig.storageId,
        ID.unique(),
        asset
      );
  
      const fileUrl = await getFilePreview(uploadedFile.$id, type);
      return fileUrl;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  // Get File Preview
  export async function getFilePreview(fileId, type) {
    let fileUrl;
  
    try {
      if (type === "video") {
        fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);
      } else if (type === "image") {
        fileUrl = storage.getFilePreview(
          appwriteConfig.storageId,
          fileId,
          2000,
          2000,
          "top",
          100
        );
      } else {
        throw new Error("Invalid file type");
      }
  
      if (!fileUrl) throw Error;
  
      return fileUrl;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  // Create Booking
  export async function createBooking(form) {
    try {

      const currentAccount = await getAccount();
      if (!currentAccount) throw Error;
  
      const currentUser = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [Query.equal("accountId", currentAccount.$id)]
      );
      
      const newBooking = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.bookingId,
        ID.unique(),
        {
          accountId:form.accountId,
          title:form.title,
          time:form.time,
          system_time:new Date(Date.parse(Date())),
          status:form.status
        }
      );
  
      return newBooking;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  // Get all video Posts
  export async function getAllPosts() {
    try {
      const posts = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.bookingId
      );
  
      return posts.documents;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  // Get video posts created by user
  export async function getUserPosts(userId) {
    try {
      const posts = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.videoCollectionId,
        [Query.equal("creator", userId)]
      );
  
      return posts.documents;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  // Get video posts that matches search query
  export async function searchPosts(query) {
    try {
      const posts = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.videoCollectionId,
        [Query.search("title", query)]
      );
  
      if (!posts) throw new Error("Something went wrong");
  
      return posts.documents;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  // Get latest created video posts
  export async function getLatestPosts() {
    try {
      const posts = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.videoCollectionId,
        [Query.orderDesc("$createdAt"), Query.limit(7)]
      );
  
      return posts.documents;
    } catch (error) {
      throw new Error(error);
    }
  }

    export async function getUserBooking(userId) {
      try {
        const posts = await databases.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.bookingId,
          [Query.equal("accountId", userId)]
        );
    
        return posts.documents;
      } catch (error) {
        throw new Error(error);
      }
    }

    export async function getBookingDocument(userId) {
      try {
        const posts = await databases.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.bookingId,
          [Query.equal("accountId", userId)] &&
          [Query.equal("status", "PENDING")] &&
          [Query.limit(1)]
        );
    
        return posts.documents[0];
      } catch (error) {
        throw new Error(error);
      }
    }

    export async function getUserHistory(userId) {
      try {
        const posts = await databases.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.bookingId,
          [Query.equal("accountId", userId)] && 
          [Query.equal("status", "CONFIRMED")]
        );
    
        return posts.documents;
      } catch (error) {
        throw new Error(error);
      }
    }