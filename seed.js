const admin = require('firebase-admin');
require('dotenv').config();

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DATABASE_URL
});

const db = admin.database();

const smsData = {
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
        await db.ref('sms').set(smsData);
        console.log('SMS data seeded successfully.');
    } catch (error) {
        console.error('Error seeding SMS data:', error);
    }
}

seedData();
