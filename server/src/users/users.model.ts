import {Model, Column, DataType, Table, BelongsTo, ForeignKey} from "sequelize-typescript";
import {UserType} from "./user-types.model";
import {Group} from "../groups/groups.model";

@Table({tableName: 'user'})
export class User extends Model<User> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataType.STRING, allowNull: false})
    name: string

    @Column({type: DataType.STRING, allowNull: false})
    surname: string

    @Column({type: DataType.STRING})
    patronymic: string

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string

    @Column({type: DataType.STRING, allowNull: false})
    password: string

    @Column({type: DataType.STRING})
    position: string

    @ForeignKey(() => UserType)
    @Column({type: DataType.INTEGER, allowNull: false})
    user_type: number

    @BelongsTo(() => UserType)
    role: UserType

    @ForeignKey(() => Group)
    @Column({type: DataType.INTEGER})
    group_id: number

    @BelongsTo(() => Group)
    group: Group
}