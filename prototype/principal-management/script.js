const overlays = new Map(
  Array.from(document.querySelectorAll('.drawer-overlay, .modal-overlay')).map((node) => [node.id, node])
);

function closeAll() {
  overlays.forEach((node) => {
    node.hidden = true;
  });
}

function openOverlay(id) {
  const node = overlays.get(id);
  if (!node) return;
  if (node.classList.contains('modal-overlay')) {
    Array.from(document.querySelectorAll('.modal-overlay')).forEach((modal) => {
      modal.hidden = true;
    });
  }
  node.hidden = false;
}

document.addEventListener('click', (event) => {
  const openButton = event.target.closest('[data-open]');
  if (openButton) {
    openOverlay(openButton.dataset.open);
    return;
  }

  if (event.target.closest('[data-close]')) {
    event.target.closest('.drawer-overlay, .modal-overlay').hidden = true;
    return;
  }

  if (event.target.classList.contains('modal-overlay')) {
    event.target.hidden = true;
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeAll();
});
