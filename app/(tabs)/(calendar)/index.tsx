import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from "react";
import { View } from "react-native";
import { Calendar } from 'react-native-calendars';

export default function Kalendaryo() {
  const [selected, setSelected] = useState('');
  const [markedDates, setMarkedDates] = useState({})


  const loadCompletedDays = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@completedDays');
      const completedDays = jsonValue ? JSON.parse(jsonValue) : {};

      const marks = Object.fromEntries(
        Object.keys(completedDays).map(date => [date, { marked: true, dotColor: 'green' }])
      );
      setMarkedDates(marks);
    } catch (e) {
      console.error("Error loading completed days: ", e);
    }
  };
  useFocusEffect(
    useCallback(() => {
      loadCompletedDays();
    }, [])
  );
  // For clearing storage *dev mode
  function clearAsyncStorage() {
    AsyncStorage.clear();
    loadCompletedDays();
  }
  return (
    <View className="flex-1 items-center justify-center bg-background px-5">
      <View className="rounded-2xl shadow-md overflow-hidden w-full">
        <Calendar
          onDayPress={day => setSelected(day.dateString)}
          markedDates={markedDates}
          theme={{
            backgroundColor: '#f8f9fa',
            calendarBackground: '#f8f9fa',
            textSectionTitleColor: '#4b5563',
            selectedDayBackgroundColor: '#212529',
            selectedDayTextColor: '#f8f9fa',
            todayTextColor: '#ba181b',
            dayTextColor: '#111827',
            arrowColor: '#212529',
            textDayFontFamily: 'Exo2-Regular',
            textMonthFontFamily: 'Exo2-SemiBold',
            textDayHeaderFontFamily: 'Exo2-Italic',
            textDayFontSize: 16,
            textMonthFontSize: 18,
            textDayHeaderFontSize: 14,
          }}
        />
      </View>
      <View>
        {/* <TouchableOpacity className='bg-accent py-2 px-3 rounded-md m-5' onPress={clearAsyncStorage}>
          <Text>Clear</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
}
