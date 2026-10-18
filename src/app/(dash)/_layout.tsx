import { Tabs } from 'expo-router';

export default function DashLayout() {
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen name="home" options={{ title: 'Home' }} />
        </Tabs>
    );
}