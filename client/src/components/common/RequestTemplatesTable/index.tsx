import React, {FC} from 'react';
import {Table, TableBody, TableCell, TableHeader, TableRowBody, TableRowHead} from "../../styled/table";
import {IRequestTemplate} from "../../../store/reducers/RequestTemplates/Models";
import EditDeleteBLock from "../EditDeleteBlock";

interface Props {
    templates: IRequestTemplate[]
    onEdit : (template: IRequestTemplate) => void
    onDelete: (id: number) => void
}

const RequestTemplatesTable: FC<Props> = ({templates, onEdit, onDelete}) => {
    return (
        <Table>
            <TableHeader>
                <TableRowHead>
                    <TableCell width="40%">Название</TableCell>
                    <TableCell width="25%">Ответственный</TableCell>
                    <TableCell width="25%">Оффлайн-запись</TableCell>
                    <TableCell width="10%"></TableCell>
                </TableRowHead>
            </TableHeader>
            <TableBody>
            {templates.map(template => (
                <TableRowBody key={template.id}>
                    <TableCell width="40%">{template.name}</TableCell>
                    <TableCell width="25%">
                        {template.user.surname}&nbsp;
                        {template.user.name[0] + '.'}
                        {template.user.patronymic && template.user.patronymic[0] + '.'}
                    </TableCell>
                    <TableCell width="25%">{template.is_offline ? "Да" : "Нет"}</TableCell>
                    <TableCell width="10%">
                        <EditDeleteBLock
                            onEdit={() => onEdit(template)}
                            onDelete={() => onDelete(template.id)}
                            inTable
                        />
                    </TableCell>
                </TableRowBody>
            ))}
            </TableBody>
        </Table>
    );
};

export default RequestTemplatesTable