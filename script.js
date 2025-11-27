// --- GLOBAL STATE ---
window.currentEnemies = [];
let turnIndex = 0;

// --- ASSETS & CONFIGURATION ---

// 1. VISUAL TOKEN FAMILIES
const VISUAL_ASSETS = {
  GHOUL: "https://i.postimg.cc/gj8NCB8Y/unnamed.jpg",
  SUPER_MUTANT: "https://i.postimg.cc/W3KyLky6/unnamed.jpg",
  ROBOT_GUARD: "https://i.postimg.cc/rsBNgGHD/unnamed.jpg",
  ROBOT_HEAVY: "https://i.postimg.cc/X7gg95g2/unnamed.jpg",
  RAIDER: "https://i.postimg.cc/P5Pd1WjW/unnamed.jpg",
  ELITE_HUMAN: "https://i.postimg.cc/xj3jQj5q/unnamed.jpg",
  POWER_ARMOR: "https://i.postimg.cc/zGBG0mnV/unnamed.jpg",
  DEATHCLAW: "https://i.postimg.cc/R02hWPJq/unnamed.jpg",
  INSECT: "https://i.postimg.cc/yxmD4FdC/unnamed.jpg",
  MUTANT_WILD: "https://i.postimg.cc/tRM6bTJv/unnamed.jpg"
};

// 2. VISUAL MAPPING LOGIC
function getVisualAsset(enemyName) {
    const map = {
        GHOUL: ["Feral Ghoul", "Feral Ghoul Roamer", "Glowing One", "Reaver", "Chinese Remnant", "Trog", "Alien"],
        SUPER_MUTANT: ["Super Mutant", "Super Mutant Brute", "Super Mutant Master", "Behemoth", "Nightkin"],
        RAIDER: ["Raider", "Cannibal", "Slaver", "Heretic", "Blightfire Fuse", "Blightfire Decanus", "Blightfire Pyro"],
        ELITE_HUMAN: ["NCR Remnant", "NCR Ranger Exile", "Headhunter", "Wolfe Merc", "Scout Trooper", "Big Apple Ranger", "Hitman", "Slag"],
        POWER_ARMOR: ["BoS Squad", "Enclave Remnant"],
        ROBOT_GUARD: ["Protectron", "Protect-O-Bot", "Securitron Mk I", "Oculobot"],
        ROBOT_HEAVY: ["Mr Handy", "Mr Gutsy", "Sentry Bot", "Roboscorpion", "Turret", "Securitron Mk II"],
        INSECT: ["Radroach", "Bloatfly", "Giant Ant", "Fire Ant", "Giant Mantid", "Cazador", "Scythewing"],
        DEATHCLAW: ["Deathclaw"],
        MUTANT_WILD: ["Mole Rat", "Pig Rat", "Vicious Dog", "Radscorpion", "Mirelurk", "Moray Eel", "Centaur", "Yao Guai", "Guai Wu", "Nightstalker", "Spore Carrier", "Spore Plant", "Tunneler", "Gecko", "Golden Gecko", "Fire Gecko", "Brahmin"]
    };

    for (const [key, names] of Object.entries(map)) {
        if (names.includes(enemyName)) {
            return VISUAL_ASSETS[key];
        }
    }
    return null;
}

