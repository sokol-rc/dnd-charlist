import firebase from "firebase";

var db = firebase.firestore();

const firebaseSubscribe = () => {
    db.collection("messages")
        .onSnapshot((querySnapshot) => {
            var cities = [];
            querySnapshot.forEach((doc) => {
                cities.push(doc.data().text);
            });
            console.log("Current cities in CA: ", cities.join(", "));
        });
}
