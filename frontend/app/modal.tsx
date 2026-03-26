// // import { Link } from 'expo-router';
// // import { StyleSheet } from 'react-native';

// // import { ThemedText } from '@/components/themed-text';
// // import { ThemedView } from '@/components/themed-view';

// // export default function ModalScreen() {
// //   return (
// //     <ThemedView style={styles.container}>
// //       <ThemedText type="title">This is a modal</ThemedText>
// //       <Link href="/" dismissTo style={styles.link}>
// //         <ThemedText type="link">Go to home screen</ThemedText>
// //       </Link>
// //     </ThemedView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     padding: 20,
// //   },
// //   link: {
// //     marginTop: 15,
// //     paddingVertical: 15,
// //   },
// // });


// import { Modal, View, Text, TextInput, TouchableOpacity } from 'react-native';
// import { useState } from 'react';

// export default function LoginModal({ visible, onClose, onLogin }: any) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   return (
//     <Modal visible={visible} transparent animationType="fade">
//       <View style={{
//         flex: 1,
//         backgroundColor: 'rgba(0,0,0,0.5)',
//         justifyContent: 'center',
//         alignItems: 'center'
//       }}>
//         <View style={{
//           width: 300,
//           backgroundColor: 'white',
//           padding: 20,
//           borderRadius: 10
//         }}>
//           <Text style={{ fontSize: 20, marginBottom: 10 }}>Login</Text>

//           <TextInput
//             placeholder="Email"
//             value={email}
//             onChangeText={setEmail}
//             style={{ borderBottomWidth: 1, marginBottom: 10 }}
//           />

//           <TextInput
//             placeholder="Password"
//             secureTextEntry
//             value={password}
//             onChangeText={setPassword}
//             style={{ borderBottomWidth: 1, marginBottom: 20 }}
//           />

//           <TouchableOpacity
//             onPress={onLogin}
//             style={{
//               backgroundColor: 'blue',
//               padding: 10,
//               borderRadius: 5
//             }}
//           >
//             <Text style={{ color: 'white', textAlign: 'center' }}>Login</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   );
// }


import { Modal, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function LoginModal({ visible, onClose, onLogin }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <View style={{
          width: 300,
          backgroundColor: 'white',
          padding: 20,
          borderRadius: 10
        }}>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>Login</Text>

          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={{ borderBottomWidth: 1, marginBottom: 10 }}
          />

          <TextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={{ borderBottomWidth: 1, marginBottom: 15 }}
          />

          {/* Login Button */}
          <TouchableOpacity
            onPress={onLogin}
            style={{ padding: 10, alignItems: 'center' }}
          >
            <Text>Login</Text>
          </TouchableOpacity>

          {/* Signup Option */}
          <TouchableOpacity
            onPress={() => {
              onClose();
              router.push('/auth/signup');
            }}
          >
            <Text style={{ marginTop: 10, textAlign: 'center' }}>
              Don’t have an account? Sign up
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}