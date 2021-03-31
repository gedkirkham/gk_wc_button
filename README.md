# gk_wc_button

## Installation
1. 'npm install' and add <script> tag that points to the packages index.js file located within the node_modules folder.
2. Call 'loadComponent' and pass in file path to the packages 'button.wc' file located within the node_modules folder.

![](https://github.com/gedkirkham/media/blob/master/gk-wc-button/images/solid__save__loading__click.gif)

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

### Colour
To change the colour of the button, add the colour attibute with a valid param. Currently, only the following values are valid; negative, warning, success and base.

If you would like to replace these colours, then you can do so by creating your own custom css variables in HSL format, rather than the usual HEX which most people will be used to. 

The below code snippet is #ffd500 formatted as hsl. --component-colour-base refers to the hue and saturation of HSL, and --component-colour-base-lightness refers to...the lightness of HSL. In raw css, #ffd500 would be represented as hsl(50, 100%, 50%).

```css
gk-wc-button {
    --component-colour-base: 50, 100%;
    --component-colour-base-lightness: 50;

    --component-colour-warning: 0, 100%;
    --component-colour-warning-lightness: 50;
}
```

```html
<gk-wc-button colour="success">
</gk-wc-button>
```

### Icon
To change the icon, create a slot and insert your desired image.
```html
<gk-wc-button>
    <div slot="icon">
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="database" class="svg-inline--fa fa-database fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M448 73.143v45.714C448 159.143 347.667 192 224 192S0 159.143 0 118.857V73.143C0 32.857 100.333 0 224 0s224 32.857 224 73.143zM448 176v102.857C448 319.143 347.667 352 224 352S0 319.143 0 278.857V176c48.125 33.143 136.208 48.572 224 48.572S399.874 209.143 448 176zm0 160v102.857C448 479.143 347.667 512 224 512S0 479.143 0 438.857V336c48.125 33.143 136.208 48.572 224 48.572S399.874 369.143 448 336z"></path></svg>
    </div>
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
    colour="neutral"
>
</gk-wc-button>
```
