// High-contrast range overlay for readable firing envelopes on every map style.
drawRange = function drawRangeHighContrast(){
  if(!state.origin)return;

  const w=WEAPONS[state.weapon];
  const v=view();
  const p=worldToScreen(state.origin);
  const ppm=v.scale/100;
  const reportedMax=w.reported.max*ppm;
  const reportedMin=w.reported.min*ppm;
  const measuredMax=w.measuredEnvelope.max*ppm;

  const ring=(radius,dash,color,width=2.5)=>{
    ctx.setLineDash(dash);
    ctx.lineWidth=width+4;
    ctx.strokeStyle='rgba(0,0,0,.72)';
    ctx.beginPath();
    ctx.arc(p.x,p.y,radius,0,Math.PI*2);
    ctx.stroke();

    ctx.lineWidth=width;
    ctx.strokeStyle=color;
    ctx.beginPath();
    ctx.arc(p.x,p.y,radius,0,Math.PI*2);
    ctx.stroke();
  };

  ctx.save();

  // Subtle neutral wash makes the firing area readable without hiding terrain detail.
  ctx.fillStyle='rgba(255,255,255,.045)';
  ctx.beginPath();
  ctx.arc(p.x,p.y,reportedMax,0,Math.PI*2);
  ctx.fill();

  // Reported maximum: bright ice-cyan, intentionally distinct from vegetation.
  ring(reportedMax,[12,8],'rgba(220,250,255,.98)',2.8);

  // Measured/reference maximum: magenta/violet for immediate distinction.
  ring(measuredMax,[4,7],'rgba(218,128,255,.98)',2.6);

  // Minimum firing distance: warm orange-red.
  ring(reportedMin,[10,6],'rgba(255,137,76,.99)',2.7);

  // Reinforce the artillery origin at the center of the range rings.
  ctx.setLineDash([]);
  ctx.shadowColor='rgba(255,255,255,.8)';
  ctx.shadowBlur=8;
  ctx.fillStyle='#ffffff';
  ctx.beginPath();
  ctx.arc(p.x,p.y,3.5,0,Math.PI*2);
  ctx.fill();

  ctx.restore();
};

const rangeVersionBadge=document.getElementById('versionBadge');
if(rangeVersionBadge) rangeVersionBadge.textContent='v1.2.1';

// Redraw immediately for users who already had a saved gun position.
draw();
