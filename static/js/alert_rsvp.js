document.addEventListener('DOMContentLoaded', function () {
  var modal = document.getElementById('modal-alertRsvp');
  var closeModalBtn = document.getElementsByClassName("close-alertRsvp")[0];

  modal.style.display = 'block';

  closeModalBtn.onclick = function () {
    modal.style.display = 'none';
  };

  window.addEventListener('click', function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });

});
