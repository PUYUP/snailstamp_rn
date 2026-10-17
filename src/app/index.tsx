import { MapPins } from "@/components/map-pins";
import { PlayfulBackground } from "@/components/playful-background";
import { StickerText } from "@/components/sticker-text";
import { ThemedView } from "@/components/themed-view";
import { BottomTabInset, Colors, MaxContentWidth, Spacing } from '@/constants/theme';
import { ConfettiMinimalisticIcon } from '@solar-icons/react-native/bold-duotone/confetti-minimalistic';
import { TelescopeIcon } from '@solar-icons/react-native/bold-duotone/telescope';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, useColorScheme, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

function BrushStrokeUnderline({ color }: { color: string }) {
    return (
        <Svg
            width={240}
            height={16}
            viewBox="0 0 240 16"
            fill="none"
            style={{
                marginTop: -4,
                transform: [{ rotate: '-1.5deg' }],
            }}
        >
            {/* Coretan kuas utama yang tebal & meruncing dinamis */}
            <Path
                d="M 6 10 C 35 4, 85 13, 135 7 C 178 2, 215 11, 235 6 C 210 14, 150 15, 95 12 C 55 14, 25 13, 6 10 Z"
                fill={color}
                opacity={0.88}
            />
            {/* Coretan tekstur sapuan kuas aksen */}
            <Path
                d="M 16 12 C 56 7, 115 13, 170 8 C 198 5, 220 10, 230 9"
                stroke={color}
                strokeWidth={1.8}
                strokeLinecap="round"
                opacity={0.65}
            />
            {/* Ujung sapuan kuas */}
            <Path
                d="M 232 7.5 C 235 7, 237 8, 236 9"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                opacity={0.5}
            />
        </Svg>
    );
}

export default function Index() {
    const router = useRouter();
    const scheme = useColorScheme();
    const isDark = scheme === 'dark';
    const pressScale = useSharedValue(1);

    const bounceStyle = useAnimatedStyle(() => ({
        transform: [{ scale: pressScale.value }],
    }));

    return (
        <ThemedView style={styles.container}>
            <PlayfulBackground isDark={isDark} />
            <SafeAreaView style={styles.safeArea}>
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={{
                        justifyContent: 'space-around',
                        paddingTop: 32,
                        paddingBottom: 32,
                        flex: 1,
                    }}
                >
                    <View className="flex justify-center items-center w-full mb-6">
                        <View className="flex flex-row justify-center items-center">
                            <StickerText
                                strokeColor="#FFFFFF"
                                strokeWidth={5}
                                style={{
                                    fontFamily: "PlaypenSans-Regular",
                                    color: isDark ? Colors.dark.textForeground : Colors.light.textForeground,
                                    fontSize: 52,
                                    letterSpacing: 0,
                                    marginTop: -6,
                                }}>
                                snail
                            </StickerText>
                            <StickerText
                                strokeColor="#FFFFFF"
                                strokeWidth={4}
                                style={{
                                    fontFamily: "Schoolbell-Regular",
                                    color: isDark ? Colors.dark.textPrimary : Colors.light.textPrimary,
                                    fontSize: 60,
                                    transform: [
                                        { rotate: '0deg' },
                                    ],
                                }}>
                                stamp
                            </StickerText>
                        </View>
                        <BrushStrokeUnderline color={isDark ? Colors.dark.textPrimary : Colors.light.textPrimary} />
                    </View>

                    <View className="w-full items-center justify-center pt-10 mb-6">
                        <View style={{ width: '100%', aspectRatio: (1010 / 666) * 1, position: 'relative' }}>
                            <Image
                                source={require('@/assets/images/world.svg')}
                                style={{ width: '100%', height: '100%' }}
                                contentFit="contain"
                                tintColor={isDark ? Colors.dark.backgroundElement : '#dfded3ff'}
                            />
                            <MapPins isDark={isDark} />
                        </View>
                    </View>

                    <View className="justify-center items-center">
                        <Text
                            className="text-4xl"
                            style={{
                                fontFamily: 'Gaegu-Bold',
                                color: isDark ? Colors.dark.textForeground : Colors.light.textForeground,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 10,
                            }}>
                            Discover
                            <TelescopeIcon size={38} />
                        </Text>

                        <View className="flex flex-row justify-center items-center mb-4">
                            <Text
                                className="text-3xl -mr-1"
                                style={{
                                    fontFamily: 'Gaegu-Regular',
                                    color: isDark ? Colors.dark.textForeground : Colors.light.textForeground,
                                }}>
                                Snailers’
                            </Text>

                            <Text
                                className="text-3xl -ml-1"
                                style={{
                                    fontFamily: 'Gaegu-Regular',
                                    color: isDark ? Colors.dark.textForeground : Colors.light.textForeground,
                                }}>
                                Treasures
                            </Text>
                        </View>

                        <View style={{ maxWidth: MaxContentWidth, marginLeft: 'auto', marginRight: 'auto' }}>
                            <Text style={{
                                fontFamily: 'Schoolbell-Regular',
                                fontSize: 17,
                                textAlign: 'center',
                                color: isDark ? Colors.dark.textForeground : Colors.light.textForeground,
                                lineHeight: 26,
                            }}>
                                A little world of collected things, journaling, and analog crafts worth sharing.
                            </Text>
                        </View>

                        <View className="pt-6">
                            <Animated.View style={bounceStyle}>
                                <Pressable
                                    onPress={() => { router.navigate({ pathname: '/(auth)/interests' }) }}
                                    onPressIn={() => {
                                        pressScale.value = withSpring(0.75, { damping: 14, stiffness: 400 });
                                    }}
                                    onPressOut={() => {
                                        pressScale.value = withSpring(1, { damping: 6, stiffness: 300 });
                                    }}
                                    style={({ pressed }) => ({
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
                                        display: 'flex',
                                        flexDirection: 'row',
                                        gap: 8,
                                        alignItems: 'center',
                                    })}
                                >
                                    <ConfettiMinimalisticIcon color={isDark ? Colors.dark.background : Colors.light.background} size={36} />
                                    <Text style={{ fontFamily: 'Gaegu-Regular', fontSize: 20, color: isDark ? Colors.dark.background : Colors.light.background }}>
                                        Get Started
                                    </Text>
                                </Pressable>
                            </Animated.View>
                        </View>
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
        paddingHorizontal: Spacing.four,
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: Spacing.three,
        paddingBottom: BottomTabInset,
        maxWidth: MaxContentWidth,
        width: '100%',
    },
    scrollView: {
        backgroundColor: 'transparent',
        flex: 1,
    },
});