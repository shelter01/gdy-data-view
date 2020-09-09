# @zc/data-view

中传数据大屏

- [x] 全链路监看

## 安装

- npm 安装

```bash
npm install @zc/data-view
```

- yarn 安装

```
yarn add @zc/data-view
```

## 使用

```javascript
// 将自动注册所有组件为全局组件
import dataView from '@zc/data-view';
Vue.use(dataView);
```

## 按需引入

```javascript
// 将自动注册所有组件为全局组件
import { zcChartNode } from '@zc/data-view';
Vue.use(zcChartNode);
```
