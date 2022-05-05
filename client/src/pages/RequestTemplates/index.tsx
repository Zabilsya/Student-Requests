import React, {useEffect, useState} from 'react';
import RequestTemplatesModal from '../../components/modals/RequestTemplatesModal'
import {requestTemplatesAPI} from "../../services/RequestTemplatesService";
import {usePagination} from "../../hooks/usePagination";
import {PaginationStyled} from "../../components/styled/pagination";
import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/UI/Button";
import {ModalMode} from "../../const";
import ModalWrapper from "../../components/common/ModalWrapper";
import RequestTemplatesTable from "../../components/common/RequestTemplatesTable";
import {usersAPI} from "../../services/UsersService";
import {ICreateTemplate} from "../../store/reducers/RequestTemplates/Models";

const RequestTemplates = () => {
    const {currentPage, changePage} = usePagination()
    const {data: templates} = requestTemplatesAPI.useGetTemplatesQuery(currentPage)
    const [createTemplate, {isSuccess: isSuccessCreated, error}] = requestTemplatesAPI.useCreateTemplateMutation()
    const {data: workers} = usersAPI.useGetWorkersQuery()
    const [isOpenModal, setIsOpenModal] = useState(false)

    const openModal = () => {
        setIsOpenModal(true)
    }

    const closeModal = () => {
        setIsOpenModal(false)
    }

    const changeTemplate = (data: ICreateTemplate) => {
        createTemplate(data)
    }

    useEffect(() => {
        if (isSuccessCreated) {
            closeModal()
        }
    }, [isSuccessCreated])

    return (
        <>
            <PageHeader title="Управление запросами" type="separated">
                {workers && workers.length > 0 &&
                    <Button type="button" variant="small" onClick={openModal}>Добавить</Button>
                }
            </PageHeader>

            {templates &&
                <>
                    <RequestTemplatesTable templates={templates.rows} />
                    {templates.totalPages > 1 &&
                        <PaginationStyled
                            breakLabel="..."
                            nextLabel=">"
                            onPageChange={(event) => changePage(event.selected + 1)}
                            pageRangeDisplayed={5}
                            pageCount={templates.totalPages}
                            previousLabel="<"
                            renderOnZeroPageCount={() => {}}
                        />
                    }
                    {workers && isOpenModal &&
                        <ModalWrapper title="Добавление типа запроса" onClose={closeModal}>
                            <RequestTemplatesModal
                                mode={ModalMode.Create}
                                workers={workers}
                                onSubmit={changeTemplate}
                                onClose={closeModal}
                            />
                        </ModalWrapper>
                    }
                </>
            }
        </>
    );
};

export default RequestTemplates