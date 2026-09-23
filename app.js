const APP_VERSION = '1.2.0';
const STORAGE_KEY = 'wardogs-fire-control-v3';
const DATA_REVIEWED = '2026-09-23';

const MAPS = {
  bakurani: {
    name: 'Bakurani',
    bounds: { minX: 23.35, maxX: 133.60, minY: 19.34, maxY: 129.65 },
    tileBounds: { minX: -0.03, maxX: 163.81, minY: -0.01, maxY: 163.83 },
    tiles: {
      grayscale: 'https://assets.wardogs-artillery.com/releases/assets-v1/maps/tiles/bakurani',
      color: 'https://assets.wardogs-artillery.com/releases/assets-v1/maps/tiles-color/bakurani'
    },
    terrainManifest: 'https://assets.wardogs-artillery.com/releases/assets-v1/data/terrain/bakurani/manifest.json',
    pois: [
      { type:'tower', label:'Tower 1', x:80.52, y:69.85 },
      { type:'tower', label:'Tower 2', x:77.19, y:70.00 },
      { type:'tower', label:'Tower 3', x:77.19, y:73.44 },
      { type:'tower', label:'Tower 4', x:83.64, y:72.85 },
      { type:'tower', label:'Tower 5', x:82.22, y:68.41 },
      { type:'spawn-red', label:'Valkyra', x:118.75, y:70.93 },
      { type:'spawn-green', label:'Manticore', x:40.09, y:77.52 },
      { type:'spawn-blue', label:'Lonestar', x:87.46, y:32.50 }
    ]
  },
  ozeti: {
    name: 'Ozeti',
    bounds: { minX: 57.58, maxX: 143.07, minY: 21.81, maxY: 99.56 },
    tileBounds: { minX: -0.03, maxX: 163.81, minY: -0.01, maxY: 163.83 },
    tiles: {
      grayscale: 'https://assets.wardogs-artillery.com/releases/assets-v1/maps/tiles/ozeti',
      color: 'https://assets.wardogs-artillery.com/releases/assets-v1/maps/tiles-color/ozeti'
    },
    terrainManifest: 'https://assets.wardogs-artillery.com/releases/assets-v1/data/terrain/ozeti/manifest.json',
    pois: [
      { type:'tower', label:'Tower 1', x:95.80, y:62.82 },
      { type:'tower', label:'Tower 2', x:100.37, y:59.23 },
      { type:'tower', label:'Tower 3', x:104.49, y:63.71 },
      { type:'tower', label:'Tower 4', x:100.62, y:67.64 },
      { type:'spawn-red', label:'Valkyra', x:136.99, y:66.92 },
      { type:'spawn-green', label:'Manticore', x:69.72, y:87.99 },
      { type:'spawn-blue', label:'Lonestar', x:83.93, y:31.62 }
    ]
  },
  zestafona: {
    name: 'Zestafona',
    bounds: { minX: 19.90, maxX: 124.89, minY: 50.70, maxY: 141.90 },
    tileBounds: { minX: -0.03, maxX: 163.81, minY: -0.01, maxY: 163.83 },
    tiles: {
      grayscale: 'https://assets.wardogs-artillery.com/releases/assets-v1/maps/tiles/zestafona',
      color: 'https://assets.wardogs-artillery.com/releases/assets-v1/maps/tiles-color/zestafona'
    },
    terrainManifest: 'https://assets.wardogs-artillery.com/releases/assets-v1/data/terrain/zestafona/manifest.json',
    pois: [
      { type:'tower', label:'Tower 1', x:68.60, y:104.15 },
      { type:'tower', label:'Tower 2', x:72.89, y:105.07 },
      { type:'tower', label:'Tower 3', x:70.17, y:100.17 },
      { type:'spawn-red', label:'Valkyra', x:39.44, y:124.94 },
      { type:'spawn-green', label:'Manticore', x:104.66, y:115.08 },
      { type:'spawn-blue', label:'Lonestar', x:68.01, y:66.60 }
    ]
  }
};

// MIL values: current open-source measured firing-table data.
// Reported Season 1 envelopes are kept separately so uncertain extrapolation is never silently presented as a table solution.
const WEAPONS = {
  mortar: {
    name: 'L81 Mortar',
    reported: { min: 52, max: 685, moa: 50, reload: 6.5, sight: '120–950' },
    measuredEnvelope: { min: 132, max: 684 },
    tableEnvelope: { min: 80, max: 697 },
    single: [[80,950],[87,940],[93,930],[99,920],[105,910],[110,900],[115,890],[118,880],[122,870],[127,860],[132,850],[140,840],[151,830],[163,820],[175,810],[187,800],[198,790],[208,780],[219,770],[229,760],[239,750],[250,740],[260,730],[270,720],[280,710],[290,700],[300,690],[310,680],[319,670],[329,660],[339,650],[348,640],[358,630],[367,620],[376,610],[385,600],[394,590],[403,580],[412,570],[420,560],[429,550],[437,540],[446,530],[454,520],[462,510],[470,500],[478,490],[486,480],[494,470],[501,460],[509,450],[516,440],[524,430],[531,420],[538,410],[545,400],[552,390],[559,380],[565,370],[572,360],[578,350],[585,340],[591,330],[597,320],[603,310],[609,300],[615,290],[620,280],[626,270],[631,260],[636,250],[641,240],[646,230],[651,220],[656,210],[661,200],[666,190],[670,180],[675,170],[680,160],[684,150],[688,140],[693,130],[697,120]]
  },
  spg: {
    name: 'SPH-2',
    reported: { min: 745, max: 2660, lowMin: 1070, moa: 10, reload: 27, sight: '0–1400' },
    measuredEnvelope: { min: 780, max: 2629 },
    tableEnvelope: { min: 735, max: 2629 },
    low: [[1181,20],[1232,30],[1283,40],[1334,50],[1384,60],[1433,70],[1482,80],[1529,90],[1576,100],[1622,110],[1666,120],[1709,130],[1751,140],[1792,150],[1832,160],[1870,170],[1907,180],[1944,190],[1979,200],[2014,210],[2046,220],[2079,230],[2110,240],[2139,250],[2168,260],[2196,270],[2223,280],[2249,290],[2273,300],[2296,310],[2319,320],[2341,330],[2362,340],[2383,350],[2403,360],[2422,370],[2439,380],[2456,390],[2471,400],[2485,410],[2499,420],[2513,430],[2526,440],[2538,450],[2550,460],[2561,470],[2570,480],[2579,490],[2586,500],[2593,510],[2599,520],[2605,530],[2610,540],[2615,550],[2620,560],[2623,570],[2626,580],[2628,590],[2629,600]],
    high: [[2629,610],[2629,620],[2628,630],[2626,640],[2624,650],[2621,660],[2617,670],[2613,680],[2609,690],[2604,700],[2599,710],[2592,720],[2584,730],[2576,740],[2567,750],[2557,760],[2546,770],[2536,780],[2524,790],[2513,800],[2501,810],[2488,820],[2474,830],[2460,840],[2444,850],[2429,860],[2412,870],[2395,880],[2378,890],[2360,900],[2342,910],[2323,920],[2303,930],[2282,940],[2261,950],[2239,960],[2217,970],[2194,980],[2171,990],[2147,1000],[2123,1010],[2098,1020],[2072,1030],[2046,1040],[2019,1050],[1991,1060],[1963,1070],[1934,1080],[1905,1090],[1875,1100],[1844,1110],[1813,1120],[1782,1130],[1750,1140],[1717,1150],[1684,1160],[1650,1170],[1616,1180],[1582,1190],[1547,1200],[1512,1210],[1475,1220],[1438,1230],[1401,1240],[1363,1250],[1324,1260],[1285,1270],[1245,1280],[1205,1290],[1165,1300],[1124,1310],[1083,1320],[1041,1330],[999,1340],[956,1350],[913,1360],[869,1370],[825,1380],[780,1390],[735,1400]]
  }
};

