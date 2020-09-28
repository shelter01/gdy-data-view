/**
 * EXPORT COMPONENTS
 */
export { default as chartNode } from '@/components/chartNode/index';
export { default as routeMonitor } from '@/components/routeMonitor/index';
export { default as routeMonitorItem } from '@/components/routeMonitorItem/index';

/**
 * IMPORT COMPONENTS
 */
import chartNode from '@/components/chartNode/index';
import routeMonitor from '@/components/routeMonitor/index';
import routeMonitorItem from '@/components/routeMonitorItem/index';

/**
 * USE COMPONENTS
 */
export default function(Vue) {
  Vue.use(chartNode);
  Vue.use(routeMonitor);
  Vue.use(routeMonitorItem);
}
