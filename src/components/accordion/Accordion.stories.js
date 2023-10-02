/**
 * Copyright Kyndryl, Inc. 2023
 */

import { html } from 'lit';

import './accordion';
import '../icon';
import checkmarkOutlineIcon from '@carbon/icons/es/checkmark--outline/16';

export default {
  title: 'Components/Accordion',
  component: `kd-accordion`,
  subcomponent: `kd-accordion-item`,
};

const args = {
  filledHeaders: false,
  compact: false,
  showNumbers: true,
  startNumber: '1',
  expandLabel: 'Expand',
  collapseLabel: 'Collapse',
};

export const Accordion = {
  args: args,
  render: (args) => {
    return html`
      <kd-accordion
        ?filledHeaders="${args.filledHeaders}"
        ?compact="${args.compact}"
        ?showNumbers="${args.showNumbers}"
        startNumber="${args.startNumber}"
        expandLabel="${args.expandLabel}"
        collapseLabel="${args.collapseLabel}"
      >
        <kd-accordion-item startOpened>
          <span slot="title">Accordion Title 1</span>
          <span slot="subtitle">Accordion subtitle 1</span>
          <div slot="body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
        </kd-accordion-item>
        <kd-accordion-item>
          <span slot="title">Accordion Title 2</span>
          <span slot="subtitle">Accordion subtitle 2</span>
          <div slot="body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
        </kd-accordion-item>
        <kd-accordion-item>
          <span slot="title">Accordion Title 3</span>
          <span slot="subtitle">Accordion subtitle 3</span>
          <div slot="body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
        </kd-accordion-item>
      </kd-accordion>
    `;
  },
};

Accordion.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/5TqtPa7KWfhJbQv6ELnbqf/Foundation?node-id=707%3A2396&mode=dev',
  },
};

export const AccordionWithIcons = {
  args: args,
  render: (args) => {
    return html`
      <kd-accordion
        ?filledHeaders="${args.filledHeaders}"
        ?compact="${args.compact}"
        ?showNumbers="${args.showNumbers}"
        startNumber="${args.startNumber}"
        expandLabel="${args.expandLabel}"
        collapseLabel="${args.collapseLabel}"
      >
        <kd-accordion-item>
          <span slot="icon"
            ><kd-icon .icon=${checkmarkOutlineIcon}></kd-icon
          ></span>
          <span slot="title">Accordion Title 1</span>
          <span slot="subtitle">Accordion subtitle 1</span>
          <div slot="body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
        </kd-accordion-item>
        <kd-accordion-item>
          <span slot="icon"
            ><kd-icon .icon=${checkmarkOutlineIcon}></kd-icon
          ></span>
          <span slot="title">Accordion Title 2</span>
          <span slot="subtitle">Accordion subtitle 2</span>
          <div slot="body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
        </kd-accordion-item>
        <kd-accordion-item>
          <span slot="icon"
            ><kd-icon .icon=${checkmarkOutlineIcon}></kd-icon
          ></span>
          <span slot="title">Accordion Title 3</span>
          <span slot="subtitle">Accordion subtitle 3</span>
          <div slot="body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
        </kd-accordion-item>
      </kd-accordion>
    `;
  },
};