const I18N = {
  fr: {
    fireControl:'FIRE CONTROL', map:'Carte', weapon:'Arme', placePoints:'PLACER LES POINTS', gun:'GUN', target:'TARGET', clear:'Effacer',
    clickGun:"Clique sur ta position d'artillerie", clickTarget:'Clique sur la cible', firingSolution:'FIRING SOLUTION', waitingTarget:'En attente de la cible',
    distance:'Distance', bearing:'Cap', azimuth:'Azimut', spread:'Dispersion', elevation:'ÉLÉVATION', community:'Outil communautaire non officiel',
    fit:'Recentrer', inRange:'EN PORTÉE', outRange:'HORS PORTÉE', noTable:'PORTÉE RAPPORTÉE', tooClose:'Cible trop proche', tooFar:'Cible trop éloignée',
    solution:'Solution de tir', high:'HIGH', low:'LOW', copy:'Copier', copied:'Copié !', copyFail:'Copie impossible', terrain:'TERRAIN3D',
    terrainLoading:'Chargement des altitudes…', terrainReady:'Altitudes Terrain3D chargées', terrainUnavailable:'Terrain3D indisponible — solution plane disponible',
    gunAsl:'GUN ASL', targetAsl:'TGT ASL', deltaZ:'ΔZ', flatTable:'TABLE MESURÉE', reported:'SAISON 1 RAPPORTÉE',
    terrainNote:"ΔZ est mesuré depuis Terrain3D mais n'est pas appliqué automatiquement au MIL : les modèles concurrents divergent encore et l'open-source marque la correction automatique comme expérimentale. Nivelez le SPH-2 et utilisez un tir de réglage.",
    shortcuts:'1 GUN · 2 TARGET · molette zoom · glisser déplacer', mapCredit:'Cartes / Terrain3D : données communautaires WARDOGS',
    color:'COULEUR', gray:'N&B', pois:'POI', exactCoords:'COORDONNÉES EXACTES', apply:'Appliquer', swap:'Échanger', tableCoverage:'Table', reportedRange:'Rapporté',
    rangeOnly:'La cible est dans l’enveloppe rapportée Season 1, mais hors de la table mesurée disponible. Aucun MIL n’est extrapolé.',
    dataReviewed:'Données revues', mapLoading:'Chargement carte…', mapFallback:'Fond basse résolution', mapReady:'Carte HD', lowReported:'LOW rapporté dès ~1070 m; table mesurée dès 1181 m.'
  },
  en: {
    fireControl:'FIRE CONTROL', map:'Map', weapon:'Weapon', placePoints:'PLACE POINTS', gun:'GUN', target:'TARGET', clear:'Clear',
    clickGun:'Click your artillery position', clickTarget:'Click the target', firingSolution:'FIRING SOLUTION', waitingTarget:'Waiting for target',
    distance:'Distance', bearing:'Bearing', azimuth:'Azimuth', spread:'Spread', elevation:'ELEVATION', community:'Unofficial community tool',
    fit:'Fit map', inRange:'IN RANGE', outRange:'OUT OF RANGE', noTable:'REPORTED RANGE', tooClose:'Target too close', tooFar:'Target too far',
    solution:'Firing solution', high:'HIGH', low:'LOW', copy:'Copy', copied:'Copied!', copyFail:'Copy failed', terrain:'TERRAIN3D',
    terrainLoading:'Loading terrain heights…', terrainReady:'Terrain3D heights loaded', terrainUnavailable:'Terrain3D unavailable — flat solution available',
    gunAsl:'GUN ASL', targetAsl:'TGT ASL', deltaZ:'ΔZ', flatTable:'MEASURED TABLE', reported:'SEASON 1 REPORTED',
    terrainNote:'ΔZ is sampled from Terrain3D but is not auto-applied to MIL: current community solvers still disagree and the open-source correction remains experimental. Level the SPH-2 and use a ranging shot.',
    shortcuts:'1 GUN · 2 TARGET · wheel zoom · drag pan', mapCredit:'Maps / Terrain3D: WARDOGS community data',
    color:'COLOR', gray:'B&W', pois:'POI', exactCoords:'EXACT COORDINATES', apply:'Apply', swap:'Swap', tableCoverage:'Table', reportedRange:'Reported',
    rangeOnly:'Target is inside the reported Season 1 envelope but outside the measured firing table. No MIL is extrapolated.',
    dataReviewed:'Data reviewed', mapLoading:'Loading map…', mapFallback:'Low-res map', mapReady:'HD map', lowReported:'LOW reported from ~1070 m; measured table from 1181 m.'
  }
};

