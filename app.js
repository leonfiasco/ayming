const express = require('express');
const app = express();
const morgan = require('morgan');

const blogRoutes = require('./routes/blogs');

// logs request handler to terminal
app.use(morgan('dev'));

app.use('/posts', blogRoutes);

const port = process.env.PORT || 2402;
app.listen(port, () => {
	console.log(`Listening to requests on port: ${port}...`);
});
