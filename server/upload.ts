import express from 'express';
import multer from 'multer';
import fs from 'fs';
import sharp from 'sharp';
import pinataSDK from '@pinata/sdk';
import db from './helpers/db';
import { verify } from './helpers/middleware';

const router = express.Router();
const fileSize = 50 * 1000 * 1000;
const upload = multer({ dest: 'uploads/', limits: { fileSize } });
const pinata = pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_SECRET_API_KEY);

router.post('/upload', verify, upload.single('file'), async (req, res, next) => {
  let path = `${req.file.destination}${req.file.filename}`;
  let readableStreamForFile;
  let meta = {};
  try {
    meta = await sharp(path)
      .resize(760)
      .webp({ lossless: true })
      .toFile(`${path}_`);
    readableStreamForFile = fs.createReadStream(`${path}_`);
  } catch (e) {
    // Check if file is a video
    readableStreamForFile = fs.createReadStream(path);
  }
  try {
    const result = await pinata.pinFileToIPFS(readableStreamForFile);
    const file = {
      user_id: res.locals.id,
      ipfs_hash: result.IpfsHash,
      mimetype: req.file.mimetype,
      size: req.file.size,
      meta: JSON.stringify(meta)
    };
    let query = 'INSERT IGNORE INTO uploads SET ?;';
    // query += 'UPDATE users SET meta = JSON_SET(meta, "$.avatar", ?) WHERE id = ?;';
    await db.queryAsync(query, [file, result.IpfsHash, res.locals.id]);
    res.json({ result: file });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
  await fs.unlinkSync(path);
  await fs.unlinkSync(`${path}_`);
});

export default router;
