export function fullLinkTranslator({
  num,
  abnormalNum,
  in: inList,
  out: outList
}) {
  const inData = []
  const outData = []
  for (const key in inList) {
    if (inList[key]) {
      inData.push({
        name: key,
        fluency: inList[key]['fluency']
      })
    }
  }
  for (const key in outList) {
    if (outList[key]) {
      outData.push({
        name: key,
        fluency: outList[key]['fluency']
      })
    }
  }
  return {
    countNode: num,
    errorNode: abnormalNum,
    inData: inData,
    outData: outData
  }
}
