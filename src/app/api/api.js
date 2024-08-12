import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACK_END,
    tagTypes: [
      'updateDirectory',
      'repair',
      'request',
      'updateRequest',
      'addDesc',
    ],
    prepareHeaders: (headers) => {
      // const data = JSON.parse(localStorage.getItem("user"));
      const data = JSON.parse(localStorage.getItem('user'));
      const token = data;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
        return headers;
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
