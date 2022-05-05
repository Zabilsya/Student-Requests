import {Model, Column, DataType, Table, ForeignKey, BelongsTo, HasMany} from "sequelize-typescript";
import {User} from "../users/users.model";
import {Request} from "../requests/requests.model";

@Table({tableName: 'request_template', createdAt: false, updatedAt: false})
export class RequestTemplate extends Model<RequestTemplate> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataType.STRING, allowNull: false})
    name: string

    @Column({type: DataType.BOOLEAN, allowNull: false})
    is_offline: boolean

    @Column({type: DataType.BOOLEAN, allowNull: false, defaultValue: false})
    is_blocked: boolean

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    user_id: number

    @BelongsTo(() => User)
    user: User

    @HasMany(() => Request)
    request: Request
}