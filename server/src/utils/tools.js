
// 生成一个随机字符串
export const createNonceStr = () => {
  return Math.random().toString(36).substr(2, 15);
}

// 生成一个时间戳
export const createTimestamp = () => {
  return parseInt(new Date().getTime() / 1000) + '';
}

