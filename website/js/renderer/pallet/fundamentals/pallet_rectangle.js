
class PalletRectangle {

    // Corner Radius
    get cornerRadius() {return this._cornerRadius}
    set cornerRadius(newValue) {
        this._cornerRadius = newValue
        this._geometryNeedsReload()
    }

    // Width >0
    get width() {return this._width;}
    set width(newValue) {
        this._width = newValue;
        this._geometryNeedsReload();
    }

    // Depth >0
    get depth() {return this._depth;}
    set depth(newValue) {
        this._depth = newValue;
        this._geometryNeedsReload()
    } 
    
    // Height >0
    get height() {return this._height;}
    set height(newValue) {
        this._height = newValue;
        this._geometryNeedsReload();
    }


    constructor() {
        this._showGrid = true
        this._blackAndWhite = true
        var material

        if (this._blackAndWhite) {
            material = new THREE.MeshStandardMaterial({color: 0x000000});
        } else {
            const loader = new THREE.TextureLoader();
            const mapTexture = loader.load("resources/textures/PLANK_2K_Color.jpeg");
            const normalTexture = loader.load("resources/textures/PLANK_2K_Normal.jpeg")
            const roughnessTexture = loader.load("resources/textures/PLANK_2K_Roughness.jpeg")
            material = new THREE.MeshStandardMaterial({map: mapTexture, normalMap: normalTexture, roughnessMap: roughnessTexture});
        }

        this.object = new THREE.Mesh(new THREE.BufferGeometry(), material);

        this.object.name = "Rectangle"

        // Undefined Prevention
        this._isGeometryReloadNeeded = false;
        this._width = 200;
        this._depth = 1200;
        this._rotationY = 0

        this._height = 30;
        this._cornerRadius = CornerRadius.zero
        this._geometryNeedsReload()
    }
    
    render(time) {
        if (this._isGeometryReloadNeeded) {
            this._geometryReload()
        }
    }

    _geometryNeedsReload() {
        this._isGeometryReloadNeeded = true;
    }

