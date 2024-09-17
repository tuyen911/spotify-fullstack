import React, { useContext } from "react";
import Sidebar from "./components/Sidebar";
import Player from "./components/Player";
import Display from "./components/Display";
import { PlayerContext } from "./context/PlayerContext";

const App = () => {
  const { audioRef, track, songsData } = useContext(PlayerContext);

  return (
    <div className="h-screen bg-black">
      {songsData && songsData.length !== 0 ? ( 
        <>
          <div className="h-[90%] flex">
            <Sidebar />
            <Display />
          </div>
          <Player />
          <audio ref={audioRef} src={track ? track.audioUrl : ""} preload="auto"></audio>
        </>
      ) : (
        <div className="text-white text-center mt-20">Loading...</div>
      )}
    </div>
  );
};

export default App;
