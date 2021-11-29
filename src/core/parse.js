export function parse(value = '') {
  if (value.startsWith('=')) {
    try {
      debugger
      return eval(value.slice(1))
    } catch (e) {
      console.warn(e)
    }
  }
  return value
}
