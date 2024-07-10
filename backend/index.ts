import express from 'express';
import multer from 'multer';
import { storage } from './multerConfig';
import cors from 'cors';

const upload = multer({ storage: storage });
const app = express();

app.use(cors());

app.use('/files', express.static("uploads"));

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  console.log('File uploaded:', req.file);
  return res.json(req.file.filename);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
