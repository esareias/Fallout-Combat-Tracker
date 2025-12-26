// 1. Put this at the VERY top of your script.js file
const combatChannel = new BroadcastChannel('wasteland_sync');

// Firebase configuration - ADD YOUR CONFIG HERE
const firebaseConfig = {
  apiKey: "AIzaSyCCteaarXhk5VgW5o_WbNsbUXh1jMg1k6c",
  authDomain: "big-apple-wasteland.firebaseapp.com",
  databaseURL: "https://big-apple-wasteland-default-rtdb.firebaseio.com/",
  projectId: "big-apple-wasteland",
  storageBucket: "big-apple-wasteland.firebasestorage.app",
  messagingSenderId: "1037976504390",
  appId: "1:1037976504390:web:21576647ee3bdba6a76247"
};

// Initialize Firebase
let database = null;
try {
  firebase.initializeApp(firebaseConfig);
  database = firebase.database();
  console.log("Firebase connected!");
} catch (error) {
  console.log("Firebase not configured:", error);
}

// Function to sync data to Firebase
function syncToFirebase() {
  if (database) {
    // Clean up undefined values - Firebase hates them
    const cleanEnemies = window.currentEnemies.map(e => {
      const clean = {};
      for (const [key, value] of Object.entries(e)) {
        clean[key] = value === undefined ? null : value;
      }
      return clean;
    });
    
    database.ref('combat').set({
      enemies: cleanEnemies,
      turnIndex: turnIndex,
      timestamp: Date.now()
    });
  }
}

// --- GLOBAL STATE ---
window.currentEnemies = [];
let turnIndex = 0;

// --- ASSETS & CONFIGURATION ---

// 1. SPECIFIC VISUAL ASSETS (Updated with Specific Links)
const VISUAL_ASSETS = {
  // Ghouls
  "Feral Ghoul": "https://upload.wikimedia.org/wikipedia/en/8/86/FeralGhoul.png",
  "Feral Ghoul Roamer": "https://images.fallout.wiki/6/6c/Ghoul_Roamer.png",
  "Glowing One": "https://images.fallout.wiki/d/d8/Glowing_One_Render.png",
  "Reaver": "https://static.wikia.nocookie.net/fallout/images/d/d9/Feral_ghoul_reaver.png",
  "Chinese Remnant": "https://static.wikia.nocookie.net/fallout/images/d/d5/Mama_Dolce%27s_Chinese_remnants_captain.png",
  "Trog": "https://static.wikia.nocookie.net/fallout/images/5/5e/Trog.png",
  "Alien": "https://static.wikia.nocookie.net/aliens/images/e/ee/Alien-Fallout.png",
  
  // Super Mutants
  "Super Mutant": "https://static.wikia.nocookie.net/fallout/images/4/48/FNV_super_mutant.png",
  "Super Mutant Brute": "https://static.wikia.nocookie.net/fallout/images/8/8f/FO3_super_mutant_brute.png",
  "Super Mutant Master": "https://static.wikia.nocookie.net/fallout/images/9/92/FNV_Jacobstown_Master.png",
  "Behemoth": "https://images.fallout.wiki/8/86/FO3_super_mutant_behemoth.png",
  "Nightkin": "https://images.fallout.wiki/b/ba/FNV_Nightkin_Render.png",
  
  // Raiders
  "Raider": "https://static.wikia.nocookie.net/fallout/images/b/bd/Raider_Throwdown_Armor.png",
  "Cannibal": "https://i.postimg.cc/V5yp54Bb/unnamed-removebg-preview-(4).png",
  "Slaver": "https://i.postimg.cc/1z12yW5h/Untitled-design-2-removebg-preview.png",
  "Heretic": "https://i.postimg.cc/524ffNPn/image-2025-12-03-220137473-removebg-preview.png",
  "Blightfire Fuse": "https://i.postimg.cc/HL0nBPP6/image-2025-12-03-215705349-removebg-preview.png",
  "Blightfire Decanus": "https://i.postimg.cc/1zsYNfkL/unnamed-removebg-preview-(3).png",
  "Blightfire Pyro": "https://i.postimg.cc/rFbkWCgz/unnamed-removebg-preview-(2).png",
  
  // Military
  "NCR Remnant": "https://vignette.wikia.nocookie.net/fallout/images/7/75/NCR_trooper.png",
  "NCR Ranger Exile": "https://static.wikia.nocookie.net/fallout_gamepedia/images/2/2d/NCRRiotControl.png",
  "Headhunter": "https://static.wikia.nocookie.net/fallout/images/e/e9/Merc_cruiser_outfit.png",
  "Wolfe Merc": "https://static.wikia.nocookie.net/fallout/images/4/46/Fo3_Talon_Merc.png",
  "Scout Trooper": "https://vignette2.wikia.nocookie.net/fallout/images/d/dd/LegionaryScout.png",
  "Big Apple Ranger": "https://static.wikia.nocookie.net/fallout/images/c/c1/Ranger_red_scarf_outfit.png",
  "Hitman": "https://static.wikia.nocookie.net/fallout/images/2/2d/General_Olivers_uniform.png",
  "Slag": "https://static.wikia.nocookie.net/fallout/images/8/8c/Scrapper.png",
  
  // Power Armor
  "BoS Squad": "https://www.nicepng.com/png/full/319-3191402_draw-a-brotherhood-of-steel-paladin-in-power.png",
  "Enclave Remnant": "https://5efallout.wdfiles.com/local--files/5efallout:bestiary:enclave/Enclave.png",
  
  // Robots
  "Protectron": "https://static.wikia.nocookie.net/fallout/images/5/5b/Protectron.png",
  "Protect-O-Bot": "https://i.postimg.cc/DfJgYv57/Protect0Bot-removebg-preview.png",
  "Securitron Mk I": "https://static.wikia.nocookie.net/fallout/images/7/7e/Securitron.png",
  "Oculobot": "https://images.fallout.wiki/3/3e/Fo3_Enclave_eyebot.png",
  "Mr Handy": "https://static.wikia.nocookie.net/fallout/images/8/8c/Mister_Handy.png",
  "Mr Gutsy": "https://static.wikia.nocookie.net/fallout/images/6/69/Mister_Gutsy.png",
  "Sentry Bot": "https://static.wikia.nocookie.net/fallout/images/8/8d/Military_sentry_bot.png",
  "Roboscorpion": "https://static.wikia.nocookie.net/fallout/images/e/e5/Robo-scorpion.png",
  "Turret": "https://static.wikia.nocookie.net/fallout/images/0/0b/Fo3_automated_turret.png",
  "Securitron Mk II": "https://images.fallout.wiki/5/5e/FNV_M235_Missile_Launchers.png",
  
  // Insects
  "Radroach": "https://static.wikia.nocookie.net/fallout/images/8/86/Radroach.png",
  "Bloatfly": "https://static.wikia.nocookie.net/fallout/images/9/9d/Bloatfly.png",
  "Giant Ant": "https://static.wikia.nocookie.net/fallout/images/d/d7/Giant_soldier_ant.png",
  "Fire Ant": "https://static.wikia.nocookie.net/fallout/images/0/05/Fire_ant.png",
  "Giant Mantid": "https://static.wikia.nocookie.net/fallout/images/e/eb/Giant_mantis.png",
  "Cazador": "https://static.wikia.nocookie.net/fallout/images/e/e4/Cazador.png",
  "Scythewing": "https://i.postimg.cc/43j7S9X0/unnamed-removebg-preview-(1).png",
  
  // Wildlife/Other
  "Deathclaw": "https://static.wikia.nocookie.net/fallout/images/9/9c/Deathclaw.png",
  "Mole Rat": "https://static.wikia.nocookie.net/fallout/images/3/3c/Mole_rat_FO3.png",
  "Pig Rat": "https://images.fallout.wiki/c/cc/PigRat.webp",
  "Vicious Dog": "https://images.fallout.wiki/6/6b/Vicious_dog.png",
  "Radscorpion": "https://static.wikia.nocookie.net/fallout/images/6/66/Radscorpion.png",
  "Mirelurk": "https://static.wikia.nocookie.net/fallout/images/0/06/Mirelurk.png",
  "Moray Eel": "https://static.wikia.nocookie.net/fallout/images/7/7e/Fish_purple_radpole.webp",
  "Centaur": "https://static.wikia.nocookie.net/fallout/images/9/92/CentaurEvolved.png",
  "Yao Guai": "https://static.wikia.nocookie.net/fallout/images/2/2e/Yao_guai.png",
  "Guai Wu": "https://i.postimg.cc/6pSggjnX/unnamed-removebg-preview.png",
  "Nightstalker": "https://static.wikia.nocookie.net/fallout/images/9/91/Nightstalker.png",
  "Spore Carrier": "https://static.wikia.nocookie.net/fallout/images/a/af/Spore_carrier.png",
  "Spore Plant": "https://static.wikia.nocookie.net/fallout/images/c/c7/Spore_plant.png",
  "Tunneler": "https://static.wikia.nocookie.net/fallout/images/4/4c/Tunneler.png",
  "Gecko": "https://static.wikia.nocookie.net/fallout/images/c/ce/FNV_LGecko.png",
  "Golden Gecko": "https://static.wikia.nocookie.net/fallout/images/7/74/FNV_GGecko.png",
  "Fire Gecko": "https://static.wikia.nocookie.net/fallout/images/1/15/GreenGeckoFNV.png",
  "Brahmin": "https://static.wikia.nocookie.net/fallout/images/2/2f/Brahmin_FO3.png"
};

