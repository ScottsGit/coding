import express from 'express';
// import User from '@app/models/user'; // Ensure all models are imported to register them
import sequelize from '@app/database';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, Sequelize with TypeScript!');
});

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected.');
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

startServer();
