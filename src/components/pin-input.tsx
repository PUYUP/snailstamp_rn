import { Colors } from "@/constants/theme";
import React, { useEffect, useRef, useState } from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    useColorScheme,
    View,
} from "react-native";

export interface PinInputProps {
    value: string;
    onChange?: (value: string) => void;
    length?: number;
    mask?: boolean;
    autoFocus?: boolean;
    useNativeKeyboard?: boolean;
    hasError?: boolean;
    onComplete?: (pin: string) => void;
}

export function PinInput({
    value,
    onChange,
    length = 6,
    mask = false,
    autoFocus = false,
    useNativeKeyboard = false,
    hasError = false,
    onComplete,
}: PinInputProps) {
    const scheme = useColorScheme();
    const isDark = scheme === "dark";
    const inputRef = useRef<TextInput>(null);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        if (useNativeKeyboard && autoFocus) {
            const timer = setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [useNativeKeyboard, autoFocus]);

    const handleChangeText = (text: string) => {
        const numeric = text.replace(/[^0-9]/g, "").slice(0, length);
        if (onChange) onChange(numeric);
        if (numeric.length === length && onComplete) {
            onComplete(numeric);
        }
    };

    const handlePress = () => {
        if (useNativeKeyboard) {
            inputRef.current?.focus();
        }
    };

    return (
        <View style={styles.container}>
            {/* Optional hidden TextInput jika native keyboard diaktifkan */}
            {useNativeKeyboard && (
                <TextInput
                    ref={inputRef}
                    value={value}
                    onChangeText={handleChangeText}
                    keyboardType="number-pad"
                    returnKeyType="done"
                    textContentType="oneTimeCode"
                    maxLength={length}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    caretHidden
                    style={styles.hiddenInput}
                    autoFocus={autoFocus}
                />
            )}

            {/* Visual PIN Slot Cells */}
            <Pressable onPress={handlePress} style={styles.slotsRow}>
                {Array.from({ length }).map((_, index) => {
                    const digit = value[index];
                    const isCurrentSlot = index === value.length && !hasError;
                    const isFilled = digit !== undefined;

                    let borderColor = "transparent";
                    if (hasError) {
                        borderColor = "#D32F2F";
                    } else if (isCurrentSlot) {
                        borderColor = isDark ? Colors.dark.textPrimary : Colors.light.textPrimary;
                    }

                    return (
                        <View
                            key={index}
                            style={[
                                styles.slot,
                                {
                                    backgroundColor: isDark
                                        ? Colors.dark.backgroundElement
                                        : Colors.light.backgroundElement,
                                    borderColor,
                                    borderWidth: 2,
                                },
                            ]}
                        >
                            {isFilled ? (
                                mask ? (
                                    <View
                                        style={[
                                            styles.maskDot,
                                            {
                                                backgroundColor: hasError
                                                    ? "#D32F2F"
                                                    : (isDark
                                                        ? Colors.dark.textPrimary
                                                        : Colors.light.textPrimary),
                                            },
                                        ]}
                                    />
                                ) : (
                                    <Text
                                        style={[
                                            styles.digitText,
                                            {
                                                color: hasError
                                                    ? "#D32F2F"
                                                    : (isDark
                                                        ? Colors.dark.textForeground
                                                        : Colors.light.textForeground),
                                            },
                                        ]}
                                    >
                                        {digit}
                                    </Text>
                                )
                            ) : isCurrentSlot ? (
                                <View
                                    style={[
                                        styles.cursor,
                                        {
                                            backgroundColor: isDark
                                                ? Colors.dark.textPrimary
                                                : Colors.light.textPrimary,
                                        },
                                    ]}
                                />
                            ) : null}
                        </View>
                    );
                })}
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 18,
        position: "relative",
    },
    hiddenInput: {
        position: "absolute",
        width: 1,
        height: 1,
        opacity: 0,
        pointerEvents: "none",
    },
    slotsRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        width: "100%",
    },
    slot: {
        width: 48,
        height: 60,
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.5,
    },
    digitText: {
        fontFamily: "Gaegu-Bold",
        fontSize: 32,
        textAlign: "center",
        lineHeight: 38,
    },
    maskDot: {
        width: 14,
        height: 14,
        borderRadius: 7,
    },
    cursor: {
        width: 2,
        height: 24,
        borderRadius: 1,
    },
});
