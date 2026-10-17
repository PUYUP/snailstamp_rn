import { PlayfulBackground } from "@/components/playful-background";
import { ThemedView } from "@/components/themed-view";
import { BottomTabInset, Colors, MaxContentWidth, Spacing } from "@/constants/theme";
import { CheckCircleIcon } from '@solar-icons/react-native/bold-duotone/check-circle';
import { ForwardIcon } from '@solar-icons/react-native/bold-duotone/forward';
import { ReplyIcon } from "@solar-icons/react-native/bold-duotone/reply";
import { Rocket2Icon } from '@solar-icons/react-native/bold-duotone/rocket-2';
import { MenuDotsCircleIcon } from '@solar-icons/react-native/outline/menu-dots-circle';
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, useColorScheme, View } from "react-native";
import { IconButton, TouchableRipple } from 'react-native-paper';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withSpring,
    withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const interests = [
    {
        id: 1,
        name: "Mailer & Pen Pals",
        description: "Sending and exchanging analog letters"
    },
    {
        id: 2,
        name: "Journaling",
        description: "Physical and digital journaling"
    },
    {
        id: 3,
        name: "Paper Crafts & Collage",
        description: "Creating art with paper"
    },
    {
        id: 4,
        name: "Stationery Collecting",
        description: "Collecting stickers, stamps, pens, and more"
    },
    {
        id: 5,
        name: "Pressed Flora",
        description: "Preserving flowers and leaves"
    },
    {
        id: 6,
        name: "Vintage Toys",
        description: "Toys, figures, and miniatures"
    },
    {
        id: 7,
        name: "Others",
        description: "Something else"
    }
];

const CustomCheckboxItem = ({
    label,
    description,
    status,
    onPress,
    isDark
}: {
    label: string,
    description: string,
    status: 'checked' | 'unchecked',
    onPress: () => void,
    isDark: boolean,
}) => {
    return (
        <TouchableRipple
            onPress={() => onPress()}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: status === 'checked' }}
        >
            <View className="py-2 px-2" style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                <View>
                    <Text className="text-md" style={{ fontFamily: 'Schoolbell-Regular' }}>{label}</Text>
                    {/* {description && (
                        <Text className="text-base" style={{ fontFamily: 'Gaegu-Light' }}>{description}</Text>
                    )} */}
                </View>
                {status === 'checked' && <CheckCircleIcon size={30} color={isDark ? Colors.dark.textPrimary : Colors.light.textPrimary} />}
                {status === 'unchecked' && <MenuDotsCircleIcon opacity={0.65} size={30} color={isDark ? Colors.dark.textForeground : Colors.light.textForeground} />}
            </View>
        </TouchableRipple>
    );
};

