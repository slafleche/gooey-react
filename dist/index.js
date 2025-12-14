"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);
var import_react = __toESM(require("react"));
var autoId = 0;
var Goo = ({
  children,
  className,
  composite = false,
  intensity = "medium",
  id,
  style
}) => {
  const blur = intensity === "weak" ? 8 : intensity === "strong" ? 16 : 12;
  const alpha = blur * 6;
  const shift = alpha / -2;
  const r = "1 0 0 0 0";
  const g = "0 1 0 0 0";
  const b = "0 0 1 0 0";
  const a = `0 0 0 ${alpha} ${shift}`;
  const [generatedId] = import_react.default.useState(() => {
    autoId += 1;
    return `gooey-react-${autoId}`;
  });
  const filterId = id ?? generatedId;
  return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement(
    "svg",
    {
      "data-testid": "svg",
      style: {
        pointerEvents: "none",
        position: "absolute"
      }
    },
    /* @__PURE__ */ import_react.default.createElement("defs", null, /* @__PURE__ */ import_react.default.createElement(
      "filter",
      {
        colorInterpolationFilters: "sRGB",
        "data-testid": "filter",
        id: filterId
      },
      /* @__PURE__ */ import_react.default.createElement(
        "feGaussianBlur",
        {
          "data-testid": "blur",
          stdDeviation: blur
        }
      ),
      /* @__PURE__ */ import_react.default.createElement(
        "feColorMatrix",
        {
          values: `${r} ${g} ${b} ${a}`
        }
      ),
      composite && /* @__PURE__ */ import_react.default.createElement(
        "feComposite",
        {
          "data-testid": "composite",
          in: "SourceGraphic"
        }
      )
    ))
  ), /* @__PURE__ */ import_react.default.createElement(
    "div",
    {
      className,
      "data-testid": "element",
      style: {
        ...style,
        filter: `url(#${filterId})`
      }
    },
    children
  ));
};
var index_default = Goo;
