import { getFullLinkList } from '../../data-source/vvkuFullLink/requestApis'
import FullLink from './entities/fullLink'

class FullLinkService {
  static getFullLinkList(url, params) {
    return getFullLinkList(url, params).then(list => {
      return new FullLink(list)
    })
  }
}

export default FullLinkService
