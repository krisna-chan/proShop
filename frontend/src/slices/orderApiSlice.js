import { apiSlice } from './apiSlice';
import { ORDERS_URL , PAYPAL_URL } from '../constants';

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: 'POST',
        body: { ...order },
      }),
    }),
    getOrderDetails : builder.query({
      query : (orderId) =>({
        url : `${ORDERS_URL}/${orderId}`,
        method : 'GET',
      }),
      keepUnusedDataFor : 5,
    }),
    payOrder : builder.mutation({
      query : (orderId , detail) =>({
        url : `${ORDERS_URL}/${orderId}/pay`,
        method : 'PUT',
        body : {...detail},
      })
    }),
    getPayPalClientId : builder.query({
      query : () => ({
        url : `${PAYPAL_URL}/client-token`,
      }),
      keepUnusedDataFor : 5,
    })
  })

});

export const { useCreateOrderMutation ,  useGetOrderDetailsQuery , usePayOrderMutation , useGetPayPalClientIdQuery } = orderApiSlice;
