require('dotenv').config();
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const serviceAccount = require('./serviceAccountKey.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

const db = admin.database();
const app = express();

// Use CORS middleware to allow cross-origin requests
app.use(cors({ origin: true }));

// API endpoint to get total amount
app.get('/totalAmount', async (req, res) => {
  try {
    const snapshot = await db.ref('sms').once('value');
    const smsData = snapshot.val();

    if (!smsData) {
      return res.status(404).json({ error: 'No SMS data found' });
    }

    // Calculate total amount
    const totalAmount = Object.values(smsData).reduce((sum, sms) => {
      return sum + (typeof sms.amount === 'number' ? sms.amount : 0);
    }, 0);

    res.json({ totalAmount });
  } catch (error) {
    console.error('Error calculating total amount:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Export the API to Firebase Cloud Functions
exports.api = functions.https.onRequest(app);
