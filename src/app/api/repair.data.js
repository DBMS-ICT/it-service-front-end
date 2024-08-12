import { api } from './api';

const repairDataApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // get data
    getRepairData: builder.query({
      query: () => `api/repair`,
      providesTags: ['repair'],
    }),
    // add data
    addRepairData: builder.mutation({
      query: (body) => ({
        url: 'api/repair/',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['repair'],
    }),
    // delete data
    deleteRepairData: builder.mutation({
      query: (body) => ({
        url: `api/repair/`,
        method: 'DELETE',
        body: body,
      }),
      invalidatesTags: ['repair'],
    }),
  }),
});

export const {
  useGetRepairDataQuery,
  useAddRepairDataMutation,
  useDeleteRepairDataMutation,
} = repairDataApi;

// getProducts: builder.query({
//   query: ({ search, category, page }) =>
//     `api/product/product?page=${page}&search=${search}&category=${category}`,
//   providesTags: ['products'],
// }),
// getSingleProduct: builder.query({
//   query: ({ id }) => `api/product/product/${id}`,
//   providesTags: ['products'],
// }),
// deleteProduct: builder.mutation({
//   query: ({ user, product }) => ({
//     url: `api/product/${user}/${product}`,
//     method: 'DELETE',
//     body: { user, product },
//   }),
//   invalidatesTags: ['products'],
// }),
