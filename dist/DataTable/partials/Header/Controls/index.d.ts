/// <reference types="react" />
declare const _default: {
    ColumnDensity: () => JSX.Element;
    ColumnReorder: (props: {
        setColumns: import("react").Dispatch<import("react").SetStateAction<import("../../../types").TableColumnProps>>;
        columns: import("../../../types").TableColumnProps;
        maxColumns: number;
        minColumns: number;
        defaultColumns: import("../../../types").ColumnProps[];
    }) => JSX.Element;
    RenderOrder: (props: {
        renderOrder: number;
        setRenderOrder: import("react").Dispatch<import("react").SetStateAction<number>>;
    }) => JSX.Element;
    ControlActions: () => JSX.Element;
};
export default _default;
