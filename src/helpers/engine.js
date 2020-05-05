const L = 1.27 // cm
const LR = L / (2 * Math.PI)

const TENTION_DELTA = {
  min: 0.35,
  max: 0.48
}

const T1_LIST = [ 52, 51, 50, 49, 48, 47, 46, 45, 44, 43, 42 ]
const T2_LIST = [ 19, 18, 17, 16, 15, 14 ]

function computeChainLength(chainstay, t1, t2) {
  const D1 = t1 * L
  const D2 = t2 * L

  const h = Math.sqrt(
    ((t1 - t2) * LR) + (chainstay * chainstay)
  )

  const LG = (2 * h) + ((D1 + D2) / 2)

  return LG
}

function isTensionOk(tension) {
  return tension > TENTION_DELTA.min && tension < TENTION_DELTA.max
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

function computeLinks(chainstay, t1, t2, halfLink = false) {
  const linkSize = halfLink ? L : L * 2

  const rawLinks = computeChainLength(chainstay, t1, t2) / linkSize
  const links = Math.round(rawLinks)

  return {
    rawLinks,
    links
  }
}

function computeVariations(t1List, t2List, chainstay, halfLink = false) {
  // generate
  const T1T2TupleList = generateTupleList(t1List, t2List)

  // compute variations
  const variationList = T1T2TupleList.map(T1T2Tuple => {
    const [t1, t2] = T1T2Tuple

    const { rawLinks, links } = computeLinks(chainstay, t1, t2, halfLink)
    const tension = (rawLinks - links).toPrecision(3)

    return {
      t1,
      t2,
      rawLinks,
      links,
      tension,
      isTensionOk: isTensionOk(tension)
    }
  })

  // filter & order variations of tension parameter
  const variationListWithTensionOk = variationList
    .filter(variation => variation.isTensionOk)
    .sort((varA, varB) => varA.tension - varB.tension)

  return variationListWithTensionOk
}

function compute(chainstay, halfLink = false) {
  return computeVariations(T1_LIST, T2_LIST, chainstay, halfLink)
}

export {
  compute
}