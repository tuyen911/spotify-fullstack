import { createContext, useEffect, useRef, useState } from "react";
import axios from 'axios';

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekbg = useRef();
  const seekBar = useRef();

  const url = 'http://localhost:4000';

  const [songsData, setSongsData] = useState([]);
  const [albumsData, setAlbumsData] = useState([]);
  const [track, setTrack] = useState(null);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      second: 0,
      minute: 0,
    },
  });
  const [albumData, setAlbumData] = useState(null); // Thêm trạng thái albumData

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setPlayStatus(true);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayStatus(false);
    }
  };

  const playWithId = async (id) => {
    await songsData.map((item) =>{
      if (id === item._id) {
        setTrack(item);
      }
    })
    await audioRef.current.play();
    setPlayStatus(true);
  };

  const previous = async () => {
    songsData.map(async (item,index)=>{
      if(track._id === item._id && index>0){
        await setTrack(songsData[index-1]);
        await audioRef.current.play();
        setPlayStatus(true);
      }
    })
  };

  const next = async () => {
    songsData.map(async (item,index)=>{
      if(track._id === item._id && index< songsData.length){
        await setTrack(songsData[index+1]);
        await audioRef.current.play();
        setPlayStatus(true);
      }
    })
  };

  const seekSong = (e) => {
    if (audioRef.current && seekbg.current) {
      const offsetX = e.nativeEvent.offsetX;
      const offsetWidth = seekbg.current.offsetWidth;
      const duration = audioRef.current.duration;

      if (isFinite(offsetX) && isFinite(offsetWidth) && isFinite(duration) && offsetWidth > 0) {
        const newTime = (offsetX / offsetWidth) * duration;

        if (isFinite(newTime)) {
          audioRef.current.currentTime = newTime;
        } else {
          console.error('Computed newTime is not finite:', newTime);
        }
      } else {
        console.error('One of the values is not finite or valid:', { offsetX, offsetWidth, duration });
      }
    }
  };

  const getSongsData = async () => {
    try {
      const response = await axios.get(`${url}/api/song/list`);
      setSongsData(response.data.songs);
      if (response.data.songs.length > 0) {
        setTrack(response.data.songs[0]);
      }
    } catch (error) {
      console.error('Failed to fetch song data:', error);
    }
  };

  const getAlbumsData = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      setAlbumsData(response.data.albums);
    } catch (error) {
      console.error('Failed to fetch album data:', error);
    }
  };

  useEffect(() => {
    getSongsData();
    getAlbumsData();
  }, []);

  useEffect(() => {
    const audioElement = audioRef.current;

    if (audioElement) {
      const updateTime = () => {
        if (seekBar.current && audioElement.duration) {
          seekBar.current.style.width = (Math.floor(audioElement.currentTime / audioElement.duration * 100)) + "%";
          setTime({
            currentTime: {
              second: Math.floor(audioElement.currentTime % 60),
              minute: Math.floor(audioElement.currentTime / 60),
            },
            totalTime: {
              second: Math.floor(audioElement.duration % 60),
              minute: Math.floor(audioElement.duration / 60),
            }
          });
        }
      };

      audioElement.ontimeupdate = updateTime;

      return () => {
        audioElement.ontimeupdate = null; // Clean up
      };
    }
  }, [audioRef, track]);

  const contextValue = {
    audioRef,
    seekbg,
    seekBar,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    playWithId,
    previous,
    next,
    seekSong,
    getSongsData,
    getAlbumsData,
    songsData,
    albumsData,
    albumData, // Cung cấp albumData
    setAlbumData // Cung cấp setAlbumData
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
