import React from 'react';
import { TableColumnProps } from '../../../types';
declare type DataManagementProps = {
    visible: boolean;
    handleCancel: ((e: React.MouseEvent<HTMLElement, MouseEvent>) => void) | undefined;
    columns: TableColumnProps;
    dataSource: any;
};
declare const _default: (props: DataManagementProps) => JSX.Element;
export default _default;
