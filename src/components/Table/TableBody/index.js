import styles from "../table.module.scss";

const TableBody = ({ tableData, content, cols }) => (
    <tbody className="table__body">
        {!tableData.length && (
            <tr className={styles.table__row}>
                <td className="" colSpan={cols}>
                    <div className="flex flex__center mt-3">
                        Nothing to show
                    </div>
                </td>
            </tr>
        )}
        {tableData.map((row, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <tr className={styles.table__row} key={index}>
                <>{content(row)}</>
            </tr>
        ))}
    </tbody>
);

TableBody.defaultProps = {
    placeHolderImg: null,
};

export default TableBody;
