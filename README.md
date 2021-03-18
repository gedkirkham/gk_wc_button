# gk_wc_button

## Installation
1. 'npm install' and add <script> tag that points to the packages index.js file located within the node_modules folder.
2. Call 'loadComponent' and pass in file path to the packages 'button.wc' file located within the node_modules folder.

``` html
<script src="../index.js"></script>
<script>
    loadComponent('../button.wc')
</script>
```
## Usage
### Loading
To trigger the loading animation, the 'loading' attribute needs to be set on the button. This can be done with a bit of javascript.
``` html
<gk-wc-button id="gkButton">
</gk-wc-button>

<script>
    const EL = document.querySelector('#gkButton')
    EL.addEventListener('click', function () {
        EL.setAttribute('loading', true)
        
        // Wait for something to happen...        
        EL.setAttribute('loading', false)
    })
</script>
```

### Rounded
To add rounding to the corners of the button, add the 'rounded' attribute.
```html
<gk-wc-button rounded>
</gk-wc-button>
```

### Flat
To flatten the button, add the 'flat' attribute.
```html
<gk-wc-button flat>
</gk-wc-button>
```

### Colour
To change the colour of the button, add the colour attibute with a valid param. Currently, only the following values are valid; negative, warning, success and neutral.
```html
<gk-wc-button colour="success">
</gk-wc-button>
```

### Icon
To change the icon, add the icon attibute with a valid param. Currently, only the following values are valid; save and database.
```html
<gk-wc-button icon="database">
</gk-wc-button>
```

### Outline
To create a flat design that just has a outline border, add the 'outline' attribute.
```html
<gk-wc-button outline>
</gk-wc-button>
```

### Example:
``` html        
<gk-wc-button
    id="gkButton"
    rounded
    flat
    colour="neutral"
    icon="save"
>
</gk-wc-button>
```
