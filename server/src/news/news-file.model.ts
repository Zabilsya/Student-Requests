import {Model, Column, DataType, Table, BelongsTo, ForeignKey} from "sequelize-typescript";
import {News} from "./news.model";

@Table({tableName: 'news_file'})
export class NewsFile extends Model<NewsFile> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataType.STRING, allowNull: false})
    file_path: string

    @Column({type: DataType.STRING, allowNull: false})
    file_name: string

    @ForeignKey(() => News)
    @Column({type: DataType.INTEGER, allowNull: false})
    news_id: number

    @BelongsTo(() => News)
    news: News
}