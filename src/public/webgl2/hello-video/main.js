document.addEventListener('DOMContentLoaded', start);


function createCube() {

    var cube = {};


    cube.vertexShader = getAndCompileShader('vertexShader', 'vertex');
    cube.fragmentShader = getAndCompileShader('fragmentShader', 'fragment');

    cube.shaderProgram = gl.createProgram();
    gl.attachShader(cube.shaderProgram, cube.vertexShader);
    gl.attachShader(cube.shaderProgram, cube.fragmentShader);
    gl.linkProgram(cube.shaderProgram);

    if (!gl.getProgramParameter(cube.shaderProgram, gl.LINK_STATUS)) {
        console.log('Could not link shaders');
    }

    gl.useProgram(cube.shaderProgram);


    cube.vertices = [
        -1, -1, 0,  //0
         1, -1, 0,   //1
         1,  1, 0,    //2
        -1,  1, 0,   //3
    ];
    cube.numVertices = cube.vertices.length / 3;
    cube.indices = [0,1,2,0,2,3];

    cube.colors = [
        1,0,0,1,
        0,1,0,1,
        0,0,1,1,
        1,1,0,1,
    ];

    cube.textureCoordinates = [
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
    ];

    cube.vertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cube.vertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cube.vertices), gl.STATIC_DRAW);

    cube.vertexColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cube.vertexColorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cube.colors), gl.STATIC_DRAW);

    cube.textureCoordinatesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cube.textureCoordinatesBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cube.textureCoordinates), gl.STATIC_DRAW);

    cube.vertexIndicesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cube.vertexIndicesBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cube.indices), gl.STATIC_DRAW);

    cube.texture0 = gl.createTexture();
    cube.imageLoaded = 0;
    var image = new Image();
    image.src = 'vincent.jpg';
    image.addEventListener('load', function(e) {
        var canvas = document.createElement('canvas');
        canvas.width = canvas.height = 8192;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(e.target, 0, 0);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, cube.texture0);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB, gl.RGB,gl.UNSIGNED_BYTE,canvas);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        cube.samplerUniformLocation0 = gl.getUniformLocation(cube.shaderProgram, "sampler0");
        gl.uniform1i(cube.samplerUniformLocation0, 0);
        cube.imageLoaded ++;
    });

    cube.texture1 = gl.createTexture();
    var image2 = new Image();
    image2.src = 'dobuki.png';
    image2.addEventListener('load', function(e) {
        var canvas = document.createElement('canvas');
        canvas.width = canvas.height = 128;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(e.target, 0, 0);

        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, cube.texture1);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB, gl.RGB,gl.UNSIGNED_BYTE,canvas);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        cube.samplerUniformLocation1 = gl.getUniformLocation(cube.shaderProgram, "sampler1");
        gl.uniform1i(cube.samplerUniformLocation1, 1);
        cube.imageLoaded ++;
    });




    cube.positionAttributeLocation = gl.getAttribLocation(cube.shaderProgram, 'position');
    gl.enableVertexAttribArray(cube.positionAttributeLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, cube.vertexPositionBuffer);
    gl.vertexAttribPointer(cube.positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);

    cube.colorAttributeLocation = gl.getAttribLocation(cube.shaderProgram, "color");
    gl.enableVertexAttribArray(cube.colorAttributeLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, cube.vertexColorBuffer);
    gl.vertexAttribPointer(cube.colorAttributeLocation, 4, gl.FLOAT, false, 0, 0);

    cube.textureCoordinateAttributeLocation = gl.getAttribLocation(cube.shaderProgram, 'textureCoordinate');
    gl.enableVertexAttribArray(cube.textureCoordinateAttributeLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, cube.textureCoordinatesBuffer);
    gl.vertexAttribPointer(cube.textureCoordinateAttributeLocation, 2, gl.FLOAT, false, 0, 0);


    cube.modelMatrix = mat4.create();
    cube.modelMatrixLocation = gl.getUniformLocation(cube.shaderProgram, "modelMatrix");


    return cube;
}

var videoUpdated = false;

function prepareVideoCanvas() {
    var v = document.getElementById('v');
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
//    document.body.appendChild(canvas);
    v.addEventListener( "loadedmetadata", function (e) {
//        canvas.width = this.videoWidth;
//        canvas.height = this.videoHeight;
    }, false );
    v.addEventListener('timeupdate', function(e) {
        videoUpdated = true;
    });
//    canvas.width = 480; canvas.height = 360;
    canvas.width = 4800; canvas.height = 3600;
    return canvas;
}


