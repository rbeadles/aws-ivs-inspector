<template>
  <!-- {{ option?.series[1]?.data }} -->
  <v-chart
    v-if="option?.series?.[0].data.length"
    class="ivs-bg-grey q-pa-md"
    :option="option"
    autoresize
  />
</template>

<script>
import { defineComponent, computed, onMounted, ref, provide } from "vue";

import { date } from "quasar";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart, LineChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  ToolboxComponent,
  DataZoomComponent,
} from "echarts/components";

import VChart, { THEME_KEY } from "vue-echarts";
// import eventLog from "src/assets/events.json";

use([
  CanvasRenderer,
  PieChart,
  LineChart,
  GridComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  DataZoomComponent,
]);

export default defineComponent({
  name: "ChannelDetails",

  props: {
    metrics: { type: Object, default: null },
  },

  components: { VChart },

  setup(props) {
    provide(THEME_KEY);

    const option = ref({
      textStyle: {
        // color: "#fff",
      },
      // title: {
      //   text: "Stacked Line",
      // },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: [
          "Video Bitrate (Kbps)",
          // "Audio Bitrate",
          // // "Framerate",
          // "KeyFrame Intervals",
          // "Concurrent Views",
        ],
        textStyle: {
          color: "#000",
        },
      },
      grid: {
        left: "0%",
        right: "0%",
        bottom: "3%",
        containLabel: true,
      },
      dataZoom: [
        {
          show: true,
          realtime: true,
          start: 0,
          end: 100,
          xAxisIndex: [0, 1],
        },
        {
          type: "inside",
          realtime: true,
          start: 30,
          end: 70,
          xAxisIndex: [0, 1],
        },
      ],
      // toolbox: {
      //   feature: {
      //     saveAsImage: {},
      //   },
      // },
      xAxis: {
        type: "category",
        boundaryGap: true,
        data: [],
      },
      yAxis: {
        type: "value",
        // max: "auto",
        // min: "auto",
        boundaryGap: [0, "100%"],
        splitLine: {
          show: true,
        },
      },
      series: [
        {
          name: "Video Bitrate (Kbps)",
          type: "line",
          stack: "Total",
          data: [],

          markPoint: {
            data: [
              {
                name: "test",
                value: "SS",
                xAxis: 1,
                yAxis: -0.5,
              },
            ],
          },
        },
        // {
        //   name: "Audio Bitrate",
        //   type: "line",
        //   stack: "Total",
        //   data: [],
        // },
        // {
        //   name: "Framerate",
        //   type: "line",
        //   stack: "Total",
        //   data: [],
        // },
        // {
        //   name: "KeyFrame Intervals",
        //   type: "line",
        //   stack: "Total",
        //   data: [],
        // },
        // {
        //   name: "Concurrent Views",
        //   type: "line",
        //   stack: "Total",
        //   data: [],
        // },
      ],
    });

    const manipulateMetrics = () => {
      option.value.xAxis.data = Object.keys(
        props.metrics?.IngestVideoBitrate
      ).map((key) => date.formatDate(parseInt(key) * 1000, "hh:mm:ss"));
      option.value.series[0].data = Object.values(
        props.metrics?.IngestVideoBitrate
      ).map((value) => Math.trunc(value / 1024));
      // option.value.series[1].data = Object.values(
      //   props.metrics?.IngestAudioBitrate
      // ).map((value) => Math.trunc(value / 1024));
      // option.value.series[2].data = Object.values(
      //   props.metrics?.KeyframeInterval
      // );
      // option.value.series[3].data = Object.values(
      //   props.metrics?.ConcurrentViews
      // );
    };

    const setMetricsData = () => {
      switch (props.metrics) {
        case "IngestVideoBitrate":
          manipulateMetrics();
        // case "IngestAudioBitrate":
        //   option.value.series[1].data.push(event.avgValue / 1024);
        // // case "IngestFramerate":
        // //   option.value.series[2].data.push(event.avgValue / 1024);
        // case "KeyframeInterval":
        //   option.value.series[3].data.push(event.avgValue / 1024);
        // case "ConcurrentViews":
        //   option.value.series[4].data.push(event.avgValue);

        default:
          break;
      }
    };

    onMounted(() => {
      manipulateMetrics();
    });

    return { option };
  },
});
</script>

<style scoped>
.echarts {
  width: 100%;
  height: 360px;
  margin: auto auto;
}
.echart {
  width: 100%;
  height: 360px;
  /* border: 1px solid #cfcfcf; */
}
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 10px;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
