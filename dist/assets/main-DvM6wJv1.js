import{g as r,W as T,S as B,O as z,P as L,a as P,V as E,M as F}from"./animated-copy-DncZ2efD.js";document.addEventListener("DOMContentLoaded",I);function I(){const e=sessionStorage.getItem("preloaderSeen")==="true",o=document.querySelector(".preloader");if(o){if(e){o.style.display="none";return}M()}}function M(){const e=document.querySelector(".progress-bar-indicator"),o=document.querySelector(".progress-bar-copy span"),t=document.querySelector(".progress-bar");if(!e||!o||!t)return;r.to(t,{opacity:1,duration:.075,ease:"power2.inOut",delay:.5,repeat:1,yoyo:!0,onComplete:()=>{r.set(t,{opacity:1}),i()}});function i(){let n=0;const s=5;let a=0;const c=C(s);function v(){if(a>=s){R();return}const b=c[a],f=Math.min(n+b,100),w=200+Math.random()*400;setTimeout(()=>{r.to(e,{"--progress":f/100,duration:.5,ease:"power2.out",onUpdate:()=>{const S=Math.round(r.getProperty(e,"--progress")*100);o.textContent=`${S}%`},onComplete:()=>{n=f,a++,v()}})},w)}v()}}function C(e){const o=[];let t=100;const i=30;for(let n=0;n<e-1;n++){const s=Math.min(i,t-(e-1-n)),a=Math.max(5,Math.floor(t/(e-n)*.5)),c=Math.floor(Math.random()*(s-a))+a;o.push(c),t-=c}return o.push(t),o.sort(()=>Math.random()-.5)}function R(){const e=document.querySelector(".preloader"),o=document.querySelector(".progress-bar"),t=document.querySelectorAll(".preloader-block");e&&(sessionStorage.setItem("preloaderSeen","true"),r.to(o,{opacity:0,duration:.075,ease:"power2.inOut",delay:.3,repeat:1,yoyo:!0,onComplete:()=>{r.set(o,{opacity:0}),setTimeout(()=>{const i=[...t].sort(()=>Math.random()-.5);i.forEach((n,s)=>{r.to(n,{opacity:0,duration:.075,ease:"power2.inOut",delay:s*.025,repeat:1,yoyo:!0,onComplete:()=>{r.set(n,{opacity:0}),s===i.length-1&&(e.style.display="none")}})})},200)}}))}const q=document.getElementById("skyline"),U=/iPhone|iPad|iPod|Android/i.test(navigator.userAgent),k=U?1:1.25,d=new T({canvas:q,antialias:!1,powerPreference:"high-performance",stencil:!1,depth:!1}),g=new B,A=new z(-1,1,1,-1,0,1),x=new L(2,2),u=new P({uniforms:{iTime:{value:0},iResolution:{value:new E}},vertexShader:`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `,fragmentShader:`
    #ifdef GL_FRAGMENT_PRECISION_HIGH
      precision highp float;
    #else
      precision mediump float;
    #endif

    uniform float iTime;
    uniform vec3 iResolution;
    varying vec2 vUv;

    uint seed = 31713U;

    float rand(void) {
      seed = (seed << 13U) ^ seed;
      seed = seed * (seed * seed * 15731U + 789221U) + 1376312589U;
      uint seed2 = seed * seed;
      return float(seed2&0x7fffffffU)/float(0x7fffffffU);
    }

    float Polygon(vec2 uv, float h) {
      float mid = (rand()-.5)*exp2(-h*2.);
      float f = abs(uv.y-rand()+.5)-rand()-2.;
      f = max(f,abs(uv.x-mid)-rand()-.5+h*.4);
      f = max(f,abs(dot(uv,vec2(1,1)/sqrt(2.))-rand()+.5)-rand()-1.);
      f = max(f,abs(dot(uv,vec2(1,-1)/sqrt(2.))-rand()+.5)-rand()-1.);
      return f;
    }

    vec3 Buildings(vec2 uv, int layer) {
      seed = uint(2. + uv.x/4.);
      uv.x = (fract(uv.x/4.)-.5)*4.;
      
      bool cull = (pow(float(layer+1)/8.,.3) < rand());
      seed += 0x1001U*uint(layer);
      
      float a = Polygon(uv-vec2(0,0), 0.);
      float b = Polygon(uv-vec2(0,2), .5);
      float c = Polygon(uv-vec2(0,4), 1.);
      if (cull) { a = 1.; b = 1.; c = 1.; }
      
      a = min(a, uv.y+.5);
      
      vec3 f = vec3(a,min(a,b),min(min(a,b),c)).zyx;
      vec3 col = vec3(.5+.5*f/(.01+abs(f)));
      
      return vec3(dot(col,vec3(.985,.01,.005)));
    }

    void main() {
      vec2 fragCoord = vUv * iResolution.xy;
      vec2 uv = (fragCoord-iResolution.xy*vec2(.5,.5))/iResolution.y;
      
      uv *= 10.;
      uv.y += 3.;
      uv.x -= 8.;
      
      vec3 color = vec3(1);
      
      const float size = .5;
      const float fog = .15;
      const float baseFog = 0.075; 
      
      color = min(color, mix(vec3(1), Buildings(uv*exp2(size*0.)+iTime*vec2(4,0),0), exp2(-fog*0.-baseFog)));
      color = min(color, mix(vec3(1), Buildings(uv*exp2(size*1.)+iTime*vec2(4,0),1), exp2(-fog*1.-baseFog)));
      color = min(color, mix(vec3(1), Buildings(uv*exp2(size*2.)+iTime*vec2(4,0),2), exp2(-fog*2.-baseFog)));
      color = min(color, mix(vec3(1), Buildings(uv*exp2(size*3.)+iTime*vec2(4,0),3), exp2(-fog*3.-baseFog)));
      color = min(color, mix(vec3(1), Buildings(uv*exp2(size*4.)+iTime*vec2(4,0),4), exp2(-fog*4.-baseFog)));
      color = min(color, mix(vec3(1), Buildings(uv*exp2(size*5.)+iTime*vec2(4,0),5), exp2(-fog*5.-baseFog)));
      color = min(color, mix(vec3(1), Buildings(uv*exp2(size*6.)+iTime*vec2(4,0),6), exp2(-fog*6.-baseFog)));
      color = min(color, mix(vec3(1), Buildings(uv*exp2(size*7.)+iTime*vec2(4,0),7), exp2(-fog*7.-baseFog)));
      color = min(color, mix(vec3(1), Buildings(uv*exp2(size*8.)+iTime*vec2(4,0),8), exp2(-fog*8.-baseFog)));
      color = min(color, mix(vec3(1), Buildings(uv*exp2(size*9.)+iTime*vec2(4,0),9), exp2(-fog*9.-baseFog)));
      color = min(color, mix(vec3(1), Buildings(uv*exp2(size*10.)+iTime*vec2(4,0),10), exp2(-fog*10.-baseFog)));
      color = min(color, mix(vec3(1), Buildings(uv*exp2(size*11.)+iTime*vec2(4,0),11), exp2(-fog*11.-baseFog)));
      
      color = pow(color, vec3(1./2.2));
      
      const vec3 bgColor = vec3(0.02, 0.04, 0.02);
      color = mix(bgColor, vec3(0.0, 0.4, 0.1), 1.0 - color.r);
      
      gl_FragColor = vec4(color, 1.0);
    }
  `,depthTest:!1,depthWrite:!1}),D=new F(x,u);g.add(D);let p;function m(){clearTimeout(p),p=setTimeout(()=>{const e=window.innerWidth,o=window.innerHeight;d.setSize(e,o),d.setPixelRatio(Math.min(window.devicePixelRatio,k)),u.uniforms.iResolution.value.set(e,o,1)},100)}function y(e){requestAnimationFrame(y),u.uniforms.iTime.value=e*.001,d.render(g,A)}function h(){x.dispose(),u.dispose(),d.dispose(),window.removeEventListener("resize",m),window.removeEventListener("beforeunload",h)}m();window.addEventListener("resize",m);window.addEventListener("beforeunload",h);requestAnimationFrame(y);const l="team-formation-3-10-26";window.addEventListener("load",()=>{const e=document.getElementById("alert-popup-overlay");if(!e||sessionStorage.getItem("alertDismissed")===l)return;const o=document.querySelector(".preloader")?4e3:1200;setTimeout(()=>{e.classList.add("active")},o);const t=e.querySelector(".alert-popup-close");t&&t.addEventListener("click",()=>{e.classList.remove("active"),sessionStorage.setItem("alertDismissed",l)}),e.addEventListener("click",i=>{i.target===e&&(e.classList.remove("active"),sessionStorage.setItem("alertDismissed",l))}),document.addEventListener("keydown",i=>{i.key==="Escape"&&e.classList.contains("active")&&(e.classList.remove("active"),sessionStorage.setItem("alertDismissed",l))})});
