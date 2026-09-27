// Rollabop site script: small, dependency-free, and optional.
// Everything on the site works without it.
(function () {
  "use strict";
  window.rollabop = true;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Mobile menu
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.hidden = false;
    var setOpen = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
    };
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  // Gentle fade/rise as sections arrive
  var items = document.querySelectorAll("[data-reveal]");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  }

  // Support form: send without leaving the page (without JS it posts normally)
  var form = document.getElementById("support-form");
  if (form && window.fetch && window.FormData) {
    var status = form.querySelector(".form-status");
    var button = form.querySelector('button[type="submit"]');
    var show = function (msg, isError) {
      status.hidden = false;
      status.textContent = msg;
      status.classList.toggle("is-error", !!isError);
    };
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var invalid = Array.prototype.filter.call(form.querySelectorAll("[required]"), function (el) {
        var bad = !el.checkValidity();
        el.setAttribute("aria-invalid", String(bad));
        return bad;
      });
      if (invalid.length) {
        show("Please fill in your email, a category and your message.", true);
        invalid[0].focus();
        return;
      }
      button.disabled = true;
      show("Sending…");
      fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
        .then(function (r) {
          if (!r.ok) throw new Error(r.status);
          form.reset();
          show("Message sent. Thank you for reaching out. We will get back to you as soon as we can.");
        })
        .catch(function () {
          show("Sorry, the message could not be sent. Please try again, or email us instead.", true);
        })
        .then(function () { button.disabled = false; });
    });
  }

  // Slight depth on the hero tray (mouse/trackpad only)
  var hero = document.querySelector(".hero");
  if (hero && !reduceMotion && window.matchMedia("(pointer: fine)").matches) {
    var frame = 0;
    hero.addEventListener("pointermove", function (e) {
      if (frame) return;
      frame = requestAnimationFrame(function () {
        var r = hero.getBoundingClientRect();
        hero.style.setProperty("--px", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
        hero.style.setProperty("--py", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
        frame = 0;
      });
    });
    hero.addEventListener("pointerleave", function () {
      hero.style.setProperty("--px", 0);
      hero.style.setProperty("--py", 0);
    });
  }
})();
