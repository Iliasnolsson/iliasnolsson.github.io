
class DisposableEventListener {

    static add({ target, eventType, eventHandler }) {
        target.addEventListener(eventType, eventHandler)
        return { dispose: () => target.removeEventListener(eventType, eventHandler) }
    }

}