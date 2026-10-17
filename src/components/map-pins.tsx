import { Colors } from '@/constants/theme';
import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  type AnimatedStyle,
} from 'react-native-reanimated';

export interface MapPinItem {
  id: string;
  title: string;
  category: string;
  image: string;
  top: `${number}%`;
  left: `${number}%`;
  rotation: string;
  color: string;
}

export const MAP_PINS: MapPinItem[] = [
  {
    id: '1',
    title: 'Vintage Sicker',
    category: 'Stamps',
    image: 'https://images.unsplash.com/photo-1614314220469-68dbbf34c5e6?w=160&auto=format&fit=crop&q=80',
    top: '16%',
    left: '20%',
    rotation: '-4deg',
    color: '#D97757', // terracotta
  },
  {
    id: '2',
    title: 'Junk Journal',
    category: 'Journal',
    image: 'https://images.unsplash.com/photo-1771926646142-0bbdd0429d7c?w=160&auto=format&fit=crop&q=80',
    top: '62%',
    left: '25%',
    rotation: '3deg',
    color: '#88A77B', // sage green
  },
  {
    id: '3',
    title: 'Wax Seal',
    category: 'Lettering',
    image: 'https://images.unsplash.com/photo-1732365898799-82f2db303a2d?w=160&auto=format&fit=crop&q=80',
    top: '25%',
    left: '49%',
    rotation: '-3deg',
    color: '#C49A45', // warm bronze
  },
  {
    id: '4',
    title: 'Mail Clubs',
    category: 'Penpal',
    image: 'https://images.unsplash.com/photo-1643041642140-703d6b34479e?w=160&auto=format&fit=crop&q=80',
    top: '69%',
    left: '55%',
    rotation: '4deg',
    color: '#658C96', // muted ocean blue
  },
  {
    id: '5',
    title: 'Pens & markers',
    category: 'Stickers',
    image: 'https://images.unsplash.com/photo-1568205612837-017257d2310a?w=160&auto=format&fit=crop&q=80',
    top: '14%',
    left: '74%',
    rotation: '-3deg',
    color: '#D47E95', // dusty rose
  },
  {
    id: '6',
    title: 'Pressed Flora',
    category: 'Botanical',
    image: 'https://images.unsplash.com/photo-1620410754013-82f3311cf059?w=160&auto=format&fit=crop&q=80',
    top: '58%',
    left: '78%',
    rotation: '3deg',
    color: '#769477', // olive
  },
];

interface SinglePinProps {
  pin: MapPinItem;
  index: number;
  isSelected: boolean;
  onPress: () => void;
  isDark: boolean;
}

type PinAnimatedStyle = StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;

interface PinViewProps extends Omit<SinglePinProps, 'index'> {
  cardStyle?: PinAnimatedStyle;
  waveStyle?: PinAnimatedStyle;
  showWave?: boolean;
}

/**
 * Tampilan pin bersama (struktur & layout identik untuk versi animasi maupun statis).
 * Animated.View aman dirender di SSR selama tidak ada animated style yang dipasang.
 */
function PinView({
  pin,
  isSelected,
  onPress,
  isDark,
  cardStyle,
  waveStyle,
  showWave = true,
}: PinViewProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.pinContainer,
        {
          top: pin.top,
          left: pin.left,
          zIndex: isSelected ? 30 : 10,
        },
      ]}>
      {/* Tooltip Card */}
      <Animated.View
        style={[
          styles.tooltipCard,
          cardStyle,
          {
            backgroundColor: isDark ? '#2A332A' : '#FFFFFF',
            borderColor: isSelected ? pin.color : isDark ? '#3D493D' : '#FFFFFF',
          },
        ]}>
        <View
          style={[
            styles.washiTape,
            { backgroundColor: isDark ? '#4D584D' : '#E8DFD0' },
          ]}
        />

        <View style={{ height: 65 }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image
              source={{ uri: pin.image }}
              style={styles.cardImage}
              contentFit="cover"
              transition={200}
            />
          </View>

          <Text
            numberOfLines={1}
            style={[
              styles.cardTitle,
              {
                marginTop: 'auto',
                color: isDark ? Colors.dark.textForeground : Colors.light.textForeground,
              },
            ]}>
            {pin.title}
          </Text>
        </View>
      </Animated.View>

      {/* Pointer Pin & Titik */}
      <View style={styles.pinPointWrapper}>
        <View style={[styles.pinStem, { backgroundColor: pin.color }]} />

        <View style={styles.dotContainer}>
          {showWave && (
            <Animated.View
              style={[
                styles.pinWaveRing,
                {
                  borderColor: pin.color,
                  backgroundColor: pin.color + '33',
                },
                waveStyle,
              ]}
            />
          )}

          <View
            style={[
              styles.pinDot,
              {
                backgroundColor: pin.color,
                borderColor: '#FFFFFF',
                transform: [{ scale: isSelected ? 1.3 : 1 }],
              },
            ]}
          />
        </View>
      </View>
    </Pressable>
  );
}

/**
 * Versi dengan animasi Reanimated (client-side).
 */
