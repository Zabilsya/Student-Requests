import {Model, Column, DataType, Table, ForeignKey, BelongsTo} from "sequelize-typescript";
import {Request} from "./requests.model";
import {User} from "../users/users.model";

@Table({tableName: 'request_message'})
export class RequestMessage extends Model<RequestMessage> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    author_id: number

    @ForeignKey(() => Request)
    @Column({type: DataType.INTEGER, allowNull: false})
    request_id: number

    @Column({type: DataType.TEXT, allowNull: false})
    text: string

    @Column({type: DataType.BOOLEAN, defaultValue: false})
    is_files: boolean

    @BelongsTo(() => User)
    author: User

    @BelongsTo(() => Request)
    request: Request
}