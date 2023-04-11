const express = require('express');
const path = require("path")
const fs = require('fs');

const app = express();
const PORT = 30001;

app.listen(PORT, function() {
    console.log(`App is listening on Port ${PORT}`);
})