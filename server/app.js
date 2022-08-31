const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const methodOverride = require('method-override');

const blogRoutes = require('./routes/blogs');

// database
mongoose.connect(
	`mongodb+srv://leonfiasco:Kwame123@cluster0.esv8yyj.mongodb.net/?retryWrites=true&w=majority`
);

// middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/posts', blogRoutes);
app.use(methodOverride('_method'));

const port = process.env.PORT || 2402;

if (process.env.NODE_ENV !== 'test') {
	app.listen(port, () => {
		console.log(`Listening to requests on port: ${port}...`);
	});
}

module.exports = app;
