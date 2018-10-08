const PORT = 5000;

const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const app = express();

app.use(cors());

app.get('/api', (req, res)=>{
    res.send(JSON.stringify({
        message: "Request handled!"
    }));
});

app.use(rateLimit({
    windowMs: 30 * 1000,
    max: 1
  }));

app.post('/api', (req, res, next)=>{
    res.json({
        message: "post handle"
    });
});

app.use((error, req, res, next) => {
    res.status(500);
    res.json({
      message: error.message
    });
    res.send(JSON.stringify({
        message: error.message
    }))
  });

  app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`);
});