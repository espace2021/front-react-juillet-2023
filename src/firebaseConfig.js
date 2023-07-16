import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
 
// Initialize Firebase
const app = initializeApp ({
  apiKey: "AIzaSyBaxrbWZQSNFI230jsJHSeRB3RyLaJ1RXY",
  authDomain: "reactproject-68df1.firebaseapp.com",
  projectId: "reactproject-68df1",
  storageBucket: "reactproject-68df1.appspot.com",
  messagingSenderId: "373746469631",
  appId: "1:373746469631:web:416496270e3d4643a45aca"

});
 
// Firebase storage reference
const storage = getStorage(app);
export default storage;
