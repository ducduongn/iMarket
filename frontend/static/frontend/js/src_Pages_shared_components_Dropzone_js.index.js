/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkfrontend"] = self["webpackChunkfrontend"] || []).push([["src_Pages_shared_components_Dropzone_js"],{

/***/ "./src/Pages/shared/components/ColoredButton.js":
/*!******************************************************!*\
  !*** ./src/Pages/shared/components/ColoredButton.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ \"./node_modules/@material-ui/core/esm/styles/createMuiTheme.js\");\n/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core */ \"./node_modules/@material-ui/styles/esm/ThemeProvider/ThemeProvider.js\");\n/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core */ \"./node_modules/@material-ui/core/esm/Button/Button.js\");\nfunction _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\nfunction _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }\n\nfunction _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\nfunction ColoredButton(props) {\n  var color = props.color,\n      children = props.children,\n      theme = props.theme;\n  var buttonTheme = (0,_material_ui_core__WEBPACK_IMPORTED_MODULE_2__.default)(_objectSpread(_objectSpread({}, theme), {}, {\n    palette: {\n      primary: {\n        main: color\n      }\n    }\n  }));\n\n  var buttonProps = function (_ref) {\n    var color = _ref.color,\n        theme = _ref.theme,\n        children = _ref.children,\n        o = _objectWithoutProperties(_ref, [\"color\", \"theme\", \"children\"]);\n\n    return o;\n  }(props);\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__.default, {\n    theme: buttonTheme\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__.default, _extends({}, buttonProps, {\n    color: \"primary\"\n  }), children));\n}\n\nColoredButton.propTypes = {\n  color: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string.isRequired)\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.memo)(ColoredButton));\n\n//# sourceURL=webpack://frontend/./src/Pages/shared/components/ColoredButton.js?");

/***/ }),

/***/ "./src/Pages/shared/components/Dropzone.js":
/*!*************************************************!*\
  !*** ./src/Pages/shared/components/Dropzone.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_dropzone__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dropzone */ \"./node_modules/react-dropzone/dist/es/index.js\");\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ \"./node_modules/classnames/index.js\");\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core */ \"./node_modules/@material-ui/core/esm/Box/Box.js\");\n/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core */ \"./node_modules/@material-ui/core/esm/styles/withStyles.js\");\n/* harmony import */ var _ColoredButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ColoredButton */ \"./src/Pages/shared/components/ColoredButton.js\");\nfunction _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\n\n\n\n\n\n\nvar styles = {\n  button: {\n    borderWidth: 1,\n    borderColor: 'rgba(0, 0, 0, 0.23)',\n    borderTopLeftRadius: 0,\n    borderBottomLeftRadius: 0\n  },\n  fullHeight: {\n    height: '100%'\n  }\n};\n\nfunction getColor(isDragAccept, isDragReject, theme) {\n  if (isDragAccept) {\n    return theme.palette.success.main;\n  }\n\n  if (isDragReject) {\n    return theme.palette.error.dark;\n  }\n\n  return theme.palette.common.black;\n}\n\nfunction Dropzone(props) {\n  var onDrop = props.onDrop,\n      accept = props.accept,\n      fullHeight = props.fullHeight,\n      children = props.children,\n      classes = props.classes,\n      style = props.style,\n      theme = props.theme;\n\n  var _useDropzone = (0,react_dropzone__WEBPACK_IMPORTED_MODULE_2__.useDropzone)({\n    accept: accept,\n    onDrop: onDrop\n  }),\n      getRootProps = _useDropzone.getRootProps,\n      getInputProps = _useDropzone.getInputProps,\n      isDragAccept = _useDropzone.isDragAccept,\n      isDragReject = _useDropzone.isDragReject;\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__.default, _extends({}, getRootProps(), {\n    height: \"100%\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"input\", getInputProps()), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ColoredButton__WEBPACK_IMPORTED_MODULE_4__.default, {\n    fullWidth: true,\n    className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(fullHeight ? classes.fullHeight : null, classes.button),\n    variant: \"outlined\",\n    color: getColor(isDragAccept, isDragReject, theme),\n    style: style\n  }, children));\n}\n\nDropzone.propTypes = {\n  classes: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object.isRequired),\n  theme: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object.isRequired),\n  onDrop: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func),\n  accept: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string),\n  fullHeight: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().bool),\n  style: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object),\n  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_1___default().element), (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func)])\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_material_ui_core__WEBPACK_IMPORTED_MODULE_6__.default)(styles, {\n  withTheme: true\n})(Dropzone));\n\n//# sourceURL=webpack://frontend/./src/Pages/shared/components/Dropzone.js?");

/***/ })

}]);