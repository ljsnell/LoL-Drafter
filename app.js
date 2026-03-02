/* LoL Draft Simulator - Main Application */

// ── DRAFT SEQUENCE ─────────────────────────────────────────────
// Standard competitive 10-ban format
// Phase1: 6 bans (B,R,B,R,B,R), 6 picks (B,RR,BB,R)
// Phase2: 4 bans (R,B,R,B),     4 picks (R,BB,R)
const DRAFT_SEQUENCE = [
  // Phase 1 Bans
  { team: 'blue', action: 'ban',  phase: 1 },
  { team: 'red',  action: 'ban',  phase: 1 },
  { team: 'blue', action: 'ban',  phase: 1 },
  { team: 'red',  action: 'ban',  phase: 1 },
  { team: 'blue', action: 'ban',  phase: 1 },
  { team: 'red',  action: 'ban',  phase: 1 },
  // Phase 1 Picks
  { team: 'blue', action: 'pick', phase: 1 },
  { team: 'red',  action: 'pick', phase: 1 },
  { team: 'red',  action: 'pick', phase: 1 },
  { team: 'blue', action: 'pick', phase: 1 },
  { team: 'blue', action: 'pick', phase: 1 },
  { team: 'red',  action: 'pick', phase: 1 },
  // Phase 2 Bans
  { team: 'red',  action: 'ban',  phase: 2 },
  { team: 'blue', action: 'ban',  phase: 2 },
  { team: 'red',  action: 'ban',  phase: 2 },
  { team: 'blue', action: 'ban',  phase: 2 },
  // Phase 2 Picks
  { team: 'red',  action: 'pick', phase: 2 },
  { team: 'blue', action: 'pick', phase: 2 },
  { team: 'blue', action: 'pick', phase: 2 },
  { team: 'red',  action: 'pick', phase: 2 },
];

// ── STATE ──────────────────────────────────────────────────────
let state = {
  currentTurn: 0,
  blueBans:    [],   // champion names (max 5)
  redBans:     [],
  bluePicks:   [],   // champion names (max 5)
  redPicks:    [],
  blueRoleAssign: {}, // { champName: role }  — set during role assignment screen
  redRoleAssign:  {},
  selectedChampion: null,
  roleFilter:  'all',
  searchQuery: '',
  ddVersion:   '14.24.1',
};

// ── INIT ───────────────────────────────────────────────────────
async function init() {
  try {
    const res = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
    const versions = await res.json();
    state.ddVersion = versions[0];
    document.getElementById('patch-info').textContent = `Patch ${state.ddVersion}`;
  } catch (e) {
    // Use fallback version silently
  }

  setupEventListeners();
  renderAll();
}

// ── IMAGE HELPERS ──────────────────────────────────────────────
function getChampImgUrl(name) {
  const key = getDDragonKey(name);
  return `https://ddragon.leagueoflegends.com/cdn/${state.ddVersion}/img/champion/${key}.png`;
}

function imgWithFallback(name, cls = '', style = '') {
  const url = getChampImgUrl(name);
  const key = getDDragonKey(name);
  return `<img src="${url}" alt="${name}" class="${cls}" style="${style}"
    onerror="this.src='https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${key}_0.jpg';this.onerror=null;">`;
}

// ── STATE HELPERS ──────────────────────────────────────────────
function getCurrentAction() {
  if (state.currentTurn >= DRAFT_SEQUENCE.length) return null;
  return DRAFT_SEQUENCE[state.currentTurn];
}

function isChampionAvailable(name) {
  return !state.blueBans.includes(name)
      && !state.redBans.includes(name)
      && !state.bluePicks.includes(name)
      && !state.redPicks.includes(name);
}

function getBlueBanCount() { return state.blueBans.length; }
function getRedBanCount()  { return state.redBans.length; }
function getBlueBanSlotActive() {
  const a = getCurrentAction();
  if (!a || a.action !== 'ban' || a.team !== 'blue') return -1;
  return state.blueBans.length;
}
function getRedBanSlotActive() {
  const a = getCurrentAction();
  if (!a || a.action !== 'ban' || a.team !== 'red') return -1;
  return state.redBans.length;
}
function getBluePickSlotActive() {
  const a = getCurrentAction();
  if (!a || a.action !== 'pick' || a.team !== 'blue') return -1;
  return state.bluePicks.length;
}
function getRedPickSlotActive() {
  const a = getCurrentAction();
  if (!a || a.action !== 'pick' || a.team !== 'red') return -1;
  return state.redPicks.length;
}

