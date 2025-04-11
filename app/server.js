require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "app", "index.html"));
});

// Serve profile picture
app.get('/profile-picture', (req, res) => {
  const img = fs.readFileSync(path.join(__dirname, "images/profile-1.jpg"));
  res.writeHead(200, { 'Content-Type': 'image/jpg' });
  res.end(img, 'binary');
});

let mongoUrlLocal = "mongodb://admin:password@localhost:27017";

let mongoUrlDocker = "mongodb://admin:password@mongodb";

let mongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };const databaseName = "my-db";

// POST: Update Profile
app.post('/update-profile', async (req, res) => {
  const userObj = req.body;
  userObj.userid = 1;

  try {
    const client = await MongoClient.connect(mongoUrlDocker, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = client.db(databaseName);
    const result = await db.collection("users").updateOne(
      { userid: 1 },
      { $set: userObj },
      { upsert: true }
    );

    await client.close();
    res.send(userObj);
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).send("Database error while updating profile.");
  }
});

// GET: Get Profile
app.get('/get-profile', async (req, res) => {
  try {
    const client = await MongoClient.connect(mongoUrlDocker, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = client.db(databaseName);
    const result = await db.collection("users").findOne({ userid: 1 });

    await client.close();
    res.send(result || {});
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).send("Database error while fetching profile.");
  }
});

// Start the server
app.listen(3000, '0.0.0.0', () => {
  console.log("App listening on port 3000!");
});
