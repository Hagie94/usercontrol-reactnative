import SSHClient from "@dylankenneally/react-native-ssh-sftp";


async function onSeconnecter(ipOrName: string, username: string, password: string) {
    try {
      const client = await SSHClient.connectWithPassword(ipOrName, 22, username, password, (error, client) => {
        if (error) {
          console.error('SSH connection failed:', error);
        } else {
          console.log('SSH connection established!');
          // Use the `client` object here
        }});
      console.log('SSH connection established successfully!');
      // Example: Execute a command
      //const result = await client.execute('touch {1..7}');
      //console.log('Command execution result:', result);

      // Close the connection when done
      await client.closeShell();
    } catch (error) {
      console.error('SSH connection failed:', error);
      // Handle connection errors appropriately, e.g., display an error message to the user
    }
  }
  export default onSeconnecter;