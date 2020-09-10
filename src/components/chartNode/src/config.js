const linesFluency = {
  color: 'rgb(23, 91, 187)',
  orbitColor: 'rgb(23, 91, 187,0.5)',
  width: 2
};
const linesDisfluency = {
  color: 'rgb(234, 94, 94)',
  orbitColor: 'rgb(234, 94, 94,0.5)',
  width: 2
};
const pointsEndFluency = (len = 4) => {
  let ratio = 4 / len > 1 ? 1 : 4 / len;
  let width = 14 * ratio;
  let height = 14 * ratio;
  return {
    icon: {
      show: true,
      width: width,
      height: height,
      src: require('./img/icon-dian.png')
    }
  };
};
const pointsEndDisfluency = (len = 4) => {
  let ratio = 4 / len > 1 ? 1 : 4 / len;
  let width = 14 * ratio;
  let height = 14 * ratio;
  return {
    icon: {
      show: true,
      width: width,
      height: height,
      src: require('./img/icon-dian-dis.png')
    }
  };
};
const pointsInFluency = (len = 4) => {
  let ratio = 4 / len > 1 ? 1 : 4 / len;
  let width = 120 * ratio;
  let height = 100 * ratio;
  let fontSize = 21 * ratio;
  let offsetY = 70 * ratio;
  return {
    icon: {
      show: true,
      width: width,
      height: height,
      src: require('./img/icon-in.png')
    },
    text: {
      show: true,
      color: '#fff',
      fontSize: fontSize,
      offset: [0, offsetY]
    }
  };
};
const pointsInDisfluency = (len = 4) => {
  let ratio = 4 / len > 1 ? 1 : 4 / len;
  let width = 120 * ratio;
  let height = 100 * ratio;
  let fontSize = 21 * ratio;
  let offsetY = 70 * ratio;
  return {
    icon: {
      show: true,
      width: width,
      height: height,
      src: require('./img/icon-in-dis.png')
    },
    text: {
      show: true,
      color: '#EA5E5E',
      fontSize: fontSize,
      offset: [0, offsetY]
    }
  };
};
const pointsOutFluency = (len = 4) => {
  let ratio = 4 / len > 1 ? 1 : 4 / len;
  let width = 120 * ratio;
  let height = 100 * ratio;
  let fontSize = 21 * ratio;
  let offsetY = 70 * ratio;
  return {
    icon: {
      show: true,
      width: width,
      height: height,
      src: require('./img/icon-out.png')
    },
    text: {
      show: true,
      color: '#fff',
      fontSize: fontSize,
      offset: [0, offsetY]
    }
  };
};
const pointsOutDisfluency = (len = 4) => {
  let ratio = 4 / len > 1 ? 1 : 4 / len;
  let width = 120 * ratio;
  let height = 100 * ratio;
  let fontSize = 21 * ratio;
  let offsetY = 70 * ratio;
  return {
    icon: {
      show: true,
      width: width,
      height: height,
      src: require('./img/icon-out-dis.png')
    },
    text: {
      show: true,
      color: '#EA5E5E',
      fontSize: fontSize,
      offset: [0, offsetY]
    }
  };
};
export default {
  linesFluency,
  linesDisfluency,
  pointsEndFluency,
  pointsEndDisfluency,
  pointsInFluency,
  pointsInDisfluency,
  pointsOutFluency,
  pointsOutDisfluency
};