const $ = id => document.getElementById(id);
const canvas = $('mapCanvas');
const ctx = canvas.getContext('2d');
const tileCache = new Map();
const overviewCache = new Map();
const manifestCache = new Map();
const chunkCache = new Map();

function validPoint(p){ return p && Number.isFinite(Number(p.x)) && Number.isFinite(Number(p.y)); }
function loadPersisted(){ try { const v=JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}'); return v&&typeof v==='object'?v:{}; } catch(_) { return {}; } }
const persisted = loadPersisted();
const browserLang = (navigator.language||'en').toLowerCase().startsWith('fr') ? 'fr' : 'en';
const migratedPoints = {};
if (validPoint(persisted.origin) || validPoint(persisted.target)) migratedPoints[persisted.map || 'bakurani'] = { origin:persisted.origin||null, target:persisted.target||null };
const pointsByMap = persisted.pointsByMap && typeof persisted.pointsByMap === 'object' ? persisted.pointsByMap : migratedPoints;
const initialMap = MAPS[persisted.map] ? persisted.map : 'bakurani';
const initialPoints = pointsByMap[initialMap] || {};
const state = {
  map: initialMap,
  weapon: WEAPONS[persisted.weapon] ? persisted.weapon : 'spg',
  mapStyle: persisted.mapStyle === 'grayscale' ? 'grayscale' : 'color',
  showPois: persisted.showPois !== false,
  mode: 'origin',
  origin: validPoint(initialPoints.origin) ? initialPoints.origin : null,
  target: validPoint(initialPoints.target) ? initialPoints.target : null,
  pointsByMap,
  zoom: 1, panX: 0, panY: 0,
  lang: I18N[persisted.lang] ? persisted.lang : browserLang,
  pointer: null,
  mapStatus: 'loading',
  terrain: { origin:null, target:null, pending:false, error:null, requestId:0 }
};

function tr(k){ return I18N[state.lang][k] || I18N.en[k] || k; }
function saveCurrentMapPoints(){ state.pointsByMap[state.map] = { origin:state.origin, target:state.target }; }
function saveState(){
  saveCurrentMapPoints();
  try { localStorage.setItem(STORAGE_KEY,JSON.stringify({map:state.map,weapon:state.weapon,mapStyle:state.mapStyle,showPois:state.showPois,lang:state.lang,pointsByMap:state.pointsByMap})); } catch(_) {}
}
function applyI18n(){
  document.documentElement.lang=state.lang;
  document.querySelectorAll('[data-i18n]').forEach(el=>el.textContent=tr(el.dataset.i18n));
  document.querySelectorAll('[data-i18n-title]').forEach(el=>el.title=tr(el.dataset.i18nTitle));
  $('langBtn').textContent=state.lang.toUpperCase();
  syncStyleButton();
  syncPoiButton();
  updateWeaponMeta();
  updateSolution();
}
function resize(){ const r=canvas.getBoundingClientRect(),dpr=Math.min(window.devicePixelRatio||1,2); canvas.width=Math.max(1,Math.round(r.width*dpr)); canvas.height=Math.max(1,Math.round(r.height*dpr)); ctx.setTransform(dpr,0,0,dpr,0,0); draw(); }
function view(){ const map=MAPS[state.map],b=map.bounds,W=canvas.clientWidth,H=canvas.clientHeight,pad=window.innerWidth<=760?12:24,ww=b.maxX-b.minX,wh=b.maxY-b.minY,s=Math.min((W-pad*2)/ww,(H-pad*2)/wh)*state.zoom; return{scale:s,left:(W-ww*s)/2+state.panX,top:(H-wh*s)/2+state.panY,bounds:b,mw:ww*s,mh:wh*s}; }
function worldToScreen(p){ const v=view(); return{x:v.left+(p.x-v.bounds.minX)*v.scale,y:v.top+(v.bounds.maxY-p.y)*v.scale}; }
function screenToWorld(x,y){ const v=view(); return{x:v.bounds.minX+(x-v.left)/v.scale,y:v.bounds.maxY-(y-v.top)/v.scale}; }
function clampWorld(p){ const b=MAPS[state.map].bounds; return{x:Math.max(b.minX,Math.min(b.maxX,p.x)),y:Math.max(b.minY,Math.min(b.maxY,p.y))}; }
function roundPoint(p){ return{x:Math.round(p.x*100)/100,y:Math.round(p.y*100)/100}; }
function currentTileBase(style=state.mapStyle){ return MAPS[state.map].tiles[style] || MAPS[state.map].tiles.grayscale; }
function tileURL(z,x,y,style=state.mapStyle){ return `${currentTileBase(style)}/zoom_${z}/${x}_${y}.webp`; }

function getOverview(){
  const mapId=state.map,style=state.mapStyle,key=`${mapId}:${style}`;
  if(overviewCache.has(key)) return overviewCache.get(key);
  const img=new Image(); img.decoding='async';
  const rec={img,ok:false,failed:false,fallback:false,mapId,style};
  img.onload=()=>{rec.ok=true;if(state.map===mapId&&state.mapStyle===style){state.mapStatus=rec.fallback?'fallback':'ready';updateMapStatus();draw();}};
  img.onerror=()=>{
    if(style==='color'&&!rec.fallback){rec.fallback=true;img.src=`${MAPS[mapId].tiles.grayscale}/zoom_0/0_0.webp`;return;}
    rec.failed=true;if(state.map===mapId&&state.mapStyle===style){state.mapStatus='error';updateMapStatus();draw();}
  };
  img.src=`${MAPS[mapId].tiles[style]||MAPS[mapId].tiles.grayscale}/zoom_0/0_0.webp`;
  overviewCache.set(key,rec);return rec;
}
function getTile(z,x,y){
  const mapId=state.map,style=state.mapStyle,k=`${mapId}:${style}:${z}:${x}:${y}`;
  if(tileCache.has(k))return tileCache.get(k);
  const img=new Image();img.decoding='async';
  const rec={img,ok:false,failed:false,fallback:false,mapId,style};
  const urlFor=s=>`${MAPS[mapId].tiles[s]||MAPS[mapId].tiles.grayscale}/zoom_${z}/${x}_${y}.webp`;
  img.onload=()=>{rec.ok=true;if(state.map===mapId&&state.mapStyle===style){state.mapStatus=rec.fallback?'fallback':'ready';updateMapStatus();draw();}};
  img.onerror=()=>{if(style==='color'&&!rec.fallback){rec.fallback=true;img.src=urlFor('grayscale');return;}rec.failed=true;if(state.map===mapId&&state.mapStyle===style)draw();};
  img.src=urlFor(style);tileCache.set(k,rec);return rec;
}
function drawOverview(){
  const map=MAPS[state.map],v=view(),tb=map.tileBounds,rec=getOverview();
  ctx.save(); ctx.beginPath(); ctx.rect(v.left,v.top,v.mw,v.mh); ctx.clip();
  ctx.fillStyle='#10171b'; ctx.fillRect(v.left,v.top,v.mw,v.mh);
  if(rec.ok){
    const topLeft=worldToScreen({x:tb.minX,y:tb.maxY}),bottomRight=worldToScreen({x:tb.maxX,y:tb.minY});
    ctx.globalAlpha=.96; ctx.drawImage(rec.img,topLeft.x,topLeft.y,bottomRight.x-topLeft.x,bottomRight.y-topLeft.y); ctx.globalAlpha=1;
  }
  ctx.restore();
}
function drawTiles(){
  const map=MAPS[state.map],v=view(),tb=map.tileBounds,base=256/(tb.maxX-tb.minX);
  let z=Math.round(Math.log2(v.scale/base)); z=Math.max(0,Math.min(7,z));
  if(z===0) return;
  const count=2**z,tw=(tb.maxX-tb.minX)/count,th=(tb.maxY-tb.minY)/count,a=screenToWorld(0,0),b=screenToWorld(canvas.clientWidth,canvas.clientHeight),left=Math.max(map.bounds.minX,Math.min(a.x,b.x)),right=Math.min(map.bounds.maxX,Math.max(a.x,b.x)),bottom=Math.max(map.bounds.minY,Math.min(a.y,b.y)),top=Math.min(map.bounds.maxY,Math.max(a.y,b.y));
  if(left>=right||bottom>=top)return;
  const minX=Math.max(0,Math.floor((left-tb.minX)/tw)-1),maxX=Math.min(count-1,Math.floor((right-tb.minX)/tw)+1),minY=Math.max(0,Math.floor((tb.maxY-top)/th)-1),maxY=Math.min(count-1,Math.floor((tb.maxY-bottom)/th)+1);
  ctx.save(); ctx.beginPath(); ctx.rect(v.left,v.top,v.mw,v.mh); ctx.clip();
  for(let ty=minY;ty<=maxY;ty++)for(let tx=minX;tx<=maxX;tx++){
    const wl=tb.minX+tx*tw,wt=tb.maxY-ty*th,s=worldToScreen({x:wl,y:wt}),rec=getTile(z,tx,ty);
    if(rec.ok&&!rec.failed) ctx.drawImage(rec.img,s.x,s.y,tw*v.scale+.8,th*v.scale+.8);
  }
  ctx.restore();
}
function drawGrid(){
  const v=view(),b=v.bounds; ctx.save(); ctx.strokeStyle='rgba(255,255,255,.10)'; ctx.fillStyle='rgba(255,255,255,.48)'; ctx.lineWidth=1; ctx.font='9px ui-monospace,monospace';
  const step=v.scale>24?1:v.scale>12?2:v.scale>6?5:10;
  for(let x=Math.ceil(b.minX/step)*step;x<=b.maxX;x+=step){ const p1=worldToScreen({x,y:b.minY}),p2=worldToScreen({x,y:b.maxY}); ctx.beginPath();ctx.moveTo(p1.x,p1.y);ctx.lineTo(p2.x,p2.y);ctx.stroke(); if(step>=2)ctx.fillText(String(x),p1.x+3,v.top+12); }
  for(let y=Math.ceil(b.minY/step)*step;y<=b.maxY;y+=step){ const p1=worldToScreen({x:b.minX,y}),p2=worldToScreen({x:b.maxX,y}); ctx.beginPath();ctx.moveTo(p1.x,p1.y);ctx.lineTo(p2.x,p2.y);ctx.stroke(); if(step>=2)ctx.fillText(String(y),v.left+3,p1.y-3); }
  ctx.restore();
}
function drawPois(){
  if(!state.showPois)return; const v=view();
  for(const poi of MAPS[state.map].pois||[]){
    const p=worldToScreen(poi),isTower=poi.type==='tower',color=isTower?'#f2e07b':poi.type==='spawn-red'?'#ff7d78':poi.type==='spawn-green'?'#8bdaa0':'#7fc5ed';
    ctx.save(); ctx.fillStyle=color; ctx.strokeStyle='rgba(7,11,14,.9)'; ctx.lineWidth=2; ctx.shadowColor='rgba(0,0,0,.7)';ctx.shadowBlur=6;
    if(isTower){ctx.beginPath();ctx.rect(p.x-4,p.y-4,8,8);ctx.fill();ctx.stroke();}else{ctx.beginPath();ctx.arc(p.x,p.y,5,0,Math.PI*2);ctx.fill();ctx.stroke();}
    ctx.shadowBlur=0;
    if(v.scale>5.5){ctx.font='700 9px system-ui';ctx.textAlign='left';ctx.textBaseline='middle';ctx.lineWidth=3;ctx.strokeStyle='rgba(5,8,10,.9)';ctx.strokeText(poi.label,p.x+8,p.y);ctx.fillStyle='#edf4f7';ctx.fillText(poi.label,p.x+8,p.y);}
    ctx.restore();
  }
}
function drawRange(){
  if(!state.origin)return; const w=WEAPONS[state.weapon],v=view(),p=worldToScreen(state.origin),ppm=v.scale/100;
  ctx.save(); ctx.setLineDash([9,7]); ctx.lineWidth=1.25;
  ctx.fillStyle='rgba(107,231,255,.025)'; ctx.strokeStyle='rgba(107,231,255,.44)'; ctx.beginPath();ctx.arc(p.x,p.y,w.reported.max*ppm,0,Math.PI*2);ctx.fill();ctx.stroke();
  ctx.strokeStyle='rgba(255,202,90,.38)';ctx.beginPath();ctx.arc(p.x,p.y,w.reported.min*ppm,0,Math.PI*2);ctx.stroke();
  ctx.setLineDash([3,6]); ctx.strokeStyle='rgba(215,255,56,.32)';ctx.beginPath();ctx.arc(p.x,p.y,w.measuredEnvelope.max*ppm,0,Math.PI*2);ctx.stroke();
  ctx.restore();
}
function drawMarker(p,type){
  if(!p)return; const s=worldToScreen(p),color=type==='origin'?'#6be7ff':'#ff675f';
  ctx.save();ctx.shadowColor=color;ctx.shadowBlur=16;ctx.fillStyle=color;ctx.strokeStyle='#091015';ctx.lineWidth=3;ctx.beginPath();ctx.arc(s.x,s.y,9,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.shadowBlur=0;ctx.fillStyle='#091015';ctx.font='900 9px system-ui';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(type==='origin'?'G':'T',s.x,s.y+.5);ctx.restore();
}
function drawShot(){
  if(!state.origin||!state.target)return; const a=worldToScreen(state.origin),b=worldToScreen(state.target),sol=calc();
  ctx.save();ctx.strokeStyle=sol?.hasSolution?'rgba(215,255,56,.92)':sol?.inReportedRange?'rgba(255,202,90,.92)':'rgba(255,103,95,.9)';ctx.lineWidth=2;ctx.setLineDash([9,6]);ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();ctx.setLineDash([]);const ang=Math.atan2(b.y-a.y,b.x-a.x);ctx.translate(b.x,b.y);ctx.rotate(ang);ctx.fillStyle=sol?.hasSolution?'#d7ff38':sol?.inReportedRange?'#ffca5a':'#ff675f';ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(-13,-5);ctx.lineTo(-13,5);ctx.closePath();ctx.fill();ctx.restore();
}
function draw(){ ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight); drawOverview();drawTiles();drawGrid();drawPois();drawRange();drawShot();drawMarker(state.origin,'origin');drawMarker(state.target,'target'); }

function interpolate(table,d){
  if(!table?.length)return null; const sorted=[...table].sort((a,b)=>a[0]-b[0]); if(d<sorted[0][0]||d>sorted.at(-1)[0])return null;
  for(let i=0;i<sorted.length-1;i++){ const[d1,m1]=sorted[i],[d2,m2]=sorted[i+1]; if(d>=d1&&d<=d2){ if(d1===d2)return m1; const t=(d-d1)/(d2-d1); return m1+(m2-m1)*t; } }
  return sorted.at(-1)[1];
}
function moaSpread(distance,moa){ return distance*Math.tan(moa*Math.PI/(180*60)); }
function calc(){
  if(!state.origin||!state.target)return null;
  const dx=(state.target.x-state.origin.x)*100,dy=(state.target.y-state.origin.y)*100,distance=Math.hypot(dx,dy);
  let degrees=Math.atan2(dx,dy)*180/Math.PI;if(degrees<0)degrees+=360;
  const azimuth=degrees/360*6400,weapon=WEAPONS[state.weapon]; let primary=null,secondary=null,primaryLabel='',secondaryLabel='';
  if(state.weapon==='mortar'){ primary=interpolate(weapon.single,distance); }
  else {
    const low=interpolate(weapon.low,distance),high=interpolate(weapon.high,distance);
    if(high!=null){primary=high;primaryLabel=tr('high');}
    if(low!=null){if(primary==null){primary=low;primaryLabel=tr('low');}else{secondary=low;secondaryLabel=tr('low');}}
  }
  const inReportedRange=distance>=weapon.reported.min&&distance<=weapon.reported.max;
  const hasSolution=primary!=null&&inReportedRange;
  return{distance,degrees,azimuth,primary,secondary,primaryLabel,secondaryLabel,inReportedRange,hasSolution,weapon,spread:moaSpread(distance,weapon.reported.moa)};
}
function fmtCoord(p){return p?`X ${Number(p.x).toFixed(2)} · Y ${Number(p.y).toFixed(2)}`:'—';}
function signed(v,digits=1){if(!Number.isFinite(v))return'—';return `${v>=0?'+':''}${v.toFixed(digits)}`;}
function resetMetrics(clearDistance=true){if(clearDistance)$('distanceValue').textContent='—';$('bearingValue').textContent='—';$('azimuthValue').textContent='—';$('spreadValue').textContent='—';$('elevationValue').textContent='—';$('elevationLabel').textContent='';$('rangeBadge').textContent='—';$('secondarySolution').classList.add('hidden');$('copySolutionBtn').disabled=true;}
function updateTerrainPanel(){
  const t=state.terrain;$('terrainOrigin').textContent=Number.isFinite(t.origin)?`${t.origin.toFixed(1)} m`:'—';$('terrainTarget').textContent=Number.isFinite(t.target)?`${t.target.toFixed(1)} m`:'—';
  const delta=Number.isFinite(t.origin)&&Number.isFinite(t.target)?t.target-t.origin:null;$('terrainDelta').textContent=Number.isFinite(delta)?`${signed(delta)} m`:'—';$('terrainDelta').classList.toggle('positive',Number.isFinite(delta)&&delta>.05);$('terrainDelta').classList.toggle('negative',Number.isFinite(delta)&&delta<-.05);
  $('terrainStatus').textContent=t.pending?tr('terrainLoading'):t.error?tr('terrainUnavailable'):(Number.isFinite(t.origin)||Number.isFinite(t.target))?tr('terrainReady'):'—';$('terrainStatus').classList.toggle('error',Boolean(t.error));
}
function updateMapStatus(){
  const el=$('mapStatus');if(!el)return;el.textContent=state.mapStatus==='ready'?tr('mapReady'):state.mapStatus==='fallback'?tr('mapFallback'):state.mapStatus==='error'?'MAP ERROR':tr('mapLoading');el.classList.toggle('ok',state.mapStatus==='ready');el.classList.toggle('fallback',state.mapStatus==='fallback');el.classList.toggle('error',state.mapStatus==='error');
}
function updateWeaponMeta(){
  const w=WEAPONS[state.weapon];
  $('reportedRangeValue').textContent=`${w.reported.min}–${w.reported.max} m`;
  $('tableRangeValue').textContent=state.weapon==='mortar'?`${w.tableEnvelope.min}–${w.tableEnvelope.max} m`:`HIGH ${w.tableEnvelope.min}–${w.tableEnvelope.max} m · LOW ${w.low[0][0]}–${w.low.at(-1)[0]} m`;
  $('weaponMetaNote').textContent=state.weapon==='spg'?tr('lowReported'):`${w.reported.moa} MOA · ${w.reported.reload}s · sight ${w.reported.sight}`;
}
function syncCoordInputs(){
  const pairs=[['gunX','gunY',state.origin],['targetX','targetY',state.target]];
  for(const [xi,yi,p] of pairs){const x=$(xi),y=$(yi);if(document.activeElement!==x)x.value=p?Number(p.x).toFixed(2):'';if(document.activeElement!==y)y.value=p?Number(p.y).toFixed(2):'';}
}
function updateSolution(){
  const c=calc(); $('originCoords').textContent=fmtCoord(state.origin);$('targetCoords').textContent=fmtCoord(state.target);syncCoordInputs();$('secondarySolution').classList.add('hidden');$('warningBox').classList.add('hidden');$('solutionPanel').classList.toggle('waiting',!state.target);updateTerrainPanel();
  if(!state.origin){$('statusText').textContent=tr('clickGun');$('solutionTitle').textContent=tr('waitingTarget');resetMetrics();return;}
  if(!state.target){$('statusText').textContent=tr('clickTarget');$('solutionTitle').textContent=tr('waitingTarget');resetMetrics(false);return;}
  $('statusText').textContent=tr('solution');$('solutionTitle').textContent=WEAPONS[state.weapon].name;$('distanceValue').textContent=Math.round(c.distance).toString();$('bearingValue').textContent=`${c.degrees.toFixed(1)}°`;$('azimuthValue').textContent=Math.round(c.azimuth%6400).toString();$('spreadValue').textContent=`±${c.spread.toFixed(1)}`;
  $('copySolutionBtn').disabled=!c.hasSolution;
  if(c.hasSolution){$('rangeBadge').textContent=tr('inRange');$('rangeBadge').classList.remove('bad','warn','reported');}
  else if(c.inReportedRange){$('rangeBadge').textContent=tr('noTable');$('rangeBadge').classList.remove('bad');$('rangeBadge').classList.add('warn','reported');}
  else{$('rangeBadge').textContent=tr('outRange');$('rangeBadge').classList.add('bad');$('rangeBadge').classList.remove('warn','reported');}
  if(c.hasSolution){$('elevationValue').textContent=Math.round(c.primary).toString();$('elevationLabel').textContent=c.primaryLabel?`${c.primaryLabel} · ${tr('flatTable')}`:tr('flatTable');}
  else{$('elevationValue').textContent='—';$('elevationLabel').textContent='';}
  if(c.secondary!=null){$('secondarySolution').classList.remove('hidden');$('secondaryLabel').textContent=c.secondaryLabel;$('secondaryValue').textContent=Math.round(c.secondary).toString();}
  if(!c.hasSolution){$('warningBox').classList.remove('hidden');if(c.inReportedRange)$('warningBox').textContent=tr('rangeOnly');else $('warningBox').textContent=c.distance<c.weapon.reported.min?`${tr('tooClose')} · ~${c.weapon.reported.min} m`:`${tr('tooFar')} · ~${c.weapon.reported.max} m`;}
}
function setMode(mode){state.mode=mode;$('originMode').classList.toggle('active',mode==='origin');$('targetMode').classList.toggle('active',mode==='target');$('statusText').textContent=mode==='origin'?tr('clickGun'):tr('clickTarget');}
function clearPoints(){state.origin=null;state.target=null;state.terrain.origin=null;state.terrain.target=null;state.terrain.error=null;state.terrain.pending=false;state.terrain.requestId++;saveCurrentMapPoints();setMode('origin');saveState();updateSolution();draw();}
function resetView(){state.zoom=1;state.panX=0;state.panY=0;draw();}
function zoomAt(x,y,factor){const before=screenToWorld(x,y),next=Math.max(.7,Math.min(20,state.zoom*factor));if(next===state.zoom)return;state.zoom=next;const after=worldToScreen(before);state.panX+=x-after.x;state.panY+=y-after.y;draw();}
function pointFromEvent(e){const r=canvas.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top};}
function placePoint(screenPoint){const p=roundPoint(clampWorld(screenToWorld(screenPoint.x,screenPoint.y)));if(state.mode==='origin'){state.origin=p;state.target=null;state.terrain.origin=null;state.terrain.target=null;setMode('target');}else{state.target=p;state.terrain.target=null;}saveCurrentMapPoints();saveState();updateSolution();draw();refreshTerrain();}
function applyCoordinateInputs(){
  const gx=parseFloat($('gunX').value),gy=parseFloat($('gunY').value),tx=parseFloat($('targetX').value),ty=parseFloat($('targetY').value);
  if(Number.isFinite(gx)&&Number.isFinite(gy))state.origin=roundPoint(clampWorld({x:gx,y:gy}));
  if(Number.isFinite(tx)&&Number.isFinite(ty))state.target=roundPoint(clampWorld({x:tx,y:ty}));
  saveCurrentMapPoints();saveState();setMode(state.target?'target':state.origin?'target':'origin');updateSolution();draw();refreshTerrain();
}
function swapPoints(){const tmp=state.origin;state.origin=state.target;state.target=tmp;saveCurrentMapPoints();saveState();updateSolution();draw();refreshTerrain();}
function syncStyleButton(){$('mapStyleBtn').textContent=state.mapStyle==='color'?tr('color'):tr('gray');$('mapStyleBtn').classList.toggle('active',state.mapStyle==='color');}
function syncPoiButton(){$('poiBtn').textContent=tr('pois');$('poiBtn').classList.toggle('active',state.showPois);}
function switchMap(mapId){
  if(!MAPS[mapId]||mapId===state.map)return; saveCurrentMapPoints(); state.map=mapId; const p=state.pointsByMap[mapId]||{}; state.origin=validPoint(p.origin)?p.origin:null;state.target=validPoint(p.target)?p.target:null;state.terrain={origin:null,target:null,pending:false,error:null,requestId:state.terrain.requestId+1}; state.mapStatus='loading';resetView();setMode(state.origin?'target':'origin');saveState();updateMapStatus();updateSolution();draw();if(state.origin||state.target)refreshTerrain();
}

