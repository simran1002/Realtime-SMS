require('dotenv').config();
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

const db = admin.database();

const sampleData = {
  sms1: {
    message: "Payment received",
    amount: 100,
    timestamp: 1658323200000
  },
  sms2: {
    message: "Payment sent",
    amount: 50,
    timestamp: 1658409600000
  },
  sms3: {
    message: "Payment received",
    amount: 200,
    timestamp: 1658496000000
  }
};

async function seedData() {
    try {
      await db.ref('sms').set(sampleData);
      console.log('Sample data has been added successfully');
    } catch (error) {
      console.error('Error adding sample data:', error);
      if (error.code === 'PERMISSION_DENIED') {
        console.error('Make sure your service account has the necessary permissions.');
      }
    } finally {
      admin.app().delete(); // Properly close the Firebase app
    }
  }

seedData();
