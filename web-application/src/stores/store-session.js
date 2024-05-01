import { defineStore } from "pinia";
import { api } from "boot/axios";
import { Notify } from "quasar";
import { useChannelStore } from "stores/store-channel";
import { useCommonStore } from "./store-common";
const channelStore = useChannelStore();
const commonStore = useCommonStore();

export const useSessionStore = defineStore("SessionStore", {
  state: () => ({
    liveSessions: {},
    sessions: {},
    sessionMetrics: {},
    quotas: {},
    streamsNextToken: {},
  }),
  getters: {
    sessionList: (state) => state.sessions,
  },
  actions: {
    async listStreams(ivsRegion) {
      console.log("getting live streams", ivsRegion);
      try {
        const response = await api.get(
          `https://${commonStore.envVars.VITE_REST_API}.execute-api.${ivsRegion}.amazonaws.com/ivs/list-streams`,
          {
            params: {
              nextToken: this.streamsNextToken[ivsRegion] || "",
            },
          }
        );
        console.log("getSessions response:", response);
        if (response.status == 200) {
          response.data?.streams.map((stream) => {
            console.log(stream);
            const channelId = stream.channelArn.split("/")[1];
            stream["channelId"] = channelId;

            if (!this.liveSessions[ivsRegion]) {
              this.liveSessions[ivsRegion] = {};
            }
            if (!channelStore.channels[ivsRegion]) {
              channelStore.channels[ivsRegion] = {};
            }
            if (!channelStore.channels[ivsRegion][channelId]) {
              channelStore.channels[ivsRegion][channelId] = {};
            }

            console.log("stream: ", stream);

            this.liveSessions[ivsRegion][channelId] = stream;
            channelStore.channels[ivsRegion][channelId].channelConfig = stream;
          });
          this.streamsNextToken[ivsRegion] = response.data?.nextToken;
          return true;
        }
      } catch (error) {
        console.log(error.message);
        Notify.create({
          color: "negative",
          position: "top",
          message: "Getting live streams failed",
          icon: "report_problem",
        });
        return error;
      }
    },

    async getSession(streamId, channelArn, ivsRegion) {
      try {
        console.log(streamId, channelArn);
        const response = await api.get(
          `https://${commonStore.envVars.VITE_REST_API}.execute-api.${ivsRegion}.amazonaws.com/ivs/get-session`,
          {
            params: {
              stream_id: streamId,
              channel_arn: channelArn,
            },
          }
        );

        console.log("getSession response:", response);
        if (response.status == 200) {
          if (!this.sessions[ivsRegion]) this.sessions[ivsRegion] = {};
          this.sessions[ivsRegion][streamId] = Object.assign(
            {},
            this.sessions[ivsRegion]?.[streamId],
            response.data?.Item
          );
          return true;
        }
      } catch (error) {
        console.log(error.message);
        Notify.create({
          color: "negative",
          position: "top",
          message: "Getting session details failed",
          icon: "report_problem",
        });
        return error;
      }
    },

    async getStream(streamId, channelArn, ivsRegion) {
      try {
        console.log(channelArn, streamId);
        const response = await api.get(
          `https://${commonStore.envVars.VITE_REST_API}.execute-api.${ivsRegion}.amazonaws.com/ivs/get-stream`,
          {
            params: {
              channelArn: channelArn,
            },
          }
        );
        console.log("getStream response:", response);
        if (response.status == 200) {
          if (!this.sessions[ivsRegion]) this.sessions[ivsRegion] = {};
          if (!this.sessions[ivsRegion][streamId]) {
            this.sessions[ivsRegion][streamId] = { stream: {} };
          }

          this.sessions[ivsRegion][streamId].stream = Object.assign(
            {},
            this.sessions[ivsRegion][streamId].stream,
            response.data?.stream
          );
        }
      } catch (error) {
        console.log(error.message);
        Notify.create({
          color: "negative",
          position: "top",
          message: "Getting stream details failed",
          icon: "report_problem",
        });
        return error;
      }
    },

    async getIngestMetrics(streamId, channelId, ivsRegion) {
      try {
        console.log(streamId, channelId);
        const response = await api.get(
          `https://${commonStore.envVars.VITE_REST_API}.execute-api.${ivsRegion}.amazonaws.com/ivs/get-ingest-metrics`,
          {
            params: {
              stream_id: streamId,
              channel_id: channelId,
            },
          }
        );

        console.log(response);

        if (response.status == 200) {
          if (!this.sessionMetrics[ivsRegion])
            this.sessionMetrics[ivsRegion] = {};
          this.sessionMetrics[ivsRegion][streamId] = response?.data;
        }
        return true;
      } catch (error) {
        console.log(error.message);
        Notify.create({
          color: "negative",
          position: "top",
          message: "Getting ingest metrics failed",
          icon: "report_problem",
        });
        return error;
      }
    },

    // websocket API
    async getSessionEvents(streamId, channelArn, ivsRegion) {
      try {
        const ws = new WebSocket(
          `wss://${commonStore.envVars.VITE_WSS_GET_SESSION_EVENTS}.execute-api.${ivsRegion}.amazonaws.com/ivs`
        );
        ws.onopen = () => {
          console.log("open response:", ws);
          const data = {
            action: "get-session-events",
            message: {
              streamId: streamId,
              channelArn: channelArn,
            },
          };
          const payload = JSON.stringify(data);
          console.log("payload to send:", payload);
          ws.send(payload);

          ws.onmessage = (event) => {
            const events = JSON.parse(event.data);
            console.log("event data:", events);
            if (!events.ResponseMetadata && Object.keys(events)) {
              if (!this.sessions[ivsRegion]) {
                this.sessions[ivsRegion] = {};
              }
              if (!this.sessions[ivsRegion][streamId]) {
                this.sessions[ivsRegion][streamId] = {};
              }
              this.sessions[ivsRegion][streamId].events = events;
            }
          };
        };
        ws.close = () => {
          console.log("get events connection closed");
        };
        return true;
      } catch (error) {
        console.log(error);
      }

      ws.onclose = () => console.log("closed");
    },

    // websocket API
    async getLiveStreams(ivsRegion) {
      try {
        const ws = new WebSocket(
          `wss://${commonStore.envVars.VITE_WSS_GET_LIVE_STREAMS}.execute-api.${ivsRegion}.amazonaws.com/ivs`
        );
        ws.onopen = () => {
          console.log("open response:", ws);

          ws.onmessage = (stream) => {
            if (stream.data.length) {
              const streamData = JSON.parse(stream.data);
              const streamId = streamData.detail.stream_id;
              const action = streamData.detail.event_name;
              const channelId = streamData.resources[0].split("/")[1];

              // console.log("this.liveSessions", this.liveSessions, action);

              if (action == "Session Created") {
                console.log("session created, adding to the local store");
                const sessionState = {
                  channelArn: streamData.resources[0],
                  startTime: streamData.time,
                  streamId: streamId,
                  channelId: channelId,
                  state: "LIVE",
                };
                if (!this.liveSessions[ivsRegion]) {
                  this.liveSessions[ivsRegion] = {};
                }

                this.liveSessions[ivsRegion][channelId] = sessionState;

                if (!channelStore.channels[ivsRegion]) {
                  channelStore.channels[ivsRegion] = {};
                }
                if (!channelStore.channels[ivsRegion][channelId]) {
                  channelStore.channels[ivsRegion][channelId] = {};
                }
                channelStore.channels[ivsRegion][channelId].channelConfig =
                  sessionState;

                console.log("live sessions: ", this.liveSessions[ivsRegion]);
              } else if (action == "Session Ended") {
                console.log("session ended, removing from the local store");
                // console.log(this.liveSessions[ivsRegion][channelId]);
                delete this.liveSessions[ivsRegion][channelId];

                console.log("live sessions: ", this.liveSessions[ivsRegion]);
              }
            }
          };
        };
        ws.close = () => {
          console.log("get live stream connection closed");
        };
        return true;
      } catch (error) {
        console.log(error);
      }

      try {
        ws.onclose = () => console.log("why closed?");
      } catch (error) {
        console.log(error);
        console.log("message:", error.Message);
      }
    },

    getQuotaProvisioned(serviceCode, ivsRegion) {
      try {
        console.log(serviceCode);
        api
          .get(
            `https://${commonStore.envVars.VITE_REST_API}.execute-api.${ivsRegion}.amazonaws.com/ivsQuotaProvisioned`,
            {
              params: {
                serviceCode: serviceCode,
              },
            }
          )
          .then((response) => {
            // console.log("response:", response);
            if (response.data.statusCode == 200) {
              this.quotas = response.data?.body;
            }
            // console.log("Quotas:", this.quotas);
          })
          .catch(() => {
            Notify.create({
              color: "negative",
              position: "top",
              message: "Getting session details failed",
              icon: "report_problem",
            });
          });
        // Axios.this.sessions = {};
      } catch (error) {
        console.log(error.message);
        return error;
      }
    },
  },
});
