/* AdHarbor Studio — one brief -> full campaign kit via the user's free Gemini key. */
(function(){
  'use strict';
  var $ = function(id){ return document.getElementById(id); };
  var currentKit = null;

  function brief(){
    return {
      product: $('product').value.trim(),
      audience: $('audience').value.trim(),
      offer: $('offer').value.trim(),
      tone: $('tone').value,
      goal: $('goal').value,
      extra: $('extra').value.trim()
    };
  }
  function briefText(b){
    return 'Product/service: ' + b.product + '\nAudience: ' + b.audience +
      (b.offer ? '\nOffer/hook: ' + b.offer : '') +
      (b.tone ? '\nTone: ' + b.tone : '') +
      '\nGoal: ' + b.goal + (b.extra ? '\nNotes: ' + b.extra : '');
  }
  function systemNote(){
    return 'You are AdHarbor, an expert direct-response copywriter. Write punchy, specific, human copy. No filler, no clichés, no emojis unless they fit the tone. Never use the words in the banned list. Every variant must be genuinely different, not a rewording of the same line.';
  }
  function fullPrompt(b){
    return systemNote() + AH.brandVoicePrompt() +
      '\n\nBRIEF:\n' + briefText(b) +
      '\n\nReturn ONLY valid JSON (no markdown fences, no commentary) with exactly these keys:\n' +
      '{\n' +
      ' "metaAds": [{"headline":"", "primaryText":"", "cta":""}, x3],\n' +
      ' "googleAds": [{"headline":"max 30 chars", "description":"max 90 chars"}, x3],\n' +
      ' "tiktok": ["hook caption 1", "hook caption 2", "hook caption 3"],\n' +
      ' "linkedin": ["post 1 (100-150 words)", "post 2 (100-150 words)"],\n' +
      ' "captions": ["caption 1", "caption 2", "caption 3", "caption 4"],\n' +
      ' "hashtags": ["#tag1", ... 12 tags, niche-specific, no generic #love or #instagood],\n' +
      ' "email": {"subjects": ["subject 1", "subject 2", "subject 3"], "body": "full email body, greeting to sign-off"},\n' +
      ' "productDescription": "2 short paragraphs for a product page"\n' +
      '}';
  }
  function sectionPrompt(b, section){
    var map = {
      metaAds: 'Return ONLY valid JSON: {"metaAds": [{"headline":"", "primaryText":"", "cta":""}, x3]} — three genuinely different Meta/Facebook ad variants.',
      googleAds: 'Return ONLY valid JSON: {"googleAds": [{"headline":"max 30 chars", "description":"max 90 chars"}, x3]} — three Google Search ad variants.',
      tiktok: 'Return ONLY valid JSON: {"tiktok": ["hook caption 1", "hook caption 2", "hook caption 3"]} — three punchy TikTok hook captions under 150 characters.',
      linkedin: 'Return ONLY valid JSON: {"linkedin": ["post 1 (100-150 words)", "post 2 (100-150 words)"]} — two professional LinkedIn posts, no hashtags spam.',
      captions: 'Return ONLY valid JSON: {"captions": ["caption 1", "caption 2", "caption 3", "caption 4"]} — four Instagram-ready captions, each with a different angle.',
      hashtags: 'Return ONLY valid JSON: {"hashtags": ["#tag1", ... 12 tags]} — 12 niche-specific hashtags, no generic #love or #instagood.',
      email: 'Return ONLY valid JSON: {"email": {"subjects": ["subject 1", "subject 2", "subject 3"], "body": "full email body, greeting to sign-off"}}.',
      productDescription: 'Return ONLY valid JSON: {"productDescription": "2 short paragraphs for a product page"}.'
    };
    return systemNote() + AH.brandVoicePrompt() + '\n\nBRIEF:\n' + briefText(b) + '\n\n' + (map[section] || '');
  }
  function parseKit(text){
    var t = text.trim().replace(/^```(?:json)?/i, '').replace(/```$/, '').trim();
    var start = t.indexOf('{'), end = t.lastIndexOf('}');
    if(start >= 0 && end > start) t = t.slice(start, end + 1);
    return JSON.parse(t);
  }
  function setStatus(msg, kind){
    var s = $('genStatus'); s.textContent = msg || '';
    s.className = 'mini' + (kind ? ' ' + kind : '');
  }
  function itemHtml(title, bodyHtml, copyText, regenSection){
    var regen = regenSection ? ' <button class="copy-btn" data-regen="' + regenSection + '" type="button">Regenerate</button>' : '';
    return '<div class="item"><b>' + title + '</b>' + regen + '<p>' + bodyHtml + '</p>' +
      (copyText ? '<button class="copy-btn" type="button" data-copy-text="' + AH.esc(copyText) + '">Copy</button>' : '') + '</div>';
  }
  function blockHtml(title, inner, copyText, regenSection){
    var regen = regenSection ? ' <button class="copy-btn" data-regen="' + regenSection + '" type="button">Regenerate</button>' : '';
    var copy = copyText ? '<button class="copy-btn" type="button" data-copy-text="' + AH.esc(copyText) + '">Copy</button>' : '';
    return '<div class="kit-out"><h4>' + title + '<span>' + regen + ' ' + copy + '</span></h4>' + inner + '</div>';
  }
  function renderKit(kit){
    var out = '';
    if(kit.metaAds && kit.metaAds.length){
      var inner = kit.metaAds.map(function(a, i){
        return itemHtml('Variant ' + (i+1) + ' — ' + AH.esc(a.headline || ''),
          AH.esc(a.primaryText || '') + '<br><span class="mini">CTA: ' + AH.esc(a.cta || '') + '</span>',
          (a.headline||'') + '\n' + (a.primaryText||'') + '\nCTA: ' + (a.cta||''));
      }).join('');
      out += blockHtml('Meta / Facebook ads', inner, kit.metaAds.map(function(a){ return (a.headline||'') + '\n' + (a.primaryText||'') + '\nCTA: ' + (a.cta||''); }).join('\n\n'), 'metaAds');
    }
    if(kit.googleAds && kit.googleAds.length){
      var g = kit.googleAds.map(function(a, i){
        return itemHtml('Ad ' + (i+1), '<b>' + AH.esc(a.headline||'') + '</b><br>' + AH.esc(a.description||''), (a.headline||'') + ' — ' + (a.description||''));
      }).join('');
      out += blockHtml('Google Search ads', g, kit.googleAds.map(function(a){ return (a.headline||'') + ' — ' + (a.description||''); }).join('\n'), 'googleAds');
    }
    if(kit.tiktok && kit.tiktok.length){
      var t = kit.tiktok.map(function(c, i){ return itemHtml('Hook ' + (i+1), AH.esc(c), c); }).join('');
      out += blockHtml('TikTok hooks', t, kit.tiktok.join('\n'), 'tiktok');
    }
    if(kit.linkedin && kit.linkedin.length){
      var l = kit.linkedin.map(function(p, i){ return itemHtml('Post ' + (i+1), AH.esc(p), p); }).join('');
      out += blockHtml('LinkedIn posts', l, kit.linkedin.join('\n\n'), 'linkedin');
    }
    if(kit.captions && kit.captions.length){
      var c = kit.captions.map(function(p, i){ return itemHtml('Caption ' + (i+1), AH.esc(p), p); }).join('');
      out += blockHtml('Social captions', c, kit.captions.join('\n\n'), 'captions');
    }
    if(kit.hashtags && kit.hashtags.length){
      var tags = kit.hashtags.map(function(h){ return h.trim().startsWith('#') ? h.trim() : '#' + h.trim(); });
      out += blockHtml('Hashtags', '<p class="hash">' + AH.esc(tags.join(' ')) + '</p>', tags.join(' '), 'hashtags');
    }
    if(kit.email){
      var e = '';
      if(kit.email.subjects) e += itemHtml('Subject lines', kit.email.subjects.map(AH.esc).join('<br>'), kit.email.subjects.join('\n'));
      if(kit.email.body) e += itemHtml('Email body', AH.esc(kit.email.body), kit.email.body);
      out += blockHtml('Email', e, (kit.email.subjects||[]).join('\n') + '\n\n' + (kit.email.body||''), 'email');
    }
    if(kit.productDescription){
      out += blockHtml('Product description', '<p>' + AH.esc(kit.productDescription) + '</p>', kit.productDescription, 'productDescription');
    }
    $('kitOut').innerHTML = out || '<p class="muted">The model returned something unexpected. Try generating again.</p>';
    $('kitStatus').textContent = 'Kit ready ✓';
    $('kitStatus').className = 'status live';
    $('kitActions').style.display = 'flex';
    bindCopyButtons();
  }
  function bindCopyButtons(){
    document.querySelectorAll('#kitOut [data-copy-text]').forEach(function(btn){
      btn.addEventListener('click', function(){ AH.copyText(btn.getAttribute('data-copy-text'), btn); });
    });
    document.querySelectorAll('#kitOut [data-regen]').forEach(function(btn){
      btn.addEventListener('click', function(){ regenSection(btn.getAttribute('data-regen'), btn); });
    });
  }
  async function regenSection(section, btn){
    var b = brief();
    if(!b.product || !b.audience){ AH.toast('Fill in the product and audience first'); return; }
    var old = btn.textContent; btn.textContent = 'Working…'; btn.disabled = true;
    try {
      var raw = await AH.gemini(sectionPrompt(b, section));
      var part = parseKit(raw);
      if(!currentKit) currentKit = {};
      Object.keys(part).forEach(function(k){ currentKit[k] = part[k]; });
      currentKit.brief = b; currentKit.created = new Date().toISOString();
      renderKit(currentKit);
      AH.toast('Section regenerated');
    } catch(err){ AH.toast('Error: ' + err.message); setStatus('Error: ' + err.message); }
    btn.textContent = old; btn.disabled = false;
  }
  async function generate(){
    var b = brief();
    if(!b.product || !b.audience){ setStatus('Please fill in the product and the audience — those two are required.'); return; }
    var btn = $('genBtn'); btn.disabled = true; btn.textContent = 'Generating…';
    setStatus('Asking Gemini for your full kit — ad copy, captions, hashtags, email…');
    $('kitStatus').textContent = 'Generating…'; $('kitStatus').className = 'status warn';
    try {
      var raw = await AH.gemini(fullPrompt(b));
      var kit;
      try { kit = parseKit(raw); }
      catch(e){
        $('kitOut').innerHTML = '<div class="kit-out"><h4>Raw output (could not parse as JSON)</h4><p style="white-space:pre-wrap">' + AH.esc(raw) + '</p><button class="copy-btn" type="button" data-copy-text="' + AH.esc(raw) + '">Copy</button></div>';
        bindCopyButtons();
        kit = { raw: raw };
      }
      currentKit = kit; currentKit.brief = b; currentKit.created = new Date().toISOString();
      if(!kit.raw) renderKit(currentKit);
      else { $('kitStatus').textContent = 'Raw output'; $('kitStatus').className = 'status warn'; $('kitActions').style.display = 'flex'; }
      setStatus('Done — your kit is ready. Copy any block, save it, or send it to the calendar.');
    } catch(err){
      setStatus('Error: ' + err.message);
      $('kitStatus').textContent = 'Error'; $('kitStatus').className = 'status err';
    }
    btn.disabled = false; btn.textContent = 'Generate campaign kit';
  }
  function kitToText(kit){
    var lines = [];
    lines.push('CAMPAIGN KIT — ' + (kit.brief ? kit.brief.product : 'AdHarbor'));
    if(kit.brief) lines.push('Audience: ' + kit.brief.audience + (kit.brief.offer ? ' | Offer: ' + kit.brief.offer : ''));
    lines.push('');
    function sec(name, arr, fmt){
      if(!arr || !arr.length) return;
      lines.push('## ' + name);
      arr.forEach(function(x){ lines.push(fmt(x)); lines.push(''); });
    }
    sec('Meta / Facebook ads', kit.metaAds, function(a){ return (a.headline||'') + '\n' + (a.primaryText||'') + '\nCTA: ' + (a.cta||''); });
    sec('Google Search ads', kit.googleAds, function(a){ return (a.headline||'') + ' — ' + (a.description||''); });
    sec('TikTok hooks', kit.tiktok, function(x){ return x; });
    sec('LinkedIn posts', kit.linkedin, function(x){ return x; });
    sec('Social captions', kit.captions, function(x){ return x; });
    if(kit.hashtags) lines.push('## Hashtags\n' + kit.hashtags.join(' ') + '\n');
    if(kit.email){ lines.push('## Email\nSubjects:\n' + (kit.email.subjects||[]).join('\n') + '\n\n' + (kit.email.body||'') + '\n'); }
    if(kit.productDescription) lines.push('## Product description\n' + kit.productDescription + '\n');
    return lines.join('\n');
  }
  function renderKitList(){
    var kits = AH.getKits();
    var el = $('kitList');
    if(!kits.length){ el.innerHTML = '<p class="muted">No saved kits yet.</p>'; return; }
    el.innerHTML = kits.map(function(k){
      return '<div class="kit-card"><b>' + AH.esc((k.brief && k.brief.product) || 'Untitled kit') + '</b>' +
        '<p>' + AH.esc((k.brief && k.brief.audience) || '') + ' · ' + new Date(k.created).toLocaleDateString() + '</p>' +
        '<div class="row"><button class="copy-btn" data-load="' + k.id + '" type="button">Load</button>' +
        '<button class="copy-btn" data-tocal="' + k.id + '" type="button">Send to calendar</button>' +
        '<button class="copy-btn" data-del="' + k.id + '" type="button">Delete</button></div></div>';
    }).join('');
    el.querySelectorAll('[data-load]').forEach(function(btn){
      btn.addEventListener('click', function(){
        var k = AH.getKits().find(function(x){ return x.id === btn.getAttribute('data-load'); });
        if(!k) return;
        currentKit = k;
        if(k.brief){ $('product').value = k.brief.product || ''; $('audience').value = k.brief.audience || ''; $('offer').value = k.brief.offer || ''; $('extra').value = k.brief.extra || ''; }
        if(!k.raw) renderKit(k); else { $('kitOut').innerHTML = '<p class="muted">This kit was saved as raw text.</p>'; }
        AH.toast('Kit loaded');
        window.scrollTo({top:0, behavior:'smooth'});
      });
    });
    el.querySelectorAll('[data-del]').forEach(function(btn){
      btn.addEventListener('click', function(){
        AH.saveKits(AH.getKits().filter(function(x){ return x.id !== btn.getAttribute('data-del'); }));
        renderKitList(); AH.toast('Kit deleted');
      });
    });
    el.querySelectorAll('[data-tocal]').forEach(function(btn){
      btn.addEventListener('click', function(){
        var k = AH.getKits().find(function(x){ return x.id === btn.getAttribute('data-tocal'); });
        if(k) sendToCalendar(k);
      });
    });
  }
  function sendToCalendar(k){
    var caption = (k.captions && k.captions[0]) || (k.tiktok && k.tiktok[0]) || '';
    var tags = (k.hashtags || []).join(' ');
    var cal = AH.getCal();
    var d = AH.todayISO();
    cal[d] = { kitId: k.id, platform: 'Instagram', caption: caption, hashtags: tags, time: '19:00' };
    if(AH.saveCal(cal)){ AH.toast('Added to today in the calendar'); }
    else { AH.toast('Could not save — browser storage is full'); }
  }
  function init(){
    var key = AH.getKey();
    if(key){ $('apiKey').value = key; $('keyStatus').textContent = 'Key saved in this browser ✓ (only you can see it — it never leaves this device except to call Google).'; }
    var bv = AH.getBrand();
    $('voiceNote').textContent = bv.tone || bv.audience ? ('Brand Voice active: ' + [bv.tone, bv.audience].filter(Boolean).join(' · ') + ' — edit it on the Brand Voice page.') : 'Tip: set your Brand Voice once and every kit will sound like you.';
    $('saveKeyBtn').addEventListener('click', function(){
      var v = $('apiKey').value.trim();
      if(!v){ AH.toast('Paste a key first'); return; }
      AH.setKey(v);
      $('keyStatus').textContent = 'Key saved in this browser ✓';
      AH.toast('Key saved (local only)');
    });
    $('testKeyBtn').addEventListener('click', async function(){
      var v = $('apiKey').value.trim() || AH.getKey();
      if(!v){ AH.toast('Paste a key first'); return; }
      $('keyStatus').textContent = 'Testing…';
      try {
        var r = await AH.gemini('Reply with exactly: OK', v);
        $('keyStatus').textContent = 'Key works ✓ Gemini replied: ' + r.trim().slice(0, 40);
        AH.setKey(v);
      } catch(err){ $('keyStatus').textContent = 'Key failed: ' + err.message; }
    });
    $('genBtn').addEventListener('click', generate);
    $('sampleBtn').addEventListener('click', function(){
      $('product').value = 'Hand-poured soy candles, 40-hour burn, lavender & cedar, $18';
      $('audience').value = 'Women 25–45 who buy self-care gifts online';
      $('offer').value = '20% off this week + free shipping over $35';
      $('extra').value = 'Mention the 40-hour burn time. Keep it calm, not shouty.';
      AH.toast('Sample brief filled — press Generate');
    });
    $('saveKitBtn').addEventListener('click', function(){
      if(!currentKit){ AH.toast('Generate a kit first'); return; }
      var kits = AH.getKits();
      currentKit.id = currentKit.id || AH.uid();
      var i = kits.findIndex(function(x){ return x.id === currentKit.id; });
      if(i >= 0) kits[i] = currentKit; else kits.unshift(currentKit);
      if(AH.saveKits(kits)){ renderKitList(); AH.toast('Kit saved'); } else { AH.toast('Could not save — browser storage is full'); }
    });
    $('copyAllBtn').addEventListener('click', function(){
      if(!currentKit) return;
      AH.copyText(kitToText(currentKit), $('copyAllBtn'));
    });
    $('sendCalBtn').addEventListener('click', function(){
      if(!currentKit) return;
      if(!currentKit.id) currentKit.id = AH.uid();
      var kits = AH.getKits();
      if(!kits.find(function(x){ return x.id === currentKit.id; })){ kits.unshift(currentKit); AH.saveKits(kits); renderKitList(); }
      sendToCalendar(currentKit);
    });
    renderKitList();
  }
  document.addEventListener('DOMContentLoaded', init);
})();
