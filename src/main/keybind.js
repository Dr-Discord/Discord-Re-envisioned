const pressed = {}
const listeners = new Set()

document.addEventListener("keydown", (event) => {
  pressed[event.key] = true
  Array.from(listeners.values(), (l) => l(event))
}, true)
document.addEventListener("keyup", (event) => delete pressed[event.key], true)

export default new class Keybind {
  get pressed() { return pressed }
  on(keys, callback) {
    function listener(event) {
      const pressedKeys = Object.keys(pressed)
      if (pressedKeys.length !== keys.length) return
      if (!pressedKeys.every((v) => keys.includes(v))) return
      callback(event)
    }
  
    listeners.add(listener)
    return () => listeners.delete(listener)
  }
  once(keys, callback) {
    function listener(event) {
      callback(event)
      this.off(listener)
    }
    
    this.on(keys, listener)
  }
  off(callback) { listeners.delete(callback) }
}