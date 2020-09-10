<template>
  <dv-full-screen-container style="background: #1b1c20;">
    <div class="gdy-chart-node">
      <div class="gdy-chart-node--title">{{ title }}</div>
      <div class="gdy-chart-node--tr">
        <div class="gdy-chart-node--th">采集视频源</div>
        <div class="gdy-chart-node--th">集群导播台</div>
        <div class="gdy-chart-node--th">视频输出</div>
      </div>
      <div class="gdy-chart-node--base">
        <img class="gdy-chart-node--base-img" src="./img/base.png" alt="" />
        <div class="gdy-chart-node--base-in">in</div>
        <div class="gdy-chart-node--base-name">{{ lcpsInfo.title }}</div>
        <div class="gdy-chart-node--base-out">out</div>
      </div>
      <div class="gdy-chart-node--count">
        <div class="gdy-chart-node--count-inline">
          全部节点数
          <span>{{ countNode }}</span>
        </div>
        <div class="gdy-chart-node--count-inline">
          当前异常节点数
          <span>{{ errorNode }}</span>
        </div>
      </div>
    </div>
    <dv-flyline-chart-enhanced :config="config" style="width:100%;height:100%;" />
  </dv-full-screen-container>
</template>

<script>
import Vue from 'vue';
import { fullScreenContainer, flylineChartEnhanced } from '@jiaminghi/data-view';
Vue.use(fullScreenContainer);
Vue.use(flylineChartEnhanced);
import CHART_CONFIG from './config.js';
export default {
  name: 'gdyChartNode',
  props: {
    title: {
      type: String,
      default() {
        return '全链路监看';
      }
    },
    inData: {
      type: Array,
      default() {
        return [];
      }
    },
    outData: {
      type: Array,
      default() {
        return [];
      }
    },
    lcpsInfo: {
      type: Object,
      default() {
        return {
          title: 'lcps'
        };
      }
    }
  },
  data() {
    return {
      countNode: 0,
      errorNode: 0,
      config: {
        points: [],
        lines: []
      }
    };
  },
  mounted() {
    this.resetConfig();
  },
  methods: {
    resetConfig() {
      let points = [];
      let lines = [];
      let countNode = 0;
      let errorNode = 0;
      for (let i = 0; i < this.inData.length; i++) {
        let item = this.inData[i];
        let len = this.inData.length;
        let startY = 0.55 + (0.8 / len) * (i - (len - 1) / 2);
        let endY = 0.55 + (0.1 / len) * (i - (len - 1) / 2);
        let pointsFluency = CHART_CONFIG.pointsInFluency(len);
        let pointsEndFluency = CHART_CONFIG.pointsEndFluency(len);
        let linesFluency = CHART_CONFIG.linesFluency;
        countNode++;
        if (!item.fluency || item.fluency < 90) {
          pointsFluency = CHART_CONFIG.pointsInDisfluency(len);
          pointsEndFluency = CHART_CONFIG.pointsEndDisfluency(len);
          linesFluency = CHART_CONFIG.linesDisfluency;
          errorNode++;
        }
        points.push(
          {
            name: item.name || `信源${i + 1}`,
            coordinate: [0.2, startY],
            ...pointsFluency
          },
          {
            name: (item.name || `信源${i + 1}`) + '-end',
            coordinate: [0.35, endY],
            ...pointsEndFluency
          }
        );
        lines.push({
          source: item.name || `信源${i + 1}`,
          target: (item.name || `信源${i + 1}`) + '-end',
          ...linesFluency
        });
      }
      for (let i = 0; i < this.outData.length; i++) {
        let item = this.outData[i];
        let len = this.outData.length;
        let startY = 0.55 + (0.1 / len) * (i - (len - 1) / 2);
        let endY = 0.55 + (0.7 / len) * (i - (len - 1) / 2);
        let pointsFluency = CHART_CONFIG.pointsEndFluency(len);
        let pointsEndFluency = CHART_CONFIG.pointsOutFluency(len);
        let linesFluency = CHART_CONFIG.linesFluency;
        countNode++;
        if (!item.fluency || item.fluency < 90) {
          pointsFluency = CHART_CONFIG.pointsEndDisfluency(len);
          pointsEndFluency = CHART_CONFIG.pointsOutDisfluency(len);
          linesFluency = CHART_CONFIG.linesDisfluency;
          errorNode++;
        }
        points.push(
          {
            name: (item.name || `输出${i + 1}`) + '-start',
            coordinate: [0.65, startY],
            ...pointsFluency
          },
          {
            name: item.name || `输出${i + 1}`,
            coordinate: [0.8, endY],
            ...pointsEndFluency
          }
        );
        lines.push({
          source: item.name || `输出${i + 1}` + '-start',
          target: item.name || `输出${i + 1}`,
          ...linesFluency
        });
      }
      this.config = { points, lines };
      this.countNode = countNode;
      this.errorNode = errorNode;
    }
  },
  watch: {
    inData() {
      this.$nextTick(() => {
        this.resetConfig();
      });
    },
    outData() {
      this.$nextTick(() => {
        this.resetConfig();
      });
    }
  }
};
</script>
