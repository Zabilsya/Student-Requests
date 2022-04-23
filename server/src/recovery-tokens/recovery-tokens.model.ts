import {Model, Column, DataType, Table, ForeignKey, BelongsTo} from "sequelize-typescript";
import {User} from "../users/users.model";

@Table({tableName: 'recovery_token', createdAt: false, updatedAt: false})
export class RecoveryToken extends Model<RecoveryToken> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataType.STRING, allowNull: false})
    token: string

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    user_id: number

    @BelongsTo(() => User)
    user: User
}