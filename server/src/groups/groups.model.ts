import {Model, Column, DataType, Table, HasMany} from "sequelize-typescript";
import {User} from "../users/users.model";

@Table({tableName: 'group', createdAt: false, updatedAt: false})
export class Group extends Model<Group> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataType.STRING, allowNull: false})
    name: string

    @HasMany(() => User)
    user: User
}