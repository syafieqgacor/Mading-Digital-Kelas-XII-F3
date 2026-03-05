// ===== SHARED MAIN.JS — Mading Digital Ramadhan =====

// CURSOR — desktop only (skip on touch devices)
(function(){
  const isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0 || window.matchMedia('(hover:none)').matches;
  if(isTouch) return;
  const cur=document.getElementById('cursor'),ring=document.getElementById('cursorRing');
  if(!cur||!ring)return;
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx+'px';cur.style.top=my+'px';});
  (function aR(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(aR);})();
  document.querySelectorAll('a,button,.art-main,.art-card-s,.tip-c,.doa-card,.info-point,.poster-card,.i-stat,.slide-card').forEach(el=>{
    el.addEventListener('mouseenter',()=>{cur.style.width='16px';cur.style.height='16px';ring.style.width='44px';ring.style.height='44px';ring.style.borderColor='var(--teal)';});
    el.addEventListener('mouseleave',()=>{cur.style.width='10px';cur.style.height='10px';ring.style.width='34px';ring.style.height='34px';ring.style.borderColor='var(--gold)';});
  });
})();

// PARTICLES
(function(){
  const cv=document.getElementById('bg-canvas');
  if(!cv)return;
  const cx=cv.getContext('2d');
  function rs(){cv.width=innerWidth;cv.height=innerHeight;}rs();addEventListener('resize',rs);
  const pts=Array.from({length:80},()=>rp({}));
  function rp(p){p.x=Math.random()*cv.width;p.y=Math.random()*cv.height;p.r=Math.random()*1.4+.3;p.vx=(Math.random()-.5)*.18;p.vy=-Math.random()*.25-.05;p.o=Math.random()*.25+.05;p.c=Math.random()>.5?'#b8860b':'#6b9e6b';return p;}
  (function dp(){cx.clearRect(0,0,cv.width,cv.height);pts.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.o-=.0007;if(p.y<0||p.o<=0)rp(p);cx.save();cx.globalAlpha=p.o;cx.fillStyle=p.c;cx.beginPath();cx.arc(p.x,p.y,p.r,0,Math.PI*2);cx.fill();cx.restore();});requestAnimationFrame(dp);})();
})();

// NAVBAR
window.addEventListener('scroll',()=>{
  const nb=document.getElementById('navbar');
  if(nb)nb.classList.toggle('scrolled',scrollY>50);
  const pb=document.getElementById('progress-bar');
  if(pb){const total=document.body.scrollHeight-window.innerHeight;pb.style.width=(scrollY/total*100)+'%';}
});

// HAMBURGER
(function(){
  const btn=document.getElementById('hamBtn'),links=document.getElementById('navLinks');
  if(!btn||!links)return;
  btn.addEventListener('click',function(){this.classList.toggle('open');links.classList.toggle('open');});
  links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{btn.classList.remove('open');links.classList.remove('open');}));
})();

// REVEAL ANIMATIONS
(function(){
  const obs=new IntersectionObserver(es=>{es.forEach((e,i)=>{if(e.isIntersecting){setTimeout(()=>e.target.classList.add('in'),i%4*80);obs.unobserve(e.target);}});},{threshold:.1});
  document.querySelectorAll('.rv,.rvl,.rvr').forEach(el=>obs.observe(el));
})();

// STAT COUNTERS
(function(){
  const cobs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){
    const el=e.target,t=parseFloat(el.dataset.t);if(!t)return;
    const ts=performance.now();
    (function go(now){const p=Math.min((now-ts)/1800,1),ease=1-Math.pow(1-p,3),v=t*ease;
    el.textContent=Number.isInteger(t)?Math.floor(v).toLocaleString():v.toFixed(0);
    if(p<1)requestAnimationFrame(go);else el.textContent=t.toLocaleString();})(ts);
    cobs.unobserve(el);}});},{threshold:.4});
  document.querySelectorAll('.i-stat-n[data-t]').forEach(el=>cobs.observe(el));
  const bobs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){setTimeout(()=>{e.target.style.width=e.target.dataset.w;},200);bobs.unobserve(e.target);}});},{threshold:.3});
  document.querySelectorAll('.i-stat-fill[data-w]').forEach(el=>bobs.observe(el));
})();

