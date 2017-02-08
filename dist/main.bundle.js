/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

!function(global, factory) {
     true ? factory(exports) : 'function' == typeof define && define.amd ? define([ 'exports' ], factory) : factory(global.preact = global.preact || {});
}(this, function(exports) {
    function VNode(nodeName, attributes, children) {
        this.nodeName = nodeName;
        this.attributes = attributes;
        this.children = children;
        this.key = attributes && attributes.key;
    }
    function h(nodeName, attributes) {
        var children, lastSimple, child, simple, i;
        for (i = arguments.length; i-- > 2; ) stack.push(arguments[i]);
        if (attributes && attributes.children) {
            if (!stack.length) stack.push(attributes.children);
            delete attributes.children;
        }
        while (stack.length) if ((child = stack.pop()) instanceof Array) for (i = child.length; i--; ) stack.push(child[i]); else if (null != child && child !== !0 && child !== !1) {
            if ('number' == typeof child) child = String(child);
            simple = 'string' == typeof child;
            if (simple && lastSimple) children[children.length - 1] += child; else {
                (children || (children = [])).push(child);
                lastSimple = simple;
            }
        }
        var p = new VNode(nodeName, attributes || void 0, children || EMPTY_CHILDREN);
        if (options.vnode) options.vnode(p);
        return p;
    }
    function extend(obj, props) {
        if (props) for (var i in props) obj[i] = props[i];
        return obj;
    }
    function clone(obj) {
        return extend({}, obj);
    }
    function delve(obj, key) {
        for (var p = key.split('.'), i = 0; i < p.length && obj; i++) obj = obj[p[i]];
        return obj;
    }
    function isFunction(obj) {
        return 'function' == typeof obj;
    }
    function isString(obj) {
        return 'string' == typeof obj;
    }
    function hashToClassName(c) {
        var str = '';
        for (var prop in c) if (c[prop]) {
            if (str) str += ' ';
            str += prop;
        }
        return str;
    }
    function cloneElement(vnode, props) {
        return h(vnode.nodeName, extend(clone(vnode.attributes), props), arguments.length > 2 ? [].slice.call(arguments, 2) : vnode.children);
    }
    function createLinkedState(component, key, eventPath) {
        var path = key.split('.');
        return function(e) {
            var t = e && e.target || this, state = {}, obj = state, v = isString(eventPath) ? delve(e, eventPath) : t.nodeName ? t.type.match(/^che|rad/) ? t.checked : t.value : e, i = 0;
            for (;i < path.length - 1; i++) obj = obj[path[i]] || (obj[path[i]] = !i && component.state[path[i]] || {});
            obj[path[i]] = v;
            component.setState(state);
        };
    }
    function enqueueRender(component) {
        if (!component._dirty && (component._dirty = !0) && 1 == items.push(component)) (options.debounceRendering || defer)(rerender);
    }
    function rerender() {
        var p, list = items;
        items = [];
        while (p = list.pop()) if (p._dirty) renderComponent(p);
    }
    function isFunctionalComponent(vnode) {
        var nodeName = vnode && vnode.nodeName;
        return nodeName && isFunction(nodeName) && !(nodeName.prototype && nodeName.prototype.render);
    }
    function buildFunctionalComponent(vnode, context) {
        return vnode.nodeName(getNodeProps(vnode), context || EMPTY);
    }
    function isSameNodeType(node, vnode) {
        if (isString(vnode)) return node instanceof Text;
        if (isString(vnode.nodeName)) return !node._componentConstructor && isNamedNode(node, vnode.nodeName);
        if (isFunction(vnode.nodeName)) return (node._componentConstructor ? node._componentConstructor === vnode.nodeName : !0) || isFunctionalComponent(vnode); else ;
    }
    function isNamedNode(node, nodeName) {
        return node.normalizedNodeName === nodeName || toLowerCase(node.nodeName) === toLowerCase(nodeName);
    }
    function getNodeProps(vnode) {
        var props = clone(vnode.attributes);
        props.children = vnode.children;
        var defaultProps = vnode.nodeName.defaultProps;
        if (defaultProps) for (var i in defaultProps) if (void 0 === props[i]) props[i] = defaultProps[i];
        return props;
    }
    function removeNode(node) {
        var p = node.parentNode;
        if (p) p.removeChild(node);
    }
    function setAccessor(node, name, old, value, isSvg) {
        if ('className' === name) name = 'class';
        if ('class' === name && value && 'object' == typeof value) value = hashToClassName(value);
        if ('key' === name) ; else if ('class' === name && !isSvg) node.className = value || ''; else if ('style' === name) {
            if (!value || isString(value) || isString(old)) node.style.cssText = value || '';
            if (value && 'object' == typeof value) {
                if (!isString(old)) for (var i in old) if (!(i in value)) node.style[i] = '';
                for (var i in value) node.style[i] = 'number' == typeof value[i] && !NON_DIMENSION_PROPS[i] ? value[i] + 'px' : value[i];
            }
        } else if ('dangerouslySetInnerHTML' === name) {
            if (value) node.innerHTML = value.__html || '';
        } else if ('o' == name[0] && 'n' == name[1]) {
            var l = node._listeners || (node._listeners = {});
            name = toLowerCase(name.substring(2));
            if (value) {
                if (!l[name]) node.addEventListener(name, eventProxy, !!NON_BUBBLING_EVENTS[name]);
            } else if (l[name]) node.removeEventListener(name, eventProxy, !!NON_BUBBLING_EVENTS[name]);
            l[name] = value;
        } else if ('list' !== name && 'type' !== name && !isSvg && name in node) {
            setProperty(node, name, null == value ? '' : value);
            if (null == value || value === !1) node.removeAttribute(name);
        } else {
            var ns = isSvg && name.match(/^xlink\:?(.+)/);
            if (null == value || value === !1) if (ns) node.removeAttributeNS('http://www.w3.org/1999/xlink', toLowerCase(ns[1])); else node.removeAttribute(name); else if ('object' != typeof value && !isFunction(value)) if (ns) node.setAttributeNS('http://www.w3.org/1999/xlink', toLowerCase(ns[1]), value); else node.setAttribute(name, value);
        }
    }
    function setProperty(node, name, value) {
        try {
            node[name] = value;
        } catch (e) {}
    }
    function eventProxy(e) {
        return this._listeners[e.type](options.event && options.event(e) || e);
    }
    function collectNode(node) {
        removeNode(node);
        if (node instanceof Element) {
            node._component = node._componentConstructor = null;
            var _name = node.normalizedNodeName || toLowerCase(node.nodeName);
            (nodes[_name] || (nodes[_name] = [])).push(node);
        }
    }
    function createNode(nodeName, isSvg) {
        var name = toLowerCase(nodeName), node = nodes[name] && nodes[name].pop() || (isSvg ? document.createElementNS('http://www.w3.org/2000/svg', nodeName) : document.createElement(nodeName));
        node.normalizedNodeName = name;
        return node;
    }
    function flushMounts() {
        var c;
        while (c = mounts.pop()) {
            if (options.afterMount) options.afterMount(c);
            if (c.componentDidMount) c.componentDidMount();
        }
    }
    function diff(dom, vnode, context, mountAll, parent, componentRoot) {
        if (!diffLevel++) {
            isSvgMode = parent && 'undefined' != typeof parent.ownerSVGElement;
            hydrating = dom && !(ATTR_KEY in dom);
        }
        var ret = idiff(dom, vnode, context, mountAll);
        if (parent && ret.parentNode !== parent) parent.appendChild(ret);
        if (!--diffLevel) {
            hydrating = !1;
            if (!componentRoot) flushMounts();
        }
        return ret;
    }
    function idiff(dom, vnode, context, mountAll) {
        var ref = vnode && vnode.attributes && vnode.attributes.ref;
        while (isFunctionalComponent(vnode)) vnode = buildFunctionalComponent(vnode, context);
        if (null == vnode) vnode = '';
        if (isString(vnode)) {
            if (dom && dom instanceof Text && dom.parentNode) {
                if (dom.nodeValue != vnode) dom.nodeValue = vnode;
            } else {
                if (dom) recollectNodeTree(dom);
                dom = document.createTextNode(vnode);
            }
            return dom;
        }
        if (isFunction(vnode.nodeName)) return buildComponentFromVNode(dom, vnode, context, mountAll);
        var out = dom, nodeName = String(vnode.nodeName), prevSvgMode = isSvgMode, vchildren = vnode.children;
        isSvgMode = 'svg' === nodeName ? !0 : 'foreignObject' === nodeName ? !1 : isSvgMode;
        if (!dom) out = createNode(nodeName, isSvgMode); else if (!isNamedNode(dom, nodeName)) {
            out = createNode(nodeName, isSvgMode);
            while (dom.firstChild) out.appendChild(dom.firstChild);
            if (dom.parentNode) dom.parentNode.replaceChild(out, dom);
            recollectNodeTree(dom);
        }
        var fc = out.firstChild, props = out[ATTR_KEY];
        if (!props) {
            out[ATTR_KEY] = props = {};
            for (var a = out.attributes, i = a.length; i--; ) props[a[i].name] = a[i].value;
        }
        if (!hydrating && vchildren && 1 === vchildren.length && 'string' == typeof vchildren[0] && fc && fc instanceof Text && !fc.nextSibling) {
            if (fc.nodeValue != vchildren[0]) fc.nodeValue = vchildren[0];
        } else if (vchildren && vchildren.length || fc) innerDiffNode(out, vchildren, context, mountAll, !!props.dangerouslySetInnerHTML);
        diffAttributes(out, vnode.attributes, props);
        if (ref) (props.ref = ref)(out);
        isSvgMode = prevSvgMode;
        return out;
    }
    function innerDiffNode(dom, vchildren, context, mountAll, absorb) {
        var j, c, vchild, child, originalChildren = dom.childNodes, children = [], keyed = {}, keyedLen = 0, min = 0, len = originalChildren.length, childrenLen = 0, vlen = vchildren && vchildren.length;
        if (len) for (var i = 0; i < len; i++) {
            var _child = originalChildren[i], props = _child[ATTR_KEY], key = vlen ? (c = _child._component) ? c.__key : props ? props.key : null : null;
            if (null != key) {
                keyedLen++;
                keyed[key] = _child;
            } else if (hydrating || absorb || props || _child instanceof Text) children[childrenLen++] = _child;
        }
        if (vlen) for (var i = 0; i < vlen; i++) {
            vchild = vchildren[i];
            child = null;
            var key = vchild.key;
            if (null != key) {
                if (keyedLen && key in keyed) {
                    child = keyed[key];
                    keyed[key] = void 0;
                    keyedLen--;
                }
            } else if (!child && min < childrenLen) for (j = min; j < childrenLen; j++) {
                c = children[j];
                if (c && isSameNodeType(c, vchild)) {
                    child = c;
                    children[j] = void 0;
                    if (j === childrenLen - 1) childrenLen--;
                    if (j === min) min++;
                    break;
                }
            }
            child = idiff(child, vchild, context, mountAll);
            if (child && child !== dom) if (i >= len) dom.appendChild(child); else if (child !== originalChildren[i]) {
                if (child === originalChildren[i + 1]) removeNode(originalChildren[i]);
                dom.insertBefore(child, originalChildren[i] || null);
            }
        }
        if (keyedLen) for (var i in keyed) if (keyed[i]) recollectNodeTree(keyed[i]);
        while (min <= childrenLen) {
            child = children[childrenLen--];
            if (child) recollectNodeTree(child);
        }
    }
    function recollectNodeTree(node, unmountOnly) {
        var component = node._component;
        if (component) unmountComponent(component, !unmountOnly); else {
            if (node[ATTR_KEY] && node[ATTR_KEY].ref) node[ATTR_KEY].ref(null);
            if (!unmountOnly) collectNode(node);
            var c;
            while (c = node.lastChild) recollectNodeTree(c, unmountOnly);
        }
    }
    function diffAttributes(dom, attrs, old) {
        var name;
        for (name in old) if (!(attrs && name in attrs) && null != old[name]) setAccessor(dom, name, old[name], old[name] = void 0, isSvgMode);
        if (attrs) for (name in attrs) if (!('children' === name || 'innerHTML' === name || name in old && attrs[name] === ('value' === name || 'checked' === name ? dom[name] : old[name]))) setAccessor(dom, name, old[name], old[name] = attrs[name], isSvgMode);
    }
    function collectComponent(component) {
        var name = component.constructor.name, list = components[name];
        if (list) list.push(component); else components[name] = [ component ];
    }
    function createComponent(Ctor, props, context) {
        var inst = new Ctor(props, context), list = components[Ctor.name];
        Component.call(inst, props, context);
        if (list) for (var i = list.length; i--; ) if (list[i].constructor === Ctor) {
            inst.nextBase = list[i].nextBase;
            list.splice(i, 1);
            break;
        }
        return inst;
    }
    function setComponentProps(component, props, opts, context, mountAll) {
        if (!component._disable) {
            component._disable = !0;
            if (component.__ref = props.ref) delete props.ref;
            if (component.__key = props.key) delete props.key;
            if (!component.base || mountAll) {
                if (component.componentWillMount) component.componentWillMount();
            } else if (component.componentWillReceiveProps) component.componentWillReceiveProps(props, context);
            if (context && context !== component.context) {
                if (!component.prevContext) component.prevContext = component.context;
                component.context = context;
            }
            if (!component.prevProps) component.prevProps = component.props;
            component.props = props;
            component._disable = !1;
            if (0 !== opts) if (1 === opts || options.syncComponentUpdates !== !1 || !component.base) renderComponent(component, 1, mountAll); else enqueueRender(component);
            if (component.__ref) component.__ref(component);
        }
    }
    function renderComponent(component, opts, mountAll, isChild) {
        if (!component._disable) {
            var skip, rendered, inst, cbase, props = component.props, state = component.state, context = component.context, previousProps = component.prevProps || props, previousState = component.prevState || state, previousContext = component.prevContext || context, isUpdate = component.base, nextBase = component.nextBase, initialBase = isUpdate || nextBase, initialChildComponent = component._component;
            if (isUpdate) {
                component.props = previousProps;
                component.state = previousState;
                component.context = previousContext;
                if (2 !== opts && component.shouldComponentUpdate && component.shouldComponentUpdate(props, state, context) === !1) skip = !0; else if (component.componentWillUpdate) component.componentWillUpdate(props, state, context);
                component.props = props;
                component.state = state;
                component.context = context;
            }
            component.prevProps = component.prevState = component.prevContext = component.nextBase = null;
            component._dirty = !1;
            if (!skip) {
                if (component.render) rendered = component.render(props, state, context);
                if (component.getChildContext) context = extend(clone(context), component.getChildContext());
                while (isFunctionalComponent(rendered)) rendered = buildFunctionalComponent(rendered, context);
                var toUnmount, base, childComponent = rendered && rendered.nodeName;
                if (isFunction(childComponent)) {
                    var childProps = getNodeProps(rendered);
                    inst = initialChildComponent;
                    if (inst && inst.constructor === childComponent && childProps.key == inst.__key) setComponentProps(inst, childProps, 1, context); else {
                        toUnmount = inst;
                        inst = createComponent(childComponent, childProps, context);
                        inst.nextBase = inst.nextBase || nextBase;
                        inst._parentComponent = component;
                        component._component = inst;
                        setComponentProps(inst, childProps, 0, context);
                        renderComponent(inst, 1, mountAll, !0);
                    }
                    base = inst.base;
                } else {
                    cbase = initialBase;
                    toUnmount = initialChildComponent;
                    if (toUnmount) cbase = component._component = null;
                    if (initialBase || 1 === opts) {
                        if (cbase) cbase._component = null;
                        base = diff(cbase, rendered, context, mountAll || !isUpdate, initialBase && initialBase.parentNode, !0);
                    }
                }
                if (initialBase && base !== initialBase && inst !== initialChildComponent) {
                    var baseParent = initialBase.parentNode;
                    if (baseParent && base !== baseParent) {
                        baseParent.replaceChild(base, initialBase);
                        if (!toUnmount) {
                            initialBase._component = null;
                            recollectNodeTree(initialBase);
                        }
                    }
                }
                if (toUnmount) unmountComponent(toUnmount, base !== initialBase);
                component.base = base;
                if (base && !isChild) {
                    var componentRef = component, t = component;
                    while (t = t._parentComponent) (componentRef = t).base = base;
                    base._component = componentRef;
                    base._componentConstructor = componentRef.constructor;
                }
            }
            if (!isUpdate || mountAll) mounts.unshift(component); else if (!skip) {
                if (component.componentDidUpdate) component.componentDidUpdate(previousProps, previousState, previousContext);
                if (options.afterUpdate) options.afterUpdate(component);
            }
            var fn, cb = component._renderCallbacks;
            if (cb) while (fn = cb.pop()) fn.call(component);
            if (!diffLevel && !isChild) flushMounts();
        }
    }
    function buildComponentFromVNode(dom, vnode, context, mountAll) {
        var c = dom && dom._component, originalComponent = c, oldDom = dom, isDirectOwner = c && dom._componentConstructor === vnode.nodeName, isOwner = isDirectOwner, props = getNodeProps(vnode);
        while (c && !isOwner && (c = c._parentComponent)) isOwner = c.constructor === vnode.nodeName;
        if (c && isOwner && (!mountAll || c._component)) {
            setComponentProps(c, props, 3, context, mountAll);
            dom = c.base;
        } else {
            if (originalComponent && !isDirectOwner) {
                unmountComponent(originalComponent, !0);
                dom = oldDom = null;
            }
            c = createComponent(vnode.nodeName, props, context);
            if (dom && !c.nextBase) {
                c.nextBase = dom;
                oldDom = null;
            }
            setComponentProps(c, props, 1, context, mountAll);
            dom = c.base;
            if (oldDom && dom !== oldDom) {
                oldDom._component = null;
                recollectNodeTree(oldDom);
            }
        }
        return dom;
    }
    function unmountComponent(component, remove) {
        if (options.beforeUnmount) options.beforeUnmount(component);
        var base = component.base;
        component._disable = !0;
        if (component.componentWillUnmount) component.componentWillUnmount();
        component.base = null;
        var inner = component._component;
        if (inner) unmountComponent(inner, remove); else if (base) {
            if (base[ATTR_KEY] && base[ATTR_KEY].ref) base[ATTR_KEY].ref(null);
            component.nextBase = base;
            if (remove) {
                removeNode(base);
                collectComponent(component);
            }
            var c;
            while (c = base.lastChild) recollectNodeTree(c, !remove);
        }
        if (component.__ref) component.__ref(null);
        if (component.componentDidUnmount) component.componentDidUnmount();
    }
    function Component(props, context) {
        this._dirty = !0;
        this.context = context;
        this.props = props;
        if (!this.state) this.state = {};
    }
    function render(vnode, parent, merge) {
        return diff(merge, vnode, {}, !1, parent);
    }
    var options = {};
    var stack = [];
    var EMPTY_CHILDREN = [];
    var lcCache = {};
    var toLowerCase = function(s) {
        return lcCache[s] || (lcCache[s] = s.toLowerCase());
    };
    var resolved = 'undefined' != typeof Promise && Promise.resolve();
    var defer = resolved ? function(f) {
        resolved.then(f);
    } : setTimeout;
    var EMPTY = {};
    var ATTR_KEY = 'undefined' != typeof Symbol ? Symbol.for('preactattr') : '__preactattr_';
    var NON_DIMENSION_PROPS = {
        boxFlex: 1,
        boxFlexGroup: 1,
        columnCount: 1,
        fillOpacity: 1,
        flex: 1,
        flexGrow: 1,
        flexPositive: 1,
        flexShrink: 1,
        flexNegative: 1,
        fontWeight: 1,
        lineClamp: 1,
        lineHeight: 1,
        opacity: 1,
        order: 1,
        orphans: 1,
        strokeOpacity: 1,
        widows: 1,
        zIndex: 1,
        zoom: 1
    };
    var NON_BUBBLING_EVENTS = {
        blur: 1,
        error: 1,
        focus: 1,
        load: 1,
        resize: 1,
        scroll: 1
    };
    var items = [];
    var nodes = {};
    var mounts = [];
    var diffLevel = 0;
    var isSvgMode = !1;
    var hydrating = !1;
    var components = {};
    extend(Component.prototype, {
        linkState: function(key, eventPath) {
            var c = this._linkedStates || (this._linkedStates = {});
            return c[key + eventPath] || (c[key + eventPath] = createLinkedState(this, key, eventPath));
        },
        setState: function(state, callback) {
            var s = this.state;
            if (!this.prevState) this.prevState = clone(s);
            extend(s, isFunction(state) ? state(s, this.props) : state);
            if (callback) (this._renderCallbacks = this._renderCallbacks || []).push(callback);
            enqueueRender(this);
        },
        forceUpdate: function() {
            renderComponent(this, 2);
        },
        render: function() {}
    });
    exports.h = h;
    exports.cloneElement = cloneElement;
    exports.Component = Component;
    exports.render = render;
    exports.rerender = rerender;
    exports.options = options;
});
//# sourceMappingURL=preact.js.map

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__MooltipassMenu__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Settings__ = __webpack_require__(4);




