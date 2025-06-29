const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const schoolRoutes = require('./Routes/school.Routes');

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use('/', schoolRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
