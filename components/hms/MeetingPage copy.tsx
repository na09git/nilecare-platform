"use client";
import {
  useHMSActions,
  useHMSStore,
  selectIsConnectedToRoom,
  selectPeers,
} from "@100mslive/react-sdk";
import { useEffect, useState } from "react";
import { generateSecureToken, TokenData } from "@/actions/hms";
import { Session } from "next-auth";
import Peer from "./Peer"; // Import the Peer component

export default function MeetingPage({
  roomId,
  session,
}: {
  roomId: string;
  session: Session;
}) {
  const hmsActions = useHMSActions();
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const peers = useHMSStore(selectPeers);
  const [token, setToken] = useState<string | null>(null);
  const user = session.user;
  const role = user.role;
  const username =
    role === "DOCTOR"
      ? `Dr. ${user.name?.split(" ")[0]}`
      : user.name?.split(" ")[0];

  useEffect(() => {
    const getToken = async () => {
      const tokenData: TokenData = {
        roomId,
        userName: username || "",
        role: role === "DOCTOR" ? "host" : "guest",
      };
      const data = await generateSecureToken(tokenData);
      if (data.token) {
        setToken(data.token);
      }
    };

    getToken();
  }, [roomId]);

  useEffect(() => {
    if (token && !isConnected) {
      hmsActions.join({
        authToken: token,
        userName: username || "",
      });
    }
  }, [token, isConnected, hmsActions]);

  return (
    <div>
      {isConnected ? (
        <div>
          <h2>Video Call: Room {roomId}</h2>

          {/* Render video for each peer */}
          <div className="video-grid">
            {peers.map((peer) => (
              <Peer key={peer.id} peer={peer} />
            ))}
          </div>

          {/* Optional: Button to leave the room */}
          <button onClick={() => hmsActions.leave()}>Leave Room</button>
        </div>
      ) : (
        <p>Connecting to the room...</p>
      )}
    </div>
  );
}
