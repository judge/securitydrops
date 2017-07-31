window.addEventListener('load', function load(event){
  window.removeEventListener('load', load, false);
  Modal.init();
}, false);

var Modal = (function() {
  var init = function() {
    var modalhandlerElements = document.querySelectorAll('.modalhandler');
    [].forEach.call(modalhandlerElements, function(modalHandlerElement) {
      modalHandlerElement.addEventListener('click', _open);
    });
  };

  var _open = function(event) {
    event.preventDefault();

    var id = _getModalIDFromElement(event.target);
    if (!id) {
      console.log('data-modal is missing');
      return;
    }

    var modal = _searchModalByID(id);
    if (!modal) {
      console.log('modal #' + id + ' not found');
      return;
    }

    _openModal(modal);
    _bindModalEvents(modal);
  }

  var _openModal = function(element) {
    element.classList.add('modal--opened')
  }

  var _closeModal = function(element) {
    element.classList.remove('modal--opened')
  }

  var _bindModalEvents = function(element) {
    var overlayElement = element.querySelector('.modal__overlay');
    overlayElement.addEventListener('click', function() { _closeModal(element); });
    var closeElements = element.querySelector('.modal__close');
    closeElements.addEventListener('click', function() { _closeModal(element); });
  }

  var _getModalIDFromElement = function(element) {
    return element.getAttribute('data-modal');
  }

  var _searchModalByID = function(id) {
    return document.querySelector('#' + id);
  }

  return {
    init: init
  };
})();
