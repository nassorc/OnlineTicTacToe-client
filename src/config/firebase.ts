// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDHpNzNhVEinyQqIrOiKLmYfVRSDEKEG_o",
  authDomain: "tictactoe-bucket.firebaseapp.com",
  projectId: "tictactoe-bucket",
  storageBucket: "tictactoe-bucket.appspot.com",
  messagingSenderId: "978097533227",
  appId: "1:978097533227:web:c3e1d3bca63de6c4a0d56e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default app;
export {
  storage,
  ref,
  uploadBytes,
  getDownloadURL
}