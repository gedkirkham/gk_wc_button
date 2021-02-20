window.loadComponent = (function() {
    function fetchAndParse(URL) {
        return fetch( URL )
            .then(response => { return response.text() })
            .then(html => {
                const parser = new DOMParser()
                const document = parser.parseFromString( html, 'text/html' )
                const head = document.head
                const template = head.querySelector( 'template' )
                const style = head.querySelectorAll('style')
                const script = head.querySelector( 'script' )
          
                return {
                    template,
                    style,
                    script
                }
            })
        }
    
    function registerComponent({ template, style, script }) {
        class GkWcButton extends HTMLElement {
            static get observedAttributes() {
                return [
                    'loading',
                ]
            }

            constructor() {
                super()
                const shadow = this.attachShadow({ mode: 'open' }) // open: Elements of the shadow root are accessible from JavaScript outside the root, for example using Element.shadowRoot returns shadowRoot obj
                
                shadow.appendChild( style[0].cloneNode(true ))
                shadow.appendChild( style[1].cloneNode(true ))
                shadow.appendChild( style[2].cloneNode(true ))
                shadow.appendChild( document.importNode(template.content, true ))
            }

            connectedCallback() { // is called when (after) the element is attached to the DOM
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
                    icon: this.icon
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
        
            initStyle({
                elem,
                colour,
                icon
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
        
                const SELECT_ICON = {
                    'database': () => {
                        const str = `<path 
                                        fill="currentColor" 
                                        d="M448 73.143v45.714C448 159.143 347.667 192 224 192S0 159.143 0 118.857V73.143C0 32.857 100.333 0 224 0s224 32.857 224 73.143zM448 176v102.857C448 319.143 347.667 352 224 352S0 319.143 0 278.857V176c48.125 33.143 136.208 48.572 224 48.572S399.874 209.143 448 176zm0 160v102.857C448 479.143 347.667 512 224 512S0 479.143 0 438.857V336c48.125 33.143 136.208 48.572 224 48.572S399.874 369.143 448 336z"
                                    ></path>`
                        this.createSvg({
                            shadow: SHADOW,
                            id: 'database',
                            prefix: 'fas',
                            icon: 'database',
                            str: str
                        })
                    },
                    'save': () => {
                        const str = `<path 
                                        fill="currentColor" 
                                        d="M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM272 80v80H144V80h128zm122 352H54a6 6 0 0 1-6-6V86a6 6 0 0 1 6-6h42v104c0 13.255 10.745 24 24 24h176c13.255 0 24-10.745 24-24V83.882l78.243 78.243a6 6 0 0 1 1.757 4.243V426a6 6 0 0 1-6 6zM224 232c-48.523 0-88 39.477-88 88s39.477 88 88 88 88-39.477 88-88-39.477-88-88-88zm0 128c-22.056 0-40-17.944-40-40s17.944-40 40-40 40 17.944 40 40-17.944 40-40 40z"
                                    ></path>`
                        this.createSvg({
                            shadow: SHADOW,
                            id: 'save',
                            prefix: 'far',
                            icon: 'save',
                            str: str
                        })
                    }
                }
        
                SELECT_ICON[icon]()
            }
        
            createSvg({
                shadow,
                id,
                prefix,
                icon,
                str
            }) {
                const XMLNS = "http://www.w3.org/2000/svg"
                var svg = document.createElementNS(XMLNS, "svg")
                svg.setAttribute('id', id)
                svg.setAttribute('aria-hidden', 'true')
                svg.setAttribute('focusable', 'false')
                svg.setAttribute('data-prefix', prefix)
                svg.setAttribute('data-icon', icon)
                svg.setAttribute('role', 'img')
                svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
                svg.setAttribute('viewBox', '0 0 448 512')
                svg.innerHTML = str
                shadow.getElementById('wrapper').appendChild(svg)
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
                return this.getAttribute('icon')
            }
        
            get loading() {
                return this.getAttribute('loading')
            }
            set loading(value) {
                this.setAttribute('loading', value)
            }
        }
        return customElements.define( 'gk-wc-button', GkWcButton )
    }
    
    function loadComponent(URL) {
        return fetchAndParse(URL).then(registerComponent)
    }

    return loadComponent
}())
