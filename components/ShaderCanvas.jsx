'use client'
import { useEffect, useRef } from 'react'

const HOME_VS = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`

const HOME_FS = `precision highp float;
varying vec2 v_texCoord;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main() {
    vec2 uv = v_texCoord;
    vec2 centered_uv = (uv - 0.5) * 2.0;
    centered_uv.x *= u_resolution.x / u_resolution.y;

    // Subtle dark background
    vec3 color = vec3(0.02, 0.03, 0.03);

    // Digital Grid
    vec2 grid_uv = uv * 40.0;
    float grid = (step(0.98, fract(grid_uv.x)) + step(0.98, fract(grid_uv.y))) * 0.05;
    color += vec3(0.71, 0.95, 0.29) * grid;

    // Organic moving nodes (Digital Ecosystem)
    for(int i = 0; i < 8; i++) {
        float t = u_time * 0.2 + float(i) * 1.5;
        vec2 pos = vec2(sin(t), cos(t * 0.8)) * 0.5;
        float dist = length(centered_uv - pos);
        float glow = 0.002 / (dist * dist + 0.001);
        color += vec3(0.71, 0.95, 0.29) * glow * 0.4;

        // Connect nodes with thin lines (Network Lines)
        for(int j = 0; j < 3; j++) {
            float t2 = u_time * 0.15 + float(j) * 2.3;
            vec2 pos2 = vec2(cos(t2), sin(t2 * 1.1)) * 0.6;
            // Simplified line drawing
            float d = length(centered_uv - mix(pos, pos2, clamp(dot(centered_uv-pos, pos2-pos)/dot(pos2-pos, pos2-pos), 0.0, 1.0)));
            color += vec3(0.44, 0.62, 0.21) * (0.0005 / (d + 0.005)) * step(length(pos-pos2), 0.8);
        }
    }

    // Leaf-like structure attempt (Procedural)
    float angle = atan(centered_uv.y, centered_uv.x);
    float radius = length(centered_uv);
    float leaf = smoothstep(0.4, 0.41, radius - 0.1 * sin(angle * 5.0 + u_time));
    // color = mix(color, vec3(0.71, 0.95, 0.29) * 0.1, (1.0 - leaf) * 0.5);

    // Vignette
    float vignette = smoothstep(1.5, 0.5, length(centered_uv));
    color *= vignette;

    gl_FragColor = vec4(color, 1.0);
}`

const SCENE_VS = `attribute vec4 a_position;
varying vec2 v_texCoord;
void main() {
    gl_Position = a_position;
    v_texCoord = a_position.xy * 0.5 + 0.5;
}`

const SCENE_FS = `precision highp float;
varying vec2 v_texCoord;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_scroll;

