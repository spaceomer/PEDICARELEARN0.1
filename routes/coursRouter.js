const express = require('express')
const router = express.Router()
const Cours = require('../models/cours')

const coursACLS = new Cours ({
    name: "קורס ACLS",
    description: "dsfdsf",
    student: "63a493d4ffcf240b1de7e72d"
})

coursACLS.save()
.then(doc => {
    console.log(doc);
}) .catch((err) => {
    console.log(err);
})