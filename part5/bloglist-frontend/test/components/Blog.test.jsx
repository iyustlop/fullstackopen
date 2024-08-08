import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../../src/components/Blog'

const blog = {
  title: 'Component testing is done with react-testing-library',
  author: 'Ignacio Yuste',
  url: 'http://www.forof.com',
  likes: 5,
  user:  { username: 'iyustlop' }
}

test('renders content', () => {
  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blog')

  expect(div).toHaveTextContent('Component testing is done with react-testing-library')
})

test('clicking the buttonLike calls event handler once', async () => {
  const mockHandler = vi.fn()

  const { container } = render(<Blog blog={blog} handleLike={mockHandler}/>)

  const div = container.querySelector('.blog')

  expect(div).toHaveTextContent('Ignacio Yuste')

  const user = userEvent.setup()
  const buttonLike = screen.getByText('view')
  await user.click(buttonLike)

  expect(div).toHaveTextContent('Ignacio Yuste')
})

test('clicking the buttonLike like ', async () => {
  const mockHandler = vi.fn()

  const { container } = render(<Blog blog={blog} handleLike={mockHandler}/>)

  const div = container.querySelector('.blog')

  expect(div).toHaveTextContent('Ignacio Yuste')

  const user = userEvent.setup()
  const buttonView = screen.getByText('view')
  await user.click(buttonView)
  const buttonLike = screen.getByText('like')
  await user.click(buttonLike)

  expect(mockHandler.mock.calls).toHaveLength(1)

})