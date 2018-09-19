import { beneficiaryService } from '@/services'
import { HandlerResponse as hr } from 'pu-common'

export default class BeneficiaryController {
  static save (req, res) {
    let beneficiary = {
      organizationId: req.body.organizationId,
      organizationName: req.body.organizationName,
      type: req.body.type || 'athlete',
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      description: req.body.description,
      status: req.body.status || 'active',
      assigneesEmail: req.body.assigneesEmail
    }
    beneficiaryService.save(beneficiary)
      .then(result => {
        hr.send(res, result)
      }).catch(reason => {
        hr.error(res, reason)
      })
  }

  static avatar (req, res) {
    if (!req.file) return hr.error(res, 'files is required', 422)
    return hr.send(res, {})
  }

  static bulk (req, res) {
    const email = req.user.email
    if (!req.file) return hr.error(res, 'files is required', 422)
    beneficiaryService.bulk(req.file.buffer, email)
    return hr.send(res, {})
  }

  static updateById (req, res) {
    const beneficiary = req.body
    const beneficiaryId = req.params.beneficiaryId
    beneficiaryService.updateById(beneficiaryId, beneficiary).then(result => {
      hr.send(res, result)
    }).catch(reason => {
      hr.error(res, reason)
    })
  }

  static getById (req, res) {
    const beneficiaryId = req.params.beneficiaryId
    beneficiaryService.getById(beneficiaryId).then(result => {
      hr.send(res, result)
    }).catch(reason => {
      hr.error(res, reason)
    })
  }

  static delete (req, res) {
    const beneficiaryId = req.params.beneficiaryId
    if (!beneficiaryId) {
      return hr.error(res, 'beneficiaryId is required', 422)
    }
    beneficiaryService.findByIdAndDelete(beneficiaryId).then(result => {
      hr.send(res, result)
    }).catch(reason => {
      hr.error(res, reason)
    })
  }

  static getListByOrganizationId (req, res) {
    const organizationId = req.params.organizationId
    if (!organizationId) {
      return hr.error(res, 'organizationId is required', 422)
    }
    beneficiaryService.find({organizationId}).then(result => {
      hr.send(res, result)
    }).catch(reason => {
      hr.error(res, reason)
    })
  }

  static getByOrganizationId (req, res) {
    const organizationId = req.params.organizationId
    const beneficiaryId = req.params.beneficiaryId
    if (!organizationId) {
      return hr.error(res, 'organizationId is required', 422)
    }
    if (!beneficiaryId) {
      return hr.error(res, 'beneficiaryId is required', 422)
    }
    beneficiaryService.getByIdAndFilter(beneficiaryId, {organizationId}).then(result => {
      hr.send(res, result)
    }).catch(reason => {
      hr.error(res, reason)
    })
  }

  static getByassigneesEmail (req, res) {
    const assigneeEmail = req.params.assigneeEmail
    if (!assigneeEmail) {
      return hr.error(res, 'assigneeEmail is required', 422)
    }
    beneficiaryService.find({ assigneesEmail: assigneeEmail }).then(result => {
      hr.send(res, result)
    }).catch(reason => {
      hr.error(res, reason)
    })
  }

  static import (req, res) {
    let beneficiaries = req.body
    beneficiaryService.import(beneficiaries).then(data => {
      hr.send(res, data)
    }).catch(reason => {
      hr.error(res, reason)
    })
  }
}
