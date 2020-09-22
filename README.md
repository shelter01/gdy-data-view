# @gdyfe/data-view

中传数据大屏

- [x] 全链路监看

## 安装

- npm 安装

```bash
npm install @gdyfe/data-view
```

- yarn 安装

```
yarn add @gdyfe/data-view
```

## 引入

```javascript
// 将自动注册所有组件为全局组件
import dataView from '@gdyfe/data-view';
Vue.use(dataView);
```

## 按需引入

```javascript
// 将自动注册所有组件为全局组件
import { chartNode } from '@gdyfe/data-view';
Vue.use(chartNode);
```

## 使用

```html
<gdy-chart-node
  :title="title"
  :lcpsInfo="lcpsInfo"
  :inData="inData"
  :outData="outData"
  :countNode="countNode"
  :errorNode="errorNode"
/>
```

### title 属性

类型`String` 右上角大屏名称

| 属性  |    说明    |   类型   | 可选值 |    默认值    |
| :---: | :--------: | :------: | :----: | :----------: |
| title | 左上角名称 | `String` |  ---   | `全链路监看` |

### lcpsInfo 属性

类型`Object` 导播台参数 名称

| 属性 | 说明 |   类型   | 可选值 | 默认值 |
| :--: | :--: | :------: | :----: | :----: |
| name | 名称 | `String` |  ---   | `lcps` |

### inData 属性

类型`Array` 输入列表

|  属性   |  说明  |   类型   | 可选值 | 默认值 |
| :-----: | :----: | :------: | :----: | :----: |
|  name   |  名称  | `String` |  ---   | `信源` |
| fluency | 流畅度 | `Number` |  ---   |  `-`   |

### outData 属性

类型`Array` 输出列表

|  属性   |  说明  |   类型   | 可选值 | 默认值 |
| :-----: | :----: | :------: | :----: | :----: |
|  name   |  名称  | `String` |  ---   | `输出` |
| fluency | 流畅度 | `Number` |  ---   |  `-`   |

### countNode 属性

类型`Number` 总节点数

|   属性    |   说明   |   类型   | 可选值 | 默认值 |
| :-------: | :------: | :------: | :----: | :----: |
| countNode | 总节点数 | `Number` |  ---   |  `0`   |

### errorNode 属性

类型`Number` 异常节点数

|   属性    |    说明    |   类型   | 可选值 | 默认值 |
| :-------: | :--------: | :------: | :----: | :----: |
| errorNode | 异常节点数 | `Number` |  ---   |  `0`   |
