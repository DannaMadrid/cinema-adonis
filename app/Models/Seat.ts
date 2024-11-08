import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Theater from './Theater'

export default class Seat extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public location:string

  @column()
  public reclining:boolean

  @column()
  public theater_id:number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Theater,{ //Estoy indicando que la silla le pertenece a teatro
    foreignKey:"teather_id"
  })

  public theater: BelongsTo<typeof Theater>
}
