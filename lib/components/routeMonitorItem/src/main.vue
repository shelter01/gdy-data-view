<template>
  <gdy-chart-node
    class="chart-box"
    :lcpsInfo="{ name }"
    :inData="inData"
    :outData="outData"
    :countNode="countNode"
    :errorNode="errorNode"
  />
</template>

<script>
import Axios from 'axios';
import Vue from 'vue';
import chartNode from '../../chartNode';
Vue.use(chartNode);

export default {
  name: 'gdyRouteMonitorItem',
  props: {
    url_route: {
      type: String
    },
    name: {
      type: String
    },
    instanceId: {
      type: String
    }
  },
  data() {
    return {
      inData: [
        // { name: '信源1', fluency: 100 }
      ],
      outData: [
        // { name: '输出1', fluency: 100 }
      ],
      countNode: 0,
      errorNode: 0
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      const curl = this.url_route;
      Axios.get(curl, { params: { instanceId: this.instanceId } }).then(res => {
        if (res.data && res.data.Flag === 100) {
          const data = res.data.list || {};
          this.resetData(data);
        }
      });
    },
    resetData(data) {
      const { num = 0, abnormalNum = 0, in: inList = {}, out: outList = {} } = data;
      const inData = [];
      const outData = [];
      for (const key in inList) {
        if (inList[key]) {
          inData.push({
            name: key,
            fluency: inList[key]['fluency']
          });
        }
      }
      for (const key in outList) {
        if (outList[key]) {
          outData.push({
            name: key,
            fluency: outList[key]['fluency']
          });
        }
      }
      this.inData = inData;
      this.outData = outData;
      this.countNode = num;
      this.errorNode = abnormalNum;
    }
  }
};
</script>
<style>
.chart-box {
  position: static !important;
  z-index: 100 !important;
}
</style>
