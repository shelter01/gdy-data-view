<template>
  <swiper ref="mySwiper" :options="swiperOptions">
    <swiper-slide v-for="item in workList" :key="item.instanceid">
      <gdyRouteMonitorItem
        :url_route="url_route"
        :ref="item.instanceid"
        :name="item.name"
        :instanceId="item.instanceid"
      />
    </swiper-slide>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
  </swiper>
</template>

<script>
import Vue from 'vue';
import Axios from 'axios';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/swiper-bundle.css';
import Swiper2, { Navigation, Pagination } from 'swiper';
Swiper2.use([Navigation, Pagination]);
import routeMonitorItem from '../../routeMonitorItem';
Vue.use(routeMonitorItem);
import ROP from '@whzcorcd/rop-client';

export default {
  name: 'gdyRouteMonitor',
  components: {
    Swiper,
    SwiperSlide
  },
  props: {
    sub_key: {
      type: String
    },
    url_list: {
      type: String
    },
    url_route: {
      type: String
    }
  },
  data() {
    return {
      timers: {},
      ROP_rc: null,
      workList: [],
      swiperOptions: {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    }
  },
  mounted() {
    this.getList();
    this._DMSInit();
    this._makeClientId();
  },
  methods: {
    getList() {
      const curl = this.url_list;
      Axios.get(curl).then(res => {
        if (res.data && res.data.Flag === 100) {
          const { workList } = res.data.list;
          this.$nextTick(() => {
            this.workList = workList || [];
          });
        }
      });
    },
    _makeClientId() {
      this.ROP_rc.Leave();
      const clientId = 'chinaMedia' + String(Math.floor(Math.random() * 100000));
      this.ROP_rc.Enter('', this.sub_key, clientId, true);
    },
    _DMSInit() {
      this.ROP_rc = new ROP({
        ICS_ADDR: 'mqttdms.aodianyun.cn'
      });
      this.ROP_rc.On('enter_suc', () => {
        console.log('服务器连接成功');
        // 实例列表
        this.ROP_rc.Subscribe('chinaMediaMsg');
        // 全链路数据
        this.ROP_rc.Subscribe('chinaMediaFluencyMsg');
      });
      this.ROP_rc.On('publish_data', (res, topic) => {
        const data = JSON.parse(res);
        if (topic === 'chinaMediaMsg') {
          if (data.type === 'workList') {
            this.workList = data.data || [];
          }
        } else if (topic === 'chinaMediaFluencyMsg') {
          this.setNodeData(data);
        }
      });
      this.ROP_rc.On('reconnect', err => {
        console.log('重连', err);
      });
      this.ROP_rc.On('enter_fail', err => {
        console.log('服务器连接失败', err);
      });
      this.ROP_rc.On('losed', () => {
        console.log('服务器断开连接');
      });
    },
    setNodeData(data) {
      let instanceId = data.instanceId;
      if (this.$refs[instanceId] && this.$refs[instanceId][0]) {
        if (!this.timers[instanceId]) {
          this.timers[instanceId] = {
            timer: null,
            data: {}
          };
        }
        this.timers[instanceId].data = data || {};
        if (!this.timers[instanceId].timer) {
          this.timers[instanceId].timer = setTimeout(() => {
            this.$refs[instanceId][0].resetData(this.timers[instanceId].data);
            clearInterval(this.timers[instanceId].timer);
            this.timers[instanceId].timer = null;
          }, 3000);
        }
      }
    }
  },
  beforeDestroy() {
    this.ROP_rc.Leave();
  }
};
</script>
<style>
.swiper-container {
  height: 100%;
  overflow: hidden;
}
.swiper-button-prev.swiper-button-disabled,
.swiper-button-next.swiper-button-disabled {
  opacity: 0;
}
</style>
