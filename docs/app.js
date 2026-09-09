const button=document.querySelector('.menu');const nav=document.querySelector('#nav');button.addEventListener('click',()=>{const open=button.getAttribute('aria-expanded')!=='true';button.setAttribute('aria-expanded',String(open));button.setAttribute('aria-label',open?'Menüyü kapat':'Menüyü aç');nav.classList.toggle('open',open)});document.addEventListener('keydown',e=>{if(e.key==='Escape'){button.setAttribute('aria-expanded','false');nav.classList.remove('open')}});

const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
if(!reducedMotion.matches && 'IntersectionObserver' in window){
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.08});
 document.querySelectorAll('.intro>div,.section-head,.card,.visit>div,.article article>h2,.gallery figure').forEach((el,i)=>{el.classList.add('reveal');el.style.setProperty('--delay',`${i%3*80}ms`);observer.observe(el)});
}
document.querySelectorAll('a[href]').forEach(link=>link.addEventListener('click',event=>{
 if(event.defaultPrevented||event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey||link.target||link.hasAttribute('download')||reducedMotion.matches)return;
 const next=new URL(link.href,location.href);
 if(next.origin!==location.origin||next.pathname===location.pathname)return;
 if(document.startViewTransition){event.preventDefault();document.body.classList.add('leaving');setTimeout(()=>location.assign(next.href),130)}
}));
window.addEventListener('pageshow',()=>document.body.classList.remove('leaving'));
