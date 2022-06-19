import {test} from 'mocha'
import {expect, use} from 'chai'
import axios from 'axios'
import chaiAsPromised from 'chai-as-promised'
use(chaiAsPromised)

import '../../src/guarding-against-full-delete.js'

test('delete user', async () => {
  // ARRANGE
  const {data: id} = await axios.post('/api/users/', {name: 'Gil'})

  // ACT
  await axios.delete('/api/users/', {
    params: {
      id,
    },
  })

  // ASSERT
  expect((await axios.get(`/api/users/${id}`, {validateStatus: null})).status).to.eql(404)
})

test('delete user', async () => {
  // ARRANGE
  const {data: id1} = await axios.post('/api/users/', {name: 'Gil'})
  const {data: id2} = await axios.post('/api/users/', {name: 'Dill'})

  // ACT
  await axios.delete('/api/users/', {
    params: {
      id: id1,
    },
  })

  // ASSERT
  expect((await axios.get(`/api/users/${id1}`, {validateStatus: null})).status).to.eql(404)
  expect((await axios.get(`/api/users/${id2}`)).status).to.eql(200)
})
