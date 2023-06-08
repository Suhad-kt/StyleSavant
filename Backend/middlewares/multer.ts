import multer from "multer";
import path from "path";
//storage engin
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});


const upload = multer({
  storage: storage,
  fileFilter(req, file, cb) {
    if (
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/png"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("only .png , .jpeg , .jpg formats are only allowed"));
    }
  },
});

export default upload;
