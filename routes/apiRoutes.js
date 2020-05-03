var router = require("express").Router();
var store = require("../db/store");

router.get("/notes", function (req, res) {
    store
        .getNotes()
        .then(notes => res.json(notes))
});

router.post("/notes", (req, res) => {
    store
        .addNote(req.body)
        .then((note) => res.json(note))
});

// DELETE "/api/notes" deletes the note with an id equal to req.params.id
router.delete("/notes/:id", function (req, res) {
    store
        .removeNote(req.params.id)
        .then(() => res.json({ ok: true }))
});

module.exports = router;