require('../db');
const Celebrity = require("../models/celebrity-model");

const celebrities = [
    {
        name: "Angelina Jolie",
        occupation: "actress",
        catchPhrase: "Be mine",
    },
    {
        name: "Jennifer Lopez",
        occupation: "singer",
        catchPhrase: "Whatever",
    },
    {
        name: "Joao Prates",
        occupation: "Full Stack Web Developer",
        catchPhrase: "Here we go again",
    },
];

Celebrity.insertMany(celebrities).then((celebritiesFromDB) => {
    console.log(`Celebrities creates - ${celebritiesFromDB.length}`);
});