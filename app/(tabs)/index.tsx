import domtoimage from "dom-to-image";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { useEffect, useRef, useState } from "react";
import { ImageSourcePropType, Platform, StyleSheet, ToastAndroid, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated/src/initializers"; // add this line at top
import { captureRef } from "react-native-view-shot";
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
  const [mediaPermissions, requestMediaPermission] = MediaLibrary.usePermissions();
  const imageRef = useRef<View>(null);
  useEffect(() => {
    if (!mediaPermissions?.granted) {
      requestMediaPermission();
    }
  }, [mediaPermissions, requestMediaPermission]);

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

  const saveImageAsync = async () => {
    try {
      if (Platform.OS !== "web") {
        if (imageRef.current) {
          const localUri = await captureRef(imageRef, {
            height: 440,
            quality: 1,
          });

          await MediaLibrary.saveToLibraryAsync(localUri);
          if (mediaPermissions?.granted) {
            ToastAndroid?.show("Saved to photo gallery!", ToastAndroid.SHORT);
          } else {
            requestMediaPermission();
            if (mediaPermissions?.granted) {
              ToastAndroid?.show("Saved to photo gallery!", ToastAndroid.SHORT);
            }
          }
        }
      } else {
        const dataUrl = await domtoimage.toPng(imageRef.current!, { quality: 1 });
        const link = document.createElement("a");
        link.download = "sticker-smash.png";
        link.href = dataUrl;
        link.click();
        link.remove();
        ToastAndroid?.show("Saved to downloads!", ToastAndroid.SHORT);
      }
    } catch (e: Error | any) {
      console.log(e);
      ToastAndroid?.show(`Failed to save image! ${e.message}`, ToastAndroid.SHORT);
    }
  };

  return (
    <GestureHandlerRootView style={styles.imageContainer}>
      <View style={styles.container}>
        <View ref={imageRef} style={{ position: "relative" }} collapsable={false}>
          <ImageViewer source={image ? image : PlaceholderImage} />
          {pickedEmoji ? <EmojiStickerWeb imageSize={40} stickerSource={pickedEmoji} /> : null}
        </View>
        {showAppOptions ? (
          <View style={styles.optionsContainer}>
            <IconButton
              onPress={() => {
                setImage(null);
                setShowAppOptions(false);
                setPickedEmoji(null);
              }}
              label="Reset"
              icon="refresh"
            />
            <CircleButton onPress={addSticker} />
            <IconButton onPress={() => saveImageAsync()} label="Save" icon="save" />
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
