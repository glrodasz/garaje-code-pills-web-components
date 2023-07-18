class GarajeToggle extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // Default props
    this.checked = false;
  }

  static get styles() {
    return `
	input {
		display: none;
	}

	label {
		display: flex;
		align-items: center;
		width: 180px;
		height: 80px;
		padding: 8px;
		border-radius: 100px;
		background: MediumTurquoise;
		cursor: pointer;
	}

	span {
		height: 80px;
		width: 80px;
		border-radius: 100%;
		transition: 0.5s;
		background: white;
		margin-left: 0;
	}
 
	label:has(input:checked) {
		background: DarkSlateGray;
	}

	input:checked ~ span {
		margin-left: calc(100% - 80px);
		transition: 0.5s;
	}
	`;
  }

  changeBodyBackground() {
    const bgColor = this.checked ? "Black" : "White";
    document.body.style.transition = "0.5s";
    document.body.style.backgroundColor = bgColor;
  }

  handleToggle = () => {
    this.checked = !this.checked;
    this.setAttribute("checked", this.checked);
    this.changeBodyBackground();
  };

  events() {
    this.shadowRoot
      .querySelector("input")
      .addEventListener("change", this.handleToggle);
  }

  connectedCallback() {
    this.render();
    this.events();
  }

  render() {
    this.shadowRoot.innerHTML = `
		<style>${GarajeToggle.styles}</style>
		<label for="toggle">
			<input id="toggle" type="checkbox">
			<span></span>
		</label>
	`;
  }
}

customElements.define("garaje-toggle", GarajeToggle);
