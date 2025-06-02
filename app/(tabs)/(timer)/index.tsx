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


    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSecs = Math.floor(seconds % 60);
        return (`${minutes}:${remainingSecs < 10 ? "0" : ""}${remainingSecs}`)
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

    const handleTaskChange = (task: string) => {
        setSelectedTask(task);
        const taskTime = TASKS[task];
        setTime(taskTime);
        setSeconds(taskTime);
        clearInterval(intervalRef.current);
        intervalRef.current = 0
    }
    return (
        <View className="container h-full flex items-center mt-5">
            <View className="flex flex-row space-x-1">
                {Object.keys(TASKS).map((task) => (
                    <TouchableOpacity className="bg-surface p-3 rounded-md" key={task} onPress={() => handleTaskChange(task)}>
                        <Text className="font-exo text-white">{task}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <Text className="font-exo font-semibold text-2xl text-center mt-10">{selectedTask}</Text>
            <View className=" h-full flex items-center justify-center">
                <View className="container bg-background rounded-md w-80 h-11/12 flex justify-center items-center">
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