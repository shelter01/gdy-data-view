<template>
  <div id="app">
    <gdy-chart-node :inData="inData" :outData="outData" />
    <div class="fixed">
      <div>
        inData
        <input type="text" v-model="inDataLen" />
      </div>
      <div>
        outData
        <input type="text" v-model="outDataLen" />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import dataView from './components/chartNode';
Vue.use(dataView);
export default {
  name: 'App',
  data() {
    return {
      inDataLen: 4,
      outDataLen: 4
    };
  },
  computed: {
    inData() {
      let list = [];
      for (let i = 0; i < this.inDataLen; i++) {
        list.push({
          name: `信源${i + 1}`,
          fluency: Math.fround(50) + 50
        });
      }
      return list;
    },
    outData() {
      let list = [];
      for (let i = 0; i < this.outDataLen; i++) {
        list.push({
          name: `输出${i + 1}`,
          fluency: Math.fround(50) + 50
        });
      }
      return list;
    }
  },
  mounted() {}
};
</script>

<style>
html,
body {
  padding: 0;
  margin: 0;
}
.fixed {
  position: fixed;
  top: 100px;
  left: 100px;
  z-index: 1000;
  color: #fff;
}
</style>
