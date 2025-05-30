import Checkbox from "expo-checkbox";
import { Text, View } from "react-native";

export default function PMTodoItem({task,PMToggleCompleted}){
    return(
        <View className="flex flex-row items-center  bg-gray-200 space-x-2  my-1 p-2 rounded-md">
            <Checkbox
                value={task.completed}
                onValueChange={() => PMToggleCompleted(task.id)}
            />
            <Text style={{textDecorationLine: task.completed ? 'line-through' : 'none'}}>
                {task.text}
            </Text>
        </View>
    )
}