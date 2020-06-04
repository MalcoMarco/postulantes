'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Drive = use('Drive')
const Route = use('Route')

//Route.on('/').render('welcome')
Route.get('/', 'PostulanteController.index');
Route.get('/index', 'PostulanteController.index');


// ::: POSTULANTES :::
Route.group(() => {
  Route.post('store', 'PostulanteController.store')
}).prefix('postulantes')


Route.get('login', 'UserController.formlogin').middleware('guest')
Route.post('dologin', 'UserController.login').middleware('guest')
Route.get('register', 'Auth/RegisterController.FormUserRegister').middleware('guest')
Route.post('register', 'Auth/RegisterController.registeruser').middleware('guest')

Route.get('users/:id', 'UserController.show').middleware('auth')
Route.get('/logout', async ({auth,response})=>{
  await auth.logout()
  response.redirect('/login')
}).middleware('auth')

// ::: ADMIN :::
Route.group(() => {
  Route.get('', 'Admin/AdminController.index')
  Route.get('postulante/:postulante_id', 'Admin/AdminController.showPostulante')

}).prefix('admin').middleware('auth')