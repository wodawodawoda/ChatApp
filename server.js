const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

// Middleware for production
// app.use('/', express.static(`${__dirname}/build`));
// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
// });


app.get('/api/message', (req, res) => {
  res.send({bobo: 'nienienie'})
})
app.get('/api/hello', (req,res) => {
  res.send({express: 'Express says hello'})
})

app.listen(port, () => {
  console.log(`Server is running on port :${port}`)
})