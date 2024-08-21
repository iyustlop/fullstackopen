import { render, screen } from '@testing-library/react'
import CreateBlogForm from '../../src/components/CreateBlogForm'
import userEvent from '@testing-library/user-event'

const blog = {
  title: 'testing title',
  author: 'testing author',
  url: 'testing url'
}

const placeHolderText = {
  title: 'Blog title',
  author: 'Blog author',
  url: 'blog url'
}

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<CreateBlogForm createBlog={createBlog} />)

  const inputTtile = screen.getByPlaceholderText(placeHolderText.title)
  const inputAuthor = screen.getByPlaceholderText(placeHolderText.author)
  const inputTUrl = screen.getByPlaceholderText(placeHolderText.url)
  const sendButton = screen.getByText('create')

  await user.type(inputTtile, blog.title)
  await user.type(inputAuthor, blog.author)
  await user.type(inputTUrl, blog.url)
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe(blog.title)
  expect(createBlog.mock.calls[0][0].author).toBe(blog.author)
  expect(createBlog.mock.calls[0][0].url).toBe(blog.url)
})