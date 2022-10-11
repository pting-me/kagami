import {
  HtmlElementTag,
  SvgElementTag,
  htmlElementTagNameMap,
  svgElementTagNameMap,
} from '..';

export const isHtmlTag = (s: string): s is HtmlElementTag => {
  return Object.keys(htmlElementTagNameMap).includes(s);
};

export const isSvgTag = (s: string): s is SvgElementTag => {
  return Object.keys(svgElementTagNameMap).includes(s);
};
