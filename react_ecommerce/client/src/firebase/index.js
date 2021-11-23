import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyBLxZh7xAP10-Pa4A5C3TWLcYKjZlQh2wA",
	authDomain: "garage-39456.firebaseapp.com",
	projectId: "garage-39456",
	storageBucket: "garage-39456.appspot.com",
	messagingSenderId: "746358415548",
	appId: "1:746358415548:web:4715132e68dab46d9df0b9",
	measurementId: "G-42VH254SY7",
};
// eslint-disable-next-line
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
