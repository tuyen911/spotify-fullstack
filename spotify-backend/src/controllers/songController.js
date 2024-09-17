import { v2 as cloudinary } from "cloudinary";
import songModel from "../models/songModel.js";

const addSong = async (req, res) => {
  try {
    // Lấy dữ liệu từ body
    const { name, desc, album } = req.body;

    // Kiểm tra tệp đã được tải lên hay chưa
    if (!req.files || !req.files.audio || !req.files.image) {
      return res.status(400).json({ success: false, message: "Thiếu tệp âm thanh hoặc hình ảnh" });
    }

    // Lấy tệp âm thanh và hình ảnh từ req.files
    const audioFile = req.files.audio[0];
    const imageFile = req.files.image[0];

    // Tải lên tệp âm thanh lên Cloudinary
    const audioUpload = await cloudinary.uploader.upload(audioFile.path, {
      resource_type: "video",
    });
    console.log("Audio uploaded:", audioUpload);

    // Tải lên tệp hình ảnh lên Cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    console.log("Image uploaded:", imageUpload);

    // Tính toán thời lượng của bài hát
    const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(
      audioUpload.duration % 60
    )}`;

    // Tạo đối tượng dữ liệu bài hát để lưu vào cơ sở dữ liệu
    const songsData = {
      name,
      desc,
      album,
      audioUrl: audioUpload.secure_url,
      imageUrl: imageUpload.secure_url,
      duration,
    };
    
    console.log("Song data to save:", songsData);

    // Lưu dữ liệu bài hát vào cơ sở dữ liệu
    const song = new songModel(songsData);
    await song.save();

    // Gửi phản hồi thành công
    res.json({ success: true, song });
  } catch (error) {
    console.error("Lỗi khi thêm bài hát:", error);
    res.status(500).json({ success: false, message: "Không thể thêm bài hát", error: error.message });
  }
};


const listSong = async (req, res) => {
  try {
    const allSongs = await songModel.find({}).populate('album', 'name');
    res.json({ success: true, songs: allSongs });
  } catch (error) {
    console.error("Error listing songs:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "An error occurred while listing songs.",
      });
  }
};


const removeSong = async (req, res) => {
  try {
    await songModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Song removed" });
  } catch (err) {
    console.error("Error removing song:", err);
    res
      .status(500)
      .json({
        success: false,
        message: "An error occurred while removing the song.",
      });
  }
};

export { addSong, listSong, removeSong };
