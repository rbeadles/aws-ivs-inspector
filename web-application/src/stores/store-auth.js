import { defineStore } from "pinia";
import { api } from "boot/axios";
import { Notify } from "quasar";

export const useAuthStore = defineStore("AuthStore", {
  state: () => ({
    userSignedIn: false,
    userState: null,
  }),

  actions: {
    async isUserSignedIn() {
      return auth
        .currentSession()
        .then((data) => {
          console.log("current session: ", data);
          return auth
            .currentAuthenticatedUser()
            .then((res) => {
              // res.attributes.status = "loggedIn";
              console.log("sign-in attributes: ", res.attributes);
              commit("setUserState", res.attributes);
              this.$router.push({
                name: "Dashboard",
              });
            })
            .catch((error) => {
              console.log("error: ", error);
              if (error == "The user is not authenticated") {
                this.$router.push("/login");
                dispatch("clearUserState");
              }
            });
          // .then(() => {
          //   return true;
          // });
        })
        .catch((err) => {
          console.log("err: ", err);
          this.$router.push("/login");
          // return err
        });
    },

    setUserState(state) {
      this.userState = state;
    },
  },
});
