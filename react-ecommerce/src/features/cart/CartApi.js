export const addToCart = (item) => {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart", {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
};

export const fetchItemsByUserId = (userId) => {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart?user=" + userId);
    const data = await response.json();
    resolve({ data });
  });
};

export const updateCart = (update) => {
  return new Promise(async (resolve, reject) => {
    const response = await fetch("http://localhost:8080/cart/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    console.log(data);
    resolve({ data });
  });
};

export const deleteCart = (cartId) => {
  return new Promise(async (resolve, reject) => {
    const response = await fetch("http://localhost:8080/cart/" + cartId, {
      method: "DELETE",
      headers: { "Content-Type": "application/json " },
    });
    const data = await response.json();
    resolve({ data: data.id });
  });
};
