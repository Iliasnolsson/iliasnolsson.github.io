
class ScaleConfiguratorRendererPreferences {

    // scale means that the renderer should change rotation to given values on startup 
    // Maintain == true, means to keep the scale after the user tries to scale 
    constructor({scale, maintain}) {
        this.scale = scale
        this.maintain = maintain
    }

}