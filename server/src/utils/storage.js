
// Created by WpZheng

// add  => ({ key1: value1, key2: value2 }) - 添加
// find => ({ key, value }) - 查找
// update => (objectId, { key: value }) - 更新

import AV from 'leancloud-storage';
import config from '../../config/config.json';

const { appId, appKey, serverURL } = config.storage;

// 初始化
AV.init({ appId, appKey, serverURL });

class Db {
  constructor(props) {
    const { dbname } = props;
    this.dbname = dbname;
    this.dbSet = new AV.Object(dbname);
    this.dbGet = new AV.Query(dbname);
    this.fdGet = new AV.Query(dbname);
    return this;
  }

  // 存储数据
  async save(dbObject, props) {
    const dbsKeys = Object.keys(props);
    if (dbsKeys.length) {
      dbsKeys.forEach((a) => {
        dbObject.set(a, props[a]);
      })
    }
    await dbObject.save();
  }

  // 添加数据
  async add(dbs = {}) {
    const { dbSet } = this;
    try {
      await this.save(dbSet, dbs);
    } catch(error) {
      console.log(`保存数据出现错误：${error}`);
    }
  }

  // 更新数据
  async update(objectId, updateProps = {}) {
    const { dbname } = this;
    try {
      const tmpDb = AV.Object.createWithoutData(dbname, objectId);
      await this.save(tmpDb, updateProps);
    } catch (error) {
      console.log(`更新数据出现错误：${error}`);
    }
  }

  // 查找数据
  async find(key, value) {
    const { dbGet } = this;
    try {
      dbGet.equalTo(key, value);
      const adata = await dbGet.first();
      return adata.toJSON();
    } catch(error) {
      console.log(`查找数据出现错误：${error}`);
    }
  }

  // 多条件查询
  async findByConditions(ovalue, kvalue) {
    const { dbGet, fdGet } = this;
    try {
      dbGet.equalTo('kid', kvalue);
      fdGet.equalTo('openid', ovalue);
      const query = AV.Query.and(dbGet, fdGet);
      const adata = await query.first();
      return adata.toJSON();
    } catch (error) {
      console.log(`多条件查询数据出现错误：${error}`);
    }
  }
};

export { Db }