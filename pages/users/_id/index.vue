<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <div v-if="user.name === undefined">
      <h3>Featching data...</h3>
    </div>
    <div v-else>
      <h2>{{ user.name }} - ID: {{ user.id }}</h2>
      <h3>Username: </h3>
      <p>{{ user.username }}</p>
      <h3> E-mail: </h3>
      <p>{{ user.email }}</p>
      <h3> Phone: </h3>
      <p>{{ user.phone }}</p>
      <h3> Website: </h3>
      <p>{{ user.website }}</p>
      <h3>Company:</h3>
      <p>{{ user.company.name }}</p>
      <h3>Address: </h3>
      <p>{{ user.address.street }}, {{ user.address.suite }} - {{ user.address.city }} - Zip Code: {{ user.address.zipcode }}</p>
    </div>
    <div>
      <v-btn @click="onClickUpdate">
        Update User
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return { }
  },

  computed: {
    user () {
      return this.$store.state.users.currentUser
    }
  },

  mounted () {
    if (this.user.name === undefined) {
      this.$store.dispatch('users/fetchCurrentUser', this.$route.params.id)
      return this.$store.state.users.currentUser
    }
  },

  methods: {
    onClickUpdate () {
      this.$store.dispatch('users/fetchCurrentUser', this.user.id)
        .then((res) => {
          this.$router.push({ path: '/users/' + this.user.id + '/update' })
        })
        .catch(() => {
          alert('Something went wrong!')
        })
    }
  }
}
</script>
