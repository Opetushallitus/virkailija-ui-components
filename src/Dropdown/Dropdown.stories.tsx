import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';

import DropdownMenu from '../DropdownMenu';
import DropdownMenuItem from '../DropdownMenuItem';
import DropdownIcon from '../DropdownIcon';
import Dropdown from './index';
import Button from '../Button';

const menu = (
  <DropdownMenu>
    <DropdownMenuItem>Item 1</DropdownMenuItem>
    <DropdownMenuItem>Item 2</DropdownMenuItem>
    <DropdownMenuItem>Item 3</DropdownMenuItem>
  </DropdownMenu>
);

const stories = storiesOf('Components/Dropdown', module);

stories
  .add('Default', () => {
    const open = boolean('Open', true);

    return (
      <Dropdown
        overlay={menu}
        open={open}
        onOutsideClick={action('outsideClick')}
        onOverlayClick={action('overlayClick')}
      >
        {({ ref }) => (
          <Button ref={ref}>
            Dropdown <DropdownIcon open={open} />
          </Button>
        )}
      </Dropdown>
    );
  })
  .add('With uncontrolled', () => {
    const toggleOnOutsideClick = boolean(
      'Toggle on outside click',
      true,
    ) as boolean;

    const toggleOnOverlayClick = boolean(
      'Toggle on overlay click',
      true,
    ) as boolean;

    return (
      <Dropdown
        overlay={menu}
        toggleOnOutsideClick={toggleOnOutsideClick}
        toggleOnOverlayClick={toggleOnOverlayClick}
      >
        {({ ref, onToggle, open }) => (
          <Button ref={ref} onClick={onToggle}>
            Dropdown <DropdownIcon open={open} />
          </Button>
        )}
      </Dropdown>
    );
  });
