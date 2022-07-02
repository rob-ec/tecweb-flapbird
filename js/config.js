var modals = document.querySelectorAll('[data-modal]');

var modalClose = document.getElementById('modal-close');

function closeConfig() {
  document.getElementById('modal-one').classList.remove('open')
}

modalClose.addEventListener('click', function (event) {
  event.preventDefault()
  closeConfig();
});

modals.forEach(function (trigger) {
  trigger.addEventListener('click', function (event) {
    event.preventDefault();
    var modal = document.getElementById(trigger.dataset.modal);
    modal.classList.add('open');
    var exits = modal.querySelectorAll('.modal-exit');
    exits.forEach(function (exit) {
      exit.addEventListener('click', function (event) {
        event.preventDefault();
        modal.classList.remove('open');
      });
    });
  });
});