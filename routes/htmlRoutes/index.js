//module packages required
const path = require('path');
const router = require('express').Router();

//url ending in /notes displays notes html page
router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/notes.html'));
});

//url ending with anything other than /notes displays home page
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

module.exports = router;