import SSHClient from "@dylankenneally/react-native-ssh-sftp";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, View, useColorScheme } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";



export default function connexion(){
    const isDarkMode = useColorScheme() === 'dark';
    //general
    const [name,onSetUsername] = React.useState('');
    const [ipOrName, onSetIP] = React.useState('');
    const [port, onChangeNumber] = React.useState('');
    const [password, setPassword] = useState(''); 
    let message = "";
    const [showPassword, setShowPassword] = useState(false);
    //Ajouter
    const [addusername, onSetName] = useState('');
    const [adduserpass, onSetpass] = useState('');
    const [addusergroup, onSetGroup] = useState('');
    //suppprimer
    const [delusername, onDeluser] = useState('');

    return(
      
        <ScrollView style={styles.mainContainer}>
  
        <View style={styles.container}>
        <Text style={styles.addUserTitle}>Information requis:</Text>
          <TextInput
            placeholder="Nom d'utlisateur"
            style={styles.input}
            value={name}
            onChangeText={(text) => onSetUsername(text)}

          />
          <TextInput
            placeholder="Nom ou IP de l'ordinateur"
            style={styles.input}
            value={ipOrName}
            onChangeText={(text) => onSetIP(text)}

          />
          <TextInput
            placeholder='Port par defaut: 22'
            style={styles.input}


          />
          <TextInput
            secureTextEntry={!showPassword} 
            value={password} 
            onChangeText={setPassword}
            placeholder="Enter votre mot de passe"
            style={styles.input}
          />
        </View>

        <View style={styles.mainView}>

        {/* Add User Section */}
        <View style={styles.addUserContainer}>
          <Text style={styles.addUserTitle}>Ajouter un nouveau utilisateur:</Text>
          <TextInput style={styles.textInput} placeholder="Nom:" value={addusername} onChangeText={(text) => onSetName(text)} />
          <TextInput style={styles.textInput} placeholder="Ajouter au groupe:" value={addusergroup} onChangeText={(text) => onSetGroup(text)}/>
          <TextInput style={styles.textInput} 
          secureTextEntry={!showPassword} 
          placeholder="Mot de passe de ce nouveau utilisateur:" 
          value={adduserpass}
          onChangeText={(text) => onSetpass(text)}
          />
          <Button title="Ajouter" onPress={() => {ajouter(ipOrName,name,password,addusername,addusergroup,adduserpass)}} />
        </View>

        {/* Delete User Section */}
        <View style={styles.deleteUserContainer}>
        <Text style={styles.addUserTitle}>Supprimer un utilisateur existant:</Text>
          <TextInput style={styles.textInput} placeholder="Nom:" value={delusername} onChangeText={(text) => onDeluser(text)}/>
          <Button title="Supprimer" onPress={() => {Supprimer(ipOrName,name,password,delusername)}} />
        </View>  
      </View>

    </ScrollView>
  );

async function ajouter(ipOrName: string, username: string, password: string, addusername:string,addusergroup:string,adduserpass:string) {
  try {
    const client = await SSHClient.connectWithPassword(ipOrName, 22, username, password, (error, client) => {
      if (error) {
          console.error('SSH connection failed:', error);
          ToastAndroid.show('SSH connection failed. Please check credentials or network connectivity.', ToastAndroid.SHORT);
      } else {
        console.log('SSH connection established!');
        // Use the `client` object here
      }});
    console.log('SSH connection established successfully!');
    const result = await client.execute("useradd -m -G "+ addusergroup +" -p $(echo "+adduserpass+" | openssl passwd -1 -stdin) "+addusername );
    if (result == null ) {
        console.error('Error adding user:', result);
        ToastAndroid.show('Failed to add user. utilisateur existant deja.', ToastAndroid.SHORT);
    } 
    else {
        ToastAndroid.show('Utilisateur ajouter avec succes', ToastAndroid.SHORT);
    }
    // Close the connection when done
    client.closeShell();
  } catch (error) {
    console.error('SSH connection failed:', error);
    ToastAndroid.show('An unexpected error occurred. Please try again later.', ToastAndroid.SHORT);
    // Handle connection errors appropriately, e.g., display an error message to the user
  }
}
async function Supprimer(ipOrName: string, username: string, password: string, userdel:string) {
  try {
    const client = await SSHClient.connectWithPassword(ipOrName, 22, username, password, (error, client) => {
      if (error) {
        console.error('SSH connection failed:', error);
      } else {
        console.log('SSH connection established!');
        // Use the `client` object here
      }});
    console.log('SSH connection established successfully!');
    const result = await client.execute('userdel -rf '+ userdel);
    //console.log('Command execution result:', result);
    if (result == null) {
      console.error('Error deleting user:', result);
      ToastAndroid.show('Failed to delete user. utilisateur non trouvé.', ToastAndroid.SHORT);
  } else {
      ToastAndroid.show('Utilisateur supprimé avec succes', ToastAndroid.SHORT);
  }

    // Close the connection when done
    client.closeShell();
  } catch (error) {
    console.error('SSH connection failed:', error);
    ToastAndroid.show('An unexpected error occurred. Please try again later.', ToastAndroid.SHORT);
    // Handle connection errors appropriately, e.g., display an error message to the user
  }
}

}

const styles = StyleSheet.create({ 
  mainContainer: { 
      marginTop: 80, 
      margin: 40,
      alignItems: 'center',
      flex:1
  }, 
  container: { 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      borderColor: 'blue', 
      borderRadius: 8, 
      paddingHorizontal: 14, 
  }, 
  icon: { 
      marginLeft: 10, 
  }, 
  heading: { 
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 24, 
      color: 'green', 
      marginBottom: 20, 
  },
  input: {
    padding: 10,
    margin: 5,
    borderBottomWidth: 1,
  },
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

