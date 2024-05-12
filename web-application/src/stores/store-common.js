import { defineStore } from "pinia";

const envVars = import.meta.env;

export const useCommonStore = defineStore("CommonStore", {
  state: () => ({
    regions: envVars.VITE_REGIONS.split(","),
    thumbStyle: {
      right: "0px",
      borderRadius: "7px",
      backgroundColor: "#ff6f00",
      width: "4px",
      opacity: 0.75,
    },

    initialPagination: {
      sortBy: "desc",
      descending: false,
      page: 1,
      rowsPerPage: 100,
    },
  }),

  actions: {},
});
