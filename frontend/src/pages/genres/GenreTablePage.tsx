import { useFetch } from "hooks/useFetch";

import { IResponseBody } from 'ext/shared/services/backend/routes/authors/GetRouteDescription';

import { Table } from "components/UI/table/Table";
import { Loader } from 'components/UI/loader/Loader';

export const GenreTablePage = () => {
    const columns = [
        {
            header: "Name",
            accessor: 'name',
        },
        {
            header: "Books Count",
            accessor: 'booksCount',
        },
    ];
    const { data, error } = useFetch<IResponseBody>(`/genres`);

    if (error) {
        return <p>{error.message}</p>
    }
    return (
        <div className="p-4">
            {!data ? 
                <Loader />
            :
            <Table
                columns={columns}
                data={data.rows as unknown as Record<string, unknown>[]}
            />
            }
        </div>
    );
};