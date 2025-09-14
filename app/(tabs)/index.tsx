import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { ImageSourcePropType, StyleSheet, ToastAndroid, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated/src/initializers"; // add this line at top
import Button from "../../components/Button";
import CircleButton from "../../components/CircleButton";
import EmojiList from "../../components/EmojiList";
import EmojiPicker from "../../components/EmojiPicker";
import EmojiStickerWeb from "../../components/EmojiStickerWeb";
import IconButton from "../../components/IconButton";
import ImageViewer from "../../components/ImageViewer";
const PlaceholderImage = require("@/assets/images/background-image.png");

// Web does not support the native Reanimated logger configuration
export default function Index() {
  const [image, setImage] = useState<string | null>(null);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSourcePropType | null>(null);
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result);
      setImage(result.assets[0].uri);
    } else {
      ToastAndroid?.show("You did not select any image.", ToastAndroid.SHORT);
    }
  };

  const showToast = () => {
    ToastAndroid?.show("A pikachu appeared nearby !", ToastAndroid.SHORT);
  };

  const showToastWithGravity = () => {
    ToastAndroid?.show("A wild charmander appeared nearby !", ToastAndroid.SHORT);
  };

  const showToastWithGravityAndOffset = () => {
    ToastAndroid?.show("A wild bulbasaur appeared nearby !", ToastAndroid.LONG);
  };

  const addSticker = () => {
    setShowEmojiPicker(true);
  };

  const saveImageAsync = () => {
    alert("Saving image");
  };

  return (
    <GestureHandlerRootView style={styles.imageContainer}>
      <View style={styles.container}>
        <View style={{ position: "relative" }}>
          <ImageViewer source={image ? image : PlaceholderImage} />
          {pickedEmoji ? <EmojiStickerWeb imageSize={40} stickerSource={pickedEmoji} /> : null}
        </View>
        {showAppOptions ? (
          <View style={styles.optionsContainer}>
            <IconButton
              onPress={() => {
                setImage(null);
                setShowAppOptions(false);
              }}
              label="Reset"
              icon="refresh"
            />
            <CircleButton onPress={addSticker} />
            <IconButton onPress={showToastWithGravityAndOffset} label="Share" icon="share" />
          </View>
        ) : (
          <View style={styles.buttonsContainer}>
            <Button theme="primary" title="Change Image" onPress={pickImageAsync} />
            <Button title="Use this image" onPress={() => setShowAppOptions(true)} />
            <Button title="Clear image" onPress={() => setImage(null)} />
          </View>
        )}
        <EmojiPicker visible={showEmojiPicker} onClose={() => setShowEmojiPicker(false)}>
          <EmojiList onCloseModal={() => setShowEmojiPicker(false)} onSelect={setPickedEmoji} />
        </EmojiPicker>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  whiteButton: {
    color: "#fff",
  },
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  imageContainer: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "000",
  },
  optionsContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 80,
  },
  buttonsContainer: {
    alignItems: "center",
  },
  inlineButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
