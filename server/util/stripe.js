import str from 'stripe'

export default class Stripe {
  constructor (sk) {
    this.stripe = str(sk)
  }

  createConnectAccount (payload) {
    return new Promise((resolve, reject) => {
      this.stripe.accounts.create(payload, (err, account) => {
        if (err) return reject(err)
        resolve(account)
      })
    })
  }
}
