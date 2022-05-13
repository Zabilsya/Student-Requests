import React, {FC, useEffect, useState} from 'react';
import {
    NewsDetailButtons,
    NewsDetailDateTime,
    NewsDetailFiles,
    NewsDetailImage,
    NewsDetailText,
    NewsDetailWrapper
} from "./styles";
import PageHeader from "../../components/common/PageHeader";
import {useLocation} from "react-router-dom";
import {useAppSelector} from "../../hooks/redux";
import {ModalMode, RoutesList, UserTypes} from "../../const";
import browserHistory from "../../routes/history";
import {newsAPI} from "../../services/NewsService";
import Document from "../../components/common/Document";
import Link from "../../components/UI/Link";
import {red} from "../../const/styles";
import Moment from "react-moment";
import ModalWrapper from "../../components/common/ModalWrapper";
import NewsModal from "../../components/modals/NewsModal";
import {groupsAPI} from "../../services/GroupsService";
import {IChangeNews} from "../../store/reducers/News/Interfaces";

const NewsDetail: FC = () => {
    const location = useLocation()
    const [getDetailNews, {data: news, isSuccess, isError}] = newsAPI.useLazyGetDetailNewsQuery()
    const [deleteNews, {isSuccess: isSuccessDelete, isError: isErrorDelete}] = newsAPI.useDeleteNewsMutation()
    const [updateNews, {isSuccess: isSuccessUpdate, isError: isErrorUpdate}] = newsAPI.useUpdateNewsMutation()
    const {data: groups} = groupsAPI.useGetGroupsQuery()
    const { profile } = useAppSelector(state => state.authReducer)
    const [isOpenModal, setIsOpenModal] = useState(false)

    const openModal = () => setIsOpenModal(true)
    const closeModal = () => setIsOpenModal(false)

    useEffect(() => {
        const id = location.pathname.split(RoutesList.News + '/')[1]
        getDetailNews(id)
    }, [])

    useEffect(() => {
        if (isError) {
            browserHistory.push(RoutesList.News)
        }
    }, [isError])

    useEffect(() => {
        if (isSuccessDelete) {
            browserHistory.push(RoutesList.News)
        }
    }, [isSuccessDelete])

    useEffect(() => {
        if (isSuccessUpdate) {
            closeModal()
        }
    }, [isSuccessUpdate])


    const changeNews = (data: IChangeNews) => {
        const formData = new FormData()
        formData.append('id', String(data.id))
        formData.append('title', data.title)
        formData.append('text', data.text)
        formData.append('is_groups_change', String(data.isGroupsChange))
        data.groups.forEach(group => formData.append('groups_id', String(group.value)))
        if (!data.image) {
            formData.append('is_delete_image', 'true')
        } else if (data.image.file) {
            formData.append('image', data.image.file as Blob)
        }
        if (data.deletedFiles.length > 0) {
            formData.append('deleted_files', JSON.stringify(data.deletedFiles))
        }
        data.files.forEach(file => formData.append('docs', file as Blob))
        updateNews(formData)
    }

    const confirmDeleteNews = () => {
        if (window.confirm('Вы действительно хотите удалить новость?') && news) {
            deleteNews(news.id)
        }
    }

    return (
        <>
            {isSuccess && news &&
                <NewsDetailWrapper>
                    <PageHeader title={news.title}>
                            <NewsDetailDateTime>
                                <Moment locale="ru" format="LLL">
                                    {news.updatedAt}
                                </Moment>
                            </NewsDetailDateTime>
                    </PageHeader>

                    <NewsDetailText>{news.text}</NewsDetailText>
                    {news.files.length > 0 &&
                        <NewsDetailFiles>
                            {news.files.map(file => (
                                <Document
                                    file_path={process.env.REACT_APP_API_URL + '/' + file.file_path}
                                    file_name={file.file_name}
                                    key={file.id}
                                />
                            ))}
                        </NewsDetailFiles>
                    }
                    {news.image &&
                        <NewsDetailImage src={process.env.REACT_APP_API_URL + '/' + news.image} alt={news.title} />
                    }
                    {profile && profile.user_type !== UserTypes.Student && groups && groups.length > 0 &&
                        <NewsDetailButtons>
                            <Link onClick={openModal}>Изменить</Link>
                            <Link color={red} onClick={confirmDeleteNews}>Удалить</Link>
                        </NewsDetailButtons>
                    }

                    {groups && groups.length > 0 && isOpenModal &&
                        <ModalWrapper title="Редактирование новости" onClose={closeModal}>
                            <NewsModal
                                initialData={news}
                                groups={groups}
                                onSubmit={changeNews}
                                onClose={closeModal}
                            />
                        </ModalWrapper>
                    }

                </NewsDetailWrapper>
            }

        </>
    );
};

export default NewsDetail