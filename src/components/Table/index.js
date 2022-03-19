/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import styles from "./table.module.scss";

const Table = ({ type, headers, children, tableData, loading, sortRows }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(tableData);

        return () => {
            setData([]);
        };
    }, [tableData]);

    const table = (
        <table className={`${styles.table}`}>
            <TableHeader
                type={type}
                sortRows={sortRows}
                tableHeaders={headers}
            />
            <TableBody
                cols={headers.length}
                tableData={data}
                content={children}
            />
        </table>
    );

    return loading ? <div>Loading...</div> : table;
};

export default Table;
