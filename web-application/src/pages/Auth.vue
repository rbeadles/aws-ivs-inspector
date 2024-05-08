<template>
  <div class="col body-spacing">
    <authenticator initial-state="signUp" :form-fields="formFields">
      <template v-slot="{ user, signOut }">
        <h1>Hello {{ user.username }}!</h1>
        <button @click="signOut">Sign Out</button>
      </template>
    </authenticator>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import { Authenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";

export default defineComponent({
  name: "UserAuthentication",

  components: { Authenticator },

  setup() {
    const formFields = {
      signUp: {
        given_name: {
          order: 1,
        },
        family_name: {
          order: 2,
        },
        email: {
          order: 3,
        },
        password: {
          order: 4,
        },
        confirm_password: {
          order: 5,
        },
      },
    };
    return {
      formFields,
    };
  },
});
</script>
