require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const jsxEngine = require('jsx-view-engine')
const methodOverride = require('method-override')
const Fruit = require('./models/fruit')
const PORT = process.env.PORT || 3000

const app = express()

app.use(express.urlencoded({ extended: true })) // this is for building server side rendered website
// app.use(express.json()) this is for building an API 
app.use(methodOverride('_method'))

//View Engine
app.set('view engine', 'jsx')
app.engine('jsx', jsxEngine())

mongoose.connect(process.env.MONGO_URI)
mongoose.connection.once('open', () => {
  console.log('connected to mongodb')
})

/////INDUCES

//INDEX
//Table of contents (List of fruits)
app.get('/fruits', async (req, res) => {
  try {
    const foundFruits = await Fruit.find({})
    res.render('fruits/Index', {
      fruits: foundFruits
    })
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
})

//NEW
//Show the user a form to fill out to create a fruit (Only brings the form)

app.get('/fruits/new', (req, res) => {
  res.render('fruits/New')
})

//DELETE
//Backend ONLY functionality that is used to delete a fruit

app.delete('/fruits/:id', async (req, res) => {
  try {
    await Fruit.findOneAndDelete({'_id': req.params.id})
    .then(() => {
      res.redirect('/fruits')
    })
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
})
//UPDATE
//Backend ONLY functionality that is used to update a fruit 

app.put('/fruits/:id', async (req, res) => {
  if(req.body.readyToEat === 'on'){
    req.body.readyToEat = true
  } else {
    req.body.readyToEat = false
  }

  try {
    await Fruit.findOneAndUpdate({'_id': req.params.id}, 
    req.body, { new: true })
    .then(() => {
      res.redirect(`/fruits/${req.params.id}`)
    })
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
})

//CREATE
//Backend ONLY functionality that is used to create a fruit (Actually creates the fruit)

app.post('/fruits', async (req, res) => {
  if(req.body.readyToEat === 'on'){
    req.body.readyToEat = true
  } else {
    req.body.readyToEat = false
  }

  try {
    const createdFruit = await Fruit.create(req.body)
    res.redirect(`/fruits/${createdFruit._id}`)
  }catch(error){
    res.status(400).send({message: error.message})
  }
})

//EDIT
//Backend ONLY functionality that is used to edit the fruit
app.get('/fruits/:id/edit', async (req, res) => {
  try {
    const foundFruit = await Fruit.findOne({_id: req.params.id})
    res.render('fruits/Edit', {
      fruit: foundFruit
    })
  } catch (error) {
      res.status(400).send({message: error.message})
  }
})

//SHOW
//Shows you 1 individual fruit 
app.get('/fruits/:id', async (req, res) => {
  try {
    const foundFruit = await Fruit.findOne({_id: req.params.id})
    res.render('fruits/Show', {
      fruit: foundFruit
    })
  } catch (error) {
      res.status(400).send({ message: error.message })
  }
})

app.listen(PORT, () => {
  console.log(`Ayo the Port at ${PORT} is lit`)
})


















// const express = require('express') // imported express from node modules
// const app = express()
// const path = require('path')
// const fs = require('fs')


// // organization code starts
// /* Setup our database */
// app.engine('liberty', (filePath, options, callback) => {
//     fs.readFile(filePath, (err, content) => {
//         if(err) return callback(err)

//         const rendered = content.toString()
//             .replace('#title#', `<title>${options.title}</title>`)
//             .replace('#message#', `<h1>${options.message}</h1>` )
//             .replace('#content#', `<div>${Array.isArray(options.content)? options.content.map((item) => {
//                 return `<li>${item}</li>`
//             }): options.content}</div>`)
//         return callback(null, rendered)
//     })
// })
// app.set('views', './views')
// app.set('view engine', 'liberty')

// // organization code ends

// // middleware starts

// // app.use(express.static('public'))
// app.use((req, res, next) => {
//  console.log(req.ip, 'hey arthur')
//  next()
// })

// // middleware ends


// // routes start
// app.get('/', (req, res) => {
//     res.render('template', { title: 'I am DJ Khaled', message: 'We The Best!', content: 'All I Do is Win' })
//   })
  
//   app.get('/about-me', (req, res) => {
//     res.render('template', { title: 'DJ KHALED', message: 'It Breaks My Heart!', content: 'They Ain\'t Believe in Us But God Did' })
//   })
  
//   app.get('/another-one', (req, res) => {
//     res.render('template', { title: 'We The Best', message: 'Who The Best! We!!!', content: 'We Taking Over, Major Key Alert, Y\'all know who it is, All I do is win, God Did!!!' })
//   })

// // routes end


// app.listen(3000, () => { 
//     console.log('We in the building')
// })

// // app.get('/:name', (req, res) => {
// //     res.send(`Hello ${req.params.name}`)
// // })