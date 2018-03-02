import Vue from 'vue';
Vue.filter('simpleTime', (from, to) => {
    const date = new Date(from).getTime();
    if (!to) {
      to = new Date().getTime();
    }
    let duration = to - date;
    let suffix = '前';
    let quantity = 0,
      unit = '秒';
    if (duration < 60 * 1000) {
      unit = '刚刚';
    } else if (duration < 60 * 60 * 1000) {
      quantity = Math.round(duration / (60 * 1000));
      unit = '分钟';
    } else if (duration < 24 * 60 * 60 * 1000) {
      quantity = Math.round(duration / (60 * 60 * 1000));
      unit = '小时';
    } else if (duration < 30 * 24 * 60 * 60 * 1000) {
      quantity = Math.round(duration / (24 * 60 * 60 * 1000));
      unit = '天';
    } else if (duration < 12 * 30 * 24 * 60 * 60 * 1000) {
      quantity = Math.round(duration / (30 * 24 * 60 * 60 * 1000));
      unit = '月';
    } else {
      quantity = Math.round(duration / (365 * 24 * 60 * 60 * 1000));
      unit = '年';
    }
    if (unit === '刚刚') {
      return unit;
    }
    return quantity + unit + suffix;
  });