// 2. VISUAL MAPPING LOGIC (Simplified)
function getVisualAsset(enemyName) {
    // Return specific image if it exists, otherwise null
    return VISUAL_ASSETS[enemyName] || null;
}

// 3. ENEMY STATS DATABASE
const BESTIARY = {
  // Humans & Raiders (Typical base: 2 APR)
  "Blightfire Fuse": { "hp": 30, "dr": 1, "per": 5, "apr": 2, "dice_count": 4, "target_dmg": 4, "atk": "(Dynamite/Pistol)", "loot_type": "human" },
  "Blightfire Decanus": { "hp": 65, "dr": 3, "per": 6, "apr": 2, "dice_count": 6, "target_dmg": 6, "atk": "(Machete/Repeater)", "loot_type": "human" },
  "Blightfire Pyro": { "hp": 50, "dr": 2, "per": 5, "apr": 2, "dice_count": 5, "target_dmg": 5, "atk": "(Flamer)", "loot_type": "human" },
  "NCR Remnant": { "hp": 40, "dr": 2, "per": 6, "apr": 2, "dice_count": 5, "target_dmg": 5, "atk": "(Service Rifle)", "loot_type": "human" },
  "NCR Ranger Exile": { "hp": 85, "dr": 4, "per": 8, "apr": 3, "dice_count": 8, "target_dmg": 8, "atk": "(Big Iron)", "loot_type": "human" },
  "Raider": { "hp": 25, "dr": 1, "per": 5, "apr": 2, "dice_count": 3, "target_dmg": 3, "atk": "(Pipe Wep)", "loot_type": "human" },
  "Cannibal": { "hp": 30, "dr": 1, "per": 5, "apr": 2, "dice_count": 4, "target_dmg": 4, "atk": "(Melee)", "loot_type": "human" },
  "Slaver": { "hp": 40, "dr": 2, "per": 5, "apr": 2, "dice_count": 4, "target_dmg": 4, "atk": "(Gun/Whip)", "loot_type": "human" },
  "Headhunter": { "hp": 70, "dr": 4, "per": 6, "apr": 2, "dice_count": 6, "target_dmg": 6, "atk": "(High Tech)", "loot_type": "human" },
  "Wolfe Merc": { "hp": 60, "dr": 3, "per": 6, "apr": 2, "dice_count": 6, "target_dmg": 6, "atk": "(Combat Rifle)", "loot_type": "human" },
  "Scout Trooper": { "hp": 50, "dr": 2, "per": 6, "apr": 3, "dice_count": 5, "target_dmg": 5, "atk": "(Rifle)", "loot_type": "human" },
  "Big Apple Ranger": { "hp": 55, "dr": 3, "per": 6, "apr": 3, "dice_count": 6, "target_dmg": 6, "atk": "(Urban Combat)", "loot_type": "human" },
  "BoS Squad": { "hp": 90, "dr": 5, "per": 7, "apr": 3, "dice_count": 7, "target_dmg": 7, "atk": "(Energy Wep)", "loot_type": "human_pa" },
  "Enclave Remnant": { "hp": 85, "dr": 5, "per": 7, "apr": 3, "dice_count": 7, "target_dmg": 7, "atk": "(Plasma)", "loot_type": "human_pa" },
  "Hitman": { "hp": 65, "dr": 3, "per": 8, "apr": 4, "dice_count": 7, "target_dmg": 7, "atk": "(Sniper)", "loot_type": "human" },
  "Heretic": { "hp": 45, "dr": 2, "per": 5, "apr": 2, "dice_count": 5, "target_dmg": 5, "atk": "(Gang Wep)", "loot_type": "human" },

  // Ghouls (Erratic movement: 2-3 APR)
  "Feral Ghoul": { "hp": 25, "dr": 0, "per": 3, "apr": 2, "dice_count": 3, "target_dmg": 3, "atk": "(Melee)", "loot_type": "creature" },
  "Feral Ghoul Roamer": { "hp": 50, "dr": 0, "per": 4, "apr": 2, "dice_count": 5, "target_dmg": 5, "atk": "(Melee)", "loot_type": "creature" },
  "Glowing One": { "hp": 90, "dr": 0, "per": 5, "apr": 2, "dice_count": 8, "target_dmg": 8, "atk": "(Melee)", "note": "Rad Aura", "loot_type": "creature" },
  "Reaver": { "hp": 140, "dr": 2, "per": 6, "apr": 3, "dice_count": 7, "target_dmg": 7, "atk": "(Rad Bomb)", "loot_type": "creature" },
  "Chinese Remnant": { "hp": 50, "dr": 0, "per": 5, "apr": 3, "dice_count": 6, "target_dmg": 6, "atk": "(Rifle)", "loot_type": "creature" },
  "Trog": { "hp": 35, "dr": 0, "per": 4, "apr": 3, "dice_count": 4, "target_dmg": 4, "atk": "(Claws)", "note": "Fast & Vicious", "loot_type": "creature" },
  "Slag": { "hp": 40, "dr": 0, "per": 5, "apr": 2, "dice_count": 4, "target_dmg": 4, "atk": "(Melee)", "note": "Dark Vision", "loot_type": "creature" },

  // Mutants (Slow agility, base 1 APR; penalty: cite 1069)
  "Super Mutant": { "hp": 100, "dr": 1, "per": 3, "apr": 1, "dice_count": 4, "target_dmg": 4, "atk": "(Melee/Rifle)", "loot_type": "human" },
  "Super Mutant Brute": { "hp": 200, "dr": 1, "per": 5, "apr": 1, "dice_count": 5, "target_dmg": 5, "atk": "(Melee/Rifle)", "loot_type": "human" },
  "Super Mutant Master": { "hp": 300, "dr": 1, "per": 6, "apr": 2, "dice_count": 6, "target_dmg": 6, "atk": "(Rifle)", "loot_type": "human" },
  "Behemoth": { "hp": 2000, "dr": 1, "per": 5, "apr": 2, "dice_count": 8, "target_dmg": 8, "atk": "(Melee)", "note": "Immune to Knockdown", "loot_type": "human" },
  "Nightkin": { "hp": 180, "dr": 1, "per": 8, "apr": 3, "dice_count": 7, "target_dmg": 7, "atk": "(Stealth Boy)", "loot_type": "human" },

  // Abominations & Wildlife
  "Deathclaw": { "hp": 500, "dr": 0, "per": 8, "apr": 4, "dice_count": 10, "target_dmg": 10, "atk": "(Melee)", "loot_type": "creature" },
  "Yao Guai": { "hp": 220, "dr": 0, "per": 7, "apr": 3, "dice_count": 10, "target_dmg": 10, "atk": "(Melee)", "loot_type": "creature" },
  "Guai Wu": { "hp": 75, "dr": 0, "per": 8, "apr": 3, "dice_count": 6, "target_dmg": 6, "atk": "(Melee)", "note": "Climber", "loot_type": "creature" },
  "Cazador": { "hp": 85, "dr": 0, "per": 9, "apr": 4, "dice_count": 7, "target_dmg": 7, "atk": "(Poison)", "note": "Frenzied", "loot_type": "creature" },
  "Scythewing": { "hp": 200, "dr": 0, "per": 8, "apr": 3, "dice_count": 6, "target_dmg": 6, "atk": "(Melee)", "note": "Flying", "loot_type": "creature" },
  "Nightstalker": { "hp": 65, "dr": 0, "per": 7, "apr": 3, "dice_count": 5, "target_dmg": 5, "atk": "(Bite)", "note": "Pack Tactics", "loot_type": "creature" },
  "Tunneler": { "hp": 65, "dr": 1, "per": 6, "apr": 3, "dice_count": 6, "target_dmg": 6, "atk": "(Melee)", "note": "Pack Hunter", "loot_type": "creature" },
  "Mirelurk": { "hp": 120, "dr": 5, "per": 4, "apr": 2, "dice_count": 8, "target_dmg": 8, "atk": "(Melee)", "loot_type": "creature" },
  "Radscorpion": { "hp": 100, "dr": 0, "per": 4, "apr": 2, "dice_count": 8, "target_dmg": 8, "atk": "(Poison)", "loot_type": "creature" },
  "Centaur": { "hp": 100, "dr": 0, "per": 9, "apr": 2, "dice_count": 7, "target_dmg": 7, "atk": "(Spit)", "loot_type": "creature" },
  "Spore Carrier": { "hp": 60, "dr": 0, "per": 4, "apr": 2, "dice_count": 5, "target_dmg": 5, "atk": "(Melee)", "loot_type": "creature" },
  "Spore Plant": { "hp": 40, "dr": 0, "per": 3, "apr": 1, "dice_count": 4, "target_dmg": 4, "atk": "(Spit)", "loot_type": "creature" },
  "Gecko": { "hp": 30, "dr": 0, "per": 4, "apr": 2, "dice_count": 4, "target_dmg": 4, "atk": "(Bite)", "loot_type": "creature" },
  "Golden Gecko": { "hp": 60, "dr": 1, "per": 5, "apr": 2, "dice_count": 5, "target_dmg": 5, "atk": "(Rad Bite)", "loot_type": "creature" },
  "Fire Gecko": { "hp": 80, "dr": 2, "per": 5, "apr": 2, "dice_count": 6, "target_dmg": 6, "atk": "(Fire Breath)", "loot_type": "creature" },
  "Moray Eel": { "hp": 40, "dr": 0, "per": 5, "apr": 2, "dice_count": 5, "target_dmg": 5, "atk": "(Bite)", "loot_type": "creature" },
  
  // Pests & Minor Wildlife
  "Radroach": { "hp": 5, "dr": 0, "per": 3, "apr": 1, "dice_count": 2, "target_dmg": 2, "atk": "(Bite)", "loot_type": "creature" },
  "Bloatfly": { "hp": 15, "dr": 0, "per": 5, "apr": 2, "dice_count": 2, "target_dmg": 2, "atk": "(Spit)", "loot_type": "creature" },
  "Giant Ant": { "hp": 30, "dr": 0, "per": 3, "apr": 1, "dice_count": 3, "target_dmg": 3, "atk": "(Bite)", "loot_type": "creature" },
  "Fire Ant": { "hp": 30, "dr": 0, "per": 3, "apr": 2, "dice_count": 7, "target_dmg": 7, "atk": "(Melee/Fire)", "loot_type": "creature" },
  "Mole Rat": { "hp": 25, "dr": 0, "per": 3, "apr": 1, "dice_count": 4, "target_dmg": 4, "atk": "(Bite)", "loot_type": "creature" },
  "Pig Rat": { "hp": 60, "dr": 0, "per": 3, "apr": 2, "dice_count": 6, "target_dmg": 6, "atk": "(Bite)", "loot_type": "creature" },
  "Vicious Dog": { "hp": 20, "dr": 0, "per": 8, "apr": 3, "dice_count": 6, "target_dmg": 6, "atk": "(Bite)", "loot_type": "creature" },
  "Giant Mantid": { "hp": 60, "dr": 1, "per": 6, "apr": 2, "dice_count": 5, "target_dmg": 5, "atk": "(Claws)", "loot_type": "creature" },
  "Brahmin": { "hp": 40, "dr": 0, "per": 3, "apr": 1, "dice_count": 3, "target_dmg": 3, "atk": "(Melee)", "loot_type": "creature" },
  
  // Inorganics (Robots: cite 2190-2194)
  "Turret": { "hp": 40, "dr": 0, "per": 10, "apr": 1, "dice_count": 3, "target_dmg": 3, "atk": "(Gun)", "loot_type": "inorganic" },
  "Oculobot": { "hp": 30, "dr": 0, "per": 5, "apr": 2, "dice_count": 3, "target_dmg": 3, "atk": "(Zapper)", "loot_type": "inorganic" },
  "Protectron": { "hp": 75, "dr": 0, "per": 4, "apr": 1, "dice_count": 6, "target_dmg": 6, "atk": "(Laser)", "loot_type": "inorganic" },
  "Protect-O-Bot": { "hp": 85, "dr": 0, "per": 4, "apr": 2, "dice_count": 6, "target_dmg": 6, "atk": "(Laser)", "note": "Fast Mover", "loot_type": "inorganic" },
  "Mr Handy": { "hp": 100, "dr": 0, "per": 5, "apr": 3, "dice_count": 4, "target_dmg": 4, "atk": "(Melee/Fire)", "loot_type": "inorganic" },
  "Mr Gutsy": { "hp": 300, "dr": 0, "per": 6, "apr": 3, "dice_count": 8, "target_dmg": 8, "atk": "(Plasma/Gun)", "loot_type": "inorganic" },
  "Sentry Bot": { "hp": 500, "dr": 0, "per": 7, "apr": 3, "dice_count": 8, "target_dmg": 8, "atk": "(Minigun/Missile)", "loot_type": "inorganic" },
  "Securitron Mk I": { "hp": 180, "dr": 4, "per": 6, "apr": 2, "dice_count": 7, "target_dmg": 7, "atk": "(Gatling)", "loot_type": "inorganic" },
  "Securitron Mk II": { "hp": 250, "dr": 5, "per": 7, "apr": 3, "dice_count": 8, "target_dmg": 8, "atk": "(Missile/Laser)", "note": "Regen", "loot_type": "inorganic" },
  "Roboscorpion": { "hp": 150, "dr": 6, "per": 4, "apr": 3, "dice_count": 6, "target_dmg": 6, "atk": "(Laser Tail)", "loot_type": "inorganic" },
  
  // Other
  "Alien": { "hp": 75, "dr": 2, "per": 8, "apr": 3, "dice_count": 8, "target_dmg": 8, "atk": "(Alien Blaster)", "note": "Zetan Tech", "loot_type": "creature" }
};

