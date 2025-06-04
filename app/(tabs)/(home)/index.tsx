  import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
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
      { id: 8, text: "10–15 min Light Morning Exercise", completed: false },
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
      <SafeAreaView style={{ flex: 1 }} >
      <ScrollView className=" bg-background px-7 py-10 pb-56" contentContainerStyle={{ paddingBottom: 50 }}>
        <View className="mb-6">
          <Text className="text-3xl font-exo font-semibold text-accent file:mt-20">Project Reboot</Text>
          <Text className="text-sm font-exo font-semibold text-accent"> {currentDate.toDateString()}</Text>
        </View>

        {/* GENERAL TASKS */}
        <Section title="General Tasks">
          {generalTasks.map((task) => (
            <GeneralTodoItem
              key={task.id}
              task={task}
              generalToggleCompleted={generalToggleCompleted} />
          ))}
        </Section>

        {/* AM TASKS */}
        <Section title="AM Tasks">
          {AMtasks.map((task) => (
            <AMTodoItem
              key={task.id}
              task={task}
              AMToggleCompleted={AMToggleCompleted} />
          ))}
        </Section>

        <Section title="PM Tasks" >
          {PMtasks.map((task) => (
            <PMTodoItem
              key={task.id}
              task={task}
              PMToggleCompleted={PMToggleCompleted} />
          ))}
        </Section>
        
      </ScrollView>
      </SafeAreaView>
    );
  }
  
  function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
      <View className="mb-6 rounded-xl bg-surface px-4 py-3">
        <Text className="text-accent font-semibold text-lg font-exo uppercase mb-3">
          {title}
        </Text>
        <View className="space-y-2">
          {children}
        </View>
      </View>
    );
  }