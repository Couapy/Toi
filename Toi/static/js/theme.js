const toggleSwitch = document.querySelector('.theme-switch-button')
const currentTheme = localStorage.getItem('theme')

if (currentTheme) {
  updateTheme()
}

function switchTheme() {
  if (document.body.dataset.theme == 'light') {
    localStorage.setItem('theme', 'dark')
  }
  else {
    localStorage.setItem('theme', 'light')
  }
  updateTheme()
}

function updateTheme() {
  let currentTheme = localStorage.getItem('theme')
  let meta_theme = document.querySelector('meta[name="theme-color"]')
  document.body.dataset.theme = currentTheme
  meta_theme.content = getComputedStyle(document.body).getPropertyValue('--color-theme').replace(' ', '')
}

toggleSwitch.addEventListener('click', switchTheme, false)
