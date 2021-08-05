import axios from "axios";

export const createProduct = async (product, authtoken) =>
  await axios.post(`http://localhost:4001/api/product`, product, {
    headers: {
      authtoken,
    },
  });

export const getProductsByCount = async (count) =>
  await axios.get(`http://localhost:4001/api/products/${count}`);

export const removeProduct = async (slug, authtoken) =>
  await axios.delete(`http://localhost:4001/api/product/${slug}`, {
    headers: {
      authtoken,
    },
  });

export const getProduct = async (slug) =>
  await axios.get(`http://127.0.0.1:4001/api/product/${slug}`);

export const updateProduct = async (slug, product, authtoken) =>
  await axios.put(`http://localhost:4001/api/product/${slug}`, product, {
    headers: {
      authtoken,
    },
  });

export const getProducts = async (sort, order, page) =>
  await axios.post(`http://localhost:4001/api/products`, {
    sort,
    order,
    page,
  });

export const getProductsCount = async () =>
  await axios.get(`http://localhost:4001/api/products/total`);

export const productStar = async (productId, star, authtoken) =>
  await axios.put(
    `http://localhost:4001/api/product/star/${productId}`,
    { star },
    {
      headers: {
        authtoken,
      },
    }
  );

export const getRelated = async (productId) =>
  await axios.get(`http://localhost:4001/api/product/related/${productId}`);

export const fetchProductsByFilter = async (arg) =>
  await axios.post(`http://localhost:4001/api/search/filters`, arg);
