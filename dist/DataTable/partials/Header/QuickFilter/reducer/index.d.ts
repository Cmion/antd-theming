import { QuickFilterState, QuickFilterAction } from './reducer';
import { ColumnProps } from '../../../../types';
declare const initialState: {
    filters: {
        filterIndex: number;
        property: string;
        value: string[];
    }[];
};
declare const initQuickFilterState: (columns: ColumnProps[]) => {
    filters: {
        filterIndex: number;
        property: string;
        value: null;
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
};
declare const quickFilterReducer: (state: QuickFilterState, action: QuickFilterAction) => QuickFilterState;
export { quickFilterReducer, initialState, initQuickFilterState };
