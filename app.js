// WiseBuy AI SPA Controller and Core App Logic
document.addEventListener("DOMContentLoaded", () => {
  // --- STATE ---
  const state = {
    selectedCompareIds: ["macbook-pro-14", "dell-xps-14"], // Default compare items to show initial data
    chatMessages: [
      { sender: "ai", text: "### Hello! I am your WiseBuy AI Hardware Analyst.\n\nI can compare specs, look up pricing, and calculate value scores instantly. Try asking me something like:\n*   *\"Compare the MacBook Pro M3 and Dell XPS 14\"*\n*   *\"Which smartwatch has the best battery life?\"*" }
    ]
  };

  // --- SELECTORS ---
  const views = {
    home: document.getElementById("home-view"),
    compare: document.getElementById("compare-view"),
    ai: document.getElementById("ai-view"),
    about: document.getElementById("about-view"),
    contact: document.getElementById("contact-view")
  };

  const navLinks = document.querySelectorAll("nav a, .footer-links-col a[href^='#']");
  const mobileNavToggle = document.getElementById("mobile-toggle");
  const navElement = document.querySelector("nav");
  const headerElement = document.querySelector("header");

  // Sticky Cart elements
  const stickyCart = document.getElementById("compare-cart-sticky");
  const stickyCartCount = document.getElementById("cart-count");
  const stickyCartNames = document.getElementById("cart-product-names");
  const btnCompareSticky = document.getElementById("btn-compare-sticky");
  const btnClearSticky = document.getElementById("btn-clear-sticky");

  // --- ROUTING ENGINE ---
  function route() {
    let hash = window.location.hash || "#home";
    let viewName = hash.replace("#", "");

    // Hide all views, show active
    Object.keys(views).forEach(name => {
      if (views[name]) {
        views[name].classList.remove("active");
      }
    });

    if (views[viewName]) {
      views[viewName].classList.add("active");
    } else {
      views.home.classList.add("active");
      viewName = "home";
    }

    // Scroll to top on route change
    window.scrollTo(0, 0);

    // Close mobile menu if open
    mobileNavToggle.classList.remove("open");
    navElement.classList.remove("open");

    // Update active state in nav
    navLinks.forEach(link => {
      if (link.getAttribute("href") === `#${viewName}`) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    // Run view specific initializers
    if (viewName === "compare") {
      renderCompareMatrix();
    } else if (viewName === "ai") {
      renderAIDashboard();
      renderChatMessages();
    }
  }

  window.addEventListener("hashchange", route);
  route(); // Run on load

  // Header scroll class
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      headerElement.classList.add("scrolled");
    } else {
      headerElement.classList.remove("scrolled");
    }
  });

  // Mobile navigation hamburger toggle
  mobileNavToggle.addEventListener("click", () => {
    mobileNavToggle.classList.toggle("open");
    navElement.classList.toggle("open");
  });

  // --- STICKY CART CONTROLLER ---
  function updateStickyCart() {
    const count = state.selectedCompareIds.length;
    stickyCartCount.textContent = count;

    if (count > 0) {
      const names = state.selectedCompareIds.map(id => {
        const prod = PRODUCTS.find(p => p.id === id);
        return prod ? prod.name : "";
      }).join(" vs ");
      
      stickyCartNames.innerHTML = `Comparing: <span>${names}</span>`;
      stickyCart.classList.add("visible");
    } else {
      stickyCart.classList.remove("visible");
    }
  }

  btnClearSticky.addEventListener("click", () => {
    state.selectedCompareIds = [];
    updateStickyCart();
    // If in compare view, re-render
    if (window.location.hash === "#compare") {
      renderCompareMatrix();
    }
  });

  btnCompareSticky.addEventListener("click", () => {
    window.location.hash = "#compare";
  });

  // Initialize cart state
  updateStickyCart();


  // --- 1. HOME VIEW CONTROLLER ---
  // Setup Hero Autocomplete
  const heroSearchInput = document.getElementById("hero-search");
  const heroSuggestions = document.getElementById("hero-suggestions");

  setupSearchAutocomplete(heroSearchInput, heroSuggestions, (product) => {
    // Action on item select
    addToCompareList(product.id);
    window.location.hash = "#compare";
  });

  // Setup Featured Comparisons triggers
  document.querySelectorAll(".comparison-card .btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const ids = btn.getAttribute("data-compare").split(",");
      state.selectedCompareIds = ids;
      updateStickyCart();
      window.location.hash = "#compare";
    });
  });


  // --- 2. COMPARE VIEW CONTROLLER ---
  const compareSearchInputs = [
    { input: document.getElementById("search-slot-a"), suggest: document.getElementById("suggest-slot-a"), index: 0 },
    { input: document.getElementById("search-slot-b"), suggest: document.getElementById("suggest-slot-b"), index: 1 },
    { input: document.getElementById("search-slot-c"), suggest: document.getElementById("suggest-slot-c"), index: 2 }
  ];

  compareSearchInputs.forEach(slot => {
    setupSearchAutocomplete(slot.input, slot.suggest, (product) => {
      // Set ID in slot
      state.selectedCompareIds[slot.index] = product.id;
      // Clear out duplicates
      state.selectedCompareIds = [...new Set(state.selectedCompareIds)].filter(Boolean);
      
      updateStickyCart();
      renderCompareMatrix();
      slot.input.value = "";
    });
  });

  // Highlight Diffs Toggle
  const diffToggle = document.getElementById("highlight-diffs-toggle");
  if (diffToggle) {
    diffToggle.addEventListener("change", () => {
      const table = document.querySelector(".matrix-table");
      if (table) {
        if (diffToggle.checked) {
          table.classList.add("highlight-diffs");
        } else {
          table.classList.remove("highlight-diffs");
        }
      }
    });
  }

  function renderCompareMatrix() {
    const tableContainer = document.getElementById("matrix-table-container");
    const aiSummaryBody = document.getElementById("ai-summary-text");
    const diffToggleContainer = document.querySelector(".compare-controls");

    // Clean up empty/missing elements in state compare list
    const compareProducts = state.selectedCompareIds
      .map(id => PRODUCTS.find(p => p.id === id))
      .filter(Boolean);

    // Update comparative slot search cards label previews
    for (let i = 0; i < 3; i++) {
      const p = compareProducts[i];
      const slotCard = document.getElementById(`selected-card-slot-${String.fromCharCode(97 + i)}`);
      if (slotCard) {
        if (p) {
          slotCard.innerHTML = `
            <div class="selected-name">${p.name}</div>
            <button class="btn-remove" data-index="${i}">✕ Remove</button>
          `;
          slotCard.style.display = "flex";
          
          // Bind remove action
          slotCard.querySelector(".btn-remove").addEventListener("click", (e) => {
            const idx = parseInt(e.target.getAttribute("data-index"));
            state.selectedCompareIds.splice(idx, 1);
            updateStickyCart();
            renderCompareMatrix();
          });
        } else {
          slotCard.style.display = "none";
        }
      }
    }

    if (compareProducts.length === 0) {
      diffToggleContainer.style.display = "none";
      tableContainer.innerHTML = `
        <div class="matrix-empty-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="2" y="3" width="20" height="18" rx="2" />
            <path d="M8 12h8M12 8v8" />
          </svg>
          <h3>No products selected for comparison</h3>
          <p style="margin-top: 8px;">Use the search slot bars above to select up to 3 products to compare side-by-side.</p>
        </div>
      `;
      aiSummaryBody.innerHTML = "Select products to generate an AI-powered comparison summary.";
      return;
    }

    diffToggleContainer.style.display = "flex";

    // Generate comparison rows
    let colsHtml = compareProducts.map(p => `
      <td>
        <div class="matrix-product-header">
          <div class="svg-wrapper">${getProductSVG(p.svgType, "var(--primary)")}</div>
          <div class="matrix-product-name">${p.name}</div>
          <div class="matrix-price-tag">${formatPrice(p.price)}</div>
        </div>
      </td>
    `).join("");

    // Create spec rows list
    const specFields = [
      { key: "Price", label: "MSRP" },
      { key: "Rating", label: "User Rating" },
      { key: "reviewsCount", label: "Review Count" },
      { key: "specs.Processor", label: "Processor/Hardware" },
      { key: "specs.Display", label: "Display Screen" },
      { key: "specs.Battery Life", label: "Battery Life" },
      { key: "specs.Weight", label: "Weight" },
      { key: "specs.Operating System", label: "OS" },
      { key: "features", label: "Key Features" },
      { key: "pros", label: "Strengths (Pros)" },
      { key: "cons", label: "Weaknesses (Cons)" },
      { key: "availability", label: "Availability" }
    ];

    let rowsHtml = specFields.map(field => {
      // Extract values for checking differences
      const values = compareProducts.map(p => {
        if (field.key.startsWith("specs.")) {
          const specName = field.key.split(".")[1];
          return p.specs[specName] || "N/A";
        }
        return p[field.key] || "N/A";
      });

      // Check if values differ (if there are 2 or more products compared)
      const isDifferent = compareProducts.length > 1 && !values.every(v => JSON.stringify(v) === JSON.stringify(values[0]));
      const rowClass = isDifferent ? 'class="difference-row"' : '';

      let cells = compareProducts.map(p => {
        let content = "";
        if (field.key === "Price") {
          // Render buy links matrix
          content = `<div class="matrix-price-tag">${formatPrice(p.price)}</div>
            <div style="font-size:11px; color:var(--text-muted); margin-top:8px;">Compare Stores:</div>
            <ul style="list-style:none; margin-top:4px; font-size:12px;">
              ${p.sources.map(s => `
                <li style="display:flex; justify-content:space-between; margin-bottom:2px;">
                  <span style="color:var(--text-secondary);">${s.name}:</span>
                  <a href="${s.link}" style="color:var(--secondary); text-decoration:none; font-weight:600;">${formatPrice(s.price)}</a>
                </li>
              `).join("")}
            </ul>
          `;
        } else if (field.key === "Rating") {
          content = `
            <div class="matrix-rating-pill">★ ${p.rating}</div>
            <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">Score: ${p.aiScore}/10</div>
          `;
        } else if (field.key === "reviewsCount") {
          content = `${p.reviewsCount.toLocaleString()} Verified Reviews`;
        } else if (field.key === "features") {
          content = `<ul class="matrix-features-list">${p.features.map(f => `<li>${f}</li>`).join("")}</ul>`;
        } else if (field.key === "pros") {
          content = `<ul class="matrix-pro-list">${p.pros.map(pr => `<li>${pr}</li>`).join("")}</ul>`;
        } else if (field.key === "cons") {
          content = `<ul class="matrix-con-list">${p.cons.map(c => `<li>${c}</li>`).join("")}</ul>`;
        } else if (field.key === "availability") {
          const stockClass = p.availability.toLowerCase().replace(" ", "");
          content = `<span class="matrix-badge-stock ${stockClass}">${p.availability}</span>`;
        } else if (field.key.startsWith("specs.")) {
          const specName = field.key.split(".")[1];
          content = p.specs[specName] || "N/A";
        } else {
          content = p[field.key] || "N/A";
        }

        return `<td>${content}</td>`;
      }).join("");

      return `<tr ${rowClass}><th>${field.label}</th>${cells}</tr>`;
    }).join("");

    // Assemble table
    const tableHtml = `
      <table class="matrix-table ${diffToggle && diffToggle.checked ? 'highlight-diffs' : ''}">
        <thead>
          <tr>
            <th>Specification</th>
            ${compareProducts.map(p => `<th>Slot: ${p.brand}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Product Preview</th>
            ${colsHtml}
          </tr>
          ${rowsHtml}
        </tbody>
      </table>
    `;

    tableContainer.innerHTML = tableHtml;

    // AI summary card updating
    let summaryText = "";
    if (compareProducts.length === 1) {
      summaryText = `**Comparing ${compareProducts[0].name}**: This single product score stands at **${compareProducts[0].aiScore}/10** with a high catalog confidence of ${compareProducts[0].confidence}%. ${compareProducts[0].summary}`;
    } else if (compareProducts.length === 2) {
      const p1 = compareProducts[0];
      const p2 = compareProducts[1];
      const higher = p1.aiScore > p2.aiScore ? p1 : p2;
      const lower = p1.aiScore > p2.aiScore ? p2 : p1;
      summaryText = `Our WiseBuy AI cognitive analysis shows **${higher.name}** leads **${lower.name}** in overall efficiency with an AI score of **${higher.aiScore}/10** vs ${lower.aiScore}/10. 
      Go with the **${p1.name}** if you value ${p1.features[0]} or need it for its ${p1.specs["Battery Life"] || "battery endurance"}. 
      Select the **${p2.name}** if you are looking for ${p2.features[0]} and prefer the ${p2.brand} ecosystem. 
      Price-wise, **${p1.price < p2.price ? p1.name : p2.name}** is the more affordable choice, saving you ${formatPrice(Math.abs(p1.price - p2.price))}.`;
    } else {
      // 3 products compared
      const sortedByScore = [...compareProducts].sort((a,b) => b.aiScore - a.aiScore);
      const cheapest = [...compareProducts].sort((a,b) => a.price - b.price)[0];
      summaryText = `From the triple-product cohort, **${sortedByScore[0].name}** scores the highest raw capability metric (**${sortedByScore[0].aiScore}/10**). 
      If you are shopping on a budget, **${cheapest.name}** presents the absolute lowest entry cost (${formatPrice(cheapest.price)}). 
      *   **For pure power**: The **${sortedByScore[0].name}** remains unmatched.
      *   **For mobility/travel**: The **${compareProducts.find(p => p.specs["Weight"] && p.specs["Weight"].includes("lbs")) ? compareProducts.find(p => p.specs["Weight"].includes("lbs")).name : compareProducts[0].name}** is highly optimized.
      *   **For best value ratio**: We highly recommend the **${compareProducts.find(p => p.id.includes("sony") || p.id.includes("pixel") || p.id.includes("venu")) ? compareProducts.find(p => p.id.includes("sony") || p.id.includes("pixel") || p.id.includes("venu")).name : compareProducts[1].name}**.`;
    }

    aiSummaryBody.innerHTML = formatMarkdown(summaryText);
  }

  // Helper helper to add a product to compare array safely
  function addToCompareList(id) {
    if (state.selectedCompareIds.includes(id)) return;
    if (state.selectedCompareIds.length >= 3) {
      // Swap out last item
      state.selectedCompareIds[2] = id;
    } else {
      state.selectedCompareIds.push(id);
    }
    updateStickyCart();
  }


  // --- 3. AI RECOMMENDER DASHBOARD ---
  // Connect Finder Controls
  const finderBudgetSlider = document.getElementById("finder-budget-slider");
  const finderBudgetVal = document.getElementById("finder-budget-val");
  const finderUsage = document.getElementById("finder-usage");
  const finderBrand = document.getElementById("finder-brand");
  const finderPriority = document.getElementById("finder-priority");
  const btnSubmitFinder = document.getElementById("btn-submit-finder");

  if (finderBudgetSlider && finderBudgetVal) {
    finderBudgetSlider.addEventListener("input", (e) => {
      finderBudgetVal.textContent = formatPrice(e.target.value);
    });
  }

  if (btnSubmitFinder) {
    btnSubmitFinder.addEventListener("click", () => {
      const budget = parseInt(finderBudgetSlider.value);
      const usage = finderUsage.value;
      const brand = finderBrand.value;
      const priority = finderPriority.value;

      // Run calculation
      const result = window.aiEngineInstance.findBestProduct(budget, usage, brand, priority);
      renderFinderResult(result);
    });
  }

  function renderFinderResult(result) {
    const container = document.getElementById("finder-result-wrap");
    const title = document.getElementById("finder-result-title");
    const visual = document.getElementById("finder-result-visual");
    const confidence = document.getElementById("finder-result-confidence");
    const explanation = document.getElementById("finder-result-explanation");
    const prosList = document.getElementById("finder-result-pros");
    const consList = document.getElementById("finder-result-cons");
    const btnAddCompare = document.getElementById("btn-finder-add-compare");

    if (!result) return;

    const p = result.product;
    
    // Fill result details
    title.textContent = p.name;
    visual.innerHTML = getProductSVG(p.svgType, "var(--secondary)");
    confidence.innerHTML = `Match Score: <span style="color:var(--secondary); font-size:18px;">${result.score}%</span>`;
    explanation.innerHTML = formatMarkdown(result.reasons.map(r => `* ${r}`).join("\n") + `\n\n**Recommendation Verdict:** ${p.summary}`);

    prosList.innerHTML = p.pros.map(pr => `<li>✓ ${pr}</li>`).join("");
    consList.innerHTML = p.cons.map(c => `<li>✕ ${c}</li>`).join("");

    // Setup compare btn
    // Clean old listeners
    const newBtn = btnAddCompare.cloneNode(true);
    btnAddCompare.parentNode.replaceChild(newBtn, btnAddCompare);
    
    newBtn.addEventListener("click", () => {
      addToCompareList(p.id);
      window.location.hash = "#compare";
    });

    // Animate display
    container.style.display = "block";
    container.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function renderAIDashboard() {
    const grid = document.getElementById("recommendation-dashboard-grid");
    if (!grid) return;

    // Grab recommendations
    const recs = window.aiEngineInstance.getClassifiedRecommendations();
    if (Object.keys(recs).length === 0) return;

    const classifications = [
      { key: "lowestCost", label: "Lowest Cost Champion", class: "lowest", reason: "Represents the absolute lowest purchase price hurdle in our electronics index." },
      { key: "highestRated", label: "Highest Rated Choice", class: "highest", reason: "Maintains the highest aggregate verified user satisfaction rating in the database." },
      { key: "mostRecommended", label: "Most Recommended", class: "recommended", reason: "The crowdsourced volume favorite based on review scale and stellar scoring." },
      { key: "bestValue", label: "Best Value for Money", class: "value", reason: "Calculated with our rating-to-price ratio algorithms for maximum specifications density." },
      { key: "bestPerformance", label: "Best Performance Choice", class: "performance", reason: "Top tier processing architecture, memory density, and advanced hardware scoring." },
      { key: "bestPremium", label: "Best Premium Choice", class: "premium", reason: "Ultimate build specifications with robust material quality without pricing compromises." }
    ];

    grid.innerHTML = classifications.map(c => {
      const p = recs[c.key];
      if (!p) return "";

      return `
        <div class="rec-card glass-card">
          <span class="rec-badge badge-${c.class}">${c.label}</span>
          <div class="rec-visual">${getProductSVG(p.svgType, "var(--primary)")}</div>
          <h3>${p.name}</h3>
          
          <div class="rec-score-row" style="margin-top: 10px;">
            <div class="rec-score">AI Score: <span>${p.aiScore}/10</span></div>
            <div class="rec-confidence">${p.confidence}% Confidence</div>
          </div>
          
          <div class="rec-confidence-bar-wrapper">
            <div class="rec-confidence-bar" style="width: ${p.confidence}%"></div>
          </div>
          
          <div class="rec-reason">
            <strong style="color:#fff; display:block; margin-bottom:6px;">Why it wins:</strong>
            ${c.reason} ${p.pros[0]}.
          </div>
          
          <div class="rec-action-row">
            <button class="btn btn-secondary btn-sm btn-rec-add" data-id="${p.id}">Compare</button>
            <button class="btn btn-primary btn-sm btn-rec-shop" onclick="window.location.hash='#compare'">Specs</button>
          </div>
        </div>
      `;
    }).join("");

    // Bind compare clicks
    grid.querySelectorAll(".btn-rec-add").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = btn.getAttribute("data-id");
        addToCompareList(id);
        
        // Show floating message
        showToast("Product added to comparison matrix!");
      });
    });

    // Render price distribution and sentiment bars
    renderDashboardCharts();
  }

  function renderDashboardCharts() {
    const priceChart = document.getElementById("price-chart-bars");
    const sentimentList = document.getElementById("sentiment-chart-list");

    if (priceChart) {
      // Take 5 sample laptops/phones and render bar height
      const sampleProducts = PRODUCTS.slice(0, 5);
      const maxPrice = Math.max(...sampleProducts.map(p => p.price));

      priceChart.innerHTML = sampleProducts.map(p => {
        const heightPercent = (p.price / maxPrice) * 100;
        return `
          <div class="bar-chart-bar-wrapper">
            <div class="bar-chart-bar" style="height: ${heightPercent}%">
              <span class="bar-chart-val">${formatPrice(p.price)}</span>
            </div>
            <span class="bar-chart-label">${p.brand} ${p.name.split(" ")[0]}</span>
          </div>
        `;
      }).join("");
    }

    if (sentimentList) {
      // Sort products by rating
      const sortedByRating = [...PRODUCTS].sort((a,b)=>b.rating-a.rating).slice(0, 4);

      sentimentList.innerHTML = sortedByRating.map(p => {
        const percent = (p.rating / 5.0) * 100;
        return `
          <div class="sentiment-item">
            <div class="sentiment-info">
              <span class="sentiment-name">${p.name}</span>
              <span class="sentiment-val">${p.rating}/5.0</span>
            </div>
            <div class="sentiment-bar-track">
              <div class="sentiment-bar" style="width: ${percent}%"></div>
            </div>
          </div>
        `;
      }).join("");
    }
  }


  // --- 4. CHAT INTERFACE CONTROLLER ---
  const chatMessagesBox = document.getElementById("chat-messages");
  const chatInput = document.getElementById("chat-input");
  const btnSendChat = document.getElementById("btn-send-chat");

  if (btnSendChat && chatInput) {
    btnSendChat.addEventListener("click", () => {
      sendChatMessage();
    });

    chatInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        sendChatMessage();
      }
    });
  }

  // Suggestion chips
  document.querySelectorAll(".chat-suggest-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      chatInput.value = chip.textContent;
      sendChatMessage();
    });
  });

  function sendChatMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    // Push User message
    state.chatMessages.push({ sender: "user", text });
    chatInput.value = "";
    renderChatMessages();

    // Scroll to bottom
    chatMessagesBox.scrollTop = chatMessagesBox.scrollHeight;

    // Render typing placeholder
    const typingBubble = document.createElement("div");
    typingBubble.className = "chat-msg chat-msg-ai";
    typingBubble.innerHTML = `
      <div class="chat-msg-avatar ai">AI</div>
      <div class="chat-msg-bubble">
        <span class="chat-typing-dots">Thinking...</span>
      </div>
    `;
    chatMessagesBox.appendChild(typingBubble);
    chatMessagesBox.scrollTop = chatMessagesBox.scrollHeight;

    // Simulate AI response delay
    setTimeout(() => {
      // Call engine
      const aiResponse = window.aiEngineInstance.generateChatResponse(text);
      
      // Remove placeholder
      chatMessagesBox.removeChild(typingBubble);

      // Save real message
      state.chatMessages.push({ sender: "ai", text: aiResponse.text });
      renderChatMessages();
      
      // Scroll bottom
      chatMessagesBox.scrollTop = chatMessagesBox.scrollHeight;

      // Handle direct product additions if comparedIds found
      if (aiResponse.comparedIds && aiResponse.comparedIds.length > 0) {
        aiResponse.comparedIds.forEach(id => addToCompareList(id));
      }
    }, 1200);
  }

  function renderChatMessages() {
    if (!chatMessagesBox) return;

    chatMessagesBox.innerHTML = state.chatMessages.map(msg => {
      const isAI = msg.sender === "ai";
      const bubbleClass = isAI ? "chat-msg-ai" : "chat-msg-user";
      const avatarLabel = isAI ? "AI" : "U";

      return `
        <div class="chat-msg ${bubbleClass}">
          <div class="chat-msg-avatar ${isAI ? 'ai' : ''}">${avatarLabel}</div>
          <div class="chat-msg-bubble">${isAI ? formatMarkdown(msg.text) : msg.text}</div>
        </div>
      `;
    }).join("");
  }


  // --- 5. CONTACT VIEW CONTROLLER ---
  const contactForm = document.getElementById("compare-contact-form");
  const formSuccess = document.getElementById("contact-form-success");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const btnSubmit = contactForm.querySelector("button[type='submit']");
      const oldText = btnSubmit.textContent;
      
      btnSubmit.disabled = true;
      btnSubmit.textContent = "Sending Message...";

      // Simulate sending delay
      setTimeout(() => {
        // Fade out form, fade in success card
        contactForm.style.display = "none";
        formSuccess.style.display = "block";
      }, 1500);
    });
  }


  // --- AUTOCOMPLETE UTILITY CORE ---
  function setupSearchAutocomplete(inputElement, suggestionsElement, onSelectCallback) {
    if (!inputElement || !suggestionsElement) return;

    inputElement.addEventListener("input", (e) => {
      const q = e.target.value.toLowerCase().trim();
      
      if (!q) {
        suggestionsElement.style.display = "none";
        return;
      }

      // Filter products
      const matches = PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.brand.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q)
      );

      if (matches.length > 0) {
        suggestionsElement.innerHTML = matches.map(p => `
          <div class="suggestion-item" data-id="${p.id}">
            <div class="suggestion-name">${p.name}</div>
            <div class="suggestion-category">${p.category}</div>
          </div>
        `).join("");
        
        suggestionsElement.style.display = "block";

        // Bind clicks
        suggestionsElement.querySelectorAll(".suggestion-item").forEach(item => {
          item.addEventListener("click", () => {
            const id = item.getAttribute("data-id");
            const product = PRODUCTS.find(p => p.id === id);
            suggestionsElement.style.display = "none";
            inputElement.value = "";
            if (product) onSelectCallback(product);
          });
        });
      } else {
        suggestionsElement.innerHTML = `
          <div style="padding: 12px 24px; font-size: 13px; color: var(--text-muted);">
            No products found matching "${q}"
          </div>
        `;
        suggestionsElement.style.display = "block";
      }
    });

    // Close suggestions dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (e.target !== inputElement && e.target !== suggestionsElement) {
        suggestionsElement.style.display = "none";
      }
    });
  }


  // --- MARKDOWN SIMULATOR ---
  function formatMarkdown(text) {
    let html = text;
    // Headers
    html = html.replace(/### (.*)/g, '<h3 style="margin-top:12px; margin-bottom:6px; font-weight:600;">$1</h3>');
    html = html.replace(/#### (.*)/g, '<h4 style="margin-top:10px; margin-bottom:4px; font-weight:600;">$1</h4>');
    
    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Bullet Lists
    html = html.replace(/\*\s(.*)/g, '<li>$1</li>');
    // Group adjacent lists into ul
    // Simple replacements
    html = html.replace(/<li>(.*?)<\/li>/g, '<ul><li>$1</li></ul>');
    html = html.replace(/<\/ul>\s*<ul>/g, '');

    // Numbered lists
    html = html.replace(/\d\.\s(.*)/g, '<li>$1</li>');
    html = html.replace(/<li>(.*?)<\/li>/g, '<ol><li>$1</li></ol>');
    html = html.replace(/<\/ol>\s*<ol>/g, '');

    // Bold lists
    html = html.replace(/\*   \*\*(.*?)\*\*\:/g, '<li><strong>$1</strong>:');

    // Basic Tables parsing
    // Match line tables
    const tableRegex = /\| (.*) \|/g;
    if (text.includes("| --- |") || text.includes("| :--- |")) {
      const lines = text.split("\n");
      let inTable = false;
      let tableHtml = "<table>";

      lines.forEach(line => {
        if (line.trim().startsWith("|") && line.trim().endsWith("|")) {
          if (line.includes("---|") || line.includes(":---|")) {
            // Divider row, ignore
            return;
          }
          const cells = line.split("|").slice(1, -1).map(c => c.trim());
          
          if (!inTable) {
            inTable = true;
            tableHtml += "<thead><tr>" + cells.map(c => `<th>${c}</th>`).join("") + "</tr></thead><tbody>";
          } else {
            tableHtml += "<tr>" + cells.map(c => {
              // Format cells inner markdown
              let formattedCell = c.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
              // Format star ratings in tables
              formattedCell = formattedCell.replace(/★\s*([\d\.]+)/g, '<span style="color:var(--warning)">★ $1</span>');
              return `<td>${formattedCell}</td>`;
            }).join("") + "</tr>";
          }
        } else {
          if (inTable) {
            inTable = false;
            tableHtml += "</tbody></table>";
          }
        }
      });
      
      // Inject table
      const tableRows = text.match(/\|[\s\S]*?\|/g);
      if (tableRows) {
        const tableStartIndex = html.indexOf("|");
        const tableEndIndex = html.lastIndexOf("|") + 1;
        if (tableStartIndex !== -1 && tableEndIndex !== -1) {
          if (tableHtml.endsWith("<tbody>")) tableHtml += "</tbody></table>";
          html = html.substring(0, tableStartIndex) + tableHtml + html.substring(tableEndIndex);
        }
      }
    }

    return html;
  }

  // --- FLOATING TOAST SYSTEM ---
  function showToast(message) {
    const toast = document.createElement("div");
    toast.style.position = "fixed";
    toast.style.bottom = "24px";
    toast.style.right = "24px";
    toast.style.background = "rgba(13,14,22,0.85)";
    toast.style.backdropFilter = "blur(12px)";
    toast.style.border = "1px solid var(--border-glass-active)";
    toast.style.color = "#fff";
    toast.style.padding = "12px 24px";
    toast.style.borderRadius = "12px";
    toast.style.zIndex = "200";
    toast.style.fontSize = "13px";
    toast.style.boxShadow = "0 10px 30px rgba(0,0,0,0.8)";
    toast.style.transform = "translateY(50px)";
    toast.style.opacity = "0";
    toast.style.transition = "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)";

    document.body.appendChild(toast);
    toast.textContent = message;

    // Trigger transition
    setTimeout(() => {
      toast.style.transform = "translateY(0)";
      toast.style.opacity = "1";
    }, 100);

    // Fade out and remove
    setTimeout(() => {
      toast.style.transform = "translateY(-20px)";
      toast.style.opacity = "0";
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
  }
});
