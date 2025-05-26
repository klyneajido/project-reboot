import CheckBox from "expo-checkbox";
import React from "react";
import { Text, View } from "react-native";

export default function TodoItem({task, toggleCompleted}) {
    return (
        <View className="flex flex-row items-center  bg-gray-200 space-x-2 mx-3 my-1 p-2 rounded-md">
            <CheckBox
                value={task.completed}
                onValueChange={() => toggleCompleted(task.id)}
            />
            <Text style={{ textDecorationLine: task.completed ? 'line-through' : 'none' }}>
                {task.text}
            </Text>
        </View>
    );
}