class GarajeToggle extends HTMLElement {
  #state = { checked: false };

  static get styles() {
    return `
		input {
			// display: none;
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

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.elements();
    this.events();
    this.update();
  }

  changeBodyBackground() {
    const bgColor = this.#state.checked ? "Black" : "White";
    document.body.style.transition = "0.5s";
    document.body.style.backgroundColor = bgColor;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "checked") {
      this.#state.checked = true;
    }
  }

  static get observedAttributes() {
    return ["checked"];
  }

  handleToggle = () => {
    this.#state.checked = !this.#state.checked;
    this.update();
  };

  events() {
    this.$root.addEventListener("change", this.handleToggle);
  }

  elements() {
    this.$root = this.shadowRoot;
    this.$input = this.shadowRoot.querySelector("input");
    this.$span = this.shadowRoot.querySelector("span");
  }

  update() {
    const { checked } = this.#state;

    this.$input.checked = checked;
    this.$span.innerText = checked;

    this.changeBodyBackground();
  }

  render() {
    this.shadowRoot.innerHTML = `
			<style>${GarajeToggle.styles}</style>
			<label for="toggle">
				<input id="toggle" type="checkbox">
				<span>${this.#state.checked}</span>
			</label>
		`;
  }
}

customElements.define("garaje-toggle", GarajeToggle);
