import React, {FC, useEffect, useState} from 'react';
import Button from "../../components/UI/Button";
import PageHeader from "../../components/common/PageHeader";
import RequestsFilterPanel from "../../components/common/RequestsFilterPanel";
import {usePagination} from "../../hooks/usePagination";
import {defaultRequestTemplateForFilter, ModalMode, requestStatusesForFilter} from "../../const";
import {requestsAPI} from "../../services/RequestsService";
import {RequestCardsWrapper} from "./styles";
import RequestCard from "../../components/common/RequestCard";
import {PaginationStyled} from "../../components/styled/pagination";
import ModalWrapper from "../../components/common/ModalWrapper";
import {requestTemplatesAPI} from "../../services/RequestTemplatesService";
import RequestsModal from "../../components/modals/RequestsModal";
import {ICreateRequest} from "../../store/reducers/Requests/Interfaces";
import {useAppSelector} from "../../hooks/redux";

const Requests: FC = () => {
    const [isOpenModal, setIsOpenModal] = useState(false)
    const {currentPage, changePage} = usePagination()
    const [filter, setFilter] = useState({
        status_id: requestStatusesForFilter[0].value,
        template_id: defaultRequestTemplateForFilter.value
    })
    const { data: requests } = requestsAPI.useGetRequestsQuery({page: currentPage, ...filter})
    const [createRequest, {isSuccess}] = requestsAPI.useCreateRequestMutation()
    const { data: templates } = requestTemplatesAPI.useGetAllTemplatesQuery()

    const { profile } = useAppSelector(state => state.authReducer)
    const openModal = () => setIsOpenModal(true)
    const closeModal = () => setIsOpenModal(false)

    const changeStatusFilter = (statusId: number) => {
        setFilter({...filter, status_id: statusId})
        changePage(1)
    }

    const changeTemplateFilter = (templateId: number) => {
        setFilter({...filter, template_id: templateId})
        changePage(1)
    }

    const saveRequest = (data: ICreateRequest) => {
        const formData = new FormData()
        formData.append('template_id', String(data.template_id))
        data.files.forEach(file => {
            formData.append('files', file)
        })
        createRequest(formData)
    }

    useEffect(() => {
        closeModal()
    }, [isSuccess])

    return (
        <>
            <PageHeader title="Обращения" type="separated">
                {templates && templates.length > 0 &&
                    <Button type="button" variant="small" onClick={openModal}>Создать</Button>
                }
            </PageHeader>

            <RequestsFilterPanel onChangeStatus={changeStatusFilter} onChangeTemplate={changeTemplateFilter} />

            {profile && requests && requests.rows.length > 0 &&
                <RequestCardsWrapper>
                    {requests.rows.map(request => (
                        <RequestCard userType={profile.user_type} {...request} />
                    ))}
                </RequestCardsWrapper>
            }

            {requests && requests.totalPages > 1 &&
                <PaginationStyled
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={(event) => changePage(event.selected + 1)}
                    pageRangeDisplayed={5}
                    pageCount={requests.totalPages}
                    previousLabel="<"
                    renderOnZeroPageCount={() => {}}
                />
            }

            {templates && templates.length > 0 && isOpenModal &&
                <ModalWrapper title="Создание обращения" onClose={closeModal}>
                    <RequestsModal
                        templates={templates}
                        onSubmit={saveRequest}
                        onClose={closeModal}
                    />
                </ModalWrapper>
            }
        </>
    );
};

export default Requests