import express from 'express';
import pk from '../package.json';
import ytdl from 'ytdl-core';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const main = async () => {
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
    })
  );

  app.get('/version', async (_, res) => {
    res.status(200).send(pk.version);
  });

  app.get('/formats', async (req, res) => {
    try {
      const url = req.query.url;
      if (typeof url !== 'string' || !ytdl.validateURL(url)) {
        throw new Error('Invalid Url');
      }

      const info = await ytdl.getInfo(url);

      res.status(200).send(info.formats);
    } catch (err) {
      console.error(err);

      res.status(500).send(err.message);
    }
  });

  app.get('/download', async (req, res) => {
    try {
      const url = req.query.url;
      if (typeof url !== 'string') {
        throw new Error('Invalid Url');
      }

      const itag = parseInt(req.query.itag as string, 10);
      if (isNaN(itag)) {
        throw new Error('Invalid Format');
      }

      const info = await ytdl.getInfo(url);
      const format = info.formats.find((format) => format.itag === itag);

      if (!format) {
        throw new Error('Format not found');
      }

      res.header(
        'Content-Disposition',
        `attachment; filename="${format.qualityLabel}.${format.container}"`
      );
      ytdl(url, { format }).pipe(res);
    } catch (err) {
      console.error(err);

      res.status(500).send(err.message);
    }
  });

  const port = parseInt(process.env.PORT, 10);
  app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
  });
};

main();
