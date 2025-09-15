import { ImageSourcePropType, Platform, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import EmojiStickerWeb from "./EmojiStickerWeb";

type Props = {
  imageSize: number;
  stickerSource: ImageSourcePropType;
};

const EmojiSticker =
  Platform.OS === "web"
    ? EmojiStickerWeb
    : function EmojiSticker({ imageSize, stickerSource }: Props) {
        const scaleImage = useSharedValue(imageSize);

        const doubleTap = Gesture.Tap()
          .numberOfTaps(2)
          .onStart(() => {
            if (scaleImage.value !== imageSize * 2) {
              scaleImage.value = scaleImage.value * 2;
            } else {
              scaleImage.value = Math.round(scaleImage.value / 2);
            }
          });

        const imageStyle = useAnimatedStyle(() => {
          return {
            width: withSpring(scaleImage.value),
            height: withSpring(scaleImage.value),
          };
        });

        return (
          <View style={{ top: 15, right: 15, position: "absolute" }}>
            <GestureDetector gesture={doubleTap}>
              <Animated.Image
                source={stickerSource}
                resizeMode="contain"
                style={[imageStyle, { width: imageSize, height: imageSize }]}
              />
            </GestureDetector>
          </View>
        );
      };

export default EmojiSticker;
