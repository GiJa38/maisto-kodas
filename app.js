// Maisto Kodas - Recipe Planner Application Script

// Global category details
const CATEGORY_MAP = {
  salad: { label: "Salotos", emoji: "🥗" },
  soup: { label: "Sriubos", emoji: "🥣" },
  chicken: { label: "Vištiena", emoji: "🍗" },
  pork: { label: "Kiauliena", emoji: "🥩" },
  fish: { label: "Žuvis", emoji: "🐟" },
  curd: { label: "Varškė", emoji: "🥛" },
  snack: { label: "Užkandžiai", emoji: "🍎" },
  dessert: { label: "Desertai", emoji: "🍰" },
  other: { label: "Kita", emoji: "🍽️" }
};

const MEAL_OCCASIONS = {
  breakfast: { label: "Pusryčiams", emoji: "🥞" },
  lunch: { label: "Pietums", emoji: "🍲" },
  dinner: { label: "Vakarienei", emoji: "🥩" },
  snack: { label: "Užkandžiui", emoji: "🍎" },
  dessert: { label: "Desertui", emoji: "🍰" }
};

// Mock Initial Recipes Data (in Lithuanian)
const mockRecipes = [
  {
    id: "mock-1",
    title: "Avokado ir Kepto Kiaušinio Skrebutis",
    mealType: "snack",
    suitableMeals: ["breakfast", "snack"],
    prepTime: 5,
    cookTime: 5,
    servings: 1,
    description: "Sotus ir maistingas skrebutis, idealiai tinkantis dienos pradžiai. Gausu sveikųjų riebalų ir baltymų.",
    ingredients: [
      { name: "Pilno grūdo duonos riekė", amount: 1, unit: "vnt" },
      { name: "Nokęs avokadas", amount: 0.5, unit: "vnt" },
      { name: "Kiaušinis", amount: 1, unit: "vnt" },
      { name: "Vyšniniai pomidorai", amount: 4, unit: "vnt" },
      { name: "Citrinos sultys", amount: 1, unit: "arbat. šaukštel." },
      { name: "Druska, pipirai, čili dribsniai", amount: null, unit: "pagal skonį" }
    ],
    instructions: [
      "Duonos riekę paskrudinkite skrudintuvėje arba keptuvėje be riebalų.",
      "Dubenyje sutrinkite avokadą šakute, sumaišykite su citrinos sultimis, žiupsneliu druskos ir pipirų.",
      "Keptuvėje iškepkite kiaušinį (geriausia su skystu tryniu).",
      "Ant paskrudintos duonos užtepkite trintą avokadą, uždėkite keptą kiaušinį.",
      "Papuoškite perpus perpjautais vyšniniais pomidorais ir pabarstykite čili dribsniais."
    ],
    macros: {
      calories: 380,
      protein: 14,
      carbs: 22,
      fat: 26,
      fiber: 6
    },
    image: "" // Empty or placeholder CSS based image
  },
  {
    id: "mock-2",
    title: "Lašiša su Terijaki ir Garintais Brokoliais",
    mealType: "fish",
    suitableMeals: ["lunch", "dinner"],
    prepTime: 10,
    cookTime: 15,
    servings: 2,
    description: "Greitai paruošiami ir subalansuoti pietūs. Omega-3 riebalų rūgštys iš lašišos ir vitaminų gausa iš brokolių.",
    ingredients: [
      { name: "Lašišos filė", amount: 300, unit: "g" },
      { name: "Teriyaki padažas", amount: 3, unit: "valg. šaukšt." },
      { name: "Brokolis (padalintas žiedynais)", amount: 1, unit: "galva" },
      { name: "Ryžiai (nevirti)", amount: 120, unit: "g" },
      { name: "Sezamo sėklos papuošimui", amount: 1, unit: "arbat. šaukštel." },
      { name: "Alyvuogių aliejus", amount: 1, unit: "valg. šaukšt." }
    ],
    instructions: [
      "Ryžius išvirkite pagal pakuotės instrukcijas.",
      "Lašišos filė nusausinkite, supjaustykite į dvi dalis, aptepkite teriyaki padažu ir palikite pasimarinuoti 5 min.",
      "Keptuvėje įkaitinkite alyvuogių aliejų, dėkite lašišą oda žemyn ir kepkite 4-5 minutes, tada apverskite ir kepkite dar 3-4 minutes.",
      "Brokolius išgarinkite arba apvirkite pasūdytame vandenyje apie 4-5 minutes, kol bus minkšti, bet vis dar traškūs.",
      "Into lėkštes dėkite ryžius, šalia išdėliokite brokolius bei lašišą. Užpilkite likusiu keptuvėje teriyaki padažu ir apibarstykite sezamo sėklomis."
    ],
    macros: {
      calories: 590,
      protein: 38,
      carbs: 48,
      fat: 24,
      fiber: 7
    },
    image: ""
  },
  {
    id: "mock-3",
    title: "Viduržemio Jūros Vištienos Salotos",
    mealType: "chicken",
    suitableMeals: ["lunch", "dinner"],
    prepTime: 15,
    cookTime: 10,
    servings: 2,
    description: "Lengva, bet soti vakarienė. Mažai angliavandenių, daug baltymų ir gaivių daržovių.",
    ingredients: [
      { name: "Vištienos krūtinėlė", amount: 300, unit: "g" },
      { name: "Agurkas", amount: 1, unit: "vnt" },
      { name: "Raudonasis svogūnas", amount: 0.5, unit: "vnt" },
      { name: "Juodosios alyvuogės (be kauliukų)", amount: 10, unit: "vnt" },
      { name: "Feta sūris", amount: 80, unit: "g" },
      { name: "Alyvuogių aliejus padažui", amount: 2, unit: "valg. šaukšt." },
      { name: "Džiovintas raudonėlis", amount: 1, unit: "arbat. šaukštel." },
      { name: "Citrina (sultims)", amount: 0.5, unit: "vnt" }
    ],
    instructions: [
      "Vištienos krūtinėlę supjaustykite kubeliais, pabarstykite raudonėliu, druska, pipirais ir iškepkite keptuvėje (apie 8-10 min).",
      "Agurką supjaustykite griežinėliais, svogūną - plonais pusžiedžiais.",
      "Dideliame dubenyje sumaišykite agurkus, svogūnus, alyvuoges.",
      "Sudėkite iškeptą vištieną į dubenį.",
      "Užtrupinkite Feta sūrį ant viršaus.",
      "Paruoškite padažą: sumaišykite alyvuogių aliejų su citrinos sultimis ir užpilkite ant salotų prieš patiekiant."
    ],
    macros: {
      calories: 420,
      protein: 36,
      carbs: 8,
      fat: 28,
      fiber: 3
    },
    image: ""
  }
];

