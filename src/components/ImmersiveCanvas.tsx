import {useEffect,useRef} from 'react';

export default function ImmersiveCanvas(){
 const canvasRef=useRef<HTMLCanvasElement|null>(null);
 useEffect(()=>{
  const canvas=canvasRef.current;if(!canvas)return;
  const gl=canvas.getContext('webgl',{alpha:true,antialias:true});if(!gl)return;
  const vert=[
   'attribute vec4 aPoint;uniform float uTime;uniform float uRatio;uniform float uDpr;uniform vec2 uMouse;varying float vMix;',
   'void main(){vec3 p=aPoint.xyz;float a=uTime*.12+uMouse.x*.46;float b=.45+sin(uTime*.13)*.2+uMouse.y*.35;',
   'vec3 q=vec3(p.x*cos(a)-p.z*sin(a),p.y,p.x*sin(a)+p.z*cos(a));',
   'q=vec3(q.x,q.y*cos(b)-q.z*sin(b),q.y*sin(b)+q.z*cos(b));',
   'float d=3.5-q.z;gl_Position=vec4(q.x*3.4/d/max(.8,uRatio),q.y*3.4/d,0.,1.);',
   'gl_PointSize=clamp((3.+aPoint.w*5.)*uDpr/d,1.,7.);vMix=clamp((q.y+1.4)/2.8,0.,1.);}'
  ].join('\n');
  const frag=[
   'precision mediump float;varying float vMix;',
   'void main(){vec2 p=gl_PointCoord-.5;float r=exp(-dot(p,p)*18.);if(r<.03)discard;',
   'vec3 c=mix(vec3(.26,.84,1.),vec3(1.,.3,.72),smoothstep(.0,1.,vMix));gl_FragColor=vec4(c,r*.82);}'
  ].join('\n');
  const makeShader=(kind:number,source:string)=>{
   const shader=gl.createShader(kind);if(!shader)return null;
   gl.shaderSource(shader,source);gl.compileShader(shader);
   if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){gl.deleteShader(shader);return null;}return shader;
  };
  const v=makeShader(gl.VERTEX_SHADER,vert),f=makeShader(gl.FRAGMENT_SHADER,frag);
  if(!v||!f){if(v)gl.deleteShader(v);if(f)gl.deleteShader(f);return;}
  const program=gl.createProgram();if(!program)return;
  gl.attachShader(program,v);gl.attachShader(program,f);gl.linkProgram(program);
  if(!gl.getProgramParameter(program,gl.LINK_STATUS)){gl.deleteProgram(program);return;}
  const n=window.innerWidth<768?1900:4800,points=new Float32Array(n*4);
  for(let i=0;i<n;i++){
   const u=Math.random()*Math.PI*2,w=Math.random()*Math.PI*2;
   const r=1.02+.36*Math.cos(w)+.04*Math.sin(u*9);
   points[i*4]=r*Math.cos(u);points[i*4+1]=r*Math.sin(u);
   points[i*4+2]=.36*Math.sin(w)+.12*Math.sin(3*u);points[i*4+3]=Math.random();
  }
  const buffer=gl.createBuffer();if(!buffer)return;
  gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,points,gl.STATIC_DRAW);
  gl.useProgram(program);
  const loc=gl.getAttribLocation(program,'aPoint');
  gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,4,gl.FLOAT,false,16,0);
  const t=gl.getUniformLocation(program,'uTime'),r=gl.getUniformLocation(program,'uRatio');
  const d=gl.getUniformLocation(program,'uDpr'),m=gl.getUniformLocation(program,'uMouse');
  let frame=0,active=false,mx=0,my=0,sx=0,sy=0;
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const start=performance.now();
  const resize=()=>{
   const ratio=Math.min(window.devicePixelRatio||1,1.6);
   const w=Math.max(1,Math.round(canvas.clientWidth*ratio)),h=Math.max(1,Math.round(canvas.clientHeight*ratio));
   if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;}
   gl.viewport(0,0,w,h);gl.uniform1f(r,w/h);gl.uniform1f(d,ratio);
  };
  const move=(event:PointerEvent)=>{mx=(event.clientX/window.innerWidth-.5)*2;my=(event.clientY/window.innerHeight-.5)*2;};
  const draw=()=>{
   if(!active||document.hidden)return;
   resize();sx+=(mx-sx)*.04;sy+=(my-sy)*.04;
   gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);
   gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE);
   gl.uniform1f(t,reduce?0:(performance.now()-start)/1000);
   gl.uniform2f(m,sx,sy);gl.drawArrays(gl.POINTS,0,n);
   if(!reduce)frame=requestAnimationFrame(draw);
  };
  const io=new IntersectionObserver(([entry])=>{
   active=entry.isIntersecting;cancelAnimationFrame(frame);if(active)draw();
  },{threshold:.01});
  io.observe(canvas);
  const visibility=()=>{cancelAnimationFrame(frame);if(active&&!document.hidden)draw();};
  window.addEventListener('resize',resize);window.addEventListener('pointermove',move,{passive:true});
  document.addEventListener('visibilitychange',visibility);
  return()=>{
   cancelAnimationFrame(frame);io.disconnect();window.removeEventListener('resize',resize);
   window.removeEventListener('pointermove',move);document.removeEventListener('visibilitychange',visibility);
   gl.deleteBuffer(buffer);gl.deleteProgram(program);gl.deleteShader(v);gl.deleteShader(f);
  };
 },[]);
 return <div className="pf-universe" aria-hidden="true"><div className="pf-universe-halo"/><canvas ref={canvasRef} className="pf-universe-canvas"/><div className="pf-universe-caption">PF / DIGITAL UNIVERSE <span>2026</span></div></div>;
}
