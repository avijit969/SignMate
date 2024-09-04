import { theme } from '@/constants/theme';
import { Tabs } from 'expo-router';
import Icon from '@/assets/icons';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: theme.colors.primary,
                headerShown: false,
                tabBarLabelStyle: {
                    fontSize: 18,
                    fontWeight: "800",
                },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <Icon name={'home'} size={26} strokeWidth={1.6} color={color} />,
                }}
            />
            <Tabs.Screen
                name="Learning"
                options={{
                    title: 'Leaning',
                    tabBarIcon: ({ color }) => <Icon name={'learn'} size={26} strokeWidth={1.6} color={color} />,
                }}
            />
            <Tabs.Screen
                name="Practice"
                options={{
                    title: 'Practice',

                    tabBarIcon: ({ color }) => <Icon name={'practice'} size={26} strokeWidth={1.6} color={color} />,
                }}
            />
            <Tabs.Screen
                name="Sign"
                options={{
                    title: 'Sign',
                    tabBarIcon: ({ color }) => <Icon name={'sign'} size={26} strokeWidth={1.6} color={color} />,
                }}
            />
            <Tabs.Screen
                name="tutorials/[category]"
                options={{
                    tabBarButton: () => null,
                }}
            />
        </Tabs>
    );
}
