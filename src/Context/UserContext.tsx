import React, {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { userService } from "../Services/UserServices";
import type {
  ChangePasswordRequest,
  UpdateUserProfileRequest,
  UserContextValue,
  UserProfile,
} from "../Types/user";

const UserContext = createContext<UserContextValue | undefined>(undefined);

interface UserProviderProps {
  children: React.ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { profile: profileData } = await userService.getProfile();
      setProfile(profileData);

      return profileData;
    } catch (err: any) {
      const errorMessage = err.message || "Failed to get user profile";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProfile = useCallback(
    async (data: UpdateUserProfileRequest) => {
      try {
        setLoading(true);
        setError(null);

        const { profile: profileData } = await userService.updateProfile(data);
        setProfile(profileData);

        return profileData;
      } catch (err: any) {
        const errorMessage = err.message || "Failed to update user profile";
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const changePassword = useCallback(async (data: ChangePasswordRequest) => {
    try {
      setLoading(true);
      setError(null);

      await userService.changePassword(data);
    } catch (err: any) {
      const errorMessage = err.message || "Failed to change password";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const value: UserContextValue = {
    profile,
    loading,
    error,
    getProfile,
    updateProfile,
    changePassword,
    clearError,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser(): UserContextValue {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a <UserProvider>");
  }

  return context;
}
