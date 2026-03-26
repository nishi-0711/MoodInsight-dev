// // import { useEffect } from 'react';
// // import { Text, View } from 'react-native';
// // import API from '../../services/api';

// // export default function HomeScreen() {

// //   useEffect(() => {
// //     const testAPI = async () => {
// //       try {
// //         const res = await API.get('/health');
// //         console.log(res.data);
// //       } catch (err: any) {
// //         console.log("Error:", err.message);
// //       }
// //     };

// //     testAPI();
// //   }, []);

// //   return (
// //     <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
// //       <Text>API Test Running...</Text>
// //     </View>
// //   );
// // }

// import { View, Text, Button } from 'react-native';
// import { useRouter } from 'expo-router';
// // import { View, Text, Button } from 'react-native';
// import { useState, useEffect } from 'react';
// import LoginModal from '../modal';

// export default function HomeScreen() {
//   const router = useRouter();

//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [showLogin, setShowLogin] = useState(false);

//   useEffect(() => {
//     if (!isLoggedIn) {
//       setShowLogin(true);
//     }
//   }, [isLoggedIn]);

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>🏠 Home Page</Text>

//       {isLoggedIn && <Text>Welcome 🎉</Text>}

//       <LoginModal
//         visible={showLogin}
//         onClose={() => setShowLogin(false)}
//         onLogin={() => {
//           setIsLoggedIn(true);
//           setShowLogin(false);
//         }}
//       />
//     </View>
//   );
// }

import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import LoginModal from '../modal';

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <View style={{ flex: 1 }}>

      {/* 🔘 Sign In Button (Top Right) */}
      {!isLoggedIn && (
        <TouchableOpacity
          onPress={() => setShowLogin(true)}
          style={{
            position: 'absolute',
            top: 50,
            right: 20,
            padding: 10
          }}
        >
          <Text>Log In</Text>
        </TouchableOpacity>
      )}

      {/* 🏠 Home Content */}
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text>🏠 Home Page</Text>

        {isLoggedIn && <Text>Welcome 🎉</Text>}
      </View>

      {/* 🔐 Login Modal */}
      <LoginModal
        visible={showLogin}
        onClose={() => setShowLogin(false)}
        onLogin={() => {
          setIsLoggedIn(true);
          setShowLogin(false);
        }}
      />
    </View>
  );
}