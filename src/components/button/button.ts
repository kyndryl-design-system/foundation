/**
 * Copyright Kyndryl, Inc. 2023
 */

import { html, LitElement } from 'lit';
import {
  customElement,
  property,
  state,
  query,
  queryAssignedNodes,
  queryAssignedElements,
} from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { classMap } from 'lit-html/directives/class-map.js';
import { debounce } from '../../common/helpers/events';

import {
  BUTTON_KINDS,
  BUTTON_SIZES,
  BUTTON_TYPES,
  BUTTON_ICON_POSITION,
} from './defs';

import stylesheet from './button.scss';

/**
 * Button component.
 *
 * @slot unnamed - Slot for button text.
 * @slot icon - Slot for an icon.
 * @fires on-click - Emits the original click event.
 */
@customElement('kd-button')
export class Button extends LitElement {
  static override styles = [stylesheet];

  /** @ignore */
  static override shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  /**
   * Associate the component with forms.
   * @ignore
   */
  static formAssociated = true;

  /**
   * Attached internals for form association.
   * @ignore
   */
  @state()
  internals = this.attachInternals();

  /** ARIA label for the button for accessibility. */
  @property({ type: String })
  description = '';

  /** Type for the &lt;button&gt; element. */
  @property({ type: String })
  type: BUTTON_TYPES = BUTTON_TYPES.BUTTON;

  /** Specifies the visual appearance/kind of the button. */
  @property({ type: String })
  kind: BUTTON_KINDS = BUTTON_KINDS.PRIMARY_APP;

  /** Converts the button to an &lt;a&gt; tag if specified. */
  @property({ type: String })
  href = '';

  /** Specifies the size of the button. */
  @property({ type: String })
  size: BUTTON_SIZES = BUTTON_SIZES.MEDIUM;

  /** Specifies the position of the icon relative to any button text. */
  @property({ type: String })
  iconPosition: BUTTON_ICON_POSITION = BUTTON_ICON_POSITION.CENTER;

  /** Determines if the button is disabled.
   * @internal
   */
  @state()
  iconOnly = false;

  /** Determines if the button is disabled. */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Determines if the button indicates a destructive action. */
  @property({ type: Boolean, reflect: true })
  destructive = false;

  /** Button value.  */
  @property({ type: String })
  value = '';

  /** Button name. */
  @property({ type: String })
  name = '';

  /** Determines if the button is Floatable */
  @property({ type: Boolean })
  isFloating = false;

  /** Show button after scrolling to 50% of the page*/
  @property({ type: Boolean })
  showOnScroll = false;

  /** Determines showButton state .
   * @internal
   */
  @state()
  showButton = false;

  /** re-size button to 'medium' at mobile breakpoint.
   * @internal
   */
  @state()
  reSizeBtn = false;

  /** Button formmethod.  */
  @property({ type: String })
  formmethod!: any;

  /** Queries default slot nodes.
   * @internal
   */
  @queryAssignedNodes()
  _slottedEls!: Array<any>;

  /** Queries icon slot nodes.
   * @internal
   */
  @queryAssignedElements({ slot: 'icon' })
  _iconEls!: Array<any>;

  /** Queries the .button element.
   * @internal
   */
  @query('.button')
  _btnEl!: any;

