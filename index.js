require('dotenv').config();
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

const db = admin.database();

async function fetchAndFormatSMSData() {
  try {
    const smsRef = db.ref('sms');
    const snapshot = await smsRef.once('value');
    const smsData = snapshot.val();

    const formattedSMS = {};
    for (const [key, sms] of Object.entries(smsData)) {
      formattedSMS[key] = {
        ...sms,
        formattedTimestamp: new Date(sms.timestamp).toISOString().replace('T', ' ').substr(0, 19)
      };
    }

    await db.ref('formatted_sms').set(formattedSMS);
    console.log('Formatted SMS data saved successfully');
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchAndFormatSMSData();