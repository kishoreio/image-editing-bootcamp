import React, { useState } from "react";
import { MdCloudUpload } from "react-icons/md";
import style from "./creating-task.module.css";

const CreatingTask = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [taskData, setTaskData] = useState({
    taskId: "",
    description: "",
  });

  // creates url from the uploaded file and stored in imageUrl
  const uploadImageFile = (e) => {
    e.preventDefault();
    const data = URL.createObjectURL(e.target.files[0]);
    setImageUrl(data);
  };

  const updateTaskDetails = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const saveTaskDetails = () => {
    // validation for submit button
    if (taskData.taskId === "" && taskData.description === "") {
      // checking for empty input field values
      alert("Please fill the details");
      return;
    } else if (imageUrl === "") {
      // checking for empty image file
      alert("Please upload an image");
      return;
    }
    // new task is saved in local storage
    const storeData = JSON.stringify({ ...taskData, imageUrl });
    localStorage.setItem("task", storeData);
    // resetting the input fields
    setImageUrl("");
    setTaskData({
      taskId: "",
      description: "",
    });
    alert("Task Submitted");
  };

  const { taskId, description } = taskData;

  return (
    <section className={style.container}>
      <h1 className={style.welcome_title}>
        <span role="img" aria-label="emoji">
          👋
        </span>{" "}
        Welcome
      </h1>
      {/* Default Input File is hidden */}
      <input type="file" id="file" onChange={uploadImageFile} className={style.hidden} />
      <div className={style.upload}>
        <div className={style.colOne}>
          <h2 className={style.instruction_upload}>1. Get started by uploading a image</h2>
          {imageUrl ? (
            <img src={imageUrl} alt="editing" className={style.image} />
          ) : (
            <h1 className={style.image}>No Image Selected</h1>
          )}
          {/* Label to select the hidden file input tag */}
          <label htmlFor="file" className={style.upload_button}>
            <MdCloudUpload size="3rem" className={style.icon} />
          </label>
        </div>
        <div className={style.colTwo}>
          <h2 className={style.instruction_fill}>2. Fill out some details</h2>
          <div className={style.text}>
            <label className={style.label}>Task Id</label>
            <input
              type="number"
              name="taskId"
              value={taskId}
              placeholder="Enter the task Id"
              required
              onChange={updateTaskDetails}
              className={style.input}
            />
          </div>
          <div className={style.text}>
            <label className={style.label}>Editing Details</label>
            <textarea
              type="textarea"
              name="description"
              value={description}
              placeholder="Enter some details for editing"
              rows="6"
              required
              onChange={updateTaskDetails}
              className={style.input}
            />
          </div>
          <button onClick={saveTaskDetails} className={style.btn}>
            Submit
          </button>
        </div>
      </div>
    </section>
  );
};

export default CreatingTask;
