const L = 1.27 // cm
const LR = L / (2 * Math.PI)

const round = number => Math.round(number * 10000) / 10000

const generateList = (from, to) => Array.from({ length: to - from + 1 }, (_, k) => k + from)

const T1_LIST = generateList(35, 54)
const T2_LIST = generateList(11, 22)

const TENSION_DELTA = {
  min: 0,
  max: 0.25
}

function computeChainLength(chainstay, t1, t2) {
  const D1 = t1 * L
  const D2 = t2 * L

  const h = Math.sqrt(
    ((t1 - t2) * LR) + (chainstay * chainstay)
  )

  const LG = (2 * h) + ((D1 + D2) / 2)

  return LG
}

function computeLinks(chainstay, t1, t2, halfLink = false) {
  const linkSize = halfLink ? L : L * 2

  let rawLinks = round(computeChainLength(chainstay, t1, t2) / linkSize)
  let links = Math.ceil(rawLinks)

  let tension = links - rawLinks
  if (halfLink) {
    tension /= 2
  }

  return {
    rawLinks,
    links,
    tension: round(tension)
  }
}

function isTensionOk(tension) {
  return tension > TENSION_DELTA.min && tension < TENSION_DELTA.max
}

function computeTensionIndicator(tension) {
  const tensionIndicator = 1 - ((tension - TENSION_DELTA.min) / TENSION_DELTA.max)

  return tensionIndicator * 100
}

function generateTupleList(t1List, t2List) {
  return t1List
    .map(T1 =>
      t2List.map(T2 => [T1, T2])
    )
    .reduce((acc, cur) =>
      acc.concat(cur)
    , [])
}

function computeVariations(t1List, t2List, chainstay, halfLink = false) {
  // generate
  const T1T2TupleList = generateTupleList(t1List, t2List)

  // compute variations
  const variationList = T1T2TupleList.map(T1T2Tuple => {
    const [t1, t2] = T1T2Tuple

    const {
      rawLinks,
      links,
      tension
    } = computeLinks(chainstay, t1, t2, halfLink)

    const tensionIndicator = computeTensionIndicator(tension)

    return {
      t1,
      t2,
      ratio: t1 / t2,
      rawLinks,
      links,
      tension,
      tensionIndicator,
      isTensionOk: isTensionOk(tension)
    }
  })

  // filter variations on tension parameter
  return variationList.filter(variation => variation.isTensionOk)
}

function compute(chainstay, halfLink = false) {
  return computeVariations(T1_LIST, T2_LIST, chainstay, halfLink)
}

export {
  compute
}