__webpack_require__(9);

class MooltipassApp extends __WEBPACK_IMPORTED_MODULE_0_preact___default.a.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: __WEBPACK_IMPORTED_MODULE_2__Settings__["a" /* default */]
    };
  }

  navigateTo(page) {
    this.setState({ page });
  }

  render(props, state) {
    const Page = state.page;
    return __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
      'div',
      null,
      __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(__WEBPACK_IMPORTED_MODULE_1__MooltipassMenu__["a" /* default */], {
        activeMenu: state.page.name,
        navigateTo: this.navigateTo.bind(this)
      }),
      __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(Page, null)
    );
  }
}

/* harmony default export */ __webpack_exports__["a"] = MooltipassApp;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_MooltipassApp__ = __webpack_require__(1);



__WEBPACK_IMPORTED_MODULE_0_preact___default.a.render(__WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(__WEBPACK_IMPORTED_MODULE_1__components_MooltipassApp__["a" /* default */], null), document.getElementById('app'));

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Settings__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Credentials__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Synchronization__ = __webpack_require__(6);
/* harmony export (immutable) */ __webpack_exports__["a"] = MooltipassMenu;





function MooltipassMenu({ activeMenu, navigateTo }) {
  return __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
    'nav',
    { className: 'menu' },
    __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
      'a',
      {
        className: `menu-item ${activeMenu === 'Settings' ? 'active' : ''}`,
        onClick: () => navigateTo(__WEBPACK_IMPORTED_MODULE_1__Settings__["a" /* default */])
      },
      'Settings'
    ),
    __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
      'a',
      {
        className: `menu-item ${activeMenu === 'Credentials' ? 'active' : ''}`,
        onClick: () => navigateTo(__WEBPACK_IMPORTED_MODULE_2__Credentials__["a" /* default */])
      },
      'Credentials'
    ),
    __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
      'a',
      {
        className: `menu-item ${activeMenu === 'Synchronization' ? 'active' : ''}`,
        onClick: () => navigateTo(__WEBPACK_IMPORTED_MODULE_3__Synchronization__["a" /* default */])
      },
      'Synchronization'
    )
  );
}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony export (immutable) */ __webpack_exports__["a"] = Settings;


