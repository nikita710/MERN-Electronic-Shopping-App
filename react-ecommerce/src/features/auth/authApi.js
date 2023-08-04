// SignUp/Create User
export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/users", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

// Login User
export function checkUser(userLoginInfo) {
  return new Promise(async (resolve, reject) => {
    const email = userLoginInfo.email;
    const password = userLoginInfo.password;

    const response = await fetch("http://localhost:8080/users?email=" + email);
    const data = await response.json();

    console.log({ data });

    if (data.length) {
      if (password === data[0].password) {
        resolve({ data: data[0] });
      } else {
        reject({ message: "email or password wrong" });
      }
    } else {
      reject({ message: "email or password wrong" });
    }
  });
}

//logout

export const logoutUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    const response = await fetch("http://localhost:8080/users/" + userId);
    const data = response.json();
    resolve({ data });
  });
};
