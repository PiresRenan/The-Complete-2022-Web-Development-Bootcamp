const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https")

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html")
});
// APIKey = 7fd7c2d37320d196c3b9d7f3189747d4-us21
// AudienceId = e51f9d51eb
app.post("/", function(req,res) {
    const primeiroNome = req.body.primeiroNome;
    const segundoNome = req.body.segundoNome;
    const email = req.body.email;
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: primeiroNome,
                    LNAME: segundoNome
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/e51f9d51eb"
    const options = {
        method: "POST",
        auth: "RenanPires:7fd7c2d37320d196c3b9d7f3189747d4-us21"
    };
    const request = https.request(url, options, function(response) {
        const statusCode = response.statusCode
        if(statusCode === 200){
            res.sendFile(__dirname + "/success.html")
        }else {
            res.sendFile(__dirname + "/failure.html")
        }
        response.on("data", function(data) {
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();

});

app.post("/failure", function(req, res) {
    res.redirect("/")
});


app.listen(3000, function() {
    console.log("Servidor rodando na porta 3000");
});
