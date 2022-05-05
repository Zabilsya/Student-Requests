import {Model, Column, DataType, Table, ForeignKey, BelongsTo, HasMany} from "sequelize-typescript";
import {User} from "../users/users.model";
import {RequestTemplate} from "../request-templates/request-templates.model";
import {RequestStatus} from "./request-statuses.model";
import {RequestFile} from "./requests-file.model";
import {RequestMessage} from "./request-messages.model";

@Table({tableName: 'request'})
export class Request extends Model<Request> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ForeignKey(() => RequestTemplate)
    @Column({type: DataType.INTEGER, allowNull: false})
    template_id: number

    @BelongsTo(() => RequestTemplate)
    template: RequestTemplate

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    creator_user_id: number

    @BelongsTo(() => User, 'creator_user_id')
    creator_user: User

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    acceptor_user_id: number

    @BelongsTo(() => User, 'acceptor_user_id')
    acceptor_user: User

    @ForeignKey(() => RequestStatus)
    @Column({type: DataType.INTEGER, allowNull: false})
    status_id: number

    @BelongsTo(() => RequestStatus)
    status: RequestStatus

    @HasMany(() => RequestFile)
    files: RequestFile

    @HasMany(() => RequestMessage)
    messages: RequestMessage
}