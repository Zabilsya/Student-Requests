import React, {FC, useEffect, useState} from 'react';
import {newsAPI} from "../../services/NewsService";
import {usePagination} from "../../hooks/usePagination";
import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/UI/Button";
import {PaginationStyled} from "../../components/styled/pagination";
import NewsCard from "../../components/common/NewsCard";
import StackGrid from "react-stack-grid";
import ModalWrapper from "../../components/common/ModalWrapper";
import NewsModal from "../../components/modals/NewsModal";
import {ModalMode, UserTypes} from "../../const";
import {groupsAPI} from "../../services/GroupsService";
import {useAppSelector} from "../../hooks/redux";
import {IChangeNews} from "../../store/reducers/News/Interfaces";

const News: FC = () => {
    const {currentPage, changePage} = usePagination()
    const {data} = newsAPI.useGetNewsQuery(currentPage)
    const [createNews, {isSuccess: isSuccessCreated, isError: isCreatedError}] = newsAPI.useCreateNewsMutation()
    const { profile } = useAppSelector(state => state.authReducer)
    const {data: groups} = groupsAPI.useGetGroupsQuery()
    const [isOpenModal, setIsOpenModal] = useState(false)

    useEffect(() => {
        if (isSuccessCreated) {
            closeModal()
        }
    }, [isSuccessCreated])


    const openModal = () => setIsOpenModal(true)
    const closeModal = () => setIsOpenModal(false)

    const saveNews = (data: IChangeNews) => {
        const formData = new FormData()
        formData.append('title', data.title)
        formData.append('text', data.text)
        if (data.image) {
            formData.append('image', data.image.file as Blob)
        }
        data.groups.forEach(group => formData.append('groups_id', String(group.value)))
        data.files.forEach(file => formData.append('docs', file))
        createNews(formData)
    }


    return (
        <>
            <PageHeader title="Лента новостей" type="separated">
                {profile && profile.user_type !== UserTypes.Student &&
                    <Button type="button" variant="small" onClick={openModal}>Создать новость</Button>
                }
            </PageHeader>

            {data && data.rows.length > 0 &&
                <>
                    <StackGrid columnWidth="50%" gutterWidth={30} gutterHeight={30}>
                        {data.rows.map(news => (
                            <NewsCard {...news} key={news.id} />
                        ))}
                    </StackGrid>

                    {data.totalPages > 1 &&
                        <PaginationStyled
                            breakLabel="..."
                            nextLabel=">"
                            onPageChange={(event) => changePage(event.selected + 1)}
                            pageRangeDisplayed={5}
                            pageCount={data.totalPages}
                            previousLabel="<"
                            renderOnZeroPageCount={() => {}}
                        />
                    }
                </>
            }

            {groups && groups.length > 0 && isOpenModal &&
                <ModalWrapper title="Создание новости" onClose={closeModal}>
                    <NewsModal
                        groups={groups}
                        onSubmit={saveNews}
                        onClose={closeModal}
                    />
                </ModalWrapper>
            }
        </>
    );
};

export default News