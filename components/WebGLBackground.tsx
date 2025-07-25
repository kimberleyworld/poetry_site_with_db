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

      // Cloud shape function
      float cloudShape(vec2 p) {
        float cloud = 0.0;
        
        // Main cloud body (multiple overlapping circles)
        cloud += smoothstep(0.3, 0.0, length(p - vec2(0.0, 0.0)));
        cloud += smoothstep(0.25, 0.0, length(p - vec2(0.3, 0.1)));
        cloud += smoothstep(0.2, 0.0, length(p - vec2(-0.3, 0.05)));
        cloud += smoothstep(0.18, 0.0, length(p - vec2(0.15, 0.25)));
        cloud += smoothstep(0.22, 0.0, length(p - vec2(-0.15, 0.2)));
        
        return min(cloud, 1.0);
      }

      void main() {
        vec2 fragCoord = gl_FragCoord.xy;
        vec2 uv = fragCoord / iResolution.xy;

        // Keep consistent day sky color
        vec3 daySky = vec3(0.5, 0.8, 1.0); // Clear blue day sky
        
        // Create gradient from top to bottom
        float gradient = 1.0 - uv.y; // Lighter at top, darker at bottom
        
        // Apply vertical gradient to day sky
        vec3 skyColor = mix(daySky * 0.7, daySky, gradient);
        
        // Add subtle atmospheric variation
        vec3 base = 0.5 + 0.1 * cos(iTime * 0.2 + uv.xyx + vec3(0.0, 2.0, 4.0));
        vec3 col = skyColor + base * 0.1;

        // Add floating clouds with solid pastel colors
        
        // Cloud 1 - moves left to right, wraps around (PASTEL PINK)
        vec2 cloudPos1 = uv;
        cloudPos1.x -= iTime * 0.1;
        cloudPos1.x = mod(cloudPos1.x + 0.5, 1.5) - 0.5;
        cloudPos1.y -= 0.7;
        cloudPos1 *= 4.0; // Made bigger (was 8.0)
        float cloud1 = cloudShape(cloudPos1);
        if (cloud1 > 0.05) {
          vec3 pastelPink = vec3(0.95, 0.8, 0.85); // Soft pastel pink
          col = mix(col, pastelPink, cloud1 * 0.9); // More solid
        }
        
        // Cloud 2 - different position and speed (CREAM WHITE)
        vec2 cloudPos2 = uv;
        cloudPos2.x -= iTime * 0.07;
        cloudPos2.x = mod(cloudPos2.x + 0.3, 1.8) - 0.4;
        cloudPos2.y -= 0.4;
        cloudPos2 *= 3.0; // Made bigger (was 6.0)
        float cloud2 = cloudShape(cloudPos2);
        if (cloud2 > 0.05) {
          vec3 creamWhite = vec3(0.98, 0.95, 0.92); // Warm cream white
          col = mix(col, creamWhite, cloud2 * 0.85);
        }
        
        // Cloud 3 - smaller, faster (PASTEL ORANGE)
        vec2 cloudPos3 = uv;
        cloudPos3.x -= iTime * 0.15;
        cloudPos3.x = mod(cloudPos3.x + 0.7, 1.2) - 0.3;
        cloudPos3.y -= 0.8;
        cloudPos3 *= 5.0; // Made bigger (was 10.0)
        float cloud3 = cloudShape(cloudPos3);
        if (cloud3 > 0.05) {
          vec3 pastelOrange = vec3(0.95, 0.85, 0.75); // Soft peachy orange
          col = mix(col, pastelOrange, cloud3 * 0.8);
        }
        
        // Cloud 4 - mid-level (SOFT WHITE)
        vec2 cloudPos4 = uv;
        cloudPos4.x -= iTime * 0.05;
        cloudPos4.x = mod(cloudPos4.x + 0.1, 2.0) - 0.6;
        cloudPos4.y -= 0.3;
        cloudPos4 *= 3.5; // Made bigger (was 7.0)
        float cloud4 = cloudShape(cloudPos4);
        if (cloud4 > 0.05) {
          vec3 softWhite = vec3(0.96, 0.94, 0.96); // Pure soft white
          col = mix(col, softWhite, cloud4 * 0.9);
        }
        
        // Cloud 5 - additional small cloud (PASTEL LAVENDER)
        vec2 cloudPos5 = uv;
        cloudPos5.x -= iTime * 0.12;
        cloudPos5.x = mod(cloudPos5.x + 0.8, 1.3) - 0.2;
        cloudPos5.y -= 0.6;
        cloudPos5 *= 4.5; // Made bigger (was 9.0)
        float cloud5 = cloudShape(cloudPos5);
        if (cloud5 > 0.05) {
          vec3 pastelLavender = vec3(0.92, 0.85, 0.95); // Soft lavender
          col = mix(col, pastelLavender, cloud5 * 0.7);
        }

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
