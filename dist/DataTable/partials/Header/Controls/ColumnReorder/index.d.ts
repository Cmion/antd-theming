import React from 'react';
import './_style.scss';
import { ColumnProps, TableColumnProps } from '../../../../types';
declare type ColumnReorderProps = {
    setColumns: React.Dispatch<React.SetStateAction<TableColumnProps>>;
    columns: TableColumnProps;
    maxColumns: number;
    minColumns: number;
    defaultColumns: Array<ColumnProps>;
};
declare const _default: (props: ColumnReorderProps) => JSX.Element;
export default _default;
