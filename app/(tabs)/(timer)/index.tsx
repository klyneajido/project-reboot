import React, { useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const TASKS = {
    "Read a Book": 600,
    "Planks": 60,
    "Meditate": 300,
    "Code": 3600,
}

export default function Timer() {
    const [selectedTask, setSelectedTask] = useState("Meditate");
    const [time, setTime] = useState(TASKS[selectedTask]);
    const [seconds, setSeconds] = useState(TASKS[selectedTask]);
    const intervalRef = useRef(0);
    const [active, setActive] = useState<string | null>(null);


    function formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSecs = Math.floor(seconds % 60);


        return hours > 0 ? (`${hours}:${minutes}:${remainingSecs < 10 ? "0" : ""}${remainingSecs}`) : (`${minutes}:${remainingSecs < 10 ? "0" : ""}${remainingSecs}`)
    }

    useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    const handleStart = () => {
        console.log("Start button clicked ")
        if (intervalRef.current !== 0) return;

        intervalRef.current = setInterval(() => {
            setSeconds(prev => {
                if (prev <= 1) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = 0;
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const handleStop = () => {
        console.log("Stop button clicked");
        clearInterval(intervalRef.current);
        intervalRef.current = 0;
    }

    const handleReset = () => {
        setSeconds(time);
        clearInterval(intervalRef.current);
        intervalRef.current = 0;
    }

    const handleTaskChange = (task: string,) => {
        setActive(task);
        setSelectedTask(task);
        const taskTime = TASKS[task];
        setTime(taskTime);
        setSeconds(taskTime);
        clearInterval(intervalRef.current);
        intervalRef.current = 0
    }
    return (
        <View className="flex-1 justify-center items-center">

            <View className="flex flex-row gap-x-2">
                {Object.keys(TASKS).map((task) => (
                    <TouchableOpacity className={`px-4 py-2 rounded-md ${active === task ? 'border-muted border-2' : 'bg-surface'}`} key={task} onPress={() => handleTaskChange(task)}>
                        <Text className={`font-exo ${active === task ? 'text-background' : 'text-white'}`}>{task}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <Text className="font-exo font-semibold text-2xl text-center mt-10">{selectedTask}</Text>

            <View className=" flex mt-5">
                <View className="container bg-background rounded-md w-80 flex justify-center items-center shadow-black shadow-md">
                    <View className=" rounded-md bg-muted py-10 w-72 mt-3">
                        <Text className="font-exo text-5xl text-center">{formatTime(seconds)}</Text>
                    </View>
                    <View className=" py-5 space-x-2 flex-row items-center justify-center w-72">
                        <View className="flex-1  bg-surface p-2 rounded-lg">
                            <TouchableOpacity onPress={handleStart}>
                                <Text className="font-exo text-center text-white ">Start</Text>
                            </TouchableOpacity>
                        </View>
                        <View className="flex-1 bg-surface p-2 rounded-lg">
                            <TouchableOpacity onPress={handleStop}>
                                <Text className="font-exo text-center text-white">Stop</Text>
                            </TouchableOpacity>
                        </View>
                        <View className="flex-1 bg-surface p-2 rounded-lg">
                            <TouchableOpacity onPress={handleReset}>
                                <Text className="font-exo text-center text-white">Reset</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}