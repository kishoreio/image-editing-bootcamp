import React from "react";
import style from "./card.module.css";

const Card = ({ imageData, updateTaskScore }) => {
  return imageData.map((data) => {
    return (
      <div className={style.card} key={data.id}>
        <img src={data.imgUrl} alt="a logo" className={style.image} />
        <div className={style.details}>
          <p>Task Id: {data.taskId}</p>
          <p>Edited By: {data.editedBy}</p>
        </div>
        <div className={style.rating}>
          <div className={style.slider}>
            <span>Move the slider to rate the image</span>
            <input
              type="range"
              min="1"
              max="10"
              step="1"
              value={data.score}
              onChange={(e) => updateTaskScore(e, data.id)}
            />
          </div>
          <p className={style.score}>{data.score}</p>
        </div>
      </div>
    );
  });
};

export default Card;
