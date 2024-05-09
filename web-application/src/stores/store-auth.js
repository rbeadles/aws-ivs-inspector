import { defineStore } from "pinia";
import { api } from "boot/axios";
import { Notify } from "quasar";

export const useAuthStore = defineStore("AuthStore", {
  state: () => ({
    userSignedIn: false,
  }),

  actions: {
    async isUserSignedIn() {
      return true;
      // return Auth.currentSession()
      //   .then((data) => {
      //     console.log("current session: ", data);
      //     return Auth.currentAuthenticatedUser()
      //       .then((res) => {
      //         // res.attributes.status = "loggedIn";
      //         console.log("sign-in attributes: ", res.attributes);
      //         commit("setUserState", res.attributes);
      //         // this.$router.push({
      //         //   name: "Home",
      //         //   params: {
      //         //     organisation_id: res.attributes["custom:organisation_id"]
      //         //   }
      //         // });
      //       })
      //       .catch((error) => {
      //         console.log("error: ", error);
      //         if (error == "The user is not authenticated") {
      //           this.$router.push("/login");
      //           dispatch("clearUserState");
      //         }
      //       });
      //     // .then(() => {
      //     //   return true;
      //     // });
      //   })
      //   .catch((err) => {
      //     console.log("errrrr: ", err);
      //     this.$router.push("/login");
      //     // return err
      //   });
    },
  },
});
