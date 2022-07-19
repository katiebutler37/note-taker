const { createNewNote, validateNote, findById, removeItemOnce } = require('../../lib/notes');
const { notes } = require('../../db/notes');
const { uuid } = require('uuidv4');
const router = require("express").Router();


router.get('/notes', (req, res) => {
// notes.getNotes()
    const result = notes;
    if (result) {
        res.json(result);
    } else {
        res.sendStatus(404);
    }
});

router.post('/notes', (req, res) => {
    // set id based on what the next index of the array will be
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
    const result = findById(req.params.id, notes);
    if (result) {
        console.log(result)
        removeItemOnce(notes, result)
        // res.json(result);
    } else {
        console.log("not working")
        // res.send(404);
    }
});

module.exports = router;