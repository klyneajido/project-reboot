import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import TodoItem from "./TodoItem";

type Task = {
  id: number;
  text: string;
  completed: boolean;
  category: "am" | "pm" | "general";
}

async function saveDayCompleted(dateString: string) {
  try {
    const jsonValue = await AsyncStorage.getItem('@completedDays');
    const completedDays = jsonValue ? JSON.parse(jsonValue) : {};
    completedDays[dateString] = true;
    await AsyncStorage.setItem('@completedDays', JSON.stringify(completedDays));
  }
  catch (e) {
    console.log('error saving completed day: ', e)
  }
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "Exercise", completed: false, category: "general" },
    { id: 2, text: "Read a Book (10-minute minimum)", completed: false, category: "general" },
    { id: 3, text: "Drink Half a Gallon of Water (at least 1.9L)", completed: false, category: "general" },
    { id: 4, text: "Practice Coding (1+ hour)", completed: false, category: "general" },
    { id: 5, text: "Work on Coding Project or Challenges", completed: false, category: "general" },
    { id: 6, text: "Wake up by 6:00 AM", completed: false, category: "am" },
    { id: 7, text: "Do 100 Push-ups (or progress version)", completed: false, category: "am" },
    { id: 8, text: "10–15 min Light Morning Exercise", completed: false, category: "am" },
    { id: 9, text: "5–10 Minute Meditation", completed: false, category: "am" },
    { id: 10, text: "Write 3 Things You're Grateful For", completed: false, category: "am" },
    { id: 11, text: "Journal (Evening Reflection)", completed: false, category: "pm" },
    { id: 12, text: "Mindfulness / No Social Media after 11 PM", completed: false, category: "pm" },
    { id: 13, text: "Sleep by 12:00 PM", completed: false, category: "pm" }
  ])
  const [currentDate, setCurrentDate] = useState(new Date());
  const categories: { key: string; title: string }[] = [
    { key: "general", title: "General Tasks" },
    { key: "am", title: "AM Tasks" },
    { key: "pm", title: "PM Tasks" },
  ];
  const allCompleted = tasks.every(task => task.completed)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000)
    return () => clearInterval(interval)
  }, []);

  useEffect(()=>{
    if(tasks.length === 0) return;
    const allCompleted = tasks.every(task => task.completed);
    if(allCompleted){
      const today = new Date().toISOString().slice(0,10);
      saveDayCompleted(today);
    }
  },[tasks]);

  function toggleCompleted(id: number) {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id == id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }} >
      <ScrollView className=" bg-background px-7 py-10 pb-56" contentContainerStyle={{ paddingBottom: 50 }}>
        <View className="mb-6">
          <Text className="text-3xl font-exo font-semibold text-accent file:mt-20">Project Reboot</Text>
          <Text className="text-sm font-exo font-semibold text-accent"> {currentDate.toDateString()}</Text>
        </View>

        {categories.map(({ key, title }) => {
          const tasksByCategory = tasks.filter((task) => task.category === key);
          return (
            <Section
              key={key}
              title={title}
            >
              {tasksByCategory.map((task) => (
                <TodoItem key={task.id} task={task} toggleCompleted={toggleCompleted} />
              ))}
            </Section>
          );
        })}

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