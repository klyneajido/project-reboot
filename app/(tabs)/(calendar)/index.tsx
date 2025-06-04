import { useState } from "react";
import { View } from "react-native";
import { Calendar } from 'react-native-calendars';


export default function Kalendaryo() {
    const [selected, setSelected] = useState('');
    return (
        <View className="container h-full flex items-center justify-center mt-5">
            <Calendar
                onDayPress={day => {
                    setSelected(day.dateString);
                }}
                markedDates={{
                    [selected]: { selected: true, disableTouchEvent: true }
                }}
            />
        </View>
    );
}