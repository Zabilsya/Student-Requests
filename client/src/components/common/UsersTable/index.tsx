import React, {FC} from 'react';
import {Table, TableBody, TableCell, TableHeader, TableRowBody, TableRowHead} from "../../styled/table";
import {IUser} from "../../../store/reducers/Users/Models";
import {UserTypes} from "../../../const";

interface Props {
    users: IUser[]
}

const UsersTable: FC<Props> = ({users}) => {
    return (
        <Table>
            <TableHeader>
                <TableRowHead>
                    <TableCell width="33%">ФИО</TableCell>
                    <TableCell width="12%">
                        {users[0].user_type === UserTypes.Student ? "Группа" : "Должность"}
                    </TableCell>
                    <TableCell width="25%">Email</TableCell>
                    <TableCell width="20%">Телефон</TableCell>
                </TableRowHead>
            </TableHeader>
            <TableBody>
            {users.map(user => (
                <TableRowBody key={user.id}>
                    <TableCell width="33%%">
                        {user.surname}&nbsp;
                        {user.name}&nbsp;
                        {user.patronymic && user.patronymic}
                    </TableCell>
                    <TableCell width="12%">
                        {user.user_type === UserTypes.Student ? user.group.name : user.position}
                    </TableCell>
                    <TableCell width="25%">{user.email}</TableCell>
                    <TableCell width="20%">{user.phone_number}</TableCell>
                </TableRowBody>
            ))}
            </TableBody>
        </Table>
    );
};

export default UsersTable