// App State
let state = {
  recipes: [],
  apiKey: "",
  currentRecipeId: null,
  servingMultiplier: 1.0,
  activeFilter: "all",
  searchQuery: "",
  uploadingImages: [] // Array of { id: number, base64: string, mimeType: string }
};

// Initialize App
function initApp() {
  // Register PWA Service Worker with auto-update checking
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => {
        console.log('Service Worker užregistruotas sėkmingai:', reg.scope);
        
        // Listen for updates to sw.js
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('Rasta nauja programėlės versija, perkraunama...');
              window.location.reload();
            }
          });
        });
      })
      .catch(err => console.error('Nepavyko užregistruoti Service Worker:', err));
  }

  // Load API Key
  state.apiKey = localStorage.getItem("gemini_api_key") || "";
  document.getElementById("apiKeyInput").value = state.apiKey;

  // Collapse instructions if key is already set
  const instructions = document.getElementById("apiKeyInstructions");
  if (state.apiKey && state.apiKey.trim() !== "") {
    instructions.removeAttribute("open");
  } else {
    instructions.setAttribute("open", "");
  }

  // Load Recipes with backward compatibility migration
  let storedRecipes = localStorage.getItem("maistokodas_recipes");
  if (!storedRecipes) {
    storedRecipes = localStorage.getItem("receptine_recipes");
    if (storedRecipes) {
      localStorage.setItem("maistokodas_recipes", storedRecipes);
      localStorage.removeItem("receptine_recipes");
    } else {
      storedRecipes = localStorage.getItem("gourmet_recipes");
      if (storedRecipes) {
        localStorage.setItem("maistokodas_recipes", storedRecipes);
        localStorage.removeItem("gourmet_recipes");
      }
    }
  }

  if (storedRecipes) {
    try {
      state.recipes = JSON.parse(storedRecipes);
    } catch (e) {
      console.error("Error parsing stored recipes, falling back to mocks", e);
      state.recipes = [...mockRecipes];
    }
  } else {
    state.recipes = [...mockRecipes];
    saveRecipesToLocalStorage();
  }

  // Run category restructuring migration
  migrateToNewCategories();

  // Migrate existing recipes to include fiber if missing
  let migrated = false;
  state.recipes.forEach(recipe => {
    if (!recipe.macros) {
      recipe.macros = { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 };
      migrated = true;
    } else if (recipe.macros.fiber === undefined) {
      recipe.macros.fiber = estimateRecipeFiber(recipe);
      migrated = true;
    }
  });
  if (migrated) {
    saveRecipesToLocalStorage();
  }

  // Setup Event Listeners
  setupEventListeners();

  // Render Grid
  renderRecipesGrid();
}

// Save to LocalStorage
function saveRecipesToLocalStorage() {
  localStorage.setItem("maistokodas_recipes", JSON.stringify(state.recipes));
}

// Help functions

// Event Listeners Configuration
function setupEventListeners() {
  // Modals Open/Close
  document.getElementById("openSettingsBtn").addEventListener("click", () => openModal("settingsModal"));
  document.getElementById("closeSettingsModal").addEventListener("click", () => closeModal("settingsModal"));
  document.getElementById("cancelSettingsBtn").addEventListener("click", () => closeModal("settingsModal"));
  
  document.getElementById("openAddRecipeBtn").addEventListener("click", () => {
    resetAddRecipeForm();
    openModal("addRecipeModal");
  });
  document.getElementById("closeAddRecipeModal").addEventListener("click", () => closeModal("addRecipeModal"));
  document.getElementById("cancelAddRecipeBtn").addEventListener("click", () => closeModal("addRecipeModal"));

  document.getElementById("closeDetailsModal").addEventListener("click", () => closeModal("recipeDetailsModal"));
  document.getElementById("closeDetailsBottomBtn").addEventListener("click", () => closeModal("recipeDetailsModal"));

  // Outside click closes modals
  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      closeModal(e.target.id);
    }
  });

  // Settings Save
  document.getElementById("saveSettingsBtn").addEventListener("click", saveSettings);

  // Add Recipe Mode Tabs
  const modeImageBtn = document.getElementById("modeImageBtn");
  const modeTextBtn = document.getElementById("modeTextBtn");
  const uploadImagePanel = document.getElementById("uploadImagePanel");
  const pasteTextPanel = document.getElementById("pasteTextPanel");

  modeImageBtn.addEventListener("click", () => {
    modeImageBtn.classList.add("active");
    modeTextBtn.classList.remove("active");
    uploadImagePanel.style.display = "block";
    pasteTextPanel.style.display = "none";
  });

  modeTextBtn.addEventListener("click", () => {
    modeTextBtn.classList.add("active");
    modeImageBtn.classList.remove("active");
    pasteTextPanel.style.display = "block";
    uploadImagePanel.style.display = "none";
  });

  // Image Upload Event Handlers
  const dragArea = document.getElementById("dragArea");
  const recipeImageInput = document.getElementById("recipeImageInput");
  const uploadPreviewImage = document.getElementById("uploadPreviewImage");

  dragArea.addEventListener("click", () => recipeImageInput.click());

  dragArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dragArea.classList.add("dragover");
  });

  dragArea.addEventListener("dragleave", () => {
    dragArea.classList.remove("dragover");
  });

  dragArea.addEventListener("drop", (e) => {
    e.preventDefault();
    dragArea.classList.remove("dragover");
    if (e.dataTransfer.files.length > 0) {
      handleImageFiles(e.dataTransfer.files);
    }
  });

  recipeImageInput.addEventListener("change", (e) => {
    if (e.target.files.length > 0) {
      handleImageFiles(e.target.files);
    }
  });

  // Process recipe btn
  document.getElementById("processRecipeBtn").addEventListener("click", processRecipeWithAI);

  // Servings Controller
  document.getElementById("servingsMinus").addEventListener("click", () => adjustMultiplier(-1));
  document.getElementById("servingsPlus").addEventListener("click", () => adjustMultiplier(1));

  // Search & Filters
  document.getElementById("searchInput").addEventListener("input", (e) => {
    state.searchQuery = e.target.value.toLowerCase();
    renderRecipesGrid();
  });

  const filterBtns = document.querySelectorAll("#mealFilterGroup .filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      filterBtns.forEach(b => b.classList.remove("active"));
      e.target.classList.add("active");
      state.activeFilter = e.target.getAttribute("data-filter");
      renderRecipesGrid();
    });
  });

  // Delete Recipe Action
  document.getElementById("deleteRecipeBtn").addEventListener("click", deleteActiveRecipe);

  // Edit Recipe Actions
  document.getElementById("editRecipeBtn").addEventListener("click", enterEditMode);
  document.getElementById("cancelEditRecipeBtn").addEventListener("click", exitEditMode);
  document.getElementById("saveEditRecipeBtn").addEventListener("click", saveRecipeEdits);
  document.getElementById("addEditIngredientBtn").addEventListener("click", () => addEditIngredientRow());
  document.getElementById("addEditStepBtn").addEventListener("click", () => addEditStepRow());

  // Backup Data Handlers
  document.getElementById("exportDataBtn").addEventListener("click", exportRecipesJSON);
  
  const importTrigger = document.getElementById("importDataBtnClickTrigger");
  const importInput = document.getElementById("importDataFileInput");
  
  importTrigger.addEventListener("click", () => importInput.click());
  importInput.addEventListener("change", importRecipesJSON);
}

