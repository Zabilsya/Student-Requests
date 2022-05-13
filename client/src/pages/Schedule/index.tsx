import React, {useEffect, useState} from 'react';
import {MarginWrapper, PageWrapper} from "../../components/styled/wrappers";
import PageHeader from "../../components/common/PageHeader";
import {scheduleAPI} from "../../services/ScheduleService";
import ScheduleItem from "../../components/common/ScheduleItem";
import {ScheduleList} from "./styles";
import Button from '../../components/UI/Button'
import ScheduleModal from "../../components/modals/ScheduleModal";
import ModalWrapper from "../../components/common/ModalWrapper";
import {IChangeSchedule, ISchedule} from "../../store/reducers/Schedule/Models";
import {ModalMode} from "../../const";

const Schedule = () => {
    const {data, isLoading} = scheduleAPI.useGetScheduleQuery()
    const [createSchedule, {isSuccess: isSuccessCreate}] = scheduleAPI.useCreateScheduleMutation()
    const [deleteSchedule, {isSuccess: isSuccessDelete}] = scheduleAPI.useDeleteScheduleMutation()
    const [updateSchedule, {isSuccess: isSuccessUpdate}] = scheduleAPI.useUpdateScheduleMutation()
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [scheduleForModal, setScheduleForModal] = useState<ISchedule | null>(null)

    const openModal = () => setIsOpenModal(true)

    const closeModal = () => {
        setIsOpenModal(false)
        setScheduleForModal(null)
    }

    const changeSchedule = (data: IChangeSchedule, type: ModalMode) => {
        const formData = new FormData()
        formData.append('title', data.title)
        data.files.forEach(file => formData.append('docs', file as Blob))
        if (type === ModalMode.Create) {
            createSchedule(formData)
        } else {
            formData.append('id', String(data.id))
            if (data.deletedFiles.length > 0) {
                formData.append('deleted_files', JSON.stringify(data.deletedFiles))
            }
            updateSchedule(formData)
        }
    }

    const editSchedule = (data: ISchedule) => {
        openModal()
        setScheduleForModal(data)
    }

    const removeSchedule = (id: number) => {
        if (window.confirm('Вы действительно хотите удалить расписание?')) {
            deleteSchedule(id)
        }
    }

    useEffect(() => {
        if (isSuccessCreate || isSuccessUpdate) {
            closeModal()
        }
    }, [isSuccessCreate, isSuccessUpdate])

    return (
        <PageWrapper>
            <MarginWrapper bottom="30px">
                <PageHeader title="Расписание занятий">
                    <Button type="button" variant="small" onClick={openModal}>Добавить расписание</Button>
                </PageHeader>
            </MarginWrapper>
            <ScheduleList>
                {data && data.map(schedule => (
                    <ScheduleItem
                        schedule={schedule}
                        onDelete={removeSchedule}
                        onEdit={editSchedule}
                        key={schedule.id}
                    />
                ))}
            </ScheduleList>

            {isOpenModal &&
                <ModalWrapper
                    title={scheduleForModal ? "Редактирование расписания" : "Добавление расписания" }
                    onClose={closeModal}
                >
                    <ScheduleModal
                        initialData={scheduleForModal}
                        onSubmit={changeSchedule}
                        onClose={closeModal}
                    />
                </ModalWrapper>
            }

        </PageWrapper>
    );
};

export default Schedule