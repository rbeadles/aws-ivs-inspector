import { defineStore } from "pinia";
import { api } from "boot/axios";
import { Notify } from "quasar";

export const useSettingStore = defineStore("SettingStore", {
  state: () => ({
    userSignedIn: false,
  }),

  actions: {},
});
