import React, { MutableRefObject, useRef } from 'react';

export default () => {
  const inputRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const onButtonClick = () => {
    // if (inputRef.current) {
    //   inputRef.current.focus();
    // }
    wx.scanQRCode({
      needResult: 0,
      scanType: ['qrCode', 'barCode'],
      success: (res: { resultStr: any }) => {
        console.log(res.resultStr);
      },
    });
  };
  return (
    <>
      <input ref={inputRef} type='text' />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
};
