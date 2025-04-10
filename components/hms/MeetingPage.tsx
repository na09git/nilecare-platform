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
import Peer from "./Peer";
import { Mic, MicOff, Video, VideoOff, PhoneOff } from "lucide-react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [prescriptions, setPrescriptions] = useState([
    { name: "Amoxicillin", dosage: "100 G • CAPSULE" },
    { name: "clorazepate", dosage: "100 G • CAPSULE" },
    { name: "Metronidazole", dosage: "100 G • CAPSULE" },
  ]);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

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

  const toggleAudio = () => {
    hmsActions.setLocalAudioEnabled(!isMuted);
    setIsMuted(!isMuted);
  };

  const toggleVideo = () => {
    hmsActions.setLocalVideoEnabled(!isVideoOff);
    setIsVideoOff(!isVideoOff);
  };

  const leaveRoom = () => {
    hmsActions.leave();
    // Add navigation logic here
    router.push("/dashboard");
  };

  if (!isConnected) {
    return <div className="text-center p-4">Connecting to the room...</div>;
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <div className="grid grid-cols-2 gap-4">
              {peers.map((peer) => (
                <Peer key={peer.id} peer={peer} />
              ))}
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">PRESCRIPTION</h2>
            <ul>
              {prescriptions.map((prescription, index) => (
                <li key={index} className="mb-3 bg-gray-700 rounded p-2">
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                    <span className="font-medium">{prescription.name}</span>
                  </div>
                  <div className="text-sm text-gray-400 ml-4">
                    {prescription.dosage}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-4 flex justify-center space-x-4">
          <button
            onClick={toggleAudio}
            className="p-2 rounded-full bg-gray-700 hover:bg-gray-600"
          >
            {isMuted ? <MicOff /> : <Mic />}
          </button>
          <button
            onClick={toggleVideo}
            className="p-2 rounded-full bg-gray-700 hover:bg-gray-600"
          >
            {isVideoOff ? <VideoOff /> : <Video />}
          </button>
          <button
            onClick={leaveRoom}
            className="p-2 rounded-full bg-red-600 hover:bg-red-700"
          >
            <PhoneOff />
          </button>
        </div>
      </div>
    </div>
  );
}
