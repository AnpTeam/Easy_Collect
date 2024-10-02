import React from 'react';
import { Button, View } from 'react-native';
import email from 'react-native-email'; //npm install react-native-email

const App = () => {

    const handleEmail = () => {
        const to = ['']; // Recipient email

        email(to, {
            // Optional additional arguments
            subject: 'Parcel Notification',
            body: 'Your Parcel has been already deliver!! Please booking the time before take the parcel',
        }).catch(console.error);
    };

    return (
        <View>

            <Button title="Send Email" onPress={handleEmail} />
        </View>
    );
};

export default App;
