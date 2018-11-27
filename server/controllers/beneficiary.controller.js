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

  static create (req, res) {
    if (!req.body.organizationId) return hr.error(res, 'organizationId is required', 422)
    if (!req.body.organizationName) return hr.error(res, 'organizationName is required', 422)
    if (!req.body.firstName) return hr.error(res, 'firstName is required', 422)
    if (!req.body.lastName) return hr.error(res, 'lastName is required', 422)
    if (!req.body.assigneesEmail) return hr.error(res, 'assigneesEmail is required', 422)
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
    beneficiaryService.saveOrUpdate(beneficiary)
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

  static search (req, res) {
    if (!req.query.criteria) return hr.error(res, 'Criteria is required', 422)
    const criteria = req.query.criteria
    beneficiaryService.search(criteria)
      .then(users => hr.send(res, users))
      .catch(reason => hr.error(res, reason))
  }

  static updateAssigneesEmail (req, res) {
    if (!req.body.oldEmail) return hr.error(res, 'oldEmail is required', 422)
    if (!req.body.newEmail) return hr.error(res, 'newEmail is required', 422)
    beneficiaryService.updateAssigneesEmail(req.body.oldEmail, req.body.newEmail)
      .then(resp => hr.send(res, resp))
      .catch(reason => hr.error(res, reason))
  }

  static updateAddAssigneeEmail (req, res) {
    if (!req.body.email) return hr.error(res, 'email is required', 422)
    if (!req.body.id) return hr.error(res, 'id is required', 422)
    beneficiaryService.updateAddAssigneeEmail(req.body)
      .then(resp => hr.send(res, resp))
      .catch(reason => hr.error(res, reason))
  }
}
