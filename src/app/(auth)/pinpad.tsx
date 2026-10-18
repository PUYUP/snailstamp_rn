import { NumericKeypad } from "@/components/numeric-keypad";
import { PinInput } from "@/components/pin-input";
import { PlayfulBackground } from "@/components/playful-background";
import { ThemedView } from "@/components/themed-view";
import { Colors, MaxContentWidth, Spacing } from "@/constants/theme";
import { CheckIcon } from '@solar-icons/react-native/bold-duotone/check';
import { DangerCircleIcon } from '@solar-icons/react-native/bold-duotone/danger-circle';
import { ForwardIcon } from '@solar-icons/react-native/bold-duotone/forward';
import { KeySquare2Icon } from '@solar-icons/react-native/bold-duotone/key-square-2';
import { ReplyIcon } from "@solar-icons/react-native/bold-duotone/reply";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, useColorScheme, View } from "react-native";
import { IconButton } from "react-native-paper";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withSpring, withTiming } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

type Step = 'create' | 'confirm';

export default function PinPad() {
    const router = useRouter();
    const scheme = useColorScheme();
    const isDark = scheme === 'dark';
    const pressScale = useSharedValue(1);
    const signpostAngle = useSharedValue(0);
    const [pressed, setPressed] = useState(false);

    const [step, setStep] = useState<Step>('create');
    const [pin, setPin] = useState("");
    const [confirmPin, setConfirmPin] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isMasked, setIsMasked] = useState(false);

    const currentPin = step === 'create' ? pin : confirmPin;
    const isCurrentPinComplete = currentPin.length === 6;

    const bounceStyle = useAnimatedStyle(() => ({
        transform: [{ scale: pressScale.value }],
    }));

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

    const handlePressDigit = (digit: string) => {
        if (currentPin.length >= 6) return;
        const nextPin = currentPin + digit;
        setErrorMessage("");

        if (step === 'create') {
            setPin(nextPin);
            if (nextPin.length === 6) {
                setTimeout(() => {
                    setStep('confirm');
                    setErrorMessage("");
                }, 220);
            }
        } else {
            setConfirmPin(nextPin);
            if (nextPin.length === 6) {
                if (nextPin !== pin) {
                    setErrorMessage("PIN doesn’t match. Please try again!");
                    setTimeout(() => {
                        setConfirmPin("");
                    }, 800);
                }
            }
        }
    };

    const handlePressBackspace = () => {
        setErrorMessage("");
        if (step === 'create') {
            setPin((prev) => prev.slice(0, -1));
        } else {
            setConfirmPin((prev) => prev.slice(0, -1));
        }
    };

    const handleNextOrFinish = () => {
        if (step === 'create') {
            if (pin.length === 6) {
                setStep('confirm');
                setErrorMessage("");
            }
        } else {
            if (confirmPin !== pin) {
                setErrorMessage("PIN doesn’t match. Please try again!");
                setConfirmPin("");
                return;
            }
            // PIN berhasil dikonfirmasi!
            router.replace('/(dash)/discover');
        }
    };

    const handleBack = () => {
        if (step === 'confirm') {
            setStep('create');
            setConfirmPin("");
            setErrorMessage("");
        } else {
            router.back();
        }
    };

    return (
        <ThemedView style={styles.container}>
            <PlayfulBackground isDark={isDark} />
            <SafeAreaView style={styles.safeArea}>
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={{
                        justifyContent: 'space-between',
                        paddingTop: 24,
                        paddingBottom: 24,
                        flexGrow: 1,
                    }}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={{ width: '100%' }}>
                        {/* Header Section */}
                        <View className="mb-2">
                            <View className="flex flex-row items-center gap-6 mb-3">
                                <Animated.View style={[{ width: 70, height: 70, transformOrigin: 'top center' }, signpostAnimatedStyle]}>
                                    <KeySquare2Icon size={70} color={isDark ? Colors.dark.textPrimary : Colors.light.textPrimary} />
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
                                    {step === 'create' ? 'Input Your PIN' : 'Confirm Your PIN'}
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
                                {step === 'create'
                                    ? 'Choose 6 digits PIN to keep your little world safe.'
                                    : 'Re-enter your 6 digits PIN to make sure it matches.'}
                            </Text>
                        </View>

                        {/* PIN Indicator Slots (No native keyboard) */}
                        <PinInput
                            value={currentPin}
                            length={6}
                            mask={isMasked}
                            useNativeKeyboard={false}
                            hasError={Boolean(errorMessage)}
                        />

                        {/* On-screen Numeric Keypad */}
                        <NumericKeypad
                            onPressDigit={handlePressDigit}
                            onPressBackspace={handlePressBackspace}
                            onToggleMask={() => setIsMasked((prev) => !prev)}
                            isMasked={isMasked}
                        />

                        {/* Error message indicator */}
                        {errorMessage ? (
                            <View
                                className="flex-row items-center justify-center gap-2 mb-2 px-4 py-2 mt-12 self-center"
                                style={{
                                    backgroundColor: '#FFEBEE',
                                    borderRadius: 16,
                                }}
                            >
                                <DangerCircleIcon size={20} color="#D32F2F" />
                                <Text
                                    style={{
                                        fontFamily: 'Schoolbell-Regular',
                                        fontSize: 16,
                                        color: '#D32F2F',
                                    }}
                                >
                                    {errorMessage}
                                </Text>
                            </View>
                        ) : null}
                    </View>

                    {/* Bottom Action Row: Back Button & Next/Finish Button */}
                    <View className="pt-4 px-8 gap-3 flex-row justify-center items-center">
                        <View>
                            <IconButton
                                onPress={handleBack}
                                mode={'contained'}
                                icon={() => (
                                    <ReplyIcon size={32} color={isDark ? Colors.dark.textPrimary : Colors.light.textPrimary} />
                                )}
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
                                onPress={handleNextOrFinish}
                                disabled={!isCurrentPinComplete}
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
                                    opacity: isCurrentPinComplete ? 1 : 0.5,
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
                                {step === 'create' ? (
                                    <>
                                        <Text style={{
                                            fontFamily: 'Gaegu-Regular',
                                            fontSize: 20,
                                            color: isDark ? Colors.dark.background : Colors.light.background,
                                        }}>
                                            Confirm
                                        </Text>
                                        <ForwardIcon
                                            color={isDark ? Colors.dark.background : Colors.light.background}
                                            size={36}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <CheckIcon
                                            color={isDark ? Colors.dark.background : Colors.light.background}
                                            size={36}
                                        />
                                        <Text style={{
                                            fontFamily: 'Gaegu-Regular',
                                            fontSize: 20,
                                            color: isDark ? Colors.dark.background : Colors.light.background,
                                        }}>
                                            Finish
                                        </Text>
                                    </>
                                )}
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