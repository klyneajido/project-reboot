import { useEffect, useRef, useState } from "react";
import { Button, Text, View } from "react-native";

export default function Timer() {
    const time = 600
    const [seconds, setSeconds] = useState(time);
    const intervalRef = useRef(0);


    function formatTime(seconds) {
        const minutes = Math.floor(seconds/60);
        const remainingSecs = Math.floor(seconds % 60);
        return(`${minutes}:${remainingSecs < 10 ? "0" : ""}${remainingSecs}`)
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
        <View className="container h-full flex items-center ">
            <Text className="text-lg">Read a Book</Text>
           <View className="container bg-red-200 w-2/3 h-11/12 flex justify-center items-center">
             <Text className="text-lg">{formatTime(seconds)}</Text>
            <View className="p-2 space-x-2 flex flex-row">
                <Button title="Start" onPress={handleStart} />
                <Button title="Stop" onPress={handleStop} />
                <Button title="Reset" onPress={handleReset} />
            </View>
           </View>
        </View>
    );
}