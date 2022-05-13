import {Model, Column, DataType, Table, HasMany, BelongsToMany} from "sequelize-typescript";
import {NewsGroup} from "./news-group.model";
import {NewsFile} from "./news-file.model";
import {Group} from "../groups/groups.model";

@Table({tableName: 'news'})
export class News extends Model<News> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataType.STRING, allowNull: false})
    title: string

    @Column({type: DataType.TEXT, allowNull: false})
    text: string

    @Column({type: DataType.STRING})
    image: string

    @BelongsToMany(() => Group,() => NewsGroup)
    groups: Group[]

    @HasMany(() => NewsFile)
    files: NewsFile
}