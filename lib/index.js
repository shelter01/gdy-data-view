/**
 * EXPORT COMPONENTS
 */
export { default as chartNode } from './components/chartNode/index';

/**
 * IMPORT COMPONENTS
 */
import chartNode from './components/chartNode/index';
/**
 * USE COMPONENTS
 */
export default function(Vue) {
  Vue.use(chartNode);
}
