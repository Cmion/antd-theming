/// <reference types="react" />
declare type RenderFilterTypeProps = {
    type: string;
    property: any;
    handleAutoComplete: (value: string) => void;
    autoCompleteOptions: Array<{
        value: string;
    }> | undefined;
    handleFilterValueChange: (value: null | string | boolean | number | Date | undefined) => null;
};
declare const _default: (props: RenderFilterTypeProps) => JSX.Element | null;
export default _default;