// ── RENDERING ─────────────────────────────────────────────────
function renderAll() {
  renderBans('blue');
  renderBans('red');
  renderPicks('blue');
  renderPicks('red');
  renderCenterPanel();
  renderChampionGrid();
}

function renderBans(team) {
  const el = document.getElementById(`${team}-bans`);
  const bans = team === 'blue' ? state.blueBans : state.redBans;
  const activeSlot = team === 'blue' ? getBlueBanSlotActive() : getRedBanSlotActive();
  let html = '';
  for (let i = 0; i < 5; i++) {
    const champion = bans[i];
    const isActive = (i === activeSlot);
    let cls = 'ban-slot';
    if (isActive) cls += ' active';
    if (champion) cls += ' has-ban';
    html += `<div class="${cls}" title="${champion || (isActive ? 'BAN NOW' : '')}">`;
    if (champion) {
      html += imgWithFallback(champion);
    }
    html += `</div>`;
  }
  el.innerHTML = html;
}

function renderPicks(team) {
  const el = document.getElementById(`${team}-picks`);
  const picks = team === 'blue' ? state.bluePicks : state.redPicks;
  const activeSlot = team === 'blue' ? getBluePickSlotActive() : getRedPickSlotActive();
  const isBlue = team === 'blue';
  let html = '';
  for (let i = 0; i < 5; i++) {
    const champion = picks[i];
    const isActive = (i === activeSlot);
    let cls = 'pick-slot';
    if (isActive) cls += ' active';
    if (champion) cls += ' has-pick';
    html += `<div class="${cls}">`;
    if (champion) {
      const data = CHAMPIONS[champion];
      const role = data ? data.roles[0] : '';
      const wr = data ? data.winRate.toFixed(1) : '';
      html += imgWithFallback(champion, 'pick-img');
      html += `<div class="pick-info">
        <div class="pick-name">${champion}</div>
        <div class="pick-role">${ROLE_CONFIG[role]?.label || ''}</div>
      </div>
      <div class="pick-wr" style="padding:0 6px;font-size:0.68rem;">${wr}%</div>`;
    } else {
      const slotNum = i + 1;
      html += `<span class="pick-slot-num">${slotNum}</span>`;
      if (isActive) {
        html += `<span style="font-size:0.72rem;color:var(--text-muted);padding-left:4px;">Select champion...</span>`;
      }
    }
    html += `</div>`;
  }
  el.innerHTML = html;
}

function renderCenterPanel() {
  const action = getCurrentAction();
  const phaseActionEl = document.getElementById('phase-action');
  const phaseLabelEl  = document.getElementById('phase-label');
  const phaseSubEl    = document.getElementById('phase-sub');
  const confirmBtn    = document.getElementById('confirm-btn');

  if (!action) {
    phaseActionEl.textContent = 'DRAFT COMPLETE';
    phaseActionEl.className = 'gold-action';
    phaseLabelEl.textContent  = '';
    phaseSubEl.textContent    = '';
    confirmBtn.disabled = true;
    return;
  }

  const teamName  = action.team === 'blue' ? 'BLUE' : 'RED';
  const actName   = action.action === 'ban' ? 'BAN' : 'PICK';
  const phaseName = `Phase ${action.phase} · ${action.action === 'ban' ? 'Ban' : 'Pick'} Phase`;

  phaseActionEl.textContent = `${teamName} · ${actName}`;
  phaseActionEl.className = action.team === 'blue' ? 'blue-action' : 'red-action';
  phaseLabelEl.textContent  = phaseName;
  phaseSubEl.textContent    = action.action === 'ban'
    ? `${teamName} side selects a champion to ban`
    : `${teamName} side selects a champion to pick`;

  confirmBtn.disabled = !state.selectedChampion;
  confirmBtn.textContent = action.action === 'ban' ? 'BAN CHAMPION' : 'LOCK IN';

  renderSelectedPreview();
  renderTurnBar();
}

