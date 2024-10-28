const express = require("express");
const Router = express.Router();
const jwt = require("jsonwebtoken");


Router.get('/',  (req, res)=> {
    try {
        const token = req.cookies.token;
        const x = jwt.verify(token, `${process.env.AUTHKEY}`);
        res.status(200).json({ message: "Access granted"});
    

    } catch (error) {
        res.status(400).json({message: "token unauthorized"})
    }

})

module.exports = Router;
