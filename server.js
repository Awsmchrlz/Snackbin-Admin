// "use strict";


var _express = _interopRequireDefault(require("express"));
const session = require("express-session");

var mongoose = _interopRequireWildcard(require("mongoose"));
var _path = _interopRequireDefault(require("path"));
var _handlebars = _interopRequireDefault(require("handlebars"));
var expressHandlebars = _interopRequireWildcard(require("express-handlebars"));

var _bodyParser = _interopRequireDefault(require("body-parser"));
var adminRoutes = _interopRequireDefault(require("./src/routes/adminRoutes.js")).default;
var authRoutes = _interopRequireDefault(require("./src/routes/authRoutes.js")).default;

const passport = require("passport");
const flash = require('connect-flash');

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
require('dotenv').config();

const app = (0, _express.default)();
const port = 3001 ;





const { ensureAdminAuthenticated } = require("./config/auth");

// const deliveryPassport = require('./config/deliveryPassport');
// const supplierPassport = require('./config/supplierPassport');
// const deliveryPassport = new passport.Passport();
// const supplierPassport = new passport.Passport();



// deliveryPassportConfig(deliveryPassport);
// supplierPassportConfig(supplierPassport);

// 'mongodb+srv://tongabull:tongabullpassword@cluster0.l0puhny.mongodb.net/?retryWrites=true&w=majority'
// 'mongodb://localhost:27017'


const MONGO_DB_URL =  process.env.MONGO_DB_URL
const liveDB = "mongodb+srv://tongabull:tongabullpassword@cluster0.l0puhny.mongodb.net/?retryWrites=true&w=majority"
const localDB = 'mongodb://localhost:27017/tongabull'
mongoose.set('strictQuery', true);

mongoose.connect(liveDB, {
  // useNewUrlParser: true
}).then(() => {
  console.log("connected to database");
}).catch(err => console.log(err));


app.engine('handlebars', expressHandlebars.engine({
  defaultLayout: "main"
}));
app.use(_express.default.urlencoded({
  extended: false
}));

app.use(_express.default.static(_path.default.join(__dirname, 'public/')));
app.set('view engine', 'handlebars');
app.set('views', _path.default.join(__dirname, 'views/'));
app.use(_bodyParser.default.json());
//app.use(express.static('public'))
app.use(_bodyParser.default.urlencoded({
  extended: true
}));


app.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


const adminPassportConfig = require('./config/passport');

adminPassportConfig(passport);

app.use('/', authRoutes);
app.use('/admin', ensureAdminAuthenticated,adminRoutes);
app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server Running on port ${port}`);
});