<template>
  <dv-full-screen-container style="background: #1b1c20;">
    <div class="zc-chart-node">
      <div class="zc-chart-node--title">{{ title }}</div>
      <div class="zc-chart-node--tr">
        <div class="zc-chart-node--th">采集视频源</div>
        <div class="zc-chart-node--th">集群导播台</div>
        <div class="zc-chart-node--th">视频输出</div>
      </div>
      <div class="zc-chart-node--base">
        <img class="zc-chart-node--base-img" src="./img/base.png" alt="" />
        <div class="zc-chart-node--base-in">in</div>
        <div class="zc-chart-node--base-name">{{ lcpsInfo.title }}</div>
        <div class="zc-chart-node--base-out">out</div>
      </div>
      <div class="zc-chart-node--count">
        <div class="zc-chart-node--count-inline">
          全部节点数
          <span>{{ countNode }}</span>
        </div>
        <div class="zc-chart-node--count-inline">
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
  name: 'zc-chart-node',
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
<style lang="less" scoped>
.dv-flyline-chart-enhanced {
  position: relative;
  z-index: 100;
}
.zc-chart-node {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  height: 100%;
  width: 100%;
}
.zc-chart-node--title {
  padding: 15px 20px;
  font-size: 24px;
  color: #fff;
}
.zc-chart-node--tr {
  width: 100%;
  padding: 20px 0;
  display: flex;
  color: #2ec2b8;
  font-size: 20px;
  .zc-chart-node--th:nth-child(1) {
    margin-left: 15%;
    flex: 0 0 auto;
    width: 10%;
    text-align: center;
  }
  .zc-chart-node--th:nth-child(3) {
    margin-right: 15%;
    flex: 0 0 auto;
    width: 10%;
    text-align: center;
  }
  .zc-chart-node--th:nth-child(2) {
    flex: 1;
    color: #2ec2b8;
    text-align: center;
  }
}
.zc-chart-node--base {
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 55%;
  color: #fff;
  .zc-chart-node--base-img {
    width: 100%;
    // animation: animateY 5s ease-in-out infinite;
  }
  .zc-chart-node--base-name {
    position: absolute;
    top: 50px;
    width: 100%;
    text-align: center;
    font-size: 43px;
  }
  .zc-chart-node--base-in {
    position: absolute;
    top: 150px;
    left: 255px;
    font-size: 26px;
  }
  .zc-chart-node--base-out {
    position: absolute;
    top: 150px;
    right: 250px;
    font-size: 26px;
    font-size: 26px;
  }
}
.zc-chart-node--count {
  position: absolute;
  bottom: 60px;
  left: 50%;
  transform: translate(-50%, 0);
  text-align: center;
  line-height: 30px;
  .zc-chart-node--count-inline {
    margin: 0 45px;
    display: inline-block;
    font-size: 20px;
    color: #fff;
    span {
      margin: 0 6px;
      vertical-align: top;
      font-size: 40px;
      color: #2ec2b8;
    }
  }
}
@keyframes animateY {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(20px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
