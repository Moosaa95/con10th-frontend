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
    fetchUserProfile: (id: string | number) => Promise<void>;
    user: RetrieveUserProps | null;
}

export default function useAuth(): UseAuthReturn {
    // const isAuthenticated = useAppSelector(selectIsAuthenticated);
    // const isLoading = useAppSelector(selectIsLoading);
    const [getClientProfile, { isLoading, isError }] = useGetClientProfileMutation();
    const [user, setUser] = useState<RetrieveUserProps | null>(null);
    const isAuthenticated = false;
    const isFetchingUser = false;

    const fetchUserProfile = async (filters: any) => {
        // const { client_id } = filters;
        try {
            const userProfile = await getClientProfile(filters).unwrap();
            setUser(userProfile);
            console.log("Fetched User Profile:", userProfile);
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