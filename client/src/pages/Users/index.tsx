import React, {useState} from 'react';
import {usePagination} from "../../hooks/usePagination";
import {PaginationStyled} from "../../components/styled/pagination";
import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/UI/Button";
import UsersTable from "../../components/common/UsersTable";
import {usersAPI} from "../../services/UsersService";
import UsersFilterPanel from "../../components/common/UsersFilterPanel";
import {userTypesForFilter} from "../../const";

const Users = () => {
    const {currentPage, changePage} = usePagination()
    const [userTypeFilter, setUserTypeFilter] = useState(userTypesForFilter[1].value)
    const {data} = usersAPI.useGetUsersQuery({page: currentPage, user_type: userTypeFilter})

    const changeFilter = (userType: number) => {
        setUserTypeFilter(userType)
    }

    return (
        <>
            <PageHeader title="Список пользователей" type="separated">
                <Button type="button" variant="small">Добавить</Button>
            </PageHeader>

            <UsersFilterPanel onChangeFilter={changeFilter} />

            {data && data.rows.length &&
                <>
                    <UsersTable users={data.rows} />
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
        </>
    );
};

export default Users