'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with postulantes
 */
class PostulanteController {
  /**
   * Show a list of all postulantes.
   * GET postulantes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    return view.render('public.registropostulantes');
  }


  async create({ request, response, view }) {
  }


  async store({ request, response,view }) {
    const requestData = request.only(
      ['fullname', 'dni', 'email','movil','cargo_id','carreraprofesional']
    )
    const body = request.post()
    return response.send(body)
    //return response.send(requestData)

    const Postulante = use('App/Models/Postulante')

    await Postulante.create(requestData)
    return response.redirect('/', false, 201)
  }


  async show({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing postulante.
   * GET postulantes/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update postulante details.
   * PUT or PATCH postulantes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a postulante with id.
   * DELETE postulantes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = PostulanteController
