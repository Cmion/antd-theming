import React from 'react';
import { TableColumnProps } from '../../types';
declare type HeaderProps = {
    columns: TableColumnProps;
    dataSource: Array<any>;
    renderOrder: {
        pageRenderOrder: number;
        setPageRenderOrder: React.Dispatch<React.SetStateAction<number>> | null;
    };
};
declare const _default: (props: HeaderProps) => JSX.Element;
export default _default;
