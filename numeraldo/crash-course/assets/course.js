/* =========================================================================
   Numeraldo — Financial Literacy Crash Course
   Shared behavior for every page in this folder. No dependencies, no build
   step, all paths relative — drop the folder anywhere and it works.
   ========================================================================= */
(function () {
  "use strict";

  /* ---------- formatting helpers, exported for page scripts ---------- */
  var fmt = {
    money: function (n, cents) {
      if (!isFinite(n)) return "—";
      return n.toLocaleString("en-US", {
        style: "currency", currency: "USD",
        minimumFractionDigits: cents ? 2 : 0,
        maximumFractionDigits: cents ? 2 : 0
      });
    },
    pct: function (n, places) {
      if (!isFinite(n)) return "—";
      return n.toFixed(places === undefined ? 1 : places) + "%";
    },
    num: function (el) {
      var v = parseFloat(String(el.value).replace(/[$,\s%]/g, ""));
      return isFinite(v) ? v : 0;
    }
  };
  window.NumeraldoCourse = { fmt: fmt };

  /* ---------- text size control (larger type without zooming layout) ----- */
  var SIZE_KEY = "numeraldo.course.textscale";
  var sizeBtns = document.querySelectorAll("[data-scale]");
  function applyScale(scale) {
    document.documentElement.style.setProperty("--scale", scale);
    sizeBtns.forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.scale === String(scale)));
    });
  }
  if (sizeBtns.length) {
    var saved = null;
    try { saved = localStorage.getItem(SIZE_KEY); } catch (e) { /* private mode */ }
    applyScale(saved || "1");
    sizeBtns.forEach(function (b) {
      b.addEventListener("click", function () {
        applyScale(b.dataset.scale);
        try { localStorage.setItem(SIZE_KEY, b.dataset.scale); } catch (e) { /* ignore */ }
      });
    });
  }

  /* ---------- print buttons ---------- */
  document.querySelectorAll("[data-print]").forEach(function (b) {
    b.addEventListener("click", function (e) { e.preventDefault(); window.print(); });
  });

  /* ---------- syllabus scrollspy + progress ---------- */
  var tocLinks = Array.prototype.slice.call(document.querySelectorAll(".toc a[href^='#']"));
  var modules = Array.prototype.slice.call(document.querySelectorAll(".module[id]"));
  var progOut = document.querySelector("[data-progress]");

  if (tocLinks.length && modules.length && "IntersectionObserver" in window) {
    var visible = {};
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { visible[en.target.id] = en.isIntersecting; });
      var current = null;
      for (var i = 0; i < modules.length; i++) {
        if (visible[modules[i].id]) { current = modules[i].id; break; }
      }
      if (!current) return;
      tocLinks.forEach(function (a) {
        a.classList.toggle("active", a.getAttribute("href") === "#" + current);
      });
      if (progOut) {
        var idx = modules.findIndex(function (m) { return m.id === current; });
        progOut.textContent = "Module " + (idx + 1) + " of " + modules.length;
      }
    }, { rootMargin: "-84px 0px -55% 0px", threshold: 0 });
    modules.forEach(function (m) { io.observe(m); });
  }
  if (progOut && !progOut.textContent.trim()) {
    progOut.textContent = "Module 1 of " + modules.length;
  }

  /* ---------- checklists remember themselves per page ---------- */
  document.querySelectorAll(".check input[type='checkbox'][id]").forEach(function (box) {
    var key = "numeraldo.course." + (document.body.dataset.track || "page") + "." + box.id;
    try {
      if (localStorage.getItem(key) === "1") box.checked = true;
    } catch (e) { /* storage unavailable — checkbox still works, just won't persist */ }
    box.addEventListener("change", function () {
      try {
        if (box.checked) localStorage.setItem(key, "1");
        else localStorage.removeItem(key);
      } catch (e) { /* ignore */ }
    });
  });

  /* ---------- quizzes ----------
     Markup contract:
       <div class="q" data-answer="b"> ... <button data-opt="a">…</button> …
       <p class="ans" hidden>explanation</p></div>
  -------------------------------------------------------------------- */
  var quizzes = document.querySelectorAll(".quiz");
  quizzes.forEach(function (quiz) {
    var qs = Array.prototype.slice.call(quiz.querySelectorAll(".q"));
    var score = quiz.parentElement.querySelector(".quiz-score");
    var answered = 0, right = 0;

    qs.forEach(function (q) {
      var ans = q.querySelector(".ans");
      var done = false;
      q.querySelectorAll("button[data-opt]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          if (done) return;
          done = true;
          answered++;
          var correct = btn.dataset.opt === q.dataset.answer;
          if (correct) right++;
          q.querySelectorAll("button[data-opt]").forEach(function (b) {
            if (b.dataset.opt === q.dataset.answer) b.dataset.state = "right";
            else if (b === btn) b.dataset.state = "wrong";
            b.setAttribute("aria-disabled", "true");
          });
          if (ans) ans.hidden = false;
          if (score) {
            score.textContent = right + " of " + answered + " right · " +
              (qs.length - answered) + " to go";
          }
        });
      });
    });
  });

  /* ---------- year stamp ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
