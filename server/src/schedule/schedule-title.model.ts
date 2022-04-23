import {Model, Column, DataType, Table, HasMany} from "sequelize-typescript";
import {User} from "../users/users.model";
import {Schedule} from "./schedule.model";

@Table({tableName: 'schedule_title', createdAt: false, updatedAt: false})
export class ScheduleTitle extends Model<ScheduleTitle> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataType.STRING, allowNull: false})
    title: string

    @HasMany(() => Schedule)
    schedule: Schedule
}