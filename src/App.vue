<template>
  <div id="app">
    <zc-chart-node />
  </div>
</template>

<script>
import Vue from 'vue';
import dataView from 'zc-data-view';
Vue.use(dataView);
export default {
  name: 'App',
  mounted() {
    console.log(this);
  }
};
</script>

<style>
html,
body {
  padding: 0;
  margin: 0;
}
</style>
