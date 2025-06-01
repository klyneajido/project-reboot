import CheckBox from "expo-checkbox";
import React from "react";
import { Text, View } from "react-native";

export default function AMTodoItem({task, AMToggleCompleted}) {
    return (
        <View className="flex flex-row items-center  bg-gray-200 space-x-2  my-1 p-2 rounded-md">
            <CheckBox
                value={task.completed}
                onValueChange={() => AMToggleCompleted(task.id)}
                className="mr-3"
            />
            <Text className="font-exo" style={{ textDecorationLine: task.completed ? 'line-through' : 'none' }}>
                {task.text}
            </Text>
        </View>
    );
}