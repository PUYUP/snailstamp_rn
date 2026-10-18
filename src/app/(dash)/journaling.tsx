import { ThemedView } from "@/components/themed-view";
import { MaxContentWidth, Spacing } from "@/constants/theme";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Journaling() {
    return (
        <ThemedView style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <Text>Journaling</Text>
            </SafeAreaView>
        </ThemedView>
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