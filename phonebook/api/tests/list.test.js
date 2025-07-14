// tests/list_helper.test.js
import { dummy } from '../util/list_helper.js'

test('dummy returns one', () => {
  const blogs = []
  const result = dummy(blogs)
  expect(result).toBe(1)
})
