import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyDvo7PHv6xD0_y_0ymJwgbiGZfNhwrsCRQ',
  authDomain: 'ia-291a4.firebaseapp.com',
  projectId: 'ia-291a4',
  storageBucket: 'ia-291a4.appspot.com',
  messagingSenderId: '560232038900',
  appId: '1:560232038900:web:49aca2324f1936fcc139a1',
  measurementId: 'G-48TRZCF4N0',
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebaseApp.auth()

export { db, auth }
