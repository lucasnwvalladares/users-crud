<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <div><h1>List of Users</h1></div>
    <v-data-table
      :headers="headers"
      :items="usersByStore"
      :items-per-page="5"
      class="elevation-1"
      @click:row="handleClick"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      // Variable populated by stoe
      usersByStore: [],
      headers: [
        {
          text: 'id',
          align: 'start',
          sortable: false,
          value: 'id'
        },
        { text: 'Name', value: 'name' },
        { text: 'Username', value: 'username' },
        { text: 'E-mail', value: 'email' }
      ]
    }
  },

  computed: {
    ...mapGetters({
      getAll: 'users/getUsers'
    })
  },

  mounted () {
    // Calls method so the list is loaded on page load
    this.getUsersFromStore()
  },

  methods: {
    // GET users using Store
    getUsersFromStore () {
      this.$store.dispatch('users/fetchAllUsers').then((result) => {
        this.getAll.forEach((element) => {
          this.usersByStore.push(element)
        })
        return result
      }).catch((err) => {
        return err
      })
    },

    // When user clicks at any row in the table, opens the user detail in a new window
    handleClick (row) {
      this.$store.dispatch('users/fetchCurrentUser', row.id)
        .then((res) => {
          this.$router.push({ path: '/users/' + row.id })
        })
    }
  }
}
</script>
