uniform sampler2D uTexture;
uniform float uInnerRadius;
uniform float uOuterRadius;

varying vec3 vPos;

vec4 color() {
  vec2 uv = vec2(0);
  uv.x = (length(vPos) - uInnerRadius) / (uOuterRadius - uInnerRadius);
  if (uv.x < 0.0 || uv.x > 1.0) {
    discard;
  }
  vec4 pixel = texture2D(uTexture, uv);
  return pixel;
}

void main() {
  gl_FragColor = color();
}