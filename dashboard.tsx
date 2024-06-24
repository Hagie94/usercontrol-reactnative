import SSHClient from "@dylankenneally/react-native-ssh-sftp";
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import onSeconnecter from "./back";
import { useState } from "react";

export default function Dashboard() {
    const [showPassword, setShowPassword] = useState(false);
    

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.welcomeText}>Bienvenue root!</Text>
      <Text style={styles.errorText}>Error occur</Text>

      <View style={styles.mainView}>
        {/* User List Section */}
        <View style={styles.userListContainer}>
          <Text style={styles.userListTitle}>Les des utilisateurs systèmes:</Text>
          <Text style={styles.userItem}>John Doa</Text>
          <Text style={styles.userItem}>Marie Joie</Text>
          <Text style={styles.userItem}>Don Kar</Text>
        </View>

        {/* Add User Section */}
        <View style={styles.addUserContainer}>
          <Text style={styles.addUserTitle}>Ajouter un nouveau utilisateur:</Text>
          <TextInput style={styles.textInput} placeholder="Nom:" />
          <TextInput style={styles.textInput} placeholder="Ajouter au groupe:" />
          <TextInput style={styles.textInput} 
          secureTextEntry={!showPassword} 
          placeholder="Mot de passe de ce nouveau utilisateur:" />
          <Button title="Ajouter" onPress={() => {}} />
        </View>

        {/* Delete User Section */}
        <View style={styles.deleteUserContainer}>
            <Text>Supprimer un utilisateur existant:</Text>
          <TextInput style={styles.textInput} placeholder="Nom:" />
          <Button title="Supprimer" />
        </View>  
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    padding: 20,
  },
  welcomeText: {
    fontSize: 18,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
  },
  mainView: {
    //flex: 1, // Makes the view occupy all available space
    flexDirection: 'column',
    alignItems: 'center', // Center elements horizontally
  },
  userListContainer: {
    backgroundColor: '#f3f3f3',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  userListTitle: {
    fontSize: 18,
    marginBottom: 5,
  },
  userItem: {
    marginBottom: 5,
  },
  addUserContainer: {
    backgroundColor: 'green',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  addUserTitle: {
    fontSize: 18,
    marginBottom: 5,
  },
  deleteUserContainer: {
    backgroundColor: 'red',
    borderRadius: 8,
    padding: 10,
  },
  textInput: {
    padding: 8,
    marginBottom: 10,
    borderRadius: 4,
    backgroundColor: '#fff', // White background for better visibility
  },
});
