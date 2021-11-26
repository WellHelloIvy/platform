#!/usr/bin/env node
import { port } from '../config';

import app from '../app';
import db from '../db/models';

// Check the database connection before starting the app
db.sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection success! Sequelize is ready to use...');

    // Start listening for connections
    app.listen(port, () => console.log(`Listening on port ${port}...`));
  })
  .catch((err: any) => {
    console.log('Database connection failure.');
    console.error(err);
  });
