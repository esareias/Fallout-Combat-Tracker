// Firebase configuration - YOU'LL NEED TO ADD YOUR OWN CONFIG HERE
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
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Listen for combat data changes
database.ref('combat').on('value', (snapshot) => {
  const data = snapshot.val();
  if (data && data.enemies) {
    renderTurnOrder(data.enemies, data.turnIndex || 0);
    document.getElementById('status').innerText = '🟢 CONNECTED';
  } else {
    showEmptyState();
  }
});

function renderTurnOrder(enemies, currentTurnIndex) {
  const turnOrderDiv = document.getElementById('turn-order');
  const currentTurnDiv = document.getElementById('current-turn-display');
  
  turnOrderDiv.innerHTML = '';
  
  if (!enemies || enemies.length === 0) {
    showEmptyState();
    return;
  }

  // Show current turn banner
  const currentChar = enemies[currentTurnIndex];
  if (currentChar) {
    currentTurnDiv.innerHTML = `
      <div class="current-turn-banner">
        CURRENT TURN: ${currentChar.name}
      </div>
    `;
  }

  enemies.forEach((enemy, index) => {
    const card = document.createElement('div');
    const isActive = (index === currentTurnIndex);
    const isPlayer = enemy.style && (enemy.style.includes('player') || enemy.style.includes('friendly'));
    
    let cardClass = 'turn-card';
    let cardStyle = '';
    
    if (isActive) cardClass += ' active';
    if (isPlayer) {
      cardClass += ' player';
      cardStyle = `--card-color: ${enemy.token_color || '#0088ff'};`;
    }
    
    card.className = cardClass;
    card.setAttribute('style', cardStyle);
    
    // Build stats display
    let statsHTML = `<span class="stat-item">SEQ: ${enemy.seq}</span>`;
    
    // Only show HP/DR for player characters
    if (isPlayer) {
      statsHTML += `<span class="stat-item">HP: ${enemy.hp}</span>`;
      statsHTML += `<span class="stat-item">DR: ${enemy.dr}</span>`;
    }
    
    // Build icon if available
    let iconHTML = '';
    if (enemy.token_src) {
      iconHTML = `<div class="char-icon" style="background-image: url(${enemy.token_src});"></div>`;
    }
    
    card.innerHTML = `
      <div class="turn-number">#${index + 1}</div>
      ${iconHTML}
      <div class="char-info">
        <div class="char-name ${isPlayer ? 'player-name' : ''}">${enemy.name}</div>
        <div class="stats">${statsHTML}</div>
      </div>
    `;
    
    turnOrderDiv.appendChild(card);
  });
}

function showEmptyState() {
  document.getElementById('turn-order').innerHTML = 
    '<div class="empty-state">WAITING FOR COMBAT TO BEGIN...</div>';
  document.getElementById('current-turn-display').innerHTML = '';
  document.getElementById('status').innerText = '🟡 WAITING FOR DM';
}
