/// <reference types="react" />
import 'remixicon/fonts/remixicon.css';
import './styles/override.scss';
import './styles/styles.scss';
import { ColumnProps } from './types';
interface DataTableProps {
    columns: ColumnProps[];
    dataSource: Array<any>;
    minColumns?: number;
    maxColumns?: number;
    useSkeletonLoader?: boolean;
    isLoadingContent?: boolean;
    pageRenderOrder?: number;
    onRenderOrderChange?: (renderOrder: number) => void;
    onPaginationChange: (page: number) => void;
    pagination: {
        all: number;
        currentPage: number;
    };
}
declare const DataTable: (props: DataTableProps) => JSX.Element;
export { DataTable };
