// Type definitions for postcss-include-media 1.0
// TypeScript Version: 4.0

export type BreakpointType = Record<string, string>;

export type MediaExpressionType = Record<string, string>;

export type UnitIntervalType = Record<string, number>;

declare enum Operators {}

export type OperatorsType = '>=' | '>' | '<=' | '<' | '≥' | '≤' | string;

export interface IncludeMediaOptions {
    breakpoints?: BreakpointType;
    mediaExpressions?: MediaExpressionType;
    unitIntervals?: UnitIntervalType;
}

import { PluginCreator } from 'postcss';

declare namespace includemedia {
    type IncludeMedia = PluginCreator<IncludeMediaOptions>;
}

declare const includemedia: includemedia.IncludeMedia;
export default includemedia;
