// src/index.tsx
import React from "react";
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
  const [generatedId] = React.useState(() => {
    autoId += 1;
    return `gooey-react-${autoId}`;
  });
  const filterId = id ?? generatedId;
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
    "svg",
    {
      "data-testid": "svg",
      style: {
        pointerEvents: "none",
        position: "absolute"
      }
    },
    /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement(
      "filter",
      {
        colorInterpolationFilters: "sRGB",
        "data-testid": "filter",
        id: filterId
      },
      /* @__PURE__ */ React.createElement(
        "feGaussianBlur",
        {
          "data-testid": "blur",
          stdDeviation: blur
        }
      ),
      /* @__PURE__ */ React.createElement(
        "feColorMatrix",
        {
          values: `${r} ${g} ${b} ${a}`
        }
      ),
      composite && /* @__PURE__ */ React.createElement(
        "feComposite",
        {
          "data-testid": "composite",
          in: "SourceGraphic"
        }
      )
    ))
  ), /* @__PURE__ */ React.createElement(
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
export {
  index_default as default
};