function Settings(props) {
  return __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
    'div',
    null,
    __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
      'h1',
      null,
      'Device settings - Firmware v1.2_mini'
    ),
    __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
      'form',
      null,
      __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
        'section',
        null,
        __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
          'h2',
          { className: 'section-label' },
          'Keyboard Output'
        ),
        __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
          'div',
          { className: 'section-content' },
          __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
            'div',
            { className: 'form-group' },
            __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
              'label',
              { htmlFor: 'keyboard' },
              'Configured keyboard layout',
              __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
                'select',
                { name: 'keyboard', id: 'keyboard' },
                __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
                  'option',
                  { value: 'en_US' },
                  'en_US'
                ),
                __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
                  'option',
                  { value: 'en_GB' },
                  'en_GB'
                ),
                __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
                  'option',
                  { value: 'fr_FR' },
                  'fr_fr'
                )
              )
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
            'div',
            { className: 'form-group checkbox' },
            __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
              'label',
              { htmlFor: 'slow_computer' },
              __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h('input', { type: 'checkbox', id: 'slow_computer' }),
              'For slow computers: wait',
              __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
                'select',
                { name: 'slow_time', id: 'slow_time' },
                __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
                  'option',
                  { value: '5' },
                  '5'
                ),
                __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
                  'option',
                  { value: '10' },
                  '10'
                ),
                __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
                  'option',
                  { value: '15' },
                  '15'
                ),
                __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
                  'option',
                  { value: '30' },
                  '30'
                ),
                __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
                  'option',
                  { value: '100' },
                  '100'
                )
              ),
              'ms after each key press'
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
            'div',
            { className: 'form-group checkbox' },
            __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
              'label',
              { htmlFor: 'after_login_ouptut' },
              __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h('input', { type: 'checkbox', id: 'after_login_ouptut' }),
              'Send',
              __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
                'select',
                { name: 'after_login_ouput_key', id: 'after_login_output_key' },
                __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
                  'option',
                  { defaultSelected: true, value: 'Tab' },
                  'Tab'
                ),
                __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
                  'option',
                  { value: 'Enter' },
                  'Enter'
                ),
                __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
                  'option',
                  { value: 'Space' },
                  'Space'
                )
              )
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
            'div',
            { className: 'form-group checkbox' },
            __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
              'label',
              { htmlFor: 'after_password_ouptut' },
              __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h('input', { type: 'checkbox', id: 'after_password_ouptut' }),
              'Send',
              __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
                'select',
                { name: 'after_password_ouput_key', id: 'after_password_output_key' },
                __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
                  'option',
                  { value: 'Tab' },
                  'Tab'
                ),
                __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
                  'option',
                  { defaultSelected: true, value: 'Enter' },
                  'Enter'
                ),
                __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
                  'option',
                  { value: 'Space' },
                  'Space'
                )
              )
            )
          )
        )
      ),
      __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
        'section',
        null,
        __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
          'h2',
          { className: 'section-label' },
          'Inactivity'
        ),
        __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
          'div',
          { className: 'section-content' },
          __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
            'div',
            { className: 'form-group' },
            __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
              'label',
              { htmlFor: 'cancel_after' },
              'Cancel credentials request after',
              __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
                'select',
                { name: 'cancel_after', id: 'cancel_after' },
                __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
                  'option',
                  { value: '5' },
                  '5'
                ),
                __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
                  'option',
                  { value: '10' },
                  '10'
                ),
                __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
                  'option',
                  { value: '15' },
                  '15'
                ),
                __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
                  'option',
                  { value: '30' },
                  '30'
                ),
                __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
                  'option',
                  { value: '100' },
                  '100'
                )
              )
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
            'div',
            { className: 'form-group checkbox' },
            __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
              'label',
              { htmlFor: 'lock_after' },
              __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h('input', { type: 'checkbox', id: 'lock_after' }),
              'Lock after',
              __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h('input', { type: 'text', name: 'lock_after_time', id: 'lock_after_time' }),
              'minutes inactivity'
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
            'div',
            { className: 'form-group checkbox' },
            __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
              'label',
              { htmlFor: 'screensaver' },
              __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h('input', { type: 'checkbox', id: 'screensaver' }),
              'Use screen saver'
            )
          )
        )
      ),
      __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
        'section',
        null,
        __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
          'h2',
          { className: 'section-label' },
          'Miscellaneous'
        ),
        __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
          'div',
          { className: 'section-content' },
          __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
            'div',
            { className: 'form-group' },
            __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
              'label',
              { htmlFor: 'brightness' },
              'Configure screen brightness',
              __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
                'select',
                { name: 'brightness', id: 'brightness' },
                __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
                  'option',
                  { value: '20' },
                  '20'
                ),
                __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
                  'option',
                  { value: '35' },
                  '35'
                ),
                __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
                  'option',
                  { value: '50' },
                  '50'
                ),
                __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
                  'option',
                  { value: '65' },
                  '65'
                ),
                __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
                  'option',
                  { value: '80' },
                  '80'
                ),
                __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
                  'option',
                  { value: '100' },
                  '100'
                )
              )
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
            'div',
            { className: 'form-group checkbox' },
            __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
              'label',
              { htmlFor: 'knock_feature' },
              __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h('input', { type: 'checkbox', id: 'knock_feature' }),
              'Enable knock detecting feature with',
              __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
                'select',
                { name: 'knock_feature_sensitivity', id: 'knock_feature_sensitivity' },
                __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
                  'option',
                  { value: 'low' },
                  'low'
                ),
                __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
                  'option',
                  { value: 'medium' },
                  'medium'
                ),
                __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
                  'option',
                  { value: 'high' },
                  'high'
                )
              ),
              'sensitivity'
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
            'div',
            { className: 'form-group checkbox' },
            __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
              'label',
              { htmlFor: 'no_host_boot' },
              __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h('input', { type: 'checkbox', id: 'no_host_boot' }),
              'Allow boot without host (e.g. usb battery / charger)'
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
            'div',
            { className: 'form-group checkbox' },
            __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
              'label',
              { htmlFor: 'flash_screen' },
              __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h('input', { type: 'checkbox', id: 'flash_screen' }),
              'Flash screen when input is required'
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
            'div',
            { className: 'form-group checkbox' },
            __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
              'label',
              { htmlFor: 'tutorial' },
              __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h('input', { type: 'checkbox', id: 'tutorial' }),
              'Enable device tutorial'
            )
          )
        )
      )
    )
  );
}

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony export (immutable) */ __webpack_exports__["a"] = Credentials;


