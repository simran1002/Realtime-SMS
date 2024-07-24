require('dotenv').config();
const db = require('./firebaseAdmin');
const ref = db.ref('sms');

ref.once('value', snapshot => {
    const smsData = snapshot.val();
    const formattedData = {};

    for (let key in smsData) {
        const sms = smsData[key];
        const formattedTimestamp = new Date(sms.timestamp).toISOString().replace('T', ' ').split('.')[0];
        formattedData[key] = {
            ...sms,
            formattedTimestamp: formattedTimestamp
        };
    }

    db.ref('formatted_sms').set(formattedData, error => {
        if (error) {
            console.error('Data could not be saved.', error);
        } else {
            console.log('Data saved successfully.');
        }
    });
});
