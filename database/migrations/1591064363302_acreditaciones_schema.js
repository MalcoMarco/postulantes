'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AcreditacionesSchema extends Schema {
  up () {
    this.create('acreditaciones', (table) => {
      table.increments()
      table.integer('postulante_id').notNullable().unsigned()
      table.foreign('postulante_id').references('postulantes.id')
      table.string('curso', 255).notNullable()
      table.string('entidad', 255).notNullable()
      table.string('horas', 255).notNullable()
      table.string('expedicion', 255).notNullable()
      table.string('filepath', 255).nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('acreditaciones')
  }
}

module.exports = AcreditacionesSchema
