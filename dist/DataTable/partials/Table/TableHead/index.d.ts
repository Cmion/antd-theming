import React from 'react';
import { TableColumnProps, ColumnProps } from '../../../types';
declare type TableHeadProps = {
    columns: TableColumnProps;
    columnKeys: string[];
    checkState: any;
    onCheckAllChange: ((e: any) => void) | undefined;
    setColumns: React.Dispatch<React.SetStateAction<TableColumnProps>>;
    maxColumns: number;
    minColumns: number;
    defaultColumns: ColumnProps[];
};
declare const _default: (props: TableHeadProps) => JSX.Element;
export default _default;
