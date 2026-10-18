import { Colors } from "@/constants/theme";
import { BackspaceIcon } from "@solar-icons/react-native/bold-duotone/backspace";
import { EyeClosedIcon } from "@solar-icons/react-native/bold-duotone/eye-closed";
import { EyeIcon } from "@solar-icons/react-native/bold-duotone/eye";
import React, { useState } from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";

export interface NumericKeypadProps {
    onPressDigit: (digit: string) => void;
    onPressBackspace: () => void;
    onToggleMask?: () => void;
    isMasked?: boolean;
    leftCustomButton?: React.ReactNode;
    disabled?: boolean;
}

interface KeyButtonProps {
    onPress: () => void;
    children?: (pressed: boolean) => React.ReactNode;
    label?: string;
    disabled?: boolean;
    isDark: boolean;
}

function KeypadButton({
    onPress,
    children,
    label,
    disabled = false,
    isDark,
}: KeyButtonProps) {
    const [pressed, setPressed] = useState(false);
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    return (
        <Animated.View style={animatedStyle}>
            <Pressable
                disabled={disabled}
                onPress={onPress}
                onPressIn={() => {
                    setPressed(true);
                    scale.value = withSpring(0.9, { damping: 14, stiffness: 400 });
                }}
                onPressOut={() => {
                    setPressed(false);
                    scale.value = withSpring(1, { damping: 10, stiffness: 300 });
                }}
                style={[
                    styles.keyButton,
                    {
                        backgroundColor: pressed
                            ? (isDark ? Colors.dark.textForeground : Colors.light.textForeground)
                            : (isDark ? Colors.dark.backgroundElement : Colors.light.backgroundElement),
                    },
                ]}
            >
                {label ? (
                    <Text
                        style={[
                            styles.keyText,
                            {
                                color: pressed
                                    ? (isDark ? Colors.dark.background : Colors.light.background)
                                    : (isDark ? Colors.dark.textForeground : Colors.light.textForeground),
                            },
                        ]}
                    >
                        {label}
                    </Text>
                ) : (
                    children ? children(pressed) : null
                )}
            </Pressable>
        </Animated.View>
    );
}

export function NumericKeypad({
    onPressDigit,
    onPressBackspace,
    onToggleMask,
    isMasked = false,
    leftCustomButton,
    disabled = false,
}: NumericKeypadProps) {
    const scheme = useColorScheme();
    const isDark = scheme === "dark";

    const keys = [
        ["1", "2", "3"],
        ["4", "5", "6"],
        ["7", "8", "9"],
    ];

    const renderLeftSlot = () => {
        if (leftCustomButton) {
            return leftCustomButton;
        }
        if (onToggleMask) {
            return (
                <KeypadButton
                    onPress={onToggleMask}
                    disabled={disabled}
                    isDark={isDark}
                >
                    {(pressed) =>
                        isMasked ? (
                            <EyeIcon
                                size={30}
                                color={
                                    pressed
                                        ? (isDark ? Colors.dark.background : Colors.light.background)
                                        : (isDark ? Colors.dark.textSecondary : Colors.light.textSecondary)
                                }
                            />
                        ) : (
                            <EyeClosedIcon
                                size={30}
                                color={
                                    pressed
                                        ? (isDark ? Colors.dark.background : Colors.light.background)
                                        : (isDark ? Colors.dark.textSecondary : Colors.light.textSecondary)
                                }
                            />
                        )
                    }
                </KeypadButton>
            );
        }
        return <View style={styles.specialSlot} />;
    };

    return (
        <View style={styles.keypadContainer}>
            {keys.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                    {row.map((digit) => (
                        <KeypadButton
                            key={digit}
                            label={digit}
                            onPress={() => onPressDigit(digit)}
                            disabled={disabled}
                            isDark={isDark}
                        />
                    ))}
                </View>
            ))}

            {/* Bottom Row: Left Custom Action / 0 / Backspace */}
            <View style={styles.row}>
                {/* Left slot */}
                {renderLeftSlot()}

                {/* 0 digit */}
                <KeypadButton
                    label="0"
                    onPress={() => onPressDigit("0")}
                    disabled={disabled}
                    isDark={isDark}
                />

                {/* Backspace button */}
                <KeypadButton
                    onPress={onPressBackspace}
                    disabled={disabled}
                    isDark={isDark}
                >
                    {(pressed) => (
                        <BackspaceIcon
                            size={32}
                            color={
                                pressed
                                    ? (isDark ? Colors.dark.background : Colors.light.background)
                                    : (isDark ? Colors.dark.textPrimary : Colors.light.textPrimary)
                            }
                        />
                    )}
                </KeypadButton>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    keypadContainer: {
        width: "100%",
        maxWidth: 340,
        alignSelf: "center",
        gap: 12,
        marginTop: 10,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },
    keyButton: {
        width: 72,
        height: 72,
        borderRadius: 36,
        justifyContent: "center",
        alignItems: "center",
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3,
    },
    specialSlot: {
        width: 72,
        height: 72,
    },
    keyText: {
        fontFamily: "Gaegu-Bold",
        fontSize: 34,
        textAlign: "center",
        lineHeight: 40,
    },
});
