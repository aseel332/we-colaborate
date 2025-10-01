
import multer from "multer";

const storage = multer.memoryStorage();


const fileFilter = (req, file, cb) => {
  const allowed = ["application/pdf", "image/jpeg", "image/png"];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDFs, JPGs, and PNGs are allowed"), false);
  }
};


const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, 
  },
});

export default upload;
