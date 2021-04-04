import { auth } from './firebase'

export const authAPI = {
  signInUser(email: string, password: string) {
    return auth.signInWithEmailAndPassword(email, password)
  },
  registerUser(email: string, password: string) {
    return auth.createUserWithEmailAndPassword(email, password)
  },
  signOut() {
    return auth.signOut()
  },
}
