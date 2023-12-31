export const addOpenPopupHandle = (
  btnClass: string,
  popupClass: string,
  img: string,
  imgActive: string
): void => {
  const hideClass = `${popupClass}_hidden`
  const btn = document.querySelector(`.${btnClass}`)
  const popup = document.querySelector(`.${popupClass}`)

  if (!btn || !popup) return

  btn.addEventListener('click', () => {
    if (btn.getAttribute('src') === img) {
      btn.setAttribute('src', imgActive)
      popup.classList.remove(hideClass)
    } else {
      btn.setAttribute('src', img)
      popup.classList.add(hideClass)
    }
  })
}