// THEME TOGGLE
(function(){
  let dark=false;
  const btn=document.getElementById('themeBtn');
  if(!btn)return;
  // Persist theme
  if(localStorage.getItem('theme')==='dark'){dark=true;document.documentElement.setAttribute('data-theme','dark');btn.textContent='☀️';}
  btn.addEventListener('click',()=>{dark=!dark;document.documentElement.setAttribute('data-theme',dark?'dark':'light');btn.textContent=dark?'☀️':'🌙';localStorage.setItem('theme',dark?'dark':'light');});
})();

// YOUTUBE AUDIO PLAYER
(function(){
  const YT_ID='5uDY6hEYfPc';
  let player=null,playing=false;
  function setIcon(on){
    document.querySelectorAll('#audioFab,#audioNavBtn').forEach(b=>{if(b){b.textContent=on?'🔊':'🎵';b.classList.toggle('playing',on);}});
  }
  window.onYouTubeIframeAPIReady=function(){
    player=new YT.Player('yt-hidden',{
      videoId:YT_ID,
      playerVars:{autoplay:0,controls:0,modestbranding:1,loop:1,playlist:YT_ID},
      events:{onReady:()=>{player.setVolume(35);}},
    });
  };
  // Inject YT API script once
  if(!document.getElementById('yt-api-script')){
    const s=document.createElement('script');s.id='yt-api-script';
    s.src='https://www.youtube.com/iframe_api';document.head.appendChild(s);
  }
  function togA(){
    if(!player){setTimeout(togA,500);return;}
    playing=!playing;
    if(playing){player.playVideo();setIcon(true);}
    else{player.pauseVideo();setIcon(false);}
  }
  document.querySelectorAll('#audioFab,#audioNavBtn').forEach(b=>{if(b)b.addEventListener('click',togA);});
})();

// MODALS
window.oM=function(id){document.getElementById(id).classList.add('open');document.body.style.overflow='hidden';};
window.cM=function(id){document.getElementById(id).classList.remove('open');document.body.style.overflow='';};
document.querySelectorAll('.mo').forEach(m=>m.addEventListener('click',function(e){if(e.target===this)cM(this.id);}));
document.addEventListener('keydown',e=>{if(e.key==='Escape')document.querySelectorAll('.mo.open').forEach(m=>cM(m.id));});

// CARD SLIDER
(function(){
  const track=document.getElementById('sliderTrack');
  if(!track)return;
  const cards=track.querySelectorAll('.slide-card');
  const dots=document.querySelectorAll('.slider-dot');
  let cur=0,n=cards.length,auto;
  function setPos(){
    cards.forEach((c,i)=>{
      let diff=i-cur;
      // Wrap around
      if(diff>Math.floor(n/2))diff-=n;
      if(diff<-Math.floor(n/2))diff+=n;
      if(diff>3)diff=3;if(diff<-3)diff=-3;
      c.setAttribute('data-pos',diff);
    });
    dots.forEach((d,i)=>d.classList.toggle('active',i===cur));
  }
  window.sliderNext=function(){cur=(cur+1)%n;setPos();resetAuto();};
  window.sliderPrev=function(){cur=(cur-1+n)%n;setPos();resetAuto();};
  function resetAuto(){clearInterval(auto);auto=setInterval(()=>sliderNext(),4200);}
  dots.forEach((d,i)=>d.addEventListener('click',()=>{cur=i;setPos();resetAuto();}));
  cards.forEach((c,i)=>c.addEventListener('click',()=>{if(+c.getAttribute('data-pos')===0)return;cur=i;setPos();resetAuto();}));
  setPos();resetAuto();
})();

// QUOTES SLIDER
(function(){
  let qi=0;
  const qs=document.querySelectorAll('.q-slide'),qd=document.querySelectorAll('.q-dot');
  if(!qs.length)return;
  function goQ(i){qs[qi].classList.remove('active');qd[qi].classList.remove('active');qi=i;qs[qi].classList.add('active');qd[qi].classList.add('active');}
  qd.forEach(d=>d.addEventListener('click',()=>goQ(+d.dataset.i)));
  setInterval(()=>goQ((qi+1)%qs.length),5500);
})();

// FAKTA FLIP
document.querySelectorAll('.fakta-flip').forEach(f=>f.addEventListener('click',()=>f.classList.toggle('flipped')));

