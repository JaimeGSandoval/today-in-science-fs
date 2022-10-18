const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const session = require('express-session');
const cookieParser = require('cookie-parser');
// const passport = require('passport');
const methodOverride = require('method-override');
// const flash = require('express-flash');
const logger = require('morgan');
const signupRouter = require('./routes/signup.router');
const usersRouter = require('./routes/users.router');
const { errorResponder, invalidPathHandler } = require('./middleware/error-handlers');
// const mainRoutes = require('./routes/main');
// const postRoutes = require('./routes/posts');

const app = express();

app.use(helmet());
app.use(xss());

app.use(
  cors({
    origin: 'http://localhost:8000',
  })
);

app.use(cookieParser());

// Passport config
// require('./config/passport')(passport);

// Body Parsing
app.use(express.urlencoded({ extended: false }));
app.use(
  express.json({
    limit: '10kb',
  })
);

// Logging
app.use(logger('dev'));

// Use forms for put / delete
app.use(methodOverride('_method'));

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: String(process.env.SESSION_SECRET),
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: Number(process.env.SESSION_MAX_AGE),
    },
  })
);

// Passport middleware
// app.use(passport.initialize());
// app.use(passport.session());

// Use flash messages for errors, info, ect...
// app.use(flash());

app.get('/health-check', (req, res) => res.status(200).send('Health check passed'));
app.use('/signup', signupRouter);
app.use('/users', usersRouter);

// Setup Routes For Which The Server Is Listening
// app.use('/', mainRoutes);
// app.use('/post', postRoutes);

app.use(errorResponder);
app.use(invalidPathHandler);

module.exports = app;