// 4. LOOT DATABASE
const LOOT_DB = {
  "WEAPONS": [
    // Small Guns (Pistols)
    { "name": ".22 Pistol", "type": "Small Gun", "dmg": 2 }, { "name": ".32 Revolver", "type": "Small Gun", "dmg": 3 },
    { "name": ".357 Magnum Revolver", "type": "Small Gun", "dmg": 7 }, { "name": ".44 Magnum Revolver", "type": "Small Gun", "dmg": 10 },
    { "name": ".45 Auto Pistol", "type": "Small Gun", "dmg": 8 }, { "name": "5.56mm Pistol", "type": "Small Gun", "dmg": 7 },
    { "name": "9mm Pistol", "type": "Small Gun", "dmg": 4 }, { "name": "10mm Pistol", "type": "Small Gun", "dmg": 5 },
    { "name": "Type 17 Chinese Pistol", "type": "Small Gun", "dmg": 2 }, { "name": "Type 33 Chinese Pistol", "type": "Small Gun", "dmg": 3 },
    // Small Guns (SMG)
    { "name": ".45 Auto SMG", "type": "Small Gun", "dmg": 8 }, { "name": "9mm Submachine Gun", "type": "Small Gun", "dmg": 4 },
    { "name": "10mm Submachine Gun", "type": "Small Gun", "dmg": 5 }, { "name": "Type 79 Chinese SMG", "type": "Small Gun", "dmg": 3 },
    // Small Guns (Rifles)
    { "name": ".308 Hunting Rifle", "type": "Small Gun", "dmg": 13 }, { "name": ".32 Hunting Rifle", "type": "Small Gun", "dmg": 11 },
    { "name": "Anti-Material Rifle", "type": "Small Gun", "dmg": 28 }, { "name": "C98 Assault Carbine", "type": "Small Gun", "dmg": 3 },
    { "name": "R91 Assault Rifle", "type": "Small Gun", "dmg": 4 }, { "name": "Automatic Rifle", "type": "Small Gun", "dmg": 10 },
    { "name": "BB Gun", "type": "Small Gun", "dmg": 1 }, { "name": "Chinese Assault Rifle", "type": "Small Gun", "dmg": 6 },
    { "name": "Lever Action Rifle", "type": "Small Gun", "dmg": 20 }, { "name": "M95 Marksman Carbine", "type": "Small Gun", "dmg": 8 },
    { "name": "M24 Sniper Rifle", "type": "Small Gun", "dmg": 16 }, { "name": "AR20 Service Rifle", "type": "Small Gun", "dmg": 5 },
    { "name": "Varmint Rifle", "type": "Small Gun", "dmg": 2 },
    // Small Guns (Shotguns)
    { "name": "Caravan Shotgun", "type": "Small Gun", "dmg": 11 }, { "name": "Combat Shotgun", "type": "Small Gun", "dmg": 13 },
    { "name": "Double-Barrel Shotgun", "type": "Small Gun", "dmg": 21 }, { "name": "Police Stakeout Shotgun", "type": "Small Gun", "dmg": 12 },
    { "name": "Riot Shotgun", "type": "Small Gun", "dmg": 16 }, { "name": "Sawed-Off Shotgun", "type": "Small Gun", "dmg": 25 },
    { "name": "Single Shotgun", "type": "Small Gun", "dmg": 12 },
    // Big Guns
    { "name": "Fat Man", "type": "Big Gun", "dmg": 100 }, { "name": "Flamer", "type": "Big Gun", "dmg": 8 },
    { "name": "Gatling Laser", "type": "Big Gun", "dmg": 8 }, { "name": "Heavy Incinerator", "type": "Big Gun", "dmg": 15 },
    { "name": "Incinerator", "type": "Big Gun", "dmg": 10 }, { "name": "Heavy Machinegun", "type": "Big Gun", "dmg": 28 },
    { "name": "Light Machinegun", "type": "Big Gun", "dmg": 6 }, { "name": "Minigun", "type": "Big Gun", "dmg": 4 },
    { "name": "Missile Launcher", "type": "Big Gun", "dmg": 60 }, { "name": "EM Rail Gun", "type": "Big Gun", "dmg": 10 },
    { "name": "Recoilless Rifle", "type": "Big Gun", "dmg": 10 },
    // Energy Weapons
    { "name": "Alien Blaster", "type": "Energy Wep", "dmg": 75 }, { "name": "Laser Pistol", "type": "Energy Wep", "dmg": 6 },
    { "name": "Mesmetron", "type": "Energy Wep", "dmg": 1 }, { "name": "Microwave Emitter", "type": "Energy Wep", "dmg": 30 },
    { "name": "Neural Scrambler", "type": "Energy Wep", "dmg": 1 }, { "name": "Plasma Pistol", "type": "Energy Wep", "dmg": 15 },
    { "name": "Pulse Blaster", "type": "Energy Wep", "dmg": 20 }, { "name": "Sonic Emitter", "type": "Energy Wep", "dmg": 10 },
    { "name": "Alien Disintegrator", "type": "Energy Wep", "dmg": 17 }, { "name": "Gauss Rifle", "type": "Energy Wep", "dmg": 50 },
    { "name": "Laser Rifle", "type": "Energy Wep", "dmg": 12 }, { "name": "Plasma Rifle", "type": "Energy Wep", "dmg": 22 },
    { "name": "Multiplas Rifle", "type": "Energy Wep", "dmg": 15 }, { "name": "P94 Plasma Caster", "type": "Energy Wep", "dmg": 32 },
    { "name": "Swift’s Pulse Rifle", "type": "Energy Wep", "dmg": 5 }, { "name": "Tesla Cannon", "type": "Energy Wep", "dmg": 40 },
    { "name": "Tri-Beam Laser Rifle", "type": "Energy Wep", "dmg": 12 }, { "name": "Entropy Rifle", "type": "Energy Wep", "dmg": 50 },
    // Melee
    { "name": "Fire Axe", "type": "Melee", "dmg": 10 }, { "name": "Chinese Officer’s Sword", "type": "Melee", "dmg": 6 },
    { "name": "Combat Knife", "type": "Melee", "dmg": 4 }, { "name": "Trench Knife", "type": "Melee", "dmg": 5 },
    { "name": "Kitchen Knife", "type": "Melee", "dmg": 2 }, { "name": "Switchblade", "type": "Melee", "dmg": 3 },
    { "name": "Trench Shovel", "type": "Melee", "dmg": 4 }, { "name": "Ripper", "type": "Melee", "dmg": 14 },
    { "name": "Shishkebab", "type": "Melee", "dmg": 5 }, { "name": "Baseball Bat", "type": "Melee", "dmg": 5 },
    { "name": "Lead Pipe", "type": "Melee", "dmg": 5 }, { "name": "Nail Board", "type": "Melee", "dmg": 4 },
    { "name": "Police Baton", "type": "Melee", "dmg": 2 }, { "name": "Riot Police Baton", "type": "Melee", "dmg": 4 },
    { "name": "Pool Cue", "type": "Melee", "dmg": 2 }, { "name": "Rolling Pin", "type": "Melee", "dmg": 1 },
    { "name": "Shock Baton", "type": "Melee", "dmg": 10 }, { "name": "Sledgehammer", "type": "Melee", "dmg": 10 },
    { "name": "Super Sledge", "type": "Melee", "dmg": 14 }, { "name": "Tire Iron", "type": "Melee", "dmg": 3 },
    { "name": "Weight & Chain", "type": "Melee", "dmg": 2 }, { "name": "Brass Knuckles", "type": "Melee", "dmg": 3 },
    { "name": "Deathclaw Gauntlet", "type": "Melee", "dmg": 10 }, { "name": "Power Fist", "type": "Melee", "dmg": 10 },
    { "name": "Spiked Knuckles", "type": "Melee", "dmg": 5 },
    // Explosives (Added as weapons for loot purposes)
    { "name": "Frag Grenade", "type": "Explosive", "dmg": 8 }, { "name": "Plasma Grenade", "type": "Explosive", "dmg": 12 },
    { "name": "Pulse Grenade", "type": "Explosive", "dmg": 10 }, { "name": "Nuka Grenade", "type": "Explosive", "dmg": 20 },
    { "name": "Molotov Cocktail", "type": "Explosive", "dmg": 1 }, { "name": "Dynamite", "type": "Explosive", "dmg": 5 }
  ],
  "ARMOR": [
    // Generic/Low Level (Added to fix suit issue)
    { "name": "Ragged Outfit", "dr": 0 }, { "name": "Dirty Casualwear", "dr": 0 }, 
    { "name": "Farmhand Clothes", "dr": 0 }, { "name": "Brahmin Skin Outfit", "dr": 0 },
    // Vault
    { "name": "Armored Vault Jumpsuit", "dr": 3 }, { "name": "Reinf. Armored Vault Jumpsuit", "dr": 4 },
    { "name": "Vault Jumpsuit", "dr": 1 }, { "name": "Vault Utility Jumpsuit", "dr": 1 },
    { "name": "Vault Lab Uniform", "dr": 1 }, { "name": "Vault Security Armor", "dr": 3 },
    { "name": "Vault Security Helmet", "dr": 1 },
    // Wasteland
    { "name": "Wasteland Outfit", "dr": 1 }, { "name": "Roving Trader Outfit", "dr": 1 },
    { "name": "Merc Outfit", "dr": 3 }, { "name": "Wasteland Armor", "dr": 2 },
    { "name": "Raider Armor", "dr": 3 }, { "name": "Raider Helmet", "dr": 1 },
    // Leather
    { "name": "Leather Jacket", "dr": 2 }, { "name": "Gang Member Leather Jacket", "dr": 2 },
    { "name": "Leather Armor", "dr": 3 }, { "name": "Reinforced Leather Armor", "dr": 4 },
    { "name": "Leatherman Patrol Armor", "dr": 4 },
    // Metal
    { "name": "Metal Armor", "dr": 4 }, { "name": "Metal Helmet", "dr": 1 },
    { "name": "Motorcycle Helmet", "dr": 1 }, { "name": "Reinforced Metal Armor", "dr": 5 },
    { "name": "Reinforced Metal Helmet", "dr": 2 }, { "name": "Lightweight Metal Armor", "dr": 3 },
    { "name": "Gamma Shield Armor", "dr": 4 },
    // Law & Combat
    { "name": "Pre-War Tactical Vest", "dr": 2 }, { "name": "Pre-War Riot Gear", "dr": 4 },
    { "name": "Pre-War Riot Helmet", "dr": 1 }, { "name": "Combat Armor", "dr": 4 },
    { "name": "SpecOps Combat Armor", "dr": 4 }, { "name": "Medic Combat Armor", "dr": 4 },
    { "name": "Combat Helmet", "dr": 2 }, { "name": "Headhunter Armor", "dr": 4 },
    { "name": "Deckard Ind. Tactical Armor", "dr": 4 }, { "name": "Recon Armor", "dr": 3 },
    { "name": "Recon Armor Helmet", "dr": 2 }, { "name": "Chinese Jumpsuit", "dr": 2 },
    { "name": "Chinese Stealth Armor", "dr": 3 }, { "name": "US Army Stealth Suit", "dr": 3 },
    // Power Armor
    { "name": "T-45d Power Armor", "dr": 5 }, { "name": "T-45d Power Armor Helmet", "dr": 3 },
    { "name": "T-51b Power Armor", "dr": 6 }, { "name": "T-51b Power Armor Helmet", "dr": 4 },
    { "name": "T-60b Power Armor", "dr": 8 }, { "name": "T-60b Power Armor Helmet", "dr": 4 },
    { "name": "Outcast Power Armor", "dr": 5 }, { "name": "Outcast Power Armor Helmet", "dr": 3 },
    { "name": "Salvaged Power Armor", "dr": 5 }, { "name": "Salvaged Power Armor Helmet", "dr": 3 },
    { "name": "Enclave Hellfire Armor", "dr": 9 }, { "name": "Advanced Power Armor Mk II", "dr": 10 },
    // Tribal & Other
    { "name": "Tribal Raiding Armor", "dr": 3 }, { "name": "Tribal Pit Fighter Harness", "dr": 2 },
    { "name": "Tribal Power Armor", "dr": 5 }, { "name": "Tribal Spirit Armor", "dr": 3 },
    { "name": "Tribal Garb", "dr": 1 }, { "name": "Radiation Suit", "dr": 1 },
    { "name": "Advanced Radiation Suit", "dr": 1 }, { "name": "Environment Suit", "dr": 1 },
    { "name": "Mechanic Jumpsuit", "dr": 1 }, { "name": "Institute Field Agent Uniform", "dr": 1 },
    { "name": "Pre-War Civil Defense Uniform", "dr": 1 }, { "name": "Pre-War Business Wear", "dr": 0 }
  ],
  "CHEM_PACK": ["Stimpack", "Rad-X", "Mentats", "Psycho", "Jet", "Buffout"],
  "FOOD_PACK": ["Cram", "Nuka-Cola", "Purified water", "Wasteland game meat", "Fancy Lads"]
};

