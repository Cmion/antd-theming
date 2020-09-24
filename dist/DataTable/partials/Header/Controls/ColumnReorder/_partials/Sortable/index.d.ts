import React from 'react';
import { TableColumnProps } from '../../../../../../types';
declare type Sortable = {
    setColumns: React.Dispatch<React.SetStateAction<TableColumnProps>>;
    columns: TableColumnProps;
    maxColumns: number;
    minColumns: number;
};
declare const _default: (props: Sortable) => JSX.Element;
export default _default;
