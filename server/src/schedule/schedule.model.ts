import {Model, Column, DataType, Table, ForeignKey, BelongsTo} from "sequelize-typescript";
import {ScheduleTitle} from "./schedule-title.model";

@Table({tableName: 'schedule', createdAt: false, updatedAt: false})
export class Schedule extends Model<Schedule> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataType.STRING, allowNull: false})
    file_path: string

    @Column({type: DataType.STRING, allowNull: false})
    file_name: string

    @ForeignKey(() => ScheduleTitle)
    @Column({type: DataType.INTEGER, allowNull: false})
    title_id: number

    @BelongsTo(() => ScheduleTitle)
    title: ScheduleTitle
}