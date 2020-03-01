const express = require('express');
const router = express.Router();
const withAuth = require('../middleware');

// INDEX designs
router.get('/', withAuth, function (req, res, next) {
  req.app.get('db').design.find(
  ).then(items => {
    res.json(items);
  });
});

// CREATE a design
router.post('/', withAuth, function (req, res, next) {
  let postObj = { ...req.body};

  req.app.get('db').design.save(postObj).then(design => {
    // the newly-inserted design
    res.json(design);
  });
  
});

// UPDATE a design
router.put('/:id', withAuth, function (req, res, next) {

  const {id} = req.params;
  let putObj = { ...req.body,id };
   req.app.get('db').design.save(putObj).then(design => {
    // the newly-inserted design
    res.json(design);
  });
});

// DELETE a design
router.delete('/:id', withAuth, function (req, res, next) {
  req.app.get('db').design.destroy(req.params.id).then(design => {
    res.json(design);
  });
});

module.exports = router;