function openNav() {
  document.querySelector('.nav-links').style.right = '0px'
  document.querySelector('.nav-overlay').style.right = '0'
}

function closeNav() {
  document.querySelector('.nav-links').style.right = '-250px'
  document.querySelector('.nav-overlay').style.right = '-100vw'
}

function toggleUserMenu(e) {
  e.stopPropagation()

  let ul = this.querySelector('ul')
  if (ul.style.display == 'block') {
    ul.style.display = ''
  }
  else {
    ul.style.display = 'block'
  }
}

function hideUserMenu() {
  document.querySelector('.user-actions ul').style.display = ''
}

document.querySelector('.nav-menu-button').addEventListener('click', openNav)
document.querySelector('.nav-close').addEventListener('click', closeNav)
document.querySelector('.nav-overlay').addEventListener('click', closeNav)

document.querySelector('.user-actions').addEventListener('click', toggleUserMenu)
document.addEventListener('click', hideUserMenu)