// 3. ENEMY STATS DATABASE
const BESTIARY = {
  "Blightfire Fuse": { "hp": 30, "dr": 1, "per": 5, "dice_count": 4, "target_dmg": 4, "atk": "(Dynamite/Pistol)", "loot_type": "human" },
  "Blightfire Decanus": { "hp": 65, "dr": 3, "per": 6, "dice_count": 6, "target_dmg": 6, "atk": "(Machete/Repeater)", "loot_type": "human" },
  "Blightfire Pyro": { "hp": 50, "dr": 2, "per": 5, "dice_count": 5, "target_dmg": 5, "atk": "(Flamer)", "loot_type": "human" },
  "NCR Remnant": { "hp": 40, "dr": 2, "per": 6, "dice_count": 5, "target_dmg": 5, "atk": "(Service Rifle)", "loot_type": "human" },
  "NCR Ranger Exile": { "hp": 85, "dr": 4, "per": 8, "dice_count": 8, "target_dmg": 8, "atk": "(Big Iron)", "loot_type": "human" },
  "Raider": { "hp": 25, "dr": 1, "per": 5, "dice_count": 3, "target_dmg": 3, "atk": "(Pipe Wep)", "loot_type": "human" },
  "Cannibal": { "hp": 30, "dr": 1, "per": 5, "dice_count": 4, "target_dmg": 4, "atk": "(Melee)", "loot_type": "human" },
  "Slaver": { "hp": 40, "dr": 2, "per": 5, "dice_count": 4, "target_dmg": 4, "atk": "(Gun/Whip)", "loot_type": "human" },
  "Headhunter": { "hp": 70, "dr": 4, "per": 6, "dice_count": 6, "target_dmg": 6, "atk": "(High Tech)", "loot_type": "human" },
  "Wolfe Merc": { "hp": 60, "dr": 3, "per": 6, "dice_count": 6, "target_dmg": 6, "atk": "(Combat Rifle)", "loot_type": "human" },
  "Scout Trooper": { "hp": 50, "dr": 2, "per": 6, "dice_count": 5, "target_dmg": 5, "atk": "(Rifle)", "loot_type": "human" },
  "Big Apple Ranger": { "hp": 55, "dr": 3, "per": 6, "dice_count": 6, "target_dmg": 6, "atk": "(Urban Combat)", "loot_type": "human" },
  "BoS Squad": { "hp": 90, "dr": 5, "per": 7, "dice_count": 7, "target_dmg": 7, "atk": "(Energy Wep)", "loot_type": "human_pa" },
  "Enclave Remnant": { "hp": 85, "dr": 5, "per": 7, "dice_count": 7, "target_dmg": 7, "atk": "(Plasma)", "loot_type": "human_pa" },
  "Hitman": { "hp": 65, "dr": 3, "per": 8, "dice_count": 7, "target_dmg": 7, "atk": "(Sniper)", "loot_type": "human" },
  "Heretic": { "hp": 45, "dr": 2, "per": 5, "dice_count": 5, "target_dmg": 5, "atk": "(Gang Wep)", "loot_type": "human" },
  "Feral Ghoul": { "hp": 25, "dr": 0, "per": 3, "dice_count": 3, "target_dmg": 3, "atk": "(Melee)", "loot_type": "creature" },
  "Feral Ghoul Roamer": { "hp": 50, "dr": 0, "per": 4, "dice_count": 5, "target_dmg": 5, "atk": "(Melee)", "loot_type": "creature" },
  "Glowing One": { "hp": 90, "dr": 0, "per": 5, "dice_count": 8, "target_dmg": 8, "atk": "(Melee)", "note": "Rad Aura", "loot_type": "creature" },
  "Reaver": { "hp": 140, "dr": 2, "per": 6, "dice_count": 7, "target_dmg": 7, "atk": "(Rad Bomb)", "loot_type": "creature" },
  "Chinese Remnant": { "hp": 50, "dr": 0, "per": 5, "dice_count": 6, "target_dmg": 6, "atk": "(Rifle)", "loot_type": "creature" },
  "Trog": { "hp": 35, "dr": 0, "per": 4, "dice_count": 4, "target_dmg": 4, "atk": "(Claws)", "note": "Fast & Vicious", "loot_type": "creature" },
  "Slag": { "hp": 40, "dr": 0, "per": 5, "dice_count": 4, "target_dmg": 4, "atk": "(Melee)", "note": "Dark Vision", "loot_type": "creature" },
  "Super Mutant": { "hp": 100, "dr": 1, "per": 3, "dice_count": 4, "target_dmg": 4, "atk": "(Melee/Rifle)", "loot_type": "human" },
  "Super Mutant Brute": { "hp": 200, "dr": 1, "per": 5, "dice_count": 5, "target_dmg": 5, "atk": "(Melee/Rifle)", "loot_type": "human" },
  "Super Mutant Master": { "hp": 300, "dr": 1, "per": 6, "dice_count": 6, "target_dmg": 6, "atk": "(Rifle)", "loot_type": "human" },
  "Behemoth": { "hp": 2000, "dr": 1, "per": 5, "dice_count": 8, "target_dmg": 8, "atk": "(Melee)", "note": "Immune to Knockdown", "loot_type": "human" },
  "Nightkin": { "hp": 180, "dr": 1, "per": 8, "dice_count": 7, "target_dmg": 7, "atk": "(Stealth Boy)", "loot_type": "human" },
  "Radroach": { "hp": 5, "dr": 0, "per": 3, "dice_count": 2, "target_dmg": 2, "atk": "(Bite)", "loot_type": "creature" },
  "Bloatfly": { "hp": 15, "dr": 0, "per": 5, "dice_count": 2, "target_dmg": 2, "atk": "(Spit)", "loot_type": "creature" },
  "Giant Ant": { "hp": 30, "dr": 0, "per": 3, "dice_count": 3, "target_dmg": 3, "atk": "(Bite)", "loot_type": "creature" },
  "Fire Ant": { "hp": 30, "dr": 0, "per": 3, "dice_count": 7, "target_dmg": 7, "atk": "(Melee/Fire)", "loot_type": "creature" },
  "Mole Rat": { "hp": 25, "dr": 0, "per": 3, "dice_count": 4, "target_dmg": 4, "atk": "(Bite)", "loot_type": "creature" },
  "Pig Rat": { "hp": 60, "dr": 0, "per": 3, "dice_count": 6, "target_dmg": 6, "atk": "(Bite)", "loot_type": "creature" },
  "Vicious Dog": { "hp": 20, "dr": 0, "per": 8, "dice_count": 6, "target_dmg": 6, "atk": "(Bite)", "loot_type": "creature" },
  "Radscorpion": { "hp": 100, "dr": 0, "per": 4, "dice_count": 8, "target_dmg": 8, "atk": "(Poison)", "loot_type": "creature" },
  "Centaur": { "hp": 100, "dr": 0, "per": 9, "dice_count": 7, "target_dmg": 7, "atk": "(Spit)", "loot_type": "creature" },
  "Yao Guai": { "hp": 220, "dr": 0, "per": 7, "dice_count": 10, "target_dmg": 10, "atk": "(Melee)", "loot_type": "creature" },
  "Guai Wu": { "hp": 75, "dr": 0, "per": 8, "dice_count": 6, "target_dmg": 6, "atk": "(Melee)", "note": "Climber", "loot_type": "creature" },
  "Mirelurk": { "hp": 120, "dr": 5, "per": 4, "dice_count": 8, "target_dmg": 8, "atk": "(Melee)", "loot_type": "creature" },
  "Deathclaw": { "hp": 500, "dr": 0, "per": 8, "dice_count": 10, "target_dmg": 10, "atk": "(Melee)", "loot_type": "creature" },
  "Scythewing": { "hp": 200, "dr": 0, "per": 8, "dice_count": 6, "target_dmg": 6, "atk": "(Melee)", "note": "Flying", "loot_type": "creature" },
  "Gecko": { "hp": 30, "dr": 0, "per": 4, "dice_count": 4, "target_dmg": 4, "atk": "(Bite)", "loot_type": "creature" },
  "Golden Gecko": { "hp": 60, "dr": 1, "per": 5, "dice_count": 5, "target_dmg": 5, "atk": "(Rad Bite)", "loot_type": "creature" },
  "Cazador": { "hp": 85, "dr": 0, "per": 9, "dice_count": 7, "target_dmg": 7, "atk": "(Poison)", "note": "Frenzied", "loot_type": "creature" },
  "Nightstalker": { "hp": 65, "dr": 0, "per": 7, "dice_count": 5, "target_dmg": 5, "atk": "(Bite)", "note": "Pack Tactics", "loot_type": "creature" },
  "Spore Carrier": { "hp": 60, "dr": 0, "per": 4, "dice_count": 5, "target_dmg": 5, "atk": "(Melee)", "loot_type": "creature" },
  "Spore Plant": { "hp": 40, "dr": 0, "per": 3, "dice_count": 4, "target_dmg": 4, "atk": "(Spit)", "loot_type": "creature" },
  "Tunneler": { "hp": 65, "dr": 1, "per": 6, "dice_count": 6, "target_dmg": 6, "atk": "(Melee)", "note": "Pack Hunter", "loot_type": "creature" },
  "Giant Mantid": { "hp": 60, "dr": 1, "per": 6, "dice_count": 5, "target_dmg": 5, "atk": "(Claws)", "loot_type": "creature" },
  "Moray Eel": { "hp": 40, "dr": 0, "per": 5, "dice_count": 5, "target_dmg": 5, "atk": "(Bite)", "loot_type": "creature" },
  "Turret": { "hp": 40, "dr": 0, "per": 10, "dice_count": 3, "target_dmg": 3, "atk": "(Gun)", "loot_type": "inorganic" },
  "Oculobot": { "hp": 30, "dr": 0, "per": 5, "dice_count": 3, "target_dmg": 3, "atk": "(Zapper)", "loot_type": "inorganic" },
  "Protectron": { "hp": 75, "dr": 0, "per": 4, "dice_count": 6, "target_dmg": 6, "atk": "(Laser)", "loot_type": "inorganic" },
  "Protect-O-Bot": { "hp": 85, "dr": 0, "per": 4, "dice_count": 6, "target_dmg": 6, "atk": "(Laser)", "note": "Fast Mover", "loot_type": "inorganic" },
  "Mr Handy": { "hp": 100, "dr": 0, "per": 5, "dice_count": 4, "target_dmg": 4, "atk": "(Melee/Fire)", "loot_type": "inorganic" },
  "Mr Gutsy": { "hp": 300, "dr": 0, "per": 6, "dice_count": 8, "target_dmg": 8, "atk": "(Plasma/Gun)", "loot_type": "inorganic" },
  "Sentry Bot": { "hp": 500, "dr": 0, "per": 7, "dice_count": 8, "target_dmg": 8, "atk": "(Minigun/Missile)", "loot_type": "inorganic" },
  "Securitron Mk I": { "hp": 180, "dr": 4, "per": 6, "dice_count": 7, "target_dmg": 7, "atk": "(Gatling)", "loot_type": "inorganic" },
  "Securitron Mk II": { "hp": 250, "dr": 5, "per": 7, "dice_count": 8, "target_dmg": 8, "atk": "(Missile/Laser)", "note": "Regen", "loot_type": "inorganic" },
  "Roboscorpion": { "hp": 150, "dr": 6, "per": 4, "dice_count": 6, "target_dmg": 6, "atk": "(Laser Tail)", "loot_type": "inorganic" },
  "Brahmin": { "hp": 40, "dr": 0, "per": 3, "dice_count": 3, "target_dmg": 3, "atk": "(Melee)", "loot_type": "creature" },
  "Fire Gecko": { "hp": 80, "dr": 2, "per": 5, "dice_count": 6, "target_dmg": 6, "atk": "(Fire Breath)", "loot_type": "creature" },
  "Alien": { "hp": 75, "dr": 2, "per": 8, "dice_count": 8, "target_dmg": 8, "atk": "(Alien Blaster)", "note": "Zetan Tech", "loot_type": "creature" }
};

