import Checkbox from "expo-checkbox";
import { Text, View } from "react-native";

export default function TodoItem({task, toggleCompleted}){
    return(
        <View className="flex flex-row items-center  bg-gray-200 space-x-2  my-1 p-2 rounded-md">
            <Checkbox
            value={task.completed}
            onValueChange={() => toggleCompleted(task.id)}
            className="mr-3"
            color={task.completed ? '#2b2d42' : undefined}
            />
            <Text className="font-exo flex-shrink text-wrap" style={{textDecorationLine: task.completed ? 'line-through' : 'none'}}>{task.text}</Text>
        </View>
    );
}