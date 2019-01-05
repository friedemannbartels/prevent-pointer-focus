import { blurOnChange, blurOnBlur, blurOnMouseup, blurOnFocus } from './blurHelper'

const isTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints > 0
const isSafari = !!window.safari
const isChrome = !!window.chrome

const handleFocus = target => {
  if (target.tagName === 'SELECT') {
    if (target.getAttribute('multiple') === null) {
      if ((isChrome || isSafari) && !isTouch && document.activeElement !== target) {
        blurOnFocus(target)
        return
      }
      blurOnChange(target)
      return
    }

    if (isTouch) {
      blurOnBlur(target)
      return
    }

    event.preventDefault()
    return
  }

  if (target.tagName === 'OPTION') {
    blurOnFocus(target.parentNode)
    return
  }

  if (target.tagName === 'BUTTON') {
    blurOnFocus(target)
    return
  }

  if (target.tagName === 'A') {
    blurOnFocus(target)
    return
  }

  if (target.tagName === 'INPUT') {
    switch (target.type) {
      case 'range':
        blurOnMouseup(target)
        return
      case 'radio':
      case 'checkbox':
      case 'file':
      case 'color':
        blurOnFocus(target)
        return
      default:
        return
    }
  }

  if (target.tagName === 'LABEL') {
    const forElement = document.getElementById(target.getAttribute('for'))
    blurOnFocus(forElement, target)
    return
  }

  if (target.tagName === 'BODY') {
    return
  }

  handleFocus(target.parentNode)
}

const preventPointerFocus = () => {
  document.addEventListener('mousedown', (event) => {
    const target = event.target
    handleFocus(target)
  })
}

export default preventPointerFocus