var gl;
function start() {
    var videoCanvas = prepareVideoCanvas();
    var videoContext = videoCanvas.getContext('2d');
    function refreshVideo(videoContext) {
        videoContext.drawImage(v,0,0,480,360,0,0,4800,3600);
        gl.bindTexture(gl.TEXTURE_2D, cube.texture1);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB, gl.RGB,gl.UNSIGNED_BYTE,videoCanvas);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }




    requestAnimationFrame(runRenderLoop);

    var status = document.getElementById('status');
    status.innerText = "HELLO CUBE";

    var canvas = document.getElementById('canvas');
    gl = canvas.getContext('webgl2');

    var viewWidth = canvas.width, viewHeight = canvas.height;
    window.addEventListener('resize', function() {
        var canvas = document.getElementById('canvas');
        var width = canvas.offsetWidth, height = canvas.offsetHeight;
        viewWidth = width * 2;
        viewHeight = height * 2;
    });


    var cube = createCube();

    var viewMatrix = mat4.create();
    var projectionMatrix = mat4.create();

    var projectionMatrixLocation = gl.getUniformLocation(cube.shaderProgram, "projectionMatrix");
    var ratio = canvas.width / canvas.height;
//*
    mat4.perspective(projectionMatrix,
        45*Math.PI/180.0,
        ratio,
        0.1, 10
    );
    /*/
    var screenWidth = 1; var screenHeight = screenWidth / ratio;
    mat4.ortho(projectionMatrix,
        -screenWidth/2, screenWidth/2,
        -screenHeight/2, screenHeight/2,
        0.1, 10
    );
//*/

    var viewMatrixLocation = gl.getUniformLocation(cube.shaderProgram, "viewMatrix");
    gl.uniformMatrix4fv(projectionMatrixLocation, false, projectionMatrix);
    gl.uniformMatrix4fv(viewMatrixLocation, false, viewMatrix);


    var angle = 0;
    var fps = 30;
    var period = 1000 / fps;
    var lastTime = 0;

    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    function runRenderLoop(time) {
        requestAnimationFrame(runRenderLoop);
        if(time - lastTime < period && !videoUpdated) {
            return;
        }

        lastTime += period;
        if(cube.imageLoaded < 2) {
            return;
        }

        gl.clearColor(.5,0,0,1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        angle = time / 500;

        mat4.identity(cube.modelMatrix);
        mat4.translate(cube.modelMatrix, cube.modelMatrix, [-2/8, 0, -1]);
        mat4.rotateY(cube.modelMatrix, cube.modelMatrix, angle);
        mat4.scale(cube.modelMatrix, cube.modelMatrix, [1/8, 1/8, 1/8]);
//        mat4.rotateX(cube.modelMatrix, cube.modelMatrix, .25);
        gl.uniformMatrix4fv(cube.modelMatrixLocation, false, cube.modelMatrix);
        gl.drawElements(gl.TRIANGLES, cube.indices.length, gl.UNSIGNED_SHORT, 0);

        mat4.identity(cube.modelMatrix);
        mat4.translate(cube.modelMatrix, cube.modelMatrix, [0, 0, -1]);
        mat4.rotateY(cube.modelMatrix, cube.modelMatrix, angle);
//        mat4.rotateX(cube.modelMatrix, cube.modelMatrix, .25);
        mat4.scale(cube.modelMatrix, cube.modelMatrix, [1/8, 1/8, 1/8]);
        gl.uniformMatrix4fv(cube.modelMatrixLocation, false, cube.modelMatrix);
        gl.drawElements(gl.TRIANGLES, cube.indices.length, gl.UNSIGNED_SHORT, 0);

        mat4.identity(cube.modelMatrix);
        mat4.translate(cube.modelMatrix, cube.modelMatrix, [2/8, 0, -1]);
        mat4.rotateY(cube.modelMatrix, cube.modelMatrix, angle);
//        mat4.rotateX(cube.modelMatrix, cube.modelMatrix, .25);
        mat4.scale(cube.modelMatrix, cube.modelMatrix, [1/8, 1/8, 1/8]);
        gl.uniformMatrix4fv(cube.modelMatrixLocation, false, cube.modelMatrix);
        gl.drawElements(gl.TRIANGLES, cube.indices.length, gl.UNSIGNED_SHORT, 0);

        refreshVideo(videoContext);
        videoUpdated = false;
    }

    console.log('Started.');
}

function getAndCompileShader(id, shaderType) {
    var shader;
    var shaderElement = document.getElementById(id);
    var shaderText = shaderElement.text.trim();
    shader = gl.createShader(
        shaderType==='vertex' ? gl.VERTEX_SHADER : gl.FRAGMENT_SHADER
    );
    gl.shaderSource(shader, shaderText);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.log(gl.getShaderInfoLog(shader));
        return true;
    }
    console.log('Shader ' + id + ' compiled.')
    return shader;
}