/* eslint-disable react/prop-types */
import TaskCard from "./TaskCard";

function TaskList({ tasks, onDelete, onUpdate }) {
  //arrayi bastırmak için map
  return (
    <div className="task-lists">
      {tasks.map((task, index) => {
        {
          /* arrayin içindeki bir tane taska erişmek için (task) tanımladık */
        }
        return (
          <TaskCard
            key={index}
            task={task}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        );
      })}
    </div>
  );
}

export default TaskList;
