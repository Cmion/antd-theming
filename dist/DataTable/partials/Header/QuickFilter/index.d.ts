/// <reference types="react" />
import './_styles.scss';
import { TableColumnProps } from '../../../types';
declare type QuickFilter = {
    columns: TableColumnProps;
    dataSource: Array<any>;
};
declare const _default: (props: QuickFilter) => JSX.Element;
export default _default;
