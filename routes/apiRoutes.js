const path = require('path');
const fs = require('fs')


var uniqid = require('uniqid');


module.exports = (app) => {

  app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../db/db.json'));
  });

  
  app.post('/api/notes', (req, res) => {
    let data = fs.readFileSync(path.join(__dirname, '../db/db.json'));
    let currentData = JSON.parse(data);
   
    let newNote = {
      title: req.body.title,
      text: req.body.text,
      id: uniqid(),
    };

    currentData.push(newNote)
    fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(currentData));
    
    res.json(newNote);

  });


  
  app.delete("/api/notes/:id", function (req, res) {
    var id = req.params.id;
   
    require('../db/db.json').splice(id - 1, 1);
   
    require('../db/db.json').forEach((obj, i) => {
      obj.id = i + 1;
    });
    
    fs.writeFile("./db/db.json", JSON.stringify(require('../db/db.json')), function () {
      res.json(require('../db/db.json'));
    });
  });
};
