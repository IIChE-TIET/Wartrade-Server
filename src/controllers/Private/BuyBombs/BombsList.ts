export type bomb = {
  value: number
  unit: "Mt" | "Kt"
  price: number
  element: string[]
}

type bombPool = {
  [bombName: string]: bomb
}

type bombsI = { bombs: bombPool; limit: number }[]

const diamondPool: bombPool = {
  "Mk-41": { value: 2.5, unit: "Mt", price: 300000, element: ["polonium"] },
  "MK-17": {
    value: 1.5,
    unit: "Mt",
    price: 150000,
    element: ["vltt", "lead"],
  },
  "Mk-24": {
    value: 1.5,
    unit: "Mt",
    price: 150000,
    element: ["lct", "tungsten"],
  },
  "EC 24": {
    value: 1.2,
    unit: "Mt",
    price: 130000,
    element: ["lithium 6", "uranium 235"],
  },
  "EC-17": { value: 1.1, unit: "Mt", price: 100000, element: ["lithium 7"] },
  Agni: { value: 1, unit: "Mt", price: 95000, element: ["uranium 238"] },
  "Hiroshima 2.O": {
    value: 1.3,
    unit: "Mt",
    price: 135000,
    element: ["rdjk", "plutonium 244"],
  },
  "Nagasaki 2.O": {
    value: 1,
    unit: "Mt",
    price: 97000,
    element: ["plutonium 239"],
  },
}

const platinumPool: bombPool = {
  "Mk-53": {
    value: 0.9,
    unit: "Mt",
    price: 100000,
    element: ["uranium 238"],
  },
  "TX-16": { value: 0.8, unit: "Mt", price: 85000, element: ["lct"] },
  "Mk-39": {
    value: 0.4,
    unit: "Mt",
    price: 60000,
    element: ["lead", "polonium"],
  },
  "MK-15": {
    value: 0.4,
    unit: "Mt",
    price: 50000,
    element: ["tungsten", "lithium 6"],
  },
  "Mk-36": {
    value: 1,
    unit: "Mt",
    price: 95000,
    element: ["plutonium 244", "lithium 7"],
  },
  "Firecracker ": {
    value: 0.7,
    unit: "Mt",
    price: 70000,
    element: ["plutonium 239", "vltt"],
  },
  "Mk-34": { value: 0.6, unit: "Mt", price: 65000, element: ["uranium 235"] },
  "BC-27": { value: 0.5, unit: "Mt", price: 60000, element: ["rdjk"] },
}

const goldPool: bombPool = {
  "B-81": {
    value: 0.1,
    unit: "Mt",
    price: 30000,
    element: ["rdjk", "lithium 6"],
  },
  "Mk-28": {
    value: 0.145,
    unit: "Mt",
    price: 30000,
    element: ["plutonium 239"],
  },
  "B-83": { value: 0.1, unit: "Mt", price: 28000, element: ["rdjk"] },
  "Mk-43": {
    value: 0.1,
    unit: "Mt",
    price: 25000,
    element: ["uranium 235", "lead"],
  },
  "MK-18": {
    value: 50,
    unit: "Kt",
    price: 12000,
    element: ["uranium 238", "tungsten"],
  },
  "B-27": { value: 60, unit: "Kt", price: 11000, element: ["polonium"] },
  "B-16": {
    value: 90,
    unit: "Kt",
    price: 20000,
    element: ["plutonium 244", "lct"],
  },
  "MK-27": {
    value: 95,
    unit: "Kt",
    price: 22000,
    element: ["lithium 7", "vltt"],
  },
}

const silverPool: bombPool = {
  "Mk-7": {
    value: 6.1,
    unit: "Kt",
    price: 2000,
    element: ["plutonium 244", "plutonium 239"],
  },
  "MK/B 61": {
    value: 34,
    unit: "Kt",
    price: 10000,
    element: ["uranium 238", "uranium 235"],
  },
  "B 90": {
    value: 20,
    unit: "Kt",
    price: 6000,
    element: ["lithium 6", "lithium 7"],
  },
  "Mk-6": {
    value: 16,
    unit: "Kt",
    price: 4000,
    element: ["u 238", "pu 239"],
  },
  "Mk-5": { value: 12, unit: "Kt", price: 4000, element: ["rdjk", "u238"] },
  "L T 389": {
    value: 26,
    unit: "Kt",
    price: 9000,
    element: ["lead", "tungsten"],
  },
  "Laser Bomb": {
    value: 30,
    unit: "Kt",
    price: 9500,
    element: ["polonium", "lithium 6"],
  },
  "Mega Unguided": {
    value: 24,
    unit: "Kt",
    price: 7500,
    element: ["lct", "vltt"],
  },
}

const bronzePool: bombPool = {
  "Mk-III": {
    value: 49,
    unit: "Kt",
    price: 1000,
    element: ["plutonium 244", "pu 239"],
  },
  "Mk-8": {
    value: 30,
    unit: "Kt",
    price: 800,
    element: ["plutonium 239", "vltt"],
  },
  "Mk-21": {
    value: 5,
    unit: "Kt",
    price: 100,
    element: ["uranium 238", "lct"],
  },
  "MK-13": {
    value: 32,
    unit: "Kt",
    price: 800,
    element: ["lithium 6", "uranium 235"],
  },
  "Mk-4": {
    value: 31,
    unit: "Kt",
    price: 700,
    element: ["lithium 7", "polonium"],
  },
  "Mk-57": { value: 20, unit: "Kt", price: 600, element: ["u 238", "vltt"] },
  "Mk-I": {
    value: 16,
    unit: "Kt",
    price: 400,
    element: ["lithium 6", "lead"],
  },
  "Mk-12": {
    value: 14,
    unit: "Kt",
    price: 400,
    element: ["uranium 235", "tungsten"],
  },
  "Block Buster": {
    value: 15,
    unit: "Kt",
    price: 420,
    element: ["rdjk", "pu 239"],
  },
  "Glide bomb": {
    value: 28,
    unit: "Kt",
    price: 650,
    element: ["lead", "plutonium 244"],
  },
  "Pressure Bomb": {
    value: 30,
    unit: "Kt",
    price: 700,
    element: ["tungsten", "u 238"],
  },
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

export const getBannedBombs = (element: string) => {
  const banned: {
    bombName: string
    value: number
    unit: "Mt" | "Kt"
    price: number
    element: string[]
    pool: number
  }[] = []

  allBombs.forEach((pool, index) => {
    Object.keys(pool.bombs).forEach(key => {
      const bomb = pool.bombs[key]

      if (bomb.element.includes(element))
        banned.push({ ...bomb, pool: index, bombName: key })
    })
  })
  return banned
}

export default bombsI
