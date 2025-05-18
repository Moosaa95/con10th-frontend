import { useGetClientProfileMutation } from "@/states/features/endpoints/client/clientApiSlice";
import { useState } from "react";

interface RetrieveUserProps {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
}

interface UseAuthReturn {
    isAuthenticated: boolean;
    isFetchingUser: boolean;
    fetchUserProfile: ({ client_id }: { client_id: string }) => Promise<void>;
    user: RetrieveUserProps | null;
}

export default function useAuth(): UseAuthReturn {
    // const isAuthenticated = useAppSelector(selectIsAuthenticated);
    // const isLoading = useAppSelector(selectIsLoading);
    // const [getClientProfile, { isLoading, isError }] = useGetClientProfileMutation();
    const [user, setUser] = useState<RetrieveUserProps | null>(null);
    const isAuthenticated = true;
    const isFetchingUser = false;

    const fetchUserProfile = async (filters: any) => {
        // const { client_id } = filters;
        try {
            // const userProfile = await getClientProfile(filters).unwrap();
            setUser({
                id: 1,
                email: 'khalifaumar308@gmail.com',
                first_name: 'Umar',
                last_name: 'Aminu',
});
            // console.log("Fetched User Profile:", userProfile);
        } catch (error) {
            console.error('Failed to fetch user profile:', error);
        }
    };

    return {
        isAuthenticated,
        isFetchingUser,
        fetchUserProfile,
        user
    };
}