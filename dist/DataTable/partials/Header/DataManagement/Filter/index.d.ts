import React from 'react';
import { TableColumnProps, TableFilterState, TableFilterAction } from '../../../../types';
declare type FilterProps = {
    columns: TableColumnProps;
    dataSource: Array<any>;
    dispatch: React.Dispatch<TableFilterAction>;
    state: TableFilterState;
};
declare const _default: (props: FilterProps) => JSX.Element;
export default _default;
