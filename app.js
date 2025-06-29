const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const schoolRoutes = require('./Routes/school.Routes');

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use('/', schoolRoutes);

app.get("/", (req, res) => {
  res.send("School API is live!");
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
