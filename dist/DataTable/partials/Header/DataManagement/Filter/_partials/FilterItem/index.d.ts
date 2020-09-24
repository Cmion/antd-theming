import React from 'react';
import { TableColumnProps, TableFilterAction } from '../../../../../../types';
declare type FilterItemProps = {
    columns: TableColumnProps;
    filterData: any;
    logicType: string;
    isLastIndex: boolean;
    isMoreThanOne: boolean;
    isFirstIndex: boolean;
    dataSource: any;
    dispatch: React.Dispatch<TableFilterAction>;
    dimension: {
        height: number;
        width: number;
    };
};
declare const _default: (props: FilterItemProps) => JSX.Element;
export default _default;
