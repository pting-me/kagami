import { Token } from '../types';

const tokens: Token[] = [
  { key: '--figma-color-bg', value: '#2c2c2c' },
  { key: '--figma-color-bg-brand', value: '#0c8ce9' },
  { key: '--figma-color-bg-brand-hover', value: '#0a6dc2' },
  { key: '--figma-color-bg-brand-pressed', value: '#0a6dc2' },
  { key: '--figma-color-bg-brand-secondary', value: '#105cad' },
  { key: '--figma-color-bg-brand-tertiary', value: '#394360' },
  { key: '--figma-color-bg-component', value: '#8a38f5' },
  { key: '--figma-color-bg-component-hover', value: '#7a2ed6' },
  { key: '--figma-color-bg-component-pressed', value: '#7a2ed6' },
  { key: '--figma-color-bg-component-secondary', value: '#652ca8' },
  { key: '--figma-color-bg-component-tertiary', value: '#473956' },
  { key: '--figma-color-bg-danger', value: '#e03e1a' },
  { key: '--figma-color-bg-danger-hover', value: '#c4381c' },
  { key: '--figma-color-bg-danger-pressed', value: '#c4381c' },
  { key: '--figma-color-bg-danger-secondary', value: '#963323' },
  { key: '--figma-color-bg-danger-tertiary', value: '#7c2622' },
  { key: '--figma-color-bg-disabled', value: '#757575' },
  { key: '--figma-color-bg-disabled-secondary', value: '#b3b3b3' },
  { key: '--figma-color-bg-hover', value: '#383838' },
  { key: '--figma-color-bg-inverse', value: 'rgba(255, 255, 255, 1)' },
  { key: '--figma-color-bg-onselected', value: '#667799' },
  { key: '--figma-color-bg-onselected-hover', value: '#667799' },
  { key: '--figma-color-bg-onselected-pressed', value: '#667799' },
  { key: '--figma-color-bg-pressed', value: '#383838' },
  { key: '--figma-color-bg-secondary', value: '#383838' },
  { key: '--figma-color-bg-selected', value: '#4a5878' },
  { key: '--figma-color-bg-selected-hover', value: '#536383' },
  { key: '--figma-color-bg-selected-pressed', value: '#536383' },
  { key: '--figma-color-bg-selected-secondary', value: '#394360' },
  { key: '--figma-color-bg-selected-strong', value: '#0c8ce9' },
  { key: '--figma-color-bg-selected-tertiary', value: '#394360' },
  { key: '--figma-color-bg-success', value: '#198f51' },
  { key: '--figma-color-bg-success-hover', value: '#078348' },
  { key: '--figma-color-bg-success-pressed', value: '#078348' },
  { key: '--figma-color-bg-success-secondary', value: ' #0a5c35' },
  { key: '--figma-color-bg-success-tertiary', value: '#0a4c2d' },
  { key: '--figma-color-bg-tertiary', value: '#444444' },
  { key: '--figma-color-bg-warning', value: '#f3c11b' },
  { key: '--figma-color-bg-warning-hover', value: '#f2b50d' },
  { key: '--figma-color-bg-warning-pressed', value: ' #f2b50d' },
  { key: '--figma-color-bg-warning-secondary', value: '#e4a711' },
  { key: '--figma-color-bg-warning-tertiary', value: '#c58011' },
  { key: '--figma-color-border', value: '#444444' },
  { key: '--figma-color-border-brand', value: '#105cad' },
  { key: '--figma-color-border-brand-strong', value: '#7cc4f8' },
  { key: '--figma-color-border-component', value: '#652ca8' },
  { key: '--figma-color-border-component-hover', value: '#8a38f5' },
  { key: '--figma-color-border-component-strong', value: '#d6b6fb' },
  { key: '--figma-color-border-danger', value: '#963323' },
  { key: '--figma-color-border-danger-strong', value: '#fca397' },
  { key: '--figma-color-border-disabled', value: '#444444' },
  {
    key: '--figma-color-border-disabled-strong',
    value: 'rgba(255, 255, 255, 0.4)',
  },
  { key: '--figma-color-border-onbrand', value: '#0a6dc2' },
  {
    key: '--figma-color-border-onbrand-strong',
    value: 'rgba(255, 255, 255, 1)',
  },
  { key: '--figma-color-border-oncomponent', value: '#7a2ed6' },
  {
    key: '--figma-color-border-oncomponent-strong',
    value: 'rgba(255, 255, 255, 1)',
  },
  { key: '--figma-color-border-ondanger', value: '#c4381c' },
  {
    key: '--figma-color-border-ondanger-strong',
    value: 'rgba(255, 255, 255, 1)',
  },
  { key: '--figma-color-border-onselected', value: '#667799' },
  {
    key: '--figma-color-border-onselected-strong',
    value: 'rgba(255, 255, 255, 0.9)',
  },
  { key: '--figma-color-border-onsuccess', value: '#078348' },
  {
    key: '--figma-color-border-onsuccess-strong',
    value: 'rgba(255, 255, 255, 1)',
  },
  { key: '--figma-color-border-onwarning', value: '#e4a711' },
  { key: '--figma-color-border-onwarning-strong', value: 'rgba(0, 0, 0, 0.9)' },
  { key: '--figma-color-border-selected', value: '#0c8ce9' },
  { key: '--figma-color-border-selected-strong', value: '#7cc4f8' },
  { key: '--figma-color-border-strong', value: 'rgba(255, 255, 255, 0.9)' },
  { key: '--figma-color-border-success', value: '#0a5c35' },
  { key: '--figma-color-border-success-strong', value: '#79d297' },
  { key: '--figma-color-border-warning', value: '#925711' },
  { key: '--figma-color-border-warning-strong', value: '#f7d15f' },
  { key: '--figma-color-icon', value: 'rgba(255, 255, 255, 1)' },
  { key: '--figma-color-icon-brand', value: '#7cc4f8' },
  { key: '--figma-color-icon-brand-pressed', value: '#0c8ce9' },
  { key: '--figma-color-icon-brand-secondary', value: '#536383' },
  { key: '--figma-color-icon-brand-tertiary', value: '#394360' },
  { key: '--figma-color-icon-component', value: '#d1a8ff' },
  { key: '--figma-color-icon-component-pressed', value: '#d6b6fb' },
  { key: '--figma-color-icon-component-secondary', value: '#6b5884' },
  { key: '--figma-color-icon-component-tertiary', value: '#6b5884' },
  { key: '--figma-color-icon-danger', value: ' #e03e1a' },
  { key: '--figma-color-icon-danger-hover', value: '#fbbcb6' },
  { key: '--figma-color-icon-danger-pressed', value: '#fbbcb6' },
  { key: '--figma-color-icon-danger-secondary', value: '#e03e1a' },
  { key: '--figma-color-icon-danger-secondary-hover', value: '#e03e1a' },
  { key: '--figma-color-icon-danger-tertiary', value: '#e03e1a' },
  { key: '--figma-color-icon-disabled', value: 'rgba(255, 255, 255, 0.4)' },
  { key: '--figma-color-icon-hover', value: 'rgba(255, 255, 255, 1)' },
  { key: '--figma-color-icon-onbrand', value: 'rgba(255, 255, 255, 1)' },
  {
    key: '--figma-color-icon-onbrand-secondary',
    value: 'rgba(255, 255, 255, 0.8)',
  },
  {
    key: '--figma-color-icon-onbrand-tertiary',
    value: 'rgba(255, 255, 255, 0.4)',
  },
  { key: '--figma-color-icon-oncomponent', value: 'rgba(255, 255, 255, 1)' },
  {
    key: '--figma-color-icon-oncomponent-secondary',
    value: 'rgba(255, 255, 255, 0.8)',
  },
  {
    key: '--figma-color-icon-oncomponent-tertiary',
    value: 'rgba(255, 255, 255, 0.4)',
  },
  { key: '--figma-color-icon-ondanger', value: 'rgba(255, 255, 255, 1)' },
  {
    key: '--figma-color-icon-ondanger-secondary',
    value: 'rgba(255, 255, 255, 0.8)',
  },
  {
    key: '--figma-color-icon-ondanger-tertiary',
    value: 'rgba(255, 255, 255, 0.4)',
  },
  { key: '--figma-color-icon-ondisabled', value: '#2c2c2c' },
  { key: '--figma-color-icon-oninverse', value: 'rgba(0, 0, 0, 0.9)' },
  { key: '--figma-color-icon-onselected', value: 'rgba(255, 255, 255, 1)' },
  {
    key: '--figma-color-icon-onselected-secondary',
    value: 'rgba(255, 255, 255, 0.7)',
  },
  {
    key: '--figma-color-icon-onselected-strong',
    value: 'rgba(255, 255, 255, 1)',
  },
  {
    key: '--figma-color-icon-onselected-tertiary',
    value: 'rgba(255, 255, 255, 0.4)',
  },
  { key: '--figma-color-icon-onsuccess', value: 'rgba(255, 255, 255, 1)' },
  {
    key: '--figma-color-icon-onsuccess-secondary',
    value: 'rgba(255, 255, 255, 0.8)',
  },
  {
    key: '--figma-color-icon-onsuccess-tertiary',
    value: 'rgba(255, 255, 255, 0.4)',
  },
  { key: '--figma-color-icon-onwarning', value: 'rgba(0, 0, 0, 0.9)' },
  {
    key: '--figma-color-icon-onwarning-secondary',
    value: 'rgba(0, 0, 0, 0.5)',
  },
  { key: '--figma-color-icon-onwarning-tertiary', value: 'rgba(0, 0, 0, 0.3)' },
  { key: '--figma-color-icon-pressed', value: '#0a6dc2' },
  { key: '--figma-color-icon-secondary', value: 'rgba(255, 255, 255, 0.7)' },
  {
    key: '--figma-color-icon-secondary-hover',
    value: 'rgba(255, 255, 255, 1)',
  },
  { key: '--figma-color-icon-selected', value: '#7cc4f8' },
  { key: '--figma-color-icon-selected-secondary', value: '#7cc4f8' },
  { key: '--figma-color-icon-selected-tertiary', value: '#7cc4f8' },
  { key: '--figma-color-icon-success', value: '#198f51' },
  { key: '--figma-color-icon-success-pressed', value: '#a1e8b9' },
  { key: '--figma-color-icon-success-secondary', value: '#198f51' },
  { key: '--figma-color-icon-success-tertiary', value: '#198f51' },
  { key: '--figma-color-icon-tertiary', value: 'rgba(255, 255, 255, 0.4)' },
  { key: '--figma-color-icon-tertiary-hover', value: 'rgba(255, 255, 255, 1)' },
  { key: '--figma-color-icon-warning', value: '#f3c11b' },
  { key: '--figma-color-icon-warning-pressed', value: '#f7d15f' },
  { key: '--figma-color-icon-warning-secondary', value: '#f3c11b' },
  { key: '--figma-color-icon-warning-tertiary', value: '#f3c11b' },
  { key: '--figma-color-text', value: 'rgba(255, 255, 255, 1)' },
  { key: '--figma-color-text-brand', value: '#7cc4f8' },
  { key: '--figma-color-text-brand-secondary', value: '#7cc4f8' },
  { key: '--figma-color-text-brand-tertiary', value: '#7cc4f8' },
  { key: '--figma-color-text-component', value: '#d1a8ff' },
  { key: '--figma-color-text-component-pressed', value: '#d6b6fb' },
  { key: '--figma-color-text-component-secondary', value: '#6b5884' },
  { key: '--figma-color-text-component-tertiary', value: '#6b5884' },
  { key: '--figma-color-text-danger', value: '#fca397' },
  { key: '--figma-color-text-danger-secondary', value: '#fca397' },
  { key: '--figma-color-text-danger-tertiary', value: '#fca397' },
  { key: '--figma-color-text-disabled', value: 'rgba(255, 255, 255, 0.4)' },
  { key: '--figma-color-text-hover', value: 'rgba(255, 255, 255, 1)' },
  { key: '--figma-color-text-onbrand', value: 'rgba(255, 255, 255, 1)' },
  {
    key: '--figma-color-text-onbrand-secondary',
    value: 'rgba(255, 255, 255, 0.8)',
  },
  {
    key: '--figma-color-text-onbrand-tertiary',
    value: 'rgba(255, 255, 255, 0.4)',
  },
  { key: '--figma-color-text-oncomponent', value: 'rgba(255, 255, 255, 1)' },
  {
    key: '--figma-color-text-oncomponent-secondary',
    value: 'rgba(255, 255, 255, 0.8)',
  },
  {
    key: '--figma-color-text-oncomponent-tertiary',
    value: 'rgba(255, 255, 255, 0.4)',
  },
  { key: '--figma-color-text-ondanger', value: 'rgba(255, 255, 255, 1)' },
  {
    key: '--figma-color-text-ondanger-secondary',
    value: 'rgba(255, 255, 255, 0.8)',
  },
  {
    key: '--figma-color-text-ondanger-tertiary',
    value: 'rgba(255, 255, 255, 0.4)',
  },
  { key: '--figma-color-text-ondisabled', value: '#2c2c2c' },
  { key: '--figma-color-text-oninverse', value: 'rgba(0, 0, 0, 0.9)' },
  { key: '--figma-color-text-onselected', value: 'rgba(255, 255, 255, 0.9)' },
  {
    key: '--figma-color-text-onselected-secondary',
    value: 'rgba(255, 255, 255, 0.7)',
  },
  {
    key: '--figma-color-text-onselected-strong',
    value: 'rgba(255, 255, 255, 1)',
  },
  {
    key: '--figma-color-text-onselected-tertiary',
    value: 'rgba(255, 255, 255, 0.4)',
  },
  { key: '--figma-color-text-onsuccess', value: 'rgba(255, 255, 255, 1)' },
  {
    key: '--figma-color-text-onsuccess-secondary',
    value: 'rgba(255, 255, 255, 0.8)',
  },
  {
    key: '--figma-color-text-onsuccess-tertiary',
    value: 'rgba(255, 255, 255, 0.4)',
  },
  { key: '--figma-color-text-onwarning', value: 'rgba(0, 0, 0, 0.9)' },
  {
    key: '--figma-color-text-onwarning-secondary',
    value: 'rgba(0, 0, 0, 0.5)',
  },
  { key: '--figma-color-text-onwarning-tertiary', value: 'rgba(0, 0, 0, 0.3)' },
  { key: '--figma-color-text-secondary', value: 'rgba(255, 255, 255, 0.7)' },
  {
    key: '--figma-color-text-secondary-hover',
    value: 'rgba(255, 255, 255, 1)',
  },
  { key: '--figma-color-text-selected', value: '#7cc4f8' },
  { key: '--figma-color-text-selected-secondary', value: '#7cc4f8' },
  { key: '--figma-color-text-selected-tertiary', value: '#7cc4f8' },
  { key: '--figma-color-text-success', value: '#79d297' },
  { key: '--figma-color-text-success-secondary', value: '#79d297' },
  { key: '--figma-color-text-success-tertiary', value: '#79d297' },
  { key: '--figma-color-text-tertiary', value: 'rgba(255, 255, 255, 0.4)' },
  { key: '--figma-color-text-tertiary-hover', value: 'rgba(255, 255, 255, 1)' },
  { key: '--figma-color-text-warning', value: '#f7d15f' },
  { key: '--figma-color-text-warning-secondary', value: '#f7d15f' },
  { key: '--figma-color-text-warning-tertiary', value: '#f7d15f' },
];
export default tokens;
