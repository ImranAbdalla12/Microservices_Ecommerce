import axios from "axios";

const userAPI = "http://localhost:4002/api"
export const getOrders = async (authtoken) =>
  await axios.get(`${userAPI}/admin/orders`, {
    headers: {
      authtoken,
    },
  });

export const changeStatus = async (orderId, orderStatus, authtoken) =>
  await axios.put(
    `${userAPI}/admin/order-status`,
    { orderId, orderStatus },
    {
      headers: {
        authtoken,
      },
    }
  );
