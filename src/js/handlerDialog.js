function openDialog() {
  dialog.showModal();
  dialog.classList.add('dialog__visible');
}

function closeDialog() {
  dialog.classList.remove("dialog__visible");

  setTimeout(() => {
    dialog.close();
  }, 500);

  document.querySelector('.layout__aside').classList.remove('layout__aside-visible');
  document.querySelector('.icon-tabler-dots-vertical').style.opacity = 1;
  document.querySelector('.icon-tabler-x').style.opacity = 0;
}

export {
  openDialog,
  closeDialog,
};