// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for gym
const Gym = require('../models/gym')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { example: { title: '', text: 'foo' } } -> { example: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX
// GET /examples
router.get('/gyms', (req, res, next) => {
  Gym.find()
    .then(gyms => {
      // `gyms` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return gyms.map(gym => gym.toObject())
    })
    // respond with status 200 and JSON of the gyms
    .then(gyms => res.status(200).json({ gyms: gyms }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// SHOW/GET
router.get('/gyms/:id', requireToken, (req, res, next) => {
  // req.params.id will be set based on the `:id` in the route
  Gym.findById(req.params.id)
    .then(handle404)
    // if `findById` is succesful, respond with 200 and "example" JSON
    .then(gym => res.status(200).json({ gym: gym.toObject() }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// CREATE
// POST /gyms
router.post('/gyms', requireToken, (req, res, next) => {
  // set owner of new gym to be current user
  req.body.gym.owner = req.user.id

  Gym.create(req.body.gym)
    // respond to succesful `create` with status 201 and JSON of new "gym"
    .then(gym => {
      res.status(201).json({ gym: gym.toObject() })
    })
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(next)
})

// UPDATE
// PATCH /gyms/5a7db6c74d55bc51bdf39793
router.patch('/gyms/:id', requireToken, removeBlanks, (req, res, next) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.gym.owner

  Gym.findById(req.params.id)
    .then(handle404)
    .then(gym => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      requireOwnership(req, gym)

      // pass the result of Mongoose's `.update` to the next `.then`
      return gym.updateOne(req.body.gym)
    })
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// DESTROY
// DELETE /gyms/5a7db6c74d55bc51bdf39793
router.delete('/gyms/:id', requireToken, (req, res, next) => {
  Gym.findById(req.params.id)
    .then(handle404)
    .then(gym => {
      // throw an error if current user doesn't own `gym`
      requireOwnership(req, gym)
      // delete the gym ONLY IF the above didn't throw
      gym.deleteOne()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

module.exports = router
