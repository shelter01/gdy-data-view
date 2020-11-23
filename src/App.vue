<template>
  <div id="app">
    <gdy-route-monitor
      :sub_key="sub_key"
      :url_list="url_list"
      :url_route="url_route"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import { routeMonitor } from '@/../lib/index.js'
// import { routeMonitor } from '@gdyfe/data-view';
Vue.use(routeMonitor)
export default {
  name: 'App',
  data() {
    return {
      sub_key: 'sub_0eb0a1a4b9a8cd57609dc641eee8e8c4',
      url_list: '//ops.aodianyun.cn/admin/dbMonitor/getCenterMediaMonitor',
      url_route: '//ops.aodianyun.cn/admin/dbMonitor/getInstanceMonitor'
    }
  },
  mounted() {}
}
</script>

<style>
html,
body {
  padding: 0;
  margin: 0;
}
</style>
