const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const courses = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express:server,
    autoescape: true
})

server.get("/", function(req, res) {    
    return res.render("content", { courses })
})

server.get("/about", function(req, res) {
    const about = {
    
            avatar_url: "https://avatars0.githubusercontent.com/u/28929274?s=200&v=4",
            title: "Rocketseat",
            description: "Mais do que uma plataforma de educação em tecnologia,somos uma comunidade incrível de programadores em busca do próximo nível.",
            sub_title: "Principais Tecnologias Utilizadas",
            technologies: [
                {name: "Nodejs"},
                {name: "Reactjs"},
                {name: "React Native"}
            ],
            links: [
                {name: "Github", url: "https://github.com/Rocketseat"},
                {name: "Instagram", url: "https://www.instagram.com/rocketseat_oficial/"},
                {name: "Facebook", url: "https://www.facebook.com/rocketseat"}
            ]
        }
    
    return res.render("about", { about })
})

server.get("/courses/:id", function(req, res) {
    const id = req.params.id;
    const courseId = courses.find(function(courseId) {
        if (courseId.id == id) {
            return true
        }
    })

    if(!courseId) {
        return res.send("Not found!")
    }

    return res.render("courses", { course: courseId })
})

server.use(function(req, res) {
    res.status(404).render("not-found")        
})

server.listen(5000, function() {
    console.log("Server is running")
})