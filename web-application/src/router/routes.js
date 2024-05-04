const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        name: "Dashboard",
        path: "account/:account_id/region/:region/dashboard",
        component: () => import("src/pages/Dashboard.vue"),
      },

      {
        name: "Channels",
        path: "account/:account_id/region/:region/channels",
        component: () => import("src/pages/Channels.vue"),
      },

      {
        name: "Live Channels",
        path: "account/:account_id/region/:region/live_channels",
        component: () => import("src/pages/LiveChannels.vue"),
      },

      {
        name: "Channel Details",
        path: "account/:account_id/region/:region/channel/:channel_id",
        component: () => import("src/components/Channels/ChannelDetails.vue"),
      },

      {
        name: "Sessions",
        path: "account/:account_id/region/:region/channel/:channel_id/sessions",
        component: () => import("src/pages/Sessions.vue"),
      },

      {
        name: "Session Details",
        path: "account/:account_id/region/:region/channel/:channel_id/session/:session_id",
        component: () => import("src/components/Sessions/SessionDetails.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
