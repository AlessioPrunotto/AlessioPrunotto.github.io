/* ==========================================================================
   Molecule hero — 2D caffeine canvas (fallback / base layer)
   --------------------------------------------------------------------------
   Renders a slowly rotating caffeine skeletal model on #mol-canvas.
   Step 2 layers a 3Dmol.js view into #mol-3d on top when available; this
   canvas stays as the offline/no-WebGL/reduced-motion fallback.

   Exposes window.MoleculeHero = { init, destroy, CAFFEINE } so the 3D
   loader can coordinate (e.g. hide the canvas once 3D is ready).
   ========================================================================== */

(function () {
  'use strict';

  // Caffeine (C8H10N4O2), xanthine core + fused imidazole. Hand-placed 2D
  // coords in an arbitrary ~100x90 box (y grows downward, like canvas).
  // Connectivity: purine numbering; doubles on C4=C5, C8=N9, 2x C=O.
  var CAFFEINE = {
    atoms: [
      { el: 'N', x: 50, y: 13 },  // 0 N1
      { el: 'C', x: 69, y: 24 },  // 1 C2
      { el: 'N', x: 69, y: 46 },  // 2 N3
      { el: 'C', x: 50, y: 57 },  // 3 C4
      { el: 'C', x: 31, y: 46 },  // 4 C5
      { el: 'C', x: 31, y: 24 },  // 5 C6
      { el: 'O', x: 88, y: 17 },  // 6 O2 (carbonyl)
      { el: 'C', x: 50, y: -8 },  // 7 N1-methyl
      { el: 'C', x: 88, y: 53 },  // 8 N3-methyl
      { el: 'O', x: 14, y: 15 },  // 9 O6 (carbonyl)
      { el: 'N', x: 22, y: 62 },  // 10 N7
      { el: 'C', x: 32, y: 80 },  // 11 C8
      { el: 'N', x: 52, y: 74 },  // 12 N9
      { el: 'C', x: 4,  y: 62 },  // 13 N7-methyl
      { el: 'H', x: 86, y: 94 }   // 14 C8-H
    ],
    bonds: [
      [0, 1, 1], [1, 2, 1], [2, 3, 1], [3, 4, 2], [4, 5, 1], [5, 0, 1],
      [1, 6, 2], [0, 7, 1], [2, 8, 1], [5, 9, 2],
      [4, 10, 1], [10, 11, 1], [11, 12, 2], [12, 3, 1],
      [10, 13, 1], [11, 14, 1]
    ]
  };

  var PALETTES = {
    light: {
      C: '#334155', N: '#2563eb', O: '#dc2626', H: '#94a3b8',
      bond: 'rgba(100, 116, 139, 0.85)',
      labelDark: '#ffffff', labelLight: '#0f172a'
    },
    dark: {
      C: '#e2e8f0', N: '#60a5fa', O: '#f87171', H: '#64748b',
      bond: 'rgba(148, 163, 184, 0.8)',
      labelDark: '#0f172a', labelLight: '#0f172a'
    }
  };

  var RADII = { C: 7.5, N: 7.5, O: 7.5, H: 3.5 };

  function isDarkTheme() {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  }

  function bbox(atoms) {
    var xs = atoms.map(function (a) { return a.x; });
    var ys = atoms.map(function (a) { return a.y; });
    return {
      minX: Math.min.apply(null, xs), maxX: Math.max.apply(null, xs),
      minY: Math.min.apply(null, ys), maxY: Math.max.apply(null, ys)
    };
  }

  function drawMolecule(ctx, w, h, angle, bobY, palette, opts) {
    var box = bbox(CAFFEINE.atoms);
    var bw = box.maxX - box.minX;
    var bh = box.maxY - box.minY;
    var narrow = w < 700;
    // Right third on wide screens so the text column stays clear;
    // centered (and dimmer) on narrow screens where text spans full width.
    var cx = narrow ? w * 0.5 : w * 0.8;
    var cy = h * 0.5 + bobY;
    var scale = (Math.min(w, h) * (narrow ? 0.62 : 0.72)) / Math.max(bw, bh);
    var cos = Math.cos(angle);
    var sin = Math.sin(angle);
    var mx = (box.minX + box.maxX) / 2;
    var my = (box.minY + box.maxY) / 2;

    function project(a) {
      var dx = a.x - mx;
      var dy = a.y - my;
      return {
        x: cx + (dx * cos - dy * sin) * scale,
        y: cy + (dx * sin + dy * cos) * scale
      };
    }

    var pts = CAFFEINE.atoms.map(project);
    ctx.save();
    ctx.globalAlpha = narrow ? 0.5 : (opts.alpha || 0.9);
    ctx.lineCap = 'round';

    // Bonds first (under atoms).
    CAFFEINE.bonds.forEach(function (b) {
      var p = pts[b[0]];
      var q = pts[b[1]];
      var order = b[2];
      ctx.strokeStyle = palette.bond;
      if (order === 1) {
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.stroke();
      } else {
        // Double bond: two parallel strokes offset perpendicular to axis.
        var dx = q.x - p.x;
        var dy = q.y - p.y;
        var len = Math.sqrt(dx * dx + dy * dy) || 1;
        var nx = (-dy / len) * 2.4;
        var ny = (dx / len) * 2.4;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(p.x + nx, p.y + ny);
        ctx.lineTo(q.x + nx, q.y + ny);
        ctx.moveTo(p.x - nx, p.y - ny);
        ctx.lineTo(q.x - nx, q.y - ny);
        ctx.stroke();
      }
    });

    // Atoms on top, with element labels (except H dots).
    CAFFEINE.atoms.forEach(function (a, i) {
      var p = pts[i];
      var r = RADII[a.el] * Math.min(Math.max(scale / 7, 0.7), 1.4);
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fillStyle = palette[a.el];
      ctx.fill();
      if (a.el !== 'H') {
        ctx.fillStyle = (a.el === 'C') ? palette.labelDark : '#ffffff';
        ctx.font = '600 ' + Math.max(9, r * 1.05) + 'px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(a.el, p.x, p.y + 0.5);
      }
    });

    ctx.restore();
  }

  function fitCanvas(canvas) {
    var parent = canvas.parentElement;
    var rect = parent.getBoundingClientRect();
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = Math.max(1, Math.floor(rect.width));
    var h = Math.max(1, Math.floor(rect.height));
    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
    }
    return { w: w, h: h, dpr: dpr };
  }

  function init(canvas) {
    if (!canvas || !canvas.getContext) return null;
    var ctx = canvas.getContext('2d');
    if (!ctx) return null;

    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var running = true;
    var rafId = 0;
    var start = performance.now();

    function frame(now) {
      if (!running) return;
      var dims = fitCanvas(canvas);
      ctx.setTransform(dims.dpr, 0, 0, dims.dpr, 0, 0);
      ctx.clearRect(0, 0, dims.w, dims.h);
      var t = (now - start) / 1000;
      var palette = isDarkTheme() ? PALETTES.dark : PALETTES.light;
      // Slow ambient rotation + gentle vertical bob.
      drawMolecule(ctx, dims.w, dims.h, t * 0.12, Math.sin(t * 0.4) * 6, palette, {});
      // ~30fps is plenty for ambient motion; saves battery.
      setTimeout(function () {
        if (running) rafId = requestAnimationFrame(frame);
      }, 33);
    }

    function drawStatic() {
      var dims = fitCanvas(canvas);
      ctx.setTransform(dims.dpr, 0, 0, dims.dpr, 0, 0);
      ctx.clearRect(0, 0, dims.w, dims.h);
      drawMolecule(ctx, dims.w, dims.h, 0.5, 0, isDarkTheme() ? PALETTES.dark : PALETTES.light, {});
    }

    // Pause when the hero is offscreen; redraw on resize.
    var observer = null;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(function (entries) {
        var visible = entries[0].isIntersecting;
        if (visible && !running && !reduced) {
          running = true;
          start = performance.now();
          rafId = requestAnimationFrame(frame);
        } else if (!visible && running) {
          running = false;
          cancelAnimationFrame(rafId);
        }
      }, { threshold: 0.05 });
      observer.observe(canvas);
    }
    window.addEventListener('resize', function () {
      if (reduced || !running) drawStatic();
    });

    if (reduced) {
      running = false;
      drawStatic();
    } else {
      canvas.classList.add('is-ready');
      rafId = requestAnimationFrame(frame);
    }

    return {
      destroy: function () {
        running = false;
        cancelAnimationFrame(rafId);
        if (observer) observer.disconnect();
      },
      redraw: drawStatic
    };
  }

  function autoInit() {
    var canvas = document.getElementById('mol-canvas');
    if (!canvas) return;
    // Step 2 hook: if a 3D view initialises first, it sets this flag and
    // the canvas stays hidden as the offline fallback.
    if (window.__mol3dActive) return;
    window.__molCanvas = init(canvas);
  }

  window.MoleculeHero = {
    init: init,
    autoInit: autoInit,
    CAFFEINE: CAFFEINE
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    autoInit();
  }
})();
