// index.js
import express from 'express'
import path from 'path';

const app = express();
const port = 3002;

// Serve static files from the 'public' directory
app.use(express.static(path.join(process.cwd(), '../../build/web')));
// /Users/kerry.h/work/flutter_sample_web_app/build/web
// app.use(express.static("/Users/kerry.h/work/cucumber-js-playwright/build/web"))

// Define a route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
