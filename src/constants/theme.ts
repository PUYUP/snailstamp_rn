/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';
import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

export const Colors = {
  light: {
    text: '#434536',               // --foreground
    background: '#FCF9F0',         // --background
    backgroundElement: '#F0EEE1',  // --secondary / --muted
    backgroundSelected: '#D8E9D3', // --accent
    textSecondary: '#6C6F5F',      // --muted-foreground
    textPrimary: '#88A77B',
    textPrimaryForeground: '#353B30',
    textForeground: '#5B5C4D',
  },
  dark: {
    text: '#EDECE0',               // --foreground
    background: '#151D15',         // --background
    backgroundElement: '#2A332A',  // --secondary / --muted
    backgroundSelected: '#2F3C2B', // --accent
    textSecondary: '#A1A798',      // --muted-foreground
    textPrimary: '#88A77B',
    textPrimaryForeground: '#EDECE0',
    textForeground: '#E6E7D8',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const PaperThemes = {
  light: {
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      primary: Colors.light.textPrimary, // #88A77B
      onPrimary: Colors.light.textPrimaryForeground, // #353B30
      primaryContainer: Colors.light.backgroundSelected, // #D8E9D3
      onPrimaryContainer: Colors.light.textPrimaryForeground,
      secondary: Colors.light.textPrimary,
      secondaryContainer: Colors.light.backgroundSelected,
      onSecondaryContainer: Colors.light.textPrimaryForeground,
      background: Colors.light.background, // #FCF9F0
      surface: Colors.light.background,
      surfaceVariant: Colors.light.backgroundElement, // #F0EEE1
      onSurface: Colors.light.text, // #434536
      onSurfaceVariant: Colors.light.textSecondary, // #6C6F5F
      outline: Colors.light.textSecondary,
    },
  },
  dark: {
    ...MD3DarkTheme,
    colors: {
      ...MD3DarkTheme.colors,
      primary: Colors.dark.textPrimary, // #88A77B
      onPrimary: Colors.dark.textPrimaryForeground, // #EDECE0
      primaryContainer: Colors.dark.backgroundSelected, // #2F3C2B
      onPrimaryContainer: Colors.dark.textPrimaryForeground,
      secondary: Colors.dark.textPrimary,
      secondaryContainer: Colors.dark.backgroundSelected,
      onSecondaryContainer: Colors.dark.textPrimaryForeground,
      background: Colors.dark.background, // #151D15
      surface: Colors.dark.background,
      surfaceVariant: Colors.dark.backgroundElement, // #2A332A
      onSurface: Colors.dark.text, // #EDECE0
      onSurfaceVariant: Colors.dark.textSecondary, // #A1A798
      outline: Colors.dark.textSecondary,
    },
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

/**
 * Custom Google Fonts loaded via useFonts in _layout.tsx.
 * Use these with the `fontFamily` style prop on <Text> components.
 */
export const CustomFonts = {
  bubblegumSans: 'BubblegumSans-Regular',
  caveatBrush: 'CaveatBrush-Regular',
  gaeguLight: 'Gaegu-Light',
  gaegu: 'Gaegu-Regular',
  gaeguBold: 'Gaegu-Bold',
  gluten: 'Gluten-Regular',
  playpenSans: 'PlaypenSans-Regular',
  schoolbell: 'Schoolbell-Regular',
} as const;

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
