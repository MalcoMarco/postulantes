'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostulantesSchema extends Schema {
  up() {
    this.create('postulantes', (table) => {
      table.increments()
      table.string('fullname', 255).notNullable()
      table.string('dni', 255).notNullable()
      table.string('email', 255).notNullable()
      table.string('carreraprofesional', 255).notNullable()
      table.string('movil', 25).notNullable()
    })
  }

  down() {
    this.drop('postulantes')
  }
}

module.exports = PostulantesSchema