function renderSelectedPreview() {
  const el = document.getElementById('selected-preview');
  if (!state.selectedChampion) {
    el.innerHTML = `<div class="no-selection">Click a champion to select</div>`;
    return;
  }
  const name = state.selectedChampion;
  const data = CHAMPIONS[name];
  const role = data ? ROLE_CONFIG[data.roles[0]]?.label : '';
  el.innerHTML = `
    <div class="preview-img-wrap">${imgWithFallback(name, '', 'width:100%;height:100%;object-fit:cover;')}</div>
    <div class="preview-name">${name}</div>
    <div class="preview-stats">${role} · ${data?.winRate.toFixed(1)}% WR</div>
  `;
}

function renderTurnBar() {
  const el = document.getElementById('turn-bar');
  let html = '';
  for (let i = 0; i < DRAFT_SEQUENCE.length; i++) {
    const s = DRAFT_SEQUENCE[i];
    let cls = 'turn-pip';
    if (i < state.currentTurn) cls += ' done';
    else if (i === state.currentTurn) cls += ` current ${s.team}-pip`;
    html += `<div class="${cls}" title="${s.team} ${s.action}"></div>`;
  }
  el.innerHTML = html;
}

function renderChampionGrid() {
  const el = document.getElementById('champion-grid');
  const query = state.searchQuery.toLowerCase();
  const role  = state.roleFilter;

  const names = Object.keys(CHAMPIONS)
    .filter(name => {
      if (query && !name.toLowerCase().includes(query)) return false;
      if (role !== 'all' && !CHAMPIONS[name].roles.includes(role)) return false;
      return true;
    })
    .sort();

  let html = '';
  for (const name of names) {
    const available = isChampionAvailable(name);
    const selected  = (state.selectedChampion === name);
    let cls = 'champ-card';
    if (!available) cls += ' unavailable';
    if (selected)   cls += ' selected';

    html += `<div class="${cls}" data-name="${name}" title="${name}">`;
    html += imgWithFallback(name);
    html += `<div class="champ-wr">${CHAMPIONS[name].winRate.toFixed(1)}%</div>`;
    html += `<div class="champ-name">${name}</div>`;
    html += `</div>`;
  }
  el.innerHTML = html || `<div style="color:var(--text-muted);padding:20px;grid-column:1/-1;text-align:center;">No champions found</div>`;
}

// ── EVENT HANDLERS ─────────────────────────────────────────────
function setupEventListeners() {
  // Champion grid - event delegation
  document.getElementById('champion-grid').addEventListener('click', e => {
    const card = e.target.closest('.champ-card');
    if (card) onChampClick(card.dataset.name);
  });

  // Search
  document.getElementById('search-input').addEventListener('input', e => {
    state.searchQuery = e.target.value;
    renderChampionGrid();
  });

  // Role filters
  document.querySelectorAll('.role-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.roleFilter = btn.dataset.role;
      renderChampionGrid();
    });
  });

  // Confirm / Lock in
  document.getElementById('confirm-btn').addEventListener('click', confirmSelection);

  // Reset
  document.getElementById('reset-btn').addEventListener('click', resetDraft);
}

function onChampClick(name) {
  if (!isChampionAvailable(name)) return;
  if (!getCurrentAction()) return;

  if (state.selectedChampion === name) {
    // Double-click/same champion confirms immediately
    confirmSelection();
    return;
  }
  state.selectedChampion = name;
  renderChampionGrid();
  renderSelectedPreview();
  renderCenterPanel();
}

function confirmSelection() {
  const action = getCurrentAction();
  if (!action || !state.selectedChampion) return;
  if (!isChampionAvailable(state.selectedChampion)) return;

  const champ = state.selectedChampion;
  if (action.action === 'ban') {
    if (action.team === 'blue') state.blueBans.push(champ);
    else                        state.redBans.push(champ);
  } else {
    if (action.team === 'blue') state.bluePicks.push(champ);
    else                        state.redPicks.push(champ);
  }

  state.selectedChampion = null;
  state.currentTurn++;

  if (state.currentTurn >= DRAFT_SEQUENCE.length) {
    renderAll();
    setTimeout(showRoleAssignment, 300);
  } else {
    renderAll();
  }
}

