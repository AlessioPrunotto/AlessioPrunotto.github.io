/* ==========================================================================
   Molecule hero — progressive 3D layer (3Dmol.js, lazy + fallback-safe)
   --------------------------------------------------------------------------
   Tries to upgrade the hero to a real 3D caffeine model (PubChem CID 2519,
   MMFF94 geometry, heavy atoms). Anything goes wrong — offline CDN, no
   WebGL, timeout, reduced motion — the 2D canvas from molecule.js simply
   keeps running. ES5 style to match the uglify bundle chain.
   ========================================================================== */

(function () {
  'use strict';

  var CDN_URL = 'https://cdnjs.cloudflare.com/ajax/libs/3Dmol/2.5.5/3Dmol-min.js';
  // Independently published by cdnjs; verified locally against the download.
  var CDN_SRI = 'sha512-rk2gI8FYzSbiZnDZ9M70SEhemyYIDwQQhb1zH9eK8kglMsp7bKJdu5+akb+wlTQxC9DiMmoMTNUQ0Z0Q/trdyw==';
  var LOAD_TIMEOUT_MS = 8000;

  // Caffeine heavy atoms (C8N4O2), PubChem CID 2519 3D conformer.
  var CAFFEINE_SDF = [
    'caffeine',
    '  -OEChem-3D',
    '',
    ' 14 15  0     0  0  0  0  0  0999 V2000',
    '    0.4700    2.5688    0.0006 O   0  0  0  0  0  0  0  0  0  0  0  0',
    '   -3.1271   -0.4436   -0.0003 O   0  0  0  0  0  0  0  0  0  0  0  0',
    '   -0.9686   -1.3125    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0',
    '    2.2182    0.1412   -0.0003 N   0  0  0  0  0  0  0  0  0  0  0  0',
    '   -1.3477    1.0797   -0.0001 N   0  0  0  0  0  0  0  0  0  0  0  0',
    '    1.4119   -1.9372    0.0002 N   0  0  0  0  0  0  0  0  0  0  0  0',
    '    0.8579    0.2592   -0.0008 C   0  0  0  0  0  0  0  0  0  0  0  0',
    '    0.3897   -1.0264   -0.0004 C   0  0  0  0  0  0  0  0  0  0  0  0',
    '    0.0307    1.4220   -0.0006 C   0  0  0  0  0  0  0  0  0  0  0  0',
    '   -1.9061   -0.2495   -0.0004 C   0  0  0  0  0  0  0  0  0  0  0  0',
    '    2.5032   -1.1998    0.0003 C   0  0  0  0  0  0  0  0  0  0  0  0',
    '   -1.4276   -2.6960    0.0008 C   0  0  0  0  0  0  0  0  0  0  0  0',
    '    3.1926    1.2061    0.0003 C   0  0  0  0  0  0  0  0  0  0  0  0',
    '   -2.2969    2.1881    0.0007 C   0  0  0  0  0  0  0  0  0  0  0  0',
    '  1  9  2  0  0  0  0',
    '  2 10  2  0  0  0  0',
    '  3  8  1  0  0  0  0',
    '  3 10  1  0  0  0  0',
    '  3 12  1  0  0  0  0',
    '  4  7  1  0  0  0  0',
    '  4 11  1  0  0  0  0',
    '  4 13  1  0  0  0  0',
    '  5  9  1  0  0  0  0',
    '  5 10  1  0  0  0  0',
    '  5 14  1  0  0  0  0',
    '  6  8  1  0  0  0  0',
    '  6 11  2  0  0  0  0',
    '  7  8  2  0  0  0  0',
    '  7  9  1  0  0  0  0',
    'M  END'
  ].join('\n');

  function isDarkTheme() {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  }

  function elementColors() {
    if (isDarkTheme()) {
      return { C: '#e2e8f0', N: '#60a5fa', O: '#f87171' };
    }
    return { C: '#334155', N: '#2563eb', O: '#dc2626' };
  }

  function hasWebGL() {
    try {
      var c = document.createElement('canvas');
      return !!(c.getContext('webgl') || c.getContext('experimental-webgl'));
    } catch (e) {
      return false;
    }
  }

  function loadScript() {
    return new Promise(function (resolve, reject) {
      if (window.$3Dmol) {
        resolve();
        return;
      }
      var timer = setTimeout(function () {
        reject(new Error('3Dmol load timeout'));
      }, LOAD_TIMEOUT_MS);
      var s = document.createElement('script');
      s.src = CDN_URL;
      s.integrity = CDN_SRI;
      s.crossOrigin = 'anonymous';
      s.onload = function () {
        clearTimeout(timer);
        if (window.$3Dmol) resolve();
        else reject(new Error('3Dmol global missing'));
      };
      s.onerror = function () {
        clearTimeout(timer);
        reject(new Error('3Dmol script error'));
      };
      document.head.appendChild(s);
    });
  }

  var viewer = null;
  var rafId = 0;
  var spinning = false;
  var lastTick = 0;

  function applyStyle() {
    if (!viewer) return;
    var colors = elementColors();
    // Space-filling (CPK) style: full-size spheres carry the 3D depth;
    // sticks are omitted entirely.
    viewer.setStyle({}, {
      sphere: { scale: 1.0, colorscheme: { prop: 'elem', map: colors } }
    });
    viewer.render();
  }

  function tick(now) {
    if (!spinning || !viewer) return;
    // Throttle to ~30fps; one small step per frame = slow ambient spin.
    if (now - lastTick > 33) {
      viewer.rotate(0.6, 'y');
      viewer.render();
      lastTick = now;
    }
    rafId = requestAnimationFrame(tick);
  }

  function setSpinning(on) {
    if (on === spinning) return;
    spinning = on;
    if (on) {
      lastTick = 0;
      rafId = requestAnimationFrame(tick);
    } else {
      cancelAnimationFrame(rafId);
    }
  }

  function initViewer(mount) {
    viewer = window.$3Dmol.createViewer(mount, { backgroundAlpha: 0 });
    viewer.addModel(CAFFEINE_SDF, 'sdf');
    applyStyle();
    viewer.zoomTo();
    viewer.zoom(1.15);
    viewer.render();

    // Handoff: hide the 2D canvas, reveal the 3D layer.
    window.__mol3dActive = true;
    if (window.__molCanvas && window.__molCanvas.destroy) {
      window.__molCanvas.destroy();
    }
    var canvas = document.getElementById('mol-canvas');
    if (canvas) canvas.style.display = 'none';
    mount.classList.add('is-active');

    // Pause when offscreen; restyle on theme toggle.
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        setSpinning(entries[0].isIntersecting);
      }, { threshold: 0.05 }).observe(mount);
      setSpinning(true);
    } else {
      setSpinning(true);
    }

    new MutationObserver(function (mutations) {
      for (var i = 0; i < mutations.length; i++) {
        if (mutations[i].attributeName === 'data-theme') {
          applyStyle();
          break;
        }
      }
    }).observe(document.documentElement, { attributes: true });
  }

  function tryUpgrade() {
    var mount = document.getElementById('mol-3d');
    if (!mount || window.__mol3dActive) return;
    if (!hasWebGL()) return;
    loadScript().then(function () {
      // Canvas may have hidden the mount's size; ensure layout first.
      if (mount.clientWidth === 0 && mount.clientHeight === 0) return;
      try {
        initViewer(mount);
      } catch (e) {
        viewer = null; // canvas keeps running
      }
    }).catch(function () {
      // Offline / SRI mismatch / timeout: canvas keeps running.
    });
  }

  function autoInit() {
    var mount = document.getElementById('mol-3d');
    if (!mount) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) {
      tryUpgrade();
      return;
    }
    var fired = false;
    new IntersectionObserver(function (entries, obs) {
      if (entries[0].isIntersecting && !fired) {
        fired = true;
        obs.disconnect();
        tryUpgrade();
      }
    }, { threshold: 0.05 }).observe(mount);
  }

  window.Mol3D = { tryUpgrade: tryUpgrade, CAFFEINE_SDF: CAFFEINE_SDF };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    autoInit();
  }
})();
