import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  PlatformModule,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as GoogleSignIn from "expo-google-sign-in";

function Login() {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState();

  /* //initialize google sign in
  useEffect(() => {
    initAsync();
  }); */

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../Design/Logos/Logo1.png")}
      />
      <TouchableOpacity
        google={true}
        style={styles.buttonLogin}
        onPress={() => {
          navigation.navigate("Main");
          console.log("logged in");
        }}
      >
        <Text style={styles.text}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonRegister}>
        <Text style={styles.text}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

/* const androidClientId =
  "685190707194-gedikur3biclc716vc9pd6l32mlapoes.apps.googleusercontent.com";

const initAsync = async () => {
  try {
    GoogleSignIn.initAsync({
      cliendId: androidClientId,
    });
    getUserDetails();
  } catch ({ message }) {
    console.log("Google sign in error" + message);
  }
};

const getUserDetails = async () => {
  const user = await GoogleSignIn.signInSilentlyAsync();
  setUserInfo({ ...user });
};

const handleGoogleSignin = async () => {
  try {
    await GoogleSignIn.askForPlayServicesAsync();
    const { type, user } = await GoogleSignIn.signInAsync();
    if (type === "success") {
      //getUserDetails();
      navigation.navigate("Main");
    } else {
      console.log("Google sign in cancelled");
    }
  } catch ({ message }) {
    console.log("Google sing in error" + message);
  }
}; */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  buttonLogin: {
    width: 200,
    height: 50,
    padding: 10,
    backgroundColor: "#31AFB4",
  },
  buttonRegister: {
    width: 200,
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: "#BBBBBB",
    marginTop: 15,
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default Login;
