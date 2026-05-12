/**
 * analytics.js — Lightweight merchant analytics tracker
 * Tracks: page views, product views, WhatsApp taps, search queries
 * Storage: localStorage (Phase 1). Phase 2: POST to /api/analytics
 * No AI, no third-party scripts. Privacy-first, merchant-owned data.
 * Platform: WhatsApp-First Social Commerce SaaS — Phase 1
 */
'use strict';

var Analytics = (function () {

  var STORE_KEY   = 'merchant_analytics';
  var SESSION_KEY = 'analytics_session';
  var MAX_EVENTS  = 500;  // cap stored events

  // ─── Session ID (persists for 30 min of inactivity) ──────────────
  function getSessionId() {
    try {
      var s = JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null');
      if (s && s.id && (Date.now() - s.last) < 30 * 60 * 1000) {
        s.last = Date.now();
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(s));
        return s.id;
      }
    } catch(e) {}
    var id = 'sess_' + Date.now().toString(36) + Math.random().toString(36).slice(2,6);
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ id, last: Date.now() }));
    return id;
  }

  // ─── Core event logger ───────────────────────────────────────────
  function track(eventName, properties) {
    var event = {
      event:     eventName,
      session:   getSessionId(),
      url:       window.location.pathname,
      referrer:  document.referrer || null,
      ts:        new Date().toISOString(),
      props:     properties || {},
    };

    // Store locally
    try {
      var all = JSON.parse(localStorage.getItem(STORE_KEY) || '[]');
      all.unshift(event);
      if (all.length > MAX_EVENTS) all = all.slice(0, MAX_EVENTS);
      localStorage.setItem(STORE_KEY, JSON.stringify(all));
    } catch(e) {
      console.warn('Analytics: localStorage write failed', e);
    }

    // Console log in dev (remove in production)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.debug('[Analytics]', eventName, properties || '');
    }

    // Phase 2: POST to API
    // fetch('/api/analytics', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(event) });
  }

  // ─── Pre-built event helpers ─────────────────────────────────────
  function pageView(pageName, extra) {
    track('page_view', Object.assign({ page: pageName || document.title }, extra));
  }

  function productView(productId, productName, price) {
    track('product_view', { productId, productName, price });
  }

  function whatsappTap(productId, inquiryId, source) {
    track('whatsapp_tap', { productId, inquiryId, source });
  }

  function searchQuery(query, resultCount) {
    track('search', { query, resultCount: resultCount || 0 });
  }

  function campaignView(campaignId, campaignTitle) {
    track('campaign_view', { campaignId, campaignTitle });
  }

  function categoryView(categoryId, categoryName) {
    track('category_view', { categoryId, categoryName });
  }

  function shareAction(productId, channel) {
    track('share', { productId, channel });
  }

  // ─── Aggregations for dashboard ──────────────────────────────────
  function getEvents(eventName, since) {
    try {
      var all = JSON.parse(localStorage.getItem(STORE_KEY) || '[]');
      var cutoff = since ? new Date(since).getTime() : 0;
      return all.filter(function(e) {
        if (eventName && e.event !== eventName) return false;
        if (cutoff && new Date(e.ts).getTime() < cutoff) return false;
        return true;
      });
    } catch(e) { return []; }
  }

  function getDashboardStats(days) {
    days = days || 7;
    var since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
    var events = getEvents(null, since);

    var views      = events.filter(e => e.event === 'page_view').length;
    var prodViews  = events.filter(e => e.event === 'product_view').length;
    var waTaps     = events.filter(e => e.event === 'whatsapp_tap').length;
    var searches   = events.filter(e => e.event === 'search').length;
    var sessions   = new Set(events.map(e => e.session)).size;

    // Top products by view
    var prodCounts = {};
    events.filter(e => e.event === 'product_view').forEach(function(e) {
      var id = e.props.productId;
      if (id) prodCounts[id] = (prodCounts[id] || 0) + 1;
    });
    var topProducts = Object.entries(prodCounts)
      .sort((a,b) => b[1]-a[1]).slice(0,5)
      .map(([id, count]) => ({ id, views: count }));

    // Daily wa taps for mini chart (last 7 days)
    var dailyTaps = [];
    for (var i = days-1; i >= 0; i--) {
      var d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
      var dateStr = d.toISOString().split('T')[0];
      var count = events.filter(function(e) {
        return e.event === 'whatsapp_tap' && e.ts.startsWith(dateStr);
      }).length;
      dailyTaps.push({ date: dateStr, count });
    }

    return { views, prodViews, waTaps, searches, sessions, topProducts, dailyTaps, days };
  }

  function clearAll() {
    localStorage.removeItem(STORE_KEY);
    sessionStorage.removeItem(SESSION_KEY);
  }

  // ─── Auto page view on load ───────────────────────────────────────
  function autoPageView() {
    var path = window.location.pathname;
    var page = path.split('/').pop().replace('.html','') || 'home';
    pageView(page);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoPageView);
  } else {
    autoPageView();
  }

  // ─── Public API ──────────────────────────────────────────────────
  return {
    track,
    pageView,
    productView,
    whatsappTap,
    searchQuery,
    campaignView,
    categoryView,
    shareAction,
    getEvents,
    getDashboardStats,
    clearAll,
  };

})();
