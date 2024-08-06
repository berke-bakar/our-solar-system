uniform sampler2D uTexture;
uniform vec3 uSunDirection;

varying vec2 vUv;
varying vec3 vNormal;

void main() {
  vec3 normal = normalize(vNormal);
  vec3 color = vec3(0.0);

  vec4 textureSample = texture(uTexture, vUv);
  gl_FragColor = vec4(textureSample);
  #include <colorspace_fragment>
  #include <tonemapping_fragment>
}