// ── WIN ANALYSIS ───────────────────────────────────────────────
function assignRoles(picks) {
  const roles = ['top', 'jungle', 'mid', 'adc', 'support'];
  const assigned = {};
  const remaining = [...picks];

  // First pass: assign to primary role
  for (const role of roles) {
    if (assigned[role]) continue;
    const idx = remaining.findIndex(c => CHAMPIONS[c]?.roles[0] === role);
    if (idx >= 0) {
      assigned[role] = remaining.splice(idx, 1)[0];
    }
  }
  // Second pass: fill gaps with any matching secondary role
  for (const role of roles) {
    if (assigned[role]) continue;
    const idx = remaining.findIndex(c => CHAMPIONS[c]?.roles.includes(role));
    if (idx >= 0) {
      assigned[role] = remaining.splice(idx, 1)[0];
    }
  }
  // Third pass: fill anything left
  let ri = 0;
  for (const role of roles) {
    if (!assigned[role] && remaining.length > ri) {
      assigned[role] = remaining[ri++];
    }
  }
  return assigned;
}

function analyzeTeamComp(picks) {
  const types = picks.map(c => CHAMPIONS[c]?.type || '');
  let bonus = 0;
  const tankCount     = types.filter(t => t === 'tank').length;
  const assassinCount = types.filter(t => t === 'assassin').length;
  const mageCount     = types.filter(t => t === 'mage').length;
  const utilCount     = types.filter(t => t === 'utility').length;

  if (tankCount >= 2) bonus += 1.5;            // Frontline presence
  if (mageCount >= 2 && tankCount >= 1) bonus += 1; // Balanced engage+damage
  if (assassinCount >= 3) bonus -= 1;           // Too squishy
  if (utilCount >= 2) bonus += 1;               // Utility backbone
  return { bonus, tankCount, assassinCount, mageCount, utilCount };
}

function calculateWinProbability() {
  const blue = state.bluePicks;
  const red  = state.redPicks;

  const avg = arr => arr.reduce((s, c) => s + (CHAMPIONS[c]?.winRate || 50), 0) / arr.length;
  let blueBase = avg(blue);
  let redBase  = avg(red);

  // Matchup bonuses
  let blueMatchup = 0, redMatchup = 0;
  const matchups = [];
  const checkedPairs = new Set();

  for (const bc of blue) {
    const bd = CHAMPIONS[bc];
    if (!bd) continue;
    for (const rc of red) {
      const rd = CHAMPIONS[rc];
      if (!rd) continue;
      const pairKey = `${bc}__${rc}`;
      if (checkedPairs.has(pairKey)) continue;
      checkedPairs.add(pairKey);

      const blueRole = state.blueRoleAssign[bc];
      const redRole  = state.redRoleAssign[rc];
      const sameLane = blueRole && redRole && blueRole === redRole;
      const bonus    = sameLane ? 2.5 : 1.5;

      if (bd.strongAgainst?.includes(rc)) {
        blueMatchup += bonus;
        matchups.push({ winner: bc, loser: rc, team: 'blue', bonus: `+${bonus}%`, sameLane, lane: blueRole });
      }
      if (rd.strongAgainst?.includes(bc)) {
        redMatchup += bonus;
        matchups.push({ winner: rc, loser: bc, team: 'red', bonus: `+${bonus}%`, sameLane, lane: redRole });
      }
    }
  }

  // Cap matchup bonus
  blueMatchup = Math.min(blueMatchup, 10);
  redMatchup  = Math.min(redMatchup,  10);

  // Team composition
  const blueComp = analyzeTeamComp(blue);
  const redComp  = analyzeTeamComp(red);

  const blueTotal = blueBase + blueMatchup + blueComp.bonus;
  const redTotal  = redBase  + redMatchup  + redComp.bonus;

  // Normalize to percentage (relative probability)
  const sum = blueTotal + redTotal;
  const blueWinProb = Math.round((blueTotal / sum) * 100);
  const redWinProb  = 100 - blueWinProb;

  return {
    blueWinProb,
    redWinProb,
    blueBase:    blueBase.toFixed(1),
    redBase:     redBase.toFixed(1),
    blueMatchup: blueMatchup.toFixed(1),
    redMatchup:  redMatchup.toFixed(1),
    blueComp:    blueComp.bonus.toFixed(1),
    redComp:     redComp.bonus.toFixed(1),
    blueTotal:   blueTotal.toFixed(1),
    redTotal:    redTotal.toFixed(1),
    matchups,
    winner: blueWinProb >= redWinProb ? 'blue' : 'red',
  };
}

