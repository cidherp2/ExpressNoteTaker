const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static('public'));

app.listen(PORT, () => console.log(`Now listening on port  http://localhost:${PORT}`));

app.get('/notes', (req, res) => 
res.sendFile(path.join(__dirname,'./public/notes.html'))
);