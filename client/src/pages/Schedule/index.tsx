import React, {useState} from 'react';
import {PageWrapper} from "../../components/styled/wrappers";
import PageHeader from "../../components/common/PageHeader";
import {scheduleAPI} from "../../services/ScheduleService";
import ScheduleItem from "../../components/common/ScheduleItem";
import {ScheduleList} from "./styles";
import Button from '../../components/UI/Button'
import ScheduleModal from "../../components/modals/ScheduleModal";
import {ModalMode} from "../../const";
import ModalWrapper from "../../components/common/ModalWrapper";

const Schedule = () => {
    const {data, isLoading} = scheduleAPI.useGetScheduleQuery()
    const [isOpenModal, setIsOpenModal] = useState(false)

    const addSchedule = () => {
        setIsOpenModal(true)
    }

    const closeModal = () => {
        setIsOpenModal(false)
    }

    return (
        <PageWrapper>
            <PageHeader title="Расписание занятий">
                <Button type="button" variant="small" onClick={addSchedule}>Добавить расписание</Button>
            </PageHeader>
            <ScheduleList>
                {data && data.map(schedule => (
                    <ScheduleItem {...schedule} key={schedule.id} />
                ))}
            </ScheduleList>

            {isOpenModal &&
                <ModalWrapper title="Добавление расписания" onClose={closeModal}>
                    <ScheduleModal mode={ModalMode.Create} />
                </ModalWrapper>
            }

        </PageWrapper>
    );
};

export default Schedule