const TOKEN_PRESETS = [
    { name: "SCABIGAIL", color: "#ef4444", src: "https://i.postimg.cc/Hx0nX4vK/Scabigail_Vault_Boy.png" },
    { name: "SALLY",      color: "#16ff60", src: "https://i.postimg.cc/hjRhX3s6/Sally_Vault_Boy.png" },
    { name: "K2-1B",      color: "#3b82f6", src: "https://i.postimg.cc/LXk5LBQG/K2_Vault_Boy.png" },
    { name: "BULK",       color: "#eab308", src: "https://i.postimg.cc/C1C5kH6T/Bulk_Vault_Boy.png" },
    { name: "SYLVIE",     color: "#a855f7", src: "https://i.postimg.cc/tTdJWtvm/Sylvie_Vault_Boy.png" },
    { name: "MELODY",     color: "#ffffff", src: "https://i.postimg.cc/3RjNmCb7/Melody_Vault_Boy.png" }
];

// --- PLAYER TOKEN FUNCTIONS (Using Custom Overlay) ---

function renderPlayerTokens() {
    const panel = document.getElementById('playerTokenPanel');
    panel.innerHTML = '';

    // --- ADD D10 BUTTON ---
    const d10Container = document.createElement('div');
    d10Container.className = 'd10-btn';
    
    const d10Val = document.createElement('div');
    d10Val.className = 'd10-val';
    d10Val.innerText = '10'; // Default start
    
    const d10Label = document.createElement('div');
    d10Label.className = 'd10-label';
    d10Label.innerText = 'ROLL D10';
    
    d10Container.appendChild(d10Val);
    d10Container.appendChild(d10Label);
    
    d10Container.onclick = () => {
        // Quick visual roll animation
        let count = 0;
        const interval = setInterval(() => {
            d10Val.innerText = Math.floor(Math.random() * 10) + 1;
            count++;
            if(count > 8) {
                clearInterval(interval);
                d10Val.innerText = Math.floor(Math.random() * 10) + 1; // Final result
            }
        }, 50);
    };

    // Prepend to panel
    panel.appendChild(d10Container);

    // --- RENDER PLAYERS ---
    TOKEN_PRESETS.forEach(p => {
        const tokenContainer = document.createElement('div');
        tokenContainer.style.display = 'inline-block';
        tokenContainer.style.textAlign = 'center';
        
        const token = document.createElement('div');
        token.className = 'player-token';
        token.style.backgroundImage = `url('${p.src}')`;
        token.style.borderColor = p.color;
        
        token.onclick = () => openInputForPlayer(p);
        
        const label = document.createElement('div');
        label.className = 'player-token-label';
        label.innerText = p.name;
        label.style.color = p.color;

        tokenContainer.appendChild(token);
        tokenContainer.appendChild(label);
        panel.appendChild(tokenContainer);
    });
}

