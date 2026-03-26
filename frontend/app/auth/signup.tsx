// import { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
// import API from '../../services/api';
// import { useRouter } from 'expo-router';

// export default function Signup() {
//   const router = useRouter();

//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSignup = async () => {
//     try {
//       const res = await API.post('/api/auth/signup', {
//         name,
//         email,
//         password,
//       });

//       alert(res.data.message);
//       router.push('/auth/login' as any);
//     } catch (err: any) {
//       alert("Signup failed");
//       console.log(err);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Signup</Text>

//       <TextInput style={styles.input} placeholder="Name" onChangeText={setName} />
//       <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} />
//       <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={setPassword} />

//       <Button title="Signup" onPress={handleSignup} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', padding: 20 },
//   title: { fontSize: 24, marginBottom: 20 },
//   input: { borderWidth: 1, marginBottom: 10, padding: 10 }
// });