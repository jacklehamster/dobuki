document.addEventListener('DOMContentLoaded', start);

function createCube() {

    var cube = {};
    cube.vertices = [
        -0.5, -0.5, -0.5,
        0.5, -0.5, -0.5,
        0.5, 0.5, -0.5,
        0.5, 0.5, -0.5,
        -0.5, 0.5, -0.5,
        -0.5, -0.5, -0.5,

        -0.5, -0.5, 0.5,
        0.5, -0.5, 0.5,
        0.5, 0.5, 0.5,
        0.5, 0.5, 0.5,
        -0.5, 0.5, 0.5,
        -0.5, -0.5, 0.5,

        -0.5, 0.5, 0.5,
        -0.5, 0.5, -0.5,
        -0.5, -0.5, -0.5,
        -0.5, -0.5, -0.5,
        -0.5, -0.5, 0.5,
        -0.5, 0.5, 0.5,

        0.5, 0.5, 0.5,
        0.5, 0.5, -0.5,
        0.5, -0.5, -0.5,
        0.5, -0.5, -0.5,
        0.5, -0.5, 0.5,
        0.5, 0.5, 0.5,

        -0.5, -0.5, -0.5,
        0.5, -0.5, -0.5,
        0.5, -0.5, 0.5,
        0.5, -0.5, 0.5,
        -0.5, -0.5, 0.5,
        -0.5, -0.5, -0.5,

        -0.5, 0.5, -0.5,
        0.5, 0.5, -0.5,
        0.5, 0.5, 0.5,
        0.5, 0.5, 0.5,
        -0.5, 0.5, 0.5,
        -0.5, 0.5, -0.5,
    ];
    cube.numVertices = cube.vertices.length / 3;

    cube.vertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cube.vertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,
        new Float32Array(cube.vertices),
        gl.STATIC_DRAW
    );
    var faceColors = [
        [1.0, 0.0, 0.0, 1.0],   //  front face
        [0.0, 1.0, 0.0, 1.0],   //  back face
        [0.0, 0.0, 1.0, 1.0],   //  top face
        [1.0, 1.0, 0.0, 1.0],   //  bottom face
        [1.0, 0.0, 1.0, 1.0],   //  right face
        [0.0, 1.0, 1.0, 1.0],   //  left face
    ];



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

    cube.vao = gl.createVertexArray();
    gl.bindVertexArray(cube.vao);

    cube.positionAttributeLocation = gl.getAttribLocation(cube.shaderProgram, 'position');
    gl.enableVertexAttribArray(cube.positionAttributeLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, cube.vertexPositionBuffer);
    gl.vertexAttribPointer(cube.positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);

    cube.modelMatrix = mat4.create();
    cube.modelMatrixLocation = gl.getUniformLocation(cube.shaderProgram, "modelMatrix");

    return cube;
}


var gl;
function start() {
    var status = document.getElementById('status');
    status.innerText = "HELLO CUBE";

    var canvas = document.getElementById('canvas');
    gl = canvas.getContext('webgl2');

    var cube = createCube();

    var offsetsVector = vec3.fromValues(-2,0,2);

    var viewMatrix = mat4.create();
    var projectionMatrix = mat4.create();
    console.log(viewMatrix);


    var projectionMatrixLocation = gl.getUniformLocation(cube.shaderProgram, "projectionMatrix");
    mat4.perspective(
        projectionMatrix,
        45*Math.PI/180.0,
        canvas.width / canvas.height,
        0.1, 10
    );

    var viewMatrixLocation = gl.getUniformLocation(cube.shaderProgram, "viewMatrix");
    gl.uniformMatrix4fv(projectionMatrixLocation, false, projectionMatrix);
    gl.uniformMatrix4fv(viewMatrixLocation, false, viewMatrix);

    var offsetUniformLocation = gl.getUniformLocation(cube.shaderProgram, "offsets");

    var angle = 0;

    requestAnimationFrame(runRenderLoop);


    gl.clearColor(.5,0,0,1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);

    mat4.identity(cube.modelMatrix);
    mat4.translate(cube.modelMatrix, cube.modelMatrix, [0, 0, -7]);
    mat4.rotateY(cube.modelMatrix, cube.modelMatrix, angle);
    mat4.rotateX(cube.modelMatrix, cube.modelMatrix, .25);
//        angle += .1;
    gl.uniformMatrix4fv(cube.modelMatrixLocation, false, cube.modelMatrix);

    gl.uniform3fv(offsetUniformLocation, offsetsVector);

    gl.useProgram(cube.shaderProgram);
    gl.bindVertexArray(cube.vao);


    function runRenderLoop() {
        gl.drawArraysInstanced(gl.TRIANGLES, 0, cube.numVertices, 3);
        setTimeout(function() {
            gl.clearColor(.5,0,0,1);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            gl.enable(gl.DEPTH_TEST);
            gl.drawArraysInstanced(gl.TRIANGLES, 0, cube.numVertices, 3);
        }, 3000);

/*
        mat4.identity(cube.modelMatrix);
        mat4.translate(cube.modelMatrix, cube.modelMatrix, [0, 0, -7]);
        mat4.rotateY(cube.modelMatrix, cube.modelMatrix, angle);
        mat4.rotateX(cube.modelMatrix, cube.modelMatrix, .25);
        angle += .1;
        gl.uniformMatrix4fv(cube.modelMatrixLocation, false, cube.modelMatrix);
        gl.useProgram(cube.shaderProgram);
        gl.bindVertexArray(cube.vao);
        gl.drawArrays(gl.TRIANGLES, 0, cube.numVertices);

        mat4.identity(cube.modelMatrix);
        mat4.translate(cube.modelMatrix, cube.modelMatrix, [2, 0, -7]);
        mat4.rotateY(cube.modelMatrix, cube.modelMatrix, angle);
        mat4.rotateX(cube.modelMatrix, cube.modelMatrix, .25);
        angle += .1;
        gl.uniformMatrix4fv(cube.modelMatrixLocation, false, cube.modelMatrix);
        gl.useProgram(cube.shaderProgram);
        gl.bindVertexArray(cube.vao);
        gl.drawArrays(gl.TRIANGLES, 0, cube.numVertices);
*/
//        requestAnimationFrame(runRenderLoop);
    }

    console.log('Started.');
}

function getAndCompileShader(id, shaderType) {
    var shader;
    var shaderElement = document.getElementById(id);
    var shaderText = shaderElement.text.trim();
    shader = gl.createShader(
        shaderType==='vertex'
            ?gl.VERTEX_SHADER
            :gl.FRAGMENT_SHADER
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