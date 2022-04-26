import {Model, Column, DataType, Table, BelongsTo, ForeignKey} from "sequelize-typescript";
import {News} from "./news.model";
import {Group} from "../groups/groups.model";

@Table({tableName: 'news_group'})
export class NewsGroup extends Model<NewsGroup> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ForeignKey(() => Group)
    @Column({type: DataType.INTEGER, allowNull: false})
    group_id: number

    @ForeignKey(() => News)
    @Column({type: DataType.INTEGER, allowNull: false})
    news_id: number
}