import { Image } from "expo-image";
import { ImageSourcePropType, View } from "react-native";

type Props = {
  imageSize: number;
  stickerSource: ImageSourcePropType;
};

export default function EmojiStickerWeb({ imageSize, stickerSource }: Props) {
  return (
    <View style={{ top: 15, right: 15, position: "absolute" }}>
      <Image source={stickerSource} style={{ width: imageSize, height: imageSize }} />
    </View>
  );
}
