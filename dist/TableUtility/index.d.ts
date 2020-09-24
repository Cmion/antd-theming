import React from 'react';
declare type AlignProps = {
    /** React Elements */
    children: React.ReactNode;
    /** Flex Direction property 'column' | 'row' */
    type?: 'column' | 'row';
    alignCenter?: boolean;
    alignStart?: boolean;
    alignEnd?: boolean;
    justifyCenter?: boolean;
    justifyBetween?: boolean;
    justifyEvenly?: boolean;
    justifyStart?: boolean;
    justifyEnd?: boolean;
    justifyAround?: boolean;
    style?: React.CSSProperties;
    className?: string;
    id?: string;
};
/**
 * JSX wrapper for CSS's alignment style
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
declare const Align: (props: AlignProps) => JSX.Element;
declare type PaddingProps = {
    left?: number;
    right?: number;
    bottom?: number;
    top?: number;
    style?: React.CSSProperties;
    children: React.ReactNode;
    className?: string;
    vertical?: number;
    horizontal?: number;
};
/**
 * JSX wrapper for CSS's Padding styles
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
declare const Padding: (props: PaddingProps) => JSX.Element;
declare type MarginProps = {
    left?: number;
    right?: number;
    bottom?: number;
    top?: number;
    style?: React.CSSProperties;
    children: React.ReactNode;
    className?: string;
    vertical?: number;
    horizontal?: number;
};
/**
 * JSX wrapper for CSS's Margin
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
declare const Margin: (props: MarginProps) => JSX.Element;
declare type PositionProps = {
    left?: number;
    right?: number;
    bottom?: number;
    top?: number;
    style?: React.CSSProperties;
    children: React.ReactNode;
    className?: string;
    /** CSS postion attribute */
    type?: 'relative' | 'absolute' | 'fixed' | 'sticky' | 'static';
};
/**
 * JSX wrapper for CSS position property
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
declare const Position: (props: PositionProps) => JSX.Element;
export type { AlignProps, PositionProps, PaddingProps, MarginProps };
export { Align, Padding, Position, Margin };
