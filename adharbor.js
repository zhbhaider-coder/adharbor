/* AdHarbor shared helpers — localStorage only, no server, no tracking. */
(function(){
  'use strict';
  var K = { key:'ah_gemini_key', brand:'ah_brand_voice', kits:'ah_kits', cal:'ah_calendar', kit:'ah_brand_kit', creative:'ah_creative' };

  function load(k, fallback){
    try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : fallback; }
    catch(e){ return fallback; }
  }
  function save(k, v){ try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch(e){ return false; } }

  function getBrand(){
    return load(K.brand, { tone:'Friendly and confident', audience:'', banned:'', hooks:'', brandName:'', tagline:'' });
  }
  function getBrandKit(){
    return load(K.kit, { primary:'#0d9488', secondary:'#0b2239', accent:'#f59e0b', font:'Arial', logo:'', brandName:'', tagline:'' });
  }
  function getKey(){ try { return localStorage.getItem(K.key) || ''; } catch(e){ return ''; } }
  function setKey(v){ try { localStorage.setItem(K.key, v); } catch(e){} }
  function getKits(){ return load(K.kits, []); }
  function saveKits(list){ return save(K.kits, list); }
  function getCal(){ return load(K.cal, {}); }
  function saveCal(obj){ return save(K.cal, obj); }

  function toast(msg){
    var t = document.getElementById('ah-toast');
    if(!t){ t = document.createElement('div'); t.id='ah-toast'; t.className='toast'; document.body.appendChild(t); }
    t.textContent = msg; t.classList.add('show');
    clearTimeout(t._h); t._h = setTimeout(function(){ t.classList.remove('show'); }, 2200);
  }
  function copyText(text, btn){
    function done(){
      toast('Copied to clipboard');
      if(btn){ btn.textContent='Copied ✓'; btn.classList.add('done'); setTimeout(function(){ btn.textContent='Copy'; btn.classList.remove('done'); }, 1600); }
    }
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(text).then(done, function(){ fallbackCopy(text); done(); });
    } else { fallbackCopy(text); done(); }
  }
  function fallbackCopy(text){
    var ta = document.createElement('textarea'); ta.value = text; ta.style.position='fixed'; ta.style.opacity='0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); } catch(e){}
    document.body.removeChild(ta);
  }
  function esc(s){
    return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }
  function download(filename, content, mime){
    var blob = content instanceof Blob ? content : new Blob([content], {type: mime || 'text/plain'});
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = filename;
    document.body.appendChild(a); a.click();
    setTimeout(function(){ URL.revokeObjectURL(a.href); a.remove(); }, 800);
  }
  function uid(){ return 'k' + Date.now().toString(36) + Math.random().toString(36).slice(2,7); }
  function todayISO(d){ d = d || new Date(); return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); }

  /* Gemini text generation (free tier, user's own key). */
  async function gemini(prompt, key){
    key = key || getKey();
    if(!key) throw new Error('Add your free Gemini API key first (see the key box). Get one free at Google AI Studio — no card needed.');
    var url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + encodeURIComponent(key);
    var res = await fetch(url, { method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ contents:[{ parts:[{ text: prompt }] }], generationConfig:{ temperature: 0.8 } }) });
    var data = await res.json().catch(function(){ return {}; });
    if(!res.ok){
      var msg = (data.error && data.error.message) || ('Gemini returned HTTP ' + res.status);
      if(res.status === 400) msg += ' — check the key is a valid Gemini API key.';
      if(res.status === 429) msg += ' — free-tier daily limit reached; try again tomorrow or use a second key.';
      throw new Error(msg);
    }
    var parts = (((data.candidates||[])[0]||{}).content||{}).parts || [];
    return parts.map(function(p){ return p.text || ''; }).join('');
  }

  function brandVoicePrompt(){
    var b = getBrand();
    var bits = [];
    if(b.tone) bits.push('Tone: ' + b.tone);
    if(b.audience) bits.push('Audience: ' + b.audience);
    if(b.banned) bits.push('Never use these words or phrases: ' + b.banned);
    if(b.hooks) bits.push('Hooks that worked before (reuse their style): ' + b.hooks);
    if(b.brandName) bits.push('Brand name: ' + b.brandName);
    if(b.tagline) bits.push('Tagline: ' + b.tagline);
    return bits.length ? ('\n\nBRAND VOICE (apply to everything):\n' + bits.join('\n')) : '';
  }

  /* Wire every [data-copy] button on the page. */
  document.addEventListener('click', function(e){
    var btn = e.target.closest('[data-copy]');
    if(!btn) return;
    var target = btn.getAttribute('data-copy-target');
    var text = target ? (document.getElementById(target) ? document.getElementById(target).innerText : '') : (btn.getAttribute('data-copy') || '');
    if(text) copyText(text, btn);
  });

  window.AH = { K:K, load:load, save:save, getBrand:getBrand, getBrandKit:getBrandKit,
    getKey:getKey, setKey:setKey, getKits:getKits, saveKits:saveKits, getCal:getCal, saveCal:saveCal,
    toast:toast, copyText:copyText, esc:esc, download:download, uid:uid, todayISO:todayISO,
    gemini:gemini, brandVoicePrompt:brandVoicePrompt };
})();
