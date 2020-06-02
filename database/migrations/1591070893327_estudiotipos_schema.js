'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EstudiotiposSchema extends Schema {
  up () {
    this.create('estudiotipos', (table) => {
      table.increments()
      table.string('nombre', 255).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('estudiotipos')
  }
}

module.exports = EstudiotiposSchema
