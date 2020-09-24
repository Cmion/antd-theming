import { ColumnProps, TableFilterAction, TableFilterState } from '../../../../types';
declare const initDataManagementState: (columns: ColumnProps[]) => {
    filters: {
        filterIndex: number;
        filterProps: {
            property: null;
            type: null;
            value: null;
        };
        title: string;
        dataIndex: string;
        key: string;
        type: import("../../../../types").ColumnType;
        autoComplete?: boolean | undefined;
        multiple?: boolean | undefined;
        bold?: boolean | undefined;
        presentationType?: "tag" | undefined;
        presentationColor?: "magenta" | "volcano" | "orange" | "gold" | "geekblue" | "red" | "lime" | "green" | "cyan" | "processing" | "blue" | "purple" | "default" | undefined;
        actionPresentationType?: "text" | "default" | "primary" | "link" | "ghost" | "dashed" | undefined;
        listMenu?: {
            label: string;
            value: string | number;
        }[] | undefined;
        actionCallback?: ((source: any) => void) | undefined;
        actionTitle?: string | undefined;
        dateFormat?: string | undefined;
    }[];
    sorts: never[];
    search: {
        where: string;
        what: string;
    };
};
declare const dataManagementReducer: (state: TableFilterState, action: TableFilterAction) => TableFilterState;
export { dataManagementReducer, initDataManagementState };
