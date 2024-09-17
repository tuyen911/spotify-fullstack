import express from 'express';
import upload from '../middleware/multer.js';
import { addSong, listSong, removeSong } from '../controllers/songController.js';

const songRouter = express.Router();

// Định nghĩa route để thêm bài hát với ảnh
songRouter.post('/add', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), addSong);
songRouter.get('/list', listSong);
songRouter.post('/remove', removeSong);

export default songRouter;
