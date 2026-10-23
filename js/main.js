(function(){
  var WA='919925622955';
  var ICON={
    wa:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 3.5A11.8 11.8 0 0 0 1.9 17.8L0 24l6.4-1.7A11.8 11.8 0 0 0 12 23.8h.1A11.8 11.8 0 0 0 20.5 3.5ZM12 21.8a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.8 1 1-3.7-.2-.4a9.8 9.8 0 1 1 8.4 4.7Zm5.4-7.3c-.3-.1-1.8-.9-2-1s-.5-.1-.7.1-.8 1-1 1.2-.4.2-.7.1a8 8 0 0 1-4-3.5c-.3-.5.3-.5.8-1.6a.6.6 0 0 0 0-.6c-.1-.1-.7-1.7-1-2.3s-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.9.4 3.7 3.7 0 0 0-1.1 2.7 6.4 6.4 0 0 0 1.4 3.4 14.700 14.700 0 0 0 5.600 5c2.100.9 2.900 1 3.900.8a3.300 3.300 0 0 0 2.200-1.600 2.700 2.700 0 0 0 .2-1.600c-.1-.1-.3-.2-.6-.3Z"/></svg>',
    ig:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
    mail:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    phone:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.800 19.800 0 0 1 11.200 19a19.500 19.500 0 0 1-6-6A19.800 19.800 0 0 1 2.100 4.200 2 2 0 0 1 4.100 2h3a2 2 0 0 1 2 1.700c.1 1 .4 1.900.7 2.800a2 2 0 0 1-.5 2.100L8 9.900a16 16 0 0 0 6 6l1.300-1.300a2 2 0 0 1 2.100-.4c.9.3 1.800.6 2.800.7a2 2 0 0 1 1.700 2Z"/></svg>'
  };
  document.querySelectorAll('[data-i]').forEach(function(e){e.innerHTML=ICON[e.dataset.i]||''});

  // page transition: curtain lifts on load, drops on internal navigation
  var body=document.body;
  function ready(){requestAnimationFrame(function(){body.classList.add('loaded')})}
  if(document.readyState==='complete')ready();else addEventListener('load',ready);
  setTimeout(ready,2500);
  addEventListener('pageshow',function(e){if(e.persisted){body.classList.remove('leaving');ready()}});
  document.addEventListener('click',function(e){
    var a=e.target.closest('a');
    if(!a||a.target||e.metaKey||e.ctrlKey||e.shiftKey)return;
    var h=a.getAttribute('href');
    if(!h||h[0]==='#'||/^(mailto|tel|https?:)/.test(h)||a.href.split('#')[0]===location.href.split('#')[0])return;
    e.preventDefault();body.classList.add('leaving');
    setTimeout(function(){location.href=a.href},620);
  });

  // WhatsApp floating button with pop-up message
  var msg=encodeURIComponent('Hello Swastik Premium Poha, I would like to know more about your product.');
  var w=document.createElement('div');w.className='wa';
  w.innerHTML='<a class="b" href="https://wa.me/'+WA+'?text='+msg+'" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">'+ICON.wa+'</a>'+
    '<div class="tip">Namaste 🙏 Chat with us on WhatsApp for orders &amp; enquiries<button aria-label="Close">×</button></div>';
  body.appendChild(w);
  var tip=w.querySelector('.tip'),timer;
  tip.addEventListener('click',function(e){if(e.target.tagName==='BUTTON'){tip.classList.remove('show');clearInterval(timer)}else window.open(w.querySelector('a').href,'_blank')});
  function pop(){tip.classList.add('show');setTimeout(function(){tip.classList.remove('show')},5200)}
  setTimeout(pop,3200);timer=setInterval(pop,18000);

  // header + mobile nav
  var hd=document.querySelector('header'),nav=document.querySelector('nav'),bg=document.querySelector('.burger');
  if(bg)bg.addEventListener('click',function(){nav.classList.toggle('open');hd.classList.toggle('menu')});

  // scroll effects: header, parallax
  var par=[].slice.call(document.querySelectorAll('[data-par]'));
  function onScroll(){
    hd.classList.toggle('solid',scrollY>40);
    par.forEach(function(el){
      var host=el.parentElement,r=host.getBoundingClientRect();
      if(r.bottom<0||r.top>innerHeight)return;
      var k=parseFloat(el.dataset.par),c=(r.top+r.height/2-innerHeight/2);
      el.style.transform='translate3d(0,'+(c*k).toFixed(1)+'px,0)';
    });
  }
  addEventListener('scroll',function(){requestAnimationFrame(onScroll)},{passive:true});onScroll();

  // reveal on scroll
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.15});
  document.querySelectorAll('.rv').forEach(function(e){io.observe(e)});
  // clipped elements report no visible area, so watch their parent block instead
  document.querySelectorAll('.clip').forEach(function(c){
    var host=c.parentElement;
    new IntersectionObserver(function(es,o){if(es[0].isIntersecting){c.classList.add('in');o.disconnect()}},{threshold:.2}).observe(host);
  });

  // statement: words light up as they scroll in
  document.querySelectorAll('.statement p').forEach(function(p){
    p.innerHTML=p.textContent.trim().split(/\s+/).map(function(t){return '<span class="w">'+t+'</span>'}).join(' ');
    var ws=[].slice.call(p.querySelectorAll('.w'));
    function lit(){var r=p.getBoundingClientRect(),prog=(innerHeight*.85-r.top)/(r.height+innerHeight*.35);prog=Math.max(0,Math.min(1,prog));
      var n=Math.round(prog*ws.length);ws.forEach(function(s,i){s.classList.toggle('on',i<n)})}
    addEventListener('scroll',lit,{passive:true});lit();
  });

  // count-up numbers
  document.querySelectorAll('[data-count]').forEach(function(el){
    var end=parseFloat(el.dataset.count),dec=(el.dataset.count.split('.')[1]||'').length,suf=el.dataset.suffix||'',done=false;
    new IntersectionObserver(function(es,o){if(es[0].isIntersecting&&!done){done=true;var s=performance.now();
      (function f(now){var p=Math.min((now-s)/1600,1),e=1-Math.pow(1-p,3);el.textContent=(end*e).toFixed(dec)+suf;if(p<1)requestAnimationFrame(f)})(s);o.disconnect()}},{threshold:.5}).observe(el);
  });

  // enquiry form -> WhatsApp
  var f=document.getElementById('enquiry');
  if(f)f.addEventListener('submit',function(e){
    e.preventDefault();var d=new FormData(f);
    var text='Enquiry from website%0AName: '+encodeURIComponent(d.get('name'))+'%0AType: '+encodeURIComponent(d.get('type'))+'%0APhone: '+encodeURIComponent(d.get('phone'))+'%0AMessage: '+encodeURIComponent(d.get('message'));
    window.open('https://wa.me/'+WA+'?text='+text,'_blank');
  });
})();
