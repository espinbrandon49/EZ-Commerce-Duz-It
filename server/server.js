const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');
const cors = require('cors')
// import sequelize connection DONE

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use("/public", express.static('./public'))
// http://localhost:3001/public/image-1664565289065.jpg

app.use(routes);

// sync sequelize models to the database, then turn on the server DONE
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server listening on: http://localhost:${PORT}`));
});

