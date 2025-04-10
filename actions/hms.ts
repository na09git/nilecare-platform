"use server";

// pages/api/token.ts
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
export interface TokenData {
  roomId: string;
  userName: string;
  role: string;
}
const secret = process.env.HMS_SECRET;
const apiKey = process.env.NEXT_PUBLIC_HMS_API_KEY;
export async function generateSecureToken(data: TokenData) {
  const { roomId, userName, role } = data;

  // Check for missing credentials
  if (!secret || !apiKey) {
    console.error("Missing HMS API credentials");
    return { error: "Missing HMS API credentials", status: 500, token: null };
  }

  try {
    // Token payload, without the 'exp' property
    const tokenPayload = {
      access_key: apiKey,
      room_id: roomId, // Room ID to join
      user_id: userName, // The user's name or ID
      role: role, // 'host' or 'guest'
      type: "app", // Indicating client-side app token
      jti: uuidv4(), // Unique identifier for this token
      iat: Math.floor(Date.now() / 1000), // Issued at time (in seconds)
    };

    // Generate the JWT token with expiration using 'expiresIn' option
    const token = jwt.sign(tokenPayload, secret, {
      algorithm: "HS256", // Ensure you're using the correct signing algorithm
      expiresIn: "1h", // Token expiration time (1 hour)
    });

    // Log for debugging
    console.log("Generated Token: ", token);

    // Return the token if successful
    return { error: null, status: 200, token };
  } catch (error) {
    console.error("Error during token generation: ", error);
    return { error: "Token generation failed", status: 500, token: null };
  }
}

export async function createRoom(roomName: string) {
  if (!secret || !apiKey) {
    return { roomId: null, status: 500, error: "Missing API credentials" };
  }
  try {
    // Create a JWT token to authenticate the API request
    const token = jwt.sign(
      {
        access_key: apiKey,
        type: "management",
        jti: uuidv4(),
      },
      secret,
      { algorithm: "HS256", expiresIn: "1h" }
    );
    const response = await fetch("https://api.100ms.live/v2/rooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: roomName, // The name of the appointment room
        description: "Doctor-Patient Appointment Room",
        template_id: "6738c0bc1f1e5e9e06838390", // Optionally, use a predefined template
      }),
    });

    const roomData = await response.json();
    console.log(roomData);
    if (response.ok) {
      return { roomId: roomData.id, status: 200, error: null };
    } else {
      return { roomId: null, status: 500, error: roomData };
    }
  } catch (error) {
    return { roomId: null, status: 500, error: "Room creation failed" };
  }
}
