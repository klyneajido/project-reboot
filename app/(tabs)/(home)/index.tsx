import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import AMTodoItem from "./AMTodoItem";
import GeneralTodoItem from "./GeneralTodoItem";
import PMTodoItem from "./PMTodoItem";

export default function Home() {
  const [generalTasks, setGeneralTasks] = useState([
    { id: 1, text: "Exercise", completed: false },
    { id: 2, text: "Read a Book (10-minute minimum)", completed: false },
    { id: 3, text: "Drink Half a Gallon of Water (at least 1.9L)", completed: false },
    { id: 4, text: "Practice Coding (1+ hour)", completed: false },
    { id: 5, text: "Work on Coding Project or Challenges", completed: false },
  ])
  const [AMtasks, setAMTasks] = useState([
    { id: 6, text: "Wake up by 6:00 AM", completed: false },
    { id: 7, text: "Do 100 Push-ups (or progress version)", completed: false },
    { id: 8, text: "10–15 min Light Morning Exercise (walk/yoga/stretch)", completed: false },
    { id: 9, text: "5–10 Minute Meditation", completed: false },
    { id: 10, text: "Write 3 Things You're Grateful For", completed: false },
  ]);

  const [PMtasks, setPMTasks] = useState([
    { id: 11, text: "Journal (Evening Reflection)", completed: false },
    { id: 12, text: "Mindfulness / No Social Media after 11 PM", completed: false },
    { id: 13, text: "Sleep by 12:00 PM", completed: false }
  ])

  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000)
    return () => clearInterval(interval)
  }, []);

  function AMToggleCompleted(id) {
    setAMTasks(AMtasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  function PMToggleCompleted(id) {
    setPMTasks(PMtasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  function generalToggleCompleted(id) {
    setGeneralTasks(generalTasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  return (
    <ScrollView className="container">
      <View className="header px-3 pt-5">
        <Text className="text-lg">Welcome to Project Reboot</Text>
        <Text className="text-md"> {currentDate.toDateString()}</Text>
      </View>
      {/* GENERAL TASKS */}
      <View className="px-3 pt-5">
        <Text className="text-md">GENERAL TASKS</Text>
        {generalTasks.map(task =>
          <View key={task.id} className="flex justify-center ">
            <GeneralTodoItem
              task={task}
              generalToggleCompleted={generalToggleCompleted}
            />
          </View>
        )}
      </View>

      {/* AM TASKS */}
      <View className="px-3 pt-5">
        <Text className="text-md">AM TASKS</Text>
        {AMtasks.map(task =>
          <View key={task.id} className="flex justify-center ">
            <AMTodoItem
              task={task}
              AMToggleCompleted={AMToggleCompleted}
            />
          </View>
        )}
      </View>

      {/* PM TASKS */}
      <View className="px-3 pt-5">
        <Text className="text-md">PM TASKS</Text>
        {PMtasks.map(task =>
          <View key={task.id} className="flex justify-center ">
            <PMTodoItem
              task={task}
              PMToggleCompleted={PMToggleCompleted}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
}

