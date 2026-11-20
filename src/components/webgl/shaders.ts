export const VERTEX_SHADER = `
attribute vec2 aPosition;
varying vec2 vUv;

void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

export const FRAGMENT_SHADER = `
precision mediump float;

varying vec2 vUv;

uniform vec2 uResolution;
uniform float uTime;
uniform vec2 uPointer;
uniform float uScroll;
uniform float uVariant;
uniform float uActive;
uniform float uDark;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float value = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 4; i++) {
    value += amp * noise(p);
    p *= 2.02;
    amp *= 0.5;
  }
  return value;
}

void main() {
  vec2 uv = vUv;
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
  float t = uTime;

  vec3 base;
  vec3 fg;
  if (uDark > 0.5) {
    base = vec3(0.027, 0.019, 0.008);
    fg = vec3(0.965, 0.953, 0.933);
  } else {
    base = vec3(0.965, 0.953, 0.933);
    fg = vec3(0.027, 0.019, 0.008);
  }
  vec3 gold = vec3(0.769, 0.578, 0.149);
  vec3 col = base;

  if (uVariant < 0.5) {
    // Hero field: slow flowing contours and quiet gold nodes.
    vec2 q = p + (uPointer - 0.5) * vec2(0.10, 0.06);
    float flow = sin((q.y + 0.12 * sin(q.x * 2.4 + t * 0.06)) * 34.0 + fbm(q * 2.2 + t * 0.03) * 4.0);
    float line = smoothstep(0.90, 1.0, flow) * 0.055;
    float cross = sin((q.x * 0.7 - q.y * 0.5) * 22.0 - t * 0.04 + fbm(q * 1.4) * 3.0);
    line += smoothstep(0.94, 1.0, cross) * 0.03;
    col = mix(col, fg, line * (1.0 - uScroll * 0.35));

    for (int i = 0; i < 3; i++) {
      float fi = float(i);
      vec2 node = vec2(sin(fi * 2.1 + t * 0.08) * 0.34, cos(fi * 1.7 + t * 0.06) * 0.22);
      float d = length(q - node);
      float pulse = 0.5 + 0.5 * sin(t * 0.55 + fi * 1.8);
      float glow = (1.0 - smoothstep(0.0, 0.075, d)) * (0.05 + 0.09 * pulse);
      col = mix(col, gold, glow);
    }
  } else if (uVariant < 1.5) {
    // Architecture: five layers bending toward a shared field.
    for (int i = 0; i < 5; i++) {
      float fi = float(i);
      float y = 0.22 + fi * 0.14;
      float convergence = smoothstep(0.0, 0.9, uv.x);
      y = mix(y, 0.5 + (fi - 2.0) * 0.012, convergence * 0.55);
      y += sin(uv.x * 6.0 + t * 0.12 + fi) * 0.012;
      float d = abs(p.y - y);
      float stroke = 1.0 - smoothstep(0.0, 0.004, d);
      float active = 1.0 - step(0.5, abs(fi - uActive));
      vec3 strokeColor = mix(fg, gold, active);
      col = mix(col, strokeColor, stroke * mix(0.10, 0.62, active));
    }
  } else if (uVariant < 2.5) {
    // ARPS: a calm lattice with a slow sweep.
    vec2 g = abs(fract(p * 7.0) - 0.5);
    float gridX = 1.0 - smoothstep(0.0, 0.02, g.x);
    float gridY = 1.0 - smoothstep(0.0, 0.02, g.y);
    col = mix(col, fg, max(gridX, gridY) * 0.09);
    float node = 1.0 - smoothstep(0.0, 0.055, length(g));
    col = mix(col, gold, node * 0.22);
    float sweep = 1.0 - smoothstep(0.0, 0.08, abs(uv.x - fract(t * 0.03)));
    col = mix(col, gold, sweep * 0.07);
  } else if (uVariant < 3.5) {
    // Gravity: orbits around a quiet centre.
    float r = length(p);
    for (int i = 0; i < 4; i++) {
      float fi = float(i);
      float radius = 0.10 + fi * 0.09 + sin(t * 0.1 + fi) * 0.006;
      float ring = 1.0 - smoothstep(0.0, 0.006, abs(r - radius));
      col = mix(col, mix(fg, gold, step(2.5, fi)), ring * 0.16);
    }
    float core = 1.0 - smoothstep(0.0, 0.12, r);
    col = mix(col, gold, core * 0.12);
    float angle = atan(p.y, p.x) + t * 0.04;
    float spokes = 1.0 - smoothstep(0.0, 0.02, abs(sin(angle * 3.0)));
    col = mix(col, fg, spokes * 0.02 * (1.0 - smoothstep(0.1, 0.5, r)));
  } else if (uVariant < 4.5) {
    // Datum: strata and sediment.
    for (int i = 0; i < 7; i++) {
      float fi = float(i);
      float y = -0.35 + fi * 0.11 + sin(p.x * 3.0 + t * 0.05 + fi * 0.6) * 0.018;
      float band = 1.0 - smoothstep(0.0, 0.012, abs(p.y - y));
      col = mix(col, mix(fg, gold, step(5.5, fi)), band * 0.10);
    }
    float dots = step(0.86, hash(floor(p * 26.0))) * 0.06;
    col = mix(col, gold, dots);
  } else if (uVariant < 5.5) {
    // Humming: resonant waves.
    for (int i = 0; i < 5; i++) {
      float fi = float(i);
      float freq = 4.0 + fi * 2.2;
      float amp = 0.035 / (1.0 + fi * 0.35);
      float y = amp * sin(p.x * freq + t * (0.08 + fi * 0.01) + fi);
      float wave = 1.0 - smoothstep(0.0, 0.004, abs(p.y - y));
      col = mix(col, mix(fg, gold, step(3.5, fi)), wave * 0.16);
    }
  } else {
    // Ripple: a single outgoing signal.
    float progress = clamp(t / 1.2, 0.0, 1.0);
    float r = length(p);
    float ring = 1.0 - smoothstep(0.0, 0.018, abs(r - progress * 0.55));
    float glow = 1.0 - smoothstep(0.0, 0.09, r);
    col = mix(col, gold, ring * 0.5 * (1.0 - progress) + glow * 0.08 * (1.0 - progress));
  }

  gl_FragColor = vec4(col, 1.0);
}
`;