async function copySolution(){
  const c=calc();if(!c||!c.hasSolution)return;const terrainDelta=Number.isFinite(state.terrain.origin)&&Number.isFinite(state.terrain.target)?` · ΔZ ${signed(state.terrain.target-state.terrain.origin)}m`:'';const arcs=state.weapon==='spg'?` · ${c.primaryLabel||'HIGH'} ${Math.round(c.primary)} MIL${c.secondary!=null?` · ${c.secondaryLabel||'LOW'} ${Math.round(c.secondary)} MIL`:''}`:` · ${Math.round(c.primary)} MIL`;const text=`WARDOGS ${WEAPONS[state.weapon].name} · ${MAPS[state.map].name} · ${Math.round(c.distance)}m · ${c.degrees.toFixed(1)}° · AZ ${Math.round(c.azimuth%6400)} MIL${arcs} · spread ±${c.spread.toFixed(1)}m${terrainDelta}`;
  try{await navigator.clipboard.writeText(text);flashCopy(tr('copied'));}catch(_){window.prompt('Copy:',text);flashCopy(tr('copyFail'));}
}
function flashCopy(label){const b=$('copySolutionBtn'),original=tr('copy');b.textContent=label;setTimeout(()=>b.textContent=original,1200);}
function clamp(v,min,max){return Math.max(min,Math.min(max,v));}
async function getTerrainManifest(mapId){if(manifestCache.has(mapId))return manifestCache.get(mapId);const promise=(async()=>{const url=MAPS[mapId].terrainManifest,res=await fetch(url,{cache:'force-cache'});if(!res.ok)throw new Error(`Terrain manifest ${res.status}`);const manifest=await res.json();if(manifest.format!=='wardogs-landscape-collision-u16-v1'||!manifest.chunks)throw new Error('Unsupported Terrain3D manifest');return{manifest,baseUrl:new URL('.',url).href};})();manifestCache.set(mapId,promise);return promise;}
function quadsPerGameUnit(m,axis){const specific=Number(m[`gameUnitsToLandscapeQuads${axis}`]);if(Number.isFinite(specific)&&specific!==0)return specific;return Number(m.gameUnitsToLandscapeQuads);}
function locateTerrain(m,p){const c=m.coverage;if(c&&(p.x<c.gameXMin||p.x>c.gameXMax||p.y<c.gameYMin||p.y>c.gameYMax))return null;const qx=Number(m.globalQuadOffsetX)+p.x*quadsPerGameUnit(m,'X'),qy=Number(m.globalQuadOffsetY)+p.y*quadsPerGameUnit(m,'Y'),cq=Number(m.chunkQuads),chunkX=clamp(Math.floor(qx/cq),Number(m.chunkXMin),Number(m.chunkXMax)),chunkY=clamp(Math.floor(qy/cq),Number(m.chunkYMin),Number(m.chunkYMax));return{chunkX,chunkY,localX:clamp(qx-chunkX*cq,0,cq),localY:clamp(qy-chunkY*cq,0,cq)};}
async function getTerrainChunk(mapId,info,cx,cy){const k=`${mapId}:${cx},${cy}`;if(chunkCache.has(k))return chunkCache.get(k);const promise=(async()=>{const entry=info.manifest.chunks[`${cx},${cy}`];if(!entry?.file)throw new Error('Terrain chunk missing');const res=await fetch(new URL(entry.file,info.baseUrl).href,{cache:'force-cache'});if(!res.ok)throw new Error(`Terrain chunk ${res.status}`);return{view:new DataView(await res.arrayBuffer()),entry};})();chunkCache.set(k,promise);return promise;}
function rawHeightAt(m,chunk,x,y){const side=Number(m.verticesPerSide),index=y*side+x;return chunk.view.getUint16(index*2,true);}
function decodeRawHeight(m,raw,entry){const min=Number(entry.minLocalZ),max=Number(entry.maxLocalZ),local=min+(raw/65535)*(max-min);return Number(m.worldZOffsetMeters)+local*Number(m.worldZScaleMetersPerLocalUnit);}
function lerp(a,b,t){return a+(b-a)*t;}
async function sampleTerrainHeight(mapId,p){const info=await getTerrainManifest(mapId),m=info.manifest,located=locateTerrain(m,p);if(!located)throw new Error('Point outside Terrain3D coverage');const chunk=await getTerrainChunk(mapId,info,located.chunkX,located.chunkY),maxVertex=Number(m.verticesPerSide)-1,x0=clamp(Math.floor(located.localX),0,maxVertex),y0=clamp(Math.floor(located.localY),0,maxVertex),x1=clamp(x0+1,0,maxVertex),y1=clamp(y0+1,0,maxVertex),fx=located.localX-x0,fy=located.localY-y0,z00=decodeRawHeight(m,rawHeightAt(m,chunk,x0,y0),chunk.entry),z10=decodeRawHeight(m,rawHeightAt(m,chunk,x1,y0),chunk.entry),z01=decodeRawHeight(m,rawHeightAt(m,chunk,x0,y1),chunk.entry),z11=decodeRawHeight(m,rawHeightAt(m,chunk,x1,y1),chunk.entry);return lerp(lerp(z00,z10,fx),lerp(z01,z11,fx),fy);}
async function refreshTerrain(){const requestId=++state.terrain.requestId,mapId=state.map,origin=state.origin?{...state.origin}:null,target=state.target?{...state.target}:null;state.terrain.pending=Boolean(origin||target);state.terrain.error=null;updateTerrainPanel();if(!origin&&!target)return;const [or,trg]=await Promise.allSettled([origin?sampleTerrainHeight(mapId,origin):Promise.resolve(null),target?sampleTerrainHeight(mapId,target):Promise.resolve(null)]);if(requestId!==state.terrain.requestId||mapId!==state.map)return;state.terrain.pending=false;state.terrain.origin=or.status==='fulfilled'&&Number.isFinite(or.value)?or.value:null;state.terrain.target=trg.status==='fulfilled'&&Number.isFinite(trg.value)?trg.value:null;state.terrain.error=or.status==='rejected'||trg.status==='rejected'?(or.reason||trg.reason||new Error('Terrain3D unavailable')):null;updateSolution();}

