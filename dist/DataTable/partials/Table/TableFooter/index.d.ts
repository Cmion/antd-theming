/// <reference types="react" />
declare type TableFooterProps = {
    currentPage: number;
    handlePagination: (page: number) => void;
    total: number;
    isLoadingContent: boolean;
    isAnEmptyContent: boolean;
};
declare const _default: (props: TableFooterProps) => JSX.Element | null;
export default _default;
