import { useState, useMemo } from "react";

import type { List } from "@shared/typedef";


type Params = {
    data: Array<List>;
};

export const usePagination = ({data}: Params) => {
    const [page, setPage] = useState(1);

    const onChangePage = (_: React.ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage);
    }

    const newData = useMemo(() => {
        const newPage = Math.ceil(data.length / 10);

        if (newPage < page) {
            setPage(newPage || 1);
        }

        if (data.length <= 10) {
            return data;
        }

        const start = (page - 1) * 10;
        const end = page * 10;

        return data.slice(start, end);
    }, [data, page]);

    return {
        onChangePage,
        data: newData,
        page
    }
}