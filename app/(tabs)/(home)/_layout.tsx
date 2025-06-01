import { Stack } from 'expo-router';
import { View } from 'react-native';

export default function HomeLayout() {
  return (
    <View className='flex-1'>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
    </View>
  );
}
