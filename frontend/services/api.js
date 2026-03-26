// // import axios from 'axios';

// // const API = axios.create({
// //   baseURL: 'http://192.168.X.X:5000/api' // replace with your IP
// // });

// // export default API;frontend/App.js

// import axios from 'axios';

// const API = axios.create({
//   baseURL: 'http://10.0.2.2:5000', // for Android emulator
// });

// export default API;

import axios from 'axios';

const API = axios.create({
  baseURL: 'http://10.0.2.2:5000',
});

export default API;