float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main() {
    vec2 uv = v_texCoord;
    // Scroll offset (px -> uv units, 0.4x for a soft parallax drift)
    uv.y += u_scroll / u_resolution.y * 0.4;

    vec2 centered_uv = (uv - 0.5) * 2.0;
    centered_uv.x *= u_resolution.x / u_resolution.y;

    // Deep dark background base
    vec3 color = vec3(0.019, 0.031, 0.027); // Matching #050807 feel

    // Subtle Digital Grid
    vec2 grid_uv = uv * 30.0;
    float grid = (smoothstep(0.98, 1.0, fract(grid_uv.x)) + smoothstep(0.98, 1.0, fract(grid_uv.y))) * 0.08;
    color += vec3(0.717, 0.953, 0.29) * grid; // #B7F34A at low opacity

    // Organic Network Nodes
    float nodes = 0.0;
    for(int i = 0; i < 12; i++) {
        float t = u_time * 0.15 + float(i) * 1.618;
        vec2 pos = vec2(sin(t * 0.7), cos(t * 0.85)) * 0.7;

        // Mouse influence
        vec2 m = (u_mouse / u_resolution - 0.5) * 2.0;
        m.x *= u_resolution.x / u_resolution.y;
        pos += m * 0.05;

        float d = length(centered_uv - pos);
        float glow = 0.0015 / (d + 0.02);
        color += vec3(0.717, 0.953, 0.29) * glow * 0.3;

        // Network lines
        for(int j = 0; j < 2; j++) {
            float t2 = u_time * 0.1 + float(i + j) * 2.1;
            vec2 pos2 = vec2(cos(t2 * 0.6), sin(t2 * 0.9)) * 0.8;

            float line_dist = length(centered_uv - mix(pos, pos2, clamp(dot(centered_uv-pos, pos2-pos)/dot(pos2-pos, pos2-pos), 0.0, 1.0)));
            float line_glow = (0.0004 / (line_dist + 0.005)) * smoothstep(0.8, 0.0, length(pos-pos2));
            color += vec3(0.435, 0.624, 0.208) * line_glow * 0.15;
        }
    }

    // Ambient floating particles
    float n = noise(uv * 5.0 + u_time * 0.1);
    color += vec3(0.717, 0.953, 0.29) * n * 0.02;

    // Vignette for focus
    float vignette = smoothstep(1.5, 0.5, length(centered_uv));
    color *= (vignette * 0.5 + 0.5);

    gl_FragColor = vec4(color, 1.0);
}`

export default function ShaderCanvas({ variant = 'scene', className }) {
  const canvasRef = useRef(null)
  const scrollRef = useRef(0)
  const isScene = variant === 'scene'

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    if (!gl) return

    let raf = 0

    const onScroll = () => {
      scrollRef.current = window.scrollY
    }
    const onMouseMove = (event) => {
      if (isScene) {
        mouseX = event.clientX
        mouseY = canvas.height - event.clientY // Flip Y for WebGL
      } else {
        const rect = canvas.getBoundingClientRect()
        if (rect.width && rect.height) {
          const nx = (event.clientX - rect.left) / rect.width
          const ny = 1.0 - (event.clientY - rect.top) / rect.height
          mouseX = nx * canvas.width
          mouseY = ny * canvas.height
        }
      }
    }

    function syncSize() {
      const w = canvas.clientWidth || 1280
      const h = canvas.clientHeight || 720
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
      }
    }

    let resizeObserver
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(syncSize)
      resizeObserver.observe(canvas)
    }
    syncSize()

    const vs = isScene ? SCENE_VS : HOME_VS
    const fs = isScene ? SCENE_FS : HOME_FS

    function cs(type, src) {
      const s = gl.createShader(type)
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return s
    }

    const prog = gl.createProgram()
    gl.attachShader(prog, cs(gl.VERTEX_SHADER, vs))
    gl.attachShader(prog, cs(gl.FRAGMENT_SHADER, fs))
    gl.linkProgram(prog)
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const pos = gl.getAttribLocation(prog, 'a_position')
    gl.enableVertexAttribArray(pos)
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0)

    const uTime = gl.getUniformLocation(prog, 'u_time')
    const uRes = gl.getUniformLocation(prog, 'u_resolution')
    const uMouse = gl.getUniformLocation(prog, 'u_mouse')
    const uScroll = isScene ? gl.getUniformLocation(prog, 'u_scroll') : null

    let mouseX = canvas.width / 2
    let mouseY = canvas.height / 2
    window.addEventListener('mousemove', onMouseMove)
    if (isScene) window.addEventListener('scroll', onScroll, { passive: true })

    function render(t) {
      if (typeof ResizeObserver === 'undefined') syncSize()
      gl.viewport(0, 0, canvas.width, canvas.height)
      if (uTime) gl.uniform1f(uTime, t * 0.001)
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height)
      if (uMouse) gl.uniform2f(uMouse, mouseX, mouseY)
      if (isScene && uScroll) gl.uniform1f(uScroll, scrollRef.current)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      raf = requestAnimationFrame(render)
    }
    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouseMove)
      if (isScene) window.removeEventListener('scroll', onScroll)
      if (resizeObserver) resizeObserver.disconnect()
    }
  }, [isScene])

  return (
    <canvas
      ref={canvasRef}
      className={
        className ?? 'fixed inset-0 z-0 h-full w-full opacity-80 pointer-events-none'
      }
    />
  )
}