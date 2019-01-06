import addOnetimeEventListeners from './addOnetimeEventListeners'

const focusableElements = ['SELECT', 'INPUT', 'LABEL', 'OPTION', 'BUTTON', 'A']

const getFocusElement = (element) => {
  while (focusableElements.includes(element.tagName)) {
    if (element.nextElementSibling) {
      element = element.nextElementSibling
    } else {
      while (element !== document.body && !element.parentNode.nextElementSibling) {
        element = element.parentNode
      }

      if (element.parentNode.nextElementSibling) {
        element = element.parentNode.nextElementSibling
      }
    }
  }

  return element
}

const focusNext = (element) => {
  const focusElement = getFocusElement(element)

  const focus = () => {
    focusElement.removeEventListener('focus', focus)
    focusElement.classList.add('pressed')
    focusElement.addEventListener('blur', blur)
  }
  const blur = () => {
    focusElement.removeEventListener('blur', blur)
    focusElement.classList.remove('pressed')
    focusElement.removeAttribute('tabindex')
  }

  focusElement.setAttribute('tabindex', 0)
  focusElement.addEventListener('focus', focus)
  focusElement.focus()
}

export const blurOnChange = (element) => {
  element.classList.add('pressed')

  addOnetimeEventListeners([
    ['blur', element, () => {
      element.classList.remove('pressed')
    }],
    ['change', element, () => {
      element.classList.remove('pressed')
      element.blur()
      focusNext(element)
    }]
  ])
}

export const blurOnBlur = (element) => {
  element.classList.add('pressed')

  addOnetimeEventListeners([
    ['blur', element, () => {
      element.classList.remove('pressed')
    }]
  ])
}

export const blurOnMouseup = (element) => {
  element.classList.add('pressed')

  addOnetimeEventListeners([
    ['mouseup', element, () => {
      element.classList.remove('pressed')
      element.blur()
      focusNext(element)
    }]
  ])
}

export const blurOnFocus = (element, label) => {
  if (label) {
    addOnetimeEventListeners([
      ['focus', element, () => {
        element.blur()
        focusNext(element)
      }],
      ['click', element, () => {
        focusNext(element)
      }],
      ['mouseup', document, event => {
        let mouseupTarget = event.target
        while (mouseupTarget !== label && mouseupTarget !== document.body) {
          mouseupTarget = mouseupTarget.parentNode
        }

        return mouseupTarget !== label
      }],
      ['keydown', document]
    ])

    return
  }

  if (element === document.activeElement) {
    setTimeout(() => {
      element.blur()
      focusNext(element)
    }, 1)

    return
  }

  addOnetimeEventListeners([
    ['focus', element, () => {
      element.blur()
      focusNext(element)
    }],
    ['click', element, () => {
      focusNext(element)
    }]
  ])
}
