export type Fighter = {
  id: number;
  name: string;
  type: string;
  health: number;
  attack: number;
  defense: number;
  speed: number;
};

export type BattleLog = {
  turn: number;
  attacker: string;
  defender: string;
  damage: number;
  remainingHealth: number;
};

export type BattleResult = {
  winnerId: number;
  turns: number;
  log: BattleLog[];
};

function calcDamage(attacker: Fighter, defender: Fighter): number {
  const damage = attacker.attack - defender.defense * 0.5;
  return Math.max(1, Math.round(damage));
}

export function simulateBattle(c1: Fighter, c2: Fighter): BattleResult {
  // Clonar HP para no mutar
  let hp1 = c1.health;
  let hp2 = c2.health;
  const log: BattleLog[] = [];
  let turn = 1;

  // Quien tiene más speed ataca primero
  let [first, second] = c1.speed >= c2.speed ? [c1, c2] : [c2, c1];
  let [hpFirst, hpSecond] = c1.speed >= c2.speed ? [hp1, hp2] : [hp2, hp1];

  while (hpFirst > 0 && hpSecond > 0) {
    // El primero ataca
    const dmg1 = calcDamage(first, second);
    hpSecond -= dmg1;
    log.push({
      turn,
      attacker: first.name,
      defender: second.name,
      damage: dmg1,
      remainingHealth: Math.max(0, hpSecond),
    });
    if (hpSecond <= 0) break;

    // El segundo contraataca
    const dmg2 = calcDamage(second, first);
    hpFirst -= dmg2;
    log.push({
      turn,
      attacker: second.name,
      defender: first.name,
      damage: dmg2,
      remainingHealth: Math.max(0, hpFirst),
    });

    turn++;
  }

  const winner = hpFirst > 0 ? first : second;

  return { winnerId: winner.id, turns: turn, log };
}