  override render() {
    this.reSizeButton();
    const typeClassMap = {
      [BUTTON_KINDS.PRIMARY_APP]: 'primary-app',
      [BUTTON_KINDS.PRIMARY_WEB]: 'primary-web',
      [BUTTON_KINDS.SECONDARY]: 'secondary',
      [BUTTON_KINDS.TERTIARY]: 'tertiary',
    };

    const baseTypeClass = typeClassMap[this.kind];
    const destructModifier = this.destructive ? '-destructive' : '';

    const classes = {
      button: true,
      [`kd-btn--${baseTypeClass}${destructModifier}`]: true,
      [`kd-btn--${baseTypeClass}`]: !this.destructive,
      'kd-btn--large': this.size === BUTTON_SIZES.LARGE,
      'kd-btn--small': this.size === BUTTON_SIZES.SMALL,
      'kd-btn--medium': this.reSizeBtn || this.size === BUTTON_SIZES.MEDIUM,
      [`kd-btn--icon-${this.iconPosition}`]:
        !!this.iconPosition && !this.iconOnly,
      [`kd-btn--icon-center`]: this._iconEls?.length && this.iconOnly,
      'icon-only': this._iconEls?.length && this.iconOnly,
      'btn-float': this.isFloating,
      'btn-hidden': this.showOnScroll && !this.showButton,
      'btn-visible': !this.showOnScroll || this.showButton,
    };
    return html`
      ${this.href && this.href !== ''
        ? html`
            <a
              class=${classMap(classes)}
              href=${this.href}
              ?disabled=${this.disabled}
              aria-label=${ifDefined(this.description)}
              title=${ifDefined(this.description)}
              @click=${(e: Event) => this.handleClick(e)}
            >
              <span>
                <slot @slotchange=${() => this._handleSlotChange()}></slot>
                <slot
                  name="icon"
                  @slotchange=${() => this._handleSlotChange()}
                ></slot>
              </span>
            </a>
          `
        : html`
            <button
              class=${classMap(classes)}
              type=${this.type}
              ?disabled=${this.disabled}
              aria-label=${ifDefined(this.description)}
              title=${ifDefined(this.description)}
              name=${ifDefined(this.name)}
              value=${ifDefined(this.value)}
              formmethod=${ifDefined(this.formmethod)}
              @click=${(e: Event) => this.handleClick(e)}
            >
              <span>
                <slot @slotchange=${() => this._handleSlotChange()}></slot>
                <slot
                  name="icon"
                  @slotchange=${() => this._handleSlotChange()}
                ></slot>
              </span>
            </button>
          `}
    `;
  }

  private handleClick(e: Event) {
    if (this.internals.form) {
      if (this.type === 'submit') {
        this.internals.form.requestSubmit();
      } else if (this.type === 'reset') {
        this.internals.form.reset();
      }
    }

    const event = new CustomEvent('on-click', {
      detail: { origEvent: e },
    });
    this.dispatchEvent(event);
  }

  private _testIconOnly() {
    if (!this._iconEls?.length) {
      return false;
    }

    const TextNodes = this._slottedEls?.filter((node: any) => {
      return node.textContent.trim() !== '';
    });

    const VisibleTextNodes = TextNodes.filter((node: any) => {
      if (node.tagName) {
        const Styles = getComputedStyle(node);
        return Styles.display !== 'none' && Styles.visibility !== 'hidden';
      } else {
        return true;
      }
    });

    return !VisibleTextNodes.length;
  }

  private _handleSlotChange() {
    this.iconOnly = this._testIconOnly();
    this.requestUpdate();
  }

  /** @internal */
  private _debounceResize = debounce(() => {
    this._handleScroll();
    this.iconOnly = this._testIconOnly();
  });

  /** @internal */
  private reSizeButton() {
    // Resize button to medium at mobile breakpoint
    this.reSizeBtn =
      (this.isFloating || this.showOnScroll) && window.innerWidth <= 672
        ? true
        : false;
  }

  /** @internal */
  private _handleScroll() {
    if (this.showOnScroll) {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      // Show the button if scrolled past halfway
      this.showButton = scrollPosition > (pageHeight - windowHeight) / 2;
    } else {
      this.showButton = true; // Always visible
    }
  }

  override connectedCallback() {
    super.connectedCallback();
    window.addEventListener('resize', this._debounceResize);
    if (this.showOnScroll) {
      window.addEventListener('scroll', this._handleScroll.bind(this));
    }
  }

  override disconnectedCallback() {
    window.removeEventListener('resize', this._debounceResize);
    if (this.showOnScroll) {
      window.removeEventListener('scroll', this._handleScroll.bind(this));
    }
    super.disconnectedCallback();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'kd-button': Button;
  }
}
