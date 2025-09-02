
import fs from 'fs';
import path from 'path';
import formidable from 'formidable';
import pool from '../../../lib/db';

export const config = {
  api: {
    bodyParser: false, 
  },
};

function parseForm(req) {
  const tempDir = path.join(process.cwd(), 'public', 'temp');

 
  fs.mkdirSync(tempDir, { recursive: true });

  const form = formidable({
    multiples: false,
    keepExtensions: true,
    uploadDir: tempDir, 
  });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { fields, files } = await parseForm(req);

      if (!files.image) {
        return res.status(400).json({ error: 'Image file is required.' });
      }

      const file = Array.isArray(files.image) ? files.image[0] : files.image;
      const tempPath = file.filepath;
      const originalName = file.originalFilename || 'image';
      const ext = path.extname(originalName) || '.jpg';
      const fileName = `${Date.now()}${ext}`;

     
      const uploadDir = path.join(process.cwd(), 'public', 'schoolImages');
      await fs.promises.mkdir(uploadDir, { recursive: true });
      const destPath = path.join(uploadDir, fileName);

   
      await fs.promises.rename(tempPath, destPath);

      const { name, address, city, state, contact, email_id } = fields;

   
      const sql = `
        INSERT INTO schools (name, address, city, state, contact, image, email_id)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      const params = [
        name?.toString() || '',
        address?.toString() || '',
        city?.toString() || '',
        state?.toString() || '',
        contact?.toString() || '',
        fileName,
        email_id?.toString() || '',
      ];

      await pool.execute(sql, params);

      return res.status(200).json({ success: true, message: 'School saved' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
  }

  if (req.method === 'GET') {
    try {
      const [rows] = await pool.execute(
        'SELECT id, name, address, city, image FROM schools ORDER BY id DESC'
      );
      return res.status(200).json(rows);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
