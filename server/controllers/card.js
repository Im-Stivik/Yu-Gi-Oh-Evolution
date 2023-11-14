import express from "express";
import {Card} from "../models/card.js"

const router = express.Router();

router.get("/getAllCards", (req, res) => {
    Card.findAll()
    .then(cards => {
	return res.status(200).json(cards);
    })
    .catch(err => {
	console.error(err);
	return res.status(500).json({error: err});
    });
});

router.post("/createCard", (req, res) =>{
    const {name, flavor_text, cardType, serial, attack, defence, isTuner, monster_type, atribute, level} = req.body;
    Card.create({
	name,
	flavor_text,
	cardType,
	serial,
	attack,
	defence,
	isTuner,
	monster_type,
	atribute,
	level
    })
    .then(card => {
	return res.status(200).json(card);
    })
    .catch(err => {
	return res.status(500).json({error: err});
    })
})

export default router;
