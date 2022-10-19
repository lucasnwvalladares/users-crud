<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <div v-if="user.name === undefined">
      <h3>
        Please wait...
      </h3>
    </div>
    <div v-else>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-text-field
          id="nameInput"
          :value="user.name"
          :rules="nameRules"
          label="Full Name"
          required
        />
        <v-text-field
          id="usernameInput"
          :value="user.username"
          :rules="usernameRules"
          label="Username"
          required
        />
        <v-text-field
          id="emailInput"
          :value="user.email"
          :rules="emailRules"
          label="Email"
          required
        />
        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="onClickUpdate"
        >
          Update
        </v-btn>

        <v-btn
          color="error"
          class="mr-4"
          @click="onClickCancel"
        >
          Cancel
        </v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      valid: false,
      nameRules: [
        v => !!v || 'Name is required'
      ],
      usernameRules: [
        v => !!v || 'Username is required',
        v => (v && v.length <= 15) || 'Userame must be less than 15 characters',
        v => (v && v.length >= 5) || 'Userame must be more than 5 characters'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ]
    }
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
      const nameInputValue = document.getElementById('nameInput')
      const usernameInputValue = document.getElementById('usernameInput')
      const emailInputValue = document.getElementById('emailInput')
      const formValues = this.user

      if (this.$refs.form.validate()) {
        formValues.name = nameInputValue.value
        formValues.username = usernameInputValue.value
        formValues.email = emailInputValue.value
        try {
          this.$store.dispatch('users/updateUser', { id: formValues.id, body: formValues })
            .then(() => {
              alert(`User ${formValues.username} successfully updated!`)
            })
            .then(() => {
              this.$router.push({ path: '/users/' + formValues.id })
            })
        } catch (error) {
          alert(error)
        }
      }
    },

    onClickCancel () {
      this.$router.push({ path: '/users/' + this.user.id })
    }
  }
}
</script>
