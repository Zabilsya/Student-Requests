import {Model, Column, DataType, Table, BelongsTo, ForeignKey} from "sequelize-typescript";
import {Request} from "./requests.model";

@Table({tableName: 'request_file'})
export class RequestFile extends Model<RequestFile> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataType.STRING, allowNull: false})
    file_path: string

    @Column({type: DataType.STRING, allowNull: false})
    file_name: string

    @ForeignKey(() => Request)
    @Column({type: DataType.INTEGER, allowNull: false})
    request_id: number

    @BelongsTo(() => Request)
    request: Request
}