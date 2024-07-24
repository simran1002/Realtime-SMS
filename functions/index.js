const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const app = express();

admin.initializeApp();

const db = admin.database();

app.get('/sum-amounts', async (req, res) => {
    try {
        const snapshot = await db.ref('sms').once('value');
        const smsData = snapshot.val();
        let totalAmount = 0;

        for (let key in smsData) {
            totalAmount += smsData[key].amount;
        }

        res.status(200).send({ totalAmount });
    } catch (error) {
        res.status(500).send(error);
    }
});

exports.api = functions.https.onRequest(app);
