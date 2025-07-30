'use client';

import React, { useRef, useEffect } from 'react';

const WebGLBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl') as WebGLRenderingContext | null;
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    // Vertex shader source
    const vertexShaderSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment shader source
    const fragmentShaderSource = `
      precision mediump float;
      uniform vec2 iResolution;
      uniform float iTime;

      // Simple noise function for hand-drawn effect
      float noise(vec2 p) {
        return sin(p.x * 10.0) * sin(p.y * 10.0) * 0.1;
      }

      // Hand-drawn cloud shape function
      float handDrawnCloud(vec2 p) {
        float cloud = 0.0;
        
        // Add slight irregularity for hand-drawn look
        vec2 wobble = vec2(
          noise(p * 5.0 + iTime * 0.1) * 0.05,
          noise(p * 3.0 + iTime * 0.1) * 0.03
        );
        p += wobble;
        
        // Main cloud body - more irregular circles
        cloud += smoothstep(0.35, 0.15, length(p - vec2(0.0, 0.0)));
        cloud += smoothstep(0.28, 0.12, length(p - vec2(0.25, 0.08)));
        cloud += smoothstep(0.32, 0.14, length(p - vec2(-0.28, 0.03)));
        cloud += smoothstep(0.25, 0.10, length(p - vec2(0.12, 0.22)));
        cloud += smoothstep(0.30, 0.13, length(p - vec2(-0.18, 0.18)));
        cloud += smoothstep(0.22, 0.08, length(p - vec2(0.35, -0.05)));
        cloud += smoothstep(0.26, 0.11, length(p - vec2(-0.35, -0.02)));
        
        // Sharp cutoff for solid appearance
        return step(0.3, cloud);
      }

      void main() {
        vec2 fragCoord = gl_FragCoord.xy;
        vec2 uv = fragCoord / iResolution.xy;
        // Normalize aspect ratio so clouds don't squash on mobile
        uv = (uv - 0.5) * vec2(iResolution.x / iResolution.y, 1.0) + 0.5;

        // Simple white background
        vec3 skyColor = vec3(1.0, 1.0, 1.0);
        vec3 col = skyColor;

        // Add 4 simple pink clouds
        
        // Cloud 1 - slow moving
        vec2 cloudPos1 = uv;
        cloudPos1.x -= iTime * 0.08;
        cloudPos1.x = mod(cloudPos1.x + 0.5, 2.0) - 0.5;
        cloudPos1.y -= 0.75;
        cloudPos1 *= 2.5;
        float cloud1 = handDrawnCloud(cloudPos1);
        col = mix(col, vec3(1.0, 0.7, 0.8), cloud1);
        
        // Cloud 2 - medium speed
        vec2 cloudPos2 = uv;
        cloudPos2.x -= iTime * 0.06;
        cloudPos2.x = mod(cloudPos2.x + 0.8, 2.2) - 0.6;
        cloudPos2.y -= 0.45;
        cloudPos2 *= 2.0;
        float cloud2 = handDrawnCloud(cloudPos2);
        col = mix(col, vec3(1.0, 0.7, 0.8), cloud2);
        
        // Cloud 3 - faster
        vec2 cloudPos3 = uv;
        cloudPos3.x -= iTime * 0.12;
        cloudPos3.x = mod(cloudPos3.x + 0.2, 1.8) - 0.4;
        cloudPos3.y -= 0.65;
        cloudPos3 *= 3.0;
        float cloud3 = handDrawnCloud(cloudPos3);
        col = mix(col, vec3(1.0, 0.7, 0.8), cloud3);
        
        // Cloud 4 - slowest
        vec2 cloudPos4 = uv;
        cloudPos4.x -= iTime * 0.04;
        cloudPos4.x = mod(cloudPos4.x + 0.1, 2.5) - 0.8;
        cloudPos4.y -= 0.35;
        cloudPos4 *= 1.8;
        float cloud4 = handDrawnCloud(cloudPos4);
        col = mix(col, vec3(1.0, 0.7, 0.8), cloud4);

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    // Create shader function
    const createShader = (gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Error compiling shader:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      
      return shader;
    };

    // Create program function
    const createProgram = (gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram | null => {
      const program = gl.createProgram();
      if (!program) return null;
      
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Error linking program:', gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
      }
      
      return program;
    };

    // Create shaders
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    
    if (!vertexShader || !fragmentShader) return;

    // Create program
    const program = createProgram(gl, vertexShader, fragmentShader);
    if (!program) return;

    // Get attribute and uniform locations
    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
    const resolutionUniformLocation = gl.getUniformLocation(program, 'iResolution');
    const timeUniformLocation = gl.getUniformLocation(program, 'iTime');

    // Create buffer for full-screen quad
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // Resize canvas to fill screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation loop
    const startTime = Date.now();
    const animate = () => {
      const time = (Date.now() - startTime) / 1000;

      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);

      // Set uniforms
      gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);
      gl.uniform1f(timeUniformLocation, time);

      // Set up attributes
      gl.enableVertexAttribArray(positionAttributeLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

      // Draw
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(positionBuffer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 w-full h-full"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
};

export default WebGLBackground;
