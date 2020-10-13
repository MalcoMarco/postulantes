'use strict'
const Cargo = use('App/Models/Cargo')

class RegisterController {
    FormUserRegister({view}){
        return view.render('auth.register')
    }

    async registeruser({request,response}){
        const userRequest = request.only(['username','email','password'])
        const User = use ('App/Models/User')
        //const newUser = new User()

        await User.create(userRequest)
        response.redirect('/login',201)
    }
}

module.exports = RegisterController
