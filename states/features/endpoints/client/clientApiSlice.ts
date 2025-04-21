import { apiSlice } from "@/states/services/apiSlice";

export interface ClientProfile {
  id: string
  first_name: string
  last_name: string
  email: string
  bio: string
  phone_number: string
  address: string
  date_of_birth: string | null
  profile_picture: string | null
  has_agreed_to_terms: boolean
  is_profile_complete: boolean
  completion_percentage: number
}

export interface ProfileUpdateData {
  first_name?: string
  last_name?: string
  bio?: string
  phone_number?: string
  address?: string
  date_of_birth?: string
  has_agreed_to_terms?: boolean
  gender?: string
  country?: string
}



const clientApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getClientProfile: builder.mutation({
            query: ({client_id}) => ({
              url: '/client/get_client',
              method: 'POST',
              body: {client_id}
            }),
        }),
        updateClientProfileDetails: builder.mutation<ClientProfile, ProfileUpdateData>({
            query: (body) => ({
                url: '/client/update_client_profile',
                method: 'POST',
                body
            })
        }),
        updateClientProfilePicture: builder.mutation<ClientProfile, {client_id:string; photo: File}>({
            query: (body) => {
                const formData = new FormData()
                formData.append("profile_picture", body.photo)
                formData.append("client_id", body.client_id)
                console.log(formData.get("profile_picture"));
                
                return {
                    url: '/client/update_client_photo',
                    method: 'POST',
                    body: formData,
            }
            }
        }),

        fetchClientServiceRequestSummary: builder.mutation<ClientProfile, {client_id:string}>({
            query: (body) => ({
                url: '/services/fetch_client_service_request_summary',
                method: 'POST',
                body
            })
        }),
    }),
});

export const {
    useGetClientProfileMutation,
    useUpdateClientProfileDetailsMutation,
    useUpdateClientProfilePictureMutation,
    useFetchClientServiceRequestSummaryMutation
} = clientApiSlice;