import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Add = ({ navigation }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const saveExpense = async () => {
    if (!description || !amount) {
      Alert.alert("Error", "Please enter a description and amount.");
      return;
    }

    const newExpense = {
      id: Date.now().toString(),
      description,
      amount: parseFloat(amount),
      date: new Date().toISOString(),
    };

    try {
      const existingExpenses = await AsyncStorage.getItem("expenses");
      const expenses = existingExpenses ? JSON.parse(existingExpenses) : [];

      expenses.push(newExpense);
      await AsyncStorage.setItem("expenses", JSON.stringify(expenses));

      Alert.alert("Success", "Expense saved!");
      setDescription("");
      setAmount("");

      if (navigation) navigation.goBack();
    } catch (error) {
      console.error("Error saving expense:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>Add Expense</Text>

        <Text style={styles.label}>Expense Description:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter description"
          placeholderTextColor="#666"
          value={description}
          onChangeText={setDescription}
        />

        <Text style={styles.label}>Amount Spent:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          placeholderTextColor="#666"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />

        <TouchableOpacity style={styles.button} onPress={saveExpense}>
          <Text style={styles.buttonText}>Save Expense</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5", // Light gray background for contrast
    padding: 20,
  },
  card: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, // Shadow for Android
    borderWidth: 1,
    borderColor: "#ddd", // Light border for subtle styling
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#444",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: "#fafafa",
    color: "#333",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Add;
