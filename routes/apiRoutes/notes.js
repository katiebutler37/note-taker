//module packages and files required
const { createNewNote, validateNote } = require('../../lib/notes');
const { notes } = require('../../db/notes');
//npm package for generating a unqiue ID
const { uuid } = require('uuidv4');
const router = require("express").Router();
const fs = require("fs");
const path = require("path");


router.get('/notes', (req, res) => {
    const result = notes;
    if (result) {
        res.json(result);
    } else {
        res.sendStatus(404);
    }
});

router.post('/notes', (req, res) => {
    // set randomized unique id, then change to string for json
    req.body.id = uuid().toString();

    // if any data in req.body is incorrect, send 400 error back
    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});

router.delete('/notes/:id', (req, res) => {
    let jsonFilePath = path.join(__dirname, "../../db/notes.json");
    // request to delete note by id.
    for (let i = 0; i < notes.length; i++) {

        if (notes[i].id == req.params.id) {
            // Splice takes i position, and then deletes the 1 note.
            notes.splice(i, 1);
            break;
        }
    }
    // Write the db.json file again.
    fs.writeFileSync(jsonFilePath, JSON.stringify(notes), function (err) {

        if (err) {
            return console.log(err);
        } else {
            console.log("Your note was deleted!");
        }
    });
    res.json(notes);
});

module.exports = router;