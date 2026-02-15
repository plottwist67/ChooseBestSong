(function() {
  const canvas = document.getElementById('rainCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    let drops = [];
    for (let i = 0; i < 140; i++) {
      drops.push({
        x: Math.random() * w,
        y: Math.random() * h,
        len: Math.random() * 14 + 8,
        speed: Math.random() * 5 + 4,
      });
    }
    function drawRain() {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = 'rgba(160, 210, 255, 0.5)';
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#3b82f6';
      for (let d of drops) {
        ctx.fillRect(d.x, d.y, 1.6, d.len);
        d.y += d.speed;
        if (d.y > h) {
          d.y = -20;
          d.x = Math.random() * w;
        }
      }
      requestAnimationFrame(drawRain);
    }
    drawRain();
    window.addEventListener('resize', () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    });
  }

  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX - window.innerWidth / 2) * -0.005;
    const y = (e.clientY - window.innerHeight / 2) * 0.01;
    document.documentElement.style.setProperty('--move-x', x + 'deg');
    document.documentElement.style.setProperty('--move-y', y + 'deg');
  });

  const trackList = [
    { name: "17 (2023 Daniil Dr)", artist: "Kopynus & s€x(br0nx)", img: "img/17.png", audio: "audio/17.mp3" },
    { name: "2021 Daniil Dr", artist: "Kopynus", img: "", audio: "audio/2021.mp3" },
    { name: "2022 Daniil Dr", artist: "Kopynus", img: "img/2022dr.png", audio: "audio/2022dr.mp3" },
    { name: "Babytron", artist: "Kopynus", img: "img/nonsensedeluxe.jpeg", audio: "audio/babytron.wav" },
    { name: "Beszbashen1u", artist: "Beszbashen1u(Kopynus)", img: "img/raritet.png", audio: "audio/besz.mp3" },
    { name: "Cel Harosh", artist: "Kopynus", img: "", audio: "audio/celharosh.mp3" },
    { name: "Check", artist: "Kopynus", img: "img/check.png", audio: "audio/check.wav" },
    { name: "Cost", artist: "Kopynus", img: "", audio: "audio/cost.wav" },
    { name: "CTOOOEEEEEE", artist: "KatyaMak & Natalka", img: "", audio: "audio/cto.mp3" },
    { name: "Desicion", artist: "s€x(br0nx)", img: "img/desicion.png", audio: "audio/desicion.wav" },
    { name: "Fog", artist: "Kopynus & s€x(br0nx)", img: "img/nonsensedeluxe.jpeg", audio: "audio/fog.wav" },
    { name: "Glide", artist: "Kopynus & s€x(br0nx)", img: "img/nonsensedeluxe.jpeg", audio: "audio/glide.wav" },
    { name: "I Got It", artist: "s€x(br0nx)", img: "img/nonsensedeluxe.jpeg", audio: "audio/igotit.wav" },
    { name: "Izi Rap", artist: "Beszbashen1u(Kopynus)", img: "img/raritet.png", audio: "audio/izirep.mp3" },
    { name: "Kruk", artist: "Beszbashen1u(Kopynus)", img: "img/kruk.jpeg", audio: "audio/kruk.mp3" },
    { name: "My Way", artist: "s€x(br0nx)", img: "img/myway.png", audio: "audio/myway.wav" },
    { name: "Lean", artist: "Kopynus", img: "", audio: "audio/lean.wav" },
    { name: "Never Get Enough", artist: "Kopynus & s€x(br0nx)", img: "img/nonsense.jpeg", audio: "audio/nevergetenough.wav" },
    { name: "Never Lost", artist: "s€x(br0nx)", img: "img/nonsense.jpeg", audio: "audio/neverlost.wav" },
    { name: "Nonsense", artist: "Kopynus & s€x(br0nx)", img: "img/nonsense.jpeg", audio: "audio/nonsense.wav" },
    { name: "No Sleep", artist: "Kopynus", img: "", audio: "audio/nosleep.wav" },
    { name: "Nothing To Risk", artist: "Kopynus & s€x(br0nx)", img: "img/nonsensedeluxe.jpeg", audio: "audio/nothingtorisk.wav" },
    { name: "Perfect Scene", artist: "Kopynus", img: "img/nonsense.jpeg", audio: "audio/perfectscene.wav" },
    { name: "Raritet V1", artist: "Beszbashen1u(Kopynus)", img: "img/raritet.png", audio: "audio/raritet1.mp3" },
    { name: "Raritet V2", artist: "Beszbashen1u(Kopynus)", img: "img/raritet.png", audio: "audio/raritet2.wav" },
    { name: "Raritet V3", artist: "Beszbashen1u(Kopynus)", img: "img/raritet.png", audio: "audio/raritet3.wav" },
    { name: "R.I.P Federiko (Astrofest Tragedy)", artist: "Kopynus", img: "img/federiko.png", audio: "audio/federiko.mp3" },
    { name: "She Like Me", artist: "Kopynus & s€x(br0nx)", img: "img/nonsense.jpeg", audio: "audio/shelikeme.wav" },
    { name: "The End", artist: "Kopynus & s€x(br0nx)", img: "img/nonsense.jpeg", audio: "audio/theend.wav" },
    { name: "Trap (New Year 2022)", artist: "Kopynus", img: "", audio: "audio/trap.mp3" },
    { name: "Trust", artist: "Kopynus & s€x(br0nx)", img: "img/nonsense.jpeg", audio: "audio/trust.wav" },
  ];

  let currentlyPlaying = null;

  function createTrackCard(track, index) {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.draggable = true;
    card.dataset.track = track.name;

    const rowDiv = document.createElement('div');
    rowDiv.className = 'card-row';

    if (track.img && track.img.trim() !== '') {
      const img = document.createElement('img');
      img.src = track.img;
      img.alt = track.name;
      img.draggable = false;
      rowDiv.appendChild(img);
    } else {
      const iconDiv = document.createElement('div');
      iconDiv.className = 'music-icon';
      iconDiv.innerHTML = '<i class="fa-solid fa-music"></i>';
      iconDiv.draggable = false;
      rowDiv.appendChild(iconDiv);
    }

    const infoDiv = document.createElement('div');
    infoDiv.className = 'track-info';
    const nameSpan = document.createElement('span');
    nameSpan.className = 'track-name';
    nameSpan.textContent = track.name;
    const artistSpan = document.createElement('span');
    artistSpan.className = 'track-artist';
    artistSpan.textContent = track.artist;
    infoDiv.appendChild(nameSpan);
    infoDiv.appendChild(artistSpan);
    rowDiv.appendChild(infoDiv);

    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'card-controls';

    const audioControls = document.createElement('div');
    audioControls.className = 'audio-controls';

    const playBtn = document.createElement('span');
    playBtn.className = 'audio-btn play-btn';
    playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    playBtn.draggable = false;
    playBtn.addEventListener('dragstart', e => e.preventDefault());

    const skipBackBtn = document.createElement('span');
    skipBackBtn.className = 'audio-btn';
    skipBackBtn.innerHTML = '<i class="fa-solid fa-backward-step"></i>';
    skipBackBtn.draggable = false;
    skipBackBtn.addEventListener('dragstart', e => e.preventDefault());

    const skipFwdBtn = document.createElement('span');
    skipFwdBtn.className = 'audio-btn';
    skipFwdBtn.innerHTML = '<i class="fa-solid fa-forward-step"></i>';
    skipFwdBtn.draggable = false;
    skipFwdBtn.addEventListener('dragstart', e => e.preventDefault());

    const muteBtn = document.createElement('span');
    muteBtn.className = 'audio-btn';
    muteBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
    muteBtn.draggable = false;
    muteBtn.addEventListener('dragstart', e => e.preventDefault());

    audioControls.appendChild(playBtn);
    audioControls.appendChild(skipBackBtn);
    audioControls.appendChild(skipFwdBtn);
    audioControls.appendChild(muteBtn);

    const seekBar = document.createElement('input');
    seekBar.type = 'range';
    seekBar.className = 'seek-bar';
    seekBar.value = 0;
    seekBar.step = 0.1;
    seekBar.draggable = false;
    seekBar.addEventListener('dragstart', e => e.preventDefault());

    controlsDiv.appendChild(audioControls);
    controlsDiv.appendChild(seekBar);

    const audio = document.createElement('audio');
    audio.src = track.audio;
    audio.preload = 'metadata';
    audio.style.display = 'none';

    card.appendChild(rowDiv);
    card.appendChild(controlsDiv);
    card.appendChild(audio);

    playBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();

      if (currentlyPlaying && currentlyPlaying.card !== card) {
        currentlyPlaying.audio.pause();
        currentlyPlaying.playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        currentlyPlaying = null;
      }

      if (audio.paused) {
        audio.play().then(() => {
          playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
          currentlyPlaying = { card, audio, playBtn, seekBar };
        }).catch(err => console.log('Playback failed:', err));
      } else {
        audio.pause();
        playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        if (currentlyPlaying && currentlyPlaying.card === card) {
          currentlyPlaying = null;
        }
      }
    });

    skipBackBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      audio.currentTime = Math.max(0, audio.currentTime - 10);
    });

    skipFwdBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
    });

    muteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      audio.muted = !audio.muted;
      muteBtn.classList.toggle('mute-active', audio.muted);
      muteBtn.innerHTML = audio.muted ? '<i class="fa-solid fa-volume-off"></i>' : '<i class="fa-solid fa-volume-high"></i>';
    });

    audio.addEventListener('timeupdate', () => {
      if (audio.duration) {
        seekBar.value = (audio.currentTime / audio.duration) * 100;
      }
    });

    audio.addEventListener('loadedmetadata', () => {
      seekBar.max = 100;
    });

    seekBar.addEventListener('input', (e) => {
      e.stopPropagation();
      if (audio.duration) {
        audio.currentTime = (seekBar.value / 100) * audio.duration;
      }
    });

    audio.addEventListener('ended', () => {
      playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
      seekBar.value = 0;
      if (currentlyPlaying && currentlyPlaying.card === card) {
        currentlyPlaying = null;
      }
    });

    return card;
  }

  const tierS = document.getElementById('tierS');
  const tierA = document.getElementById('tierA');
  const tierB = document.getElementById('tierB');
  const tierC = document.getElementById('tierC');
  const tierD = document.getElementById('tierD');
  const tierDK = document.getElementById('tierDK');
  const allTiers = [tierS, tierA, tierB, tierC, tierD, tierDK];
  const tierLetters = ['S', 'A', 'B', 'C', 'D', 'DK'];

  function updateTop3() {
    const rankContainer = document.querySelector('.rank-container');
    const allCards = Array.from(rankContainer.querySelectorAll('.game-card'));
    allCards.forEach(card => {
      card.classList.remove('top-1', 'top-2', 'top-3');
    });
    allCards.slice(0, 3).forEach((card, idx) => {
      if (idx === 0) card.classList.add('top-1');
      else if (idx === 1) card.classList.add('top-2');
      else if (idx === 2) card.classList.add('top-3');
    });
  }

  function resetToInitial() {
    if (currentlyPlaying) {
      currentlyPlaying.audio.pause();
      currentlyPlaying.playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
      currentlyPlaying = null;
    }
    allTiers.forEach(tier => { if (tier) tier.innerHTML = ''; });
    trackList.forEach((track, idx) => {
      tierS.appendChild(createTrackCard(track, idx));
    });
    updateTop3();
  }
  resetToInitial();

  const savePdfBtn = document.getElementById('savePdfBtn');
  if (savePdfBtn) {
    savePdfBtn.addEventListener('click', () => {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();

      doc.setFontSize(20);
      doc.text('Music Tier List', 20, 20);
      doc.setFontSize(12);
      doc.text(`Generated: ${new Date().toLocaleString()}`, 20, 30);

      let yPos = 40;
      const lineHeight = 7;
      const pageHeight = doc.internal.pageSize.height;

      allTiers.forEach((tierSlot, idx) => {
        if (!tierSlot) return;
        const tierLetter = tierLetters[idx];
        const cards = tierSlot.querySelectorAll('.game-card');
        if (cards.length === 0) return;

        if (yPos > pageHeight - 20) {
          doc.addPage();
          yPos = 20;
        }

        doc.setFontSize(14);
        doc.setTextColor(...getTierColor(tierLetter));
        doc.text(`Tier ${tierLetter}`, 20, yPos);
        doc.setTextColor(0, 0, 0);
        yPos += lineHeight;

        cards.forEach(card => {
          const nameEl = card.querySelector('.track-name');
          const artistEl = card.querySelector('.track-artist');
          const trackName = nameEl ? nameEl.textContent : 'Unknown';
          const artist = artistEl ? artistEl.textContent : '';

          doc.setFontSize(10);
          doc.text(`• ${trackName} (${artist})`, 25, yPos);
          yPos += lineHeight;

          if (yPos > pageHeight - 20) {
            doc.addPage();
            yPos = 20;
          }
        });

        yPos += lineHeight;
      });

      doc.save(`music_tier_list_${new Date().toISOString().slice(0,10)}.pdf`);
    });
  }

  function getTierColor(tier) {
    switch(tier) {
      case 'S': return [30, 79, 208];
      case 'A': return [185, 28, 28];
      case 'B': return [234, 179, 8];
      case 'C': return [234, 88, 12];
      case 'D': return [22, 163, 74];
      case 'DK': return [107, 114, 128];
      default: return [255, 255, 255];
    }
  }

  const saveImageBtn = document.getElementById('saveImageBtn');
  if (saveImageBtn) {
    saveImageBtn.addEventListener('click', () => {
      const rankContainer = document.querySelector('.rank-container');
      if (!rankContainer) return;

      html2canvas(rankContainer, {
        scale: 2,
        backgroundColor: '#03050a',
        allowTaint: false,
        useCORS: true,
        logging: false,
      }).then(canvas => {
        const link = document.createElement('a');
        link.download = `tierlist_${new Date().toISOString().slice(0,19).replace(/:/g, '-')}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      }).catch(error => {
        console.error('html2canvas error:', error);
        alert('Failed to capture image. See console.');
      });
    });
  }

  let draggedCard = null;

  function handleDragStart(e) {
    draggedCard = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', this.dataset.track || 'track');
    this.style.opacity = '0.6';
  }

  function handleDragEnd(e) {
    this.style.opacity = '1';
    allTiers.forEach(t => t.classList.remove('drag-over'));
    draggedCard = null;
    updateTop3();
  }

  function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    this.classList.add('drag-over');
  }

  function handleDragLeave(e) {
    this.classList.remove('drag-over');
  }

  function handleDrop(e) {
    e.preventDefault();
    this.classList.remove('drag-over');
    if (!draggedCard) return;

    const targetTier = this;
    const dropTarget = e.target.closest('.game-card');

    if (dropTarget && dropTarget !== draggedCard && targetTier.contains(dropTarget)) {
      targetTier.insertBefore(draggedCard, dropTarget);
    } else {
      targetTier.appendChild(draggedCard);
    }
  }

  function attachDragListeners(card) {
    card.addEventListener('dragstart', handleDragStart);
    card.addEventListener('dragend', handleDragEnd);
  }

  function observeAllCards() {
    document.querySelectorAll('.game-card').forEach(card => {
      if (!card.dragAttached) {
        attachDragListeners(card);
        card.dragAttached = true;
      }
    });
  }
  observeAllCards();

  const cardObserver = new MutationObserver(() => {
    observeAllCards();
    updateTop3();
  });
  allTiers.forEach(tier => {
    if (tier) cardObserver.observe(tier, { childList: true, subtree: false });
  });

  allTiers.forEach(tier => {
    if (!tier) return;
    tier.addEventListener('dragover', handleDragOver);
    tier.addEventListener('dragleave', handleDragLeave);
    tier.addEventListener('drop', handleDrop);
  });

  const slideContainer = document.querySelector('.slide-container');
  const goBtn = document.getElementById('goToRankBtn');
  const backBtn = document.getElementById('backToHeroBtn');
  const footerHome = document.getElementById('footerHome');
  const footerRank = document.getElementById('footerRank');

  if (goBtn) {
    goBtn.addEventListener('click', (e) => {
      e.preventDefault();
      slideContainer.classList.add('show-rank');
    });
  }

  if (backBtn) {
    backBtn.addEventListener('click', (e) => {
      e.preventDefault();
      slideContainer.classList.remove('show-rank');
    });
  }

  if (footerHome) {
    footerHome.addEventListener('click', (e) => {
      e.preventDefault();
      slideContainer.classList.remove('show-rank');
    });
  }
  if (footerRank) {
    footerRank.addEventListener('click', (e) => {
      e.preventDefault();
      slideContainer.classList.add('show-rank');
    });
  }

  const resetBtn = document.getElementById('resetBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', (e) => {
      e.preventDefault();
      resetToInitial();
    });
  }

  const tierDescriptions = {
    S: '✨ Top tier – absolute masterpieces',
    A: '🔥 Great tracks, highly recommended',
    B: '👍 Solid, enjoyable songs',
    C: '⚖️ Average – some flaws',
    D: '⚠️ Below average, niche appeal',
    DK: '❓ Haven’t listened / unknown'
  };

  let activeTooltip = null;

  function removeTooltip() {
    if (activeTooltip) {
      activeTooltip.remove();
      activeTooltip = null;
    }
  }

  function showTooltip(text, element) {
    removeTooltip();
    const tooltip = document.createElement('div');
    tooltip.className = 'tier-tooltip';
    tooltip.textContent = text;
    document.body.appendChild(tooltip);
    activeTooltip = tooltip;

    const rect = element.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    let left = rect.left + rect.width / 2 - tooltipRect.width / 2;
    let top = rect.bottom + 10;
    if (left < 10) left = 10;
    if (left + tooltipRect.width > window.innerWidth - 10) {
      left = window.innerWidth - tooltipRect.width - 10;
    }
    if (top + tooltipRect.height > window.innerHeight - 10) {
      top = rect.top - tooltipRect.height - 10;
    }
    tooltip.style.left = left + 'px';
    tooltip.style.top = top + 'px';
  }

  const tierBadges = document.querySelectorAll('.tier-badge');
  tierBadges.forEach(badge => {
    badge.addEventListener('click', function(e) {
      const infoIcon = e.target.closest('.tier-info');
      if (!infoIcon) return;
      const tier = this.dataset.tier;
      const desc = tierDescriptions[tier];
      if (!desc) return;
      if (activeTooltip && activeTooltip.textContent === desc) {
        removeTooltip();
      } else {
        showTooltip(desc, infoIcon);
      }
    });
  });

  document.addEventListener('click', function(e) {
    if (!e.target.closest('.tier-info')) {
      removeTooltip();
    }
  });

  window.addEventListener('scroll', removeTooltip);
  window.addEventListener('resize', removeTooltip);
})();