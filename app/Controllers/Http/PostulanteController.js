'use strict'
/**
 * Resourceful controller for interacting with postulantes
 */
const Helpers = use('Helpers')
const { validate } = use('Validator')
//const { session } = use('Session')
class PostulanteController {

  async index({ request, response, view }) {
    return view.render('public.registropostulantes');
  }


  async store({ request, response, view, session }) {
    const rulesPostulante = {
      fullname: 'required',
      dni: 'required',
      movil: 'required',
      cargo_id: 'required',
      carreraprofesional: 'required',
      email: 'required|email'
    }
    const postulanteRequestData = request.only(
      ['fullname', 'dni', 'email', 'movil', 'cargo_id', 'carreraprofesional']
    )
    //validar
    const validationPostulante = await validate(postulanteRequestData, rulesPostulante)
    if (validationPostulante.fails()) {
      session.withErrors(validationPostulante.messages())
        .flashAll()
      session.flash({ error: 'Complete los Campos' })
      return response.redirect('back')
    }
    

    const requestGradoMaestria = request.only(['gradomaestria'])

    //return response.send(requestGradoMaestria)
    //modelos
    const Postulante = use('App/Models/Postulante')
    const Estudio = use('App/Models/Estudio')

    //subiendo Archivos
    const pathUpload = "public/uploads/";
    var FileNamegradomaestria, FileNameegresadomaestria, FileNametitulo, FileNamebachiller;

    const gradomaestria = new Estudio()
    const bachillermaestria = new Estudio()
    const titulo = new Estudio()
    const bachiller = new Estudio()
    if (requestGradoMaestria && requestGradoMaestria.gradomaestria) {
      const profilePic = request.file('gradomaestria[archivo]', {
        maxSize: '20mb',
        allowedExtensions: ['jpg', 'png', 'jpeg', 'pdf', 'doc', 'docx']
      })

      await profilePic.move(pathUpload, {//Helpers.tmpPath('uploads')
        name: `${new Date().getTime()}-${profilePic.clientName}`,
        overwrite: true
      })
      if (!profilePic.moved()) {
        return profilePic.error();
      }
      gradomaestria.filepath = '/'+pathUpload + profilePic.fileName;
      gradomaestria.universidad = requestGradoMaestria.gradomaestria.universidad
      gradomaestria.estudiotipo_id = 1
      gradomaestria.mencion = requestGradoMaestria.gradomaestria.mencion
      gradomaestria.expedicion = requestGradoMaestria.gradomaestria.expedicion
    }



    //return response.send(profilePic.fileName)
    //return response.send(postulanteRequestData)

    const Database = use('Database')
    const trx = await Database.beginTransaction()

    const newPostulante = await Postulante.create(postulanteRequestData, trx)
    if (requestGradoMaestria && requestGradoMaestria.gradomaestria) {
      gradomaestria.postulante_id = newPostulante.id;
      await gradomaestria.save(trx)
    }

    // once done commit the transaction
    await trx.commit()

    response.redirect('/index',201)
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
