<template>
  <div class="col body-spacing">
    <div class="row q-gutter-x-s">
      <div class="col">
        <q-scroll-area
          style="height: calc(100vh - 75px)"
          :thumb-style="thumbStyle"
        >
          <div class="col">
            <!-- <div class="row q-col-gutter-md text-h6"> -->

            <q-item dense class="q-px-sm text-h6">
              <q-item-section class="col-12 col-sm">
                <q-item-label> Session: {{ sessionState }} </q-item-label>
              </q-item-section>

              <q-item-section class="col-12 col-sm-auto">
                <q-item-label> Session CCV: {{ sessionCcv }} </q-item-label>
              </q-item-section>
            </q-item>
            <q-separator spaced />
          </div>

          <!-- {{ sessionMetrics }} -->

          <q-card
            class="relative-positio full-width"
            style="height: 360px"
            flat
          >
            <q-card-section class="q-pa-none">
              <transition
                appear
                enter-active-class="animated jumpUp"
                leave-active-class="animated fadeOut"
              >
                <div v-show="metricsLoaded">
                  <div v-if="sessionMetrics">
                    <chart-bitrate :metrics="sessionMetrics" />
                  </div>
                </div>
              </transition>
            </q-card-section>

            <q-inner-loading
              :showing="!metricsLoaded"
              label="Loading Metrics..."
              label-class="text-teal"
              label-style="font-size: 1.1em"
            />
          </q-card>
          <div class="col">
            <div class="row q-col-gutter-md col-12 col-md-4 col-sm-6">
              <div class="col-lg-4 col-md-6 col-sm-12">
                <list-items type="Channel" :list="sessionDetails?.channel" />
                <list-items
                  v-if="sessionDetails?.recordingConfiguration"
                  type="Recording"
                  :list="sessionDetails?.recordingConfiguration"
                />
              </div>
              <div class="col-lg-4 col-md-6 col-sm-12">
                <list-items
                  type="Video"
                  :list="sessionDetails?.ingestConfiguration?.video"
                />
                <list-items
                  type="Audio"
                  :list="sessionDetails?.ingestConfiguration?.audio"
                />
              </div>

              <div class="col-lg-4 col-md-6 col-sm-12">
                <list-items-event
                  type="Events"
                  :list="sessionDetails?.events"
                />
              </div>

              <!-- <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                <list-items-quotas
                  type="Limits (provision/usage)"
                  :list="limits"
                />
              </div> -->
            </div>
          </div>
        </q-scroll-area>
      </div>

      <q-separator vertical />

      <div class="col-3" style="min-width: 300px">
        <q-scroll-area
          style="height: calc(100vh - 75px)"
          :thumb-style="thumbStyle"
        >
          <q-item dense class="q-px-sm text-h6">
            <q-item-section>
              <q-item-label class="text-h6"> What this means </q-item-label>
            </q-item-section>
          </q-item>
          <q-separator spaced />
        </q-scroll-area>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useSessionStore } from "src/stores/store-session";
import { useCommonStore } from "src/stores/store-common";
import ChartBitrate from "src/components/Sessions/ChartBitrate.vue";
import ListItems from "src/components/Common/ListItems.vue";
import ListItemsEvent from "src/components/Common/ListItemsEvent.vue";

export default defineComponent({
  name: "SessionDetails",

  setup() {
    const sessionStore = useSessionStore();
    const commonStore = useCommonStore();
    const $route = useRoute();
    const awsRegion = $route.params.region;
    const awsAccountId = $route.params.account_id;
    const channelId = $route.params.channel_id;
    const sessionId = $route.params.session_id;
    const channelArn = `arn:aws:ivs:${awsRegion}:${awsAccountId}:channel/${channelId}`;

    const sessionDetails = computed(
      () => sessionStore.sessions[awsRegion]?.[sessionId]
    );
    const sessionMetrics = computed(
      () => sessionStore.sessionMetrics[awsRegion]?.[sessionId]
    );
    const limits = computed(() =>
      sessionStore.quotas?.Quotas?.map((quota) => {
        return {
          key: quota.QuotaName,
          provisioned: quota.Value,
          usage: quota.Value,
        };
      })
    );
    const sessionState = computed(() =>
      sessionDetails.value?.stream
        ? `${sessionDetails.value?.stream?.state}:${sessionDetails.value?.stream?.health}`
        : "Inactive"
    );

    const sessionCcv = computed(
      () => sessionDetails.value?.stream?.viewerCount || "0"
    );

    const metricsLoaded = ref(false);

    onMounted(() => {
      if (!sessionDetails.value) {
        console.log("sessionId:", sessionId);
        sessionStore
          .getSessionEvents(sessionId, channelArn, awsRegion)
          .then((res) => {
            console.log(res);
          });
        if (!sessionDetails.value) {
          sessionStore
            .getSession(sessionId, channelArn, awsRegion)
            .then((res) => {
              console.log("getSessionRes:", res);
              if (res && sessionDetails.value.events?.["Stream End"]) {
                console.log("getting live stream data");
                sessionStore.getStream(sessionId, channelArn, awsRegion);
              }
            });
        }
        if (!sessionMetrics.value) {
          sessionStore
            .getIngestMetrics(sessionId, channelId, awsRegion)
            .then((res) => {
              console.log("getIngestMetricsResponse", res);
              if (res) metricsLoaded.value = true;
            });
        }
        // if (!limits.value) {
        //   sessionStore.getQuotaProvisioned("ivs", awsRegion);
        // }
      }
    });
    return {
      sessionStore,
      sessionState,
      sessionCcv,
      sessionDetails,
      sessionMetrics,
      limits,
      thumbStyle: commonStore.thumbStyle,
      metricsLoaded,
    };
  },

  components: {
    ChartBitrate,
    ListItems,
    ListItemsEvent,
  },
});
</script>