// Open / Close Modals
function openModal(id) {
  document.getElementById(id).classList.add("active");
}

function closeModal(id) {
  document.getElementById(id).classList.remove("active");
  if (id === "recipeDetailsModal") {
    exitEditMode();
  }
}

// Reset the Add Form
function resetAddRecipeForm() {
  document.getElementById("recipeTextInput").value = "";
  document.getElementById("recipeImageInput").value = "";
  const previewContainer = document.getElementById("uploadPreviewContainer");
  previewContainer.style.display = "none";
  previewContainer.innerHTML = "";
  document.getElementById("dragArea").style.padding = "3rem 2rem";
  document.querySelector(".upload-text").style.display = "block";
  document.querySelector(".upload-icon").style.display = "block";
  state.uploadingImages = [];
  
  // Reset loader views
  document.getElementById("addRecipeFormContent").style.display = "block";
  document.getElementById("aiLoader").classList.remove("active");
}

// Handle Uploaded Image Files (Multiple)
function handleImageFiles(files) {
  const previewContainer = document.getElementById("uploadPreviewContainer");
  
  Array.from(files).forEach(file => {
    if (!file.type.startsWith("image/")) {
      alert(`Failas "${file.name}" nėra paveikslėlis ir bus ignoruojamas.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      const base64Data = dataUrl.split(",")[1];
      const imageId = Date.now() + Math.random();
      
      const newImg = {
        id: imageId,
        base64: base64Data,
        mimeType: file.type
      };
      
      state.uploadingImages.push(newImg);

      // Render thumbnail
      const wrapper = document.createElement("div");
      wrapper.className = "preview-thumb-wrapper";
      wrapper.id = `thumb-${imageId}`;
      
      wrapper.innerHTML = `
        <img src="${dataUrl}" class="preview-thumb-img" alt="Recipe thumb">
        <button type="button" class="preview-thumb-remove" title="Pašalinti">&times;</button>
      `;

      // Remove button listener
      wrapper.querySelector(".preview-thumb-remove").addEventListener("click", (evt) => {
        evt.stopPropagation(); // prevent triggering file input click on dragArea
        removeUploadedImage(imageId);
      });

      previewContainer.appendChild(wrapper);
      
      // Update UI visibility
      previewContainer.style.display = "grid";
      document.getElementById("dragArea").style.padding = "1.5rem";
      document.querySelector(".upload-text").style.display = "none";
      document.querySelector(".upload-icon").style.display = "none";
    };
    reader.readAsDataURL(file);
  });
}

function removeUploadedImage(id) {
  state.uploadingImages = state.uploadingImages.filter(img => img.id !== id);
  const thumb = document.getElementById(`thumb-${id}`);
  if (thumb) thumb.remove();
  
  if (state.uploadingImages.length === 0) {
    const previewContainer = document.getElementById("uploadPreviewContainer");
    previewContainer.style.display = "none";
    document.getElementById("dragArea").style.padding = "3rem 2rem";
    document.querySelector(".upload-text").style.display = "block";
    document.querySelector(".upload-icon").style.display = "block";
  }
}

// Save Settings (API Key)
function saveSettings() {
  const key = document.getElementById("apiKeyInput").value.trim();
  state.apiKey = key;
  localStorage.setItem("gemini_api_key", key);
  
  // Collapse instructions after saving key
  const instructions = document.getElementById("apiKeyInstructions");
  if (key && key.trim() !== "") {
    instructions.removeAttribute("open");
  }
  
  closeModal("settingsModal");
}

// Display Recipes Grid
function renderRecipesGrid() {
  const grid = document.getElementById("recipesGrid");
  grid.innerHTML = "";

  const filtered = state.recipes.filter(recipe => {
    // Search match
    const titleMatch = recipe.title.toLowerCase().includes(state.searchQuery);
    const ingredientMatch = recipe.ingredients.some(ing => ing.name.toLowerCase().includes(state.searchQuery));
    const matchesSearch = titleMatch || ingredientMatch;

    // Meal type filter match
    const matchesFilter = state.activeFilter === "all" || recipe.mealType === state.activeFilter;

    return matchesSearch && matchesFilter;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="no-recipes">
        <span class="no-recipes-icon">🥗</span>
        <h3>Nerasta jokių receptų</h3>
        <p>Bandykite keisti paieškos frazę arba pridėkite naują receptą!</p>
      </div>
    `;
    return;
  }

  filtered.forEach(recipe => {
    const card = document.createElement("div");
    card.className = "recipe-card";
    
    // Pick appropriate icon based on category (mealType)
    const categoryInfo = CATEGORY_MAP[recipe.mealType] || CATEGORY_MAP.other;
    const mealIcon = categoryInfo.emoji;
    const mealLabel = categoryInfo.label;

    const kcal = recipe.macros ? recipe.macros.calories : 0;
    const protein = recipe.macros ? recipe.macros.protein : 0;
    const carbs = recipe.macros ? recipe.macros.carbs : 0;
    const fat = recipe.macros ? recipe.macros.fat : 0;
    const fiber = recipe.macros ? (recipe.macros.fiber || 0) : 0;

    // occasions badges html
    const mealsList = recipe.suitableMeals || [];
    const occasionsHTML = mealsList.map(mealKey => {
      const info = MEAL_OCCASIONS[mealKey];
      return info ? `<span class="occasion-tag" title="${info.label}">${info.emoji} <span class="occasion-tag-label">${info.label}</span></span>` : "";
    }).join("");

    // HTML for card
    card.innerHTML = `
      <div class="recipe-card-image-container">
        ${recipe.image ? `<img src="${recipe.image}" class="recipe-card-img" alt="${recipe.title}">` : `
          <div style="font-size: 3.5rem; filter: grayscale(0.2);">${mealIcon}</div>
        `}
        <span class="recipe-card-tag tag-${recipe.mealType}">${mealLabel}</span>
      </div>
      <div class="recipe-card-content">
        <h3 class="recipe-card-title">${recipe.title}</h3>
        <p class="recipe-card-desc">${recipe.description || "Skanus naminis receptas, paruoštas su meile."}</p>
        
        <div class="recipe-card-meta">
          <span>⏱️ ${recipe.prepTime + recipe.cookTime} min</span>
          <span>👨‍👩‍👧‍👦 ${recipe.servings} porc.</span>
        </div>

        <div class="recipe-card-occasions">
          ${occasionsHTML}
        </div>

        <div class="card-macros">
          <div class="macro-box macro-kcal">
            <span class="macro-box-val">${kcal}</span>
            <span class="macro-box-lbl">kcal</span>
          </div>
          <div class="macro-box macro-prot">
            <span class="macro-box-val">${protein}g</span>
            <span class="macro-box-lbl">balt</span>
          </div>
          <div class="macro-box macro-carb">
            <span class="macro-box-val">${carbs}g</span>
            <span class="macro-box-lbl">angl</span>
          </div>
          <div class="macro-box macro-fat">
            <span class="macro-box-val">${fat}g</span>
            <span class="macro-box-lbl">rieb</span>
          </div>
          <div class="macro-box macro-fiber">
            <span class="macro-box-val">${fiber}g</span>
            <span class="macro-box-lbl">skai</span>
          </div>
        </div>
      </div>
    `;

    card.addEventListener("click", () => openRecipeDetails(recipe.id));
    grid.appendChild(card);
  });
}

// Open Recipe Details View
function openRecipeDetails(recipeId) {
  const recipe = state.recipes.find(r => r.id === recipeId);
  if (!recipe) return;

  state.currentRecipeId = recipeId;
  state.servingMultiplier = 1.0; // reset multiplier

  // Set header
  const categoryInfo = CATEGORY_MAP[recipe.mealType] || CATEGORY_MAP.other;
  detailMealTag.className = `recipe-card-tag tag-${recipe.mealType}`;
  detailMealTag.textContent = categoryInfo.label;

  document.getElementById("detailTitle").textContent = recipe.title;
  document.getElementById("detailImage").src = recipe.image || "";
  
  // Meta
  document.getElementById("detailPrepTime").innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
    Paruošimas: ${recipe.prepTime} min
  `;
  document.getElementById("detailCookTime").innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
    Gaminimas: ${recipe.cookTime} min
  `;
  document.getElementById("detailDescription").textContent = recipe.description || "";

  // Set recommended meals (suitableMeals)
  const mealsList = recipe.suitableMeals || [];
  const mealsText = mealsList.map(mealKey => {
    const info = MEAL_OCCASIONS[mealKey];
    return info ? `${info.label} ${info.emoji}` : mealKey;
  }).join(", ");
  document.getElementById("detailSuitableMeals").textContent = mealsText ? `Rekomenduojama: ${mealsText}` : "";

  // Set Servings Display
  document.getElementById("servingsDisplay").textContent = recipe.servings;

  // Render Ingredients, Steps, and Macros
  updateDetailsModalValues();

  openModal("recipeDetailsModal");
}

// Recalculates and redraws detailed modal values based on servings multiplier
function updateDetailsModalValues() {
  const recipe = state.recipes.find(r => r.id === state.currentRecipeId);
  if (!recipe) return;

  const mult = state.servingMultiplier;

  // Update Macros
  const kcal = recipe.macros ? Math.round(recipe.macros.calories * mult) : 0;
  const protein = recipe.macros ? Math.round(recipe.macros.protein * mult) : 0;
  const carbs = recipe.macros ? Math.round(recipe.macros.carbs * mult) : 0;
  const fat = recipe.macros ? Math.round(recipe.macros.fat * mult) : 0;
  const fiber = recipe.macros ? Math.round((recipe.macros.fiber || 0) * mult) : 0;

  document.getElementById("detailMacroKcal").textContent = kcal;
  document.getElementById("detailMacroProt").textContent = protein + "g";
  document.getElementById("detailMacroCarb").textContent = carbs + "g";
  document.getElementById("detailMacroFat").textContent = fat + "g";
  document.getElementById("detailMacroFib").textContent = fiber + "g";

  // Render Ingredients
  const ingredientsList = document.getElementById("detailIngredientsList");
  ingredientsList.innerHTML = "";

  recipe.ingredients.forEach((ing, index) => {
    const item = document.createElement("div");
    item.className = "ingredient-item";

    let amountHTML = "";
    if (ing.amount !== null && ing.amount !== undefined && !isNaN(ing.amount)) {
      // Float rounding helper
      const calculatedAmount = Math.round((ing.amount * mult) * 10) / 10;
      amountHTML = `<span class="ingredient-amount">${calculatedAmount}</span>`;
    }

    item.innerHTML = `
      <input type="checkbox" class="ingredient-checkbox" id="ing-${index}">
      <label for="ing-${index}" style="display: contents; cursor: pointer;">
        <span>${amountHTML} <span class="ingredient-name">${ing.unit ? ing.unit + ' ' : ''}${ing.name}</span></span>
      </label>
    `;

    ingredientsList.appendChild(item);
  });

  // Render Instructions Steps
  const instructionsList = document.getElementById("detailInstructionsList");
  instructionsList.innerHTML = "";

  recipe.instructions.forEach((step, index) => {
    const item = document.createElement("div");
    item.className = "instruction-step";
    item.id = `step-box-${index}`;

    item.innerHTML = `
      <span class="step-num">${index + 1}</span>
      <span class="step-text">${step}</span>
    `;

    item.addEventListener("click", () => {
      item.classList.toggle("checked");
    });

    instructionsList.appendChild(item);
  });
}

// Adjust servings count (+ / -)
function adjustMultiplier(direction) {
  const recipe = state.recipes.find(r => r.id === state.currentRecipeId);
  if (!recipe) return;

  const currentServings = parseInt(document.getElementById("servingsDisplay").textContent);
  let newServings = currentServings + direction;
  
  if (newServings < 1) newServings = 1;
  if (newServings > 20) newServings = 20;

  document.getElementById("servingsDisplay").textContent = newServings;
  
  // Adjust scale multiplier
  state.servingMultiplier = newServings / recipe.servings;
  updateDetailsModalValues();
}

// Delete Active Recipe
function deleteActiveRecipe() {
  if (!state.currentRecipeId) return;

  if (confirm("Ar tikrai norite ištrinti šį receptą?")) {
    state.recipes = state.recipes.filter(r => r.id !== state.currentRecipeId);
    saveRecipesToLocalStorage();
    renderRecipesGrid();
    closeModal("recipeDetailsModal");
  }
}

// Process recipes using Gemini 2.5 Flash API
async function processRecipeWithAI() {
  // Check key
  if (!state.apiKey || state.apiKey.trim() === "") {
    alert("Pirmiausia įveskite Gemini API raktą nustatymuose!");
    openModal("settingsModal");
    return;
  }

  const mode = document.getElementById("modeImageBtn").classList.contains("active") ? "image" : "text";

  // Gather input parameters
  let promptText = `
Esi profesionalus virtuvės šefas ir mitybos specialistas. Išanalizuok šią užklausą: tai gali būti recepto tekstas, jo ekrano nuotrauka (screenshot) arba jau pagaminto patiekalo nuotrauka.
Labai svarbu: VISAS atsakymas privalo būti lietuvių kalba.

Tavo užduotys:
1. Jei tai yra pagaminto patiekalo nuotrauka: atpažink, koks tai patiekalas, ir sukurk jam pilną, subalansuotą, maistingą receptą su visomis reikiamomis detalėmis.
2. Jei tai yra recepto tekstas arba ekrano nuotrauka su tekstu: nuskaityk tekstą ir tiksliai ištrauk jame esančią informaciją.

Privalai sugeneruoti tikslią JSON struktūrą pagal šį šabloną:
{
  "title": "Recepto Pavadinimas (pvz. Purūs avižiniai blynai)",
  "mealType": "salad" | "soup" | "chicken" | "pork" | "fish" | "curd" | "snack" | "dessert" | "other" (nustatyk patiekalo tipą arba pagrindinį ingredientą iš pateiktų parinkčių: salotos -> "salad", sriuba -> "soup", vištiena -> "chicken", kiauliena -> "pork", žuvis -> "fish", varškė -> "curd", užkandžiai -> "snack", saldūs patiekalai/kepiniai/desertai -> "dessert", o visiems kitiems patiekalams -> "other"),
  "suitableMeals": ["breakfast", "lunch", "dinner", "snack", "dessert"] (nurodyk rekomenduojamus valgymo laikus / progas, kada geriausia valgyti šį patiekalą iš šių parinkčių: pusryčiams -> "breakfast", pietums -> "lunch", vakarienei -> "dinner", užkandžiui -> "snack", desertui -> "dessert". Gali pasirinkti vieną ar kelis ir grąžinti kaip string masyvą. SVARBU: Vadovaukis šiomis taisyklėmis pagal makroelementus:
    - Patiekalai, kuriuose gausu angliavandenių ar cukraus (pvz. sušiai, makaronai, bulvės, saldūs blynai, košės su daug saldžių priedų), turėtų būti siūlomi Pietums ("lunch") arba Užkandžiui ("snack"), bet NE Vakarienei ("dinner").
    - Vakarienei ("dinner") siūlyk tik lengvus patiekalus: turinčius daug baltymų ir skaidulų, su nedideliu greitųjų angliavandenių kiekiu (pvz. salotos, sriubos, vištiena ar žuvis su daržovėmis).
    - Saldūs desertai ar pyragai turėtų būti siūlomi tik kaip "dessert" ir/arba "snack".),
  "prepTime": 15 (paruošimo laikas minutėmis kaip skaičius, jei nėra - spėk),
  "cookTime": 20 (gaminimo laikas minutėmis kaip skaičius, jei nėra - spėk),
  "servings": 2 (numatytasis porcijų skaičius kaip skaičius),
  "description": "Labai trumpas (1-2 sakinių) recepto aprašymas. Jei sugeneravai receptą iš patiekalo nuotraukos, trumpai paminėk, kad patiekalas atpažintas iš nuotraukos ir paaiškink, kodėl jis maistingas.",
  "ingredients": [
    {
      "name": "ingredientas (pvz. kiaušiniai arba miltai)",
      "amount": 2 (kiekis kaip skaičius arba nulis, jei tai tai tik pagal skonį),
      "unit": "vienetas (pvz. g, ml, vnt, valg. šaukšt., arbat. šaukštel., arba tuščias tekstas)"
    }
  ],
  "instructions": [
    "1 žingsnio aprašymas",
    "2 žingsnio aprašymas"
  ],
  "macros": {
    "calories": 420 (bendras kalorijų kiekis kcal VISOMS porcijoms bendrai kaip skaičius. Jei nurodyta vienai porcijai, padaugink iš porcijų skaičiaus),
    "protein": 24 (bendras baltymų kiekis gramais kaip skaičius visam receptui),
    "carbs": 35 (bendras angliavandenių kiekis gramais kaip skaičius visam receptui),
    "fat": 18 (bendras riebalų kiekis gramais kaip skaičius visam receptui),
    "fiber": 5 (bendras skaidulų kiekis gramais kaip skaičius visam receptui. Jei nėra nurodyta, įvertink/spėk pagal ingredientus)
  }
}

Nustatyk makroelementus pagal geriausius kulinarinius/nutritinius standartus, jei jie nėra tiesiogiai parašyti recepte. Apskaičiuok makroelementus VISAM nurodytam porcijų skaičiui bendrai, o ne vienai porcijai.

Grąžink tik ir TIKTAI validų JSON failą. Nenaudok jokių papildomų žodžių, komentarų ar markdown žymių prieš ar po JSON objekto.
`;

  const parts = [];

  if (mode === "image") {
    if (state.uploadingImages.length === 0) {
      alert("Prašome pasirinkti arba įkelti bent vieną nuotrauką.");
      return;
    }
    document.getElementById("aiLoaderSubtext").textContent = "Nuskaitomos nuotraukos ir analizuojamas patiekalas...";
    
    // Push prompt
    parts.push({ text: promptText });
    
    // Push all images
    state.uploadingImages.forEach(img => {
      parts.push({
        inlineData: {
          mimeType: img.mimeType,
          data: img.base64
        }
      });
    });
  } else {
    const textInput = document.getElementById("recipeTextInput").value.trim();
    if (!textInput) {
      alert("Prašome įklijuoti recepto tekstą arba nuorodą.");
      return;
    }
    document.getElementById("aiLoaderSubtext").textContent = "Skaitomas recepto tekstas ir skaičiuojami makroelementai...";
    
    promptText += `\nRecepto duomenys apdorojimui:\n${textInput}`;
    parts.push({ text: promptText });
  }

  // Switch to loader UI
  document.getElementById("addRecipeFormContent").style.display = "none";
  document.getElementById("aiLoader").classList.add("active");

  // We try a list of fallback models in case one of them is busy, rate limited or not found
  const modelsToTry = [
    "gemini-2.5-flash",
    "gemini-2.0-flash",
    "gemini-1.5-flash",
    "gemini-3.5-flash", // included as legacy fallback
    "gemini-2.5-pro",
    "gemini-1.5-pro"
  ];

  let lastError = null;
  let textResponse = null;

  for (const modelName of modelsToTry) {
    try {
      console.log(`Bandoma naudoti Gemini modelį: ${modelName}`);
      const loaderText = mode === "image" 
        ? "Nuskaitomos nuotraukos ir analizuojamas patiekalas..." 
        : "Skaitomas recepto tekstas ir skaičiuojami makroelementai...";
      document.getElementById("aiLoaderSubtext").innerHTML = `
        ${loaderText}<br>
        <span style="font-size: 0.8rem; opacity: 0.7; margin-top: 0.5rem; display: inline-block;">
          Bandomas modelis: <strong>${modelName}</strong>
        </span>
      `;

      const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${state.apiKey}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: parts
            }
          ],
          generationConfig: {
            responseMimeType: "application/json"
          }
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error?.message || `API klaida (${response.status})`);
      }

      const data = await response.json();
      textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (textResponse) {
        console.log(`Sėkmingai gautas atsakymas naudojant modelį: ${modelName}`);
        break; // Successfully got response, break out of loop
      } else {
        throw new Error("Gautas tuščias atsakymas iš modelio.");
      }
    } catch (err) {
      console.warn(`Modelis ${modelName} nepasiekiamas arba grąžino klaidą:`, err.message);
      lastError = err;
    }
  }

  try {
    if (!textResponse) {
      throw new Error(lastError ? lastError.message : "Visi bandyti Gemini modeliai šiuo metu nepasiekiami.");
    }

    // Clean up markdown block wrapping if Gemini didn't respect generationConfig
    textResponse = textResponse.replace(/```json/g, "").replace(/```/g, "").trim();

    const parsedRecipe = JSON.parse(textResponse);
    
    // Fill in standard ID and placeholder image if missing
    parsedRecipe.id = "recipe-" + Date.now();
    parsedRecipe.image = ""; // local representation uses fallback text/icons

    // Sanitize and ensure categories & occasions are set correctly
    const validCategories = ["salad", "soup", "chicken", "pork", "fish", "curd", "snack", "dessert", "other"];
    if (!parsedRecipe.mealType || !validCategories.includes(parsedRecipe.mealType)) {
      parsedRecipe.mealType = "other";
    }
    if (!parsedRecipe.suitableMeals || !Array.isArray(parsedRecipe.suitableMeals)) {
      parsedRecipe.suitableMeals = ["lunch", "dinner"];
    }

    // Add to recipes array
    state.recipes.unshift(parsedRecipe);
    saveRecipesToLocalStorage();
    
    // Re-render
    renderRecipesGrid();

    // Close Add modal
    closeModal("addRecipeModal");
    
    // Open the new recipe directly for detail preview
    openRecipeDetails(parsedRecipe.id);

  } catch (error) {
    console.error("AI processing error: ", error);
    alert("Klaida apdorojant receptą: " + error.message + "\n\nPasitikrinkite API raktą nustatymuose.");
    
    // Revert loader UI
    document.getElementById("addRecipeFormContent").style.display = "block";
    document.getElementById("aiLoader").classList.remove("active");
  }
}

