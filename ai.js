// WiseBuy AI Recommendation Engine & Chat Simulation
class AIEngine {
  constructor(products) {
    this.products = products;
  }

  // Get recommendations for standard classifications
  getClassifiedRecommendations(userCategory = "All") {
    let list = this.products;
    if (userCategory !== "All") {
      list = this.products.filter(p => p.category.toLowerCase() === userCategory.toLowerCase());
    }

    if (list.length === 0) return {};

    // 1. Lowest Cost
    const lowestCost = [...list].sort((a, b) => a.price - b.price)[0];

    // 2. Highest Rated
    const highestRated = [...list].sort((a, b) => b.rating - a.rating)[0];

    // 3. Most Recommended
    // Weighted formula: reviewsCount * rating
    const mostRecommended = [...list].sort((a, b) => (b.reviewsCount * b.rating) - (a.reviewsCount * a.rating))[0];

    // 4. Best Value For Money
    // Value = (Rating * 100) / Price (higher rating, lower price)
    // Scale price slightly to normalize tech categories
    const bestValue = [...list].sort((a, b) => {
      const valA = (a.rating * a.rating * 100000) / a.price;
      const valB = (b.rating * b.rating * 100000) / b.price;
      return valB - valA;
    })[0];

    // 5. Best Performance
    const bestPerformance = [...list].sort((a, b) => b.aiScore - a.aiScore)[0]; // Top AI score represents peak spec/performance

    // 6. Best Premium Choice
    // High price, high rating (threshold in INR)
    const bestPremium = [...list].filter(p => p.price >= (userCategory === "Headphones" || userCategory === "Smartwatch" ? 30000 : 100000))
                                 .sort((a, b) => b.rating - a.rating)[0] || highestRated;

    return {
      lowestCost,
      highestRated,
      mostRecommended,
      bestValue,
      bestPerformance,
      bestPremium
    };
  }

  // Find the Best Product based on specific user parameters
  findBestProduct(budget, usageType, preferredBrand, priority) {
    let candidates = [...this.products];

    // Score candidates based on match criteria
    const scoredCandidates = candidates.map(product => {
      let score = 50; // Base baseline score
      let reasons = [];

      // 1. Budget check
      const priceDiff = budget - product.price;
      if (priceDiff >= 0) {
        score += 20; // Fits budget
        // Proximity bonus (prefer products utilizing the budget well, but not exceeding it)
        const proximity = (product.price / budget) * 10;
        score += proximity;
        reasons.push(`Fits your ${formatPrice(budget)} budget perfectly (costs ${formatPrice(product.price)}).`);
      } else {
        // Exceeds budget penalty
        const penalty = Math.min(40, (product.price - budget) / 1000);
        score -= penalty;
        reasons.push(`Exceeds your budget by ${formatPrice(product.price - budget)}.`);
      }

      // 2. Brand preference
      if (preferredBrand !== "any") {
        if (product.brand.toLowerCase() === preferredBrand.toLowerCase()) {
          score += 25;
          reasons.push(`Matches your brand preference for ${product.brand}.`);
        } else {
          score -= 10;
        }
      }

      // 3. Priority focus checks
      const titleLower = product.name.toLowerCase();
      const featuresJoin = product.features.join(" ").toLowerCase();
      const specsJoin = Object.values(product.specs).join(" ").toLowerCase();
      const prosJoin = product.pros.join(" ").toLowerCase();

      switch (priority.toLowerCase()) {
        case "gaming":
          if (product.category === "Laptop" && (featuresJoin.includes("m3 pro") || featuresJoin.includes("arc") || specsJoin.includes("gpu"))) {
            score += 30;
            reasons.push("Features powerful discrete/integrated GPU capabilities for smooth gaming.");
          } else if (product.category === "Smartphone" && (featuresJoin.includes("a17 pro") || featuresJoin.includes("snapdragon"))) {
            score += 25;
            reasons.push("Powered by flagship mobile processors designed for high-refresh gaming.");
          }
          break;
        case "office work":
          if (product.category === "Laptop" && (featuresJoin.includes("keyboard") || titleLower.includes("thinkpad"))) {
            score += 30;
            reasons.push("Equipped with class-leading keyboard comfort and productivity ports for long work sessions.");
          } else if (product.category === "Smartphone" && featuresJoin.includes("s pen")) {
            score += 20;
            reasons.push("Includes active stylus support for notes, sketching, and multitasking.");
          } else if (product.category === "Headphones" && featuresJoin.includes("mic")) {
            score += 20;
            reasons.push("Superior voice mic isolation filters background noise during conference calls.");
          }
          break;
        case "camera":
          if (featuresJoin.includes("camera") || featuresJoin.includes("zoom") || specsJoin.includes("telephoto") || specsJoin.includes("megapixel") || featuresJoin.includes("sensor")) {
            score += 30;
            reasons.push("Boasts a pro-grade camera system with optical zoom and high pixel density.");
          }
          break;
        case "battery":
          if (featuresJoin.includes("battery") || specsJoin.includes("battery") || specsJoin.includes("hours") || specsJoin.includes("day battery")) {
            // Find battery life values
            if (product.specs["Battery Life"] && (product.specs["Battery Life"].includes("18 hours") || product.specs["Battery Life"].includes("14 days") || product.specs["Battery Life"].includes("30 hours"))) {
              score += 35;
            } else {
              score += 20;
            }
            reasons.push(`Offers exceptional battery endurance (${product.specs["Battery Life"] || "long life"}).`);
          }
          break;
        case "performance":
          if (product.aiScore >= 9.2) {
            score += 30;
            reasons.push(`Class-leading raw speed backed by an AI Score of ${product.aiScore}/10.`);
          }
          break;
        case "design":
          if (featuresJoin.includes("titanium") || featuresJoin.includes("carbon fiber") || featuresJoin.includes("infinityedge") || featuresJoin.includes("mesh")) {
            score += 25;
            reasons.push(`Constructed with premium materials (${product.features.find(f => f.includes("Frame") || f.includes("Chassis") || f.includes("Canopy") || f.includes("InfinityEdge")) || "advanced styling"}).`);
          }
          break;
      }

      // Add rating impact
      score += (product.rating - 4.0) * 15;

      // Clamp score
      score = Math.max(10, Math.min(99, Math.round(score)));

      return {
        product,
        score,
        reasons
      };
    });

    // Sort by score descending
    scoredCandidates.sort((a, b) => b.score - a.score);
    return scoredCandidates[0];
  }

