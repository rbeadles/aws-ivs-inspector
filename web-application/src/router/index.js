<<<<<<< HEAD
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
=======
import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */
>>>>>>> refs/remotes/origin/dev

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
<<<<<<< HEAD
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;
=======
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)
>>>>>>> refs/remotes/origin/dev

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
<<<<<<< HEAD
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  return Router;
});
=======

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  return Router
})
>>>>>>> refs/remotes/origin/dev
