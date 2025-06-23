const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const config = require('./config/key');


const { User } = require("./models/User");

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());


const mongoose = require('mongoose')

mongoose.connect(config.mongoURI).then(() => console.log('MongoDB Connected...')).catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World! welcome')
})


app.post('/register', async (req, res) => {

	// 회원 가입 필요 정보


	const user = new User(req.body)

	try {
	    const userInfo = await user.save();
	    return res.status(200).json({ success: true });
	} catch (err) {
	    return res.json({ success: false, err });
	}


	//user.save((err, userInfo) => {
	//	if (err) return res.json({ success: false, err })
	//	return res.status(200).json({
	//		success: true
	//	})
	//})

})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

