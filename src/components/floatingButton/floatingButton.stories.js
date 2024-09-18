import { html } from 'lit';
import { action } from '@storybook/addon-actions';
import chevronUpIcon from '@carbon/icons/es/chevron--up/20';
import './index';
import '../button';
import '../icon';

export default {
  title: 'Components/Button/FloatingButton',
  component: 'kd-float-btn',
  parameters: {
    design: {
      type: 'figma',
      url: '',
    },
  },
};

export const Simple = {
  render: () => html`
    <kd-float-btn>
      <kd-button
        kind="primary-app"
        type="button"
        size="small"
        iconposition="left"
        description="Button description"
        ?isFloating=${true}
        @on-click=${(e) => action(e.type)(e)}
      >
        Button Text
        <kd-icon
          slot="icon"
          .icon=${chevronUpIcon}
          role="img"
          aria-label="Chevron Up Icon"
          title="Chevron Up Icon"
        ></kd-icon>
      </kd-button>
    </kd-float-btn>
  `,
};

export const WithScroll = {
  render: () => html`
    <div style="padding-bottom:50px">
      <!-- Add some space in bottom so FAB doesn't obstruct any essestial UI element -->
      <h1>Long Text/ content</h1>
      <p>
        You can build just about any kind of web UI with Lit! The first thing to
        know about Lit is that every Lit component is a standard web component.
        Web components have the superpower of interoperability: natively
        supported by browsers, web components can be used in any HTML
        environment, with any framework or none at all. This makes Lit an ideal
        choice for developing shareable components or design systems. Lit
        components can be used across multiple apps and sites, even if those
        apps and sites are built on a variety of front-end stacks. Site
        developers using Lit components don’t need to write or even see any Lit
        code; they can just use the components the same way they do built-in
        HTML elements. Lit is also perfect for progressively enhancing basic
        HTML sites. Browsers will recognize Lit components in your markup and
        initialize them automatically–whether your site is handcrafted, managed
        via a CMS, built with a server-side framework, or generated by a tool
        like Jekyll or eleventy. Of course, you can also build highly
        interactive, feature-rich apps out of Lit components, just as you would
        with a framework like React or Vue. Lit’s capabilities and developer
        experience are comparable to these popular alternatives, but Lit
        minimizes lock-in, maximizes flexibility and promotes maintainability by
        embracing the browser’s native component model. When you build an app
        with Lit, it’s easy to sprinkle in “vanilla” web components, or web
        components built with other libraries. You can even update to a major
        new version of Lit–or migrate to another library–one component at a
        time, without disrupting product development. You can build just about
        any kind of web UI with Lit! The first thing to know about Lit is that
        every Lit component is a standard web component. Web components have the
        superpower of interoperability: natively supported by browsers, web
        components can be used in any HTML environment, with any framework or
        none at all. This makes Lit an ideal choice for developing shareable
        components or design systems. Lit components can be used across multiple
        apps and sites, even if those apps and sites are built on a variety of
        front-end stacks. Site developers using Lit components don’t need to
        write or even see any Lit code; they can just use the components the
        same way they do built-in HTML elements. Lit is also perfect for
        progressively enhancing basic HTML sites. Browsers will recognize Lit
        components in your markup and initialize them automatically–whether your
        site is handcrafted, managed via a CMS, built with a server-side
        framework, or generated by a tool like Jekyll or eleventy. Of course,
        you can also build highly interactive, feature-rich apps out of Lit
        components, just as you would with a framework like React or Vue. Lit’s
        capabilities and developer experience are comparable to these popular
        alternatives, but Lit minimizes lock-in, maximizes flexibility and
        promotes maintainability by embracing the browser’s native component
        model. When you build an app with Lit, it’s easy to sprinkle in
        “vanilla” web components, or web components built with other libraries.
        You can even update to a major new version of Lit–or migrate to another
        library–one component at a time, without disrupting product development.
        You can build just about any kind of web UI with Lit! The first thing to
        know about Lit is that every Lit component is a standard web component.
      </p>
    </div>
    <kd-float-btn>
      <kd-button
        kind="primary-web"
        type="button"
        size="small"
        iconposition="left"
        ?isFloating=${true}
        ?showOnScroll=${true}
        description="Button description"
      >
        Button Text
        <kd-icon
          slot="icon"
          .icon=${chevronUpIcon}
          role="img"
          aria-label="Chevron Up Icon"
          title="Chevron Up Icon"
        ></kd-icon>
      </kd-button>
    </kd-float-btn>
  `,
};
