window.loadComponent = (function () {
    function fetchAndParse(URL) {
        return fetch(URL)
            .then(response => {
                return response.text()
            })
            .then(html => {
                const parser = new DOMParser()
                const document = parser.parseFromString(html, 'text/html')
                const head = document.head
                const template = head.querySelector('template')
                const style = head.querySelectorAll('style')
                const script = head.querySelector('script')

                return {
                    template,
                    style,
                    script
                }
            })
    }

    function registerComponent({
        template,
        style,
        script
    }) {
        class GkWcButton extends HTMLElement {
            static get observedAttributes() {
                return [
                    'loading',
                ]
            }

            connectedCallback() {
                const shadow = this.attachShadow({
                    mode: 'open'
                }) // open: Elements of the shadow root are accessible from JavaScript outside the root, for example using Element.shadowRoot returns shadowRoot obj
                shadow.appendChild(style[0].cloneNode(true))
                shadow.appendChild(style[1].cloneNode(true))
                shadow.appendChild(style[2].cloneNode(true))
                shadow.appendChild(document.importNode(template.content, true))

                this.setAttribute("role", "button")
                this.setAttribute("tabindex", "0")
                this.addEventListener("keydown", function (event) {
                    if (event.key === "Enter" || event.key === " ") {
                        this.buttonPressed(event)
                    }
                })
                this.addEventListener("click", event => this.buttonPressed(event))
                this.initStyle({
                    elem: this,
                    colour: this.colour,
                })
            }

            buttonPressed(event) {
                this.form && this.submitForm(event)
            }

            submitForm(event) {
                const FORM = document.getElementById(this.form)

                event.preventDefault()
                const fakeSubmit = document.createElement('button')
                fakeSubmit.type = 'submit'
                fakeSubmit.style.display = 'none'
                FORM.appendChild(fakeSubmit)
                fakeSubmit.click()
                fakeSubmit.remove()
            }

            set_outline() {
                if (this.outline) {
                    const SHADOW = this.shadowRoot;
                    SHADOW.querySelector('#wrapper').style.backgroundColor = 'transparent';
                    SHADOW.querySelector('#wrapper').style.borderColor = getComputedStyle(this).getPropertyValue('--gk-colour-neutral-500');
                    SHADOW.querySelector('#wrapper').style.borderWidth = '2px';
                    SHADOW.querySelector('#wrapper').style.borderRadius = '3px';
                    SHADOW.querySelector('#wrapper').style.color = getComputedStyle(this).getPropertyValue('--gk-colour-neutral-500');
                }
            }

            initStyle({
                elem,
                colour,
            }) {
                const SHADOW = elem.shadowRoot

                const COLOUR = colour ? colour : 'neutral'
                SHADOW.getElementById('colourStyle').textContent = `
                    #wrapper {
                        background-color: var(--gk-colour-${COLOUR}-600);
                        border-color: var(--gk-colour-${COLOUR}-400) var(--gk-colour-${COLOUR}-800) var(--gk-colour-${COLOUR}-700) var(--gk-colour-${COLOUR}-300);
                    }
                    #wrapper:hover {
                        background-color: var(--gk-colour-${COLOUR}-500);
                        border-color: var(--gk-colour-${COLOUR}-300) var(--gk-colour-${COLOUR}-700) var(--gk-colour-${COLOUR}-600) var(--gk-colour-${COLOUR}-200);
                    }`

                SHADOW.querySelector('#wrapper').style.borderWidth = this.flat ? '0px' : '8px'
                SHADOW.querySelector('#wrapper').style.borderRadius = this.rounded ? '25px' : '0px'

                this.set_outline();
            }

            updateStyle({
                elem,
                value
            }) {
                const SHADOW = elem.shadowRoot

                const SET_LOADING = {
                    'true': () => {
                        SHADOW.getElementById('loadingStyle').textContent = `
                            svg#loading {
                                margin-top: 6px;
                                animation: rotation 1s linear infinite;
                            }
        
                            @keyframes rotation {
                                from {
                                    transform: rotate(0deg);
                                }
                                to {
                                    transform: rotate(359deg);
                                }
                            }`
                    },
                    'false': () => {
                        SHADOW.getElementById('loadingStyle').textContent = `
                            svg#loading {
                                display:none;
                            }`
                    }
                }

                if (SET_LOADING[value]) SET_LOADING[value]()
                else SET_LOADING['false']()
            }

            attributeChangedCallback(name, oldValue, newValue) {
                this.updateStyle({
                    elem: this,
                    value: newValue
                })
            }

            get rounded() {
                if (typeof this.getAttribute('rounded') === 'string') return 'rounded'
                else return null
            }

            get flat() {
                if (typeof this.getAttribute('flat') === 'string') return 'flat'
                else return null
            }

            set form(value) {
                return this.setAttribute('form', value)
            }
            get form() {
                return this.getAttribute('form')
            }

            set type(value) {
                return this.setAttribute('type', value)
            }
            get type() {
                return this.getAttribute('type')
            }

            set colour(value) {
                return this.setAttribute('colour', value)
            }
            get colour() {
                return this.getAttribute('colour')
            }

            set icon(value) {
                return this.setAttribute('icon', value)
            }
            get icon() {
                const ICON = this.getAttribute('icon')
                if (typeof ICON === 'string') return ICON
            }

            get loading() {
                return this.getAttribute('loading')
            }
            set loading(value) {
                this.setAttribute('loading', value)
            }

            get outline() {
                if (typeof this.getAttribute('outline') === 'string') return 'outline'
                else return null
            }
        }
        return customElements.define('gk-wc-button', GkWcButton)
    }

    function loadComponent(URL) {
        return fetchAndParse(URL).then(registerComponent)
    }

    return loadComponent
}())