// Backup Functions: Export
function exportRecipesJSON() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state.recipes, null, 2));
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `maisto-kodas-${new Date().toISOString().slice(0,10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

// Backup Functions: Import
function importRecipesJSON(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const imported = JSON.parse(e.target.result);
      if (Array.isArray(imported)) {
        if (confirm(`Rasta ${imported.length} receptų. Ar norite juos pridėti prie esamų? (Atšaukus - esami receptai bus ištrinti ir pakeisti naujais)`)) {
          // Append
          state.recipes = [...state.recipes, ...imported];
        } else {
          // Overwrite
          state.recipes = imported;
        }

        // Migrate imported recipes to new categories and occasions
        migrateToNewCategories();

        // Migrate imported recipes to include fiber if missing
        state.recipes.forEach(recipe => {
          if (!recipe.macros) {
            recipe.macros = { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 };
          } else if (recipe.macros.fiber === undefined) {
            recipe.macros.fiber = estimateRecipeFiber(recipe);
          }
        });

        saveRecipesToLocalStorage();
        renderRecipesGrid();
        alert("Receptai sėkmingai importuoti!");
        closeModal("settingsModal");
      } else {
        alert("Neteisingas JSON formatas. Failas turi būti receptų sąrašas (masyvas).");
      }
    } catch (err) {
      alert("Klaida nuskaitant failą: " + err.message);
    }
  };
  reader.readAsText(file);
}

// Estimuoti skaidulas esamiems ar importuotiems receptams, kuriuose nėra šio lauko
function estimateRecipeFiber(recipe) {
  if (!recipe.ingredients || !Array.isArray(recipe.ingredients)) {
    return 0;
  }

  let totalFiber = 0;

  // Žodynas su lietuviškais ingredientų raktiniais žodžiais ir apytiksliu skaidulų kiekiu
  const fiberKeywords = [
    { keys: ["avokad"], fiberPerUnit: 6, fiberPerGram: 0.06 },
    { keys: ["brokol"], fiberPerUnit: 5, fiberPerGram: 0.026 },
    { keys: ["duon", "baton"], fiberPerUnit: 2, fiberPerGram: 0.04 },
    { keys: ["aviž", "aviz"], fiberPerUnit: 8, fiberPerGram: 0.10 },
    { keys: ["ryž", "ryz"], fiberPerUnit: 2, fiberPerGram: 0.015 },
    { keys: ["griki", "grik"], fiberPerUnit: 3, fiberPerGram: 0.06 },
    { keys: ["obuol"], fiberPerUnit: 2.5, fiberPerGram: 0.024 },
    { keys: ["mork"], fiberPerUnit: 2, fiberPerGram: 0.028 },
    { keys: ["pomidor"], fiberPerUnit: 1, fiberPerGram: 0.012 },
    { keys: ["agurk"], fiberPerUnit: 0.5, fiberPerGram: 0.005 },
    { keys: ["salot", "špinat", "spinat", "krap", "petraž"], fiberPerUnit: 0.5, fiberPerGram: 0.02 },
    { keys: ["pupel", "lęš", "les", "žirn", "zirn", "avinžirn"], fiberPerUnit: 10, fiberPerGram: 0.07 },
    { keys: ["riešut", "riesut", "migdol", "lazdyn", "rieš", "ries"], fiberPerUnit: 3, fiberPerGram: 0.07 },
    { keys: ["sėkl", "sekl", "chia", "linų", "linu", "sezam"], fiberPerUnit: 2, fiberPerGram: 0.15 },
    { keys: ["uog", "brašk", "brask", "šilauo", "silauo", "aviet", "vyšn", "vysn"], fiberPerUnit: 2, fiberPerGram: 0.03 },
    { keys: ["banan"], fiberPerUnit: 3, fiberPerGram: 0.026 },
    { keys: ["kruop", "miltai", "makaron"], fiberPerUnit: 4, fiberPerGram: 0.03 }
  ];

  recipe.ingredients.forEach(ing => {
    if (!ing.name) return;
    const nameLower = ing.name.toLowerCase();
    const amount = ing.amount || 0;
    const unitLower = ing.unit ? ing.unit.toLowerCase() : "";

    const match = fiberKeywords.find(item => 
      item.keys.some(key => nameLower.includes(key))
    );

    if (match) {
      if (amount > 0) {
        if (unitLower.includes("g") && !unitLower.includes("valg") && !unitLower.includes("arbat")) {
          totalFiber += amount * match.fiberPerGram;
        } else if (unitLower.includes("vnt") || unitLower.includes("riek") || unitLower.includes("galv") || unitLower.includes("sauja")) {
          totalFiber += amount * match.fiberPerUnit;
        } else {
          totalFiber += amount * (match.fiberPerUnit * 0.25);
        }
      }
    }
  });

  return Math.round(totalFiber);
}

// Edit Mode state and functions
let editIngredients = [];
let editInstructions = [];

function enterEditMode() {
  const recipe = state.recipes.find(r => r.id === state.currentRecipeId);
  if (!recipe) return;

  // Swap panels
  document.getElementById("detailsViewNormal").style.display = "none";
  document.getElementById("detailsViewEdit").style.display = "block";

  // Prepopulate basic inputs
  document.getElementById("detailEditTitle").value = recipe.title || "";
  document.getElementById("detailEditMealType").value = recipe.mealType || "other";
  document.getElementById("detailEditPrepTime").value = recipe.prepTime !== undefined ? recipe.prepTime : 0;
  document.getElementById("detailEditCookTime").value = recipe.cookTime !== undefined ? recipe.cookTime : 0;
  document.getElementById("detailEditDescription").value = recipe.description || "";
  document.getElementById("detailEditServings").value = recipe.servings !== undefined ? recipe.servings : 2;

  // Prepopulate checkboxes for suitableMeals
  const suitable = recipe.suitableMeals || [];
  document.getElementById("editMealBreakfast").checked = suitable.includes("breakfast");
  document.getElementById("editMealLunch").checked = suitable.includes("lunch");
  document.getElementById("editMealDinner").checked = suitable.includes("dinner");
  document.getElementById("editMealSnack").checked = suitable.includes("snack");
  document.getElementById("editMealDessert").checked = suitable.includes("dessert");

  // Prepopulate macros
  document.getElementById("detailEditMacroKcal").value = recipe.macros ? (recipe.macros.calories || 0) : 0;
  document.getElementById("detailEditMacroProt").value = recipe.macros ? (recipe.macros.protein || 0) : 0;
  document.getElementById("detailEditMacroCarb").value = recipe.macros ? (recipe.macros.carbs || 0) : 0;
  document.getElementById("detailEditMacroFat").value = recipe.macros ? (recipe.macros.fat || 0) : 0;
  document.getElementById("detailEditMacroFib").value = recipe.macros ? (recipe.macros.fiber || 0) : 0;

  // Deep copy ingredients and instructions to edit state arrays
  editIngredients = recipe.ingredients ? recipe.ingredients.map(ing => ({ ...ing })) : [];
  editInstructions = recipe.instructions ? [...recipe.instructions] : [];

  // Render editable lists
  renderEditIngredientsList();
  renderEditInstructionsList();
}

function exitEditMode() {
  // Swap panels
  document.getElementById("detailsViewNormal").style.display = "block";
  document.getElementById("detailsViewEdit").style.display = "none";
}

function renderEditIngredientsList() {
  const container = document.getElementById("editIngredientsList");
  container.innerHTML = "";

  editIngredients.forEach((ing, index) => {
    const row = document.createElement("div");
    row.className = "ingredient-edit-row";

    row.innerHTML = `
      <input type="text" class="form-input" placeholder="Ingredientas" value="${ing.name || ""}" data-index="${index}" data-prop="name">
      <input type="number" step="any" class="form-input" placeholder="Kiekis" value="${ing.amount !== null && ing.amount !== undefined ? ing.amount : ""}" data-index="${index}" data-prop="amount">
      <input type="text" class="form-input" placeholder="Vienetas" value="${ing.unit || ""}" data-index="${index}" data-prop="unit">
      <button type="button" class="btn-delete-row" title="Pašalinti">&times;</button>
    `;

    // Listeners to update editIngredients array on input
    row.querySelectorAll("input").forEach(input => {
      input.addEventListener("input", (e) => {
        const idx = parseInt(e.target.getAttribute("data-index"));
        const prop = e.target.getAttribute("data-prop");
        let val = e.target.value;
        if (prop === "amount") {
          val = val === "" ? null : parseFloat(val);
        }
        editIngredients[idx][prop] = val;
      });
    });

    row.querySelector(".btn-delete-row").addEventListener("click", () => {
      editIngredients.splice(index, 1);
      renderEditIngredientsList();
    });

    container.appendChild(row);
  });
}

function addEditIngredientRow() {
  editIngredients.push({ name: "", amount: null, unit: "" });
  renderEditIngredientsList();
}

function renderEditInstructionsList() {
  const container = document.getElementById("editInstructionsList");
  container.innerHTML = "";

  editInstructions.forEach((step, index) => {
    const row = document.createElement("div");
    row.className = "instruction-edit-row";

    row.innerHTML = `
      <span class="step-num" style="align-self: center;">${index + 1}</span>
      <textarea class="form-input" rows="2" placeholder="Žingsnio aprašymas..." data-index="${index}">${step || ""}</textarea>
      <button type="button" class="btn-delete-row" title="Pašalinti" style="padding: 0.85rem !important;">&times;</button>
    `;

    // Listener to update editInstructions array on input
    row.querySelector("textarea").addEventListener("input", (e) => {
      const idx = parseInt(e.target.getAttribute("data-index"));
      editInstructions[idx] = e.target.value;
    });

    row.querySelector(".btn-delete-row").addEventListener("click", () => {
      editInstructions.splice(index, 1);
      renderEditInstructionsList();
    });

    container.appendChild(row);
  });
}

function addEditStepRow() {
  editInstructions.push("");
  renderEditInstructionsList();
}


function saveRecipeEdits() {
  const recipeIndex = state.recipes.findIndex(r => r.id === state.currentRecipeId);
  if (recipeIndex === -1) return;

  const title = document.getElementById("detailEditTitle").value.trim();
  if (!title) {
    alert("Prašome įvesti recepto pavadinimą!");
    return;
  }

  const mealType = document.getElementById("detailEditMealType").value;
  const prepTime = parseInt(document.getElementById("detailEditPrepTime").value) || 0;
  const cookTime = parseInt(document.getElementById("detailEditCookTime").value) || 0;
  const description = document.getElementById("detailEditDescription").value.trim();
  const servings = parseInt(document.getElementById("detailEditServings").value) || 2;

  // Read recommended meal checkboxes
  const suitableMeals = [];
  if (document.getElementById("editMealBreakfast").checked) suitableMeals.push("breakfast");
  if (document.getElementById("editMealLunch").checked) suitableMeals.push("lunch");
  if (document.getElementById("editMealDinner").checked) suitableMeals.push("dinner");
  if (document.getElementById("editMealSnack").checked) suitableMeals.push("snack");
  if (document.getElementById("editMealDessert").checked) suitableMeals.push("dessert");

  // Read macros
  const calories = parseInt(document.getElementById("detailEditMacroKcal").value) || 0;
  const protein = parseInt(document.getElementById("detailEditMacroProt").value) || 0;
  const carbs = parseInt(document.getElementById("detailEditMacroCarb").value) || 0;
  const fat = parseInt(document.getElementById("detailEditMacroFat").value) || 0;
  const fiber = parseInt(document.getElementById("detailEditMacroFib").value) || 0;

  // Filter out completely empty ingredients
  const finalIngredients = editIngredients.filter(ing => ing.name.trim() !== "");

  // Filter out empty steps
  const finalInstructions = editInstructions.filter(step => step.trim() !== "");

  // Update recipe object in state
  const updatedRecipe = {
    ...state.recipes[recipeIndex],
    title,
    mealType,
    prepTime,
    cookTime,
    description,
    servings,
    suitableMeals,
    ingredients: finalIngredients,
    instructions: finalInstructions,
    macros: {
      calories,
      protein,
      carbs,
      fat,
      fiber
    }
  };

  state.recipes[recipeIndex] = updatedRecipe;
  saveRecipesToLocalStorage();

  // Refresh home page grid
  renderRecipesGrid();

  // Update banner and metadata inside modal
  const detailMealTag = document.getElementById("detailMealTag");
  const categoryInfo = CATEGORY_MAP[mealType] || CATEGORY_MAP.other;
  detailMealTag.className = `recipe-card-tag tag-${mealType}`;
  detailMealTag.textContent = categoryInfo.label;

  document.getElementById("detailTitle").textContent = title;
  document.getElementById("detailPrepTime").innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
    Paruošimas: ${prepTime} min
  `;
  document.getElementById("detailCookTime").innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
    Gaminimas: ${cookTime} min
  `;
  document.getElementById("detailDescription").textContent = description;
  document.getElementById("servingsDisplay").textContent = servings;

  // Reset serving multiplier and update dynamic details modal values
  state.servingMultiplier = 1.0;
  updateDetailsModalValues();

  // Exit edit mode panel view
  exitEditMode();
}

// Restructuring database migration function
function migrateToNewCategories() {
  let migrated = false;
  state.recipes.forEach(recipe => {
    // 1. Ensure suitableMeals exists
    if (!recipe.suitableMeals || !Array.isArray(recipe.suitableMeals)) {
      recipe.suitableMeals = [];
      const oldType = recipe.mealType;
      if (oldType === "breakfast" || oldType === "lunch" || oldType === "dinner" || oldType === "snack" || oldType === "dessert") {
        recipe.suitableMeals.push(oldType);
      } else if (oldType === "salad" || oldType === "soup") {
        recipe.suitableMeals.push("lunch", "dinner");
      } else {
        recipe.suitableMeals.push("lunch", "dinner");
      }
      migrated = true;
    }

    // 2. Map old categories to new category set
    const validCategories = ["salad", "soup", "chicken", "pork", "fish", "curd", "snack", "dessert", "other"];
    if (!validCategories.includes(recipe.mealType)) {
      const textToScan = ((recipe.title || "") + " " + 
        (recipe.description || "") + " " + 
        (recipe.ingredients ? recipe.ingredients.map(i => i.name).join(" ") : "")
      ).toLowerCase();

      let newType = "other";

      if (textToScan.includes("višt") || textToScan.includes("vist") || textToScan.includes("kalakut") || textToScan.includes("paukšt")) {
        newType = "chicken";
      } else if (textToScan.includes("kiaul") || textToScan.includes("šoninė") || textToScan.includes("sonine") || textToScan.includes("kump")) {
        newType = "pork";
      } else if (textToScan.includes("žuv") || textToScan.includes("zuv") || textToScan.includes("lašiš") || textToScan.includes("lasis") || textToScan.includes("kreve") || textToScan.includes("tuna") || textToScan.includes("menk") || textToScan.includes("lydek")) {
        newType = "fish";
      } else if (textToScan.includes("varšk") || textToScan.includes("varsk") || textToScan.includes("sūr") || textToScan.includes("sur") || textToScan.includes("jogurt") || textToScan.includes("grietin")) {
        if (textToScan.includes("varšk") || textToScan.includes("varsk")) {
          newType = "curd";
        }
      } else if (textToScan.includes("salot")) {
        newType = "salad";
      } else if (textToScan.includes("sriub")) {
        newType = "soup";
      } else if (textToScan.includes("desert") || textToScan.includes("pyrag") || textToScan.includes("sausain") || textToScan.includes("tort") || textToScan.includes("saldėsi") || textToScan.includes("saldesi") || textToScan.includes("keksiuk")) {
        newType = "dessert";
      }

      if (newType === "other") {
        const oldType = recipe.mealType;
        if (oldType === "salad") {
          newType = "salad";
        } else if (oldType === "soup") {
          newType = "soup";
        } else if (oldType === "snack") {
          newType = "snack";
        } else if (oldType === "dessert") {
          newType = "dessert";
        } else if (oldType === "breakfast") {
          if (textToScan.includes("varšk") || textToScan.includes("varsk")) {
            newType = "curd";
          } else {
            newType = "snack";
          }
        }
      }

      recipe.mealType = newType;
      migrated = true;
    }
  });

  if (migrated) {
    saveRecipesToLocalStorage();
  }
}

// Launch app on load
window.addEventListener("DOMContentLoaded", initApp);
