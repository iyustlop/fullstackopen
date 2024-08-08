import { render, screen } from '@testing-library/react'
import CreateBlogForm from '../../src/components/CreateBlogForm'
import userEvent from '@testing-library/user-event'

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<CreateBlogForm createBlog={createBlog} />)

  const inputTtile = screen.getByPlaceholderText('Blog title')
  const inputAuthor = screen.getByPlaceholderText('Blog author')
  const inputTUrl = screen.getByPlaceholderText('blog url')
  const sendButton = screen.getByText('create')

  await user.type(inputTtile, 'testing a form...')
  await user.type(inputAuthor, 'testing a form...')
  await user.type(inputTUrl, 'testing a form...')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  //expect(createBlog.mock.calls[0][0].content).toBe('testing a form...')
})