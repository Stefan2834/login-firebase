import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCIUnPKzzLfKvV2Kv5o9SHPPtpSisTiOV4",
  authDomain: "log-2834.firebaseapp.com",
  projectId: "log-2834",
  storageBucket: "log-2834.appspot.com",
  messagingSenderId: "28107955421",
  appId: "1:28107955421:web:ebfa83b0b31e5be57c4f34",
  measurementId: "G-YBYXSEWGT0"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// const analytics = getAnalytics(app);



