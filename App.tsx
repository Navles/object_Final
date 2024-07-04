import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  NativeModules,
  PermissionsAndroid,
  DeviceEventEmitter,
} from "react-native";
import { Camera } from "react-native-vision-camera";

const { HelloModule } = NativeModules;

const App = () => {
  const handleOnPress = () => {
    HelloModule.navigateToNative();
  };

  const requestCameraPermission = async () => {
    try {
      const newCameraPermission = await Camera.requestCameraPermission();
      console.log(newCameraPermission);
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    requestCameraPermission();

    const subscription = DeviceEventEmitter.addListener("eventKey", (event) => {
      console.log(event);
    });

    return () => {
      subscription.remove();
    };
  }, []);
  return (
    <View style={styles.container}>
      <Text onPress={handleOnPress} style={styles.btn}>
        Click Here...👆 to Navigate to Native Screen
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "black",
    color: "white",
    borderRadius: 10,
  },
});

export default App;

// import React, {useEffect} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   NativeModules,
//   PermissionsAndroid,
//   DeviceEventEmitter,
// } from 'react-native';
// import {Camera} from 'react-native-vision-camera';

// const {HelloModule} = NativeModules;

// const App = () => {
//   const handleOnPress = () => {
//     HelloModule.navigateToNative();
//   };

//   const requestCameraPermission = async () => {
//     try {
//       const newCameraPermission = await Camera.requestCameraPermission();
//       console.log(newCameraPermission);
//     } catch (err) {
//       console.warn(err);
//     }
//   };

//   useEffect(() => {
//     requestCameraPermission();

//     const subscription = DeviceEventEmitter.addListener('onDetectionResult', (event) => {
//       console.log(event.detectionResult);
//     });

//     return () => {
//       subscription.remove();
//     };
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text onPress={handleOnPress} style={styles.btn}>
//         Click Here...👆 to Navigate to Native Screen
//       </Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   btn: {
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     backgroundColor: 'black',
//     color: 'white',
//     borderRadius: 10,
//   },
// });

// export default App;
