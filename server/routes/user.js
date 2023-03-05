const express = require('express');
const router = express.Router();
const firebase = require('firebase');
const firebaseConfig = require('./firebaseConfigTest')
const db = firebase.database()

router.post('/info', async (req,res,next) => {
    const { uid } = req.body;
    // try {
    //     const detRef = db.ref('/users/' + uid + '/det/');
    //     detRef.once('value', (snapshot) => {
    //         const info = snapshot.val();
    //         res.json({det:info})
    //     });
    //     const nameRef = db.ref('/users/' + uid + '/name/');
    //     nameRef.once('value', snapshot => {
    //         const name = snapshot.val();
    //         res.json({det:name})
    //     })
    // }
    try {
        const detRef = db.ref('/users/' + uid + '/det/');
        const nameRef = db.ref('/users/' + uid + '/name/');
      
        Promise.all([detRef.once('value'), nameRef.once('value')])
        .then(([detSnapshot, nameSnapshot]) => {
          const det = detSnapshot.val();
          const name = nameSnapshot.val();
    
          res.json({det:det, name:name});
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          res.status(500).json({ success: false, message: 'Failed to fetch data' });
        })
    }
    catch (err) {
        res.json({succces:false, message:err})
    }
})

router.post('/infoUpdate', (req,res,next) => {
    const { det, uid } = req.body
    try {
        const ref = db.ref('/users/' + uid + '/det')
        ref.set({
            info:det.info,
            tel:det.tel,
            email:det.email
        })
        res.json({success: true})
    } catch (err) {
        res.json({success:false,message:err})
    }
})

module.exports = router;