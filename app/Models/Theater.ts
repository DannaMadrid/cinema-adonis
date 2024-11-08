import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Projector from './Projector'
import Seat from './Seat'
import Screening from './Screening'

export default class Theater extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public location:String

  @column()
  public capacity:number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Projector,{
    foreignKey:"projector_id"
  })

  public projector: HasOne<typeof Projector>

  @hasMany (()=>Seat,{
    // nombre de la clave foranea
    foreignKey:'theaters_id'
  })

  public seat: HasMany<typeof Seat>

  @hasMany (()=>Screening,{
    // nombre de la clave foranea
    foreignKey:'theaters_id'
  })

  public Screenings: HasMany<typeof Screening>
}
