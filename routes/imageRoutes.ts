import express, {Router} from "express";
import fs from "fs";
import path from 'path'

const router = express.Router();

router.use('/images', express.static(path.join(__dirname + '../assets')));

module.exports = router;