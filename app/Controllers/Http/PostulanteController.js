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
    // obteniendo los request
    const requestGradoMaestria = request.only(['gradomaestria'])
    const requestEgresadoMaestria = request.only(['egresadomaestria'])
    const requestTituloProfecional = request.only(['tituloprofesional'])
    const requestGradoBachiller = request.only(['gradobachiller'])
    const requestAcreditacion = request.collect(['acreditacion'])
    const requestExperiencia1 = request.collect(['experienciaLaboral'])
    const requestExperiencia2 = request.collect(['experienciaLaboralEsp'])
    //return requestExperiencia1;

    //modelos
    const Postulante = use('App/Models/Postulante')
    const Estudio = use('App/Models/Estudio')
    const Acreditacion = use('App/Models/Acreditacion')
    const Experiencia = use('App/Models/Experiencia')
    const gradomaestria = new Estudio()
    const egresomaestria = new Estudio()
    const titulo = new Estudio()
    const bachiller = new Estudio()
    
    /** :: estudios :: */
    //subiendo Archivos
    const pathUpload = "public/uploads/";
    const FilesAcepted = ['jpg', 'png', 'jpeg', 'pdf', 'doc', 'docx']
    if (requestGradoMaestria && requestGradoMaestria.gradomaestria) {
      const profilePic = request.file('gradomaestria[archivo]', {
        maxSize: '20mb',
        allowedExtensions: FilesAcepted
      })

      await profilePic.move(pathUpload, {//Helpers.tmpPath('uploads')
        name: `${new Date().getTime()}-${profilePic.clientName}`,
        overwrite: true
      })
      if (!profilePic.moved()) {
        return profilePic.error();
      }
      gradomaestria.filepath = '/uploads/' + profilePic.fileName;
      gradomaestria.universidad = requestGradoMaestria.gradomaestria.universidad
      gradomaestria.estudiotipo_id = 1
      gradomaestria.mencion = requestGradoMaestria.gradomaestria.mencion
      gradomaestria.expedicion = requestGradoMaestria.gradomaestria.expedicion
    }
    if (requestEgresadoMaestria && requestEgresadoMaestria.egresadomaestria) {
      const fileEgresado = request.file('egresadomaestria[archivo]', {
        maxSize: '20mb',
        allowedExtensions: FilesAcepted
      })

      await fileEgresado.move(pathUpload, {//Helpers.tmpPath('uploads')
        name: `${new Date().getTime()}-${fileEgresado.clientName}`,
        overwrite: true
      })
      if (!fileEgresado.moved()) {
        return fileEgresado.error();
      }
      egresomaestria.filepath = '/uploads/' + fileEgresado.fileName;
      egresomaestria.universidad = requestEgresadoMaestria.egresadomaestria.universidad
      egresomaestria.estudiotipo_id = 2
      egresomaestria.mencion = requestEgresadoMaestria.egresadomaestria.mencion
      egresomaestria.expedicion = requestEgresadoMaestria.egresadomaestria.expedicion
    }
    if (requestTituloProfecional && requestTituloProfecional.tituloprofesional) {
      const filetitulo = request.file('tituloprofesional[archivo]', {
        maxSize: '20mb',
        allowedExtensions: FilesAcepted
      })

      await filetitulo.move(pathUpload, {//Helpers.tmpPath('uploads')
        name: `${new Date().getTime()}-${filetitulo.clientName}`,
        overwrite: true
      })
      if (!filetitulo.moved()) {
        return filetitulo.error();
      }
      titulo.filepath = '/uploads/' + filetitulo.fileName;
      titulo.universidad = requestTituloProfecional.tituloprofesional.universidad
      titulo.estudiotipo_id = 3
      titulo.mencion = requestTituloProfecional.tituloprofesional.mencion
      titulo.expedicion = requestTituloProfecional.tituloprofesional.expedicion
    }
    if (requestGradoBachiller && requestGradoBachiller.gradobachiller) {
      const filebachiller = request.file('gradobachiller[archivo]', {
        maxSize: '20mb',
        allowedExtensions: FilesAcepted
      })

      await filebachiller.move(pathUpload, {//Helpers.tmpPath('uploads')
        name: `${new Date().getTime()}-${filebachiller.clientName}`,
        overwrite: true
      })
      if (!filebachiller.moved()) {
        return filebachiller.error();
      }
      bachiller.filepath = '/uploads/' + filebachiller.fileName;
      bachiller.universidad = requestGradoBachiller.gradobachiller.universidad
      bachiller.estudiotipo_id = 4
      bachiller.mencion = requestGradoBachiller.gradobachiller.mencion
      bachiller.expedicion = requestGradoBachiller.gradobachiller.expedicion
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
    if (requestEgresadoMaestria && requestEgresadoMaestria.egresadomaestria) {
      egresomaestria.postulante_id = newPostulante.id;
      await egresomaestria.save(trx)
    }
    if (requestTituloProfecional && requestTituloProfecional.tituloprofesional) {
      titulo.postulante_id = newPostulante.id;
      await titulo.save(trx)
    }
    if (requestGradoBachiller && requestGradoBachiller.gradobachiller) {
      bachiller.postulante_id = newPostulante.id;
      await bachiller.save(trx)
    }

    /** :: acreditaciones :: */
    for (let index = 0; index < requestAcreditacion.length; index++) {
      const { acreditacion } = requestAcreditacion[index]
      if (acreditacion.denominacion && acreditacion.entidad && acreditacion.horas && acreditacion.fecha) {
        const newAcreditacion = new Acreditacion()
        newAcreditacion.denominacion = acreditacion.denominacion
        newAcreditacion.entidad = acreditacion.entidad
        newAcreditacion.horas = acreditacion.horas
        newAcreditacion.fecha = acreditacion.fecha
        newAcreditacion.postulante_id = newPostulante.id
        await newAcreditacion.save(trx) 
      }
    }
    /** :: Experiencia (laboral) tipo 1 :: */
    for (let index = 0; index < requestExperiencia1.length; index++) {
      const { experienciaLaboral } = requestExperiencia1[index]
      if (experienciaLaboral.entidad && experienciaLaboral.cargo && experienciaLaboral.periodo && experienciaLaboral.tiempo) {
        const newExperiencia = new Experiencia()
        newExperiencia.experienciastipo_id = 1
        newExperiencia.entidad = experienciaLaboral.entidad
        newExperiencia.cargo = experienciaLaboral.cargo
        newExperiencia.periodo = experienciaLaboral.periodo
        newExperiencia.tiempo = experienciaLaboral.tiempo
        newExperiencia.postulante_id = newPostulante.id
        await newExperiencia.save(trx) 
      }
    }
    /** :: Experiencia (especifica) tipo 2 :: */
    for (let index = 0; index < requestExperiencia2.length; index++) {
      const { experienciaLaboralEsp } = requestExperiencia2[index]
      if (experienciaLaboralEsp.entidad && experienciaLaboralEsp.cargo && experienciaLaboralEsp.periodo && experienciaLaboralEsp.tiempo) {
        const newExperiencia = new Experiencia()
        newExperiencia.experienciastipo_id = 2
        newExperiencia.entidad = experienciaLaboralEsp.entidad
        newExperiencia.cargo = experienciaLaboralEsp.cargo
        newExperiencia.periodo = experienciaLaboralEsp.periodo
        newExperiencia.tiempo = experienciaLaboralEsp.tiempo
        newExperiencia.postulante_id = newPostulante.id
        await newExperiencia.save(trx) 
      }
    }


    // once done commit the transaction
    await trx.commit()

    session.flash({ success: 'Registro Completado Exitosamente!' })
    return response.redirect('back')
    //response.redirect('/index', 201)
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
