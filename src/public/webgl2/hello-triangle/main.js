document.addEventListener('DOMContentLoaded', start);

var gl;
function start() {
    var canvas = document.getElementById('canvas');
    gl = canvas.getContext('webgl2');

    var triangleVertices = [
//        .25, .25, 0.25,
        1.0, -1.0, 0.0,
        0.0, 1.0, 0.0,
        -1.0, -1.0, 0.0
    ];

    var triangleVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,
        new Float32Array(triangleVertices),
        gl.STATIC_DRAW
    );

    var triangleColors = [
        1.0, 0.0, 0.0, 1.0,
        0.0, 1.0, 0.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
    ];
    var triangleVertexColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexColorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleColors), gl.STATIC_DRAW);

    var trianglePositionAndColors = [
        1.0, -1.0, 0.0, 1.0, 0.0, 0.0, 1.0,
        0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0,
        -1.0, -1.0, 0.0, 0.0, 0.0, 1.0, 1.0,
    ];
    var triangleVertexPositionAndColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionAndColorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,
        new Float32Array(trianglePositionAndColors),
        gl.STATIC_DRAW
    );



    var vertexShader = getAndCompileShader('vertexShader', 'vertex');
    var fragmentShader = getAndCompileShader('fragmentShader', 'fragment');

    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.log('Could not link shaders');
    }

    gl.useProgram(shaderProgram);

    var vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    var positionAttributeLocation = gl.getAttribLocation(shaderProgram, 'position');
    gl.enableVertexAttribArray(positionAttributeLocation);
//    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionBuffer);
//    gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);

    var colorAttributeLocation = gl.getAttribLocation(shaderProgram, 'color');
    gl.enableVertexAttribArray(colorAttributeLocation);
//    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexColorBuffer);
//    gl.vertexAttribPointer(colorAttributeLocation, 4, gl.FLOAT, false, 0, 0);

    const FLOAT_SIZE = 4;
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionAndColorBuffer);
    gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 7*FLOAT_SIZE, 0);
    gl.vertexAttribPointer(colorAttributeLocation, 4, gl.FLOAT, false, 7*FLOAT_SIZE, 3*FLOAT_SIZE);

    /*
    gl.useProgram(secondProgram);
    var vao2 = gl.createVertexArray();
    gl.bindVertexArray(vao2)

     */

    requestAnimationFrame(runRenderLoop);
    function runRenderLoop() {
        gl.clearColor(.5,0,0,1);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.useProgram(shaderProgram);
        gl.bindVertexArray(vao);
        gl.drawArrays(gl.TRIANGLES, 0, 3);

//        gl.useProgram(shaderProgram2);
  //      gl.bindVertexArray(vao2);
    //    gl.drawArrays(gl.TRIANGLES, 0, 3);


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