function openInputForPlayer(preset) {
    const overlay = document.getElementById('input-overlay');
    const title = document.getElementById('input-title');
    const hpInput = document.getElementById('input-hp');
    const drInput = document.getElementById('input-dr');
    const seqInput = document.getElementById('input-seq');
    const confirmBtn = document.getElementById('input-confirm');
    
    // Reset values
    hpInput.value = '';
    drInput.value = '';
    seqInput.value = '';
    
    title.innerText = `DEPLOY: ${preset.name}`;
    overlay.style.display = 'flex';
    
    // Remove old listeners to avoid duplicates
    const newBtn = confirmBtn.cloneNode(true);
    confirmBtn.parentNode.replaceChild(newBtn, confirmBtn);
    
    newBtn.onclick = () => {
        const hp = parseInt(hpInput.value);
        const dr = drInput.value;
        const seq = parseInt(seqInput.value);
        
        if (hp && seq) {
            addPlayerToken(preset, hp, dr, seq);
            overlay.style.display = 'none';
        }
    };
}

function closeInput() {
    document.getElementById('input-overlay').style.display = 'none';
}

function addPlayerToken(preset, hp, dr, seq) {
    window.currentEnemies.push({
        name: preset.name,
        hp: hp,
        dr: dr,
        dice_count: "N/A", // Players use character sheet dice logic
        target_dmg: "N/A",
        per: "N/A",
        seq: seq,
        atk: "Player",
        note: "PLAYER CHARACTER",
        loot: null,
        style: "enemy-card player",
        id: Math.random().toString(36).substr(2, 9),
        // Custom player props
        token_src: preset.src,
        token_color: preset.color
    });
    
    window.currentEnemies.sort((a, b) => b.seq - a.seq);
    renderRadar();
    syncToFirebase();
}


