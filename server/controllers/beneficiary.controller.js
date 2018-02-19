import { BeneficiaryService } from '@/services'
import { HandlerResponse } from 'pu-common'
const beneficiaryService = new BeneficiaryService()

export default class BeneficiaryController {
  static save (req, res) {
    const payment = req.body
    beneficiaryService.save(payment).then(result => {
      HandlerResponse.send(res, result)
    }).catch(reason => {
      HandlerResponse.error(res, reason)
    })
  }

  static updateById (req, res) {
    const beneficiary = req.body
    const beneficiaryId = req.params.beneficiaryId
    beneficiaryService.updateById(beneficiaryId, beneficiary).then(result => {
      HandlerResponse.send(res, result)
    }).catch(reason => {
      HandlerResponse.error(res, reason)
    })
  }

  static getById (req, res) {
    const beneficiaryId = req.params.beneficiaryId
    beneficiaryService.getById(beneficiaryId).then(result => {
      HandlerResponse.send(res, result)
    }).catch(reason => {
      HandlerResponse.error(res, reason)
    })
  }

  static getListByOrganizationId (req, res) {
    const organizationId = req.params.organizationId
    if (!organizationId) {
      return HandlerResponse.error(res, 'organizationId is required', 422)
    }
    beneficiaryService.find({organizationId}).then(result => {
      HandlerResponse.send(res, result)
    }).catch(reason => {
      HandlerResponse.error(res, reason)
    })
  }

  static getByOrganizationId (req, res) {
    const organizationId = req.params.organizationId
    const beneficiaryId = req.params.beneficiaryId
    if (!organizationId) {
      return HandlerResponse.error(res, 'organizationId is required', 422)
    }
    if (!beneficiaryId) {
      return HandlerResponse.error(res, 'beneficiaryId is required', 422)
    }
    beneficiaryService.getByIdAndFilter(beneficiaryId, {organizationId}).then(result => {
      HandlerResponse.send(res, result)
    }).catch(reason => {
      HandlerResponse.error(res, reason)
    })
  }
}
