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
        -.1, -.1, 0,   //0
         .1, -.1, 0,   //1
         .1,  .1, 0,   //2
        -.1,  .1, 0,   //3
    ];
    cube.numVertices = cube.vertices.length / 3;
    cube.indices = [0,1,2,0,2,3];

    cube.textureCoordinates = [
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
    ];


    cube.vao = gl.createVertexArray();
    gl.bindVertexArray(cube.vao);


    cube.vertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cube.vertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cube.vertices), gl.STATIC_DRAW);

    cube.textureCoordinatesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cube.textureCoordinatesBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cube.textureCoordinates), gl.STATIC_DRAW);

    var image = new Image();
    image.src = 'vincent.jpg';
    cube.image1 = image;

    var image2 = new Image();
    image2.src = 'dobuki.png';
    cube.image2 = image2;

    cube.vertexIndicesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cube.vertexIndicesBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cube.indices), gl.STATIC_DRAW);

    cube.positionAttributeLocation = gl.getAttribLocation(cube.shaderProgram, 'position');
    gl.enableVertexAttribArray(cube.positionAttributeLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, cube.vertexPositionBuffer);
    gl.vertexAttribPointer(cube.positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);

    cube.textureCoordinateAttributeLocation = gl.getAttribLocation(cube.shaderProgram, 'textureCoordinate');
    gl.enableVertexAttribArray(cube.textureCoordinateAttributeLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, cube.textureCoordinatesBuffer);
    gl.vertexAttribPointer(cube.textureCoordinateAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    return cube;
}

var gl;
function start() {
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

    const texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.uniform1i(gl.getUniformLocation(cube.shaderProgram, "sampler0"), 0);

    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    function runRenderLoop(time) {
        requestAnimationFrame(runRenderLoop);

        gl.clearColor(.5,0,0,1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


        const image = Math.random() < 0 ? cube.image1 : cube.image2;
        if (image.complete) {
            gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB, gl.RGB,gl.UNSIGNED_BYTE,image);
            gl.bindBuffer(gl.ARRAY_BUFFER, cube.vertexPositionBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
                -Math.random(), -Math.random(), 0,   //0
                Math.random(), -Math.random(), 0,   //1
                Math.random(),  Math.random(), 0,   //2
                -Math.random(),  Math.random(), 0,   //3
            ]), gl.STATIC_DRAW);
            gl.drawElements(gl.TRIANGLES, cube.indices.length, gl.UNSIGNED_SHORT, 0);
        }
    }

    console.log('Started.');
}

function getAndCompileShader(id, shaderType) {
    var shader;
    var shaderElement = document.getElementById(id);
    var shaderText = shaderElement.text.trim();
    shader = gl.createShader(shaderType==='vertex' ? gl.VERTEX_SHADER : gl.FRAGMENT_SHADER);
    gl.shaderSource(shader, shaderText);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.log(gl.getShaderInfoLog(shader));
        return true;
    }
    console.log('Shader ' + id + ' compiled.')
    return shader;
}