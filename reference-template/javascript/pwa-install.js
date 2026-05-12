/**
 * pwa-install.js
 * Progressive Web App install prompt handler
 */

window.PWA = (function () {
    var deferredPrompt = null;
    var isInstalled    = false;

    function checkInstalled() {
        isInstalled = window.matchMedia('(display-mode: standalone)').matches ||
                      window.navigator.standalone === true;
        return isInstalled;
    }

    window.addEventListener('beforeinstallprompt', function (e) {
        e.preventDefault();
        deferredPrompt = e;
        document.querySelectorAll('[data-pwa-install]').forEach(function (el) {
            el.style.display = 'flex';
        });
    });

    window.addEventListener('appinstalled', function () {
        isInstalled = true;
        deferredPrompt = null;
        hidePWAPopup();
        if (window.Analytics) window.Analytics.track('pwa_installed');
    });

    function triggerInstall() {
        if (!deferredPrompt) { showIOSInstructions(); return; }
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(function (choice) {
            if (window.Analytics) window.Analytics.track('pwa_install_prompt', { outcome: choice.outcome });
            deferredPrompt = null;
        });
    }

    function showIOSInstructions() {
        var isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
        if (!isIOS) return;
        var overlay = document.createElement('div');
        overlay.id = 'pwa-ios-instructions';
        overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:9999;display:flex;align-items:flex-end;';
        var m = window.MERCHANT;
        overlay.innerHTML = '<div style="background:#fff;border-radius:20px 20px 0 0;padding:24px 20px 36px;width:100%;text-align:center;">' +
            '<h3 style="font-size:17px;font-weight:700;margin-bottom:8px;">Install ' + ((m && m.name) || 'this store') + '</h3>' +
            '<p style="font-size:14px;color:#666;line-height:1.5;margin-bottom:20px;">Tap <strong>Share</strong> then <strong>Add to Home Screen</strong>.</p>' +
            '<button onclick="document.getElementById(\'pwa-ios-instructions\').style.display=\'none\'" style="background:#f5f5f5;border:none;padding:12px 28px;border-radius:12px;font-size:15px;cursor:pointer;">Got it</button></div>';
        document.body.appendChild(overlay);
    }

    function showPWAPopup() {
        var overlay = document.getElementById('bkgOverlay');
        var popup   = document.getElementById('delayedPopup');
        if (!overlay || !popup) return;
        if (window.$) { $('#bkgOverlay, #delayedPopup').fadeIn(400); }
        else { overlay.style.display = 'block'; popup.style.display = 'block'; }
    }

    function hidePWAPopup() {
        if (window.$) { $('#bkgOverlay, #delayedPopup').fadeOut(400); }
        else {
            var overlay = document.getElementById('bkgOverlay');
            var popup   = document.getElementById('delayedPopup');
            if (overlay) overlay.style.display = 'none';
            if (popup)   popup.style.display   = 'none';
        }
    }

    function registerServiceWorker() {
        if (!('serviceWorker' in navigator)) return;
        navigator.serviceWorker.register('/service-worker.js').catch(function () {});
    }

    function init() {
        checkInstalled();
        if (!isInstalled) setTimeout(showPWAPopup, 5000);

        document.addEventListener('click', function (e) {
            if (e.target && (e.target.id === 'btnClose' || e.target.closest('#btnClose'))) {
                e.preventDefault(); hidePWAPopup();
            }
        });

        document.addEventListener('click', function (e) {
            var btn = e.target.closest('[data-pwa-install], .home-screen-add-btn');
            if (btn) { e.preventDefault(); triggerInstall(); hidePWAPopup(); }
        });

        registerServiceWorker();
    }

    document.addEventListener('DOMContentLoaded', init);

    return {
        triggerInstall:  triggerInstall,
        showPWAPopup:    showPWAPopup,
        hidePWAPopup:    hidePWAPopup,
        isInstalled:     function () { return isInstalled; },
        checkInstalled:  checkInstalled,
    };
}());
