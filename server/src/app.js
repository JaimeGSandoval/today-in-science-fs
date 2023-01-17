const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const logger = require('morgan');
const PgSession = require('connect-pg-simple')(session);
const pgPool = require('./config/database');
const signupRouter = require('./routes/signup.router');
const authRouter = require('./routes/auth.router');
const usersRouter = require('./routes/users.router');
const articlesRouter = require('./routes/articles.router');
const settingsRouter = require('./routes/settings.router');
const initiateRouter = require('./routes/initiate.router');
const { errorResponder, invalidPathHandler } = require('./middleware/error-handlers');

const app = express();

app.use(helmet());
app.use(xss());

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

// Passport config
require('./config/passport')(passport);

// Body Parsing
app.use(express.urlencoded({ extended: false }));
app.use(
  express.json({
    limit: '10kb',
  })
);

app.use(cookieParser());

// Use flash messages for errors, info, ect...
app.use(flash());

// Logging
app.use(logger('dev'));

// Use forms for put / delete
app.use(methodOverride('_method'));

// Setup Sessions - stored in Postgres
app.use(
  session({
    store: new PgSession({
      pool: pgPool,
      createTableIfMissing: true,
    }),
    secret: String(process.env.SESSION_SECRET),
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: Number(process.env.SESSION_MAX_AGE) * 24 * 60 * 60 * 1000,
      SameSite: 'none',
      path: '/',
      httpOnly: true,
      secure: false, // change this to true when changing over to https
    },
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('/api/health-check', (req, res) => res.status(200).json('Health check passed'));
app.use('/api/signup', signupRouter);
app.use('/api/auth', authRouter);
app.use('/api/news', initiateRouter);
app.use('/api/settings', settingsRouter);
app.use('/api/articles', articlesRouter);
app.use('/api/users', usersRouter);

app.use(errorResponder);
app.use(invalidPathHandler);

module.exports = app;
