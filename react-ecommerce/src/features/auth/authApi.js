// SignUp/Create User
export function createUser(userData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}

// Login User
export function checkUser(userLoginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(userLoginInfo),
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.json();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}

// export function checkUser(userLoginInfo) {
//   return new Promise(async (resolve, reject) => {
//     const email = userLoginInfo.email;
//     const password = userLoginInfo.password;

//     const response = await fetch("http://localhost:8080/users?email=" + email);
//     const data = await response.json();

//     console.log({ data });

//     if (data.length) {
//       if (password === data[0].password) {
//         resolve({ data: data[0] });
//       } else {
//         reject({ message: "email or password wrong" });
//       }
//     } else {
//       reject({ message: "email or password wrong" });
//     }
//   });
// }

//logout
export const logoutUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    const response = await fetch("http://localhost:8080/users/" + userId);
    const data = response.json();
    resolve({ data });
  });
};
