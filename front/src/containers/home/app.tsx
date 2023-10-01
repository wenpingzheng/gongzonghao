// src/containers/home/app.tsx
import React, { MutableRefObject, useRef, useEffect } from 'react';
import Text from './components/text';
import axios from 'axios';
// import RefPre from './components/ref-pre';
// import { TestInput, DestInput } from './components/ref-input';
// import Banner from './assets/images/banner.png';
import './styles/index.scss';

import { CommonContext } from './data';

// const init = {
//   a: 1,
//   b: 2,
// };

export default () => {
  // const inputEl: MutableRefObject<any> = useRef(null);
  // const onButtonClick = () => {
  // console.log('对象', inputEl.current.getType()); // <input type="text" id="sss">
  // inputEl.current.focus();
  // console.log(typeof inputEl.current);
  // };

  useEffect(() => {
    const url = encodeURIComponent(location.href.split('#')[0]);
    axios.get(`/jsapi?url=${url}`).then((result) => {
      console.log(result, 'result');
      wx.config({
        debug: true,
        ...result.data,
        jsApiList: ['scanQRCode'], // 需要使用的JS接口列表
      });
    });
  }, []);

  return (
    <div>
      <CommonContext.Provider value={{ articleId: '333' }}>
        {/* <RefPre /> */}
        <Text />
        {/* <TestInput ref={inputEl} id="sss"/> */}
        {/* <DestInput ref={inputEl} id='sss' /> */}
        {/* <button onClick={onButtonClick}>Focus the input</button>
        <p>Hello, This2 is pages!222222222222222</p> */}
        {/* <img src={Banner} alt='' /> */}
      </CommonContext.Provider>
    </div>
  );
};
