// app/(tabs)/_layout.tsx
import { FontAwesome } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Tabs } from 'expo-router';


export default function TabLayout() {
  return (
    <Tabs
    screenOptions={({route}) => ({
      tabBarActiveTintColor:'#f8f9fa',
      tabBarInactiveTintColor: '#6c757d',
      tabBarStyle:{
        backgroundColor: '#212529',
        borderTopWidth:1,
        borderTopColor: '#f8f9fa',
        height:90,
        
      },
    })}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: 'Home',
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name='home' color={color} />
        }}
      />
      <Tabs.Screen
        name="(timer)"
        options={{
          title: 'Timer',
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ color }) => <AntDesign name="clockcircle" size={28} color={color} />
        }}
      />
      <Tabs.Screen
        name="(calendar)"
        options={{
          title: 'Calendar',
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ color }) => <AntDesign name="calendar" size={28} color={color} />
        }}
      />

    </Tabs>
  );
}