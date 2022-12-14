import { Token } from '../types';

const tokens: Token[] = [
  { key: '--figma-color-bg', value: 'rgba(255, 255, 255, 1)' },
  { key: '--figma-color-bg-brand', value: '#0d99ff' },
  { key: '--figma-color-bg-brand-hover', value: '#007be5' },
  { key: '--figma-color-bg-brand-pressed', value: '#007be5' },
  { key: '--figma-color-bg-brand-secondary', value: '#0768cf' },
  { key: '--figma-color-bg-brand-tertiary', value: '#e5f4ff' },
  { key: '--figma-color-bg-component', value: '#9747ff' },
  { key: '--figma-color-bg-component-hover', value: '#8638e5' },
  { key: '--figma-color-bg-component-pressed', value: '#8638e5' },
  { key: '--figma-color-bg-component-secondary', value: '#7c2bda' },
  { key: '--figma-color-bg-component-tertiary', value: '#f1e5ff' },
  { key: '--figma-color-bg-danger', value: '#f24822' },
  { key: '--figma-color-bg-danger-hover', value: '#dc3412' },
  { key: '--figma-color-bg-danger-pressed', value: '#dc3412' },
  { key: '--figma-color-bg-danger-secondary', value: '#bd2915' },
  { key: '--figma-color-bg-danger-tertiary', value: '#ffe2e0' },
  { key: '--figma-color-bg-disabled', value: '#d9d9d9' },
  { key: '--figma-color-bg-disabled-secondary', value: '#b3b3b3' },
  { key: '--figma-color-bg-hover', value: '#f5f5f5' },
  { key: '--figma-color-bg-inverse', value: '#2c2c2c' },
  { key: '--figma-color-bg-onselected', value: '#bde3ff' },
  { key: '--figma-color-bg-onselected-hover', value: '#bde3ff' },
  { key: '--figma-color-bg-onselected-pressed', value: '#bde3ff' },
  { key: '--figma-color-bg-pressed', value: '#f5f5f5' },
  { key: '--figma-color-bg-secondary', value: '#f5f5f5' },
  { key: '--figma-color-bg-selected', value: '#e5f4ff' },
  { key: '--figma-color-bg-selected-hover', value: '#bde3ff' },
  { key: '--figma-color-bg-selected-pressed', value: '#bde3ff' },
  { key: '--figma-color-bg-selected-secondary', value: '#f2f9ff' },
  { key: '--figma-color-bg-selected-strong', value: '#0d99ff' },
  { key: '--figma-color-bg-selected-tertiary', value: '#f2f9ff' },
  { key: '--figma-color-bg-success', value: '#14ae5c' },
  { key: '--figma-color-bg-success-hover', value: '#009951' },
  { key: '--figma-color-bg-success-pressed', value: '#009951' },
  { key: '--figma-color-bg-success-secondary', value: '#008043' },
  { key: '--figma-color-bg-success-tertiary', value: '#cff7d3' },
  { key: '--figma-color-bg-tertiary', value: '#e6e6e6' },
  { key: '--figma-color-bg-warning', value: '#ffcd29' },
  { key: '--figma-color-bg-warning-hover', value: '#ffc21a' },
  { key: '--figma-color-bg-warning-pressed', value: '#ffc21a' },
  { key: '--figma-color-bg-warning-secondary', value: '#fab815' },
  { key: '--figma-color-bg-warning-tertiary', value: '#fff1c2' },
  { key: '--figma-color-border', value: '#e6e6e6' },
  { key: '--figma-color-border-brand', value: '#bde3ff' },
  { key: '--figma-color-border-brand-strong', value: '#007be5' },
  { key: '--figma-color-border-component', value: '#e4ccff' },
  { key: '--figma-color-border-component-hover', value: '#9747ff' },
  { key: '--figma-color-border-component-strong', value: '#8638e5' },
  { key: '--figma-color-border-danger', value: '#ffc7c2' },
  { key: '--figma-color-border-danger-strong', value: '#dc3412' },
  { key: '--figma-color-border-disabled', value: '#e6e6e6' },
  { key: '--figma-color-border-disabled-strong', value: 'rgba(0, 0, 0, 0.3)' },
  { key: '--figma-color-border-onbrand', value: '#007be5' },
  {
    key: '--figma-color-border-onbrand-strong',
    value: 'rgba(255, 255, 255, 1)',
  },
  { key: '--figma-color-border-oncomponent', value: '#8638e5' },
  {
    key: '--figma-color-border-oncomponent-strong',
    value: 'rgba(255, 255, 255, 1)',
  },
  { key: '--figma-color-border-ondanger', value: '#dc3412' },
  {
    key: '--figma-color-border-ondanger-strong',
    value: 'rgba(255, 255, 255, 1)',
  },
  { key: '--figma-color-border-onselected', value: '#bde3ff' },
  {
    key: '--figma-color-border-onselected-strong',
    value: 'rgba(0, 0, 0, 0.9)',
  },
  { key: '--figma-color-border-onsuccess', value: '#009951' },
  {
    key: '--figma-color-border-onsuccess-strong',
    value: 'rgba(255, 255, 255, 1)',
  },
  { key: '--figma-color-border-onwarning', value: '#fab815' },
  { key: '--figma-color-border-onwarning-strong', value: 'rgba(0, 0, 0, 0.9)' },
  { key: '--figma-color-border-selected', value: '#0d99ff' },
  { key: '--figma-color-border-selected-strong', value: '#007be5' },
  { key: '--figma-color-border-strong', value: '#2c2c2c' },
  { key: '--figma-color-border-success', value: '#aff4c6' },
  { key: '--figma-color-border-success-strong', value: '#009951' },
  { key: '--figma-color-border-warning', value: '#ffe8a3' },
  { key: '--figma-color-border-warning-strong', value: '#b86200' },
  { key: '--figma-color-icon', value: 'rgba(0, 0, 0, 0.9)' },
  { key: '--figma-color-icon-brand', value: '#007be5' },
  { key: '--figma-color-icon-brand-pressed', value: '#0768cf' },
  { key: '--figma-color-icon-brand-secondary', value: '#80caff' },
  { key: '--figma-color-icon-brand-tertiary', value: '#bde3ff' },
  { key: '--figma-color-icon-component', value: '#8638e5' },
  { key: '--figma-color-icon-component-pressed', value: '#7c2bda' },
  { key: '--figma-color-icon-component-secondary', value: '#c5b2dc' },
  { key: '--figma-color-icon-component-tertiary', value: '#c5b2dc' },
  { key: '--figma-color-icon-danger', value: '#f24822' },
  { key: '--figma-color-icon-danger-hover', value: '#bd2915' },
  { key: '--figma-color-icon-danger-pressed', value: '#bd2915' },
  { key: '--figma-color-icon-danger-secondary', value: '#f24822' },
  { key: '--figma-color-icon-danger-secondary-hover', value: '#f24822' },
  { key: '--figma-color-icon-danger-tertiary', value: '#f24822' },
  { key: '--figma-color-icon-disabled', value: 'rgba(0, 0, 0, 0.3)' },
  { key: '--figma-color-icon-hover', value: 'rgba(0, 0, 0, 0.9)' },
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
  { key: '--figma-color-icon-ondisabled', value: 'rgba(255, 255, 255, 1)' },
  { key: '--figma-color-icon-oninverse', value: 'rgba(255, 255, 255, 0.9)' },
  { key: '--figma-color-icon-onselected', value: 'rgba(0, 0, 0, 0.9)' },
  {
    key: '--figma-color-icon-onselected-secondary',
    value: 'rgba(0, 0, 0, 0.5)',
  },
  {
    key: '--figma-color-icon-onselected-strong',
    value: 'rgba(255, 255, 255, 1)',
  },
  {
    key: '--figma-color-icon-onselected-tertiary',
    value: 'rgba(0, 0, 0, 0.3)',
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
  { key: '--figma-color-icon-pressed', value: '#007be5' },
  { key: '--figma-color-icon-secondary', value: 'rgba(0, 0, 0, 0.5)' },
  { key: '--figma-color-icon-secondary-hover', value: 'rgba(0, 0, 0, 0.9)' },
  { key: '--figma-color-icon-selected', value: '#007be5' },
  { key: '--figma-color-icon-selected-secondary', value: '#007be5' },
  { key: '--figma-color-icon-selected-tertiary', value: '#007be5' },
  { key: '--figma-color-icon-success', value: '#14ae5c' },
  { key: '--figma-color-icon-success-pressed', value: '#008043' },
  { key: '--figma-color-icon-success-secondary', value: '#14ae5c' },
  { key: '--figma-color-icon-success-tertiary', value: '#14ae5c' },
  { key: '--figma-color-icon-tertiary', value: 'rgba(0, 0, 0, 0.3)' },
  { key: '--figma-color-icon-tertiary-hover', value: 'rgba(0, 0, 0, 0.9)' },
  { key: '--figma-color-icon-warning', value: '#ffcd29' },
  { key: '--figma-color-icon-warning-pressed', value: '#b86200' },
  { key: '--figma-color-icon-warning-secondary', value: '#ffcd29' },
  { key: '--figma-color-icon-warning-tertiary', value: '#ffcd29' },
  { key: '--figma-color-text', value: 'rgba(0, 0, 0, 0.9)' },
  { key: '--figma-color-text-brand', value: '#007be5' },
  { key: '--figma-color-text-brand-secondary', value: '#007be5' },
  { key: '--figma-color-text-brand-tertiary', value: '#007be5' },
  { key: '--figma-color-text-component', value: '#8638e5' },
  { key: '--figma-color-text-component-pressed', value: '#7c2bda' },
  { key: '--figma-color-text-component-secondary', value: '#c5b2dc' },
  { key: '--figma-color-text-component-tertiary', value: '#c5b2dc' },
  { key: '--figma-color-text-danger', value: '#dc3412' },
  { key: '--figma-color-text-danger-secondary', value: '#dc3412' },
  { key: '--figma-color-text-danger-tertiary', value: '#dc3412' },
  { key: '--figma-color-text-disabled', value: 'rgba(0, 0, 0, 0.3)' },
  { key: '--figma-color-text-hover', value: 'rgba(0, 0, 0, 0.9)' },
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
  { key: '--figma-color-text-ondisabled', value: 'rgba(255, 255, 255, 1)' },
  { key: '--figma-color-text-oninverse', value: 'rgba(255, 255, 255, 0.9)' },
  { key: '--figma-color-text-onselected', value: 'rgba(0, 0, 0, 0.9)' },
  {
    key: '--figma-color-text-onselected-secondary',
    value: 'rgba(0, 0, 0, 0.5)',
  },
  {
    key: '--figma-color-text-onselected-strong',
    value: 'rgba(255, 255, 255, 1)',
  },
  {
    key: '--figma-color-text-onselected-tertiary',
    value: 'rgba(0, 0, 0, 0.3)',
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
  { key: '--figma-color-text-secondary', value: 'rgba(0, 0, 0, 0.5)' },
  { key: '--figma-color-text-secondary-hover', value: 'rgba(0, 0, 0, 0.9)' },
  { key: '--figma-color-text-selected', value: '#007be5' },
  { key: '--figma-color-text-selected-secondary', value: '#007be5' },
  { key: '--figma-color-text-selected-tertiary', value: '#007be5' },
  { key: '--figma-color-text-success', value: '#009951' },
  { key: '--figma-color-text-success-secondary', value: '#009951' },
  { key: '--figma-color-text-success-tertiary', value: '#009951' },
  { key: '--figma-color-text-tertiary', value: 'rgba(0, 0, 0, 0.3)' },
  { key: '--figma-color-text-tertiary-hover', value: 'rgba(0, 0, 0, 0.9)' },
  { key: '--figma-color-text-warning', value: '#b86200' },
  { key: '--figma-color-text-warning-secondary', value: '#b86200' },
  { key: '--figma-color-text-warning-tertiary', value: '#b86200' },
];
export default tokens;
