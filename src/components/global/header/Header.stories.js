import { withDesign } from 'storybook-addon-designs';
import { html } from 'lit';
import './header';
import './headerNav';
import './headerLink';
import './headerFlyouts';
import './headerFlyout';
import '../../reusable/icon/icon';

import userIcon from '@carbon/icons/es/user--avatar/24';
import caratDownIcon from '@carbon/icons/es/caret--down/16';

export default {
  title: 'Global/Header',
  component: 'kyn-header',
  subcomponents: {
    HeaderNav: 'kyn-header-nav',
    HeaderLink: 'kyn-header-link',
    HeaderFlyouts: 'kyn-header-flyouts',
    HeaderFlyout: 'kyn-header-flyout',
  },
  decorators: [
    withDesign,
    (story) =>
      html`
        <div
          style="height: 100%; min-height: 250px; transform: translate3d(0,0,0); margin: -16px;"
        >
          ${story()}
        </div>
      `,
  ],
};

export const Header = {
  args: {
    rootUrl: '/',
    appTitle: 'Delivery',
    breakpoint: 672,
  },
  render: (args) => html`
    <kyn-header
      rootUrl=${args.rootUrl}
      appTitle=${args.appTitle}
      breakpoint=${args.breakpoint}
    >
      <kyn-header-nav>
        <kyn-header-link href="javascript:void(0)" text="Link 1">
        </kyn-header-link>
        <kyn-header-link href="javascript:void(0)" text="Link 2">
        </kyn-header-link>
        <kyn-header-link href="javascript:void(0)" text="Link 3">
          <kyn-header-link
            href="javascript:void(0)"
            text="Sub Link # 1"
            level="2"
          >
          </kyn-header-link>
          <kyn-header-link
            href="javascript:void(0)"
            text="Sub Link 2"
            level="2"
          >
          </kyn-header-link>
        </kyn-header-link>
      </kyn-header-nav>

      <kyn-header-flyouts>
        <kyn-header-flyout>
          <div slot="button">
            Sign in
            <kyn-icon
              .icon="${caratDownIcon}"
              style="vertical-align: middle; margin-top: -1px"
            ></kyn-icon>
          </div>
          <div>
            <kyn-header-link href="javascript:void(0)" text="Login">
            </kyn-header-link>
            <kyn-header-link href="javascript:void(0)" text="Sign up">
            </kyn-header-link>
          </div>
        </kyn-header-flyout>
        <kyn-header-flyout>
          <kyn-icon .icon=${userIcon} slot="button"></kyn-icon>
          <div>
            <kyn-header-link href="javascript:void(0)" text="Logout">
            </kyn-header-link>
          </div>
        </kyn-header-flyout>
      </kyn-header-flyouts>
    </kyn-header>
  `,
};

Header.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/zGyRSDM6stIrSjC3TOyGGQ/744667---UX-Top-Nav-%26-Hamburger-Menu-Framework?node-id=330%3A1658',
  },
  // controls: {
  //   include: Object.keys(Header.args),
  // },
};
