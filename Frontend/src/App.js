/** @format */

import React, { useEffect, useState } from "react";
import List from "./List";
import axios from "axios";

const baseURL = "http://localhost:3000/api";

const App = () => {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    axios.get(`${baseURL}/get`).then((res) => {
      console.log(res.data);
      setTasks(res.data);
    });
  }, [updateUI]);

  const addTask = () => {
    axios.post(`${baseURL}/save`, { task: input }).then((res) => {
      console.log(res.data);
      setInput("");
      setUpdateUI((prevState) => !prevState);
    });
  };

  const updateMode = (id, text) => {
    console.log(text);
    setInput(text);
    setUpdateId(id);
  };

  const updateTask = () => {
    axios.put(`${baseURL}/update/${updateId}`, { task: input }).then((res) => {
      console.log(res.data);
      setUpdateUI((prevState) => !prevState);
      setUpdateId(null);
      setInput("");
    });
  };

  return (
    <main>
      <div className="body">
        <div className="box" id="heading">
          <h1 className="text-4xl">Today</h1>
        </div>

        <div className="item">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button className="text-black" type="submit" onClick={updateId ? updateTask : addTask}>
            {updateId ? "+" : "+"}
          </button>
        </div>

        <ul>
          {tasks.map((task) => (
            <List
              key={task._id}
              id={task._id}
              task={task.task}
              setUpdateUI={setUpdateUI}
              updateMode={updateMode}
            />
          ))}
        </ul>
      </div>
    </main>
  );
};

export default App;
