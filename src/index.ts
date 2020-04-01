const { MONGO_URI, PORT } = process.env

import fastify from 'fastify'
import moment from 'moment'
import { MongoClient, ObjectId } from 'mongodb'

import { auth } from './lib'
import { PostTrackBody, PostTrackHeaders } from './types'

const server = fastify()

const client = new MongoClient(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

client.connect()

server.post<void, void, PostTrackHeaders, PostTrackBody>(
  '/v1/track',
  async ({
    body: {
      location: {
        coords: { latitude, longitude },
        timestamp
      }
    },
    headers: { authorization }
  }) => {
    const user = auth.get(authorization)

    await client
      .db()
      .collection('movements')
      .insertOne({
        createdAt: moment(timestamp).toDate(),
        location: {
          latitude,
          longitude
        },
        user: ObjectId.createFromHexString(user)
      })

    return {}
  }
)

server.listen(Number(PORT), '0.0.0.0', (error, address) => {
  if (error) {
    console.log(error)

    process.exit(1)
  }

  console.log(`server listening on ${address}`)
})
