import { api } from './api';

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // get data
    getUser: builder.query({
      query: () => `api/user`,
      providesTags: ['user'],
    }),
    // add data
    addUser: builder.mutation({
      query: (body) => ({
        url: 'api/user/auth/signup',
        method: 'POST',
        body: body,
      }),
    }),
    // delete data
    deleteUser: builder.mutation({
      query: (body) => ({
        url: `api/user`,
        method: 'DELETE',
        body: body, // { user, product }
      }),
      invalidatesTags: ['user'],
    }),
    signin: builder.mutation({
      query: (body) => ({
        url: 'api/user/auth/signin',
        method: 'POST',
        body: body,
      }),
    }),
    getCurrentUser: builder.query({
      query: (token) => ({
        url: `/api/user/current`,
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
    // get active employee
    getActiveEmployee: builder.query({
      query: () => `api/user/`,
      providesTags: ['user'],
    }),
    getActiveBlockedEmployee: builder.query({
      query: (page) => `api/user/all?page=${page}`,
      providesTags: ['user'],
    }),

    // update status
    updateStatus: builder.mutation({
      query: (body) => ({
        url: 'api/user',
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['request', 'updateRequest'],
    }),
    // get pending user
    getPendingUser: builder.query({
      query: (page) => `api/user/pending?page=${page}`,
      providesTags: ['user'],
    }),
    // accept user
    acceptUser: builder.mutation({
      query: (body) => ({
        url: 'api/user/pending',
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['user'],
    }),
    // update role
    updateRole: builder.mutation({
      query: (body) => ({
        url: 'api/user',
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['user'],
    }),
    // update user information
    updateUser: builder.mutation({
      query: (body) => ({
        url: 'api/user/current',
        method: 'PUT',
        body: body,
      }),
    }),
    // update password
    updatePassword: builder.mutation({
      query: (body) => ({
        url: 'api/user/current',
        method: 'PATCH',
        body: body,
      }),
    }),
    // send forget password link
    forgetPassword: builder.mutation({
      query: (body) => ({
        url: 'api/user/auth/forget-password',
        method: 'POST',
        body: body,
      }),
    }),
    // reset password type get
    checkForget: builder.query({
      query: (code) => `api/user/auth/forget-password/${code}`,
    }),
    // update password after forget
    updateForgetPassword: builder.mutation({
      query: (body) => ({
        url: 'api/user/auth/forget-password',
        method: 'PUT',
        body: body,
      }),
    }),
  }),
});

export const {
  useUpdateForgetPasswordMutation,
  useCheckForgetQuery,
  useForgetPasswordMutation,
  useUpdatePasswordMutation,
  useUpdateUserMutation,
  useUpdateRoleMutation,
  useAcceptUserMutation,
  useGetPendingUserQuery,
  useUpdateStatusMutation,
  useGetActiveBlockedEmployeeQuery,
  useGetActiveEmployeeQuery,
  useGetCurrentUserQuery,
  useGetUserQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  useSigninMutation,
} = userApi;
