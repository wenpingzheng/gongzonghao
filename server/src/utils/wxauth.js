
import config from '../../config/config.json';
const { appId, appSecret, apiDomain, apiUrl } = config;
const { accessTokenApi, accessTicketApi } = apiUrl;

/**
 * 获取微信access_token
 * @returns { string }
 */
export const getAccessToken = () => {
  const tokenUrl = `${apiDomain}/${accessTokenApi}&appid=${appId}&secret=${appSecret}`;
  console.log('token');
}