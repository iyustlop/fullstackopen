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

  expect(div).toHaveTextContent(blog.title)
  expect(div).toHaveTextContent(blog.author)
})

test('clicking the view button url and likes are displayed', async () => {
  const mockHandler = vi.fn()

  const { container } = render(<Blog blog={blog} handleLike={mockHandler}/>)

  const div = container.querySelector('.blog')

  expect(div).toHaveTextContent(blog.title)
  expect(div).toHaveTextContent(blog.author)
  expect(div).not.toHaveTextContent(blog.url)
  expect(div).not.toHaveTextContent(blog.likes)

  const user = userEvent.setup()
  const buttonView = screen.getByText('view')
  await user.click(buttonView)

  expect(div).toHaveTextContent(blog.url)
  expect(div).toHaveTextContent(blog.likes)
})

test('clicking the buttonLike calls event handler once', async () => {
  const mockHandler = vi.fn()

  render(<Blog blog={blog} handleLike={mockHandler}/>)

  const user = userEvent.setup()
  const buttonView = screen.getByText('view')
  await user.click(buttonView)
  const buttonLike = screen.getByText('like')
  await user.click(buttonLike)
  await user.click(buttonLike)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('clicking the buttonLike like ', async () => {
  const mockHandler = vi.fn()

  const { container } = render(<Blog blog={blog} handleLike={mockHandler}/>)

  const div = container.querySelector('.blog')

  expect(div).toHaveTextContent(blog.author)

  const user = userEvent.setup()
  const buttonView = screen.getByText('view')
  await user.click(buttonView)
  const buttonLike = screen.getByText('like')
  await user.click(buttonLike)

  expect(mockHandler.mock.calls).toHaveLength(1)

})