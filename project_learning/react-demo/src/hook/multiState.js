import React, { useState } from "react";

function App() {
  const [star, setStar] = useState(["杨幂", "娜扎"]);
  const [obj, setObj] = useState({ name: "casey", job: "doctor" });
  return (
    <div>
      <ul>
        {star.map((item) => {
          return <li key={item}>{item}</li>;
        })}
      </ul>
      <button onClick={() => setStar([...star, "cara"])}>add star</button>
      <p>
        {obj.name} is one {obj.job}
      </p>
      <button onClick={() => setObj({ ...obj, age: "18" })}>show age</button>
      {obj.age}
    </div>
  );
}

export default App;