export default function Interests() {
    const router = useRouter();
    const scheme = useColorScheme();
    const isDark = scheme === 'dark';
    const pressScale = useSharedValue(1);
    const [pressed, setPressed] = useState(false);

    const bounceStyle = useAnimatedStyle(() => ({
        transform: [{ scale: pressScale.value }],
    }));

    const signpostAngle = useSharedValue(0);

    useEffect(() => {
        signpostAngle.value = withRepeat(
            withSequence(
                withTiming(6.5, { duration: 1500, easing: Easing.inOut(Easing.sin) }),
                withTiming(-6.5, { duration: 1500, easing: Easing.inOut(Easing.sin) })
            ),
            -1,
            true
        );
    }, [signpostAngle]);

    const signpostAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${signpostAngle.value}deg` }],
    }));

    const [selectedInterests, setSelectedInterests] = useState<number[]>([]);

    const toggleInterest = (id: number) => {
        setSelectedInterests((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    return (
        <ThemedView style={styles.container}>
            <PlayfulBackground isDark={isDark} />
            <SafeAreaView style={styles.safeArea}>
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={{
                        justifyContent: 'space-between',
                        paddingTop: 32,
                        paddingBottom: 32,
                        flexGrow: 1,
                    }}
                >
                    <View style={{ width: '100%' }}>
                        <View className="mb-4">
                            <View className="flex flex-row items-center gap-6 mb-4">
                                <Animated.View style={[{ width: 70, height: 70, transformOrigin: 'top center' }, signpostAnimatedStyle]}>
                                    <Rocket2Icon size={70} color={isDark ? Colors.dark.textPrimary : Colors.light.textPrimary} />
                                </Animated.View>
                                <Text
                                    className="text-4xl leading-8"
                                    style={{
                                        fontFamily: 'Gaegu-Bold',
                                        color: isDark ? Colors.dark.textForeground : Colors.light.textForeground,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 10,
                                        flexShrink: 1,
                                    }}>
                                    Let’s start from your
                                </Text>
                            </View>
                            <Text
                                className="text-2xl"
                                style={{
                                    fontFamily: 'Gaegu-Light',
                                    color: isDark ? Colors.dark.textForeground : Colors.light.textForeground,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 10,
                                }}
                            >
                                Pick the little things you love. Discover people who love them too.
                            </Text>
                        </View>

                        <View className="-mx-2">
                            {interests.map((interest, index) => {
                                const isChecked = selectedInterests.includes(interest.id);
                                const isLast = index === interests.length - 1;

                                return (
                                    <View
                                        key={interest.id}
                                        className={isLast ? '' : 'border-b border-dashed border-neutral-300'}
                                    >
                                        <CustomCheckboxItem
                                            label={interest.name}
                                            description={interest.description}
                                            status={isChecked ? 'checked' : 'unchecked'}
                                            onPress={() => toggleInterest(interest.id)}
                                            isDark={isDark}
                                        />
                                    </View>
                                );
                            })}
                        </View>
                    </View>

                    <View className="pt-2 px-16 gap-2 flex-row justify-center items-center">
                        <View>
                            <IconButton
                                onPress={() => router.back()}
                                mode={'contained'}
                                icon={() => {
                                    return (
                                        <ReplyIcon size={32} color={isDark ? Colors.dark.textPrimary : Colors.light.textPrimary} />
                                    )
                                }}
                                style={{
                                    height: 62,
                                    width: 62,
                                    borderRadius: 35,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            />
                        </View>

                        <Animated.View style={[bounceStyle, { alignItems: 'center', width: 'auto' }]}>
                            <Pressable
                                onPress={() => router.navigate({ pathname: '/(auth)/profile' })}
                                onPressIn={() => {
                                    setPressed(true);
                                    pressScale.value = withSpring(0.75, { damping: 14, stiffness: 400 });
                                }}
                                onPressOut={() => {
                                    setPressed(false);
                                    pressScale.value = withSpring(1, { damping: 6, stiffness: 300 });
                                }}
                                style={{
                                    backgroundColor: pressed
                                        ? (isDark ? Colors.dark.textForeground : Colors.light.textForeground)
                                        : (isDark ? Colors.dark.backgroundElement : Colors.light.textPrimary),
                                    borderRadius: 32,
                                    paddingHorizontal: Spacing.four,
                                    paddingVertical: Spacing.two * 1.5,
                                    shadowColor: isDark ? Colors.dark.textForeground : Colors.light.textForeground,
                                    shadowOffset: { width: 0, height: 4 },
                                    shadowOpacity: 0.2,
                                    shadowRadius: 4,
                                    elevation: 4,
                                    flexDirection: 'row',
                                    gap: 8,
                                    alignItems: 'center',
                                }}
                            >
                                <Text style={{
                                    fontFamily: 'Gaegu-Regular',
                                    fontSize: 20,
                                    color: isDark ? Colors.dark.background : Colors.light.background,
                                }}>
                                    Continue
                                </Text>
                                <ForwardIcon
                                    color={isDark ? Colors.dark.background : Colors.light.background}
                                    size={36}
                                />
                            </Pressable>
                        </Animated.View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    safeArea: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: Spacing.three,
        paddingBottom: BottomTabInset,
        maxWidth: MaxContentWidth,
        width: '100%',
    },
    scrollView: {
        backgroundColor: 'transparent',
        display: 'flex',
        paddingHorizontal: Spacing.four,
        flex: 1,
        width: '100%',
    },
});