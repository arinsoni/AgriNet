const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
var cors = require('cors');
const AdminRouter = require('./Routes/admin')
const FarmerRouter = require('./Routes/farmer')
const FolderRouter = require('./Routes/folders')
const multer = require('multer');


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

app.use('/api/admin', AdminRouter);
app.use('/api/farmer', FarmerRouter);
app.use('/api', FolderRouter);



mongoose.connect(process.env.MONGO_URL, {
}).then(() => {
	app.listen(PORT, () => console.log(`Server PORT ${PORT}`))
}).catch((err) => {
})

module.exports = app;
