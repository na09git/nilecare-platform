"use client";
import { useVideo } from "@100mslive/react-sdk";

interface PeerProps {
  peer: any; // Adjust type according to your actual peer data structure
}

const Peer: React.FC<PeerProps> = ({ peer }) => {
  const { videoRef } = useVideo({
    trackId: peer.videoTrack,
  });

  return (
    <div className="relative">
      <video
        ref={videoRef}
        className="w-full h-full object-cover rounded-lg"
        autoPlay
        muted={peer.isLocal}
        playsInline
      />
      <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 px-2 py-1 rounded text-sm">
        {peer.name} {peer.isLocal ? "(You)" : ""}
      </div>
    </div>
  );
};

export default Peer;
