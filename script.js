const cur = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; cur.style.left=mx+'px'; cur.style.top=my+'px'; });
function animRing(){ rx+=(mx-rx)*0.12; ry+=(my-ry)*0.12; ring.style.left=rx+'px'; ring.style.top=ry+'px'; requestAnimationFrame(animRing); }
animRing();
document.querySelectorAll('a,button,.project-card,.about-pill').forEach(el=>{
  el.addEventListener('mouseenter',()=>{ cur.style.width='16px'; cur.style.height='16px'; ring.style.width='52px'; ring.style.height='52px'; });
  el.addEventListener('mouseleave',()=>{ cur.style.width='10px'; cur.style.height='10px'; ring.style.width='36px'; ring.style.height='36px'; });
});

const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let W,H,particles=[];
function resize(){ W=canvas.width=window.innerWidth; H=canvas.height=window.innerHeight; }
resize(); window.addEventListener('resize',resize);
class Particle {
  constructor(){ this.reset(); }
  reset(){ this.x=Math.random()*W; this.y=Math.random()*H; this.vx=(Math.random()-0.5)*0.3; this.vy=(Math.random()-0.5)*0.3; this.r=Math.random()*1.5+0.5; this.alpha=Math.random()*0.6+0.2; }
  update(){ this.x+=this.vx; this.y+=this.vy; if(this.x<0||this.x>W||this.y<0||this.y>H) this.reset(); }
  draw(){ ctx.beginPath(); ctx.arc(this.x,this.y,this.r,0,Math.PI*2); ctx.fillStyle=`rgba(0,240,255,${this.alpha})`; ctx.fill(); }
}
for(let i=0;i<120;i++) particles.push(new Particle());
function drawLines(){
  for(let i=0;i<particles.length;i++) for(let j=i+1;j<particles.length;j++){
    const dx=particles[i].x-particles[j].x, dy=particles[i].y-particles[j].y, d=Math.sqrt(dx*dx+dy*dy);
    if(d<130){ ctx.beginPath(); ctx.moveTo(particles[i].x,particles[i].y); ctx.lineTo(particles[j].x,particles[j].y); ctx.strokeStyle=`rgba(0,240,255,${0.15*(1-d/130)})`; ctx.lineWidth=0.5; ctx.stroke(); }
  }
}
function animCanvas(){ ctx.clearRect(0,0,W,H); particles.forEach(p=>{ p.update(); p.draw(); }); drawLines(); requestAnimationFrame(animCanvas); }
animCanvas();

const obs = new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); }); },{threshold:0.12});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

const tag = document.getElementById('hero-tag');
const txt = '// AI & DS Engineer';
let idx=0;
function typeIt(){ if(idx<txt.length){ tag.textContent+=txt[idx++]; setTimeout(typeIt,55); } }
setTimeout(typeIt,400);

const pdfB64 = 'JVBERi0xLjQKJdPr6eEKMSAwIG9iago8PC9UaXRsZSAoYXBwLmZsb3djdi5jb20vcmVzdW1lLXBkZi1wYWdlLTc3MDcxNzFjY2QwMDRmYjM3NzE2YmU5ZjkxOWViMjRlOWE3ODg4NTcpCi9DcmVhdG9yIChNb3ppbGxhLzUuMCBcKFgxMTsgTGludXggeDg2XzY0XCkgQXBwbGVXZWJLaXQvNTM3LjM2IFwoS0hUTUwsIGxpa2UgR2Vja29cKSBIZWFkbGVzc0Nocm9tZS8xNDUuMC4wLjAgU2FmYXJpLzUzNy4zNikKL1Byb2R1Y2VyIChTa2lhL1BERiBtMTQ1KQovQ3JlYXRpb25EYXRlIChEOjIwMjYwMzA2MTcxMDQ3KzAwJzAwJykKL01vZERhdGUgKEQ6MjAyNjAzMDYxNzEwNDcrMDAnMDAnKT4+CmVuZG9iagozIDAgb2JqCjw8L2NhIDEKL0JNIC9Ob3JtYWw+PgplbmRvYmoKNyAwIG9iago8PC9UeXBlIC9Bbm5vdAovU3VidHlwZSAvTGluawovRiA0Ci9Cb3JkZXIgWzAgMCAwXQovUmVjdCBbODYuMjUgNzU3LjE2OTk4IDIyOC43NSA3NzguOTE5OThdCi9BIDw8L1R5cGUgL0FjdGlvbgovUyAvVVJJCi9VUkkgKG1haWx0bzpnb3dyaWtyaXNobmE5ODVAZ21haWwuY29tKT4+Ci9TdHJ1Y3RQYXJlbnQgMTAwMDAwPj4KZW5kb2JqCjggMCBvYmoKPDwvVHlwZSAvQW5ub3QKL1N1YnR5cGUgL0xpbmsKL0YgNAovQm9yZGVyIFswIDAgMF0KL1JlY3QgWzIzOS4yNSA3NTcuMTY5OTggMzAwLjc1IDc3OC45MTk5OF0KL0EgPDwvVHlwZSAvQWN0aW9uCi9TIC9VUkkKL1VSSSAodGVsOjkxODg3MjgxNzQpPj4KL1N0cnVjdFBhcmVudCAxMDAwMDE+PgplbmRvYmoKOSAwIG9iago8PC9UeXBlIC9Bbm5vdAovU3VidHlwZSAvTGluawovRiA0Ci9Cb3JkZXIgWzAgMCAwXQovUmVjdCBbMjY0IDczNi4xNjk5OCA0MDQuMjUgNzU4LjY2OTk4XQovQSA8PC9UeXBlIC9BY3Rpb24KL1MgL1VSSQovVVJJIChodHRwczovL2dpdGh1Yi5jb20vZ293cmlrcmlzaG5hOTg1KT4+Ci9TdHJ1Y3RQYXJlbnQgMTAwMDAyPj4KZW5kb2JqCg==';
const pdfDataUrl = 'data:application/pdf;base64,' + pdfB64;
const iframe = document.getElementById('resume-iframe');
if(iframe) iframe.src = pdfDataUrl;
const dlBtn = document.getElementById('resume-download');
if(dlBtn) dlBtn.href = pdfDataUrl;
const ntBtn = document.getElementById('resume-newtab');
if(ntBtn) ntBtn.href = pdfDataUrl;