'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ExpespecificasSchema extends Schema {
  up () {
    this.create('expespecificas', (table) => {
      table.increments()
      table.integer('postulante_id').notNullable().unsigned()
      table.foreign('postulante_id').references('postulantes.id')
      table.string('entidad', 255).notNullable()
      table.string('cargo', 255).notNullable()
      table.string('periodo', 255).notNullable()
      table.string('tiempo', 255).notNullable()
      table.string('filepath', 255).nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('expespecificas')
  }
}

module.exports = ExpespecificasSchema
