import { BeneficiaryService } from '@/services'
import { HandlerResponse } from '@/util'
const beneficiaryService = new BeneficiaryService()

export default class BeneficiaryController {
  static save (req, res) {
    let hr = new HandlerResponse(res)
    const payment = req.body
    beneficiaryService.save(payment).then(result => {
      hr.send(result)
    }).catch(reason => {
      hr.error(reason)
    })
  }

  static updateById (req, res) {
    let hr = new HandlerResponse(res)
    const beneficiary = req.body
    const beneficiaryId = req.params.beneficiaryId
    beneficiaryService.updateById(beneficiaryId, beneficiary).then(result => {
      hr.send(result)
    }).catch(reason => {
      hr.error(reason)
    })
  }

  static getById (req, res) {
    let hr = new HandlerResponse(res)
    const beneficiaryId = req.params.beneficiaryId
    beneficiaryService.getById(beneficiaryId).then(result => {
      hr.send(result)
    }).catch(reason => {
      hr.error(reason)
    })
  }

  static getListByOrganizationId (req, res) {
    let hr = new HandlerResponse(res)
    const organizationId = req.params.organizationId
    if (!organizationId) {
      return hr.error('organizationId is required', 422)
    }
    beneficiaryService.find({organizationId}).then(result => {
      hr.send(result)
    }).catch(reason => {
      hr.error(reason)
    })
  }

  static getByOrganizationId (req, res) {
    let hr = new HandlerResponse(res)
    const organizationId = req.params.organizationId
    const beneficiaryId = req.params.beneficiaryId
    if (!organizationId) {
      return hr.error('organizationId is required', 422)
    }
    if (!beneficiaryId) {
      return hr.error('beneficiaryId is required', 422)
    }
    beneficiaryService.getByIdAndFilter(beneficiaryId, {organizationId}).then(result => {
      hr.send(result)
    }).catch(reason => {
      hr.error(reason)
    })
  }
}
