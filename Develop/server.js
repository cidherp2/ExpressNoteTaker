const express = require('express');
const path = require('path');
const fs = require('fs');
const data = require('./db/db.json')
const PORT = process.env.PORT || 3001;
const { v4: uuidv4 } = require('uuid');
const app = express();

app.use(express.json());
app.use(express.static('public'));

app.listen(PORT, () => console.log(`Now listening on port  http://localhost:${PORT}`));

app.get('/notes', (req, res) => 
res.sendFile(path.join(__dirname,'./public/notes.html'))
);


app.get('/api/notes', (req, res) => {
    // fs.readFile('db.json', 'utf8', (err, data) => {
    //   if (err) {
    //     console.log(`Error reading the file: ${err}`);
    //     return res.status(500).send('Internal Server Error');
    //   }
  
    //   const notes = JSON.parse(data) || [];
    //   res.json(notes);
    // });
    res.sendFile(path.join(__dirname, '/db/db.json'))
    

  });
  

app.post('/api/notes', (req,res) => {
    const newTitle = req.body.title;
    const newText = req.body.text;

    const newJson = {
        title: newTitle,
        text: newText,
        id: uuidv4()
    };
    // data.push(newJson);
    // res.json(data);
    fs.readFile('./db/db.json','utf8',(err,data) => {
        if (err){
            console.log(err);
        } else {
            const parsedD = JSON.parse(data)
            parsedD.push(newJson);
            fs.writeFile('./db/db.json',JSON.stringify(parsedD),(err )=>{
                if(err){
                    console.log(`There was an error writing to the file, Error: ${err}`)
                } else {
                    res.status(200).send(`Note written succesfully to file, Title: ${newJson.title}`);
                }
            })
        }
    })

   
})

app.delete('/api/notes',(req, res) => {
    const id = 

})