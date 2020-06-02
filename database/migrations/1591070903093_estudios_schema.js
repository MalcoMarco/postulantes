'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EstudiosSchema extends Schema {
  up () {
    this.create('estudios', (table) => {
      table.increments()
      table.integer('postulante_id').notNullable().unsigned()
      table.foreign('postulante_id').references('postulantes.id')
      table.integer('estudiotipo_id').notNullable().unsigned()
      table.foreign('estudiotipo_id').references('estudiotipos.id')
      table.string('universidad', 255).notNullable()
      table.string('mencion', 255).notNullable()
      table.string('expedicion', 255).notNullable()
      table.string('filepath', 255).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('estudios')
  }
}

module.exports = EstudiosSchema
