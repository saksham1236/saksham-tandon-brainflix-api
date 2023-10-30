import express, {Router} from "express";
import fs from "fs";
const router = express.Router();
const path = require("path");
const { v4: uuidv4 } = require("uuid");
router.use(express.json());


/**
 *
 * @returns videos.json from data folder
 */
function getVideoData() {
  const videoData = fs.readFileSync(path.join(__dirname, "/../data/videos.json"));
  const parsedData = JSON.parse(videoData.toString());
  return parsedData;
}

router
  .get("/", (req: any, res: any) => {
    res.status(200).json(getVideoData());
  })
  .post("/upload", (req: any, res: any) => {
    const { title, description, imageUrl } = req.body;
    const newVideo = {
      id: uuidv4(),
      title: title,
      channel: "Local Host",
      image: imageUrl,
      description: description,
      views: "0",
      likes: "0",
      duration: "4:01",
      video: "images/stream.mp4",
      timestamp: Date.now(),
      comments:[]
    };

    const newVideoList = getVideoData();
    newVideoList.push(newVideo);
    fs.writeFileSync(path.join(__dirname + "/../data/videos.json"), JSON.stringify(newVideoList));

    res.status(201).send(newVideo);
  });

router.get("/:videoId", (req: any, res: any) => {
  const videoData = getVideoData();
  const video = videoData.find((el: any) => el.id === req.params.videoId);
  res.status(200).json(video);
});

module.exports = router;
