# Prevent Pointer Focus

Try the [Demo](https://friedemannbartels.github.io/prevent-pointer-focus/demo/).

## Installation

`npm install --save prevent-pointer-focus`

## Usage

```js
import preventPointerFocus from 'prevent-pointer-focus'

preventPointerFocus()
```

Update your `focus` styles.

```css
/* before */
button:focus {
  outline: 3px solid red;
}

/* after */
button:focus:not(.pressed) {
  outline: 3px solid red;
}
```