    _geometryReload() {
        this._isGeometryReloadNeeded = false;
        // NOT A GOOD EXAMPLE OF HOW TO MAKE A CUBE!
        // Only trying to make it clear most vertices are unique

        var vertices;
        const width = this._width;
        const depth = this._depth;
        const height = this._height

        const newGeometry = new THREE.BufferGeometry();
        if (this._cornerRadius.isZero()) {
            vertices = [
                // back
                { pos: [0, 0, depth], norm: [0, 0, 1], uv: [0, 1], }, // 0
                { pos: [width, 0, depth], norm: [0, 0, 1], uv: [1, 1], }, // 1
                { pos: [0, height, depth], norm: [0, 0, 1], uv: [0, 0], }, // 2
                { pos: [width, height, depth], norm: [0, 0, 1], uv: [1, 0], }, // 3
                // right
                { pos: [width, 0, depth], norm: [1, 0, 0], uv: [0, 1], }, // 4
                { pos: [width, 0, 0], norm: [1, 0, 0], uv: [1, 1], }, // 5
                { pos: [width, height, depth], norm: [1, 0, 0], uv: [0, 0], }, // 6
                { pos: [width, height, 0], norm: [1, 0, 0], uv: [1, 0], }, // 7
                // front
                { pos: [width, 0, 0], norm: [0, 0, -1], uv: [0, 1], }, // 8
                { pos: [0, 0, 0], norm: [0, 0, -1], uv: [1, 1], }, // 9
                { pos: [width, height, 0], norm: [0, 0, -1], uv: [0, 0], }, // 10
                { pos: [0, height, 0], norm: [0, 0, -1], uv: [1, 0], }, // 11
                // left
                { pos: [0, 0, 0], norm: [-1, 0, 0], uv: [0, 1], }, // 12
                { pos: [0, 0, depth], norm: [-1, 0, 0], uv: [1, 1], }, // 13
                { pos: [0, height, 0], norm: [-1, 0, 0], uv: [0, 0], }, // 14
                { pos: [0, height, depth], norm: [-1, 0, 0], uv: [1, 0], }, // 15
                // top
                { pos: [width, height, 0], norm: [0, 1, 0], uv: [0, 1], }, // 16
                { pos: [0, height, 0], norm: [0, 1, 0], uv: [1, 1], }, // 17
                { pos: [width, height, depth], norm: [0, 1, 0], uv: [0, 0], }, // 18
                { pos: [0, height, depth], norm: [0, 1, 0], uv: [1, 0], }, // 19
                // bottom
                { pos: [width, 0, depth], norm: [0, -1, 0], uv: [0, 1], }, // 20
                { pos: [0, 0, depth], norm: [0, -1, 0], uv: [1, 1], }, // 21
                { pos: [width, 0, 0], norm: [0, -1, 0], uv: [0, 0], }, // 22
                { pos: [0, 0, 0], norm: [0, -1, 0], uv: [1, 0], }, // 23
            ];

            const numVertices = vertices.length;
            const positionNumComponents = 3;
            const normalNumComponents = 3;
            const uvNumComponents = 2;
            const positions = new Float32Array(numVertices * positionNumComponents);
            const normals = new Float32Array(numVertices * normalNumComponents);
            const uvs = new Float32Array(numVertices * uvNumComponents);
            let posNdx = 0;
            let nrmNdx = 0;
            let uvNdx = 0;
            for (const vertex of vertices) {
                positions.set(vertex.pos, posNdx);
                normals.set(vertex.norm, nrmNdx);
                uvs.set(vertex.uv, uvNdx);
                posNdx += positionNumComponents;
                nrmNdx += normalNumComponents;
                uvNdx += uvNumComponents;
            }
    
            newGeometry.setAttribute(
                'position',
                new THREE.BufferAttribute(positions, positionNumComponents));
            newGeometry.setAttribute(
                'normal',
                new THREE.BufferAttribute(normals, normalNumComponents));
            newGeometry.setAttribute(
                'uv',
                new THREE.BufferAttribute(uvs, uvNumComponents));
    
            newGeometry.setIndex([
                0, 1, 2, 2, 1, 3,  // front
                4, 5, 6, 6, 5, 7,  // right
                8, 9, 10, 10, 9, 11,  // back
                12, 13, 14, 14, 13, 15,  // left
                16, 17, 18, 18, 17, 19,  // top
                20, 21, 22, 22, 21, 23,  // bottom
            ]);
        } else {
            var r = this.cornerRadius

            var backMaxX = width - r.bottomRight
            var frontMaxX = width - r.topRight
            var rightMaxDepth = depth - r.bottomRight
            var leftMaxDepth = depth - r.bottomLeft

            var segmentBoxWidth = Math.min(width, depth) / 2;
            var segmentBoxDepth = Math.min(segmentBoxWidth, segmentBoxWidth);
            var topBottomMaxDepth = depth - segmentBoxDepth

            // True means rectangle, false means triangle
            var shapes = [true, true, true, true, true, true]

            vertices = [
                // back
                { pos: [r.bottomLeft, 0, depth], norm: [0, 0, 1], uv: [0, 1], }, // 0
                { pos: [backMaxX, 0, depth], norm: [0, 0, 1], uv: [1, 1], }, // 1
                { pos: [r.bottomLeft, height, depth], norm: [0, 0, 1], uv: [0, 0], }, // 2
                { pos: [backMaxX, height, depth], norm: [0, 0, 1], uv: [1, 0], }, // 3
                // right
                { pos: [width, 0, rightMaxDepth], norm: [1, 0, 0], uv: [0, 1], }, // 4
                { pos: [width, 0, r.topRight], norm: [1, 0, 0], uv: [1, 1], }, // 5
                { pos: [width, height, rightMaxDepth], norm: [1, 0, 0], uv: [0, 0], }, // 6
                { pos: [width, height, r.topRight], norm: [1, 0, 0], uv: [1, 0], }, // 7
                // front
                { pos: [frontMaxX, 0, 0], norm: [0, 0, -1], uv: [0, 1], }, // 8
                { pos: [r.topLeft, 0, 0], norm: [0, 0, -1], uv: [1, 1], }, // 9
                { pos: [frontMaxX, height, 0], norm: [0, 0, -1], uv: [0, 0], }, // 10
                { pos: [r.topLeft, height, 0], norm: [0, 0, -1], uv: [1, 0], }, // 11
                // left
                { pos: [0, 0, r.topLeft], norm: [-1, 0, 0], uv: [0, 1], }, // 12
                { pos: [0, 0, leftMaxDepth], norm: [-1, 0, 0], uv: [1, 1], }, // 13
                { pos: [0, height, r.topLeft], norm: [-1, 0, 0], uv: [0, 0], }, // 14
                { pos: [0, height, leftMaxDepth], norm: [-1, 0, 0], uv: [1, 0], }, // 15
                // top
                { pos: [width, height, segmentBoxWidth], norm: [0, 1, 0], uv: [0, 1], }, // 16
                { pos: [0, height, segmentBoxWidth], norm: [0, 1, 0], uv: [1, 1], }, // 17
                { pos: [width, height, topBottomMaxDepth], norm: [0, 1, 0], uv: [0, 0], }, // 18
                { pos: [0, height, topBottomMaxDepth], norm: [0, 1, 0], uv: [1, 0], }, // 19
                // bottom
                { pos: [width, 0, topBottomMaxDepth], norm: [0, -1, 0], uv: [0, 1], }, // 20
                { pos: [0, 0, topBottomMaxDepth], norm: [0, -1, 0], uv: [1, 1], }, // 21
                { pos: [width, 0, segmentBoxWidth], norm: [0, -1, 0], uv: [0, 0], }, // 22
                { pos: [0, 0, segmentBoxWidth], norm: [0, -1, 0], uv: [1, 0], }, // 23
            ];


            function addTBRectangle({x1, y1, x2, y2, x3, y3, x4, y4}) {
                shapes.push(true)
                shapes.push(true)
                vertices = vertices.concat([
                    // top 
                    { pos: [x1, height, y1], norm: [0, 1, 0], uv: [0, 1], }, 
                    { pos: [x2, height, y2], norm: [0, 1, 0], uv: [1, 1], },
                    { pos: [x3, height, y3], norm: [0, 1, 0], uv: [0, 0], },
                    { pos: [x4, height, y4], norm: [0, 1, 0], uv: [1, 0], },
                    
                    // bottom
                    { pos: [x3, 0, y3], norm: [0, -1, 0], uv: [0, 1], }, 
                    { pos: [x4, 0, y4], norm: [0, -1, 0], uv: [1, 1], },
                    { pos: [x1, 0, y1], norm: [0, -1, 0], uv: [0, 0], },
                    { pos: [x2, 0, y2], norm: [0, -1, 0], uv: [1, 0], }
                ])
            }
            
            // Back Right (bottom right corner radius)
            if (this._cornerRadius.bottomRight != 0) {
                shapes.push(true)
                vertices = vertices.concat([
                    { pos: [backMaxX, 0, depth], norm: [0, 0, 1], uv: [0, 1], }, // 0
                    { pos: [width, 0, rightMaxDepth], norm: [0, 0, 1], uv: [1, 1], }, // 1
                    { pos: [backMaxX, height, depth], norm: [0, 0, 1], uv: [0, 0], }, // 2
                    { pos: [width, height, rightMaxDepth], norm: [0, 0, 1], uv: [1, 0], }, // 3
                ])
                addTBRectangle({
                    x1: width, y1: topBottomMaxDepth,
                    x2: width - segmentBoxWidth, y2: topBottomMaxDepth,
                    x3: width, y3: rightMaxDepth,
                    x4: width - segmentBoxWidth, y4: rightMaxDepth
                })

                addTBRectangle({
                    x1: width, y1: rightMaxDepth,
                    x2: width - segmentBoxWidth, y2: rightMaxDepth,
                    x3: width - r.bottomRight, y3: depth,
                    x4: width - segmentBoxWidth, y4: depth
                })
            } else {
                addTBRectangle({
                    x1: width, y1: topBottomMaxDepth,
                    x2: segmentBoxWidth, y2: topBottomMaxDepth,
                    x3: width, y3: depth,
                    x4: segmentBoxWidth, y4: depth
                })
            }
            // Back Left (bottom left corner radius)
            if (this._cornerRadius.bottomLeft != 0) {
                shapes.push(true)
                vertices = vertices.concat([
                    { pos: [0, 0, leftMaxDepth], norm: [0, 0, 1], uv: [0, 1], }, // 0
                    { pos: [r.bottomLeft, 0, depth], norm: [0, 0, 1], uv: [1, 1], }, // 1
                    { pos: [0, height, leftMaxDepth], norm: [0, 0, 1], uv: [0, 0], }, // 2
                    { pos: [r.bottomLeft, height, depth], norm: [0, 0, 1], uv: [1, 0], }, // 3
                ])
                addTBRectangle({
                    x1: segmentBoxWidth, y1: topBottomMaxDepth,
                    x2: 0, y2: topBottomMaxDepth,
                    x3: segmentBoxWidth, y3: leftMaxDepth,
                    x4: 0, y4: leftMaxDepth
                })
                addTBRectangle({
                    x1: segmentBoxWidth, y1: leftMaxDepth,
                    x2: 0, y2: leftMaxDepth,
                    x3: segmentBoxWidth, y3: depth,
                    x4: r.bottomLeft, y4: depth
                })
            } else {
                addTBRectangle({
                    x1: segmentBoxWidth, y1: topBottomMaxDepth,
                    x2: 0, y2: topBottomMaxDepth,
                    x3: segmentBoxWidth, y3: depth,
                    x4: 0, y4: depth
                })
            }

            // Front Left (top left corner radius)
            if (this._cornerRadius.topLeft != 0) {
                shapes.push(true)
                vertices = vertices.concat([
                    { pos: [r.topLeft, 0, 0], norm: [0, 0, -1], uv: [0, 1], }, // 8
                    { pos: [0, 0, r.topLeft], norm: [0, 0, -1], uv: [1, 1], }, // 9
                    { pos: [r.topLeft, height, 0], norm: [0, 0, -1], uv: [0, 0], }, // 10
                    { pos: [0, height, r.topLeft], norm: [0, 0, -1], uv: [1, 0], }, // 11
                ])
                addTBRectangle({
                    x1: segmentBoxWidth, y1: r.topLeft,
                    x2: 0, y2: r.topLeft,
                    x3: segmentBoxWidth, y3: segmentBoxDepth,
                    x4: 0, y4: segmentBoxDepth
                }) 
                addTBRectangle({
                    x1: segmentBoxWidth, y1: 0,
                    x2: r.topLeft, y2: 0,
                    x3: segmentBoxWidth, y3: r.topLeft,
                    x4: 0, y4: r.topLeft
                })
            } else {
                addTBRectangle({
                    x1: segmentBoxWidth, y1: 0,
                    x2: 0, y2: 0,
                    x3: segmentBoxWidth, y3: segmentBoxDepth,
                    x4: 0, y4: segmentBoxDepth
                })
            }

             // Front right (top right corner radius)
             if (this._cornerRadius.topRight != 0) {
                shapes.push(true)
                vertices = vertices.concat([
                    { pos: [width, 0, r.topRight], norm: [0, 0, -1], uv: [0, 1], }, // 8
                    { pos: [frontMaxX, 0, 0], norm: [0, 0, -1], uv: [1, 1], }, // 9
                    { pos: [width, height, r.topRight], norm: [0, 0, -1], uv: [0, 0], }, // 10
                    { pos: [frontMaxX, height, 0], norm: [0, 0, -1], uv: [1, 0], }, // 11
                ])
                addTBRectangle({
                    x1: width, y1: r.topRight,
                    x2: segmentBoxWidth, y2: r.topRight,
                    x3: width, y3: segmentBoxDepth,
                    x4: segmentBoxWidth, y4: segmentBoxDepth
                }) 
                addTBRectangle({
                    x1: frontMaxX, y1: 0,
                    x2: segmentBoxWidth, y2: 0,
                    x3: width, y3: r.topRight,
                    x4: segmentBoxWidth, y4: r.topRight
                }) 
            } else {
                addTBRectangle({
                    x1: width, y1: 0,
                    x2: segmentBoxWidth, y2: 0,
                    x3: width, y3: segmentBoxDepth,
                    x4: segmentBoxWidth, y4: segmentBoxDepth
                })
            }

            const numVertices = vertices.length;
            const positionNumComponents = 3;
            const normalNumComponents = 3;
            const uvNumComponents = 2;
            const positions = new Float32Array(numVertices * positionNumComponents);
            const normals = new Float32Array(numVertices * normalNumComponents);
            const uvs = new Float32Array(numVertices * uvNumComponents);
            let posNdx = 0;
            let nrmNdx = 0;
            let uvNdx = 0;
            for (const vertex of vertices) {
                positions.set(vertex.pos, posNdx);
                normals.set(vertex.norm, nrmNdx);
                uvs.set(vertex.uv, uvNdx);
                posNdx += positionNumComponents;
                nrmNdx += normalNumComponents;
                uvNdx += uvNumComponents;
            }
    
            newGeometry.setAttribute('position', new THREE.BufferAttribute(positions, positionNumComponents));
            newGeometry.setAttribute('normal', new THREE.BufferAttribute(normals, normalNumComponents));
            newGeometry.setAttribute('uv', new THREE.BufferAttribute(uvs, uvNumComponents));
            
            var newIndex = []
            var lastIndex = -1
            for (const isRectangle of shapes) {
                if (isRectangle) {
                    var indexTwo = lastIndex + 2
                    var indexThree = lastIndex + 3
                    var newLastIndex = lastIndex + 4
                    newIndex = newIndex.concat([lastIndex + 1, indexTwo, indexThree, indexThree, indexTwo, newLastIndex])
                    lastIndex = newLastIndex;
                } else {
                    var newLastIndex = lastIndex + 3
                    newIndex = newIndex.concat([lastIndex + 1, lastIndex + 2, newLastIndex])
                    lastIndex = newLastIndex;
                }
            }
            newGeometry.setIndex(newIndex);
            newGeometry.computeFaceNormals();
            newGeometry.computeVertexNormals();
        }
        this.object.geometry = newGeometry

        if (this._showGrid) {
            if (this._wireframe !== undefined) {
                objectRemoveFromParent(this._wireframe)
            } 
            // wireframe
            const wireframeGeometry = new THREE.WireframeGeometry(this.object.geometry);
            const wireframeMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 1.5});
            this._wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
            this.object.add(this._wireframe);
        }

    }

}