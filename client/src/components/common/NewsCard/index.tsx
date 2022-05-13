import React, {FC} from 'react';
import {INews} from "../../../store/reducers/News/Interfaces";
import {NewsCardBottom, NewsCardImage, NewsCardMore, NewsCardText, NewsCardTop, NewsCardWrapper} from "./styles";
import {SubTitle} from "../../styled/title";
import Moment from "react-moment";
import {RoutesList} from "../../../const";

const NewsCard: FC<INews> = ({id, title, text, image, updatedAt}) => {
    return (
        <NewsCardWrapper to={RoutesList.News + `/${id}`}>
            <NewsCardTop>
                <SubTitle>{title}</SubTitle>
                <NewsCardText>{text}</NewsCardText>
                <NewsCardMore>Подробнее</NewsCardMore>
            </NewsCardTop>

            {image &&
                <NewsCardImage src={process.env.REACT_APP_API_URL + '/' + image} alt={title} />
            }

            <NewsCardBottom>
                <Moment format="LLL" locale="ru">
                    {updatedAt}
                </Moment>
            </NewsCardBottom>

        </NewsCardWrapper>
    );
};

export default NewsCard