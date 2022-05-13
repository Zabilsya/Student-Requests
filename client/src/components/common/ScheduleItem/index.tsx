import React, {FC} from 'react';
import {ScheduleTitle, ScheduleFilesWrapper, ScheduleItemWrapper} from "./styles";
import {FlexWrapper, MarginWrapper} from "../../styled/wrappers"
import {ISchedule} from "../../../store/reducers/Schedule/Models";
import Document from "../Document";
import EditDeleteBLock from "../EditDeleteBlock";

interface Props {
    schedule: ISchedule
    onEdit: (schedule: ISchedule) => void
    onDelete: (id: number) => void
}

const ScheduleItem: FC<Props> = ({schedule, onEdit, onDelete}) => {
    return (
        <ScheduleItemWrapper>
            <MarginWrapper bottom="15px">
                <FlexWrapper gap="15px">
                    <ScheduleTitle>{schedule.title}</ScheduleTitle>
                    <EditDeleteBLock
                        onEdit={() => onEdit(schedule)}
                        onDelete={() => onDelete(schedule.id)}
                    />
                </FlexWrapper>
            </MarginWrapper>
            <ScheduleFilesWrapper>
                {schedule.files && schedule.files.map(file => (
                    <FlexWrapper gap="15px" key={file.id}>
                        <Document
                            file_name={file.file_name}
                            file_path={process.env.REACT_APP_API_URL + '/' + file.file_path}
                            fullWidth
                        />
                    </FlexWrapper>
                ))}
            </ScheduleFilesWrapper>
        </ScheduleItemWrapper>
    );
};

export default ScheduleItem