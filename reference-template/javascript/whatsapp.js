/**
 * whatsapp.js — WhatsApp-First Conversion Engine
 * Handles: message building, inquiry ID generation, click tracking,
 *          quick-contact from product cards, full CTA from product detail
 * Platform: WhatsApp-First Social Commerce SaaS — Phase 1
 *
 * Depends on: merchant-config.js (MERCHANT global), analytics.js
 */
'use strict';

const WhatsApp = (function () {

  // ─────────────────────────────────────────────────────────────────
  // INQUIRY ID GENERATOR
  // Format: INQ-{timestamp}-{productIdSlug}
  // Included in every WhatsApp message so merchant can track it
  // ─────────────────────────────────────────────────────────────────
  function generateInquiryId(productId) {
    const ts   = Date.now().toString(36).toUpperCase();
    const slug = (productId || 'general').replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 8);
    return `INQ-${ts}-${slug}`;
  }

  // ─────────────────────────────────────────────────────────────────
  // MESSAGE BUILDER
  // Builds a clean, pre-filled WhatsApp message for the customer
  // ─────────────────────────────────────────────────────────────────
  function buildMessage(opts) {
    // opts: { product, quantity, selectedSize, selectedColor, inquiryId, sourceUrl }
    const p   = opts.product;
    const m   = (typeof MERCHANT !== 'undefined') ? MERCHANT : {};
    const sym = m.currencySymbol || '£';
    const qty = opts.quantity || 1;
    const id  = opts.inquiryId || generateInquiryId(p ? p.id : 'general');

    if (!p) {
      // Generic inquiry (from storefront home / contact)
      return [
        `Hello ${m.name || 'there'}! 👋`,
        ``,
        `I found your store and would like to know more about your products.`,
        ``,
        `Reference: ${id}`,
        `Via: ${opts.sourceUrl || window.location.href}`,
      ].join('\n');
    }

    const price    = Number(p.price) * qty;
    const priceStr = `${sym}${price.toFixed(2)}`;
    const lines    = [
      `Hello! 👋 I'm interested in ordering:`,
      ``,
      `*${p.name}*`,
      `Price: ${priceStr}${qty > 1 ? ` (${qty} × ${sym}${Number(p.price).toFixed(2)})` : ''}`,
    ];

    if (opts.selectedSize)  lines.push(`Size: ${opts.selectedSize}`);
    if (opts.selectedColor) lines.push(`Colour: ${opts.selectedColor}`);

    lines.push(``);
    lines.push(`Ref: ${id}`);
    lines.push(`Seen on: ${opts.sourceUrl || window.location.href}`);
    lines.push(``);
    lines.push(`Please confirm availability and how to proceed. Thank you!`);

    return lines.join('\n');
  }

  // ─────────────────────────────────────────────────────────────────
  // OPEN WHATSAPP
  // Core function — builds URL and opens WhatsApp
  // ─────────────────────────────────────────────────────────────────
  function openWhatsApp(opts) {
    const m          = (typeof MERCHANT !== 'undefined') ? MERCHANT : {};
    const number     = opts.whatsappNumber || m.whatsapp;
    const inquiryId  = generateInquiryId(opts.product ? opts.product.id : 'general');
    const message    = buildMessage({ ...opts, inquiryId });
    const encoded    = encodeURIComponent(message);
    const url        = `https://wa.me/${number}?text=${encoded}`;

    // Log the inquiry locally (Phase 1: localStorage; Phase 2: API)
    logInquiry({
      id:          inquiryId,
      productId:   opts.product ? opts.product.id : null,
      productName: opts.product ? opts.product.name : null,
      price:       opts.product ? opts.product.price : null,
      quantity:    opts.quantity || 1,
      size:        opts.selectedSize || null,
      color:       opts.selectedColor || null,
      sourceUrl:   window.location.href,
      timestamp:   new Date().toISOString(),
      status:      'new',
    });

    // Fire analytics event
    if (typeof Analytics !== 'undefined') {
      Analytics.track('whatsapp_tap', {
        productId:  opts.product ? opts.product.id : null,
        inquiryId,
        source:     opts.source || 'product_detail',
      });
    }

    // Open WhatsApp
    window.open(url, '_blank', 'noopener');

    return inquiryId;
  }

  // ─────────────────────────────────────────────────────────────────
  // QUICK CONTACT — from product card (no product detail page visit)
  // ─────────────────────────────────────────────────────────────────
  function quickContact(productId, sourceEl) {
    const product = (typeof getProduct === 'function') ? getProduct(productId) : null;

    // Visual feedback: pulse the button
    if (sourceEl) {
      sourceEl.classList.add('wa-pulse');
      setTimeout(() => sourceEl.classList.remove('wa-pulse'), 600);
    }

    return openWhatsApp({
      product,
      source: 'card_quick_contact',
    });
  }

  // ─────────────────────────────────────────────────────────────────
  // FULL CTA — from product detail page
  // Reads selected quantity, size, color from DOM before sending
  // ─────────────────────────────────────────────────────────────────
  function productDetailCTA(productId) {
    const product = (typeof getProduct === 'function') ? getProduct(productId) : null;

    const qty = parseInt(
      document.getElementById('qty-value') ?
        document.getElementById('qty-value').textContent : '1'
    , 10) || 1;

    const sizeEl  = document.querySelector('.sf-size-btn.active');
    const colorEl = document.querySelector('.col-deatils:checked');

    return openWhatsApp({
      product,
      quantity:      qty,
      selectedSize:  sizeEl  ? sizeEl.textContent.trim()  : null,
      selectedColor: colorEl ? colorEl.id : null,
      source:        'product_detail_cta',
    });
  }

  // ─────────────────────────────────────────────────────────────────
  // INQUIRY STORAGE (localStorage — Phase 1 only)
  // ─────────────────────────────────────────────────────────────────
  var STORAGE_KEY = 'wa_inquiries';

  function logInquiry(inquiry) {
    try {
      var existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      existing.unshift(inquiry);          // newest first
      if (existing.length > 200) existing = existing.slice(0, 200); // cap at 200
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    } catch (e) {
      console.warn('WhatsApp: Could not log inquiry to localStorage', e);
    }
  }

  function getInquiries(filters) {
    try {
      var all = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      if (!filters) return all;
      if (filters.status) all = all.filter(i => i.status === filters.status);
      if (filters.productId) all = all.filter(i => i.productId === filters.productId);
      return all;
    } catch (e) {
      return [];
    }
  }

  function updateInquiryStatus(inquiryId, newStatus) {
    try {
      var all = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      var idx = all.findIndex(i => i.id === inquiryId);
      if (idx > -1) {
        all[idx].status = newStatus;
        all[idx].updatedAt = new Date().toISOString();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  function getInquiryCounts() {
    var all = getInquiries();
    return {
      total:     all.length,
      new:       all.filter(i => i.status === 'new').length,
      replied:   all.filter(i => i.status === 'replied').length,
      quoted:    all.filter(i => i.status === 'quoted').length,
      confirmed: all.filter(i => i.status === 'confirmed').length,
      closed:    all.filter(i => i.status === 'closed').length,
    };
  }

  // ─────────────────────────────────────────────────────────────────
  // DOM INIT — binds WhatsApp CTA buttons on page load
  // ─────────────────────────────────────────────────────────────────
  function init() {
    // Bind full CTA buttons: data-wa-product-id="prod_xxx"
    document.querySelectorAll('[data-wa-product-id]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        var productId = this.getAttribute('data-wa-product-id');
        var mode      = this.getAttribute('data-wa-mode') || 'detail';
        if (mode === 'quick') {
          quickContact(productId, this);
        } else {
          productDetailCTA(productId);
        }
      });
    });

    // Bind generic store contact: data-wa-contact="true"
    document.querySelectorAll('[data-wa-contact]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        openWhatsApp({ source: 'store_contact' });
      });
    });

    // Show inquiry badge count in nav if element exists
    var badge = document.getElementById('nav-inquiry-count');
    if (badge) {
      var counts = getInquiryCounts();
      if (counts.new > 0) {
        badge.textContent = counts.new > 9 ? '9+' : counts.new;
        badge.style.display = 'flex';
      }
    }
  }

  // Auto-init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // ─────────────────────────────────────────────────────────────────
  // PUBLIC API
  // ─────────────────────────────────────────────────────────────────
  return {
    open:                openWhatsApp,
    quickContact:        quickContact,
    productDetailCTA:    productDetailCTA,
    generateInquiryId:   generateInquiryId,
    buildMessage:        buildMessage,
    logInquiry:          logInquiry,
    getInquiries:        getInquiries,
    updateInquiryStatus: updateInquiryStatus,
    getInquiryCounts:    getInquiryCounts,
    init:                init,
  };

})();
