import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Defs, G, LinearGradient, Path, Stop } from 'react-native-svg';

interface PlayfulBackgroundProps {
  isDark?: boolean;
}

/**
 * Komponen background abstrak & playful dengan sentuhan estetika scrapbook:
 * - Organic abstract pastel blobs
 * - Hand-drawn sparkle stars (✦)
 * - Doodle spirals, squiggles, cross-stitches, dan stamp perforation dots
 */
export function PlayfulBackground({ isDark = false }: PlayfulBackgroundProps) {
  // Palet warna yang selaras dengan tema pastel alam (sage, sand/peach, soft rose)
  const blobSage = isDark ? '#223023' : '#E4EFE2';
  const blobPeach = isDark ? '#31291D' : '#F8ECD8';
  const blobRose = isDark ? '#302027' : '#F3E2EA';
  const doodleColor = isDark ? '#7E9178' : '#C7BCAE';
  const accentDoodle = isDark ? '#88A77B' : '#9EB793';

  return (
    <View style={[StyleSheet.absoluteFill, { opacity: 0.6 }]} pointerEvents="none">
      <Svg width="100%" height="100%" viewBox="0 0 400 850" preserveAspectRatio="xMidYMid slice">
        <Defs>
          <LinearGradient id="gradTop" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0%" stopColor={blobSage} stopOpacity={isDark ? 0.65 : 0.8} />
            <Stop offset="100%" stopColor={blobPeach} stopOpacity="0.25" />
          </LinearGradient>
          <LinearGradient id="gradBottom" x1="1" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor={blobPeach} stopOpacity={isDark ? 0.5 : 0.7} />
            <Stop offset="100%" stopColor={blobRose} stopOpacity={isDark ? 0.35 : 0.5} />
          </LinearGradient>
        </Defs>

        {/* 1. Organic Abstract Pastel Blobs */}
        {/* Blob Kiri Atas (Dekat Judul snail stamp) */}
        <Path
          d="M -30 -30 C 50 -50, 140 10, 160 80 C 180 150, 120 220, 40 230 C -40 240, -90 170, -80 80 Z"
          fill="url(#gradTop)"
        />

        {/* Blob Kanan Tengah (Di Sekitar Peta Dunia) */}
        <Path
          d="M 440 280 C 370 270, 310 330, 300 400 C 290 480, 360 550, 430 570 C 500 590, 520 460, 510 360 Z"
          fill={blobPeach}
          opacity={isDark ? 0.4 : 0.65}
        />

        {/* Blob Kiri Bawah (Di Belakang Teks Deskripsi) */}
        <Path
          d="M -40 660 C 20 620, 120 650, 140 720 C 160 790, 110 860, 30 870 C -50 880, -100 810, -90 740 Z"
          fill="url(#gradBottom)"
        />

        {/* Blob Aksen Lembut Kanan Atas */}
        <Path
          d="M 360 40 C 390 30, 420 60, 410 90 C 400 120, 360 130, 340 110 C 320 90, 330 50, 360 40 Z"
          fill={blobRose}
          opacity={isDark ? 0.4 : 0.55}
        />

        {/* 2. Playful Doodle Elements */}

        {/* Sparkle ✦ di Kiri Atas */}
        <Path
          d="M 46 100 Q 46 112 34 112 Q 46 112 46 124 Q 46 112 58 112 Q 46 112 46 100 Z"
          fill={accentDoodle}
          opacity={0.8}
        />
        <Circle cx="64" cy="102" r="2" fill={accentDoodle} opacity={0.6} />

        {/* Sparkle ✦ Utama di Kanan Atas */}
        <Path
          d="M 330 90 Q 330 106 314 106 Q 330 106 330 122 Q 330 106 346 106 Q 330 106 330 90 Z"
          fill={accentDoodle}
          opacity={0.85}
        />
        <Circle cx="310" cy="80" r="2.5" fill={doodleColor} opacity={0.7} />
        <Circle cx="355" cy="116" r="1.8" fill={doodleColor} opacity={0.6} />

        {/* Spiral Doodle Coretan Tangan di Kiri */}
        <Path
          d="M 22 280 C 22 268, 38 268, 38 280 C 38 296, 12 296, 12 280 C 12 255, 48 255, 48 280 C 48 308, 2 308, 2 280"
          stroke={doodleColor}
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
          opacity={0.45}
        />

        {/* Squiggle Wavy Line di Samping Kanan Peta */}
        <Path
          d="M 360 230 Q 375 236 360 248 T 360 266 T 360 284"
          stroke={accentDoodle}
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
          opacity={0.65}
        />

        {/* Cross-stitches (++) di Sudut-sudut */}
        <G stroke={doodleColor} strokeWidth="1.6" strokeLinecap="round" opacity={0.55}>
          <Path d="M 368 170 L 378 170 M 373 165 L 373 175" />
          <Path d="M 28 410 L 38 410 M 33 405 L 33 415" />
          <Path d="M 350 670 L 360 670 M 355 665 L 355 675" />
        </G>

        {/* Polka Dots Melengkung Ala Perforasi Prangko */}
        <G fill={doodleColor} opacity={0.45}>
          <Circle cx="40" cy="510" r="2.5" />
          <Circle cx="54" cy="516" r="2" />
          <Circle cx="68" cy="524" r="2.2" />
          <Circle cx="82" cy="535" r="2" />
          <Circle cx="96" cy="548" r="2.4" />
        </G>

        {/* Sparkle ✦ di Kanan Tengah Dekat Teks Discover */}
        <Path
          d="M 345 590 Q 345 602 333 602 Q 345 602 345 614 Q 345 602 357 602 Q 345 602 345 590 Z"
          fill={accentDoodle}
          opacity={0.75}
        />

        {/* Asterisk (*) Coretan Bintang di Kiri Bawah */}
        <G stroke={doodleColor} strokeWidth="1.6" strokeLinecap="round" opacity={0.6}>
          <Path d="M 60 710 L 70 720" />
          <Path d="M 70 710 L 60 720" />
          <Path d="M 65 708 L 65 722" />
        </G>

        {/* Wavy Line Halus di Bawah Tombol Get Started */}
        <Path
          d="M 150 826 Q 165 818 180 826 T 210 826 T 240 826"
          stroke={accentDoodle}
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
          opacity={0.5}
        />
      </Svg>
    </View>
  );
}