// --- MAIN LOGIC ---

function addManual() {
    const name = document.getElementById('manualName').value.trim();
    const seqVal = parseInt(document.getElementById('manualSeq').value);

    if (name && !isNaN(seqVal)) {
        window.currentEnemies.push({
            name: name,
            hp: "N/A",
            dr: "N/A",
            dice_count: "N/A",
            target_dmg: "N/A",
            per: "N/A",
            seq: seqVal,
            atk: "Player/Custom",
            note: "Manual Entry",
            loot: null,
            style: "enemy-card friendly",
            id: Math.random().toString(36).substr(2, 9)
        });
        
        window.currentEnemies.sort((a, b) => b.seq - a.seq);
        renderRadar();
        syncToFirebase();
        
        document.getElementById('manualName').value = "";
        document.getElementById('manualSeq').value = "";
    }
}

// Loot helper functions
function d(sides) { return Math.floor(Math.random() * sides) + 1; }

function getCondition(forceHigh = false) {
    let roll = d(10);
    if (forceHigh) roll = Math.max(roll, 8);
    if (roll === 10) return "Excellent";
    if (roll >= 8) return "Good";
    if (roll >= 4) return "Worn";
    if (roll >= 2) return "Damaged";
    return "Ruined";
}

function getRandomItem(category, count) {
    let items = [];
    for (let i = 0; i < count; i++) items.push(category[Math.floor(Math.random() * category.length)]);
    return items;
}

function formatLoot(itemArray) {
    let lootMap = {};
    itemArray.forEach(item => { lootMap[item] = (lootMap[item] || 0) + 1; });
    let output = [];
    for (const [item, qty] of Object.entries(lootMap)) output.push(`<span class="loot-item">${item} (x${qty})</span>`);
    return output.join(" ");
}

