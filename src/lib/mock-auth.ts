import { currentStudent } from "@/data/mock";
import type { StudentProfile } from "@/types/content";

// Mock session shape used until Supabase Auth is connected.
// Later: replace with Supabase Auth session + student_profiles row.

export type MockSession = {
  userId: string;
  email: string;
  profileComplete: boolean;
};

export type MockUser = {
  session: MockSession;
  profile: StudentProfile;
};

export const MOCK_USER_KEY = "vc_mock_user";

export function defaultMockUser(email: string, profileComplete: boolean): MockUser {
  return {
    session: {
      userId: currentStudent.id,
      email,
      profileComplete,
    },
    profile: { ...currentStudent },
  };
}

export function parseMockUser(raw: string | undefined | null): MockUser | null {
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(decodeURIComponent(raw));

    if (parsed && parsed.session && parsed.profile) {
      return parsed as MockUser;
    }
  } catch {
    // ignore malformed mock session
  }

  return null;
}

export function serializeMockUser(user: MockUser): string {
  return encodeURIComponent(JSON.stringify(user));
}
