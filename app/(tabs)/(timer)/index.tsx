import { useEffect, useRef, useState } from "react";
import { Button, View } from "react-native";

export default function Timer() {
const [seconds, setSeconds] = useState(5);
const intervalRef = useRef(0);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

const handleStart = () => {
    console.log("Start button clicked ")
    if(intervalRef.current !== 0) return;

    intervalRef.current = setInterval(() =>{
        setSeconds(prev => {
            if(prev  <=1){
                clearInterval(intervalRef.current);
                intervalRef.current = 0;
                return 0;
            }
            return prev -1;
        });
    }, 1000);
};

const handleStop = () => {
    console.log("Stop button clicked");
    clearInterval(intervalRef.current);
}
    return (
        <View className="container flex">
        {seconds}
        <Button title="Start" onPress={handleStart}/>
        <Button title="Stop" onPress={handleStop}/>
        </View>
    );
}