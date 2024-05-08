import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";

// - AMPLIFY -
import { Amplify } from "aws-amplify";
import { fetchUserAttributes } from "aws-amplify/auth";
import { fetchAuthSession } from "aws-amplify/auth";
import { AmplifyConfig } from "../config/amplify-config"; // NO TOUCHY
Amplify.configure(AmplifyConfig);

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  return Router;
});
