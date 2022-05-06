export type bomb = {
  value: number
  unit: "Mt" | "Kt"
  price: number
}

type bombPool = {
  [bombName: string]: bomb
}

type bombsI = { bombs: bombPool; limit: number }[]

const diamondPool: bombPool = {
  "Mk-41": { value: 2.5, unit: "Mt", price: 300000 },
  "MK-17": { value: 1.5, unit: "Mt", price: 150000 },
  "Mk-24": { value: 1.5, unit: "Mt", price: 150000 },
  "EC 24": { value: 1.2, unit: "Mt", price: 130000 },
  "EC-17": { value: 1.1, unit: "Mt", price: 100000 },
  Agni: { value: 1, unit: "Mt", price: 95000 },
  "Hiroshima 2.O": { value: 1.3, unit: "Mt", price: 135000 },
  "Nagasaki 2.O": { value: 1, unit: "Mt", price: 97000 },
}

const platinumPool: bombPool = {
  "Mk-53": { value: 0.9, unit: "Mt", price: 100000 },
  "TX-16": { value: 0.8, unit: "Mt", price: 85000 },
  "Mk-39": { value: 0.4, unit: "Mt", price: 60000 },
  "MK-15": { value: 0.4, unit: "Mt", price: 50000 },
  "Mk-36": { value: 1, unit: "Mt", price: 95000 },
  Firecracker: { value: 0.7, unit: "Mt", price: 70000 },
  "Mk-34": { value: 0.6, unit: "Mt", price: 65000 },
  "BC-27": { value: 0.5, unit: "Mt", price: 60000 },
}

const goldPool: bombPool = {
  "B-81": { value: 0.1, unit: "Mt", price: 30000 },
  "Mk-28": { value: 0.145, unit: "Mt", price: 30000 },
  "B-83": { value: 0.1, unit: "Mt", price: 28000 },
  "Mk-43": { value: 0.1, unit: "Mt", price: 25000 },
  "MK-18": { value: 50, unit: "Kt", price: 12000 },
  "B-27": { value: 60, unit: "Kt", price: 11000 },
  "B-16": { value: 90, unit: "Kt", price: 20000 },
  "MK-27": { value: 95, unit: "Kt", price: 22000 },
}

const silverPool: bombPool = {
  "Mk-7": { value: 6.1, unit: "Kt", price: 2000 },
  "MK/B 61": { value: 34, unit: "Kt", price: 10000 },
  "B 90": { value: 20, unit: "Kt", price: 6000 },
  "Mk-6": { value: 16, unit: "Kt", price: 4000 },
  "Mk-5": { value: 12, unit: "Kt", price: 4000 },
  "L T 389": { value: 26, unit: "Kt", price: 9000 },
  "Laser Bomb": { value: 30, unit: "Kt", price: 9500 },
  "Mega Unguided": { value: 24, unit: "Kt", price: 7500 },
}

const bronzePool: bombPool = {
  "Mk-III": { value: 49, unit: "Kt", price: 1000 },
  "Mk-8": { value: 30, unit: "Kt", price: 800 },
  "Mk-21": { value: 5, unit: "Kt", price: 100 },
  "MK-13": { value: 32, unit: "Kt", price: 800 },
  "Mk-4": { value: 31, unit: "Kt", price: 700 },
  "Mk-57": { value: 20, unit: "Kt", price: 600 },
  "Mk-I": { value: 16, unit: "Kt", price: 400 },
  "Mk-12": { value: 14, unit: "Kt", price: 400 },
  "Block Buster": { value: 15, unit: "Kt", price: 420 },
  "Glide bomb": { value: 28, unit: "Kt", price: 650 },
  "Pressure Bomb": { value: 30, unit: "Kt", price: 700 },
}

export enum POOL {
  DIAMOND = 0,
  PLATINUM = 1,
  GOLD = 2,
  SILVER = 3,
  BRONZE = 4,
}

const allBombs: bombsI = [
  { bombs: diamondPool, limit: 3 },
  {
    bombs: platinumPool,
    limit: 8,
  },
  {
    bombs: goldPool,
    limit: 52,
  },
  {
    bombs: silverPool,
    limit: 74,
  },
  {
    bombs: bronzePool,
    limit: 100,
  },
]

export const findBombByName = (
  bombName: string
): ({ bombName: string; limit: number; pool: number } & bomb) | undefined => {
  let bomb:
    | ({ bombName: string; limit: number; pool: number } & bomb)
    | undefined

  for (let i = 0; i < allBombs.length; i++)
    if (allBombs[i].bombs[bombName]) {
      bomb = {
        bombName,
        limit: allBombs[i].limit,
        ...allBombs[i].bombs[bombName],
        pool: i,
      }
      break
    }
  return bomb
}

export default bombsI
