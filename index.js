(function(global) {
  var canvas,
    gl,
    program,
    thetaLocation,
    thetaLeft,
    theta,
    plus,
    totalVertices,
    translasiX,
    translasiLeft,
    scaleRight,
    r,
    g,
    b;

  glUtils.SL.init({
    callback: function() {
      main();
    }
  });

  function main() {
    canvas = document.getElementById("glcanvas");

    gl = glUtils.checkWebGL(canvas);
    var vertexShader = glUtils.getShader(
      gl,
      gl.VERTEX_SHADER,
      glUtils.SL.Shaders.v1.vertex
    );

    var fragmentShader = glUtils.getShader(
      gl,
      gl.FRAGMENT_SHADER,
      glUtils.SL.Shaders.v1.fragment
    );

    program = glUtils.createProgram(gl, vertexShader, fragmentShader);
    resizer();
  }

  function resizer() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);

    gl.useProgram(program);
    draw();
  }

  function draw() {
    var n = initBuffers(gl);
    totalVertices = n;
    if (n < 0) {
      console.log("Cannot create buffer");
      return -1;
    }
    thetaLocation = gl.getUniformLocation(program, "theta");
    translasiXLocation = gl.getUniformLocation(program, "translasiX");
    scaleXLocation = gl.getUniformLocation(program, "scaleX");
    rLocation = gl.getUniformLocation(program, "r");
    bLocation = gl.getUniformLocation(program, "b");
    gLocation = gl.getUniformLocation(program, "g");
    r = Math.random();
    g = Math.random();
    b = Math.random();
    theta = 0.0;
    thetaLeft = 0.0;
    translasiX = 0.3;
    translasiLeft = translasiX;
    scaleRight = 1.0;
    plus = -0.0114;
    plusScale = -0.0114;
    render();
  }

  function randomColor() {
    r += plus;
    g += plus;
    b += plus;
    if (r < 0.2 || r > 1) {
      r = Math.random();
    }
    if (g < 0.2 || g > 1) {
      g = Math.random();
    }
    if (b < 0.2 || b > 1) {
      b = Math.random();
    }
  }

  function drawFirstShape() {
    theta = thetaLeft;
    theta += plus;
    thetaLeft = theta;
    translasiX = translasiLeft;
    randomColor();
    gl.uniform1f(thetaLocation, theta);
    gl.uniform1f(translasiXLocation, translasiX);
    gl.uniform1f(scaleXLocation, 1.0);
    gl.uniform1f(rLocation, r);
    gl.uniform1f(gLocation, g);
    gl.uniform1f(bLocation, b);
    gl.drawArrays(gl.LINE_LOOP, 0, 14);
  }

  function drawSecondShape() {
    theta = 0;
    scaleRight += plusScale;
    if (scaleRight <= -1) {
      plusScale *= -1;
    } else if (scaleRight >= 1) {
      plusScale *= -1;
    }
    randomColor();
    gl.uniform1f(thetaLocation, theta);
    gl.uniform1f(translasiXLocation, -0.6);
    gl.uniform1f(scaleXLocation, scaleRight);
    gl.uniform1f(rLocation, r);
    gl.uniform1f(gLocation, g);
    gl.uniform1f(bLocation, b);
    gl.drawArrays(gl.TRIANGLE_STRIP, 14, totalVertices - 14);
  }

  function render() {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    drawFirstShape();
    drawSecondShape();

    requestAnimationFrame(render);
  }

  function initBuffers() {
    //prettier-ignore
    var outlineVertices = [
      -0.5, -0.5, 
      -0.5, -0.25,
      -0.5, 0.25,
      -0.5, 0.5,
      -0.4, 0.5,
      -0.4, 0.0,
      -0.2, 0.5,
      -0.1, 0.37,
      -0.25, 0,
      -0.1, -0.37,
      -0.2, -0.5,
      -0.35, -0.12,
      -0.4, -0.25,
      -0.4, -0.5,
    ]
    //prettier-ignore
    var fillVertices = [
      0.5, 0.5,
      0.4, 0.5,
      0.5, 0.0,
      0.4, 0.25,
      0.4, -0.25,
      0.5, -0.25,
      0.4, -0.5,
      0.5, -0.5,
      0.4, -0.25,
      0.5, -0.25,
      0.5, 0.0,
      0.55, -0.12,
      0.65, 0.0,
      0.7, -0.5,
      0.8, -0.37,
      0.6, -0.12,
      0.65, 0.0,
      0.5, 0.0,
      0.8, 0.37,
      0.7, 0.5
    ]
    var vertices = new Float32Array(outlineVertices.concat(fillVertices));
    // var vertices = new Float32Array(outlineVertices);

    var n = (outlineVertices.length + fillVertices.length) / 2;
    // var n = outlineVertices.length / 2;

    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
      console.log("Failed to create the buffer object");
      return -1;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, "vPosition");

    if (vPosition < 0) {
      console.log("Failed to get the storage location of vPosition");
      return -1;
    }

    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);

    gl.enableVertexAttribArray(vPosition);

    return n;
  }

  window.addEventListener("resize", resizer);
})(window || this);
