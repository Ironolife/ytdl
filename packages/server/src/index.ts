import express from 'express';
import ytdl from 'ytdl-core';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const main = async () => {
  const app = express();

  app.set('trust proxy', 1);

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
    })
  );

  app.get('/version', async (_, res) => {
    res
      .status(200)
      .send(process.env.npm_package_version || process.env.VERSION);
  });

  app.get('/formats', async (req, res) => {
    try {
      const url = req.query.url;
      if (typeof url !== 'string' || !ytdl.validateURL(url)) {
        throw new Error('Invalid Url');
      }

      const info = await ytdl.getInfo(url);

      const availableFormats = info.formats
        .filter(
          (format) =>
            !!format.qualityLabel && format.hasVideo && format.hasAudio
        )
        .sort((a, b) => {
          if (a.container > b.container) return 1;
          else if (b.container > a.container) return -1;
          else
            return (
              parseInt(b.qualityLabel.split('p')[0], 10) -
              parseInt(a.qualityLabel.split('p')[0], 10)
            );
        });

      res.status(200).send(availableFormats);
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
