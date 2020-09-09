<template>
  <div id="app">
    <chart-node />
  </div>
</template>

<script>
import chartNode from '@/components/chart-node/index.vue';

export default {
  name: 'App',
  components: {
    chartNode
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
