/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkfrontend"] = self["webpackChunkfrontend"] || []).push([["src_Pages_shared_components_ImageCropper_js"],{

/***/ "./src/Pages/shared/components/ImageCropper.js":
/*!*****************************************************!*\
  !*** ./src/Pages/shared/components/ImageCropper.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_cropper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-cropper */ \"./node_modules/react-cropper/dist/react-cropper.es.js\");\n/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core */ \"./node_modules/@material-ui/core/esm/styles/withStyles.js\");\n/* harmony import */ var _functions_shadeColor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../functions/shadeColor */ \"./src/Pages/shared/functions/shadeColor.js\");\n\n\n\n\n\nvar styles = {\n  cropperWrapper: {\n    '& img': {\n      height: 'auto',\n      width: '100%',\n      maxWidth: '100%'\n    }\n  },\n  '@global': {\n    '.cropper-container': {\n      direction: 'ltr',\n      fontSize: '0',\n      lineHeight: '0',\n      position: 'relative',\n      M: 'none',\n      touchAction: 'none',\n      W: 'none',\n      fallbacks: [{\n        M: 'none'\n      }, {\n        M: 'none'\n      }],\n      userSelect: 'none'\n    },\n    '.cropper-container img': {\n      display: 'block',\n      height: '100%',\n      imageOrientation: '0deg',\n      maxHeight: 'none !important',\n      maxWidth: 'none !important',\n      minHeight: '0 !important',\n      minWidth: '0 !important',\n      width: '100%'\n    },\n    '.cropper-wrap-box, .cropper-canvas, .cropper-drag-box, .cropper-crop-box, .cropper-modal': {\n      bottom: '0',\n      left: '0',\n      position: 'absolute',\n      right: '0',\n      top: '0'\n    },\n    '.cropper-wrap-box, .cropper-canvas': {\n      overflow: 'hidden'\n    },\n    '.cropper-drag-box': {\n      backgroundColor: '#fff',\n      opacity: '0'\n    },\n    '.cropper-modal': {\n      backgroundColor: '#000',\n      opacity: '0.5'\n    },\n    '.cropper-view-box': {\n      display: 'block',\n      height: '100%',\n      outline: function outline(props) {\n        return \"1px solid \".concat(props.color);\n      },\n      outlineColor: function outlineColor(props) {\n        return \"1px solid \".concat((0,_functions_shadeColor__WEBPACK_IMPORTED_MODULE_3__.default)(props.color, 0.75));\n      },\n      overflow: 'hidden',\n      width: '100%'\n    },\n    '.cropper-dashed': {\n      border: '0 dashed #eee',\n      display: 'block',\n      opacity: '0.5',\n      position: 'absolute'\n    },\n    '.cropper-dashed.dashed-h': {\n      borderBottomWidth: 1,\n      borderTopWidth: 1,\n      height: 'calc(100% / 3)',\n      left: '0',\n      top: 'calc(100% / 3)',\n      width: '100%'\n    },\n    '.cropper-dashed.dashed-v': {\n      borderLeftWidth: 1,\n      borderRightWidth: 1,\n      height: '100%',\n      left: 'calc(100% / 3)',\n      top: '0',\n      width: 'calc(100% / 3)'\n    },\n    '.cropper-center': {\n      display: 'block',\n      height: '0',\n      left: '50%',\n      opacity: '0.75',\n      position: 'absolute',\n      top: '50%',\n      width: '0'\n    },\n    '.cropper-center::before, .cropper-center::after': {\n      backgroundColor: '#eee',\n      content: \"' '\",\n      display: 'block',\n      position: 'absolute'\n    },\n    '.cropper-center::before': {\n      height: 1,\n      left: -3,\n      top: '0',\n      width: 7\n    },\n    '.cropper-center::after': {\n      height: 7,\n      left: '0',\n      top: -3,\n      width: 1\n    },\n    '.cropper-face, .cropper-line, .cropper-point': {\n      display: 'block',\n      height: '100%',\n      opacity: '0.1',\n      position: 'absolute',\n      width: '100%'\n    },\n    '.cropper-face': {\n      backgroundColor: '#fff',\n      left: '0',\n      top: '0'\n    },\n    '.cropper-line': {\n      backgroundColor: function backgroundColor(props) {\n        return props.color;\n      }\n    },\n    '.cropper-line.line-e': {\n      cursor: 'ew-resize',\n      right: -3,\n      top: '0',\n      width: 5\n    },\n    '.cropper-line.line-n': {\n      cursor: 'ns-resize',\n      height: 5,\n      left: '0',\n      top: -3\n    },\n    '.cropper-line.line-w': {\n      cursor: 'ew-resize',\n      left: -3,\n      top: '0',\n      width: 5\n    },\n    '.cropper-line.line-s': {\n      bottom: -3,\n      cursor: 'ns-resize',\n      height: 5,\n      left: '0'\n    },\n    '.cropper-point': {\n      backgroundColor: function backgroundColor(props) {\n        return props.color;\n      },\n      height: 5,\n      opacity: '0.75',\n      width: 5\n    },\n    '.cropper-point.point-e': {\n      cursor: 'ew-resize',\n      marginTop: -3,\n      right: -3,\n      top: '50%'\n    },\n    '.cropper-point.point-n': {\n      cursor: 'ns-resize',\n      left: '50%',\n      marginLeft: -3,\n      top: -3\n    },\n    '.cropper-point.point-w': {\n      cursor: 'ew-resize',\n      left: -3,\n      marginTop: -3,\n      top: '50%'\n    },\n    '.cropper-point.point-s': {\n      bottom: -3,\n      cursor: 's-resize',\n      left: '50%',\n      marginLeft: -3\n    },\n    '.cropper-point.point-ne': {\n      cursor: 'nesw-resize',\n      right: -3,\n      top: -3\n    },\n    '.cropper-point.point-nw': {\n      cursor: 'nwse-resize',\n      left: -3,\n      top: -3\n    },\n    '.cropper-point.point-sw': {\n      bottom: -3,\n      cursor: 'nesw-resize',\n      left: -3\n    },\n    '.cropper-point.point-se': {\n      bottom: -3,\n      cursor: 'nwse-resize',\n      height: 20,\n      opacity: '1',\n      right: -3,\n      width: 20\n    },\n    '@media (min-width: 768px)': {\n      '.cropper-point.point-se': {\n        height: 15,\n        width: 15\n      }\n    },\n    '@media (min-width: 992px)': {\n      '.cropper-point.point-se': {\n        height: 10,\n        width: 10\n      }\n    },\n    '@media (min-width: 1200px)': {\n      '.cropper-point.point-se': {\n        height: 5,\n        opacity: '0.75',\n        width: 5\n      }\n    },\n    '.cropper-point.point-se::before': {\n      backgroundColor: function backgroundColor(props) {\n        return props.color;\n      },\n      bottom: '-50%',\n      content: \"' '\",\n      display: 'block',\n      height: '200%',\n      opacity: '0',\n      position: 'absolute',\n      right: '-50%',\n      width: '200%'\n    },\n    '.cropper-invisible': {\n      opacity: '0'\n    },\n    '.cropper-bg': {\n      backgroundImage: \"url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC')\"\n    },\n    '.cropper-hide': {\n      display: 'block',\n      height: '0',\n      position: 'absolute',\n      width: '0'\n    },\n    '.cropper-hidden': {\n      display: 'none !important'\n    },\n    '.cropper-move': {\n      cursor: 'move'\n    },\n    '.cropper-crop': {\n      cursor: 'crosshair'\n    },\n    '.cropper-disabled .cropper-drag-box, .cropper-disabled .cropper-face, .cropper-disabled .cropper-line, .cropper-disabled .cropper-point': {\n      cursor: 'not-allowed'\n    }\n  }\n};\n\nfunction ImageCropper(props) {\n  var onCrop = props.onCrop,\n      classes = props.classes,\n      src = props.src,\n      aspectRatio = props.aspectRatio,\n      setCropFunction = props.setCropFunction;\n  var cropper = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();\n  var crop = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {\n    onCrop(cropper.current.getCroppedCanvas().toDataURL());\n  }, [onCrop, cropper]);\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {\n    setCropFunction(crop);\n  }, [setCropFunction, crop]);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", {\n    className: classes.cropperWrapper\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_cropper__WEBPACK_IMPORTED_MODULE_2__.default, {\n    onInitialized: function onInitialized(cr) {\n      return cropper.current = cr;\n    },\n    src: src,\n    guides: false,\n    zoomable: false,\n    viewMode: 3,\n    aspectRatio: aspectRatio,\n    cropmove: aspectRatio ? null : function () {\n      var cropBoxData = cropper.current.getCropBoxData();\n      var cropBoxWidth = cropBoxData.width;\n      var aspRatio = cropBoxWidth / cropBoxData.height;\n\n      if (aspRatio < 1) {\n        cropper.current.setCropBoxData({\n          height: cropBoxWidth / 1\n        });\n      } else if (aspRatio > 16 / 9) {\n        cropper.current.setCropBoxData({\n          height: cropBoxWidth / (16 / 9)\n        });\n      }\n    }\n  }));\n}\n\nImageCropper.propTypes = {\n  classes: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object.isRequired),\n  color: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string.isRequired),\n  src: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string),\n  onCrop: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func),\n  setCropFunction: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func),\n  aspectRatio: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().number)\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_material_ui_core__WEBPACK_IMPORTED_MODULE_4__.default)(styles)(ImageCropper));\n\n//# sourceURL=webpack://frontend/./src/Pages/shared/components/ImageCropper.js?");

/***/ })

}]);