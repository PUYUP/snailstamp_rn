import JournalCard from "@/components/journal-card";
import { PlayfulBackground } from "@/components/playful-background";
import { ThemedView } from "@/components/themed-view";
import { MaxContentWidth, Spacing } from "@/constants/theme";
import { ScrollView, StyleSheet, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function JournalPreview() {
    const isDark = useColorScheme() === 'dark';

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
                    <JournalCard />
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
        paddingHorizontal: Spacing.three,
        flex: 1,
        width: '100%',
    },
});