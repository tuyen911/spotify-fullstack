import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Chuyển đổi `import.meta.url` thành `__dirname`
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Đảm bảo thư mục 'uploads' tồn tại
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Cấu hình lưu trữ cho multer
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, uploadsDir);
  },
  filename: function (req, file, callback) {
    // Đặt tên tệp để tránh trùng lặp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    callback(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Khởi tạo middleware upload
const upload = multer({ storage });

export default upload;
