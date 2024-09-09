import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const response = NextResponse.json(
    {
      message: "User logged out",
      success: true,
    },
    { status: 200 }
  );

  // Clear the token cookie
  response.cookies.set("token", "", {
    httpOnly: true,
    expires: new Date(0), //! Immediately expire the cookie
    path: "/",
    sameSite: "lax", // Adjust SameSite if necessary
    secure: process.env.NODE_ENV === "production", // Ensure secure flag is set in production
  });

  // Clear the user cookie
  response.cookies.set("user", "", {
    httpOnly: true,
    expires: new Date(0), //! Immediately expire the cookie
    path: "/",
    sameSite: "lax", // Adjust SameSite if necessary
    secure: process.env.NODE_ENV === "production", // Ensure secure flag is set in production
  });

  return response;
}
