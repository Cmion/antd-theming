import React from 'react';
declare type RenderFilterTypeProps = {
    type: string;
    filterType: string | null;
    property: any;
    dimension: {
        height: number;
        width: number;
    };
    handleAutoComplete: (value: string) => void;
    suffix: React.FunctionComponent;
    autoCompleteOptions: Array<{
        value: string;
    }> | undefined;
    currentData: any;
    handleFilterValueChange: (value: number | string | Date | undefined, valueType?: string | undefined, rangePosition?: string | undefined) => null;
};
declare const _default: (props: RenderFilterTypeProps) => JSX.Element | null;
export default _default;
