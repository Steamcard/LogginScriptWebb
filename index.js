
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const express = require("express");
const bcrypt = require("bcryptjs");
const secret = require("./secret");
const login = require("./login");
const auth = require("./auth");
const app = express();

app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.get("/",function(req,res){
    res.send(req.cookies);
});


app.post("/login",login,function(req,res)
{
    //all logik i middelware | om du blir inloggad hamnar man i /secret
});


app.get("/login",function(req,res){
    res.sendFile(__dirname +"/loginform.html");
});


//auth verifierar om man är inloggad eller inte | auth är ett middleware (har tillgång till request, respond och next)
app.get("/secret",auth,function(req,res){
    res.send(req.cookies);
});


app.get("/logout", function(req,res){
    res.cookie("token", "snart är det jul");
    res.redirect("/secret");
});


    /**
     * 1. hämta data som klienten skickat ( Repetition )
     * 2. Leta efter användare i databas/fil/minne
     * 3. Om användare ej finns skicka respons till klient med error
     * 4. Om användare finns gå vidare med att kolla lösenord
     * 5. Om löserord ej är korrekt skicka respons till klient med error
     * 6. Om lösenord är korrekt - Skicka respons/redirect 
     * 7. Nu när användaren är inloggad måste hen förbli så ett ta
     *    Detta löser vi med JWT.
     *    Skapa JWT och lagra i cookie innan din respons/redirect
     * 8. Skapa middleware för att skydda vissa routes.
     *    Här skall vi nu använda våra JWT för att hålla en användare inloggad. 
     * 9. Småfix för att förbättra säkerhet och fixa utloggning. 
     */


// kollar om systemet har en angiven port, annars 3700...
const port = process.env.PORT || 3700
app.listen(port, function(){console.log("port:" +port)});