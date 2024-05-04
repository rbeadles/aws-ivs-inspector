import { defineStore } from "pinia";
import { api } from "boot/axios";
import { Notify } from "quasar";
import { useCommonStore } from "./store-common";
import envVars from "assets/envVars.json";

const commonStore = useCommonStore();

export const useAccountStore = defineStore("AccountStore", {
  state: () => ({
    accountQuotas: {},
    quotasNextToken: {},
  }),

  actions: {
    async getQuotaProvisioned(serviceCode, ivsRegion) {
      console.log(envVars);
      try {
        console.log(serviceCode, ivsRegion);
        const response = await api.get(
          `https://${
            envVars[`api-${ivsRegion}`].rest_api
          }.execute-api.${ivsRegion}.amazonaws.com/ivs/get-quotas`,
          {
            params: {
              serviceCode: serviceCode,
              nextToken: this.quotasNextToken[ivsRegion] || "",
            },
          }
        );

        console.log("response:", response);
        if (response.status == 200) {
          this.accountQuotas[ivsRegion] = response.data?.Quotas;
        }
        return true;
      } catch (error) {
        console.log(error.message);
        Notify.create({
          color: "negative",
          position: "top",
          message: "Getting quotas failed",
          icon: "report_problem",
        });

        return error;
      }
    },
  },
});
