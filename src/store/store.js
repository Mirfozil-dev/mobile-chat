import Vue from 'vue';
import { firebaseAuth, firebaseDb } from 'boot/firebase';

let messagesRef

const state = {
  userDetails: {},
  users: {},
  messages: {}
}
const mutations = {
  setUserDetails(state, payload) {
    state.userDetails = payload
  },
  addUser(state, payload) {
    Vue.set(state.users, payload.userId, payload.userDetails)
  },
  updateUser(state, payload) {
    Object.assign(state.users[payload.userId], payload.userDetails)
  },
  addMessage(state, payload) {
    Vue.set(state.messages, payload.messageId, payload.messageDetails)
  },
  clearMessages(state) {
    state.messages = {}
  }
}
const actions = {
  registerUser({}, payload) {
    firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
      .then( response => {
        const userID = firebaseAuth.currentUser.uid;
        firebaseDb.ref('users/' + userID).set({
          name: payload.name,
          email: payload.email,
          online: true,
        })
      })
      .catch(error => {
        console.log(error.message)
      })
  },
  loginUser({}, payload) {
    firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
      .then(response=> {
        console.log(response)
      })
      .catch(error => {
        console.log(error.message)
      })
  },
  logoutUser() {
    firebaseAuth.signOut();
  },
  handleAuthStateChanged({ commit, dispatch, state }) {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        // User is logged in.
        let userID = firebaseAuth.currentUser.uid;
        firebaseDb.ref('users/' + userID).once('value', snapshot => {
          let userDetails = snapshot.val()
          commit('setUserDetails', {
            name: userDetails.name,
            email: userDetails.email,
            userID: userID
          })
        })
        dispatch('firebaseUpdateUser', {
          userId: userID,
          updates: {
            online: true,
          }
        })
        dispatch('firebaseGetUsers')
        this.$router.push('/profile')
      }
      else {
        // User is logged out
        dispatch('firebaseUpdateUser', {
          userId: state.userDetails.userID,
          updates: {
            online: false,
          }
        })
        commit('setUserDetails', {})
        this.$router.replace('/auth')
      }
    });
  },
  firebaseUpdateUser({}, payload) {
    firebaseDb.ref('users/' + payload.userId).update(payload.updates)
  },
  firebaseGetUsers({ commit }) {
    firebaseDb.ref('users').on('child_added', snapshot =>{
      let userDetails = snapshot.val()
      let userId = snapshot.key
      commit('addUser', {
        userId,
        userDetails
      })
    })
    firebaseDb.ref('users').on('child_changed', snapshot =>{
      let userDetails = snapshot.val()
      let userId = snapshot.key
      commit('updateUser', {
        userId,
        userDetails
      })
    })
  },
  firebaseGetMessages({ state, commit }, userId) {
    let myUserId = state.userDetails.userID
    messagesRef = firebaseDb.ref('chats/' + myUserId + '/' + userId)
    messagesRef.on('child_added', snapshot => {
      let messageDetails = snapshot.val()
      let messageId = snapshot.key
      commit('addMessage', {
        messageId,
        messageDetails
      })
    })
  },
  firebaseStopGettingMessages({ commit }) {
    if (messagesRef) {
      messagesRef.off('child_added')
      commit('clearMessages')
    }
  },
  firebaseSendMessage({}, payload) {
    firebaseDb.ref('chats/' + state.userDetails.userID + '/' + payload.otherUserId).push(payload.message)

    payload.message.from = 'them'
    firebaseDb.ref('chats/' + payload.otherUserId + '/' + state.userDetails.userID).push(payload.message)
  }
}
const getters = {
  users: state => {
    let usersFiltered = {}
    Object.keys(state.users).forEach(key => {
      if (key !== state.userDetails.userID) {
        usersFiltered[key] = state.users[key]
      }
    })
    return usersFiltered
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
