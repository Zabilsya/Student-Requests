import {Model, Column, DataType, Table, BelongsTo, HasMany} from "sequelize-typescript";
import {User} from "./users.model";

@Table({tableName: 'user_type', createdAt: false, updatedAt: false})
export class UserType extends Model<UserType> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataType.STRING, allowNull: false})
    name: string

    @HasMany(() => User)
    user: User
}