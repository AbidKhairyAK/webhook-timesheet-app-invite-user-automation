const express = require('express')
const inviteEmail = require('./inviteEmail')

const app = express()

app.get('/', async (req, res) => {
	res.send('Yolo')
})


app.get('/invite-to-appsmith/:email', async (req, res) => {
	try {
		await inviteEmail(req.params.email)

		res.json({
			status: 'success',
			message: req.params.email + ' has been invited to appsmith!',
		})
	} catch (err) {
		res.status(500).json({
			status: 'error',
			message: err.message
		})
	}
})

app.listen(5826)