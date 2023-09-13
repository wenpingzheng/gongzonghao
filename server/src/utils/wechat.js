
// Created by WpZheng

// 公众号相关方法

import axios from 'axios';
import * as utils from '../utils';
import { getWxToken } from './wxauth';
import config from '../../config/config.json';

const { apiDomain } = config;

// 菜单列表
const menuList = {
  button: [
    {
      name: '上课报名',
      type: 'view',
      url: 'https://xiaozhenggms.cn/'
    },
    {
      name: '好课推荐',
      type: 'view',
      url: 'https://xiaozhenggms.cn/home'
    },
    {
      name: '我的中心',
      sub_button: [
        {
          name: '资料下载',
          type: 'click',
          key: 'download'
        },{
          name: '我的课程',
          type: 'view',
          url: 'https://xiaozhenggms.cn/page/git-learn/1'
        }
      ]
    }
  ]
}

// APIS
const api = {
  menu: {
    create: `${apiDomain}/menu/create?`,
    del: `${apiDomain}/menu/delete?`,
  }
};

export class Wechat {
  constructor(opts) {
    this.access_token = '';
  }
  async createMenu() {
    this.access_token = await getWxToken();
    // await this.deleteMenu();
    const res = await utils.requestPost(`${api.menu.create}access_token=${this.access_token}`, JSON.stringify(menuList));
    return res;
  }
  async deleteMenu() {
    await axios.get(`${api.menu.del}access_token=${this.access_token}`);
  }
}