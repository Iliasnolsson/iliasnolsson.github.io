
class TransformConfiguratorRendererPreferences {


    constructor({rotation, scale}) {
        this.rotation = rotation
        this.scale = scale
    }

    static unrestricted() {
        return new TransformConfiguratorRendererPreferences({
            rotation: null,
            scale: null
        })
    }

    static rotation({rotation}) {
        return new TransformConfiguratorRendererPreferences({
            rotation: rotation,
            scale: null
        })
    }

    static scale({scale}) {
        return new TransformConfiguratorRendererPreferences({
            rotation: null,
            scale: scale
        })
    }

}
