import React, {FC} from 'react';
import {ScheduleTitle, ScheduleFilesWrapper, ScheduleItemWrapper} from "./styles";
import {FlexWrapper, MarginWrapper} from "../../styled/wrappers"
import {ISchedule} from "../../../store/reducers/Schedule/Models";
import Document from "../Document";
import EditDeleteBLock from "../EditDeleteBlock";

const ScheduleItem: FC<ISchedule> = ({title, files}) => {
    return (
        <ScheduleItemWrapper>
            <MarginWrapper bottom="15px">
                <ScheduleTitle>{title}</ScheduleTitle>
            </MarginWrapper>
            <ScheduleFilesWrapper>
                {files && files.map(file => (
                    <FlexWrapper gap="15px" key={file.id}>
                        <Document
                            file_name={file.file_name}
                            file_path={process.env.REACT_APP_API_URL + '/' + file.file_path}
                            fullWidth
                        />
                        <EditDeleteBLock onEdit={() => {}} onDelete={() => {}} />
                    </FlexWrapper>
                ))}
            </ScheduleFilesWrapper>
        </ScheduleItemWrapper>
    );
};

export default ScheduleItem