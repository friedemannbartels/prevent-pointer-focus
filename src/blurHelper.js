import addOnetimeEventListeners from './addOnetimeEventListeners'

export const blurOnChange = (element) => {
  element.classList.add('pressed')

  addOnetimeEventListeners([
    ['blur', element, () => {
      element.classList.remove('pressed')
    }],
    ['change', element, () => {
      element.classList.remove('pressed')
      element.blur()
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
    }]
  ])
}

export const blurOnFocus = (element, label) => {
  if (label) {
    addOnetimeEventListeners([
      ['focus', element, () => element.blur()],
      ['mouseup', document, event => event.target !== label],
      ['keydown', document]
    ])

    return
  }

  if (element === document.activeElement) {
    setTimeout(() => {
      element.blur()
    }, 1)

    return
  }

  addOnetimeEventListeners([
    ['focus', element, () => {
      element.blur()
    }]
  ])
}
