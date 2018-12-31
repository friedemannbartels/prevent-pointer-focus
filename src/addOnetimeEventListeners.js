const removeOnetimeEventListeners = (events) => {
  events.forEach(([name, element, callback]) => {
    element.removeEventListener(name, callback)
  })
}

const addOnetimeEventListeners = (events) => {
  events.forEach((event) => {
    const callback = event.length === 3 ? event.pop() : () => { }
    event.push((e) => {
      if (callback(e) !== false) {
        removeOnetimeEventListeners(events)
      }
    })
    event[1].addEventListener(event[0], event[2])
  })
}

export default addOnetimeEventListeners
