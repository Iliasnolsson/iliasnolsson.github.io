
class RotationConfiguratorRendererPreferences {

    // X, Y means that the renderer should change rotation to given values on startup 
    // Maintain == true, means to keep the rotation at X & Y after the user tries to rotate 
    constructor({x, y, maintain}) {
        this.x = x
        this.y = y
        this.maintain = maintain
    }

}