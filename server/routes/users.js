const express = require('express');
const router = express.Router();
const firebase = require('firebase/app');
require('firebase/auth');
const admin = require('firebase-admin');
const firebaseConfig = {
  apiKey: "AIzaSyCIUnPKzzLfKvV2Kv5o9SHPPtpSisTiOV4",
  authDomain: "log-2834.firebaseapp.com",
  projectId: "log-2834",
  storageBucket: "log-2834.appspot.com",
  messagingSenderId: "28107955421",
  appId: "1:28107955421:web:ebfa83b0b31e5be57c4f34",
  measurementId: "G-YBYXSEWGT0",
  databaseURL: "https://log-2834-default-rtdb.europe-west1.firebasedatabase.app"
};
firebase.initializeApp(firebaseConfig);
admin.initializeApp({
  credential: admin.credential.cert({
    type: "service_account",
    project_id: "log-2834",
    private_key_id: "83480e6f2f385cb1d2a55376261192ab2d2062ab",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCy4Rln5SrgtnfM\nvX+edd2Z+mORutN3olojg3nSMeGbepeRFerrmE+d3vD/1w/CAIfcWYy1KDMCdWOZ\nJ4GoVMgUxvbaeFmTvfjFIyGz/voLkdxBzN4fWpsxGa+BkeUJHBT6cmO1DRycrAML\nBGmx7Z1vJDyYm6jrhRY8X+WUt2jS1LoAamtElh0LfaMJyHSu+vNnaPkspRuzRIVC\nRCS8FFm+4CIqsNYeCcEQlsxIooxMzsDB/Op8Fm7VCFXInuMS8iSZh1DJltm7Xctx\nUPAc2ujOji1tmQyGZQqkmmBu8bwuZ1DjKe7DUmhMLvcjh7Wmg2j31jTkELL0v/j+\nShYPP0zzAgMBAAECggEAGU6vgXtyrYgjOtw0if6y823xWFTORka56fxX590WxiB6\nARTQv7Q0z2kTP571o8Tfc9VXium9DcP961UjiuUzyXy8v/v28GgYIgvuYMDaL3jb\naJPLeTQgcLnpkrNJbBiE/0nfwWWxfpj3dT+SlJHBjE/cItsi8u9JThFjMb8hHXKu\nrvpyDfLNnqKsIJSvDI1950H32/O5dWSxp3wzzfMgI+SAxcwfLBGY9FHNRfeYZ/F+\nFklSbfTdtcRuB9m4hrhCuxgNSYpiZqdU7L9TPQSeekd8FvnhM/+ZOGAtiRLimPLl\nPA3b92r6TELM+K3DnaX3Yh49OvDhPITdcS+z6ExWwQKBgQDZanz4o+4wH5cNNXDh\nASBN1K7/zBWpYbw3GL+20nhnN0WCh9tDW+Uhwt5NTY4Tzfi2gxhczIN1Tng4EX1+\n8x5uwxZWBARLlbFOEhp+ANm670sF1SzLP5ryOykyFFMH2ryfZ/C8kjKcaBfQ1Vzh\ndEJ1WbViYGQuDif7hZylGnBlTQKBgQDSn9YBhq3KbKpt+zHRDLUHg0S2EPHPRzO8\nC4lrM9q65SECv2neEr43U5u81WVbkqmyj/jayvuSFMApvt47sOxoqGvjiQ927RSl\ndaAG3NY7YFACwDzCxVTihJJe6b0VoQtEndDwqmqgnpfjgOTphwcpuyEPqmFN+TM2\n9DpxZeRbPwKBgQCl+OL6NLqqRhNb5AYN3nw4rjoB0Fxg99lk/iGsgTOlJ86KfQfn\nfgmHImnt/VyOxdguDBnXDdD1BjhEJSX2ecYrrAYrF9nnkZjPDobm1eNhDzfodfpC\nFoZEkOE798QC5PrFfeWLLtgwCk7T/21uNwBc8WTEeu0/M1NWcYNJjstqqQKBgFAZ\nHs6HxDG1735Rx9kjRvjrb8b5XKwh/Menb4QIPUdT+aDM4Frmr9XkgtZmJNyVQtm4\nLMAv70nXgFif0G3M06rdWeI27l2gvXhK6ieR9hqwftz89F5xot1d4zgbFaBTFTDr\n/1h2xoP8q/CFxQgWJKA3HNSTS9vWSCa+7DbRs+0LAoGBANkqQyDLvguiMrBQ4Ldr\nCjud8krepQ61xYcrr7twWvMgFkfRWDPWOqQIvJ7vOISvjcNl1lE/wAFmyynXLoDc\nvxJujrsh79PG1oJg1/kS65w6UIyDq9OtzuCZcSXyT7AR+UogMlIdT+EUIyGbttUR\nkKUDcXnx//kMVtt1w+JbmtZ9\n-----END PRIVATE KEY-----\n",
    client_email: "firebase-adminsdk-h2rpg@log-2834.iam.gserviceaccount.com",
    client_id: "106230578337600382888",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-h2rpg%40log-2834.iam.gserviceaccount.com"
  }),
  databaseURL: 'https://log-2834-default-rtdb.europe-west1.firebasedatabase.app'
});
const auth  = firebase.auth()

router.get('/', (req,res,next) => {
  try {
    auth.onAuthStateChanged(user => {
      if(user) {
        res.json({user: user})
      }
      else res.json({error: 'You need to connect firstly'})
    })
  } catch(err) {
    res.json({user:err});
  }
})

router.post('/signUp', (req, res, next) => {
  const { email, password } = req.body;
  auth.createUserWithEmailAndPassword(email,password)
    .then(user => {
      res.json({success:true, message:'User created succesfuly', user:user})
    })
    .catch(err => {
      if (err.code === "auth/email-already-exists") {
        res.json({ success: false, message: "Email already in use" });
      } else {
        res.json({succes:false, message:err.message})
      }
    })
  });
router.post('/login',(req,res,next) => {
  const { email, password } = req.body;
  auth.signInWithEmailAndPassword(email, password)
  .then((user) => {
    res.json({success:true, message: 'Login successful', user:user });
  })
  .catch((err) => {
    if(err.code === 'auth/wrong-password') {
      res.json({success:false, message:'Wrong Password'})
    } else if(err.code === 'auth/user-not-found') {
      res.json({success:false, message:'User not found'})
    } else {
      res.json({success:false, message:err.code})
    }
  });
})
router.post('/logout', (req,res,next) => {
  auth.signOut()
  .then(() => {
    res.json({success: true, message:'Logout succesfully'})
  })
  .catch(err => {
    res.json({success: false, message: err})
  })
})

module.exports = router;
