// MADE BY CLAUDE
// THIS FUNCTION IS TO USED TO TEST VISION FOR RECHARTS AND PLOTLY

function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function normal(rand) {
  const u1 = rand() || Number.MIN_VALUE
  const u2 = rand()
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
}

export function generateQcSeries({
  n = 60,
  mean = 7.0,
  sd = 0.03,
  shiftAt = 45,
  shift = 1.5,
  seed = 42,
} = {}) {
  const rand = mulberry32(seed)
  const limits = {
    mean,
    uwl: mean + 2 * sd,
    lwl: mean - 2 * sd,
    ucl: mean + 3 * sd,
    lcl: mean - 3 * sd,
  }

  const points = Array.from({ length: n }, (_, i) => {
    const offset = i >= shiftAt ? shift * sd : 0
    const value = Number((mean + offset + normal(rand) * sd).toFixed(3))
    const date = new Date(Date.now() - (n - 1 - i) * 24 * 60 * 60 * 1000)
    const z = Math.abs(value - mean) / sd
    const status = z > 3 ? 'violation' : z > 2 ? 'warning' : 'ok'
    return { date: date.toISOString().slice(0, 10), value, status }
  })

  return { points, limits }
}
