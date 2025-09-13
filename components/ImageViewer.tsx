import { Image } from "expo-image";
import { ImageSourcePropType, StyleSheet } from "react-native";

type Props = {
  source: ImageSourcePropType;
};

export default function ImageViewer({ source }: Props) {
  return <Image source={source} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
});
