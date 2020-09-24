/// <reference types="react" />
import { TableColumnProps } from '../../../types';
declare type TableBodyProps = {
    columns: TableColumnProps;
    columnKeys: string[];
    dataSource: Array<{}>;
    checkState: any;
    onCheckedChange: Function;
    isLoadingContent: boolean;
    useSkeletonLoader: boolean;
};
declare const _default: (props: TableBodyProps) => JSX.Element;
export default _default;
