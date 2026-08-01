import { mockAdmin } from "@/data/admin";

// Mock admin session used until Supabase Auth roles are connected.
// Later: check auth session + users.role === "admin".

export async function getMockAdmin() {
  return mockAdmin;
}
