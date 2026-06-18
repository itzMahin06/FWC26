
/* ──────────────────────────────────────────────
   BRAND & CHANNELS
────────────────────────────────────────────── */
const BRAND = {
  name: "MAHIN TV Live",
  logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjh6LLHibQeG5umPVB9WcSdTC9M5dbf8ABfVyS2RNWbti1RkzQD_fChyphenhyphenfzYcFmnGb5c5nhBulfLEgpo4OXBymC5oCf959_9Y96uQviPxEL9TLmrnhnBuovCELV3E4WQiwBKjZL-e9iq0GhlqO6Prd3orcMKKlV2sBpNynRnp2BDHqGQGIfQ-5gtpkNPwJc/s1600/fwclogo.png"
};

const channels = [
  {
    id:"bangla", name: "Somoy TV", desc: "Bangladeshi TV Channel", url: "http://114.130.57.224:8080/Somoy-TV-3Mb/tracks-v1a1/mono.m3u8", region: "Bangladesh", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c4/SOMOY_TV_Logo.svg/500px-SOMOY_TV_Logo.svg.png"  
  },
  {
      id: "bangla1", name: "T Sports HD", desc: "1080P High HD", url: "http://198.195.239.50:8095/tsports/tracks-v1a1/mono.m3u8", region: "Bangladesh", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/T_Sports_logo.svg/500px-T_Sports_logo.svg.png"
  },
  {
      id:"bangla2", name:"GO 3 Sports 4K", desc:"Watch Fifa Hindi & 4K", url:"http://ytoxw6un.ottclub.xyz/iptv/KCUHA6DGYYVA8ZZFUPQV3KZH/6408/index.m3u8", region:"Lithunia", logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Go3_Sport.svg/330px-Go3_Sport.svg.png"
  },
  {
      id:"bangla6", name:"Fussball 1 FHD", desc:"High Resulation FHD", url:"http://vca.easy747.com:80/live/donad220/8U01MGV/1438202.ts", region:"Spanish", logo:"https://upload.wikimedia.org/wikipedia/en/thumb/1/17/2026_FIFA_World_Cup_emblem.svg/330px-2026_FIFA_World_Cup_emblem.svg.png"
  },
  {
      id:"bangla7", name:"World Cup 4K", desc:"Use if you high speed Internet", url:"http://starhub.pro/live/farhat-3379/67897-913379/745270.ts", region:"International", logo:"https://upload.wikimedia.org/wikipedia/en/thumb/1/17/2026_FIFA_World_Cup_emblem.svg/330px-2026_FIFA_World_Cup_emblem.svg.png"
  },
  {
      id:"bangla5", name:"D Sports", desc:"Watch Bufferless stream", url:"http://190.108.83.69:8000/play/a05w/index.m3u", region:"Espanol", logo:"https://upload.wikimedia.org/wikipedia/commons/5/5a/DSports.png?_=20221114223321"
  },
  {
      id:"bangla3", name:"Super Sports 4K", desc:"Watch Fifa world cup in 4K FHD", url:"http://rgkkw.live/live/1Aoen7elp5/IgMJ60tmAa/745195.ts", region:"Spanish", logo:"https://upload.wikimedia.org/wikipedia/en/6/66/Supersport2012.jpg"
  },
  {
    id:"main", name:"Caze TV",
    desc:"Youtube Live stream.",
    url: "https://dfr80qz435crc.cloudfront.net/MNOP/Amagi/Caze/Caze_TV_BR/1080p-vtt/index.m3u8",
    region:"Brazil", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/6/64/Caz%C3%A9TV_logo.svg/500px-Caz%C3%A9TV_logo.svg.png"
  },
  {
    id:"sports", name:"BEIN Sports",
    desc:"Watch Live",
    url:"https://andro.226503.xyz/checklist/androstreamlivebs1.m3u8",
    region:"Espanol", logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Bein_sport_logo.png/1920px-Bein_sport_logo.png?_=20170126041215"
  },
  {
    id:"news", name:"MAHIN News 24",
    desc:"Rolling news demo slot — Deep TV stream.",
    url:"https://byphdgllyk.gpcdn.net/hls/deeptotv/0_1/index.m3u8",
    region:"Global", logo:"https://upload.wikimedia.org/wikipedia/commons/4/41/Apple_logo_black.svg"
  }
];

