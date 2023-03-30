import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import logo from '../../../assets/svg/bridge-logo-large.svg';
import FooterScss from './footer.scss';

@customElement('kyn-footer')
export class Footer extends LitElement {
  static override styles = FooterScss;
  
  /** URL for the footer logo link. Should target the application home page. */
  @property({ type: String })
  rootUrl = '/';

  override render() {
    const classes = {
      footer: true,
    };

    return html`
    <footer class="${classMap(classes)}">
    <div class="footer-links"><slot></slot></div>
    <div class="footer-cpr">
        <a
          href="${this.rootUrl}"
          class="logo-link"
          @click="${(e: Event) => this.handleRootLinkClick(e)}"
        >
          <slot name="logo"> ${unsafeHTML(logo)} </slot>
        </a>
        <span class="copyright">
          Copyright &copy; ${new Date().getFullYear()} Kyndryl Inc. All rights reserved
        </span>
      </div>
    </footer>`
  }

  private handleRootLinkClick(e: Event) {
    const event = new CustomEvent('on-root-link-click', {
      detail: { origEvent: e },
    });
    this.dispatchEvent(event);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'kyn-footer': Footer;
  }
}