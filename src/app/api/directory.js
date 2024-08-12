import { api } from './api';

const directoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // get data
    getDirectories: builder.query({
      query: (page) => `api/directory?page=${page}`,
      providesTags: ['directory'],
    }),
    // add data
    addDirectory: builder.mutation({
      query: (body) => ({
        url: 'api/directory',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['directory'],
    }),
    // delete data
    deleteDirectory: builder.mutation({
      query: ({ id }) => ({
        url: `api/directory`,
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: ['directory'],
    }),
    // update data
    updateDirectory: builder.mutation({
      query: (body) => ({
        url: `api/directory`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['directory', 'updateDirectory'],
    }),
    // get single data
    getDirectory: builder.query({
      query: (id) => `api/directory/${id}`,
      providesTags: ['updateDirectory'],
    }),
    // get all data
    getAllDirectories: builder.query({
      query: () => 'api/directory/all',
    }),
  }),
});

export const {
  useGetDirectoriesQuery,
  useAddDirectoryMutation,
  useDeleteDirectoryMutation,
  useUpdateDirectoryMutation,
  useGetDirectoryQuery,
  useGetAllDirectoriesQuery,
} = directoryApi;