/* ──────────────────────────────────────────────
   ELEMENT REFS
────────────────────────────────────────────── */
const shell     = document.getElementById('vlc-shell');
const video     = document.getElementById('vlc-video');
const bigPlay   = document.getElementById('vlc-bigplay');
const spinEl    = document.getElementById('vlc-spin');
const osdEl     = document.getElementById('vlc-osd');
const liveBadge = document.getElementById('vlc-live');
const wmImg     = document.getElementById('wm-img');

const progWrap  = document.getElementById('vlc-prog-wrap');
const progBuf   = document.getElementById('vlc-prog-buf');
const progFill  = document.getElementById('vlc-prog-fill');
const progThumb = document.getElementById('vlc-prog-thumb');
const tipEl     = document.getElementById('vlc-tip');

const playBtn   = document.getElementById('vlc-play-btn');
const muteBtn   = document.getElementById('vlc-mute-btn');
const volSlider = document.getElementById('vlc-vol-slider');
const timeEl    = document.getElementById('vlc-time');
const speedBtn  = document.getElementById('vlc-speed-btn');
const qualBtn   = document.getElementById('vlc-qual-btn');
const kbBtn     = document.getElementById('vlc-kb-btn');
const pipBtn    = document.getElementById('vlc-pip-btn');
const fsBtn     = document.getElementById('vlc-fs-btn');
const speedPop  = document.getElementById('vlc-speed-pop');
const qualPop   = document.getElementById('vlc-qual-pop');
const kbPanel   = document.getElementById('vlc-kb');

/* ──────────────────────────────────────────────
   HLS LOADER
────────────────────────────────────────────── */
let hls = null;

function loadStream(url) {
  if (hls) { hls.destroy(); hls = null; }
  if (Hls.isSupported()) {
    hls = new Hls({ enableWorker: true, lowLatencyMode: true });
    hls.loadSource(url);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      video.play().catch(()=>{});
      buildQualMenu();
    });
  } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = url;
    video.play().catch(()=>{});
  }
}

/* ──────────────────────────────────────────────
   QUALITY MENU
────────────────────────────────────────────── */
function buildQualMenu() {
  qualPop.innerHTML = '';
  if (!hls) return;
  addPopItem(qualPop, 'Auto', hls.currentLevel === -1, () => { hls.currentLevel = -1; refreshQualLabel(); });
  hls.levels.forEach((lv, i) => {
    const label = lv.height ? lv.height + 'p' : 'Level ' + i;
    addPopItem(qualPop, label, false, () => { hls.currentLevel = i; refreshQualLabel(); });
  });
}
function refreshQualLabel() {
  if (!hls) return;
  qualBtn.textContent = hls.currentLevel === -1 ? 'AUTO' : ((hls.levels[hls.currentLevel]?.height || '') + 'p') || 'HD';
  qualPop.querySelectorAll('.vlc-pi').forEach((el, i) => {
    const isSel = i === 0 ? hls.currentLevel === -1 : hls.currentLevel === i - 1;
    el.classList.toggle('sel', isSel);
    el.querySelector('.ck').style.visibility = isSel ? 'visible' : 'hidden';
  });
}

