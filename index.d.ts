// Type definitions for postcss-include-media 1.0
// TypeScript Version: 2.2

import { PluginCreator } from 'postcss';

declare namespace includemedia {
    interface IncludeMediaOptions {
        breakpoints?: Record<key, string>;
        mediaExpressions?: Record<key, string>;
        unitIntervals?: Record<key, number>;
    }

    type IncludeMedia = PluginCreator<IncludeMediaOptions>;
}

declare const includemedia: includemedia.IncludeMedia;
export = includemedia;
