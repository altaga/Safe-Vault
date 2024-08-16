const functions = require('@google-cloud/functions-framework');
const crypto = require("crypto");
const Firestore = require("@google-cloud/firestore");

const privateKey = ``; // Cloud Private Key

const db = new Firestore({
  projectId: "", // Your Project Id
  keyFilename: "credential.json",
});

const Accounts = db.collection("CardAccounts");

functions.http('helloHttp', async (req, res) => {
   try {
    const decrypted = decryptText(req.body.data);
    const pubKey = req.body.pubKey;
    const query = await Accounts.where("publicKey", "==", pubKey).get();
    if (query.empty) {
      await Accounts.doc(pubKey).set({
        cardHash: decrypted.toString(),
        publicKey: pubKey,
      });
      res.send(`Request Ok`);
    } else {
      throw "Bad Request";
    }
  } catch (e) {
    res.send(`Bad Request`);
  }
});

// utils

function decryptText(encryptedText) {
  return crypto.privateDecrypt(
    {
      key: privateKey,
    },
    Buffer.from(encryptedText, "base64")
  );
}