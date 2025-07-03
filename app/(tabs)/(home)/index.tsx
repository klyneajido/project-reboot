import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import TodoItem from "./TodoItem";

type Task = {
  id: number;
  text: string;
  completed: boolean;
  category: "am" | "pm" | "general" | "additional";
}

const defaultTasks: Task[] = [
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
];



export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [input, setInput] = useState("");

  const addItem = () => {
    if (input !== "") {
      const newTask: Task = {
        id: Date.now(),
        text: input,
        completed: false,
        category: "additional"
      };
      const updatedTasks = tasks.concat(newTask);
      setTasks(updatedTasks);
      saveTasks(updatedTasks);
      setInput("");
    }
  };

  const categories: { key: string; title: string }[] = [
    { key: "general", title: "General Tasks" },
    { key: "am", title: "AM Tasks" },
    { key: "pm", title: "PM Tasks" },
    { key: "additional", title: "Additional Tasks" },
  ];

  const saveTasks = async (tasks: Task[]) => {
    try {
      const jsonValue = JSON.stringify(tasks);
      await AsyncStorage.setItem('@tasks', jsonValue);
    } catch (e) {
      console.log("Error in saving tasks:", e);
    }
  };

  const loadTasks = async (): Promise<Task[]> => {
    try {
      const jsonValue = await AsyncStorage.getItem('@tasks');
      return jsonValue ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.error('Error loading tasks:', e);
      return [];
    }
  };

  const initializeTasks = async () => {
    const today = new Date().toISOString().slice(0, 10);
    const lastOpened = await AsyncStorage.getItem('@lastOpenedDate');

    if (lastOpened !== today) {
      // New day — reset tasks
      const resetTasks = defaultTasks.map(task => ({ ...task, completed: false }));
      setTasks(resetTasks);
      await saveTasks(resetTasks);
      await AsyncStorage.setItem('@lastOpenedDate', today);
    } else {
      const savedTasks = await loadTasks();
      setTasks(savedTasks.length ? savedTasks : defaultTasks);
    }
  };

  useEffect(() => {
    initializeTasks();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (tasks.length === 0) return;

    const updateCompletedDays = async () => {
      const today = new Date().toISOString().slice(0, 10);
      // const allCompleted = tasks.every(task => task.completed);
      const completedCount = tasks.filter(task => task.completed).length;
      const percentage = completedCount / (defaultTasks.length)

      try {
        const jsonValue = await AsyncStorage.getItem("@completedDays");
        const completedDays = jsonValue ? JSON.parse(jsonValue) : {};
        completedDays[today] = percentage;

        await AsyncStorage.setItem('@completedDays', JSON.stringify(completedDays));
      } catch (e) {
        console.log('Error updating completed day:', e);
      }
    };

    updateCompletedDays();
  }, [tasks]);

  function toggleCompleted(id: number) {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  }

  return (
    <SafeAreaView className='flex-1 bg-background'>
      <ScrollView className="py-10 pb-56 bg-background px-7" contentContainerStyle={{ paddingBottom: 50 }}>
        <View className="my-10">
          <Text className="mt-4 text-3xl font-semibold font-exo text-accent">Project Reboot</Text>
          <Text className="text-sm font-semibold font-exo text-accent">{currentDate.toDateString()}</Text>
        </View>

        {categories.map(({ key, title }) => {
          const tasksByCategory = tasks.filter(task => task.category === key);
          return (
            <Section key={key} title={title}>
              {tasksByCategory.map(task => (
                <TodoItem key={task.id} task={task} toggleCompleted={toggleCompleted} />
              ))}
            </Section>
          );
        })}
      </ScrollView>
      {/* Input */}
      <View className='flex-row items-center justify-center gap-3 p-4 mx-4 shadow-sm bg-background '>
      <TextInput
        placeholder='Add a new task'
        value={input}
        onChangeText={setInput}
        className='flex-1 px-4 py-3 text-base bg-white border border-gray-300 rounded-lg focus:border-gray-500'
        placeholderTextColor='#9ca3af'
      />
      <TouchableOpacity 
        onPress={addItem}
        className='px-5 py-3 bg-gray-600 rounded-lg active:bg-gray-700'
      >
        <Text className='text-base font-medium text-white'>Add</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="px-4 py-3 mb-6 rounded-xl bg-surface">
      <Text className="mb-3 text-lg font-semibold uppercase text-accent font-exo">{title}</Text>
      <View className="space-y-2">
        {children}
      </View>
    </View>
  );
}
