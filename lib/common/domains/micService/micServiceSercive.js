import { getInsIdList } from '../../data-source/vvkuInsId/requestApis'
import MicService from './entities/micService'

class MicServiceService {
  static getInsIdList(url) {
    return getInsIdList(url).then(list => {
      return new MicService(list)
    })
  }
}

export default MicServiceService
