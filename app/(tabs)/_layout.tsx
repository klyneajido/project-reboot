// app/(tabs)/_layout.tsx
import { FontAwesome } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="(home)"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name='home' color={color} />
        }}
      />
      <Tabs.Screen
        name="(timer)"
        options={{
          title: 'Timer',
          headerShown: false,
          tabBarIcon: ({ color }) => <AntDesign name="clockcircle" size={28} color={color} />
        }}
      />

    </Tabs>
  );
}