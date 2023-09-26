import React from "react";
import { useState } from "react";
import "./TDL.css";

function TDL() {
  const [userInput, setUserInput] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(0);

  const deleteTask = (id) => {
    let result = taskList.filter((elem) => elem.id !== id);
    setTaskList(result);
  };
  const editTask = (id) => {
    setEditMode(true);
    setEditId(id);
    let editableTask = taskList.find((elem) => elem.id === id);
    setUserInput(editableTask.value);
  };
  return (
    <div className="app_container">
      <div className="tasks_container">
        {taskList.map((item, index) => {
          return (
            <div key={index} className="task_item">
              <p>{item.value}</p>
              <button
                onClick={() => {
                  editTask(item.id);
                }}
                className="task_item_edit"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  deleteTask(item.id);
                }}
                className="task_item_delete"
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
      <div className="input_box">
        <input
          value={userInput}
          onChange={(e) => {
            setUserInput(e.target.value);
          }}
        />
              <button onClick={() => {
                  if (editMode === true) {
                      let updatedArray = [...taskList];
                      updatedArray.find((elem) => elem.id === editId).value = userInput;
                      setTaskList(updatedArray);
                      setUserInput("");
                      setEditId(0);
                      setEditMode(false);
                  }
                  else {
                      if (userInput !== "") {
                          let newTask = {
                              id: Math.random(),
                              value: userInput
                          };
                          let copyOfTaskList = [...taskList];
                          copyOfTaskList.push(newTask);
                          setTaskList(copyOfTaskList);
                          setUserInput("");
                      }
                  }
              }}>
                  {editMode===true ?"Edit task":"Add task"}
                  
        </button>
      </div>
    </div>
  );
}

export default TDL;
