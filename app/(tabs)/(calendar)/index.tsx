import { View } from "react-native";
import { Calendar } from 'react-native-calendars';


export default function Kalendaryo() {
    return (
        <View>
            <Calendar
                onDayPress={day => {
                    console.log('selected day', day);
                }}
            />
        </View>
    );
}