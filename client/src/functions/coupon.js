import axios from "axios";

const userAPI = "http://localhost:4002/api"
export const getCoupons = async () =>
  await axios.get(`${userAPI}/coupons`);

export const removeCoupon = async (couponId, authtoken) =>
  await axios.delete(`${userAPI}/coupon/${couponId}`, {
    headers: {
      authtoken,
    },
  });

export const createCoupon = async (coupon, authtoken) =>
  await axios.post(
    `${userAPI}/coupon`,
    { coupon },
    {
      headers: {
        authtoken,
      },
    }
  );
