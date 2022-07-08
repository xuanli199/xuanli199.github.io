"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _clone = _interopRequireDefault(require("clone"));

var _uslug = _interopRequireDefault(require("uslug"));

var _token = _interopRequireDefault(require("markdown-it/lib/token"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TOC = "@[toc]";
var TOC_RE = /^@\[toc\]/im;

var markdownItSecondInstance = function markdownItSecondInstance() {};

var headingIds = {};
var tocHtml = "";

var repeat = function repeat(string, num) {
  return new Array(num + 1).join(string);
};

var makeSafe = function makeSafe(string, headingIds, slugifyFn) {
  var key = slugifyFn(string); // slugify

  if (!headingIds[key]) {
    headingIds[key] = 0;
  }

  headingIds[key]++;
  return key + (headingIds[key] > 1 ? "-".concat(headingIds[key]) : "");
};

var space = function space() {
  return _objectSpread({}, new _token.default("text", "", 0), {
    content: " "
  });
};

var renderAnchorLinkSymbol = function renderAnchorLinkSymbol(options) {
  if (options.anchorLinkSymbolClassName) {
    return [_objectSpread({}, new _token.default("span_open", "span", 1), {
      attrs: [["class", options.anchorLinkSymbolClassName]]
    }), _objectSpread({}, new _token.default("text", "", 0), {
      content: options.anchorLinkSymbol
    }), new _token.default("span_close", "span", -1)];
  } else {
    return [_objectSpread({}, new _token.default("text", "", 0), {
      content: options.anchorLinkSymbol
    })];
  }
};

var renderAnchorLink = function renderAnchorLink(anchor, options, tokens, idx) {
  var attrs = [];

  if (options.anchorClassName != null) {
    attrs.push(["class", options.anchorClassName]);
  }

  attrs.push(["href", "#".concat(anchor)]);

  var openLinkToken = _objectSpread({}, new _token.default("link_open", "a", 1), {
    attrs: attrs
  });

  var closeLinkToken = new _token.default("link_close", "a", -1);

  if (options.wrapHeadingTextInAnchor) {
    tokens[idx + 1].children.unshift(openLinkToken);
    tokens[idx + 1].children.push(closeLinkToken);
  } else {
    var _tokens$children;

    var linkTokens = [openLinkToken].concat(_toConsumableArray(renderAnchorLinkSymbol(options)), [closeLinkToken]); // `push` or `unshift` according to anchorLinkBefore option
    // space is at the opposite side.

    var actionOnArray = {
      false: "push",
      true: "unshift"
    }; // insert space between anchor link and heading ?

    if (options.anchorLinkSpace) {
      linkTokens[actionOnArray[!options.anchorLinkBefore]](space());
    }

    (_tokens$children = tokens[idx + 1].children)[actionOnArray[options.anchorLinkBefore]].apply(_tokens$children, _toConsumableArray(linkTokens));
  }
};

var treeToMarkdownBulletList = function treeToMarkdownBulletList(tree) {
  var indent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return tree.map(function (item) {
    var indentation = "  ";
    var node = "".concat(repeat(indentation, indent), "*");

    if (item.heading.content) {
      var contentWithoutAnchor = item.heading.content.replace(/\[([^\]]*)\]\([^)]*\)/g, "$1");
      node += " " + "[".concat(contentWithoutAnchor, "](#").concat(item.heading.anchor, ")\n");
    } else {
      node += "\n";
    }

    if (item.nodes.length) {
      node += treeToMarkdownBulletList(item.nodes, indent + 1);
    }

    return node;
  }).join("");
};

var generateTocMarkdownFromArray = function generateTocMarkdownFromArray(headings, options) {
  var tree = {
    nodes: []
  }; // create an ast

  headings.forEach(function (heading) {
    if (heading.level < options.tocFirstLevel || heading.level > options.tocLastLevel) {
      return;
    }

    var i = 1;
    var lastItem = tree;

    for (; i < heading.level - options.tocFirstLevel + 1; i++) {
      if (lastItem.nodes.length === 0) {
        lastItem.nodes.push({
          heading: {},
          nodes: []
        });
      }

      lastItem = lastItem.nodes[lastItem.nodes.length - 1];
    }

    lastItem.nodes.push({
      heading: heading,
      nodes: []
    });
  });
  return treeToMarkdownBulletList(tree.nodes);
};

