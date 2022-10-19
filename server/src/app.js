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
const { isAuthenticated } = require('./middleware/auth');
const { errorResponder, invalidPathHandler } = require('./middleware/error-handlers');

const app = express();

app.use(helmet());
app.use(xss());

app.use(
  cors({
    origin: 'http://localhost:8000',
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
      maxAge: Number(process.env.SESSION_MAX_AGE),
    },
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('/health-check', (req, res) => {
  console.log(req.user);
  res.status(200).send('Health check passed');
});

app.use('/signup', signupRouter);
app.use('/auth', authRouter);

app.use(isAuthenticated);
app.use('/users', usersRouter);
app.use('/articles', articlesRouter);
app.use('/settings', settingsRouter);

app.use(errorResponder);
app.use(invalidPathHandler);

module.exports = app;
