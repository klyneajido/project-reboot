import { Stack } from "expo-router";
import { View } from "react-native";

export default function TimerLayout(){
  return(
<View className="flex-1 h-full">
      <Stack screenOptions={{headerShown:false}}>
        <Stack.Screen name="index"/>
    </Stack>
</View>
  );   
}