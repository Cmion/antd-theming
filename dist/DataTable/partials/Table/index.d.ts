import React from 'react';
import { TableColumnProps, ColumnProps } from '../../types';
declare type TableProps = {
    columnKeys: string[];
    columns: TableColumnProps;
    setColumns: React.Dispatch<React.SetStateAction<TableColumnProps>>;
    maxColumns: number;
    minColumns: number;
    defaultColumns: Array<ColumnProps>;
    dataSource: Array<any>;
    checkState: {
        checkedList: Array<any>;
        indeterminate: boolean;
        checkAll: boolean;
    };
    onCheckAllChange: (e: any) => void;
    onCheckedChange: (checkedList: Array<any>) => void;
    tablePages: {
        all: number;
        currentPage: number;
    };
    handlePagination: (page: number) => void;
    isLoadingContent: boolean;
    useSkeletonLoader: boolean;
};
declare const _default: (props: TableProps) => JSX.Element;
export default _default;
