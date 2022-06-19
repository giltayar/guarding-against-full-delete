import fastify from 'fastify'
import pg from 'pg'

const app = fastify()
const db = await connectToDatabase()

app.delete('/api/users/:id', async (req) => {
  const {id} = req.params

  await db.query(`DELETE FROM tenants WHERE id=$1`, [id])

  return {id}
})
await app.listen({port: 3000})

async function connectToDatabase() {
  const client = new pg.Client({
    connectionString: `...`,
  })
  await client.connect()
  client.on('error', () => 1)

  return client
}
}
