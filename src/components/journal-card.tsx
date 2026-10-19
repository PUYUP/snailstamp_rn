import { Galeria } from '@nandorojo/galeria';
import { Image, Text, useWindowDimensions, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Carousel } from "react-native-reanimated-carousel";

export default function JournalCard() {
    const { width } = useWindowDimensions();
    const urls: string[] = [
        'https://images.unsplash.com/photo-1614314220469-68dbbf34c5e6',
        'https://images.unsplash.com/photo-1771926646142-0bbdd0429d7c',
    ];

    return (
        <View className='flex flex-row gap-1'>
            <View style={{ width: 266 }}>
                <GestureHandlerRootView style={{ flex: 1, width: '100%' }}>
                    <View style={{ flex: 1, justifyContent: "center", width: '100%' }}>
                        <Carousel
                            style={{ width: '100%', height: 324 }}
                            data={urls}
                            loop={false}
                            layout={{
                                type: 'horizontal-stack', // or 'vertical-stack'
                                exitDirection: 'left',    // previously snapDirection ('left' | 'right')
                                spacing: 18,              // previously stackInterval
                                scaleStep: 0.12,          // previously scaleInterval
                                opacityStep: 0.15,         // previously opacityInterval
                                rotation: 45,             // previously rotateZDeg
                                visibleCount: 3,          // previously showLength
                            }}
                            renderItem={({ item, index }) => (
                                <Galeria.Image index={index} key={index} style={{ padding: 6 }}>
                                    <View
                                        style={{
                                            width: '100%',
                                            height: 304,
                                            backgroundColor: '#fff',
                                            shadowColor: '#000',
                                            shadowOffset: { width: 0, height: 2 },
                                            shadowOpacity: 0.25,
                                            shadowRadius: 3.84,
                                            elevation: 5,
                                            paddingTop: 12,
                                            paddingHorizontal: 12,
                                        }}>
                                        <Image source={{ uri: item }} style={{ width: '100%', height: 226 }} />
                                        <View style={{ flex: 1, padding: 8, display: 'flex', justifyContent: 'center' }}>
                                            <Text numberOfLines={3} className='leading-4' style={{ fontSize: 17, textAlign: 'center', fontFamily: 'Gaegu-Light' }}>
                                                This is a journal. It is a place where I can write my thoughts and feelings. It is also a place where I can write my dreams and goals. I am so happy that I have this journal. It is a very special place for me.
                                            </Text>
                                        </View>
                                    </View>
                                </Galeria.Image>
                            )}
                        />
                    </View>
                </GestureHandlerRootView>
            </View>

            <View style={{ flex: 1, padding: 12 }}>
                <View style={{ flex: 1, backgroundColor: 'red' }}>
                    <Text>Next</Text>
                </View>
            </View>
        </View>
    )
}