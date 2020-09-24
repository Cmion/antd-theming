/// <reference types="react" />
import { ColumnProps } from '../../../types';
declare type TableCellProps = {
    checked: boolean;
    /** DataSource item. */
    source: any;
    onCheckedChange: Function;
    checkState: any;
    columnKeys: string[];
    extraColumnsLength: number;
    /** columns.selected */
    columns: ColumnProps[];
    index?: number;
};
declare const _default: (props: TableCellProps) => JSX.Element;
export default _default;
