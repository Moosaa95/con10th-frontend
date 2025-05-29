// import { createSlice } from '@reduxjs/toolkit';
// import { apiSlice } from '../../services/apiSlice';
// import { IServiceOffered } from '@/types/expert';

// export const clientRequestsApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     getClientRequests: builder.query<IServiceOffered[], string>({
//       query: (clientId) => ({
//         url: `/clients/${clientId}/requests`,
//         method: 'GET',
//       }),
//       providesTags: ['User'],
//     }),
//     createClientRequest: builder.mutation<IServiceOffered, { clientId: string; request: Partial<IServiceOffered> }>({
//       query: ({ clientId, request }) => ({
//         url: `/clients/${clientId}/requests`,
//         method: 'POST',
//         body: request,
//       }),
//       invalidatesTags: ['User'],
//     }),
//   }),
// });

// export const {
//   useGetClientRequestsQuery,
//   useCreateClientRequestMutation,
// } = clientRequestsApiSlice;

// // Slice for local state management
// const clientRequestsSlice = createSlice({
//   name: 'clientRequests',
//   initialState: {
//     selectedRequest: null as IServiceOffered | null,
//   },
//   reducers: {
//     setSelectedRequest: (state, action) => {
//       state.selectedRequest = action.payload;
//     },
//   },
// });

// export const { setSelectedRequest } = clientRequestsSlice.actions;
// export default clientRequestsSlice.reducer;
