import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { StyleSheet, ToastAndroid, View } from "react-native";
import Button from "../../components/Button";
import CircleButton from "../../components/CircleButton";
import IconButton from "../../components/IconButton";
import ImageViewer from "../../components/ImageViewer";

const PlaceholderImage = require("@/assets/images/background-image.png");

export default function Index() {
  const [image, setImage] = useState<string | null>(null);
  const [showAppOptions, setShowAppOptions] = useState(false);
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

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer source={image ? image : PlaceholderImage} />
        {showAppOptions ? (
          <View style={styles.inlineButtonsContainer}>
            <View>
              <IconButton
                onPress={() => {
                  setImage(null);
                  setShowAppOptions(false);
                }}
                label="Reset"
                icon="refresh"
              />
            </View>
            <CircleButton onPress={showToast} />
            <View>
              <IconButton onPress={showToastWithGravityAndOffset} label="Share" icon="share" />
            </View>
          </View>
        ) : (
          <View style={styles.buttonsContainer}>
            <Button theme="primary" title="Change Image" onPress={pickImageAsync} />
            <Button title="Use this image" onPress={() => setShowAppOptions(true)} />
            <Button title="Clear image" onPress={() => setImage(null)} />
          </View>
        )}
      </View>
    </View>
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
