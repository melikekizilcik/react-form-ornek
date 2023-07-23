/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./App.css";
import TaskCreate from "./Components/TaskCreate";
import TaskList from "./Components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);

  const createTask = (title, taskDesc) => {
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

  const deleteTaskById = (id) => {
    const afterDeletingTasks = tasks.filter((task) => {
      return task.id !== id; //gönderdiğimiz id olmayan id'ye sahip olanları dönecek
    });
    setTasks(afterDeletingTasks); //yeni array oluşturuldu
  };

  const updateTaskById = (id, updatedTitle, updatedTaskDesc) => {
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
