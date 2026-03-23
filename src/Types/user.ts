export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  governorate: string;
  city: string;
  fullAddress: string;
}

export interface UpdateUserProfileRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  governorate: string;
  city: string;
  fullAddress: string;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
  confirmedPassword: string;
}

export interface UserContextValue {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  getProfile: () => Promise<UserProfile>;
  updateProfile: (data: UpdateUserProfileRequest) => Promise<UserProfile>;
  changePassword: (data: ChangePasswordRequest) => Promise<void>;
  clearError: () => void;
}