canvas.addEventListener('pointerdown',e=>{if(e.button!==0)return;const p=pointFromEvent(e);state.pointer={id:e.pointerId,start:p,last:p,moved:false};canvas.setPointerCapture?.(e.pointerId);});
canvas.addEventListener('pointermove',e=>{const p=pointFromEvent(e),w=clampWorld(screenToWorld(p.x,p.y));$('cursorCoords').textContent=`X ${w.x.toFixed(2)}   Y ${w.y.toFixed(2)}`;if(!state.pointer||state.pointer.id!==e.pointerId)return;const dx=p.x-state.pointer.start.x,dy=p.y-state.pointer.start.y;if(Math.hypot(dx,dy)>4)state.pointer.moved=true;if(state.pointer.moved){state.panX+=p.x-state.pointer.last.x;state.panY+=p.y-state.pointer.last.y;state.pointer.last=p;canvas.classList.add('dragging');draw();}});
canvas.addEventListener('pointerup',e=>{if(!state.pointer||state.pointer.id!==e.pointerId)return;const pointer=state.pointer,p=pointFromEvent(e);state.pointer=null;canvas.classList.remove('dragging');if(!pointer.moved)placePoint(p);});
canvas.addEventListener('pointercancel',()=>{state.pointer=null;canvas.classList.remove('dragging');});
canvas.addEventListener('wheel',e=>{e.preventDefault();const p=pointFromEvent(e);zoomAt(p.x,p.y,e.deltaY<0?1.18:1/1.18);},{passive:false});
canvas.addEventListener('contextmenu',e=>e.preventDefault());
$('originMode').addEventListener('click',()=>setMode('origin'));
$('targetMode').addEventListener('click',()=>setMode('target'));
$('clearBtn').addEventListener('click',clearPoints);
$('fitBtn').addEventListener('click',resetView);
$('zoomIn').addEventListener('click',()=>zoomAt(canvas.clientWidth/2,canvas.clientHeight/2,1.3));
$('zoomOut').addEventListener('click',()=>zoomAt(canvas.clientWidth/2,canvas.clientHeight/2,1/1.3));
$('copySolutionBtn').addEventListener('click',copySolution);
$('applyCoordsBtn').addEventListener('click',applyCoordinateInputs);
$('swapBtn').addEventListener('click',swapPoints);
$('mapSelect').addEventListener('change',e=>switchMap(e.target.value));
$('weaponSelect').addEventListener('change',e=>{state.weapon=e.target.value;saveState();updateWeaponMeta();updateSolution();draw();});
$('mapStyleBtn').addEventListener('click',()=>{state.mapStyle=state.mapStyle==='color'?'grayscale':'color';state.mapStatus='loading';saveState();syncStyleButton();updateMapStatus();draw();});
$('poiBtn').addEventListener('click',()=>{state.showPois=!state.showPois;saveState();syncPoiButton();draw();});
$('langBtn').addEventListener('click',()=>{state.lang=state.lang==='fr'?'en':'fr';saveState();applyI18n();});
for(const id of ['gunX','gunY','targetX','targetY']) $(id).addEventListener('keydown',e=>{if(e.key==='Enter')applyCoordinateInputs();});
document.addEventListener('keydown',e=>{if(e.target?.matches('select,input,textarea'))return;if(e.key==='1')setMode('origin');if(e.key==='2')setMode('target');if(e.key.toLowerCase()==='f')resetView();if(e.key==='Escape')clearPoints();});
window.addEventListener('resize',resize);

function init(){
  $('mapSelect').value=state.map;$('weaponSelect').value=state.weapon;$('versionBadge').textContent=`v${APP_VERSION}`;$('dataReviewed').textContent=`${tr('dataReviewed')} ${DATA_REVIEWED}`;
  setMode(state.origin?'target':'origin');syncStyleButton();syncPoiButton();updateWeaponMeta();updateMapStatus();applyI18n();resize();if(state.origin||state.target)refreshTerrain();
}
init();