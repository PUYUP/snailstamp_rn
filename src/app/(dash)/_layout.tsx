import { Colors } from '@/constants/theme';
import { BoxIcon } from '@solar-icons/react-native/bold-duotone/box';
import { CopyAddIcon } from '@solar-icons/react-native/bold-duotone/copy-add';
import { EarthIcon } from '@solar-icons/react-native/bold-duotone/earth';
import { UserIcon } from '@solar-icons/react-native/bold-duotone/user';
import { router, Tabs } from 'expo-router';
import { Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TAB_ICONS: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
    discover: EarthIcon,
    collections: BoxIcon,
    profile: UserIcon,
};

const TAB_LABELS: Record<string, string> = {
    discover: 'Discover',
    collections: 'Collection',
    profile: 'Profile',
};

type BottomTabBarProps = Parameters<NonNullable<React.ComponentProps<typeof Tabs>['tabBar']>>[0];

function FloatingTabBar({ state, navigation }: BottomTabBarProps) {
    const isDark = useColorScheme() === 'dark';
    const theme = isDark ? Colors.dark : Colors.light;
    const insets = useSafeAreaInsets();

    return (
        <View
            style={[
                styles.wrapper,
                { backgroundColor: theme.background, paddingBottom: Math.max(insets.bottom, 12) },
            ]}
        >
            {/* Tab di kiri */}
            <View style={styles.tabs}>
                {state.routes.map((route, index) => {
                    const Icon = TAB_ICONS[route.name];
                    if (!Icon) return null;
                    const focused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });
                        if (!focused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    return (
                        <Pressable key={route.key} onPress={onPress} style={styles.tabItem}>
                            {/* Pill: background hanya di sini */}
                            <View
                                style={[
                                    styles.pill,
                                    focused && { backgroundColor: Colors.light.backgroundElement },
                                ]}
                            >
                                <Icon
                                    size={32}
                                    color={focused ? theme.textPrimary : theme.textSecondary}
                                />
                            </View>

                            {/* Label tanpa background */}
                            <Text
                                style={[
                                    styles.label,
                                    { color: focused ? theme.textPrimary : theme.textSecondary },
                                    focused && styles.labelFocused,
                                ]}
                            >
                                {TAB_LABELS[route.name] ?? route.name}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>

            {/* Tombol + sendirian di kanan */}
            <Pressable
                onPress={() => router.push('/(dash)/discover')} // ganti dengan aksi/route kamu
                style={[styles.plusButton]}
            >
                <View style={styles.plus}>
                    <CopyAddIcon size={62} color={isDark ? Colors.dark.textPrimary : Colors.light.textPrimary} />
                </View>
            </Pressable>
        </View>
    );
}

export default function DashLayout() {
    return (
        <Tabs screenOptions={{ headerShown: false }} tabBar={(props) => <FloatingTabBar {...props} />}>
            <Tabs.Screen name="discover" options={{ title: 'Discover' }} />
            <Tabs.Screen name="collections" options={{ title: 'Collection' }} />
            <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    tabs: {
        flexDirection: 'row',
        gap: 18,
    },
    tabItem: {
        alignItems: 'center',
        gap: 4,
    },
    pill: {
        width: 72,
        height: 40,
        borderRadius: 20, // setengah tinggi = sisi kiri & kanan membulat penuh
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontSize: 16,
        fontFamily: 'Gaegu-Regular',
    },
    labelFocused: {
        fontWeight: '600',
    },
    plusButton: {
        width: 52,
        height: 52,
        borderRadius: 26,
        alignItems: 'center',
        justifyContent: 'center',
    },
    plus: {
        width: 22,
        height: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },
});