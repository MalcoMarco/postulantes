'use strict'
const Database = use('Database')
const Postulante = use('App/Models/Postulante')
const Cargo = use('App/Models/Cargo')
const Experiencia = use('App/Models/Experiencia')
const Estudio = use('App/Models/Estudio')
const Acreditacion = use('App/Models/Acreditacion')

class AdminController {
    async index({ view }) {
        const postulantes = await Database.table('postulantes')
            .select('fullname', 'email', 'carreraprofesional', 'movil', 'cargo_id', 'postulantes.id', 'nombre as cargoname')
            .innerJoin('cargos', 'cargos.id', 'postulantes.cargo_id')
        //.paginate(1,1)
        //return postulantes
        return view.render('admin.index', { postulantes })
    }

    async showPostulante({ view, params }) {
        const postulante = await Postulante.findOrFail(params.postulante_id)
        const cargo = await Cargo.findOrFail(postulante.cargo_id)
        const estudios = await Database.table('estudios').where('postulante_id', postulante.id)
            .innerJoin('estudiotipos', 'estudiotipos.id', 'estudios.estudiotipo_id')
            .select('estudios.*', 'estudiotipos.nombre')
        const acreditaciones = await Database.table('acreditacions').where('postulante_id', postulante.id)
            .select('*')
        const experiencias = await Database.table('experiencias').where('postulante_id', postulante.id)
            .select('*')
        
        return view.render('admin.postulante', { postulante,cargo,estudios,acreditaciones,experiencias })

    }
}

module.exports = AdminController
