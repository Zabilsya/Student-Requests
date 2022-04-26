import {Model, Column, DataType, Table, BelongsTo, ForeignKey, HasOne, HasMany} from "sequelize-typescript";
import {UserType} from "./user-types.model";
import {Group} from "../groups/groups.model";
import {RecoveryToken} from "../recovery-tokens/recovery-tokens.model";
import {RequestTemplate} from "../request-templates/request-templates.model";

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
    phone_number: string

    @Column({type: DataType.DATEONLY})
    date_of_birth: Date

    @Column({type: DataType.STRING})
    avatar: string

    @Column({type: DataType.STRING})
    position: string

    @Column({type: DataType.BOOLEAN, defaultValue: false})
    is_blocked: boolean

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

    @HasOne(() => RecoveryToken)
    recovery_token: RecoveryToken

    @HasMany(() => RequestTemplate)
    requestTemplate: RequestTemplate
}