function AnimatedMapPin({ pin, index, isSelected, onPress, isDark }: SinglePinProps) {
  const sway = useSharedValue(0);
  const floatY = useSharedValue(0);
  const waveScale = useSharedValue(1);
  const waveOpacity = useSharedValue(0.7);

  const baseAngle = parseFloat(pin.rotation) || 0;

  useEffect(() => {
    // Di lingkungan SSR (Server), hentikan
    if (Platform.OS === 'web' && typeof window === 'undefined') {
      return;
    }

    const delay = index * 260;
    const swayDuration = 2000 + (index % 3) * 400;
    const waveDuration = 1900 + (index % 2) * 350;

    // 1. Goyang smooth ke kiri dan kanan + float halus
    const swayTimer = setTimeout(() => {
      sway.value = withRepeat(
        withSequence(
          withTiming(1, { duration: swayDuration, easing: Easing.inOut(Easing.sin) }),
          withTiming(-1, { duration: swayDuration, easing: Easing.inOut(Easing.sin) })
        ),
        -1,
        true
      );

      floatY.value = withRepeat(
        withSequence(
          withTiming(-2.5, { duration: swayDuration * 0.95, easing: Easing.inOut(Easing.quad) }),
          withTiming(2, { duration: swayDuration * 0.95, easing: Easing.inOut(Easing.quad) })
        ),
        -1,
        true
      );
    }, delay);

    // 2. Gelombang wave/ripple berkedip membesar dari titik pin
    const waveTimer = setTimeout(() => {
      waveScale.value = withRepeat(
        withTiming(2.7, { duration: waveDuration, easing: Easing.out(Easing.ease) }),
        -1,
        false
      );

      waveOpacity.value = withRepeat(
        withTiming(0, { duration: waveDuration, easing: Easing.out(Easing.ease) }),
        -1,
        false
      );
    }, delay * 0.6);

    return () => {
      clearTimeout(swayTimer);
      clearTimeout(waveTimer);
    };
  }, [index, floatY, sway, waveOpacity, waveScale]);

  const animatedCardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: floatY.value },
      { rotate: `${baseAngle + sway.value * 3}deg` },
      { scale: isSelected ? 1.14 : 1 },
    ],
  }));

  const animatedWaveStyle = useAnimatedStyle(() => ({
    transform: [{ scale: waveScale.value }],
    opacity: waveOpacity.value,
  }));

  return (
    <PinView
      pin={pin}
      isSelected={isSelected}
      onPress={onPress}
      isDark={isDark}
      cardStyle={animatedCardStyle}
      waveStyle={animatedWaveStyle}
    />
  );
}

/**
 * Fallback statis untuk SSR (Server-Side / Build time di Node.js).
 * Layout sama persis dengan AnimatedMapPin, hanya tanpa animasi
 * (rotasi awal tetap diterapkan, ring gelombang disembunyikan).
 */
function StaticMapPin({ pin, isSelected, onPress, isDark }: Omit<SinglePinProps, 'index'>) {
  return (
    <PinView
      pin={pin}
      isSelected={isSelected}
      onPress={onPress}
      isDark={isDark}
      showWave={false}
      cardStyle={{
        transform: [{ rotate: pin.rotation }, { scale: isSelected ? 1.14 : 1 }],
      }}
    />
  );
}

interface MapPinsProps {
  isDark?: boolean;
}

export function MapPins({ isDark = false }: MapPinsProps) {
  const [activePin, setActivePin] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {MAP_PINS.map((pin, index) =>
        isClient ? (
          <AnimatedMapPin
            key={pin.id}
            pin={pin}
            index={index}
            isDark={isDark}
            isSelected={activePin === pin.id}
            onPress={() => setActivePin(activePin === pin.id ? null : pin.id)}
          />
        ) : (
          <StaticMapPin
            key={pin.id}
            pin={pin}
            isDark={isDark}
            isSelected={activePin === pin.id}
            onPress={() => setActivePin(activePin === pin.id ? null : pin.id)}
          />
        )
      )}
    </>
  );
}

const styles = StyleSheet.create({
  pinContainer: {
    position: 'absolute',
    alignItems: 'center',
    transform: [{ translateX: -24 }, { translateY: -56 }],
  },
  tooltipCard: {
    padding: 3,
    paddingBottom: 4,
    borderRadius: 0,
    borderWidth: 1.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.16,
    shadowRadius: 3,
    elevation: 4,
    alignItems: 'center',
    minWidth: 64,
    minHeight: 72,
  },
  washiTape: {
    position: 'absolute',
    top: -4,
    width: 18,
    height: 6,
    borderRadius: 1,
    opacity: 0.85,
  },
  cardImage: {
    width: 50,
    height: 46,
    borderRadius: 0,
    backgroundColor: '#E0DDD3',
  },
  cardTitle: {
    fontFamily: 'Schoolbell-Regular',
    fontSize: 9,
    marginTop: 2,
    textAlign: 'center',
  },
  pinPointWrapper: {
    alignItems: 'center',
  },
  pinStem: {
    width: 1.5,
    height: 4,
  },
  dotContainer: {
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  pinWaveRing: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1.5,
  },
  pinDot: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    borderWidth: 1.8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 1.5,
    elevation: 3,
  },
});