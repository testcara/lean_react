import React, { useState } from "react";

/*
useState本身是个函数，有参数和返回值
调用useState返回的是一个数组。
第一个元素是当前的状态。
第二个元素是一个函数，这个函数的作用是去修改和设置我们的状态。
*/

function HookCounter() {
  const arr = useState(0);
  const state = arr[0];
  // changeState可以替换成任意名
  const changeState = arr[1];
  return (
    <div>
      {state}
      <button onClick={() => changeState(state + 1)}>+1</button>
    </div>
  );
}

export default HookCounter;