/* ──────────────────────────────────────────────
   SPEED MENU
────────────────────────────────────────────── */
const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
function buildSpeedMenu() {
  speedPop.innerHTML = '';
  speeds.forEach(s => {
    addPopItem(speedPop, s + '×', s === 1, () => {
      video.playbackRate = s;
      speedBtn.textContent = s + '×';
      speedPop.querySelectorAll('.vlc-pi').forEach(el => {
        const isSel = el.dataset.spd == s;
        el.classList.toggle('sel', isSel);
        el.querySelector('.ck').style.visibility = isSel ? 'visible' : 'hidden';
      });
      showOSD('Speed: ' + s + '×');
    }, s);
  });
}
buildSpeedMenu();

/* ──────────────────────────────────────────────
   POPUP HELPERS
────────────────────────────────────────────── */
function addPopItem(parent, label, sel, fn, spd) {
  const el = document.createElement('div');
  el.className = 'vlc-pi' + (sel ? ' sel' : '');
  if (spd !== undefined) el.dataset.spd = spd;
  el.innerHTML = `<span>${label}</span><span class="ck fa fa-check" style="visibility:${sel?'visible':'hidden'}"></span>`;
  el.onclick = e => { e.stopPropagation(); fn(); closePopups(); };
  parent.appendChild(el);
}
function closePopups() { speedPop.classList.remove('open'); qualPop.classList.remove('open'); }
speedBtn.onclick = e => { e.stopPropagation(); qualPop.classList.remove('open'); speedPop.classList.toggle('open'); };
qualBtn.onclick  = e => { e.stopPropagation(); speedPop.classList.remove('open'); qualPop.classList.toggle('open'); };
document.addEventListener('click', closePopups);
shell.addEventListener('click', closePopups);

/* ──────────────────────────────────────────────
   OSD
────────────────────────────────────────────── */
let osdT;
function showOSD(msg) {
  osdEl.textContent = msg;
  osdEl.classList.add('show');
  clearTimeout(osdT);
  osdT = setTimeout(() => osdEl.classList.remove('show'), 1700);
}

