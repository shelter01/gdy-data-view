export default class FullLink {
  constructor(fullLink = {}) {
    this.countNode = fullLink.countNode || 0
    this.errorNode = fullLink.errorNode || 0
    this.inData = fullLink.inData || []
    this.outData = fullLink.outData || []
  }
}
