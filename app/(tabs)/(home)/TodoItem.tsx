import CheckBox from "expo-checkbox";
import React from "react";
import { Text, View } from "react-native";

export default function TodoItem({task, toggleCompleted}) {
    return (
        <View>
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