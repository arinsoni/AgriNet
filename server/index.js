const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
var cors = require('cors');
const routes = require('./controllers/main')
const AdminRouter = require('./Routes/admin')
const FarmerRouter = require('./Routes/farmer')

dotenv.config();

const PORT = process.env.PORT || 6001
const app = express();

app.get("/", (req, res) => {
	res.send("Hi")
})
app.use(express.json());
const corsOptions = {
	origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));

//Routes
app.use('/api', routes);
app.use('/api/admin', AdminRouter);
app.use('/api/farmer', FarmerRouter);


//MongoDB setup
mongoose.connect(process.env.MONGO_URL, {
}).then(() => {
	app.listen(PORT, () => console.log(`Server PORT ${PORT}`))
}).catch((err) => {
})

module.exports = app;