// 4. LOOT DATABASE
const LOOT_DB = {
  "WEAPONS": [
    { "name": ".22 Pistol", "type": "Small Gun", "dmg": 2 }, { "name": ".32 Revolver", "type": "Small Gun", "dmg": 3 },
    { "name": ".357 Magnum Revolver", "type": "Small Gun", "dmg": 7 }, { "name": ".44 Magnum Revolver", "type": "Small Gun", "dmg": 10 },
    { "name": ".45 Auto Pistol", "type": "Small Gun", "dmg": 8 }, { "name": "5.56mm Pistol", "type": "Small Gun", "dmg": 7 },
    { "name": "9mm Pistol", "type": "Small Gun", "dmg": 4 }, { "name": "10mm Pistol", "type": "Small Gun", "dmg": 5 },
    { "name": "Type 17 Chinese Pistol", "type": "Small Gun", "dmg": 2 }, { "name": "Type 33 Chinese Pistol", "type": "Small Gun", "dmg": 3 },
    { "name": ".45 Auto SMG", "type": "Small Gun", "dmg": 8 }, { "name": "9mm Submachine Gun", "type": "Small Gun", "dmg": 4 },
    { "name": "10mm Submachine Gun", "type": "Small Gun", "dmg": 5 }, { "name": "Type 79 Chinese SMG", "type": "Small Gun", "dmg": 3 },
    { "name": ".308 Hunting Rifle", "type": "Small Gun", "dmg": 13 }, { "name": ".32 Hunting Rifle", "type": "Small Gun", "dmg": 11 },
    { "name": "Anti-Material Rifle", "type": "Small Gun", "dmg": 28 }, { "name": "C98 Assault Carbine", "type": "Small Gun", "dmg": 3 },
    { "name": "R91 Assault Rifle", "type": "Small Gun", "dmg": 4 }, { "name": "Automatic Rifle", "type": "Small Gun", "dmg": 10 },
    { "name": "BB Gun", "type": "Small Gun", "dmg": 1 }, { "name": "Chinese Assault Rifle", "type": "Small Gun", "dmg": 6 },
    { "name": "Lever Action Rifle", "type": "Small Gun", "dmg": 20 }, { "name": "M95 Marksman Carbine", "type": "Small Gun", "dmg": 8 },
    { "name": "M24 Sniper Rifle", "type": "Small Gun", "dmg": 16 }, { "name": "AR20 Service Rifle", "type": "Small Gun", "dmg": 5 },
    { "name": "Varmint Rifle", "type": "Small Gun", "dmg": 2 },
    { "name": "Caravan Shotgun", "type": "Small Gun", "dmg": 11 }, { "name": "Combat Shotgun", "type": "Small Gun", "dmg": 13 },
    { "name": "Double-Barrel Shotgun", "type": "Small Gun", "dmg": 21 }, { "name": "Police Stakeout Shotgun", "type": "Small Gun", "dmg": 12 },
    { "name": "Riot Shotgun", "type": "Small Gun", "dmg": 16 }, { "name": "Sawed-Off Shotgun", "type": "Small Gun", "dmg": 25 },
    { "name": "Single Shotgun", "type": "Small Gun", "dmg": 12 },
    { "name": "Fat Man", "type": "Big Gun", "dmg": 100 }, { "name": "Flamer", "type": "Big Gun", "dmg": 8 },
    { "name": "Gatling Laser", "type": "Big Gun", "dmg": 8 }, { "name": "Heavy Incinerator", "type": "Big Gun", "dmg": 15 },
    { "name": "Incinerator", "type": "Big Gun", "dmg": 10 }, { "name": "Heavy Machinegun", "type": "Big Gun", "dmg": 28 },
    { "name": "Light Machinegun", "type": "Big Gun", "dmg": 6 }, { "name": "Minigun", "type": "Big Gun", "dmg": 4 },
    { "name": "Missile Launcher", "type": "Big Gun", "dmg": 60 }, { "name": "EM Rail Gun", "type": "Big Gun", "dmg": 10 },
    { "name": "Recoilless Rifle", "type": "Big Gun", "dmg": 10 },
    { "name": "Alien Blaster", "type": "Energy Wep", "dmg": 75 }, { "name": "Laser Pistol", "type": "Energy Wep", "dmg": 6 },
    { "name": "Mesmetron", "type": "Energy Wep", "dmg": 1 }, { "name": "Microwave Emitter", "type": "Energy Wep", "dmg": 30 },
    { "name": "Neural Scrambler", "type": "Energy Wep", "dmg": 1 }, { "name": "Plasma Pistol", "type": "Energy Wep", "dmg": 15 },
    { "name": "Pulse Blaster", "type": "Energy Wep", "dmg": 20 }, { "name": "Sonic Emitter", "type": "Energy Wep", "dmg": 10 },
    { "name": "Alien Disintegrator", "type": "Energy Wep", "dmg": 17 }, { "name": "Gauss Rifle", "type": "Energy Wep", "dmg": 50 },
    { "name": "Laser Rifle", "type": "Energy Wep", "dmg": 12 }, { "name": "Plasma Rifle", "type": "Energy Wep", "dmg": 22 },
    { "name": "Multiplas Rifle", "type": "Energy Wep", "dmg": 15 }, { "name": "P94 Plasma Caster", "type": "Energy Wep", "dmg": 32 },
    { "name": "Swift's Pulse Rifle", "type": "Energy Wep", "dmg": 5 }, { "name": "Tesla Cannon", "type": "Energy Wep", "dmg": 40 },
    { "name": "Tri-Beam Laser Rifle", "type": "Energy Wep", "dmg": 12 }, { "name": "Entropy Rifle", "type": "Energy Wep", "dmg": 50 },
    { "name": "Fire Axe", "type": "Melee", "dmg": 10 }, { "name": "Chinese Officer's Sword", "type": "Melee", "dmg": 6 },
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
    { "name": "Frag Grenade", "type": "Explosive", "dmg": 8 }, { "name": "Plasma Grenade", "type": "Explosive", "dmg": 12 },
    { "name": "Pulse Grenade", "type": "Explosive", "dmg": 10 }, { "name": "Nuka Grenade", "type": "Explosive", "dmg": 20 },
    { "name": "Molotov Cocktail", "type": "Explosive", "dmg": 1 }, { "name": "Dynamite", "type": "Explosive", "dmg": 5 }
  ],
  "ARMOR": [
    { "name": "Ragged Outfit", "dr": 0 }, { "name": "Dirty Casualwear", "dr": 0 }, 
    { "name": "Farmhand Clothes", "dr": 0 }, { "name": "Brahmin Skin Outfit", "dr": 0 },
    { "name": "Armored Vault Jumpsuit", "dr": 3 }, { "name": "Reinf. Armored Vault Jumpsuit", "dr": 4 },
    { "name": "Vault Jumpsuit", "dr": 1 }, { "name": "Vault Utility Jumpsuit", "dr": 1 },
    { "name": "Vault Lab Uniform", "dr": 1 }, { "name": "Vault Security Armor", "dr": 3 },
    { "name": "Vault Security Helmet", "dr": 1 },
    { "name": "Wasteland Outfit", "dr": 1 }, { "name": "Roving Trader Outfit", "dr": 1 },
    { "name": "Merc Outfit", "dr": 3 }, { "name": "Wasteland Armor", "dr": 2 },
    { "name": "Raider Armor", "dr": 3 }, { "name": "Raider Helmet", "dr": 1 },
    { "name": "Leather Jacket", "dr": 2 }, { "name": "Gang Member Leather Jacket", "dr": 2 },
    { "name": "Leather Armor", "dr": 3 }, { "name": "Reinforced Leather Armor", "dr": 4 },
    { "name": "Leatherman Patrol Armor", "dr": 4 },
    { "name": "Metal Armor", "dr": 4 }, { "name": "Metal Helmet", "dr": 1 },
    { "name": "Motorcycle Helmet", "dr": 1 }, { "name": "Reinforced Metal Armor", "dr": 5 },
    { "name": "Reinforced Metal Helmet", "dr": 2 }, { "name": "Lightweight Metal Armor", "dr": 3 },
    { "name": "Gamma Shield Armor", "dr": 4 },
    { "name": "Pre-War Tactical Vest", "dr": 2 }, { "name": "Pre-War Riot Gear", "dr": 4 },
    { "name": "Pre-War Riot Helmet", "dr": 1 }, { "name": "Combat Armor", "dr": 4 },
    { "name": "SpecOps Combat Armor", "dr": 4 }, { "name": "Medic Combat Armor", "dr": 4 },
    { "name": "Combat Helmet", "dr": 2 }, { "name": "Headhunter Armor", "dr": 4 },
    { "name": "Deckard Ind. Tactical Armor", "dr": 4 }, { "name": "Recon Armor", "dr": 3 },
    { "name": "Recon Armor Helmet", "dr": 2 }, { "name": "Chinese Jumpsuit", "dr": 2 },
    { "name": "Chinese Stealth Armor", "dr": 3 }, { "name": "US Army Stealth Suit", "dr": 3 },
    { "name": "T-45d Power Armor", "dr": 5 }, { "name": "T-45d Power Armor Helmet", "dr": 3 },
    { "name": "T-51b Power Armor", "dr": 6 }, { "name": "T-51b Power Armor Helmet", "dr": 4 },
    { "name": "T-60b Power Armor", "dr": 8 }, { "name": "T-60b Power Armor Helmet", "dr": 4 },
    { "name": "Outcast Power Armor", "dr": 5 }, { "name": "Outcast Power Armor Helmet", "dr": 3 },
    { "name": "Salvaged Power Armor", "dr": 5 }, { "name": "Salvaged Power Armor Helmet", "dr": 3 },
    { "name": "Enclave Hellfire Armor", "dr": 9 }, { "name": "Advanced Power Armor Mk II", "dr": 10 },
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

// --- PLAYER TOKEN FUNCTIONS ---

function renderPlayerTokens() {
    const panel = document.getElementById('playerTokenPanel');
    panel.innerHTML = '';

    // D10 Button
    const d10Container = document.createElement('div');
    d10Container.className = 'd10-btn';
    
    const d10Val = document.createElement('div');
    d10Val.className = 'd10-val';
    d10Val.innerText = '10';
    
    const d10Label = document.createElement('div');
    d10Label.className = 'd10-label';
    d10Label.innerText = 'ROLL D10';
    
    d10Container.appendChild(d10Val);
    d10Container.appendChild(d10Label);
    
    d10Container.onclick = () => {
        let count = 0;
        const interval = setInterval(() => {
            d10Val.innerText = Math.floor(Math.random() * 10) + 1;
            count++;
            if(count > 8) {
                clearInterval(interval);
                d10Val.innerText = Math.floor(Math.random() * 10) + 1;
            }
        }, 50);
    };

    panel.appendChild(d10Container);

    // Render Players
    TOKEN_PRESETS.forEach(p => {
        const tokenContainer = document.createElement('div');
        tokenContainer.style.display = 'inline-block';
        tokenContainer.style.textAlign = 'center';
        
        const token = document.createElement('div');
        token.className = 'player-token';
        token.style.backgroundImage = `url(${p.src})`;
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
    
    hpInput.value = '';
    drInput.value = '';
    seqInput.value = '';
    
    title.innerText = `DEPLOY: ${preset.name}`;
    overlay.style.display = 'flex';
    
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
        dice_count: "N/A",
        target_dmg: "N/A",
        per: "N/A",
        seq: seq,
        atk: "Player",
        note: "PLAYER CHARACTER",
        loot: null,
        style: "enemy-card player",
        id: Math.random().toString(36).substr(2, 9),
        token_src: preset.src,
        token_color: preset.color
    });
    
    window.currentEnemies.sort((a, b) => b.seq - a.seq);
    renderRadar();
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
    
    let candidates = availableArmor.filter(a => a.dr >= enemyDR);
    
    if (candidates.length === 0) {
        candidates = [availableArmor.sort((a, b) => b.dr - a.dr)[0]]; 
    } else {
        candidates.sort((a, b) => a.dr - b.dr);
        const minValidDR = candidates[0].dr;
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
    "2.0": ["Apex", "Tyrant", "Colossal", "Alpha-Stalker", "Unholy", "Omega", "Nuclear", "Prototype", "Sovereign", "Annihilator", "Apocalyptic", "Monstrous", "Immortal", "Abomination", "God-Tier", "Death-Toll", "Cursed", "Final", "Prime", "Arch-"]
};

function spawnEnemies() {
  const type = document.getElementById('enemyType').value;
  const count = parseInt(document.getElementById('count').value);
  const modifierSelect = document.getElementById('difficulty');
  const modifier = parseFloat(modifierSelect.value);
  
  const baseStats = BESTIARY[type];
  if (!baseStats) return;

  for(let i=0; i<count; i++) {
    let modHP = Math.floor(baseStats.hp * modifier);
    let modDice = Math.ceil(baseStats.dice_count * modifier);
    let modTarget = Math.ceil(baseStats.target_dmg * modifier);
    let modDR = baseStats.dr;
    if (typeof baseStats.dr === 'number' && baseStats.dr > 0) modDR = Math.floor(baseStats.dr * modifier);

    const key = modifier.toString(); 
    let prefixes = PREFIXES[key] || [""];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const finalName = prefix ? `${prefix} ${type}` : type;
    const sequence = baseStats.per + d(10);

    let loot = null;
    if (baseStats.loot_type === 'human' || baseStats.loot_type === 'human_pa') {
        loot = generateHumanLoot({ target_dmg: modTarget, dr: modDR, loot_type: baseStats.loot_type });
    }

    let styleClass = "enemy-card";
    if (modifier >= 2.0) styleClass += " legendary";
    else if (modifier >= 1.5) styleClass += " hard";
    else if (modifier <= 0.75) styleClass += " weak";
    
    const visualUrl = getVisualAsset(type);

    window.currentEnemies.push({
      name: finalName, hp: modHP, dr: modDR, dice_count: modDice, target_dmg: modTarget, per: baseStats.per,
      seq: sequence, atk: baseStats.atk, note: baseStats.note, loot: loot, style: styleClass,
      id: Math.random().toString(36).substr(2, 9),
      token_src: visualUrl,
      token_color: "var(--primary)"
    });
  }
  
  window.currentEnemies.sort((a, b) => b.seq - a.seq);
  renderRadar();
}

function updateStat(id, stat, value) {
    const index = window.currentEnemies.findIndex(e => e.id === id);
    if (index !== -1) {
        if (stat === 'hp') window.currentEnemies[index].hp = parseInt(value) || 0;
        else window.currentEnemies[index][stat] = value;
        renderRadar();
    }
}

function killEnemy(id) {
    const index = window.currentEnemies.findIndex(e => e.id === id);
    if (index !== -1) {
        window.currentEnemies.splice(index, 1);
        renderRadar();
    }
}

function advanceTurn() {
    if (window.currentEnemies.length === 0) return;
    turnIndex = (turnIndex + 1) % window.currentEnemies.length;
    renderRadar();
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
}

function renderRadar() {
  const screen = document.getElementById('screen');
  const overlay = document.getElementById('input-overlay');
  
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
    
    let cardClass = `${e.style} ${isDead ? 'dead' : ''} ${isActive ? 'active' : ''}`;
    let cardStyle = '';

    if (e.token_src) {
        cardStyle += `background-image: url(${e.token_src});`;
    }
    
    if (e.style.includes("player")) {
        cardClass = cardClass.replace('friendly', '');
        cardStyle += `--card-color: ${e.token_color};`;
    }

    card.className = cardClass;
    card.setAttribute('style', cardStyle);
    
    let content = '';

    if (e.style.includes("player") || e.style.includes("friendly")) {
        content = `
            <div class="enemy-info">
                <span class="enemy-name" style="font-size:1.4em; display:block;">
                    ${e.name} ${e.token_color === '#ffffff' ? `[<span style="color:#aaa;">WHITE</span>]` : ''}
                </span>
                <div class="enemy-stats">
                    <span class="stat-box">HP: <input type="text" class="stat-input" value="${e.hp}" onchange="updateStat('${e.id}', 'hp', this.value)"></span>
                    <span class="stat-box">DR: <input type="text" class="stat-input" value="${e.dr}" onchange="updateStat('${e.id}', 'dr', this.value)" style="width:100px;"></span>
                    <span class="stat-box" style="color:#ffee99;">SEQ: ${e.seq}</span>
                    <button class="kill-btn" style="float:right;" onclick="killEnemy('${e.id}')">X</button>
                </div>
            </div>
        `;
    } else {
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
}

function clearRadar() {
    window.currentEnemies = [];
    turnIndex = 0;
    renderRadar();
}

function cycleTheme() {
  const body = document.body;
  if (!body.className) body.className = "theme-amber";
  else if (body.className === "theme-amber") body.className = "theme-red";
  else body.className = "";
}

// --- INITIALIZATION ---
window.onload = function() {
    renderPlayerTokens();
};