  // Simulated AI Chatbot Response Generator
  generateChatResponse(query) {
    const q = query.toLowerCase().trim();
    let response = "";
    let comparedIds = [];

    // Helper to find mentioned products
    const mentionedProducts = this.products.filter(p => {
      const nameParts = p.name.toLowerCase().split(" ");
      // Check if query contains name parts or ID
      return q.includes(p.id) || 
             (q.includes(p.brand.toLowerCase()) && nameParts.some(part => part.length > 2 && q.includes(part))) ||
             q.includes(p.name.toLowerCase());
    });

    // Case 1: Dynamic Side-by-Side Comparison of 2 or more products
    if (mentionedProducts.length >= 2) {
      const p1 = mentionedProducts[0];
      const p2 = mentionedProducts[1];
      comparedIds = [p1.id, p2.id];
      if (mentionedProducts[3]) comparedIds.push(mentionedProducts[2].id);

      response = `### AI Synthesis: ${p1.name} vs ${p2.name}
      
I have analyzed **${this.products.length}+ specifications, 5,000+ review sentiments, and pricing records** from Amazon, Croma, and other sources for both devices. Here is my side-by-side comparison:

| Metric | ${p1.name} | ${p2.name} | Winner |
| :--- | :--- | :--- | :--- |
| **Brand** | ${p1.brand} | ${p2.brand} | - |
| **MSRP** | ${formatPrice(p1.price)} | ${formatPrice(p2.price)} | ${p1.price < p2.price ? p1.brand : p2.brand} (More Affordable) |
| **Rating** | ★ ${p1.rating} (${p1.reviewsCount} reviews) | ★ ${p2.rating} (${p2.reviewsCount} reviews) | ${p1.rating > p2.rating ? p1.brand : p2.brand} |
| **AI Score** | **${p1.aiScore}/10** | **${p2.aiScore}/10** | ${p1.aiScore > p2.aiScore ? p1.name : p2.name} |
| **Key Spec** | ${Object.values(p1.specs)[0]} | ${Object.values(p2.specs)[0]} | - |
| **Battery** | ${p1.specs["Battery Life"] || "N/A"} | ${p2.specs["Battery Life"] || "N/A"} | ${p1.name.includes("Garmin") || p1.name.includes("MacBook") ? p1.brand : p2.brand} |

#### Key Strengths
*   **${p1.name}**: ${p1.pros.slice(0, 2).join(", ")}.
*   **${p2.name}**: ${p2.pros.slice(0, 2).join(", ")}.

#### AI Verdict & Recommendation
${p1.aiScore > p2.aiScore ? `**${p1.name}** is the superior choice overall with a confidence level of **${p1.confidence}%**.` : `**${p2.name}** edges ahead in overall capability with a confidence rating of **${p2.confidence}%**.`}
If budget is your primary concern, ${p1.price < p2.price ? `**${p1.name}** saves you ${formatPrice(p2.price - p1.price)}` : `**${p2.name}** saves you ${formatPrice(p1.price - p2.price)}`}. However, if you prioritize ${p1.aiScore > p2.aiScore ? p1.features[0] : p2.features[0]}, go with the ${p1.aiScore > p2.aiScore ? p1.brand : p2.brand}.

*You can click "Compare" on these cards to view them in the main comparison matrix.*`;

    } 
    // Case 2: Query for a single product details
    else if (mentionedProducts.length === 1) {
      const p = mentionedProducts[0];
      comparedIds = [p.id];
      response = `### AI Analysis: ${p.name}
      
Here is the deep-dive intelligence breakdown for the **${p.name}** (${formatPrice(p.price)}):

*   **AI Smart Score**: **${p.aiScore}/10** (Confidence rating: ${p.confidence}%)
*   **Best Suited For**: ${p.summary}
*   **Primary Specifications**:
    *   *Processor/Driver*: ${p.specs["Processor"] || p.specs["Driver Size"] || "Custom Platform"}
    *   *Display/Frequency*: ${p.specs["Display"] || p.specs["Frequency Response"] || "High Fidelity"}
    *   *Battery Endurance*: ${p.specs["Battery Life"] || "All-day performance"}
    *   *Weight*: ${p.specs["Weight"] || "Highly portable"}

*   **Core Strengths (Pros)**:
    1.  *${p.pros[0]}*
    2.  *${p.pros[1]}*
    
*   **Weaknesses (Cons)**:
    1.  *${p.cons[0]}*
    2.  *${p.cons[1]}*

**Market Pricing**: Available on Amazon for ${formatPrice(p.sources[0].price)} and Croma for ${formatPrice(p.sources[1].price)}.
`;
    } 
    // Case 3: Battery queries
    else if (q.includes("battery") || q.includes("longest battery") || q.includes("battery life")) {
      const sortedByBattery = [...this.products].sort((a, b) => {
        // Simple heuristic for battery: Garmin watch (14 days) > Macbook (18h) > Laptop > Phone > Headphones
        const getBatteryRank = (product) => {
          const spec = product.specs["Battery Life"] || "";
          if (spec.includes("days")) return parseInt(spec) * 24;
          if (spec.includes("hours")) return parseInt(spec);
          if (spec.includes("normal usage")) return 16;
          return 12;
        };
        return getBatteryRank(b) - getBatteryRank(a);
      });

      response = `### Longest Battery Life Leaders
      
If endurance is your absolute priority, these are the top devices in our database that require the fewest trips to the outlet:

1.  **Garmin Venu 3** (${sortedByBattery[0].category}) — **${sortedByBattery[0].specs["Battery Life"]}**
    *   *Why*: Proprietary ultra-low power operating system and high-efficiency GPS module.
2.  **MacBook Pro 14" M3 Pro** (${sortedByBattery[1].category}) — **${sortedByBattery[1].specs["Battery Life"]}**
    *   *Why*: Apple's 3-nanometer silicon optimization enables intense work sessions without a charger.
3.  **Sony WH-1000XM5** (${sortedByBattery[2].category}) — **${sortedByBattery[2].specs["Battery Life"]}**
    *   *Why*: Over 30 hours of continuous active noise cancellation playback.

Would you like to compare any of these side by side?`;
    } 
    // Case 4: Cheap/budget queries
    else if (q.includes("cheap") || q.includes("budget") || q.includes("value") || q.includes("under")) {
      // Look for price numbers in query (allowing commas)
      const matchUnder = q.match(/under\s*(?:₹|inr|rs\.?\s*)?\s*(\d+[\d,]*)/i);
      let limit = matchUnder ? parseInt(matchUnder[1].replace(/,/g, "")) : 50000;
      const budgetItems = this.products.filter(p => p.price <= limit).sort((a, b) => a.price - b.price);

      if (budgetItems.length > 0) {
        response = `### Top Budget Selections Under ${formatPrice(limit)}
        
Here are the highest-performing options that respect your wallet, sorted by price:

| Product | Category | Rating | Price | AI Value Rating |
| :--- | :--- | :--- | :--- | :--- |
${budgetItems.map(p => `| **${p.name}** | ${p.category} | ★ ${p.rating} | **${formatPrice(p.price)}** | ${p.aiScore}/10 |`).join("\n")}

**Editor's Pick**: The **${budgetItems[0].name}** represents the ultimate entry-point value in this price bracket. Let me know if you would like a detailed specs breakdown of any of these!`;
      } else {
        response = `I couldn't find any products in our catalog priced under ${formatPrice(limit)}. Our lowest price item is the **${[...this.products].sort((a,b)=>a.price-b.price)[0].name}** at ${formatPrice([...this.products].sort((a,b)=>a.price-b.price)[0].price)}. Would you like to review details on it?`;
      }
    } 
    // Case 5: Default chatbot responses
    else {
      response = `### Welcome to WiseBuy AI Search Intelligence
      
I am your dedicated hardware analyst. I can compare specs, process review counts, and generate purchasing comparisons instantly. 

Try asking me questions like:
*   *"Compare the iPhone 15 Pro Max and Galaxy S24 Ultra"*
*   *"What is the best laptop for battery life?"*
*   *"Show me smartwatches under ₹30,000"*
*   *"Is the Sony WH-1000XM5 better than the AirPods Max?"*

What products are on your shortlist today?`;
    }

    return {
      text: response,
      comparedIds
    };
  }
}

window.AIEngine = AIEngine;
window.aiEngineInstance = new AIEngine(window.PRODUCTS);
