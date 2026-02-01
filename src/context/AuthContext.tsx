"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { Session } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import {
  AuthUser,
  AuthContextType,
  LoginCredentials,
  RegisterCredentials,
  mapSupabaseUser,
} from "@/types/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  // Initialize auth state and subscribe to changes
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const {
          data: { session: initialSession },
        } = await supabase.auth.getSession();
        setSession(initialSession);
        setUser(mapSupabaseUser(initialSession?.user ?? null));
      } catch (err) {
        console.error("Error initializing auth:", err);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Subscribe to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      setSession(newSession);
      setUser(mapSupabaseUser(newSession?.user ?? null));
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth]);

  const signIn = useCallback(
    async ({ email, password }: LoginCredentials) => {
      setIsLoading(true);
      setError(null);

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      setIsLoading(false);

      if (signInError) {
        const errorMessage = getSpanishErrorMessage(signInError.message);
        setError(errorMessage);
        return { error: errorMessage };
      }

      return { error: null };
    },
    [supabase.auth]
  );

  const signUp = useCallback(
    async ({ email, password, fullName }: RegisterCredentials) => {
      setIsLoading(true);
      setError(null);

      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      setIsLoading(false);

      if (signUpError) {
        const errorMessage = getSpanishErrorMessage(signUpError.message);
        setError(errorMessage);
        return { error: errorMessage };
      }

      return { error: null };
    },
    [supabase.auth]
  );

  const signOut = useCallback(async () => {
    setIsLoading(true);
    await supabase.auth.signOut();
    setIsLoading(false);
  }, [supabase.auth]);

  const resetPassword = useCallback(
    async (email: string) => {
      setIsLoading(true);
      setError(null);

      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo: `${window.location.origin}/auth/callback?type=recovery`,
        }
      );

      setIsLoading(false);

      if (resetError) {
        const errorMessage = getSpanishErrorMessage(resetError.message);
        setError(errorMessage);
        return { error: errorMessage };
      }

      return { error: null };
    },
    [supabase.auth]
  );

  const updatePassword = useCallback(
    async (newPassword: string) => {
      setIsLoading(true);
      setError(null);

      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      setIsLoading(false);

      if (updateError) {
        const errorMessage = getSpanishErrorMessage(updateError.message);
        setError(errorMessage);
        return { error: errorMessage };
      }

      return { error: null };
    },
    [supabase.auth]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        error,
        signIn,
        signUp,
        signOut,
        resetPassword,
        updatePassword,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}

// Helper function to translate common Supabase errors to Spanish
function getSpanishErrorMessage(message: string): string {
  const errorMap: Record<string, string> = {
    "Invalid login credentials": "Credenciales de inicio de sesion invalidas",
    "Email not confirmed": "El correo electronico no ha sido confirmado",
    "User already registered": "Este correo ya esta registrado",
    "Password should be at least 6 characters":
      "La contrasena debe tener al menos 6 caracteres",
    "Unable to validate email address: invalid format":
      "Formato de correo electronico invalido",
    "Email rate limit exceeded":
      "Demasiados intentos. Intenta de nuevo mas tarde",
    "New password should be different from the old password":
      "La nueva contrasena debe ser diferente a la anterior",
  };

  return errorMap[message] || message;
}
