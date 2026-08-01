"use client";

import {
  createContext,
  useCallback,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  MOCK_USER_KEY,
  defaultMockUser,
  parseMockUser,
  serializeMockUser,
  type MockUser,
} from "@/lib/mock-auth";

export type CompleteProfileInput = {
  name: string;
  grade: string;
  phone: string;
};

export type UpdateProfileInput = {
  name: string;
  grade: string;
  phone: string;
  avatarUrl?: string;
};

type AuthContextValue = {
  user: MockUser | null;
  signIn: (email: string) => void;
  signUp: (email: string) => void;
  completeProfile: (input: CompleteProfileInput) => void;
  updateProfile: (input: UpdateProfileInput) => void;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

let cachedUser: MockUser | null = null;
let cacheRead = false;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): MockUser | null {
  if (!cacheRead) {
    cacheRead = true;
    cachedUser = readStoredUser();
  }

  return cachedUser;
}

function getServerSnapshot(): MockUser | null {
  return null;
}

function emitChange() {
  listeners.forEach((listener) => listener());
}

function readStoredUser(): MockUser | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = localStorage.getItem(MOCK_USER_KEY) ?? readMockCookie();

    return parseMockUser(raw);
  } catch {
    return null;
  }
}

function readMockCookie(): string | null {
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${MOCK_USER_KEY}=([^;]*)`),
  );

  return match ? match[1] : null;
}

function writeMockCookie(serialized: string | null) {
  if (serialized) {
    document.cookie = `${MOCK_USER_KEY}=${serialized}; path=/; max-age=2592000; samesite=lax`;
  } else {
    document.cookie = `${MOCK_USER_KEY}=; path=/; max-age=0`;
  }
}

function setStoredUser(next: MockUser | null) {
  cachedUser = next;
  cacheRead = true;

  if (next) {
    const serialized = serializeMockUser(next);
    localStorage.setItem(MOCK_USER_KEY, serialized);
    // Keep the session cookie small: the avatar stays in localStorage only.
    writeMockCookie(serializeMockUser(toCookieUser(next)));
  } else {
    localStorage.removeItem(MOCK_USER_KEY);
    writeMockCookie(null);
  }

  emitChange();
}

function toCookieUser(user: MockUser): MockUser {
  return {
    ...user,
    profile: { ...user.profile, avatarUrl: undefined },
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const user = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const signIn = useCallback((email: string) => {
    setStoredUser(defaultMockUser(email, true));
  }, []);

  const signUp = useCallback((email: string) => {
    setStoredUser(defaultMockUser(email, false));
  }, []);

  const completeProfile = useCallback((input: CompleteProfileInput) => {
    const current = cachedUser ?? defaultMockUser("", false);
    const next: MockUser = {
      session: { ...current.session, profileComplete: true },
      profile: {
        ...current.profile,
        name: input.name,
        grade: input.grade,
        phone: input.phone,
      },
    };
    setStoredUser(next);
  }, []);

  const updateProfile = useCallback((input: UpdateProfileInput) => {
    const current = cachedUser ?? defaultMockUser("", true);
    const next: MockUser = {
      session: current.session,
      profile: {
        ...current.profile,
        name: input.name,
        grade: input.grade,
        phone: input.phone,
        avatarUrl: input.avatarUrl,
      },
    };
    setStoredUser(next);
  }, []);

  const signOut = useCallback(() => {
    setStoredUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signUp,
        completeProfile,
        updateProfile,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
