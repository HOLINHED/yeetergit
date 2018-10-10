const PORT = 5000;

const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
      message: 'Whoops! Wrong page :('
    });
});

//TODO: make this an actually database
let yeets = [];

app.get('/api', (req, res)=>{
    res.send(JSON.stringify({
        yeets
    }));
});

app.use(rateLimit({
    windowMs: 5 * 1000,
    max: 1
}));

app.post('/api', (req, res, next)=>{

    const yeet = {
        name: req.body.name.toString().trim(),
        content: req.body.content.toString().trim(),
        created: new Date()
      };

      if (yeet.name.length < 50 && yeet.content.length < 250){
        yeets.push(yeet);
      }

      res.json({
        message: yeet,
      });
});

app.use((error, req, res, next) => {
    res.status(500);
    res.json({
      message: error.message
    });
  });

app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`);
});