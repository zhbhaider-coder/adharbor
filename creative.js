/* AdHarbor Creative Studio — canvas templates, brand kit, stock photos, PNG export. */
(function(){
  'use strict';
  var $ = function(id){ return document.getElementById(id); };

  var TEMPLATES = [
    {id:'sale-bold', name:'Big Sale', cat:'Sale', bg:['#dc2626','#7f1d1d'], accent:'#fbbf24', text:'#ffffff', layout:'center'},
    {id:'sale-clean', name:'Sale — Clean', cat:'Sale', bg:['#ffffff','#f1f5f9'], accent:'#dc2626', text:'#0b2239', layout:'center'},
    {id:'sale-dark', name:'Sale — Dark', cat:'Sale', bg:['#111827','#0b2239'], accent:'#f59e0b', text:'#ffffff', layout:'center'},
    {id:'sale-flash', name:'Flash Sale', cat:'Sale', bg:['#f59e0b','#ea580c'], accent:'#0b2239', text:'#ffffff', layout:'badge'},
    {id:'launch-neon', name:'Launch — Neon', cat:'Launch', bg:['#0d9488','#0b2239'], accent:'#f59e0b', text:'#ffffff', layout:'center'},
    {id:'launch-light', name:'Launch — Light', cat:'Launch', bg:['#f0fdfa','#ccfbf1'], accent:'#0d9488', text:'#0b2239', layout:'top'},
    {id:'launch-midnight', name:'Launch — Midnight', cat:'Launch', bg:['#1e1b4b','#312e81'], accent:'#a5b4fc', text:'#ffffff', layout:'center'},
    {id:'launch-minimal', name:'Launch — Minimal', cat:'Launch', bg:['#ffffff','#ffffff'], accent:'#0d9488', text:'#0b2239', layout:'top'},
    {id:'quote-serif', name:'Quote — Serif', cat:'Quote', bg:['#fef3c7','#fde68a'], accent:'#92400e', text:'#451a03', layout:'center'},
    {id:'quote-dark', name:'Quote — Dark', cat:'Quote', bg:['#0b2239','#134e4a'], accent:'#2dd4bf', text:'#ffffff', layout:'center'},
    {id:'quote-soft', name:'Quote — Soft', cat:'Quote', bg:['#fdf2f8','#fce7f3'], accent:'#be185d', text:'#500724', layout:'center'},
    {id:'product-hero', name:'Product — Hero', cat:'Product', bg:['#e0f2fe','#bae6fd'], accent:'#0369a1', text:'#0c4a6e', layout:'bottom'},
    {id:'product-bold', name:'Product — Bold', cat:'Product', bg:['#0d9488','#115e59'], accent:'#fbbf24', text:'#ffffff', layout:'bottom'},
    {id:'product-clean', name:'Product — Clean', cat:'Product', bg:['#f8fafc','#e2e8f0'], accent:'#0f766e', text:'#0b2239', layout:'bottom'},
    {id:'product-luxe', name:'Product — Luxe', cat:'Product', bg:['#1c1917','#44403c'], accent:'#d6a419', text:'#fafaf9', layout:'bottom'},
    {id:'testi-warm', name:'Testimonial — Warm', cat:'Testimonial', bg:['#fff7ed','#ffedd5'], accent:'#c2410c', text:'#431407', layout:'center'},
    {id:'testi-cool', name:'Testimonial — Cool', cat:'Testimonial', bg:['#eff6ff','#dbeafe'], accent:'#1d4ed8', text:'#172554', layout:'center'},
    {id:'testi-dark', name:'Testimonial — Dark', cat:'Testimonial', bg:['#111827','#1f2937'], accent:'#34d399', text:'#ffffff', layout:'center'},
    {id:'announce-pop', name:'New — Pop', cat:'Announcement', bg:['#7c3aed','#4c1d95'], accent:'#fbbf24', text:'#ffffff', layout:'badge'},
    {id:'announce-fresh', name:'New — Fresh', cat:'Announcement', bg:['#dcfce7','#bbf7d0'], accent:'#15803d', text:'#14532d', layout:'top'},
    {id:'announce-bold', name:'New — Bold', cat:'Announcement', bg:['#be123c','#881337'], accent:'#fda4af', text:'#ffffff', layout:'center'},
    {id:'deal-green', name:'Deal — Green', cat:'Discount', bg:['#15803d','#14532d'], accent:'#fde047', text:'#ffffff', layout:'center'},
    {id:'deal-blue', name:'Deal — Blue', cat:'Discount', bg:['#1d4ed8','#1e3a8a'], accent:'#fbbf24', text:'#ffffff', layout:'badge'},
    {id:'deal-pink', name:'Deal — Pink', cat:'Discount', bg:['#db2777','#9d174d'], accent:'#fbcfe8', text:'#ffffff', layout:'center'}
  ];

  var STOCK = [
    {label:'Headphones', url:'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80'},
    {label:'Watch', url:'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80'},
    {label:'Sneaker', url:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80'},
    {label:'Shoes', url:'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=1200&q=80'},
    {label:'Camera', url:'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1200&q=80'},
    {label:'Sunglasses', url:'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1200&q=80'},
    {label:'Smartwatch', url:'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=1200&q=80'},
    {label:'Perfume', url:'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=1200&q=80'},
    {label:'Skincare', url:'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80'},
    {label:'Store', url:'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80'},
    {label:'Checkout', url:'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80'},
    {label:'Shopping', url:'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80'},
    {label:'Coffee', url:'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80'},
    {label:'Earbuds', url:'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1200&q=80'}
  ];

  var state = { size:[1080,1080], tpl:TEMPLATES[0], photo:null, photoImg:null, logoImg:null, useKitColors:false };
  var canvas, ctx;

  function currentKit(){ return AH.getBrandKit(); }

  function renderTemplates(){
    var g = $('tplGrid');
    g.innerHTML = TEMPLATES.map(function(t){
      var grad = 'linear-gradient(135deg,' + t.bg[0] + ',' + t.bg[1] + ')';
      return '<button type="button" class="tpl' + (state.tpl.id === t.id ? ' on' : '') + '" data-tpl="' + t.id + '">' +
        '<span class="sw" style="background:' + grad + ';color:' + t.text + '">' + AH.esc(t.name) + '</span>' +
        '<span class="nm">' + AH.esc(t.name) + '</span><span class="ct">' + AH.esc(t.cat) + '</span></button>';
    }).join('');
    $('tplCount').textContent = '(' + TEMPLATES.length + ' templates)';
    g.querySelectorAll('[data-tpl]').forEach(function(b){
      b.addEventListener('click', function(){
        state.tpl = TEMPLATES.find(function(t){ return t.id === b.getAttribute('data-tpl'); });
        renderTemplates(); draw();
      });
    });
  }
  function renderStock(){
    var g = $('stockGrid');
    g.innerHTML = STOCK.map(function(s, i){
      return '<img src="' + s.url + '" alt="' + AH.esc(s.label) + '" title="' + AH.esc(s.label) + '" data-stock="' + i + '" loading="lazy">';
    }).join('');
    g.querySelectorAll('[data-stock]').forEach(function(img){
      img.addEventListener('click', function(){
        g.querySelectorAll('img').forEach(function(x){ x.classList.remove('on'); });
        img.classList.add('on');
        loadPhoto(STOCK[+img.getAttribute('data-stock')].url);
      });
    });
  }
  function loadPhoto(src){
    var img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = function(){ state.photoImg = img; state.photo = src; draw(); AH.toast('Photo loaded'); };
    img.onerror = function(){ AH.toast('Could not load that photo — try another'); };
    img.src = src;
  }
  function wrapText(text, maxW){
    var words = String(text || '').split(/\s+/).filter(Boolean);
    var lines = [], line = '';
    words.forEach(function(w){
      var test = line ? line + ' ' + w : w;
      if(ctx.measureText(test).width > maxW && line){ lines.push(line); line = w; }
      else line = test;
    });
    if(line) lines.push(line);
    return lines;
  }
  function draw(){
    var W = state.size[0], H = state.size[1];
    canvas.width = W; canvas.height = H;
    var t = state.tpl, kit = currentKit();
    var bg0 = t.bg[0], bg1 = t.bg[1];
    if(state.useKitColors){ bg0 = kit.primary; bg1 = kit.secondary; }
    var grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, bg0); grad.addColorStop(1, bg1);
    ctx.fillStyle = grad; ctx.fillRect(0, 0, W, H);
    if(state.photoImg){
      var iw = state.photoImg.naturalWidth, ih = state.photoImg.naturalHeight;
      var scale = Math.max(W / iw, H / ih);
      var dw = iw * scale, dh = ih * scale;
      ctx.drawImage(state.photoImg, (W - dw) / 2, (H - dh) / 2, dw, dh);
      var dim = (+$('cOverlay').value || 0) / 100;
      ctx.fillStyle = 'rgba(0,0,0,' + dim + ')'; ctx.fillRect(0, 0, W, H);
    }
    var font = kit.font || 'Arial';
    var fontCss = font.indexOf(' ') >= 0 ? '"' + font + '"' : font;
    var pad = Math.round(W * 0.07);
    var textColor = state.photoImg ? '#ffffff' : t.text;
    var accent = state.useKitColors ? kit.accent : t.accent;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    // brand row
    var brand = ($('cBrand').value || kit.brandName || '').trim();
    ctx.font = '700 ' + Math.round(W * 0.028) + 'px ' + fontCss;
    ctx.fillStyle = textColor;
    if(brand){
      ctx.textAlign = 'left';
      ctx.fillText(brand.toUpperCase(), pad, pad * 0.9);
      ctx.textAlign = 'center';
    }
    if(state.logoImg){
      var lw = Math.round(W * 0.14), lh = state.logoImg.naturalHeight * (lw / state.logoImg.naturalWidth);
      ctx.drawImage(state.logoImg, W - pad - lw, pad * 0.5, lw, Math.min(lh, W * 0.14));
    }
    // badge layout marker
    var headline = $('cHeadline').value.trim();
    var sub = $('cSub').value.trim();
    var cta = $('cCta').value.trim();
    var headSize = Math.round((+$('cFontSize').value || 96) * (W / 1080));
    var maxW = W - pad * 2;
    ctx.font = '800 ' + headSize + 'px ' + fontCss;
    var lines = wrapText(headline, maxW);
    var lineH = headSize * 1.12;
    var blockH = lines.length * lineH;
    var cy;
    if(t.layout === 'top') cy = H * 0.24;
    else if(t.layout === 'bottom') cy = H * 0.68;
    else cy = H * 0.46;
    var y = cy - blockH / 2 + lineH / 2;
    ctx.fillStyle = textColor;
    lines.forEach(function(ln){ ctx.fillText(ln, W / 2, y); y += lineH; });
    if(sub){
      ctx.font = '400 ' + Math.round(headSize * 0.42) + 'px ' + fontCss;
      var subLines = wrapText(sub, maxW);
      var sy = y + headSize * 0.32;
      subLines.forEach(function(ln){ ctx.fillText(ln, W / 2, sy); sy += headSize * 0.5; });
    }
    if(cta){
      var pillH = Math.round(headSize * 0.72);
      ctx.font = '800 ' + Math.round(headSize * 0.38) + 'px ' + fontCss;
      var tw = ctx.measureText(cta).width + pillH * 1.2;
      var py = H - pad - pillH;
      if(t.layout === 'top') py = H * 0.62;
      ctx.fillStyle = accent;
      roundRect(W / 2 - tw / 2, py, tw, pillH, pillH / 2);
      ctx.fill();
      ctx.fillStyle = (accent === '#f59e0b' || accent === '#fbbf24' || accent === '#fde047') ? '#0b2239' : '#ffffff';
      ctx.fillText(cta, W / 2, py + pillH / 2 + 1);
    }
    if(t.layout === 'badge'){
      var r = Math.round(W * 0.11);
      ctx.beginPath(); ctx.arc(W - pad - r * 0.7, pad + r * 0.9, r, 0, Math.PI * 2);
      ctx.fillStyle = accent; ctx.fill();
      ctx.fillStyle = '#0b2239';
      ctx.font = '800 ' + Math.round(r * 0.42) + 'px ' + fontCss;
      ctx.fillText('NEW', W - pad - r * 0.7, pad + r * 0.9);
    }
  }
  function roundRect(x, y, w, h, r){
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
  function fileToImage(file, cb){
    var rd = new FileReader();
    rd.onload = function(){ var img = new Image(); img.onload = function(){ cb(img, rd.result); }; img.src = rd.result; };
    rd.readAsDataURL(file);
  }
  function init(){
    canvas = $('stage'); ctx = canvas.getContext('2d');
    var kit = currentKit();
    $('bkPrimary').value = kit.primary || '#0d9488';
    $('bkSecondary').value = kit.secondary || '#0b2239';
    $('bkAccent').value = kit.accent || '#f59e0b';
    $('bkFont').value = kit.font || 'Arial';
    $('cBrand').value = kit.brandName || '';
    if(kit.logo){ var li = new Image(); li.onload = function(){ state.logoImg = li; draw(); }; li.src = kit.logo; $('logoStatus').textContent = 'Logo loaded from your brand kit ✓'; }
    renderTemplates(); renderStock(); draw();
    ['cHeadline','cSub','cCta','cBrand'].forEach(function(id){
      $(id).addEventListener('input', draw);
    });
    $('cFontSize').addEventListener('input', draw);
    $('cOverlay').addEventListener('input', draw);
    $('bkFont').addEventListener('change', draw);
    document.querySelectorAll('#sizePills .pill').forEach(function(p){
      p.addEventListener('click', function(){
        document.querySelectorAll('#sizePills .pill').forEach(function(x){ x.classList.remove('on'); });
        p.classList.add('on');
        state.size = p.getAttribute('data-size').split('x').map(Number);
        $('sizeLabel').textContent = state.size[0] + ' × ' + state.size[1];
        draw();
      });
    });
    $('photoUpload').addEventListener('change', function(){
      var f = this.files && this.files[0]; if(!f) return;
      fileToImage(f, function(img){ state.photoImg = img; state.photo = 'upload'; draw(); AH.toast('Photo loaded (kept in this browser only)'); });
    });
    $('clearPhotoBtn').addEventListener('click', function(){
      state.photoImg = null; state.photo = null;
      document.querySelectorAll('#stockGrid img').forEach(function(x){ x.classList.remove('on'); });
      $('photoUpload').value = ''; draw();
    });
    $('logoUpload').addEventListener('change', function(){
      var f = this.files && this.files[0]; if(!f) return;
      fileToImage(f, function(img, dataUrl){
        state.logoImg = img;
        var k = currentKit(); k.logo = dataUrl;
        if(AH.save(AH.K.kit, k)){ $('logoStatus').textContent = 'Logo saved to your brand kit ✓'; }
        else { $('logoStatus').textContent = 'Logo loaded for this session, but too large to save in the browser.'; }
        draw();
      });
    });
    $('saveKitBtn').addEventListener('click', function(){
      var k = currentKit();
      k.primary = $('bkPrimary').value; k.secondary = $('bkSecondary').value;
      k.accent = $('bkAccent').value; k.font = $('bkFont').value; k.brandName = $('cBrand').value.trim();
      if(AH.save(AH.K.kit, k)){ AH.toast('Brand kit saved'); draw(); } else { AH.toast('Could not save — browser storage is full'); }
    });
    $('useKitColorsBtn').addEventListener('click', function(){
      state.useKitColors = !state.useKitColors;
      this.textContent = state.useKitColors ? 'Using kit colours ✓ (tap to use template colours)' : 'Apply kit colours to this creative';
      draw();
    });
    $('exportBtn').addEventListener('click', function(){
      $('exportStatus').textContent = 'Rendering PNG…';
      canvas.toBlob(function(blob){
        if(!blob){ $('exportStatus').textContent = 'Export failed — try a different photo or template.'; return; }
        AH.download('adharbor-' + state.tpl.id + '-' + state.size[0] + 'x' + state.size[1] + '.png', blob, 'image/png');
        $('exportStatus').textContent = 'PNG downloaded: ' + state.size[0] + ' × ' + state.size[1] + ' ✓';
      }, 'image/png');
    });
    $('saveCalBtn').addEventListener('click', function(){
      var dataUrl = canvas.toDataURL('image/jpeg', 0.82);
      var cal = AH.getCal();
      var d = AH.todayISO();
      cal[d] = cal[d] || { platform:'Instagram', caption:'', hashtags:'', time:'19:00' };
      cal[d].creative = dataUrl;
      cal[d].creativeLabel = state.tpl.name + ' ' + state.size[0] + 'x' + state.size[1];
      if(AH.saveCal(cal)){ AH.toast('Creative saved to today in the calendar'); $('exportStatus').textContent = 'Saved to ' + d + ' in the calendar ✓ — open the Calendar to plan it.'; }
      else { AH.toast('Could not save — browser storage is full (try a smaller size)'); }
    });
    $('copyCapBtn').addEventListener('click', function(){
      var kits = AH.getKits();
      if(!kits.length){ AH.toast('No saved kits yet — generate one in the Studio first'); return; }
      var k = kits[0];
      var cap = (k.captions && k.captions[0]) || (k.tiktok && k.tiktok[0]) || '';
      var tags = (k.hashtags || []).join(' ');
      AH.copyText((cap + (tags ? '\n\n' + tags : '')).trim(), $('copyCapBtn'));
    });
  }
  document.addEventListener('DOMContentLoaded', init);
})();
