import express from "express";
import fs from "fs";
const router = express.Router();
const path = require("path");
const { v4: uuidv4 } = require("uuid");

/**
 *
 * @returns videos.json from data folder
 */
function getVideoData() {
  const videoData = fs.readFileSync(
    path.join(__dirname + "/../data/videos.json")
  );
  const parsedData = JSON.parse(videoData.toString());
  return parsedData;
}

router
  .get("/", (req: any, res: any) => {
    res.status(201).json(getVideoData());
  })
  .post("/", (req: any, res: any) => {
    const newVideo = {
      id: uuidv4(),
      title: req.body.title,
      channel: "Local Host",
      image: "https://i.imgur.com/l2Xfgpl.jpg",
      description: req.body.description,
      views: "0",
      likes: "0",
      duration: "4:01",
      video: "https://project-2-api.herokuapp.com/stream",
      timestamp: Date.now(),
      comments: []
    };

    const newVideoList = getVideoData();
    newVideoList.push(newVideo);
    fs.writeFileSync("../data/videos.json", JSON.stringify(newVideoList));

    res.status(201).json(newVideo);
  });

router.get("/:videoId", (req: any, res: any) => {
  const videoData = getVideoData();
  const video = videoData.find((el: any) => el.id === req.params.videoId);
  res.json(video);
});
module.exports = router;
