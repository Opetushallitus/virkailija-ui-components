import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';

import Modal from './index';
import ModalHeader from '../ModalHeader';
import Typography from '../Typography';
import ModalBody from '../ModalBody';
import ModalFooter from '../ModalFooter';
import Button from '../Button';
import Box from '../Box';

const onClose = action('close') as () => void;

const stories = storiesOf('Components/Modal', module);

stories.add('Default', () => {
  const open = boolean('Open', true) as boolean;

  return (
    <Modal open={open}>
      <ModalHeader onClose={onClose}>Lorem ipsum dolor sit</ModalHeader>
      <ModalBody>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec viverra
          ante eget ipsum semper, at laoreet arcu viverra. Maecenas ac eros
          suscipit, accumsan augue non, consectetur orci. Etiam in consequat
          erat. Praesent aliquet, massa sit amet fringilla gravida, ex diam
          scelerisque elit, id volutpat tortor neque vel odio. Aenean ac
          suscipit risus. Sed quis ipsum non ipsum tincidunt tempor id id lorem.
          Phasellus sollicitudin ligula enim, id porta nisi eleifend a. Cras
          fringilla, felis vitae vestibulum euismod, eros turpis semper elit, in
          malesuada velit ipsum vitae ante. Nullam id est eget ex vehicula
          aliquet gravida non augue. Suspendisse aliquet vestibulum interdum.
          Nam elementum sem condimentum vestibulum luctus.
        </Typography>
      </ModalBody>
      <ModalFooter>
        <Box display="flex" justifyContent="flex-end">
          <Box mr={2}>
            <Button variant="text">Close</Button>
          </Box>
          <Button>Submit</Button>
        </Box>
      </ModalFooter>
    </Modal>
  );
});
