const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  presets: ['@storybook/preset-typescript'],
  addons: [
    '@storybook/addon-actions/register',
    '@storybook/addon-links/register',
    '@storybook/addon-knobs/register',
    '@storybook/addon-storysource/register',
  ],
};
