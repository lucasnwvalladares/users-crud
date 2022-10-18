<template>
  <div v-if="user != null">
    <h1> {{ user.name }} - ID: {{ user.id }}</h1>
    <h3> Username: {{ user.username }} </h3>
    <h3> E-mail: {{ user.email }} </h3>
    <h3> Phone: {{ user.phone }} </h3>
    <h3> Website: {{ user.website }} </h3>
    <h3>Company:</h3>
    <h4>{{ user.company.name }}</h4>
    <h3>
      Address: {{ user.address.street }}, {{ user.address.suite }} - {{ user.address.city }} - Zip Code: {{ user.address.zipcode }}
    </h3>
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
  }
}
</script>
