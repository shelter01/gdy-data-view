import axios from '../../util/http.js'
import { fullLinkTranslator } from './translators'

export async function getFullLinkList(url, params) {
  return await axios(url, params).then(v => {
    return fullLinkTranslator(v)
  })
}
