const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Création du schéma de livre
const ChampionSchema = new Schema({
  season: Number,
  createdAt: String,
  date: String,
  gameType: String,
  league: Number,
  matchRegion: String,
  actor: Number,
  role: String,
  abilityUses: Number,
  attachment: Number,
  damageDone: Number,
  damageReceived: Number,
  deaths: Number,
  disablesDone: Number,
  disablesReceived: Number,
  emote: Number,
  energyGained: Number,
  energyUsed: Number,
  healingDone: Number,
  healingReceived: Number,
  kills: Number,
  mount: Number,
  outfit: Number,
  score: Number,
  side: Number,
  timeAlive: Number,
  teammate1: Number,
  teammate2: Number,
  idRoster: Number,
  idTeam: Number,
  opponent1: Number,
  opponent2: Number,
  opponent3: Number,
  idRosterOpponent: Number,
  idTeamOpponent: Number,
  won: String,
});

// Création d'un modèle (nom + schéma)
const Champion = mongoose.model('champion', ChampionSchema);

module.exports = Champion;