// CERPEN TABS
document.querySelectorAll('.cerpen-tab').forEach(tab=>{
  tab.addEventListener('click',function(){
    document.querySelectorAll('.cerpen-tab').forEach(t=>t.classList.remove('active'));
    document.querySelectorAll('.cerpen-pane').forEach(p=>p.classList.remove('active'));
    this.classList.add('active');
    document.getElementById(this.dataset.tab).classList.add('active');
  });
});

// TIM FILTER
document.querySelectorAll('.tim-cat').forEach(btn=>{
  btn.addEventListener('click',function(){
    document.querySelectorAll('.tim-cat').forEach(b=>b.classList.remove('active'));
    this.classList.add('active');
    const role=this.dataset.role;
    document.querySelectorAll('.tim-card').forEach(card=>{
      const show=role==='all'||card.dataset.role===role;
      card.style.display=show?'':'none';
    });
  });
});

// DATA VIZ (for infografis page)
(function(){
  const dvEl=document.getElementById('dataviz');
  if(!dvEl)return;
  const dvObs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(!e.isIntersecting)return;
      document.querySelectorAll('.radial-prog').forEach((prog,i)=>{
        const pct=parseInt(prog.dataset.target),circ=239;
        setTimeout(()=>{
          prog.style.strokeDashoffset=circ-(circ*(pct/100));
          const el=document.getElementById('rp'+i);
          if(!el)return;
          const ts=performance.now();
          (function go(now){const p=Math.min((now-ts)/2000,1),ease=1-Math.pow(1-p,3);
          el.textContent=Math.round(pct*ease)+'%';if(p<1)requestAnimationFrame(go);else el.textContent=pct+'%';})(ts);
        },i*180);
      });
      document.querySelectorAll('.hbar-fill[data-w]').forEach((b,i)=>setTimeout(()=>{b.style.width=b.dataset.w;},i*140));
      document.querySelectorAll('.bub').forEach(b=>setTimeout(()=>b.classList.add('show'),parseInt(b.dataset.delay||0)+300));
      const line=document.getElementById('lcLine'),area=document.getElementById('lcArea');
      if(line)setTimeout(()=>{line.style.strokeDashoffset='0';},200);
      if(area)setTimeout(()=>{area.style.opacity='1';},400);
      ['dot0','dot1','dot2','dot3','dot4'].forEach((id,i)=>{const d=document.getElementById(id);if(d)setTimeout(()=>{d.style.opacity='1';},700+i*400);});
      dvObs.disconnect();
    });
  },{threshold:.12});
  dvObs.observe(dvEl);
})();

