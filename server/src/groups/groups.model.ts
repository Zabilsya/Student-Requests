import {Model, Column, DataType, Table, HasMany, BelongsToMany} from "sequelize-typescript";
import {User} from "../users/users.model";
import {NewsGroup} from "../news/news-group.model";
import {News} from "../news/news.model";

@Table({tableName: 'group', createdAt: false, updatedAt: false})
export class Group extends Model<Group> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataType.STRING, allowNull: false})
    name: string

    @HasMany(() => User)
    user: User

    @BelongsToMany(() => News,() => NewsGroup)
    groups: News[]
}