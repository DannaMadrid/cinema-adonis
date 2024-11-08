import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema { // clase que 
  protected tableName = 'theaters'

  public async up () { // Metodo 
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string("location")
      table.integer("capacity")
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
