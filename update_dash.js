const fs = require("fs");
let code = fs.readFileSync("app.js", "utf-8");

const weatherStart = code.indexOf("// Weather widget");
const safeFallback = code.indexOf("// Safe fallback");

const before = code.substring(0, weatherStart);
const after = code.substring(safeFallback);

const newDash = `  // Greeting + stats hero
  const todayMeals = getTodayMealCount();
  const todayTasksArr = getTodayTasks();
  const todayDone = todayTasksArr.filter(t => t.done).length;
  const streak = calcPlanningStreak();

  // Hero greeting
  html += \`<div class="dash-hero">
    <div class="dash-greeting">
      <span class="dh-emoji">\${todayMeals >= 4 ? "⭐" : todayMeals > 0 ? "👋" : "🌅"}</span>
      <div class="dh-text">
        <div class="dh-title">\${lang === "en" ? "Hello!" : "Ahoj!"}</div>
        <div class="dh-sub">\${lang === "en"
          ? (todayMeals >= 4 ? "Great day planned!" : "Time to plan meals")
          : (todayMeals >= 4 ? "Skvel\u00fd de\u0148!" : "\u010cas napl\u00e1nova\u0165 jedl\u00e1")}</div>
      </div>
    </div>
    <div class="dash-stats">
      <div class="dash-stat-card"><div class="dsc-value">\${todayMeals}</div><div class="dsc-label">\ud83c\udf7d\ufe0f \${lang === "en" ? "Meals" : "Jed\u00e1l"}</div></div>
      \${w.todayTasks ? \`<div class="dash-stat-card"><div class="dsc-value">\${todayTasksArr.length}</div><div class="dsc-label">\u2705 \${lang === "en" ? "Tasks" : "\u00d4loh"}</div></div>\` : ""}
      <div class="dash-stat-card"><div class="dsc-value">\${streak}</div><div class="dsc-label">\ud83d\udd25 \${lang === "en" ? "Days" : "Dn\u00ed"}</div></div>
    </div>
  </div>\`;

  // Weather widget
  if (w.weather) {
    if (appSettings.weather.location) {
      html += \`<div class="dash-card"><div class="weather-widget" id="weather-widget" onclick="editText('weather.location','\${t("Mesto","City")}')"><span class="weather-icon">\ud83c\udf24\ufe0f</span><span class="weather-info"><strong>\${esc(appSettings.weather.location)}</strong><span class="weather-temp">\${t("Na\u010d\u00edtavam...","Loading...")}</span></span></div></div>\`;
    } else {
      html += \`<div class="dash-card"><div class="weather-widget weather-fallback" id="weather-widget" onclick="editText('weather.location','\${t("Po\u010dasie","Weather")}')"><span class="weather-icon">\ud83c\udf24\ufe0f</span><span class="weather-info"><strong>\${t("Po\u010dasie","Weather")}</strong><span class="weather-temp">\${t("Zadaj mesto","Enter city")}</span></span></div></div>\`;
    }
  }

  // Task widget
  if (w.todayTasks) {
    html += \`<div id="dash-tasks" class="dash-card"></div>\`;
  }

  // Water reminder
  if (w.hydration) {
    html += \`<div class="dash-card"><div class="water-reminder" id="water-reminder"><span class="water-icon">\ud83d\udca7</span><span class="water-text">\${lang === "en" ? "Don't forget to drink water! \ud83d\udeb0" : "Nezabudni na pitn\u00fd re\u017e\u00edm! \ud83d\udeb0"}</span><button class="water-btn" onclick="dismissWaterReminder()">OK \u2713</button></div></div>\`;
  }

  // Today meals card
  html += \`<div class="dash-card">
    <div class="dash-card-header">
      <span class="dash-card-title">\ud83d\udccb \${lang === "en" ? "Today's meals" : "Dne\u0161n\u00e9 jedl\u00e1"}</span>
      <span class="dash-card-link" onclick="switchTab('planner')">\${lang === "en" ? "Full week" : "Cel\u00fd t\u00fd\u017ede\u0148"} \u203a</span>
    </div>
    <div class="meal-timeline" id="dash-timeline">\${renderMealTimeline()}</div>
  </div>\`;

  // Progress bar
  const mealPct = Math.round((todayMeals / 5) * 100);
  html += \`<div class="dash-card">
    <div class="dash-progress-row"><span class="dpr-label">\ud83d\udcc5 \${lang === "en" ? "Daily progress" : "Dne\u0161n\u00fd progress"}</span><span class="dpr-value">\${todayMeals}/5</span></div>
    <div class="dash-progress-bar"><div class="dash-progress-fill" style="width:\${mealPct}%;"></div></div>
  </div>\`;

  // Daily summary
  if (w.calories) {
    html += \`<div class="dash-card"><div class="dash-card-header"><span class="dash-card-title">\ud83d\udcca \${lang === "en" ? "Daily Summary" : "Denn\u00fd s\u00fahrn"}</span></div><div class="summary-grid" id="dash-summary">\${renderDailySummary()}</div></div>\`;
  }

  // AI CTA
  html += \`<div class="dash-card dash-card-cta" onclick="aiGenerateFullWeek()">
    <div class="dash-cta-content">
      <span class="dash-cta-icon">\ud83d\ude80</span>
      <div>
        <div class="dash-cta-title">\${lang === "en" ? "Generate week + shopping" : "Cel\u00fd t\u00fd\u017ede\u0148 + n\u00e1kup"}</div>
        <div class="dash-cta-sub">\${lang === "en" ? "AI plans your week and creates shopping in one click" : "AI napl\u00e1nuje t\u00fd\u017ede\u0148 aj n\u00e1kup jedn\u00fdm kliknut\u00edm"}</div>
      </div>
      <span class="dash-cta-arrow">\u2192</span>
    </div>
  </div>\`;

  // Smart suggestions
  if (w.quickRecipes) {
    html += \`<div class="dash-card"><div class="dash-card-header"><span class="dash-card-title">\ud83d\udca1 \${lang === "en" ? "Suggestions" : "Tipy na dnes"}</span></div><div class="suggestion-scroll" id="dash-suggestions">\${renderSuggestions()}</div></div>\`;
  }`;

code = before + newDash + after;

fs.writeFileSync("app.js", code, "utf-8");
console.log("Done:", code.length);
