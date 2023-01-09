import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDhK8bI9HJIsEJkECy1eHKZVlVZuriPTnc",
    authDomain: "dndrolld20.firebaseapp.com",
    databaseURL: "https://dndrolld20.firebaseio.com",
    projectId: "dndrolld20",
    storageBucket: "dndrolld20.appspot.com",
    messagingSenderId: "885822425821",
    appId: "1:885822425821:web:839bbd3eec3f6a202f2934"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({timestampsInSnapshots: true})

export default firebase;