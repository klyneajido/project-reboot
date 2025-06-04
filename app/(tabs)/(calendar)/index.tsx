import { useState } from "react";
import { View } from "react-native";
import { Calendar } from 'react-native-calendars';

export default function Kalendaryo() {
  const [selected, setSelected] = useState('');

  return (
    <View className="flex-1 items-center justify-center bg-background p-4">
      <View className="rounded-2xl shadow-md overflow-hidden w-full max-w-[360px]">
        <Calendar
          onDayPress={day => setSelected(day.dateString)}
          markedDates={{
            [selected]: {
              selected: true,
              selectedColor: '#212529',
              disableTouchEvent: true,
            },
          }}
          theme={{
            backgroundColor: '#f8f9fa',
            calendarBackground: '#f8f9fa',
            textSectionTitleColor: '#4b5563',
            selectedDayBackgroundColor: '#212529',
            selectedDayTextColor: '#f8f9fa',
            todayTextColor: '#ef4444', 
            dayTextColor: '#111827',
            arrowColor: '#212529',
            textDayFontFamily: 'System',
            textMonthFontFamily: 'System',
            textDayHeaderFontFamily: 'System',
            textDayFontSize: 16,
            textMonthFontSize: 18,
            textDayHeaderFontSize: 14,
          }}
        />
      </View>
    </View>
  );
}
