'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CargosSchema extends Schema {
  up () {
    this.create('cargos', (table) => {
      table.increments()
      table.string('nombre', 255).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.table('postulantes', (table) => {
      table.dropForeign('cargo_id')
    })
    this.drop('cargos')

  }
}

module.exports = CargosSchema
