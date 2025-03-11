// src/app/api/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// This should ideally be in a database
// For demonstration, we're using a shared in-memory store
let users = [
  {
    id: "1",
    name: "Demo User",
    email: "demo@ethergyx.com",
    // Password: "password123"
    password: "$2a$10$MhVKV7Lj9iRqQzGmYjA5L.oFswJlcV9jipZ/Lc9ebnmOlcCQUFU4i",
  },
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user already exists
    if (users.some((user) => user.email.toLowerCase() === email.toLowerCase())) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = {
      id: String(users.length + 1),
      name,
      email,
      password: hashedPassword,
    };

    // Add to users array
    users.push(newUser);

    // In a real app, you would save this to a database
    console.log("Registered new user:", email);
    
    // For debugging: list all users
    console.log("Current users:", users.map(u => ({id: u.id, email: u.email})));

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// This is just to make the users array accessible from other files
// In a real app, you would use a database instead
export { users };