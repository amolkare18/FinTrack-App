import { View, Text, StyleSheet, Pressable, ImageBackground } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import bgimg from "@/assets/images/image copy 3.png";

const app = () => {
  return (
    <ImageBackground source={bgimg} style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>
        <Text style={styles.text}>FinTrack</Text>

        <Link style={styles.link} href="/history" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttontext}> Your Past Expenses</Text>
          </Pressable>
        </Link>

        <Link style={styles.link} href="/addExpense" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttontext}>Add Expense</Text>
          </Pressable>
        </Link>
      </View>
    </ImageBackground>
  );
};

export default app;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Dark overlay for better text visibility
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  text: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  link: {
    width: "100%",
  },
  button: {
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Semi-transparent button
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginBottom: 20,
    alignSelf: "center",
  },
  buttontext: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});
