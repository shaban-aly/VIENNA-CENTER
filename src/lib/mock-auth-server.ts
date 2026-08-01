import { cookies } from "next/headers";
import { MOCK_USER_KEY, parseMockUser } from "./mock-auth";
import type { MockUser } from "./mock-auth";

export async function getMockUser(): Promise<MockUser | null> {
  const cookieStore = await cookies();

  return parseMockUser(cookieStore.get(MOCK_USER_KEY)?.value);
}
