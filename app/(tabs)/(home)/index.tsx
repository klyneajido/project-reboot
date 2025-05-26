import { useState } from "react";
import { View } from "react-native";
import TodoItem from "./TodoItem";

export default function Home() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "100 Push ups", completed: true },
    { id: 2, text: "Journal", completed: false }
  ]);

  function toggleCompleted(id) {
    setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }
  return (
    <View>
      {tasks.map(task =>
        <TodoItem
          key={task.id}
          task={task}
          toggleCompleted={toggleCompleted}
        />
      )}
    </View>
  );
}