function _default(md, options) {
  options = _objectSpread({
    toc: true,
    tocClassName: "markdownIt-TOC",
    tocFirstLevel: 1,
    tocLastLevel: 6,
    tocCallback: null,
    anchorLink: true,
    anchorLinkSymbol: "#",
    anchorLinkBefore: true,
    anchorClassName: "markdownIt-Anchor",
    resetIds: true,
    anchorLinkSpace: true,
    anchorLinkSymbolClassName: null,
    wrapHeadingTextInAnchor: false
  }, options);
  markdownItSecondInstance = (0, _clone.default)(md); // initialize key ids for each instance

  headingIds = {};
  md.core.ruler.push("init_toc", function (state) {
    var tokens = state.tokens; // reset key ids for each document

    if (options.resetIds) {
      headingIds = {};
    }

    var tocArray = [];
    var tocMarkdown = "";
    var tocTokens = [];
    var slugifyFn = typeof options.slugify === "function" && options.slugify || _uslug.default;

    for (var i = 0; i < tokens.length; i++) {
      if (tokens[i].type !== "heading_close") {
        continue;
      }

      var heading = tokens[i - 1];
      var heading_close = tokens[i];

      if (heading.type === "inline") {
        var content = void 0;

        if (heading.children && heading.children.length > 0 && heading.children[0].type === "link_open") {
          // headings that contain links have to be processed
          // differently since nested links aren't allowed in markdown
          content = heading.children[1].content;
          heading._tocAnchor = makeSafe(content, headingIds, slugifyFn);
        } else {
          content = heading.content;
          heading._tocAnchor = makeSafe(heading.children.reduce(function (acc, t) {
            return acc + t.content;
          }, ""), headingIds, slugifyFn);
        }

        if (options.anchorLinkPrefix) {
          heading._tocAnchor = options.anchorLinkPrefix + heading._tocAnchor;
        }

        tocArray.push({
          content: content,
          anchor: heading._tocAnchor,
          level: +heading_close.tag.substr(1, 1)
        });
      }
    }

    tocMarkdown = generateTocMarkdownFromArray(tocArray, options);
    tocTokens = markdownItSecondInstance.parse(tocMarkdown, {}); // Adding tocClassName to 'ul' element

    if (_typeof(tocTokens[0]) === "object" && tocTokens[0].type === "bullet_list_open") {
      var attrs = tocTokens[0].attrs = tocTokens[0].attrs || [];

      if (options.tocClassName != null) {
        attrs.push(["class", options.tocClassName]);
      }
    }

    tocHtml = markdownItSecondInstance.renderer.render(tocTokens, markdownItSecondInstance.options);

    if (typeof state.env.tocCallback === "function") {
      state.env.tocCallback.call(undefined, tocMarkdown, tocArray, tocHtml);
    } else if (typeof options.tocCallback === "function") {
      options.tocCallback.call(undefined, tocMarkdown, tocArray, tocHtml);
    } else if (typeof md.options.tocCallback === "function") {
      md.options.tocCallback.call(undefined, tocMarkdown, tocArray, tocHtml);
    }
  });
  md.inline.ruler.after("emphasis", "toc", function (state, silent) {
    var token;
    var match;

    if ( // Reject if the token does not start with @[
    state.src.charCodeAt(state.pos) !== 0x40 || state.src.charCodeAt(state.pos + 1) !== 0x5b || // Don’t run any pairs in validation mode
    silent) {
      return false;
    } // Detect TOC markdown


    match = TOC_RE.exec(state.src);
    match = !match ? [] : match.filter(function (m) {
      return m;
    });

    if (match.length < 1) {
      return false;
    } // Build content


    token = state.push("toc_open", "toc", 1);
    token.markup = TOC;
    token = state.push("toc_body", "", 0);
    token = state.push("toc_close", "toc", -1); // Update pos so the parser can continue

    state.pos = state.pos + 6;
    return true;
  });

  var originalHeadingOpen = md.renderer.rules.heading_open || function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var tokens = args[0],
        idx = args[1],
        options = args[2],
        self = args[4];
    return self.renderToken(tokens, idx, options);
  };

  md.renderer.rules.heading_open = function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var tokens = args[0],
        idx = args[1];
    var attrs = tokens[idx].attrs = tokens[idx].attrs || [];
    var anchor = tokens[idx + 1]._tocAnchor;
    attrs.push(["id", anchor]);

    if (options.anchorLink) {
      renderAnchorLink.apply(void 0, [anchor, options].concat(args));
    }

    return originalHeadingOpen.apply(this, args);
  };

  md.renderer.rules.toc_open = function () {
    return "";
  };

  md.renderer.rules.toc_close = function () {
    return "";
  };

  md.renderer.rules.toc_body = function () {
    return "";
  };

  if (options.toc) {
    md.renderer.rules.toc_body = function () {
      return tocHtml;
    };
  }
}