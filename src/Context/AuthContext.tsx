import React, { createContext, useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from "uuid";
import type { User, AuthContextValue, RegisterRequest } from '../Types/auth';
import { authService } from '../Services/AuthService';
import { cartService } from '../Services/CartService';
import { setLogoutCallback } from '../API';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
    children: React.ReactNode;
}

function getOrCreateGuestId() {
    let guestId = localStorage.getItem("GuestId");

    if (!guestId) {
        guestId = uuidv4();
        localStorage.setItem("GuestId", guestId);
    }

    return guestId;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const isAuthenticated = user !== null;

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    const initializeAuth = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            // console.log('[AuthContext] Initializing auth...');

            const { user: userData } = await authService.refresh();

            setUser(userData);
            // console.log(`[AuthContext] user: ${user}`);
            // console.log('[AuthContext] Auth initialized, user logged in');
        } catch (err: any) {
            // console.log('[AuthContext] No active session found (expected for guests)');
            setUser(null);
            getOrCreateGuestId()
        } finally {
            setLoading(false);
        }
    }, []);

    const logout = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            await authService.logout();
            getOrCreateGuestId()
        } catch (err: any) {
            console.error('[AuthContext] Logout API failed:', err);
        } finally {
            setUser(null);
            setLoading(false);
            // console.log('[AuthContext] User logged out');
        }
    }, []);

    const register = useCallback(async (data: RegisterRequest) => {
        try {
            setLoading(true);
            setError(null);

            const { user: userData } = await authService.register(data);
            setUser(userData);
            setLoading(false);
        } catch (err: any) {
            const errorMessage = err.message || 'Registration failed';
            setError(errorMessage);
            setUser(null);
            setLoading(false);
            console.error('[AuthContext] Registration failed:', errorMessage);
            throw err;
        }
    }, []);

    const assignRole = useCallback(async (userId: number, role: "admin" | "user" | "owner") => {
        try {
            setLoading(true);
            setError(null);

            await authService.assignRole(userId, role);
            // const { user: userData } = await authService.assignRole(userId, role);

            // if (userId === user?.id) {
            //     setUser(userData);
            // }

            setLoading(false);
            // console.log('[AuthContext] Role assigned successfully');
            // return userData;
        } catch (err: any) {
            const errorMessage = err.message || 'Failed to assign role';
            setError(errorMessage);
            setLoading(false);
            console.error('[AuthContext] Role assignment failed:', errorMessage);
            throw err;
        }
    }, []);

    const login = useCallback(async (email: string, password: string) => {
        try {
            setLoading(true);
            setError(null);

            const { user: userData } = await authService.login(email, password);

            const guestId = getOrCreateGuestId();

            if (guestId) {
                try {
                    await cartService.Merge(guestId);
                    // console.log(response);
                } catch (mergeError) {
                    console.error('[AuthContext] Cart merge failed:', mergeError);
                }
            }

            setUser(userData);
            setLoading(false);
            // console.log('[AuthContext] User logged in');
        } catch (err: any) {
            const errorMessage = err.message || 'Login failed';
            setError(errorMessage);
            setUser(null);
            setLoading(false);
            console.error('[AuthContext] Login failed:', errorMessage);
            throw err;
        }
    }, []);

    const value: AuthContextValue = {
        user,
        isAuthenticated,
        loading,
        error,
        login,
        register,
        logout,
        assignRole,
        clearError,
        initializeAuth,
    };

    useEffect(() => {
        initializeAuth();
    }, [initializeAuth]);

    useEffect(() => {
        setLogoutCallback(() => {
            logout()
        });
    }, [logout]);

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
    const context = React.useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth must be used within an <AuthProvider>');
    }

    return context;
}

export function useAuthState() {
    const { user, isAuthenticated, loading, error } = useAuth();
    return { user, isAuthenticated, loading, error };
}

export function useAuthActions() {
    const { login, register, logout, assignRole, clearError } = useAuth();
    return { login, register, logout, assignRole, clearError };
}

export { AuthContext };

