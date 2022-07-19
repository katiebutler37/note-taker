const router = require("express").Router();
const { notes } = require('../../db/notes');

router.get('/notes/', (req, res) => {
// notes.getNotes()
    const result = notes;
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

module.exports = router;