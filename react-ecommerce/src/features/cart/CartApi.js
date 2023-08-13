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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(update),
    });
    const data = await response.json();
    resolve({ data });
  });
};

export const deleteCart = (itemId) => {
  return new Promise(async (resolve) => {
    await fetch("http://localhost:8080/cart/" + itemId, {
      method: "DELETE",
      headers: { "Content-Type": "application/json " },
    });
    // console.log({ data: { id: itemId } });
    resolve({ data: { id: itemId } });
  });
};

export const resetCart = (userId) => {
  return new Promise(async (resolve) => {
    const response = await fetchItemsByUserId(userId);
    const items = await response.data;
    for (const item of items) {
      await deleteCart(item.id);
    }

    resolve({ status: "success" });
  });
};
