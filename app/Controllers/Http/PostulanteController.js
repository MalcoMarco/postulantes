'use strict'
/**
 * Resourceful controller for interacting with postulantes
 */
const Helpers = use('Helpers')
const { validate } = use('Validator')
const Database = use('Database')
const Postulante = use('App/Models/Postulante')
const Cargo = use('App/Models/Cargo')
//const { session } = use('Session')
class PostulanteController {

   permitirRegistro=false;

  async index({ request, response, view }) {
    return view.render('public.registropostulantes',{permitirRegistro:this.permitirRegistro});
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
      ['fullname', 'dni', 'email', 'movil', 'cargo_id', 'carreraprofesional', 'ugel']
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
    const requestExperiencia1 = request.collect(['experienciaLaboral1'])
    const requestExperiencia2 = request.collect(['experienciaLaboral2'])
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
    //subiendo Archivos ESTUDIOS
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
        //subiendo archivo
        const fileAcred = request.file(`acreditacion[${index}][archivo]`, {
          maxSize: '20mb',
          allowedExtensions: FilesAcepted
        })

        if (fileAcred) {
          await fileAcred.move(pathUpload, {//Helpers.tmpPath('uploads')
            name: `${new Date().getTime()}-${fileAcred.clientName}`,
            overwrite: true
          })
          newAcreditacion.filepath = '/uploads/' + fileAcred.fileName;
        }


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
      const { experienciaLaboral1 } = requestExperiencia1[index]
      if (experienciaLaboral1.entidad && experienciaLaboral1.cargo && experienciaLaboral1.periodo && experienciaLaboral1.tiempo) {
        const newExperiencia = new Experiencia()
        //subiendo archivo
        const fileExp = request.file(`experienciaLaboral1[${index}][archivo]`, {
          maxSize: '20mb',
          allowedExtensions: FilesAcepted
        })

        if (fileExp) {
          await fileExp.move(pathUpload, {//Helpers.tmpPath('uploads')
            name: `${new Date().getTime()}-${fileExp.clientName}`,
            overwrite: true
          })
          newExperiencia.filepath = '/uploads/' + fileExp.fileName;
        }
        newExperiencia.experienciastipo_id = 1
        newExperiencia.entidad = experienciaLaboral1.entidad
        newExperiencia.cargo = experienciaLaboral1.cargo
        newExperiencia.periodo = experienciaLaboral1.periodo
        newExperiencia.tiempo = experienciaLaboral1.tiempo
        newExperiencia.postulante_id = newPostulante.id
        await newExperiencia.save(trx)
      }
    }
    /** :: Experiencia (especifica) tipo 2 :: */
    for (let index = 0; index < requestExperiencia2.length; index++) {
      const { experienciaLaboral2 } = requestExperiencia2[index]
      if (experienciaLaboral2.entidad && experienciaLaboral2.cargo && experienciaLaboral2.periodo && experienciaLaboral2.tiempo) {
        const newExperiencia = new Experiencia()
        //subiendo archivo
        const fileExp = request.file(`experienciaLaboral2[${index}][archivo]`, {
          maxSize: '20mb',
          allowedExtensions: FilesAcepted
        })

        if (fileExp) {
          await fileExp.move(pathUpload, {//Helpers.tmpPath('uploads')
            name: `${new Date().getTime()}-${fileExp.clientName}`,
            overwrite: true
          })
          newExperiencia.filepath = '/uploads/' + fileExp.fileName;
        }
        newExperiencia.experienciastipo_id = 2
        newExperiencia.entidad = experienciaLaboral2.entidad
        newExperiencia.cargo = experienciaLaboral2.cargo
        newExperiencia.periodo = experienciaLaboral2.periodo
        newExperiencia.tiempo = experienciaLaboral2.tiempo
        newExperiencia.postulante_id = newPostulante.id
        await newExperiencia.save(trx)
      }
    }


    // once done commit the transaction
    await trx.commit()

    session.flash({ success: 'Registro Completado Exitosamente!' })
    return response.redirect(`/postulantes/registro-completo/${newPostulante.id}`)
  }


  async registroOk({ view, params }) {
    var pdf = require('html-pdf');

    const postulante = await Postulante.findOrFail(params.postulante_id)
    const cargo = await Cargo.findOrFail(postulante.cargo_id)
    const estudios = await Database.table('estudios').where('postulante_id', postulante.id)
      .innerJoin('estudiotipos', 'estudiotipos.id', 'estudios.estudiotipo_id')
      .select('estudios.*', 'estudiotipos.nombre')
    const acreditaciones = await Database.table('acreditacions').where('postulante_id', postulante.id)
      .select('*')
    const experiencias = await Database.table('experiencias').where('postulante_id', postulante.id)
      .select('*')

    //return view.render('pdf.postulante', { postulante,cargo,estudios,acreditaciones,experiencias })
    var contenido = view.render('pdf.postulante', { postulante, cargo, estudios, acreditaciones, experiencias })
    const options = {
      "format": 'A4',
      "border": {
        "top": "2.5cm",            // default is 0, units: mm, cm, in, px
        "right": "2cm",
        "bottom": "2.5cm",
        "left": "2cm"
      },
    };
    const PdfNAme = `./public/registropdf/registro-2020-${params.postulante_id}.pdf`
    await pdf.create(contenido, options).toFile(PdfNAme, function (err, res) {
      //if (err) return console.log(err);
      //return res; // { filename: './public/registropdf/salida.pdf' }
    });
    return view.render('public.registropostulantesOk', { postulante_id: params.postulante_id })
  }

  async pdf({ view }) {
    var pdf = require('html-pdf');
    const id = 29
    const postulante = await Postulante.findOrFail(id)
    const cargo = await Cargo.findOrFail(postulante.cargo_id)
    const estudios = await Database.table('estudios').where('postulante_id', postulante.id)
      .innerJoin('estudiotipos', 'estudiotipos.id', 'estudios.estudiotipo_id')
      .select('estudios.*', 'estudiotipos.nombre')
    const acreditaciones = await Database.table('acreditacions').where('postulante_id', postulante.id)
      .select('*')
    const experiencias = await Database.table('experiencias').where('postulante_id', postulante.id)
      .select('*')

    var contenido = view.render('pdf.postulante', { postulante, cargo, estudios, acreditaciones, experiencias })
    //return view.render('pdf.postulante', { postulante,cargo,estudios,acreditaciones,experiencias })
    const PdfNAme = `./public/registropdf/registro-2020-${id}.pdf`
    const registroPdf = await pdf.create(contenido).toFile(PdfNAme, function (err, res) {
      //if (err) return console.log(err);
      //console.log(res);  // { filename: './public/registropdf/salida.pdf' }
    });
    return registroPdf
  }

  async cargos(){
    const cargos = await Database.table('cargos').select('id', 'nombre');

    return cargos;
  }

}

module.exports = PostulanteController