function Credentials(props) {
  return __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
    'div',
    null,
    __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
      'h1',
      null,
      'Credentials'
    )
  );
}

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony export (immutable) */ __webpack_exports__["a"] = Synchronization;


function Synchronization(props) {
  return __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
    'div',
    null,
    __WEBPACK_IMPORTED_MODULE_0_preact___default.a.h(
      'h1',
      null,
      'Synchronization'
    )
  );
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)();
// imports


// module
exports.push([module.i, "* {\n  box-sizing: border-box; }\n\n.menu {\n  width: 100%; }\n\n.menu-item {\n  display: inline-block;\n  text-align: center;\n  padding: 10px 0 10px;\n  width: 32%;\n  box-sizing: border-box;\n  cursor: pointer; }\n  .menu-item.active {\n    border-bottom: 2px solid #cecece;\n    cursor: initial; }\n\n.form-group {\n  margin-bottom: 5px;\n  position: relative; }\n\n.form-group label input[type=text],\n.form-group label select {\n  margin-left: 5px;\n  margin-right: 5px; }\n\nlabel {\n  height: 34px;\n  display: inline-block;\n  line-height: 1.42;\n  font-size: 14px;\n  color: #555; }\n\ninput[type=text],\nselect {\n  border: 1px solid #cecece;\n  border-radius: 0;\n  box-shadow: none;\n  height: 34px;\n  display: inline-block;\n  padding: 6px 12px;\n  font-size: 14px;\n  line-height: 1.42;\n  color: #555;\n  background: white; }\n\n.form-group.checkbox label {\n  padding-left: 20px; }\n  .form-group.checkbox label input[type=checkbox] {\n    margin-top: 10px;\n    margin-left: -20px;\n    position: absolute; }\n", ""]);

// exports


/***/ }),
/* 8 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(7);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(8)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/sass-loader/lib/loader.js!./app.scss", function() {
			var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/sass-loader/lib/loader.js!./app.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 10 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ })
/******/ ]);