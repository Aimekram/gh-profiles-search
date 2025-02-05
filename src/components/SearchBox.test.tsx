import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SearchBox } from './SearchBox'

const renderSearchBox = () =>
  render(
    <BrowserRouter>
      <SearchBox />
    </BrowserRouter>
  )

describe('SearchBox', () => {
  // one unit test
  it('shows error for invalid username', async () => {
    const user = userEvent.setup()
    renderSearchBox()
    const input = screen.getByTestId('username-input')

    await user.clear(input)
    await user.type(input, '@@@')

    const errorTextId = input.getAttribute('aria-describedby')
    const errorMessage = document.getElementById(errorTextId!)
    expect(errorMessage).toBeInTheDocument()
  })
  // one logic test
  it('updates URL after automatic trigger when username input is valid', async () => {
    const user = userEvent.setup()
    renderSearchBox()
    const input = screen.getByTestId('username-input')

    await user.type(input, 'validuser')

    await new Promise((r) => setTimeout(r, 2000))
    expect(window.location.search).toBe('?username=validuser')
  })
})
