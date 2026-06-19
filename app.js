// Maisto Kodas - Recipe Planner Application Script

// Mock Initial Recipes Data (in Lithuanian)
const mockRecipes = [
  {
    id: "mock-1",
    title: "Avokado ir Kepto Kiaušinio Skrebutis",
    mealType: "breakfast",
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
      fat: 26
    },
    image: "" // Empty or placeholder CSS based image
  },
  {
    id: "mock-2",
    title: "Lašiša su Terijaki ir Garintais Brokoliais",
    mealType: "lunch",
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
      "Į lėkštes dėkite ryžius, šalia išdėliokite brokolius bei lašišą. Užpilkite likusiu keptuvėje teriyaki padažu ir apibarstykite sezamo sėklomis."
    ],
    macros: {
      calories: 590,
      protein: 38,
      carbs: 48,
      fat: 24
    },
    image: ""
  },
  {
    id: "mock-3",
    title: "Viduržemio Jūros Vištienos Salotos",
    mealType: "dinner",
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
      fat: 28
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
  uploadingImages: [], // Array of { id: number, base64: string, mimeType: string }
  selectedModel: "gemini-3.5-flash"
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

  // Load API Key & Selected Model
  state.apiKey = localStorage.getItem("gemini_api_key") || "";
  document.getElementById("apiKeyInput").value = state.apiKey;
  toggleApiKeyAlert();

  state.selectedModel = localStorage.getItem("maistokodas_model") || "gemini-3.5-flash";
  document.getElementById("modelSelect").value = state.selectedModel;

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

  // Setup Event Listeners
  setupEventListeners();

  // Render Grid
  renderRecipesGrid();
}

// Save to LocalStorage
function saveRecipesToLocalStorage() {
  localStorage.setItem("maistokodas_recipes", JSON.stringify(state.recipes));
}

// Show/Hide API Key alert banner
function toggleApiKeyAlert() {
  const alertBanner = document.getElementById("apiKeyAlert");
  if (state.apiKey && state.apiKey.trim() !== "") {
    alertBanner.style.display = "none";
  } else {
    alertBanner.style.display = "flex";
  }
}

// Event Listeners Configuration
function setupEventListeners() {
  // Modals Open/Close
  document.getElementById("openSettingsBtn").addEventListener("click", () => openModal("settingsModal"));
  document.getElementById("closeSettingsModal").addEventListener("click", () => closeModal("settingsModal"));
  document.getElementById("setupApiKeyBtn").addEventListener("click", () => openModal("settingsModal"));
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
  
  const model = document.getElementById("modelSelect").value;
  state.selectedModel = model;
  localStorage.setItem("maistokodas_model", model);
  
  toggleApiKeyAlert();
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
    
    // Pick appropriate icon based on mealType
    let mealIcon = "🍳";
    let mealLabel = "Valgis";
    if (recipe.mealType === "breakfast") { mealIcon = "🥞"; mealLabel = "Pusryčiai"; }
    else if (recipe.mealType === "lunch") { mealIcon = "🍲"; mealLabel = "Pietūs"; }
    else if (recipe.mealType === "dinner") { mealIcon = "🥩"; mealLabel = "Vakarienė"; }
    else if (recipe.mealType === "snack") { mealIcon = "🍎"; mealLabel = "Užkandis"; }

    const kcal = recipe.macros ? recipe.macros.calories : 0;
    const protein = recipe.macros ? recipe.macros.protein : 0;
    const carbs = recipe.macros ? recipe.macros.carbs : 0;
    const fat = recipe.macros ? recipe.macros.fat : 0;

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
  const detailMealTag = document.getElementById("detailMealTag");
  detailMealTag.className = `recipe-card-tag tag-${recipe.mealType}`;
  
  let mealLabel = "Valgis";
  if (recipe.mealType === "breakfast") mealLabel = "Pusryčiai";
  else if (recipe.mealType === "lunch") mealLabel = "Pietūs";
  else if (recipe.mealType === "dinner") mealLabel = "Vakarienė";
  else if (recipe.mealType === "snack") mealLabel = "Užkandis";
  detailMealTag.textContent = mealLabel;

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

  document.getElementById("detailMacroKcal").textContent = kcal;
  document.getElementById("detailMacroProt").textContent = protein + "g";
  document.getElementById("detailMacroCarb").textContent = carbs + "g";
  document.getElementById("detailMacroFat").textContent = fat + "g";

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
Esi profesionalus virtuvės šefas ir mitybos specialistas. Išanalizuok šį receptą (tekstą arba ekrano nuotrauką) ir ištrauk iš jo pilną informaciją. 
Labai svarbu: VISAS atsakymas privalo būti lietuvių kalba.

Privalai sugeneruoti tikslią JSON struktūrą pagal šį šabloną:
{
  "title": "Recepto Pavadinimas (pvz. Purūs avižiniai blynai)",
  "mealType": "breakfast" | "lunch" | "dinner" | "snack" (nustatyk pagal receptą, kuriam valgymui labiausiai tinka),
  "prepTime": 15 (paruošimo laikas minutėmis kaip skaičius, jei nėra - spėk),
  "cookTime": 20 (gaminimo laikas minutėmis kaip skaičius, jei nėra - spėk),
  "servings": 2 (numatytasis porcijų skaičius kaip skaičius),
  "description": "Labai trumpas (1-2 sakinių) recepto aprašymas ir paaiškinimas, kodėl jis maistingas arba tinka šiam dienos valgymui.",
  "ingredients": [
    {
      "name": "ingredientas (pvz. kiaušiniai arba miltai)",
      "amount": 2 (kiekis kaip skaičius arba nulis, jei tai tik pagal skonį),
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
    "fat": 18 (bendras riebalų kiekis gramais kaip skaičius visam receptui)
  }
}

Nustatyk makroelementus pagal geriausius kulinarinius/nutritinius standartus, jei jie nėra tiesiogiai parašyti recepte. Apskaičiuok makroelementus VISAM nurodytam porcijų skaičiui bendrai, o ne vienai porcijai.

Grąžink tik ir TIKTAI validų JSON failą. Nenaudok jokių papildomų žodžių, komentarų ar markdown žymių prieš ar po JSON objekto.
`;

  const parts = [];

  if (mode === "image") {
    if (state.uploadingImages.length === 0) {
      alert("Prašome pasirinkti arba įvilkti bent vieną ekrano nuotrauką.");
      return;
    }
    document.getElementById("aiLoaderSubtext").textContent = "Nuskaitomi paveikslėliai ir analizuojama recepto sudėtis...";
    
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

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${state.selectedModel}:generateContent?key=${state.apiKey}`;
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
      const errData = await response.json();
      throw new Error(errData.error?.message || "Nepavyko prisijungti prie Gemini API.");
    }

    const data = await response.json();
    let textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!textResponse) {
      throw new Error("Nepavyko gauti atsakymo iš AI modelio. Patikrinkite API raktą.");
    }

    // Clean up markdown block wrapping if Gemini didn't respect generationConfig
    textResponse = textResponse.replace(/```json/g, "").replace(/```/g, "").trim();

    const parsedRecipe = JSON.parse(textResponse);
    
    // Fill in standard ID and placeholder image if missing
    parsedRecipe.id = "recipe-" + Date.now();
    parsedRecipe.image = ""; // local representation uses fallback text/icons

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

// Launch app on load
window.addEventListener("DOMContentLoaded", initApp);
