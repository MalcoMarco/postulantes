'use strict'

class UserController {
    async formlogin({view,response,auth}){
        if (auth.user) {
            return response.redirect('/admin')
           }
        return view.render('auth.login');
    }


    async login({ auth, request,response }) {
        const { email, password } = request.all()
       const userAuth= await auth.attempt(email, password)

       if (userAuth) {
        return response.redirect('/admin')
       }
       return response.redirect('/login')


    }

    show({ auth, params }) {
        if (auth.user.id !== Number(params.id)) {
            return "You cannot see someone else's profile"
        }
        return auth.user
    }

}

module.exports = UserController
