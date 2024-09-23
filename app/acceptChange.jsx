import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import { changeStatus } from '../lib/appwrite';
import { images } from '../constants';

const AcceptChange = () => {
  const [uploading, setUploading] = useState(false);

  const confirm = async () => {
    try {
      setUploading(true);
      await changeStatus();
      setUploading(false);
    } catch (error) {
      setUploading(false);
      throw new Error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo at the top */}
        <Image source={images.logo} style={styles.logo} resizeMode="contain" />
        
        <Text style={styles.title}>Parcel Confirmation</Text>
        <Text style={styles.subTitle}>
          Please check before confirming, then click the accept button.
        </Text>
        
        <CustomButton
          title={'Confirm'}
          handlePress={confirm}
          containerStyles="w-full mt-7"
          isLoading={uploading}
        />
      </View>
    </SafeAreaView>
  );
};

export default AcceptChange;


// ตัว Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#313131', 
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logo: {
    width: 200, 
    height: 200,
    marginBottom: 20, 
  },
  title: {
    fontSize: 28,
    color: '#ffffff',
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'top',
  },
  subTitle: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 40,
    textAlign: 'center',
    lineHeight: 22,
  },
  button: {
    marginTop: 20,
    width: '100%',
    paddingVertical: 15,
  },
});
