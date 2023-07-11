const express = require('express')
const User = require('../models/User.model')
const router = express.Router()
const bcrypt = require('bcryptjs')


//Get Signup page

router.get('/signup', (req, res, next) => {
    res.render('auth/signup')
})

// POST data to register a new user
router.post('/signup', async (req, res, next) => {
    console.log(req.body)
    const payload = { ...req.body }

    delete payload.password

    const salt = bcrypt.genSaltSync(13)

    payload.passwordHash = bcrypt.hashSync(req.body.password, salt)

    try {
        const newUser = await User.create(payload)
        res.send(newUser)
    } catch (error) {
        console.log(error)
    }

})


//Post data if zhe User exists
router.post('/login', async (req, res, next) => {
    console.log(req.body)
    const currentUser = req.body;
    const checkedUser = await User.findOne({ email: currentUser.email.toLowerCase()})
    try {
        
        if (checkedUser) {
            // User does exists
            if (bcrypt.compareSync(currentUser.password, checkedUser.passwordHash)) {
                // Password is correct
                const loggedUser = { ...checkedUser._doc }
                delete loggedUser.passwordHash
                console.log(loggedUser)
                req.session.user = loggedUser
                res.redirect('/main')
            } else {
               // Password is incorrect 
               console.log('Password is incorrect')
               res.render('auth/login', {
                    errorMessage: 'Password is incorrect',
                    payload: { email: currentUser.email},
               })
            }
        } else {
            // No user with this email
            console.log('No user with this email')
            res.render('auth/login', {
                errorMessage: 'No user with this email',
                payload: { email: currentUser.email},
            })

        }
    } catch (error) {
        console.log('error with user:', error)
        res.render('auth/login', {
            errorMessage: 'There was an error on the server',
            payload: { email: currentUser.email },
        })
    }
}) 





//Get Login page

router.get('/login', (req, res, next) => {
    res.render('auth/login')
})







module.exports = router