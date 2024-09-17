import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../App";
import { toast } from "react-toastify";

const ListSong = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSongs = async () => {
    try {
      const response = await axios.get(`${url}/api/song/list`);
      if (response.data.success) {
        console.log("Res", response.data);

        setSongs(response.data.songs);
      } else {
        setError("Failed to fetch songs");
      }
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch songs");
      setLoading(false);
      console.error("Error fetching songs:", err);
    }
  };

  const removeSong = async (id) => {
    try {
      const response = await axios.post(`${url}/api/song/remove`, { id });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchSongs(); // Cập nhật danh sách sau khi xóa
      } else {
        toast.error("Failed to remove song");
      }
    } catch (error) {
      toast.error("Error removing song");
      console.error("Error removing song:", error);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <p>All Songs List</p>
      <br />
      <div>
        <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
          <b>Image</b>
          <b>Name</b>
          <b>Album</b>
          <b>Duration</b>
          <b>Action</b>
        </div>
        {songs.length > 0 ? (
          songs.map((song) => (
            <div
              key={song._id}
              className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5"
            >
              <img src={song.imageUrl} alt="Example Image" className="w-12" />
              <h3>{song.name}</h3>
              <p>{song.album}</p>
              <p>{song.duration}</p>
              
              <button 
                onClick={() =>  removeSong(song._id)} 
                className='bg-red-500 text-white p-1'>
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No songs available</p>
        )}
      </div>
    </div>
  );
};

export default ListSong;
