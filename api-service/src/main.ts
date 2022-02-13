import express from 'express';
import cors from 'cors';
import db from './models';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import foodEntryRoutes from './routes/foodEntry.routes';

const app = express();

const corsOptions = {
  origin: '*',
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Handle database
db.sequelize.sync();

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to calories application.' });
});

// routes
authRoutes(app);
userRoutes(app);
foodEntryRoutes(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// createRoles()
//   .then(() => {
//     console.log('Successful');
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

// async function createRoles() {
//   await db.role.create({ name: 'ROLE_ADMIN' });
//   await db.role.create({ name: 'ROLE_USER' });
// }
