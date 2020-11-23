import axios from '../../util/http.js'
import { insIdTranslator } from './translators'

export async function getInsIdList(url) {
  return await axios(url).then(v => {
    return insIdTranslator(v)
  })
}
