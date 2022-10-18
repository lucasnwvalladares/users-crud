export const state = () => {
  return {
    users: [],
    currentUser: {}
  }
}

export const getters = {
  getUsers(state) {
    return state.users
  },

  getCurrentUser(state) {
    return state.currentUser
  }
}

export const actions = {
  // action to get all users from API
  async fetchAllUsers({ commit }) {
    await this.$axios.$get('https://jsonplaceholder.typicode.com/users')
      .then((result) => {
        commit('SET_USERS', result)
      })
      .catch((err) => {
        console.log('FAILED: \br' + err)
      });
  },

  // action to get a user by ID from API
  async fetchCurrentUser({ commit }, id) {
    await this.$axios.$get('https://jsonplaceholder.typicode.com/users/' + id)
      .then((result) => {
        commit('SET_CURRENT_USER', result)
      })
      .catch((err) => {
        console.log('FAILED: \br' + err)
      });
  }
}

export const mutations = {
  SET_USERS(state, users) {
    state.users = users
  },

  SET_CURRENT_USER(state, user) {
    state.currentUser = user
  }
}