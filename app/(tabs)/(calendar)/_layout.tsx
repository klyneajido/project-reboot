import { Stack } from "expo-router";
import { View } from "react-native";

export default function CalendarLayout() {
    return(
        <View>
            <Stack screenOptions={{headerShown:false}}>
                <Stack.Screen name="index"/>
            </Stack>
        </View>
    );
}