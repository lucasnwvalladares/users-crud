export const state = () => {
  return {
    users: [],
    currentUser: {}
  }
}

export const getters = {
  getUsers (state) {
    return state.users
  },

  getCurrentUser (state) {
    return state.currentUser
  }
}

export const actions = {
  // action to get all users from API
  async fetchAllUsers ({ commit }) {
    await this.$axios.$get('https://jsonplaceholder.typicode.com/users')
      .then((result) => {
        commit('SET_USERS', result)
      })
      .catch((err) => {
        return err
      })
  },

  // action to get a user by ID from API
  async fetchCurrentUser ({ commit }, id) {
    await this.$axios.$get('https://jsonplaceholder.typicode.com/users/' + id)
      .then((result) => {
        commit('SET_CURRENT_USER', result)
      })
      .catch((err) => {
        alert('FAILED: \br' + err)
      })
  },

  async updateUser ({ commit }, { id, body }) {
    try {
      await this.$axios.$put('https://jsonplaceholder.typicode.com/users/' + id, { body })
        .then((result) => {
          commit('SET_CURRENT_USER', result)
          return result
        })
    } catch (error) {
      return error
    }
  },

  async deleteUser ({ commit }, id) {
    await this.$axios.$delete('https://jsonplaceholder.typicode.com/users/' + id)
  }
}

export const mutations = {
  SET_USERS (state, users) {
    state.users = users
  },

  SET_CURRENT_USER (state, user) {
    state.currentUser = user
  }
}
