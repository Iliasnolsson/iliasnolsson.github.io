
function objectRemoveFromParent(object3D) {
    if (object3D == null) return;
    if (!(object3D instanceof THREE.Object3D)) return false;

    object3D.geometry.dispose();
    if (object3D.material instanceof Array) {
        object3D.material.forEach(material => material.dispose());
    } else {
        object3D.material.dispose();
    }
    object3D.removeFromParent(); 
    return true;
}

