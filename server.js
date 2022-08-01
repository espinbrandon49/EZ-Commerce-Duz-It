const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');
// import sequelize connection DONE

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server DONE
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});

//1) The walkthrough video must demonstrate how to create the schema from the MySQL shell.
//2) The walkthrough video must demonstrate how to seed the database from the command line.
//3) The walkthrough video must demonstrate how to start the application’s server.