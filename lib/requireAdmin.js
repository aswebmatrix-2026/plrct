import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { NextResponse } from "next/server";

/**
 * Call at the top of any admin-only route handler.
 * Returns null if the request is authenticated, otherwise a 401 response
 * you should return immediately.
 */
export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized. Please sign in to the admin dashboard." }, { status: 401 });
  }
  return null;
}