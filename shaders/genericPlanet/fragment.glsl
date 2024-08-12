uniform sampler2D uTexture;
uniform vec3 uSunDirection;
uniform vec3 uAtmosphereDayColor;
uniform vec3 uAtmosphereTwilightColor;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

vec3 ambientLight(vec3 lightColor, float lightIntensity) {
  return lightColor * lightIntensity;
}

void main() {
  vec3 viewDirection = normalize(vPosition - cameraPosition);
  vec3 normal = normalize(vNormal);
  // vec3 color = vec3(0.0);
  vec3 color = texture(uTexture, vUv).rgb;
  // Sun direction
  // Sun orientation
  float sunOrientation = dot(uSunDirection, normal);

  // Fresnel
    // float fresnel = smoothstep(-1.0, 1.0, dot(viewDirection, normal));
  float fresnel = 1.0 + dot(viewDirection, normal);
  fresnel = pow(fresnel, 2.0);
    // Atmosphere
  float atmosphereDayMix = smoothstep(-0.5, 1.0, sunOrientation);
  vec3 atmosphereColor = mix(uAtmosphereTwilightColor, uAtmosphereDayColor, atmosphereDayMix);
  color = mix(color, atmosphereColor, fresnel * atmosphereDayMix);

  // vec3 reflection = reflect(-uSunDirection, normal);
  // float specular = -dot(reflection, viewDirection);
  // specular = max(specular, 0.0);
  // specular = pow(specular, 32.0);

  // vec3 specularColor = mix(vec3(1.0), atmosphereColor, fresnel);
  // // Remember specular lighting is added just like directional, point light and ambient light is added
  // color += specular * specularColor;
  // color *= ambientLight(vec3(1.0), 3.0);
  gl_FragColor = vec4(color, 1.0);
  #include <colorspace_fragment>
  #include <tonemapping_fragment>
}