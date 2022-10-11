import {
  htmlElementTagNameMap,
  svgElementTagNameMap,
} from '../const/tagNameMap';

export type HtmlElementTag = keyof typeof htmlElementTagNameMap;
export type HtmlElementType = typeof htmlElementTagNameMap[HtmlElementTag];

export type SvgElementTag = keyof typeof svgElementTagNameMap;
export type SvgElementType = typeof svgElementTagNameMap[SvgElementTag];
