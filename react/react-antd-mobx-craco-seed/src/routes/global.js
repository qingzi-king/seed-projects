/*
 * @Descripttion: 全局配置（仅必要设成全局）
 * @Author: qingzi.wang
 * @Date: 2020-07-27 17:42:23
 */ 
import dayjs from 'dayjs';

global.G_SERVER_HOST = 'http://127.0.0.1:5000';

global.G_SYSTEM_TITLE = {
  name: '计划与任务管理平台',
  subName: '富能通重庆研发中心',
  welcome: {
    name: 'Welcome to PTR！',
    subName: '欢迎访问富能通（重庆）PTR平台'
  }
};

// 拆分url的params部分
global.G_SPLIT_URL_PARAMS = (inputValue, option) => {
  let nowUrl = window.location.pathname;
  let nowUrlArray = nowUrl.split('?')[0].split('/'); //根目录会是两个空串["",""]
  let realKeys = nowUrlArray.filter(Boolean);
  return realKeys;
};

// 时间格式化
global.G_DATE_FORMAT = (time, type, defaultValue) => {
  if (time) {
    if (type === 'fullTimes') {
      return dayjs(time).format('YYYY-MM-DD HH:mm:ss');
    } else if (type === 'fullTimeToMinute') {
      return dayjs(time).format('YYYY-MM-DD HH:mm');
    } else if (type === 'fullTimeToMini') {
      return dayjs(time).format('YYYYMMDDHHmmss');
    } else if (type === 'year') {
      return dayjs(time).format('YYYY');
    } else if (type === 'self') {
      return dayjs(time);
    } else {
      return dayjs(time).format('YYYY-MM-DD');
    }
  } else {
    return defaultValue || '/';
  }
};