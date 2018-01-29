import api from './api'

export default function (app) {
  // Insert routes below
  app.use('/api/v1', api)

  app.route('/*').get(function (request, response) {
    response.status(200).json({ PU: 'Product!!!' })
  })
}