// ── RESULTS MODAL ──────────────────────────────────────────────
function showResults() {
  const result = calculateWinProbability();
  const modal  = document.getElementById('results-modal');
  const content = document.getElementById('results-content');

  // Build role→champ maps from user assignments (invert champ→role)
  const blueRoles = invertRoleAssign(state.blueRoleAssign);
  const redRoles  = invertRoleAssign(state.redRoleAssign);

  // Winner banner
  const winnerName = result.winner === 'blue' ? 'BLUE SIDE WINS' : 'RED SIDE WINS';
  const winnerProb = result.winner === 'blue' ? result.blueWinProb : result.redWinProb;

  // Team rows builder
  function teamRows(roles, picks) {
    const roleOrder = ['top', 'jungle', 'mid', 'adc', 'support'];
    const reverseMap = {};
    for (const [role, champ] of Object.entries(roles)) reverseMap[champ] = role;
    return roleOrder.map(role => {
      const champ = roles[role];
      if (!champ) return '';
      const data = CHAMPIONS[champ];
      const wr = data?.winRate || 50;
      const wrCls = wr >= 52 ? 'wr-high' : wr >= 50 ? 'wr-mid' : 'wr-low';
      return `<div class="result-champ-row">
        ${imgWithFallback(champ, '', 'width:36px;height:36px;border-radius:3px;object-fit:cover;')}
        <div class="result-champ-info">
          <div class="result-champ-name">${champ}</div>
          <div class="result-champ-role">${ROLE_CONFIG[role]?.label || role}</div>
        </div>
        <div class="result-wr ${wrCls}">${wr.toFixed(1)}%</div>
      </div>`;
    }).join('');
  }

  // Matchup rows — sort: same-lane first
  const sortedMatchups = [...result.matchups].sort((a, b) => (b.sameLane ? 1 : 0) - (a.sameLane ? 1 : 0));
  const matchupHtml = sortedMatchups.length
    ? sortedMatchups.map(m => {
        const laneTag = m.sameLane && m.lane
          ? `<span class="adv-lane">${ROLE_CONFIG[m.lane]?.label}</span>`
          : (m.lane ? `<span class="adv-lane adv-lane-cross">${ROLE_CONFIG[m.lane]?.label}</span>` : '');
        return `<div class="matchup-item ${m.team}-advantage${m.sameLane ? ' same-lane' : ''}">
          ${laneTag}
          <span class="adv-champ">${m.winner}</span>
          <span class="adv-vs"> counters </span>
          <span class="adv-target">${m.loser}</span>
          <span class="adv-bonus">${m.bonus}</span>
        </div>`;
      }).join('')
    : `<div class="no-matchups">No direct counterpick advantages found</div>`;

  content.innerHTML = `
    <h2>Draft Complete — Results</h2>

    <div id="winner-banner" class="${result.winner}-wins">
      <div id="winner-text">${winnerName}</div>
      <div id="winner-prob">Predicted win probability: ${winnerProb}%</div>
    </div>

    <div id="prob-bar-wrap">
      <div id="prob-bar-labels">
        <span class="prob-blue">Blue ${result.blueWinProb}%</span>
        <span class="prob-red">Red ${result.redWinProb}%</span>
      </div>
      <div id="prob-bar">
        <div id="prob-fill-blue" style="width:${result.blueWinProb}%"></div>
      </div>
    </div>

    <div id="teams-grid">
      <div class="result-team">
        <div class="result-team-header blue-team-header">Blue Side</div>
        ${teamRows(blueRoles, state.bluePicks)}
      </div>
      <div class="result-team">
        <div class="result-team-header red-team-header">Red Side</div>
        ${teamRows(redRoles, state.redPicks)}
      </div>
    </div>

    <div id="matchup-section">
      <h3>Counterpick Advantages</h3>
      <div class="matchup-list">${matchupHtml}</div>
    </div>

    <div id="score-breakdown">
      <div>
        <div class="score-row">
          <span class="score-label">Base Win Rate</span>
          <span class="score-val-blue">${result.blueBase}%</span>
        </div>
        <div class="score-row">
          <span class="score-label">Matchup Bonus</span>
          <span class="score-val-blue">+${result.blueMatchup}%</span>
        </div>
        <div class="score-row">
          <span class="score-label">Comp Bonus</span>
          <span class="score-val-blue">+${result.blueComp}%</span>
        </div>
        <div class="score-row">
          <span class="score-label">Blue Score</span>
          <span class="score-val-blue">${result.blueTotal}</span>
        </div>
      </div>
      <div>
        <div class="score-row">
          <span class="score-label">Base Win Rate</span>
          <span class="score-val-red">${result.redBase}%</span>
        </div>
        <div class="score-row">
          <span class="score-label">Matchup Bonus</span>
          <span class="score-val-red">+${result.redMatchup}%</span>
        </div>
        <div class="score-row">
          <span class="score-label">Comp Bonus</span>
          <span class="score-val-red">+${result.redComp}%</span>
        </div>
        <div class="score-row">
          <span class="score-label">Red Score</span>
          <span class="score-val-red">${result.redTotal}</span>
        </div>
      </div>
    </div>

    <div class="results-footer">
      <button id="back-to-roles-btn">← Edit Roles</button>
      <button id="reset-btn">New Draft</button>
    </div>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('fade-in');

  document.getElementById('reset-btn').addEventListener('click', resetDraft);
  document.getElementById('back-to-roles-btn').addEventListener('click', showRoleAssignment);
}

// ── RESET ──────────────────────────────────────────────────────
function resetDraft() {
  state.currentTurn      = 0;
  state.blueBans         = [];
  state.redBans          = [];
  state.bluePicks        = [];
  state.redPicks         = [];
  state.blueRoleAssign   = {};
  state.redRoleAssign    = {};
  state.selectedChampion = null;
  state.roleFilter       = 'all';
  state.searchQuery      = '';
  document.getElementById('results-modal').removeEventListener('click', onRoleModalClick);

  document.getElementById('search-input').value = '';
  document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('.role-btn[data-role="all"]').classList.add('active');
  document.getElementById('results-modal').classList.add('hidden');

  renderAll();
}

// ── ROLE ASSIGNMENT ────────────────────────────────────────────
function escapeAttr(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function invertRoleAssign(assignments) {
  // { champName: role } → { role: champName }
  const result = {};
  for (const [champ, role] of Object.entries(assignments)) result[role] = champ;
  return result;
}

function isRoleAssignValid(team) {
  const assignments = team === 'blue' ? state.blueRoleAssign : state.redRoleAssign;
  const vals = Object.values(assignments);
  const roles = ['top', 'jungle', 'mid', 'adc', 'support'];
  return vals.length === 5 && roles.every(r => vals.includes(r));
}

function showRoleAssignment() {
  // Pre-fill with smart auto-suggestions
  const blueAuto = assignRoles(state.bluePicks);
  const redAuto  = assignRoles(state.redPicks);
  state.blueRoleAssign = {};
  state.redRoleAssign  = {};
  for (const [role, champ] of Object.entries(blueAuto)) { if (champ) state.blueRoleAssign[champ] = role; }
  for (const [role, champ] of Object.entries(redAuto))  { if (champ) state.redRoleAssign[champ]  = role; }

  const modal = document.getElementById('results-modal');
  modal.removeEventListener('click', onRoleModalClick);
  modal.addEventListener('click', onRoleModalClick);

  renderRoleAssignment();
  modal.classList.remove('hidden');
}

function renderRoleAssignment() {
  document.getElementById('results-content').innerHTML = buildRoleAssignHTML();
}

function buildRoleAssignHTML() {
  const ROLES = ['top', 'jungle', 'mid', 'adc', 'support'];
  const blueValid = isRoleAssignValid('blue');
  const redValid  = isRoleAssignValid('red');
  const allValid  = blueValid && redValid;

  function teamHTML(team, picks) {
    const assignments = team === 'blue' ? state.blueRoleAssign : state.redRoleAssign;
    const usedRoles   = new Set(Object.values(assignments));

    return picks.map(champ => {
      const assignedRole = assignments[champ];
      const champAttr    = escapeAttr(champ);

      const roleBtns = ROLES.map(role => {
        const isSelected = assignedRole === role;
        const isTaken    = usedRoles.has(role) && !isSelected;
        let cls = 'ra-role-btn';
        if (isSelected) cls += ' ra-selected';
        if (isTaken)    cls += ' ra-taken';
        return `<button class="${cls}"
          data-team="${team}" data-champ="${champAttr}" data-role="${role}">${ROLE_CONFIG[role].label}</button>`;
      }).join('');

      const rowCls = assignedRole ? 'ra-row ra-assigned' : 'ra-row ra-unassigned';
      return `<div class="${rowCls}">
        <div class="ra-champ">
          ${imgWithFallback(champ, '', 'width:40px;height:40px;border-radius:3px;object-fit:cover;flex-shrink:0;')}
          <div class="ra-champ-info">
            <div class="ra-champ-name">${champ}</div>
            <div class="ra-champ-meta">${CHAMPIONS[champ]?.winRate.toFixed(1)}% WR</div>
          </div>
        </div>
        <div class="ra-role-btns">${roleBtns}</div>
        <div class="ra-assigned-badge">${assignedRole ? ROLE_CONFIG[assignedRole].label : ''}</div>
      </div>`;
    }).join('');
  }

  return `
    <h2>Assign Roles</h2>
    <p class="ra-subtitle">Assign each champion to their lane — roles snap to prevent duplicates</p>

    <div id="ra-grid">
      <div class="ra-team">
        <div class="result-team-header blue-team-header">
          Blue Side${blueValid ? ' <span class="ra-check">✓</span>' : ''}
        </div>
        ${teamHTML('blue', state.bluePicks)}
      </div>
      <div class="ra-team">
        <div class="result-team-header red-team-header">
          Red Side${redValid ? ' <span class="ra-check">✓</span>' : ''}
        </div>
        ${teamHTML('red', state.redPicks)}
      </div>
    </div>

    <div class="ra-actions">
      <button id="ra-autofill" class="ra-autofill-btn">↺ Reset Suggestions</button>
      <button id="ra-analyze"  class="ra-analyze-btn" ${allValid ? '' : 'disabled'}>
        Analyze Draft →
      </button>
    </div>
    <button id="reset-btn" class="ra-reset-btn">New Draft</button>
  `;
}

function onRoleModalClick(e) {
  // Role button
  const roleBtn = e.target.closest('[data-role][data-champ]');
  if (roleBtn) {
    const { team, champ, role } = roleBtn.dataset;
    const assignments = team === 'blue' ? state.blueRoleAssign : state.redRoleAssign;

    // Check BEFORE any mutation whether this champ already owns this role
    const alreadySelected = assignments[champ] === role;

    if (alreadySelected) {
      // Toggle off — unassign
      delete assignments[champ];
    } else {
      // Remove whichever champion currently holds this role (swap)
      for (const [c, r] of Object.entries(assignments)) {
        if (r === role) delete assignments[c];
      }
      assignments[champ] = role;
    }

    renderRoleAssignment();
    return;
  }

  // Auto-fill
  if (e.target.closest('#ra-autofill')) {
    const blueAuto = assignRoles(state.bluePicks);
    const redAuto  = assignRoles(state.redPicks);
    state.blueRoleAssign = {};
    state.redRoleAssign  = {};
    for (const [role, champ] of Object.entries(blueAuto)) { if (champ) state.blueRoleAssign[champ] = role; }
    for (const [role, champ] of Object.entries(redAuto))  { if (champ) state.redRoleAssign[champ]  = role; }
    renderRoleAssignment();
    return;
  }

  // Analyze
  const analyzeBtn = e.target.closest('#ra-analyze');
  if (analyzeBtn && !analyzeBtn.disabled) {
    document.getElementById('results-modal').removeEventListener('click', onRoleModalClick);
    showResults();
    return;
  }

  // Reset / New Draft
  if (e.target.closest('#reset-btn')) {
    resetDraft();
  }
}

// ── START ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', init);
