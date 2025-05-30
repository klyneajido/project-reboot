import { useEffect, useRef, useState } from "react";
import { Button, Text, View } from "react-native";

export default function Timer() {
    const time = 600
    const [seconds, setSeconds] = useState(time);
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


    return (
        <View className="container h-full ">
            <Text className="text-lg text-center mt-10">Read a Book</Text>
            <View className=" h-full flex items-center justify-center">
                <View className="container bg-slate-500 rounded-md w-80 h-11/12 flex justify-center items-center">
                  <View className=" rounded-md bg-slate-300 py-10 w-72 mt-3">
                      <Text className=" text-xl text-center">{formatTime(seconds)}</Text>
                  </View>
                    <View className=" p-2 space-x-2 flex-row items-center justify-center w-72">
                        <View className="flex-1">
                            <Button title="Start" onPress={handleStart} />
                        </View>
                        <View className="flex-1">
                            <Button title="Stop" onPress={handleStop} />
                        </View>
                        <View className="flex-1">
                            <Button title="Reset" onPress={handleReset} />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}