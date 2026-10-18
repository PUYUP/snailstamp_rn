import { PlayfulBackground } from "@/components/playful-background";
import { ThemedView } from "@/components/themed-view";
import { Colors, MaxContentWidth, Spacing } from "@/constants/theme";
import { KeyMinimalisticIcon } from '@solar-icons/react-native/bold-duotone/key-minimalistic';
import { LetterUnreadIcon } from '@solar-icons/react-native/bold-duotone/letter-unread';
import { ReplyIcon } from "@solar-icons/react-native/bold-duotone/reply";
import { ShieldStarIcon } from '@solar-icons/react-native/bold-duotone/shield-star';
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, useColorScheme, View } from "react-native";
import { KeyboardStickyView } from "react-native-keyboard-controller";
import { IconButton, TextInput } from 'react-native-paper';
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

export default function SignUp() {
    const router = useRouter();
    const scheme = useColorScheme();
    const isDark = scheme === 'dark';
    const pressScale = useSharedValue(1);
    const [pressed, setPressed] = useState(false);
    const [email, setEmail] = useState("");

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
                                    <ShieldStarIcon size={70} color={isDark ? Colors.dark.textPrimary : Colors.light.textPrimary} />
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
                                    One little step more
                                </Text>
                            </View>
                            <Text
                                className="text-3xl"
                                style={{
                                    fontFamily: 'Gaegu-Light',
                                    color: isDark ? Colors.dark.textForeground : Colors.light.textForeground,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 10,
                                }}
                            >
                                Create your account to discover collections, share your treasures, and connect with fellow Snailers around the world.
                            </Text>
                        </View>

                        <View className="mt-6">
                            <Text
                                className="text-2xl leading-8 mb-3"
                                style={{
                                    fontFamily: 'Schoolbell-Regular',
                                    color: isDark ? Colors.dark.textForeground : Colors.light.textForeground,
                                }}
                            >
                                Enter your email address
                            </Text>
                            <TextInput
                                mode="flat"
                                placeholder="Your email"
                                placeholderTextColor={isDark ? Colors.dark.textSecondary : Colors.light.textSecondary}
                                underlineColor="transparent"
                                activeUnderlineColor="transparent"
                                onChangeText={(e) => setEmail(e)}
                                value={email}
                                keyboardType='email-address'
                                autoCapitalize='none'
                                style={{
                                    color: isDark ? Colors.dark.textForeground : Colors.light.textForeground,
                                    borderTopLeftRadius: 40,
                                    borderBottomLeftRadius: 40,
                                    borderTopRightRadius: 40,
                                    borderBottomRightRadius: 40,
                                    height: 70,
                                    paddingLeft: 20,
                                    fontSize: 24,
                                    elevation: 2,
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 2,
                                    },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 3.84,
                                }}
                                underlineStyle={{
                                    borderWidth: 0,
                                    height: 0,
                                }}
                                contentStyle={{
                                    fontFamily: 'Gaegu-Light',
                                }}
                                left={
                                    <TextInput.Icon
                                        style={{
                                            marginLeft: 28,
                                        }}
                                        size={42}
                                        icon={({ size }) => (
                                            <LetterUnreadIcon
                                                size={size}
                                                color={isDark ? Colors.dark.textPrimary : Colors.light.textPrimary}
                                            />
                                        )}
                                    />
                                }
                            />
                        </View>
                    </View>
                </ScrollView>

                <KeyboardStickyView offset={{ closed: 0, opened: 20 }}>
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
                                }}
                                contentStyle={{
                                    height: 62,
                                    width: 62,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            />
                        </View>

                        <Animated.View style={[bounceStyle, { alignItems: 'center', width: 'auto' }]}>
                            <Pressable
                                disabled={!email || email == ''}
                                onPress={() => router.push('/(auth)/pinpad')}
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
                                    opacity: (!email || email == '') ? 0.5 : 1,
                                }}
                            >
                                <KeyMinimalisticIcon
                                    color={isDark ? Colors.dark.background : Colors.light.background}
                                    size={36}
                                />
                                <Text style={{
                                    fontFamily: 'Gaegu-Regular',
                                    fontSize: 20,
                                    color: isDark ? Colors.dark.background : Colors.light.background,
                                }}>
                                    Set PIN
                                </Text>
                            </Pressable>
                        </Animated.View>
                    </View>
                </KeyboardStickyView>
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