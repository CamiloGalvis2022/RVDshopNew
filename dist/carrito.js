"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _task = _interopRequireDefault(require("../models/task"));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var cards = document.getElementById('cards');
var items = document.getElementById('items');
var footer = document.getElementById('footer');
var templateCard = document.getElementById('template-card').content;
var templateFooter = document.getElementById('template-footer').content;
var templateCarrito = document.getElementById('template-carrito').content;
var fragment = document.createDocumentFragment();
var carrito = {};
document.addEventListener('DOMContentLoaded', function () {
  fetchData();
  if (localStorage.getItem('carrito')) {
    carrito = JSON.parse(localStorage.getItem('carrito'));
    pintarCarrito();
  }
  2;
});
cards.addEventListener('click', function (evento) {
  adicionarCarrito(evento);
});
items.addEventListener('click', function (evento) {
  btnAccion(evento);
});
var fetchData = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var tarea, data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _task["default"].find().lean();
          case 3:
            tarea = _context.sent;
            _context.next = 6;
            return tarea.json();
          case 6:
            data = _context.sent;
            console.log(data);
            pintarCards(data);
            _context.next = 14;
            break;
          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 11]]);
  }));
  return function fetchData() {
    return _ref.apply(this, arguments);
  };
}();
var pintarCards = function pintarCards(data) {
  data.forEach(function (producto) {
    templateCard.querySelector('h5').textContent = producto.descripcion;
    templateCard.querySelector('p').textContent = producto.precio;
    templateCard.querySelector('img').setAttribute('src', producto.url);
    templateCard.querySelector('.btn-dark').dataset.id = producto.id;
    templateCard.querySelector('h4').textContent = producto.stock;
    var clone = templateCard.cloneNode(true);
    fragment.appendChild(clone);
    //console.log(producto);
  });

  cards.appendChild(fragment);
};
var adicionarCarrito = function adicionarCarrito(evento) {
  if (evento.target.classList.contains('btn-dark')) {
    cargarCarrito(evento.target.parentElement);
  }
  //detener otro evento que se genere
  evento.stopPropagation();
};
var cargarCarrito = function cargarCarrito(objeto) {
  var producto = {
    id: objeto.querySelector('.btn-dark').dataset.id,
    descripcion: objeto.querySelector('h5').textContent,
    precio: objeto.querySelector('p').textContent,
    stock: objeto.querySelector('h4').textContent,
    cantidad: 1
  };
  //console.log(carrito.hasOwnProperty(producto.id));
  //console.log(producto.stock);
  var value = Number(producto.stock);
  if (carrito.hasOwnProperty(producto.id)) {
    if (carrito[producto.id].cantidad < value) {
      producto.cantidad = carrito[producto.id].cantidad + 1;
      // console.log(producto.cantidad);
    }
  }

  carrito[producto.id] = _objectSpread({}, producto);
  pintarCarrito();
};
var pintarCarrito = function pintarCarrito() {
  console.log(carrito);
  items.innerHTML = '';
  Object.values(carrito).forEach(function (producto) {
    templateCarrito.querySelector('th').textContent = producto.id;
    templateCarrito.querySelectorAll('td')[0].textContent = producto.descripcion;
    templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad;
    templateCarrito.querySelector('.btn-success').dataset.id = producto.id;
    templateCarrito.querySelector('.btn-secondary').dataset.id = producto.id;
    templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio;
    var clone = templateCarrito.cloneNode(true);
    fragment.appendChild(clone);
  });
  items.appendChild(fragment);
  pintarfooter();
  //localStorage guarda todo como texto plano y lo debemos convertir en una coleccion de objetos tipo JSON
  localStorage.setItem('carrito', JSON.stringify(carrito));
};
var pintarfooter = function pintarfooter() {
  footer.innerHTML = '';
  if (Object.keys(carrito).length === 0) {
    // footer.innerHTML='Carrito vacio -comience a comprar! ';
    footer.innerHTML = "<th scope=\"\"row\" colspan=\"5\">Carrito vacio -comience a comprar! </th>";
    return;
  }
  var ncantidad = Object.values(carrito).reduce(function (acc, _ref2) {
    var cantidad = _ref2.cantidad;
    return acc + cantidad;
  }, 0);
  var nprecio = Object.values(carrito).reduce(function (acc, _ref3) {
    var cantidad = _ref3.cantidad,
      precio = _ref3.precio;
    return acc + cantidad * precio;
  }, 0);
  templateFooter.querySelectorAll('td')[0].textContent = ncantidad;
  templateFooter.querySelector('span').textContent = nprecio;
  var clone = templateFooter.cloneNode(true);
  fragment.appendChild(clone);
  footer.appendChild(fragment);
  var btnVaciar = document.getElementById('vaciar-carrito');
  btnVaciar.addEventListener('click', function (evento) {
    carrito = {};
    pintarCarrito();
  });
};
var btnAccion = function btnAccion(evento) {
  console.log(evento.target);
  var producto = carrito[evento.target.dataset.id];
  if (evento.target.classList.contains('btn-success') && producto.cantidad < producto.stock) {
    producto.cantidad++;
    carrito[evento.target.dataset.id] = _objectSpread({}, producto);
    pintarCarrito();
  }
  if (evento.target.classList.contains('btn-secondary') && producto.cantidad > 0) {
    producto.cantidad--;
    if (producto.cantidad === 0) {
      delete carrito[evento.target.dataset.id];
    }
    pintarCarrito();
  }
  evento.stopPropagation();
};