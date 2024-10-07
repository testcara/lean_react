import React, { useState } from "react";

function ComplexState() {
  const [movies, setMovies] = useState([
    {
      id: 1,
      name: "你好，李焕英",
      price: 35,
    },
    {
      id: 2,
      name: "宝岛奇兵",
      price: 45,
    },
    {
      id: 3,
      name: "门前宝地",
      price: 56,
    },
  ]);
  function changePrice(index) {
    const moviesCopy = [...movies];
    moviesCopy[index].price += 1;
    setMovies(moviesCopy);
  }
  return (
    <div>
      <ul>
        {movies.map((item, index) => {
          return (
            <li key={item.id}>
              <span>{item.name} </span>
              <span>{item.price}</span>
              <button onClick={() => changePrice(index)}>增加票价</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ComplexState;
