export interface TeamColors {
  primary: string;
  secondary: string;
}
export interface Team {
  name: string;
  shortName: string;
  city: string;
  colors: TeamColors;
  brink: "Austin" | "Jason" | "Both";
  players: string[];
}

export type GameStats = {
  rec: number;
  td: number;
  int: number;
  sack: number;
  safety: number;
  picksix: number;
};
export type GameStatsInstance = {
  [index: string]: GameStats;
};
export type Game = {
  team: string;
  opponent?: string;
  home?: boolean;
  score?: string;
  time?: string;
  stats?: GameStatsInstance;
  notes?: string;
};

export type TeamStats = {
  w: number;
  l: number;
  t: number;
  pct: string;
  pf: number;
  pa: number;
  ppg: number;
  papg: number;
  record: string;
  diff: number;
  strk: string;
};

export interface Image {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}
export type Season = {
  id: string;
  name: string;
  teams: Team[];
  weeks: Week[];
  images?: Image[];
  notes?: string;
};
export type Week = {
  date: string;
  teams: Game[];
};
