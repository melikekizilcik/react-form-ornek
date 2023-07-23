/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./App.css";
import TaskCreate from "./Components/TaskCreate";
import TaskList from "./Components/TaskList";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);

  const createTask = async (title, taskDesc) => {
    const response = axios.post("http://localhost:3000/tasks", {
      title: title,
      taskDesc,
    });

    console.log(response);

    const createdTasks = [
      ...tasks,
      {
        //yeni task oluşturuluyor
        id: Math.round(Math.random() * 9999999), //rastgele değer atama
        title: title,
        taskDesc, //key ve value birbirine eşit ise böyle yazılabilir
      },
    ];
    setTasks(createdTasks); //yeni array'i set etme
  };

  const fetchTasks = async () => {
    const response = await axios.get("http://localhost:3000/tasks");
    setTasks(response.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const deleteTaskById = async (id) => {
    await axios.get(`http://localhost:3000/tasks/${id}`);
    const afterDeletingTasks = tasks.filter((task) => {
      return task.id !== id; //gönderdiğimiz id olmayan id'ye sahip olanları dönecek
    });
    setTasks(afterDeletingTasks); //yeni array oluşturuldu
  };

  const updateTaskById = async (id, updatedTitle, updatedTaskDesc) => {
    await axios.put(`http://localhost:3000/tasks/${id}`, {
      title: updatedTitle,
      taskDesc: updatedTaskDesc,
    });
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { id, title: updatedTitle, taskDesc: updatedTaskDesc };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <TaskCreate onCreate={createTask} />
      <h1>Görevler</h1>
      <TaskList
        tasks={tasks}
        onDelete={deleteTaskById}
        onUpdate={updateTaskById}
      />
      {/* oluşturduğumuz task arrayini göndermek için props */}
    </div>
  );
}

export default App;
