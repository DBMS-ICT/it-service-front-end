import { api } from './api';

const requestApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // get data
    getAllRequest: builder.query({
      query: (page) => `api/request?page=${page}`,
      providesTags: ['request', 'updateRequest'],
    }),
    // add data
    addRequest: builder.mutation({
      query: (body) => ({
        url: 'api/request',
        method: 'POST',
        body: body,
      }),
    }),
    // delete data
    deleteRequest: builder.mutation({
      query: (body) => ({
        url: `api/request`,
        method: 'DELETE',
        body: body,
      }),
      invalidatesTags: ['request'],
    }),
    // get single data
    getSingleRequest: builder.query({
      query: (id) => `api/request/${id}`,
      providesTags: ['request', 'updateRequest'],
    }),
    // add employee
    addEmployee: builder.mutation({
      query: (body) => ({
        url: 'api/request/',
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['request', 'updateRequest'],
    }),
    // employee description
    employeeDescription: builder.mutation({
      query: (body) => ({
        url: 'api/request',
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['request', 'updateRequest'],
    }),
    // get old request
    getOldRequest: builder.query({
      query: (page) => `api/request/processing?page=${page}`,
      providesTags: ['request', 'updateRequest'],
    }),
    // add request to complete
    addReqComplete: builder.mutation({
      query: (body) => ({
        url: 'api/request/processing',
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['request', 'updateRequest'],
    }),
    // get complete request
    getCompleteRequest: builder.query({
      query: (page) => `api/request/complete?page=${page}`,
      providesTags: ['request', 'updateRequest'],
    }),
    // update number
    updateNumber: builder.mutation({
      query: (body) => ({
        url: 'api/request/processing',
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['request', 'updateRequest'],
    }),
    // update date
    updateDate: builder.mutation({
      query: (body) => ({
        url: 'api/request/complete',
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['request', 'updateRequest'],
    }),
    // export data
    getExport: builder.mutation({
      query: (body) => ({
        url: 'api/request/export',
        method: 'POST',
        body: body,
      }),
    }),
  }),
});

export const {
  useGetExportMutation,
  useUpdateDateMutation,
  useUpdateNumberMutation,
  useGetCompleteRequestQuery,
  useAddReqCompleteMutation,
  useGetOldRequestQuery,
  useAddEmployeeMutation,
  useGetSingleRequestQuery,
  useGetAllRequestQuery,
  useAddRequestMutation,
  useDeleteRequestMutation,
  useEmployeeDescriptionMutation,
} = requestApi;
