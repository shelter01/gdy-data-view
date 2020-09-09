# zc-data-view

中传数据大屏

- [x] 全链路监看

## 安装

- npm 安装

```bash
npm install zc-data-view
```

- yarn 安装

```
yarn add zc-data-view
```

## 引入

```javascript
// 将自动注册所有组件为全局组件
import dataView from 'zc-data-view';
Vue.use(dataView);
```

## 按需引入

```javascript
// 将自动注册所有组件为全局组件
import { chartNode } from 'zc-data-view';
Vue.use(chartNode);
```

## 使用

```html
<zc-chart-node :title="title" :inData="inData" :outData="outData" :lcpsInfo="lcpsInfo" />
```

### title 属性

类型`String`

| 属性 |    说明    |   类型   | 可选值 |    默认值    |
| :--: | :--------: | :------: | :----: | :----------: |
| name | 左上角名称 | `String` |  ---   | `全链路监看` |

### inData 属性

类型`Array`

|  属性   |  说明  |   类型   | 可选值 | 默认值 |
| :-----: | :----: | :------: | :----: | :----: |
|  name   |  名称  | `String` |  ---   | `信源` |
| fluency | 流畅度 | `Number` |  ---   |  `-`   |

### outData 属性

类型`Array`

|  属性   |  说明  |   类型   | 可选值 | 默认值 |
| :-----: | :----: | :------: | :----: | :----: |
|  name   |  名称  | `String` |  ---   | `输出` |
| fluency | 流畅度 | `Number` |  ---   |  `-`   |

### lcpsInfo 属性

类型`Object`

| 属性  | 说明 |   类型   | 可选值 | 默认值 |
| :---: | :--: | :------: | :----: | :----: |
| title | 名称 | `String` |  ---   | `lcps` |
