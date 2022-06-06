
class Listener {

    static add({ target, eventType, eventHandler }) {
        target.addEventListener(eventType, eventHandler, { passive: false })
        return { dispose: () => target.removeEventListener(eventType, eventHandler) }
    }

}