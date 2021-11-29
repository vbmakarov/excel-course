export function capitalize(string) {
  if (typeof string !=='string') {
    return ''
  }
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function range(start, end) {
  if (start > end) {
    [end, start] = [start, end]
  }
  const arr = new Array(end - start + 1)
      .fill(' ')
      .map((_, index)=> index)
  return arr;
}

export function storage(key, data = null) {
  if (!data) {
    const localState = JSON.parse(localStorage.getItem(key))
    return localState ? localState : null
  }
  localStorage.setItem(key, JSON.stringify(data))
}

export function isEquals(a, b) {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b)
  }
  return a === b
}

export function debounce(fn, interval) {
  let timeOut
  return function(...args) {
    const later = () => {
      clearTimeout(timeOut)
      fn(...args)
    }
    clearInterval(timeOut)
    timeOut = setTimeout(later, interval)
  }
}
