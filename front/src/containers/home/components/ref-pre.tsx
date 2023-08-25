import React, { useEffect, useRef, useState, useContext } from 'react';
import { CommonContext } from '../data';

export default () => {
  const [count, setCount] = useState(10);
  console.log('==点击执行==', count);
  const prevCountRef = useRef(count); // 点击时 不执行 还是原来{current: 0}
  const { articleId } = useContext(CommonContext);
  // prevCountRef.current = count; // 放这里 同时出
  // setTimeout(() => {
  //   prevCountRef.current = count;
  // }, 4000);
  // console.log(prevCountRef, 'prevCountRef======');
  const prevCount = prevCountRef.current;
  // const onchange = () => {
  //   prevCountRef.current = 100;
  // }
  prevCountRef.current = count; // 放这里 未来出
  useEffect(() => {
    prevCountRef.current = count;
    console.log('useeffect');
  }, [count]); // 1. []时 只有初使化时执行 2. 没有时 任意都执行 3. [count] 只有count变化时才触发
  console.log('return');
  return (
    <div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        加1
      </button>
      {/* <p>count: {count}</p> */}
      <h2>{articleId}</h2>
      <p>prevCount: {prevCount}</p>
    </div>
  );
};
