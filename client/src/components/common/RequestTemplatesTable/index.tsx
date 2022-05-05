import React, {FC} from 'react';
import {Table, TableBody, TableCell, TableHeader, TableRowBody, TableRowHead} from "../../styled/table";
import {IRequestTemplate} from "../../../store/reducers/RequestTemplates/Models";

interface Props {
    templates: IRequestTemplate[]
}

const RequestTemplatesTable: FC<Props> = ({templates}) => {
    return (
        <Table>
            <TableHeader>
                <TableRowHead>
                    <TableCell width="50%">Название</TableCell>
                    <TableCell width="25%">Ответственный</TableCell>
                    <TableCell width="25%">Оффлайн-запись</TableCell>
                </TableRowHead>
            </TableHeader>
            <TableBody>
            {templates.map(template => (
                <TableRowBody key={template.id}>
                    <TableCell width="50%">{template.name}</TableCell>
                    <TableCell width="25%">
                        {template.user.surname}&nbsp;
                        {template.user.name[0] + '.'}
                        {template.user.patronymic && template.user.patronymic[0] + '.'}
                    </TableCell>
                    <TableCell width="25%">{template.is_offline ? "Да" : "Нет"}</TableCell>
                </TableRowBody>
            ))}
            </TableBody>
        </Table>
    );
};

export default RequestTemplatesTable