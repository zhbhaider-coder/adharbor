/* AdHarbor Calendar — plan from saved kits, export CSV / ICS / PNG. */
(function(){
  'use strict';
  var $ = function(id){ return document.getElementById(id); };
  var view = new Date(); view.setDate(1);
  var selected = null;
  var MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var DOW = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

  function iso(y, m, d){ return y + '-' + String(m+1).padStart(2,'0') + '-' + String(d).padStart(2,'0'); }
  function monthEntries(){
    var cal = AH.getCal(), y = view.getFullYear(), m = view.getMonth();
    var list = [];
    Object.keys(cal).sort().forEach(function(k){
      var p = k.split('-');
      if(+p[0] === y && +p[1] === m + 1) list.push({ date:k, data:cal[k] });
    });
    return list;
  }
  function render(){
    var y = view.getFullYear(), m = view.getMonth();
    $('calTitle').textContent = MONTHS[m] + ' ' + y;
    var cal = AH.getCal();
    var first = new Date(y, m, 1);
    var startDow = (first.getDay() + 6) % 7; // Monday-first
    var daysIn = new Date(y, m + 1, 0).getDate();
    var daysPrev = new Date(y, m, 0).getDate();
    var html = DOW.map(function(d){ return '<div class="cal-dow">' + d + '</div>'; }).join('');
    var cells = [];
    for(var i = 0; i < startDow; i++){
      cells.push({ d: daysPrev - startDow + 1 + i, other:true, date: iso(y, m - 1, daysPrev - startDow + 1 + i) });
    }
    for(var d = 1; d <= daysIn; d++) cells.push({ d:d, other:false, date: iso(y, m, d) });
    while(cells.length % 7) { var n = cells.length - startDow - daysIn + 1; cells.push({ d:n, other:true, date: iso(y, m + 1, n) }); }
    html += cells.map(function(c){
      var ev = cal[c.date];
      var evHtml = '';
      if(ev){
        var cap = (ev.caption || '').slice(0, 42);
        evHtml = '<div class="ev">' + AH.esc(cap) + '<span class="pl">' + AH.esc(ev.platform || '') + (ev.time ? ' · ' + AH.esc(ev.time) : '') + '</span></div>';
      }
      return '<div class="cal-day' + (c.other ? ' other' : '') + (selected === c.date ? ' sel' : '') + '" data-date="' + c.date + '"><div class="d">' + c.d + '</div>' + evHtml + '</div>';
    }).join('');
    $('calGrid').innerHTML = html;
    document.querySelectorAll('.cal-day').forEach(function(el){
      el.addEventListener('click', function(){ selectDay(el.getAttribute('data-date')); });
    });
    var entries = monthEntries();
    $('monthSummary').textContent = entries.length ? entries.length + ' post' + (entries.length > 1 ? 's' : '') + ' planned in ' + MONTHS[m] + ': ' + entries.map(function(e){ return e.date.slice(8) + ' ' + (e.data.platform || ''); }).join(', ') : 'Nothing planned yet.';
    renderKitList();
  }
  function renderKitList(){
    var kits = AH.getKits();
    var el = $('calKitList');
    if(!kits.length){ el.innerHTML = '<p class="muted">No saved kits yet — generate one in the <a href="studio.html" style="text-decoration:underline">Studio</a>.</p>'; return; }
    el.innerHTML = kits.map(function(k){
      return '<div class="kit-card"><b>' + AH.esc((k.brief && k.brief.product) || 'Untitled kit') + '</b><p>' + AH.esc((k.brief && k.brief.audience) || '') + '</p></div>';
    }).join('');
    var sel = $('dKit');
    var cur = sel.value;
    sel.innerHTML = '<option value="">— write it by hand —</option>' + kits.map(function(k){
      return '<option value="' + k.id + '">' + AH.esc((k.brief && k.brief.product) || 'Untitled kit') + '</option>';
    }).join('');
    if(cur) sel.value = cur;
  }
  function selectDay(date){
    selected = date;
    var cal = AH.getCal();
    var ev = cal[date] || {};
    $('dayTitle').textContent = 'Plan ' + date;
    $('dayForm').style.display = 'block';
    $('dPlatform').value = ev.platform || 'Instagram';
    $('dCaption').value = ev.caption || '';
    $('dTags').value = ev.hashtags || '';
    $('dTime').value = ev.time || '19:00';
    if(ev.creative){ $('dCreativeWrap').style.display = 'block'; $('dCreativeLabel').textContent = ev.creativeLabel || 'Creative attached'; $('dCreativeImg').src = ev.creative; }
    else { $('dCreativeWrap').style.display = 'none'; $('dCreativeImg').src = ''; }
    $('dStatus').textContent = '';
    render();
    $('dayTitle').scrollIntoView({behavior:'smooth', block:'nearest'});
  }
  function csvCell(s){ return '"' + String(s || '').replace(/"/g, '""') + '"'; }
  function icsDate(d, t){
    var p = d.split('-'), hm = (t || '19:00').split(':');
    var dt = new Date(+p[0], +p[1] - 1, +p[2], +hm[0], +hm[1] || 0);
    function f(n){ return String(n).padStart(2, '0'); }
    return dt.getFullYear() + f(dt.getMonth() + 1) + f(dt.getDate()) + 'T' + f(dt.getHours()) + f(dt.getMinutes()) + '00';
  }
  function init(){
    $('prevMonth').addEventListener('click', function(){ view.setMonth(view.getMonth() - 1); render(); });
    $('nextMonth').addEventListener('click', function(){ view.setMonth(view.getMonth() + 1); render(); });
    $('dKit').addEventListener('change', function(){
      var k = AH.getKits().find(function(x){ return x.id === $('dKit').value; });
      if(!k) return;
      $('dCaption').value = (k.captions && k.captions[0]) || (k.tiktok && k.tiktok[0]) || '';
      $('dTags').value = (k.hashtags || []).join(' ');
    });
    $('dSave').addEventListener('click', function(){
      if(!selected){ AH.toast('Pick a day first'); return; }
      var cal = AH.getCal();
      var prev = cal[selected] || {};
      cal[selected] = {
        kitId: $('dKit').value || prev.kitId || '',
        platform: $('dPlatform').value,
        caption: $('dCaption').value.trim(),
        hashtags: $('dTags').value.trim(),
        time: $('dTime').value.trim() || '19:00',
        creative: prev.creative || '', creativeLabel: prev.creativeLabel || ''
      };
      if(AH.saveCal(cal)){ $('dStatus').textContent = 'Saved ✓'; render(); } else { $('dStatus').textContent = 'Could not save — browser storage is full.'; }
    });
    $('dClear').addEventListener('click', function(){
      if(!selected) return;
      var cal = AH.getCal(); delete cal[selected];
      AH.saveCal(cal);
      $('dCaption').value = ''; $('dTags').value = ''; $('dCreativeWrap').style.display = 'none';
      $('dStatus').textContent = 'Day cleared.'; render();
    });
    $('expCsv').addEventListener('click', function(){
      var entries = monthEntries();
      if(!entries.length){ $('expStatus').textContent = 'Nothing planned this month yet.'; return; }
      var rows = ['date,time,platform,caption,hashtags'];
      entries.forEach(function(e){
        rows.push([e.date, e.data.time || '', e.data.platform || '', e.data.caption || '', e.data.hashtags || ''].map(csvCell).join(','));
      });
      AH.download('adharbor-calendar-' + view.getFullYear() + '-' + String(view.getMonth() + 1).padStart(2, '0') + '.csv', rows.join('\n'), 'text/csv');
      $('expStatus').textContent = 'CSV downloaded: ' + entries.length + ' posts ✓';
    });
    $('expIcs').addEventListener('click', function(){
      var entries = monthEntries();
      if(!entries.length){ $('expStatus').textContent = 'Nothing planned this month yet.'; return; }
      var lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//AdHarbor//Content Calendar//EN'];
      entries.forEach(function(e, i){
        var start = icsDate(e.date, e.data.time);
        lines.push('BEGIN:VEVENT', 'UID:adharbor-' + e.date + '-' + i + '@adharbor.pages.dev',
          'DTSTAMP:' + icsDate(AH.todayISO(), '00:00'),
          'DTSTART:' + start,
          'SUMMARY:' + (e.data.platform || 'Post') + ' — ' + (e.data.caption || '').slice(0, 60).replace(/[\r\n,;]/g, ' '),
          'DESCRIPTION:' + ((e.data.caption || '') + ' ' + (e.data.hashtags || '')).replace(/[\r\n,;]/g, ' ').slice(0, 400),
          'END:VEVENT');
      });
      lines.push('END:VCALENDAR');
      AH.download('adharbor-calendar-' + view.getFullYear() + '-' + String(view.getMonth() + 1).padStart(2, '0') + '.ics', lines.join('\r\n'), 'text/calendar');
      $('expStatus').textContent = 'ICS downloaded: ' + entries.length + ' events ✓ — import it into Google Calendar.';
    });
    $('expPng').addEventListener('click', function(){
      var entries = monthEntries().filter(function(e){ return e.data.creative; });
      if(!entries.length){ $('expStatus').textContent = 'No creatives attached this month — save one from the Creative Studio first.'; return; }
      $('expStatus').textContent = 'Downloading ' + entries.length + ' creative PNGs…';
      entries.forEach(function(e, i){
        setTimeout(function(){
          var a = document.createElement('a');
          a.href = e.data.creative; a.download = 'adharbor-' + e.date + '.png';
          document.body.appendChild(a); a.click(); a.remove();
        }, i * 600);
      });
      $('expStatus').textContent = entries.length + ' creative PNGs downloading ✓';
    });
    render();
  }
  document.addEventListener('DOMContentLoaded', init);
})();