function generateHumanLoot(enemyStats) {
    const targetDmg = enemyStats.target_dmg;
    const enemyDR = parseInt(enemyStats.dr);
    const isPA = enemyStats.loot_type === 'human_pa';
    const forceHighCondition = enemyDR > 5 && !isPA;
    const weaponCandidates = LOOT_DB.WEAPONS.filter(w => w.dmg >= (targetDmg - 5) && w.dmg <= (targetDmg + 10));
    let primaryWeapon = (weaponCandidates.length > 0) ? weaponCandidates[Math.floor(Math.random() * weaponCandidates.length)] : LOOT_DB.WEAPONS[0];
    const primaryWeaponName = `${primaryWeapon.name} [${getCondition()}]`;
    
    let availableArmor = LOOT_DB.ARMOR;
    if (!isPA) availableArmor = availableArmor.filter(a => a.dr <= 5); 
    
    // New randomized armor logic
    let candidates = availableArmor.filter(a => a.dr >= enemyDR);
    
    if (candidates.length === 0) {
        // Fallback: Strongest available if nothing meets req
        candidates = [availableArmor.sort((a, b) => b.dr - a.dr)[0]]; 
    } else {
        // Sort by DR ascending
        candidates.sort((a, b) => a.dr - b.dr);
        const minValidDR = candidates[0].dr;
        // Keep all armor that is within 1 point of the minimum valid DR (adds variety)
        candidates = candidates.filter(a => a.dr <= minValidDR + 1);
    }

    let armorMatch = candidates[Math.floor(Math.random() * candidates.length)];
    if (!armorMatch) armorMatch = LOOT_DB.ARMOR[0];

    const armorName = `${armorMatch.name} [${getCondition(forceHighCondition)}]`;
    const caps = d(3) * 10;
    const chems = getRandomItem(LOOT_DB.CHEM_PACK, d(1)); 
    const food = getRandomItem(LOOT_DB.FOOD_PACK, d(3)); 
    return { weapon: primaryWeaponName, armor: armorName, caps: caps, bonus: formatLoot([...chems, ...food]) };
}

const PREFIXES = {
    "0.75": ["Starving", "Malnourished", "Scrawny", "Wounded", "Limping", "Rusted", "Glitching", "Broken", "Frayed", "Pathetic", "Cowardly", "Simple", "Disoriented", "Skittish", "Flinching", "Worn", "Low-Power", "Crippled", "Feral", "Juvenile"],
    "1": ["Roaming", "Standard", "Common", "Scavenging", "Vicious", "Patrolling", "Aggressive", "Combat", "Enraged", "Mad", "Scrappy", "Seasoned", "Alert", "Guarding", "Armed", "Heavy", "Brutal", "Reinforced", "Junkyard", "Wrecked"],
    "1.5": ["Hardened", "Alpha", "Ruthless", "Elite", "Veteran", "Berserk", "Sentinel", "Wasteland", "Chem-Crazed", "Mechanized", "Advanced", "Armored", "Mercenary", "War-Forged", "Relentless", "Unstoppable", "Caustic", "Fused", "Overcharged", "Ghoulish"],
    "2": ["Apex", "Tyrant", "Colossal", "Alpha-Stalker", "Unholy", "Omega", "Nuclear", "Prototype", "Sovereign", "Annihilator", "Apocalyptic", "Monstrous", "Immortal", "Abomination", "God-Tier", "Death-Toll", "Cursed", "Final", "Prime", "Arch-"]
};

function spawnEnemies() {
  const type = document.getElementById('enemyType').value;
  const count = parseInt(document.getElementById('count').value);
  const modifierSelect = document.getElementById('difficulty');
  const modifier = parseFloat(modifierSelect.value);
  
  const baseStats = BESTIARY[type];
  if (!baseStats) return;

  const prefixKey = modifierSelect.value.trim(); 

  for(let i=0; i<count; i++) {
    // 1. Math for Stats
    let modHP = Math.floor(baseStats.hp * modifier);
    let modDice = Math.ceil(baseStats.dice_count * modifier);
    let modTarget = Math.ceil(baseStats.target_dmg * modifier);
    let modAPR = Math.floor(baseStats.apr * modifier); 
    let modDR = baseStats.dr;
    if (typeof baseStats.dr === 'number' && baseStats.dr > 0) modDR = Math.floor(baseStats.dr * modifier);

    // 2. Prefix Logic
    let prefixes = PREFIXES[prefixKey] || PREFIXES[modifier.toString()] || [""];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const finalName = prefix ? `${prefix} ${type}` : type;
    
    // 3. Initiative Sequence
    const sequence = baseStats.per + d(10);

    // 4. PRESERVED: Loot Generation
    let loot = null;
    if (baseStats.loot_type === 'human' || baseStats.loot_type === 'human_pa') {
        loot = generateHumanLoot({ target_dmg: modTarget, dr: modDR, loot_type: baseStats.loot_type });
    }

    // 5. Card Styling
    let styleClass = "enemy-card";
    if (modifier >= 2.0) styleClass += " legendary";
    else if (modifier >= 1.5) styleClass += " hard";
    else if (modifier <= 0.75) styleClass += " weak";
    
    const visualUrl = getVisualAsset(type);

    // 6. Push to Tracker State (Saving the DNA/Multiplier)
    window.currentEnemies.push({
      name: finalName, 
      hp: modHP, 
      dr: modDR, 
      dice_count: modDice, 
      target_dmg: modTarget, 
      per: baseStats.per,
      apr: modAPR, 
      multiplier: modifier, // <--- SAVED FOR MAP SCALING
      seq: sequence, 
      atk: baseStats.atk, 
      note: baseStats.note, 
      loot: loot, // <--- REINSTATED ACTUAL LOOT
      style: styleClass,
      id: Math.random().toString(36).substr(2, 9),
      token_src: visualUrl,
      token_color: "var(--primary)"
    });

    // 7. BROADCASTING THE DNA (Multiplier)
    combatChannel.postMessage({ type: type, label: finalName, multiplier: modifier });
  }
  
  window.currentEnemies.sort((a, b) => b.seq - a.seq);
  renderRadar();
  syncToFirebase();
}

function updateStat(id, stat, value) {
    const index = window.currentEnemies.findIndex(e => e.id === id);
    if (index !== -1) {
        const enemy = window.currentEnemies[index];

        if (stat === 'hp') {
            const newHP = parseInt(value) || 0;
            const oldHP = parseInt(enemy.hp) || 0;

            // --- HIT SIGNAL: Trigger map animation if damage was taken ---
            if (newHP < oldHP) {
                combatChannel.postMessage({ 
                    type: 'ENEMY_DAMAGED', 
                    label: enemy.name 
                });
            }

            enemy.hp = newHP;
            
            // --- DEATH VS LIFE LOGIC ---
            if (newHP <= 0) {
                // Turn 'em grey and tell the map they're done
                enemy.token_color = '#4b5563';
                combatChannel.postMessage({ 
                    type: 'ENEMY_DIED', 
                    label: enemy.name 
                });
            } else {
                // If they're alive (or just healed), keep the primary color
                enemy.token_color = "var(--primary)";
            }
        } else {
            // Update other stats (DR, SEQ, etc.)
            enemy[stat] = value;
        }
        
        renderRadar();
        syncToFirebase();
    }
}

function killEnemy(id) {
    const index = window.currentEnemies.findIndex(e => e.id === id);
    if (index !== -1) {
        // Tell the map to delete the token before we remove it from the tracker list
        combatChannel.postMessage({ 
            type: 'REMOVE_TOKEN', 
            label: window.currentEnemies[index].name 
        });

        window.currentEnemies.splice(index, 1);
        renderRadar();
        syncToFirebase();
    }
}
function advanceTurn() {
    if (window.currentEnemies.length === 0) return;
    turnIndex = (turnIndex + 1) % window.currentEnemies.length;
    renderRadar();
    syncToFirebase();
}

