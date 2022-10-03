const path = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    path.resolve(__dirname, './index.html'),
    path.resolve(__dirname, './src/**/*.{js,ts,jsx,tsx}'),
    path.resolve(__dirname, '../../libs/view-*/src/**/*.{js,ts,jsx,tsx}'),
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: 'var(--figma-color-bg-brand)',
          hover: 'var(--figma-color-bg-brand-hover)',
          pressed: 'var(--figma-color-bg-brand-pressed)',
          secondary: 'var(--figma-color-bg-brand-secondary)',
          tertiary: 'var(--figma-color-bg-brand-tertiary)',
          strong: 'var(--figma-color-border-brand-strong)',
        },
        component: {
          DEFAULT: 'var(--figma-color-bg-component)',
          hover: 'var(--figma-color-bg-component-hover)',
          pressed: 'var(--figma-color-bg-component-pressed)',
          secondary: 'var(--figma-color-bg-component-secondary)',
          tertiary: 'var(--figma-color-bg-component-tertiary)',
          strong: 'var(--figma-color-border-component-strong)',
        },
        danger: {
          DEFAULT: 'var(--figma-color-bg-danger)',
          hover: 'var(--figma-color-bg-danger-hover)',
          pressed: 'var(--figma-color-bg-danger-pressed)',
          secondary: {
            DEFAULT: 'var(--figma-color-icon-danger-secondary)',
            hover: 'var(--figma-color-icon-danger-secondary-hover)',
          },
          tertiary: 'var(--figma-color-bg-danger-tertiary)',
          strong: 'var(--figma-color-border-danger-strong)',
        },
        disabled: {
          DEFAULT: 'var(--figma-color-bg-disabled)',
          secondary: 'var(--figma-color-bg-disabled-secondary)',
          strong: 'var(--figma-color-border-disabled-strong)',
        },
        hover: 'var(--figma-color-bg-hover)',
        inverse: 'var(--figma-color-bg-inverse)',
        onselected: {
          DEFAULT: 'var(--figma-color-bg-onselected)',
          hover: 'var(--figma-color-bg-onselected-hover)',
          pressed: 'var(--figma-color-bg-onselected-pressed)',
          strong: 'var(--figma-color-border-onselected-strong)',
          secondary: 'var(--figma-color-icon-onselected-secondary)',
          tertiary: 'var(--figma-color-icon-onselected-tertiary)',
        },
        pressed: 'var(--figma-color-bg-pressed)',
        secondary: {
          DEFAULT: 'var(--figma-color-icon-secondary)',
          hover: 'var(--figma-color-icon-secondary-hover)',
        },
        selected: {
          DEFAULT: 'var(--figma-color-bg-selected)',
          hover: 'var(--figma-color-bg-selected-hover)',
          pressed: 'var(--figma-color-bg-selected-pressed)',
          secondary: 'var(--figma-color-bg-selected-secondary)',
          strong: 'var(--figma-color-bg-selected-strong)',
          tertiary: 'var(--figma-color-bg-selected-tertiary)',
        },
        success: {
          DEFAULT: 'var(--figma-color-bg-success)',
          hover: 'var(--figma-color-bg-success-hover)',
          pressed: 'var(--figma-color-bg-success-pressed)',
          secondary: 'var(--figma-color-bg-success-secondary)',
          tertiary: 'var(--figma-color-bg-success-tertiary)',
          strong: 'var(--figma-color-border-success-strong)',
        },
        tertiary: {
          DEFAULT: 'var(--figma-color-icon-tertiary)',
          hover: 'var(--figma-color-icon-tertiary-hover)',
        },
        warning: {
          DEFAULT: 'var(--figma-color-bg-warning)',
          hover: 'var(--figma-color-bg-warning-hover)',
          pressed: 'var(--figma-color-bg-warning-pressed)',
          secondary: 'var(--figma-color-bg-warning-secondary)',
          tertiary: 'var(--figma-color-bg-warning-tertiary)',
          strong: 'var(--figma-color-border-warning-strong)',
        },
        onbrand: {
          DEFAULT: 'var(--figma-color-border-onbrand)',
          strong: 'var(--figma-color-border-onbrand-strong)',
          secondary: 'var(--figma-color-icon-onbrand-secondary)',
          tertiary: 'var(--figma-color-icon-onbrand-tertiary)',
        },
        oncomponent: {
          DEFAULT: 'var(--figma-color-border-oncomponent)',
          strong: 'var(--figma-color-border-oncomponent-strong)',
          secondary: 'var(--figma-color-icon-oncomponent-secondary)',
          tertiary: 'var(--figma-color-icon-oncomponent-tertiary)',
        },
        ondanger: {
          DEFAULT: 'var(--figma-color-border-ondanger)',
          strong: 'var(--figma-color-border-ondanger-strong)',
          secondary: 'var(--figma-color-icon-ondanger-secondary)',
          tertiary: 'var(--figma-color-icon-ondanger-tertiary)',
        },
        onsuccess: {
          DEFAULT: 'var(--figma-color-border-onsuccess)',
          strong: 'var(--figma-color-border-onsuccess-strong)',
          secondary: 'var(--figma-color-icon-onsuccess-secondary)',
          tertiary: 'var(--figma-color-icon-onsuccess-tertiary)',
        },
        onwarning: {
          DEFAULT: 'var(--figma-color-border-onwarning)',
          strong: 'var(--figma-color-border-onwarning-strong)',
          secondary: 'var(--figma-color-icon-onwarning-secondary)',
          tertiary: 'var(--figma-color-icon-onwarning-tertiary)',
        },
        strong: 'var(--figma-color-border-strong)',
        ondisabled: 'var(--figma-color-icon-ondisabled)',
        oninverse: 'var(--figma-color-icon-oninverse)',
      },
    },
  },
  plugins: [],
};
