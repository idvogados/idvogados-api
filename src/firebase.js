"use strict";
const firebase = require("firebase");

firebase.initializeApp({projectId: process.env.FIRESTORE_PROJECT_ID});
const app = firebase.apps[0];
const firestore = app.firestore();
firestore.settings({host: process.env.FIRESTORE_HOST, ssl: false});

async function get(docRefName) {
	const docRef = firestore.doc(docRefName);
	return await docRef.get();
};

async function set(docRefName, value) {
	const docRef = firestore.doc(docRefName);
	await docRef.set(value);
}

exports.get = get;
exports.set = set;