function rollAttack(id) {
    const index = window.currentEnemies.findIndex(e => e.id === id);
    if (index === -1) return;
    const enemy = window.currentEnemies[index];
    
    if (enemy.style.includes("friendly")) return;

    let rolls = [], hits = 0, crits = 0;
    for(let i=0; i<enemy.dice_count; i++) {
        const r = d(10);
        rolls.push(r);
        if (r <= enemy.target_dmg) hits++;
        if (r === 1) crits++;
    }
    const totalDmg = (enemy.target_dmg + hits) * (1 + crits);
    const rollsHtml = rolls.map(r => {
        if (r === 1) return `<span class="dice-crit">${r}</span>`;
        if (r <= enemy.target_dmg) return `<span class="dice-hit">${r}</span>`;
        return `<span class="dice-roll">${r}</span>`;
    }).join(" ");
    window.currentEnemies[index].attackResult = { rolls: rollsHtml, hits: hits, crits: crits, total: totalDmg };
    renderRadar();
    syncToFirebase();
}

function renderRadar() {
  const screen = document.getElementById('screen');
  // Preserve the overlay inside screen
  const overlay = document.getElementById('input-overlay');
  
  // Clear everything BUT the overlay
  Array.from(screen.children).forEach(child => {
      if (child.id !== 'input-overlay') screen.removeChild(child);
  });

  if (window.currentEnemies.length === 0) {
    const msg = document.createElement('div');
    msg.style.cssText = 'text-align: center; opacity: 0.5; margin-top: 50px;';
    msg.innerText = 'NO HOSTILES DETECTED';
    screen.appendChild(msg);
    return;
  }

  window.currentEnemies.forEach((e, index) => {
    const card = document.createElement('div');
    const isDead = (e.hp !== "N/A" && e.hp <= 0);
    const isActive = (index === turnIndex);
    
    // Determine card style for rendering
    let cardClass = `${e.style} ${isDead ? 'dead' : ''} ${isActive ? 'active' : ''}`;
    let cardStyle = '';

    if (e.token_src) {
        // Apply token background if available (Players AND Enemies now)
        cardStyle += `background-image: url('${e.token_src}');`;
    }
    
    if (e.style.includes("player")) {
        // Apply player specific color override
        cardClass = cardClass.replace('friendly', '');
        cardStyle += `--card-color: ${e.token_color};`;
    }

    card.className = cardClass;
    card.setAttribute('style', cardStyle);
    
    let content = '';

    if (e.style.includes("player") || e.style.includes("friendly")) {
        // Friendly/Player Card
        content = `
            <div class="enemy-info">
                <span class="enemy-name" style="font-size:1.4em; display:block;">
                    ${e.name} ${e.token_color === '#ffffff' ? `[<span style="color:#aaa;">WHITE</span>]` : ''}
                </span>
                <div class="enemy-stats">
    <span class="stat-box">HP: <input type="text" class="stat-input" value="${e.hp}" onchange="updateStat('${e.id}', 'hp', this.value)"></span>
    <span class="stat-box">DR: <input type="text" class="stat-input" value="${e.dr}" onchange="updateStat('${e.id}', 'dr', this.value)" style="width:100px;"></span>
    
    <span class="stat-box" style="color:#ff5555; font-weight:bold;">APR: ${e.apr || 1}</span>

    <span class="stat-box" style="color:#ffee99;">SEQ: ${e.seq}</span>
    <button class="kill-btn" style="float:right;" onclick="killEnemy('${e.id}')">X</button>
</div>
            </div>
        `;
    } else {
        // Standard Hostile Card
        let lootHTML = '';
        if (e.loot) {
            lootHTML = `<div class="loot-box"><span class="loot-header">Confirmed Loot Drop:</span><span class="loot-item">Weapon: <span style="color:var(--primary);">${e.loot.weapon}</span></span><span class="loot-item">Armor: <span style="color:var(--primary);">${e.loot.armor}</span></span><span class="loot-item">Caps: <span class="loot-cap">${e.loot.caps}</span></span><span class="loot-item">Bonus: ${e.loot.bonus || 'None'}</span></div>`;
        }
        
        let attackHTML = '';
        if (e.attackResult) {
            attackHTML = `<div class="combat-log"><div>Rolls: [ ${e.attackResult.rolls} ]</div><div>Hits: ${e.attackResult.hits} | Crits: ${e.attackResult.crits}</div><div class="dmg-total">DMG: ${e.attackResult.total}</div><div style="clear:both;"></div></div>`;
        }

        content = `
          <div class="stat-row">
              <div class="enemy-info">
                <span class="enemy-name">
                    ${e.name} <span style="font-size:0.7em; opacity:0.5;">#${index+1} [SEQ:${e.seq}]</span>
                    <button class="action-btn" onclick="rollAttack('${e.id}')">ROLL ATK</button>
                </span>
                <div class="enemy-stats">
  <span class="stat-box">HP: <input type="number" class="stat-input" value="${e.hp}" onchange="updateStat('${e.id}', 'hp', this.value)"></span>
  <span class="stat-box">DR: <input type="text" class="stat-input" value="${e.dr}" onchange="updateStat('${e.id}', 'dr', this.value)" style="width:100px;"></span>
  
  <span class="stat-box" style="color:#ff5555; font-weight:bold;">APR: ${e.apr}</span>

  <span class="stat-box" style="color:var(--primary);">ATK DICE: ${e.dice_count}</span>
  <span class="stat-box" style="color:#ffee99;">TARGET: ${e.target_dmg}</span>
  <span class="stat-box">PER: ${e.per}</span>
  <button class="kill-btn" onclick="killEnemy('${e.id}')">X</button>
  ${e.note ? `<br/><span style="color:#ffaaaa; font-size:0.8em; text-shadow:1px 1px 0 #000;">NOTE: ${e.note}</span>` : ''}
</div>
              </div>
          </div>
          ${attackHTML}
          ${lootHTML}
        `;
    }

    card.innerHTML = content;
    screen.appendChild(card);
  });
  
 // AUTO-SYNC: Share enemies every render
  try {
    window.parent.sharedEnemies = window.currentEnemies;           // LINE 1
    if (window.parent.syncCombatToMap) window.parent.syncCombatToMap();  // LINE 2
  } catch(e) {}
}


function clearRadar() {
    window.currentEnemies = [];
    turnIndex = 0;
    renderRadar();
    syncToFirebase();
}

function cycleTheme() {
  const body = document.body;
  if (!body.className) body.className = "theme-amber";
  else if (body.className === "theme-amber") body.className = "theme-red";
  else body.className = "";
}
// === ADD THIS HERE ===
function copyEnemiesToMap() {
  const enemiesToCopy = window.currentEnemies.filter(e => !e.style?.includes('player'));
  const jsonString = JSON.stringify(enemiesToCopy, null, 2);
  navigator.clipboard.writeText(jsonString);
  console.log('📋 COPIED', enemiesToCopy.length, 'enemies!');
  alert(`COPIED ${enemiesToCopy.length} ENEMIES!\n\nPASTE THIS IN MAP CONSOLE:\n\nwindow.sharedEnemies = ${jsonString}`);
}
// === END FUNCTION ===

window.onload = function() {
    renderPlayerTokens();
};
