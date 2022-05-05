import {Model, Column, DataType, Table, HasMany} from "sequelize-typescript";
import {Request} from "./requests.model";

@Table({tableName: 'request_status', createdAt: false, updatedAt: false})
export class RequestStatus extends Model<RequestStatus> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataType.STRING, allowNull: false})
    name: string

    @HasMany(() => Request)
    request: Request
}