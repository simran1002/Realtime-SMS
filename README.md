# Realtime SMS Project

This project is a Node.js application that interacts with Firebase to fetch and format SMS data from Firebase Realtime Database and provides an API to sum up all amounts in the SMS collection using Firebase Cloud Functions.

## Project Setup

### Prerequisites

- Node.js
- Firebase CLI
- A Firebase project

### Step 1: Clone the Repository

git clone https://github.com/simran1002/Realtime-SMS.git

cd realtime-sms

### Step 2: Install Dependencies
npm install

### Step 3: Configure Environment Variables
Create a .env file in the root of your project directory

touch .env

Add your Firebase Realtime Database URL to the .env file

### Step 4: Initialize Firebase Admin SDK
In the Firebase Console, navigate to "Project Settings" > "Service accounts" > "Generate new private key".

Download the JSON file and save it in the project directory as serviceAccountKey.json.

### Step 5: Fetch and Format SMS Data
Run the script to fetch data from the sms collection, format the timestamp, and save it to the formatted_sms collection:

Project Structure

```bash
Realtime-SMS/
│
├── .env
├── functions/
│   ├── index.js
├── serviceAccountKey.json
├── firebaseAdmin.js
├── index.js
├── package.json
└── README.md
