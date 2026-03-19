import { Router } from "express";
import { getGospelForDate } from "../handlers/GospelHandler.js";
import { getSermonForDate } from "../handlers/SermonHandler.js";

const router = Router();
const todaysDate = new Date();

router.get('/', (req, res) => {
    res.send('API!');
});

router.get('/todaysGospel',getGospelForDate(todaysDate));

router.get("/sermon", getSermonForDate(todaysDate));

export default router;