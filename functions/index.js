/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();
db.settings({
    databaseId:"fit-leveling"
})

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.helloWorld = functions.https.onRequest((req, res) => {
    console.log("✅ Firebase Function triggered");
    res.send("Hello from Fit Leveling Function!");
});


exports.saveProfile = functions.https.onRequest(async (req, res) => {
    // Allow CORS for testing
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") {
        res.status(204).send("");
        return;
    }

    if (req.method !== "POST") {
        res.status(405).send("Method Not Allowed");
        return;
    }

    const data = req.body;

    if (!data || !data.telegramId) {
        res.status(400).json({ error: "Missing telegramId" });
        return;
    }

    try {
        await db.collection("users").doc(data.telegramId.toString()).set({
            ...data,
            createdAt: new Date().toISOString(),
        });
        res.json({ success: true });
    } catch (err) {
        console.error("Failed to save profile:", err);
        res.status(500).json({ error: "Failed to save profile" });
    }
});