/* ──────────────────────────────────────────────
   PLAY / PAUSE
────────────────────────────────────────────── */
function togglePlay() {
  if (video.paused) { video.play().catch(()=>{}); showOSD('▶ Play'); }
  else { video.pause(); showOSD('⏸ Pause'); }
}
video.addEventListener('play',  () => { playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>'; bigPlay.classList.add('hidden'); });
video.addEventListener('pause', () => { playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';  bigPlay.classList.remove('hidden'); });
video.addEventListener('waiting', () => spinEl.classList.add('show'));
video.addEventListener('playing', () => spinEl.classList.remove('show'));
video.addEventListener('canplay', () => spinEl.classList.remove('show'));

playBtn.onclick = togglePlay;
bigPlay.onclick = togglePlay;
video.ondblclick = toggleFS;

/* ──────────────────────────────────────────────
   PROGRESS & TIME
────────────────────────────────────────────── */
function fmt(s) {
  if (!isFinite(s)) return '∞';
  const h = Math.floor(s/3600), m = Math.floor((s%3600)/60), sec = Math.floor(s%60);
  return h ? `${h}:${pad(m)}:${pad(sec)}` : `${m}:${pad(sec)}`;
}
function pad(n) { return String(n).padStart(2,'0'); }

video.addEventListener('timeupdate', () => {
  const live = !video.duration || !isFinite(video.duration);
  liveBadge.classList.toggle('show', live);
  if (live) { timeEl.textContent = fmt(video.currentTime) + ' / ∞'; progFill.style.width = '0%'; return; }
  const pct = (video.currentTime / video.duration) * 100;
  progFill.style.width = pct + '%';
  progThumb.style.left = pct + '%';
  timeEl.textContent = fmt(video.currentTime) + ' / ' + fmt(video.duration);
});

video.addEventListener('progress', () => {
  if (video.buffered.length && video.duration)
    progBuf.style.width = (video.buffered.end(video.buffered.length-1) / video.duration * 100) + '%';
});

let dragging = false;
function seekAt(e) {
  const r = progWrap.getBoundingClientRect();
  const ratio = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
  if (video.duration && isFinite(video.duration)) {
    video.currentTime = ratio * video.duration;
    showOSD('⏩ ' + fmt(video.currentTime));
  }
}
progWrap.addEventListener('mousedown', e => { dragging = true; seekAt(e); });
document.addEventListener('mousemove', e => { if (dragging) seekAt(e); });
document.addEventListener('mouseup', () => { dragging = false; });

progWrap.addEventListener('mousemove', e => {
  if (!video.duration || !isFinite(video.duration)) return;
  const r = progWrap.getBoundingClientRect();
  const ratio = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
  tipEl.textContent = fmt(ratio * video.duration);
  tipEl.style.left = Math.min(r.width - 44, Math.max(0, e.clientX - r.left - 18)) + 'px';
  tipEl.style.display = 'block';
});
progWrap.addEventListener('mouseleave', () => { tipEl.style.display = 'none'; });

/* ──────────────────────────────────────────────
   VOLUME
────────────────────────────────────────────── */
video.volume = 0.8;
function updateVolIcon() {
  const v = video.volume, m = video.muted;
  const ic = (m || v === 0) ? 'fa-volume-xmark' : v < 0.4 ? 'fa-volume-low' : 'fa-volume-high';
  muteBtn.innerHTML = `<i class="fa-solid ${ic}"></i>`;
}
volSlider.addEventListener('input', () => {
  video.volume = volSlider.value / 100;
  video.muted = false;
  updateVolIcon();
  showOSD('🔊 ' + Math.round(volSlider.value) + '%');
});
muteBtn.onclick = () => {
  video.muted = !video.muted;
  if (!video.muted) volSlider.value = video.volume * 100;
  updateVolIcon();
  showOSD(video.muted ? '🔇 Muted' : '🔊 Unmuted');
};
updateVolIcon();

/* ──────────────────────────────────────────────
   FULLSCREEN
────────────────────────────────────────────── */
function toggleFS() {
  if (!document.fullscreenElement && !document.webkitFullscreenElement)
    (shell.requestFullscreen || shell.webkitRequestFullscreen).call(shell);
  else
    (document.exitFullscreen || document.webkitExitFullscreen).call(document);
}
fsBtn.onclick = toggleFS;
function onFsChange() {
  const inFs = !!(document.fullscreenElement || document.webkitFullscreenElement);
  fsBtn.innerHTML = inFs ? '<i class="fa-solid fa-compress"></i>' : '<i class="fa-solid fa-expand"></i>';
  showOSD(inFs ? '⛶ Fullscreen' : '⊡ Windowed');
  // Auto-rotate to landscape on mobile when entering fullscreen
  if (screen.orientation && screen.orientation.lock) {
    if (inFs) {
      screen.orientation.lock('landscape').catch(() => {});
    } else {
      screen.orientation.unlock();
    }
  }
}
document.addEventListener('fullscreenchange', onFsChange);
document.addEventListener('webkitfullscreenchange', onFsChange);

/* ──────────────────────────────────────────────
   PICTURE-IN-PICTURE
────────────────────────────────────────────── */
pipBtn.onclick = async () => {
  try {
    if (document.pictureInPictureElement) {
      await document.exitPictureInPicture();
      pipBtn.classList.remove('active');
      showOSD('PiP off');
    } else {
      await video.requestPictureInPicture();
      pipBtn.classList.add('active');
      showOSD('📺 PiP on');
    }
  } catch { showOSD('PiP not supported'); }
};
video.addEventListener('leavepictureinpicture', () => pipBtn.classList.remove('active'));

/* ──────────────────────────────────────────────
   KEYBOARD SHORTCUTS PANEL
────────────────────────────────────────────── */
kbBtn.onclick = e => { e.stopPropagation(); kbPanel.classList.toggle('open'); };
kbPanel.addEventListener('click', () => kbPanel.classList.remove('open'));

shell.addEventListener('keydown', e => {
  if (kbPanel.classList.contains('open')) { kbPanel.classList.remove('open'); return; }
  switch(e.code) {
    case 'Space':      e.preventDefault(); togglePlay(); break;
    case 'ArrowUp':    e.preventDefault(); video.volume = Math.min(1,video.volume+0.1); volSlider.value=video.volume*100; updateVolIcon(); showOSD('🔊 '+Math.round(video.volume*100)+'%'); break;
    case 'ArrowDown':  e.preventDefault(); video.volume = Math.max(0,video.volume-0.1); volSlider.value=video.volume*100; updateVolIcon(); showOSD('🔊 '+Math.round(video.volume*100)+'%'); break;
    case 'KeyM': video.muted=!video.muted; updateVolIcon(); showOSD(video.muted?'🔇 Muted':'🔊 Unmuted'); break;
    case 'KeyF': toggleFS(); break;
    case 'KeyP': pipBtn.click(); break;
    case 'Slash': if(e.shiftKey) kbPanel.classList.toggle('open'); break;
  }
});

/* ──────────────────────────────────────────────
   AUTO-HIDE CONTROLS
────────────────────────────────────────────── */
let ctrlT;
function showCtrl() {
  shell.classList.remove('ctrl-hidden');
  shell.style.cursor = 'default';
  clearTimeout(ctrlT);
  if (!video.paused) ctrlT = setTimeout(() => { shell.classList.add('ctrl-hidden'); shell.style.cursor = 'none'; }, 3000);
}
shell.addEventListener('mousemove', showCtrl);
shell.addEventListener('mouseenter', showCtrl);
shell.addEventListener('mouseleave', () => { clearTimeout(ctrlT); if (!video.paused) shell.classList.add('ctrl-hidden'); });

/* ──────────────────────────────────────────────
   CHANNEL RENDER & SWITCH
────────────────────────────────────────────── */
function renderChannels(activeId) {
  const container = document.getElementById('channel-list');
  container.innerHTML = '';
  channels.forEach(ch => {
    const isActive = ch.id === activeId;
    const row = document.createElement('button');
    row.type = 'button';
    row.className = `channel-card w-full text-left p-2.5 rounded-xl border transition-all flex items-center gap-3 ${
      isActive ? 'active border-rose-500/40 shadow-lg shadow-rose-950/20'
               : 'bg-slate-900/30 border-[var(--line)] hover:bg-slate-900/70 hover:border-slate-700'
    }`;
    row.onclick = () => { if (!isActive) switchChannel(ch); };
    row.innerHTML = `
      <div class="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-slate-800 border border-[var(--line)] flex items-center justify-center">
        <img src="${ch.logo}" alt="${ch.name}" class="w-full h-full object-contain p-1" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
        <i class="fa-solid fa-tv text-slate-500" style="display:none"></i>
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center justify-between gap-2">
          <span class="font-semibold tracking-tight text-xs truncate ${isActive?'text-rose-400':'text-slate-200'}">${ch.name}</span>
          <span class="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-full flex-shrink-0 ${isActive?'bg-rose-500/20 text-rose-300':'bg-slate-800 text-slate-400'}">
            <i class="fa-solid fa-globe mr-1"></i>${ch.region}
          </span>
        </div>
        <p class="text-[11px] text-slate-400 leading-tight mt-0.5 truncate">${ch.desc}</p>
      </div>`;
    container.appendChild(row);
  });
}

function switchChannel(ch) {
  document.getElementById('current-channel-title').innerText = ch.name;
  document.getElementById('now-logo').innerHTML =
    `<img src="${ch.logo}" class="w-full h-full object-contain p-1" onerror="this.style.display='none'">`;
  loadStream(ch.url);
  renderChannels(ch.id);
  showOSD('📺 ' + ch.name);
}

/* ──────────────────────────────────────────────
   INIT
────────────────────────────────────────────── */
wmImg.src = BRAND.logo;
renderChannels("main");
switchChannel(channels[0]);
shell.focus();
