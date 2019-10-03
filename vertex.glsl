precision mediump float;

attribute vec2 vPosition;

varying vec3 fColor;
uniform float theta;
uniform float translasiX;
uniform float scaleX;
uniform float r, g, b;

void main() {
  fColor = vec3(r,g,b);
  vec2 d = vec2(0.2, 0.5);
  
  mat4 rotasi = mat4(
    cos(theta), sin(theta), 0.0, 0.0,
    -sin(theta), cos(theta), 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0 
  );

  mat4 skalasi = mat4(
    scaleX, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );

  mat4 translasiPlus = mat4(
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    translasiX, 0.0, 0.0, 1.0 
  );

  mat4 translasiNegative = mat4(
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    -translasiX, 0.0, 0.0, 1.0 
  );

  gl_Position = translasiNegative * skalasi * rotasi * translasiPlus * vec4(vPosition, 0.0, 1.0);
}
