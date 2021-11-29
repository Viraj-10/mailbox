const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
/* importing Routers */
const auth = require('./routes/auth');
const user = require('./routes/users');
const mail = require('./routes/mail');

/* Load Environment Variable from ENV File */
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

/* Server Init Server start on port */
const app = new express();
const PORT = process.env.PORT || 5000;

/* Body parser */
app.use(express.json());
/* Mount Routes */
app.use('/api/v1/auth', auth);
app.use('/api/v1/user', user);
app.use('/api/v1/mail', mail);
/* Server start on port 5000*/
app.listen(PORT, console.log(`Server Running in ${process.env.NODE_ENV} mode on port ${PORT}`));