// QUIZ
(function(){
  const qc=document.getElementById('quizCard');
  if(!qc)return;
  const quizData=[
    {q:"Apa makna kata 'Ramadhan' secara bahasa Arab?",opts:["Bulan kesembilan","Yang membakar dosa","Bulan yang penuh berkah","Puasa satu bulan"],ans:1,fb:"Ramadhan berasal dari kata 'ramadha' yang artinya membakar atau panas. Ramadhan 'membakar' dosa-dosa orang yang berpuasa dengan penuh keimanan."},
    {q:"Berapa rakaat shalat Tarawih yang umum dilakukan di Indonesia?",opts:["8 rakaat","11 rakaat","20 rakaat","23 rakaat"],ans:2,fb:"Mayoritas masjid di Indonesia melaksanakan 20 rakaat Tarawih + 3 rakaat Witir = 23 rakaat, mengikuti pendapat ulama Hanafiyah, Malikiyah, dan Syafi'iyah."},
    {q:"Di mana Al-Qur'an pertama kali diturunkan kepada Nabi Muhammad ﷺ?",opts:["Masjidil Haram","Gua Tsur","Gua Hira","Padang Arafah"],ans:2,fb:"Al-Qur'an pertama kali diturunkan di Gua Hira, sebuah gua kecil di Jabal Nur (Gunung Cahaya), dekat Mekah, pada malam Lailatul Qadar bulan Ramadhan."},
    {q:"Ibadah apakah yang dianjurkan khusus di 10 malam terakhir Ramadhan?",opts:["Shalat Dhuha","I'tikaf","Shalat Tahajud","Shalat Rawatib"],ans:1,fb:"I'tikaf — berdiam diri di masjid untuk beribadah — sangat dianjurkan di 10 malam terakhir Ramadhan. Rasulullah ﷺ selalu beri'tikaf di setiap Ramadhan untuk mencari Lailatul Qadar."},
    {q:"Apa doa yang dianjurkan memperbanyaknya di malam Lailatul Qadar?",opts:["Doa qunut","Allahumma innaka afuwwun...","Rabbana atina fid dunya...","Allahumma barik lana..."],ans:1,fb:"'Allahumma innaka afuwwun tuhibbul afwa fa'fu anni' — Ya Allah Engkau Maha Pemaaf, Engkau mencintai maaf, maka maafkanlah aku. Diajarkan Rasulullah ﷺ kepada Aisyah ra."},
    {q:"Berapa hari puasa Ramadhan dalam setahun?",opts:["28-29 hari","29-30 hari","30-31 hari","Selalu 30 hari"],ans:1,fb:"Ramadhan berlangsung 29 atau 30 hari tergantung penampakan hilal (bulan sabit). Kalender Hijriah berbasis lunar sehingga panjang bulan bervariasi."},
  ];
  let qIdx=0,qScore=0,qAnswered=false;
  function renderQuiz(){
    const d=quizData[qIdx];const isLast=qIdx===quizData.length-1;
    const dotsHtml=quizData.map((_,i)=>`<span class="quiz-dot-q${i<qIdx?' done':i===qIdx?' active':''}"></span>`).join('');
    document.getElementById('quizDots').innerHTML=dotsHtml;
    document.getElementById('quizScoreLbl').textContent=`Nilai: ${qScore} / ${qIdx}`;
    qc.innerHTML=`<span class="quiz-q-n">Pertanyaan ${qIdx+1} dari ${quizData.length}</span><p class="quiz-q-txt">${d.q}</p><div class="quiz-opts">${d.opts.map((o,i)=>`<button class="quiz-opt" data-i="${i}"><span class="quiz-opt-ico">${['🅐','🅑','🅒','🅓'][i]}</span>${o}</button>`).join('')}</div><div class="quiz-feedback" id="qFb"></div><button class="quiz-next" id="qNext">${isLast?'Lihat Hasil 🏆':'Soal Berikutnya →'}</button>`;
    document.querySelectorAll('.quiz-opt').forEach(btn=>{
      btn.addEventListener('click',function(){
        if(qAnswered)return;qAnswered=true;
        const i=+this.dataset.i,correct=i===d.ans;
        if(correct)qScore++;
        document.querySelectorAll('.quiz-opt').forEach((b,j)=>{b.disabled=true;if(j===d.ans)b.classList.add('correct');else if(j===i&&!correct)b.classList.add('wrong');});
        const fb=document.getElementById('qFb');
        fb.textContent=(correct?'✅ Benar! ':'❌ Kurang tepat. ')+d.fb;
        fb.className='quiz-feedback show '+(correct?'right':'wrong');
        document.getElementById('qNext').style.display='inline-block';
      });
    });
    document.getElementById('qNext').addEventListener('click',()=>{qIdx++;if(qIdx>=quizData.length)showResult();else{qAnswered=false;renderQuiz();}});
  }
  function showResult(){
    const pct=Math.round(qScore/quizData.length*100);
    const msg=pct>=80?'Luar biasa! Kamu sangat paham tentang Ramadhan 🌟':pct>=60?'Bagus! Terus pelajari lebih dalam 📖':'Jangan menyerah, belajar lagi yuk! 💪';
    document.getElementById('quizDots').innerHTML=quizData.map(()=>`<span class="quiz-dot-q done"></span>`).join('');
    document.getElementById('quizScoreLbl').textContent=`Skor akhir: ${qScore} / ${quizData.length}`;
    qc.innerHTML=`<div class="quiz-result"><span class="quiz-result-ico">${pct>=80?'🏆':pct>=60?'⭐':'📚'}</span><span class="quiz-result-score">${qScore}/${quizData.length}</span><p class="quiz-result-msg">${msg}</p><button class="quiz-restart" onclick="qIdx=0;qScore=0;qAnswered=false;renderQuiz()">Coba Lagi 🔄</button></div>`;
  }
  window.renderQuiz=renderQuiz;
  renderQuiz();
})();
