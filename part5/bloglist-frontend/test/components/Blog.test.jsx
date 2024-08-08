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

const buttons = {
  view: 'view',
  like: 'like',
}

const cssSelectorBlog = '.blog'

test('renders content', () => {
  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector(cssSelectorBlog)

  expect(div).toHaveTextContent(blog.title)
  expect(div).toHaveTextContent(blog.author)
})

test('clicking the view button url and likes are displayed', async () => {
  const mockHandler = vi.fn()

  const { container } = render(<Blog blog={blog} handleLike={mockHandler}/>)

  const div = container.querySelector(cssSelectorBlog)

  expect(div).toHaveTextContent(blog.title)
  expect(div).toHaveTextContent(blog.author)
  expect(div).not.toHaveTextContent(blog.url)
  expect(div).not.toHaveTextContent(blog.likes)

  const user = userEvent.setup()
  const buttonView = screen.getByText(buttons.view)
  await user.click(buttonView)

  expect(div).toHaveTextContent(blog.url)
  expect(div).toHaveTextContent(blog.likes)
})

test('clicking the buttonLike two times calls event handler twice', async () => {
  const mockHandler = vi.fn()

  render(<Blog blog={blog} handleLike={mockHandler}/>)

  const user = userEvent.setup()
  const buttonView = screen.getByText(buttons.view)
  await user.click(buttonView)
  const buttonLike = screen.getByText(buttons.like)
  await user.click(buttonLike)
  await user.click(buttonLike)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
