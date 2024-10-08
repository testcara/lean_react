import React, { useState, useEffect } from "react";

function UseEffect() {
  const [count, setCount] = useState(0);
  /*
  useEffect第一次加载和每次render之后都会执行。
   */
  useEffect(() => {
    // 反引号定义字符串
    document.title = `你点击了${count}次`;
  });

  return (
    <div>
      <p>你点击了{count}</p>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        +1
      </button>
    </div>
  );
}

export default UseEffect;
