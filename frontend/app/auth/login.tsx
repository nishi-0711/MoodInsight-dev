import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import API from '../../services/api';

// export default function Login() {

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async () => {
//     try {
//       const res = await API.post('/api/auth/login', {
//         email,
//         password,
//       });

//       alert("Login Successful");
//       console.log("TOKEN:", res.data.token);
//     } catch (err: any) {
//       alert("Login failed");
//       console.log(err);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Login</Text>

//       <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} />
//       <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={setPassword} />

//       <Button title="Login" onPress={handleLogin} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', padding: 20 },
//   title: { fontSize: 24, marginBottom: 20 },
//   input: { borderWidth: 1, marginBottom: 10, padding: 10 }
// });

