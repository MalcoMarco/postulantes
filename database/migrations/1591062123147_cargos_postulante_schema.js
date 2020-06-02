'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CargosPostulanteSchema extends Schema {
  up () {
    this.table('postulantes', (table) => {
      // alter table
      table.integer('cargo_id').unsigned()
      table.foreign('cargo_id').references('cargos.id')
      table.timestamps()

    })
  }

  down () {
    this.table('postulantes', (table) => {
      table.dropForeign('cargo_id')
    })
  }
}

module.exports = CargosPostulanteSchema
