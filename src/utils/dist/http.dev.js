"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = get;
exports.post = post;
exports.Delete = Delete;
exports.upload = upload;
exports.download = download;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// import fetch from './axios.config'
var API_HOST = '/api'; // 基本配置

var DEFAULT_CONFIG = {
  isApiHost: true
};
var POST_HEADER = {
  headers: {
    'content-type': 'application/json'
  }
};
/**
 * get 获取
 * @param {String} url 请求的url
 * @param {any} params  请求的参数
 * @param {Obejct} config  请求配置
 * @returns Promise
 */

function get(url) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var opts = _objectSpread({}, DEFAULT_CONFIG, {}, config);

  opts.params = _objectSpread({}, params);
  return fetch.get(getUrl(url, opts.isApiHost), opts);
}
/**
 *
 * post 提交
 * @param {String} url 请求的url
 * @param {any} [params={}] 请求的参数
 * @param {any} isApiHost 请求配置
 * @returns Promise
 *
 * @memberOf HttpBase
 */


function post(url) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var opts = _objectSpread({}, DEFAULT_CONFIG, {}, POST_HEADER, {}, config);

  return fetch.post(getUrl(url, opts.isApiHost), params, opts);
}
/**
 * delete 提交
 * @param {String} url 请求的url
 * @param {any} [params={}] 请求的参数
 * @returns Promise
 *
 * @memberOf HttpBase
 */


function Delete(url) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var opts = _objectSpread({}, DEFAULT_CONFIG, {}, POST_HEADER, {}, config);

  return fetch["delete"](getUrl(url, opts.isApiHost), params, opts);
}
/**
 * 上传
 * @export
 * @param {any} url 请求的url
 * @param {any} [params={}] 请求的参数
 * @param {any} [config={}] 配置
 * @returns Promise
 */


function upload(url) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var opts = _objectSpread({}, DEFAULT_CONFIG, {}, POST_HEADER, {}, config);

  var form = new FormData();
  Object.keys(params).forEach(function (key) {
    form.append(key, params[key]);
  });
  return fetch.post(getUrl(url, opts.isApiHost), form, opts);
}
/**
 *
 * 下载
 * @export
 * @param {any} url 请求
 * @param {any} [params={}] 请求参数
 * @param {string} [type='post'] 请求类型
 * @param {any} [config={}] 配置
 */


function download(url) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'post';
  var config = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  var opts = _objectSpread({}, DEFAULT_CONFIG, {}, POST_HEADER, {}, config);

  var $form = document.createElement('form');
  $form.setAttribute('method', type);
  $form.setAttribute('hidden', 'hidden');
  $form.setAttribute('action', getUrl(url, opts.isApiHost));

  var createInput = function createInput(name, value) {
    var input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', name);
    input.setAttribute('value', value);
    $form.appendChild(input);
  };

  Object.keys(params).forEach(function (key) {
    createInput(key, params[key]);
  });
  var $body = document.body || document.getElementsByTagName('body')[0];
  $body.append($form);
  $form.submit();
  $form.remove();
}
/**
 *
 * url 处理如果 isApiHost 为true 则添加 API_HOST
 * @param {any} url
 * @param {any} isApiHost
 * @returns
 *
 */


function getUrl(url, isApiHost) {
  if (!isApiHost) {
    return url;
  }

  var arr = [API_HOST];
  arr.push(url);
  return arr.join('');
}