import { PlayfulBackground } from "@/components/playful-background";
import { ThemedView } from "@/components/themed-view";
import { BottomTabInset, Colors, MaxContentWidth, Spacing } from "@/constants/theme";
import { ForwardIcon } from '@solar-icons/react-native/bold-duotone/forward';
import { GlobeIcon } from '@solar-icons/react-native/bold-duotone/globe';
import { MasksIcon } from '@solar-icons/react-native/bold-duotone/masks';
import { ReplyIcon } from '@solar-icons/react-native/bold-duotone/reply';
import { UserIdIcon } from '@solar-icons/react-native/bold-duotone/user-id';
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatListProps, Pressable, ScrollView, StyleSheet, Text, useColorScheme, View } from "react-native";
import CountryPicker, {
    Country,
    CountryCode,
    Flag,
    Theme,
} from 'react-native-country-picker-modal';
import { Button, IconButton, TextInput } from "react-native-paper";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withSpring, withTiming } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
    const router = useRouter();
    const scheme = useColorScheme();
    const isDark = scheme === 'dark';
    const pressScale = useSharedValue(1);
    const [name, setName] = useState("");
    const [countryCode, setCountryCode] = useState<CountryCode>("ID");
    const [selectedCountry, setSelectedCountry] = useState<Country>();
    const [countryVisible, setCountryVisible] = useState(false);
    const [pressed, setPressed] = useState(false);

    const countryTheme: Theme = {
        backgroundColor: isDark ? Colors.dark.background : Colors.light.background,
        onBackgroundTextColor: isDark ? Colors.dark.textForeground : Colors.light.textForeground,
        filterPlaceholderTextColor: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary,
        fontSize: 20,
        fontFamily: 'Gaegu-Light',
        itemHeight: 56,
    };

    const countryListProps = {
        contentContainerStyle: {
            paddingHorizontal: Spacing.four,
            paddingBottom: 40,
        },
        showsVerticalScrollIndicator: true,
    } as FlatListProps<Country>;

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

    const onSelect = (country: Country) => {
        setCountryCode(country.cca2)
    }

    return (
        <>
            <ThemedView style={styles.container}>
                <PlayfulBackground isDark={isDark} />
                <SafeAreaView style={styles.safeArea}>
                    <ScrollView
                        style={styles.scrollView}
                        contentContainerStyle={{
                            justifyContent: 'space-between',
                            paddingTop: 32,
                            flexGrow: 1,
                        }}
                    >
                        <View>
                            <View className="mb-4">
                                <View className="flex flex-row items-center gap-6 mb-4">
                                    <Animated.View style={[{ width: 70, height: 70, transformOrigin: 'top center' }, signpostAnimatedStyle]}>
                                        <MasksIcon size={70} color={isDark ? Colors.dark.textPrimary : Colors.light.textPrimary} />
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
                                        Let’s get to know you!
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
                                    Every little world starts with a person. Tell us a bit about yourself.
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
                                    What should we call you?
                                </Text>
                                <TextInput
                                    mode="flat"
                                    placeholder="Your name or nickname"
                                    placeholderTextColor={isDark ? Colors.dark.textSecondary : Colors.light.textSecondary}
                                    underlineColor="transparent"
                                    activeUnderlineColor="transparent"
                                    onChangeText={(e) => setName(e)}
                                    value={name}
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
                                                <UserIdIcon
                                                    size={size}
                                                    color={isDark ? Colors.dark.textPrimary : Colors.light.textPrimary}
                                                />
                                            )}
                                        />
                                    }
                                />
                            </View>

                            <View className="mt-10">
                                <Text
                                    className="text-2xl leading-8 mb-3"
                                    style={{
                                        fontFamily: 'Schoolbell-Regular',
                                        color: isDark ? Colors.dark.textForeground : Colors.light.textForeground,
                                    }}
                                >
                                    Where are you from?
                                </Text>

                                <Button
                                    icon={() =>
                                        selectedCountry ? (
                                            <View style={{ marginLeft: 8 }}>
                                                <Flag
                                                    countryCode={selectedCountry.cca2}
                                                    flagSize={36}
                                                    withEmoji
                                                />
                                            </View>
                                        ) : (
                                            <GlobeIcon
                                                size={42}
                                                color={isDark ? Colors.dark.textPrimary : Colors.light.textPrimary}
                                            />
                                        )
                                    }
                                    onPress={() => setCountryVisible(true)}
                                    mode="elevated"
                                    contentStyle={{
                                        justifyContent: 'flex-start',
                                        paddingVertical: 14.5,
                                        paddingHorizontal: 0,
                                        gap: selectedCountry ? 4 : 8,
                                    }}
                                    style={{
                                        borderRadius: 40,
                                        backgroundColor: isDark ? Colors.dark.backgroundElement : Colors.light.backgroundElement,
                                    }}
                                >
                                    <Text style={{ fontFamily: selectedCountry ? 'Gaegu-Regular' : 'Gaegu-Light', fontSize: 24 }}>
                                        {selectedCountry
                                            ? (typeof selectedCountry.name === 'string' ? selectedCountry.name : selectedCountry.name.common)
                                            : 'Select Country'}
                                    </Text>
                                </Button>
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

            <CountryPicker
                withModal={true}
                withCloseButton={false}
                theme={countryTheme}
                countryCode={countryCode}
                visible={countryVisible}
                withFlagButton={false}
                onSelect={(country) => {
                    onSelect(country);
                    setSelectedCountry(country);
                    setCountryVisible(false);
                }}
                onClose={() => setCountryVisible(false)}
                withFilter
                flatListProps={countryListProps}
                renderCountryFilter={(props) => {
                    return (
                        <View className="p-4 w-full flex flex-row items-center justify-between gap-2">
                            <View className="flex-1">
                                <TextInput
                                    testID='text-input-country-filter'
                                    autoCorrect={false}
                                    autoFocus={props.autoFocus}
                                    placeholder={'Search your country'}
                                    placeholderTextColor={isDark ? Colors.dark.text : Colors.light.text}
                                    keyboardAppearance={props.keyboardAppearance}
                                    value={props.value}
                                    onChangeText={props.onChangeText}
                                    style={{
                                        color: isDark ? Colors.dark.textForeground : Colors.light.textForeground,
                                        borderTopLeftRadius: 40,
                                        borderBottomLeftRadius: 40,
                                        borderTopRightRadius: 40,
                                        borderBottomRightRadius: 40,
                                        height: 60,
                                        paddingLeft: 20,
                                        fontSize: 24,
                                    }}
                                    underlineStyle={{
                                        borderWidth: 0,
                                        height: 0,
                                    }}
                                    contentStyle={{
                                        fontFamily: 'Gaegu-Light',
                                    }}
                                />
                            </View>

                            <View>
                                <IconButton
                                    icon="close"
                                    iconColor={isDark ? Colors.dark.textForeground : Colors.light.textForeground}
                                    size={26}
                                    mode={'contained'}
                                    style={{ height: 60, width: 60, borderRadius: 40 }}
                                    onPress={() => setCountryVisible(false)}
                                />
                            </View>
                        </View>
                    )
                }}
            />

        </>
    )
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