var express = require( "express" );
var firebase = require("./firebase");
var app = express();
var port = process.env.PORT || 30101;

app.get('/', (req, res) => res.send('Hello World!'))
app.get("/firebase", (req, res) => {
	const value = firebase.get("firebase/test_value");
	res.send(value);
});
app.get("/firebase/insert", (req, res) => {
	firebase.set("firebase/test_value", {
		"msg": "Hello from firebase"
	});
	res.send("ok");
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))