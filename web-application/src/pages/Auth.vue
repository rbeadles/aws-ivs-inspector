<template>
  <div class="col body-spacing">
    <!-- <div class="q-pa-md text-body1">
      {{ auth.authStatus }}
    </div> -->

    <authenticator initial-state="signIn" :form-fields="formFields">
      <template v-slot:header>
        <div style="padding: var(--amplify-space-small); text-align: center">
          <img class="amplify-image" alt="Amplify logo" src="/icons/ivs.png" />
        </div>
      </template>

      <!-- <template v-slot:sign-in-header>
        <h3
          class="amplify-heading"
          style="padding: var(--amplify-space-xl) 0 0 var(--amplify-space-xl)"
        >
          Sign in to your account
        </h3>
      </template> -->

      <template v-slot="{ user, signOut }">
        <h1>Hello {{ user.username }}!</h1>
        <q-btn square outline rounded @click="signOut">Sign Out</q-btn>
      </template>
    </authenticator>
  </div>
</template>

<script>
import { defineComponent, toRefs, watch } from "vue";
import { useRouter } from "vue-router";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-vue";
import envVars from "src/config/env.json";
import "@aws-amplify/ui-vue/styles.css";

export default defineComponent({
  name: "UserAuthentication",
  components: { Authenticator },
  setup() {
    const { route, user, auth } = toRefs(useAuthenticator());
    const $router = useRouter();

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

    watch(user, (currentValue, oldValue) => {
      console.log(currentValue);
      console.log(oldValue);

      if (currentValue?.userId) {
        const params = {
          account_id: envVars.account_id,
          region: Object.keys(envVars.apis)[0],
        };
        $router.push({ name: "Dashboard", params: params });
      }
    });

    return {
      auth,
      formFields,
    };
  },
});
</script>
