import React, { useState } from "react";
import { jsonData } from "../../data/jsonData";
import Card from "./Card";
import style from "./scoring.module.css";
import search from "../../Resources/search.svg";

const ScoringTask = () => {
  let data = null;
  // checking for data stored in local storage
  if (localStorage.getItem("scoreData") !== null) {
    // if present assigned to data variable
    data = JSON.parse(localStorage.getItem("scoreData"));
  } else {
    // otherwise default data is used i.e imported json data
    data = jsonData;
  }

  const [imageData, setImageData] = useState("");
  const [taskId, setTaskId] = useState("");

  //  Filters data based on task id given on search box
  const filterData = (id) => {
    if (id === "" || isNaN(id)) {
      alert("Invalid Id. Check Again");
      return;
    }
    const filteredData = data.filter((item) => {
      return +item.taskId === +id;
    });
    // filtered data is updated and displayed.
    setImageData(filteredData);
  };

  const updateTaskScore = (e, id) => {
    const updatedData = imageData.map((data) => {
      if (data.id === id) {
        return { ...data, score: e.target.value };
      }
      return data;
    });
    // updated task score is stored in local storage
    localStorage.setItem("scoreData", JSON.stringify(updatedData));
    setImageData(updatedData);
  };

  return (
    <section className={style.container}>
      <div className={style.search}>
        <input
          type="number"
          placeholder="Enter a task id to display images"
          value={taskId}
          onChange={(e) => setTaskId(e.target.value)}
        />
        <button type="button" onClick={() => filterData(taskId)}>
          Click
        </button>
      </div>
      <div className={style.images}>
        {imageData.length === 0 ? (
          <div className={style.empty}>
            <img src={search} alt="search" />
            <h2>No results, Please enter a task id</h2>
          </div>
        ) : (
          <Card imageData={imageData} updateTaskScore={updateTaskScore} />
        )}
      </div>
    </section>
  );
};

export default ScoringTask;
