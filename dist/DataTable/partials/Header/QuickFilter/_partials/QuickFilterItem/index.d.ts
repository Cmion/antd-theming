import React from 'react';
import { QuickFilterProps, QuickFilterAction } from '../../reducer/reducer';
declare type QuickFilterItemProps = {
    dataSource: Array<any>;
    property: QuickFilterProps;
    dispatch: React.Dispatch<QuickFilterAction>;
};
declare const _default: (props: QuickFilterItemProps) => JSX.Element;
export default _default;
