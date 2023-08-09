// Create Product
export function createProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products/", {
      method: "POST",
      body: JSON.stringify(product),
      headers: { "Content-Type": "application/json	" },
    });

    const data = await response.json();
    resolve({ data });
  });
}

// Edit a product
export function updateProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/products/" + product.id,
      {
        method: "PATCH",
        body: JSON.stringify(product),
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await response.json();
    resolve({ data });
  });
}

// Fetch Products
export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    resolve({ data });
  });
}
// Fetch Products By Id
export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/products/${id}`);
    const data = await response.json();
    resolve({ data });
  });
}

// Fetch Products by filtering
export function fetchProductsByFilters(filter, sort, pagination) {
  //filter = {"category":["smartphone","laptop"]}
  //sort = {_sot:"price",_order:"desc"}
  //pagination = {_page:1,_limit:10} //_page=1&_limit=10
  //TO DO: on sever we will support multi values in filter

  let queryString = "";

  for (const key in filter) {
    const categoryValues = filter[key];

    if (categoryValues.length > 0) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${lastCategoryValue}&`;
    }
  }

  for (const key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  for (const key in pagination) {
    queryString += `${key}=${pagination[key]}`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/products?" + queryString
    );
    const data = await response.json();
    const totalItems = response.headers.get("X-Total-Count");
    resolve({ data: { products: data, totalItems: +totalItems } });
  });
}

// Fetch the categories
export function fetchCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/categories");
    const data = await response.json();
    resolve({ data });
  });
}

// Fetch the Brands
export function fetchBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/brands");
    const data = await response.json();
    resolve({ data });
  });
}
