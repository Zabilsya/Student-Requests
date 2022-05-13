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
import {IChangeTemplate, IRequestTemplate} from "../../store/reducers/RequestTemplates/Models";

const RequestTemplates = () => {
    const {currentPage, changePage} = usePagination()
    const {data: templates} = requestTemplatesAPI.useGetTemplatesQuery(currentPage)
    const [createTemplate, {isSuccess: isSuccessCreate}] = requestTemplatesAPI.useCreateTemplateMutation()
    const [deleteTemplate, {isSuccess: isSuccessDelete}] = requestTemplatesAPI.useDeleteTemplateMutation()
    const [updateTemplate, {isSuccess: isSuccessUpdate}] = requestTemplatesAPI.useUpdateTemplateMutation()
    const {data: workers} = usersAPI.useGetWorkersQuery()
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [templateForModal, setTemplateForModal] = useState<IRequestTemplate | null>(null)

    const openModal = () => {
        setIsOpenModal(true)
    }

    const closeModal = () => {
        setIsOpenModal(false)
        setTemplateForModal(null)
    }

    const changeTemplate = (data: IChangeTemplate, type: ModalMode) => {
        if (type === ModalMode.Create) {
            createTemplate(data)
        } else {
            updateTemplate(data)
        }
    }

    const removeTemplate = (id: number) => {
        if (window.confirm('Вы действительно хотите удалить шаблон обращения?')) {
            deleteTemplate(id)
        }
    }

    const editTemplate = (template: IRequestTemplate) => {
        openModal()
        setTemplateForModal(template)
    }

    useEffect(() => {
        if (isSuccessCreate || isSuccessUpdate) {
            closeModal()
        }
    }, [isSuccessCreate, isSuccessUpdate])

    useEffect(() => {
        if (templates && templates.page > templates.totalPages) {
            changePage(currentPage - 1)
        }
    }, [templates])

    return (
        <>
            <PageHeader title="Управление обращениями" type="separated">
                {workers && workers.length > 0 &&
                    <Button type="button" variant="small" onClick={openModal}>Добавить</Button>
                }
            </PageHeader>

            {templates &&
                <>
                    <RequestTemplatesTable
                        templates={templates.rows}
                        onDelete={removeTemplate}
                        onEdit={editTemplate}
                    />
                    {templates.totalPages > 1 &&
                        <PaginationStyled
                            breakLabel="..."
                            nextLabel=">"
                            onPageChange={(event) => changePage(event.selected + 1)}
                            pageRangeDisplayed={5}
                            pageCount={templates.totalPages}
                            previousLabel="<"
                            renderOnZeroPageCount={() => {}}
                            forcePage={currentPage - 1}
                        />
                    }
                    {workers && isOpenModal &&
                        <ModalWrapper
                            title={templateForModal ? "Редактирование шаблона обращения" : "Добавление шаблона обращения" }
                            onClose={closeModal}
                        >
                            <RequestTemplatesModal
                                initialData={templateForModal}
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