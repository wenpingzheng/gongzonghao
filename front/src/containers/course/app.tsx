// src/containers/course/app.tsx
import React, { useEffect, useState } from 'react';
import './styles/index.scss';

interface IOrderInfo {
  kid?: string;
  title?: string;
  originalPrice?: string;
  discountPrice?: string;
}
const App = () => {
  const [orderinfo, setOrderInfo] = useState<IOrderInfo>({});

  useEffect(() => {
    try {
      const confirmData = window.DATA || {};
      setOrderInfo(confirmData);
    } catch (error) {
      console.log(`解析window对象错误：${error}`);
    }
  }, []);

  const isEmpty = Object.keys(orderinfo).length === 0;
  if (isEmpty) {
    return null;
  }
  const { kid = '', title = '', originalPrice = '', discountPrice = '' } = orderinfo;
  return (
    <div className='weui-bottom-fixed'>
      <div className='weui-bottom-flex'>
        <div className='weui-intro'>
          <p className='title'>{title}</p>
          <p>
            <s>原价:￥{originalPrice}</s>
            <span>折扣价:￥{discountPrice}</span>
          </p>
        </div>
        <a href={`/api/pay/${kid}`} className='weui-button'>
          缴费
        </a>
      </div>
    </div>
  );
};

export { App };
