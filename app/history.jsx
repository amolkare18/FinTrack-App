import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const History = () => {
  const [expenses, setExpenses] = useState([]);

  // Fetch expenses from AsyncStorage
  const loadExpenses = async () => {
    try {
      const storedExpenses = await AsyncStorage.getItem("expenses");
      setExpenses(storedExpenses ? JSON.parse(storedExpenses) : []);
    } catch (error) {
      console.error("Error loading expenses:", error);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  // Delete Expense Function (With Instant Update)
  const deleteExpense = async (id) => {
    try {
      const updatedExpenses = expenses.filter((expense) => expense.id !== id);
      setExpenses(updatedExpenses); // 🔥 Instantly update UI
      await AsyncStorage.setItem("expenses", JSON.stringify(updatedExpenses));
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  // Confirmation Before Deletion
  const confirmDelete = (id) => {
    Alert.alert("Delete Expense?", "Are you sure you want to delete this expense?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", onPress: () => deleteExpense(id), style: "destructive" },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Expense History</Text>

      {expenses.length === 0 ? (
        <Text style={styles.noExpenses}>No expenses recorded.</Text>
      ) : (
        <FlatList
          data={expenses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.expenseItem}>
              <View>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.amount}>₹{item.amount}</Text>
              </View>
              <TouchableOpacity onPress={() => confirmDelete(item.id)} style={styles.deleteButton}>
                <Text style={styles.deleteText}>X</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f4f4f4" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  noExpenses: { textAlign: "center", fontSize: 16, color: "#888", marginTop: 20 },
  expenseItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    elevation: 2,
  },
  description: { fontSize: 16, fontWeight: "bold", color: "#333" },
  amount: { fontSize: 14, color: "#888", marginTop: 3 },
  deleteButton: { backgroundColor: "#ff4d4d", padding: 10, borderRadius: 5 },
  deleteText: { color: "white", fontSize: 16, fontWeight: "bold" },
});

export default History;
