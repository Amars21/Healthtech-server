const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


const refreshToken = async () => {
  try {
    const { refreshToken } = await admin.app().options.credential.getAccessToken();
    await admin.app().options.credential.refreshToken(refreshToken);
    console.log('Access token refreshed successfully');
  } catch (error) {
    console.error('Failed to refresh access token:', error);
  }
};

setInterval(refreshToken, 60 * 60 * 1000);

const firestore = admin.firestore();

module.exports = {
  firestore,
};