document.addEventListener('DOMContentLoaded', start);

function createCube(count) {

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

    if(count) {
        var array = [];
        for(var i=0; i<count; i++) {
            cube.vertices.forEach(function(a) {
                array.push(a);
            });
        }
        cube.vertices = array;
    }
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

    cube.colors = [];
    faceColors.forEach(function(colorRow) {
        for(var i=0; i<6; i++) {
            cube.colors = cube.colors.concat(colorRow);
        }
    });


    cube.vertexColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cube.vertexColorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cube.colors), gl.STATIC_DRAW);


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
/*
    cube.colorAttributeLocation = gl.getAttribLocation(cube.shaderProgram, 'color');
    gl.enableVertexAttribArray(cube.colorAttributeLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, cube.vertexColorBuffer);
    gl.vertexAttribPointer(cube.colorAttributeLocation, 4, gl.FLOAT, false, 0, 0);
*/
    cube.modelMatrix = mat4.create();
    cube.modelMatrixLocation = gl.getUniformLocation(cube.shaderProgram, "modelMatrix");

    return cube;
}


var gl;
function start() {
    var numElems = 500;
    var status = document.getElementById('status');
    status.innerText = "HELLO CUBE";

    var canvas = document.getElementById('canvas');
    gl = canvas.getContext('webgl2');

    var cube = createCube(numElems);

    var uniformColorsArray = [
        vec4.fromValues(1, 0, 0, 1),
        vec4.fromValues(0, 1, 0, 1),
        vec4.fromValues(0, 0, 1, 1),
    ];

    var offsetsVector = vec3.fromValues(-2,0,2);

//    const FLOAT_SIZE = 4;
//    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionAndColorBuffer);
//    gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 7*FLOAT_SIZE, 0);
//    gl.vertexAttribPointer(colorAttributeLocation, 4, gl.FLOAT, false, 7*FLOAT_SIZE, 3*FLOAT_SIZE);

    /*
    gl.useProgram(secondProgram);
    var vao2 = gl.createVertexArray();
    gl.bindVertexArray(vao2)

     */

    var viewMatrix = mat4.create();
    var projectionMatrix = mat4.create();

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

    var colorsUniformArrayLocation0 = gl.getUniformLocation(cube.shaderProgram, "colorsUniformArray[0]");
    var colorsUniformArrayLocation1 = gl.getUniformLocation(cube.shaderProgram, "colorsUniformArray[1]");
    var colorsUniformArrayLocation2 = gl.getUniformLocation(cube.shaderProgram, "colorsUniformArray[2]");

    var offsetUniformLocation = gl.getUniformLocation(cube.shaderProgram, "offsets");

    var angle = 0;
    gl.uniform4fv(colorsUniformArrayLocation0, uniformColorsArray[0]);
    gl.uniform4fv(colorsUniformArrayLocation1, uniformColorsArray[1]);
    gl.uniform4fv(colorsUniformArrayLocation2, uniformColorsArray[2]);

    requestAnimationFrame(runRenderLoop);



    mat4.identity(cube.modelMatrix);
    mat4.translate(cube.modelMatrix, cube.modelMatrix, [0, 0, -7]);
    mat4.rotateY(cube.modelMatrix, cube.modelMatrix, angle);
    mat4.rotateX(cube.modelMatrix, cube.modelMatrix, .25);
//        angle += .1;
    gl.uniformMatrix4fv(cube.modelMatrixLocation, false, cube.modelMatrix);

    gl.uniform3fv(offsetUniformLocation, offsetsVector);




    var count = 0;
    var start = 0;
    function runRenderLoop() {
        count++;
        if(Date.now() > start+1000) {
            var fps = 1000*count / (Date.now() - start);

            status.innerText = numElems + ' / ' + fps.toFixed(2);
            start = Date.now();
            count = 0;
        }

        gl.clearColor(.5,0,0,1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.enable(gl.DEPTH_TEST);
/*
        gl.drawArraysInstanced(gl.TRIANGLES, 0, cube.numVertices, 3);
        setTimeout(function() {
            gl.clearColor(.5,0,0,1);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            gl.enable(gl.DEPTH_TEST);
            gl.drawArraysInstanced(gl.TRIANGLES, 0, cube.numVertices, 3);
        }, 3000);
/*/
        angle += .1;

        mat4.identity(cube.modelMatrix);
        mat4.translate(cube.modelMatrix, cube.modelMatrix, [rand(-5,5), rand(-5,5), -7]);
        mat4.rotateY(cube.modelMatrix, cube.modelMatrix, angle);
        mat4.rotateX(cube.modelMatrix, cube.modelMatrix, .25);
        gl.uniformMatrix4fv(cube.modelMatrixLocation, false, cube.modelMatrix);

//        for(var i=0; i<numElems; i++) {
            gl.drawArrays(gl.TRIANGLES, 0, cube.numVertices);
//        }

        requestAnimationFrame(runRenderLoop);
        //*/
    }

    console.log('Started.');
}

function rand(num1, num2) {
    var range = Math.abs(num1-num2);
    var val = Math.random()*range;
    return num1<num2 ? num1 + val : num2 + val;
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