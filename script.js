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

// ── Neural Network Animation ──────────────────────────────
(function(){
  const canvas = document.getElementById('nn-canvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize(){
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width  = Math.min(520, rect.width);
    canvas.height = 480;
  }
  resize();
  window.addEventListener('resize', resize);

  const layerSizes  = [4, 5, 5, 4, 3];
  const layerLabels = ['Input', 'Hidden 1', 'Hidden 2', 'Hidden 3', 'Output'];

  function buildNodes(){
    const nodes = [];
    const W = canvas.width, H = canvas.height;
    const padX = 52, padY = 60;
    const cols = layerSizes.length;
    for(let l = 0; l < cols; l++){
      const count = layerSizes[l];
      const x = padX + (l / (cols - 1)) * (W - padX * 2);
      for(let n = 0; n < count; n++){
        const y = padY + (n / (count - 1 || 1)) * (H - padY * 2);
        nodes.push({ l, n, x, y, pulse: Math.random(), pulseSpeed: 0.012 + Math.random() * 0.018, active: 0 });
      }
    }
    return nodes;
  }

  let nodes = buildNodes();

  function getEdges(){
    const edges = [];
    for(let l = 0; l < layerSizes.length - 1; l++){
      const fromNodes = nodes.filter(n => n.l === l);
      const toNodes   = nodes.filter(n => n.l === l + 1);
      fromNodes.forEach(f => toNodes.forEach(t => edges.push({ from: f, to: t })));
    }
    return edges;
  }
  let edges = getEdges();

  let signals = [];
  function spawnSignal(){
    const inputNodes = nodes.filter(n => n.l === 0);
    const start = inputNodes[Math.floor(Math.random() * inputNodes.length)];
    signals.push({ node: start, l: 0, t: 0, path: [start] });
  }
  setInterval(spawnSignal, 700);

  function advanceSignals(){
    const next = [];
    signals.forEach(sig => {
      sig.t += 0.04;
      if(sig.t >= 1){
        sig.node.active = 1.0;
        if(sig.l < layerSizes.length - 1){
          const candidates = nodes.filter(n => n.l === sig.l + 1);
          const dest = candidates[Math.floor(Math.random() * candidates.length)];
          next.push({ node: dest, l: sig.l + 1, t: 0, prev: sig.node, path: [...sig.path, dest] });
        }
      } else {
        next.push(sig);
      }
    });
    nodes.forEach(n => { if(n.active > 0) n.active -= 0.025; });
    signals = next.slice(-40);
  }

  function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Edges
    edges.forEach(e => {
      const grd = ctx.createLinearGradient(e.from.x, e.from.y, e.to.x, e.to.y);
      grd.addColorStop(0, 'rgba(0,240,255,0.07)');
      grd.addColorStop(1, 'rgba(124,58,237,0.07)');
      ctx.beginPath();
      ctx.moveTo(e.from.x, e.from.y);
      ctx.lineTo(e.to.x, e.to.y);
      ctx.strokeStyle = grd;
      ctx.lineWidth = 0.8;
      ctx.stroke();
    });

    // Travelling signals
    signals.forEach(sig => {
      if(!sig.prev) return;
      const px = sig.prev.x + (sig.node.x - sig.prev.x) * sig.t;
      const py = sig.prev.y + (sig.node.y - sig.prev.y) * sig.t;
      ctx.beginPath();
      ctx.arc(px, py, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,240,255,0.9)';
      ctx.shadowBlur = 14;
      ctx.shadowColor = '#00f0ff';
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    // Nodes
    nodes.forEach(n => {
      n.pulse += n.pulseSpeed;
      const glow = 0.5 + 0.5 * Math.sin(n.pulse);
      const isOutput = n.l === layerSizes.length - 1;
      const isInput  = n.l === 0;
      const baseColor = isOutput ? '124,58,237' : isInput ? '0,240,255' : '16,185,129';
      const activeBoost = n.active > 0 ? n.active : 0;

      const ringR = 10 + glow * 4 + activeBoost * 8;
      const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, ringR);
      grad.addColorStop(0, `rgba(${baseColor},${0.25 + activeBoost * 0.5})`);
      grad.addColorStop(1, `rgba(${baseColor},0)`);
      ctx.beginPath();
      ctx.arc(n.x, n.y, ringR, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(n.x, n.y, 5 + activeBoost * 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${baseColor},${0.8 + activeBoost * 0.2})`;
      ctx.shadowBlur = 12 + activeBoost * 10;
      ctx.shadowColor = `rgba(${baseColor},1)`;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    // Layer labels
    const W = canvas.width, H = canvas.height;
    const padX = 52, cols = layerSizes.length;
    layerLabels.forEach((label, l) => {
      const x = padX + (l / (cols - 1)) * (W - padX * 2);
      ctx.fillStyle = 'rgba(100,116,139,0.7)';
      ctx.font = '10px Space Mono, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(label, x, H - 12);
    });

    advanceSignals();
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { nodes = buildNodes(); edges = getEdges(); });
  draw();
})();