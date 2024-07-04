const multer = require('multer');
const upload = multer({
  dest: './uploads/',
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.mimetype)) {
      req.fileValidationError = 'Solo se permiten imágenes JPEG, JPG o PNG';
      return cb(new Error('Invalid file type'));
    }
    cb(null, true);
  },
});

const app = express();

app.post('/upload', upload.single('file'), (req, res) => {
  if (req.fileValidationError) {
    return res.status(400).json({ error: req.fileValidationError });
  }

  const { originalname, mimetype } = req.file;
  const fileName = req.file.filename;

  res.json({
    message: 'Archivo cargado correctamente',
    filename: fileName,
    mimetype: mimetype,
  });
});