// League of Legends Champion Data
// winRate: approximate solo queue win rate (%)
// roles: primary role first
// strongAgainst: champions this champion has an advantage against
// weakAgainst: champions that counter this champion
// type: champion archetype (for team comp analysis)

const CHAMPIONS = {
  // ─── TOP LANERS ───────────────────────────────────────────────
  "Aatrox": {
    roles: ["top"], winRate: 49.5, type: "fighter",
    strongAgainst: ["Cho'Gath", "Nasus", "Renekton"],
    weakAgainst: ["Fiora", "Camille", "Quinn"]
  },
  "Camille": {
    roles: ["top"], winRate: 50.2, type: "fighter",
    strongAgainst: ["Darius", "Renekton", "Irelia"],
    weakAgainst: ["Malphite", "Ornn", "Cho'Gath"]
  },
  "Cho'Gath": {
    roles: ["top"], winRate: 52.1, type: "tank",
    strongAgainst: ["Darius", "Aatrox", "Riven"],
    weakAgainst: ["Irelia", "Jayce", "Kennen"]
  },
  "Darius": {
    roles: ["top"], winRate: 51.3, type: "fighter",
    strongAgainst: ["Garen", "Nasus", "Shen"],
    weakAgainst: ["Teemo", "Camille", "Quinn"]
  },
  "Fiora": {
    roles: ["top"], winRate: 50.8, type: "fighter",
    strongAgainst: ["Garen", "Malphite", "Cho'Gath"],
    weakAgainst: ["Camille", "Riven", "Jax"]
  },
  "Garen": {
    roles: ["top"], winRate: 50.5, type: "tank",
    strongAgainst: ["Nasus", "Teemo", "Cho'Gath"],
    weakAgainst: ["Darius", "Fiora", "Quinn"]
  },
  "Gnar": {
    roles: ["top"], winRate: 49.8, type: "fighter",
    strongAgainst: ["Malphite", "Ornn", "Darius"],
    weakAgainst: ["Irelia", "Camille", "Renekton"]
  },
  "Irelia": {
    roles: ["top", "mid"], winRate: 49.2, type: "fighter",
    strongAgainst: ["Nasus", "Malphite", "Gnar"],
    weakAgainst: ["Camille", "Jayce", "Darius"]
  },
  "Jax": {
    roles: ["top", "jungle"], winRate: 51.0, type: "fighter",
    strongAgainst: ["Malphite", "Garen", "Nasus"],
    weakAgainst: ["Darius", "Fiora", "Camille"]
  },
  "Jayce": {
    roles: ["top", "mid"], winRate: 49.5, type: "fighter",
    strongAgainst: ["Nasus", "Malphite", "Cho'Gath"],
    weakAgainst: ["Irelia", "Camille", "Darius"]
  },
  "Kennen": {
    roles: ["top"], winRate: 50.3, type: "mage",
    strongAgainst: ["Darius", "Nasus", "Ornn"],
    weakAgainst: ["Irelia", "Camille", "Fiora"]
  },
  "Malphite": {
    roles: ["top"], winRate: 51.8, type: "tank",
    strongAgainst: ["Darius", "Riven", "Gnar"],
    weakAgainst: ["Fiora", "Jax", "Kennen"]
  },
  "Nasus": {
    roles: ["top"], winRate: 52.5, type: "tank",
    strongAgainst: ["Garen", "Teemo", "Shen"],
    weakAgainst: ["Darius", "Renekton", "Irelia"]
  },
  "Ornn": {
    roles: ["top"], winRate: 51.2, type: "tank",
    strongAgainst: ["Darius", "Riven", "Aatrox"],
    weakAgainst: ["Jayce", "Kennen", "Gnar"]
  },
  "Quinn": {
    roles: ["top"], winRate: 50.1, type: "marksman",
    strongAgainst: ["Darius", "Nasus", "Garen"],
    weakAgainst: ["Malphite", "Irelia", "Camille"]
  },
  "Renekton": {
    roles: ["top"], winRate: 49.8, type: "fighter",
    strongAgainst: ["Nasus", "Garen", "Cho'Gath"],
    weakAgainst: ["Camille", "Fiora", "Jax"]
  },
  "Riven": {
    roles: ["top"], winRate: 50.4, type: "fighter",
    strongAgainst: ["Malphite", "Nasus", "Garen"],
    weakAgainst: ["Darius", "Camille", "Ornn"]
  },
  "Shen": {
    roles: ["top"], winRate: 51.5, type: "tank",
    strongAgainst: ["Darius", "Renekton", "Aatrox"],
    weakAgainst: ["Fiora", "Jayce", "Kennen"]
  },
  "Teemo": {
    roles: ["top"], winRate: 51.0, type: "mage",
    strongAgainst: ["Nasus", "Darius", "Garen"],
    weakAgainst: ["Irelia", "Camille", "Jax"]
  },

  // ─── JUNGLERS ─────────────────────────────────────────────────
  "Amumu": {
    roles: ["jungle"], winRate: 52.0, type: "tank",
    strongAgainst: ["Nidalee", "Shyvana", "Hecarim"],
    weakAgainst: ["Kha'Zix", "Nocturne", "Lee Sin"]
  },
  "Elise": {
    roles: ["jungle"], winRate: 49.8, type: "mage",
    strongAgainst: ["Amumu", "Warwick", "Nunu"],
    weakAgainst: ["Lee Sin", "Graves", "Kha'Zix"]
  },
  "Graves": {
    roles: ["jungle"], winRate: 51.2, type: "marksman",
    strongAgainst: ["Lee Sin", "Kha'Zix", "Rengar"],
    weakAgainst: ["Hecarim", "Amumu", "Warwick"]
  },
  "Hecarim": {
    roles: ["jungle"], winRate: 51.5, type: "fighter",
    strongAgainst: ["Amumu", "Warwick", "Nidalee"],
    weakAgainst: ["Lee Sin", "Graves", "Elise"]
  },
  "Jarvan IV": {
    roles: ["jungle", "top"], winRate: 50.5, type: "tank",
    strongAgainst: ["Lee Sin", "Nidalee", "Kha'Zix"],
    weakAgainst: ["Hecarim", "Amumu", "Elise"]
  },
  "Kha'Zix": {
    roles: ["jungle"], winRate: 50.2, type: "assassin",
    strongAgainst: ["Lee Sin", "Warwick", "Nunu"],
    weakAgainst: ["Rengar", "Graves", "Jarvan IV"]
  },
  "Kindred": {
    roles: ["jungle"], winRate: 50.8, type: "marksman",
    strongAgainst: ["Nidalee", "Kha'Zix", "Rengar"],
    weakAgainst: ["Hecarim", "Amumu", "Sejuani"]
  },
  "Lee Sin": {
    roles: ["jungle"], winRate: 49.5, type: "fighter",
    strongAgainst: ["Nidalee", "Kindred", "Amumu"],
    weakAgainst: ["Graves", "Elise", "Vi"]
  },
  "Nidalee": {
    roles: ["jungle"], winRate: 50.0, type: "mage",
    strongAgainst: ["Amumu", "Warwick", "Sejuani"],
    weakAgainst: ["Lee Sin", "Hecarim", "Vi"]
  },
  "Nocturne": {
    roles: ["jungle"], winRate: 51.0, type: "assassin",
    strongAgainst: ["Nidalee", "Elise", "Kha'Zix"],
    weakAgainst: ["Lee Sin", "Vi", "Jarvan IV"]
  },
  "Nunu": {
    roles: ["jungle"], winRate: 51.5, type: "tank",
    strongAgainst: ["Shyvana", "Nidalee", "Graves"],
    weakAgainst: ["Lee Sin", "Hecarim", "Vi"]
  },
  "Rengar": {
    roles: ["jungle", "top"], winRate: 49.8, type: "assassin",
    strongAgainst: ["Lee Sin", "Nunu", "Warwick"],
    weakAgainst: ["Kha'Zix", "Graves", "Sejuani"]
  },
  "Sejuani": {
    roles: ["jungle"], winRate: 51.0, type: "tank",
    strongAgainst: ["Kha'Zix", "Rengar", "Lee Sin"],
    weakAgainst: ["Hecarim", "Amumu", "Nidalee"]
  },
  "Shyvana": {
    roles: ["jungle"], winRate: 51.3, type: "fighter",
    strongAgainst: ["Lee Sin", "Kha'Zix", "Graves"],
    weakAgainst: ["Hecarim", "Amumu", "Nunu"]
  },
  "Vi": {
    roles: ["jungle"], winRate: 50.5, type: "fighter",
    strongAgainst: ["Lee Sin", "Kha'Zix", "Nidalee"],
    weakAgainst: ["Hecarim", "Amumu", "Graves"]
  },
  "Volibear": {
    roles: ["jungle", "top"], winRate: 51.0, type: "tank",
    strongAgainst: ["Lee Sin", "Kha'Zix", "Rengar"],
    weakAgainst: ["Hecarim", "Nidalee", "Graves"]
  },
  "Warwick": {
    roles: ["jungle"], winRate: 51.8, type: "tank",
    strongAgainst: ["Nidalee", "Rengar", "Kha'Zix"],
    weakAgainst: ["Lee Sin", "Hecarim", "Elise"]
  },

  // ─── MID LANERS ───────────────────────────────────────────────
  "Ahri": {
    roles: ["mid"], winRate: 51.5, type: "mage",
    strongAgainst: ["Katarina", "Twisted Fate", "Lissandra"],
    weakAgainst: ["Viktor", "Fizz", "LeBlanc"]
  },
  "Akali": {
    roles: ["mid", "top"], winRate: 49.5, type: "assassin",
    strongAgainst: ["Ahri", "Orianna", "Lux"],
    weakAgainst: ["Galio", "Malzahar", "Lissandra"]
  },
  "Azir": {
    roles: ["mid"], winRate: 50.2, type: "mage",
    strongAgainst: ["Zed", "Katarina", "Akali"],
    weakAgainst: ["Fizz", "LeBlanc", "Lissandra"]
  },
  "Cassiopeia": {
    roles: ["mid"], winRate: 51.0, type: "mage",
    strongAgainst: ["Viktor", "Orianna", "Zed"],
    weakAgainst: ["Fizz", "Akali", "LeBlanc"]
  },
  "Corki": {
    roles: ["mid"], winRate: 50.5, type: "marksman",
    strongAgainst: ["Zed", "Katarina", "Akali"],
    weakAgainst: ["Viktor", "Syndra", "Ahri"]
  },
  "Diana": {
    roles: ["mid", "jungle"], winRate: 50.8, type: "mage",
    strongAgainst: ["Lux", "Orianna", "Ahri"],
    weakAgainst: ["Zed", "Fizz", "LeBlanc"]
  },
  "Fizz": {
    roles: ["mid"], winRate: 51.2, type: "assassin",
    strongAgainst: ["Ahri", "Syndra", "Cassiopeia"],
    weakAgainst: ["Galio", "Malzahar", "Vex"]
  },
  "Galio": {
    roles: ["mid", "support"], winRate: 51.5, type: "tank",
    strongAgainst: ["Zed", "Akali", "LeBlanc"],
    weakAgainst: ["Azir", "Orianna", "Ryze"]
  },
  "Katarina": {
    roles: ["mid"], winRate: 50.0, type: "assassin",
    strongAgainst: ["Viktor", "Syndra", "Lux"],
    weakAgainst: ["Ahri", "Galio", "Malzahar"]
  },
  "LeBlanc": {
    roles: ["mid"], winRate: 50.3, type: "assassin",
    strongAgainst: ["Ahri", "Orianna", "Twisted Fate"],
    weakAgainst: ["Lissandra", "Galio", "Malzahar"]
  },
  "Lissandra": {
    roles: ["mid", "top"], winRate: 51.0, type: "mage",
    strongAgainst: ["Yasuo", "Fizz", "Yone"],
    weakAgainst: ["Viktor", "Corki", "Azir"]
  },
  "Lux": {
    roles: ["mid", "support"], winRate: 50.5, type: "mage",
    strongAgainst: ["Katarina", "Zed", "Twisted Fate"],
    weakAgainst: ["Ahri", "LeBlanc", "Akali"]
  },
  "Malzahar": {
    roles: ["mid"], winRate: 51.8, type: "mage",
    strongAgainst: ["Yasuo", "Yone", "Zed"],
    weakAgainst: ["Katarina", "Corki", "Twisted Fate"]
  },
  "Orianna": {
    roles: ["mid"], winRate: 51.2, type: "mage",
    strongAgainst: ["Yasuo", "Zed", "Twisted Fate"],
    weakAgainst: ["Fizz", "Akali", "LeBlanc"]
  },
  "Ryze": {
    roles: ["mid"], winRate: 49.8, type: "mage",
    strongAgainst: ["Ahri", "LeBlanc", "Twisted Fate"],
    weakAgainst: ["Zed", "Katarina", "Corki"]
  },
  "Syndra": {
    roles: ["mid"], winRate: 51.0, type: "mage",
    strongAgainst: ["Ahri", "Viktor", "Zed"],
    weakAgainst: ["Fizz", "Katarina", "LeBlanc"]
  },
  "Twisted Fate": {
    roles: ["mid"], winRate: 50.8, type: "mage",
    strongAgainst: ["Malzahar", "Viktor", "Syndra"],
    weakAgainst: ["Zed", "LeBlanc", "Ahri"]
  },
  "Vex": {
    roles: ["mid"], winRate: 51.5, type: "mage",
    strongAgainst: ["Yasuo", "Yone", "Ahri"],
    weakAgainst: ["Viktor", "Azir", "Orianna"]
  },
  "Viktor": {
    roles: ["mid"], winRate: 52.0, type: "mage",
    strongAgainst: ["Ahri", "LeBlanc", "Twisted Fate"],
    weakAgainst: ["Fizz", "Cassiopeia", "Katarina"]
  },
  "Yasuo": {
    roles: ["mid", "top"], winRate: 49.0, type: "fighter",
    strongAgainst: ["Orianna", "Corki", "Twisted Fate"],
    weakAgainst: ["Malzahar", "Galio", "Vex"]
  },
  "Yone": {
    roles: ["mid", "top"], winRate: 49.5, type: "fighter",
    strongAgainst: ["Lux", "Corki", "Twisted Fate"],
    weakAgainst: ["Malzahar", "Galio", "Vex"]
  },
  "Zed": {
    roles: ["mid"], winRate: 49.8, type: "assassin",
    strongAgainst: ["Lux", "Syndra", "Orianna"],
    weakAgainst: ["Malzahar", "Galio", "Lissandra"]
  },
  "Zoe": {
    roles: ["mid"], winRate: 50.5, type: "mage",
    strongAgainst: ["Viktor", "Syndra", "Orianna"],
    weakAgainst: ["Zed", "Katarina", "LeBlanc"]
  },

  // ─── ADC (BOT CARRY) ──────────────────────────────────────────
  "Ashe": {
    roles: ["adc"], winRate: 51.0, type: "marksman",
    strongAgainst: ["Jinx", "Twitch", "Sivir"],
    weakAgainst: ["Lucian", "Draven", "Tristana"]
  },
  "Caitlyn": {
    roles: ["adc"], winRate: 51.5, type: "marksman",
    strongAgainst: ["Tristana", "Jinx", "Miss Fortune"],
    weakAgainst: ["Draven", "Lucian", "Samira"]
  },
  "Draven": {
    roles: ["adc"], winRate: 50.0, type: "marksman",
    strongAgainst: ["Ashe", "Jinx", "Miss Fortune"],
    weakAgainst: ["Ezreal", "Sivir", "Tristana"]
  },
  "Ezreal": {
    roles: ["adc"], winRate: 50.5, type: "marksman",
    strongAgainst: ["Draven", "Miss Fortune", "Ashe"],
    weakAgainst: ["Caitlyn", "Jinx", "Xayah"]
  },
  "Jhin": {
    roles: ["adc"], winRate: 51.2, type: "marksman",
    strongAgainst: ["Jinx", "Ashe", "Twitch"],
    weakAgainst: ["Lucian", "Draven", "Tristana"]
  },
  "Jinx": {
    roles: ["adc"], winRate: 51.8, type: "marksman",
    strongAgainst: ["Draven", "Ezreal", "Twitch"],
    weakAgainst: ["Caitlyn", "Lucian", "Samira"]
  },
  "Kai'Sa": {
    roles: ["adc"], winRate: 50.8, type: "marksman",
    strongAgainst: ["Jinx", "Twitch", "Sivir"],
    weakAgainst: ["Caitlyn", "Jhin", "Draven"]
  },
  "Lucian": {
    roles: ["adc", "mid"], winRate: 50.5, type: "marksman",
    strongAgainst: ["Jinx", "Ashe", "Sivir"],
    weakAgainst: ["Caitlyn", "Jhin", "Xayah"]
  },
  "Miss Fortune": {
    roles: ["adc"], winRate: 51.0, type: "marksman",
    strongAgainst: ["Jinx", "Ashe", "Twitch"],
    weakAgainst: ["Ezreal", "Kai'Sa", "Xayah"]
  },
  "Samira": {
    roles: ["adc"], winRate: 49.5, type: "marksman",
    strongAgainst: ["Ashe", "Jhin", "Lucian"],
    weakAgainst: ["Caitlyn", "Ezreal", "Jinx"]
  },
  "Sivir": {
    roles: ["adc"], winRate: 51.2, type: "marksman",
    strongAgainst: ["Caitlyn", "Jhin", "Jinx"],
    weakAgainst: ["Draven", "Lucian", "Kai'Sa"]
  },
  "Tristana": {
    roles: ["adc"], winRate: 50.8, type: "marksman",
    strongAgainst: ["Ashe", "Jhin", "Sivir"],
    weakAgainst: ["Caitlyn", "Draven", "Miss Fortune"]
  },
  "Twitch": {
    roles: ["adc"], winRate: 51.5, type: "marksman",
    strongAgainst: ["Jinx", "Jhin", "Sivir"],
    weakAgainst: ["Miss Fortune", "Caitlyn", "Draven"]
  },
  "Vayne": {
    roles: ["adc", "top"], winRate: 49.5, type: "marksman",
    strongAgainst: ["Miss Fortune", "Twitch", "Sivir"],
    weakAgainst: ["Caitlyn", "Draven", "Lucian"]
  },
  "Xayah": {
    roles: ["adc"], winRate: 51.0, type: "marksman",
    strongAgainst: ["Caitlyn", "Jhin", "Lucian"],
    weakAgainst: ["Draven", "Miss Fortune", "Tristana"]
  },
  "Zeri": {
    roles: ["adc"], winRate: 50.2, type: "marksman",
    strongAgainst: ["Jinx", "Jhin", "Ashe"],
    weakAgainst: ["Caitlyn", "Draven", "Lucian"]
  },

  // ─── SUPPORTS ─────────────────────────────────────────────────
  "Alistar": {
    roles: ["support"], winRate: 51.0, type: "tank",
    strongAgainst: ["Soraka", "Nami", "Janna"],
    weakAgainst: ["Lulu", "Morgana", "Zyra"]
  },
  "Bard": {
    roles: ["support"], winRate: 50.5, type: "utility",
    strongAgainst: ["Thresh", "Leona", "Nautilus"],
    weakAgainst: ["Soraka", "Nami", "Lulu"]
  },
  "Blitzcrank": {
    roles: ["support"], winRate: 50.8, type: "tank",
    strongAgainst: ["Soraka", "Janna", "Senna"],
    weakAgainst: ["Morgana", "Lulu", "Thresh"]
  },
  "Braum": {
    roles: ["support"], winRate: 51.5, type: "tank",
    strongAgainst: ["Thresh", "Leona", "Nautilus"],
    weakAgainst: ["Soraka", "Nami", "Lulu"]
  },
  "Janna": {
    roles: ["support"], winRate: 51.0, type: "utility",
    strongAgainst: ["Leona", "Nautilus", "Blitzcrank"],
    weakAgainst: ["Thresh", "Soraka", "Alistar"]
  },
  "Leona": {
    roles: ["support"], winRate: 50.5, type: "tank",
    strongAgainst: ["Soraka", "Nami", "Janna"],
    weakAgainst: ["Morgana", "Lulu", "Senna"]
  },
  "Lulu": {
    roles: ["support"], winRate: 52.0, type: "utility",
    strongAgainst: ["Leona", "Nautilus", "Thresh"],
    weakAgainst: ["Soraka", "Senna", "Bard"]
  },
  "Morgana": {
    roles: ["support", "mid"], winRate: 51.5, type: "mage",
    strongAgainst: ["Blitzcrank", "Leona", "Nautilus"],
    weakAgainst: ["Soraka", "Lulu", "Nami"]
  },
  "Nami": {
    roles: ["support"], winRate: 51.2, type: "utility",
    strongAgainst: ["Leona", "Nautilus", "Thresh"],
    weakAgainst: ["Soraka", "Bard", "Alistar"]
  },
  "Nautilus": {
    roles: ["support"], winRate: 50.8, type: "tank",
    strongAgainst: ["Soraka", "Janna", "Senna"],
    weakAgainst: ["Lulu", "Morgana", "Nami"]
  },
  "Pyke": {
    roles: ["support"], winRate: 50.0, type: "assassin",
    strongAgainst: ["Soraka", "Nami", "Janna"],
    weakAgainst: ["Lulu", "Morgana", "Bard"]
  },
  "Rakan": {
    roles: ["support"], winRate: 50.5, type: "utility",
    strongAgainst: ["Soraka", "Janna", "Senna"],
    weakAgainst: ["Lulu", "Morgana", "Thresh"]
  },
  "Senna": {
    roles: ["support", "adc"], winRate: 51.5, type: "utility",
    strongAgainst: ["Blitzcrank", "Leona", "Nautilus"],
    weakAgainst: ["Nautilus", "Alistar", "Soraka"]
  },
  "Soraka": {
    roles: ["support"], winRate: 52.5, type: "utility",
    strongAgainst: ["Blitzcrank", "Nautilus", "Thresh"],
    weakAgainst: ["Pyke", "Senna", "Alistar"]
  },
  "Thresh": {
    roles: ["support"], winRate: 51.0, type: "tank",
    strongAgainst: ["Soraka", "Nami", "Senna"],
    weakAgainst: ["Blitzcrank", "Nautilus", "Leona"]
  },
  "Zyra": {
    roles: ["support", "mid"], winRate: 50.3, type: "mage",
    strongAgainst: ["Thresh", "Leona", "Blitzcrank"],
    weakAgainst: ["Soraka", "Lulu", "Nami"]
  },
  "Milio": {
    roles: ["support"], winRate: 51.8, type: "utility",
    strongAgainst: ["Leona", "Nautilus", "Blitzcrank"],
    weakAgainst: ["Pyke", "Alistar", "Senna"]
  }
};

// Data Dragon key mapping (name → DDragon internal key)
const DDRAGON_KEYS = {
  "Cho'Gath":     "Chogath",
  "Jarvan IV":    "JarvanIV",
  "Kai'Sa":       "Kaisa",
  "Kha'Zix":      "Khazix",
  "LeBlanc":      "Leblanc",
  "Lee Sin":      "LeeSin",
  "Miss Fortune": "MissFortune",
  "Nunu":         "Nunu",
  "Twisted Fate": "TwistedFate"
};

function getDDragonKey(name) {
  return DDRAGON_KEYS[name] || name.replace(/[^a-zA-Z0-9]/g, '');
}

// Role display names and icons
const ROLE_CONFIG = {
  top:     { label: "Top",     icon: "⚔️"  },
  jungle:  { label: "Jungle",  icon: "🌲"  },
  mid:     { label: "Mid",     icon: "✨"  },
  adc:     { label: "ADC",     icon: "🏹"  },
  support: { label: "Support", icon: "🛡️"  }
};
