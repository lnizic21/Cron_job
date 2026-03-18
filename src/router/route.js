import { Router } from "express";
import { getGospelForDate } from "../handlers/GospelHandler.js";

const router = Router();
const todaysDate = new Date();

router.get('/', (req, res) => {
    res.send('API!');
});

router.get('/todaysGospel',getGospelForDate(todaysDate));

export default router;