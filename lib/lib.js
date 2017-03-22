(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
/**
 * @license Angular v2.4.10
 * (c) 2010-2017 Google, Inc. https://angular.io/
 * License: MIT
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rxjs/symbol/observable'), require('rxjs/Subject'), require('rxjs/Observable')) :
    typeof define === 'function' && define.amd ? define(['exports', 'rxjs/symbol/observable', 'rxjs/Subject', 'rxjs/Observable'], factory) :
    (factory((global.ng = global.ng || {}, global.ng.core = global.ng.core || {}),global.rxjs_symbol_observable,global.Rx,global.Rx));
}(this, function (exports,rxjs_symbol_observable,rxjs_Subject,rxjs_Observable) { 'use strict';

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var /** @type {?} */ globalScope;
    if (typeof window === 'undefined') {
        if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) {
            // TODO: Replace any with WorkerGlobalScope from lib.webworker.d.ts #3492
            globalScope = (self);
        }
        else {
            globalScope = (global);
        }
    }
    else {
        globalScope = (window);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    function scheduleMicroTask(fn) {
        Zone.current.scheduleMicroTask('scheduleMicrotask', fn);
    }
    // Need to declare a new variable for global here since TypeScript
    // exports the original value of the symbol.
    var /** @type {?} */ global$1 = globalScope;
    /**
     * @param {?} type
     * @return {?}
     */
    function getTypeNameForDebugging(type) {
        return type['name'] || typeof type;
    }
    // TODO: remove calls to assert in production environment
    // Note: Can't just export this and import in in other files
    // as `assert` is a reserved keyword in Dart
    global$1.assert = function assert(condition) {
        // TODO: to be fixed properly via #2830, noop for now
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    function isPresent(obj) {
        return obj != null;
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    function isBlank(obj) {
        return obj == null;
    }
    /**
     * @param {?} token
     * @return {?}
     */
    function stringify(token) {
        if (typeof token === 'string') {
            return token;
        }
        if (token == null) {
            return '' + token;
        }
        if (token.overriddenName) {
            return "" + token.overriddenName;
        }
        if (token.name) {
            return "" + token.name;
        }
        var /** @type {?} */ res = token.toString();
        var /** @type {?} */ newLineIndex = res.indexOf('\n');
        return newLineIndex === -1 ? res : res.substring(0, newLineIndex);
    }
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    function looseIdentical(a, b) {
        return a === b || typeof a === 'number' && typeof b === 'number' && isNaN(a) && isNaN(b);
    }
    /**
     * @param {?} o
     * @return {?}
     */
    function isJsObject(o) {
        return o !== null && (typeof o === 'function' || typeof o === 'object');
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    function print(obj) {
        // tslint:disable-next-line:no-console
        console.log(obj);
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    function warn(obj) {
        console.warn(obj);
    }
    var /** @type {?} */ _symbolIterator = null;
    /**
     * @return {?}
     */
    function getSymbolIterator() {
        if (!_symbolIterator) {
            if (((globalScope)).Symbol && Symbol.iterator) {
                _symbolIterator = Symbol.iterator;
            }
            else {
                // es6-shim specific logic
                var /** @type {?} */ keys = Object.getOwnPropertyNames(Map.prototype);
                for (var /** @type {?} */ i = 0; i < keys.length; ++i) {
                    var /** @type {?} */ key = keys[i];
                    if (key !== 'entries' && key !== 'size' &&
                        ((Map)).prototype[key] === Map.prototype['entries']) {
                        _symbolIterator = key;
                    }
                }
            }
        }
        return _symbolIterator;
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    function isPrimitive(obj) {
        return !isJsObject(obj);
    }

    var /** @type {?} */ _nextClassId = 0;
    var /** @type {?} */ Reflect = global$1.Reflect;
    /**
     * @param {?} annotation
     * @return {?}
     */
    function extractAnnotation(annotation) {
        if (typeof annotation === 'function' && annotation.hasOwnProperty('annotation')) {
            // it is a decorator, extract annotation
            annotation = annotation.annotation;
        }
        return annotation;
    }
    /**
     * @param {?} fnOrArray
     * @param {?} key
     * @return {?}
     */
    function applyParams(fnOrArray, key) {
        if (fnOrArray === Object || fnOrArray === String || fnOrArray === Function ||
            fnOrArray === Number || fnOrArray === Array) {
            throw new Error("Can not use native " + stringify(fnOrArray) + " as constructor");
        }
        if (typeof fnOrArray === 'function') {
            return fnOrArray;
        }
        if (Array.isArray(fnOrArray)) {
            var /** @type {?} */ annotations = fnOrArray;
            var /** @type {?} */ annoLength = annotations.length - 1;
            var /** @type {?} */ fn = fnOrArray[annoLength];
            if (typeof fn !== 'function') {
                throw new Error("Last position of Class method array must be Function in key " + key + " was '" + stringify(fn) + "'");
            }
            if (annoLength != fn.length) {
                throw new Error("Number of annotations (" + annoLength + ") does not match number of arguments (" + fn.length + ") in the function: " + stringify(fn));
            }
            var /** @type {?} */ paramsAnnotations = [];
            for (var /** @type {?} */ i = 0, /** @type {?} */ ii = annotations.length - 1; i < ii; i++) {
                var /** @type {?} */ paramAnnotations = [];
                paramsAnnotations.push(paramAnnotations);
                var /** @type {?} */ annotation = annotations[i];
                if (Array.isArray(annotation)) {
                    for (var /** @type {?} */ j = 0; j < annotation.length; j++) {
                        paramAnnotations.push(extractAnnotation(annotation[j]));
                    }
                }
                else if (typeof annotation === 'function') {
                    paramAnnotations.push(extractAnnotation(annotation));
                }
                else {
                    paramAnnotations.push(annotation);
                }
            }
            Reflect.defineMetadata('parameters', paramsAnnotations, fn);
            return fn;
        }
        throw new Error("Only Function or Array is supported in Class definition for key '" + key + "' is '" + stringify(fnOrArray) + "'");
    }
    /**
     * Provides a way for expressing ES6 classes with parameter annotations in ES5.
     *
     * ## Basic Example
     *
     * ```
     * var Greeter = ng.Class({
     *   constructor: function(name) {
     *     this.name = name;
     *   },
     *
     *   greet: function() {
     *     alert('Hello ' + this.name + '!');
     *   }
     * });
     * ```
     *
     * is equivalent to ES6:
     *
     * ```
     * class Greeter {
     *   constructor(name) {
     *     this.name = name;
     *   }
     *
     *   greet() {
     *     alert('Hello ' + this.name + '!');
     *   }
     * }
     * ```
     *
     * or equivalent to ES5:
     *
     * ```
     * var Greeter = function (name) {
     *   this.name = name;
     * }
     *
     * Greeter.prototype.greet = function () {
     *   alert('Hello ' + this.name + '!');
     * }
     * ```
     *
     * ### Example with parameter annotations
     *
     * ```
     * var MyService = ng.Class({
     *   constructor: [String, [new Optional(), Service], function(name, myService) {
     *     ...
     *   }]
     * });
     * ```
     *
     * is equivalent to ES6:
     *
     * ```
     * class MyService {
     *   constructor(name: string, \@Optional() myService: Service) {
     *     ...
     *   }
     * }
     * ```
     *
     * ### Example with inheritance
     *
     * ```
     * var Shape = ng.Class({
     *   constructor: (color) {
     *     this.color = color;
     *   }
     * });
     *
     * var Square = ng.Class({
     *   extends: Shape,
     *   constructor: function(color, size) {
     *     Shape.call(this, color);
     *     this.size = size;
     *   }
     * });
     * ```
     * \@stable
     * @param {?} clsDef
     * @return {?}
     */
    function Class(clsDef) {
        var /** @type {?} */ constructor = applyParams(clsDef.hasOwnProperty('constructor') ? clsDef.constructor : undefined, 'constructor');
        var /** @type {?} */ proto = constructor.prototype;
        if (clsDef.hasOwnProperty('extends')) {
            if (typeof clsDef.extends === 'function') {
                ((constructor)).prototype = proto =
                    Object.create(((clsDef.extends)).prototype);
            }
            else {
                throw new Error("Class definition 'extends' property must be a constructor function was: " + stringify(clsDef.extends));
            }
        }
        for (var key in clsDef) {
            if (key !== 'extends' && key !== 'prototype' && clsDef.hasOwnProperty(key)) {
                proto[key] = applyParams(clsDef[key], key);
            }
        }
        if (this && this.annotations instanceof Array) {
            Reflect.defineMetadata('annotations', this.annotations, constructor);
        }
        var /** @type {?} */ constructorName = constructor['name'];
        if (!constructorName || constructorName === 'constructor') {
            ((constructor))['overriddenName'] = "class" + _nextClassId++;
        }
        return (constructor);
    }
    /**
     * @param {?} name
     * @param {?} props
     * @param {?=} parentClass
     * @param {?=} chainFn
     * @return {?}
     */
    function makeDecorator(name, props, parentClass, chainFn) {
        if (chainFn === void 0) { chainFn = null; }
        var /** @type {?} */ metaCtor = makeMetadataCtor([props]);
        /**
         * @param {?} objOrType
         * @return {?}
         */
        function DecoratorFactory(objOrType) {
            if (!(Reflect && Reflect.getOwnMetadata)) {
                throw 'reflect-metadata shim is required when using class decorators';
            }
            if (this instanceof DecoratorFactory) {
                metaCtor.call(this, objOrType);
                return this;
            }
            var /** @type {?} */ annotationInstance = new ((DecoratorFactory))(objOrType);
            var /** @type {?} */ chainAnnotation = typeof this === 'function' && Array.isArray(this.annotations) ? this.annotations : [];
            chainAnnotation.push(annotationInstance);
            var /** @type {?} */ TypeDecorator = (function TypeDecorator(cls) {
                var /** @type {?} */ annotations = Reflect.getOwnMetadata('annotations', cls) || [];
                annotations.push(annotationInstance);
                Reflect.defineMetadata('annotations', annotations, cls);
                return cls;
            });
            TypeDecorator.annotations = chainAnnotation;
            TypeDecorator.Class = Class;
            if (chainFn)
                chainFn(TypeDecorator);
            return TypeDecorator;
        }
        if (parentClass) {
            DecoratorFactory.prototype = Object.create(parentClass.prototype);
        }
        DecoratorFactory.prototype.toString = function () { return ("@" + name); };
        ((DecoratorFactory)).annotationCls = DecoratorFactory;
        return DecoratorFactory;
    }
    /**
     * @param {?} props
     * @return {?}
     */
    function makeMetadataCtor(props) {
        return function ctor() {
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            props.forEach(function (prop, i) {
                var /** @type {?} */ argVal = args[i];
                if (Array.isArray(prop)) {
                    // plain parameter
                    _this[prop[0]] = argVal === undefined ? prop[1] : argVal;
                }
                else {
                    for (var propName in prop) {
                        _this[propName] =
                            argVal && argVal.hasOwnProperty(propName) ? argVal[propName] : prop[propName];
                    }
                }
            });
        };
    }
    /**
     * @param {?} name
     * @param {?} props
     * @param {?=} parentClass
     * @return {?}
     */
    function makeParamDecorator(name, props, parentClass) {
        var /** @type {?} */ metaCtor = makeMetadataCtor(props);
        /**
         * @param {...?} args
         * @return {?}
         */
        function ParamDecoratorFactory() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            if (this instanceof ParamDecoratorFactory) {
                metaCtor.apply(this, args);
                return this;
            }
            var /** @type {?} */ annotationInstance = new ((_a = ((ParamDecoratorFactory))).bind.apply(_a, [void 0].concat(args)))();
            ((ParamDecorator)).annotation = annotationInstance;
            return ParamDecorator;
            /**
             * @param {?} cls
             * @param {?} unusedKey
             * @param {?} index
             * @return {?}
             */
            function ParamDecorator(cls, unusedKey, index) {
                var /** @type {?} */ parameters = Reflect.getOwnMetadata('parameters', cls) || [];
                // there might be gaps if some in between parameters do not have annotations.
                // we pad with nulls.
                while (parameters.length <= index) {
                    parameters.push(null);
                }
                parameters[index] = parameters[index] || [];
                parameters[index].push(annotationInstance);
                Reflect.defineMetadata('parameters', parameters, cls);
                return cls;
            }
            var _a;
        }
        if (parentClass) {
            ParamDecoratorFactory.prototype = Object.create(parentClass.prototype);
        }
        ParamDecoratorFactory.prototype.toString = function () { return ("@" + name); };
        ((ParamDecoratorFactory)).annotationCls = ParamDecoratorFactory;
        return ParamDecoratorFactory;
    }
    /**
     * @param {?} name
     * @param {?} props
     * @param {?=} parentClass
     * @return {?}
     */
    function makePropDecorator(name, props, parentClass) {
        var /** @type {?} */ metaCtor = makeMetadataCtor(props);
        /**
         * @param {...?} args
         * @return {?}
         */
        function PropDecoratorFactory() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            if (this instanceof PropDecoratorFactory) {
                metaCtor.apply(this, args);
                return this;
            }
            var /** @type {?} */ decoratorInstance = new ((_a = ((PropDecoratorFactory))).bind.apply(_a, [void 0].concat(args)))();
            return function PropDecorator(target, name) {
                var /** @type {?} */ meta = Reflect.getOwnMetadata('propMetadata', target.constructor) || {};
                meta[name] = meta.hasOwnProperty(name) && meta[name] || [];
                meta[name].unshift(decoratorInstance);
                Reflect.defineMetadata('propMetadata', meta, target.constructor);
            };
            var _a;
        }
        if (parentClass) {
            PropDecoratorFactory.prototype = Object.create(parentClass.prototype);
        }
        PropDecoratorFactory.prototype.toString = function () { return ("@" + name); };
        ((PropDecoratorFactory)).annotationCls = PropDecoratorFactory;
        return PropDecoratorFactory;
    }

    /**
     * Inject decorator and metadata.
     *
     * @stable
     * @Annotation
     */
    var /** @type {?} */ Inject = makeParamDecorator('Inject', [['token', undefined]]);
    /**
     * Optional decorator and metadata.
     *
     * @stable
     * @Annotation
     */
    var /** @type {?} */ Optional = makeParamDecorator('Optional', []);
    /**
     * Injectable decorator and metadata.
     *
     * @stable
     * @Annotation
     */
    var /** @type {?} */ Injectable = (makeDecorator('Injectable', []));
    /**
     * Self decorator and metadata.
     *
     * @stable
     * @Annotation
     */
    var /** @type {?} */ Self = makeParamDecorator('Self', []);
    /**
     * SkipSelf decorator and metadata.
     *
     * @stable
     * @Annotation
     */
    var /** @type {?} */ SkipSelf = makeParamDecorator('SkipSelf', []);
    /**
     * Host decorator and metadata.
     *
     * @stable
     * @Annotation
     */
    var /** @type {?} */ Host = makeParamDecorator('Host', []);

    var OpaqueToken = (function () {
        /**
         * @param {?} _desc
         */
        function OpaqueToken(_desc) {
            this._desc = _desc;
        }
        /**
         * @return {?}
         */
        OpaqueToken.prototype.toString = function () { return "Token " + this._desc; };
        OpaqueToken.decorators = [
            { type: Injectable },
        ];
        /** @nocollapse */
        OpaqueToken.ctorParameters = function () { return [
            null,
        ]; };
        return OpaqueToken;
    }());

    /**
     * This token can be used to create a virtual provider that will populate the
     * `entryComponents` fields of components and ng modules based on its `useValue`.
     * All components that are referenced in the `useValue` value (either directly
     * or in a nested array or map) will be added to the `entryComponents` property.
     *
     * ### Example
     * The following example shows how the router can populate the `entryComponents`
     * field of an NgModule based on the router configuration which refers
     * to components.
     *
     * ```typescript
     * // helper function inside the router
     * function provideRoutes(routes) {
     *   return [
     *     {provide: ROUTES, useValue: routes},
     *     {provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: routes, multi: true}
     *   ];
     * }
     *
     * // user code
     * let routes = [
     *   {path: '/root', component: RootComp},
     *   {path: '/teams', component: TeamsComp}
     * ];
     *
     * @NgModule({
     *   providers: [provideRoutes(routes)]
     * })
     * class ModuleWithRoutes {}
     * ```
     *
     * @experimental
     */
    var /** @type {?} */ ANALYZE_FOR_ENTRY_COMPONENTS = new OpaqueToken('AnalyzeForEntryComponents');
    /**
     * Attribute decorator and metadata.
     *
     * @stable
     * @Annotation
     */
    var /** @type {?} */ Attribute = makeParamDecorator('Attribute', [['attributeName', undefined]]);
    /**
     * Base class for query metadata.
     *
     * See {\@link ContentChildren}, {\@link ContentChild}, {\@link ViewChildren}, {\@link ViewChild} for
     * more information.
     *
     * \@stable
     * @abstract
     */
    var Query = (function () {
        function Query() {
        }
        return Query;
    }());
    /**
     * ContentChildren decorator and metadata.
     *
     *  @stable
     *  @Annotation
     */
    var /** @type {?} */ ContentChildren = (makePropDecorator('ContentChildren', [
        ['selector', undefined], {
            first: false,
            isViewQuery: false,
            descendants: false,
            read: undefined,
        }
    ], Query));
    /**
     * ContentChild decorator and metadata.
     *
     * @stable
     * @Annotation
     */
    var /** @type {?} */ ContentChild = makePropDecorator('ContentChild', [
        ['selector', undefined], {
            first: true,
            isViewQuery: false,
            descendants: true,
            read: undefined,
        }
    ], Query);
    /**
     * ViewChildren decorator and metadata.
     *
     * @stable
     * @Annotation
     */
    var /** @type {?} */ ViewChildren = makePropDecorator('ViewChildren', [
        ['selector', undefined], {
            first: false,
            isViewQuery: true,
            descendants: true,
            read: undefined,
        }
    ], Query);
    /**
     * ViewChild decorator and metadata.
     *
     * @stable
     * @Annotation
     */
    var /** @type {?} */ ViewChild = makePropDecorator('ViewChild', [
        ['selector', undefined], {
            first: true,
            isViewQuery: true,
            descendants: true,
            read: undefined,
        }
    ], Query);

    var ChangeDetectionStrategy = {};
    ChangeDetectionStrategy.OnPush = 0;
    ChangeDetectionStrategy.Default = 1;
    ChangeDetectionStrategy[ChangeDetectionStrategy.OnPush] = "OnPush";
    ChangeDetectionStrategy[ChangeDetectionStrategy.Default] = "Default";
    var ChangeDetectorStatus = {};
    ChangeDetectorStatus.CheckOnce = 0;
    ChangeDetectorStatus.Checked = 1;
    ChangeDetectorStatus.CheckAlways = 2;
    ChangeDetectorStatus.Detached = 3;
    ChangeDetectorStatus.Errored = 4;
    ChangeDetectorStatus.Destroyed = 5;
    ChangeDetectorStatus[ChangeDetectorStatus.CheckOnce] = "CheckOnce";
    ChangeDetectorStatus[ChangeDetectorStatus.Checked] = "Checked";
    ChangeDetectorStatus[ChangeDetectorStatus.CheckAlways] = "CheckAlways";
    ChangeDetectorStatus[ChangeDetectorStatus.Detached] = "Detached";
    ChangeDetectorStatus[ChangeDetectorStatus.Errored] = "Errored";
    ChangeDetectorStatus[ChangeDetectorStatus.Destroyed] = "Destroyed";
    /**
     * @param {?} changeDetectionStrategy
     * @return {?}
     */
    function isDefaultChangeDetectionStrategy(changeDetectionStrategy) {
        return isBlank(changeDetectionStrategy) ||
            changeDetectionStrategy === ChangeDetectionStrategy.Default;
    }

    /**
     * Directive decorator and metadata.
     *
     * @stable
     * @Annotation
     */
    var /** @type {?} */ Directive = (makeDecorator('Directive', {
        selector: undefined,
        inputs: undefined,
        outputs: undefined,
        host: undefined,
        providers: undefined,
        exportAs: undefined,
        queries: undefined
    }));
    /**
     * Component decorator and metadata.
     *
     * @stable
     * @Annotation
     */
    var /** @type {?} */ Component = (makeDecorator('Component', {
        selector: undefined,
        inputs: undefined,
        outputs: undefined,
        host: undefined,
        exportAs: undefined,
        moduleId: undefined,
        providers: undefined,
        viewProviders: undefined,
        changeDetection: ChangeDetectionStrategy.Default,
        queries: undefined,
        templateUrl: undefined,
        template: undefined,
        styleUrls: undefined,
        styles: undefined,
        animations: undefined,
        encapsulation: undefined,
        interpolation: undefined,
        entryComponents: undefined
    }, Directive));
    /**
     * Pipe decorator and metadata.
     *
     * @stable
     * @Annotation
     */
    var /** @type {?} */ Pipe = (makeDecorator('Pipe', {
        name: undefined,
        pure: true,
    }));
    /**
     * Input decorator and metadata.
     *
     * @stable
     * @Annotation
     */
    var /** @type {?} */ Input = makePropDecorator('Input', [['bindingPropertyName', undefined]]);
    /**
     * Output decorator and metadata.
     *
     * @stable
     * @Annotation
     */
    var /** @type {?} */ Output = makePropDecorator('Output', [['bindingPropertyName', undefined]]);
    /**
     * HostBinding decorator and metadata.
     *
     * @stable
     * @Annotation
     */
    var /** @type {?} */ HostBinding = makePropDecorator('HostBinding', [['hostPropertyName', undefined]]);
    /**
     * HostListener decorator and metadata.
     *
     * @stable
     * @Annotation
     */
    var /** @type {?} */ HostListener = makePropDecorator('HostListener', [['eventName', undefined], ['args', []]]);

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var LifecycleHooks = {};
    LifecycleHooks.OnInit = 0;
    LifecycleHooks.OnDestroy = 1;
    LifecycleHooks.DoCheck = 2;
    LifecycleHooks.OnChanges = 3;
    LifecycleHooks.AfterContentInit = 4;
    LifecycleHooks.AfterContentChecked = 5;
    LifecycleHooks.AfterViewInit = 6;
    LifecycleHooks.AfterViewChecked = 7;
    LifecycleHooks[LifecycleHooks.OnInit] = "OnInit";
    LifecycleHooks[LifecycleHooks.OnDestroy] = "OnDestroy";
    LifecycleHooks[LifecycleHooks.DoCheck] = "DoCheck";
    LifecycleHooks[LifecycleHooks.OnChanges] = "OnChanges";
    LifecycleHooks[LifecycleHooks.AfterContentInit] = "AfterContentInit";
    LifecycleHooks[LifecycleHooks.AfterContentChecked] = "AfterContentChecked";
    LifecycleHooks[LifecycleHooks.AfterViewInit] = "AfterViewInit";
    LifecycleHooks[LifecycleHooks.AfterViewChecked] = "AfterViewChecked";
    var /** @type {?} */ LIFECYCLE_HOOKS_VALUES = [
        LifecycleHooks.OnInit, LifecycleHooks.OnDestroy, LifecycleHooks.DoCheck, LifecycleHooks.OnChanges,
        LifecycleHooks.AfterContentInit, LifecycleHooks.AfterContentChecked, LifecycleHooks.AfterViewInit,
        LifecycleHooks.AfterViewChecked
    ];
    /**
     * \@whatItDoes Lifecycle hook that is called when any data-bound property of a directive changes.
     * \@howToUse
     * {\@example core/ts/metadata/lifecycle_hooks_spec.ts region='OnChanges'}
     *
     * \@description
     * `ngOnChanges` is called right after the data-bound properties have been checked and before view
     * and content children are checked if at least one of them has changed.
     * The `changes` parameter contains the changed properties.
     *
     * See {\@linkDocs guide/lifecycle-hooks#onchanges "Lifecycle Hooks Guide"}.
     *
     * \@stable
     * @abstract
     */
    var OnChanges = (function () {
        function OnChanges() {
        }
        /**
         * @abstract
         * @param {?} changes
         * @return {?}
         */
        OnChanges.prototype.ngOnChanges = function (changes) { };
        return OnChanges;
    }());
    /**
     * \@whatItDoes Lifecycle hook that is called after data-bound properties of a directive are
     * initialized.
     * \@howToUse
     * {\@example core/ts/metadata/lifecycle_hooks_spec.ts region='OnInit'}
     *
     * \@description
     * `ngOnInit` is called right after the directive's data-bound properties have been checked for the
     * first time, and before any of its children have been checked. It is invoked only once when the
     * directive is instantiated.
     *
     * See {\@linkDocs guide/lifecycle-hooks "Lifecycle Hooks Guide"}.
     *
     * \@stable
     * @abstract
     */
    var OnInit = (function () {
        function OnInit() {
        }
        /**
         * @abstract
         * @return {?}
         */
        OnInit.prototype.ngOnInit = function () { };
        return OnInit;
    }());
    /**
     * \@whatItDoes Lifecycle hook that is called when Angular dirty checks a directive.
     * \@howToUse
     * {\@example core/ts/metadata/lifecycle_hooks_spec.ts region='DoCheck'}
     *
     * \@description
     * `ngDoCheck` gets called to check the changes in the directives in addition to the default
     * algorithm. The default change detection algorithm looks for differences by comparing
     * bound-property values by reference across change detection runs.
     *
     * Note that a directive typically should not use both `DoCheck` and {\@link OnChanges} to respond to
     * changes on the same input, as `ngOnChanges` will continue to be called when the default change
     * detector detects changes.
     *
     * See {\@link KeyValueDiffers} and {\@link IterableDiffers} for implementing custom dirty checking
     * for collections.
     *
     * See {\@linkDocs guide/lifecycle-hooks#docheck "Lifecycle Hooks Guide"}.
     *
     * \@stable
     * @abstract
     */
    var DoCheck = (function () {
        function DoCheck() {
        }
        /**
         * @abstract
         * @return {?}
         */
        DoCheck.prototype.ngDoCheck = function () { };
        return DoCheck;
    }());
    /**
     * \@whatItDoes Lifecycle hook that is called when a directive, pipe or service is destroyed.
     * \@howToUse
     * {\@example core/ts/metadata/lifecycle_hooks_spec.ts region='OnDestroy'}
     *
     * \@description
     * `ngOnDestroy` callback is typically used for any custom cleanup that needs to occur when the
     * instance is destroyed.
     *
     * See {\@linkDocs guide/lifecycle-hooks "Lifecycle Hooks Guide"}.
     *
     * \@stable
     * @abstract
     */
    var OnDestroy = (function () {
        function OnDestroy() {
        }
        /**
         * @abstract
         * @return {?}
         */
        OnDestroy.prototype.ngOnDestroy = function () { };
        return OnDestroy;
    }());
    /**
     *
     * \@whatItDoes Lifecycle hook that is called after a directive's content has been fully
     * initialized.
     * \@howToUse
     * {\@example core/ts/metadata/lifecycle_hooks_spec.ts region='AfterContentInit'}
     *
     * \@description
     * See {\@linkDocs guide/lifecycle-hooks#aftercontent "Lifecycle Hooks Guide"}.
     *
     * \@stable
     * @abstract
     */
    var AfterContentInit = (function () {
        function AfterContentInit() {
        }
        /**
         * @abstract
         * @return {?}
         */
        AfterContentInit.prototype.ngAfterContentInit = function () { };
        return AfterContentInit;
    }());
    /**
     * \@whatItDoes Lifecycle hook that is called after every check of a directive's content.
     * \@howToUse
     * {\@example core/ts/metadata/lifecycle_hooks_spec.ts region='AfterContentChecked'}
     *
     * \@description
     * See {\@linkDocs guide/lifecycle-hooks#aftercontent "Lifecycle Hooks Guide"}.
     *
     * \@stable
     * @abstract
     */
    var AfterContentChecked = (function () {
        function AfterContentChecked() {
        }
        /**
         * @abstract
         * @return {?}
         */
        AfterContentChecked.prototype.ngAfterContentChecked = function () { };
        return AfterContentChecked;
    }());
    /**
     * \@whatItDoes Lifecycle hook that is called after a component's view has been fully
     * initialized.
     * \@howToUse
     * {\@example core/ts/metadata/lifecycle_hooks_spec.ts region='AfterViewInit'}
     *
     * \@description
     * See {\@linkDocs guide/lifecycle-hooks#afterview "Lifecycle Hooks Guide"}.
     *
     * \@stable
     * @abstract
     */
    var AfterViewInit = (function () {
        function AfterViewInit() {
        }
        /**
         * @abstract
         * @return {?}
         */
        AfterViewInit.prototype.ngAfterViewInit = function () { };
        return AfterViewInit;
    }());
    /**
     * \@whatItDoes Lifecycle hook that is called after every check of a component's view.
     * \@howToUse
     * {\@example core/ts/metadata/lifecycle_hooks_spec.ts region='AfterViewChecked'}
     *
     * \@description
     * See {\@linkDocs guide/lifecycle-hooks#afterview "Lifecycle Hooks Guide"}.
     *
     * \@stable
     * @abstract
     */
    var AfterViewChecked = (function () {
        function AfterViewChecked() {
        }
        /**
         * @abstract
         * @return {?}
         */
        AfterViewChecked.prototype.ngAfterViewChecked = function () { };
        return AfterViewChecked;
    }());

    /**
     * Defines a schema that will allow:
     * - any non-Angular elements with a `-` in their name,
     * - any properties on elements with a `-` in their name which is the common rule for custom
     * elements.
     *
     * @stable
     */
    var /** @type {?} */ CUSTOM_ELEMENTS_SCHEMA = {
        name: 'custom-elements'
    };
    /**
     * Defines a schema that will allow any property on any element.
     *
     * @experimental
     */
    var /** @type {?} */ NO_ERRORS_SCHEMA = {
        name: 'no-errors-schema'
    };
    /**
     * NgModule decorator and metadata.
     *
     * @stable
     * @Annotation
     */
    var /** @type {?} */ NgModule = (makeDecorator('NgModule', {
        providers: undefined,
        declarations: undefined,
        imports: undefined,
        exports: undefined,
        entryComponents: undefined,
        bootstrap: undefined,
        schemas: undefined,
        id: undefined,
    }));

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var ViewEncapsulation = {};
    ViewEncapsulation.Emulated = 0;
    ViewEncapsulation.Native = 1;
    ViewEncapsulation.None = 2;
    ViewEncapsulation[ViewEncapsulation.Emulated] = "Emulated";
    ViewEncapsulation[ViewEncapsulation.Native] = "Native";
    ViewEncapsulation[ViewEncapsulation.None] = "None";
    /**
     * Metadata properties available for configuring Views.
     *
     * For details on the `\@Component` annotation, see {\@link Component}.
     *
     * ### Example
     *
     * ```
     * \@Component({
     *   selector: 'greet',
     *   template: 'Hello {{name}}!',
     * })
     * class Greet {
     *   name: string;
     *
     *   constructor() {
     *     this.name = 'World';
     *   }
     * }
     * ```
     *
     * @deprecated Use Component instead.
     *
     * {\@link Component}
     */
    var ViewMetadata = (function () {
        /**
         * @param {?=} __0
         */
        function ViewMetadata(_a) {
            var _b = _a === void 0 ? {} : _a, templateUrl = _b.templateUrl, template = _b.template, encapsulation = _b.encapsulation, styles = _b.styles, styleUrls = _b.styleUrls, animations = _b.animations, interpolation = _b.interpolation;
            this.templateUrl = templateUrl;
            this.template = template;
            this.styleUrls = styleUrls;
            this.styles = styles;
            this.encapsulation = encapsulation;
            this.animations = animations;
            this.interpolation = interpolation;
        }
        return ViewMetadata;
    }());

    /**
     * \@whatItDoes Represents the version of Angular
     *
     * \@stable
     */
    var Version = (function () {
        /**
         * @param {?} full
         */
        function Version(full) {
            this.full = full;
        }
        Object.defineProperty(Version.prototype, "major", {
            /**
             * @return {?}
             */
            get: function () { return this.full.split('.')[0]; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Version.prototype, "minor", {
            /**
             * @return {?}
             */
            get: function () { return this.full.split('.')[1]; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Version.prototype, "patch", {
            /**
             * @return {?}
             */
            get: function () { return this.full.split('.').slice(2).join('.'); },
            enumerable: true,
            configurable: true
        });
        return Version;
    }());
    /**
     * @stable
     */
    var /** @type {?} */ VERSION = new Version('2.4.10');

    /**
     * Allows to refer to references which are not yet defined.
     *
     * For instance, `forwardRef` is used when the `token` which we need to refer to for the purposes of
     * DI is declared,
     * but not yet defined. It is also used when the `token` which we use when creating a query is not
     * yet defined.
     *
     * ### Example
     * {\@example core/di/ts/forward_ref/forward_ref_spec.ts region='forward_ref'}
     * \@experimental
     * @param {?} forwardRefFn
     * @return {?}
     */
    function forwardRef(forwardRefFn) {
        ((forwardRefFn)).__forward_ref__ = forwardRef;
        ((forwardRefFn)).toString = function () { return stringify(this()); };
        return (((forwardRefFn)));
    }
    /**
     * Lazily retrieves the reference value from a forwardRef.
     *
     * Acts as the identity function when given a non-forward-ref value.
     *
     * ### Example ([live demo](http://plnkr.co/edit/GU72mJrk1fiodChcmiDR?p=preview))
     *
     * {\@example core/di/ts/forward_ref/forward_ref_spec.ts region='resolve_forward_ref'}
     *
     * See: {\@link forwardRef}
     * \@experimental
     * @param {?} type
     * @return {?}
     */
    function resolveForwardRef(type) {
        if (typeof type === 'function' && type.hasOwnProperty('__forward_ref__') &&
            type.__forward_ref__ === forwardRef) {
            return ((type))();
        }
        else {
            return type;
        }
    }

    var /** @type {?} */ _THROW_IF_NOT_FOUND = new Object();
    var /** @type {?} */ THROW_IF_NOT_FOUND = _THROW_IF_NOT_FOUND;
    var _NullInjector = (function () {
        function _NullInjector() {
        }
        /**
         * @param {?} token
         * @param {?=} notFoundValue
         * @return {?}
         */
        _NullInjector.prototype.get = function (token, notFoundValue) {
            if (notFoundValue === void 0) { notFoundValue = _THROW_IF_NOT_FOUND; }
            if (notFoundValue === _THROW_IF_NOT_FOUND) {
                throw new Error("No provider for " + stringify(token) + "!");
            }
            return notFoundValue;
        };
        return _NullInjector;
    }());
    /**
     * \@whatItDoes Injector interface
     * \@howToUse
     * ```
     * const injector: Injector = ...;
     * injector.get(...);
     * ```
     *
     * \@description
     * For more details, see the {\@linkDocs guide/dependency-injection "Dependency Injection Guide"}.
     *
     * ### Example
     *
     * {\@example core/di/ts/injector_spec.ts region='Injector'}
     *
     * `Injector` returns itself when given `Injector` as a token:
     * {\@example core/di/ts/injector_spec.ts region='injectInjector'}
     *
     * \@stable
     * @abstract
     */
    var Injector = (function () {
        function Injector() {
        }
        /**
         * Retrieves an instance from the injector based on the provided token.
         * If not found:
         * - Throws {\@link NoProviderError} if no `notFoundValue` that is not equal to
         * Injector.THROW_IF_NOT_FOUND is given
         * - Returns the `notFoundValue` otherwise
         * @abstract
         * @param {?} token
         * @param {?=} notFoundValue
         * @return {?}
         */
        Injector.prototype.get = function (token, notFoundValue) { };
        Injector.THROW_IF_NOT_FOUND = _THROW_IF_NOT_FOUND;
        Injector.NULL = new _NullInjector();
        return Injector;
    }());

    var __extends$1 = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    /**
     * \@stable
     */
    var BaseError = (function (_super) {
        __extends$1(BaseError, _super);
        /**
         * @param {?} message
         */
        function BaseError(message) {
            _super.call(this, message);
            // Errors don't use current this, instead they create a new instance.
            // We have to do forward all of our api to the nativeInstance.
            // TODO(bradfordcsmith): Remove this hack when
            //     google/closure-compiler/issues/2102 is fixed.
            var nativeError = new Error(message);
            this._nativeError = nativeError;
        }
        Object.defineProperty(BaseError.prototype, "message", {
            /**
             * @return {?}
             */
            get: function () { return this._nativeError.message; },
            /**
             * @param {?} message
             * @return {?}
             */
            set: function (message) { this._nativeError.message = message; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseError.prototype, "name", {
            /**
             * @return {?}
             */
            get: function () { return this._nativeError.name; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseError.prototype, "stack", {
            /**
             * @return {?}
             */
            get: function () { return ((this._nativeError)).stack; },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) { ((this._nativeError)).stack = value; },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        BaseError.prototype.toString = function () { return this._nativeError.toString(); };
        return BaseError;
    }(Error));
    /**
     * \@stable
     */
    var WrappedError = (function (_super) {
        __extends$1(WrappedError, _super);
        /**
         * @param {?} message
         * @param {?} error
         */
        function WrappedError(message, error) {
            _super.call(this, message + " caused by: " + (error instanceof Error ? error.message : error));
            this.originalError = error;
        }
        Object.defineProperty(WrappedError.prototype, "stack", {
            /**
             * @return {?}
             */
            get: function () {
                return (((this.originalError instanceof Error ? this.originalError : this._nativeError)))
                    .stack;
            },
            enumerable: true,
            configurable: true
        });
        return WrappedError;
    }(BaseError));

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    /**
     * @param {?} keys
     * @return {?}
     */
    function findFirstClosedCycle(keys) {
        var /** @type {?} */ res = [];
        for (var /** @type {?} */ i = 0; i < keys.length; ++i) {
            if (res.indexOf(keys[i]) > -1) {
                res.push(keys[i]);
                return res;
            }
            res.push(keys[i]);
        }
        return res;
    }
    /**
     * @param {?} keys
     * @return {?}
     */
    function constructResolvingPath(keys) {
        if (keys.length > 1) {
            var /** @type {?} */ reversed = findFirstClosedCycle(keys.slice().reverse());
            var /** @type {?} */ tokenStrs = reversed.map(function (k) { return stringify(k.token); });
            return ' (' + tokenStrs.join(' -> ') + ')';
        }
        return '';
    }
    /**
     * Base class for all errors arising from misconfigured providers.
     * \@stable
     */
    var AbstractProviderError = (function (_super) {
        __extends(AbstractProviderError, _super);
        /**
         * @param {?} injector
         * @param {?} key
         * @param {?} constructResolvingMessage
         */
        function AbstractProviderError(injector, key, constructResolvingMessage) {
            _super.call(this, 'DI Error');
            this.keys = [key];
            this.injectors = [injector];
            this.constructResolvingMessage = constructResolvingMessage;
            this.message = this.constructResolvingMessage(this.keys);
        }
        /**
         * @param {?} injector
         * @param {?} key
         * @return {?}
         */
        AbstractProviderError.prototype.addKey = function (injector, key) {
            this.injectors.push(injector);
            this.keys.push(key);
            this.message = this.constructResolvingMessage(this.keys);
        };
        return AbstractProviderError;
    }(BaseError));
    /**
     * Thrown when trying to retrieve a dependency by key from {\@link Injector}, but the
     * {\@link Injector} does not have a {\@link Provider} for the given key.
     *
     * ### Example ([live demo](http://plnkr.co/edit/vq8D3FRB9aGbnWJqtEPE?p=preview))
     *
     * ```typescript
     * class A {
     *   constructor(b:B) {}
     * }
     *
     * expect(() => Injector.resolveAndCreate([A])).toThrowError();
     * ```
     * \@stable
     */
    var NoProviderError = (function (_super) {
        __extends(NoProviderError, _super);
        /**
         * @param {?} injector
         * @param {?} key
         */
        function NoProviderError(injector, key) {
            _super.call(this, injector, key, function (keys) {
                var first = stringify(keys[0].token);
                return "No provider for " + first + "!" + constructResolvingPath(keys);
            });
        }
        return NoProviderError;
    }(AbstractProviderError));
    /**
     * Thrown when dependencies form a cycle.
     *
     * ### Example ([live demo](http://plnkr.co/edit/wYQdNos0Tzql3ei1EV9j?p=info))
     *
     * ```typescript
     * var injector = Injector.resolveAndCreate([
     *   {provide: "one", useFactory: (two) => "two", deps: [[new Inject("two")]]},
     *   {provide: "two", useFactory: (one) => "one", deps: [[new Inject("one")]]}
     * ]);
     *
     * expect(() => injector.get("one")).toThrowError();
     * ```
     *
     * Retrieving `A` or `B` throws a `CyclicDependencyError` as the graph above cannot be constructed.
     * \@stable
     */
    var CyclicDependencyError = (function (_super) {
        __extends(CyclicDependencyError, _super);
        /**
         * @param {?} injector
         * @param {?} key
         */
        function CyclicDependencyError(injector, key) {
            _super.call(this, injector, key, function (keys) {
                return "Cannot instantiate cyclic dependency!" + constructResolvingPath(keys);
            });
        }
        return CyclicDependencyError;
    }(AbstractProviderError));
    /**
     * Thrown when a constructing type returns with an Error.
     *
     * The `InstantiationError` class contains the original error plus the dependency graph which caused
     * this object to be instantiated.
     *
     * ### Example ([live demo](http://plnkr.co/edit/7aWYdcqTQsP0eNqEdUAf?p=preview))
     *
     * ```typescript
     * class A {
     *   constructor() {
     *     throw new Error('message');
     *   }
     * }
     *
     * var injector = Injector.resolveAndCreate([A]);
     * try {
     *   injector.get(A);
     * } catch (e) {
     *   expect(e instanceof InstantiationError).toBe(true);
     *   expect(e.originalException.message).toEqual("message");
     *   expect(e.originalStack).toBeDefined();
     * }
     * ```
     * \@stable
     */
    var InstantiationError = (function (_super) {
        __extends(InstantiationError, _super);
        /**
         * @param {?} injector
         * @param {?} originalException
         * @param {?} originalStack
         * @param {?} key
         */
        function InstantiationError(injector, originalException, originalStack, key) {
            _super.call(this, 'DI Error', originalException);
            this.keys = [key];
            this.injectors = [injector];
        }
        /**
         * @param {?} injector
         * @param {?} key
         * @return {?}
         */
        InstantiationError.prototype.addKey = function (injector, key) {
            this.injectors.push(injector);
            this.keys.push(key);
        };
        Object.defineProperty(InstantiationError.prototype, "message", {
            /**
             * @return {?}
             */
            get: function () {
                var /** @type {?} */ first = stringify(this.keys[0].token);
                return this.originalError.message + ": Error during instantiation of " + first + "!" + constructResolvingPath(this.keys) + ".";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InstantiationError.prototype, "causeKey", {
            /**
             * @return {?}
             */
            get: function () { return this.keys[0]; },
            enumerable: true,
            configurable: true
        });
        return InstantiationError;
    }(WrappedError));
    /**
     * Thrown when an object other then {\@link Provider} (or `Type`) is passed to {\@link Injector}
     * creation.
     *
     * ### Example ([live demo](http://plnkr.co/edit/YatCFbPAMCL0JSSQ4mvH?p=preview))
     *
     * ```typescript
     * expect(() => Injector.resolveAndCreate(["not a type"])).toThrowError();
     * ```
     * \@stable
     */
    var InvalidProviderError = (function (_super) {
        __extends(InvalidProviderError, _super);
        /**
         * @param {?} provider
         */
        function InvalidProviderError(provider) {
            _super.call(this, "Invalid provider - only instances of Provider and Type are allowed, got: " + provider);
        }
        return InvalidProviderError;
    }(BaseError));
    /**
     * Thrown when the class has no annotation information.
     *
     * Lack of annotation information prevents the {\@link Injector} from determining which dependencies
     * need to be injected into the constructor.
     *
     * ### Example ([live demo](http://plnkr.co/edit/rHnZtlNS7vJOPQ6pcVkm?p=preview))
     *
     * ```typescript
     * class A {
     *   constructor(b) {}
     * }
     *
     * expect(() => Injector.resolveAndCreate([A])).toThrowError();
     * ```
     *
     * This error is also thrown when the class not marked with {\@link Injectable} has parameter types.
     *
     * ```typescript
     * class B {}
     *
     * class A {
     *   constructor(b:B) {} // no information about the parameter types of A is available at runtime.
     * }
     *
     * expect(() => Injector.resolveAndCreate([A,B])).toThrowError();
     * ```
     * \@stable
     */
    var NoAnnotationError = (function (_super) {
        __extends(NoAnnotationError, _super);
        /**
         * @param {?} typeOrFunc
         * @param {?} params
         */
        function NoAnnotationError(typeOrFunc, params) {
            _super.call(this, NoAnnotationError._genMessage(typeOrFunc, params));
        }
        /**
         * @param {?} typeOrFunc
         * @param {?} params
         * @return {?}
         */
        NoAnnotationError._genMessage = function (typeOrFunc, params) {
            var /** @type {?} */ signature = [];
            for (var /** @type {?} */ i = 0, /** @type {?} */ ii = params.length; i < ii; i++) {
                var /** @type {?} */ parameter = params[i];
                if (!parameter || parameter.length == 0) {
                    signature.push('?');
                }
                else {
                    signature.push(parameter.map(stringify).join(' '));
                }
            }
            return 'Cannot resolve all parameters for \'' + stringify(typeOrFunc) + '\'(' +
                signature.join(', ') + '). ' +
                'Make sure that all the parameters are decorated with Inject or have valid type annotations and that \'' +
                stringify(typeOrFunc) + '\' is decorated with Injectable.';
        };
        return NoAnnotationError;
    }(BaseError));
    /**
     * Thrown when getting an object by index.
     *
     * ### Example ([live demo](http://plnkr.co/edit/bRs0SX2OTQiJzqvjgl8P?p=preview))
     *
     * ```typescript
     * class A {}
     *
     * var injector = Injector.resolveAndCreate([A]);
     *
     * expect(() => injector.getAt(100)).toThrowError();
     * ```
     * \@stable
     */
    var OutOfBoundsError = (function (_super) {
        __extends(OutOfBoundsError, _super);
        /**
         * @param {?} index
         */
        function OutOfBoundsError(index) {
            _super.call(this, "Index " + index + " is out-of-bounds.");
        }
        return OutOfBoundsError;
    }(BaseError));
    /**
     * Thrown when a multi provider and a regular provider are bound to the same token.
     *
     * ### Example
     *
     * ```typescript
     * expect(() => Injector.resolveAndCreate([
     *   { provide: "Strings", useValue: "string1", multi: true},
     *   { provide: "Strings", useValue: "string2", multi: false}
     * ])).toThrowError();
     * ```
     */
    var MixingMultiProvidersWithRegularProvidersError = (function (_super) {
        __extends(MixingMultiProvidersWithRegularProvidersError, _super);
        /**
         * @param {?} provider1
         * @param {?} provider2
         */
        function MixingMultiProvidersWithRegularProvidersError(provider1, provider2) {
            _super.call(this, 'Cannot mix multi providers and regular providers, got: ' + provider1.toString() + ' ' +
                provider2.toString());
        }
        return MixingMultiProvidersWithRegularProvidersError;
    }(BaseError));

    /**
     * A unique object used for retrieving items from the {\@link ReflectiveInjector}.
     *
     * Keys have:
     * - a system-wide unique `id`.
     * - a `token`.
     *
     * `Key` is used internally by {\@link ReflectiveInjector} because its system-wide unique `id` allows
     * the
     * injector to store created objects in a more efficient way.
     *
     * `Key` should not be created directly. {\@link ReflectiveInjector} creates keys automatically when
     * resolving
     * providers.
     * \@experimental
     */
    var ReflectiveKey = (function () {
        /**
         * Private
         * @param {?} token
         * @param {?} id
         */
        function ReflectiveKey(token, id) {
            this.token = token;
            this.id = id;
            if (!token) {
                throw new Error('Token must be defined!');
            }
        }
        Object.defineProperty(ReflectiveKey.prototype, "displayName", {
            /**
             * Returns a stringified token.
             * @return {?}
             */
            get: function () { return stringify(this.token); },
            enumerable: true,
            configurable: true
        });
        /**
         * Retrieves a `Key` for a token.
         * @param {?} token
         * @return {?}
         */
        ReflectiveKey.get = function (token) {
            return _globalKeyRegistry.get(resolveForwardRef(token));
        };
        Object.defineProperty(ReflectiveKey, "numberOfKeys", {
            /**
             * @return {?} the number of keys registered in the system.
             */
            get: function () { return _globalKeyRegistry.numberOfKeys; },
            enumerable: true,
            configurable: true
        });
        return ReflectiveKey;
    }());
    /**
     * \@internal
     */
    var KeyRegistry = (function () {
        function KeyRegistry() {
            this._allKeys = new Map();
        }
        /**
         * @param {?} token
         * @return {?}
         */
        KeyRegistry.prototype.get = function (token) {
            if (token instanceof ReflectiveKey)
                return token;
            if (this._allKeys.has(token)) {
                return this._allKeys.get(token);
            }
            var /** @type {?} */ newKey = new ReflectiveKey(token, ReflectiveKey.numberOfKeys);
            this._allKeys.set(token, newKey);
            return newKey;
        };
        Object.defineProperty(KeyRegistry.prototype, "numberOfKeys", {
            /**
             * @return {?}
             */
            get: function () { return this._allKeys.size; },
            enumerable: true,
            configurable: true
        });
        return KeyRegistry;
    }());
    var /** @type {?} */ _globalKeyRegistry = new KeyRegistry();

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * @whatItDoes Represents a type that a Component or other object is instances of.
     *
     * @description
     *
     * An example of a `Type` is `MyCustomComponent` class, which in JavaScript is be represented by
     * the `MyCustomComponent` constructor function.
     *
     * @stable
     */
    var /** @type {?} */ Type = Function;
    /**
     * @param {?} v
     * @return {?}
     */
    function isType(v) {
        return typeof v === 'function';
    }

    /**
     * Attention: This regex has to hold even if the code is minified!
     */
    var /** @type {?} */ DELEGATE_CTOR = /^function\s+\S+\(\)\s*{\s*("use strict";)?\s*(return\s+)?\S+\.apply\(this,\s*arguments\)/;
    var ReflectionCapabilities = (function () {
        /**
         * @param {?=} reflect
         */
        function ReflectionCapabilities(reflect) {
            this._reflect = reflect || global$1.Reflect;
        }
        /**
         * @return {?}
         */
        ReflectionCapabilities.prototype.isReflectionEnabled = function () { return true; };
        /**
         * @param {?} t
         * @return {?}
         */
        ReflectionCapabilities.prototype.factory = function (t) { return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            return new (t.bind.apply(t, [void 0].concat(args)))();
        }; };
        /**
         * \@internal
         * @param {?} paramTypes
         * @param {?} paramAnnotations
         * @return {?}
         */
        ReflectionCapabilities.prototype._zipTypesAndAnnotations = function (paramTypes, paramAnnotations) {
            var /** @type {?} */ result;
            if (typeof paramTypes === 'undefined') {
                result = new Array(paramAnnotations.length);
            }
            else {
                result = new Array(paramTypes.length);
            }
            for (var /** @type {?} */ i = 0; i < result.length; i++) {
                // TS outputs Object for parameters without types, while Traceur omits
                // the annotations. For now we preserve the Traceur behavior to aid
                // migration, but this can be revisited.
                if (typeof paramTypes === 'undefined') {
                    result[i] = [];
                }
                else if (paramTypes[i] != Object) {
                    result[i] = [paramTypes[i]];
                }
                else {
                    result[i] = [];
                }
                if (paramAnnotations && isPresent(paramAnnotations[i])) {
                    result[i] = result[i].concat(paramAnnotations[i]);
                }
            }
            return result;
        };
        /**
         * @param {?} type
         * @param {?} parentCtor
         * @return {?}
         */
        ReflectionCapabilities.prototype._ownParameters = function (type, parentCtor) {
            // If we have no decorators, we only have function.length as metadata.
            // In that case, to detect whether a child class declared an own constructor or not,
            // we need to look inside of that constructor to check whether it is
            // just calling the parent.
            // This also helps to work around for https://github.com/Microsoft/TypeScript/issues/12439
            // that sets 'design:paramtypes' to []
            // if a class inherits from another class but has no ctor declared itself.
            if (DELEGATE_CTOR.exec(type.toString())) {
                return null;
            }
            // Prefer the direct API.
            if (((type)).parameters && ((type)).parameters !== parentCtor.parameters) {
                return ((type)).parameters;
            }
            // API of tsickle for lowering decorators to properties on the class.
            var /** @type {?} */ tsickleCtorParams = ((type)).ctorParameters;
            if (tsickleCtorParams && tsickleCtorParams !== parentCtor.ctorParameters) {
                // Newer tsickle uses a function closure
                // Retain the non-function case for compatibility with older tsickle
                var /** @type {?} */ ctorParameters = typeof tsickleCtorParams === 'function' ? tsickleCtorParams() : tsickleCtorParams;
                var /** @type {?} */ paramTypes = ctorParameters.map(function (ctorParam) { return ctorParam && ctorParam.type; });
                var /** @type {?} */ paramAnnotations = ctorParameters.map(function (ctorParam) {
                    return ctorParam && convertTsickleDecoratorIntoMetadata(ctorParam.decorators);
                });
                return this._zipTypesAndAnnotations(paramTypes, paramAnnotations);
            }
            // API for metadata created by invoking the decorators.
            if (isPresent(this._reflect) && isPresent(this._reflect.getOwnMetadata)) {
                var /** @type {?} */ paramAnnotations = this._reflect.getOwnMetadata('parameters', type);
                var /** @type {?} */ paramTypes = this._reflect.getOwnMetadata('design:paramtypes', type);
                if (paramTypes || paramAnnotations) {
                    return this._zipTypesAndAnnotations(paramTypes, paramAnnotations);
                }
            }
            // If a class has no decorators, at least create metadata
            // based on function.length.
            // Note: We know that this is a real constructor as we checked
            // the content of the constructor above.
            return new Array(((type.length))).fill(undefined);
        };
        /**
         * @param {?} type
         * @return {?}
         */
        ReflectionCapabilities.prototype.parameters = function (type) {
            // Note: only report metadata if we have at least one class decorator
            // to stay in sync with the static reflector.
            if (!isType(type)) {
                return [];
            }
            var /** @type {?} */ parentCtor = getParentCtor(type);
            var /** @type {?} */ parameters = this._ownParameters(type, parentCtor);
            if (!parameters && parentCtor !== Object) {
                parameters = this.parameters(parentCtor);
            }
            return parameters || [];
        };
        /**
         * @param {?} typeOrFunc
         * @param {?} parentCtor
         * @return {?}
         */
        ReflectionCapabilities.prototype._ownAnnotations = function (typeOrFunc, parentCtor) {
            // Prefer the direct API.
            if (((typeOrFunc)).annotations && ((typeOrFunc)).annotations !== parentCtor.annotations) {
                var /** @type {?} */ annotations = ((typeOrFunc)).annotations;
                if (typeof annotations === 'function' && annotations.annotations) {
                    annotations = annotations.annotations;
                }
                return annotations;
            }
            // API of tsickle for lowering decorators to properties on the class.
            if (((typeOrFunc)).decorators && ((typeOrFunc)).decorators !== parentCtor.decorators) {
                return convertTsickleDecoratorIntoMetadata(((typeOrFunc)).decorators);
            }
            // API for metadata created by invoking the decorators.
            if (this._reflect && this._reflect.getOwnMetadata) {
                return this._reflect.getOwnMetadata('annotations', typeOrFunc);
            }
        };
        /**
         * @param {?} typeOrFunc
         * @return {?}
         */
        ReflectionCapabilities.prototype.annotations = function (typeOrFunc) {
            if (!isType(typeOrFunc)) {
                return [];
            }
            var /** @type {?} */ parentCtor = getParentCtor(typeOrFunc);
            var /** @type {?} */ ownAnnotations = this._ownAnnotations(typeOrFunc, parentCtor) || [];
            var /** @type {?} */ parentAnnotations = parentCtor !== Object ? this.annotations(parentCtor) : [];
            return parentAnnotations.concat(ownAnnotations);
        };
        /**
         * @param {?} typeOrFunc
         * @param {?} parentCtor
         * @return {?}
         */
        ReflectionCapabilities.prototype._ownPropMetadata = function (typeOrFunc, parentCtor) {
            // Prefer the direct API.
            if (((typeOrFunc)).propMetadata &&
                ((typeOrFunc)).propMetadata !== parentCtor.propMetadata) {
                var /** @type {?} */ propMetadata = ((typeOrFunc)).propMetadata;
                if (typeof propMetadata === 'function' && propMetadata.propMetadata) {
                    propMetadata = propMetadata.propMetadata;
                }
                return propMetadata;
            }
            // API of tsickle for lowering decorators to properties on the class.
            if (((typeOrFunc)).propDecorators &&
                ((typeOrFunc)).propDecorators !== parentCtor.propDecorators) {
                var /** @type {?} */ propDecorators_1 = ((typeOrFunc)).propDecorators;
                var /** @type {?} */ propMetadata_1 = ({});
                Object.keys(propDecorators_1).forEach(function (prop) {
                    propMetadata_1[prop] = convertTsickleDecoratorIntoMetadata(propDecorators_1[prop]);
                });
                return propMetadata_1;
            }
            // API for metadata created by invoking the decorators.
            if (this._reflect && this._reflect.getOwnMetadata) {
                return this._reflect.getOwnMetadata('propMetadata', typeOrFunc);
            }
        };
        /**
         * @param {?} typeOrFunc
         * @return {?}
         */
        ReflectionCapabilities.prototype.propMetadata = function (typeOrFunc) {
            if (!isType(typeOrFunc)) {
                return {};
            }
            var /** @type {?} */ parentCtor = getParentCtor(typeOrFunc);
            var /** @type {?} */ propMetadata = {};
            if (parentCtor !== Object) {
                var /** @type {?} */ parentPropMetadata_1 = this.propMetadata(parentCtor);
                Object.keys(parentPropMetadata_1).forEach(function (propName) {
                    propMetadata[propName] = parentPropMetadata_1[propName];
                });
            }
            var /** @type {?} */ ownPropMetadata = this._ownPropMetadata(typeOrFunc, parentCtor);
            if (ownPropMetadata) {
                Object.keys(ownPropMetadata).forEach(function (propName) {
                    var /** @type {?} */ decorators = [];
                    if (propMetadata.hasOwnProperty(propName)) {
                        decorators.push.apply(decorators, propMetadata[propName]);
                    }
                    decorators.push.apply(decorators, ownPropMetadata[propName]);
                    propMetadata[propName] = decorators;
                });
            }
            return propMetadata;
        };
        /**
         * @param {?} type
         * @param {?} lcProperty
         * @return {?}
         */
        ReflectionCapabilities.prototype.hasLifecycleHook = function (type, lcProperty) {
            return type instanceof Type && lcProperty in type.prototype;
        };
        /**
         * @param {?} name
         * @return {?}
         */
        ReflectionCapabilities.prototype.getter = function (name) { return ((new Function('o', 'return o.' + name + ';'))); };
        /**
         * @param {?} name
         * @return {?}
         */
        ReflectionCapabilities.prototype.setter = function (name) {
            return ((new Function('o', 'v', 'return o.' + name + ' = v;')));
        };
        /**
         * @param {?} name
         * @return {?}
         */
        ReflectionCapabilities.prototype.method = function (name) {
            var /** @type {?} */ functionBody = "if (!o." + name + ") throw new Error('\"" + name + "\" is undefined');\n        return o." + name + ".apply(o, args);";
            return ((new Function('o', 'args', functionBody)));
        };
        /**
         * @param {?} type
         * @return {?}
         */
        ReflectionCapabilities.prototype.importUri = function (type) {
            // StaticSymbol
            if (typeof type === 'object' && type['filePath']) {
                return type['filePath'];
            }
            // Runtime type
            return "./" + stringify(type);
        };
        /**
         * @param {?} name
         * @param {?} moduleUrl
         * @param {?} runtime
         * @return {?}
         */
        ReflectionCapabilities.prototype.resolveIdentifier = function (name, moduleUrl, runtime) { return runtime; };
        /**
         * @param {?} enumIdentifier
         * @param {?} name
         * @return {?}
         */
        ReflectionCapabilities.prototype.resolveEnum = function (enumIdentifier, name) { return enumIdentifier[name]; };
        return ReflectionCapabilities;
    }());
    /**
     * @param {?} decoratorInvocations
     * @return {?}
     */
    function convertTsickleDecoratorIntoMetadata(decoratorInvocations) {
        if (!decoratorInvocations) {
            return [];
        }
        return decoratorInvocations.map(function (decoratorInvocation) {
            var /** @type {?} */ decoratorType = decoratorInvocation.type;
            var /** @type {?} */ annotationCls = decoratorType.annotationCls;
            var /** @type {?} */ annotationArgs = decoratorInvocation.args ? decoratorInvocation.args : [];
            return new (annotationCls.bind.apply(annotationCls, [void 0].concat(annotationArgs)))();
        });
    }
    /**
     * @param {?} ctor
     * @return {?}
     */
    function getParentCtor(ctor) {
        var /** @type {?} */ parentProto = Object.getPrototypeOf(ctor.prototype);
        var /** @type {?} */ parentCtor = parentProto ? parentProto.constructor : null;
        // Note: We always use `Object` as the null value
        // to simplify checking later on.
        return parentCtor || Object;
    }

    /**
     * Provides read-only access to reflection data about symbols. Used internally by Angular
     * to power dependency injection and compilation.
     * @abstract
     */
    var ReflectorReader = (function () {
        function ReflectorReader() {
        }
        /**
         * @abstract
         * @param {?} typeOrFunc
         * @return {?}
         */
        ReflectorReader.prototype.parameters = function (typeOrFunc) { };
        /**
         * @abstract
         * @param {?} typeOrFunc
         * @return {?}
         */
        ReflectorReader.prototype.annotations = function (typeOrFunc) { };
        /**
         * @abstract
         * @param {?} typeOrFunc
         * @return {?}
         */
        ReflectorReader.prototype.propMetadata = function (typeOrFunc) { };
        /**
         * @abstract
         * @param {?} typeOrFunc
         * @return {?}
         */
        ReflectorReader.prototype.importUri = function (typeOrFunc) { };
        /**
         * @abstract
         * @param {?} name
         * @param {?} moduleUrl
         * @param {?} runtime
         * @return {?}
         */
        ReflectorReader.prototype.resolveIdentifier = function (name, moduleUrl, runtime) { };
        /**
         * @abstract
         * @param {?} identifier
         * @param {?} name
         * @return {?}
         */
        ReflectorReader.prototype.resolveEnum = function (identifier, name) { };
        return ReflectorReader;
    }());

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var __extends$2 = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    /**
     * Provides access to reflection data about symbols. Used internally by Angular
     * to power dependency injection and compilation.
     */
    var Reflector = (function (_super) {
        __extends$2(Reflector, _super);
        /**
         * @param {?} reflectionCapabilities
         */
        function Reflector(reflectionCapabilities) {
            _super.call(this);
            this.reflectionCapabilities = reflectionCapabilities;
        }
        /**
         * @param {?} caps
         * @return {?}
         */
        Reflector.prototype.updateCapabilities = function (caps) { this.reflectionCapabilities = caps; };
        /**
         * @param {?} type
         * @return {?}
         */
        Reflector.prototype.factory = function (type) { return this.reflectionCapabilities.factory(type); };
        /**
         * @param {?} typeOrFunc
         * @return {?}
         */
        Reflector.prototype.parameters = function (typeOrFunc) {
            return this.reflectionCapabilities.parameters(typeOrFunc);
        };
        /**
         * @param {?} typeOrFunc
         * @return {?}
         */
        Reflector.prototype.annotations = function (typeOrFunc) {
            return this.reflectionCapabilities.annotations(typeOrFunc);
        };
        /**
         * @param {?} typeOrFunc
         * @return {?}
         */
        Reflector.prototype.propMetadata = function (typeOrFunc) {
            return this.reflectionCapabilities.propMetadata(typeOrFunc);
        };
        /**
         * @param {?} type
         * @param {?} lcProperty
         * @return {?}
         */
        Reflector.prototype.hasLifecycleHook = function (type, lcProperty) {
            return this.reflectionCapabilities.hasLifecycleHook(type, lcProperty);
        };
        /**
         * @param {?} name
         * @return {?}
         */
        Reflector.prototype.getter = function (name) { return this.reflectionCapabilities.getter(name); };
        /**
         * @param {?} name
         * @return {?}
         */
        Reflector.prototype.setter = function (name) { return this.reflectionCapabilities.setter(name); };
        /**
         * @param {?} name
         * @return {?}
         */
        Reflector.prototype.method = function (name) { return this.reflectionCapabilities.method(name); };
        /**
         * @param {?} type
         * @return {?}
         */
        Reflector.prototype.importUri = function (type) { return this.reflectionCapabilities.importUri(type); };
        /**
         * @param {?} name
         * @param {?} moduleUrl
         * @param {?} runtime
         * @return {?}
         */
        Reflector.prototype.resolveIdentifier = function (name, moduleUrl, runtime) {
            return this.reflectionCapabilities.resolveIdentifier(name, moduleUrl, runtime);
        };
        /**
         * @param {?} identifier
         * @param {?} name
         * @return {?}
         */
        Reflector.prototype.resolveEnum = function (identifier, name) {
            return this.reflectionCapabilities.resolveEnum(identifier, name);
        };
        return Reflector;
    }(ReflectorReader));

    /**
     * The {@link Reflector} used internally in Angular to access metadata
     * about symbols.
     */
    var /** @type {?} */ reflector = new Reflector(new ReflectionCapabilities());

    /**
     * `Dependency` is used by the framework to extend DI.
     * This is internal to Angular and should not be used directly.
     */
    var ReflectiveDependency = (function () {
        /**
         * @param {?} key
         * @param {?} optional
         * @param {?} visibility
         */
        function ReflectiveDependency(key, optional, visibility) {
            this.key = key;
            this.optional = optional;
            this.visibility = visibility;
        }
        /**
         * @param {?} key
         * @return {?}
         */
        ReflectiveDependency.fromKey = function (key) {
            return new ReflectiveDependency(key, false, null);
        };
        return ReflectiveDependency;
    }());
    var /** @type {?} */ _EMPTY_LIST = [];
    var ResolvedReflectiveProvider_ = (function () {
        /**
         * @param {?} key
         * @param {?} resolvedFactories
         * @param {?} multiProvider
         */
        function ResolvedReflectiveProvider_(key, resolvedFactories, multiProvider) {
            this.key = key;
            this.resolvedFactories = resolvedFactories;
            this.multiProvider = multiProvider;
        }
        Object.defineProperty(ResolvedReflectiveProvider_.prototype, "resolvedFactory", {
            /**
             * @return {?}
             */
            get: function () { return this.resolvedFactories[0]; },
            enumerable: true,
            configurable: true
        });
        return ResolvedReflectiveProvider_;
    }());
    /**
     * An internal resolved representation of a factory function created by resolving {\@link
     * Provider}.
     * \@experimental
     */
    var ResolvedReflectiveFactory = (function () {
        /**
         * @param {?} factory
         * @param {?} dependencies
         */
        function ResolvedReflectiveFactory(factory, dependencies) {
            this.factory = factory;
            this.dependencies = dependencies;
        }
        return ResolvedReflectiveFactory;
    }());
    /**
     * Resolve a single provider.
     * @param {?} provider
     * @return {?}
     */
    function resolveReflectiveFactory(provider) {
        var /** @type {?} */ factoryFn;
        var /** @type {?} */ resolvedDeps;
        if (provider.useClass) {
            var /** @type {?} */ useClass = resolveForwardRef(provider.useClass);
            factoryFn = reflector.factory(useClass);
            resolvedDeps = _dependenciesFor(useClass);
        }
        else if (provider.useExisting) {
            factoryFn = function (aliasInstance) { return aliasInstance; };
            resolvedDeps = [ReflectiveDependency.fromKey(ReflectiveKey.get(provider.useExisting))];
        }
        else if (provider.useFactory) {
            factoryFn = provider.useFactory;
            resolvedDeps = constructDependencies(provider.useFactory, provider.deps);
        }
        else {
            factoryFn = function () { return provider.useValue; };
            resolvedDeps = _EMPTY_LIST;
        }
        return new ResolvedReflectiveFactory(factoryFn, resolvedDeps);
    }
    /**
     * Converts the {\@link Provider} into {\@link ResolvedProvider}.
     *
     * {\@link Injector} internally only uses {\@link ResolvedProvider}, {\@link Provider} contains
     * convenience provider syntax.
     * @param {?} provider
     * @return {?}
     */
    function resolveReflectiveProvider(provider) {
        return new ResolvedReflectiveProvider_(ReflectiveKey.get(provider.provide), [resolveReflectiveFactory(provider)], provider.multi);
    }
    /**
     * Resolve a list of Providers.
     * @param {?} providers
     * @return {?}
     */
    function resolveReflectiveProviders(providers) {
        var /** @type {?} */ normalized = _normalizeProviders(providers, []);
        var /** @type {?} */ resolved = normalized.map(resolveReflectiveProvider);
        var /** @type {?} */ resolvedProviderMap = mergeResolvedReflectiveProviders(resolved, new Map());
        return Array.from(resolvedProviderMap.values());
    }
    /**
     * Merges a list of ResolvedProviders into a list where
     * each key is contained exactly once and multi providers
     * have been merged.
     * @param {?} providers
     * @param {?} normalizedProvidersMap
     * @return {?}
     */
    function mergeResolvedReflectiveProviders(providers, normalizedProvidersMap) {
        for (var /** @type {?} */ i = 0; i < providers.length; i++) {
            var /** @type {?} */ provider = providers[i];
            var /** @type {?} */ existing = normalizedProvidersMap.get(provider.key.id);
            if (existing) {
                if (provider.multiProvider !== existing.multiProvider) {
                    throw new MixingMultiProvidersWithRegularProvidersError(existing, provider);
                }
                if (provider.multiProvider) {
                    for (var /** @type {?} */ j = 0; j < provider.resolvedFactories.length; j++) {
                        existing.resolvedFactories.push(provider.resolvedFactories[j]);
                    }
                }
                else {
                    normalizedProvidersMap.set(provider.key.id, provider);
                }
            }
            else {
                var /** @type {?} */ resolvedProvider = void 0;
                if (provider.multiProvider) {
                    resolvedProvider = new ResolvedReflectiveProvider_(provider.key, provider.resolvedFactories.slice(), provider.multiProvider);
                }
                else {
                    resolvedProvider = provider;
                }
                normalizedProvidersMap.set(provider.key.id, resolvedProvider);
            }
        }
        return normalizedProvidersMap;
    }
    /**
     * @param {?} providers
     * @param {?} res
     * @return {?}
     */
    function _normalizeProviders(providers, res) {
        providers.forEach(function (b) {
            if (b instanceof Type) {
                res.push({ provide: b, useClass: b });
            }
            else if (b && typeof b == 'object' && ((b)).provide !== undefined) {
                res.push(/** @type {?} */ (b));
            }
            else if (b instanceof Array) {
                _normalizeProviders(b, res);
            }
            else {
                throw new InvalidProviderError(b);
            }
        });
        return res;
    }
    /**
     * @param {?} typeOrFunc
     * @param {?} dependencies
     * @return {?}
     */
    function constructDependencies(typeOrFunc, dependencies) {
        if (!dependencies) {
            return _dependenciesFor(typeOrFunc);
        }
        else {
            var /** @type {?} */ params_1 = dependencies.map(function (t) { return [t]; });
            return dependencies.map(function (t) { return _extractToken(typeOrFunc, t, params_1); });
        }
    }
    /**
     * @param {?} typeOrFunc
     * @return {?}
     */
    function _dependenciesFor(typeOrFunc) {
        var /** @type {?} */ params = reflector.parameters(typeOrFunc);
        if (!params)
            return [];
        if (params.some(function (p) { return p == null; })) {
            throw new NoAnnotationError(typeOrFunc, params);
        }
        return params.map(function (p) { return _extractToken(typeOrFunc, p, params); });
    }
    /**
     * @param {?} typeOrFunc
     * @param {?} metadata
     * @param {?} params
     * @return {?}
     */
    function _extractToken(typeOrFunc, metadata, params) {
        var /** @type {?} */ token = null;
        var /** @type {?} */ optional = false;
        if (!Array.isArray(metadata)) {
            if (metadata instanceof Inject) {
                return _createDependency(metadata.token, optional, null);
            }
            else {
                return _createDependency(metadata, optional, null);
            }
        }
        var /** @type {?} */ visibility = null;
        for (var /** @type {?} */ i = 0; i < metadata.length; ++i) {
            var /** @type {?} */ paramMetadata = metadata[i];
            if (paramMetadata instanceof Type) {
                token = paramMetadata;
            }
            else if (paramMetadata instanceof Inject) {
                token = paramMetadata.token;
            }
            else if (paramMetadata instanceof Optional) {
                optional = true;
            }
            else if (paramMetadata instanceof Self || paramMetadata instanceof SkipSelf) {
                visibility = paramMetadata;
            }
        }
        token = resolveForwardRef(token);
        if (token != null) {
            return _createDependency(token, optional, visibility);
        }
        else {
            throw new NoAnnotationError(typeOrFunc, params);
        }
    }
    /**
     * @param {?} token
     * @param {?} optional
     * @param {?} visibility
     * @return {?}
     */
    function _createDependency(token, optional, visibility) {
        return new ReflectiveDependency(ReflectiveKey.get(token), optional, visibility);
    }

    // Threshold for the dynamic version
    var /** @type {?} */ UNDEFINED = new Object();
    /**
     * A ReflectiveDependency injection container used for instantiating objects and resolving
     * dependencies.
     *
     * An `Injector` is a replacement for a `new` operator, which can automatically resolve the
     * constructor dependencies.
     *
     * In typical use, application code asks for the dependencies in the constructor and they are
     * resolved by the `Injector`.
     *
     * ### Example ([live demo](http://plnkr.co/edit/jzjec0?p=preview))
     *
     * The following example creates an `Injector` configured to create `Engine` and `Car`.
     *
     * ```typescript
     * \@Injectable()
     * class Engine {
     * }
     *
     * \@Injectable()
     * class Car {
     *   constructor(public engine:Engine) {}
     * }
     *
     * var injector = ReflectiveInjector.resolveAndCreate([Car, Engine]);
     * var car = injector.get(Car);
     * expect(car instanceof Car).toBe(true);
     * expect(car.engine instanceof Engine).toBe(true);
     * ```
     *
     * Notice, we don't use the `new` operator because we explicitly want to have the `Injector`
     * resolve all of the object's dependencies automatically.
     *
     * \@stable
     * @abstract
     */
    var ReflectiveInjector = (function () {
        function ReflectiveInjector() {
        }
        /**
         * Turns an array of provider definitions into an array of resolved providers.
         *
         * A resolution is a process of flattening multiple nested arrays and converting individual
         * providers into an array of {\@link ResolvedReflectiveProvider}s.
         *
         * ### Example ([live demo](http://plnkr.co/edit/AiXTHi?p=preview))
         *
         * ```typescript
         * \@Injectable()
         * class Engine {
         * }
         *
         * \@Injectable()
         * class Car {
         *   constructor(public engine:Engine) {}
         * }
         *
         * var providers = ReflectiveInjector.resolve([Car, [[Engine]]]);
         *
         * expect(providers.length).toEqual(2);
         *
         * expect(providers[0] instanceof ResolvedReflectiveProvider).toBe(true);
         * expect(providers[0].key.displayName).toBe("Car");
         * expect(providers[0].dependencies.length).toEqual(1);
         * expect(providers[0].factory).toBeDefined();
         *
         * expect(providers[1].key.displayName).toBe("Engine");
         * });
         * ```
         *
         * See {\@link ReflectiveInjector#fromResolvedProviders} for more info.
         * @param {?} providers
         * @return {?}
         */
        ReflectiveInjector.resolve = function (providers) {
            return resolveReflectiveProviders(providers);
        };
        /**
         * Resolves an array of providers and creates an injector from those providers.
         *
         * The passed-in providers can be an array of `Type`, {\@link Provider},
         * or a recursive array of more providers.
         *
         * ### Example ([live demo](http://plnkr.co/edit/ePOccA?p=preview))
         *
         * ```typescript
         * \@Injectable()
         * class Engine {
         * }
         *
         * \@Injectable()
         * class Car {
         *   constructor(public engine:Engine) {}
         * }
         *
         * var injector = ReflectiveInjector.resolveAndCreate([Car, Engine]);
         * expect(injector.get(Car) instanceof Car).toBe(true);
         * ```
         *
         * This function is slower than the corresponding `fromResolvedProviders`
         * because it needs to resolve the passed-in providers first.
         * See {\@link Injector#resolve} and {\@link Injector#fromResolvedProviders}.
         * @param {?} providers
         * @param {?=} parent
         * @return {?}
         */
        ReflectiveInjector.resolveAndCreate = function (providers, parent) {
            if (parent === void 0) { parent = null; }
            var /** @type {?} */ ResolvedReflectiveProviders = ReflectiveInjector.resolve(providers);
            return ReflectiveInjector.fromResolvedProviders(ResolvedReflectiveProviders, parent);
        };
        /**
         * Creates an injector from previously resolved providers.
         *
         * This API is the recommended way to construct injectors in performance-sensitive parts.
         *
         * ### Example ([live demo](http://plnkr.co/edit/KrSMci?p=preview))
         *
         * ```typescript
         * \@Injectable()
         * class Engine {
         * }
         *
         * \@Injectable()
         * class Car {
         *   constructor(public engine:Engine) {}
         * }
         *
         * var providers = ReflectiveInjector.resolve([Car, Engine]);
         * var injector = ReflectiveInjector.fromResolvedProviders(providers);
         * expect(injector.get(Car) instanceof Car).toBe(true);
         * ```
         * \@experimental
         * @param {?} providers
         * @param {?=} parent
         * @return {?}
         */
        ReflectiveInjector.fromResolvedProviders = function (providers, parent) {
            if (parent === void 0) { parent = null; }
            return new ReflectiveInjector_(providers, parent);
        };
        /**
         * Parent of this injector.
         *
         * <!-- TODO: Add a link to the section of the user guide talking about hierarchical injection.
         * -->
         *
         * ### Example ([live demo](http://plnkr.co/edit/eosMGo?p=preview))
         *
         * ```typescript
         * var parent = ReflectiveInjector.resolveAndCreate([]);
         * var child = parent.resolveAndCreateChild([]);
         * expect(child.parent).toBe(parent);
         * ```
         * @abstract
         * @return {?}
         */
        ReflectiveInjector.prototype.parent = function () { };
        /**
         * Resolves an array of providers and creates a child injector from those providers.
         *
         * <!-- TODO: Add a link to the section of the user guide talking about hierarchical injection.
         * -->
         *
         * The passed-in providers can be an array of `Type`, {\@link Provider},
         * or a recursive array of more providers.
         *
         * ### Example ([live demo](http://plnkr.co/edit/opB3T4?p=preview))
         *
         * ```typescript
         * class ParentProvider {}
         * class ChildProvider {}
         *
         * var parent = ReflectiveInjector.resolveAndCreate([ParentProvider]);
         * var child = parent.resolveAndCreateChild([ChildProvider]);
         *
         * expect(child.get(ParentProvider) instanceof ParentProvider).toBe(true);
         * expect(child.get(ChildProvider) instanceof ChildProvider).toBe(true);
         * expect(child.get(ParentProvider)).toBe(parent.get(ParentProvider));
         * ```
         *
         * This function is slower than the corresponding `createChildFromResolved`
         * because it needs to resolve the passed-in providers first.
         * See {\@link Injector#resolve} and {\@link Injector#createChildFromResolved}.
         * @abstract
         * @param {?} providers
         * @return {?}
         */
        ReflectiveInjector.prototype.resolveAndCreateChild = function (providers) { };
        /**
         * Creates a child injector from previously resolved providers.
         *
         * <!-- TODO: Add a link to the section of the user guide talking about hierarchical injection.
         * -->
         *
         * This API is the recommended way to construct injectors in performance-sensitive parts.
         *
         * ### Example ([live demo](http://plnkr.co/edit/VhyfjN?p=preview))
         *
         * ```typescript
         * class ParentProvider {}
         * class ChildProvider {}
         *
         * var parentProviders = ReflectiveInjector.resolve([ParentProvider]);
         * var childProviders = ReflectiveInjector.resolve([ChildProvider]);
         *
         * var parent = ReflectiveInjector.fromResolvedProviders(parentProviders);
         * var child = parent.createChildFromResolved(childProviders);
         *
         * expect(child.get(ParentProvider) instanceof ParentProvider).toBe(true);
         * expect(child.get(ChildProvider) instanceof ChildProvider).toBe(true);
         * expect(child.get(ParentProvider)).toBe(parent.get(ParentProvider));
         * ```
         * @abstract
         * @param {?} providers
         * @return {?}
         */
        ReflectiveInjector.prototype.createChildFromResolved = function (providers) { };
        /**
         * Resolves a provider and instantiates an object in the context of the injector.
         *
         * The created object does not get cached by the injector.
         *
         * ### Example ([live demo](http://plnkr.co/edit/yvVXoB?p=preview))
         *
         * ```typescript
         * \@Injectable()
         * class Engine {
         * }
         *
         * \@Injectable()
         * class Car {
         *   constructor(public engine:Engine) {}
         * }
         *
         * var injector = ReflectiveInjector.resolveAndCreate([Engine]);
         *
         * var car = injector.resolveAndInstantiate(Car);
         * expect(car.engine).toBe(injector.get(Engine));
         * expect(car).not.toBe(injector.resolveAndInstantiate(Car));
         * ```
         * @abstract
         * @param {?} provider
         * @return {?}
         */
        ReflectiveInjector.prototype.resolveAndInstantiate = function (provider) { };
        /**
         * Instantiates an object using a resolved provider in the context of the injector.
         *
         * The created object does not get cached by the injector.
         *
         * ### Example ([live demo](http://plnkr.co/edit/ptCImQ?p=preview))
         *
         * ```typescript
         * \@Injectable()
         * class Engine {
         * }
         *
         * \@Injectable()
         * class Car {
         *   constructor(public engine:Engine) {}
         * }
         *
         * var injector = ReflectiveInjector.resolveAndCreate([Engine]);
         * var carProvider = ReflectiveInjector.resolve([Car])[0];
         * var car = injector.instantiateResolved(carProvider);
         * expect(car.engine).toBe(injector.get(Engine));
         * expect(car).not.toBe(injector.instantiateResolved(carProvider));
         * ```
         * @abstract
         * @param {?} provider
         * @return {?}
         */
        ReflectiveInjector.prototype.instantiateResolved = function (provider) { };
        /**
         * @abstract
         * @param {?} token
         * @param {?=} notFoundValue
         * @return {?}
         */
        ReflectiveInjector.prototype.get = function (token, notFoundValue) { };
        return ReflectiveInjector;
    }());
    var ReflectiveInjector_ = (function () {
        /**
         * Private
         * @param {?} _providers
         * @param {?=} _parent
         */
        function ReflectiveInjector_(_providers, _parent) {
            if (_parent === void 0) { _parent = null; }
            /** @internal */
            this._constructionCounter = 0;
            this._providers = _providers;
            this._parent = _parent;
            var len = _providers.length;
            this.keyIds = new Array(len);
            this.objs = new Array(len);
            for (var i = 0; i < len; i++) {
                this.keyIds[i] = _providers[i].key.id;
                this.objs[i] = UNDEFINED;
            }
        }
        /**
         * @param {?} token
         * @param {?=} notFoundValue
         * @return {?}
         */
        ReflectiveInjector_.prototype.get = function (token, notFoundValue) {
            if (notFoundValue === void 0) { notFoundValue = THROW_IF_NOT_FOUND; }
            return this._getByKey(ReflectiveKey.get(token), null, notFoundValue);
        };
        Object.defineProperty(ReflectiveInjector_.prototype, "parent", {
            /**
             * @return {?}
             */
            get: function () { return this._parent; },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} providers
         * @return {?}
         */
        ReflectiveInjector_.prototype.resolveAndCreateChild = function (providers) {
            var /** @type {?} */ ResolvedReflectiveProviders = ReflectiveInjector.resolve(providers);
            return this.createChildFromResolved(ResolvedReflectiveProviders);
        };
        /**
         * @param {?} providers
         * @return {?}
         */
        ReflectiveInjector_.prototype.createChildFromResolved = function (providers) {
            var /** @type {?} */ inj = new ReflectiveInjector_(providers);
            inj._parent = this;
            return inj;
        };
        /**
         * @param {?} provider
         * @return {?}
         */
        ReflectiveInjector_.prototype.resolveAndInstantiate = function (provider) {
            return this.instantiateResolved(ReflectiveInjector.resolve([provider])[0]);
        };
        /**
         * @param {?} provider
         * @return {?}
         */
        ReflectiveInjector_.prototype.instantiateResolved = function (provider) {
            return this._instantiateProvider(provider);
        };
        /**
         * @param {?} index
         * @return {?}
         */
        ReflectiveInjector_.prototype.getProviderAtIndex = function (index) {
            if (index < 0 || index >= this._providers.length) {
                throw new OutOfBoundsError(index);
            }
            return this._providers[index];
        };
        /**
         * \@internal
         * @param {?} provider
         * @return {?}
         */
        ReflectiveInjector_.prototype._new = function (provider) {
            if (this._constructionCounter++ > this._getMaxNumberOfObjects()) {
                throw new CyclicDependencyError(this, provider.key);
            }
            return this._instantiateProvider(provider);
        };
        /**
         * @return {?}
         */
        ReflectiveInjector_.prototype._getMaxNumberOfObjects = function () { return this.objs.length; };
        /**
         * @param {?} provider
         * @return {?}
         */
        ReflectiveInjector_.prototype._instantiateProvider = function (provider) {
            if (provider.multiProvider) {
                var /** @type {?} */ res = new Array(provider.resolvedFactories.length);
                for (var /** @type {?} */ i = 0; i < provider.resolvedFactories.length; ++i) {
                    res[i] = this._instantiate(provider, provider.resolvedFactories[i]);
                }
                return res;
            }
            else {
                return this._instantiate(provider, provider.resolvedFactories[0]);
            }
        };
        /**
         * @param {?} provider
         * @param {?} ResolvedReflectiveFactory
         * @return {?}
         */
        ReflectiveInjector_.prototype._instantiate = function (provider, ResolvedReflectiveFactory) {
            var _this = this;
            var /** @type {?} */ factory = ResolvedReflectiveFactory.factory;
            var /** @type {?} */ deps;
            try {
                deps =
                    ResolvedReflectiveFactory.dependencies.map(function (dep) { return _this._getByReflectiveDependency(dep); });
            }
            catch (e) {
                if (e instanceof AbstractProviderError || e instanceof InstantiationError) {
                    e.addKey(this, provider.key);
                }
                throw e;
            }
            var /** @type {?} */ obj;
            try {
                obj = factory.apply(void 0, deps);
            }
            catch (e) {
                throw new InstantiationError(this, e, e.stack, provider.key);
            }
            return obj;
        };
        /**
         * @param {?} dep
         * @return {?}
         */
        ReflectiveInjector_.prototype._getByReflectiveDependency = function (dep) {
            return this._getByKey(dep.key, dep.visibility, dep.optional ? null : THROW_IF_NOT_FOUND);
        };
        /**
         * @param {?} key
         * @param {?} visibility
         * @param {?} notFoundValue
         * @return {?}
         */
        ReflectiveInjector_.prototype._getByKey = function (key, visibility, notFoundValue) {
            if (key === INJECTOR_KEY) {
                return this;
            }
            if (visibility instanceof Self) {
                return this._getByKeySelf(key, notFoundValue);
            }
            else {
                return this._getByKeyDefault(key, notFoundValue, visibility);
            }
        };
        /**
         * @param {?} keyId
         * @return {?}
         */
        ReflectiveInjector_.prototype._getObjByKeyId = function (keyId) {
            for (var /** @type {?} */ i = 0; i < this.keyIds.length; i++) {
                if (this.keyIds[i] === keyId) {
                    if (this.objs[i] === UNDEFINED) {
                        this.objs[i] = this._new(this._providers[i]);
                    }
                    return this.objs[i];
                }
            }
            return UNDEFINED;
        };
        /**
         * \@internal
         * @param {?} key
         * @param {?} notFoundValue
         * @return {?}
         */
        ReflectiveInjector_.prototype._throwOrNull = function (key, notFoundValue) {
            if (notFoundValue !== THROW_IF_NOT_FOUND) {
                return notFoundValue;
            }
            else {
                throw new NoProviderError(this, key);
            }
        };
        /**
         * \@internal
         * @param {?} key
         * @param {?} notFoundValue
         * @return {?}
         */
        ReflectiveInjector_.prototype._getByKeySelf = function (key, notFoundValue) {
            var /** @type {?} */ obj = this._getObjByKeyId(key.id);
            return (obj !== UNDEFINED) ? obj : this._throwOrNull(key, notFoundValue);
        };
        /**
         * \@internal
         * @param {?} key
         * @param {?} notFoundValue
         * @param {?} visibility
         * @return {?}
         */
        ReflectiveInjector_.prototype._getByKeyDefault = function (key, notFoundValue, visibility) {
            var /** @type {?} */ inj;
            if (visibility instanceof SkipSelf) {
                inj = this._parent;
            }
            else {
                inj = this;
            }
            while (inj instanceof ReflectiveInjector_) {
                var /** @type {?} */ inj_ = (inj);
                var /** @type {?} */ obj = inj_._getObjByKeyId(key.id);
                if (obj !== UNDEFINED)
                    return obj;
                inj = inj_._parent;
            }
            if (inj !== null) {
                return inj.get(key.token, notFoundValue);
            }
            else {
                return this._throwOrNull(key, notFoundValue);
            }
        };
        Object.defineProperty(ReflectiveInjector_.prototype, "displayName", {
            /**
             * @return {?}
             */
            get: function () {
                var /** @type {?} */ providers = _mapProviders(this, function (b) { return ' "' + b.key.displayName + '" '; })
                    .join(', ');
                return "ReflectiveInjector(providers: [" + providers + "])";
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        ReflectiveInjector_.prototype.toString = function () { return this.displayName; };
        return ReflectiveInjector_;
    }());
    var /** @type {?} */ INJECTOR_KEY = ReflectiveKey.get(Injector);
    /**
     * @param {?} injector
     * @param {?} fn
     * @return {?}
     */
    function _mapProviders(injector, fn) {
        var /** @type {?} */ res = new Array(injector._providers.length);
        for (var /** @type {?} */ i = 0; i < injector._providers.length; ++i) {
            res[i] = fn(injector.getProviderAtIndex(i));
        }
        return res;
    }

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * \@whatItDoes Provides a hook for centralized exception handling.
     *
     * \@description
     *
     * The default implementation of `ErrorHandler` prints error messages to the `console`. To
     * intercept error handling, write a custom exception handler that replaces this default as
     * appropriate for your app.
     *
     * ### Example
     *
     * ```
     * class MyErrorHandler implements ErrorHandler {
     *   handleError(error) {
     *     // do something with the exception
     *   }
     * }
     *
     * \@NgModule({
     *   providers: [{provide: ErrorHandler, useClass: MyErrorHandler}]
     * })
     * class MyModule {}
     * ```
     *
     * \@stable
     */
    var ErrorHandler = (function () {
        /**
         * @param {?=} rethrowError
         */
        function ErrorHandler(rethrowError) {
            if (rethrowError === void 0) { rethrowError = true; }
            /**
             * @internal
             */
            this._console = console;
            this.rethrowError = rethrowError;
        }
        /**
         * @param {?} error
         * @return {?}
         */
        ErrorHandler.prototype.handleError = function (error) {
            var /** @type {?} */ originalError = this._findOriginalError(error);
            var /** @type {?} */ originalStack = this._findOriginalStack(error);
            var /** @type {?} */ context = this._findContext(error);
            this._console.error("EXCEPTION: " + this._extractMessage(error));
            if (originalError) {
                this._console.error("ORIGINAL EXCEPTION: " + this._extractMessage(originalError));
            }
            if (originalStack) {
                this._console.error('ORIGINAL STACKTRACE:');
                this._console.error(originalStack);
            }
            if (context) {
                this._console.error('ERROR CONTEXT:');
                this._console.error(context);
            }
            // We rethrow exceptions, so operations like 'bootstrap' will result in an error
            // when an error happens. If we do not rethrow, bootstrap will always succeed.
            if (this.rethrowError)
                throw error;
        };
        /**
         * \@internal
         * @param {?} error
         * @return {?}
         */
        ErrorHandler.prototype._extractMessage = function (error) {
            return error instanceof Error ? error.message : error.toString();
        };
        /**
         * \@internal
         * @param {?} error
         * @return {?}
         */
        ErrorHandler.prototype._findContext = function (error) {
            if (error) {
                return error.context ? error.context :
                    this._findContext(((error)).originalError);
            }
            return null;
        };
        /**
         * \@internal
         * @param {?} error
         * @return {?}
         */
        ErrorHandler.prototype._findOriginalError = function (error) {
            var /** @type {?} */ e = ((error)).originalError;
            while (e && ((e)).originalError) {
                e = ((e)).originalError;
            }
            return e;
        };
        /**
         * \@internal
         * @param {?} error
         * @return {?}
         */
        ErrorHandler.prototype._findOriginalStack = function (error) {
            if (!(error instanceof Error))
                return null;
            var /** @type {?} */ e = error;
            var /** @type {?} */ stack = e.stack;
            while (e instanceof Error && ((e)).originalError) {
                e = ((e)).originalError;
                if (e instanceof Error && e.stack) {
                    stack = e.stack;
                }
            }
            return stack;
        };
        return ErrorHandler;
    }());

    /**
     * Wraps Javascript Objects
     */
    var StringMapWrapper = (function () {
        function StringMapWrapper() {
        }
        /**
         * @param {?} m1
         * @param {?} m2
         * @return {?}
         */
        StringMapWrapper.merge = function (m1, m2) {
            var /** @type {?} */ m = {};
            for (var _i = 0, _a = Object.keys(m1); _i < _a.length; _i++) {
                var k = _a[_i];
                m[k] = m1[k];
            }
            for (var _b = 0, _c = Object.keys(m2); _b < _c.length; _b++) {
                var k = _c[_b];
                m[k] = m2[k];
            }
            return m;
        };
        /**
         * @param {?} m1
         * @param {?} m2
         * @return {?}
         */
        StringMapWrapper.equals = function (m1, m2) {
            var /** @type {?} */ k1 = Object.keys(m1);
            var /** @type {?} */ k2 = Object.keys(m2);
            if (k1.length != k2.length) {
                return false;
            }
            for (var /** @type {?} */ i = 0; i < k1.length; i++) {
                var /** @type {?} */ key = k1[i];
                if (m1[key] !== m2[key]) {
                    return false;
                }
            }
            return true;
        };
        return StringMapWrapper;
    }());
    var ListWrapper = (function () {
        function ListWrapper() {
        }
        /**
         * @param {?} arr
         * @param {?} condition
         * @return {?}
         */
        ListWrapper.findLast = function (arr, condition) {
            for (var /** @type {?} */ i = arr.length - 1; i >= 0; i--) {
                if (condition(arr[i])) {
                    return arr[i];
                }
            }
            return null;
        };
        /**
         * @param {?} list
         * @param {?} items
         * @return {?}
         */
        ListWrapper.removeAll = function (list, items) {
            for (var /** @type {?} */ i = 0; i < items.length; ++i) {
                var /** @type {?} */ index = list.indexOf(items[i]);
                if (index > -1) {
                    list.splice(index, 1);
                }
            }
        };
        /**
         * @param {?} list
         * @param {?} el
         * @return {?}
         */
        ListWrapper.remove = function (list, el) {
            var /** @type {?} */ index = list.indexOf(el);
            if (index > -1) {
                list.splice(index, 1);
                return true;
            }
            return false;
        };
        /**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        ListWrapper.equals = function (a, b) {
            if (a.length != b.length)
                return false;
            for (var /** @type {?} */ i = 0; i < a.length; ++i) {
                if (a[i] !== b[i])
                    return false;
            }
            return true;
        };
        /**
         * @param {?} list
         * @return {?}
         */
        ListWrapper.flatten = function (list) {
            return list.reduce(function (flat, item) {
                var /** @type {?} */ flatItem = Array.isArray(item) ? ListWrapper.flatten(item) : item;
                return ((flat)).concat(flatItem);
            }, []);
        };
        return ListWrapper;
    }());
    /**
     * @param {?} obj
     * @return {?}
     */
    function isListLikeIterable(obj) {
        if (!isJsObject(obj))
            return false;
        return Array.isArray(obj) ||
            (!(obj instanceof Map) &&
                getSymbolIterator() in obj); // JS Iterable have a Symbol.iterator prop
    }
    /**
     * @param {?} a
     * @param {?} b
     * @param {?} comparator
     * @return {?}
     */
    function areIterablesEqual(a, b, comparator) {
        var /** @type {?} */ iterator1 = a[getSymbolIterator()]();
        var /** @type {?} */ iterator2 = b[getSymbolIterator()]();
        while (true) {
            var /** @type {?} */ item1 = iterator1.next();
            var /** @type {?} */ item2 = iterator2.next();
            if (item1.done && item2.done)
                return true;
            if (item1.done || item2.done)
                return false;
            if (!comparator(item1.value, item2.value))
                return false;
        }
    }
    /**
     * @param {?} obj
     * @param {?} fn
     * @return {?}
     */
    function iterateListLike(obj, fn) {
        if (Array.isArray(obj)) {
            for (var /** @type {?} */ i = 0; i < obj.length; i++) {
                fn(obj[i]);
            }
        }
        else {
            var /** @type {?} */ iterator = obj[getSymbolIterator()]();
            var /** @type {?} */ item = void 0;
            while (!((item = iterator.next()).done)) {
                fn(item.value);
            }
        }
    }

    /**
     * Determine if the argument is shaped like a Promise
     * @param {?} obj
     * @return {?}
     */
    function isPromise(obj) {
        // allow any Promise/A+ compliant thenable.
        // It's up to the caller to ensure that obj.then conforms to the spec
        return !!obj && typeof obj.then === 'function';
    }
    /**
     * Determine if the argument is an Observable
     * @param {?} obj
     * @return {?}
     */
    function isObservable(obj) {
        return !!(obj && obj[rxjs_symbol_observable.$$observable]);
    }

    /**
     * A function that will be executed when an application is initialized.
     * @experimental
     */
    var /** @type {?} */ APP_INITIALIZER = new OpaqueToken('Application Initializer');
    /**
     * A class that reflects the state of running {\@link APP_INITIALIZER}s.
     *
     * \@experimental
     */
    var ApplicationInitStatus = (function () {
        /**
         * @param {?} appInits
         */
        function ApplicationInitStatus(appInits) {
            var _this = this;
            this._done = false;
            var asyncInitPromises = [];
            if (appInits) {
                for (var i = 0; i < appInits.length; i++) {
                    var initResult = appInits[i]();
                    if (isPromise(initResult)) {
                        asyncInitPromises.push(initResult);
                    }
                }
            }
            this._donePromise = Promise.all(asyncInitPromises).then(function () { _this._done = true; });
            if (asyncInitPromises.length === 0) {
                this._done = true;
            }
        }
        Object.defineProperty(ApplicationInitStatus.prototype, "done", {
            /**
             * @return {?}
             */
            get: function () { return this._done; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ApplicationInitStatus.prototype, "donePromise", {
            /**
             * @return {?}
             */
            get: function () { return this._donePromise; },
            enumerable: true,
            configurable: true
        });
        ApplicationInitStatus.decorators = [
            { type: Injectable },
        ];
        /** @nocollapse */
        ApplicationInitStatus.ctorParameters = function () { return [
            { type: Array, decorators: [{ type: Inject, args: [APP_INITIALIZER,] }, { type: Optional },] },
        ]; };
        return ApplicationInitStatus;
    }());

    /**
     * A DI Token representing a unique string id assigned to the application by Angular and used
     * primarily for prefixing application attributes and CSS styles when
     * {@link ViewEncapsulation#Emulated} is being used.
     *
     * If you need to avoid randomly generated value to be used as an application id, you can provide
     * a custom value via a DI provider <!-- TODO: provider --> configuring the root {@link Injector}
     * using this token.
     * @experimental
     */
    var /** @type {?} */ APP_ID = new OpaqueToken('AppId');
    /**
     * @return {?}
     */
    function _appIdRandomProviderFactory() {
        return "" + _randomChar() + _randomChar() + _randomChar();
    }
    /**
     * Providers that will generate a random APP_ID_TOKEN.
     * @experimental
     */
    var /** @type {?} */ APP_ID_RANDOM_PROVIDER = {
        provide: APP_ID,
        useFactory: _appIdRandomProviderFactory,
        deps: /** @type {?} */ ([]),
    };
    /**
     * @return {?}
     */
    function _randomChar() {
        return String.fromCharCode(97 + Math.floor(Math.random() * 25));
    }
    /**
     * A function that will be executed when a platform is initialized.
     * @experimental
     */
    var /** @type {?} */ PLATFORM_INITIALIZER = new OpaqueToken('Platform Initializer');
    /**
     * All callbacks provided via this token will be called for every component that is bootstrapped.
     * Signature of the callback:
     *
     * `(componentRef: ComponentRef) => void`.
     *
     * @experimental
     */
    var /** @type {?} */ APP_BOOTSTRAP_LISTENER = new OpaqueToken('appBootstrapListener');
    /**
     * A token which indicates the root directory of the application
     * @experimental
     */
    var /** @type {?} */ PACKAGE_ROOT_URL = new OpaqueToken('Application Packages Root URL');

    var Console = (function () {
        function Console() {
        }
        /**
         * @param {?} message
         * @return {?}
         */
        Console.prototype.log = function (message) { print(message); };
        /**
         * @param {?} message
         * @return {?}
         */
        Console.prototype.warn = function (message) { warn(message); };
        Console.decorators = [
            { type: Injectable },
        ];
        /** @nocollapse */
        Console.ctorParameters = function () { return []; };
        return Console;
    }());

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var __extends$4 = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    /**
     * Indicates that a component is still being loaded in a synchronous compile.
     *
     * \@stable
     */
    var ComponentStillLoadingError = (function (_super) {
        __extends$4(ComponentStillLoadingError, _super);
        /**
         * @param {?} compType
         */
        function ComponentStillLoadingError(compType) {
            _super.call(this, "Can't compile synchronously as " + stringify(compType) + " is still being loaded!");
            this.compType = compType;
        }
        return ComponentStillLoadingError;
    }(BaseError));
    /**
     * Combination of NgModuleFactory and ComponentFactorys.
     *
     * \@experimental
     */
    var ModuleWithComponentFactories = (function () {
        /**
         * @param {?} ngModuleFactory
         * @param {?} componentFactories
         */
        function ModuleWithComponentFactories(ngModuleFactory, componentFactories) {
            this.ngModuleFactory = ngModuleFactory;
            this.componentFactories = componentFactories;
        }
        return ModuleWithComponentFactories;
    }());
    /**
     * @return {?}
     */
    function _throwError() {
        throw new Error("Runtime compiler is not loaded");
    }
    /**
     * Low-level service for running the angular compiler during runtime
     * to create {\@link ComponentFactory}s, which
     * can later be used to create and render a Component instance.
     *
     * Each `\@NgModule` provides an own `Compiler` to its injector,
     * that will use the directives/pipes of the ng module for compilation
     * of components.
     * \@stable
     */
    var Compiler = (function () {
        function Compiler() {
        }
        /**
         * Compiles the given NgModule and all of its components. All templates of the components listed
         * in `entryComponents`
         * have to be inlined. Otherwise throws a {\@link ComponentStillLoadingError}.
         * @param {?} moduleType
         * @return {?}
         */
        Compiler.prototype.compileModuleSync = function (moduleType) { throw _throwError(); };
        /**
         * Compiles the given NgModule and all of its components
         * @param {?} moduleType
         * @return {?}
         */
        Compiler.prototype.compileModuleAsync = function (moduleType) { throw _throwError(); };
        /**
         * Same as {\@link compileModuleSync} but also creates ComponentFactories for all components.
         * @param {?} moduleType
         * @return {?}
         */
        Compiler.prototype.compileModuleAndAllComponentsSync = function (moduleType) {
            throw _throwError();
        };
        /**
         * Same as {\@link compileModuleAsync} but also creates ComponentFactories for all components.
         * @param {?} moduleType
         * @return {?}
         */
        Compiler.prototype.compileModuleAndAllComponentsAsync = function (moduleType) {
            throw _throwError();
        };
        /**
         * Exposes the CSS-style selectors that have been used in `ngContent` directives within
         * the template of the given component.
         * This is used by the `upgrade` library to compile the appropriate transclude content
         * in the Angular 1 wrapper component.
         * @param {?} component
         * @return {?}
         */
        Compiler.prototype.getNgContentSelectors = function (component) { throw _throwError(); };
        /**
         * Clears all caches.
         * @return {?}
         */
        Compiler.prototype.clearCache = function () { };
        /**
         * Clears the cache for the given component/ngModule.
         * @param {?} type
         * @return {?}
         */
        Compiler.prototype.clearCacheFor = function (type) { };
        Compiler.decorators = [
            { type: Injectable },
        ];
        /** @nocollapse */
        Compiler.ctorParameters = function () { return []; };
        return Compiler;
    }());
    /**
     * Token to provide CompilerOptions in the platform injector.
     *
     * @experimental
     */
    var /** @type {?} */ COMPILER_OPTIONS = new OpaqueToken('compilerOptions');
    /**
     * A factory for creating a Compiler
     *
     * \@experimental
     * @abstract
     */
    var CompilerFactory = (function () {
        function CompilerFactory() {
        }
        /**
         * @abstract
         * @param {?=} options
         * @return {?}
         */
        CompilerFactory.prototype.createCompiler = function (options) { };
        return CompilerFactory;
    }());

    var ElementRef = (function () {
        /**
         * @param {?} nativeElement
         */
        function ElementRef(nativeElement) {
            this.nativeElement = nativeElement;
        }
        return ElementRef;
    }());

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var __extends$6 = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    /**
     * Use by directives and components to emit custom Events.
     *
     * ### Examples
     *
     * In the following example, `Zippy` alternatively emits `open` and `close` events when its
     * title gets clicked:
     *
     * ```
     * \@Component({
     *   selector: 'zippy',
     *   template: `
     *   <div class="zippy">
     *     <div (click)="toggle()">Toggle</div>
     *     <div [hidden]="!visible">
     *       <ng-content></ng-content>
     *     </div>
     *  </div>`})
     * export class Zippy {
     *   visible: boolean = true;
     *   \@Output() open: EventEmitter<any> = new EventEmitter();
     *   \@Output() close: EventEmitter<any> = new EventEmitter();
     *
     *   toggle() {
     *     this.visible = !this.visible;
     *     if (this.visible) {
     *       this.open.emit(null);
     *     } else {
     *       this.close.emit(null);
     *     }
     *   }
     * }
     * ```
     *
     * The events payload can be accessed by the parameter `$event` on the components output event
     * handler:
     *
     * ```
     * <zippy (open)="onOpen($event)" (close)="onClose($event)"></zippy>
     * ```
     *
     * Uses Rx.Observable but provides an adapter to make it work as specified here:
     * https://github.com/jhusain/observable-spec
     *
     * Once a reference implementation of the spec is available, switch to it.
     * \@stable
     */
    var EventEmitter = (function (_super) {
        __extends$6(EventEmitter, _super);
        /**
         * Creates an instance of [EventEmitter], which depending on [isAsync],
         * delivers events synchronously or asynchronously.
         * @param {?=} isAsync
         */
        function EventEmitter(isAsync) {
            if (isAsync === void 0) { isAsync = false; }
            _super.call(this);
            this.__isAsync = isAsync;
        }
        /**
         * @param {?=} value
         * @return {?}
         */
        EventEmitter.prototype.emit = function (value) { _super.prototype.next.call(this, value); };
        /**
         * @param {?=} generatorOrNext
         * @param {?=} error
         * @param {?=} complete
         * @return {?}
         */
        EventEmitter.prototype.subscribe = function (generatorOrNext, error, complete) {
            var /** @type {?} */ schedulerFn;
            var /** @type {?} */ errorFn = function (err) { return null; };
            var /** @type {?} */ completeFn = function () { return null; };
            if (generatorOrNext && typeof generatorOrNext === 'object') {
                schedulerFn = this.__isAsync ? function (value) {
                    setTimeout(function () { return generatorOrNext.next(value); });
                } : function (value) { generatorOrNext.next(value); };
                if (generatorOrNext.error) {
                    errorFn = this.__isAsync ? function (err) { setTimeout(function () { return generatorOrNext.error(err); }); } :
                        function (err) { generatorOrNext.error(err); };
                }
                if (generatorOrNext.complete) {
                    completeFn = this.__isAsync ? function () { setTimeout(function () { return generatorOrNext.complete(); }); } :
                        function () { generatorOrNext.complete(); };
                }
            }
            else {
                schedulerFn = this.__isAsync ? function (value) { setTimeout(function () { return generatorOrNext(value); }); } :
                    function (value) { generatorOrNext(value); };
                if (error) {
                    errorFn =
                        this.__isAsync ? function (err) { setTimeout(function () { return error(err); }); } : function (err) { error(err); };
                }
                if (complete) {
                    completeFn =
                        this.__isAsync ? function () { setTimeout(function () { return complete(); }); } : function () { complete(); };
                }
            }
            return _super.prototype.subscribe.call(this, schedulerFn, errorFn, completeFn);
        };
        return EventEmitter;
    }(rxjs_Subject.Subject));

    /**
     * An injectable service for executing work inside or outside of the Angular zone.
     *
     * The most common use of this service is to optimize performance when starting a work consisting of
     * one or more asynchronous tasks that don't require UI updates or error handling to be handled by
     * Angular. Such tasks can be kicked off via {\@link runOutsideAngular} and if needed, these tasks
     * can reenter the Angular zone via {\@link run}.
     *
     * <!-- TODO: add/fix links to:
     *   - docs explaining zones and the use of zones in Angular and change-detection
     *   - link to runOutsideAngular/run (throughout this file!)
     *   -->
     *
     * ### Example
     *
     * ```
     * import {Component, NgZone} from '\@angular/core';
     * import {NgIf} from '\@angular/common';
     *
     * \@Component({
     *   selector: 'ng-zone-demo'.
     *   template: `
     *     <h2>Demo: NgZone</h2>
     *
     *     <p>Progress: {{progress}}%</p>
     *     <p *ngIf="progress >= 100">Done processing {{label}} of Angular zone!</p>
     *
     *     <button (click)="processWithinAngularZone()">Process within Angular zone</button>
     *     <button (click)="processOutsideOfAngularZone()">Process outside of Angular zone</button>
     *   `,
     * })
     * export class NgZoneDemo {
     *   progress: number = 0;
     *   label: string;
     *
     *   constructor(private _ngZone: NgZone) {}
     *
     *   // Loop inside the Angular zone
     *   // so the UI DOES refresh after each setTimeout cycle
     *   processWithinAngularZone() {
     *     this.label = 'inside';
     *     this.progress = 0;
     *     this._increaseProgress(() => console.log('Inside Done!'));
     *   }
     *
     *   // Loop outside of the Angular zone
     *   // so the UI DOES NOT refresh after each setTimeout cycle
     *   processOutsideOfAngularZone() {
     *     this.label = 'outside';
     *     this.progress = 0;
     *     this._ngZone.runOutsideAngular(() => {
     *       this._increaseProgress(() => {
     *       // reenter the Angular zone and display done
     *       this._ngZone.run(() => {console.log('Outside Done!') });
     *     }}));
     *   }
     *
     *   _increaseProgress(doneCallback: () => void) {
     *     this.progress += 1;
     *     console.log(`Current progress: ${this.progress}%`);
     *
     *     if (this.progress < 100) {
     *       window.setTimeout(() => this._increaseProgress(doneCallback)), 10)
     *     } else {
     *       doneCallback();
     *     }
     *   }
     * }
     * ```
     *
     * \@experimental
     */
    var NgZone = (function () {
        /**
         * @param {?} __0
         */
        function NgZone(_a) {
            var _b = _a.enableLongStackTrace, enableLongStackTrace = _b === void 0 ? false : _b;
            this._hasPendingMicrotasks = false;
            this._hasPendingMacrotasks = false;
            this._isStable = true;
            this._nesting = 0;
            this._onUnstable = new EventEmitter(false);
            this._onMicrotaskEmpty = new EventEmitter(false);
            this._onStable = new EventEmitter(false);
            this._onErrorEvents = new EventEmitter(false);
            if (typeof Zone == 'undefined') {
                throw new Error('Angular requires Zone.js prolyfill.');
            }
            Zone.assertZonePatched();
            this.outer = this.inner = Zone.current;
            if (Zone['wtfZoneSpec']) {
                this.inner = this.inner.fork(Zone['wtfZoneSpec']);
            }
            if (enableLongStackTrace && Zone['longStackTraceZoneSpec']) {
                this.inner = this.inner.fork(Zone['longStackTraceZoneSpec']);
            }
            this.forkInnerZoneWithAngularBehavior();
        }
        /**
         * @return {?}
         */
        NgZone.isInAngularZone = function () { return Zone.current.get('isAngularZone') === true; };
        /**
         * @return {?}
         */
        NgZone.assertInAngularZone = function () {
            if (!NgZone.isInAngularZone()) {
                throw new Error('Expected to be in Angular Zone, but it is not!');
            }
        };
        /**
         * @return {?}
         */
        NgZone.assertNotInAngularZone = function () {
            if (NgZone.isInAngularZone()) {
                throw new Error('Expected to not be in Angular Zone, but it is!');
            }
        };
        /**
         * Executes the `fn` function synchronously within the Angular zone and returns value returned by
         * the function.
         *
         * Running functions via `run` allows you to reenter Angular zone from a task that was executed
         * outside of the Angular zone (typically started via {\@link runOutsideAngular}).
         *
         * Any future tasks or microtasks scheduled from within this function will continue executing from
         * within the Angular zone.
         *
         * If a synchronous error happens it will be rethrown and not reported via `onError`.
         * @param {?} fn
         * @return {?}
         */
        NgZone.prototype.run = function (fn) { return this.inner.run(fn); };
        /**
         * Same as `run`, except that synchronous errors are caught and forwarded via `onError` and not
         * rethrown.
         * @param {?} fn
         * @return {?}
         */
        NgZone.prototype.runGuarded = function (fn) { return this.inner.runGuarded(fn); };
        /**
         * Executes the `fn` function synchronously in Angular's parent zone and returns value returned by
         * the function.
         *
         * Running functions via `runOutsideAngular` allows you to escape Angular's zone and do work that
         * doesn't trigger Angular change-detection or is subject to Angular's error handling.
         *
         * Any future tasks or microtasks scheduled from within this function will continue executing from
         * outside of the Angular zone.
         *
         * Use {\@link run} to reenter the Angular zone and do work that updates the application model.
         * @param {?} fn
         * @return {?}
         */
        NgZone.prototype.runOutsideAngular = function (fn) { return this.outer.run(fn); };
        Object.defineProperty(NgZone.prototype, "onUnstable", {
            /**
             * Notifies when code enters Angular Zone. This gets fired first on VM Turn.
             * @return {?}
             */
            get: function () { return this._onUnstable; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgZone.prototype, "onMicrotaskEmpty", {
            /**
             * Notifies when there is no more microtasks enqueue in the current VM Turn.
             * This is a hint for Angular to do change detection, which may enqueue more microtasks.
             * For this reason this event can fire multiple times per VM Turn.
             * @return {?}
             */
            get: function () { return this._onMicrotaskEmpty; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgZone.prototype, "onStable", {
            /**
             * Notifies when the last `onMicrotaskEmpty` has run and there are no more microtasks, which
             * implies we are about to relinquish VM turn.
             * This event gets called just once.
             * @return {?}
             */
            get: function () { return this._onStable; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgZone.prototype, "onError", {
            /**
             * Notify that an error has been delivered.
             * @return {?}
             */
            get: function () { return this._onErrorEvents; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgZone.prototype, "isStable", {
            /**
             * Whether there are no outstanding microtasks or macrotasks.
             * @return {?}
             */
            get: function () { return this._isStable; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgZone.prototype, "hasPendingMicrotasks", {
            /**
             * @return {?}
             */
            get: function () { return this._hasPendingMicrotasks; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgZone.prototype, "hasPendingMacrotasks", {
            /**
             * @return {?}
             */
            get: function () { return this._hasPendingMacrotasks; },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        NgZone.prototype.checkStable = function () {
            var _this = this;
            if (this._nesting == 0 && !this._hasPendingMicrotasks && !this._isStable) {
                try {
                    this._nesting++;
                    this._onMicrotaskEmpty.emit(null);
                }
                finally {
                    this._nesting--;
                    if (!this._hasPendingMicrotasks) {
                        try {
                            this.runOutsideAngular(function () { return _this._onStable.emit(null); });
                        }
                        finally {
                            this._isStable = true;
                        }
                    }
                }
            }
        };
        /**
         * @return {?}
         */
        NgZone.prototype.forkInnerZoneWithAngularBehavior = function () {
            var _this = this;
            this.inner = this.inner.fork({
                name: 'angular',
                properties: /** @type {?} */ ({ 'isAngularZone': true }),
                onInvokeTask: function (delegate, current, target, task, applyThis, applyArgs) {
                    try {
                        _this.onEnter();
                        return delegate.invokeTask(target, task, applyThis, applyArgs);
                    }
                    finally {
                        _this.onLeave();
                    }
                },
                onInvoke: function (delegate, current, target, callback, applyThis, applyArgs, source) {
                    try {
                        _this.onEnter();
                        return delegate.invoke(target, callback, applyThis, applyArgs, source);
                    }
                    finally {
                        _this.onLeave();
                    }
                },
                onHasTask: function (delegate, current, target, hasTaskState) {
                    delegate.hasTask(target, hasTaskState);
                    if (current === target) {
                        // We are only interested in hasTask events which originate from our zone
                        // (A child hasTask event is not interesting to us)
                        if (hasTaskState.change == 'microTask') {
                            _this.setHasMicrotask(hasTaskState.microTask);
                        }
                        else if (hasTaskState.change == 'macroTask') {
                            _this.setHasMacrotask(hasTaskState.macroTask);
                        }
                    }
                },
                onHandleError: function (delegate, current, target, error) {
                    delegate.handleError(target, error);
                    _this.triggerError(error);
                    return false;
                }
            });
        };
        /**
         * @return {?}
         */
        NgZone.prototype.onEnter = function () {
            this._nesting++;
            if (this._isStable) {
                this._isStable = false;
                this._onUnstable.emit(null);
            }
        };
        /**
         * @return {?}
         */
        NgZone.prototype.onLeave = function () {
            this._nesting--;
            this.checkStable();
        };
        /**
         * @param {?} hasMicrotasks
         * @return {?}
         */
        NgZone.prototype.setHasMicrotask = function (hasMicrotasks) {
            this._hasPendingMicrotasks = hasMicrotasks;
            this.checkStable();
        };
        /**
         * @param {?} hasMacrotasks
         * @return {?}
         */
        NgZone.prototype.setHasMacrotask = function (hasMacrotasks) { this._hasPendingMacrotasks = hasMacrotasks; };
        /**
         * @param {?} error
         * @return {?}
         */
        NgZone.prototype.triggerError = function (error) { this._onErrorEvents.emit(error); };
        return NgZone;
    }());

    var AnimationQueue = (function () {
        /**
         * @param {?} _zone
         */
        function AnimationQueue(_zone) {
            this._zone = _zone;
            this.entries = [];
        }
        /**
         * @param {?} player
         * @return {?}
         */
        AnimationQueue.prototype.enqueue = function (player) { this.entries.push(player); };
        /**
         * @return {?}
         */
        AnimationQueue.prototype.flush = function () {
            var _this = this;
            // given that each animation player may set aside
            // microtasks and rely on DOM-based events, this
            // will cause Angular to run change detection after
            // each request. This sidesteps the issue. If a user
            // hooks into an animation via (@anim.start) or (@anim.done)
            // then those methods will automatically trigger change
            // detection by wrapping themselves inside of a zone
            if (this.entries.length) {
                this._zone.runOutsideAngular(function () {
                    // this code is wrapped into a single promise such that the
                    // onStart and onDone player callbacks are triggered outside
                    // of the digest cycle of animations
                    Promise.resolve(null).then(function () { return _this._triggerAnimations(); });
                });
            }
        };
        /**
         * @return {?}
         */
        AnimationQueue.prototype._triggerAnimations = function () {
            NgZone.assertNotInAngularZone();
            while (this.entries.length) {
                var /** @type {?} */ player = this.entries.shift();
                // in the event that an animation throws an error then we do
                // not want to re-run animations on any previous animations
                // if they have already been kicked off beforehand
                if (!player.hasStarted()) {
                    player.play();
                }
            }
        };
        AnimationQueue.decorators = [
            { type: Injectable },
        ];
        /** @nocollapse */
        AnimationQueue.ctorParameters = function () { return [
            { type: NgZone, },
        ]; };
        return AnimationQueue;
    }());

    var DefaultIterableDifferFactory = (function () {
        function DefaultIterableDifferFactory() {
        }
        /**
         * @param {?} obj
         * @return {?}
         */
        DefaultIterableDifferFactory.prototype.supports = function (obj) { return isListLikeIterable(obj); };
        /**
         * @param {?} cdRef
         * @param {?=} trackByFn
         * @return {?}
         */
        DefaultIterableDifferFactory.prototype.create = function (cdRef, trackByFn) {
            return new DefaultIterableDiffer(trackByFn);
        };
        return DefaultIterableDifferFactory;
    }());
    var /** @type {?} */ trackByIdentity = function (index, item) { return item; };
    /**
     * \@stable
     */
    var DefaultIterableDiffer = (function () {
        /**
         * @param {?=} _trackByFn
         */
        function DefaultIterableDiffer(_trackByFn) {
            this._trackByFn = _trackByFn;
            this._length = null;
            this._collection = null;
            this._linkedRecords = null;
            this._unlinkedRecords = null;
            this._previousItHead = null;
            this._itHead = null;
            this._itTail = null;
            this._additionsHead = null;
            this._additionsTail = null;
            this._movesHead = null;
            this._movesTail = null;
            this._removalsHead = null;
            this._removalsTail = null;
            this._identityChangesHead = null;
            this._identityChangesTail = null;
            this._trackByFn = this._trackByFn || trackByIdentity;
        }
        Object.defineProperty(DefaultIterableDiffer.prototype, "collection", {
            /**
             * @return {?}
             */
            get: function () { return this._collection; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DefaultIterableDiffer.prototype, "length", {
            /**
             * @return {?}
             */
            get: function () { return this._length; },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} fn
         * @return {?}
         */
        DefaultIterableDiffer.prototype.forEachItem = function (fn) {
            var /** @type {?} */ record;
            for (record = this._itHead; record !== null; record = record._next) {
                fn(record);
            }
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        DefaultIterableDiffer.prototype.forEachOperation = function (fn) {
            var /** @type {?} */ nextIt = this._itHead;
            var /** @type {?} */ nextRemove = this._removalsHead;
            var /** @type {?} */ addRemoveOffset = 0;
            var /** @type {?} */ moveOffsets = null;
            while (nextIt || nextRemove) {
                // Figure out which is the next record to process
                // Order: remove, add, move
                var /** @type {?} */ record = !nextRemove ||
                    nextIt &&
                        nextIt.currentIndex < getPreviousIndex(nextRemove, addRemoveOffset, moveOffsets) ?
                    nextIt :
                    nextRemove;
                var /** @type {?} */ adjPreviousIndex = getPreviousIndex(record, addRemoveOffset, moveOffsets);
                var /** @type {?} */ currentIndex = record.currentIndex;
                // consume the item, and adjust the addRemoveOffset and update moveDistance if necessary
                if (record === nextRemove) {
                    addRemoveOffset--;
                    nextRemove = nextRemove._nextRemoved;
                }
                else {
                    nextIt = nextIt._next;
                    if (record.previousIndex == null) {
                        addRemoveOffset++;
                    }
                    else {
                        // INVARIANT:  currentIndex < previousIndex
                        if (!moveOffsets)
                            moveOffsets = [];
                        var /** @type {?} */ localMovePreviousIndex = adjPreviousIndex - addRemoveOffset;
                        var /** @type {?} */ localCurrentIndex = currentIndex - addRemoveOffset;
                        if (localMovePreviousIndex != localCurrentIndex) {
                            for (var /** @type {?} */ i = 0; i < localMovePreviousIndex; i++) {
                                var /** @type {?} */ offset = i < moveOffsets.length ? moveOffsets[i] : (moveOffsets[i] = 0);
                                var /** @type {?} */ index = offset + i;
                                if (localCurrentIndex <= index && index < localMovePreviousIndex) {
                                    moveOffsets[i] = offset + 1;
                                }
                            }
                            var /** @type {?} */ previousIndex = record.previousIndex;
                            moveOffsets[previousIndex] = localCurrentIndex - localMovePreviousIndex;
                        }
                    }
                }
                if (adjPreviousIndex !== currentIndex) {
                    fn(record, adjPreviousIndex, currentIndex);
                }
            }
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        DefaultIterableDiffer.prototype.forEachPreviousItem = function (fn) {
            var /** @type {?} */ record;
            for (record = this._previousItHead; record !== null; record = record._nextPrevious) {
                fn(record);
            }
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        DefaultIterableDiffer.prototype.forEachAddedItem = function (fn) {
            var /** @type {?} */ record;
            for (record = this._additionsHead; record !== null; record = record._nextAdded) {
                fn(record);
            }
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        DefaultIterableDiffer.prototype.forEachMovedItem = function (fn) {
            var /** @type {?} */ record;
            for (record = this._movesHead; record !== null; record = record._nextMoved) {
                fn(record);
            }
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        DefaultIterableDiffer.prototype.forEachRemovedItem = function (fn) {
            var /** @type {?} */ record;
            for (record = this._removalsHead; record !== null; record = record._nextRemoved) {
                fn(record);
            }
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        DefaultIterableDiffer.prototype.forEachIdentityChange = function (fn) {
            var /** @type {?} */ record;
            for (record = this._identityChangesHead; record !== null; record = record._nextIdentityChange) {
                fn(record);
            }
        };
        /**
         * @param {?} collection
         * @return {?}
         */
        DefaultIterableDiffer.prototype.diff = function (collection) {
            if (isBlank(collection))
                collection = [];
            if (!isListLikeIterable(collection)) {
                throw new Error("Error trying to diff '" + collection + "'");
            }
            if (this.check(collection)) {
                return this;
            }
            else {
                return null;
            }
        };
        /**
         * @return {?}
         */
        DefaultIterableDiffer.prototype.onDestroy = function () { };
        /**
         * @param {?} collection
         * @return {?}
         */
        DefaultIterableDiffer.prototype.check = function (collection) {
            var _this = this;
            this._reset();
            var /** @type {?} */ record = this._itHead;
            var /** @type {?} */ mayBeDirty = false;
            var /** @type {?} */ index;
            var /** @type {?} */ item;
            var /** @type {?} */ itemTrackBy;
            if (Array.isArray(collection)) {
                var /** @type {?} */ list = collection;
                this._length = collection.length;
                for (var /** @type {?} */ index_1 = 0; index_1 < this._length; index_1++) {
                    item = list[index_1];
                    itemTrackBy = this._trackByFn(index_1, item);
                    if (record === null || !looseIdentical(record.trackById, itemTrackBy)) {
                        record = this._mismatch(record, item, itemTrackBy, index_1);
                        mayBeDirty = true;
                    }
                    else {
                        if (mayBeDirty) {
                            // TODO(misko): can we limit this to duplicates only?
                            record = this._verifyReinsertion(record, item, itemTrackBy, index_1);
                        }
                        if (!looseIdentical(record.item, item))
                            this._addIdentityChange(record, item);
                    }
                    record = record._next;
                }
            }
            else {
                index = 0;
                iterateListLike(collection, function (item /** TODO #9100 */) {
                    itemTrackBy = _this._trackByFn(index, item);
                    if (record === null || !looseIdentical(record.trackById, itemTrackBy)) {
                        record = _this._mismatch(record, item, itemTrackBy, index);
                        mayBeDirty = true;
                    }
                    else {
                        if (mayBeDirty) {
                            // TODO(misko): can we limit this to duplicates only?
                            record = _this._verifyReinsertion(record, item, itemTrackBy, index);
                        }
                        if (!looseIdentical(record.item, item))
                            _this._addIdentityChange(record, item);
                    }
                    record = record._next;
                    index++;
                });
                this._length = index;
            }
            this._truncate(record);
            this._collection = collection;
            return this.isDirty;
        };
        Object.defineProperty(DefaultIterableDiffer.prototype, "isDirty", {
            /**
             * @return {?}
             */
            get: function () {
                return this._additionsHead !== null || this._movesHead !== null ||
                    this._removalsHead !== null || this._identityChangesHead !== null;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Reset the state of the change objects to show no changes. This means set previousKey to
         * currentKey, and clear all of the queues (additions, moves, removals).
         * Set the previousIndexes of moved and added items to their currentIndexes
         * Reset the list of additions, moves and removals
         *
         * \@internal
         * @return {?}
         */
        DefaultIterableDiffer.prototype._reset = function () {
            if (this.isDirty) {
                var /** @type {?} */ record = void 0;
                var /** @type {?} */ nextRecord = void 0;
                for (record = this._previousItHead = this._itHead; record !== null; record = record._next) {
                    record._nextPrevious = record._next;
                }
                for (record = this._additionsHead; record !== null; record = record._nextAdded) {
                    record.previousIndex = record.currentIndex;
                }
                this._additionsHead = this._additionsTail = null;
                for (record = this._movesHead; record !== null; record = nextRecord) {
                    record.previousIndex = record.currentIndex;
                    nextRecord = record._nextMoved;
                }
                this._movesHead = this._movesTail = null;
                this._removalsHead = this._removalsTail = null;
                this._identityChangesHead = this._identityChangesTail = null;
            }
        };
        /**
         * This is the core function which handles differences between collections.
         *
         * - `record` is the record which we saw at this position last time. If null then it is a new
         *   item.
         * - `item` is the current item in the collection
         * - `index` is the position of the item in the collection
         *
         * \@internal
         * @param {?} record
         * @param {?} item
         * @param {?} itemTrackBy
         * @param {?} index
         * @return {?}
         */
        DefaultIterableDiffer.prototype._mismatch = function (record, item, itemTrackBy, index) {
            // The previous record after which we will append the current one.
            var /** @type {?} */ previousRecord;
            if (record === null) {
                previousRecord = this._itTail;
            }
            else {
                previousRecord = record._prev;
                // Remove the record from the collection since we know it does not match the item.
                this._remove(record);
            }
            // Attempt to see if we have seen the item before.
            record = this._linkedRecords === null ? null : this._linkedRecords.get(itemTrackBy, index);
            if (record !== null) {
                // We have seen this before, we need to move it forward in the collection.
                // But first we need to check if identity changed, so we can update in view if necessary
                if (!looseIdentical(record.item, item))
                    this._addIdentityChange(record, item);
                this._moveAfter(record, previousRecord, index);
            }
            else {
                // Never seen it, check evicted list.
                record = this._unlinkedRecords === null ? null : this._unlinkedRecords.get(itemTrackBy);
                if (record !== null) {
                    // It is an item which we have evicted earlier: reinsert it back into the list.
                    // But first we need to check if identity changed, so we can update in view if necessary
                    if (!looseIdentical(record.item, item))
                        this._addIdentityChange(record, item);
                    this._reinsertAfter(record, previousRecord, index);
                }
                else {
                    // It is a new item: add it.
                    record =
                        this._addAfter(new CollectionChangeRecord(item, itemTrackBy), previousRecord, index);
                }
            }
            return record;
        };
        /**
         * This check is only needed if an array contains duplicates. (Short circuit of nothing dirty)
         *
         * Use case: `[a, a]` => `[b, a, a]`
         *
         * If we did not have this check then the insertion of `b` would:
         *   1) evict first `a`
         *   2) insert `b` at `0` index.
         *   3) leave `a` at index `1` as is. <-- this is wrong!
         *   3) reinsert `a` at index 2. <-- this is wrong!
         *
         * The correct behavior is:
         *   1) evict first `a`
         *   2) insert `b` at `0` index.
         *   3) reinsert `a` at index 1.
         *   3) move `a` at from `1` to `2`.
         *
         *
         * Double check that we have not evicted a duplicate item. We need to check if the item type may
         * have already been removed:
         * The insertion of b will evict the first 'a'. If we don't reinsert it now it will be reinserted
         * at the end. Which will show up as the two 'a's switching position. This is incorrect, since a
         * better way to think of it is as insert of 'b' rather then switch 'a' with 'b' and then add 'a'
         * at the end.
         *
         * \@internal
         * @param {?} record
         * @param {?} item
         * @param {?} itemTrackBy
         * @param {?} index
         * @return {?}
         */
        DefaultIterableDiffer.prototype._verifyReinsertion = function (record, item, itemTrackBy, index) {
            var /** @type {?} */ reinsertRecord = this._unlinkedRecords === null ? null : this._unlinkedRecords.get(itemTrackBy);
            if (reinsertRecord !== null) {
                record = this._reinsertAfter(reinsertRecord, record._prev, index);
            }
            else if (record.currentIndex != index) {
                record.currentIndex = index;
                this._addToMoves(record, index);
            }
            return record;
        };
        /**
         * Get rid of any excess {\@link CollectionChangeRecord}s from the previous collection
         *
         * - `record` The first excess {\@link CollectionChangeRecord}.
         *
         * \@internal
         * @param {?} record
         * @return {?}
         */
        DefaultIterableDiffer.prototype._truncate = function (record) {
            // Anything after that needs to be removed;
            while (record !== null) {
                var /** @type {?} */ nextRecord = record._next;
                this._addToRemovals(this._unlink(record));
                record = nextRecord;
            }
            if (this._unlinkedRecords !== null) {
                this._unlinkedRecords.clear();
            }
            if (this._additionsTail !== null) {
                this._additionsTail._nextAdded = null;
            }
            if (this._movesTail !== null) {
                this._movesTail._nextMoved = null;
            }
            if (this._itTail !== null) {
                this._itTail._next = null;
            }
            if (this._removalsTail !== null) {
                this._removalsTail._nextRemoved = null;
            }
            if (this._identityChangesTail !== null) {
                this._identityChangesTail._nextIdentityChange = null;
            }
        };
        /**
         * \@internal
         * @param {?} record
         * @param {?} prevRecord
         * @param {?} index
         * @return {?}
         */
        DefaultIterableDiffer.prototype._reinsertAfter = function (record, prevRecord, index) {
            if (this._unlinkedRecords !== null) {
                this._unlinkedRecords.remove(record);
            }
            var /** @type {?} */ prev = record._prevRemoved;
            var /** @type {?} */ next = record._nextRemoved;
            if (prev === null) {
                this._removalsHead = next;
            }
            else {
                prev._nextRemoved = next;
            }
            if (next === null) {
                this._removalsTail = prev;
            }
            else {
                next._prevRemoved = prev;
            }
            this._insertAfter(record, prevRecord, index);
            this._addToMoves(record, index);
            return record;
        };
        /**
         * \@internal
         * @param {?} record
         * @param {?} prevRecord
         * @param {?} index
         * @return {?}
         */
        DefaultIterableDiffer.prototype._moveAfter = function (record, prevRecord, index) {
            this._unlink(record);
            this._insertAfter(record, prevRecord, index);
            this._addToMoves(record, index);
            return record;
        };
        /**
         * \@internal
         * @param {?} record
         * @param {?} prevRecord
         * @param {?} index
         * @return {?}
         */
        DefaultIterableDiffer.prototype._addAfter = function (record, prevRecord, index) {
            this._insertAfter(record, prevRecord, index);
            if (this._additionsTail === null) {
                // todo(vicb)
                // assert(this._additionsHead === null);
                this._additionsTail = this._additionsHead = record;
            }
            else {
                // todo(vicb)
                // assert(_additionsTail._nextAdded === null);
                // assert(record._nextAdded === null);
                this._additionsTail = this._additionsTail._nextAdded = record;
            }
            return record;
        };
        /**
         * \@internal
         * @param {?} record
         * @param {?} prevRecord
         * @param {?} index
         * @return {?}
         */
        DefaultIterableDiffer.prototype._insertAfter = function (record, prevRecord, index) {
            // todo(vicb)
            // assert(record != prevRecord);
            // assert(record._next === null);
            // assert(record._prev === null);
            var /** @type {?} */ next = prevRecord === null ? this._itHead : prevRecord._next;
            // todo(vicb)
            // assert(next != record);
            // assert(prevRecord != record);
            record._next = next;
            record._prev = prevRecord;
            if (next === null) {
                this._itTail = record;
            }
            else {
                next._prev = record;
            }
            if (prevRecord === null) {
                this._itHead = record;
            }
            else {
                prevRecord._next = record;
            }
            if (this._linkedRecords === null) {
                this._linkedRecords = new _DuplicateMap();
            }
            this._linkedRecords.put(record);
            record.currentIndex = index;
            return record;
        };
        /**
         * \@internal
         * @param {?} record
         * @return {?}
         */
        DefaultIterableDiffer.prototype._remove = function (record) {
            return this._addToRemovals(this._unlink(record));
        };
        /**
         * \@internal
         * @param {?} record
         * @return {?}
         */
        DefaultIterableDiffer.prototype._unlink = function (record) {
            if (this._linkedRecords !== null) {
                this._linkedRecords.remove(record);
            }
            var /** @type {?} */ prev = record._prev;
            var /** @type {?} */ next = record._next;
            // todo(vicb)
            // assert((record._prev = null) === null);
            // assert((record._next = null) === null);
            if (prev === null) {
                this._itHead = next;
            }
            else {
                prev._next = next;
            }
            if (next === null) {
                this._itTail = prev;
            }
            else {
                next._prev = prev;
            }
            return record;
        };
        /**
         * \@internal
         * @param {?} record
         * @param {?} toIndex
         * @return {?}
         */
        DefaultIterableDiffer.prototype._addToMoves = function (record, toIndex) {
            // todo(vicb)
            // assert(record._nextMoved === null);
            if (record.previousIndex === toIndex) {
                return record;
            }
            if (this._movesTail === null) {
                // todo(vicb)
                // assert(_movesHead === null);
                this._movesTail = this._movesHead = record;
            }
            else {
                // todo(vicb)
                // assert(_movesTail._nextMoved === null);
                this._movesTail = this._movesTail._nextMoved = record;
            }
            return record;
        };
        /**
         * \@internal
         * @param {?} record
         * @return {?}
         */
        DefaultIterableDiffer.prototype._addToRemovals = function (record) {
            if (this._unlinkedRecords === null) {
                this._unlinkedRecords = new _DuplicateMap();
            }
            this._unlinkedRecords.put(record);
            record.currentIndex = null;
            record._nextRemoved = null;
            if (this._removalsTail === null) {
                // todo(vicb)
                // assert(_removalsHead === null);
                this._removalsTail = this._removalsHead = record;
                record._prevRemoved = null;
            }
            else {
                // todo(vicb)
                // assert(_removalsTail._nextRemoved === null);
                // assert(record._nextRemoved === null);
                record._prevRemoved = this._removalsTail;
                this._removalsTail = this._removalsTail._nextRemoved = record;
            }
            return record;
        };
        /**
         * \@internal
         * @param {?} record
         * @param {?} item
         * @return {?}
         */
        DefaultIterableDiffer.prototype._addIdentityChange = function (record, item) {
            record.item = item;
            if (this._identityChangesTail === null) {
                this._identityChangesTail = this._identityChangesHead = record;
            }
            else {
                this._identityChangesTail = this._identityChangesTail._nextIdentityChange = record;
            }
            return record;
        };
        /**
         * @return {?}
         */
        DefaultIterableDiffer.prototype.toString = function () {
            var /** @type {?} */ list = [];
            this.forEachItem(function (record /** TODO #9100 */) { return list.push(record); });
            var /** @type {?} */ previous = [];
            this.forEachPreviousItem(function (record /** TODO #9100 */) { return previous.push(record); });
            var /** @type {?} */ additions = [];
            this.forEachAddedItem(function (record /** TODO #9100 */) { return additions.push(record); });
            var /** @type {?} */ moves = [];
            this.forEachMovedItem(function (record /** TODO #9100 */) { return moves.push(record); });
            var /** @type {?} */ removals = [];
            this.forEachRemovedItem(function (record /** TODO #9100 */) { return removals.push(record); });
            var /** @type {?} */ identityChanges = [];
            this.forEachIdentityChange(function (record /** TODO #9100 */) { return identityChanges.push(record); });
            return 'collection: ' + list.join(', ') + '\n' +
                'previous: ' + previous.join(', ') + '\n' +
                'additions: ' + additions.join(', ') + '\n' +
                'moves: ' + moves.join(', ') + '\n' +
                'removals: ' + removals.join(', ') + '\n' +
                'identityChanges: ' + identityChanges.join(', ') + '\n';
        };
        return DefaultIterableDiffer;
    }());
    /**
     * \@stable
     */
    var CollectionChangeRecord = (function () {
        /**
         * @param {?} item
         * @param {?} trackById
         */
        function CollectionChangeRecord(item, trackById) {
            this.item = item;
            this.trackById = trackById;
            this.currentIndex = null;
            this.previousIndex = null;
            /** @internal */
            this._nextPrevious = null;
            /** @internal */
            this._prev = null;
            /** @internal */
            this._next = null;
            /** @internal */
            this._prevDup = null;
            /** @internal */
            this._nextDup = null;
            /** @internal */
            this._prevRemoved = null;
            /** @internal */
            this._nextRemoved = null;
            /** @internal */
            this._nextAdded = null;
            /** @internal */
            this._nextMoved = null;
            /** @internal */
            this._nextIdentityChange = null;
        }
        /**
         * @return {?}
         */
        CollectionChangeRecord.prototype.toString = function () {
            return this.previousIndex === this.currentIndex ? stringify(this.item) :
                stringify(this.item) + '[' +
                    stringify(this.previousIndex) + '->' + stringify(this.currentIndex) + ']';
        };
        return CollectionChangeRecord;
    }());
    var _DuplicateItemRecordList = (function () {
        function _DuplicateItemRecordList() {
            /** @internal */
            this._head = null;
            /** @internal */
            this._tail = null;
        }
        /**
         * Append the record to the list of duplicates.
         *
         * Note: by design all records in the list of duplicates hold the same value in record.item.
         * @param {?} record
         * @return {?}
         */
        _DuplicateItemRecordList.prototype.add = function (record) {
            if (this._head === null) {
                this._head = this._tail = record;
                record._nextDup = null;
                record._prevDup = null;
            }
            else {
                // todo(vicb)
                // assert(record.item ==  _head.item ||
                //       record.item is num && record.item.isNaN && _head.item is num && _head.item.isNaN);
                this._tail._nextDup = record;
                record._prevDup = this._tail;
                record._nextDup = null;
                this._tail = record;
            }
        };
        /**
         * @param {?} trackById
         * @param {?} afterIndex
         * @return {?}
         */
        _DuplicateItemRecordList.prototype.get = function (trackById, afterIndex) {
            var /** @type {?} */ record;
            for (record = this._head; record !== null; record = record._nextDup) {
                if ((afterIndex === null || afterIndex < record.currentIndex) &&
                    looseIdentical(record.trackById, trackById)) {
                    return record;
                }
            }
            return null;
        };
        /**
         * Remove one {\@link CollectionChangeRecord} from the list of duplicates.
         *
         * Returns whether the list of duplicates is empty.
         * @param {?} record
         * @return {?}
         */
        _DuplicateItemRecordList.prototype.remove = function (record) {
            // todo(vicb)
            // assert(() {
            //  // verify that the record being removed is in the list.
            //  for (CollectionChangeRecord cursor = _head; cursor != null; cursor = cursor._nextDup) {
            //    if (identical(cursor, record)) return true;
            //  }
            //  return false;
            //});
            var /** @type {?} */ prev = record._prevDup;
            var /** @type {?} */ next = record._nextDup;
            if (prev === null) {
                this._head = next;
            }
            else {
                prev._nextDup = next;
            }
            if (next === null) {
                this._tail = prev;
            }
            else {
                next._prevDup = prev;
            }
            return this._head === null;
        };
        return _DuplicateItemRecordList;
    }());
    var _DuplicateMap = (function () {
        function _DuplicateMap() {
            this.map = new Map();
        }
        /**
         * @param {?} record
         * @return {?}
         */
        _DuplicateMap.prototype.put = function (record) {
            var /** @type {?} */ key = record.trackById;
            var /** @type {?} */ duplicates = this.map.get(key);
            if (!duplicates) {
                duplicates = new _DuplicateItemRecordList();
                this.map.set(key, duplicates);
            }
            duplicates.add(record);
        };
        /**
         * Retrieve the `value` using key. Because the CollectionChangeRecord value may be one which we
         * have already iterated over, we use the afterIndex to pretend it is not there.
         *
         * Use case: `[a, b, c, a, a]` if we are at index `3` which is the second `a` then asking if we
         * have any more `a`s needs to return the last `a` not the first or second.
         * @param {?} trackById
         * @param {?=} afterIndex
         * @return {?}
         */
        _DuplicateMap.prototype.get = function (trackById, afterIndex) {
            if (afterIndex === void 0) { afterIndex = null; }
            var /** @type {?} */ key = trackById;
            var /** @type {?} */ recordList = this.map.get(key);
            return recordList ? recordList.get(trackById, afterIndex) : null;
        };
        /**
         * Removes a {\@link CollectionChangeRecord} from the list of duplicates.
         *
         * The list of duplicates also is removed from the map if it gets empty.
         * @param {?} record
         * @return {?}
         */
        _DuplicateMap.prototype.remove = function (record) {
            var /** @type {?} */ key = record.trackById;
            var /** @type {?} */ recordList = this.map.get(key);
            // Remove the list of duplicates when it gets empty
            if (recordList.remove(record)) {
                this.map.delete(key);
            }
            return record;
        };
        Object.defineProperty(_DuplicateMap.prototype, "isEmpty", {
            /**
             * @return {?}
             */
            get: function () { return this.map.size === 0; },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        _DuplicateMap.prototype.clear = function () { this.map.clear(); };
        /**
         * @return {?}
         */
        _DuplicateMap.prototype.toString = function () { return '_DuplicateMap(' + stringify(this.map) + ')'; };
        return _DuplicateMap;
    }());
    /**
     * @param {?} item
     * @param {?} addRemoveOffset
     * @param {?} moveOffsets
     * @return {?}
     */
    function getPreviousIndex(item, addRemoveOffset, moveOffsets) {
        var /** @type {?} */ previousIndex = item.previousIndex;
        if (previousIndex === null)
            return previousIndex;
        var /** @type {?} */ moveOffset = 0;
        if (moveOffsets && previousIndex < moveOffsets.length) {
            moveOffset = moveOffsets[previousIndex];
        }
        return previousIndex + addRemoveOffset + moveOffset;
    }

    var DefaultKeyValueDifferFactory = (function () {
        function DefaultKeyValueDifferFactory() {
        }
        /**
         * @param {?} obj
         * @return {?}
         */
        DefaultKeyValueDifferFactory.prototype.supports = function (obj) { return obj instanceof Map || isJsObject(obj); };
        /**
         * @param {?} cdRef
         * @return {?}
         */
        DefaultKeyValueDifferFactory.prototype.create = function (cdRef) { return new DefaultKeyValueDiffer(); };
        return DefaultKeyValueDifferFactory;
    }());
    var DefaultKeyValueDiffer = (function () {
        function DefaultKeyValueDiffer() {
            this._records = new Map();
            this._mapHead = null;
            this._previousMapHead = null;
            this._changesHead = null;
            this._changesTail = null;
            this._additionsHead = null;
            this._additionsTail = null;
            this._removalsHead = null;
            this._removalsTail = null;
        }
        Object.defineProperty(DefaultKeyValueDiffer.prototype, "isDirty", {
            /**
             * @return {?}
             */
            get: function () {
                return this._additionsHead !== null || this._changesHead !== null ||
                    this._removalsHead !== null;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} fn
         * @return {?}
         */
        DefaultKeyValueDiffer.prototype.forEachItem = function (fn) {
            var /** @type {?} */ record;
            for (record = this._mapHead; record !== null; record = record._next) {
                fn(record);
            }
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        DefaultKeyValueDiffer.prototype.forEachPreviousItem = function (fn) {
            var /** @type {?} */ record;
            for (record = this._previousMapHead; record !== null; record = record._nextPrevious) {
                fn(record);
            }
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        DefaultKeyValueDiffer.prototype.forEachChangedItem = function (fn) {
            var /** @type {?} */ record;
            for (record = this._changesHead; record !== null; record = record._nextChanged) {
                fn(record);
            }
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        DefaultKeyValueDiffer.prototype.forEachAddedItem = function (fn) {
            var /** @type {?} */ record;
            for (record = this._additionsHead; record !== null; record = record._nextAdded) {
                fn(record);
            }
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        DefaultKeyValueDiffer.prototype.forEachRemovedItem = function (fn) {
            var /** @type {?} */ record;
            for (record = this._removalsHead; record !== null; record = record._nextRemoved) {
                fn(record);
            }
        };
        /**
         * @param {?} map
         * @return {?}
         */
        DefaultKeyValueDiffer.prototype.diff = function (map) {
            if (!map) {
                map = new Map();
            }
            else if (!(map instanceof Map || isJsObject(map))) {
                throw new Error("Error trying to diff '" + map + "'");
            }
            return this.check(map) ? this : null;
        };
        /**
         * @return {?}
         */
        DefaultKeyValueDiffer.prototype.onDestroy = function () { };
        /**
         * @param {?} map
         * @return {?}
         */
        DefaultKeyValueDiffer.prototype.check = function (map) {
            var _this = this;
            this._reset();
            var /** @type {?} */ records = this._records;
            var /** @type {?} */ oldSeqRecord = this._mapHead;
            var /** @type {?} */ lastOldSeqRecord = null;
            var /** @type {?} */ lastNewSeqRecord = null;
            var /** @type {?} */ seqChanged = false;
            this._forEach(map, function (value, key) {
                var /** @type {?} */ newSeqRecord;
                if (oldSeqRecord && key === oldSeqRecord.key) {
                    newSeqRecord = oldSeqRecord;
                    _this._maybeAddToChanges(newSeqRecord, value);
                }
                else {
                    seqChanged = true;
                    if (oldSeqRecord !== null) {
                        _this._removeFromSeq(lastOldSeqRecord, oldSeqRecord);
                        _this._addToRemovals(oldSeqRecord);
                    }
                    if (records.has(key)) {
                        newSeqRecord = records.get(key);
                        _this._maybeAddToChanges(newSeqRecord, value);
                    }
                    else {
                        newSeqRecord = new KeyValueChangeRecord(key);
                        records.set(key, newSeqRecord);
                        newSeqRecord.currentValue = value;
                        _this._addToAdditions(newSeqRecord);
                    }
                }
                if (seqChanged) {
                    if (_this._isInRemovals(newSeqRecord)) {
                        _this._removeFromRemovals(newSeqRecord);
                    }
                    if (lastNewSeqRecord == null) {
                        _this._mapHead = newSeqRecord;
                    }
                    else {
                        lastNewSeqRecord._next = newSeqRecord;
                    }
                }
                lastOldSeqRecord = oldSeqRecord;
                lastNewSeqRecord = newSeqRecord;
                oldSeqRecord = oldSeqRecord && oldSeqRecord._next;
            });
            this._truncate(lastOldSeqRecord, oldSeqRecord);
            return this.isDirty;
        };
        /**
         * \@internal
         * @return {?}
         */
        DefaultKeyValueDiffer.prototype._reset = function () {
            if (this.isDirty) {
                var /** @type {?} */ record = void 0;
                // Record the state of the mapping
                for (record = this._previousMapHead = this._mapHead; record !== null; record = record._next) {
                    record._nextPrevious = record._next;
                }
                for (record = this._changesHead; record !== null; record = record._nextChanged) {
                    record.previousValue = record.currentValue;
                }
                for (record = this._additionsHead; record != null; record = record._nextAdded) {
                    record.previousValue = record.currentValue;
                }
                this._changesHead = this._changesTail = null;
                this._additionsHead = this._additionsTail = null;
                this._removalsHead = this._removalsTail = null;
            }
        };
        /**
         * \@internal
         * @param {?} lastRecord
         * @param {?} record
         * @return {?}
         */
        DefaultKeyValueDiffer.prototype._truncate = function (lastRecord, record) {
            while (record !== null) {
                if (lastRecord === null) {
                    this._mapHead = null;
                }
                else {
                    lastRecord._next = null;
                }
                var /** @type {?} */ nextRecord = record._next;
                this._addToRemovals(record);
                lastRecord = record;
                record = nextRecord;
            }
            for (var /** @type {?} */ rec = this._removalsHead; rec !== null; rec = rec._nextRemoved) {
                rec.previousValue = rec.currentValue;
                rec.currentValue = null;
                this._records.delete(rec.key);
            }
        };
        /**
         * @param {?} record
         * @param {?} newValue
         * @return {?}
         */
        DefaultKeyValueDiffer.prototype._maybeAddToChanges = function (record, newValue) {
            if (!looseIdentical(newValue, record.currentValue)) {
                record.previousValue = record.currentValue;
                record.currentValue = newValue;
                this._addToChanges(record);
            }
        };
        /**
         * \@internal
         * @param {?} record
         * @return {?}
         */
        DefaultKeyValueDiffer.prototype._isInRemovals = function (record) {
            return record === this._removalsHead || record._nextRemoved !== null ||
                record._prevRemoved !== null;
        };
        /**
         * \@internal
         * @param {?} record
         * @return {?}
         */
        DefaultKeyValueDiffer.prototype._addToRemovals = function (record) {
            if (this._removalsHead === null) {
                this._removalsHead = this._removalsTail = record;
            }
            else {
                this._removalsTail._nextRemoved = record;
                record._prevRemoved = this._removalsTail;
                this._removalsTail = record;
            }
        };
        /**
         * \@internal
         * @param {?} prev
         * @param {?} record
         * @return {?}
         */
        DefaultKeyValueDiffer.prototype._removeFromSeq = function (prev, record) {
            var /** @type {?} */ next = record._next;
            if (prev === null) {
                this._mapHead = next;
            }
            else {
                prev._next = next;
            }
            record._next = null;
        };
        /**
         * \@internal
         * @param {?} record
         * @return {?}
         */
        DefaultKeyValueDiffer.prototype._removeFromRemovals = function (record) {
            var /** @type {?} */ prev = record._prevRemoved;
            var /** @type {?} */ next = record._nextRemoved;
            if (prev === null) {
                this._removalsHead = next;
            }
            else {
                prev._nextRemoved = next;
            }
            if (next === null) {
                this._removalsTail = prev;
            }
            else {
                next._prevRemoved = prev;
            }
            record._prevRemoved = record._nextRemoved = null;
        };
        /**
         * \@internal
         * @param {?} record
         * @return {?}
         */
        DefaultKeyValueDiffer.prototype._addToAdditions = function (record) {
            if (this._additionsHead === null) {
                this._additionsHead = this._additionsTail = record;
            }
            else {
                this._additionsTail._nextAdded = record;
                this._additionsTail = record;
            }
        };
        /**
         * \@internal
         * @param {?} record
         * @return {?}
         */
        DefaultKeyValueDiffer.prototype._addToChanges = function (record) {
            if (this._changesHead === null) {
                this._changesHead = this._changesTail = record;
            }
            else {
                this._changesTail._nextChanged = record;
                this._changesTail = record;
            }
        };
        /**
         * @return {?}
         */
        DefaultKeyValueDiffer.prototype.toString = function () {
            var /** @type {?} */ items = [];
            var /** @type {?} */ previous = [];
            var /** @type {?} */ changes = [];
            var /** @type {?} */ additions = [];
            var /** @type {?} */ removals = [];
            var /** @type {?} */ record;
            for (record = this._mapHead; record !== null; record = record._next) {
                items.push(stringify(record));
            }
            for (record = this._previousMapHead; record !== null; record = record._nextPrevious) {
                previous.push(stringify(record));
            }
            for (record = this._changesHead; record !== null; record = record._nextChanged) {
                changes.push(stringify(record));
            }
            for (record = this._additionsHead; record !== null; record = record._nextAdded) {
                additions.push(stringify(record));
            }
            for (record = this._removalsHead; record !== null; record = record._nextRemoved) {
                removals.push(stringify(record));
            }
            return 'map: ' + items.join(', ') + '\n' +
                'previous: ' + previous.join(', ') + '\n' +
                'additions: ' + additions.join(', ') + '\n' +
                'changes: ' + changes.join(', ') + '\n' +
                'removals: ' + removals.join(', ') + '\n';
        };
        /**
         * \@internal
         * @param {?} obj
         * @param {?} fn
         * @return {?}
         */
        DefaultKeyValueDiffer.prototype._forEach = function (obj, fn) {
            if (obj instanceof Map) {
                obj.forEach(fn);
            }
            else {
                Object.keys(obj).forEach(function (k) { return fn(obj[k], k); });
            }
        };
        return DefaultKeyValueDiffer;
    }());
    /**
     * \@stable
     */
    var KeyValueChangeRecord = (function () {
        /**
         * @param {?} key
         */
        function KeyValueChangeRecord(key) {
            this.key = key;
            this.previousValue = null;
            this.currentValue = null;
            /** @internal */
            this._nextPrevious = null;
            /** @internal */
            this._next = null;
            /** @internal */
            this._nextAdded = null;
            /** @internal */
            this._nextRemoved = null;
            /** @internal */
            this._prevRemoved = null;
            /** @internal */
            this._nextChanged = null;
        }
        /**
         * @return {?}
         */
        KeyValueChangeRecord.prototype.toString = function () {
            return looseIdentical(this.previousValue, this.currentValue) ?
                stringify(this.key) :
                (stringify(this.key) + '[' + stringify(this.previousValue) + '->' +
                    stringify(this.currentValue) + ']');
        };
        return KeyValueChangeRecord;
    }());

    /**
     * A repository of different iterable diffing strategies used by NgFor, NgClass, and others.
     * \@stable
     */
    var IterableDiffers = (function () {
        /**
         * @param {?} factories
         */
        function IterableDiffers(factories) {
            this.factories = factories;
        }
        /**
         * @param {?} factories
         * @param {?=} parent
         * @return {?}
         */
        IterableDiffers.create = function (factories, parent) {
            if (isPresent(parent)) {
                var /** @type {?} */ copied = parent.factories.slice();
                factories = factories.concat(copied);
                return new IterableDiffers(factories);
            }
            else {
                return new IterableDiffers(factories);
            }
        };
        /**
         * Takes an array of {\@link IterableDifferFactory} and returns a provider used to extend the
         * inherited {\@link IterableDiffers} instance with the provided factories and return a new
         * {\@link IterableDiffers} instance.
         *
         * The following example shows how to extend an existing list of factories,
         * which will only be applied to the injector for this component and its children.
         * This step is all that's required to make a new {\@link IterableDiffer} available.
         *
         * ### Example
         *
         * ```
         * \@Component({
         *   viewProviders: [
         *     IterableDiffers.extend([new ImmutableListDiffer()])
         *   ]
         * })
         * ```
         * @param {?} factories
         * @return {?}
         */
        IterableDiffers.extend = function (factories) {
            return {
                provide: IterableDiffers,
                useFactory: function (parent) {
                    if (!parent) {
                        // Typically would occur when calling IterableDiffers.extend inside of dependencies passed
                        // to
                        // bootstrap(), which would override default pipes instead of extending them.
                        throw new Error('Cannot extend IterableDiffers without a parent injector');
                    }
                    return IterableDiffers.create(factories, parent);
                },
                // Dependency technically isn't optional, but we can provide a better error message this way.
                deps: [[IterableDiffers, new SkipSelf(), new Optional()]]
            };
        };
        /**
         * @param {?} iterable
         * @return {?}
         */
        IterableDiffers.prototype.find = function (iterable) {
            var /** @type {?} */ factory = this.factories.find(function (f) { return f.supports(iterable); });
            if (isPresent(factory)) {
                return factory;
            }
            else {
                throw new Error("Cannot find a differ supporting object '" + iterable + "' of type '" + getTypeNameForDebugging(iterable) + "'");
            }
        };
        return IterableDiffers;
    }());

    /**
     * A repository of different Map diffing strategies used by NgClass, NgStyle, and others.
     * \@stable
     */
    var KeyValueDiffers = (function () {
        /**
         * @param {?} factories
         */
        function KeyValueDiffers(factories) {
            this.factories = factories;
        }
        /**
         * @param {?} factories
         * @param {?=} parent
         * @return {?}
         */
        KeyValueDiffers.create = function (factories, parent) {
            if (isPresent(parent)) {
                var /** @type {?} */ copied = parent.factories.slice();
                factories = factories.concat(copied);
                return new KeyValueDiffers(factories);
            }
            else {
                return new KeyValueDiffers(factories);
            }
        };
        /**
         * Takes an array of {\@link KeyValueDifferFactory} and returns a provider used to extend the
         * inherited {\@link KeyValueDiffers} instance with the provided factories and return a new
         * {\@link KeyValueDiffers} instance.
         *
         * The following example shows how to extend an existing list of factories,
         * which will only be applied to the injector for this component and its children.
         * This step is all that's required to make a new {\@link KeyValueDiffer} available.
         *
         * ### Example
         *
         * ```
         * \@Component({
         *   viewProviders: [
         *     KeyValueDiffers.extend([new ImmutableMapDiffer()])
         *   ]
         * })
         * ```
         * @param {?} factories
         * @return {?}
         */
        KeyValueDiffers.extend = function (factories) {
            return {
                provide: KeyValueDiffers,
                useFactory: function (parent) {
                    if (!parent) {
                        // Typically would occur when calling KeyValueDiffers.extend inside of dependencies passed
                        // to
                        // bootstrap(), which would override default pipes instead of extending them.
                        throw new Error('Cannot extend KeyValueDiffers without a parent injector');
                    }
                    return KeyValueDiffers.create(factories, parent);
                },
                // Dependency technically isn't optional, but we can provide a better error message this way.
                deps: [[KeyValueDiffers, new SkipSelf(), new Optional()]]
            };
        };
        /**
         * @param {?} kv
         * @return {?}
         */
        KeyValueDiffers.prototype.find = function (kv) {
            var /** @type {?} */ factory = this.factories.find(function (f) { return f.supports(kv); });
            if (isPresent(factory)) {
                return factory;
            }
            else {
                throw new Error("Cannot find a differ supporting object '" + kv + "'");
            }
        };
        return KeyValueDiffers;
    }());

    var /** @type {?} */ UNINITIALIZED = {
        toString: function () { return 'CD_INIT_VALUE'; }
    };
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    function devModeEqual(a, b) {
        if (isListLikeIterable(a) && isListLikeIterable(b)) {
            return areIterablesEqual(a, b, devModeEqual);
        }
        else if (!isListLikeIterable(a) && !isPrimitive(a) && !isListLikeIterable(b) && !isPrimitive(b)) {
            return true;
        }
        else {
            return looseIdentical(a, b);
        }
    }
    /**
     * Indicates that the result of a {\@link Pipe} transformation has changed even though the
     * reference
     * has not changed.
     *
     * The wrapped value will be unwrapped by change detection, and the unwrapped value will be stored.
     *
     * Example:
     *
     * ```
     * if (this._latestValue === this._latestReturnedValue) {
     *    return this._latestReturnedValue;
     *  } else {
     *    this._latestReturnedValue = this._latestValue;
     *    return WrappedValue.wrap(this._latestValue); // this will force update
     *  }
     * ```
     * \@stable
     */
    var WrappedValue = (function () {
        /**
         * @param {?} wrapped
         */
        function WrappedValue(wrapped) {
            this.wrapped = wrapped;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        WrappedValue.wrap = function (value) { return new WrappedValue(value); };
        return WrappedValue;
    }());
    /**
     * Helper class for unwrapping WrappedValue s
     */
    var ValueUnwrapper = (function () {
        function ValueUnwrapper() {
            this.hasWrappedValue = false;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        ValueUnwrapper.prototype.unwrap = function (value) {
            if (value instanceof WrappedValue) {
                this.hasWrappedValue = true;
                return value.wrapped;
            }
            return value;
        };
        /**
         * @return {?}
         */
        ValueUnwrapper.prototype.reset = function () { this.hasWrappedValue = false; };
        return ValueUnwrapper;
    }());
    /**
     * Represents a basic change from a previous to a new value.
     * \@stable
     */
    var SimpleChange = (function () {
        /**
         * @param {?} previousValue
         * @param {?} currentValue
         */
        function SimpleChange(previousValue, currentValue) {
            this.previousValue = previousValue;
            this.currentValue = currentValue;
        }
        /**
         * Check whether the new value is the first value assigned.
         * @return {?}
         */
        SimpleChange.prototype.isFirstChange = function () { return this.previousValue === UNINITIALIZED; };
        return SimpleChange;
    }());

    /**
     * \@stable
     * @abstract
     */
    var ChangeDetectorRef = (function () {
        function ChangeDetectorRef() {
        }
        /**
         * Marks all {\@link ChangeDetectionStrategy#OnPush} ancestors as to be checked.
         *
         * <!-- TODO: Add a link to a chapter on OnPush components -->
         *
         * ### Example ([live demo](http://plnkr.co/edit/GC512b?p=preview))
         *
         * ```typescript
         * \@Component({
         *   selector: 'cmp',
         *   changeDetection: ChangeDetectionStrategy.OnPush,
         *   template: `Number of ticks: {{numberOfTicks}}`
         * })
         * class Cmp {
         *   numberOfTicks = 0;
         *
         *   constructor(ref: ChangeDetectorRef) {
         *     setInterval(() => {
         *       this.numberOfTicks ++
         *       // the following is required, otherwise the view will not be updated
         *       this.ref.markForCheck();
         *     }, 1000);
         *   }
         * }
         *
         * \@Component({
         *   selector: 'app',
         *   changeDetection: ChangeDetectionStrategy.OnPush,
         *   template: `
         *     <cmp><cmp>
         *   `,
         * })
         * class App {
         * }
         * ```
         * @abstract
         * @return {?}
         */
        ChangeDetectorRef.prototype.markForCheck = function () { };
        /**
         * Detaches the change detector from the change detector tree.
         *
         * The detached change detector will not be checked until it is reattached.
         *
         * This can also be used in combination with {\@link ChangeDetectorRef#detectChanges} to implement
         * local change
         * detection checks.
         *
         * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
         * <!-- TODO: Add a live demo once ref.detectChanges is merged into master -->
         *
         * ### Example
         *
         * The following example defines a component with a large list of readonly data.
         * Imagine the data changes constantly, many times per second. For performance reasons,
         * we want to check and update the list every five seconds. We can do that by detaching
         * the component's change detector and doing a local check every five seconds.
         *
         * ```typescript
         * class DataProvider {
         *   // in a real application the returned data will be different every time
         *   get data() {
         *     return [1,2,3,4,5];
         *   }
         * }
         *
         * \@Component({
         *   selector: 'giant-list',
         *   template: `
         *     <li *ngFor="let d of dataProvider.data">Data {{d}}</lig>
         *   `,
         * })
         * class GiantList {
         *   constructor(private ref: ChangeDetectorRef, private dataProvider:DataProvider) {
         *     ref.detach();
         *     setInterval(() => {
         *       this.ref.detectChanges();
         *     }, 5000);
         *   }
         * }
         *
         * \@Component({
         *   selector: 'app',
         *   providers: [DataProvider],
         *   template: `
         *     <giant-list><giant-list>
         *   `,
         * })
         * class App {
         * }
         * ```
         * @abstract
         * @return {?}
         */
        ChangeDetectorRef.prototype.detach = function () { };
        /**
         * Checks the change detector and its children.
         *
         * This can also be used in combination with {\@link ChangeDetectorRef#detach} to implement local
         * change detection
         * checks.
         *
         * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
         * <!-- TODO: Add a live demo once ref.detectChanges is merged into master -->
         *
         * ### Example
         *
         * The following example defines a component with a large list of readonly data.
         * Imagine, the data changes constantly, many times per second. For performance reasons,
         * we want to check and update the list every five seconds.
         *
         * We can do that by detaching the component's change detector and doing a local change detection
         * check
         * every five seconds.
         *
         * See {\@link ChangeDetectorRef#detach} for more information.
         * @abstract
         * @return {?}
         */
        ChangeDetectorRef.prototype.detectChanges = function () { };
        /**
         * Checks the change detector and its children, and throws if any changes are detected.
         *
         * This is used in development mode to verify that running change detection doesn't introduce
         * other changes.
         * @abstract
         * @return {?}
         */
        ChangeDetectorRef.prototype.checkNoChanges = function () { };
        /**
         * Reattach the change detector to the change detector tree.
         *
         * This also marks OnPush ancestors as to be checked. This reattached change detector will be
         * checked during the next change detection run.
         *
         * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
         *
         * ### Example ([live demo](http://plnkr.co/edit/aUhZha?p=preview))
         *
         * The following example creates a component displaying `live` data. The component will detach
         * its change detector from the main change detector tree when the component's live property
         * is set to false.
         *
         * ```typescript
         * class DataProvider {
         *   data = 1;
         *
         *   constructor() {
         *     setInterval(() => {
         *       this.data = this.data * 2;
         *     }, 500);
         *   }
         * }
         *
         * \@Component({
         *   selector: 'live-data',
         *   inputs: ['live'],
         *   template: 'Data: {{dataProvider.data}}'
         * })
         * class LiveData {
         *   constructor(private ref: ChangeDetectorRef, private dataProvider:DataProvider) {}
         *
         *   set live(value) {
         *     if (value)
         *       this.ref.reattach();
         *     else
         *       this.ref.detach();
         *   }
         * }
         *
         * \@Component({
         *   selector: 'app',
         *   providers: [DataProvider],
         *   template: `
         *     Live Update: <input type="checkbox" [(ngModel)]="live">
         *     <live-data [live]="live"><live-data>
         *   `,
         * })
         * class App {
         *   live = true;
         * }
         * ```
         * @abstract
         * @return {?}
         */
        ChangeDetectorRef.prototype.reattach = function () { };
        return ChangeDetectorRef;
    }());

    /**
     * Structural diffing for `Object`s and `Map`s.
     */
    var /** @type {?} */ keyValDiff = [new DefaultKeyValueDifferFactory()];
    /**
     * Structural diffing for `Iterable` types such as `Array`s.
     */
    var /** @type {?} */ iterableDiff = [new DefaultIterableDifferFactory()];
    var /** @type {?} */ defaultIterableDiffers = new IterableDiffers(iterableDiff);
    var /** @type {?} */ defaultKeyValueDiffers = new KeyValueDiffers(keyValDiff);

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var RenderComponentType = (function () {
        /**
         * @param {?} id
         * @param {?} templateUrl
         * @param {?} slotCount
         * @param {?} encapsulation
         * @param {?} styles
         * @param {?} animations
         */
        function RenderComponentType(id, templateUrl, slotCount, encapsulation, styles, animations) {
            this.id = id;
            this.templateUrl = templateUrl;
            this.slotCount = slotCount;
            this.encapsulation = encapsulation;
            this.styles = styles;
            this.animations = animations;
        }
        return RenderComponentType;
    }());
    /**
     * @abstract
     */
    var RenderDebugInfo = (function () {
        function RenderDebugInfo() {
        }
        /**
         * @abstract
         * @return {?}
         */
        RenderDebugInfo.prototype.injector = function () { };
        /**
         * @abstract
         * @return {?}
         */
        RenderDebugInfo.prototype.component = function () { };
        /**
         * @abstract
         * @return {?}
         */
        RenderDebugInfo.prototype.providerTokens = function () { };
        /**
         * @abstract
         * @return {?}
         */
        RenderDebugInfo.prototype.references = function () { };
        /**
         * @abstract
         * @return {?}
         */
        RenderDebugInfo.prototype.context = function () { };
        /**
         * @abstract
         * @return {?}
         */
        RenderDebugInfo.prototype.source = function () { };
        return RenderDebugInfo;
    }());
    /**
     * \@experimental
     * @abstract
     */
    var Renderer = (function () {
        function Renderer() {
        }
        /**
         * @abstract
         * @param {?} selectorOrNode
         * @param {?=} debugInfo
         * @return {?}
         */
        Renderer.prototype.selectRootElement = function (selectorOrNode, debugInfo) { };
        /**
         * @abstract
         * @param {?} parentElement
         * @param {?} name
         * @param {?=} debugInfo
         * @return {?}
         */
        Renderer.prototype.createElement = function (parentElement, name, debugInfo) { };
        /**
         * @abstract
         * @param {?} hostElement
         * @return {?}
         */
        Renderer.prototype.createViewRoot = function (hostElement) { };
        /**
         * @abstract
         * @param {?} parentElement
         * @param {?=} debugInfo
         * @return {?}
         */
        Renderer.prototype.createTemplateAnchor = function (parentElement, debugInfo) { };
        /**
         * @abstract
         * @param {?} parentElement
         * @param {?} value
         * @param {?=} debugInfo
         * @return {?}
         */
        Renderer.prototype.createText = function (parentElement, value, debugInfo) { };
        /**
         * @abstract
         * @param {?} parentElement
         * @param {?} nodes
         * @return {?}
         */
        Renderer.prototype.projectNodes = function (parentElement, nodes) { };
        /**
         * @abstract
         * @param {?} node
         * @param {?} viewRootNodes
         * @return {?}
         */
        Renderer.prototype.attachViewAfter = function (node, viewRootNodes) { };
        /**
         * @abstract
         * @param {?} viewRootNodes
         * @return {?}
         */
        Renderer.prototype.detachView = function (viewRootNodes) { };
        /**
         * @abstract
         * @param {?} hostElement
         * @param {?} viewAllNodes
         * @return {?}
         */
        Renderer.prototype.destroyView = function (hostElement, viewAllNodes) { };
        /**
         * @abstract
         * @param {?} renderElement
         * @param {?} name
         * @param {?} callback
         * @return {?}
         */
        Renderer.prototype.listen = function (renderElement, name, callback) { };
        /**
         * @abstract
         * @param {?} target
         * @param {?} name
         * @param {?} callback
         * @return {?}
         */
        Renderer.prototype.listenGlobal = function (target, name, callback) { };
        /**
         * @abstract
         * @param {?} renderElement
         * @param {?} propertyName
         * @param {?} propertyValue
         * @return {?}
         */
        Renderer.prototype.setElementProperty = function (renderElement, propertyName, propertyValue) { };
        /**
         * @abstract
         * @param {?} renderElement
         * @param {?} attributeName
         * @param {?} attributeValue
         * @return {?}
         */
        Renderer.prototype.setElementAttribute = function (renderElement, attributeName, attributeValue) { };
        /**
         * Used only in debug mode to serialize property changes to dom nodes as attributes.
         * @abstract
         * @param {?} renderElement
         * @param {?} propertyName
         * @param {?} propertyValue
         * @return {?}
         */
        Renderer.prototype.setBindingDebugInfo = function (renderElement, propertyName, propertyValue) { };
        /**
         * @abstract
         * @param {?} renderElement
         * @param {?} className
         * @param {?} isAdd
         * @return {?}
         */
        Renderer.prototype.setElementClass = function (renderElement, className, isAdd) { };
        /**
         * @abstract
         * @param {?} renderElement
         * @param {?} styleName
         * @param {?} styleValue
         * @return {?}
         */
        Renderer.prototype.setElementStyle = function (renderElement, styleName, styleValue) { };
        /**
         * @abstract
         * @param {?} renderElement
         * @param {?} methodName
         * @param {?=} args
         * @return {?}
         */
        Renderer.prototype.invokeElementMethod = function (renderElement, methodName, args) { };
        /**
         * @abstract
         * @param {?} renderNode
         * @param {?} text
         * @return {?}
         */
        Renderer.prototype.setText = function (renderNode, text) { };
        /**
         * @abstract
         * @param {?} element
         * @param {?} startingStyles
         * @param {?} keyframes
         * @param {?} duration
         * @param {?} delay
         * @param {?} easing
         * @param {?=} previousPlayers
         * @return {?}
         */
        Renderer.prototype.animate = function (element, startingStyles, keyframes, duration, delay, easing, previousPlayers) { };
        return Renderer;
    }());
    /**
     * Injectable service that provides a low-level interface for modifying the UI.
     *
     * Use this service to bypass Angular's templating and make custom UI changes that can't be
     * expressed declaratively. For example if you need to set a property or an attribute whose name is
     * not statically known, use {\@link #setElementProperty} or {\@link #setElementAttribute}
     * respectively.
     *
     * If you are implementing a custom renderer, you must implement this interface.
     *
     * The default Renderer implementation is `DomRenderer`. Also available is `WebWorkerRenderer`.
     * \@experimental
     * @abstract
     */
    var RootRenderer = (function () {
        function RootRenderer() {
        }
        /**
         * @abstract
         * @param {?} componentType
         * @return {?}
         */
        RootRenderer.prototype.renderComponent = function (componentType) { };
        return RootRenderer;
    }());

    var SecurityContext = {};
    SecurityContext.NONE = 0;
    SecurityContext.HTML = 1;
    SecurityContext.STYLE = 2;
    SecurityContext.SCRIPT = 3;
    SecurityContext.URL = 4;
    SecurityContext.RESOURCE_URL = 5;
    SecurityContext[SecurityContext.NONE] = "NONE";
    SecurityContext[SecurityContext.HTML] = "HTML";
    SecurityContext[SecurityContext.STYLE] = "STYLE";
    SecurityContext[SecurityContext.SCRIPT] = "SCRIPT";
    SecurityContext[SecurityContext.URL] = "URL";
    SecurityContext[SecurityContext.RESOURCE_URL] = "RESOURCE_URL";
    /**
     * Sanitizer is used by the views to sanitize potentially dangerous values.
     *
     * \@stable
     * @abstract
     */
    var Sanitizer = (function () {
        function Sanitizer() {
        }
        /**
         * @abstract
         * @param {?} context
         * @param {?} value
         * @return {?}
         */
        Sanitizer.prototype.sanitize = function (context, value) { };
        return Sanitizer;
    }());

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var __extends$7 = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    /**
     * An error thrown if application changes model breaking the top-down data flow.
     *
     * This exception is only thrown in dev mode.
     *
     * <!-- TODO: Add a link once the dev mode option is configurable -->
     *
     * ### Example
     *
     * ```typescript
     * \@Component({
     *   selector: 'parent',
     *   template: '<child [prop]="parentProp"></child>',
     * })
     * class Parent {
     *   parentProp = 'init';
     * }
     *
     * \@Directive({selector: 'child', inputs: ['prop']})
     * class Child {
     *   constructor(public parent: Parent) {}
     *
     *   set prop(v) {
     *     // this updates the parent property, which is disallowed during change detection
     *     // this will result in ExpressionChangedAfterItHasBeenCheckedError
     *     this.parent.parentProp = 'updated';
     *   }
     * }
     * ```
     * \@stable
     */
    var ExpressionChangedAfterItHasBeenCheckedError = (function (_super) {
        __extends$7(ExpressionChangedAfterItHasBeenCheckedError, _super);
        /**
         * @param {?} oldValue
         * @param {?} currValue
         */
        function ExpressionChangedAfterItHasBeenCheckedError(oldValue, currValue) {
            var msg = "Expression has changed after it was checked. Previous value: '" + oldValue + "'. Current value: '" + currValue + "'.";
            if (oldValue === UNINITIALIZED) {
                msg +=
                    " It seems like the view has been created after its parent and its children have been dirty checked." +
                        " Has it been created in a change detection hook ?";
            }
            _super.call(this, msg);
        }
        return ExpressionChangedAfterItHasBeenCheckedError;
    }(BaseError));
    /**
     * Thrown when an exception was raised during view creation, change detection or destruction.
     *
     * This error wraps the original exception to attach additional contextual information that can
     * be useful for debugging.
     * \@stable
     */
    var ViewWrappedError = (function (_super) {
        __extends$7(ViewWrappedError, _super);
        /**
         * @param {?} originalError
         * @param {?} context
         */
        function ViewWrappedError(originalError, context) {
            _super.call(this, "Error in " + context.source, originalError);
            this.context = context;
        }
        return ViewWrappedError;
    }(WrappedError));
    /**
     * Thrown when a destroyed view is used.
     *
     * This error indicates a bug in the framework.
     *
     * This is an internal Angular error.
     * \@stable
     */
    var ViewDestroyedError = (function (_super) {
        __extends$7(ViewDestroyedError, _super);
        /**
         * @param {?} details
         */
        function ViewDestroyedError(details) {
            _super.call(this, "Attempt to use a destroyed view: " + details);
        }
        return ViewDestroyedError;
    }(BaseError));

    var ViewUtils = (function () {
        /**
         * @param {?} _renderer
         * @param {?} sanitizer
         * @param {?} animationQueue
         */
        function ViewUtils(_renderer, sanitizer, animationQueue) {
            this._renderer = _renderer;
            this.animationQueue = animationQueue;
            this.sanitizer = sanitizer;
        }
        /**
         * \@internal
         * @param {?} renderComponentType
         * @return {?}
         */
        ViewUtils.prototype.renderComponent = function (renderComponentType) {
            return this._renderer.renderComponent(renderComponentType);
        };
        ViewUtils.decorators = [
            { type: Injectable },
        ];
        /** @nocollapse */
        ViewUtils.ctorParameters = function () { return [
            { type: RootRenderer, },
            { type: Sanitizer, },
            { type: AnimationQueue, },
        ]; };
        return ViewUtils;
    }());
    var /** @type {?} */ nextRenderComponentTypeId = 0;
    /**
     * @param {?} templateUrl
     * @param {?} slotCount
     * @param {?} encapsulation
     * @param {?} styles
     * @param {?} animations
     * @return {?}
     */
    function createRenderComponentType(templateUrl, slotCount, encapsulation, styles, animations) {
        return new RenderComponentType("" + nextRenderComponentTypeId++, templateUrl, slotCount, encapsulation, styles, animations);
    }
    /**
     * @param {?} e
     * @param {?} array
     * @return {?}
     */
    function addToArray(e, array) {
        array.push(e);
    }
    /**
     * @param {?} valueCount
     * @param {?} constAndInterp
     * @return {?}
     */
    function interpolate(valueCount, constAndInterp) {
        var /** @type {?} */ result = '';
        for (var /** @type {?} */ i = 0; i < valueCount * 2; i = i + 2) {
            result = result + constAndInterp[i] + _toStringWithNull(constAndInterp[i + 1]);
        }
        return result + constAndInterp[valueCount * 2];
    }
    /**
     * @param {?} valueCount
     * @param {?} c0
     * @param {?} a1
     * @param {?} c1
     * @param {?=} a2
     * @param {?=} c2
     * @param {?=} a3
     * @param {?=} c3
     * @param {?=} a4
     * @param {?=} c4
     * @param {?=} a5
     * @param {?=} c5
     * @param {?=} a6
     * @param {?=} c6
     * @param {?=} a7
     * @param {?=} c7
     * @param {?=} a8
     * @param {?=} c8
     * @param {?=} a9
     * @param {?=} c9
     * @return {?}
     */
    function inlineInterpolate(valueCount, c0, a1, c1, a2, c2, a3, c3, a4, c4, a5, c5, a6, c6, a7, c7, a8, c8, a9, c9) {
        switch (valueCount) {
            case 1:
                return c0 + _toStringWithNull(a1) + c1;
            case 2:
                return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2;
            case 3:
                return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) +
                    c3;
            case 4:
                return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) +
                    c3 + _toStringWithNull(a4) + c4;
            case 5:
                return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) +
                    c3 + _toStringWithNull(a4) + c4 + _toStringWithNull(a5) + c5;
            case 6:
                return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) +
                    c3 + _toStringWithNull(a4) + c4 + _toStringWithNull(a5) + c5 + _toStringWithNull(a6) + c6;
            case 7:
                return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) +
                    c3 + _toStringWithNull(a4) + c4 + _toStringWithNull(a5) + c5 + _toStringWithNull(a6) +
                    c6 + _toStringWithNull(a7) + c7;
            case 8:
                return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) +
                    c3 + _toStringWithNull(a4) + c4 + _toStringWithNull(a5) + c5 + _toStringWithNull(a6) +
                    c6 + _toStringWithNull(a7) + c7 + _toStringWithNull(a8) + c8;
            case 9:
                return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) +
                    c3 + _toStringWithNull(a4) + c4 + _toStringWithNull(a5) + c5 + _toStringWithNull(a6) +
                    c6 + _toStringWithNull(a7) + c7 + _toStringWithNull(a8) + c8 + _toStringWithNull(a9) + c9;
            default:
                throw new Error("Does not support more than 9 expressions");
        }
    }
    /**
     * @param {?} v
     * @return {?}
     */
    function _toStringWithNull(v) {
        return v != null ? v.toString() : '';
    }
    /**
     * @param {?} throwOnChange
     * @param {?} oldValue
     * @param {?} newValue
     * @return {?}
     */
    function checkBinding(throwOnChange, oldValue, newValue) {
        if (throwOnChange) {
            if (!devModeEqual(oldValue, newValue)) {
                throw new ExpressionChangedAfterItHasBeenCheckedError(oldValue, newValue);
            }
            return false;
        }
        else {
            return !looseIdentical(oldValue, newValue);
        }
    }
    /**
     * @param {?} input
     * @param {?} value
     * @return {?}
     */
    function castByValue(input, value) {
        return (input);
    }
    var /** @type {?} */ EMPTY_ARRAY = [];
    var /** @type {?} */ EMPTY_MAP = {};
    /**
     * @param {?} fn
     * @return {?}
     */
    function pureProxy1(fn) {
        var /** @type {?} */ result;
        var /** @type {?} */ v0 = UNINITIALIZED;
        return function (p0) {
            if (!looseIdentical(v0, p0)) {
                v0 = p0;
                result = fn(p0);
            }
            return result;
        };
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    function pureProxy2(fn) {
        var /** @type {?} */ result;
        var /** @type {?} */ v0 = UNINITIALIZED;
        var /** @type {?} */ v1 = UNINITIALIZED;
        return function (p0, p1) {
            if (!looseIdentical(v0, p0) || !looseIdentical(v1, p1)) {
                v0 = p0;
                v1 = p1;
                result = fn(p0, p1);
            }
            return result;
        };
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    function pureProxy3(fn) {
        var /** @type {?} */ result;
        var /** @type {?} */ v0 = UNINITIALIZED;
        var /** @type {?} */ v1 = UNINITIALIZED;
        var /** @type {?} */ v2 = UNINITIALIZED;
        return function (p0, p1, p2) {
            if (!looseIdentical(v0, p0) || !looseIdentical(v1, p1) || !looseIdentical(v2, p2)) {
                v0 = p0;
                v1 = p1;
                v2 = p2;
                result = fn(p0, p1, p2);
            }
            return result;
        };
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    function pureProxy4(fn) {
        var /** @type {?} */ result;
        var /** @type {?} */ v0, /** @type {?} */ v1, /** @type {?} */ v2, /** @type {?} */ v3;
        v0 = v1 = v2 = v3 = UNINITIALIZED;
        return function (p0, p1, p2, p3) {
            if (!looseIdentical(v0, p0) || !looseIdentical(v1, p1) || !looseIdentical(v2, p2) ||
                !looseIdentical(v3, p3)) {
                v0 = p0;
                v1 = p1;
                v2 = p2;
                v3 = p3;
                result = fn(p0, p1, p2, p3);
            }
            return result;
        };
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    function pureProxy5(fn) {
        var /** @type {?} */ result;
        var /** @type {?} */ v0, /** @type {?} */ v1, /** @type {?} */ v2, /** @type {?} */ v3, /** @type {?} */ v4;
        v0 = v1 = v2 = v3 = v4 = UNINITIALIZED;
        return function (p0, p1, p2, p3, p4) {
            if (!looseIdentical(v0, p0) || !looseIdentical(v1, p1) || !looseIdentical(v2, p2) ||
                !looseIdentical(v3, p3) || !looseIdentical(v4, p4)) {
                v0 = p0;
                v1 = p1;
                v2 = p2;
                v3 = p3;
                v4 = p4;
                result = fn(p0, p1, p2, p3, p4);
            }
            return result;
        };
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    function pureProxy6(fn) {
        var /** @type {?} */ result;
        var /** @type {?} */ v0, /** @type {?} */ v1, /** @type {?} */ v2, /** @type {?} */ v3, /** @type {?} */ v4, /** @type {?} */ v5;
        v0 = v1 = v2 = v3 = v4 = v5 = UNINITIALIZED;
        return function (p0, p1, p2, p3, p4, p5) {
            if (!looseIdentical(v0, p0) || !looseIdentical(v1, p1) || !looseIdentical(v2, p2) ||
                !looseIdentical(v3, p3) || !looseIdentical(v4, p4) || !looseIdentical(v5, p5)) {
                v0 = p0;
                v1 = p1;
                v2 = p2;
                v3 = p3;
                v4 = p4;
                v5 = p5;
                result = fn(p0, p1, p2, p3, p4, p5);
            }
            return result;
        };
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    function pureProxy7(fn) {
        var /** @type {?} */ result;
        var /** @type {?} */ v0, /** @type {?} */ v1, /** @type {?} */ v2, /** @type {?} */ v3, /** @type {?} */ v4, /** @type {?} */ v5, /** @type {?} */ v6;
        v0 = v1 = v2 = v3 = v4 = v5 = v6 = UNINITIALIZED;
        return function (p0, p1, p2, p3, p4, p5, p6) {
            if (!looseIdentical(v0, p0) || !looseIdentical(v1, p1) || !looseIdentical(v2, p2) ||
                !looseIdentical(v3, p3) || !looseIdentical(v4, p4) || !looseIdentical(v5, p5) ||
                !looseIdentical(v6, p6)) {
                v0 = p0;
                v1 = p1;
                v2 = p2;
                v3 = p3;
                v4 = p4;
                v5 = p5;
                v6 = p6;
                result = fn(p0, p1, p2, p3, p4, p5, p6);
            }
            return result;
        };
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    function pureProxy8(fn) {
        var /** @type {?} */ result;
        var /** @type {?} */ v0, /** @type {?} */ v1, /** @type {?} */ v2, /** @type {?} */ v3, /** @type {?} */ v4, /** @type {?} */ v5, /** @type {?} */ v6, /** @type {?} */ v7;
        v0 = v1 = v2 = v3 = v4 = v5 = v6 = v7 = UNINITIALIZED;
        return function (p0, p1, p2, p3, p4, p5, p6, p7) {
            if (!looseIdentical(v0, p0) || !looseIdentical(v1, p1) || !looseIdentical(v2, p2) ||
                !looseIdentical(v3, p3) || !looseIdentical(v4, p4) || !looseIdentical(v5, p5) ||
                !looseIdentical(v6, p6) || !looseIdentical(v7, p7)) {
                v0 = p0;
                v1 = p1;
                v2 = p2;
                v3 = p3;
                v4 = p4;
                v5 = p5;
                v6 = p6;
                v7 = p7;
                result = fn(p0, p1, p2, p3, p4, p5, p6, p7);
            }
            return result;
        };
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    function pureProxy9(fn) {
        var /** @type {?} */ result;
        var /** @type {?} */ v0, /** @type {?} */ v1, /** @type {?} */ v2, /** @type {?} */ v3, /** @type {?} */ v4, /** @type {?} */ v5, /** @type {?} */ v6, /** @type {?} */ v7, /** @type {?} */ v8;
        v0 = v1 = v2 = v3 = v4 = v5 = v6 = v7 = v8 = UNINITIALIZED;
        return function (p0, p1, p2, p3, p4, p5, p6, p7, p8) {
            if (!looseIdentical(v0, p0) || !looseIdentical(v1, p1) || !looseIdentical(v2, p2) ||
                !looseIdentical(v3, p3) || !looseIdentical(v4, p4) || !looseIdentical(v5, p5) ||
                !looseIdentical(v6, p6) || !looseIdentical(v7, p7) || !looseIdentical(v8, p8)) {
                v0 = p0;
                v1 = p1;
                v2 = p2;
                v3 = p3;
                v4 = p4;
                v5 = p5;
                v6 = p6;
                v7 = p7;
                v8 = p8;
                result = fn(p0, p1, p2, p3, p4, p5, p6, p7, p8);
            }
            return result;
        };
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    function pureProxy10(fn) {
        var /** @type {?} */ result;
        var /** @type {?} */ v0, /** @type {?} */ v1, /** @type {?} */ v2, /** @type {?} */ v3, /** @type {?} */ v4, /** @type {?} */ v5, /** @type {?} */ v6, /** @type {?} */ v7, /** @type {?} */ v8, /** @type {?} */ v9;
        v0 = v1 = v2 = v3 = v4 = v5 = v6 = v7 = v8 = v9 = UNINITIALIZED;
        return function (p0, p1, p2, p3, p4, p5, p6, p7, p8, p9) {
            if (!looseIdentical(v0, p0) || !looseIdentical(v1, p1) || !looseIdentical(v2, p2) ||
                !looseIdentical(v3, p3) || !looseIdentical(v4, p4) || !looseIdentical(v5, p5) ||
                !looseIdentical(v6, p6) || !looseIdentical(v7, p7) || !looseIdentical(v8, p8) ||
                !looseIdentical(v9, p9)) {
                v0 = p0;
                v1 = p1;
                v2 = p2;
                v3 = p3;
                v4 = p4;
                v5 = p5;
                v6 = p6;
                v7 = p7;
                v8 = p8;
                v9 = p9;
                result = fn(p0, p1, p2, p3, p4, p5, p6, p7, p8, p9);
            }
            return result;
        };
    }
    /**
     * @param {?} renderer
     * @param {?} el
     * @param {?} changes
     * @return {?}
     */
    function setBindingDebugInfoForChanges(renderer, el, changes) {
        Object.keys(changes).forEach(function (propName) {
            setBindingDebugInfo(renderer, el, propName, changes[propName].currentValue);
        });
    }
    /**
     * @param {?} renderer
     * @param {?} el
     * @param {?} propName
     * @param {?} value
     * @return {?}
     */
    function setBindingDebugInfo(renderer, el, propName, value) {
        try {
            renderer.setBindingDebugInfo(el, "ng-reflect-" + camelCaseToDashCase(propName), value ? value.toString() : null);
        }
        catch (e) {
            renderer.setBindingDebugInfo(el, "ng-reflect-" + camelCaseToDashCase(propName), '[ERROR] Exception while trying to serialize the value');
        }
    }
    var /** @type {?} */ CAMEL_CASE_REGEXP = /([A-Z])/g;
    /**
     * @param {?} input
     * @return {?}
     */
    function camelCaseToDashCase(input) {
        return input.replace(CAMEL_CASE_REGEXP, function () {
            var m = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                m[_i - 0] = arguments[_i];
            }
            return '-' + m[1].toLowerCase();
        });
    }
    /**
     * @param {?} renderer
     * @param {?} parentElement
     * @param {?} name
     * @param {?} attrs
     * @param {?=} debugInfo
     * @return {?}
     */
    function createRenderElement(renderer, parentElement, name, attrs, debugInfo) {
        var /** @type {?} */ el = renderer.createElement(parentElement, name, debugInfo);
        for (var /** @type {?} */ i = 0; i < attrs.length; i += 2) {
            renderer.setElementAttribute(el, attrs.get(i), attrs.get(i + 1));
        }
        return el;
    }
    /**
     * @param {?} renderer
     * @param {?} elementName
     * @param {?} attrs
     * @param {?} rootSelectorOrNode
     * @param {?=} debugInfo
     * @return {?}
     */
    function selectOrCreateRenderHostElement(renderer, elementName, attrs, rootSelectorOrNode, debugInfo) {
        var /** @type {?} */ hostElement;
        if (isPresent(rootSelectorOrNode)) {
            hostElement = renderer.selectRootElement(rootSelectorOrNode, debugInfo);
            for (var /** @type {?} */ i = 0; i < attrs.length; i += 2) {
                renderer.setElementAttribute(hostElement, attrs.get(i), attrs.get(i + 1));
            }
            renderer.setElementAttribute(hostElement, 'ng-version', VERSION.full);
        }
        else {
            hostElement = createRenderElement(renderer, null, elementName, attrs, debugInfo);
        }
        return hostElement;
    }
    /**
     * @param {?} view
     * @param {?} element
     * @param {?} eventNamesAndTargets
     * @param {?} listener
     * @return {?}
     */
    function subscribeToRenderElement(view, element, eventNamesAndTargets, listener) {
        var /** @type {?} */ disposables = createEmptyInlineArray(eventNamesAndTargets.length / 2);
        for (var /** @type {?} */ i = 0; i < eventNamesAndTargets.length; i += 2) {
            var /** @type {?} */ eventName = eventNamesAndTargets.get(i);
            var /** @type {?} */ eventTarget = eventNamesAndTargets.get(i + 1);
            var /** @type {?} */ disposable = void 0;
            if (eventTarget) {
                disposable = view.renderer.listenGlobal(eventTarget, eventName, listener.bind(view, eventTarget + ":" + eventName));
            }
            else {
                disposable = view.renderer.listen(element, eventName, listener.bind(view, eventName));
            }
            disposables.set(i / 2, disposable);
        }
        return disposeInlineArray.bind(null, disposables);
    }
    /**
     * @param {?} disposables
     * @return {?}
     */
    function disposeInlineArray(disposables) {
        for (var /** @type {?} */ i = 0; i < disposables.length; i++) {
            disposables.get(i)();
        }
    }
    /**
     * @return {?}
     */
    function noop() { }
    /**
     * @param {?} length
     * @return {?}
     */
    function createEmptyInlineArray(length) {
        var /** @type {?} */ ctor;
        if (length <= 2) {
            ctor = InlineArray2;
        }
        else if (length <= 4) {
            ctor = InlineArray4;
        }
        else if (length <= 8) {
            ctor = InlineArray8;
        }
        else if (length <= 16) {
            ctor = InlineArray16;
        }
        else {
            ctor = InlineArrayDynamic;
        }
        return new ctor(length);
    }
    var InlineArray0 = (function () {
        function InlineArray0() {
            this.length = 0;
        }
        /**
         * @param {?} index
         * @return {?}
         */
        InlineArray0.prototype.get = function (index) { return undefined; };
        /**
         * @param {?} index
         * @param {?} value
         * @return {?}
         */
        InlineArray0.prototype.set = function (index, value) { };
        return InlineArray0;
    }());
    var InlineArray2 = (function () {
        /**
         * @param {?} length
         * @param {?=} _v0
         * @param {?=} _v1
         */
        function InlineArray2(length, _v0, _v1) {
            this.length = length;
            this._v0 = _v0;
            this._v1 = _v1;
        }
        /**
         * @param {?} index
         * @return {?}
         */
        InlineArray2.prototype.get = function (index) {
            switch (index) {
                case 0:
                    return this._v0;
                case 1:
                    return this._v1;
                default:
                    return undefined;
            }
        };
        /**
         * @param {?} index
         * @param {?} value
         * @return {?}
         */
        InlineArray2.prototype.set = function (index, value) {
            switch (index) {
                case 0:
                    this._v0 = value;
                    break;
                case 1:
                    this._v1 = value;
                    break;
            }
        };
        return InlineArray2;
    }());
    var InlineArray4 = (function () {
        /**
         * @param {?} length
         * @param {?=} _v0
         * @param {?=} _v1
         * @param {?=} _v2
         * @param {?=} _v3
         */
        function InlineArray4(length, _v0, _v1, _v2, _v3) {
            this.length = length;
            this._v0 = _v0;
            this._v1 = _v1;
            this._v2 = _v2;
            this._v3 = _v3;
        }
        /**
         * @param {?} index
         * @return {?}
         */
        InlineArray4.prototype.get = function (index) {
            switch (index) {
                case 0:
                    return this._v0;
                case 1:
                    return this._v1;
                case 2:
                    return this._v2;
                case 3:
                    return this._v3;
                default:
                    return undefined;
            }
        };
        /**
         * @param {?} index
         * @param {?} value
         * @return {?}
         */
        InlineArray4.prototype.set = function (index, value) {
            switch (index) {
                case 0:
                    this._v0 = value;
                    break;
                case 1:
                    this._v1 = value;
                    break;
                case 2:
                    this._v2 = value;
                    break;
                case 3:
                    this._v3 = value;
                    break;
            }
        };
        return InlineArray4;
    }());
    var InlineArray8 = (function () {
        /**
         * @param {?} length
         * @param {?=} _v0
         * @param {?=} _v1
         * @param {?=} _v2
         * @param {?=} _v3
         * @param {?=} _v4
         * @param {?=} _v5
         * @param {?=} _v6
         * @param {?=} _v7
         */
        function InlineArray8(length, _v0, _v1, _v2, _v3, _v4, _v5, _v6, _v7) {
            this.length = length;
            this._v0 = _v0;
            this._v1 = _v1;
            this._v2 = _v2;
            this._v3 = _v3;
            this._v4 = _v4;
            this._v5 = _v5;
            this._v6 = _v6;
            this._v7 = _v7;
        }
        /**
         * @param {?} index
         * @return {?}
         */
        InlineArray8.prototype.get = function (index) {
            switch (index) {
                case 0:
                    return this._v0;
                case 1:
                    return this._v1;
                case 2:
                    return this._v2;
                case 3:
                    return this._v3;
                case 4:
                    return this._v4;
                case 5:
                    return this._v5;
                case 6:
                    return this._v6;
                case 7:
                    return this._v7;
                default:
                    return undefined;
            }
        };
        /**
         * @param {?} index
         * @param {?} value
         * @return {?}
         */
        InlineArray8.prototype.set = function (index, value) {
            switch (index) {
                case 0:
                    this._v0 = value;
                    break;
                case 1:
                    this._v1 = value;
                    break;
                case 2:
                    this._v2 = value;
                    break;
                case 3:
                    this._v3 = value;
                    break;
                case 4:
                    this._v4 = value;
                    break;
                case 5:
                    this._v5 = value;
                    break;
                case 6:
                    this._v6 = value;
                    break;
                case 7:
                    this._v7 = value;
                    break;
            }
        };
        return InlineArray8;
    }());
    var InlineArray16 = (function () {
        /**
         * @param {?} length
         * @param {?=} _v0
         * @param {?=} _v1
         * @param {?=} _v2
         * @param {?=} _v3
         * @param {?=} _v4
         * @param {?=} _v5
         * @param {?=} _v6
         * @param {?=} _v7
         * @param {?=} _v8
         * @param {?=} _v9
         * @param {?=} _v10
         * @param {?=} _v11
         * @param {?=} _v12
         * @param {?=} _v13
         * @param {?=} _v14
         * @param {?=} _v15
         */
        function InlineArray16(length, _v0, _v1, _v2, _v3, _v4, _v5, _v6, _v7, _v8, _v9, _v10, _v11, _v12, _v13, _v14, _v15) {
            this.length = length;
            this._v0 = _v0;
            this._v1 = _v1;
            this._v2 = _v2;
            this._v3 = _v3;
            this._v4 = _v4;
            this._v5 = _v5;
            this._v6 = _v6;
            this._v7 = _v7;
            this._v8 = _v8;
            this._v9 = _v9;
            this._v10 = _v10;
            this._v11 = _v11;
            this._v12 = _v12;
            this._v13 = _v13;
            this._v14 = _v14;
            this._v15 = _v15;
        }
        /**
         * @param {?} index
         * @return {?}
         */
        InlineArray16.prototype.get = function (index) {
            switch (index) {
                case 0:
                    return this._v0;
                case 1:
                    return this._v1;
                case 2:
                    return this._v2;
                case 3:
                    return this._v3;
                case 4:
                    return this._v4;
                case 5:
                    return this._v5;
                case 6:
                    return this._v6;
                case 7:
                    return this._v7;
                case 8:
                    return this._v8;
                case 9:
                    return this._v9;
                case 10:
                    return this._v10;
                case 11:
                    return this._v11;
                case 12:
                    return this._v12;
                case 13:
                    return this._v13;
                case 14:
                    return this._v14;
                case 15:
                    return this._v15;
                default:
                    return undefined;
            }
        };
        /**
         * @param {?} index
         * @param {?} value
         * @return {?}
         */
        InlineArray16.prototype.set = function (index, value) {
            switch (index) {
                case 0:
                    this._v0 = value;
                    break;
                case 1:
                    this._v1 = value;
                    break;
                case 2:
                    this._v2 = value;
                    break;
                case 3:
                    this._v3 = value;
                    break;
                case 4:
                    this._v4 = value;
                    break;
                case 5:
                    this._v5 = value;
                    break;
                case 6:
                    this._v6 = value;
                    break;
                case 7:
                    this._v7 = value;
                    break;
                case 8:
                    this._v8 = value;
                    break;
                case 9:
                    this._v9 = value;
                    break;
                case 10:
                    this._v10 = value;
                    break;
                case 11:
                    this._v11 = value;
                    break;
                case 12:
                    this._v12 = value;
                    break;
                case 13:
                    this._v13 = value;
                    break;
                case 14:
                    this._v14 = value;
                    break;
                case 15:
                    this._v15 = value;
                    break;
            }
        };
        return InlineArray16;
    }());
    var InlineArrayDynamic = (function () {
        /**
         * @param {?} length
         * @param {...?} values
         */
        function InlineArrayDynamic(length) {
            var values = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                values[_i - 1] = arguments[_i];
            }
            this.length = length;
            this._values = values;
        }
        /**
         * @param {?} index
         * @return {?}
         */
        InlineArrayDynamic.prototype.get = function (index) { return this._values[index]; };
        /**
         * @param {?} index
         * @param {?} value
         * @return {?}
         */
        InlineArrayDynamic.prototype.set = function (index, value) { this._values[index] = value; };
        return InlineArrayDynamic;
    }());
    var /** @type {?} */ EMPTY_INLINE_ARRAY = new InlineArray0();


    var view_utils = Object.freeze({
        ViewUtils: ViewUtils,
        createRenderComponentType: createRenderComponentType,
        addToArray: addToArray,
        interpolate: interpolate,
        inlineInterpolate: inlineInterpolate,
        checkBinding: checkBinding,
        castByValue: castByValue,
        EMPTY_ARRAY: EMPTY_ARRAY,
        EMPTY_MAP: EMPTY_MAP,
        pureProxy1: pureProxy1,
        pureProxy2: pureProxy2,
        pureProxy3: pureProxy3,
        pureProxy4: pureProxy4,
        pureProxy5: pureProxy5,
        pureProxy6: pureProxy6,
        pureProxy7: pureProxy7,
        pureProxy8: pureProxy8,
        pureProxy9: pureProxy9,
        pureProxy10: pureProxy10,
        setBindingDebugInfoForChanges: setBindingDebugInfoForChanges,
        setBindingDebugInfo: setBindingDebugInfo,
        createRenderElement: createRenderElement,
        selectOrCreateRenderHostElement: selectOrCreateRenderHostElement,
        subscribeToRenderElement: subscribeToRenderElement,
        noop: noop,
        InlineArray2: InlineArray2,
        InlineArray4: InlineArray4,
        InlineArray8: InlineArray8,
        InlineArray16: InlineArray16,
        InlineArrayDynamic: InlineArrayDynamic,
        EMPTY_INLINE_ARRAY: EMPTY_INLINE_ARRAY
    });

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var __extends$5 = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    /**
     * Represents an instance of a Component created via a {\@link ComponentFactory}.
     *
     * `ComponentRef` provides access to the Component Instance as well other objects related to this
     * Component Instance and allows you to destroy the Component Instance via the {\@link #destroy}
     * method.
     * \@stable
     * @abstract
     */
    var ComponentRef = (function () {
        function ComponentRef() {
        }
        /**
         * Location of the Host Element of this Component Instance.
         * @abstract
         * @return {?}
         */
        ComponentRef.prototype.location = function () { };
        /**
         * The injector on which the component instance exists.
         * @abstract
         * @return {?}
         */
        ComponentRef.prototype.injector = function () { };
        /**
         * The instance of the Component.
         * @abstract
         * @return {?}
         */
        ComponentRef.prototype.instance = function () { };
        /**
         * The {\@link ViewRef} of the Host View of this Component instance.
         * @abstract
         * @return {?}
         */
        ComponentRef.prototype.hostView = function () { };
        /**
         * The {\@link ChangeDetectorRef} of the Component instance.
         * @abstract
         * @return {?}
         */
        ComponentRef.prototype.changeDetectorRef = function () { };
        /**
         * The component type.
         * @abstract
         * @return {?}
         */
        ComponentRef.prototype.componentType = function () { };
        /**
         * Destroys the component instance and all of the data structures associated with it.
         * @abstract
         * @return {?}
         */
        ComponentRef.prototype.destroy = function () { };
        /**
         * Allows to register a callback that will be called when the component is destroyed.
         * @abstract
         * @param {?} callback
         * @return {?}
         */
        ComponentRef.prototype.onDestroy = function (callback) { };
        return ComponentRef;
    }());
    var ComponentRef_ = (function (_super) {
        __extends$5(ComponentRef_, _super);
        /**
         * @param {?} _index
         * @param {?} _parentView
         * @param {?} _nativeElement
         * @param {?} _component
         */
        function ComponentRef_(_index, _parentView, _nativeElement, _component) {
            _super.call(this);
            this._index = _index;
            this._parentView = _parentView;
            this._nativeElement = _nativeElement;
            this._component = _component;
        }
        Object.defineProperty(ComponentRef_.prototype, "location", {
            /**
             * @return {?}
             */
            get: function () { return new ElementRef(this._nativeElement); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ComponentRef_.prototype, "injector", {
            /**
             * @return {?}
             */
            get: function () { return this._parentView.injector(this._index); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ComponentRef_.prototype, "instance", {
            /**
             * @return {?}
             */
            get: function () { return this._component; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(ComponentRef_.prototype, "hostView", {
            /**
             * @return {?}
             */
            get: function () { return this._parentView.ref; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(ComponentRef_.prototype, "changeDetectorRef", {
            /**
             * @return {?}
             */
            get: function () { return this._parentView.ref; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(ComponentRef_.prototype, "componentType", {
            /**
             * @return {?}
             */
            get: function () { return (this._component.constructor); },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        ComponentRef_.prototype.destroy = function () { this._parentView.detachAndDestroy(); };
        /**
         * @param {?} callback
         * @return {?}
         */
        ComponentRef_.prototype.onDestroy = function (callback) { this.hostView.onDestroy(callback); };
        return ComponentRef_;
    }(ComponentRef));
    /**
     * \@stable
     */
    var ComponentFactory = (function () {
        /**
         * @param {?} selector
         * @param {?} _viewClass
         * @param {?} _componentType
         */
        function ComponentFactory(selector, _viewClass, _componentType) {
            this.selector = selector;
            this._viewClass = _viewClass;
            this._componentType = _componentType;
        }
        Object.defineProperty(ComponentFactory.prototype, "componentType", {
            /**
             * @return {?}
             */
            get: function () { return this._componentType; },
            enumerable: true,
            configurable: true
        });
        /**
         * Creates a new component.
         * @param {?} injector
         * @param {?=} projectableNodes
         * @param {?=} rootSelectorOrNode
         * @return {?}
         */
        ComponentFactory.prototype.create = function (injector, projectableNodes, rootSelectorOrNode) {
            if (projectableNodes === void 0) { projectableNodes = null; }
            if (rootSelectorOrNode === void 0) { rootSelectorOrNode = null; }
            var /** @type {?} */ vu = injector.get(ViewUtils);
            if (!projectableNodes) {
                projectableNodes = [];
            }
            var /** @type {?} */ hostView = new this._viewClass(vu, null, null, null);
            return hostView.createHostView(rootSelectorOrNode, injector, projectableNodes);
        };
        return ComponentFactory;
    }());

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var __extends$8 = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    /**
     * \@stable
     */
    var NoComponentFactoryError = (function (_super) {
        __extends$8(NoComponentFactoryError, _super);
        /**
         * @param {?} component
         */
        function NoComponentFactoryError(component) {
            _super.call(this, "No component factory found for " + stringify(component) + ". Did you add it to @NgModule.entryComponents?");
            this.component = component;
        }
        return NoComponentFactoryError;
    }(BaseError));
    var _NullComponentFactoryResolver = (function () {
        function _NullComponentFactoryResolver() {
        }
        /**
         * @param {?} component
         * @return {?}
         */
        _NullComponentFactoryResolver.prototype.resolveComponentFactory = function (component) {
            throw new NoComponentFactoryError(component);
        };
        return _NullComponentFactoryResolver;
    }());
    /**
     * \@stable
     * @abstract
     */
    var ComponentFactoryResolver = (function () {
        function ComponentFactoryResolver() {
        }
        /**
         * @abstract
         * @param {?} component
         * @return {?}
         */
        ComponentFactoryResolver.prototype.resolveComponentFactory = function (component) { };
        ComponentFactoryResolver.NULL = new _NullComponentFactoryResolver();
        return ComponentFactoryResolver;
    }());
    var CodegenComponentFactoryResolver = (function () {
        /**
         * @param {?} factories
         * @param {?} _parent
         */
        function CodegenComponentFactoryResolver(factories, _parent) {
            this._parent = _parent;
            this._factories = new Map();
            for (var i = 0; i < factories.length; i++) {
                var factory = factories[i];
                this._factories.set(factory.componentType, factory);
            }
        }
        /**
         * @param {?} component
         * @return {?}
         */
        CodegenComponentFactoryResolver.prototype.resolveComponentFactory = function (component) {
            var /** @type {?} */ result = this._factories.get(component);
            if (!result) {
                result = this._parent.resolveComponentFactory(component);
            }
            return result;
        };
        return CodegenComponentFactoryResolver;
    }());

    var /** @type {?} */ trace;
    var /** @type {?} */ events;
    /**
     * @return {?}
     */
    function detectWTF() {
        var /** @type {?} */ wtf = ((global$1) /** TODO #9100 */)['wtf'];
        if (wtf) {
            trace = wtf['trace'];
            if (trace) {
                events = trace['events'];
                return true;
            }
        }
        return false;
    }
    /**
     * @param {?} signature
     * @param {?=} flags
     * @return {?}
     */
    function createScope(signature, flags) {
        if (flags === void 0) { flags = null; }
        return events.createScope(signature, flags);
    }
    /**
     * @param {?} scope
     * @param {?=} returnValue
     * @return {?}
     */
    function leave(scope, returnValue) {
        trace.leaveScope(scope, returnValue);
        return returnValue;
    }
    /**
     * @param {?} rangeType
     * @param {?} action
     * @return {?}
     */
    function startTimeRange(rangeType, action) {
        return trace.beginTimeRange(rangeType, action);
    }
    /**
     * @param {?} range
     * @return {?}
     */
    function endTimeRange(range) {
        trace.endTimeRange(range);
    }

    /**
     * True if WTF is enabled.
     */
    var /** @type {?} */ wtfEnabled = detectWTF();
    /**
     * @param {?=} arg0
     * @param {?=} arg1
     * @return {?}
     */
    function noopScope(arg0, arg1) {
        return null;
    }
    /**
     * Create trace scope.
     *
     * Scopes must be strictly nested and are analogous to stack frames, but
     * do not have to follow the stack frames. Instead it is recommended that they follow logical
     * nesting. You may want to use
     * [Event
     * Signatures](http://google.github.io/tracing-framework/instrumenting-code.html#custom-events)
     * as they are defined in WTF.
     *
     * Used to mark scope entry. The return value is used to leave the scope.
     *
     *     var myScope = wtfCreateScope('MyClass#myMethod(ascii someVal)');
     *
     *     someMethod() {
     *        var s = myScope('Foo'); // 'Foo' gets stored in tracing UI
     *        // DO SOME WORK HERE
     *        return wtfLeave(s, 123); // Return value 123
     *     }
     *
     * Note, adding try-finally block around the work to ensure that `wtfLeave` gets called can
     * negatively impact the performance of your application. For this reason we recommend that
     * you don't add them to ensure that `wtfLeave` gets called. In production `wtfLeave` is a noop and
     * so try-finally block has no value. When debugging perf issues, skipping `wtfLeave`, do to
     * exception, will produce incorrect trace, but presence of exception signifies logic error which
     * needs to be fixed before the app should be profiled. Add try-finally only when you expect that
     * an exception is expected during normal execution while profiling.
     *
     * @experimental
     */
    var /** @type {?} */ wtfCreateScope = wtfEnabled ? createScope : function (signature, flags) { return noopScope; };
    /**
     * Used to mark end of Scope.
     *
     * - `scope` to end.
     * - `returnValue` (optional) to be passed to the WTF.
     *
     * Returns the `returnValue for easy chaining.
     * @experimental
     */
    var /** @type {?} */ wtfLeave = wtfEnabled ? leave : function (s, r) { return r; };
    /**
     * Used to mark Async start. Async are similar to scope but they don't have to be strictly nested.
     * The return value is used in the call to [endAsync]. Async ranges only work if WTF has been
     * enabled.
     *
     *     someMethod() {
     *        var s = wtfStartTimeRange('HTTP:GET', 'some.url');
     *        var future = new Future.delay(5).then((_) {
     *          wtfEndTimeRange(s);
     *        });
     *     }
     * @experimental
     */
    var /** @type {?} */ wtfStartTimeRange = wtfEnabled ? startTimeRange : function (rangeType, action) { return null; };
    /**
     * Ends a async time range operation.
     * [range] is the return value from [wtfStartTimeRange] Async ranges only work if WTF has been
     * enabled.
     * @experimental
     */
    var /** @type {?} */ wtfEndTimeRange = wtfEnabled ? endTimeRange : function (r) { return null; };

    /**
     * The Testability service provides testing hooks that can be accessed from
     * the browser and by services such as Protractor. Each bootstrapped Angular
     * application on the page will have an instance of Testability.
     * \@experimental
     */
    var Testability = (function () {
        /**
         * @param {?} _ngZone
         */
        function Testability(_ngZone) {
            this._ngZone = _ngZone;
            /** @internal */
            this._pendingCount = 0;
            /** @internal */
            this._isZoneStable = true;
            /**
             * Whether any work was done since the last 'whenStable' callback. This is
             * useful to detect if this could have potentially destabilized another
             * component while it is stabilizing.
             * @internal
             */
            this._didWork = false;
            /** @internal */
            this._callbacks = [];
            this._watchAngularEvents();
        }
        /**
         * \@internal
         * @return {?}
         */
        Testability.prototype._watchAngularEvents = function () {
            var _this = this;
            this._ngZone.onUnstable.subscribe({
                next: function () {
                    _this._didWork = true;
                    _this._isZoneStable = false;
                }
            });
            this._ngZone.runOutsideAngular(function () {
                _this._ngZone.onStable.subscribe({
                    next: function () {
                        NgZone.assertNotInAngularZone();
                        scheduleMicroTask(function () {
                            _this._isZoneStable = true;
                            _this._runCallbacksIfReady();
                        });
                    }
                });
            });
        };
        /**
         * @return {?}
         */
        Testability.prototype.increasePendingRequestCount = function () {
            this._pendingCount += 1;
            this._didWork = true;
            return this._pendingCount;
        };
        /**
         * @return {?}
         */
        Testability.prototype.decreasePendingRequestCount = function () {
            this._pendingCount -= 1;
            if (this._pendingCount < 0) {
                throw new Error('pending async requests below zero');
            }
            this._runCallbacksIfReady();
            return this._pendingCount;
        };
        /**
         * @return {?}
         */
        Testability.prototype.isStable = function () {
            return this._isZoneStable && this._pendingCount == 0 && !this._ngZone.hasPendingMacrotasks;
        };
        /**
         * \@internal
         * @return {?}
         */
        Testability.prototype._runCallbacksIfReady = function () {
            var _this = this;
            if (this.isStable()) {
                // Schedules the call backs in a new frame so that it is always async.
                scheduleMicroTask(function () {
                    while (_this._callbacks.length !== 0) {
                        (_this._callbacks.pop())(_this._didWork);
                    }
                    _this._didWork = false;
                });
            }
            else {
                // Not Ready
                this._didWork = true;
            }
        };
        /**
         * @param {?} callback
         * @return {?}
         */
        Testability.prototype.whenStable = function (callback) {
            this._callbacks.push(callback);
            this._runCallbacksIfReady();
        };
        /**
         * @return {?}
         */
        Testability.prototype.getPendingRequestCount = function () { return this._pendingCount; };
        /**
         * @deprecated use findProviders
         * @param {?} using
         * @param {?} provider
         * @param {?} exactMatch
         * @return {?}
         */
        Testability.prototype.findBindings = function (using, provider, exactMatch) {
            // TODO(juliemr): implement.
            return [];
        };
        /**
         * @param {?} using
         * @param {?} provider
         * @param {?} exactMatch
         * @return {?}
         */
        Testability.prototype.findProviders = function (using, provider, exactMatch) {
            // TODO(juliemr): implement.
            return [];
        };
        Testability.decorators = [
            { type: Injectable },
        ];
        /** @nocollapse */
        Testability.ctorParameters = function () { return [
            { type: NgZone, },
        ]; };
        return Testability;
    }());
    /**
     * A global registry of {\@link Testability} instances for specific elements.
     * \@experimental
     */
    var TestabilityRegistry = (function () {
        function TestabilityRegistry() {
            /** @internal */
            this._applications = new Map();
            _testabilityGetter.addToWindow(this);
        }
        /**
         * @param {?} token
         * @param {?} testability
         * @return {?}
         */
        TestabilityRegistry.prototype.registerApplication = function (token, testability) {
            this._applications.set(token, testability);
        };
        /**
         * @param {?} elem
         * @return {?}
         */
        TestabilityRegistry.prototype.getTestability = function (elem) { return this._applications.get(elem); };
        /**
         * @return {?}
         */
        TestabilityRegistry.prototype.getAllTestabilities = function () { return Array.from(this._applications.values()); };
        /**
         * @return {?}
         */
        TestabilityRegistry.prototype.getAllRootElements = function () { return Array.from(this._applications.keys()); };
        /**
         * @param {?} elem
         * @param {?=} findInAncestors
         * @return {?}
         */
        TestabilityRegistry.prototype.findTestabilityInTree = function (elem, findInAncestors) {
            if (findInAncestors === void 0) { findInAncestors = true; }
            return _testabilityGetter.findTestabilityInTree(this, elem, findInAncestors);
        };
        TestabilityRegistry.decorators = [
            { type: Injectable },
        ];
        /** @nocollapse */
        TestabilityRegistry.ctorParameters = function () { return []; };
        return TestabilityRegistry;
    }());
    var _NoopGetTestability = (function () {
        function _NoopGetTestability() {
        }
        /**
         * @param {?} registry
         * @return {?}
         */
        _NoopGetTestability.prototype.addToWindow = function (registry) { };
        /**
         * @param {?} registry
         * @param {?} elem
         * @param {?} findInAncestors
         * @return {?}
         */
        _NoopGetTestability.prototype.findTestabilityInTree = function (registry, elem, findInAncestors) {
            return null;
        };
        return _NoopGetTestability;
    }());
    /**
     * Set the {\@link GetTestability} implementation used by the Angular testing framework.
     * \@experimental
     * @param {?} getter
     * @return {?}
     */
    function setTestabilityGetter(getter) {
        _testabilityGetter = getter;
    }
    var /** @type {?} */ _testabilityGetter = new _NoopGetTestability();

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var __extends$3 = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var /** @type {?} */ _devMode = true;
    var /** @type {?} */ _runModeLocked = false;
    var /** @type {?} */ _platform;
    /**
     * Disable Angular's development mode, which turns off assertions and other
     * checks within the framework.
     *
     * One important assertion this disables verifies that a change detection pass
     * does not result in additional changes to any bindings (also known as
     * unidirectional data flow).
     *
     * \@stable
     * @return {?}
     */
    function enableProdMode() {
        if (_runModeLocked) {
            throw new Error('Cannot enable prod mode after platform setup.');
        }
        _devMode = false;
    }
    /**
     * Returns whether Angular is in development mode. After called once,
     * the value is locked and won't change any more.
     *
     * By default, this is true, unless a user calls `enableProdMode` before calling this.
     *
     * \@experimental APIs related to application bootstrap are currently under review.
     * @return {?}
     */
    function isDevMode() {
        _runModeLocked = true;
        return _devMode;
    }
    /**
     * A token for third-party components that can register themselves with NgProbe.
     *
     * \@experimental
     */
    var NgProbeToken = (function () {
        /**
         * @param {?} name
         * @param {?} token
         */
        function NgProbeToken(name, token) {
            this.name = name;
            this.token = token;
        }
        return NgProbeToken;
    }());
    /**
     * Creates a platform.
     * Platforms have to be eagerly created via this function.
     *
     * \@experimental APIs related to application bootstrap are currently under review.
     * @param {?} injector
     * @return {?}
     */
    function createPlatform(injector) {
        if (_platform && !_platform.destroyed) {
            throw new Error('There can be only one platform. Destroy the previous one to create a new one.');
        }
        _platform = injector.get(PlatformRef);
        var /** @type {?} */ inits = (injector.get(PLATFORM_INITIALIZER, null));
        if (inits)
            inits.forEach(function (init) { return init(); });
        return _platform;
    }
    /**
     * Creates a factory for a platform
     *
     * \@experimental APIs related to application bootstrap are currently under review.
     * @param {?} parentPlatformFactory
     * @param {?} name
     * @param {?=} providers
     * @return {?}
     */
    function createPlatformFactory(parentPlatformFactory, name, providers) {
        if (providers === void 0) { providers = []; }
        var /** @type {?} */ marker = new OpaqueToken("Platform: " + name);
        return function (extraProviders) {
            if (extraProviders === void 0) { extraProviders = []; }
            if (!getPlatform()) {
                if (parentPlatformFactory) {
                    parentPlatformFactory(providers.concat(extraProviders).concat({ provide: marker, useValue: true }));
                }
                else {
                    createPlatform(ReflectiveInjector.resolveAndCreate(providers.concat(extraProviders).concat({ provide: marker, useValue: true })));
                }
            }
            return assertPlatform(marker);
        };
    }
    /**
     * Checks that there currently is a platform
     * which contains the given token as a provider.
     *
     * \@experimental APIs related to application bootstrap are currently under review.
     * @param {?} requiredToken
     * @return {?}
     */
    function assertPlatform(requiredToken) {
        var /** @type {?} */ platform = getPlatform();
        if (!platform) {
            throw new Error('No platform exists!');
        }
        if (!platform.injector.get(requiredToken, null)) {
            throw new Error('A platform with a different configuration has been created. Please destroy it first.');
        }
        return platform;
    }
    /**
     * Destroy the existing platform.
     *
     * \@experimental APIs related to application bootstrap are currently under review.
     * @return {?}
     */
    function destroyPlatform() {
        if (_platform && !_platform.destroyed) {
            _platform.destroy();
        }
    }
    /**
     * Returns the current platform.
     *
     * \@experimental APIs related to application bootstrap are currently under review.
     * @return {?}
     */
    function getPlatform() {
        return _platform && !_platform.destroyed ? _platform : null;
    }
    /**
     * The Angular platform is the entry point for Angular on a web page. Each page
     * has exactly one platform, and services (such as reflection) which are common
     * to every Angular application running on the page are bound in its scope.
     *
     * A page's platform is initialized implicitly when {\@link bootstrap}() is called, or
     * explicitly by calling {\@link createPlatform}().
     *
     * \@stable
     * @abstract
     */
    var PlatformRef = (function () {
        function PlatformRef() {
        }
        /**
         * Creates an instance of an `\@NgModule` for the given platform
         * for offline compilation.
         *
         * ## Simple Example
         *
         * ```typescript
         * my_module.ts:
         *
         * \@NgModule({
         *   imports: [BrowserModule]
         * })
         * class MyModule {}
         *
         * main.ts:
         * import {MyModuleNgFactory} from './my_module.ngfactory';
         * import {platformBrowser} from '\@angular/platform-browser';
         *
         * let moduleRef = platformBrowser().bootstrapModuleFactory(MyModuleNgFactory);
         * ```
         *
         * \@experimental APIs related to application bootstrap are currently under review.
         * @abstract
         * @param {?} moduleFactory
         * @return {?}
         */
        PlatformRef.prototype.bootstrapModuleFactory = function (moduleFactory) { };
        /**
         * Creates an instance of an `\@NgModule` for a given platform using the given runtime compiler.
         *
         * ## Simple Example
         *
         * ```typescript
         * \@NgModule({
         *   imports: [BrowserModule]
         * })
         * class MyModule {}
         *
         * let moduleRef = platformBrowser().bootstrapModule(MyModule);
         * ```
         * \@stable
         * @abstract
         * @param {?} moduleType
         * @param {?=} compilerOptions
         * @return {?}
         */
        PlatformRef.prototype.bootstrapModule = function (moduleType, compilerOptions) { };
        /**
         * Register a listener to be called when the platform is disposed.
         * @abstract
         * @param {?} callback
         * @return {?}
         */
        PlatformRef.prototype.onDestroy = function (callback) { };
        /**
         * Retrieve the platform {\@link Injector}, which is the parent injector for
         * every Angular application on the page and provides singleton providers.
         * @abstract
         * @return {?}
         */
        PlatformRef.prototype.injector = function () { };
        /**
         * Destroy the Angular platform and all Angular applications on the page.
         * @abstract
         * @return {?}
         */
        PlatformRef.prototype.destroy = function () { };
        /**
         * @abstract
         * @return {?}
         */
        PlatformRef.prototype.destroyed = function () { };
        return PlatformRef;
    }());
    /**
     * @param {?} errorHandler
     * @param {?} callback
     * @return {?}
     */
    function _callAndReportToErrorHandler(errorHandler, callback) {
        try {
            var /** @type {?} */ result = callback();
            if (isPromise(result)) {
                return result.catch(function (e) {
                    errorHandler.handleError(e);
                    // rethrow as the exception handler might not do it
                    throw e;
                });
            }
            return result;
        }
        catch (e) {
            errorHandler.handleError(e);
            // rethrow as the exception handler might not do it
            throw e;
        }
    }
    var PlatformRef_ = (function (_super) {
        __extends$3(PlatformRef_, _super);
        /**
         * @param {?} _injector
         */
        function PlatformRef_(_injector) {
            _super.call(this);
            this._injector = _injector;
            this._modules = [];
            this._destroyListeners = [];
            this._destroyed = false;
        }
        /**
         * @param {?} callback
         * @return {?}
         */
        PlatformRef_.prototype.onDestroy = function (callback) { this._destroyListeners.push(callback); };
        Object.defineProperty(PlatformRef_.prototype, "injector", {
            /**
             * @return {?}
             */
            get: function () { return this._injector; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlatformRef_.prototype, "destroyed", {
            /**
             * @return {?}
             */
            get: function () { return this._destroyed; },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        PlatformRef_.prototype.destroy = function () {
            if (this._destroyed) {
                throw new Error('The platform has already been destroyed!');
            }
            this._modules.slice().forEach(function (module) { return module.destroy(); });
            this._destroyListeners.forEach(function (listener) { return listener(); });
            this._destroyed = true;
        };
        /**
         * @param {?} moduleFactory
         * @return {?}
         */
        PlatformRef_.prototype.bootstrapModuleFactory = function (moduleFactory) {
            return this._bootstrapModuleFactoryWithZone(moduleFactory, null);
        };
        /**
         * @param {?} moduleFactory
         * @param {?} ngZone
         * @return {?}
         */
        PlatformRef_.prototype._bootstrapModuleFactoryWithZone = function (moduleFactory, ngZone) {
            var _this = this;
            // Note: We need to create the NgZone _before_ we instantiate the module,
            // as instantiating the module creates some providers eagerly.
            // So we create a mini parent injector that just contains the new NgZone and
            // pass that as parent to the NgModuleFactory.
            if (!ngZone)
                ngZone = new NgZone({ enableLongStackTrace: isDevMode() });
            // Attention: Don't use ApplicationRef.run here,
            // as we want to be sure that all possible constructor calls are inside `ngZone.run`!
            return ngZone.run(function () {
                var /** @type {?} */ ngZoneInjector = ReflectiveInjector.resolveAndCreate([{ provide: NgZone, useValue: ngZone }], _this.injector);
                var /** @type {?} */ moduleRef = (moduleFactory.create(ngZoneInjector));
                var /** @type {?} */ exceptionHandler = moduleRef.injector.get(ErrorHandler, null);
                if (!exceptionHandler) {
                    throw new Error('No ErrorHandler. Is platform module (BrowserModule) included?');
                }
                moduleRef.onDestroy(function () { return ListWrapper.remove(_this._modules, moduleRef); });
                ngZone.onError.subscribe({ next: function (error) { exceptionHandler.handleError(error); } });
                return _callAndReportToErrorHandler(exceptionHandler, function () {
                    var /** @type {?} */ initStatus = moduleRef.injector.get(ApplicationInitStatus);
                    return initStatus.donePromise.then(function () {
                        _this._moduleDoBootstrap(moduleRef);
                        return moduleRef;
                    });
                });
            });
        };
        /**
         * @param {?} moduleType
         * @param {?=} compilerOptions
         * @return {?}
         */
        PlatformRef_.prototype.bootstrapModule = function (moduleType, compilerOptions) {
            if (compilerOptions === void 0) { compilerOptions = []; }
            return this._bootstrapModuleWithZone(moduleType, compilerOptions, null);
        };
        /**
         * @param {?} moduleType
         * @param {?=} compilerOptions
         * @param {?} ngZone
         * @param {?=} componentFactoryCallback
         * @return {?}
         */
        PlatformRef_.prototype._bootstrapModuleWithZone = function (moduleType, compilerOptions, ngZone, componentFactoryCallback) {
            var _this = this;
            if (compilerOptions === void 0) { compilerOptions = []; }
            var /** @type {?} */ compilerFactory = this.injector.get(CompilerFactory);
            var /** @type {?} */ compiler = compilerFactory.createCompiler(Array.isArray(compilerOptions) ? compilerOptions : [compilerOptions]);
            // ugly internal api hack: generate host component factories for all declared components and
            // pass the factories into the callback - this is used by UpdateAdapter to get hold of all
            // factories.
            if (componentFactoryCallback) {
                return compiler.compileModuleAndAllComponentsAsync(moduleType)
                    .then(function (_a) {
                    var ngModuleFactory = _a.ngModuleFactory, componentFactories = _a.componentFactories;
                    componentFactoryCallback(componentFactories);
                    return _this._bootstrapModuleFactoryWithZone(ngModuleFactory, ngZone);
                });
            }
            return compiler.compileModuleAsync(moduleType)
                .then(function (moduleFactory) { return _this._bootstrapModuleFactoryWithZone(moduleFactory, ngZone); });
        };
        /**
         * @param {?} moduleRef
         * @return {?}
         */
        PlatformRef_.prototype._moduleDoBootstrap = function (moduleRef) {
            var /** @type {?} */ appRef = moduleRef.injector.get(ApplicationRef);
            if (moduleRef.bootstrapFactories.length > 0) {
                moduleRef.bootstrapFactories.forEach(function (compFactory) { return appRef.bootstrap(compFactory); });
            }
            else if (moduleRef.instance.ngDoBootstrap) {
                moduleRef.instance.ngDoBootstrap(appRef);
            }
            else {
                throw new Error(("The module " + stringify(moduleRef.instance.constructor) + " was bootstrapped, but it does not declare \"@NgModule.bootstrap\" components nor a \"ngDoBootstrap\" method. ") +
                    "Please define one of these.");
            }
            this._modules.push(moduleRef);
        };
        PlatformRef_.decorators = [
            { type: Injectable },
        ];
        /** @nocollapse */
        PlatformRef_.ctorParameters = function () { return [
            { type: Injector, },
        ]; };
        return PlatformRef_;
    }(PlatformRef));
    /**
     * A reference to an Angular application running on a page.
     *
     * For more about Angular applications, see the documentation for {\@link bootstrap}.
     *
     * \@stable
     * @abstract
     */
    var ApplicationRef = (function () {
        function ApplicationRef() {
        }
        /**
         * Bootstrap a new component at the root level of the application.
         *
         * ### Bootstrap process
         *
         * When bootstrapping a new root component into an application, Angular mounts the
         * specified application component onto DOM elements identified by the [componentType]'s
         * selector and kicks off automatic change detection to finish initializing the component.
         *
         * ### Example
         * {\@example core/ts/platform/platform.ts region='longform'}
         * @abstract
         * @param {?} componentFactory
         * @return {?}
         */
        ApplicationRef.prototype.bootstrap = function (componentFactory) { };
        /**
         * Invoke this method to explicitly process change detection and its side-effects.
         *
         * In development mode, `tick()` also performs a second change detection cycle to ensure that no
         * further changes are detected. If additional changes are picked up during this second cycle,
         * bindings in the app have side-effects that cannot be resolved in a single change detection
         * pass.
         * In this case, Angular throws an error, since an Angular application can only have one change
         * detection pass during which all change detection must complete.
         * @abstract
         * @return {?}
         */
        ApplicationRef.prototype.tick = function () { };
        /**
         * Get a list of component types registered to this application.
         * This list is populated even before the component is created.
         * @abstract
         * @return {?}
         */
        ApplicationRef.prototype.componentTypes = function () { };
        /**
         * Get a list of components registered to this application.
         * @abstract
         * @return {?}
         */
        ApplicationRef.prototype.components = function () { };
        /**
         * Attaches a view so that it will be dirty checked.
         * The view will be automatically detached when it is destroyed.
         * This will throw if the view is already attached to a ViewContainer.
         * @abstract
         * @param {?} view
         * @return {?}
         */
        ApplicationRef.prototype.attachView = function (view) { };
        /**
         * Detaches a view from dirty checking again.
         * @abstract
         * @param {?} view
         * @return {?}
         */
        ApplicationRef.prototype.detachView = function (view) { };
        /**
         * Returns the number of attached views.
         * @abstract
         * @return {?}
         */
        ApplicationRef.prototype.viewCount = function () { };
        return ApplicationRef;
    }());
    var ApplicationRef_ = (function (_super) {
        __extends$3(ApplicationRef_, _super);
        /**
         * @param {?} _zone
         * @param {?} _console
         * @param {?} _injector
         * @param {?} _exceptionHandler
         * @param {?} _componentFactoryResolver
         * @param {?} _initStatus
         * @param {?} _testabilityRegistry
         * @param {?} _testability
         */
        function ApplicationRef_(_zone, _console, _injector, _exceptionHandler, _componentFactoryResolver, _initStatus, _testabilityRegistry, _testability) {
            var _this = this;
            _super.call(this);
            this._zone = _zone;
            this._console = _console;
            this._injector = _injector;
            this._exceptionHandler = _exceptionHandler;
            this._componentFactoryResolver = _componentFactoryResolver;
            this._initStatus = _initStatus;
            this._testabilityRegistry = _testabilityRegistry;
            this._testability = _testability;
            this._bootstrapListeners = [];
            this._rootComponents = [];
            this._rootComponentTypes = [];
            this._views = [];
            this._runningTick = false;
            this._enforceNoNewChanges = false;
            this._enforceNoNewChanges = isDevMode();
            this._zone.onMicrotaskEmpty.subscribe({ next: function () { _this._zone.run(function () { _this.tick(); }); } });
        }
        /**
         * @param {?} viewRef
         * @return {?}
         */
        ApplicationRef_.prototype.attachView = function (viewRef) {
            var /** @type {?} */ view = ((viewRef)).internalView;
            this._views.push(view);
            view.attachToAppRef(this);
        };
        /**
         * @param {?} viewRef
         * @return {?}
         */
        ApplicationRef_.prototype.detachView = function (viewRef) {
            var /** @type {?} */ view = ((viewRef)).internalView;
            ListWrapper.remove(this._views, view);
            view.detach();
        };
        /**
         * @param {?} componentOrFactory
         * @return {?}
         */
        ApplicationRef_.prototype.bootstrap = function (componentOrFactory) {
            var _this = this;
            if (!this._initStatus.done) {
                throw new Error('Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module.');
            }
            var /** @type {?} */ componentFactory;
            if (componentOrFactory instanceof ComponentFactory) {
                componentFactory = componentOrFactory;
            }
            else {
                componentFactory = this._componentFactoryResolver.resolveComponentFactory(componentOrFactory);
            }
            this._rootComponentTypes.push(componentFactory.componentType);
            var /** @type {?} */ compRef = componentFactory.create(this._injector, [], componentFactory.selector);
            compRef.onDestroy(function () { _this._unloadComponent(compRef); });
            var /** @type {?} */ testability = compRef.injector.get(Testability, null);
            if (testability) {
                compRef.injector.get(TestabilityRegistry)
                    .registerApplication(compRef.location.nativeElement, testability);
            }
            this._loadComponent(compRef);
            if (isDevMode()) {
                this._console.log("Angular is running in the development mode. Call enableProdMode() to enable the production mode.");
            }
            return compRef;
        };
        /**
         * @param {?} componentRef
         * @return {?}
         */
        ApplicationRef_.prototype._loadComponent = function (componentRef) {
            this.attachView(componentRef.hostView);
            this.tick();
            this._rootComponents.push(componentRef);
            // Get the listeners lazily to prevent DI cycles.
            var /** @type {?} */ listeners = (this._injector.get(APP_BOOTSTRAP_LISTENER, [])
                .concat(this._bootstrapListeners));
            listeners.forEach(function (listener) { return listener(componentRef); });
        };
        /**
         * @param {?} componentRef
         * @return {?}
         */
        ApplicationRef_.prototype._unloadComponent = function (componentRef) {
            this.detachView(componentRef.hostView);
            ListWrapper.remove(this._rootComponents, componentRef);
        };
        /**
         * @return {?}
         */
        ApplicationRef_.prototype.tick = function () {
            if (this._runningTick) {
                throw new Error('ApplicationRef.tick is called recursively');
            }
            var /** @type {?} */ scope = ApplicationRef_._tickScope();
            try {
                this._runningTick = true;
                this._views.forEach(function (view) { return view.ref.detectChanges(); });
                if (this._enforceNoNewChanges) {
                    this._views.forEach(function (view) { return view.ref.checkNoChanges(); });
                }
            }
            finally {
                this._runningTick = false;
                wtfLeave(scope);
            }
        };
        /**
         * @return {?}
         */
        ApplicationRef_.prototype.ngOnDestroy = function () {
            // TODO(alxhub): Dispose of the NgZone.
            this._views.slice().forEach(function (view) { return view.destroy(); });
        };
        Object.defineProperty(ApplicationRef_.prototype, "viewCount", {
            /**
             * @return {?}
             */
            get: function () { return this._views.length; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ApplicationRef_.prototype, "componentTypes", {
            /**
             * @return {?}
             */
            get: function () { return this._rootComponentTypes; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ApplicationRef_.prototype, "components", {
            /**
             * @return {?}
             */
            get: function () { return this._rootComponents; },
            enumerable: true,
            configurable: true
        });
        /** @internal */
        ApplicationRef_._tickScope = wtfCreateScope('ApplicationRef#tick()');
        ApplicationRef_.decorators = [
            { type: Injectable },
        ];
        /** @nocollapse */
        ApplicationRef_.ctorParameters = function () { return [
            { type: NgZone, },
            { type: Console, },
            { type: Injector, },
            { type: ErrorHandler, },
            { type: ComponentFactoryResolver, },
            { type: ApplicationInitStatus, },
            { type: TestabilityRegistry, decorators: [{ type: Optional },] },
            { type: Testability, decorators: [{ type: Optional },] },
        ]; };
        return ApplicationRef_;
    }(ApplicationRef));

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var __extends$9 = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    /**
     * Represents an instance of an NgModule created via a {\@link NgModuleFactory}.
     *
     * `NgModuleRef` provides access to the NgModule Instance as well other objects related to this
     * NgModule Instance.
     *
     * \@stable
     * @abstract
     */
    var NgModuleRef = (function () {
        function NgModuleRef() {
        }
        /**
         * The injector that contains all of the providers of the NgModule.
         * @abstract
         * @return {?}
         */
        NgModuleRef.prototype.injector = function () { };
        /**
         * The ComponentFactoryResolver to get hold of the ComponentFactories
         * declared in the `entryComponents` property of the module.
         * @abstract
         * @return {?}
         */
        NgModuleRef.prototype.componentFactoryResolver = function () { };
        /**
         * The NgModule instance.
         * @abstract
         * @return {?}
         */
        NgModuleRef.prototype.instance = function () { };
        /**
         * Destroys the module instance and all of the data structures associated with it.
         * @abstract
         * @return {?}
         */
        NgModuleRef.prototype.destroy = function () { };
        /**
         * Allows to register a callback that will be called when the module is destroyed.
         * @abstract
         * @param {?} callback
         * @return {?}
         */
        NgModuleRef.prototype.onDestroy = function (callback) { };
        return NgModuleRef;
    }());
    /**
     * \@experimental
     */
    var NgModuleFactory = (function () {
        /**
         * @param {?} _injectorClass
         * @param {?} _moduleType
         */
        function NgModuleFactory(_injectorClass, _moduleType) {
            this._injectorClass = _injectorClass;
            this._moduleType = _moduleType;
        }
        Object.defineProperty(NgModuleFactory.prototype, "moduleType", {
            /**
             * @return {?}
             */
            get: function () { return this._moduleType; },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} parentInjector
         * @return {?}
         */
        NgModuleFactory.prototype.create = function (parentInjector) {
            if (!parentInjector) {
                parentInjector = Injector.NULL;
            }
            var /** @type {?} */ instance = new this._injectorClass(parentInjector);
            instance.create();
            return instance;
        };
        return NgModuleFactory;
    }());
    var /** @type {?} */ _UNDEFINED = new Object();
    /**
     * @abstract
     */
    var NgModuleInjector = (function (_super) {
        __extends$9(NgModuleInjector, _super);
        /**
         * @param {?} parent
         * @param {?} factories
         * @param {?} bootstrapFactories
         */
        function NgModuleInjector(parent, factories, bootstrapFactories) {
            _super.call(this, factories, parent.get(ComponentFactoryResolver, ComponentFactoryResolver.NULL));
            this.parent = parent;
            this.bootstrapFactories = bootstrapFactories;
            this._destroyListeners = [];
            this._destroyed = false;
        }
        /**
         * @return {?}
         */
        NgModuleInjector.prototype.create = function () { this.instance = this.createInternal(); };
        /**
         * @abstract
         * @return {?}
         */
        NgModuleInjector.prototype.createInternal = function () { };
        /**
         * @param {?} token
         * @param {?=} notFoundValue
         * @return {?}
         */
        NgModuleInjector.prototype.get = function (token, notFoundValue) {
            if (notFoundValue === void 0) { notFoundValue = THROW_IF_NOT_FOUND; }
            if (token === Injector || token === ComponentFactoryResolver) {
                return this;
            }
            var /** @type {?} */ result = this.getInternal(token, _UNDEFINED);
            return result === _UNDEFINED ? this.parent.get(token, notFoundValue) : result;
        };
        /**
         * @abstract
         * @param {?} token
         * @param {?} notFoundValue
         * @return {?}
         */
        NgModuleInjector.prototype.getInternal = function (token, notFoundValue) { };
        Object.defineProperty(NgModuleInjector.prototype, "injector", {
            /**
             * @return {?}
             */
            get: function () { return this; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgModuleInjector.prototype, "componentFactoryResolver", {
            /**
             * @return {?}
             */
            get: function () { return this; },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        NgModuleInjector.prototype.destroy = function () {
            if (this._destroyed) {
                throw new Error("The ng module " + stringify(this.instance.constructor) + " has already been destroyed.");
            }
            this._destroyed = true;
            this.destroyInternal();
            this._destroyListeners.forEach(function (listener) { return listener(); });
        };
        /**
         * @param {?} callback
         * @return {?}
         */
        NgModuleInjector.prototype.onDestroy = function (callback) { this._destroyListeners.push(callback); };
        /**
         * @abstract
         * @return {?}
         */
        NgModuleInjector.prototype.destroyInternal = function () { };
        return NgModuleInjector;
    }(CodegenComponentFactoryResolver));

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Used to load ng module factories.
     * \@stable
     * @abstract
     */
    var NgModuleFactoryLoader = (function () {
        function NgModuleFactoryLoader() {
        }
        /**
         * @abstract
         * @param {?} path
         * @return {?}
         */
        NgModuleFactoryLoader.prototype.load = function (path) { };
        return NgModuleFactoryLoader;
    }());
    var /** @type {?} */ moduleFactories = new Map();
    /**
     * Registers a loaded module. Should only be called from generated NgModuleFactory code.
     * \@experimental
     * @param {?} id
     * @param {?} factory
     * @return {?}
     */
    function registerModuleFactory(id, factory) {
        var /** @type {?} */ existing = moduleFactories.get(id);
        if (existing) {
            throw new Error("Duplicate module registered for " + id + " - " + existing.moduleType.name + " vs " + factory.moduleType.name);
        }
        moduleFactories.set(id, factory);
    }
    /**
     * Returns the NgModuleFactory with the given id, if it exists and has been loaded.
     * Factories for modules that do not specify an `id` cannot be retrieved. Throws if the module
     * cannot be found.
     * \@experimental
     * @param {?} id
     * @return {?}
     */
    function getModuleFactory(id) {
        var /** @type {?} */ factory = moduleFactories.get(id);
        if (!factory)
            throw new Error("No module with ID " + id + " loaded");
        return factory;
    }

    /**
     * An unmodifiable list of items that Angular keeps up to date when the state
     * of the application changes.
     *
     * The type of object that {\@link Query} and {\@link ViewQueryMetadata} provide.
     *
     * Implements an iterable interface, therefore it can be used in both ES6
     * javascript `for (var i of items)` loops as well as in Angular templates with
     * `*ngFor="let i of myList"`.
     *
     * Changes can be observed by subscribing to the changes `Observable`.
     *
     * NOTE: In the future this class will implement an `Observable` interface.
     *
     * ### Example ([live demo](http://plnkr.co/edit/RX8sJnQYl9FWuSCWme5z?p=preview))
     * ```typescript
     * \@Component({...})
     * class Container {
     *   \@ViewChildren(Item) items:QueryList<Item>;
     * }
     * ```
     * \@stable
     */
    var QueryList = (function () {
        function QueryList() {
            this._dirty = true;
            this._results = [];
            this._emitter = new EventEmitter();
        }
        Object.defineProperty(QueryList.prototype, "changes", {
            /**
             * @return {?}
             */
            get: function () { return this._emitter; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(QueryList.prototype, "length", {
            /**
             * @return {?}
             */
            get: function () { return this._results.length; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(QueryList.prototype, "first", {
            /**
             * @return {?}
             */
            get: function () { return this._results[0]; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(QueryList.prototype, "last", {
            /**
             * @return {?}
             */
            get: function () { return this._results[this.length - 1]; },
            enumerable: true,
            configurable: true
        });
        /**
         * See
         * [Array.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
         * @param {?} fn
         * @return {?}
         */
        QueryList.prototype.map = function (fn) { return this._results.map(fn); };
        /**
         * See
         * [Array.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
         * @param {?} fn
         * @return {?}
         */
        QueryList.prototype.filter = function (fn) {
            return this._results.filter(fn);
        };
        /**
         * See
         * [Array.find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
         * @param {?} fn
         * @return {?}
         */
        QueryList.prototype.find = function (fn) { return this._results.find(fn); };
        /**
         * See
         * [Array.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
         * @param {?} fn
         * @param {?} init
         * @return {?}
         */
        QueryList.prototype.reduce = function (fn, init) {
            return this._results.reduce(fn, init);
        };
        /**
         * See
         * [Array.forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
         * @param {?} fn
         * @return {?}
         */
        QueryList.prototype.forEach = function (fn) { this._results.forEach(fn); };
        /**
         * See
         * [Array.some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
         * @param {?} fn
         * @return {?}
         */
        QueryList.prototype.some = function (fn) {
            return this._results.some(fn);
        };
        /**
         * @return {?}
         */
        QueryList.prototype.toArray = function () { return this._results.slice(); };
        /**
         * @return {?}
         */
        QueryList.prototype[getSymbolIterator()] = function () { return ((this._results))[getSymbolIterator()](); };
        /**
         * @return {?}
         */
        QueryList.prototype.toString = function () { return this._results.toString(); };
        /**
         * @param {?} res
         * @return {?}
         */
        QueryList.prototype.reset = function (res) {
            this._results = ListWrapper.flatten(res);
            this._dirty = false;
        };
        /**
         * @return {?}
         */
        QueryList.prototype.notifyOnChanges = function () { this._emitter.emit(this); };
        /**
         * internal
         * @return {?}
         */
        QueryList.prototype.setDirty = function () { this._dirty = true; };
        Object.defineProperty(QueryList.prototype, "dirty", {
            /**
             * internal
             * @return {?}
             */
            get: function () { return this._dirty; },
            enumerable: true,
            configurable: true
        });
        return QueryList;
    }());

    var /** @type {?} */ _SEPARATOR = '#';
    var /** @type {?} */ FACTORY_CLASS_SUFFIX = 'NgFactory';
    /**
     * Configuration for SystemJsNgModuleLoader.
     * token.
     *
     * \@experimental
     * @abstract
     */
    var SystemJsNgModuleLoaderConfig = (function () {
        function SystemJsNgModuleLoaderConfig() {
        }
        return SystemJsNgModuleLoaderConfig;
    }());
    var /** @type {?} */ DEFAULT_CONFIG = {
        factoryPathPrefix: '',
        factoryPathSuffix: '.ngfactory',
    };
    /**
     * NgModuleFactoryLoader that uses SystemJS to load NgModuleFactory
     * \@experimental
     */
    var SystemJsNgModuleLoader = (function () {
        /**
         * @param {?} _compiler
         * @param {?=} config
         */
        function SystemJsNgModuleLoader(_compiler, config) {
            this._compiler = _compiler;
            this._config = config || DEFAULT_CONFIG;
        }
        /**
         * @param {?} path
         * @return {?}
         */
        SystemJsNgModuleLoader.prototype.load = function (path) {
            var /** @type {?} */ offlineMode = this._compiler instanceof Compiler;
            return offlineMode ? this.loadFactory(path) : this.loadAndCompile(path);
        };
        /**
         * @param {?} path
         * @return {?}
         */
        SystemJsNgModuleLoader.prototype.loadAndCompile = function (path) {
            var _this = this;
            var _a = path.split(_SEPARATOR), module = _a[0], exportName = _a[1];
            if (exportName === undefined) {
                exportName = 'default';
            }
            return System.import(module)
                .then(function (module) { return module[exportName]; })
                .then(function (type) { return checkNotEmpty(type, module, exportName); })
                .then(function (type) { return _this._compiler.compileModuleAsync(type); });
        };
        /**
         * @param {?} path
         * @return {?}
         */
        SystemJsNgModuleLoader.prototype.loadFactory = function (path) {
            var _a = path.split(_SEPARATOR), module = _a[0], exportName = _a[1];
            var /** @type {?} */ factoryClassSuffix = FACTORY_CLASS_SUFFIX;
            if (exportName === undefined) {
                exportName = 'default';
                factoryClassSuffix = '';
            }
            return System.import(this._config.factoryPathPrefix + module + this._config.factoryPathSuffix)
                .then(function (module) { return module[exportName + factoryClassSuffix]; })
                .then(function (factory) { return checkNotEmpty(factory, module, exportName); });
        };
        SystemJsNgModuleLoader.decorators = [
            { type: Injectable },
        ];
        /** @nocollapse */
        SystemJsNgModuleLoader.ctorParameters = function () { return [
            { type: Compiler, },
            { type: SystemJsNgModuleLoaderConfig, decorators: [{ type: Optional },] },
        ]; };
        return SystemJsNgModuleLoader;
    }());
    /**
     * @param {?} value
     * @param {?} modulePath
     * @param {?} exportName
     * @return {?}
     */
    function checkNotEmpty(value, modulePath, exportName) {
        if (!value) {
            throw new Error("Cannot find '" + exportName + "' in '" + modulePath + "'");
        }
        return value;
    }

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var __extends$10 = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    /**
     * Represents an Embedded Template that can be used to instantiate Embedded Views.
     *
     * You can access a `TemplateRef`, in two ways. Via a directive placed on a `<template>` element (or
     * directive prefixed with `*`) and have the `TemplateRef` for this Embedded View injected into the
     * constructor of the directive using the `TemplateRef` Token. Alternatively you can query for the
     * `TemplateRef` from a Component or a Directive via {\@link Query}.
     *
     * To instantiate Embedded Views based on a Template, use
     * {\@link ViewContainerRef#createEmbeddedView}, which will create the View and attach it to the
     * View Container.
     * \@stable
     * @abstract
     */
    var TemplateRef = (function () {
        function TemplateRef() {
        }
        /**
         * @abstract
         * @return {?}
         */
        TemplateRef.prototype.elementRef = function () { };
        /**
         * @abstract
         * @param {?} context
         * @return {?}
         */
        TemplateRef.prototype.createEmbeddedView = function (context) { };
        return TemplateRef;
    }());
    var TemplateRef_ = (function (_super) {
        __extends$10(TemplateRef_, _super);
        /**
         * @param {?} _parentView
         * @param {?} _nodeIndex
         * @param {?} _nativeElement
         */
        function TemplateRef_(_parentView, _nodeIndex, _nativeElement) {
            _super.call(this);
            this._parentView = _parentView;
            this._nodeIndex = _nodeIndex;
            this._nativeElement = _nativeElement;
        }
        /**
         * @param {?} context
         * @return {?}
         */
        TemplateRef_.prototype.createEmbeddedView = function (context) {
            var /** @type {?} */ view = this._parentView.createEmbeddedViewInternal(this._nodeIndex);
            view.create(context || ({}));
            return view.ref;
        };
        Object.defineProperty(TemplateRef_.prototype, "elementRef", {
            /**
             * @return {?}
             */
            get: function () { return new ElementRef(this._nativeElement); },
            enumerable: true,
            configurable: true
        });
        return TemplateRef_;
    }(TemplateRef));

    /**
     * Represents a container where one or more Views can be attached.
     *
     * The container can contain two kinds of Views. Host Views, created by instantiating a
     * {\@link Component} via {\@link #createComponent}, and Embedded Views, created by instantiating an
     * {\@link TemplateRef Embedded Template} via {\@link #createEmbeddedView}.
     *
     * The location of the View Container within the containing View is specified by the Anchor
     * `element`. Each View Container can have only one Anchor Element and each Anchor Element can only
     * have a single View Container.
     *
     * Root elements of Views attached to this container become siblings of the Anchor Element in
     * the Rendered View.
     *
     * To access a `ViewContainerRef` of an Element, you can either place a {\@link Directive} injected
     * with `ViewContainerRef` on the Element, or you obtain it via a {\@link ViewChild} query.
     * \@stable
     * @abstract
     */
    var ViewContainerRef = (function () {
        function ViewContainerRef() {
        }
        /**
         * Anchor element that specifies the location of this container in the containing View.
         * <!-- TODO: rename to anchorElement -->
         * @abstract
         * @return {?}
         */
        ViewContainerRef.prototype.element = function () { };
        /**
         * @abstract
         * @return {?}
         */
        ViewContainerRef.prototype.injector = function () { };
        /**
         * @abstract
         * @return {?}
         */
        ViewContainerRef.prototype.parentInjector = function () { };
        /**
         * Destroys all Views in this container.
         * @abstract
         * @return {?}
         */
        ViewContainerRef.prototype.clear = function () { };
        /**
         * Returns the {\@link ViewRef} for the View located in this container at the specified index.
         * @abstract
         * @param {?} index
         * @return {?}
         */
        ViewContainerRef.prototype.get = function (index) { };
        /**
         * Returns the number of Views currently attached to this container.
         * @abstract
         * @return {?}
         */
        ViewContainerRef.prototype.length = function () { };
        /**
         * Instantiates an Embedded View based on the {\@link TemplateRef `templateRef`} and inserts it
         * into this container at the specified `index`.
         *
         * If `index` is not specified, the new View will be inserted as the last View in the container.
         *
         * Returns the {\@link ViewRef} for the newly created View.
         * @abstract
         * @param {?} templateRef
         * @param {?=} context
         * @param {?=} index
         * @return {?}
         */
        ViewContainerRef.prototype.createEmbeddedView = function (templateRef, context, index) { };
        /**
         * Instantiates a single {\@link Component} and inserts its Host View into this container at the
         * specified `index`.
         *
         * The component is instantiated using its {\@link ComponentFactory} which can be
         * obtained via {\@link ComponentFactoryResolver#resolveComponentFactory}.
         *
         * If `index` is not specified, the new View will be inserted as the last View in the container.
         *
         * You can optionally specify the {\@link Injector} that will be used as parent for the Component.
         *
         * Returns the {\@link ComponentRef} of the Host View created for the newly instantiated Component.
         * @abstract
         * @param {?} componentFactory
         * @param {?=} index
         * @param {?=} injector
         * @param {?=} projectableNodes
         * @return {?}
         */
        ViewContainerRef.prototype.createComponent = function (componentFactory, index, injector, projectableNodes) { };
        /**
         * Inserts a View identified by a {\@link ViewRef} into the container at the specified `index`.
         *
         * If `index` is not specified, the new View will be inserted as the last View in the container.
         *
         * Returns the inserted {\@link ViewRef}.
         * @abstract
         * @param {?} viewRef
         * @param {?=} index
         * @return {?}
         */
        ViewContainerRef.prototype.insert = function (viewRef, index) { };
        /**
         * Moves a View identified by a {\@link ViewRef} into the container at the specified `index`.
         *
         * Returns the inserted {\@link ViewRef}.
         * @abstract
         * @param {?} viewRef
         * @param {?} currentIndex
         * @return {?}
         */
        ViewContainerRef.prototype.move = function (viewRef, currentIndex) { };
        /**
         * Returns the index of the View, specified via {\@link ViewRef}, within the current container or
         * `-1` if this container doesn't contain the View.
         * @abstract
         * @param {?} viewRef
         * @return {?}
         */
        ViewContainerRef.prototype.indexOf = function (viewRef) { };
        /**
         * Destroys a View attached to this container at the specified `index`.
         *
         * If `index` is not specified, the last View in the container will be removed.
         * @abstract
         * @param {?=} index
         * @return {?}
         */
        ViewContainerRef.prototype.remove = function (index) { };
        /**
         * Use along with {\@link #insert} to move a View within the current container.
         *
         * If the `index` param is omitted, the last {\@link ViewRef} is detached.
         * @abstract
         * @param {?=} index
         * @return {?}
         */
        ViewContainerRef.prototype.detach = function (index) { };
        return ViewContainerRef;
    }());
    var ViewContainerRef_ = (function () {
        /**
         * @param {?} _element
         */
        function ViewContainerRef_(_element) {
            this._element = _element;
            /** @internal */
            this._createComponentInContainerScope = wtfCreateScope('ViewContainerRef#createComponent()');
            /** @internal */
            this._insertScope = wtfCreateScope('ViewContainerRef#insert()');
            /** @internal */
            this._removeScope = wtfCreateScope('ViewContainerRef#remove()');
            /** @internal */
            this._detachScope = wtfCreateScope('ViewContainerRef#detach()');
        }
        /**
         * @param {?} index
         * @return {?}
         */
        ViewContainerRef_.prototype.get = function (index) { return this._element.nestedViews[index].ref; };
        Object.defineProperty(ViewContainerRef_.prototype, "length", {
            /**
             * @return {?}
             */
            get: function () {
                var /** @type {?} */ views = this._element.nestedViews;
                return isPresent(views) ? views.length : 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ViewContainerRef_.prototype, "element", {
            /**
             * @return {?}
             */
            get: function () { return this._element.elementRef; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ViewContainerRef_.prototype, "injector", {
            /**
             * @return {?}
             */
            get: function () { return this._element.injector; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ViewContainerRef_.prototype, "parentInjector", {
            /**
             * @return {?}
             */
            get: function () { return this._element.parentInjector; },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} templateRef
         * @param {?=} context
         * @param {?=} index
         * @return {?}
         */
        ViewContainerRef_.prototype.createEmbeddedView = function (templateRef, context, index) {
            if (context === void 0) { context = null; }
            if (index === void 0) { index = -1; }
            var /** @type {?} */ viewRef = templateRef.createEmbeddedView(context);
            this.insert(viewRef, index);
            return viewRef;
        };
        /**
         * @param {?} componentFactory
         * @param {?=} index
         * @param {?=} injector
         * @param {?=} projectableNodes
         * @return {?}
         */
        ViewContainerRef_.prototype.createComponent = function (componentFactory, index, injector, projectableNodes) {
            if (index === void 0) { index = -1; }
            if (injector === void 0) { injector = null; }
            if (projectableNodes === void 0) { projectableNodes = null; }
            var /** @type {?} */ s = this._createComponentInContainerScope();
            var /** @type {?} */ contextInjector = injector || this._element.parentInjector;
            var /** @type {?} */ componentRef = componentFactory.create(contextInjector, projectableNodes);
            this.insert(componentRef.hostView, index);
            return wtfLeave(s, componentRef);
        };
        /**
         * @param {?} viewRef
         * @param {?=} index
         * @return {?}
         */
        ViewContainerRef_.prototype.insert = function (viewRef, index) {
            if (index === void 0) { index = -1; }
            var /** @type {?} */ s = this._insertScope();
            if (index == -1)
                index = this.length;
            var /** @type {?} */ viewRef_ = (viewRef);
            this._element.attachView(viewRef_.internalView, index);
            return wtfLeave(s, viewRef_);
        };
        /**
         * @param {?} viewRef
         * @param {?} currentIndex
         * @return {?}
         */
        ViewContainerRef_.prototype.move = function (viewRef, currentIndex) {
            var /** @type {?} */ s = this._insertScope();
            if (currentIndex == -1)
                return;
            var /** @type {?} */ viewRef_ = (viewRef);
            this._element.moveView(viewRef_.internalView, currentIndex);
            return wtfLeave(s, viewRef_);
        };
        /**
         * @param {?} viewRef
         * @return {?}
         */
        ViewContainerRef_.prototype.indexOf = function (viewRef) {
            return this.length ? this._element.nestedViews.indexOf(((viewRef)).internalView) :
                -1;
        };
        /**
         * @param {?=} index
         * @return {?}
         */
        ViewContainerRef_.prototype.remove = function (index) {
            if (index === void 0) { index = -1; }
            var /** @type {?} */ s = this._removeScope();
            if (index == -1)
                index = this.length - 1;
            var /** @type {?} */ view = this._element.detachView(index);
            view.destroy();
            // view is intentionally not returned to the client.
            wtfLeave(s);
        };
        /**
         * @param {?=} index
         * @return {?}
         */
        ViewContainerRef_.prototype.detach = function (index) {
            if (index === void 0) { index = -1; }
            var /** @type {?} */ s = this._detachScope();
            if (index == -1)
                index = this.length - 1;
            var /** @type {?} */ view = this._element.detachView(index);
            return wtfLeave(s, view.ref);
        };
        /**
         * @return {?}
         */
        ViewContainerRef_.prototype.clear = function () {
            for (var /** @type {?} */ i = this.length - 1; i >= 0; i--) {
                this.remove(i);
            }
        };
        return ViewContainerRef_;
    }());

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var __extends$11 = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    /**
     * \@stable
     * @abstract
     */
    var ViewRef = (function (_super) {
        __extends$11(ViewRef, _super);
        function ViewRef() {
            _super.apply(this, arguments);
        }
        /**
         * Destroys the view and all of the data structures associated with it.
         * @abstract
         * @return {?}
         */
        ViewRef.prototype.destroy = function () { };
        /**
         * @abstract
         * @return {?}
         */
        ViewRef.prototype.destroyed = function () { };
        /**
         * @abstract
         * @param {?} callback
         * @return {?}
         */
        ViewRef.prototype.onDestroy = function (callback) { };
        return ViewRef;
    }(ChangeDetectorRef));
    /**
     * Represents an Angular View.
     *
     * <!-- TODO: move the next two paragraphs to the dev guide -->
     * A View is a fundamental building block of the application UI. It is the smallest grouping of
     * Elements which are created and destroyed together.
     *
     * Properties of elements in a View can change, but the structure (number and order) of elements in
     * a View cannot. Changing the structure of Elements can only be done by inserting, moving or
     * removing nested Views via a {\@link ViewContainerRef}. Each View can contain many View Containers.
     * <!-- /TODO -->
     *
     * ### Example
     *
     * Given this template...
     *
     * ```
     * Count: {{items.length}}
     * <ul>
     *   <li *ngFor="let  item of items">{{item}}</li>
     * </ul>
     * ```
     *
     * We have two {\@link TemplateRef}s:
     *
     * Outer {\@link TemplateRef}:
     * ```
     * Count: {{items.length}}
     * <ul>
     *   <template ngFor let-item [ngForOf]="items"></template>
     * </ul>
     * ```
     *
     * Inner {\@link TemplateRef}:
     * ```
     *   <li>{{item}}</li>
     * ```
     *
     * Notice that the original template is broken down into two separate {\@link TemplateRef}s.
     *
     * The outer/inner {\@link TemplateRef}s are then assembled into views like so:
     *
     * ```
     * <!-- ViewRef: outer-0 -->
     * Count: 2
     * <ul>
     *   <template view-container-ref></template>
     *   <!-- ViewRef: inner-1 --><li>first</li><!-- /ViewRef: inner-1 -->
     *   <!-- ViewRef: inner-2 --><li>second</li><!-- /ViewRef: inner-2 -->
     * </ul>
     * <!-- /ViewRef: outer-0 -->
     * ```
     * \@experimental
     * @abstract
     */
    var EmbeddedViewRef = (function (_super) {
        __extends$11(EmbeddedViewRef, _super);
        function EmbeddedViewRef() {
            _super.apply(this, arguments);
        }
        /**
         * @abstract
         * @return {?}
         */
        EmbeddedViewRef.prototype.context = function () { };
        /**
         * @abstract
         * @return {?}
         */
        EmbeddedViewRef.prototype.rootNodes = function () { };
        return EmbeddedViewRef;
    }(ViewRef));
    var ViewRef_ = (function () {
        /**
         * @param {?} _view
         * @param {?} animationQueue
         */
        function ViewRef_(_view, animationQueue) {
            this._view = _view;
            this.animationQueue = animationQueue;
            this._view = _view;
            this._originalMode = this._view.cdMode;
        }
        Object.defineProperty(ViewRef_.prototype, "internalView", {
            /**
             * @return {?}
             */
            get: function () { return this._view; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ViewRef_.prototype, "rootNodes", {
            /**
             * @return {?}
             */
            get: function () { return this._view.flatRootNodes; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ViewRef_.prototype, "context", {
            /**
             * @return {?}
             */
            get: function () { return this._view.context; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ViewRef_.prototype, "destroyed", {
            /**
             * @return {?}
             */
            get: function () { return this._view.destroyed; },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        ViewRef_.prototype.markForCheck = function () { this._view.markPathToRootAsCheckOnce(); };
        /**
         * @return {?}
         */
        ViewRef_.prototype.detach = function () { this._view.cdMode = ChangeDetectorStatus.Detached; };
        /**
         * @return {?}
         */
        ViewRef_.prototype.detectChanges = function () {
            this._view.detectChanges(false);
            this.animationQueue.flush();
        };
        /**
         * @return {?}
         */
        ViewRef_.prototype.checkNoChanges = function () { this._view.detectChanges(true); };
        /**
         * @return {?}
         */
        ViewRef_.prototype.reattach = function () {
            this._view.cdMode = this._originalMode;
            this.markForCheck();
        };
        /**
         * @param {?} callback
         * @return {?}
         */
        ViewRef_.prototype.onDestroy = function (callback) {
            if (!this._view.disposables) {
                this._view.disposables = [];
            }
            this._view.disposables.push(callback);
        };
        /**
         * @return {?}
         */
        ViewRef_.prototype.destroy = function () { this._view.detachAndDestroy(); };
        return ViewRef_;
    }());

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var __extends$12 = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var EventListener = (function () {
        /**
         * @param {?} name
         * @param {?} callback
         */
        function EventListener(name, callback) {
            this.name = name;
            this.callback = callback;
        }
        ;
        return EventListener;
    }());
    /**
     * \@experimental All debugging apis are currently experimental.
     */
    var DebugNode = (function () {
        /**
         * @param {?} nativeNode
         * @param {?} parent
         * @param {?} _debugInfo
         */
        function DebugNode(nativeNode, parent, _debugInfo) {
            this._debugInfo = _debugInfo;
            this.nativeNode = nativeNode;
            if (parent && parent instanceof DebugElement) {
                parent.addChild(this);
            }
            else {
                this.parent = null;
            }
            this.listeners = [];
        }
        Object.defineProperty(DebugNode.prototype, "injector", {
            /**
             * @return {?}
             */
            get: function () { return this._debugInfo ? this._debugInfo.injector : null; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DebugNode.prototype, "componentInstance", {
            /**
             * @return {?}
             */
            get: function () { return this._debugInfo ? this._debugInfo.component : null; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DebugNode.prototype, "context", {
            /**
             * @return {?}
             */
            get: function () { return this._debugInfo ? this._debugInfo.context : null; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DebugNode.prototype, "references", {
            /**
             * @return {?}
             */
            get: function () {
                return this._debugInfo ? this._debugInfo.references : null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DebugNode.prototype, "providerTokens", {
            /**
             * @return {?}
             */
            get: function () { return this._debugInfo ? this._debugInfo.providerTokens : null; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DebugNode.prototype, "source", {
            /**
             * @return {?}
             */
            get: function () { return this._debugInfo ? this._debugInfo.source : null; },
            enumerable: true,
            configurable: true
        });
        return DebugNode;
    }());
    /**
     * \@experimental All debugging apis are currently experimental.
     */
    var DebugElement = (function (_super) {
        __extends$12(DebugElement, _super);
        /**
         * @param {?} nativeNode
         * @param {?} parent
         * @param {?} _debugInfo
         */
        function DebugElement(nativeNode, parent, _debugInfo) {
            _super.call(this, nativeNode, parent, _debugInfo);
            this.properties = {};
            this.attributes = {};
            this.classes = {};
            this.styles = {};
            this.childNodes = [];
            this.nativeElement = nativeNode;
        }
        /**
         * @param {?} child
         * @return {?}
         */
        DebugElement.prototype.addChild = function (child) {
            if (child) {
                this.childNodes.push(child);
                child.parent = this;
            }
        };
        /**
         * @param {?} child
         * @return {?}
         */
        DebugElement.prototype.removeChild = function (child) {
            var /** @type {?} */ childIndex = this.childNodes.indexOf(child);
            if (childIndex !== -1) {
                child.parent = null;
                this.childNodes.splice(childIndex, 1);
            }
        };
        /**
         * @param {?} child
         * @param {?} newChildren
         * @return {?}
         */
        DebugElement.prototype.insertChildrenAfter = function (child, newChildren) {
            var /** @type {?} */ siblingIndex = this.childNodes.indexOf(child);
            if (siblingIndex !== -1) {
                var /** @type {?} */ previousChildren = this.childNodes.slice(0, siblingIndex + 1);
                var /** @type {?} */ nextChildren = this.childNodes.slice(siblingIndex + 1);
                this.childNodes = previousChildren.concat(newChildren, nextChildren);
                for (var /** @type {?} */ i = 0; i < newChildren.length; ++i) {
                    var /** @type {?} */ newChild = newChildren[i];
                    if (newChild.parent) {
                        newChild.parent.removeChild(newChild);
                    }
                    newChild.parent = this;
                }
            }
        };
        /**
         * @param {?} predicate
         * @return {?}
         */
        DebugElement.prototype.query = function (predicate) {
            var /** @type {?} */ results = this.queryAll(predicate);
            return results[0] || null;
        };
        /**
         * @param {?} predicate
         * @return {?}
         */
        DebugElement.prototype.queryAll = function (predicate) {
            var /** @type {?} */ matches = [];
            _queryElementChildren(this, predicate, matches);
            return matches;
        };
        /**
         * @param {?} predicate
         * @return {?}
         */
        DebugElement.prototype.queryAllNodes = function (predicate) {
            var /** @type {?} */ matches = [];
            _queryNodeChildren(this, predicate, matches);
            return matches;
        };
        Object.defineProperty(DebugElement.prototype, "children", {
            /**
             * @return {?}
             */
            get: function () {
                return (this.childNodes.filter(function (node) { return node instanceof DebugElement; }));
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} eventName
         * @param {?} eventObj
         * @return {?}
         */
        DebugElement.prototype.triggerEventHandler = function (eventName, eventObj) {
            this.listeners.forEach(function (listener) {
                if (listener.name == eventName) {
                    listener.callback(eventObj);
                }
            });
        };
        return DebugElement;
    }(DebugNode));
    /**
     * \@experimental
     * @param {?} debugEls
     * @return {?}
     */
    function asNativeElements(debugEls) {
        return debugEls.map(function (el) { return el.nativeElement; });
    }
    /**
     * @param {?} element
     * @param {?} predicate
     * @param {?} matches
     * @return {?}
     */
    function _queryElementChildren(element, predicate, matches) {
        element.childNodes.forEach(function (node) {
            if (node instanceof DebugElement) {
                if (predicate(node)) {
                    matches.push(node);
                }
                _queryElementChildren(node, predicate, matches);
            }
        });
    }
    /**
     * @param {?} parentNode
     * @param {?} predicate
     * @param {?} matches
     * @return {?}
     */
    function _queryNodeChildren(parentNode, predicate, matches) {
        if (parentNode instanceof DebugElement) {
            parentNode.childNodes.forEach(function (node) {
                if (predicate(node)) {
                    matches.push(node);
                }
                if (node instanceof DebugElement) {
                    _queryNodeChildren(node, predicate, matches);
                }
            });
        }
    }
    // Need to keep the nodes in a global Map so that multiple angular apps are supported.
    var /** @type {?} */ _nativeNodeToDebugNode = new Map();
    /**
     * \@experimental
     * @param {?} nativeNode
     * @return {?}
     */
    function getDebugNode(nativeNode) {
        return _nativeNodeToDebugNode.get(nativeNode);
    }
    /**
     * @param {?} node
     * @return {?}
     */
    function indexDebugNode(node) {
        _nativeNodeToDebugNode.set(node.nativeNode, node);
    }
    /**
     * @param {?} node
     * @return {?}
     */
    function removeDebugNodeFromIndex(node) {
        _nativeNodeToDebugNode.delete(node.nativeNode);
    }

    /**
     * @return {?}
     */
    function _reflector() {
        return reflector;
    }
    var /** @type {?} */ _CORE_PLATFORM_PROVIDERS = [
        PlatformRef_,
        { provide: PlatformRef, useExisting: PlatformRef_ },
        { provide: Reflector, useFactory: _reflector, deps: [] },
        { provide: ReflectorReader, useExisting: Reflector },
        TestabilityRegistry,
        Console,
    ];
    /**
     * This platform has to be included in any other platform
     *
     * @experimental
     */
    var /** @type {?} */ platformCore = createPlatformFactory(null, 'core', _CORE_PLATFORM_PROVIDERS);

    /**
     * @experimental i18n support is experimental.
     */
    var /** @type {?} */ LOCALE_ID = new OpaqueToken('LocaleId');
    /**
     * @experimental i18n support is experimental.
     */
    var /** @type {?} */ TRANSLATIONS = new OpaqueToken('Translations');
    /**
     * @experimental i18n support is experimental.
     */
    var /** @type {?} */ TRANSLATIONS_FORMAT = new OpaqueToken('TranslationsFormat');

    /**
     * @return {?}
     */
    function _iterableDiffersFactory() {
        return defaultIterableDiffers;
    }
    /**
     * @return {?}
     */
    function _keyValueDiffersFactory() {
        return defaultKeyValueDiffers;
    }
    /**
     * @param {?=} locale
     * @return {?}
     */
    function _localeFactory(locale) {
        return locale || 'en-US';
    }
    /**
     * This module includes the providers of \@angular/core that are needed
     * to bootstrap components via `ApplicationRef`.
     *
     * \@experimental
     */
    var ApplicationModule = (function () {
        function ApplicationModule() {
        }
        ApplicationModule.decorators = [
            { type: NgModule, args: [{
                        providers: [
                            ApplicationRef_,
                            { provide: ApplicationRef, useExisting: ApplicationRef_ },
                            ApplicationInitStatus,
                            Compiler,
                            APP_ID_RANDOM_PROVIDER,
                            ViewUtils,
                            AnimationQueue,
                            { provide: IterableDiffers, useFactory: _iterableDiffersFactory },
                            { provide: KeyValueDiffers, useFactory: _keyValueDiffersFactory },
                            {
                                provide: LOCALE_ID,
                                useFactory: _localeFactory,
                                deps: [[new Inject(LOCALE_ID), new Optional(), new SkipSelf()]]
                            },
                        ]
                    },] },
        ];
        /** @nocollapse */
        ApplicationModule.ctorParameters = function () { return []; };
        return ApplicationModule;
    }());

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var /** @type {?} */ FILL_STYLE_FLAG = 'true'; // TODO (matsko): change to boolean
    var /** @type {?} */ ANY_STATE = '*';
    var /** @type {?} */ DEFAULT_STATE = '*';
    var /** @type {?} */ EMPTY_STATE = 'void';

    var AnimationGroupPlayer = (function () {
        /**
         * @param {?} _players
         */
        function AnimationGroupPlayer(_players) {
            var _this = this;
            this._players = _players;
            this._onDoneFns = [];
            this._onStartFns = [];
            this._finished = false;
            this._started = false;
            this._destroyed = false;
            this.parentPlayer = null;
            var count = 0;
            var total = this._players.length;
            if (total == 0) {
                scheduleMicroTask(function () { return _this._onFinish(); });
            }
            else {
                this._players.forEach(function (player) {
                    player.parentPlayer = _this;
                    player.onDone(function () {
                        if (++count >= total) {
                            _this._onFinish();
                        }
                    });
                });
            }
        }
        /**
         * @return {?}
         */
        AnimationGroupPlayer.prototype._onFinish = function () {
            if (!this._finished) {
                this._finished = true;
                this._onDoneFns.forEach(function (fn) { return fn(); });
                this._onDoneFns = [];
            }
        };
        /**
         * @return {?}
         */
        AnimationGroupPlayer.prototype.init = function () { this._players.forEach(function (player) { return player.init(); }); };
        /**
         * @param {?} fn
         * @return {?}
         */
        AnimationGroupPlayer.prototype.onStart = function (fn) { this._onStartFns.push(fn); };
        /**
         * @param {?} fn
         * @return {?}
         */
        AnimationGroupPlayer.prototype.onDone = function (fn) { this._onDoneFns.push(fn); };
        /**
         * @return {?}
         */
        AnimationGroupPlayer.prototype.hasStarted = function () { return this._started; };
        /**
         * @return {?}
         */
        AnimationGroupPlayer.prototype.play = function () {
            if (!isPresent(this.parentPlayer)) {
                this.init();
            }
            if (!this.hasStarted()) {
                this._onStartFns.forEach(function (fn) { return fn(); });
                this._onStartFns = [];
                this._started = true;
            }
            this._players.forEach(function (player) { return player.play(); });
        };
        /**
         * @return {?}
         */
        AnimationGroupPlayer.prototype.pause = function () { this._players.forEach(function (player) { return player.pause(); }); };
        /**
         * @return {?}
         */
        AnimationGroupPlayer.prototype.restart = function () { this._players.forEach(function (player) { return player.restart(); }); };
        /**
         * @return {?}
         */
        AnimationGroupPlayer.prototype.finish = function () {
            this._onFinish();
            this._players.forEach(function (player) { return player.finish(); });
        };
        /**
         * @return {?}
         */
        AnimationGroupPlayer.prototype.destroy = function () {
            if (!this._destroyed) {
                this._onFinish();
                this._players.forEach(function (player) { return player.destroy(); });
                this._destroyed = true;
            }
        };
        /**
         * @return {?}
         */
        AnimationGroupPlayer.prototype.reset = function () {
            this._players.forEach(function (player) { return player.reset(); });
            this._destroyed = false;
            this._finished = false;
            this._started = false;
        };
        /**
         * @param {?} p
         * @return {?}
         */
        AnimationGroupPlayer.prototype.setPosition = function (p) {
            this._players.forEach(function (player) { player.setPosition(p); });
        };
        /**
         * @return {?}
         */
        AnimationGroupPlayer.prototype.getPosition = function () {
            var /** @type {?} */ min = 0;
            this._players.forEach(function (player) {
                var /** @type {?} */ p = player.getPosition();
                min = Math.min(p, min);
            });
            return min;
        };
        Object.defineProperty(AnimationGroupPlayer.prototype, "players", {
            /**
             * @return {?}
             */
            get: function () { return this._players; },
            enumerable: true,
            configurable: true
        });
        return AnimationGroupPlayer;
    }());

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * `AnimationKeyframe` consists of a series of styles (contained within {\@link AnimationStyles
     * `AnimationStyles`})
     * and an offset value indicating when those styles are applied within the `duration/delay/easing`
     * timings.
     * `AnimationKeyframe` is mostly an internal class which is designed to be used alongside {\@link
     * Renderer#animate-anchor `Renderer.animate`}.
     *
     * \@experimental Animation support is experimental
     */
    var AnimationKeyframe = (function () {
        /**
         * @param {?} offset
         * @param {?} styles
         */
        function AnimationKeyframe(offset, styles) {
            this.offset = offset;
            this.styles = styles;
        }
        return AnimationKeyframe;
    }());

    /**
     * \@experimental Animation support is experimental.
     * @abstract
     */
    var AnimationPlayer = (function () {
        function AnimationPlayer() {
        }
        /**
         * @abstract
         * @param {?} fn
         * @return {?}
         */
        AnimationPlayer.prototype.onDone = function (fn) { };
        /**
         * @abstract
         * @param {?} fn
         * @return {?}
         */
        AnimationPlayer.prototype.onStart = function (fn) { };
        /**
         * @abstract
         * @return {?}
         */
        AnimationPlayer.prototype.init = function () { };
        /**
         * @abstract
         * @return {?}
         */
        AnimationPlayer.prototype.hasStarted = function () { };
        /**
         * @abstract
         * @return {?}
         */
        AnimationPlayer.prototype.play = function () { };
        /**
         * @abstract
         * @return {?}
         */
        AnimationPlayer.prototype.pause = function () { };
        /**
         * @abstract
         * @return {?}
         */
        AnimationPlayer.prototype.restart = function () { };
        /**
         * @abstract
         * @return {?}
         */
        AnimationPlayer.prototype.finish = function () { };
        /**
         * @abstract
         * @return {?}
         */
        AnimationPlayer.prototype.destroy = function () { };
        /**
         * @abstract
         * @return {?}
         */
        AnimationPlayer.prototype.reset = function () { };
        /**
         * @abstract
         * @param {?} p
         * @return {?}
         */
        AnimationPlayer.prototype.setPosition = function (p) { };
        /**
         * @abstract
         * @return {?}
         */
        AnimationPlayer.prototype.getPosition = function () { };
        Object.defineProperty(AnimationPlayer.prototype, "parentPlayer", {
            /**
             * @return {?}
             */
            get: function () { throw new Error('NOT IMPLEMENTED: Base Class'); },
            /**
             * @param {?} player
             * @return {?}
             */
            set: function (player) { throw new Error('NOT IMPLEMENTED: Base Class'); },
            enumerable: true,
            configurable: true
        });
        return AnimationPlayer;
    }());
    var NoOpAnimationPlayer = (function () {
        function NoOpAnimationPlayer() {
            var _this = this;
            this._onDoneFns = [];
            this._onStartFns = [];
            this._started = false;
            this.parentPlayer = null;
            scheduleMicroTask(function () { return _this._onFinish(); });
        }
        /**
         * \@internal
         * @return {?}
         */
        NoOpAnimationPlayer.prototype._onFinish = function () {
            this._onDoneFns.forEach(function (fn) { return fn(); });
            this._onDoneFns = [];
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        NoOpAnimationPlayer.prototype.onStart = function (fn) { this._onStartFns.push(fn); };
        /**
         * @param {?} fn
         * @return {?}
         */
        NoOpAnimationPlayer.prototype.onDone = function (fn) { this._onDoneFns.push(fn); };
        /**
         * @return {?}
         */
        NoOpAnimationPlayer.prototype.hasStarted = function () { return this._started; };
        /**
         * @return {?}
         */
        NoOpAnimationPlayer.prototype.init = function () { };
        /**
         * @return {?}
         */
        NoOpAnimationPlayer.prototype.play = function () {
            if (!this.hasStarted()) {
                this._onStartFns.forEach(function (fn) { return fn(); });
                this._onStartFns = [];
            }
            this._started = true;
        };
        /**
         * @return {?}
         */
        NoOpAnimationPlayer.prototype.pause = function () { };
        /**
         * @return {?}
         */
        NoOpAnimationPlayer.prototype.restart = function () { };
        /**
         * @return {?}
         */
        NoOpAnimationPlayer.prototype.finish = function () { this._onFinish(); };
        /**
         * @return {?}
         */
        NoOpAnimationPlayer.prototype.destroy = function () { };
        /**
         * @return {?}
         */
        NoOpAnimationPlayer.prototype.reset = function () { };
        /**
         * @param {?} p
         * @return {?}
         */
        NoOpAnimationPlayer.prototype.setPosition = function (p) { };
        /**
         * @return {?}
         */
        NoOpAnimationPlayer.prototype.getPosition = function () { return 0; };
        return NoOpAnimationPlayer;
    }());

    var AnimationSequencePlayer = (function () {
        /**
         * @param {?} _players
         */
        function AnimationSequencePlayer(_players) {
            var _this = this;
            this._players = _players;
            this._currentIndex = 0;
            this._onDoneFns = [];
            this._onStartFns = [];
            this._finished = false;
            this._started = false;
            this._destroyed = false;
            this.parentPlayer = null;
            this._players.forEach(function (player) { player.parentPlayer = _this; });
            this._onNext(false);
        }
        /**
         * @param {?} start
         * @return {?}
         */
        AnimationSequencePlayer.prototype._onNext = function (start) {
            var _this = this;
            if (this._finished)
                return;
            if (this._players.length == 0) {
                this._activePlayer = new NoOpAnimationPlayer();
                scheduleMicroTask(function () { return _this._onFinish(); });
            }
            else if (this._currentIndex >= this._players.length) {
                this._activePlayer = new NoOpAnimationPlayer();
                this._onFinish();
            }
            else {
                var /** @type {?} */ player = this._players[this._currentIndex++];
                player.onDone(function () { return _this._onNext(true); });
                this._activePlayer = player;
                if (start) {
                    player.play();
                }
            }
        };
        /**
         * @return {?}
         */
        AnimationSequencePlayer.prototype._onFinish = function () {
            if (!this._finished) {
                this._finished = true;
                this._onDoneFns.forEach(function (fn) { return fn(); });
                this._onDoneFns = [];
            }
        };
        /**
         * @return {?}
         */
        AnimationSequencePlayer.prototype.init = function () { this._players.forEach(function (player) { return player.init(); }); };
        /**
         * @param {?} fn
         * @return {?}
         */
        AnimationSequencePlayer.prototype.onStart = function (fn) { this._onStartFns.push(fn); };
        /**
         * @param {?} fn
         * @return {?}
         */
        AnimationSequencePlayer.prototype.onDone = function (fn) { this._onDoneFns.push(fn); };
        /**
         * @return {?}
         */
        AnimationSequencePlayer.prototype.hasStarted = function () { return this._started; };
        /**
         * @return {?}
         */
        AnimationSequencePlayer.prototype.play = function () {
            if (!isPresent(this.parentPlayer)) {
                this.init();
            }
            if (!this.hasStarted()) {
                this._onStartFns.forEach(function (fn) { return fn(); });
                this._onStartFns = [];
                this._started = true;
            }
            this._activePlayer.play();
        };
        /**
         * @return {?}
         */
        AnimationSequencePlayer.prototype.pause = function () { this._activePlayer.pause(); };
        /**
         * @return {?}
         */
        AnimationSequencePlayer.prototype.restart = function () {
            this.reset();
            if (this._players.length > 0) {
                this._players[0].restart();
            }
        };
        /**
         * @return {?}
         */
        AnimationSequencePlayer.prototype.reset = function () {
            this._players.forEach(function (player) { return player.reset(); });
            this._destroyed = false;
            this._finished = false;
            this._started = false;
        };
        /**
         * @return {?}
         */
        AnimationSequencePlayer.prototype.finish = function () {
            this._onFinish();
            this._players.forEach(function (player) { return player.finish(); });
        };
        /**
         * @return {?}
         */
        AnimationSequencePlayer.prototype.destroy = function () {
            if (!this._destroyed) {
                this._onFinish();
                this._players.forEach(function (player) { return player.destroy(); });
                this._destroyed = true;
                this._activePlayer = new NoOpAnimationPlayer();
            }
        };
        /**
         * @param {?} p
         * @return {?}
         */
        AnimationSequencePlayer.prototype.setPosition = function (p) { this._players[0].setPosition(p); };
        /**
         * @return {?}
         */
        AnimationSequencePlayer.prototype.getPosition = function () { return this._players[0].getPosition(); };
        Object.defineProperty(AnimationSequencePlayer.prototype, "players", {
            /**
             * @return {?}
             */
            get: function () { return this._players; },
            enumerable: true,
            configurable: true
        });
        return AnimationSequencePlayer;
    }());

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var __extends$13 = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    /**
     * @experimental Animation support is experimental.
     */
    var /** @type {?} */ AUTO_STYLE = '*';
    /**
     * Metadata representing the entry of animations.
     * Instances of this class are provided via the animation DSL when the {\@link trigger trigger
     * animation function} is called.
     *
     * \@experimental Animation support is experimental.
     */
    var AnimationEntryMetadata = (function () {
        /**
         * @param {?} name
         * @param {?} definitions
         */
        function AnimationEntryMetadata(name, definitions) {
            this.name = name;
            this.definitions = definitions;
        }
        return AnimationEntryMetadata;
    }());
    /**
     * \@experimental Animation support is experimental.
     * @abstract
     */
    var AnimationStateMetadata = (function () {
        function AnimationStateMetadata() {
        }
        return AnimationStateMetadata;
    }());
    /**
     * Metadata representing the entry of animations.
     * Instances of this class are provided via the animation DSL when the {\@link state state animation
     * function} is called.
     *
     * \@experimental Animation support is experimental.
     */
    var AnimationStateDeclarationMetadata = (function (_super) {
        __extends$13(AnimationStateDeclarationMetadata, _super);
        /**
         * @param {?} stateNameExpr
         * @param {?} styles
         */
        function AnimationStateDeclarationMetadata(stateNameExpr, styles) {
            _super.call(this);
            this.stateNameExpr = stateNameExpr;
            this.styles = styles;
        }
        return AnimationStateDeclarationMetadata;
    }(AnimationStateMetadata));
    /**
     * Metadata representing the entry of animations.
     * Instances of this class are provided via the animation DSL when the
     * {\@link transition transition animation function} is called.
     *
     * \@experimental Animation support is experimental.
     */
    var AnimationStateTransitionMetadata = (function (_super) {
        __extends$13(AnimationStateTransitionMetadata, _super);
        /**
         * @param {?} stateChangeExpr
         * @param {?} steps
         */
        function AnimationStateTransitionMetadata(stateChangeExpr, steps) {
            _super.call(this);
            this.stateChangeExpr = stateChangeExpr;
            this.steps = steps;
        }
        return AnimationStateTransitionMetadata;
    }(AnimationStateMetadata));
    /**
     * \@experimental Animation support is experimental.
     * @abstract
     */
    var AnimationMetadata = (function () {
        function AnimationMetadata() {
        }
        return AnimationMetadata;
    }());
    /**
     * Metadata representing the entry of animations.
     * Instances of this class are provided via the animation DSL when the {\@link keyframes keyframes
     * animation function} is called.
     *
     * \@experimental Animation support is experimental.
     */
    var AnimationKeyframesSequenceMetadata = (function (_super) {
        __extends$13(AnimationKeyframesSequenceMetadata, _super);
        /**
         * @param {?} steps
         */
        function AnimationKeyframesSequenceMetadata(steps) {
            _super.call(this);
            this.steps = steps;
        }
        return AnimationKeyframesSequenceMetadata;
    }(AnimationMetadata));
    /**
     * Metadata representing the entry of animations.
     * Instances of this class are provided via the animation DSL when the {\@link style style animation
     * function} is called.
     *
     * \@experimental Animation support is experimental.
     */
    var AnimationStyleMetadata = (function (_super) {
        __extends$13(AnimationStyleMetadata, _super);
        /**
         * @param {?} styles
         * @param {?=} offset
         */
        function AnimationStyleMetadata(styles, offset) {
            if (offset === void 0) { offset = null; }
            _super.call(this);
            this.styles = styles;
            this.offset = offset;
        }
        return AnimationStyleMetadata;
    }(AnimationMetadata));
    /**
     * Metadata representing the entry of animations.
     * Instances of this class are provided via the animation DSL when the {\@link animate animate
     * animation function} is called.
     *
     * \@experimental Animation support is experimental.
     */
    var AnimationAnimateMetadata = (function (_super) {
        __extends$13(AnimationAnimateMetadata, _super);
        /**
         * @param {?} timings
         * @param {?} styles
         */
        function AnimationAnimateMetadata(timings, styles) {
            _super.call(this);
            this.timings = timings;
            this.styles = styles;
        }
        return AnimationAnimateMetadata;
    }(AnimationMetadata));
    /**
     * \@experimental Animation support is experimental.
     * @abstract
     */
    var AnimationWithStepsMetadata = (function (_super) {
        __extends$13(AnimationWithStepsMetadata, _super);
        function AnimationWithStepsMetadata() {
            _super.call(this);
        }
        Object.defineProperty(AnimationWithStepsMetadata.prototype, "steps", {
            /**
             * @return {?}
             */
            get: function () { throw new Error('NOT IMPLEMENTED: Base Class'); },
            enumerable: true,
            configurable: true
        });
        return AnimationWithStepsMetadata;
    }(AnimationMetadata));
    /**
     * Metadata representing the entry of animations.
     * Instances of this class are provided via the animation DSL when the {\@link sequence sequence
     * animation function} is called.
     *
     * \@experimental Animation support is experimental.
     */
    var AnimationSequenceMetadata = (function (_super) {
        __extends$13(AnimationSequenceMetadata, _super);
        /**
         * @param {?} _steps
         */
        function AnimationSequenceMetadata(_steps) {
            _super.call(this);
            this._steps = _steps;
        }
        Object.defineProperty(AnimationSequenceMetadata.prototype, "steps", {
            /**
             * @return {?}
             */
            get: function () { return this._steps; },
            enumerable: true,
            configurable: true
        });
        return AnimationSequenceMetadata;
    }(AnimationWithStepsMetadata));
    /**
     * Metadata representing the entry of animations.
     * Instances of this class are provided via the animation DSL when the {\@link group group animation
     * function} is called.
     *
     * \@experimental Animation support is experimental.
     */
    var AnimationGroupMetadata = (function (_super) {
        __extends$13(AnimationGroupMetadata, _super);
        /**
         * @param {?} _steps
         */
        function AnimationGroupMetadata(_steps) {
            _super.call(this);
            this._steps = _steps;
        }
        Object.defineProperty(AnimationGroupMetadata.prototype, "steps", {
            /**
             * @return {?}
             */
            get: function () { return this._steps; },
            enumerable: true,
            configurable: true
        });
        return AnimationGroupMetadata;
    }(AnimationWithStepsMetadata));
    /**
     * `animate` is an animation-specific function that is designed to be used inside of Angular2's
     * animation
     * DSL language. If this information is new, please navigate to the
     * {\@link Component#animations-anchor component animations metadata
     * page} to gain a better understanding of how animations in Angular2 are used.
     *
     * `animate` specifies an animation step that will apply the provided `styles` data for a given
     * amount of
     * time based on the provided `timing` expression value. Calls to `animate` are expected to be
     * used within {\@link sequence an animation sequence}, {\@link group group}, or {\@link transition
     * transition}.
     *
     * ### Usage
     *
     * The `animate` function accepts two input parameters: `timing` and `styles`:
     *
     * - `timing` is a string based value that can be a combination of a duration with optional
     * delay and easing values. The format for the expression breaks down to `duration delay easing`
     * (therefore a value such as `1s 100ms ease-out` will be parse itself into `duration=1000,
     * delay=100, easing=ease-out`.
     * If a numeric value is provided then that will be used as the `duration` value in millisecond
     * form.
     * - `styles` is the style input data which can either be a call to {\@link style style} or {\@link
     * keyframes keyframes}.
     * If left empty then the styles from the destination state will be collected and used (this is
     * useful when
     * describing an animation step that will complete an animation by {\@link
     * transition#the-final-animate-call animating to the final state}).
     *
     * ```typescript
     * // various functions for specifying timing data
     * animate(500, style(...))
     * animate("1s", style(...))
     * animate("100ms 0.5s", style(...))
     * animate("5s ease", style(...))
     * animate("5s 10ms cubic-bezier(.17,.67,.88,.1)", style(...))
     *
     * // either style() of keyframes() can be used
     * animate(500, style({ background: "red" }))
     * animate(500, keyframes([
     *   style({ background: "blue" })),
     *   style({ background: "red" }))
     * ])
     * ```
     *
     * ### Example ([live demo](http://plnkr.co/edit/Kez8XGWBxWue7qP7nNvF?p=preview))
     *
     * {\@example core/animation/ts/dsl/animation_example.ts region='Component'}
     *
     * \@experimental Animation support is experimental.
     * @param {?} timing
     * @param {?=} styles
     * @return {?}
     */
    function animate(timing, styles) {
        if (styles === void 0) { styles = null; }
        var /** @type {?} */ stylesEntry = styles;
        if (!isPresent(stylesEntry)) {
            var /** @type {?} */ EMPTY_STYLE = {};
            stylesEntry = new AnimationStyleMetadata([EMPTY_STYLE], 1);
        }
        return new AnimationAnimateMetadata(timing, stylesEntry);
    }
    /**
     * `group` is an animation-specific function that is designed to be used inside of Angular2's
     * animation
     * DSL language. If this information is new, please navigate to the
     * {\@link Component#animations-anchor component animations metadata
     * page} to gain a better understanding of how animations in Angular2 are used.
     *
     * `group` specifies a list of animation steps that are all run in parallel. Grouped animations
     * are useful when a series of styles must be animated/closed off
     * at different statrting/ending times.
     *
     * The `group` function can either be used within a {\@link sequence sequence} or a {\@link transition
     * transition}
     * and it will only continue to the next instruction once all of the inner animation steps
     * have completed.
     *
     * ### Usage
     *
     * The `steps` data that is passed into the `group` animation function can either consist
     * of {\@link style style} or {\@link animate animate} function calls. Each call to `style()` or
     * `animate()`
     * within a group will be executed instantly (use {\@link keyframes keyframes} or a
     * {\@link animate#usage animate() with a delay value} to offset styles to be applied at a later
     * time).
     *
     * ```typescript
     * group([
     *   animate("1s", { background: "black" }))
     *   animate("2s", { color: "white" }))
     * ])
     * ```
     *
     * ### Example ([live demo](http://plnkr.co/edit/Kez8XGWBxWue7qP7nNvF?p=preview))
     *
     * {\@example core/animation/ts/dsl/animation_example.ts region='Component'}
     *
     * \@experimental Animation support is experimental.
     * @param {?} steps
     * @return {?}
     */
    function group(steps) {
        return new AnimationGroupMetadata(steps);
    }
    /**
     * `sequence` is an animation-specific function that is designed to be used inside of Angular2's
     * animation
     * DSL language. If this information is new, please navigate to the
     * {\@link Component#animations-anchor component animations metadata
     * page} to gain a better understanding of how animations in Angular2 are used.
     *
     * `sequence` Specifies a list of animation steps that are run one by one. (`sequence` is used
     * by default when an array is passed as animation data into {\@link transition transition}.)
     *
     * The `sequence` function can either be used within a {\@link group group} or a {\@link transition
     * transition}
     * and it will only continue to the next instruction once each of the inner animation steps
     * have completed.
     *
     * To perform animation styling in parallel with other animation steps then
     * have a look at the {\@link group group} animation function.
     *
     * ### Usage
     *
     * The `steps` data that is passed into the `sequence` animation function can either consist
     * of {\@link style style} or {\@link animate animate} function calls. A call to `style()` will apply
     * the
     * provided styling data immediately while a call to `animate()` will apply its styling
     * data over a given time depending on its timing data.
     *
     * ```typescript
     * sequence([
     *   style({ opacity: 0 })),
     *   animate("1s", { opacity: 1 }))
     * ])
     * ```
     *
     * ### Example ([live demo](http://plnkr.co/edit/Kez8XGWBxWue7qP7nNvF?p=preview))
     *
     * {\@example core/animation/ts/dsl/animation_example.ts region='Component'}
     *
     * \@experimental Animation support is experimental.
     * @param {?} steps
     * @return {?}
     */
    function sequence(steps) {
        return new AnimationSequenceMetadata(steps);
    }
    /**
     * `style` is an animation-specific function that is designed to be used inside of Angular2's
     * animation
     * DSL language. If this information is new, please navigate to the
     * {\@link Component#animations-anchor component animations metadata
     * page} to gain a better understanding of how animations in Angular2 are used.
     *
     * `style` declares a key/value object containing CSS properties/styles that can then
     * be used for {\@link state animation states}, within an {\@link sequence animation sequence}, or as
     * styling data for both {\@link animate animate} and {\@link keyframes keyframes}.
     *
     * ### Usage
     *
     * `style` takes in a key/value string map as data and expects one or more CSS property/value
     * pairs to be defined.
     *
     * ```typescript
     * // string values are used for css properties
     * style({ background: "red", color: "blue" })
     *
     * // numerical (pixel) values are also supported
     * style({ width: 100, height: 0 })
     * ```
     *
     * #### Auto-styles (using `*`)
     *
     * When an asterix (`*`) character is used as a value then it will be detected from the element
     * being animated
     * and applied as animation data when the animation starts.
     *
     * This feature proves useful for a state depending on layout and/or environment factors; in such
     * cases
     * the styles are calculated just before the animation starts.
     *
     * ```typescript
     * // the steps below will animate from 0 to the
     * // actual height of the element
     * style({ height: 0 }),
     * animate("1s", style({ height: "*" }))
     * ```
     *
     * ### Example ([live demo](http://plnkr.co/edit/Kez8XGWBxWue7qP7nNvF?p=preview))
     *
     * {\@example core/animation/ts/dsl/animation_example.ts region='Component'}
     *
     * \@experimental Animation support is experimental.
     * @param {?} tokens
     * @return {?}
     */
    function style(tokens) {
        var /** @type {?} */ input;
        var /** @type {?} */ offset = null;
        if (typeof tokens === 'string') {
            input = [(tokens)];
        }
        else {
            if (Array.isArray(tokens)) {
                input = (tokens);
            }
            else {
                input = [(tokens)];
            }
            input.forEach(function (entry) {
                var /** @type {?} */ entryOffset = ((entry) /** TODO #9100 */)['offset'];
                if (isPresent(entryOffset)) {
                    offset = offset == null ? parseFloat(entryOffset) : offset;
                }
            });
        }
        return new AnimationStyleMetadata(input, offset);
    }
    /**
     * `state` is an animation-specific function that is designed to be used inside of Angular2's
     * animation
     * DSL language. If this information is new, please navigate to the
     * {\@link Component#animations-anchor component animations metadata
     * page} to gain a better understanding of how animations in Angular2 are used.
     *
     * `state` declares an animation state within the given trigger. When a state is
     * active within a component then its associated styles will persist on
     * the element that the trigger is attached to (even when the animation ends).
     *
     * To animate between states, have a look at the animation {\@link transition transition}
     * DSL function. To register states to an animation trigger please have a look
     * at the {\@link trigger trigger} function.
     *
     * #### The `void` state
     *
     * The `void` state value is a reserved word that angular uses to determine when the element is not
     * apart
     * of the application anymore (e.g. when an `ngIf` evaluates to false then the state of the
     * associated element
     * is void).
     *
     * #### The `*` (default) state
     *
     * The `*` state (when styled) is a fallback state that will be used if
     * the state that is being animated is not declared within the trigger.
     *
     * ### Usage
     *
     * `state` will declare an animation state with its associated styles
     * within the given trigger.
     *
     * - `stateNameExpr` can be one or more state names separated by commas.
     * - `styles` refers to the {\@link style styling data} that will be persisted on the element once
     * the state
     * has been reached.
     *
     * ```typescript
     * // "void" is a reserved name for a state and is used to represent
     * // the state in which an element is detached from from the application.
     * state("void", style({ height: 0 }))
     *
     * // user-defined states
     * state("closed", style({ height: 0 }))
     * state("open, visible", style({ height: "*" }))
     * ```
     *
     * ### Example ([live demo](http://plnkr.co/edit/Kez8XGWBxWue7qP7nNvF?p=preview))
     *
     * {\@example core/animation/ts/dsl/animation_example.ts region='Component'}
     *
     * \@experimental Animation support is experimental.
     * @param {?} stateNameExpr
     * @param {?} styles
     * @return {?}
     */
    function state(stateNameExpr, styles) {
        return new AnimationStateDeclarationMetadata(stateNameExpr, styles);
    }
    /**
     * `keyframes` is an animation-specific function that is designed to be used inside of Angular2's
     * animation
     * DSL language. If this information is new, please navigate to the
     * {\@link Component#animations-anchor component animations metadata
     * page} to gain a better understanding of how animations in Angular2 are used.
     *
     * `keyframes` specifies a collection of {\@link style style} entries each optionally characterized
     * by an `offset` value.
     *
     * ### Usage
     *
     * The `keyframes` animation function is designed to be used alongside the {\@link animate animate}
     * animation function. Instead of applying animations from where they are
     * currently to their destination, keyframes can describe how each style entry is applied
     * and at what point within the animation arc (much like CSS Keyframe Animations do).
     *
     * For each `style()` entry an `offset` value can be set. Doing so allows to specifiy at
     * what percentage of the animate time the styles will be applied.
     *
     * ```typescript
     * // the provided offset values describe when each backgroundColor value is applied.
     * animate("5s", keyframes([
     *   style({ backgroundColor: "red", offset: 0 }),
     *   style({ backgroundColor: "blue", offset: 0.2 }),
     *   style({ backgroundColor: "orange", offset: 0.3 }),
     *   style({ backgroundColor: "black", offset: 1 })
     * ]))
     * ```
     *
     * Alternatively, if there are no `offset` values used within the style entries then the offsets
     * will
     * be calculated automatically.
     *
     * ```typescript
     * animate("5s", keyframes([
     *   style({ backgroundColor: "red" }) // offset = 0
     *   style({ backgroundColor: "blue" }) // offset = 0.33
     *   style({ backgroundColor: "orange" }) // offset = 0.66
     *   style({ backgroundColor: "black" }) // offset = 1
     * ]))
     * ```
     *
     * ### Example ([live demo](http://plnkr.co/edit/Kez8XGWBxWue7qP7nNvF?p=preview))
     *
     * {\@example core/animation/ts/dsl/animation_example.ts region='Component'}
     *
     * \@experimental Animation support is experimental.
     * @param {?} steps
     * @return {?}
     */
    function keyframes(steps) {
        return new AnimationKeyframesSequenceMetadata(steps);
    }
    /**
     * `transition` is an animation-specific function that is designed to be used inside of Angular2's
     * animation
     * DSL language. If this information is new, please navigate to the
     * {\@link Component#animations-anchor component animations metadata
     * page} to gain a better understanding of how animations in Angular2 are used.
     *
     * `transition` declares the {\@link sequence sequence of animation steps} that will be run when the
     * provided
     * `stateChangeExpr` value is satisfied. The `stateChangeExpr` consists of a `state1 => state2`
     * which consists
     * of two known states (use an asterix (`*`) to refer to a dynamic starting and/or ending state).
     *
     * Animation transitions are placed within an {\@link trigger animation trigger}. For an transition
     * to animate to
     * a state value and persist its styles then one or more {\@link state animation states} is expected
     * to be defined.
     *
     * ### Usage
     *
     * An animation transition is kicked off the `stateChangeExpr` predicate evaluates to true based on
     * what the
     * previous state is and what the current state has become. In other words, if a transition is
     * defined that
     * matches the old/current state criteria then the associated animation will be triggered.
     *
     * ```typescript
     * // all transition/state changes are defined within an animation trigger
     * trigger("myAnimationTrigger", [
     *   // if a state is defined then its styles will be persisted when the
     *   // animation has fully completed itself
     *   state("on", style({ background: "green" })),
     *   state("off", style({ background: "grey" })),
     *
     *   // a transition animation that will be kicked off when the state value
     *   // bound to "myAnimationTrigger" changes from "on" to "off"
     *   transition("on => off", animate(500)),
     *
     *   // it is also possible to do run the same animation for both directions
     *   transition("on <=> off", animate(500)),
     *
     *   // or to define multiple states pairs separated by commas
     *   transition("on => off, off => void", animate(500)),
     *
     *   // this is a catch-all state change for when an element is inserted into
     *   // the page and the destination state is unknown
     *   transition("void => *", [
     *     style({ opacity: 0 }),
     *     animate(500)
     *   ]),
     *
     *   // this will capture a state change between any states
     *   transition("* => *", animate("1s 0s")),
     * ])
     * ```
     *
     * The template associated with this component will make use of the `myAnimationTrigger`
     * animation trigger by binding to an element within its template code.
     *
     * ```html
     * <!-- somewhere inside of my-component-tpl.html -->
     * <div [\@myAnimationTrigger]="myStatusExp">...</div>
     * ```
     *
     * #### The final `animate` call
     *
     * If the final step within the transition steps is a call to `animate()` that **only**
     * uses a timing value with **no style data** then it will be automatically used as the final
     * animation
     * arc for the element to animate itself to the final state. This involves an automatic mix of
     * adding/removing CSS styles so that the element will be in the exact state it should be for the
     * applied state to be presented correctly.
     *
     * ```
     * // start off by hiding the element, but make sure that it animates properly to whatever state
     * // is currently active for "myAnimationTrigger"
     * transition("void => *", [
     *   style({ opacity: 0 }),
     *   animate(500)
     * ])
     * ```
     *
     * ### Transition Aliases (`:enter` and `:leave`)
     *
     * Given that enter (insertion) and leave (removal) animations are so common,
     * the `transition` function accepts both `:enter` and `:leave` values which
     * are aliases for the `void => *` and `* => void` state changes.
     *
     * ```
     * transition(":enter", [
     *   style({ opacity: 0 }),
     *   animate(500, style({ opacity: 1 }))
     * ])
     * transition(":leave", [
     *   animate(500, style({ opacity: 0 }))
     * ])
     * ```
     *
     * ### Example ([live demo](http://plnkr.co/edit/Kez8XGWBxWue7qP7nNvF?p=preview))
     *
     * {\@example core/animation/ts/dsl/animation_example.ts region='Component'}
     *
     * \@experimental Animation support is experimental.
     * @param {?} stateChangeExpr
     * @param {?} steps
     * @return {?}
     */
    function transition(stateChangeExpr, steps) {
        var /** @type {?} */ animationData = Array.isArray(steps) ? new AnimationSequenceMetadata(steps) : steps;
        return new AnimationStateTransitionMetadata(stateChangeExpr, animationData);
    }
    /**
     * `trigger` is an animation-specific function that is designed to be used inside of Angular2's
     * animation
     * DSL language. If this information is new, please navigate to the
     * {\@link Component#animations-anchor component animations metadata
     * page} to gain a better understanding of how animations in Angular2 are used.
     *
     * `trigger` Creates an animation trigger which will a list of {\@link state state} and {\@link
     * transition transition}
     * entries that will be evaluated when the expression bound to the trigger changes.
     *
     * Triggers are registered within the component annotation data under the
     * {\@link Component#animations-anchor animations section}. An animation trigger can
     * be placed on an element within a template by referencing the name of the
     * trigger followed by the expression value that the trigger is bound to
     * (in the form of `[\@triggerName]="expression"`.
     *
     * ### Usage
     *
     * `trigger` will create an animation trigger reference based on the provided `name` value.
     * The provided `animation` value is expected to be an array consisting of {\@link state state} and
     * {\@link transition transition}
     * declarations.
     *
     * ```typescript
     * \@Component({
     *   selector: 'my-component',
     *   templateUrl: 'my-component-tpl.html',
     *   animations: [
     *     trigger("myAnimationTrigger", [
     *       state(...),
     *       state(...),
     *       transition(...),
     *       transition(...)
     *     ])
     *   ]
     * })
     * class MyComponent {
     *   myStatusExp = "something";
     * }
     * ```
     *
     * The template associated with this component will make use of the `myAnimationTrigger`
     * animation trigger by binding to an element within its template code.
     *
     * ```html
     * <!-- somewhere inside of my-component-tpl.html -->
     * <div [\@myAnimationTrigger]="myStatusExp">...</div>
     * ```
     *
     * ### Example ([live demo](http://plnkr.co/edit/Kez8XGWBxWue7qP7nNvF?p=preview))
     *
     * {\@example core/animation/ts/dsl/animation_example.ts region='Component'}
     *
     * \@experimental Animation support is experimental.
     * @param {?} name
     * @param {?} animation
     * @return {?}
     */
    function trigger(name, animation) {
        return new AnimationEntryMetadata(name, animation);
    }

    /**
     * @param {?} previousStyles
     * @param {?} newStyles
     * @param {?=} nullValue
     * @return {?}
     */
    function prepareFinalAnimationStyles(previousStyles, newStyles, nullValue) {
        if (nullValue === void 0) { nullValue = null; }
        var /** @type {?} */ finalStyles = {};
        Object.keys(newStyles).forEach(function (prop) {
            var /** @type {?} */ value = newStyles[prop];
            finalStyles[prop] = value == AUTO_STYLE ? nullValue : value.toString();
        });
        Object.keys(previousStyles).forEach(function (prop) {
            if (!isPresent(finalStyles[prop])) {
                finalStyles[prop] = nullValue;
            }
        });
        return finalStyles;
    }
    /**
     * @param {?} collectedStyles
     * @param {?} finalStateStyles
     * @param {?} keyframes
     * @return {?}
     */
    function balanceAnimationKeyframes(collectedStyles, finalStateStyles, keyframes) {
        var /** @type {?} */ limit = keyframes.length - 1;
        var /** @type {?} */ firstKeyframe = keyframes[0];
        // phase 1: copy all the styles from the first keyframe into the lookup map
        var /** @type {?} */ flatenedFirstKeyframeStyles = flattenStyles(firstKeyframe.styles.styles);
        var /** @type {?} */ extraFirstKeyframeStyles = {};
        var /** @type {?} */ hasExtraFirstStyles = false;
        Object.keys(collectedStyles).forEach(function (prop) {
            var /** @type {?} */ value = (collectedStyles[prop]);
            // if the style is already defined in the first keyframe then
            // we do not replace it.
            if (!flatenedFirstKeyframeStyles[prop]) {
                flatenedFirstKeyframeStyles[prop] = value;
                extraFirstKeyframeStyles[prop] = value;
                hasExtraFirstStyles = true;
            }
        });
        var /** @type {?} */ keyframeCollectedStyles = StringMapWrapper.merge({}, flatenedFirstKeyframeStyles);
        // phase 2: normalize the final keyframe
        var /** @type {?} */ finalKeyframe = keyframes[limit];
        finalKeyframe.styles.styles.unshift(finalStateStyles);
        var /** @type {?} */ flatenedFinalKeyframeStyles = flattenStyles(finalKeyframe.styles.styles);
        var /** @type {?} */ extraFinalKeyframeStyles = {};
        var /** @type {?} */ hasExtraFinalStyles = false;
        Object.keys(keyframeCollectedStyles).forEach(function (prop) {
            if (!isPresent(flatenedFinalKeyframeStyles[prop])) {
                extraFinalKeyframeStyles[prop] = AUTO_STYLE;
                hasExtraFinalStyles = true;
            }
        });
        if (hasExtraFinalStyles) {
            finalKeyframe.styles.styles.push(extraFinalKeyframeStyles);
        }
        Object.keys(flatenedFinalKeyframeStyles).forEach(function (prop) {
            if (!isPresent(flatenedFirstKeyframeStyles[prop])) {
                extraFirstKeyframeStyles[prop] = AUTO_STYLE;
                hasExtraFirstStyles = true;
            }
        });
        if (hasExtraFirstStyles) {
            firstKeyframe.styles.styles.push(extraFirstKeyframeStyles);
        }
        collectAndResolveStyles(collectedStyles, [finalStateStyles]);
        return keyframes;
    }
    /**
     * @param {?} styles
     * @return {?}
     */
    function clearStyles(styles) {
        var /** @type {?} */ finalStyles = {};
        Object.keys(styles).forEach(function (key) { finalStyles[key] = null; });
        return finalStyles;
    }
    /**
     * @param {?} collection
     * @param {?} styles
     * @return {?}
     */
    function collectAndResolveStyles(collection, styles) {
        return styles.map(function (entry) {
            var /** @type {?} */ stylesObj = {};
            Object.keys(entry).forEach(function (prop) {
                var /** @type {?} */ value = entry[prop];
                if (value == FILL_STYLE_FLAG) {
                    value = collection[prop];
                    if (!isPresent(value)) {
                        value = AUTO_STYLE;
                    }
                }
                collection[prop] = value;
                stylesObj[prop] = value;
            });
            return stylesObj;
        });
    }
    /**
     * @param {?} element
     * @param {?} renderer
     * @param {?} styles
     * @return {?}
     */
    function renderStyles(element, renderer, styles) {
        Object.keys(styles).forEach(function (prop) { renderer.setElementStyle(element, prop, styles[prop]); });
    }
    /**
     * @param {?} styles
     * @return {?}
     */
    function flattenStyles(styles) {
        var /** @type {?} */ finalStyles = {};
        styles.forEach(function (entry) {
            Object.keys(entry).forEach(function (prop) { finalStyles[prop] = (entry[prop]); });
        });
        return finalStyles;
    }

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * `AnimationStyles` consists of a collection of key/value maps containing CSS-based style data
     * that can either be used as initial styling data or apart of a series of keyframes within an
     * animation.
     * This class is mostly internal, and it is designed to be used alongside
     * {\@link AnimationKeyframe `AnimationKeyframe`} and {\@link Renderer#animate-anchor
     * `Renderer.animate`}.
     *
     * \@experimental Animation support is experimental
     */
    var AnimationStyles = (function () {
        /**
         * @param {?} styles
         */
        function AnimationStyles(styles) {
            this.styles = styles;
        }
        return AnimationStyles;
    }());

    /**
     * An instance of this class is returned as an event parameter when an animation
     * callback is captured for an animation either during the start or done phase.
     *
     * ```typescript
     * \@Component({
     *   host: {
     *     '[\@myAnimationTrigger]': 'someExpression',
     *     '(\@myAnimationTrigger.start)': 'captureStartEvent($event)',
     *     '(\@myAnimationTrigger.done)': 'captureDoneEvent($event)',
     *   },
     *   animations: [
     *     trigger("myAnimationTrigger", [
     *        // ...
     *     ])
     *   ]
     * })
     * class MyComponent {
     *   someExpression: any = false;
     *   captureStartEvent(event: AnimationTransitionEvent) {
     *     // the toState, fromState and totalTime data is accessible from the event variable
     *   }
     *
     *   captureDoneEvent(event: AnimationTransitionEvent) {
     *     // the toState, fromState and totalTime data is accessible from the event variable
     *   }
     * }
     * ```
     *
     * \@experimental Animation support is experimental.
     */
    var AnimationTransitionEvent = (function () {
        /**
         * @param {?} __0
         */
        function AnimationTransitionEvent(_a) {
            var fromState = _a.fromState, toState = _a.toState, totalTime = _a.totalTime, phaseName = _a.phaseName;
            this.fromState = fromState;
            this.toState = toState;
            this.totalTime = totalTime;
            this.phaseName = phaseName;
        }
        return AnimationTransitionEvent;
    }());

    var AnimationTransition = (function () {
        /**
         * @param {?} _player
         * @param {?} _fromState
         * @param {?} _toState
         * @param {?} _totalTime
         */
        function AnimationTransition(_player, _fromState, _toState, _totalTime) {
            this._player = _player;
            this._fromState = _fromState;
            this._toState = _toState;
            this._totalTime = _totalTime;
        }
        /**
         * @param {?} phaseName
         * @return {?}
         */
        AnimationTransition.prototype._createEvent = function (phaseName) {
            return new AnimationTransitionEvent({
                fromState: this._fromState,
                toState: this._toState,
                totalTime: this._totalTime,
                phaseName: phaseName
            });
        };
        /**
         * @param {?} callback
         * @return {?}
         */
        AnimationTransition.prototype.onStart = function (callback) {
            var _this = this;
            var /** @type {?} */ fn = (Zone.current.wrap(function () { return callback(_this._createEvent('start')); }, 'player.onStart'));
            this._player.onStart(fn);
        };
        /**
         * @param {?} callback
         * @return {?}
         */
        AnimationTransition.prototype.onDone = function (callback) {
            var _this = this;
            var /** @type {?} */ fn = (Zone.current.wrap(function () { return callback(_this._createEvent('done')); }, 'player.onDone'));
            this._player.onDone(fn);
        };
        return AnimationTransition;
    }());

    var DebugDomRootRenderer = (function () {
        /**
         * @param {?} _delegate
         */
        function DebugDomRootRenderer(_delegate) {
            this._delegate = _delegate;
        }
        /**
         * @param {?} componentProto
         * @return {?}
         */
        DebugDomRootRenderer.prototype.renderComponent = function (componentProto) {
            return new DebugDomRenderer(this._delegate.renderComponent(componentProto));
        };
        return DebugDomRootRenderer;
    }());
    var DebugDomRenderer = (function () {
        /**
         * @param {?} _delegate
         */
        function DebugDomRenderer(_delegate) {
            this._delegate = _delegate;
        }
        /**
         * @param {?} selectorOrNode
         * @param {?=} debugInfo
         * @return {?}
         */
        DebugDomRenderer.prototype.selectRootElement = function (selectorOrNode, debugInfo) {
            var /** @type {?} */ nativeEl = this._delegate.selectRootElement(selectorOrNode, debugInfo);
            var /** @type {?} */ debugEl = new DebugElement(nativeEl, null, debugInfo);
            indexDebugNode(debugEl);
            return nativeEl;
        };
        /**
         * @param {?} parentElement
         * @param {?} name
         * @param {?=} debugInfo
         * @return {?}
         */
        DebugDomRenderer.prototype.createElement = function (parentElement, name, debugInfo) {
            var /** @type {?} */ nativeEl = this._delegate.createElement(parentElement, name, debugInfo);
            var /** @type {?} */ debugEl = new DebugElement(nativeEl, getDebugNode(parentElement), debugInfo);
            debugEl.name = name;
            indexDebugNode(debugEl);
            return nativeEl;
        };
        /**
         * @param {?} hostElement
         * @return {?}
         */
        DebugDomRenderer.prototype.createViewRoot = function (hostElement) { return this._delegate.createViewRoot(hostElement); };
        /**
         * @param {?} parentElement
         * @param {?=} debugInfo
         * @return {?}
         */
        DebugDomRenderer.prototype.createTemplateAnchor = function (parentElement, debugInfo) {
            var /** @type {?} */ comment = this._delegate.createTemplateAnchor(parentElement, debugInfo);
            var /** @type {?} */ debugEl = new DebugNode(comment, getDebugNode(parentElement), debugInfo);
            indexDebugNode(debugEl);
            return comment;
        };
        /**
         * @param {?} parentElement
         * @param {?} value
         * @param {?=} debugInfo
         * @return {?}
         */
        DebugDomRenderer.prototype.createText = function (parentElement, value, debugInfo) {
            var /** @type {?} */ text = this._delegate.createText(parentElement, value, debugInfo);
            var /** @type {?} */ debugEl = new DebugNode(text, getDebugNode(parentElement), debugInfo);
            indexDebugNode(debugEl);
            return text;
        };
        /**
         * @param {?} parentElement
         * @param {?} nodes
         * @return {?}
         */
        DebugDomRenderer.prototype.projectNodes = function (parentElement, nodes) {
            var /** @type {?} */ debugParent = getDebugNode(parentElement);
            if (isPresent(debugParent) && debugParent instanceof DebugElement) {
                var /** @type {?} */ debugElement_1 = debugParent;
                nodes.forEach(function (node) { debugElement_1.addChild(getDebugNode(node)); });
            }
            this._delegate.projectNodes(parentElement, nodes);
        };
        /**
         * @param {?} node
         * @param {?} viewRootNodes
         * @return {?}
         */
        DebugDomRenderer.prototype.attachViewAfter = function (node, viewRootNodes) {
            var /** @type {?} */ debugNode = getDebugNode(node);
            if (isPresent(debugNode)) {
                var /** @type {?} */ debugParent = debugNode.parent;
                if (viewRootNodes.length > 0 && isPresent(debugParent)) {
                    var /** @type {?} */ debugViewRootNodes_1 = [];
                    viewRootNodes.forEach(function (rootNode) { return debugViewRootNodes_1.push(getDebugNode(rootNode)); });
                    debugParent.insertChildrenAfter(debugNode, debugViewRootNodes_1);
                }
            }
            this._delegate.attachViewAfter(node, viewRootNodes);
        };
        /**
         * @param {?} viewRootNodes
         * @return {?}
         */
        DebugDomRenderer.prototype.detachView = function (viewRootNodes) {
            viewRootNodes.forEach(function (node) {
                var /** @type {?} */ debugNode = getDebugNode(node);
                if (isPresent(debugNode) && isPresent(debugNode.parent)) {
                    debugNode.parent.removeChild(debugNode);
                }
            });
            this._delegate.detachView(viewRootNodes);
        };
        /**
         * @param {?} hostElement
         * @param {?} viewAllNodes
         * @return {?}
         */
        DebugDomRenderer.prototype.destroyView = function (hostElement, viewAllNodes) {
            viewAllNodes = viewAllNodes || [];
            viewAllNodes.forEach(function (node) { removeDebugNodeFromIndex(getDebugNode(node)); });
            this._delegate.destroyView(hostElement, viewAllNodes);
        };
        /**
         * @param {?} renderElement
         * @param {?} name
         * @param {?} callback
         * @return {?}
         */
        DebugDomRenderer.prototype.listen = function (renderElement, name, callback) {
            var /** @type {?} */ debugEl = getDebugNode(renderElement);
            if (isPresent(debugEl)) {
                debugEl.listeners.push(new EventListener(name, callback));
            }
            return this._delegate.listen(renderElement, name, callback);
        };
        /**
         * @param {?} target
         * @param {?} name
         * @param {?} callback
         * @return {?}
         */
        DebugDomRenderer.prototype.listenGlobal = function (target, name, callback) {
            return this._delegate.listenGlobal(target, name, callback);
        };
        /**
         * @param {?} renderElement
         * @param {?} propertyName
         * @param {?} propertyValue
         * @return {?}
         */
        DebugDomRenderer.prototype.setElementProperty = function (renderElement, propertyName, propertyValue) {
            var /** @type {?} */ debugEl = getDebugNode(renderElement);
            if (isPresent(debugEl) && debugEl instanceof DebugElement) {
                debugEl.properties[propertyName] = propertyValue;
            }
            this._delegate.setElementProperty(renderElement, propertyName, propertyValue);
        };
        /**
         * @param {?} renderElement
         * @param {?} attributeName
         * @param {?} attributeValue
         * @return {?}
         */
        DebugDomRenderer.prototype.setElementAttribute = function (renderElement, attributeName, attributeValue) {
            var /** @type {?} */ debugEl = getDebugNode(renderElement);
            if (isPresent(debugEl) && debugEl instanceof DebugElement) {
                debugEl.attributes[attributeName] = attributeValue;
            }
            this._delegate.setElementAttribute(renderElement, attributeName, attributeValue);
        };
        /**
         * @param {?} renderElement
         * @param {?} propertyName
         * @param {?} propertyValue
         * @return {?}
         */
        DebugDomRenderer.prototype.setBindingDebugInfo = function (renderElement, propertyName, propertyValue) {
            this._delegate.setBindingDebugInfo(renderElement, propertyName, propertyValue);
        };
        /**
         * @param {?} renderElement
         * @param {?} className
         * @param {?} isAdd
         * @return {?}
         */
        DebugDomRenderer.prototype.setElementClass = function (renderElement, className, isAdd) {
            var /** @type {?} */ debugEl = getDebugNode(renderElement);
            if (isPresent(debugEl) && debugEl instanceof DebugElement) {
                debugEl.classes[className] = isAdd;
            }
            this._delegate.setElementClass(renderElement, className, isAdd);
        };
        /**
         * @param {?} renderElement
         * @param {?} styleName
         * @param {?} styleValue
         * @return {?}
         */
        DebugDomRenderer.prototype.setElementStyle = function (renderElement, styleName, styleValue) {
            var /** @type {?} */ debugEl = getDebugNode(renderElement);
            if (isPresent(debugEl) && debugEl instanceof DebugElement) {
                debugEl.styles[styleName] = styleValue;
            }
            this._delegate.setElementStyle(renderElement, styleName, styleValue);
        };
        /**
         * @param {?} renderElement
         * @param {?} methodName
         * @param {?=} args
         * @return {?}
         */
        DebugDomRenderer.prototype.invokeElementMethod = function (renderElement, methodName, args) {
            this._delegate.invokeElementMethod(renderElement, methodName, args);
        };
        /**
         * @param {?} renderNode
         * @param {?} text
         * @return {?}
         */
        DebugDomRenderer.prototype.setText = function (renderNode, text) { this._delegate.setText(renderNode, text); };
        /**
         * @param {?} element
         * @param {?} startingStyles
         * @param {?} keyframes
         * @param {?} duration
         * @param {?} delay
         * @param {?} easing
         * @param {?=} previousPlayers
         * @return {?}
         */
        DebugDomRenderer.prototype.animate = function (element, startingStyles, keyframes, duration, delay, easing, previousPlayers) {
            if (previousPlayers === void 0) { previousPlayers = []; }
            return this._delegate.animate(element, startingStyles, keyframes, duration, delay, easing, previousPlayers);
        };
        return DebugDomRenderer;
    }());

    var ViewType = {};
    ViewType.HOST = 0;
    ViewType.COMPONENT = 1;
    ViewType.EMBEDDED = 2;
    ViewType[ViewType.HOST] = "HOST";
    ViewType[ViewType.COMPONENT] = "COMPONENT";
    ViewType[ViewType.EMBEDDED] = "EMBEDDED";

    var StaticNodeDebugInfo = (function () {
        /**
         * @param {?} providerTokens
         * @param {?} componentToken
         * @param {?} refTokens
         */
        function StaticNodeDebugInfo(providerTokens, componentToken, refTokens) {
            this.providerTokens = providerTokens;
            this.componentToken = componentToken;
            this.refTokens = refTokens;
        }
        return StaticNodeDebugInfo;
    }());
    var DebugContext = (function () {
        /**
         * @param {?} _view
         * @param {?} _nodeIndex
         * @param {?} _tplRow
         * @param {?} _tplCol
         */
        function DebugContext(_view, _nodeIndex, _tplRow, _tplCol) {
            this._view = _view;
            this._nodeIndex = _nodeIndex;
            this._tplRow = _tplRow;
            this._tplCol = _tplCol;
        }
        Object.defineProperty(DebugContext.prototype, "_staticNodeInfo", {
            /**
             * @return {?}
             */
            get: function () {
                return isPresent(this._nodeIndex) ? this._view.staticNodeDebugInfos[this._nodeIndex] : null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DebugContext.prototype, "context", {
            /**
             * @return {?}
             */
            get: function () { return this._view.context; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DebugContext.prototype, "component", {
            /**
             * @return {?}
             */
            get: function () {
                var /** @type {?} */ staticNodeInfo = this._staticNodeInfo;
                if (isPresent(staticNodeInfo) && isPresent(staticNodeInfo.componentToken)) {
                    return this.injector.get(staticNodeInfo.componentToken);
                }
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DebugContext.prototype, "componentRenderElement", {
            /**
             * @return {?}
             */
            get: function () {
                var /** @type {?} */ componentView = this._view;
                while (isPresent(componentView.parentView) && componentView.type !== ViewType.COMPONENT) {
                    componentView = (componentView.parentView);
                }
                return componentView.parentElement;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DebugContext.prototype, "injector", {
            /**
             * @return {?}
             */
            get: function () { return this._view.injector(this._nodeIndex); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DebugContext.prototype, "renderNode", {
            /**
             * @return {?}
             */
            get: function () {
                if (isPresent(this._nodeIndex) && this._view.allNodes) {
                    return this._view.allNodes[this._nodeIndex];
                }
                else {
                    return null;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DebugContext.prototype, "providerTokens", {
            /**
             * @return {?}
             */
            get: function () {
                var /** @type {?} */ staticNodeInfo = this._staticNodeInfo;
                return isPresent(staticNodeInfo) ? staticNodeInfo.providerTokens : null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DebugContext.prototype, "source", {
            /**
             * @return {?}
             */
            get: function () {
                return this._view.componentType.templateUrl + ":" + this._tplRow + ":" + this._tplCol;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DebugContext.prototype, "references", {
            /**
             * @return {?}
             */
            get: function () {
                var _this = this;
                var /** @type {?} */ varValues = {};
                var /** @type {?} */ staticNodeInfo = this._staticNodeInfo;
                if (isPresent(staticNodeInfo)) {
                    var /** @type {?} */ refs_1 = staticNodeInfo.refTokens;
                    Object.keys(refs_1).forEach(function (refName) {
                        var /** @type {?} */ refToken = refs_1[refName];
                        var /** @type {?} */ varValue;
                        if (isBlank(refToken)) {
                            varValue = _this._view.allNodes ? _this._view.allNodes[_this._nodeIndex] : null;
                        }
                        else {
                            varValue = _this._view.injectorGet(refToken, _this._nodeIndex, null);
                        }
                        varValues[refName] = varValue;
                    });
                }
                return varValues;
            },
            enumerable: true,
            configurable: true
        });
        return DebugContext;
    }());

    var ViewAnimationMap = (function () {
        function ViewAnimationMap() {
            this._map = new Map();
            this._allPlayers = [];
        }
        /**
         * @param {?} element
         * @param {?} animationName
         * @return {?}
         */
        ViewAnimationMap.prototype.find = function (element, animationName) {
            var /** @type {?} */ playersByAnimation = this._map.get(element);
            if (isPresent(playersByAnimation)) {
                return playersByAnimation[animationName];
            }
        };
        /**
         * @param {?} element
         * @return {?}
         */
        ViewAnimationMap.prototype.findAllPlayersByElement = function (element) {
            var /** @type {?} */ el = this._map.get(element);
            return el ? Object.keys(el).map(function (k) { return el[k]; }) : [];
        };
        /**
         * @param {?} element
         * @param {?} animationName
         * @param {?} player
         * @return {?}
         */
        ViewAnimationMap.prototype.set = function (element, animationName, player) {
            var /** @type {?} */ playersByAnimation = this._map.get(element);
            if (!isPresent(playersByAnimation)) {
                playersByAnimation = {};
            }
            var /** @type {?} */ existingEntry = playersByAnimation[animationName];
            if (isPresent(existingEntry)) {
                this.remove(element, animationName);
            }
            playersByAnimation[animationName] = player;
            this._allPlayers.push(player);
            this._map.set(element, playersByAnimation);
        };
        /**
         * @return {?}
         */
        ViewAnimationMap.prototype.getAllPlayers = function () { return this._allPlayers; };
        /**
         * @param {?} element
         * @param {?} animationName
         * @param {?=} targetPlayer
         * @return {?}
         */
        ViewAnimationMap.prototype.remove = function (element, animationName, targetPlayer) {
            if (targetPlayer === void 0) { targetPlayer = null; }
            var /** @type {?} */ playersByAnimation = this._map.get(element);
            if (playersByAnimation) {
                var /** @type {?} */ player = playersByAnimation[animationName];
                if (!targetPlayer || player === targetPlayer) {
                    delete playersByAnimation[animationName];
                    var /** @type {?} */ index = this._allPlayers.indexOf(player);
                    this._allPlayers.splice(index, 1);
                    if (Object.keys(playersByAnimation).length === 0) {
                        this._map.delete(element);
                    }
                }
            }
        };
        return ViewAnimationMap;
    }());

    var AnimationViewContext = (function () {
        /**
         * @param {?} _animationQueue
         */
        function AnimationViewContext(_animationQueue) {
            this._animationQueue = _animationQueue;
            this._players = new ViewAnimationMap();
        }
        /**
         * @param {?} callback
         * @return {?}
         */
        AnimationViewContext.prototype.onAllActiveAnimationsDone = function (callback) {
            var /** @type {?} */ activeAnimationPlayers = this._players.getAllPlayers();
            // we check for the length to avoid having GroupAnimationPlayer
            // issue an unnecessary microtask when zero players are passed in
            if (activeAnimationPlayers.length) {
                new AnimationGroupPlayer(activeAnimationPlayers).onDone(function () { return callback(); });
            }
            else {
                callback();
            }
        };
        /**
         * @param {?} element
         * @param {?} animationName
         * @param {?} player
         * @return {?}
         */
        AnimationViewContext.prototype.queueAnimation = function (element, animationName, player) {
            var _this = this;
            this._animationQueue.enqueue(player);
            this._players.set(element, animationName, player);
            player.onDone(function () { return _this._players.remove(element, animationName, player); });
        };
        /**
         * @param {?} element
         * @param {?=} animationName
         * @return {?}
         */
        AnimationViewContext.prototype.getAnimationPlayers = function (element, animationName) {
            if (animationName === void 0) { animationName = null; }
            var /** @type {?} */ players = [];
            if (animationName) {
                var /** @type {?} */ currentPlayer = this._players.find(element, animationName);
                if (currentPlayer) {
                    _recursePlayers(currentPlayer, players);
                }
            }
            else {
                this._players.findAllPlayersByElement(element).forEach(function (player) { return _recursePlayers(player, players); });
            }
            return players;
        };
        return AnimationViewContext;
    }());
    /**
     * @param {?} player
     * @param {?} collectedPlayers
     * @return {?}
     */
    function _recursePlayers(player, collectedPlayers) {
        if ((player instanceof AnimationGroupPlayer) || (player instanceof AnimationSequencePlayer)) {
            player.players.forEach(function (player) { return _recursePlayers(player, collectedPlayers); });
        }
        else {
            collectedPlayers.push(player);
        }
    }

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var __extends$15 = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var ElementInjector = (function (_super) {
        __extends$15(ElementInjector, _super);
        /**
         * @param {?} _view
         * @param {?} _nodeIndex
         */
        function ElementInjector(_view, _nodeIndex) {
            _super.call(this);
            this._view = _view;
            this._nodeIndex = _nodeIndex;
        }
        /**
         * @param {?} token
         * @param {?=} notFoundValue
         * @return {?}
         */
        ElementInjector.prototype.get = function (token, notFoundValue) {
            if (notFoundValue === void 0) { notFoundValue = THROW_IF_NOT_FOUND; }
            return this._view.injectorGet(token, this._nodeIndex, notFoundValue);
        };
        return ElementInjector;
    }(Injector));

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var __extends$14 = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var /** @type {?} */ _scope_check = wtfCreateScope("AppView#check(ascii id)");
    /**
     * @experimental
     */
    var /** @type {?} */ EMPTY_CONTEXT = new Object();
    var /** @type {?} */ UNDEFINED$1 = new Object();
    /**
     * Cost of making objects: http://jsperf.com/instantiate-size-of-object
     *
     * @abstract
     */
    var AppView = (function () {
        /**
         * @param {?} clazz
         * @param {?} componentType
         * @param {?} type
         * @param {?} viewUtils
         * @param {?} parentView
         * @param {?} parentIndex
         * @param {?} parentElement
         * @param {?} cdMode
         * @param {?=} declaredViewContainer
         */
        function AppView(clazz, componentType, type, viewUtils, parentView, parentIndex, parentElement, cdMode, declaredViewContainer) {
            if (declaredViewContainer === void 0) { declaredViewContainer = null; }
            this.clazz = clazz;
            this.componentType = componentType;
            this.type = type;
            this.viewUtils = viewUtils;
            this.parentView = parentView;
            this.parentIndex = parentIndex;
            this.parentElement = parentElement;
            this.cdMode = cdMode;
            this.declaredViewContainer = declaredViewContainer;
            this.numberOfChecks = 0;
            this.ref = new ViewRef_(this, viewUtils.animationQueue);
            if (type === ViewType.COMPONENT || type === ViewType.HOST) {
                this.renderer = viewUtils.renderComponent(componentType);
            }
            else {
                this.renderer = parentView.renderer;
            }
            this._directRenderer = this.renderer.directRenderer;
        }
        Object.defineProperty(AppView.prototype, "animationContext", {
            /**
             * @return {?}
             */
            get: function () {
                if (!this._animationContext) {
                    this._animationContext = new AnimationViewContext(this.viewUtils.animationQueue);
                }
                return this._animationContext;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppView.prototype, "destroyed", {
            /**
             * @return {?}
             */
            get: function () { return this.cdMode === ChangeDetectorStatus.Destroyed; },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} context
         * @return {?}
         */
        AppView.prototype.create = function (context) {
            this.context = context;
            return this.createInternal(null);
        };
        /**
         * @param {?} rootSelectorOrNode
         * @param {?} hostInjector
         * @param {?} projectableNodes
         * @return {?}
         */
        AppView.prototype.createHostView = function (rootSelectorOrNode, hostInjector, projectableNodes) {
            this.context = (EMPTY_CONTEXT);
            this._hasExternalHostElement = isPresent(rootSelectorOrNode);
            this._hostInjector = hostInjector;
            this._hostProjectableNodes = projectableNodes;
            return this.createInternal(rootSelectorOrNode);
        };
        /**
         * Overwritten by implementations.
         * Returns the ComponentRef for the host element for ViewType.HOST.
         * @param {?} rootSelectorOrNode
         * @return {?}
         */
        AppView.prototype.createInternal = function (rootSelectorOrNode) { return null; };
        /**
         * Overwritten by implementations.
         * @param {?} templateNodeIndex
         * @return {?}
         */
        AppView.prototype.createEmbeddedViewInternal = function (templateNodeIndex) { return null; };
        /**
         * @param {?} lastRootNode
         * @param {?} allNodes
         * @param {?} disposables
         * @return {?}
         */
        AppView.prototype.init = function (lastRootNode, allNodes, disposables) {
            this.lastRootNode = lastRootNode;
            this.allNodes = allNodes;
            this.disposables = disposables;
            if (this.type === ViewType.COMPONENT) {
                this.dirtyParentQueriesInternal();
            }
        };
        /**
         * @param {?} token
         * @param {?} nodeIndex
         * @param {?=} notFoundValue
         * @return {?}
         */
        AppView.prototype.injectorGet = function (token, nodeIndex, notFoundValue) {
            if (notFoundValue === void 0) { notFoundValue = THROW_IF_NOT_FOUND; }
            var /** @type {?} */ result = UNDEFINED$1;
            var /** @type {?} */ view = this;
            while (result === UNDEFINED$1) {
                if (isPresent(nodeIndex)) {
                    result = view.injectorGetInternal(token, nodeIndex, UNDEFINED$1);
                }
                if (result === UNDEFINED$1 && view.type === ViewType.HOST) {
                    result = view._hostInjector.get(token, notFoundValue);
                }
                nodeIndex = view.parentIndex;
                view = view.parentView;
            }
            return result;
        };
        /**
         * Overwritten by implementations
         * @param {?} token
         * @param {?} nodeIndex
         * @param {?} notFoundResult
         * @return {?}
         */
        AppView.prototype.injectorGetInternal = function (token, nodeIndex, notFoundResult) {
            return notFoundResult;
        };
        /**
         * @param {?} nodeIndex
         * @return {?}
         */
        AppView.prototype.injector = function (nodeIndex) { return new ElementInjector(this, nodeIndex); };
        /**
         * @return {?}
         */
        AppView.prototype.detachAndDestroy = function () {
            if (this.viewContainer) {
                this.viewContainer.detachView(this.viewContainer.nestedViews.indexOf(this));
            }
            else if (this.appRef) {
                this.appRef.detachView(this.ref);
            }
            else if (this._hasExternalHostElement) {
                this.detach();
            }
            this.destroy();
        };
        /**
         * @return {?}
         */
        AppView.prototype.destroy = function () {
            var _this = this;
            if (this.cdMode === ChangeDetectorStatus.Destroyed) {
                return;
            }
            var /** @type {?} */ hostElement = this.type === ViewType.COMPONENT ? this.parentElement : null;
            if (this.disposables) {
                for (var /** @type {?} */ i = 0; i < this.disposables.length; i++) {
                    this.disposables[i]();
                }
            }
            this.destroyInternal();
            this.dirtyParentQueriesInternal();
            if (this._animationContext) {
                this._animationContext.onAllActiveAnimationsDone(function () { return _this.renderer.destroyView(hostElement, _this.allNodes); });
            }
            else {
                this.renderer.destroyView(hostElement, this.allNodes);
            }
            this.cdMode = ChangeDetectorStatus.Destroyed;
        };
        /**
         * Overwritten by implementations
         * @return {?}
         */
        AppView.prototype.destroyInternal = function () { };
        /**
         * Overwritten by implementations
         * @return {?}
         */
        AppView.prototype.detachInternal = function () { };
        /**
         * @return {?}
         */
        AppView.prototype.detach = function () {
            var _this = this;
            this.detachInternal();
            if (this._animationContext) {
                this._animationContext.onAllActiveAnimationsDone(function () { return _this._renderDetach(); });
            }
            else {
                this._renderDetach();
            }
            if (this.declaredViewContainer && this.declaredViewContainer !== this.viewContainer &&
                this.declaredViewContainer.projectedViews) {
                var /** @type {?} */ projectedViews = this.declaredViewContainer.projectedViews;
                var /** @type {?} */ index = projectedViews.indexOf(this);
                // perf: pop is faster than splice!
                if (index >= projectedViews.length - 1) {
                    projectedViews.pop();
                }
                else {
                    projectedViews.splice(index, 1);
                }
            }
            this.appRef = null;
            this.viewContainer = null;
            this.dirtyParentQueriesInternal();
        };
        /**
         * @return {?}
         */
        AppView.prototype._renderDetach = function () {
            if (this._directRenderer) {
                this.visitRootNodesInternal(this._directRenderer.remove, null);
            }
            else {
                this.renderer.detachView(this.flatRootNodes);
            }
        };
        /**
         * @param {?} appRef
         * @return {?}
         */
        AppView.prototype.attachToAppRef = function (appRef) {
            if (this.viewContainer) {
                throw new Error('This view is already attached to a ViewContainer!');
            }
            this.appRef = appRef;
            this.dirtyParentQueriesInternal();
        };
        /**
         * @param {?} viewContainer
         * @param {?} prevView
         * @return {?}
         */
        AppView.prototype.attachAfter = function (viewContainer, prevView) {
            if (this.appRef) {
                throw new Error('This view is already attached directly to the ApplicationRef!');
            }
            this._renderAttach(viewContainer, prevView);
            this.viewContainer = viewContainer;
            if (this.declaredViewContainer && this.declaredViewContainer !== viewContainer) {
                if (!this.declaredViewContainer.projectedViews) {
                    this.declaredViewContainer.projectedViews = [];
                }
                this.declaredViewContainer.projectedViews.push(this);
            }
            this.dirtyParentQueriesInternal();
        };
        /**
         * @param {?} viewContainer
         * @param {?} prevView
         * @return {?}
         */
        AppView.prototype.moveAfter = function (viewContainer, prevView) {
            this._renderAttach(viewContainer, prevView);
            this.dirtyParentQueriesInternal();
        };
        /**
         * @param {?} viewContainer
         * @param {?} prevView
         * @return {?}
         */
        AppView.prototype._renderAttach = function (viewContainer, prevView) {
            var /** @type {?} */ prevNode = prevView ? prevView.lastRootNode : viewContainer.nativeElement;
            if (this._directRenderer) {
                var /** @type {?} */ nextSibling = this._directRenderer.nextSibling(prevNode);
                if (nextSibling) {
                    this.visitRootNodesInternal(this._directRenderer.insertBefore, nextSibling);
                }
                else {
                    var /** @type {?} */ parentElement = this._directRenderer.parentElement(prevNode);
                    if (parentElement) {
                        this.visitRootNodesInternal(this._directRenderer.appendChild, parentElement);
                    }
                }
            }
            else {
                this.renderer.attachViewAfter(prevNode, this.flatRootNodes);
            }
        };
        Object.defineProperty(AppView.prototype, "changeDetectorRef", {
            /**
             * @return {?}
             */
            get: function () { return this.ref; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppView.prototype, "flatRootNodes", {
            /**
             * @return {?}
             */
            get: function () {
                var /** @type {?} */ nodes = [];
                this.visitRootNodesInternal(addToArray, nodes);
                return nodes;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} parentElement
         * @param {?} ngContentIndex
         * @return {?}
         */
        AppView.prototype.projectNodes = function (parentElement, ngContentIndex) {
            if (this._directRenderer) {
                this.visitProjectedNodes(ngContentIndex, this._directRenderer.appendChild, parentElement);
            }
            else {
                var /** @type {?} */ nodes = [];
                this.visitProjectedNodes(ngContentIndex, addToArray, nodes);
                this.renderer.projectNodes(parentElement, nodes);
            }
        };
        /**
         * @param {?} ngContentIndex
         * @param {?} cb
         * @param {?} c
         * @return {?}
         */
        AppView.prototype.visitProjectedNodes = function (ngContentIndex, cb, c) {
            switch (this.type) {
                case ViewType.EMBEDDED:
                    this.parentView.visitProjectedNodes(ngContentIndex, cb, c);
                    break;
                case ViewType.COMPONENT:
                    if (this.parentView.type === ViewType.HOST) {
                        var /** @type {?} */ nodes = this.parentView._hostProjectableNodes[ngContentIndex] || [];
                        for (var /** @type {?} */ i = 0; i < nodes.length; i++) {
                            cb(nodes[i], c);
                        }
                    }
                    else {
                        this.parentView.visitProjectableNodesInternal(this.parentIndex, ngContentIndex, cb, c);
                    }
                    break;
            }
        };
        /**
         * Overwritten by implementations
         * @param {?} cb
         * @param {?} c
         * @return {?}
         */
        AppView.prototype.visitRootNodesInternal = function (cb, c) { };
        /**
         * Overwritten by implementations
         * @param {?} nodeIndex
         * @param {?} ngContentIndex
         * @param {?} cb
         * @param {?} c
         * @return {?}
         */
        AppView.prototype.visitProjectableNodesInternal = function (nodeIndex, ngContentIndex, cb, c) { };
        /**
         * Overwritten by implementations
         * @return {?}
         */
        AppView.prototype.dirtyParentQueriesInternal = function () { };
        /**
         * @param {?} throwOnChange
         * @return {?}
         */
        AppView.prototype.internalDetectChanges = function (throwOnChange) {
            if (this.cdMode !== ChangeDetectorStatus.Detached) {
                this.detectChanges(throwOnChange);
            }
        };
        /**
         * @param {?} throwOnChange
         * @return {?}
         */
        AppView.prototype.detectChanges = function (throwOnChange) {
            var /** @type {?} */ s = _scope_check(this.clazz);
            if (this.cdMode === ChangeDetectorStatus.Checked ||
                this.cdMode === ChangeDetectorStatus.Errored)
                return;
            if (this.cdMode === ChangeDetectorStatus.Destroyed) {
                this.throwDestroyedError('detectChanges');
            }
            this.detectChangesInternal(throwOnChange);
            if (this.cdMode === ChangeDetectorStatus.CheckOnce)
                this.cdMode = ChangeDetectorStatus.Checked;
            this.numberOfChecks++;
            wtfLeave(s);
        };
        /**
         * Overwritten by implementations
         * @param {?} throwOnChange
         * @return {?}
         */
        AppView.prototype.detectChangesInternal = function (throwOnChange) { };
        /**
         * @return {?}
         */
        AppView.prototype.markAsCheckOnce = function () { this.cdMode = ChangeDetectorStatus.CheckOnce; };
        /**
         * @return {?}
         */
        AppView.prototype.markPathToRootAsCheckOnce = function () {
            var /** @type {?} */ c = this;
            while (isPresent(c) && c.cdMode !== ChangeDetectorStatus.Detached) {
                if (c.cdMode === ChangeDetectorStatus.Checked) {
                    c.cdMode = ChangeDetectorStatus.CheckOnce;
                }
                if (c.type === ViewType.COMPONENT) {
                    c = c.parentView;
                }
                else {
                    c = c.viewContainer ? c.viewContainer.parentView : null;
                }
            }
        };
        /**
         * @param {?} cb
         * @return {?}
         */
        AppView.prototype.eventHandler = function (cb) {
            return cb;
        };
        /**
         * @param {?} details
         * @return {?}
         */
        AppView.prototype.throwDestroyedError = function (details) { throw new ViewDestroyedError(details); };
        return AppView;
    }());
    var DebugAppView = (function (_super) {
        __extends$14(DebugAppView, _super);
        /**
         * @param {?} clazz
         * @param {?} componentType
         * @param {?} type
         * @param {?} viewUtils
         * @param {?} parentView
         * @param {?} parentIndex
         * @param {?} parentNode
         * @param {?} cdMode
         * @param {?} staticNodeDebugInfos
         * @param {?=} declaredViewContainer
         */
        function DebugAppView(clazz, componentType, type, viewUtils, parentView, parentIndex, parentNode, cdMode, staticNodeDebugInfos, declaredViewContainer) {
            if (declaredViewContainer === void 0) { declaredViewContainer = null; }
            _super.call(this, clazz, componentType, type, viewUtils, parentView, parentIndex, parentNode, cdMode, declaredViewContainer);
            this.staticNodeDebugInfos = staticNodeDebugInfos;
            this._currentDebugContext = null;
        }
        /**
         * @param {?} context
         * @return {?}
         */
        DebugAppView.prototype.create = function (context) {
            this._resetDebug();
            try {
                return _super.prototype.create.call(this, context);
            }
            catch (e) {
                this._rethrowWithContext(e);
                throw e;
            }
        };
        /**
         * @param {?} rootSelectorOrNode
         * @param {?} injector
         * @param {?=} projectableNodes
         * @return {?}
         */
        DebugAppView.prototype.createHostView = function (rootSelectorOrNode, injector, projectableNodes) {
            if (projectableNodes === void 0) { projectableNodes = null; }
            this._resetDebug();
            try {
                return _super.prototype.createHostView.call(this, rootSelectorOrNode, injector, projectableNodes);
            }
            catch (e) {
                this._rethrowWithContext(e);
                throw e;
            }
        };
        /**
         * @param {?} token
         * @param {?} nodeIndex
         * @param {?=} notFoundResult
         * @return {?}
         */
        DebugAppView.prototype.injectorGet = function (token, nodeIndex, notFoundResult) {
            this._resetDebug();
            try {
                return _super.prototype.injectorGet.call(this, token, nodeIndex, notFoundResult);
            }
            catch (e) {
                this._rethrowWithContext(e);
                throw e;
            }
        };
        /**
         * @return {?}
         */
        DebugAppView.prototype.detach = function () {
            this._resetDebug();
            try {
                _super.prototype.detach.call(this);
            }
            catch (e) {
                this._rethrowWithContext(e);
                throw e;
            }
        };
        /**
         * @return {?}
         */
        DebugAppView.prototype.destroy = function () {
            this._resetDebug();
            try {
                _super.prototype.destroy.call(this);
            }
            catch (e) {
                this._rethrowWithContext(e);
                throw e;
            }
        };
        /**
         * @param {?} throwOnChange
         * @return {?}
         */
        DebugAppView.prototype.detectChanges = function (throwOnChange) {
            this._resetDebug();
            try {
                _super.prototype.detectChanges.call(this, throwOnChange);
            }
            catch (e) {
                this._rethrowWithContext(e);
                throw e;
            }
        };
        /**
         * @return {?}
         */
        DebugAppView.prototype._resetDebug = function () { this._currentDebugContext = null; };
        /**
         * @param {?} nodeIndex
         * @param {?} rowNum
         * @param {?} colNum
         * @return {?}
         */
        DebugAppView.prototype.debug = function (nodeIndex, rowNum, colNum) {
            return this._currentDebugContext = new DebugContext(this, nodeIndex, rowNum, colNum);
        };
        /**
         * @param {?} e
         * @return {?}
         */
        DebugAppView.prototype._rethrowWithContext = function (e) {
            if (!(e instanceof ViewWrappedError)) {
                if (!(e instanceof ExpressionChangedAfterItHasBeenCheckedError)) {
                    this.cdMode = ChangeDetectorStatus.Errored;
                }
                if (isPresent(this._currentDebugContext)) {
                    throw new ViewWrappedError(e, this._currentDebugContext);
                }
            }
        };
        /**
         * @param {?} cb
         * @return {?}
         */
        DebugAppView.prototype.eventHandler = function (cb) {
            var _this = this;
            var /** @type {?} */ superHandler = _super.prototype.eventHandler.call(this, cb);
            return function (eventName, event) {
                _this._resetDebug();
                try {
                    return superHandler.call(_this, eventName, event);
                }
                catch (e) {
                    _this._rethrowWithContext(e);
                    throw e;
                }
            };
        };
        return DebugAppView;
    }(AppView));

    /**
     * A ViewContainer is created for elements that have a ViewContainerRef
     * to keep track of the nested views.
     */
    var ViewContainer = (function () {
        /**
         * @param {?} index
         * @param {?} parentIndex
         * @param {?} parentView
         * @param {?} nativeElement
         */
        function ViewContainer(index, parentIndex, parentView, nativeElement) {
            this.index = index;
            this.parentIndex = parentIndex;
            this.parentView = parentView;
            this.nativeElement = nativeElement;
        }
        Object.defineProperty(ViewContainer.prototype, "elementRef", {
            /**
             * @return {?}
             */
            get: function () { return new ElementRef(this.nativeElement); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ViewContainer.prototype, "vcRef", {
            /**
             * @return {?}
             */
            get: function () { return new ViewContainerRef_(this); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ViewContainer.prototype, "parentInjector", {
            /**
             * @return {?}
             */
            get: function () { return this.parentView.injector(this.parentIndex); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ViewContainer.prototype, "injector", {
            /**
             * @return {?}
             */
            get: function () { return this.parentView.injector(this.index); },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} throwOnChange
         * @return {?}
         */
        ViewContainer.prototype.detectChangesInNestedViews = function (throwOnChange) {
            if (this.nestedViews) {
                for (var /** @type {?} */ i = 0; i < this.nestedViews.length; i++) {
                    this.nestedViews[i].detectChanges(throwOnChange);
                }
            }
        };
        /**
         * @return {?}
         */
        ViewContainer.prototype.destroyNestedViews = function () {
            if (this.nestedViews) {
                for (var /** @type {?} */ i = 0; i < this.nestedViews.length; i++) {
                    this.nestedViews[i].destroy();
                }
            }
        };
        /**
         * @param {?} cb
         * @param {?} c
         * @return {?}
         */
        ViewContainer.prototype.visitNestedViewRootNodes = function (cb, c) {
            if (this.nestedViews) {
                for (var /** @type {?} */ i = 0; i < this.nestedViews.length; i++) {
                    this.nestedViews[i].visitRootNodesInternal(cb, c);
                }
            }
        };
        /**
         * @param {?} nestedViewClass
         * @param {?} callback
         * @return {?}
         */
        ViewContainer.prototype.mapNestedViews = function (nestedViewClass, callback) {
            var /** @type {?} */ result = [];
            if (this.nestedViews) {
                for (var /** @type {?} */ i = 0; i < this.nestedViews.length; i++) {
                    var /** @type {?} */ nestedView = this.nestedViews[i];
                    if (nestedView.clazz === nestedViewClass) {
                        result.push(callback(nestedView));
                    }
                }
            }
            if (this.projectedViews) {
                for (var /** @type {?} */ i = 0; i < this.projectedViews.length; i++) {
                    var /** @type {?} */ projectedView = this.projectedViews[i];
                    if (projectedView.clazz === nestedViewClass) {
                        result.push(callback(projectedView));
                    }
                }
            }
            return result;
        };
        /**
         * @param {?} view
         * @param {?} currentIndex
         * @return {?}
         */
        ViewContainer.prototype.moveView = function (view, currentIndex) {
            var /** @type {?} */ previousIndex = this.nestedViews.indexOf(view);
            if (view.type === ViewType.COMPONENT) {
                throw new Error("Component views can't be moved!");
            }
            var /** @type {?} */ nestedViews = this.nestedViews;
            if (nestedViews == null) {
                nestedViews = [];
                this.nestedViews = nestedViews;
            }
            nestedViews.splice(previousIndex, 1);
            nestedViews.splice(currentIndex, 0, view);
            var /** @type {?} */ prevView = currentIndex > 0 ? nestedViews[currentIndex - 1] : null;
            view.moveAfter(this, prevView);
        };
        /**
         * @param {?} view
         * @param {?} viewIndex
         * @return {?}
         */
        ViewContainer.prototype.attachView = function (view, viewIndex) {
            if (view.type === ViewType.COMPONENT) {
                throw new Error("Component views can't be moved!");
            }
            var /** @type {?} */ nestedViews = this.nestedViews;
            if (nestedViews == null) {
                nestedViews = [];
                this.nestedViews = nestedViews;
            }
            // perf: array.push is faster than array.splice!
            if (viewIndex >= nestedViews.length) {
                nestedViews.push(view);
            }
            else {
                nestedViews.splice(viewIndex, 0, view);
            }
            var /** @type {?} */ prevView = viewIndex > 0 ? nestedViews[viewIndex - 1] : null;
            view.attachAfter(this, prevView);
        };
        /**
         * @param {?} viewIndex
         * @return {?}
         */
        ViewContainer.prototype.detachView = function (viewIndex) {
            var /** @type {?} */ view = this.nestedViews[viewIndex];
            // perf: array.pop is faster than array.splice!
            if (viewIndex >= this.nestedViews.length - 1) {
                this.nestedViews.pop();
            }
            else {
                this.nestedViews.splice(viewIndex, 1);
            }
            if (view.type === ViewType.COMPONENT) {
                throw new Error("Component views can't be moved!");
            }
            view.detach();
            return view;
        };
        return ViewContainer;
    }());

    var /** @type {?} */ __core_private__ = {
        isDefaultChangeDetectionStrategy: isDefaultChangeDetectionStrategy,
        ChangeDetectorStatus: ChangeDetectorStatus,
        constructDependencies: constructDependencies,
        LifecycleHooks: LifecycleHooks,
        LIFECYCLE_HOOKS_VALUES: LIFECYCLE_HOOKS_VALUES,
        ReflectorReader: ReflectorReader,
        CodegenComponentFactoryResolver: CodegenComponentFactoryResolver,
        ComponentRef_: ComponentRef_,
        ViewContainer: ViewContainer,
        AppView: AppView,
        DebugAppView: DebugAppView,
        NgModuleInjector: NgModuleInjector,
        registerModuleFactory: registerModuleFactory,
        ViewType: ViewType,
        view_utils: view_utils,
        ViewMetadata: ViewMetadata,
        DebugContext: DebugContext,
        StaticNodeDebugInfo: StaticNodeDebugInfo,
        devModeEqual: devModeEqual,
        UNINITIALIZED: UNINITIALIZED,
        ValueUnwrapper: ValueUnwrapper,
        RenderDebugInfo: RenderDebugInfo,
        TemplateRef_: TemplateRef_,
        ReflectionCapabilities: ReflectionCapabilities,
        makeDecorator: makeDecorator,
        DebugDomRootRenderer: DebugDomRootRenderer,
        Console: Console,
        reflector: reflector,
        Reflector: Reflector,
        NoOpAnimationPlayer: NoOpAnimationPlayer,
        AnimationPlayer: AnimationPlayer,
        AnimationSequencePlayer: AnimationSequencePlayer,
        AnimationGroupPlayer: AnimationGroupPlayer,
        AnimationKeyframe: AnimationKeyframe,
        prepareFinalAnimationStyles: prepareFinalAnimationStyles,
        balanceAnimationKeyframes: balanceAnimationKeyframes,
        flattenStyles: flattenStyles,
        clearStyles: clearStyles,
        renderStyles: renderStyles,
        collectAndResolveStyles: collectAndResolveStyles,
        APP_ID_RANDOM_PROVIDER: APP_ID_RANDOM_PROVIDER,
        AnimationStyles: AnimationStyles,
        ANY_STATE: ANY_STATE,
        DEFAULT_STATE: DEFAULT_STATE,
        EMPTY_STATE: EMPTY_STATE,
        FILL_STYLE_FLAG: FILL_STYLE_FLAG,
        ComponentStillLoadingError: ComponentStillLoadingError,
        isPromise: isPromise,
        isObservable: isObservable,
        AnimationTransition: AnimationTransition
    };

    exports.createPlatform = createPlatform;
    exports.assertPlatform = assertPlatform;
    exports.destroyPlatform = destroyPlatform;
    exports.getPlatform = getPlatform;
    exports.PlatformRef = PlatformRef;
    exports.ApplicationRef = ApplicationRef;
    exports.enableProdMode = enableProdMode;
    exports.isDevMode = isDevMode;
    exports.createPlatformFactory = createPlatformFactory;
    exports.NgProbeToken = NgProbeToken;
    exports.APP_ID = APP_ID;
    exports.PACKAGE_ROOT_URL = PACKAGE_ROOT_URL;
    exports.PLATFORM_INITIALIZER = PLATFORM_INITIALIZER;
    exports.APP_BOOTSTRAP_LISTENER = APP_BOOTSTRAP_LISTENER;
    exports.APP_INITIALIZER = APP_INITIALIZER;
    exports.ApplicationInitStatus = ApplicationInitStatus;
    exports.DebugElement = DebugElement;
    exports.DebugNode = DebugNode;
    exports.asNativeElements = asNativeElements;
    exports.getDebugNode = getDebugNode;
    exports.Testability = Testability;
    exports.TestabilityRegistry = TestabilityRegistry;
    exports.setTestabilityGetter = setTestabilityGetter;
    exports.TRANSLATIONS = TRANSLATIONS;
    exports.TRANSLATIONS_FORMAT = TRANSLATIONS_FORMAT;
    exports.LOCALE_ID = LOCALE_ID;
    exports.ApplicationModule = ApplicationModule;
    exports.wtfCreateScope = wtfCreateScope;
    exports.wtfLeave = wtfLeave;
    exports.wtfStartTimeRange = wtfStartTimeRange;
    exports.wtfEndTimeRange = wtfEndTimeRange;
    exports.Type = Type;
    exports.EventEmitter = EventEmitter;
    exports.ErrorHandler = ErrorHandler;
    exports.AnimationTransitionEvent = AnimationTransitionEvent;
    exports.AnimationPlayer = AnimationPlayer;
    exports.AnimationStyles = AnimationStyles;
    exports.AnimationKeyframe = AnimationKeyframe;
    exports.Sanitizer = Sanitizer;
    exports.SecurityContext = SecurityContext;
    exports.ANALYZE_FOR_ENTRY_COMPONENTS = ANALYZE_FOR_ENTRY_COMPONENTS;
    exports.Attribute = Attribute;
    exports.ContentChild = ContentChild;
    exports.ContentChildren = ContentChildren;
    exports.Query = Query;
    exports.ViewChild = ViewChild;
    exports.ViewChildren = ViewChildren;
    exports.Component = Component;
    exports.Directive = Directive;
    exports.HostBinding = HostBinding;
    exports.HostListener = HostListener;
    exports.Input = Input;
    exports.Output = Output;
    exports.Pipe = Pipe;
    exports.AfterContentChecked = AfterContentChecked;
    exports.AfterContentInit = AfterContentInit;
    exports.AfterViewChecked = AfterViewChecked;
    exports.AfterViewInit = AfterViewInit;
    exports.DoCheck = DoCheck;
    exports.OnChanges = OnChanges;
    exports.OnDestroy = OnDestroy;
    exports.OnInit = OnInit;
    exports.CUSTOM_ELEMENTS_SCHEMA = CUSTOM_ELEMENTS_SCHEMA;
    exports.NO_ERRORS_SCHEMA = NO_ERRORS_SCHEMA;
    exports.NgModule = NgModule;
    exports.ViewEncapsulation = ViewEncapsulation;
    exports.Version = Version;
    exports.VERSION = VERSION;
    exports.Class = Class;
    exports.forwardRef = forwardRef;
    exports.resolveForwardRef = resolveForwardRef;
    exports.Injector = Injector;
    exports.ReflectiveInjector = ReflectiveInjector;
    exports.ResolvedReflectiveFactory = ResolvedReflectiveFactory;
    exports.ReflectiveKey = ReflectiveKey;
    exports.OpaqueToken = OpaqueToken;
    exports.Inject = Inject;
    exports.Optional = Optional;
    exports.Injectable = Injectable;
    exports.Self = Self;
    exports.SkipSelf = SkipSelf;
    exports.Host = Host;
    exports.NgZone = NgZone;
    exports.RenderComponentType = RenderComponentType;
    exports.Renderer = Renderer;
    exports.RootRenderer = RootRenderer;
    exports.COMPILER_OPTIONS = COMPILER_OPTIONS;
    exports.Compiler = Compiler;
    exports.CompilerFactory = CompilerFactory;
    exports.ModuleWithComponentFactories = ModuleWithComponentFactories;
    exports.ComponentFactory = ComponentFactory;
    exports.ComponentRef = ComponentRef;
    exports.ComponentFactoryResolver = ComponentFactoryResolver;
    exports.ElementRef = ElementRef;
    exports.NgModuleFactory = NgModuleFactory;
    exports.NgModuleRef = NgModuleRef;
    exports.NgModuleFactoryLoader = NgModuleFactoryLoader;
    exports.getModuleFactory = getModuleFactory;
    exports.QueryList = QueryList;
    exports.SystemJsNgModuleLoader = SystemJsNgModuleLoader;
    exports.SystemJsNgModuleLoaderConfig = SystemJsNgModuleLoaderConfig;
    exports.TemplateRef = TemplateRef;
    exports.ViewContainerRef = ViewContainerRef;
    exports.EmbeddedViewRef = EmbeddedViewRef;
    exports.ViewRef = ViewRef;
    exports.ChangeDetectionStrategy = ChangeDetectionStrategy;
    exports.ChangeDetectorRef = ChangeDetectorRef;
    exports.CollectionChangeRecord = CollectionChangeRecord;
    exports.DefaultIterableDiffer = DefaultIterableDiffer;
    exports.IterableDiffers = IterableDiffers;
    exports.KeyValueChangeRecord = KeyValueChangeRecord;
    exports.KeyValueDiffers = KeyValueDiffers;
    exports.SimpleChange = SimpleChange;
    exports.WrappedValue = WrappedValue;
    exports.platformCore = platformCore;
    exports.__core_private__ = __core_private__;
    exports.AUTO_STYLE = AUTO_STYLE;
    exports.AnimationEntryMetadata = AnimationEntryMetadata;
    exports.AnimationStateMetadata = AnimationStateMetadata;
    exports.AnimationStateDeclarationMetadata = AnimationStateDeclarationMetadata;
    exports.AnimationStateTransitionMetadata = AnimationStateTransitionMetadata;
    exports.AnimationMetadata = AnimationMetadata;
    exports.AnimationKeyframesSequenceMetadata = AnimationKeyframesSequenceMetadata;
    exports.AnimationStyleMetadata = AnimationStyleMetadata;
    exports.AnimationAnimateMetadata = AnimationAnimateMetadata;
    exports.AnimationWithStepsMetadata = AnimationWithStepsMetadata;
    exports.AnimationSequenceMetadata = AnimationSequenceMetadata;
    exports.AnimationGroupMetadata = AnimationGroupMetadata;
    exports.animate = animate;
    exports.group = group;
    exports.sequence = sequence;
    exports.style = style;
    exports.state = state;
    exports.keyframes = keyframes;
    exports.transition = transition;
    exports.trigger = trigger;

}));
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"rxjs/Observable":28,"rxjs/Subject":30,"rxjs/symbol/observable":34}],2:[function(require,module,exports){
"use strict";
var core_1 = require('@angular/core');
var google_map_kml_layer_1 = require('./directives/google-map-kml-layer');
var google_map_1 = require('./directives/google-map');
var google_map_circle_1 = require('./directives/google-map-circle');
var google_map_info_window_1 = require('./directives/google-map-info-window');
var google_map_marker_1 = require('./directives/google-map-marker');
var google_map_polygon_1 = require('./directives/google-map-polygon');
var google_map_polyline_1 = require('./directives/google-map-polyline');
var google_map_polyline_point_1 = require('./directives/google-map-polyline-point');
var lazy_maps_api_loader_1 = require('./services/maps-api-loader/lazy-maps-api-loader');
var lazy_maps_api_loader_2 = require('./services/maps-api-loader/lazy-maps-api-loader');
var maps_api_loader_1 = require('./services/maps-api-loader/maps-api-loader');
var browser_globals_1 = require('./utils/browser-globals');
/**
 * @internal
 */
function coreDirectives() {
    return [
        google_map_1.SebmGoogleMap, google_map_marker_1.SebmGoogleMapMarker, google_map_info_window_1.SebmGoogleMapInfoWindow, google_map_circle_1.SebmGoogleMapCircle,
        google_map_polygon_1.SebmGoogleMapPolygon, google_map_polyline_1.SebmGoogleMapPolyline, google_map_polyline_point_1.SebmGoogleMapPolylinePoint, google_map_kml_layer_1.SebmGoogleMapKmlLayer
    ];
}
exports.coreDirectives = coreDirectives;
;
/**
 * The angular2-google-maps core module. Contains all Directives/Services/Pipes
 * of the core module. Please use `AgmCoreModule.forRoot()` in your app module.
 */
var AgmCoreModule = (function () {
    function AgmCoreModule() {
    }
    /**
     * Please use this method when you register the module at the root level.
     */
    AgmCoreModule.forRoot = function (lazyMapsAPILoaderConfig) {
        return {
            ngModule: AgmCoreModule,
            providers: browser_globals_1.BROWSER_GLOBALS_PROVIDERS.concat([
                { provide: maps_api_loader_1.MapsAPILoader, useClass: lazy_maps_api_loader_1.LazyMapsAPILoader },
                { provide: lazy_maps_api_loader_2.LAZY_MAPS_API_CONFIG, useValue: lazyMapsAPILoaderConfig }
            ]),
        };
    };
    AgmCoreModule.decorators = [
        { type: core_1.NgModule, args: [{ declarations: coreDirectives(), exports: coreDirectives() },] },
    ];
    /** @nocollapse */
    AgmCoreModule.ctorParameters = function () { return []; };
    return AgmCoreModule;
}());
exports.AgmCoreModule = AgmCoreModule;

},{"./directives/google-map":11,"./directives/google-map-circle":4,"./directives/google-map-info-window":5,"./directives/google-map-kml-layer":6,"./directives/google-map-marker":7,"./directives/google-map-polygon":8,"./directives/google-map-polyline":10,"./directives/google-map-polyline-point":9,"./services/maps-api-loader/lazy-maps-api-loader":21,"./services/maps-api-loader/maps-api-loader":22,"./utils/browser-globals":24,"@angular/core":1}],3:[function(require,module,exports){
"use strict";
var google_map_1 = require('./directives/google-map');
exports.SebmGoogleMap = google_map_1.SebmGoogleMap;
var google_map_circle_1 = require('./directives/google-map-circle');
exports.SebmGoogleMapCircle = google_map_circle_1.SebmGoogleMapCircle;
var google_map_info_window_1 = require('./directives/google-map-info-window');
exports.SebmGoogleMapInfoWindow = google_map_info_window_1.SebmGoogleMapInfoWindow;
var google_map_kml_layer_1 = require('./directives/google-map-kml-layer');
exports.SebmGoogleMapKmlLayer = google_map_kml_layer_1.SebmGoogleMapKmlLayer;
var google_map_marker_1 = require('./directives/google-map-marker');
exports.SebmGoogleMapMarker = google_map_marker_1.SebmGoogleMapMarker;
var google_map_polygon_1 = require('./directives/google-map-polygon');
exports.SebmGoogleMapPolygon = google_map_polygon_1.SebmGoogleMapPolygon;
var google_map_polyline_1 = require('./directives/google-map-polyline');
exports.SebmGoogleMapPolyline = google_map_polyline_1.SebmGoogleMapPolyline;
var google_map_polyline_point_1 = require('./directives/google-map-polyline-point');
exports.SebmGoogleMapPolylinePoint = google_map_polyline_point_1.SebmGoogleMapPolylinePoint;

},{"./directives/google-map":11,"./directives/google-map-circle":4,"./directives/google-map-info-window":5,"./directives/google-map-kml-layer":6,"./directives/google-map-marker":7,"./directives/google-map-polygon":8,"./directives/google-map-polyline":10,"./directives/google-map-polyline-point":9}],4:[function(require,module,exports){
"use strict";
var core_1 = require('@angular/core');
var circle_manager_1 = require('../services/managers/circle-manager');
var SebmGoogleMapCircle = (function () {
    function SebmGoogleMapCircle(_manager) {
        this._manager = _manager;
        /**
         * Indicates whether this Circle handles mouse events. Defaults to true.
         */
        this.clickable = true;
        /**
         * If set to true, the user can drag this circle over the map. Defaults to false.
         */
        this.draggable = false;
        /**
         * If set to true, the user can edit this circle by dragging the control points shown at
         * the center and around the circumference of the circle. Defaults to false.
         */
        this.editable = false;
        /**
         * The radius in meters on the Earth's surface.
         */
        this.radius = 0;
        /**
         * The stroke position. Defaults to CENTER.
         * This property is not supported on Internet Explorer 8 and earlier.
         */
        this.strokePosition = 'CENTER';
        /**
         * The stroke width in pixels.
         */
        this.strokeWeight = 0;
        /**
         * Whether this circle is visible on the map. Defaults to true.
         */
        this.visible = true;
        /**
         * This event is fired when the circle's center is changed.
         */
        this.centerChange = new core_1.EventEmitter();
        /**
         * This event emitter gets emitted when the user clicks on the circle.
         */
        this.circleClick = new core_1.EventEmitter();
        /**
         * This event emitter gets emitted when the user clicks on the circle.
         */
        this.circleDblClick = new core_1.EventEmitter();
        /**
         * This event is repeatedly fired while the user drags the circle.
         */
        this.drag = new core_1.EventEmitter();
        /**
         * This event is fired when the user stops dragging the circle.
         */
        this.dragEnd = new core_1.EventEmitter();
        /**
         * This event is fired when the user starts dragging the circle.
         */
        this.dragStart = new core_1.EventEmitter();
        /**
         * This event is fired when the DOM mousedown event is fired on the circle.
         */
        this.mouseDown = new core_1.EventEmitter();
        /**
         * This event is fired when the DOM mousemove event is fired on the circle.
         */
        this.mouseMove = new core_1.EventEmitter();
        /**
         * This event is fired on circle mouseout.
         */
        this.mouseOut = new core_1.EventEmitter();
        /**
         * This event is fired on circle mouseover.
         */
        this.mouseOver = new core_1.EventEmitter();
        /**
         * This event is fired when the DOM mouseup event is fired on the circle.
         */
        this.mouseUp = new core_1.EventEmitter();
        /**
         * This event is fired when the circle's radius is changed.
         */
        this.radiusChange = new core_1.EventEmitter();
        /**
         * This event is fired when the circle is right-clicked on.
         */
        this.rightClick = new core_1.EventEmitter();
        this._circleAddedToManager = false;
        this._eventSubscriptions = [];
    }
    /** @internal */
    SebmGoogleMapCircle.prototype.ngOnInit = function () {
        this._manager.addCircle(this);
        this._circleAddedToManager = true;
        this._registerEventListeners();
    };
    /** @internal */
    SebmGoogleMapCircle.prototype.ngOnChanges = function (changes) {
        if (!this._circleAddedToManager) {
            return;
        }
        if (changes['latitude'] || changes['longitude']) {
            this._manager.setCenter(this);
        }
        if (changes['editable']) {
            this._manager.setEditable(this);
        }
        if (changes['draggable']) {
            this._manager.setDraggable(this);
        }
        if (changes['visible']) {
            this._manager.setVisible(this);
        }
        if (changes['radius']) {
            this._manager.setRadius(this);
        }
        this._updateCircleOptionsChanges(changes);
    };
    SebmGoogleMapCircle.prototype._updateCircleOptionsChanges = function (changes) {
        var options = {};
        var optionKeys = Object.keys(changes).filter(function (k) { return SebmGoogleMapCircle._mapOptions.indexOf(k) !== -1; });
        optionKeys.forEach(function (k) { options[k] = changes[k].currentValue; });
        if (optionKeys.length > 0) {
            this._manager.setOptions(this, options);
        }
    };
    SebmGoogleMapCircle.prototype._registerEventListeners = function () {
        var _this = this;
        var events = new Map();
        events.set('center_changed', this.centerChange);
        events.set('click', this.circleClick);
        events.set('dblclick', this.circleDblClick);
        events.set('drag', this.drag);
        events.set('dragend', this.dragEnd);
        events.set('dragStart', this.dragStart);
        events.set('mousedown', this.mouseDown);
        events.set('mousemove', this.mouseMove);
        events.set('mouseout', this.mouseOut);
        events.set('mouseover', this.mouseOver);
        events.set('mouseup', this.mouseUp);
        events.set('radius_changed', this.radiusChange);
        events.set('rightclick', this.rightClick);
        events.forEach(function (eventEmitter, eventName) {
            _this._eventSubscriptions.push(_this._manager.createEventObservable(eventName, _this).subscribe(function (value) {
                switch (eventName) {
                    case 'radius_changed':
                        _this._manager.getRadius(_this).then(function (radius) { return eventEmitter.emit(radius); });
                        break;
                    case 'center_changed':
                        _this._manager.getCenter(_this).then(function (center) {
                            return eventEmitter.emit({ lat: center.lat(), lng: center.lng() });
                        });
                        break;
                    default:
                        eventEmitter.emit({ coords: { lat: value.latLng.lat(), lng: value.latLng.lng() } });
                }
            }));
        });
    };
    /** @internal */
    SebmGoogleMapCircle.prototype.ngOnDestroy = function () {
        this._eventSubscriptions.forEach(function (s) { s.unsubscribe(); });
        this._eventSubscriptions = null;
        this._manager.removeCircle(this);
    };
    /**
     * Gets the LatLngBounds of this Circle.
     */
    SebmGoogleMapCircle.prototype.getBounds = function () { return this._manager.getBounds(this); };
    SebmGoogleMapCircle.prototype.getCenter = function () { return this._manager.getCenter(this); };
    SebmGoogleMapCircle._mapOptions = [
        'fillColor', 'fillOpacity', 'strokeColor', 'strokeOpacity', 'strokePosition', 'strokeWeight',
        'visible', 'zIndex'
    ];
    SebmGoogleMapCircle.decorators = [
        { type: core_1.Directive, args: [{
                    selector: 'sebm-google-map-circle',
                    inputs: [
                        'latitude', 'longitude', 'clickable', 'draggable: circleDraggable', 'editable', 'fillColor',
                        'fillOpacity', 'radius', 'strokeColor', 'strokeOpacity', 'strokePosition', 'strokeWeight',
                        'visible', 'zIndex'
                    ],
                    outputs: [
                        'centerChange', 'circleClick', 'circleDblClick', 'drag', 'dragEnd', 'dragStart', 'mouseDown',
                        'mouseMove', 'mouseOut', 'mouseOver', 'mouseUp', 'radiusChange', 'rightClick'
                    ]
                },] },
    ];
    /** @nocollapse */
    SebmGoogleMapCircle.ctorParameters = function () { return [
        { type: circle_manager_1.CircleManager, },
    ]; };
    return SebmGoogleMapCircle;
}());
exports.SebmGoogleMapCircle = SebmGoogleMapCircle;

},{"../services/managers/circle-manager":15,"@angular/core":1}],5:[function(require,module,exports){
"use strict";
var core_1 = require('@angular/core');
var info_window_manager_1 = require('../services/managers/info-window-manager');
var infoWindowId = 0;
/**
 * SebmGoogleMapInfoWindow renders a info window inside a {@link SebmGoogleMapMarker} or standalone.
 *
 * ### Example
 * ```typescript
 * import { Component } from 'angular2/core';
 * import { SebmGoogleMap, SebmGoogleMapMarker, SebmGoogleMapInfoWindow } from
 * 'angular2-google-maps/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  directives: [SebmGoogleMap, SebmGoogleMapMarker, SebmGoogleMapInfoWindow],
 *  styles: [`
 *    .sebm-google-map-container {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <sebm-google-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *      <sebm-google-map-marker [latitude]="lat" [longitude]="lng" [label]="'M'">
 *        <sebm-google-map-info-window [disableAutoPan]="true">
 *          Hi, this is the content of the <strong>info window</strong>
 *        </sebm-google-map-info-window>
 *      </sebm-google-map-marker>
 *    </sebm-google-map>
 *  `
 * })
 * ```
 */
var SebmGoogleMapInfoWindow = (function () {
    function SebmGoogleMapInfoWindow(_infoWindowManager, _el) {
        this._infoWindowManager = _infoWindowManager;
        this._el = _el;
        /**
         * Sets the open state for the InfoWindow. You can also call the open() and close() methods.
         */
        this.isOpen = false;
        /**
         * Emits an event when the info window is closed.
         */
        this.infoWindowClose = new core_1.EventEmitter();
        this._infoWindowAddedToManager = false;
        this._id = (infoWindowId++).toString();
    }
    SebmGoogleMapInfoWindow.prototype.ngOnInit = function () {
        this.content = this._el.nativeElement.querySelector('.sebm-google-map-info-window-content');
        this._infoWindowManager.addInfoWindow(this);
        this._infoWindowAddedToManager = true;
        this._updateOpenState();
        this._registerEventListeners();
    };
    /** @internal */
    SebmGoogleMapInfoWindow.prototype.ngOnChanges = function (changes) {
        if (!this._infoWindowAddedToManager) {
            return;
        }
        if ((changes['latitude'] || changes['longitude']) && typeof this.latitude === 'number' &&
            typeof this.longitude === 'number') {
            this._infoWindowManager.setPosition(this);
        }
        if (changes['zIndex']) {
            this._infoWindowManager.setZIndex(this);
        }
        if (changes['isOpen']) {
            this._updateOpenState();
        }
        this._setInfoWindowOptions(changes);
    };
    SebmGoogleMapInfoWindow.prototype._registerEventListeners = function () {
        var _this = this;
        this._infoWindowManager.createEventObservable('closeclick', this).subscribe(function () {
            _this.isOpen = false;
            _this.infoWindowClose.emit();
        });
    };
    SebmGoogleMapInfoWindow.prototype._updateOpenState = function () {
        this.isOpen ? this.open() : this.close();
    };
    SebmGoogleMapInfoWindow.prototype._setInfoWindowOptions = function (changes) {
        var options = {};
        var optionKeys = Object.keys(changes).filter(function (k) { return SebmGoogleMapInfoWindow._infoWindowOptionsInputs.indexOf(k) !== -1; });
        optionKeys.forEach(function (k) { options[k] = changes[k].currentValue; });
        this._infoWindowManager.setOptions(this, options);
    };
    /**
     * Opens the info window.
     */
    SebmGoogleMapInfoWindow.prototype.open = function () { return this._infoWindowManager.open(this); };
    /**
     * Closes the info window.
     */
    SebmGoogleMapInfoWindow.prototype.close = function () {
        var _this = this;
        return this._infoWindowManager.close(this).then(function () { _this.infoWindowClose.emit(); });
    };
    /** @internal */
    SebmGoogleMapInfoWindow.prototype.id = function () { return this._id; };
    /** @internal */
    SebmGoogleMapInfoWindow.prototype.toString = function () { return 'SebmGoogleMapInfoWindow-' + this._id.toString(); };
    /** @internal */
    SebmGoogleMapInfoWindow.prototype.ngOnDestroy = function () { this._infoWindowManager.deleteInfoWindow(this); };
    SebmGoogleMapInfoWindow._infoWindowOptionsInputs = ['disableAutoPan', 'maxWidth'];
    SebmGoogleMapInfoWindow.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'sebm-google-map-info-window',
                    inputs: ['latitude', 'longitude', 'disableAutoPan', 'isOpen', 'zIndex', 'maxWidth'],
                    outputs: ['infoWindowClose'],
                    template: "<div class='sebm-google-map-info-window-content'>\n      <ng-content></ng-content>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    SebmGoogleMapInfoWindow.ctorParameters = function () { return [
        { type: info_window_manager_1.InfoWindowManager, },
        { type: core_1.ElementRef, },
    ]; };
    return SebmGoogleMapInfoWindow;
}());
exports.SebmGoogleMapInfoWindow = SebmGoogleMapInfoWindow;

},{"../services/managers/info-window-manager":16,"@angular/core":1}],6:[function(require,module,exports){
"use strict";
var core_1 = require('@angular/core');
var kml_layer_manager_1 = require('./../services/managers/kml-layer-manager');
var layerId = 0;
var SebmGoogleMapKmlLayer = (function () {
    function SebmGoogleMapKmlLayer(_manager) {
        this._manager = _manager;
        this._addedToManager = false;
        this._id = (layerId++).toString();
        this._subscriptions = [];
        /**
         * If true, the layer receives mouse events. Default value is true.
         */
        this.clickable = true;
        /**
         * By default, the input map is centered and zoomed to the bounding box of the contents of the
         * layer.
         * If this option is set to true, the viewport is left unchanged, unless the map's center and zoom
         * were never set.
         */
        this.preserveViewport = false;
        /**
         * Whether to render the screen overlays. Default true.
         */
        this.screenOverlays = true;
        /**
         * Suppress the rendering of info windows when layer features are clicked.
         */
        this.suppressInfoWindows = false;
        /**
         * The URL of the KML document to display.
         */
        this.url = null;
        /**
         * The z-index of the layer.
         */
        this.zIndex = null;
        /**
         * This event is fired when a feature in the layer is clicked.
         */
        this.layerClick = new core_1.EventEmitter();
        /**
         * This event is fired when the KML layers default viewport has changed.
         */
        this.defaultViewportChange = new core_1.EventEmitter();
        /**
         * This event is fired when the KML layer has finished loading.
         * At this point it is safe to read the status property to determine if the layer loaded
         * successfully.
         */
        this.statusChange = new core_1.EventEmitter();
    }
    SebmGoogleMapKmlLayer.prototype.ngOnInit = function () {
        if (this._addedToManager) {
            return;
        }
        this._manager.addKmlLayer(this);
        this._addedToManager = true;
        this._addEventListeners();
    };
    SebmGoogleMapKmlLayer.prototype.ngOnChanges = function (changes) {
        if (!this._addedToManager) {
            return;
        }
        this._updatePolygonOptions(changes);
    };
    SebmGoogleMapKmlLayer.prototype._updatePolygonOptions = function (changes) {
        var options = Object.keys(changes)
            .filter(function (k) { return SebmGoogleMapKmlLayer._kmlLayerOptions.indexOf(k) !== -1; })
            .reduce(function (obj, k) {
            obj[k] = changes[k].currentValue;
            return obj;
        }, {});
        if (Object.keys(options).length > 0) {
            this._manager.setOptions(this, options);
        }
    };
    SebmGoogleMapKmlLayer.prototype._addEventListeners = function () {
        var _this = this;
        var listeners = [
            { name: 'click', handler: function (ev) { return _this.layerClick.emit(ev); } },
            { name: 'defaultviewport_changed', handler: function () { return _this.defaultViewportChange.emit(); } },
            { name: 'status_changed', handler: function () { return _this.statusChange.emit(); } },
        ];
        listeners.forEach(function (obj) {
            var os = _this._manager.createEventObservable(obj.name, _this).subscribe(obj.handler);
            _this._subscriptions.push(os);
        });
    };
    /** @internal */
    SebmGoogleMapKmlLayer.prototype.id = function () { return this._id; };
    /** @internal */
    SebmGoogleMapKmlLayer.prototype.toString = function () { return "SebmGoogleMapKmlLayer-" + this._id.toString(); };
    /** @internal */
    SebmGoogleMapKmlLayer.prototype.ngOnDestroy = function () {
        this._manager.deleteKmlLayer(this);
        // unsubscribe all registered observable subscriptions
        this._subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    SebmGoogleMapKmlLayer._kmlLayerOptions = ['clickable', 'preserveViewport', 'screenOverlays', 'suppressInfoWindows', 'url', 'zIndex'];
    SebmGoogleMapKmlLayer.decorators = [
        { type: core_1.Directive, args: [{
                    selector: 'sebm-google-map-kml-layer',
                    inputs: ['clickable', 'preserveViewport', 'screenOverlays', 'suppressInfoWindows', 'url', 'zIndex'],
                    outputs: ['layerClick', 'defaultViewportChange', 'statusChange']
                },] },
    ];
    /** @nocollapse */
    SebmGoogleMapKmlLayer.ctorParameters = function () { return [
        { type: kml_layer_manager_1.KmlLayerManager, },
    ]; };
    return SebmGoogleMapKmlLayer;
}());
exports.SebmGoogleMapKmlLayer = SebmGoogleMapKmlLayer;

},{"./../services/managers/kml-layer-manager":17,"@angular/core":1}],7:[function(require,module,exports){
"use strict";
var core_1 = require('@angular/core');
var marker_manager_1 = require('../services/managers/marker-manager');
var google_map_info_window_1 = require('./google-map-info-window');
var markerId = 0;
/**
 * SebmGoogleMapMarker renders a map marker inside a {@link SebmGoogleMap}.
 *
 * ### Example
 * ```typescript
 * import { Component } from 'angular2/core';
 * import { SebmGoogleMap, SebmGoogleMapMarker } from 'angular2-google-maps/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  directives: [SebmGoogleMap, SebmGoogleMapMarker],
 *  styles: [`
 *    .sebm-google-map-container {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <sebm-google-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *      <sebm-google-map-marker [latitude]="lat" [longitude]="lng" [label]="'M'">
 *      </sebm-google-map-marker>
 *    </sebm-google-map>
 *  `
 * })
 * ```
 */
var SebmGoogleMapMarker = (function () {
    function SebmGoogleMapMarker(_markerManager) {
        this._markerManager = _markerManager;
        /**
         * If true, the marker can be dragged. Default value is false.
         */
        this.draggable = false;
        /**
         * If true, the marker is visible
         */
        this.visible = true;
        /**
         * Whether to automatically open the child info window when the marker is clicked.
         */
        this.openInfoWindow = true;
        /**
         * The marker's opacity between 0.0 and 1.0.
         */
        this.opacity = 1;
        /**
         * All markers are displayed on the map in order of their zIndex, with higher values displaying in
         * front of markers with lower values. By default, markers are displayed according to their
         * vertical position on screen, with lower markers appearing in front of markers further up the
         * screen.
         */
        this.zIndex = 1;
        /**
         * This event emitter gets emitted when the user clicks on the marker.
         */
        this.markerClick = new core_1.EventEmitter();
        /**
         * This event is fired when the user stops dragging the marker.
         */
        this.dragEnd = new core_1.EventEmitter();
        /**
         * This event is fired when the user mouses over the marker.
         */
        this.mouseOver = new core_1.EventEmitter();
        /**
         * This event is fired when the user mouses outside the marker.
         */
        this.mouseOut = new core_1.EventEmitter();
        this._markerAddedToManger = false;
        this._observableSubscriptions = [];
        this._id = (markerId++).toString();
    }
    /* @internal */
    SebmGoogleMapMarker.prototype.ngAfterContentInit = function () {
        if (this.infoWindow != null) {
            this.infoWindow.hostMarker = this;
        }
    };
    /** @internal */
    SebmGoogleMapMarker.prototype.ngOnChanges = function (changes) {
        if (typeof this.latitude !== 'number' || typeof this.longitude !== 'number') {
            return;
        }
        if (!this._markerAddedToManger) {
            this._markerManager.addMarker(this);
            this._markerAddedToManger = true;
            this._addEventListeners();
            return;
        }
        if (changes['latitude'] || changes['longitude']) {
            this._markerManager.updateMarkerPosition(this);
        }
        if (changes['title']) {
            this._markerManager.updateTitle(this);
        }
        if (changes['label']) {
            this._markerManager.updateLabel(this);
        }
        if (changes['draggable']) {
            this._markerManager.updateDraggable(this);
        }
        if (changes['iconUrl']) {
            this._markerManager.updateIcon(this);
        }
        if (changes['opacity']) {
            this._markerManager.updateOpacity(this);
        }
        if (changes['visible']) {
            this._markerManager.updateVisible(this);
        }
        if (changes['zIndex']) {
            this._markerManager.updateZIndex(this);
        }
    };
    SebmGoogleMapMarker.prototype._addEventListeners = function () {
        var _this = this;
        var cs = this._markerManager.createEventObservable('click', this).subscribe(function () {
            if (_this.openInfoWindow && _this.infoWindow != null) {
                _this.infoWindow.open();
            }
            _this.markerClick.emit(null);
        });
        this._observableSubscriptions.push(cs);
        var ds = this._markerManager.createEventObservable('dragend', this)
            .subscribe(function (e) {
            _this.dragEnd.emit({ coords: { lat: e.latLng.lat(), lng: e.latLng.lng() } });
        });
        this._observableSubscriptions.push(ds);
        var mover = this._markerManager.createEventObservable('mouseover', this)
            .subscribe(function (e) {
            _this.mouseOver.emit({ coords: { lat: e.latLng.lat(), lng: e.latLng.lng() } });
        });
        this._observableSubscriptions.push(mover);
        var mout = this._markerManager.createEventObservable('mouseout', this)
            .subscribe(function (e) {
            _this.mouseOut.emit({ coords: { lat: e.latLng.lat(), lng: e.latLng.lng() } });
        });
        this._observableSubscriptions.push(mout);
    };
    /** @internal */
    SebmGoogleMapMarker.prototype.id = function () { return this._id; };
    /** @internal */
    SebmGoogleMapMarker.prototype.toString = function () { return 'SebmGoogleMapMarker-' + this._id.toString(); };
    /** @internal */
    SebmGoogleMapMarker.prototype.ngOnDestroy = function () {
        this._markerManager.deleteMarker(this);
        // unsubscribe all registered observable subscriptions
        this._observableSubscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    SebmGoogleMapMarker.decorators = [
        { type: core_1.Directive, args: [{
                    selector: 'sebm-google-map-marker',
                    inputs: [
                        'latitude', 'longitude', 'title', 'label', 'draggable: markerDraggable', 'iconUrl',
                        'openInfoWindow', 'opacity', 'visible', 'zIndex'
                    ],
                    outputs: ['markerClick', 'dragEnd', 'mouseOver', 'mouseOut']
                },] },
    ];
    /** @nocollapse */
    SebmGoogleMapMarker.ctorParameters = function () { return [
        { type: marker_manager_1.MarkerManager, },
    ]; };
    SebmGoogleMapMarker.propDecorators = {
        'infoWindow': [{ type: core_1.ContentChild, args: [google_map_info_window_1.SebmGoogleMapInfoWindow,] },],
    };
    return SebmGoogleMapMarker;
}());
exports.SebmGoogleMapMarker = SebmGoogleMapMarker;

},{"../services/managers/marker-manager":18,"./google-map-info-window":5,"@angular/core":1}],8:[function(require,module,exports){
"use strict";
var core_1 = require('@angular/core');
var polygon_manager_1 = require('../services/managers/polygon-manager');
/**
 * SebmGoogleMapPolygon renders a polygon on a {@link SebmGoogleMap}
 *
 * ### Example
 * ```typescript
 * import { Component } from '@angular/core';
 * import { SebmGoogleMap, SebmGooglePolygon, LatLngLiteral } from 'angular2-maps/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  styles: [`
 *    .semb-map-container {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <semb-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *      <semb-map-polygon [paths]="paths">
 *      </semb-map-polygon>
 *    </semb-map>
 *  `
 * })
 * export class MyMapCmp {
 *   lat: number = 0;
 *   lng: number = 0;
 *   zoom: number = 10;
 *   paths: Array<LatLngLiteral> = [
 *     { lat: 0,  lng: 10 },
 *     { lat: 0,  lng: 20 },
 *     { lat: 10, lng: 20 },
 *     { lat: 10, lng: 10 },
 *     { lat: 0,  lng: 10 }
 *   ]
 *   // Nesting paths will create a hole where they overlap;
 *   nestedPaths: Array<Array<LatLngLiteral>> = [[
 *     { lat: 0,  lng: 10 },
 *     { lat: 0,  lng: 20 },
 *     { lat: 10, lng: 20 },
 *     { lat: 10, lng: 10 },
 *     { lat: 0,  lng: 10 }
 *   ], [
 *     { lat: 0, lng: 15 },
 *     { lat: 0, lng: 20 },
 *     { lat: 5, lng: 20 },
 *     { lat: 5, lng: 15 },
 *     { lat: 0, lng: 15 }
 *   ]]
 * }
 * ```
 */
var SebmGoogleMapPolygon = (function () {
    function SebmGoogleMapPolygon(_polygonManager) {
        this._polygonManager = _polygonManager;
        /**
         * Indicates whether this Polygon handles mouse events. Defaults to true.
         */
        this.clickable = true;
        /**
         * If set to true, the user can drag this shape over the map. The geodesic
         * property defines the mode of dragging. Defaults to false.
         */
        this.draggable = false;
        /**
         * If set to true, the user can edit this shape by dragging the control
         * points shown at the vertices and on each segment. Defaults to false.
         */
        this.editable = false;
        /**
         * When true, edges of the polygon are interpreted as geodesic and will
         * follow the curvature of the Earth. When false, edges of the polygon are
         * rendered as straight lines in screen space. Note that the shape of a
         * geodesic polygon may appear to change when dragged, as the dimensions
         * are maintained relative to the surface of the earth. Defaults to false.
         */
        this.geodesic = false;
        /**
         * The ordered sequence of coordinates that designates a closed loop.
         * Unlike polylines, a polygon may consist of one or more paths.
         *  As a result, the paths property may specify one or more arrays of
         * LatLng coordinates. Paths are closed automatically; do not repeat the
         * first vertex of the path as the last vertex. Simple polygons may be
         * defined using a single array of LatLngs. More complex polygons may
         * specify an array of arrays. Any simple arrays are converted into Arrays.
         * Inserting or removing LatLngs from the Array will automatically update
         * the polygon on the map.
         */
        this.paths = [];
        /**
         * This event is fired when the DOM click event is fired on the Polygon.
         */
        this.polyClick = new core_1.EventEmitter();
        /**
         * This event is fired when the DOM dblclick event is fired on the Polygon.
         */
        this.polyDblClick = new core_1.EventEmitter();
        /**
         * This event is repeatedly fired while the user drags the polygon.
         */
        this.polyDrag = new core_1.EventEmitter();
        /**
         * This event is fired when the user stops dragging the polygon.
         */
        this.polyDragEnd = new core_1.EventEmitter();
        /**
         * This event is fired when the user starts dragging the polygon.
         */
        this.polyDragStart = new core_1.EventEmitter();
        /**
         * This event is fired when the DOM mousedown event is fired on the Polygon.
         */
        this.polyMouseDown = new core_1.EventEmitter();
        /**
         * This event is fired when the DOM mousemove event is fired on the Polygon.
         */
        this.polyMouseMove = new core_1.EventEmitter();
        /**
         * This event is fired on Polygon mouseout.
         */
        this.polyMouseOut = new core_1.EventEmitter();
        /**
         * This event is fired on Polygon mouseover.
         */
        this.polyMouseOver = new core_1.EventEmitter();
        /**
         * This event is fired whe the DOM mouseup event is fired on the Polygon
         */
        this.polyMouseUp = new core_1.EventEmitter();
        /**
         * This even is fired when the Polygon is right-clicked on.
         */
        this.polyRightClick = new core_1.EventEmitter();
        this._polygonAddedToManager = false;
        this._subscriptions = [];
    }
    /** @internal */
    SebmGoogleMapPolygon.prototype.ngAfterContentInit = function () {
        if (!this._polygonAddedToManager) {
            this._init();
        }
    };
    SebmGoogleMapPolygon.prototype.ngOnChanges = function (changes) {
        if (!this._polygonAddedToManager) {
            this._init();
            return;
        }
        this._polygonManager.setPolygonOptions(this, this._updatePolygonOptions(changes));
    };
    SebmGoogleMapPolygon.prototype._init = function () {
        this._polygonManager.addPolygon(this);
        this._polygonAddedToManager = true;
        this._addEventListeners();
    };
    SebmGoogleMapPolygon.prototype._addEventListeners = function () {
        var _this = this;
        var handlers = [
            { name: 'click', handler: function (ev) { return _this.polyClick.emit(ev); } },
            { name: 'dbclick', handler: function (ev) { return _this.polyDblClick.emit(ev); } },
            { name: 'drag', handler: function (ev) { return _this.polyDrag.emit(ev); } },
            { name: 'dragend', handler: function (ev) { return _this.polyDragEnd.emit(ev); } },
            { name: 'dragstart', handler: function (ev) { return _this.polyDragStart.emit(ev); } },
            { name: 'mousedown', handler: function (ev) { return _this.polyMouseDown.emit(ev); } },
            { name: 'mousemove', handler: function (ev) { return _this.polyMouseMove.emit(ev); } },
            { name: 'mouseout', handler: function (ev) { return _this.polyMouseOut.emit(ev); } },
            { name: 'mouseover', handler: function (ev) { return _this.polyMouseOver.emit(ev); } },
            { name: 'mouseup', handler: function (ev) { return _this.polyMouseUp.emit(ev); } },
            { name: 'rightclick', handler: function (ev) { return _this.polyRightClick.emit(ev); } },
        ];
        handlers.forEach(function (obj) {
            var os = _this._polygonManager.createEventObservable(obj.name, _this).subscribe(obj.handler);
            _this._subscriptions.push(os);
        });
    };
    SebmGoogleMapPolygon.prototype._updatePolygonOptions = function (changes) {
        return Object.keys(changes)
            .filter(function (k) { return SebmGoogleMapPolygon._polygonOptionsAttributes.indexOf(k) !== -1; })
            .reduce(function (obj, k) {
            obj[k] = changes[k].currentValue;
            return obj;
        }, {});
    };
    /** @internal */
    SebmGoogleMapPolygon.prototype.id = function () { return this._id; };
    /** @internal */
    SebmGoogleMapPolygon.prototype.ngOnDestroy = function () {
        this._polygonManager.deletePolygon(this);
        // unsubscribe all registered observable subscriptions
        this._subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    SebmGoogleMapPolygon._polygonOptionsAttributes = [
        'clickable', 'draggable', 'editable', 'fillColor', 'fillOpacity', 'geodesic', 'icon', 'map',
        'paths', 'strokeColor', 'strokeOpacity', 'strokeWeight', 'visible', 'zIndex', 'draggable',
        'editable', 'visible'
    ];
    SebmGoogleMapPolygon.decorators = [
        { type: core_1.Directive, args: [{
                    selector: 'sebm-map-polygon',
                    inputs: [
                        'clickable',
                        'draggable: polyDraggable',
                        'editable',
                        'fillColor',
                        'fillOpacity',
                        'geodesic',
                        'paths',
                        'strokeColor',
                        'strokeOpacity',
                        'strokeWeight',
                        'visible',
                        'zIndex',
                    ],
                    outputs: [
                        'polyClick', 'polyDblClick', 'polyDrag', 'polyDragEnd', 'polyMouseDown', 'polyMouseMove',
                        'polyMouseOut', 'polyMouseOver', 'polyMouseUp', 'polyRightClick'
                    ]
                },] },
    ];
    /** @nocollapse */
    SebmGoogleMapPolygon.ctorParameters = function () { return [
        { type: polygon_manager_1.PolygonManager, },
    ]; };
    return SebmGoogleMapPolygon;
}());
exports.SebmGoogleMapPolygon = SebmGoogleMapPolygon;

},{"../services/managers/polygon-manager":19,"@angular/core":1}],9:[function(require,module,exports){
"use strict";
var core_1 = require('@angular/core');
/**
 * SebmGoogleMapPolylinePoint represents one element of a polyline within a  {@link
 * SembGoogleMapPolyline}
 */
var SebmGoogleMapPolylinePoint = (function () {
    function SebmGoogleMapPolylinePoint() {
        /**
         * This event emitter gets emitted when the position of the point changed.
         */
        this.positionChanged = new core_1.EventEmitter();
    }
    SebmGoogleMapPolylinePoint.prototype.ngOnChanges = function (changes) {
        if (changes['latitude'] || changes['longitude']) {
            var position = {
                lat: changes['latitude'].currentValue,
                lng: changes['longitude'].currentValue
            };
            this.positionChanged.emit(position);
        }
    };
    SebmGoogleMapPolylinePoint.decorators = [
        { type: core_1.Directive, args: [{ selector: 'sebm-google-map-polyline-point' },] },
    ];
    /** @nocollapse */
    SebmGoogleMapPolylinePoint.ctorParameters = function () { return []; };
    SebmGoogleMapPolylinePoint.propDecorators = {
        'latitude': [{ type: core_1.Input },],
        'longitude': [{ type: core_1.Input },],
        'positionChanged': [{ type: core_1.Output },],
    };
    return SebmGoogleMapPolylinePoint;
}());
exports.SebmGoogleMapPolylinePoint = SebmGoogleMapPolylinePoint;

},{"@angular/core":1}],10:[function(require,module,exports){
"use strict";
var core_1 = require('@angular/core');
var polyline_manager_1 = require('../services/managers/polyline-manager');
var google_map_polyline_point_1 = require('./google-map-polyline-point');
var polylineId = 0;
/**
 * SebmGoogleMapPolyline renders a polyline on a {@link SebmGoogleMap}
 *
 * ### Example
 * ```typescript
 * import { Component } from 'angular2/core';
 * import { SebmGoogleMap, SebmGooglePolyline, SebmGooglePolylinePoint } from
 * 'angular2-google-maps/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  directives: [SebmGoogleMap, SebmGooglePolyline, SebmGooglePolylinePoint],
 *  styles: [`
 *    .sebm-google-map-container {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <sebm-google-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *      <sebm-google-map-polyline>
 *          <sebm-google-map-polyline-point [latitude]="latA" [longitude]="lngA">
 *          </sebm-google-map-polyline-point>
 *          <sebm-google-map-polyline-point [latitude]="latB" [longitude]="lngB">
 *          </sebm-google-map-polyline-point>
 *      </sebm-google-map-polyline>
 *    </sebm-google-map>
 *  `
 * })
 * ```
 */
var SebmGoogleMapPolyline = (function () {
    function SebmGoogleMapPolyline(_polylineManager) {
        this._polylineManager = _polylineManager;
        /**
         * Indicates whether this Polyline handles mouse events. Defaults to true.
         */
        this.clickable = true;
        /**
         * If set to true, the user can drag this shape over the map. The geodesic property defines the
         * mode of dragging. Defaults to false.
         */
        this.draggable = false;
        /**
         * If set to true, the user can edit this shape by dragging the control points shown at the
         * vertices and on each segment. Defaults to false.
         */
        this.editable = false;
        /**
         * When true, edges of the polygon are interpreted as geodesic and will follow the curvature of
         * the Earth. When false, edges of the polygon are rendered as straight lines in screen space.
         * Note that the shape of a geodesic polygon may appear to change when dragged, as the dimensions
         * are maintained relative to the surface of the earth. Defaults to false.
         */
        this.geodesic = false;
        /**
         * Whether this polyline is visible on the map. Defaults to true.
         */
        this.visible = true;
        /**
         * This event is fired when the DOM click event is fired on the Polyline.
         */
        this.lineClick = new core_1.EventEmitter();
        /**
         * This event is fired when the DOM dblclick event is fired on the Polyline.
         */
        this.lineDblClick = new core_1.EventEmitter();
        /**
         * This event is repeatedly fired while the user drags the polyline.
         */
        this.lineDrag = new core_1.EventEmitter();
        /**
         * This event is fired when the user stops dragging the polyline.
         */
        this.lineDragEnd = new core_1.EventEmitter();
        /**
         * This event is fired when the user starts dragging the polyline.
         */
        this.lineDragStart = new core_1.EventEmitter();
        /**
         * This event is fired when the DOM mousedown event is fired on the Polyline.
         */
        this.lineMouseDown = new core_1.EventEmitter();
        /**
         * This event is fired when the DOM mousemove event is fired on the Polyline.
         */
        this.lineMouseMove = new core_1.EventEmitter();
        /**
         * This event is fired on Polyline mouseout.
         */
        this.lineMouseOut = new core_1.EventEmitter();
        /**
         * This event is fired on Polyline mouseover.
         */
        this.lineMouseOver = new core_1.EventEmitter();
        /**
         * This event is fired whe the DOM mouseup event is fired on the Polyline
         */
        this.lineMouseUp = new core_1.EventEmitter();
        /**
         * This even is fired when the Polyline is right-clicked on.
         */
        this.lineRightClick = new core_1.EventEmitter();
        this._polylineAddedToManager = false;
        this._subscriptions = [];
        this._id = (polylineId++).toString();
    }
    /** @internal */
    SebmGoogleMapPolyline.prototype.ngAfterContentInit = function () {
        var _this = this;
        if (this.points.length) {
            this.points.forEach(function (point) {
                var s = point.positionChanged.subscribe(function () { _this._polylineManager.updatePolylinePoints(_this); });
                _this._subscriptions.push(s);
            });
        }
        if (!this._polylineAddedToManager) {
            this._init();
        }
        var s = this.points.changes.subscribe(function () { return _this._polylineManager.updatePolylinePoints(_this); });
        this._subscriptions.push(s);
        this._polylineManager.updatePolylinePoints(this);
    };
    SebmGoogleMapPolyline.prototype.ngOnChanges = function (changes) {
        if (!this._polylineAddedToManager) {
            this._init();
            return;
        }
        var options = {};
        var optionKeys = Object.keys(changes).filter(function (k) { return SebmGoogleMapPolyline._polylineOptionsAttributes.indexOf(k) !== -1; });
        optionKeys.forEach(function (k) { return options[k] = changes[k].currentValue; });
        this._polylineManager.setPolylineOptions(this, options);
    };
    SebmGoogleMapPolyline.prototype._init = function () {
        this._polylineManager.addPolyline(this);
        this._polylineAddedToManager = true;
        this._addEventListeners();
    };
    SebmGoogleMapPolyline.prototype._addEventListeners = function () {
        var _this = this;
        var handlers = [
            { name: 'click', handler: function (ev) { return _this.lineClick.emit(ev); } },
            { name: 'dbclick', handler: function (ev) { return _this.lineDblClick.emit(ev); } },
            { name: 'drag', handler: function (ev) { return _this.lineDrag.emit(ev); } },
            { name: 'dragend', handler: function (ev) { return _this.lineDragEnd.emit(ev); } },
            { name: 'dragstart', handler: function (ev) { return _this.lineDragStart.emit(ev); } },
            { name: 'mousedown', handler: function (ev) { return _this.lineMouseDown.emit(ev); } },
            { name: 'mousemove', handler: function (ev) { return _this.lineMouseMove.emit(ev); } },
            { name: 'mouseout', handler: function (ev) { return _this.lineMouseOut.emit(ev); } },
            { name: 'mouseover', handler: function (ev) { return _this.lineMouseOver.emit(ev); } },
            { name: 'mouseup', handler: function (ev) { return _this.lineMouseUp.emit(ev); } },
            { name: 'rightclick', handler: function (ev) { return _this.lineRightClick.emit(ev); } },
        ];
        handlers.forEach(function (obj) {
            var os = _this._polylineManager.createEventObservable(obj.name, _this).subscribe(obj.handler);
            _this._subscriptions.push(os);
        });
    };
    /** @internal */
    SebmGoogleMapPolyline.prototype._getPoints = function () {
        if (this.points) {
            return this.points.toArray();
        }
        return [];
    };
    /** @internal */
    SebmGoogleMapPolyline.prototype.id = function () { return this._id; };
    /** @internal */
    SebmGoogleMapPolyline.prototype.ngOnDestroy = function () {
        this._polylineManager.deletePolyline(this);
        // unsubscribe all registered observable subscriptions
        this._subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    SebmGoogleMapPolyline._polylineOptionsAttributes = [
        'draggable', 'editable', 'visible', 'geodesic', 'strokeColor', 'strokeOpacity', 'strokeWeight',
        'zIndex'
    ];
    SebmGoogleMapPolyline.decorators = [
        { type: core_1.Directive, args: [{
                    selector: 'sebm-google-map-polyline',
                    inputs: [
                        'clickable', 'draggable: polylineDraggable', 'editable', 'geodesic', 'strokeColor',
                        'strokeWeight', 'strokeOpacity', 'visible', 'zIndex'
                    ],
                    outputs: [
                        'lineClick', 'lineDblClick', 'lineDrag', 'lineDragEnd', 'lineMouseDown', 'lineMouseMove',
                        'lineMouseOut', 'lineMouseOver', 'lineMouseUp', 'lineRightClick'
                    ]
                },] },
    ];
    /** @nocollapse */
    SebmGoogleMapPolyline.ctorParameters = function () { return [
        { type: polyline_manager_1.PolylineManager, },
    ]; };
    SebmGoogleMapPolyline.propDecorators = {
        'points': [{ type: core_1.ContentChildren, args: [google_map_polyline_point_1.SebmGoogleMapPolylinePoint,] },],
    };
    return SebmGoogleMapPolyline;
}());
exports.SebmGoogleMapPolyline = SebmGoogleMapPolyline;

},{"../services/managers/polyline-manager":20,"./google-map-polyline-point":9,"@angular/core":1}],11:[function(require,module,exports){
"use strict";
var core_1 = require('@angular/core');
var google_maps_api_wrapper_1 = require('../services/google-maps-api-wrapper');
var circle_manager_1 = require('../services/managers/circle-manager');
var info_window_manager_1 = require('../services/managers/info-window-manager');
var marker_manager_1 = require('../services/managers/marker-manager');
var polygon_manager_1 = require('../services/managers/polygon-manager');
var polyline_manager_1 = require('../services/managers/polyline-manager');
var kml_layer_manager_1 = require('./../services/managers/kml-layer-manager');
/**
 * SebMGoogleMap renders a Google Map.
 * **Important note**: To be able see a map in the browser, you have to define a height for the CSS
 * class `sebm-google-map-container`.
 *
 * ### Example
 * ```typescript
 * import { Component } from '@angular/core';
 * import { SebmGoogleMap } from 'angular2-google-maps/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  directives: [SebmGoogleMap],
 *  styles: [`
 *    .sebm-google-map-container {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <sebm-google-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *    </sebm-google-map>
 *  `
 * })
 * ```
 */
var SebmGoogleMap = (function () {
    function SebmGoogleMap(_elem, _mapsWrapper) {
        this._elem = _elem;
        this._mapsWrapper = _mapsWrapper;
        /**
         * The longitude that defines the center of the map.
         */
        this.longitude = 0;
        /**
         * The latitude that defines the center of the map.
         */
        this.latitude = 0;
        /**
         * The zoom level of the map. The default zoom level is 8.
         */
        this.zoom = 8;
        /**
         * Enables/disables if map is draggable.
         */
        this.draggable = true;
        /**
         * Enables/disables zoom and center on double click. Enabled by default.
         */
        this.disableDoubleClickZoom = false;
        /**
         * Enables/disables all default UI of the Google map. Please note: When the map is created, this
         * value cannot get updated.
         */
        this.disableDefaultUI = false;
        /**
         * If false, disables scrollwheel zooming on the map. The scrollwheel is enabled by default.
         */
        this.scrollwheel = true;
        /**
         * If false, prevents the map from being controlled by the keyboard. Keyboard shortcuts are
         * enabled by default.
         */
        this.keyboardShortcuts = true;
        /**
         * The enabled/disabled state of the Zoom control.
         */
        this.zoomControl = true;
        /**
         * Styles to apply to each of the default map types. Note that for Satellite/Hybrid and Terrain
         * modes, these styles will only apply to labels and geometry.
         */
        this.styles = [];
        /**
         * When true and the latitude and/or longitude values changes, the Google Maps panTo method is
         * used to
         * center the map. See: https://developers.google.com/maps/documentation/javascript/reference#Map
         */
        this.usePanning = false;
        /**
         * The initial enabled/disabled state of the Street View Pegman control.
         * This control is part of the default UI, and should be set to false when displaying a map type
         * on which the Street View road overlay should not appear (e.g. a non-Earth map type).
         */
        this.streetViewControl = true;
        /**
         * Sets the viewport to contain the given bounds.
         */
        this.fitBounds = null;
        /**
         * The initial enabled/disabled state of the Scale control. This is disabled by default.
         */
        this.scaleControl = false;
        /**
         * The initial enabled/disabled state of the Map type control.
         */
        this.mapTypeControl = false;
        this._observableSubscriptions = [];
        /**
         * This event emitter gets emitted when the user clicks on the map (but not when they click on a
         * marker or infoWindow).
         */
        this.mapClick = new core_1.EventEmitter();
        /**
         * This event emitter gets emitted when the user right-clicks on the map (but not when they click
         * on a marker or infoWindow).
         */
        this.mapRightClick = new core_1.EventEmitter();
        /**
         * This event emitter gets emitted when the user double-clicks on the map (but not when they click
         * on a marker or infoWindow).
         */
        this.mapDblClick = new core_1.EventEmitter();
        /**
         * This event emitter is fired when the map center changes.
         */
        this.centerChange = new core_1.EventEmitter();
        /**
         * This event is fired when the viewport bounds have changed.
         */
        this.boundsChange = new core_1.EventEmitter();
        /**
         * This event is fired when the map becomes idle after panning or zooming.
         */
        this.idle = new core_1.EventEmitter();
        /**
         * This event is fired when the zoom level has changed.
         */
        this.zoomChange = new core_1.EventEmitter();
    }
    /** @internal */
    SebmGoogleMap.prototype.ngOnInit = function () {
        // todo: this should be solved with a new component and a viewChild decorator
        var container = this._elem.nativeElement.querySelector('.sebm-google-map-container-inner');
        this._initMapInstance(container);
    };
    SebmGoogleMap.prototype._initMapInstance = function (el) {
        this._mapsWrapper.createMap(el, {
            center: { lat: this.latitude || 0, lng: this.longitude || 0 },
            zoom: this.zoom,
            minZoom: this.minZoom,
            maxZoom: this.maxZoom,
            disableDefaultUI: this.disableDefaultUI,
            backgroundColor: this.backgroundColor,
            draggable: this.draggable,
            draggableCursor: this.draggableCursor,
            draggingCursor: this.draggingCursor,
            keyboardShortcuts: this.keyboardShortcuts,
            zoomControl: this.zoomControl,
            styles: this.styles,
            streetViewControl: this.streetViewControl,
            scaleControl: this.scaleControl,
            mapTypeControl: this.mapTypeControl
        });
        // register event listeners
        this._handleMapCenterChange();
        this._handleMapZoomChange();
        this._handleMapMouseEvents();
        this._handleBoundsChange();
        this._handleIdleEvent();
    };
    /** @internal */
    SebmGoogleMap.prototype.ngOnDestroy = function () {
        // unsubscribe all registered observable subscriptions
        this._observableSubscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    /* @internal */
    SebmGoogleMap.prototype.ngOnChanges = function (changes) {
        this._updateMapOptionsChanges(changes);
        this._updatePosition(changes);
    };
    SebmGoogleMap.prototype._updateMapOptionsChanges = function (changes) {
        var options = {};
        var optionKeys = Object.keys(changes).filter(function (k) { return SebmGoogleMap._mapOptionsAttributes.indexOf(k) !== -1; });
        optionKeys.forEach(function (k) { options[k] = changes[k].currentValue; });
        this._mapsWrapper.setMapOptions(options);
    };
    /**
     * Triggers a resize event on the google map instance.
     * Returns a promise that gets resolved after the event was triggered.
     */
    SebmGoogleMap.prototype.triggerResize = function () {
        var _this = this;
        // Note: When we would trigger the resize event and show the map in the same turn (which is a
        // common case for triggering a resize event), then the resize event would not
        // work (to show the map), so we trigger the event in a timeout.
        return new Promise(function (resolve) {
            setTimeout(function () { return _this._mapsWrapper.triggerMapEvent('resize').then(function () { return resolve(); }); });
        });
    };
    SebmGoogleMap.prototype._updatePosition = function (changes) {
        if (changes['latitude'] == null && changes['longitude'] == null &&
            changes['fitBounds'] == null) {
            // no position update needed
            return;
        }
        // we prefer fitBounds in changes
        if (changes['fitBounds'] && this.fitBounds != null) {
            this._fitBounds();
            return;
        }
        if (typeof this.latitude !== 'number' || typeof this.longitude !== 'number') {
            return;
        }
        var newCenter = {
            lat: this.latitude,
            lng: this.longitude,
        };
        if (this.usePanning) {
            this._mapsWrapper.panTo(newCenter);
        }
        else {
            this._mapsWrapper.setCenter(newCenter);
        }
    };
    SebmGoogleMap.prototype._fitBounds = function () {
        if (this.usePanning) {
            this._mapsWrapper.panToBounds(this.fitBounds);
            return;
        }
        this._mapsWrapper.fitBounds(this.fitBounds);
    };
    SebmGoogleMap.prototype._handleMapCenterChange = function () {
        var _this = this;
        var s = this._mapsWrapper.subscribeToMapEvent('center_changed').subscribe(function () {
            _this._mapsWrapper.getCenter().then(function (center) {
                _this.latitude = center.lat();
                _this.longitude = center.lng();
                _this.centerChange.emit({ lat: _this.latitude, lng: _this.longitude });
            });
        });
        this._observableSubscriptions.push(s);
    };
    SebmGoogleMap.prototype._handleBoundsChange = function () {
        var _this = this;
        var s = this._mapsWrapper.subscribeToMapEvent('bounds_changed').subscribe(function () {
            _this._mapsWrapper.getBounds().then(function (bounds) { _this.boundsChange.emit(bounds); });
        });
        this._observableSubscriptions.push(s);
    };
    SebmGoogleMap.prototype._handleMapZoomChange = function () {
        var _this = this;
        var s = this._mapsWrapper.subscribeToMapEvent('zoom_changed').subscribe(function () {
            _this._mapsWrapper.getZoom().then(function (z) {
                _this.zoom = z;
                _this.zoomChange.emit(z);
            });
        });
        this._observableSubscriptions.push(s);
    };
    SebmGoogleMap.prototype._handleIdleEvent = function () {
        var _this = this;
        var s = this._mapsWrapper.subscribeToMapEvent('idle').subscribe(function () { _this.idle.emit(void 0); });
        this._observableSubscriptions.push(s);
    };
    SebmGoogleMap.prototype._handleMapMouseEvents = function () {
        var _this = this;
        var events = [
            { name: 'click', emitter: this.mapClick },
            { name: 'rightclick', emitter: this.mapRightClick },
        ];
        events.forEach(function (e) {
            var s = _this._mapsWrapper.subscribeToMapEvent(e.name).subscribe(function (event) {
                var value = { coords: { lat: event.latLng.lat(), lng: event.latLng.lng() } };
                e.emitter.emit(value);
            });
            _this._observableSubscriptions.push(s);
        });
    };
    /**
     * Map option attributes that can change over time
     */
    SebmGoogleMap._mapOptionsAttributes = [
        'disableDoubleClickZoom', 'scrollwheel', 'draggable', 'draggableCursor', 'draggingCursor',
        'keyboardShortcuts', 'zoomControl', 'styles', 'streetViewControl', 'zoom', 'mapTypeControl',
        'minZoom', 'maxZoom'
    ];
    SebmGoogleMap.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'sebm-google-map',
                    providers: [
                        google_maps_api_wrapper_1.GoogleMapsAPIWrapper, marker_manager_1.MarkerManager, info_window_manager_1.InfoWindowManager, circle_manager_1.CircleManager, polyline_manager_1.PolylineManager,
                        polygon_manager_1.PolygonManager, kml_layer_manager_1.KmlLayerManager
                    ],
                    inputs: [
                        'longitude', 'latitude', 'zoom', 'minZoom', 'maxZoom', 'draggable: mapDraggable',
                        'disableDoubleClickZoom', 'disableDefaultUI', 'scrollwheel', 'backgroundColor', 'draggableCursor',
                        'draggingCursor', 'keyboardShortcuts', 'zoomControl', 'styles', 'usePanning', 'streetViewControl',
                        'fitBounds', 'scaleControl', 'mapTypeControl'
                    ],
                    outputs: [
                        'mapClick', 'mapRightClick', 'mapDblClick', 'centerChange', 'idle', 'boundsChange', 'zoomChange'
                    ],
                    host: { '[class.sebm-google-map-container]': 'true' },
                    styles: ["\n    .sebm-google-map-container-inner {\n      width: inherit;\n      height: inherit;\n    }\n    .sebm-google-map-content {\n      display:none;\n    }\n  "],
                    template: "\n    <div class='sebm-google-map-container-inner'></div>\n    <div class='sebm-google-map-content'>\n      <ng-content></ng-content>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    SebmGoogleMap.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: google_maps_api_wrapper_1.GoogleMapsAPIWrapper, },
    ]; };
    return SebmGoogleMap;
}());
exports.SebmGoogleMap = SebmGoogleMap;

},{"../services/google-maps-api-wrapper":14,"../services/managers/circle-manager":15,"../services/managers/info-window-manager":16,"../services/managers/marker-manager":18,"../services/managers/polygon-manager":19,"../services/managers/polyline-manager":20,"./../services/managers/kml-layer-manager":17,"@angular/core":1}],12:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
// main modules
__export(require('./directives'));
__export(require('./services'));
// Google Maps types
// core module
// we explicitly export the module here to prevent this Ionic 2 bug:
// http://stevemichelotti.com/integrate-angular-2-google-maps-into-ionic-2/
var core_module_1 = require('./core-module');
exports.AgmCoreModule = core_module_1.AgmCoreModule;

},{"./core-module":2,"./directives":3,"./services":13}],13:[function(require,module,exports){
"use strict";
var google_maps_api_wrapper_1 = require('./services/google-maps-api-wrapper');
exports.GoogleMapsAPIWrapper = google_maps_api_wrapper_1.GoogleMapsAPIWrapper;
var circle_manager_1 = require('./services/managers/circle-manager');
exports.CircleManager = circle_manager_1.CircleManager;
var info_window_manager_1 = require('./services/managers/info-window-manager');
exports.InfoWindowManager = info_window_manager_1.InfoWindowManager;
var marker_manager_1 = require('./services/managers/marker-manager');
exports.MarkerManager = marker_manager_1.MarkerManager;
var polygon_manager_1 = require('./services/managers/polygon-manager');
exports.PolygonManager = polygon_manager_1.PolygonManager;
var polyline_manager_1 = require('./services/managers/polyline-manager');
exports.PolylineManager = polyline_manager_1.PolylineManager;
var kml_layer_manager_1 = require('./services/managers/kml-layer-manager');
exports.KmlLayerManager = kml_layer_manager_1.KmlLayerManager;
var lazy_maps_api_loader_1 = require('./services/maps-api-loader/lazy-maps-api-loader');
exports.GoogleMapsScriptProtocol = lazy_maps_api_loader_1.GoogleMapsScriptProtocol;
exports.LAZY_MAPS_API_CONFIG = lazy_maps_api_loader_1.LAZY_MAPS_API_CONFIG;
exports.LazyMapsAPILoader = lazy_maps_api_loader_1.LazyMapsAPILoader;
var maps_api_loader_1 = require('./services/maps-api-loader/maps-api-loader');
exports.MapsAPILoader = maps_api_loader_1.MapsAPILoader;
var noop_maps_api_loader_1 = require('./services/maps-api-loader/noop-maps-api-loader');
exports.NoOpMapsAPILoader = noop_maps_api_loader_1.NoOpMapsAPILoader;

},{"./services/google-maps-api-wrapper":14,"./services/managers/circle-manager":15,"./services/managers/info-window-manager":16,"./services/managers/kml-layer-manager":17,"./services/managers/marker-manager":18,"./services/managers/polygon-manager":19,"./services/managers/polyline-manager":20,"./services/maps-api-loader/lazy-maps-api-loader":21,"./services/maps-api-loader/maps-api-loader":22,"./services/maps-api-loader/noop-maps-api-loader":23}],14:[function(require,module,exports){
"use strict";
var core_1 = require('@angular/core');
var Observable_1 = require('rxjs/Observable');
var maps_api_loader_1 = require('./maps-api-loader/maps-api-loader');
/**
 * Wrapper class that handles the communication with the Google Maps Javascript
 * API v3
 */
var GoogleMapsAPIWrapper = (function () {
    function GoogleMapsAPIWrapper(_loader, _zone) {
        var _this = this;
        this._loader = _loader;
        this._zone = _zone;
        this._map =
            new Promise(function (resolve) { _this._mapResolver = resolve; });
    }
    GoogleMapsAPIWrapper.prototype.createMap = function (el, mapOptions) {
        var _this = this;
        return this._loader.load().then(function () {
            var map = new google.maps.Map(el, mapOptions);
            _this._mapResolver(map);
            return;
        });
    };
    GoogleMapsAPIWrapper.prototype.setMapOptions = function (options) {
        this._map.then(function (m) { m.setOptions(options); });
    };
    /**
     * Creates a google map marker with the map context
     */
    GoogleMapsAPIWrapper.prototype.createMarker = function (options) {
        if (options === void 0) { options = {}; }
        return this._map.then(function (map) {
            options.map = map;
            return new google.maps.Marker(options);
        });
    };
    GoogleMapsAPIWrapper.prototype.createInfoWindow = function (options) {
        return this._map.then(function () { return new google.maps.InfoWindow(options); });
    };
    /**
     * Creates a google.map.Circle for the current map.
     */
    GoogleMapsAPIWrapper.prototype.createCircle = function (options) {
        return this._map.then(function (map) {
            options.map = map;
            return new google.maps.Circle(options);
        });
    };
    GoogleMapsAPIWrapper.prototype.createPolyline = function (options) {
        return this.getNativeMap().then(function (map) {
            var line = new google.maps.Polyline(options);
            line.setMap(map);
            return line;
        });
    };
    GoogleMapsAPIWrapper.prototype.createPolygon = function (options) {
        return this.getNativeMap().then(function (map) {
            var polygon = new google.maps.Polygon(options);
            polygon.setMap(map);
            return polygon;
        });
    };
    /**
     * Determines if given coordinates are insite a Polygon path.
     */
    GoogleMapsAPIWrapper.prototype.containsLocation = function (latLng, polygon) {
        return google.maps.geometry.poly.containsLocation(latLng, polygon);
    };
    GoogleMapsAPIWrapper.prototype.subscribeToMapEvent = function (eventName) {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            _this._map.then(function (m) {
                m.addListener(eventName, function (arg) { _this._zone.run(function () { return observer.next(arg); }); });
            });
        });
    };
    GoogleMapsAPIWrapper.prototype.setCenter = function (latLng) {
        return this._map.then(function (map) { return map.setCenter(latLng); });
    };
    GoogleMapsAPIWrapper.prototype.getZoom = function () { return this._map.then(function (map) { return map.getZoom(); }); };
    GoogleMapsAPIWrapper.prototype.getBounds = function () {
        return this._map.then(function (map) { return map.getBounds(); });
    };
    GoogleMapsAPIWrapper.prototype.setZoom = function (zoom) {
        return this._map.then(function (map) { return map.setZoom(zoom); });
    };
    GoogleMapsAPIWrapper.prototype.getCenter = function () {
        return this._map.then(function (map) { return map.getCenter(); });
    };
    GoogleMapsAPIWrapper.prototype.panTo = function (latLng) {
        return this._map.then(function (map) { return map.panTo(latLng); });
    };
    GoogleMapsAPIWrapper.prototype.fitBounds = function (latLng) {
        return this._map.then(function (map) { return map.fitBounds(latLng); });
    };
    GoogleMapsAPIWrapper.prototype.panToBounds = function (latLng) {
        return this._map.then(function (map) { return map.panToBounds(latLng); });
    };
    /**
     * Returns the native Google Maps Map instance. Be careful when using this instance directly.
     */
    GoogleMapsAPIWrapper.prototype.getNativeMap = function () { return this._map; };
    /**
     * Triggers the given event name on the map instance.
     */
    GoogleMapsAPIWrapper.prototype.triggerMapEvent = function (eventName) {
        return this._map.then(function (m) { return google.maps.event.trigger(m, eventName); });
    };
    GoogleMapsAPIWrapper.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    GoogleMapsAPIWrapper.ctorParameters = function () { return [
        { type: maps_api_loader_1.MapsAPILoader, },
        { type: core_1.NgZone, },
    ]; };
    return GoogleMapsAPIWrapper;
}());
exports.GoogleMapsAPIWrapper = GoogleMapsAPIWrapper;

},{"./maps-api-loader/maps-api-loader":22,"@angular/core":1,"rxjs/Observable":28}],15:[function(require,module,exports){
"use strict";
var core_1 = require('@angular/core');
var Observable_1 = require('rxjs/Observable');
var google_maps_api_wrapper_1 = require('../google-maps-api-wrapper');
var CircleManager = (function () {
    function CircleManager(_apiWrapper, _zone) {
        this._apiWrapper = _apiWrapper;
        this._zone = _zone;
        this._circles = new Map();
    }
    CircleManager.prototype.addCircle = function (circle) {
        this._circles.set(circle, this._apiWrapper.createCircle({
            center: { lat: circle.latitude, lng: circle.longitude },
            clickable: circle.clickable,
            draggable: circle.draggable,
            editable: circle.editable,
            fillColor: circle.fillColor,
            fillOpacity: circle.fillOpacity,
            radius: circle.radius,
            strokeColor: circle.strokeColor,
            strokeOpacity: circle.strokeOpacity,
            strokePosition: circle.strokePosition,
            strokeWeight: circle.strokeWeight,
            visible: circle.visible,
            zIndex: circle.zIndex
        }));
    };
    ;
    /**
     * Removes the given circle from the map.
     */
    CircleManager.prototype.removeCircle = function (circle) {
        var _this = this;
        return this._circles.get(circle).then(function (c) {
            c.setMap(null);
            _this._circles.delete(circle);
        });
    };
    CircleManager.prototype.setOptions = function (circle, options) {
        return this._circles.get(circle).then(function (c) { return c.setOptions(options); });
    };
    ;
    CircleManager.prototype.getBounds = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.getBounds(); });
    };
    ;
    CircleManager.prototype.getCenter = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.getCenter(); });
    };
    ;
    CircleManager.prototype.getRadius = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.getRadius(); });
    };
    CircleManager.prototype.setCenter = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.setCenter({ lat: circle.latitude, lng: circle.longitude }); });
    };
    ;
    CircleManager.prototype.setEditable = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.setEditable(circle.editable); });
    };
    ;
    CircleManager.prototype.setDraggable = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.setDraggable(circle.draggable); });
    };
    ;
    CircleManager.prototype.setVisible = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.setVisible(circle.visible); });
    };
    ;
    CircleManager.prototype.setRadius = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.setRadius(circle.radius); });
    };
    ;
    CircleManager.prototype.createEventObservable = function (eventName, circle) {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            var listener = null;
            _this._circles.get(circle).then(function (c) {
                listener = c.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
            });
            return function () {
                if (listener !== null) {
                    listener.remove();
                }
            };
        });
    };
    CircleManager.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    CircleManager.ctorParameters = function () { return [
        { type: google_maps_api_wrapper_1.GoogleMapsAPIWrapper, },
        { type: core_1.NgZone, },
    ]; };
    return CircleManager;
}());
exports.CircleManager = CircleManager;

},{"../google-maps-api-wrapper":14,"@angular/core":1,"rxjs/Observable":28}],16:[function(require,module,exports){
"use strict";
var Observable_1 = require('rxjs/Observable');
var core_1 = require('@angular/core');
var google_maps_api_wrapper_1 = require('../google-maps-api-wrapper');
var marker_manager_1 = require('./marker-manager');
var InfoWindowManager = (function () {
    function InfoWindowManager(_mapsWrapper, _zone, _markerManager) {
        this._mapsWrapper = _mapsWrapper;
        this._zone = _zone;
        this._markerManager = _markerManager;
        this._infoWindows = new Map();
    }
    InfoWindowManager.prototype.deleteInfoWindow = function (infoWindow) {
        var _this = this;
        var iWindow = this._infoWindows.get(infoWindow);
        if (iWindow == null) {
            // info window already deleted
            return Promise.resolve();
        }
        return iWindow.then(function (i) {
            return _this._zone.run(function () {
                i.close();
                _this._infoWindows.delete(infoWindow);
            });
        });
    };
    InfoWindowManager.prototype.setPosition = function (infoWindow) {
        return this._infoWindows.get(infoWindow).then(function (i) { return i.setPosition({
            lat: infoWindow.latitude,
            lng: infoWindow.longitude
        }); });
    };
    InfoWindowManager.prototype.setZIndex = function (infoWindow) {
        return this._infoWindows.get(infoWindow)
            .then(function (i) { return i.setZIndex(infoWindow.zIndex); });
    };
    InfoWindowManager.prototype.open = function (infoWindow) {
        var _this = this;
        return this._infoWindows.get(infoWindow).then(function (w) {
            if (infoWindow.hostMarker != null) {
                return _this._markerManager.getNativeMarker(infoWindow.hostMarker).then(function (marker) {
                    return _this._mapsWrapper.getNativeMap().then(function (map) { return w.open(map, marker); });
                });
            }
            return _this._mapsWrapper.getNativeMap().then(function (map) { return w.open(map); });
        });
    };
    InfoWindowManager.prototype.close = function (infoWindow) {
        return this._infoWindows.get(infoWindow).then(function (w) { return w.close(); });
    };
    InfoWindowManager.prototype.setOptions = function (infoWindow, options) {
        return this._infoWindows.get(infoWindow).then(function (i) { return i.setOptions(options); });
    };
    InfoWindowManager.prototype.addInfoWindow = function (infoWindow) {
        var options = {
            content: infoWindow.content,
            maxWidth: infoWindow.maxWidth,
            zIndex: infoWindow.zIndex,
        };
        if (typeof infoWindow.latitude === 'number' && typeof infoWindow.longitude === 'number') {
            options.position = { lat: infoWindow.latitude, lng: infoWindow.longitude };
        }
        var infoWindowPromise = this._mapsWrapper.createInfoWindow(options);
        this._infoWindows.set(infoWindow, infoWindowPromise);
    };
    /**
     * Creates a Google Maps event listener for the given InfoWindow as an Observable
     */
    InfoWindowManager.prototype.createEventObservable = function (eventName, infoWindow) {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            _this._infoWindows.get(infoWindow).then(function (i) {
                i.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
            });
        });
    };
    InfoWindowManager.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    InfoWindowManager.ctorParameters = function () { return [
        { type: google_maps_api_wrapper_1.GoogleMapsAPIWrapper, },
        { type: core_1.NgZone, },
        { type: marker_manager_1.MarkerManager, },
    ]; };
    return InfoWindowManager;
}());
exports.InfoWindowManager = InfoWindowManager;

},{"../google-maps-api-wrapper":14,"./marker-manager":18,"@angular/core":1,"rxjs/Observable":28}],17:[function(require,module,exports){
"use strict";
var core_1 = require('@angular/core');
var Observable_1 = require('rxjs/Observable');
var google_maps_api_wrapper_1 = require('./../google-maps-api-wrapper');
/**
 * Manages all KML Layers for a Google Map instance.
 */
var KmlLayerManager = (function () {
    function KmlLayerManager(_wrapper, _zone) {
        this._wrapper = _wrapper;
        this._zone = _zone;
        this._layers = new Map();
    }
    /**
     * Adds a new KML Layer to the map.
     */
    KmlLayerManager.prototype.addKmlLayer = function (layer) {
        var newLayer = this._wrapper.getNativeMap().then(function (m) {
            return new google.maps.KmlLayer({
                clickable: layer.clickable,
                map: m,
                preserveViewport: layer.preserveViewport,
                screenOverlays: layer.screenOverlays,
                suppressInfoWindows: layer.suppressInfoWindows,
                url: layer.url,
                zIndex: layer.zIndex
            });
        });
        this._layers.set(layer, newLayer);
    };
    KmlLayerManager.prototype.setOptions = function (layer, options) {
        this._layers.get(layer).then(function (l) { return l.setOptions(options); });
    };
    KmlLayerManager.prototype.deleteKmlLayer = function (layer) {
        var _this = this;
        this._layers.get(layer).then(function (l) {
            l.setMap(null);
            _this._layers.delete(layer);
        });
    };
    /**
     * Creates a Google Maps event listener for the given KmlLayer as an Observable
     */
    KmlLayerManager.prototype.createEventObservable = function (eventName, layer) {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            _this._layers.get(layer).then(function (m) {
                m.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
            });
        });
    };
    KmlLayerManager.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    KmlLayerManager.ctorParameters = function () { return [
        { type: google_maps_api_wrapper_1.GoogleMapsAPIWrapper, },
        { type: core_1.NgZone, },
    ]; };
    return KmlLayerManager;
}());
exports.KmlLayerManager = KmlLayerManager;

},{"./../google-maps-api-wrapper":14,"@angular/core":1,"rxjs/Observable":28}],18:[function(require,module,exports){
"use strict";
var core_1 = require('@angular/core');
var Observable_1 = require('rxjs/Observable');
var google_maps_api_wrapper_1 = require('./../google-maps-api-wrapper');
var MarkerManager = (function () {
    function MarkerManager(_mapsWrapper, _zone) {
        this._mapsWrapper = _mapsWrapper;
        this._zone = _zone;
        this._markers = new Map();
    }
    MarkerManager.prototype.deleteMarker = function (marker) {
        var _this = this;
        var m = this._markers.get(marker);
        if (m == null) {
            // marker already deleted
            return Promise.resolve();
        }
        return m.then(function (m) {
            return _this._zone.run(function () {
                m.setMap(null);
                _this._markers.delete(marker);
            });
        });
    };
    MarkerManager.prototype.updateMarkerPosition = function (marker) {
        return this._markers.get(marker).then(function (m) { return m.setPosition({ lat: marker.latitude, lng: marker.longitude }); });
    };
    MarkerManager.prototype.updateTitle = function (marker) {
        return this._markers.get(marker).then(function (m) { return m.setTitle(marker.title); });
    };
    MarkerManager.prototype.updateLabel = function (marker) {
        return this._markers.get(marker).then(function (m) { m.setLabel(marker.label); });
    };
    MarkerManager.prototype.updateDraggable = function (marker) {
        return this._markers.get(marker).then(function (m) { return m.setDraggable(marker.draggable); });
    };
    MarkerManager.prototype.updateIcon = function (marker) {
        return this._markers.get(marker).then(function (m) { return m.setIcon(marker.iconUrl); });
    };
    MarkerManager.prototype.updateOpacity = function (marker) {
        return this._markers.get(marker).then(function (m) { return m.setOpacity(marker.opacity); });
    };
    MarkerManager.prototype.updateVisible = function (marker) {
        return this._markers.get(marker).then(function (m) { return m.setVisible(marker.visible); });
    };
    MarkerManager.prototype.updateZIndex = function (marker) {
        return this._markers.get(marker).then(function (m) { return m.setZIndex(marker.zIndex); });
    };
    MarkerManager.prototype.addMarker = function (marker) {
        var markerPromise = this._mapsWrapper.createMarker({
            position: { lat: marker.latitude, lng: marker.longitude },
            label: marker.label,
            draggable: marker.draggable,
            icon: marker.iconUrl,
            opacity: marker.opacity,
            visible: marker.visible,
            zIndex: marker.zIndex,
            title: marker.title
        });
        this._markers.set(marker, markerPromise);
    };
    MarkerManager.prototype.getNativeMarker = function (marker) {
        return this._markers.get(marker);
    };
    MarkerManager.prototype.createEventObservable = function (eventName, marker) {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            _this._markers.get(marker).then(function (m) {
                m.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
            });
        });
    };
    MarkerManager.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    MarkerManager.ctorParameters = function () { return [
        { type: google_maps_api_wrapper_1.GoogleMapsAPIWrapper, },
        { type: core_1.NgZone, },
    ]; };
    return MarkerManager;
}());
exports.MarkerManager = MarkerManager;

},{"./../google-maps-api-wrapper":14,"@angular/core":1,"rxjs/Observable":28}],19:[function(require,module,exports){
"use strict";
var core_1 = require('@angular/core');
var Observable_1 = require('rxjs/Observable');
var google_maps_api_wrapper_1 = require('../google-maps-api-wrapper');
var PolygonManager = (function () {
    function PolygonManager(_mapsWrapper, _zone) {
        this._mapsWrapper = _mapsWrapper;
        this._zone = _zone;
        this._polygons = new Map();
    }
    PolygonManager.prototype.addPolygon = function (path) {
        var polygonPromise = this._mapsWrapper.createPolygon({
            clickable: path.clickable,
            draggable: path.draggable,
            editable: path.editable,
            fillColor: path.fillColor,
            fillOpacity: path.fillOpacity,
            geodesic: path.geodesic,
            paths: path.paths,
            strokeColor: path.strokeColor,
            strokeOpacity: path.strokeOpacity,
            strokeWeight: path.strokeWeight,
            visible: path.visible,
            zIndex: path.zIndex,
        });
        this._polygons.set(path, polygonPromise);
    };
    PolygonManager.prototype.updatePolygon = function (polygon) {
        var _this = this;
        var m = this._polygons.get(polygon);
        if (m == null) {
            return Promise.resolve();
        }
        return m.then(function (l) { return _this._zone.run(function () { l.setPaths(polygon.paths); }); });
    };
    PolygonManager.prototype.setPolygonOptions = function (path, options) {
        return this._polygons.get(path).then(function (l) { l.setOptions(options); });
    };
    PolygonManager.prototype.deletePolygon = function (paths) {
        var _this = this;
        var m = this._polygons.get(paths);
        if (m == null) {
            return Promise.resolve();
        }
        return m.then(function (l) {
            return _this._zone.run(function () {
                l.setMap(null);
                _this._polygons.delete(paths);
            });
        });
    };
    PolygonManager.prototype.createEventObservable = function (eventName, path) {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            _this._polygons.get(path).then(function (l) {
                l.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
            });
        });
    };
    PolygonManager.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    PolygonManager.ctorParameters = function () { return [
        { type: google_maps_api_wrapper_1.GoogleMapsAPIWrapper, },
        { type: core_1.NgZone, },
    ]; };
    return PolygonManager;
}());
exports.PolygonManager = PolygonManager;

},{"../google-maps-api-wrapper":14,"@angular/core":1,"rxjs/Observable":28}],20:[function(require,module,exports){
"use strict";
var core_1 = require('@angular/core');
var Observable_1 = require('rxjs/Observable');
var google_maps_api_wrapper_1 = require('../google-maps-api-wrapper');
var PolylineManager = (function () {
    function PolylineManager(_mapsWrapper, _zone) {
        this._mapsWrapper = _mapsWrapper;
        this._zone = _zone;
        this._polylines = new Map();
    }
    PolylineManager._convertPoints = function (line) {
        var path = line._getPoints().map(function (point) {
            return { lat: point.latitude, lng: point.longitude };
        });
        return path;
    };
    PolylineManager.prototype.addPolyline = function (line) {
        var path = PolylineManager._convertPoints(line);
        var polylinePromise = this._mapsWrapper.createPolyline({
            clickable: line.clickable,
            draggable: line.draggable,
            editable: line.editable,
            geodesic: line.geodesic,
            strokeColor: line.strokeColor,
            strokeOpacity: line.strokeOpacity,
            strokeWeight: line.strokeWeight,
            visible: line.visible,
            zIndex: line.zIndex,
            path: path
        });
        this._polylines.set(line, polylinePromise);
    };
    PolylineManager.prototype.updatePolylinePoints = function (line) {
        var _this = this;
        var path = PolylineManager._convertPoints(line);
        var m = this._polylines.get(line);
        if (m == null) {
            return Promise.resolve();
        }
        return m.then(function (l) { return _this._zone.run(function () { l.setPath(path); }); });
    };
    PolylineManager.prototype.setPolylineOptions = function (line, options) {
        return this._polylines.get(line).then(function (l) { l.setOptions(options); });
    };
    PolylineManager.prototype.deletePolyline = function (line) {
        var _this = this;
        var m = this._polylines.get(line);
        if (m == null) {
            return Promise.resolve();
        }
        return m.then(function (l) {
            return _this._zone.run(function () {
                l.setMap(null);
                _this._polylines.delete(line);
            });
        });
    };
    PolylineManager.prototype.createEventObservable = function (eventName, line) {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            _this._polylines.get(line).then(function (l) {
                l.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
            });
        });
    };
    PolylineManager.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    PolylineManager.ctorParameters = function () { return [
        { type: google_maps_api_wrapper_1.GoogleMapsAPIWrapper, },
        { type: core_1.NgZone, },
    ]; };
    return PolylineManager;
}());
exports.PolylineManager = PolylineManager;

},{"../google-maps-api-wrapper":14,"@angular/core":1,"rxjs/Observable":28}],21:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core_1 = require('@angular/core');
var browser_globals_1 = require('../../utils/browser-globals');
var maps_api_loader_1 = require('./maps-api-loader');
(function (GoogleMapsScriptProtocol) {
    GoogleMapsScriptProtocol[GoogleMapsScriptProtocol["HTTP"] = 1] = "HTTP";
    GoogleMapsScriptProtocol[GoogleMapsScriptProtocol["HTTPS"] = 2] = "HTTPS";
    GoogleMapsScriptProtocol[GoogleMapsScriptProtocol["AUTO"] = 3] = "AUTO";
})(exports.GoogleMapsScriptProtocol || (exports.GoogleMapsScriptProtocol = {}));
var GoogleMapsScriptProtocol = exports.GoogleMapsScriptProtocol;
/**
 * Token for the config of the LazyMapsAPILoader. Please provide an object of type {@link
 * LazyMapsAPILoaderConfig}.
 */
exports.LAZY_MAPS_API_CONFIG = new core_1.OpaqueToken('angular2-google-maps LAZY_MAPS_API_CONFIG');
var LazyMapsAPILoader = (function (_super) {
    __extends(LazyMapsAPILoader, _super);
    function LazyMapsAPILoader(config, w, d) {
        _super.call(this);
        this._config = config || {};
        this._windowRef = w;
        this._documentRef = d;
    }
    LazyMapsAPILoader.prototype.load = function () {
        var _this = this;
        if (this._scriptLoadingPromise) {
            return this._scriptLoadingPromise;
        }
        var script = this._documentRef.getNativeDocument().createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.defer = true;
        var callbackName = "angular2GoogleMapsLazyMapsAPILoader";
        script.src = this._getScriptSrc(callbackName);
        this._scriptLoadingPromise = new Promise(function (resolve, reject) {
            _this._windowRef.getNativeWindow()[callbackName] = function () { resolve(); };
            script.onerror = function (error) { reject(error); };
        });
        this._documentRef.getNativeDocument().body.appendChild(script);
        return this._scriptLoadingPromise;
    };
    LazyMapsAPILoader.prototype._getScriptSrc = function (callbackName) {
        var protocolType = (this._config && this._config.protocol) || GoogleMapsScriptProtocol.HTTPS;
        var protocol;
        switch (protocolType) {
            case GoogleMapsScriptProtocol.AUTO:
                protocol = '';
                break;
            case GoogleMapsScriptProtocol.HTTP:
                protocol = 'http:';
                break;
            case GoogleMapsScriptProtocol.HTTPS:
                protocol = 'https:';
                break;
        }
        var hostAndPath = this._config.hostAndPath || 'maps.googleapis.com/maps/api/js';
        var queryParams = {
            v: this._config.apiVersion || '3',
            callback: callbackName,
            key: this._config.apiKey,
            client: this._config.clientId,
            channel: this._config.channel,
            libraries: this._config.libraries,
            region: this._config.region,
            language: this._config.language
        };
        var params = Object.keys(queryParams)
            .filter(function (k) { return queryParams[k] != null; })
            .filter(function (k) {
            // remove empty arrays
            return !Array.isArray(queryParams[k]) ||
                (Array.isArray(queryParams[k]) && queryParams[k].length > 0);
        })
            .map(function (k) {
            // join arrays as comma seperated strings
            var i = queryParams[k];
            if (Array.isArray(i)) {
                return { key: k, value: i.join(',') };
            }
            return { key: k, value: queryParams[k] };
        })
            .map(function (entry) { return entry.key + "=" + entry.value; })
            .join('&');
        return protocol + "//" + hostAndPath + "?" + params;
    };
    LazyMapsAPILoader.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    LazyMapsAPILoader.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: core_1.Inject, args: [exports.LAZY_MAPS_API_CONFIG,] },] },
        { type: browser_globals_1.WindowRef, },
        { type: browser_globals_1.DocumentRef, },
    ]; };
    return LazyMapsAPILoader;
}(maps_api_loader_1.MapsAPILoader));
exports.LazyMapsAPILoader = LazyMapsAPILoader;

},{"../../utils/browser-globals":24,"./maps-api-loader":22,"@angular/core":1}],22:[function(require,module,exports){
"use strict";
var core_1 = require('@angular/core');
var MapsAPILoader = (function () {
    function MapsAPILoader() {
    }
    MapsAPILoader.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    MapsAPILoader.ctorParameters = function () { return []; };
    return MapsAPILoader;
}());
exports.MapsAPILoader = MapsAPILoader;

},{"@angular/core":1}],23:[function(require,module,exports){
"use strict";
/**
 * When using the NoOpMapsAPILoader, the Google Maps API must be added to the page via a `<script>`
 * Tag.
 * It's important that the Google Maps API script gets loaded first on the page.
 */
var NoOpMapsAPILoader = (function () {
    function NoOpMapsAPILoader() {
    }
    NoOpMapsAPILoader.prototype.load = function () {
        if (!window.google || !window.google.maps) {
            throw new Error('Google Maps API not loaded on page. Make sure window.google.maps is available!');
        }
        return Promise.resolve();
    };
    ;
    return NoOpMapsAPILoader;
}());
exports.NoOpMapsAPILoader = NoOpMapsAPILoader;

},{}],24:[function(require,module,exports){
"use strict";
var WindowRef = (function () {
    function WindowRef() {
    }
    WindowRef.prototype.getNativeWindow = function () { return window; };
    return WindowRef;
}());
exports.WindowRef = WindowRef;
var DocumentRef = (function () {
    function DocumentRef() {
    }
    DocumentRef.prototype.getNativeDocument = function () { return document; };
    return DocumentRef;
}());
exports.DocumentRef = DocumentRef;
exports.BROWSER_GLOBALS_PROVIDERS = [WindowRef, DocumentRef];

},{}],25:[function(require,module,exports){
/**
 * core-js 2.4.1
 * https://github.com/zloirock/core-js
 * License: http://rock.mit-license.org
 * © 2016 Denis Pushkarev
 */
!function(a,b,c){"use strict";!function(a){function __webpack_require__(c){if(b[c])return b[c].exports;var d=b[c]={exports:{},id:c,loaded:!1};return a[c].call(d.exports,d,d.exports,__webpack_require__),d.loaded=!0,d.exports}var b={};return __webpack_require__.m=a,__webpack_require__.c=b,__webpack_require__.p="",__webpack_require__(0)}([function(a,b,c){c(1),c(50),c(51),c(52),c(54),c(55),c(58),c(59),c(60),c(61),c(62),c(63),c(64),c(65),c(66),c(68),c(70),c(72),c(74),c(77),c(78),c(79),c(83),c(86),c(87),c(88),c(89),c(91),c(92),c(93),c(94),c(95),c(97),c(99),c(100),c(101),c(103),c(104),c(105),c(107),c(108),c(109),c(111),c(112),c(113),c(114),c(115),c(116),c(117),c(118),c(119),c(120),c(121),c(122),c(123),c(124),c(126),c(130),c(131),c(132),c(133),c(137),c(139),c(140),c(141),c(142),c(143),c(144),c(145),c(146),c(147),c(148),c(149),c(150),c(151),c(152),c(158),c(159),c(161),c(162),c(163),c(167),c(168),c(169),c(170),c(171),c(173),c(174),c(175),c(176),c(179),c(181),c(182),c(183),c(185),c(187),c(189),c(190),c(191),c(193),c(194),c(195),c(196),c(203),c(206),c(207),c(209),c(210),c(211),c(212),c(213),c(214),c(215),c(216),c(217),c(218),c(219),c(220),c(222),c(223),c(224),c(225),c(226),c(227),c(228),c(229),c(231),c(234),c(235),c(237),c(238),c(239),c(240),c(241),c(242),c(243),c(244),c(245),c(246),c(247),c(249),c(250),c(251),c(252),c(253),c(254),c(255),c(256),c(258),c(259),c(261),c(262),c(263),c(264),c(267),c(268),c(269),c(270),c(271),c(272),c(273),c(274),c(276),c(277),c(278),c(279),c(280),c(281),c(282),c(283),c(284),c(285),c(286),c(287),a.exports=c(288)},function(a,b,d){var e=d(2),f=d(3),g=d(4),h=d(6),i=d(16),j=d(20).KEY,k=d(5),l=d(21),m=d(22),n=d(17),o=d(23),p=d(24),q=d(25),r=d(27),s=d(40),t=d(43),u=d(10),v=d(30),w=d(14),x=d(15),y=d(44),z=d(47),A=d(49),B=d(9),C=d(28),D=A.f,E=B.f,F=z.f,G=e.Symbol,H=e.JSON,I=H&&H.stringify,J="prototype",K=o("_hidden"),L=o("toPrimitive"),M={}.propertyIsEnumerable,N=l("symbol-registry"),O=l("symbols"),P=l("op-symbols"),Q=Object[J],R="function"==typeof G,S=e.QObject,T=!S||!S[J]||!S[J].findChild,U=g&&k(function(){return 7!=y(E({},"a",{get:function(){return E(this,"a",{value:7}).a}})).a})?function(a,b,c){var d=D(Q,b);d&&delete Q[b],E(a,b,c),d&&a!==Q&&E(Q,b,d)}:E,V=function(a){var b=O[a]=y(G[J]);return b._k=a,b},W=R&&"symbol"==typeof G.iterator?function(a){return"symbol"==typeof a}:function(a){return a instanceof G},X=function defineProperty(a,b,c){return a===Q&&X(P,b,c),u(a),b=w(b,!0),u(c),f(O,b)?(c.enumerable?(f(a,K)&&a[K][b]&&(a[K][b]=!1),c=y(c,{enumerable:x(0,!1)})):(f(a,K)||E(a,K,x(1,{})),a[K][b]=!0),U(a,b,c)):E(a,b,c)},Y=function defineProperties(a,b){u(a);for(var c,d=s(b=v(b)),e=0,f=d.length;f>e;)X(a,c=d[e++],b[c]);return a},Z=function create(a,b){return b===c?y(a):Y(y(a),b)},$=function propertyIsEnumerable(a){var b=M.call(this,a=w(a,!0));return!(this===Q&&f(O,a)&&!f(P,a))&&(!(b||!f(this,a)||!f(O,a)||f(this,K)&&this[K][a])||b)},_=function getOwnPropertyDescriptor(a,b){if(a=v(a),b=w(b,!0),a!==Q||!f(O,b)||f(P,b)){var c=D(a,b);return!c||!f(O,b)||f(a,K)&&a[K][b]||(c.enumerable=!0),c}},aa=function getOwnPropertyNames(a){for(var b,c=F(v(a)),d=[],e=0;c.length>e;)f(O,b=c[e++])||b==K||b==j||d.push(b);return d},ba=function getOwnPropertySymbols(a){for(var b,c=a===Q,d=F(c?P:v(a)),e=[],g=0;d.length>g;)!f(O,b=d[g++])||c&&!f(Q,b)||e.push(O[b]);return e};R||(G=function Symbol(){if(this instanceof G)throw TypeError("Symbol is not a constructor!");var a=n(arguments.length>0?arguments[0]:c),b=function(c){this===Q&&b.call(P,c),f(this,K)&&f(this[K],a)&&(this[K][a]=!1),U(this,a,x(1,c))};return g&&T&&U(Q,a,{configurable:!0,set:b}),V(a)},i(G[J],"toString",function toString(){return this._k}),A.f=_,B.f=X,d(48).f=z.f=aa,d(42).f=$,d(41).f=ba,g&&!d(26)&&i(Q,"propertyIsEnumerable",$,!0),p.f=function(a){return V(o(a))}),h(h.G+h.W+h.F*!R,{Symbol:G});for(var ca="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),da=0;ca.length>da;)o(ca[da++]);for(var ca=C(o.store),da=0;ca.length>da;)q(ca[da++]);h(h.S+h.F*!R,"Symbol",{"for":function(a){return f(N,a+="")?N[a]:N[a]=G(a)},keyFor:function keyFor(a){if(W(a))return r(N,a);throw TypeError(a+" is not a symbol!")},useSetter:function(){T=!0},useSimple:function(){T=!1}}),h(h.S+h.F*!R,"Object",{create:Z,defineProperty:X,defineProperties:Y,getOwnPropertyDescriptor:_,getOwnPropertyNames:aa,getOwnPropertySymbols:ba}),H&&h(h.S+h.F*(!R||k(function(){var a=G();return"[null]"!=I([a])||"{}"!=I({a:a})||"{}"!=I(Object(a))})),"JSON",{stringify:function stringify(a){if(a!==c&&!W(a)){for(var b,d,e=[a],f=1;arguments.length>f;)e.push(arguments[f++]);return b=e[1],"function"==typeof b&&(d=b),!d&&t(b)||(b=function(a,b){if(d&&(b=d.call(this,a,b)),!W(b))return b}),e[1]=b,I.apply(H,e)}}}),G[J][L]||d(8)(G[J],L,G[J].valueOf),m(G,"Symbol"),m(Math,"Math",!0),m(e.JSON,"JSON",!0)},function(a,c){var d=a.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof b&&(b=d)},function(a,b){var c={}.hasOwnProperty;a.exports=function(a,b){return c.call(a,b)}},function(a,b,c){a.exports=!c(5)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(a,b){a.exports=function(a){try{return!!a()}catch(b){return!0}}},function(a,b,d){var e=d(2),f=d(7),g=d(8),h=d(16),i=d(18),j="prototype",k=function(a,b,d){var l,m,n,o,p=a&k.F,q=a&k.G,r=a&k.S,s=a&k.P,t=a&k.B,u=q?e:r?e[b]||(e[b]={}):(e[b]||{})[j],v=q?f:f[b]||(f[b]={}),w=v[j]||(v[j]={});q&&(d=b);for(l in d)m=!p&&u&&u[l]!==c,n=(m?u:d)[l],o=t&&m?i(n,e):s&&"function"==typeof n?i(Function.call,n):n,u&&h(u,l,n,a&k.U),v[l]!=n&&g(v,l,o),s&&w[l]!=n&&(w[l]=n)};e.core=f,k.F=1,k.G=2,k.S=4,k.P=8,k.B=16,k.W=32,k.U=64,k.R=128,a.exports=k},function(b,c){var d=b.exports={version:"2.4.0"};"number"==typeof a&&(a=d)},function(a,b,c){var d=c(9),e=c(15);a.exports=c(4)?function(a,b,c){return d.f(a,b,e(1,c))}:function(a,b,c){return a[b]=c,a}},function(a,b,c){var d=c(10),e=c(12),f=c(14),g=Object.defineProperty;b.f=c(4)?Object.defineProperty:function defineProperty(a,b,c){if(d(a),b=f(b,!0),d(c),e)try{return g(a,b,c)}catch(h){}if("get"in c||"set"in c)throw TypeError("Accessors not supported!");return"value"in c&&(a[b]=c.value),a}},function(a,b,c){var d=c(11);a.exports=function(a){if(!d(a))throw TypeError(a+" is not an object!");return a}},function(a,b){a.exports=function(a){return"object"==typeof a?null!==a:"function"==typeof a}},function(a,b,c){a.exports=!c(4)&&!c(5)(function(){return 7!=Object.defineProperty(c(13)("div"),"a",{get:function(){return 7}}).a})},function(a,b,c){var d=c(11),e=c(2).document,f=d(e)&&d(e.createElement);a.exports=function(a){return f?e.createElement(a):{}}},function(a,b,c){var d=c(11);a.exports=function(a,b){if(!d(a))return a;var c,e;if(b&&"function"==typeof(c=a.toString)&&!d(e=c.call(a)))return e;if("function"==typeof(c=a.valueOf)&&!d(e=c.call(a)))return e;if(!b&&"function"==typeof(c=a.toString)&&!d(e=c.call(a)))return e;throw TypeError("Can't convert object to primitive value")}},function(a,b){a.exports=function(a,b){return{enumerable:!(1&a),configurable:!(2&a),writable:!(4&a),value:b}}},function(a,b,c){var d=c(2),e=c(8),f=c(3),g=c(17)("src"),h="toString",i=Function[h],j=(""+i).split(h);c(7).inspectSource=function(a){return i.call(a)},(a.exports=function(a,b,c,h){var i="function"==typeof c;i&&(f(c,"name")||e(c,"name",b)),a[b]!==c&&(i&&(f(c,g)||e(c,g,a[b]?""+a[b]:j.join(String(b)))),a===d?a[b]=c:h?a[b]?a[b]=c:e(a,b,c):(delete a[b],e(a,b,c)))})(Function.prototype,h,function toString(){return"function"==typeof this&&this[g]||i.call(this)})},function(a,b){var d=0,e=Math.random();a.exports=function(a){return"Symbol(".concat(a===c?"":a,")_",(++d+e).toString(36))}},function(a,b,d){var e=d(19);a.exports=function(a,b,d){if(e(a),b===c)return a;switch(d){case 1:return function(c){return a.call(b,c)};case 2:return function(c,d){return a.call(b,c,d)};case 3:return function(c,d,e){return a.call(b,c,d,e)}}return function(){return a.apply(b,arguments)}}},function(a,b){a.exports=function(a){if("function"!=typeof a)throw TypeError(a+" is not a function!");return a}},function(a,b,c){var d=c(17)("meta"),e=c(11),f=c(3),g=c(9).f,h=0,i=Object.isExtensible||function(){return!0},j=!c(5)(function(){return i(Object.preventExtensions({}))}),k=function(a){g(a,d,{value:{i:"O"+ ++h,w:{}}})},l=function(a,b){if(!e(a))return"symbol"==typeof a?a:("string"==typeof a?"S":"P")+a;if(!f(a,d)){if(!i(a))return"F";if(!b)return"E";k(a)}return a[d].i},m=function(a,b){if(!f(a,d)){if(!i(a))return!0;if(!b)return!1;k(a)}return a[d].w},n=function(a){return j&&o.NEED&&i(a)&&!f(a,d)&&k(a),a},o=a.exports={KEY:d,NEED:!1,fastKey:l,getWeak:m,onFreeze:n}},function(a,b,c){var d=c(2),e="__core-js_shared__",f=d[e]||(d[e]={});a.exports=function(a){return f[a]||(f[a]={})}},function(a,b,c){var d=c(9).f,e=c(3),f=c(23)("toStringTag");a.exports=function(a,b,c){a&&!e(a=c?a:a.prototype,f)&&d(a,f,{configurable:!0,value:b})}},function(a,b,c){var d=c(21)("wks"),e=c(17),f=c(2).Symbol,g="function"==typeof f,h=a.exports=function(a){return d[a]||(d[a]=g&&f[a]||(g?f:e)("Symbol."+a))};h.store=d},function(a,b,c){b.f=c(23)},function(a,b,c){var d=c(2),e=c(7),f=c(26),g=c(24),h=c(9).f;a.exports=function(a){var b=e.Symbol||(e.Symbol=f?{}:d.Symbol||{});"_"==a.charAt(0)||a in b||h(b,a,{value:g.f(a)})}},function(a,b){a.exports=!1},function(a,b,c){var d=c(28),e=c(30);a.exports=function(a,b){for(var c,f=e(a),g=d(f),h=g.length,i=0;h>i;)if(f[c=g[i++]]===b)return c}},function(a,b,c){var d=c(29),e=c(39);a.exports=Object.keys||function keys(a){return d(a,e)}},function(a,b,c){var d=c(3),e=c(30),f=c(34)(!1),g=c(38)("IE_PROTO");a.exports=function(a,b){var c,h=e(a),i=0,j=[];for(c in h)c!=g&&d(h,c)&&j.push(c);for(;b.length>i;)d(h,c=b[i++])&&(~f(j,c)||j.push(c));return j}},function(a,b,c){var d=c(31),e=c(33);a.exports=function(a){return d(e(a))}},function(a,b,c){var d=c(32);a.exports=Object("z").propertyIsEnumerable(0)?Object:function(a){return"String"==d(a)?a.split(""):Object(a)}},function(a,b){var c={}.toString;a.exports=function(a){return c.call(a).slice(8,-1)}},function(a,b){a.exports=function(a){if(a==c)throw TypeError("Can't call method on  "+a);return a}},function(a,b,c){var d=c(30),e=c(35),f=c(37);a.exports=function(a){return function(b,c,g){var h,i=d(b),j=e(i.length),k=f(g,j);if(a&&c!=c){for(;j>k;)if(h=i[k++],h!=h)return!0}else for(;j>k;k++)if((a||k in i)&&i[k]===c)return a||k||0;return!a&&-1}}},function(a,b,c){var d=c(36),e=Math.min;a.exports=function(a){return a>0?e(d(a),9007199254740991):0}},function(a,b){var c=Math.ceil,d=Math.floor;a.exports=function(a){return isNaN(a=+a)?0:(a>0?d:c)(a)}},function(a,b,c){var d=c(36),e=Math.max,f=Math.min;a.exports=function(a,b){return a=d(a),a<0?e(a+b,0):f(a,b)}},function(a,b,c){var d=c(21)("keys"),e=c(17);a.exports=function(a){return d[a]||(d[a]=e(a))}},function(a,b){a.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(a,b,c){var d=c(28),e=c(41),f=c(42);a.exports=function(a){var b=d(a),c=e.f;if(c)for(var g,h=c(a),i=f.f,j=0;h.length>j;)i.call(a,g=h[j++])&&b.push(g);return b}},function(a,b){b.f=Object.getOwnPropertySymbols},function(a,b){b.f={}.propertyIsEnumerable},function(a,b,c){var d=c(32);a.exports=Array.isArray||function isArray(a){return"Array"==d(a)}},function(a,b,d){var e=d(10),f=d(45),g=d(39),h=d(38)("IE_PROTO"),i=function(){},j="prototype",k=function(){var a,b=d(13)("iframe"),c=g.length,e="<",f=">";for(b.style.display="none",d(46).appendChild(b),b.src="javascript:",a=b.contentWindow.document,a.open(),a.write(e+"script"+f+"document.F=Object"+e+"/script"+f),a.close(),k=a.F;c--;)delete k[j][g[c]];return k()};a.exports=Object.create||function create(a,b){var d;return null!==a?(i[j]=e(a),d=new i,i[j]=null,d[h]=a):d=k(),b===c?d:f(d,b)}},function(a,b,c){var d=c(9),e=c(10),f=c(28);a.exports=c(4)?Object.defineProperties:function defineProperties(a,b){e(a);for(var c,g=f(b),h=g.length,i=0;h>i;)d.f(a,c=g[i++],b[c]);return a}},function(a,b,c){a.exports=c(2).document&&document.documentElement},function(a,b,c){var d=c(30),e=c(48).f,f={}.toString,g="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],h=function(a){try{return e(a)}catch(b){return g.slice()}};a.exports.f=function getOwnPropertyNames(a){return g&&"[object Window]"==f.call(a)?h(a):e(d(a))}},function(a,b,c){var d=c(29),e=c(39).concat("length","prototype");b.f=Object.getOwnPropertyNames||function getOwnPropertyNames(a){return d(a,e)}},function(a,b,c){var d=c(42),e=c(15),f=c(30),g=c(14),h=c(3),i=c(12),j=Object.getOwnPropertyDescriptor;b.f=c(4)?j:function getOwnPropertyDescriptor(a,b){if(a=f(a),b=g(b,!0),i)try{return j(a,b)}catch(c){}if(h(a,b))return e(!d.f.call(a,b),a[b])}},function(a,b,c){var d=c(6);d(d.S+d.F*!c(4),"Object",{defineProperty:c(9).f})},function(a,b,c){var d=c(6);d(d.S+d.F*!c(4),"Object",{defineProperties:c(45)})},function(a,b,c){var d=c(30),e=c(49).f;c(53)("getOwnPropertyDescriptor",function(){return function getOwnPropertyDescriptor(a,b){return e(d(a),b)}})},function(a,b,c){var d=c(6),e=c(7),f=c(5);a.exports=function(a,b){var c=(e.Object||{})[a]||Object[a],g={};g[a]=b(c),d(d.S+d.F*f(function(){c(1)}),"Object",g)}},function(a,b,c){var d=c(6);d(d.S,"Object",{create:c(44)})},function(a,b,c){var d=c(56),e=c(57);c(53)("getPrototypeOf",function(){return function getPrototypeOf(a){return e(d(a))}})},function(a,b,c){var d=c(33);a.exports=function(a){return Object(d(a))}},function(a,b,c){var d=c(3),e=c(56),f=c(38)("IE_PROTO"),g=Object.prototype;a.exports=Object.getPrototypeOf||function(a){return a=e(a),d(a,f)?a[f]:"function"==typeof a.constructor&&a instanceof a.constructor?a.constructor.prototype:a instanceof Object?g:null}},function(a,b,c){var d=c(56),e=c(28);c(53)("keys",function(){return function keys(a){return e(d(a))}})},function(a,b,c){c(53)("getOwnPropertyNames",function(){return c(47).f})},function(a,b,c){var d=c(11),e=c(20).onFreeze;c(53)("freeze",function(a){return function freeze(b){return a&&d(b)?a(e(b)):b}})},function(a,b,c){var d=c(11),e=c(20).onFreeze;c(53)("seal",function(a){return function seal(b){return a&&d(b)?a(e(b)):b}})},function(a,b,c){var d=c(11),e=c(20).onFreeze;c(53)("preventExtensions",function(a){return function preventExtensions(b){return a&&d(b)?a(e(b)):b}})},function(a,b,c){var d=c(11);c(53)("isFrozen",function(a){return function isFrozen(b){return!d(b)||!!a&&a(b)}})},function(a,b,c){var d=c(11);c(53)("isSealed",function(a){return function isSealed(b){return!d(b)||!!a&&a(b)}})},function(a,b,c){var d=c(11);c(53)("isExtensible",function(a){return function isExtensible(b){return!!d(b)&&(!a||a(b))}})},function(a,b,c){var d=c(6);d(d.S+d.F,"Object",{assign:c(67)})},function(a,b,c){var d=c(28),e=c(41),f=c(42),g=c(56),h=c(31),i=Object.assign;a.exports=!i||c(5)(function(){var a={},b={},c=Symbol(),d="abcdefghijklmnopqrst";return a[c]=7,d.split("").forEach(function(a){b[a]=a}),7!=i({},a)[c]||Object.keys(i({},b)).join("")!=d})?function assign(a,b){for(var c=g(a),i=arguments.length,j=1,k=e.f,l=f.f;i>j;)for(var m,n=h(arguments[j++]),o=k?d(n).concat(k(n)):d(n),p=o.length,q=0;p>q;)l.call(n,m=o[q++])&&(c[m]=n[m]);return c}:i},function(a,b,c){var d=c(6);d(d.S,"Object",{is:c(69)})},function(a,b){a.exports=Object.is||function is(a,b){return a===b?0!==a||1/a===1/b:a!=a&&b!=b}},function(a,b,c){var d=c(6);d(d.S,"Object",{setPrototypeOf:c(71).set})},function(a,b,d){var e=d(11),f=d(10),g=function(a,b){if(f(a),!e(b)&&null!==b)throw TypeError(b+": can't set as prototype!")};a.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(a,b,c){try{c=d(18)(Function.call,d(49).f(Object.prototype,"__proto__").set,2),c(a,[]),b=!(a instanceof Array)}catch(e){b=!0}return function setPrototypeOf(a,d){return g(a,d),b?a.__proto__=d:c(a,d),a}}({},!1):c),check:g}},function(a,b,c){var d=c(73),e={};e[c(23)("toStringTag")]="z",e+""!="[object z]"&&c(16)(Object.prototype,"toString",function toString(){return"[object "+d(this)+"]"},!0)},function(a,b,d){var e=d(32),f=d(23)("toStringTag"),g="Arguments"==e(function(){return arguments}()),h=function(a,b){try{return a[b]}catch(c){}};a.exports=function(a){var b,d,i;return a===c?"Undefined":null===a?"Null":"string"==typeof(d=h(b=Object(a),f))?d:g?e(b):"Object"==(i=e(b))&&"function"==typeof b.callee?"Arguments":i}},function(a,b,c){var d=c(6);d(d.P,"Function",{bind:c(75)})},function(a,b,c){var d=c(19),e=c(11),f=c(76),g=[].slice,h={},i=function(a,b,c){if(!(b in h)){for(var d=[],e=0;e<b;e++)d[e]="a["+e+"]";h[b]=Function("F,a","return new F("+d.join(",")+")")}return h[b](a,c)};a.exports=Function.bind||function bind(a){var b=d(this),c=g.call(arguments,1),h=function(){var d=c.concat(g.call(arguments));return this instanceof h?i(b,d.length,d):f(b,d,a)};return e(b.prototype)&&(h.prototype=b.prototype),h}},function(a,b){a.exports=function(a,b,d){var e=d===c;switch(b.length){case 0:return e?a():a.call(d);case 1:return e?a(b[0]):a.call(d,b[0]);case 2:return e?a(b[0],b[1]):a.call(d,b[0],b[1]);case 3:return e?a(b[0],b[1],b[2]):a.call(d,b[0],b[1],b[2]);case 4:return e?a(b[0],b[1],b[2],b[3]):a.call(d,b[0],b[1],b[2],b[3])}return a.apply(d,b)}},function(a,b,c){var d=c(9).f,e=c(15),f=c(3),g=Function.prototype,h=/^\s*function ([^ (]*)/,i="name",j=Object.isExtensible||function(){return!0};i in g||c(4)&&d(g,i,{configurable:!0,get:function(){try{var a=this,b=(""+a).match(h)[1];return f(a,i)||!j(a)||d(a,i,e(5,b)),b}catch(c){return""}}})},function(a,b,c){var d=c(11),e=c(57),f=c(23)("hasInstance"),g=Function.prototype;f in g||c(9).f(g,f,{value:function(a){if("function"!=typeof this||!d(a))return!1;if(!d(this.prototype))return a instanceof this;for(;a=e(a);)if(this.prototype===a)return!0;return!1}})},function(a,b,c){var d=c(2),e=c(3),f=c(32),g=c(80),h=c(14),i=c(5),j=c(48).f,k=c(49).f,l=c(9).f,m=c(81).trim,n="Number",o=d[n],p=o,q=o.prototype,r=f(c(44)(q))==n,s="trim"in String.prototype,t=function(a){var b=h(a,!1);if("string"==typeof b&&b.length>2){b=s?b.trim():m(b,3);var c,d,e,f=b.charCodeAt(0);if(43===f||45===f){if(c=b.charCodeAt(2),88===c||120===c)return NaN}else if(48===f){switch(b.charCodeAt(1)){case 66:case 98:d=2,e=49;break;case 79:case 111:d=8,e=55;break;default:return+b}for(var g,i=b.slice(2),j=0,k=i.length;j<k;j++)if(g=i.charCodeAt(j),g<48||g>e)return NaN;return parseInt(i,d)}}return+b};if(!o(" 0o1")||!o("0b1")||o("+0x1")){o=function Number(a){var b=arguments.length<1?0:a,c=this;return c instanceof o&&(r?i(function(){q.valueOf.call(c)}):f(c)!=n)?g(new p(t(b)),c,o):t(b)};for(var u,v=c(4)?j(p):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),w=0;v.length>w;w++)e(p,u=v[w])&&!e(o,u)&&l(o,u,k(p,u));o.prototype=q,q.constructor=o,c(16)(d,n,o)}},function(a,b,c){var d=c(11),e=c(71).set;a.exports=function(a,b,c){var f,g=b.constructor;return g!==c&&"function"==typeof g&&(f=g.prototype)!==c.prototype&&d(f)&&e&&e(a,f),a}},function(a,b,c){var d=c(6),e=c(33),f=c(5),g=c(82),h="["+g+"]",i="​",j=RegExp("^"+h+h+"*"),k=RegExp(h+h+"*$"),l=function(a,b,c){var e={},h=f(function(){return!!g[a]()||i[a]()!=i}),j=e[a]=h?b(m):g[a];c&&(e[c]=j),d(d.P+d.F*h,"String",e)},m=l.trim=function(a,b){return a=String(e(a)),1&b&&(a=a.replace(j,"")),2&b&&(a=a.replace(k,"")),a};a.exports=l},function(a,b){a.exports="\t\n\x0B\f\r   ᠎             　\u2028\u2029\ufeff"},function(a,b,c){var d=c(6),e=c(36),f=c(84),g=c(85),h=1..toFixed,i=Math.floor,j=[0,0,0,0,0,0],k="Number.toFixed: incorrect invocation!",l="0",m=function(a,b){for(var c=-1,d=b;++c<6;)d+=a*j[c],j[c]=d%1e7,d=i(d/1e7)},n=function(a){for(var b=6,c=0;--b>=0;)c+=j[b],j[b]=i(c/a),c=c%a*1e7},o=function(){for(var a=6,b="";--a>=0;)if(""!==b||0===a||0!==j[a]){var c=String(j[a]);b=""===b?c:b+g.call(l,7-c.length)+c}return b},p=function(a,b,c){return 0===b?c:b%2===1?p(a,b-1,c*a):p(a*a,b/2,c)},q=function(a){for(var b=0,c=a;c>=4096;)b+=12,c/=4096;for(;c>=2;)b+=1,c/=2;return b};d(d.P+d.F*(!!h&&("0.000"!==8e-5.toFixed(3)||"1"!==.9.toFixed(0)||"1.25"!==1.255.toFixed(2)||"1000000000000000128"!==(0xde0b6b3a7640080).toFixed(0))||!c(5)(function(){h.call({})})),"Number",{toFixed:function toFixed(a){var b,c,d,h,i=f(this,k),j=e(a),r="",s=l;if(j<0||j>20)throw RangeError(k);if(i!=i)return"NaN";if(i<=-1e21||i>=1e21)return String(i);if(i<0&&(r="-",i=-i),i>1e-21)if(b=q(i*p(2,69,1))-69,c=b<0?i*p(2,-b,1):i/p(2,b,1),c*=4503599627370496,b=52-b,b>0){for(m(0,c),d=j;d>=7;)m(1e7,0),d-=7;for(m(p(10,d,1),0),d=b-1;d>=23;)n(1<<23),d-=23;n(1<<d),m(1,1),n(2),s=o()}else m(0,c),m(1<<-b,0),s=o()+g.call(l,j);return j>0?(h=s.length,s=r+(h<=j?"0."+g.call(l,j-h)+s:s.slice(0,h-j)+"."+s.slice(h-j))):s=r+s,s}})},function(a,b,c){var d=c(32);a.exports=function(a,b){if("number"!=typeof a&&"Number"!=d(a))throw TypeError(b);return+a}},function(a,b,c){var d=c(36),e=c(33);a.exports=function repeat(a){var b=String(e(this)),c="",f=d(a);if(f<0||f==1/0)throw RangeError("Count can't be negative");for(;f>0;(f>>>=1)&&(b+=b))1&f&&(c+=b);return c}},function(a,b,d){var e=d(6),f=d(5),g=d(84),h=1..toPrecision;e(e.P+e.F*(f(function(){return"1"!==h.call(1,c)})||!f(function(){h.call({})})),"Number",{toPrecision:function toPrecision(a){var b=g(this,"Number#toPrecision: incorrect invocation!");return a===c?h.call(b):h.call(b,a)}})},function(a,b,c){var d=c(6);d(d.S,"Number",{EPSILON:Math.pow(2,-52)})},function(a,b,c){var d=c(6),e=c(2).isFinite;d(d.S,"Number",{isFinite:function isFinite(a){return"number"==typeof a&&e(a)}})},function(a,b,c){var d=c(6);d(d.S,"Number",{isInteger:c(90)})},function(a,b,c){var d=c(11),e=Math.floor;a.exports=function isInteger(a){return!d(a)&&isFinite(a)&&e(a)===a}},function(a,b,c){var d=c(6);d(d.S,"Number",{isNaN:function isNaN(a){return a!=a}})},function(a,b,c){var d=c(6),e=c(90),f=Math.abs;d(d.S,"Number",{isSafeInteger:function isSafeInteger(a){return e(a)&&f(a)<=9007199254740991}})},function(a,b,c){var d=c(6);d(d.S,"Number",{MAX_SAFE_INTEGER:9007199254740991})},function(a,b,c){var d=c(6);d(d.S,"Number",{MIN_SAFE_INTEGER:-9007199254740991})},function(a,b,c){var d=c(6),e=c(96);d(d.S+d.F*(Number.parseFloat!=e),"Number",{parseFloat:e})},function(a,b,c){var d=c(2).parseFloat,e=c(81).trim;a.exports=1/d(c(82)+"-0")!==-(1/0)?function parseFloat(a){var b=e(String(a),3),c=d(b);return 0===c&&"-"==b.charAt(0)?-0:c}:d},function(a,b,c){var d=c(6),e=c(98);d(d.S+d.F*(Number.parseInt!=e),"Number",{parseInt:e})},function(a,b,c){var d=c(2).parseInt,e=c(81).trim,f=c(82),g=/^[\-+]?0[xX]/;a.exports=8!==d(f+"08")||22!==d(f+"0x16")?function parseInt(a,b){var c=e(String(a),3);return d(c,b>>>0||(g.test(c)?16:10))}:d},function(a,b,c){var d=c(6),e=c(98);d(d.G+d.F*(parseInt!=e),{parseInt:e})},function(a,b,c){var d=c(6),e=c(96);d(d.G+d.F*(parseFloat!=e),{parseFloat:e})},function(a,b,c){var d=c(6),e=c(102),f=Math.sqrt,g=Math.acosh;d(d.S+d.F*!(g&&710==Math.floor(g(Number.MAX_VALUE))&&g(1/0)==1/0),"Math",{acosh:function acosh(a){return(a=+a)<1?NaN:a>94906265.62425156?Math.log(a)+Math.LN2:e(a-1+f(a-1)*f(a+1))}})},function(a,b){a.exports=Math.log1p||function log1p(a){return(a=+a)>-1e-8&&a<1e-8?a-a*a/2:Math.log(1+a)}},function(a,b,c){function asinh(a){return isFinite(a=+a)&&0!=a?a<0?-asinh(-a):Math.log(a+Math.sqrt(a*a+1)):a}var d=c(6),e=Math.asinh;d(d.S+d.F*!(e&&1/e(0)>0),"Math",{asinh:asinh})},function(a,b,c){var d=c(6),e=Math.atanh;d(d.S+d.F*!(e&&1/e(-0)<0),"Math",{atanh:function atanh(a){return 0==(a=+a)?a:Math.log((1+a)/(1-a))/2}})},function(a,b,c){var d=c(6),e=c(106);d(d.S,"Math",{cbrt:function cbrt(a){return e(a=+a)*Math.pow(Math.abs(a),1/3)}})},function(a,b){a.exports=Math.sign||function sign(a){return 0==(a=+a)||a!=a?a:a<0?-1:1}},function(a,b,c){var d=c(6);d(d.S,"Math",{clz32:function clz32(a){return(a>>>=0)?31-Math.floor(Math.log(a+.5)*Math.LOG2E):32}})},function(a,b,c){var d=c(6),e=Math.exp;d(d.S,"Math",{cosh:function cosh(a){return(e(a=+a)+e(-a))/2}})},function(a,b,c){var d=c(6),e=c(110);d(d.S+d.F*(e!=Math.expm1),"Math",{expm1:e})},function(a,b){var c=Math.expm1;a.exports=!c||c(10)>22025.465794806718||c(10)<22025.465794806718||c(-2e-17)!=-2e-17?function expm1(a){return 0==(a=+a)?a:a>-1e-6&&a<1e-6?a+a*a/2:Math.exp(a)-1}:c},function(a,b,c){var d=c(6),e=c(106),f=Math.pow,g=f(2,-52),h=f(2,-23),i=f(2,127)*(2-h),j=f(2,-126),k=function(a){return a+1/g-1/g};d(d.S,"Math",{fround:function fround(a){var b,c,d=Math.abs(a),f=e(a);return d<j?f*k(d/j/h)*j*h:(b=(1+h/g)*d,c=b-(b-d),c>i||c!=c?f*(1/0):f*c)}})},function(a,b,c){var d=c(6),e=Math.abs;d(d.S,"Math",{hypot:function hypot(a,b){for(var c,d,f=0,g=0,h=arguments.length,i=0;g<h;)c=e(arguments[g++]),i<c?(d=i/c,f=f*d*d+1,i=c):c>0?(d=c/i,f+=d*d):f+=c;return i===1/0?1/0:i*Math.sqrt(f)}})},function(a,b,c){var d=c(6),e=Math.imul;d(d.S+d.F*c(5)(function(){return e(4294967295,5)!=-5||2!=e.length}),"Math",{imul:function imul(a,b){var c=65535,d=+a,e=+b,f=c&d,g=c&e;return 0|f*g+((c&d>>>16)*g+f*(c&e>>>16)<<16>>>0)}})},function(a,b,c){var d=c(6);d(d.S,"Math",{log10:function log10(a){return Math.log(a)/Math.LN10}})},function(a,b,c){var d=c(6);d(d.S,"Math",{log1p:c(102)})},function(a,b,c){var d=c(6);d(d.S,"Math",{log2:function log2(a){return Math.log(a)/Math.LN2}})},function(a,b,c){var d=c(6);d(d.S,"Math",{sign:c(106)})},function(a,b,c){var d=c(6),e=c(110),f=Math.exp;d(d.S+d.F*c(5)(function(){return!Math.sinh(-2e-17)!=-2e-17}),"Math",{sinh:function sinh(a){return Math.abs(a=+a)<1?(e(a)-e(-a))/2:(f(a-1)-f(-a-1))*(Math.E/2)}})},function(a,b,c){var d=c(6),e=c(110),f=Math.exp;d(d.S,"Math",{tanh:function tanh(a){var b=e(a=+a),c=e(-a);return b==1/0?1:c==1/0?-1:(b-c)/(f(a)+f(-a))}})},function(a,b,c){var d=c(6);d(d.S,"Math",{trunc:function trunc(a){return(a>0?Math.floor:Math.ceil)(a)}})},function(a,b,c){var d=c(6),e=c(37),f=String.fromCharCode,g=String.fromCodePoint;d(d.S+d.F*(!!g&&1!=g.length),"String",{fromCodePoint:function fromCodePoint(a){for(var b,c=[],d=arguments.length,g=0;d>g;){if(b=+arguments[g++],e(b,1114111)!==b)throw RangeError(b+" is not a valid code point");c.push(b<65536?f(b):f(((b-=65536)>>10)+55296,b%1024+56320))}return c.join("")}})},function(a,b,c){var d=c(6),e=c(30),f=c(35);d(d.S,"String",{raw:function raw(a){for(var b=e(a.raw),c=f(b.length),d=arguments.length,g=[],h=0;c>h;)g.push(String(b[h++])),h<d&&g.push(String(arguments[h]));return g.join("")}})},function(a,b,c){c(81)("trim",function(a){return function trim(){return a(this,3)}})},function(a,b,c){var d=c(6),e=c(125)(!1);d(d.P,"String",{codePointAt:function codePointAt(a){return e(this,a)}})},function(a,b,d){var e=d(36),f=d(33);a.exports=function(a){return function(b,d){var g,h,i=String(f(b)),j=e(d),k=i.length;return j<0||j>=k?a?"":c:(g=i.charCodeAt(j),g<55296||g>56319||j+1===k||(h=i.charCodeAt(j+1))<56320||h>57343?a?i.charAt(j):g:a?i.slice(j,j+2):(g-55296<<10)+(h-56320)+65536)}}},function(a,b,d){var e=d(6),f=d(35),g=d(127),h="endsWith",i=""[h];e(e.P+e.F*d(129)(h),"String",{endsWith:function endsWith(a){var b=g(this,a,h),d=arguments.length>1?arguments[1]:c,e=f(b.length),j=d===c?e:Math.min(f(d),e),k=String(a);return i?i.call(b,k,j):b.slice(j-k.length,j)===k}})},function(a,b,c){var d=c(128),e=c(33);a.exports=function(a,b,c){if(d(b))throw TypeError("String#"+c+" doesn't accept regex!");return String(e(a))}},function(a,b,d){var e=d(11),f=d(32),g=d(23)("match");a.exports=function(a){var b;return e(a)&&((b=a[g])!==c?!!b:"RegExp"==f(a))}},function(a,b,c){var d=c(23)("match");a.exports=function(a){var b=/./;try{"/./"[a](b)}catch(c){try{return b[d]=!1,!"/./"[a](b)}catch(e){}}return!0}},function(a,b,d){var e=d(6),f=d(127),g="includes";e(e.P+e.F*d(129)(g),"String",{includes:function includes(a){return!!~f(this,a,g).indexOf(a,arguments.length>1?arguments[1]:c)}})},function(a,b,c){var d=c(6);d(d.P,"String",{repeat:c(85)})},function(a,b,d){var e=d(6),f=d(35),g=d(127),h="startsWith",i=""[h];e(e.P+e.F*d(129)(h),"String",{startsWith:function startsWith(a){var b=g(this,a,h),d=f(Math.min(arguments.length>1?arguments[1]:c,b.length)),e=String(a);return i?i.call(b,e,d):b.slice(d,d+e.length)===e}})},function(a,b,d){var e=d(125)(!0);d(134)(String,"String",function(a){this._t=String(a),this._i=0},function(){var a,b=this._t,d=this._i;return d>=b.length?{value:c,done:!0}:(a=e(b,d),this._i+=a.length,{value:a,done:!1})})},function(a,b,d){var e=d(26),f=d(6),g=d(16),h=d(8),i=d(3),j=d(135),k=d(136),l=d(22),m=d(57),n=d(23)("iterator"),o=!([].keys&&"next"in[].keys()),p="@@iterator",q="keys",r="values",s=function(){return this};a.exports=function(a,b,d,t,u,v,w){k(d,b,t);var x,y,z,A=function(a){if(!o&&a in E)return E[a];switch(a){case q:return function keys(){return new d(this,a)};case r:return function values(){return new d(this,a)}}return function entries(){return new d(this,a)}},B=b+" Iterator",C=u==r,D=!1,E=a.prototype,F=E[n]||E[p]||u&&E[u],G=F||A(u),H=u?C?A("entries"):G:c,I="Array"==b?E.entries||F:F;if(I&&(z=m(I.call(new a)),z!==Object.prototype&&(l(z,B,!0),e||i(z,n)||h(z,n,s))),C&&F&&F.name!==r&&(D=!0,G=function values(){return F.call(this)}),e&&!w||!o&&!D&&E[n]||h(E,n,G),j[b]=G,j[B]=s,u)if(x={values:C?G:A(r),keys:v?G:A(q),entries:H},w)for(y in x)y in E||g(E,y,x[y]);else f(f.P+f.F*(o||D),b,x);return x}},function(a,b){a.exports={}},function(a,b,c){var d=c(44),e=c(15),f=c(22),g={};c(8)(g,c(23)("iterator"),function(){return this}),a.exports=function(a,b,c){a.prototype=d(g,{next:e(1,c)}),f(a,b+" Iterator")}},function(a,b,c){c(138)("anchor",function(a){return function anchor(b){return a(this,"a","name",b)}})},function(a,b,c){var d=c(6),e=c(5),f=c(33),g=/"/g,h=function(a,b,c,d){var e=String(f(a)),h="<"+b;return""!==c&&(h+=" "+c+'="'+String(d).replace(g,"&quot;")+'"'),h+">"+e+"</"+b+">"};a.exports=function(a,b){var c={};c[a]=b(h),d(d.P+d.F*e(function(){var b=""[a]('"');return b!==b.toLowerCase()||b.split('"').length>3}),"String",c)}},function(a,b,c){c(138)("big",function(a){return function big(){return a(this,"big","","")}})},function(a,b,c){c(138)("blink",function(a){return function blink(){return a(this,"blink","","")}})},function(a,b,c){c(138)("bold",function(a){return function bold(){return a(this,"b","","")}})},function(a,b,c){c(138)("fixed",function(a){return function fixed(){return a(this,"tt","","")}})},function(a,b,c){c(138)("fontcolor",function(a){return function fontcolor(b){return a(this,"font","color",b)}})},function(a,b,c){c(138)("fontsize",function(a){return function fontsize(b){return a(this,"font","size",b)}})},function(a,b,c){c(138)("italics",function(a){return function italics(){return a(this,"i","","")}})},function(a,b,c){c(138)("link",function(a){return function link(b){return a(this,"a","href",b)}})},function(a,b,c){c(138)("small",function(a){return function small(){return a(this,"small","","")}})},function(a,b,c){c(138)("strike",function(a){return function strike(){return a(this,"strike","","")}})},function(a,b,c){c(138)("sub",function(a){return function sub(){return a(this,"sub","","")}})},function(a,b,c){c(138)("sup",function(a){return function sup(){return a(this,"sup","","")}})},function(a,b,c){var d=c(6);d(d.S,"Array",{isArray:c(43)})},function(a,b,d){var e=d(18),f=d(6),g=d(56),h=d(153),i=d(154),j=d(35),k=d(155),l=d(156);f(f.S+f.F*!d(157)(function(a){Array.from(a)}),"Array",{from:function from(a){var b,d,f,m,n=g(a),o="function"==typeof this?this:Array,p=arguments.length,q=p>1?arguments[1]:c,r=q!==c,s=0,t=l(n);if(r&&(q=e(q,p>2?arguments[2]:c,2)),t==c||o==Array&&i(t))for(b=j(n.length),d=new o(b);b>s;s++)k(d,s,r?q(n[s],s):n[s]);else for(m=t.call(n),d=new o;!(f=m.next()).done;s++)k(d,s,r?h(m,q,[f.value,s],!0):f.value);return d.length=s,d}})},function(a,b,d){var e=d(10);a.exports=function(a,b,d,f){try{return f?b(e(d)[0],d[1]):b(d)}catch(g){var h=a["return"];throw h!==c&&e(h.call(a)),g}}},function(a,b,d){var e=d(135),f=d(23)("iterator"),g=Array.prototype;a.exports=function(a){return a!==c&&(e.Array===a||g[f]===a)}},function(a,b,c){var d=c(9),e=c(15);a.exports=function(a,b,c){b in a?d.f(a,b,e(0,c)):a[b]=c}},function(a,b,d){var e=d(73),f=d(23)("iterator"),g=d(135);a.exports=d(7).getIteratorMethod=function(a){if(a!=c)return a[f]||a["@@iterator"]||g[e(a)]}},function(a,b,c){var d=c(23)("iterator"),e=!1;
try{var f=[7][d]();f["return"]=function(){e=!0},Array.from(f,function(){throw 2})}catch(g){}a.exports=function(a,b){if(!b&&!e)return!1;var c=!1;try{var f=[7],g=f[d]();g.next=function(){return{done:c=!0}},f[d]=function(){return g},a(f)}catch(h){}return c}},function(a,b,c){var d=c(6),e=c(155);d(d.S+d.F*c(5)(function(){function F(){}return!(Array.of.call(F)instanceof F)}),"Array",{of:function of(){for(var a=0,b=arguments.length,c=new("function"==typeof this?this:Array)(b);b>a;)e(c,a,arguments[a++]);return c.length=b,c}})},function(a,b,d){var e=d(6),f=d(30),g=[].join;e(e.P+e.F*(d(31)!=Object||!d(160)(g)),"Array",{join:function join(a){return g.call(f(this),a===c?",":a)}})},function(a,b,c){var d=c(5);a.exports=function(a,b){return!!a&&d(function(){b?a.call(null,function(){},1):a.call(null)})}},function(a,b,d){var e=d(6),f=d(46),g=d(32),h=d(37),i=d(35),j=[].slice;e(e.P+e.F*d(5)(function(){f&&j.call(f)}),"Array",{slice:function slice(a,b){var d=i(this.length),e=g(this);if(b=b===c?d:b,"Array"==e)return j.call(this,a,b);for(var f=h(a,d),k=h(b,d),l=i(k-f),m=Array(l),n=0;n<l;n++)m[n]="String"==e?this.charAt(f+n):this[f+n];return m}})},function(a,b,d){var e=d(6),f=d(19),g=d(56),h=d(5),i=[].sort,j=[1,2,3];e(e.P+e.F*(h(function(){j.sort(c)})||!h(function(){j.sort(null)})||!d(160)(i)),"Array",{sort:function sort(a){return a===c?i.call(g(this)):i.call(g(this),f(a))}})},function(a,b,c){var d=c(6),e=c(164)(0),f=c(160)([].forEach,!0);d(d.P+d.F*!f,"Array",{forEach:function forEach(a){return e(this,a,arguments[1])}})},function(a,b,d){var e=d(18),f=d(31),g=d(56),h=d(35),i=d(165);a.exports=function(a,b){var d=1==a,j=2==a,k=3==a,l=4==a,m=6==a,n=5==a||m,o=b||i;return function(b,i,p){for(var q,r,s=g(b),t=f(s),u=e(i,p,3),v=h(t.length),w=0,x=d?o(b,v):j?o(b,0):c;v>w;w++)if((n||w in t)&&(q=t[w],r=u(q,w,s),a))if(d)x[w]=r;else if(r)switch(a){case 3:return!0;case 5:return q;case 6:return w;case 2:x.push(q)}else if(l)return!1;return m?-1:k||l?l:x}}},function(a,b,c){var d=c(166);a.exports=function(a,b){return new(d(a))(b)}},function(a,b,d){var e=d(11),f=d(43),g=d(23)("species");a.exports=function(a){var b;return f(a)&&(b=a.constructor,"function"!=typeof b||b!==Array&&!f(b.prototype)||(b=c),e(b)&&(b=b[g],null===b&&(b=c))),b===c?Array:b}},function(a,b,c){var d=c(6),e=c(164)(1);d(d.P+d.F*!c(160)([].map,!0),"Array",{map:function map(a){return e(this,a,arguments[1])}})},function(a,b,c){var d=c(6),e=c(164)(2);d(d.P+d.F*!c(160)([].filter,!0),"Array",{filter:function filter(a){return e(this,a,arguments[1])}})},function(a,b,c){var d=c(6),e=c(164)(3);d(d.P+d.F*!c(160)([].some,!0),"Array",{some:function some(a){return e(this,a,arguments[1])}})},function(a,b,c){var d=c(6),e=c(164)(4);d(d.P+d.F*!c(160)([].every,!0),"Array",{every:function every(a){return e(this,a,arguments[1])}})},function(a,b,c){var d=c(6),e=c(172);d(d.P+d.F*!c(160)([].reduce,!0),"Array",{reduce:function reduce(a){return e(this,a,arguments.length,arguments[1],!1)}})},function(a,b,c){var d=c(19),e=c(56),f=c(31),g=c(35);a.exports=function(a,b,c,h,i){d(b);var j=e(a),k=f(j),l=g(j.length),m=i?l-1:0,n=i?-1:1;if(c<2)for(;;){if(m in k){h=k[m],m+=n;break}if(m+=n,i?m<0:l<=m)throw TypeError("Reduce of empty array with no initial value")}for(;i?m>=0:l>m;m+=n)m in k&&(h=b(h,k[m],m,j));return h}},function(a,b,c){var d=c(6),e=c(172);d(d.P+d.F*!c(160)([].reduceRight,!0),"Array",{reduceRight:function reduceRight(a){return e(this,a,arguments.length,arguments[1],!0)}})},function(a,b,c){var d=c(6),e=c(34)(!1),f=[].indexOf,g=!!f&&1/[1].indexOf(1,-0)<0;d(d.P+d.F*(g||!c(160)(f)),"Array",{indexOf:function indexOf(a){return g?f.apply(this,arguments)||0:e(this,a,arguments[1])}})},function(a,b,c){var d=c(6),e=c(30),f=c(36),g=c(35),h=[].lastIndexOf,i=!!h&&1/[1].lastIndexOf(1,-0)<0;d(d.P+d.F*(i||!c(160)(h)),"Array",{lastIndexOf:function lastIndexOf(a){if(i)return h.apply(this,arguments)||0;var b=e(this),c=g(b.length),d=c-1;for(arguments.length>1&&(d=Math.min(d,f(arguments[1]))),d<0&&(d=c+d);d>=0;d--)if(d in b&&b[d]===a)return d||0;return-1}})},function(a,b,c){var d=c(6);d(d.P,"Array",{copyWithin:c(177)}),c(178)("copyWithin")},function(a,b,d){var e=d(56),f=d(37),g=d(35);a.exports=[].copyWithin||function copyWithin(a,b){var d=e(this),h=g(d.length),i=f(a,h),j=f(b,h),k=arguments.length>2?arguments[2]:c,l=Math.min((k===c?h:f(k,h))-j,h-i),m=1;for(j<i&&i<j+l&&(m=-1,j+=l-1,i+=l-1);l-- >0;)j in d?d[i]=d[j]:delete d[i],i+=m,j+=m;return d}},function(a,b,d){var e=d(23)("unscopables"),f=Array.prototype;f[e]==c&&d(8)(f,e,{}),a.exports=function(a){f[e][a]=!0}},function(a,b,c){var d=c(6);d(d.P,"Array",{fill:c(180)}),c(178)("fill")},function(a,b,d){var e=d(56),f=d(37),g=d(35);a.exports=function fill(a){for(var b=e(this),d=g(b.length),h=arguments.length,i=f(h>1?arguments[1]:c,d),j=h>2?arguments[2]:c,k=j===c?d:f(j,d);k>i;)b[i++]=a;return b}},function(a,b,d){var e=d(6),f=d(164)(5),g="find",h=!0;g in[]&&Array(1)[g](function(){h=!1}),e(e.P+e.F*h,"Array",{find:function find(a){return f(this,a,arguments.length>1?arguments[1]:c)}}),d(178)(g)},function(a,b,d){var e=d(6),f=d(164)(6),g="findIndex",h=!0;g in[]&&Array(1)[g](function(){h=!1}),e(e.P+e.F*h,"Array",{findIndex:function findIndex(a){return f(this,a,arguments.length>1?arguments[1]:c)}}),d(178)(g)},function(a,b,d){var e=d(178),f=d(184),g=d(135),h=d(30);a.exports=d(134)(Array,"Array",function(a,b){this._t=h(a),this._i=0,this._k=b},function(){var a=this._t,b=this._k,d=this._i++;return!a||d>=a.length?(this._t=c,f(1)):"keys"==b?f(0,d):"values"==b?f(0,a[d]):f(0,[d,a[d]])},"values"),g.Arguments=g.Array,e("keys"),e("values"),e("entries")},function(a,b){a.exports=function(a,b){return{value:b,done:!!a}}},function(a,b,c){c(186)("Array")},function(a,b,c){var d=c(2),e=c(9),f=c(4),g=c(23)("species");a.exports=function(a){var b=d[a];f&&b&&!b[g]&&e.f(b,g,{configurable:!0,get:function(){return this}})}},function(a,b,d){var e=d(2),f=d(80),g=d(9).f,h=d(48).f,i=d(128),j=d(188),k=e.RegExp,l=k,m=k.prototype,n=/a/g,o=/a/g,p=new k(n)!==n;if(d(4)&&(!p||d(5)(function(){return o[d(23)("match")]=!1,k(n)!=n||k(o)==o||"/a/i"!=k(n,"i")}))){k=function RegExp(a,b){var d=this instanceof k,e=i(a),g=b===c;return!d&&e&&a.constructor===k&&g?a:f(p?new l(e&&!g?a.source:a,b):l((e=a instanceof k)?a.source:a,e&&g?j.call(a):b),d?this:m,k)};for(var q=(function(a){a in k||g(k,a,{configurable:!0,get:function(){return l[a]},set:function(b){l[a]=b}})}),r=h(l),s=0;r.length>s;)q(r[s++]);m.constructor=k,k.prototype=m,d(16)(e,"RegExp",k)}d(186)("RegExp")},function(a,b,c){var d=c(10);a.exports=function(){var a=d(this),b="";return a.global&&(b+="g"),a.ignoreCase&&(b+="i"),a.multiline&&(b+="m"),a.unicode&&(b+="u"),a.sticky&&(b+="y"),b}},function(a,b,d){d(190);var e=d(10),f=d(188),g=d(4),h="toString",i=/./[h],j=function(a){d(16)(RegExp.prototype,h,a,!0)};d(5)(function(){return"/a/b"!=i.call({source:"a",flags:"b"})})?j(function toString(){var a=e(this);return"/".concat(a.source,"/","flags"in a?a.flags:!g&&a instanceof RegExp?f.call(a):c)}):i.name!=h&&j(function toString(){return i.call(this)})},function(a,b,c){c(4)&&"g"!=/./g.flags&&c(9).f(RegExp.prototype,"flags",{configurable:!0,get:c(188)})},function(a,b,d){d(192)("match",1,function(a,b,d){return[function match(d){var e=a(this),f=d==c?c:d[b];return f!==c?f.call(d,e):new RegExp(d)[b](String(e))},d]})},function(a,b,c){var d=c(8),e=c(16),f=c(5),g=c(33),h=c(23);a.exports=function(a,b,c){var i=h(a),j=c(g,i,""[a]),k=j[0],l=j[1];f(function(){var b={};return b[i]=function(){return 7},7!=""[a](b)})&&(e(String.prototype,a,k),d(RegExp.prototype,i,2==b?function(a,b){return l.call(a,this,b)}:function(a){return l.call(a,this)}))}},function(a,b,d){d(192)("replace",2,function(a,b,d){return[function replace(e,f){var g=a(this),h=e==c?c:e[b];return h!==c?h.call(e,g,f):d.call(String(g),e,f)},d]})},function(a,b,d){d(192)("search",1,function(a,b,d){return[function search(d){var e=a(this),f=d==c?c:d[b];return f!==c?f.call(d,e):new RegExp(d)[b](String(e))},d]})},function(a,b,d){d(192)("split",2,function(a,b,e){var f=d(128),g=e,h=[].push,i="split",j="length",k="lastIndex";if("c"=="abbc"[i](/(b)*/)[1]||4!="test"[i](/(?:)/,-1)[j]||2!="ab"[i](/(?:ab)*/)[j]||4!="."[i](/(.?)(.?)/)[j]||"."[i](/()()/)[j]>1||""[i](/.?/)[j]){var l=/()??/.exec("")[1]===c;e=function(a,b){var d=String(this);if(a===c&&0===b)return[];if(!f(a))return g.call(d,a,b);var e,i,m,n,o,p=[],q=(a.ignoreCase?"i":"")+(a.multiline?"m":"")+(a.unicode?"u":"")+(a.sticky?"y":""),r=0,s=b===c?4294967295:b>>>0,t=new RegExp(a.source,q+"g");for(l||(e=new RegExp("^"+t.source+"$(?!\\s)",q));(i=t.exec(d))&&(m=i.index+i[0][j],!(m>r&&(p.push(d.slice(r,i.index)),!l&&i[j]>1&&i[0].replace(e,function(){for(o=1;o<arguments[j]-2;o++)arguments[o]===c&&(i[o]=c)}),i[j]>1&&i.index<d[j]&&h.apply(p,i.slice(1)),n=i[0][j],r=m,p[j]>=s)));)t[k]===i.index&&t[k]++;return r===d[j]?!n&&t.test("")||p.push(""):p.push(d.slice(r)),p[j]>s?p.slice(0,s):p}}else"0"[i](c,0)[j]&&(e=function(a,b){return a===c&&0===b?[]:g.call(this,a,b)});return[function split(d,f){var g=a(this),h=d==c?c:d[b];return h!==c?h.call(d,g,f):e.call(String(g),d,f)},e]})},function(a,b,d){var e,f,g,h=d(26),i=d(2),j=d(18),k=d(73),l=d(6),m=d(11),n=d(19),o=d(197),p=d(198),q=d(199),r=d(200).set,s=d(201)(),t="Promise",u=i.TypeError,v=i.process,w=i[t],v=i.process,x="process"==k(v),y=function(){},z=!!function(){try{var a=w.resolve(1),b=(a.constructor={})[d(23)("species")]=function(a){a(y,y)};return(x||"function"==typeof PromiseRejectionEvent)&&a.then(y)instanceof b}catch(c){}}(),A=function(a,b){return a===b||a===w&&b===g},B=function(a){var b;return!(!m(a)||"function"!=typeof(b=a.then))&&b},C=function(a){return A(w,a)?new D(a):new f(a)},D=f=function(a){var b,d;this.promise=new a(function(a,e){if(b!==c||d!==c)throw u("Bad Promise constructor");b=a,d=e}),this.resolve=n(b),this.reject=n(d)},E=function(a){try{a()}catch(b){return{error:b}}},F=function(a,b){if(!a._n){a._n=!0;var c=a._c;s(function(){for(var d=a._v,e=1==a._s,f=0,g=function(b){var c,f,g=e?b.ok:b.fail,h=b.resolve,i=b.reject,j=b.domain;try{g?(e||(2==a._h&&I(a),a._h=1),g===!0?c=d:(j&&j.enter(),c=g(d),j&&j.exit()),c===b.promise?i(u("Promise-chain cycle")):(f=B(c))?f.call(c,h,i):h(c)):i(d)}catch(k){i(k)}};c.length>f;)g(c[f++]);a._c=[],a._n=!1,b&&!a._h&&G(a)})}},G=function(a){r.call(i,function(){var b,d,e,f=a._v;if(H(a)&&(b=E(function(){x?v.emit("unhandledRejection",f,a):(d=i.onunhandledrejection)?d({promise:a,reason:f}):(e=i.console)&&e.error&&e.error("Unhandled promise rejection",f)}),a._h=x||H(a)?2:1),a._a=c,b)throw b.error})},H=function(a){if(1==a._h)return!1;for(var b,c=a._a||a._c,d=0;c.length>d;)if(b=c[d++],b.fail||!H(b.promise))return!1;return!0},I=function(a){r.call(i,function(){var b;x?v.emit("rejectionHandled",a):(b=i.onrejectionhandled)&&b({promise:a,reason:a._v})})},J=function(a){var b=this;b._d||(b._d=!0,b=b._w||b,b._v=a,b._s=2,b._a||(b._a=b._c.slice()),F(b,!0))},K=function(a){var b,c=this;if(!c._d){c._d=!0,c=c._w||c;try{if(c===a)throw u("Promise can't be resolved itself");(b=B(a))?s(function(){var d={_w:c,_d:!1};try{b.call(a,j(K,d,1),j(J,d,1))}catch(e){J.call(d,e)}}):(c._v=a,c._s=1,F(c,!1))}catch(d){J.call({_w:c,_d:!1},d)}}};z||(w=function Promise(a){o(this,w,t,"_h"),n(a),e.call(this);try{a(j(K,this,1),j(J,this,1))}catch(b){J.call(this,b)}},e=function Promise(a){this._c=[],this._a=c,this._s=0,this._d=!1,this._v=c,this._h=0,this._n=!1},e.prototype=d(202)(w.prototype,{then:function then(a,b){var d=C(q(this,w));return d.ok="function"!=typeof a||a,d.fail="function"==typeof b&&b,d.domain=x?v.domain:c,this._c.push(d),this._a&&this._a.push(d),this._s&&F(this,!1),d.promise},"catch":function(a){return this.then(c,a)}}),D=function(){var a=new e;this.promise=a,this.resolve=j(K,a,1),this.reject=j(J,a,1)}),l(l.G+l.W+l.F*!z,{Promise:w}),d(22)(w,t),d(186)(t),g=d(7)[t],l(l.S+l.F*!z,t,{reject:function reject(a){var b=C(this),c=b.reject;return c(a),b.promise}}),l(l.S+l.F*(h||!z),t,{resolve:function resolve(a){if(a instanceof w&&A(a.constructor,this))return a;var b=C(this),c=b.resolve;return c(a),b.promise}}),l(l.S+l.F*!(z&&d(157)(function(a){w.all(a)["catch"](y)})),t,{all:function all(a){var b=this,d=C(b),e=d.resolve,f=d.reject,g=E(function(){var d=[],g=0,h=1;p(a,!1,function(a){var i=g++,j=!1;d.push(c),h++,b.resolve(a).then(function(a){j||(j=!0,d[i]=a,--h||e(d))},f)}),--h||e(d)});return g&&f(g.error),d.promise},race:function race(a){var b=this,c=C(b),d=c.reject,e=E(function(){p(a,!1,function(a){b.resolve(a).then(c.resolve,d)})});return e&&d(e.error),c.promise}})},function(a,b){a.exports=function(a,b,d,e){if(!(a instanceof b)||e!==c&&e in a)throw TypeError(d+": incorrect invocation!");return a}},function(a,b,c){var d=c(18),e=c(153),f=c(154),g=c(10),h=c(35),i=c(156),j={},k={},b=a.exports=function(a,b,c,l,m){var n,o,p,q,r=m?function(){return a}:i(a),s=d(c,l,b?2:1),t=0;if("function"!=typeof r)throw TypeError(a+" is not iterable!");if(f(r)){for(n=h(a.length);n>t;t++)if(q=b?s(g(o=a[t])[0],o[1]):s(a[t]),q===j||q===k)return q}else for(p=r.call(a);!(o=p.next()).done;)if(q=e(p,s,o.value,b),q===j||q===k)return q};b.BREAK=j,b.RETURN=k},function(a,b,d){var e=d(10),f=d(19),g=d(23)("species");a.exports=function(a,b){var d,h=e(a).constructor;return h===c||(d=e(h)[g])==c?b:f(d)}},function(a,b,c){var d,e,f,g=c(18),h=c(76),i=c(46),j=c(13),k=c(2),l=k.process,m=k.setImmediate,n=k.clearImmediate,o=k.MessageChannel,p=0,q={},r="onreadystatechange",s=function(){var a=+this;if(q.hasOwnProperty(a)){var b=q[a];delete q[a],b()}},t=function(a){s.call(a.data)};m&&n||(m=function setImmediate(a){for(var b=[],c=1;arguments.length>c;)b.push(arguments[c++]);return q[++p]=function(){h("function"==typeof a?a:Function(a),b)},d(p),p},n=function clearImmediate(a){delete q[a]},"process"==c(32)(l)?d=function(a){l.nextTick(g(s,a,1))}:o?(e=new o,f=e.port2,e.port1.onmessage=t,d=g(f.postMessage,f,1)):k.addEventListener&&"function"==typeof postMessage&&!k.importScripts?(d=function(a){k.postMessage(a+"","*")},k.addEventListener("message",t,!1)):d=r in j("script")?function(a){i.appendChild(j("script"))[r]=function(){i.removeChild(this),s.call(a)}}:function(a){setTimeout(g(s,a,1),0)}),a.exports={set:m,clear:n}},function(a,b,d){var e=d(2),f=d(200).set,g=e.MutationObserver||e.WebKitMutationObserver,h=e.process,i=e.Promise,j="process"==d(32)(h);a.exports=function(){var a,b,d,k=function(){var e,f;for(j&&(e=h.domain)&&e.exit();a;){f=a.fn,a=a.next;try{f()}catch(g){throw a?d():b=c,g}}b=c,e&&e.enter()};if(j)d=function(){h.nextTick(k)};else if(g){var l=!0,m=document.createTextNode("");new g(k).observe(m,{characterData:!0}),d=function(){m.data=l=!l}}else if(i&&i.resolve){var n=i.resolve();d=function(){n.then(k)}}else d=function(){f.call(e,k)};return function(e){var f={fn:e,next:c};b&&(b.next=f),a||(a=f,d()),b=f}}},function(a,b,c){var d=c(16);a.exports=function(a,b,c){for(var e in b)d(a,e,b[e],c);return a}},function(a,b,d){var e=d(204);a.exports=d(205)("Map",function(a){return function Map(){return a(this,arguments.length>0?arguments[0]:c)}},{get:function get(a){var b=e.getEntry(this,a);return b&&b.v},set:function set(a,b){return e.def(this,0===a?0:a,b)}},e,!0)},function(a,b,d){var e=d(9).f,f=d(44),g=d(202),h=d(18),i=d(197),j=d(33),k=d(198),l=d(134),m=d(184),n=d(186),o=d(4),p=d(20).fastKey,q=o?"_s":"size",r=function(a,b){var c,d=p(b);if("F"!==d)return a._i[d];for(c=a._f;c;c=c.n)if(c.k==b)return c};a.exports={getConstructor:function(a,b,d,l){var m=a(function(a,e){i(a,m,b,"_i"),a._i=f(null),a._f=c,a._l=c,a[q]=0,e!=c&&k(e,d,a[l],a)});return g(m.prototype,{clear:function clear(){for(var a=this,b=a._i,d=a._f;d;d=d.n)d.r=!0,d.p&&(d.p=d.p.n=c),delete b[d.i];a._f=a._l=c,a[q]=0},"delete":function(a){var b=this,c=r(b,a);if(c){var d=c.n,e=c.p;delete b._i[c.i],c.r=!0,e&&(e.n=d),d&&(d.p=e),b._f==c&&(b._f=d),b._l==c&&(b._l=e),b[q]--}return!!c},forEach:function forEach(a){i(this,m,"forEach");for(var b,d=h(a,arguments.length>1?arguments[1]:c,3);b=b?b.n:this._f;)for(d(b.v,b.k,this);b&&b.r;)b=b.p},has:function has(a){return!!r(this,a)}}),o&&e(m.prototype,"size",{get:function(){return j(this[q])}}),m},def:function(a,b,d){var e,f,g=r(a,b);return g?g.v=d:(a._l=g={i:f=p(b,!0),k:b,v:d,p:e=a._l,n:c,r:!1},a._f||(a._f=g),e&&(e.n=g),a[q]++,"F"!==f&&(a._i[f]=g)),a},getEntry:r,setStrong:function(a,b,d){l(a,b,function(a,b){this._t=a,this._k=b,this._l=c},function(){for(var a=this,b=a._k,d=a._l;d&&d.r;)d=d.p;return a._t&&(a._l=d=d?d.n:a._t._f)?"keys"==b?m(0,d.k):"values"==b?m(0,d.v):m(0,[d.k,d.v]):(a._t=c,m(1))},d?"entries":"values",!d,!0),n(b)}}},function(a,b,d){var e=d(2),f=d(6),g=d(16),h=d(202),i=d(20),j=d(198),k=d(197),l=d(11),m=d(5),n=d(157),o=d(22),p=d(80);a.exports=function(a,b,d,q,r,s){var t=e[a],u=t,v=r?"set":"add",w=u&&u.prototype,x={},y=function(a){var b=w[a];g(w,a,"delete"==a?function(a){return!(s&&!l(a))&&b.call(this,0===a?0:a)}:"has"==a?function has(a){return!(s&&!l(a))&&b.call(this,0===a?0:a)}:"get"==a?function get(a){return s&&!l(a)?c:b.call(this,0===a?0:a)}:"add"==a?function add(a){return b.call(this,0===a?0:a),this}:function set(a,c){return b.call(this,0===a?0:a,c),this})};if("function"==typeof u&&(s||w.forEach&&!m(function(){(new u).entries().next()}))){var z=new u,A=z[v](s?{}:-0,1)!=z,B=m(function(){z.has(1)}),C=n(function(a){new u(a)}),D=!s&&m(function(){for(var a=new u,b=5;b--;)a[v](b,b);return!a.has(-0)});C||(u=b(function(b,d){k(b,u,a);var e=p(new t,b,u);return d!=c&&j(d,r,e[v],e),e}),u.prototype=w,w.constructor=u),(B||D)&&(y("delete"),y("has"),r&&y("get")),(D||A)&&y(v),s&&w.clear&&delete w.clear}else u=q.getConstructor(b,a,r,v),h(u.prototype,d),i.NEED=!0;return o(u,a),x[a]=u,f(f.G+f.W+f.F*(u!=t),x),s||q.setStrong(u,a,r),u}},function(a,b,d){var e=d(204);a.exports=d(205)("Set",function(a){return function Set(){return a(this,arguments.length>0?arguments[0]:c)}},{add:function add(a){return e.def(this,a=0===a?0:a,a)}},e)},function(a,b,d){var e,f=d(164)(0),g=d(16),h=d(20),i=d(67),j=d(208),k=d(11),l=h.getWeak,m=Object.isExtensible,n=j.ufstore,o={},p=function(a){return function WeakMap(){return a(this,arguments.length>0?arguments[0]:c)}},q={get:function get(a){if(k(a)){var b=l(a);return b===!0?n(this).get(a):b?b[this._i]:c}},set:function set(a,b){return j.def(this,a,b)}},r=a.exports=d(205)("WeakMap",p,q,j,!0,!0);7!=(new r).set((Object.freeze||Object)(o),7).get(o)&&(e=j.getConstructor(p),i(e.prototype,q),h.NEED=!0,f(["delete","has","get","set"],function(a){var b=r.prototype,c=b[a];g(b,a,function(b,d){if(k(b)&&!m(b)){this._f||(this._f=new e);var f=this._f[a](b,d);return"set"==a?this:f}return c.call(this,b,d)})}))},function(a,b,d){var e=d(202),f=d(20).getWeak,g=d(10),h=d(11),i=d(197),j=d(198),k=d(164),l=d(3),m=k(5),n=k(6),o=0,p=function(a){return a._l||(a._l=new q)},q=function(){this.a=[]},r=function(a,b){return m(a.a,function(a){return a[0]===b})};q.prototype={get:function(a){var b=r(this,a);if(b)return b[1]},has:function(a){return!!r(this,a)},set:function(a,b){var c=r(this,a);c?c[1]=b:this.a.push([a,b])},"delete":function(a){var b=n(this.a,function(b){return b[0]===a});return~b&&this.a.splice(b,1),!!~b}},a.exports={getConstructor:function(a,b,d,g){var k=a(function(a,e){i(a,k,b,"_i"),a._i=o++,a._l=c,e!=c&&j(e,d,a[g],a)});return e(k.prototype,{"delete":function(a){if(!h(a))return!1;var b=f(a);return b===!0?p(this)["delete"](a):b&&l(b,this._i)&&delete b[this._i]},has:function has(a){if(!h(a))return!1;var b=f(a);return b===!0?p(this).has(a):b&&l(b,this._i)}}),k},def:function(a,b,c){var d=f(g(b),!0);return d===!0?p(a).set(b,c):d[a._i]=c,a},ufstore:p}},function(a,b,d){var e=d(208);d(205)("WeakSet",function(a){return function WeakSet(){return a(this,arguments.length>0?arguments[0]:c)}},{add:function add(a){return e.def(this,a,!0)}},e,!1,!0)},function(a,b,c){var d=c(6),e=c(19),f=c(10),g=(c(2).Reflect||{}).apply,h=Function.apply;d(d.S+d.F*!c(5)(function(){g(function(){})}),"Reflect",{apply:function apply(a,b,c){var d=e(a),i=f(c);return g?g(d,b,i):h.call(d,b,i)}})},function(a,b,c){var d=c(6),e=c(44),f=c(19),g=c(10),h=c(11),i=c(5),j=c(75),k=(c(2).Reflect||{}).construct,l=i(function(){function F(){}return!(k(function(){},[],F)instanceof F)}),m=!i(function(){k(function(){})});d(d.S+d.F*(l||m),"Reflect",{construct:function construct(a,b){f(a),g(b);var c=arguments.length<3?a:f(arguments[2]);if(m&&!l)return k(a,b,c);if(a==c){switch(b.length){case 0:return new a;case 1:return new a(b[0]);case 2:return new a(b[0],b[1]);case 3:return new a(b[0],b[1],b[2]);case 4:return new a(b[0],b[1],b[2],b[3])}var d=[null];return d.push.apply(d,b),new(j.apply(a,d))}var i=c.prototype,n=e(h(i)?i:Object.prototype),o=Function.apply.call(a,n,b);return h(o)?o:n}})},function(a,b,c){var d=c(9),e=c(6),f=c(10),g=c(14);e(e.S+e.F*c(5)(function(){Reflect.defineProperty(d.f({},1,{value:1}),1,{value:2})}),"Reflect",{defineProperty:function defineProperty(a,b,c){f(a),b=g(b,!0),f(c);try{return d.f(a,b,c),!0}catch(e){return!1}}})},function(a,b,c){var d=c(6),e=c(49).f,f=c(10);d(d.S,"Reflect",{deleteProperty:function deleteProperty(a,b){var c=e(f(a),b);return!(c&&!c.configurable)&&delete a[b]}})},function(a,b,d){var e=d(6),f=d(10),g=function(a){this._t=f(a),this._i=0;var b,c=this._k=[];for(b in a)c.push(b)};d(136)(g,"Object",function(){var a,b=this,d=b._k;do if(b._i>=d.length)return{value:c,done:!0};while(!((a=d[b._i++])in b._t));return{value:a,done:!1}}),e(e.S,"Reflect",{enumerate:function enumerate(a){return new g(a)}})},function(a,b,d){function get(a,b){var d,h,k=arguments.length<3?a:arguments[2];return j(a)===k?a[b]:(d=e.f(a,b))?g(d,"value")?d.value:d.get!==c?d.get.call(k):c:i(h=f(a))?get(h,b,k):void 0}var e=d(49),f=d(57),g=d(3),h=d(6),i=d(11),j=d(10);h(h.S,"Reflect",{get:get})},function(a,b,c){var d=c(49),e=c(6),f=c(10);e(e.S,"Reflect",{getOwnPropertyDescriptor:function getOwnPropertyDescriptor(a,b){return d.f(f(a),b)}})},function(a,b,c){var d=c(6),e=c(57),f=c(10);d(d.S,"Reflect",{getPrototypeOf:function getPrototypeOf(a){return e(f(a))}})},function(a,b,c){var d=c(6);d(d.S,"Reflect",{has:function has(a,b){return b in a}})},function(a,b,c){var d=c(6),e=c(10),f=Object.isExtensible;d(d.S,"Reflect",{isExtensible:function isExtensible(a){return e(a),!f||f(a)}})},function(a,b,c){var d=c(6);d(d.S,"Reflect",{ownKeys:c(221)})},function(a,b,c){var d=c(48),e=c(41),f=c(10),g=c(2).Reflect;a.exports=g&&g.ownKeys||function ownKeys(a){var b=d.f(f(a)),c=e.f;return c?b.concat(c(a)):b}},function(a,b,c){var d=c(6),e=c(10),f=Object.preventExtensions;d(d.S,"Reflect",{preventExtensions:function preventExtensions(a){e(a);try{return f&&f(a),!0}catch(b){return!1}}})},function(a,b,d){function set(a,b,d){var i,m,n=arguments.length<4?a:arguments[3],o=f.f(k(a),b);if(!o){if(l(m=g(a)))return set(m,b,d,n);o=j(0)}return h(o,"value")?!(o.writable===!1||!l(n))&&(i=f.f(n,b)||j(0),i.value=d,e.f(n,b,i),!0):o.set!==c&&(o.set.call(n,d),!0)}var e=d(9),f=d(49),g=d(57),h=d(3),i=d(6),j=d(15),k=d(10),l=d(11);i(i.S,"Reflect",{set:set})},function(a,b,c){var d=c(6),e=c(71);e&&d(d.S,"Reflect",{setPrototypeOf:function setPrototypeOf(a,b){e.check(a,b);try{return e.set(a,b),!0}catch(c){return!1}}})},function(a,b,c){var d=c(6);d(d.S,"Date",{now:function(){return(new Date).getTime()}})},function(a,b,c){var d=c(6),e=c(56),f=c(14);d(d.P+d.F*c(5)(function(){return null!==new Date(NaN).toJSON()||1!==Date.prototype.toJSON.call({toISOString:function(){return 1}})}),"Date",{toJSON:function toJSON(a){var b=e(this),c=f(b);return"number"!=typeof c||isFinite(c)?b.toISOString():null}})},function(a,b,c){var d=c(6),e=c(5),f=Date.prototype.getTime,g=function(a){return a>9?a:"0"+a};d(d.P+d.F*(e(function(){return"0385-07-25T07:06:39.999Z"!=new Date(-5e13-1).toISOString()})||!e(function(){new Date(NaN).toISOString()})),"Date",{toISOString:function toISOString(){if(!isFinite(f.call(this)))throw RangeError("Invalid time value");var a=this,b=a.getUTCFullYear(),c=a.getUTCMilliseconds(),d=b<0?"-":b>9999?"+":"";return d+("00000"+Math.abs(b)).slice(d?-6:-4)+"-"+g(a.getUTCMonth()+1)+"-"+g(a.getUTCDate())+"T"+g(a.getUTCHours())+":"+g(a.getUTCMinutes())+":"+g(a.getUTCSeconds())+"."+(c>99?c:"0"+g(c))+"Z"}})},function(a,b,c){var d=Date.prototype,e="Invalid Date",f="toString",g=d[f],h=d.getTime;new Date(NaN)+""!=e&&c(16)(d,f,function toString(){var a=h.call(this);return a===a?g.call(this):e})},function(a,b,c){var d=c(23)("toPrimitive"),e=Date.prototype;d in e||c(8)(e,d,c(230))},function(a,b,c){var d=c(10),e=c(14),f="number";a.exports=function(a){if("string"!==a&&a!==f&&"default"!==a)throw TypeError("Incorrect hint");return e(d(this),a!=f)}},function(a,b,d){var e=d(6),f=d(232),g=d(233),h=d(10),i=d(37),j=d(35),k=d(11),l=d(2).ArrayBuffer,m=d(199),n=g.ArrayBuffer,o=g.DataView,p=f.ABV&&l.isView,q=n.prototype.slice,r=f.VIEW,s="ArrayBuffer";e(e.G+e.W+e.F*(l!==n),{ArrayBuffer:n}),e(e.S+e.F*!f.CONSTR,s,{isView:function isView(a){return p&&p(a)||k(a)&&r in a}}),e(e.P+e.U+e.F*d(5)(function(){return!new n(2).slice(1,c).byteLength}),s,{slice:function slice(a,b){if(q!==c&&b===c)return q.call(h(this),a);for(var d=h(this).byteLength,e=i(a,d),f=i(b===c?d:b,d),g=new(m(this,n))(j(f-e)),k=new o(this),l=new o(g),p=0;e<f;)l.setUint8(p++,k.getUint8(e++));return g}}),d(186)(s)},function(a,b,c){for(var d,e=c(2),f=c(8),g=c(17),h=g("typed_array"),i=g("view"),j=!(!e.ArrayBuffer||!e.DataView),k=j,l=0,m=9,n="Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array".split(",");l<m;)(d=e[n[l++]])?(f(d.prototype,h,!0),f(d.prototype,i,!0)):k=!1;a.exports={ABV:j,CONSTR:k,TYPED:h,VIEW:i}},function(a,b,d){var e=d(2),f=d(4),g=d(26),h=d(232),i=d(8),j=d(202),k=d(5),l=d(197),m=d(36),n=d(35),o=d(48).f,p=d(9).f,q=d(180),r=d(22),s="ArrayBuffer",t="DataView",u="prototype",v="Wrong length!",w="Wrong index!",x=e[s],y=e[t],z=e.Math,A=e.RangeError,B=e.Infinity,C=x,D=z.abs,E=z.pow,F=z.floor,G=z.log,H=z.LN2,I="buffer",J="byteLength",K="byteOffset",L=f?"_b":I,M=f?"_l":J,N=f?"_o":K,O=function(a,b,c){var d,e,f,g=Array(c),h=8*c-b-1,i=(1<<h)-1,j=i>>1,k=23===b?E(2,-24)-E(2,-77):0,l=0,m=a<0||0===a&&1/a<0?1:0;for(a=D(a),a!=a||a===B?(e=a!=a?1:0,d=i):(d=F(G(a)/H),a*(f=E(2,-d))<1&&(d--,f*=2),a+=d+j>=1?k/f:k*E(2,1-j),a*f>=2&&(d++,f/=2),d+j>=i?(e=0,d=i):d+j>=1?(e=(a*f-1)*E(2,b),d+=j):(e=a*E(2,j-1)*E(2,b),d=0));b>=8;g[l++]=255&e,e/=256,b-=8);for(d=d<<b|e,h+=b;h>0;g[l++]=255&d,d/=256,h-=8);return g[--l]|=128*m,g},P=function(a,b,c){var d,e=8*c-b-1,f=(1<<e)-1,g=f>>1,h=e-7,i=c-1,j=a[i--],k=127&j;for(j>>=7;h>0;k=256*k+a[i],i--,h-=8);for(d=k&(1<<-h)-1,k>>=-h,h+=b;h>0;d=256*d+a[i],i--,h-=8);if(0===k)k=1-g;else{if(k===f)return d?NaN:j?-B:B;d+=E(2,b),k-=g}return(j?-1:1)*d*E(2,k-b)},Q=function(a){return a[3]<<24|a[2]<<16|a[1]<<8|a[0]},R=function(a){return[255&a]},S=function(a){return[255&a,a>>8&255]},T=function(a){return[255&a,a>>8&255,a>>16&255,a>>24&255]},U=function(a){return O(a,52,8)},V=function(a){return O(a,23,4)},W=function(a,b,c){p(a[u],b,{get:function(){return this[c]}})},X=function(a,b,c,d){var e=+c,f=m(e);if(e!=f||f<0||f+b>a[M])throw A(w);var g=a[L]._b,h=f+a[N],i=g.slice(h,h+b);return d?i:i.reverse()},Y=function(a,b,c,d,e,f){var g=+c,h=m(g);if(g!=h||h<0||h+b>a[M])throw A(w);for(var i=a[L]._b,j=h+a[N],k=d(+e),l=0;l<b;l++)i[j+l]=k[f?l:b-l-1]},Z=function(a,b){l(a,x,s);var c=+b,d=n(c);if(c!=d)throw A(v);return d};if(h.ABV){if(!k(function(){new x})||!k(function(){new x(.5)})){x=function ArrayBuffer(a){return new C(Z(this,a))};for(var $,_=x[u]=C[u],aa=o(C),ba=0;aa.length>ba;)($=aa[ba++])in x||i(x,$,C[$]);g||(_.constructor=x)}var ca=new y(new x(2)),da=y[u].setInt8;ca.setInt8(0,2147483648),ca.setInt8(1,2147483649),!ca.getInt8(0)&&ca.getInt8(1)||j(y[u],{setInt8:function setInt8(a,b){da.call(this,a,b<<24>>24)},setUint8:function setUint8(a,b){da.call(this,a,b<<24>>24)}},!0)}else x=function ArrayBuffer(a){var b=Z(this,a);this._b=q.call(Array(b),0),this[M]=b},y=function DataView(a,b,d){l(this,y,t),l(a,x,t);var e=a[M],f=m(b);if(f<0||f>e)throw A("Wrong offset!");if(d=d===c?e-f:n(d),f+d>e)throw A(v);this[L]=a,this[N]=f,this[M]=d},f&&(W(x,J,"_l"),W(y,I,"_b"),W(y,J,"_l"),W(y,K,"_o")),j(y[u],{getInt8:function getInt8(a){return X(this,1,a)[0]<<24>>24},getUint8:function getUint8(a){return X(this,1,a)[0]},getInt16:function getInt16(a){var b=X(this,2,a,arguments[1]);return(b[1]<<8|b[0])<<16>>16},getUint16:function getUint16(a){var b=X(this,2,a,arguments[1]);return b[1]<<8|b[0]},getInt32:function getInt32(a){return Q(X(this,4,a,arguments[1]))},getUint32:function getUint32(a){return Q(X(this,4,a,arguments[1]))>>>0},getFloat32:function getFloat32(a){return P(X(this,4,a,arguments[1]),23,4)},getFloat64:function getFloat64(a){return P(X(this,8,a,arguments[1]),52,8)},setInt8:function setInt8(a,b){Y(this,1,a,R,b)},setUint8:function setUint8(a,b){Y(this,1,a,R,b)},setInt16:function setInt16(a,b){Y(this,2,a,S,b,arguments[2])},setUint16:function setUint16(a,b){Y(this,2,a,S,b,arguments[2])},setInt32:function setInt32(a,b){Y(this,4,a,T,b,arguments[2])},setUint32:function setUint32(a,b){Y(this,4,a,T,b,arguments[2])},setFloat32:function setFloat32(a,b){Y(this,4,a,V,b,arguments[2])},setFloat64:function setFloat64(a,b){Y(this,8,a,U,b,arguments[2])}});r(x,s),r(y,t),i(y[u],h.VIEW,!0),b[s]=x,b[t]=y},function(a,b,c){var d=c(6);d(d.G+d.W+d.F*!c(232).ABV,{DataView:c(233).DataView})},function(a,b,c){c(236)("Int8",1,function(a){return function Int8Array(b,c,d){return a(this,b,c,d)}})},function(a,b,d){if(d(4)){var e=d(26),f=d(2),g=d(5),h=d(6),i=d(232),j=d(233),k=d(18),l=d(197),m=d(15),n=d(8),o=d(202),p=d(36),q=d(35),r=d(37),s=d(14),t=d(3),u=d(69),v=d(73),w=d(11),x=d(56),y=d(154),z=d(44),A=d(57),B=d(48).f,C=d(156),D=d(17),E=d(23),F=d(164),G=d(34),H=d(199),I=d(183),J=d(135),K=d(157),L=d(186),M=d(180),N=d(177),O=d(9),P=d(49),Q=O.f,R=P.f,S=f.RangeError,T=f.TypeError,U=f.Uint8Array,V="ArrayBuffer",W="Shared"+V,X="BYTES_PER_ELEMENT",Y="prototype",Z=Array[Y],$=j.ArrayBuffer,_=j.DataView,aa=F(0),ba=F(2),ca=F(3),da=F(4),ea=F(5),fa=F(6),ga=G(!0),ha=G(!1),ia=I.values,ja=I.keys,ka=I.entries,la=Z.lastIndexOf,ma=Z.reduce,na=Z.reduceRight,oa=Z.join,pa=Z.sort,qa=Z.slice,ra=Z.toString,sa=Z.toLocaleString,ta=E("iterator"),ua=E("toStringTag"),va=D("typed_constructor"),wa=D("def_constructor"),xa=i.CONSTR,ya=i.TYPED,za=i.VIEW,Aa="Wrong length!",Ba=F(1,function(a,b){return Ha(H(a,a[wa]),b)}),Ca=g(function(){return 1===new U(new Uint16Array([1]).buffer)[0]}),Da=!!U&&!!U[Y].set&&g(function(){new U(1).set({})}),Ea=function(a,b){if(a===c)throw T(Aa);var d=+a,e=q(a);if(b&&!u(d,e))throw S(Aa);return e},Fa=function(a,b){var c=p(a);if(c<0||c%b)throw S("Wrong offset!");return c},Ga=function(a){if(w(a)&&ya in a)return a;throw T(a+" is not a typed array!")},Ha=function(a,b){if(!(w(a)&&va in a))throw T("It is not a typed array constructor!");return new a(b)},Ia=function(a,b){return Ja(H(a,a[wa]),b)},Ja=function(a,b){for(var c=0,d=b.length,e=Ha(a,d);d>c;)e[c]=b[c++];return e},Ka=function(a,b,c){Q(a,b,{get:function(){return this._d[c]}})},La=function from(a){var b,d,e,f,g,h,i=x(a),j=arguments.length,l=j>1?arguments[1]:c,m=l!==c,n=C(i);if(n!=c&&!y(n)){for(h=n.call(i),e=[],b=0;!(g=h.next()).done;b++)e.push(g.value);i=e}for(m&&j>2&&(l=k(l,arguments[2],2)),b=0,d=q(i.length),f=Ha(this,d);d>b;b++)f[b]=m?l(i[b],b):i[b];return f},Ma=function of(){for(var a=0,b=arguments.length,c=Ha(this,b);b>a;)c[a]=arguments[a++];return c},Na=!!U&&g(function(){sa.call(new U(1))}),Oa=function toLocaleString(){return sa.apply(Na?qa.call(Ga(this)):Ga(this),arguments)},Pa={copyWithin:function copyWithin(a,b){return N.call(Ga(this),a,b,arguments.length>2?arguments[2]:c)},every:function every(a){return da(Ga(this),a,arguments.length>1?arguments[1]:c)},fill:function fill(a){return M.apply(Ga(this),arguments)},filter:function filter(a){return Ia(this,ba(Ga(this),a,arguments.length>1?arguments[1]:c))},find:function find(a){return ea(Ga(this),a,arguments.length>1?arguments[1]:c)},findIndex:function findIndex(a){return fa(Ga(this),a,arguments.length>1?arguments[1]:c)},forEach:function forEach(a){aa(Ga(this),a,arguments.length>1?arguments[1]:c)},indexOf:function indexOf(a){return ha(Ga(this),a,arguments.length>1?arguments[1]:c)},includes:function includes(a){return ga(Ga(this),a,arguments.length>1?arguments[1]:c)},join:function join(a){return oa.apply(Ga(this),arguments)},lastIndexOf:function lastIndexOf(a){
return la.apply(Ga(this),arguments)},map:function map(a){return Ba(Ga(this),a,arguments.length>1?arguments[1]:c)},reduce:function reduce(a){return ma.apply(Ga(this),arguments)},reduceRight:function reduceRight(a){return na.apply(Ga(this),arguments)},reverse:function reverse(){for(var a,b=this,c=Ga(b).length,d=Math.floor(c/2),e=0;e<d;)a=b[e],b[e++]=b[--c],b[c]=a;return b},some:function some(a){return ca(Ga(this),a,arguments.length>1?arguments[1]:c)},sort:function sort(a){return pa.call(Ga(this),a)},subarray:function subarray(a,b){var d=Ga(this),e=d.length,f=r(a,e);return new(H(d,d[wa]))(d.buffer,d.byteOffset+f*d.BYTES_PER_ELEMENT,q((b===c?e:r(b,e))-f))}},Qa=function slice(a,b){return Ia(this,qa.call(Ga(this),a,b))},Ra=function set(a){Ga(this);var b=Fa(arguments[1],1),c=this.length,d=x(a),e=q(d.length),f=0;if(e+b>c)throw S(Aa);for(;f<e;)this[b+f]=d[f++]},Sa={entries:function entries(){return ka.call(Ga(this))},keys:function keys(){return ja.call(Ga(this))},values:function values(){return ia.call(Ga(this))}},Ta=function(a,b){return w(a)&&a[ya]&&"symbol"!=typeof b&&b in a&&String(+b)==String(b)},Ua=function getOwnPropertyDescriptor(a,b){return Ta(a,b=s(b,!0))?m(2,a[b]):R(a,b)},Va=function defineProperty(a,b,c){return!(Ta(a,b=s(b,!0))&&w(c)&&t(c,"value"))||t(c,"get")||t(c,"set")||c.configurable||t(c,"writable")&&!c.writable||t(c,"enumerable")&&!c.enumerable?Q(a,b,c):(a[b]=c.value,a)};xa||(P.f=Ua,O.f=Va),h(h.S+h.F*!xa,"Object",{getOwnPropertyDescriptor:Ua,defineProperty:Va}),g(function(){ra.call({})})&&(ra=sa=function toString(){return oa.call(this)});var Wa=o({},Pa);o(Wa,Sa),n(Wa,ta,Sa.values),o(Wa,{slice:Qa,set:Ra,constructor:function(){},toString:ra,toLocaleString:Oa}),Ka(Wa,"buffer","b"),Ka(Wa,"byteOffset","o"),Ka(Wa,"byteLength","l"),Ka(Wa,"length","e"),Q(Wa,ua,{get:function(){return this[ya]}}),a.exports=function(a,b,d,j){j=!!j;var k=a+(j?"Clamped":"")+"Array",m="Uint8Array"!=k,o="get"+a,p="set"+a,r=f[k],s=r||{},t=r&&A(r),u=!r||!i.ABV,x={},y=r&&r[Y],C=function(a,c){var d=a._d;return d.v[o](c*b+d.o,Ca)},D=function(a,c,d){var e=a._d;j&&(d=(d=Math.round(d))<0?0:d>255?255:255&d),e.v[p](c*b+e.o,d,Ca)},E=function(a,b){Q(a,b,{get:function(){return C(this,b)},set:function(a){return D(this,b,a)},enumerable:!0})};u?(r=d(function(a,d,e,f){l(a,r,k,"_d");var g,h,i,j,m=0,o=0;if(w(d)){if(!(d instanceof $||(j=v(d))==V||j==W))return ya in d?Ja(r,d):La.call(r,d);g=d,o=Fa(e,b);var p=d.byteLength;if(f===c){if(p%b)throw S(Aa);if(h=p-o,h<0)throw S(Aa)}else if(h=q(f)*b,h+o>p)throw S(Aa);i=h/b}else i=Ea(d,!0),h=i*b,g=new $(h);for(n(a,"_d",{b:g,o:o,l:h,e:i,v:new _(g)});m<i;)E(a,m++)}),y=r[Y]=z(Wa),n(y,"constructor",r)):K(function(a){new r(null),new r(a)},!0)||(r=d(function(a,d,e,f){l(a,r,k);var g;return w(d)?d instanceof $||(g=v(d))==V||g==W?f!==c?new s(d,Fa(e,b),f):e!==c?new s(d,Fa(e,b)):new s(d):ya in d?Ja(r,d):La.call(r,d):new s(Ea(d,m))}),aa(t!==Function.prototype?B(s).concat(B(t)):B(s),function(a){a in r||n(r,a,s[a])}),r[Y]=y,e||(y.constructor=r));var F=y[ta],G=!!F&&("values"==F.name||F.name==c),H=Sa.values;n(r,va,!0),n(y,ya,k),n(y,za,!0),n(y,wa,r),(j?new r(1)[ua]==k:ua in y)||Q(y,ua,{get:function(){return k}}),x[k]=r,h(h.G+h.W+h.F*(r!=s),x),h(h.S,k,{BYTES_PER_ELEMENT:b,from:La,of:Ma}),X in y||n(y,X,b),h(h.P,k,Pa),L(k),h(h.P+h.F*Da,k,{set:Ra}),h(h.P+h.F*!G,k,Sa),h(h.P+h.F*(y.toString!=ra),k,{toString:ra}),h(h.P+h.F*g(function(){new r(1).slice()}),k,{slice:Qa}),h(h.P+h.F*(g(function(){return[1,2].toLocaleString()!=new r([1,2]).toLocaleString()})||!g(function(){y.toLocaleString.call([1,2])})),k,{toLocaleString:Oa}),J[k]=G?F:H,e||G||n(y,ta,H)}}else a.exports=function(){}},function(a,b,c){c(236)("Uint8",1,function(a){return function Uint8Array(b,c,d){return a(this,b,c,d)}})},function(a,b,c){c(236)("Uint8",1,function(a){return function Uint8ClampedArray(b,c,d){return a(this,b,c,d)}},!0)},function(a,b,c){c(236)("Int16",2,function(a){return function Int16Array(b,c,d){return a(this,b,c,d)}})},function(a,b,c){c(236)("Uint16",2,function(a){return function Uint16Array(b,c,d){return a(this,b,c,d)}})},function(a,b,c){c(236)("Int32",4,function(a){return function Int32Array(b,c,d){return a(this,b,c,d)}})},function(a,b,c){c(236)("Uint32",4,function(a){return function Uint32Array(b,c,d){return a(this,b,c,d)}})},function(a,b,c){c(236)("Float32",4,function(a){return function Float32Array(b,c,d){return a(this,b,c,d)}})},function(a,b,c){c(236)("Float64",8,function(a){return function Float64Array(b,c,d){return a(this,b,c,d)}})},function(a,b,d){var e=d(6),f=d(34)(!0);e(e.P,"Array",{includes:function includes(a){return f(this,a,arguments.length>1?arguments[1]:c)}}),d(178)("includes")},function(a,b,c){var d=c(6),e=c(125)(!0);d(d.P,"String",{at:function at(a){return e(this,a)}})},function(a,b,d){var e=d(6),f=d(248);e(e.P,"String",{padStart:function padStart(a){return f(this,a,arguments.length>1?arguments[1]:c,!0)}})},function(a,b,d){var e=d(35),f=d(85),g=d(33);a.exports=function(a,b,d,h){var i=String(g(a)),j=i.length,k=d===c?" ":String(d),l=e(b);if(l<=j||""==k)return i;var m=l-j,n=f.call(k,Math.ceil(m/k.length));return n.length>m&&(n=n.slice(0,m)),h?n+i:i+n}},function(a,b,d){var e=d(6),f=d(248);e(e.P,"String",{padEnd:function padEnd(a){return f(this,a,arguments.length>1?arguments[1]:c,!1)}})},function(a,b,c){c(81)("trimLeft",function(a){return function trimLeft(){return a(this,1)}},"trimStart")},function(a,b,c){c(81)("trimRight",function(a){return function trimRight(){return a(this,2)}},"trimEnd")},function(a,b,c){var d=c(6),e=c(33),f=c(35),g=c(128),h=c(188),i=RegExp.prototype,j=function(a,b){this._r=a,this._s=b};c(136)(j,"RegExp String",function next(){var a=this._r.exec(this._s);return{value:a,done:null===a}}),d(d.P,"String",{matchAll:function matchAll(a){if(e(this),!g(a))throw TypeError(a+" is not a regexp!");var b=String(this),c="flags"in i?String(a.flags):h.call(a),d=new RegExp(a.source,~c.indexOf("g")?c:"g"+c);return d.lastIndex=f(a.lastIndex),new j(d,b)}})},function(a,b,c){c(25)("asyncIterator")},function(a,b,c){c(25)("observable")},function(a,b,c){var d=c(6),e=c(221),f=c(30),g=c(49),h=c(155);d(d.S,"Object",{getOwnPropertyDescriptors:function getOwnPropertyDescriptors(a){for(var b,c=f(a),d=g.f,i=e(c),j={},k=0;i.length>k;)h(j,b=i[k++],d(c,b));return j}})},function(a,b,c){var d=c(6),e=c(257)(!1);d(d.S,"Object",{values:function values(a){return e(a)}})},function(a,b,c){var d=c(28),e=c(30),f=c(42).f;a.exports=function(a){return function(b){for(var c,g=e(b),h=d(g),i=h.length,j=0,k=[];i>j;)f.call(g,c=h[j++])&&k.push(a?[c,g[c]]:g[c]);return k}}},function(a,b,c){var d=c(6),e=c(257)(!0);d(d.S,"Object",{entries:function entries(a){return e(a)}})},function(a,b,c){var d=c(6),e=c(56),f=c(19),g=c(9);c(4)&&d(d.P+c(260),"Object",{__defineGetter__:function __defineGetter__(a,b){g.f(e(this),a,{get:f(b),enumerable:!0,configurable:!0})}})},function(a,b,c){a.exports=c(26)||!c(5)(function(){var a=Math.random();__defineSetter__.call(null,a,function(){}),delete c(2)[a]})},function(a,b,c){var d=c(6),e=c(56),f=c(19),g=c(9);c(4)&&d(d.P+c(260),"Object",{__defineSetter__:function __defineSetter__(a,b){g.f(e(this),a,{set:f(b),enumerable:!0,configurable:!0})}})},function(a,b,c){var d=c(6),e=c(56),f=c(14),g=c(57),h=c(49).f;c(4)&&d(d.P+c(260),"Object",{__lookupGetter__:function __lookupGetter__(a){var b,c=e(this),d=f(a,!0);do if(b=h(c,d))return b.get;while(c=g(c))}})},function(a,b,c){var d=c(6),e=c(56),f=c(14),g=c(57),h=c(49).f;c(4)&&d(d.P+c(260),"Object",{__lookupSetter__:function __lookupSetter__(a){var b,c=e(this),d=f(a,!0);do if(b=h(c,d))return b.set;while(c=g(c))}})},function(a,b,c){var d=c(6);d(d.P+d.R,"Map",{toJSON:c(265)("Map")})},function(a,b,c){var d=c(73),e=c(266);a.exports=function(a){return function toJSON(){if(d(this)!=a)throw TypeError(a+"#toJSON isn't generic");return e(this)}}},function(a,b,c){var d=c(198);a.exports=function(a,b){var c=[];return d(a,!1,c.push,c,b),c}},function(a,b,c){var d=c(6);d(d.P+d.R,"Set",{toJSON:c(265)("Set")})},function(a,b,c){var d=c(6);d(d.S,"System",{global:c(2)})},function(a,b,c){var d=c(6),e=c(32);d(d.S,"Error",{isError:function isError(a){return"Error"===e(a)}})},function(a,b,c){var d=c(6);d(d.S,"Math",{iaddh:function iaddh(a,b,c,d){var e=a>>>0,f=b>>>0,g=c>>>0;return f+(d>>>0)+((e&g|(e|g)&~(e+g>>>0))>>>31)|0}})},function(a,b,c){var d=c(6);d(d.S,"Math",{isubh:function isubh(a,b,c,d){var e=a>>>0,f=b>>>0,g=c>>>0;return f-(d>>>0)-((~e&g|~(e^g)&e-g>>>0)>>>31)|0}})},function(a,b,c){var d=c(6);d(d.S,"Math",{imulh:function imulh(a,b){var c=65535,d=+a,e=+b,f=d&c,g=e&c,h=d>>16,i=e>>16,j=(h*g>>>0)+(f*g>>>16);return h*i+(j>>16)+((f*i>>>0)+(j&c)>>16)}})},function(a,b,c){var d=c(6);d(d.S,"Math",{umulh:function umulh(a,b){var c=65535,d=+a,e=+b,f=d&c,g=e&c,h=d>>>16,i=e>>>16,j=(h*g>>>0)+(f*g>>>16);return h*i+(j>>>16)+((f*i>>>0)+(j&c)>>>16)}})},function(a,b,c){var d=c(275),e=c(10),f=d.key,g=d.set;d.exp({defineMetadata:function defineMetadata(a,b,c,d){g(a,b,e(c),f(d))}})},function(a,b,d){var e=d(203),f=d(6),g=d(21)("metadata"),h=g.store||(g.store=new(d(207))),i=function(a,b,d){var f=h.get(a);if(!f){if(!d)return c;h.set(a,f=new e)}var g=f.get(b);if(!g){if(!d)return c;f.set(b,g=new e)}return g},j=function(a,b,d){var e=i(b,d,!1);return e!==c&&e.has(a)},k=function(a,b,d){var e=i(b,d,!1);return e===c?c:e.get(a)},l=function(a,b,c,d){i(c,d,!0).set(a,b)},m=function(a,b){var c=i(a,b,!1),d=[];return c&&c.forEach(function(a,b){d.push(b)}),d},n=function(a){return a===c||"symbol"==typeof a?a:String(a)},o=function(a){f(f.S,"Reflect",a)};a.exports={store:h,map:i,has:j,get:k,set:l,keys:m,key:n,exp:o}},function(a,b,d){var e=d(275),f=d(10),g=e.key,h=e.map,i=e.store;e.exp({deleteMetadata:function deleteMetadata(a,b){var d=arguments.length<3?c:g(arguments[2]),e=h(f(b),d,!1);if(e===c||!e["delete"](a))return!1;if(e.size)return!0;var j=i.get(b);return j["delete"](d),!!j.size||i["delete"](b)}})},function(a,b,d){var e=d(275),f=d(10),g=d(57),h=e.has,i=e.get,j=e.key,k=function(a,b,d){var e=h(a,b,d);if(e)return i(a,b,d);var f=g(b);return null!==f?k(a,f,d):c};e.exp({getMetadata:function getMetadata(a,b){return k(a,f(b),arguments.length<3?c:j(arguments[2]))}})},function(a,b,d){var e=d(206),f=d(266),g=d(275),h=d(10),i=d(57),j=g.keys,k=g.key,l=function(a,b){var c=j(a,b),d=i(a);if(null===d)return c;var g=l(d,b);return g.length?c.length?f(new e(c.concat(g))):g:c};g.exp({getMetadataKeys:function getMetadataKeys(a){return l(h(a),arguments.length<2?c:k(arguments[1]))}})},function(a,b,d){var e=d(275),f=d(10),g=e.get,h=e.key;e.exp({getOwnMetadata:function getOwnMetadata(a,b){return g(a,f(b),arguments.length<3?c:h(arguments[2]))}})},function(a,b,d){var e=d(275),f=d(10),g=e.keys,h=e.key;e.exp({getOwnMetadataKeys:function getOwnMetadataKeys(a){return g(f(a),arguments.length<2?c:h(arguments[1]))}})},function(a,b,d){var e=d(275),f=d(10),g=d(57),h=e.has,i=e.key,j=function(a,b,c){var d=h(a,b,c);if(d)return!0;var e=g(b);return null!==e&&j(a,e,c)};e.exp({hasMetadata:function hasMetadata(a,b){return j(a,f(b),arguments.length<3?c:i(arguments[2]))}})},function(a,b,d){var e=d(275),f=d(10),g=e.has,h=e.key;e.exp({hasOwnMetadata:function hasOwnMetadata(a,b){return g(a,f(b),arguments.length<3?c:h(arguments[2]))}})},function(a,b,d){var e=d(275),f=d(10),g=d(19),h=e.key,i=e.set;e.exp({metadata:function metadata(a,b){return function decorator(d,e){i(a,b,(e!==c?f:g)(d),h(e))}}})},function(a,b,c){var d=c(6),e=c(201)(),f=c(2).process,g="process"==c(32)(f);d(d.G,{asap:function asap(a){var b=g&&f.domain;e(b?b.bind(a):a)}})},function(a,b,d){var e=d(6),f=d(2),g=d(7),h=d(201)(),i=d(23)("observable"),j=d(19),k=d(10),l=d(197),m=d(202),n=d(8),o=d(198),p=o.RETURN,q=function(a){return null==a?c:j(a)},r=function(a){var b=a._c;b&&(a._c=c,b())},s=function(a){return a._o===c},t=function(a){s(a)||(a._o=c,r(a))},u=function(a,b){k(a),this._c=c,this._o=a,a=new v(this);try{var d=b(a),e=d;null!=d&&("function"==typeof d.unsubscribe?d=function(){e.unsubscribe()}:j(d),this._c=d)}catch(f){return void a.error(f)}s(this)&&r(this)};u.prototype=m({},{unsubscribe:function unsubscribe(){t(this)}});var v=function(a){this._s=a};v.prototype=m({},{next:function next(a){var b=this._s;if(!s(b)){var c=b._o;try{var d=q(c.next);if(d)return d.call(c,a)}catch(e){try{t(b)}finally{throw e}}}},error:function error(a){var b=this._s;if(s(b))throw a;var d=b._o;b._o=c;try{var e=q(d.error);if(!e)throw a;a=e.call(d,a)}catch(f){try{r(b)}finally{throw f}}return r(b),a},complete:function complete(a){var b=this._s;if(!s(b)){var d=b._o;b._o=c;try{var e=q(d.complete);a=e?e.call(d,a):c}catch(f){try{r(b)}finally{throw f}}return r(b),a}}});var w=function Observable(a){l(this,w,"Observable","_f")._f=j(a)};m(w.prototype,{subscribe:function subscribe(a){return new u(a,this._f)},forEach:function forEach(a){var b=this;return new(g.Promise||f.Promise)(function(c,d){j(a);var e=b.subscribe({next:function(b){try{return a(b)}catch(c){d(c),e.unsubscribe()}},error:d,complete:c})})}}),m(w,{from:function from(a){var b="function"==typeof this?this:w,c=q(k(a)[i]);if(c){var d=k(c.call(a));return d.constructor===b?d:new b(function(a){return d.subscribe(a)})}return new b(function(b){var c=!1;return h(function(){if(!c){try{if(o(a,!1,function(a){if(b.next(a),c)return p})===p)return}catch(d){if(c)throw d;return void b.error(d)}b.complete()}}),function(){c=!0}})},of:function of(){for(var a=0,b=arguments.length,c=Array(b);a<b;)c[a]=arguments[a++];return new("function"==typeof this?this:w)(function(a){var b=!1;return h(function(){if(!b){for(var d=0;d<c.length;++d)if(a.next(c[d]),b)return;a.complete()}}),function(){b=!0}})}}),n(w.prototype,i,function(){return this}),e(e.G,{Observable:w}),d(186)("Observable")},function(a,b,c){var d=c(6),e=c(200);d(d.G+d.B,{setImmediate:e.set,clearImmediate:e.clear})},function(a,b,c){for(var d=c(183),e=c(16),f=c(2),g=c(8),h=c(135),i=c(23),j=i("iterator"),k=i("toStringTag"),l=h.Array,m=["NodeList","DOMTokenList","MediaList","StyleSheetList","CSSRuleList"],n=0;n<5;n++){var o,p=m[n],q=f[p],r=q&&q.prototype;if(r){r[j]||g(r,j,l),r[k]||g(r,k,p),h[p]=l;for(o in d)r[o]||e(r,o,d[o],!0)}}},function(a,b,c){var d=c(2),e=c(6),f=c(76),g=c(289),h=d.navigator,i=!!h&&/MSIE .\./.test(h.userAgent),j=function(a){return i?function(b,c){return a(f(g,[].slice.call(arguments,2),"function"==typeof b?b:Function(b)),c)}:a};e(e.G+e.B+e.F*i,{setTimeout:j(d.setTimeout),setInterval:j(d.setInterval)})},function(a,b,c){var d=c(290),e=c(76),f=c(19);a.exports=function(){for(var a=f(this),b=arguments.length,c=Array(b),g=0,h=d._,i=!1;b>g;)(c[g]=arguments[g++])===h&&(i=!0);return function(){var d,f=this,g=arguments.length,j=0,k=0;if(!i&&!g)return e(a,c,f);if(d=c.slice(),i)for(;b>j;j++)d[j]===h&&(d[j]=arguments[k++]);for(;g>k;)d.push(arguments[k++]);return e(a,d,f)}}},function(a,b,c){a.exports=c(2)}]),"undefined"!=typeof module&&module.exports?module.exports=a:"function"==typeof define&&define.amd?define(function(){return a}):b.core=a}(1,1);

},{}],26:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],27:[function(require,module,exports){
(function (global){
/*! *****************************************************************************
Copyright (C) Microsoft. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
var Reflect;
(function (Reflect) {
    "use strict";
    var hasOwn = Object.prototype.hasOwnProperty;
    // feature test for Object.create support
    var supportsCreate = typeof Object.create === "function";
    // feature test for __proto__ support
    var supportsProto = { __proto__: [] } instanceof Array;
    // feature test for Symbol support
    var supportsSymbol = typeof Symbol === "function";
    var toPrimitiveSymbol = supportsSymbol && typeof Symbol.toPrimitive !== "undefined" ? Symbol.toPrimitive : "@@toPrimitive";
    var iteratorSymbol = supportsSymbol && typeof Symbol.iterator !== "undefined" ? Symbol.iterator : "@@iterator";
    // create an object in dictionary mode (a.k.a. "slow" mode in v8)
    var createDictionary = supportsCreate ? function () { return MakeDictionary(Object.create(null)); } :
        supportsProto ? function () { return MakeDictionary({ __proto__: null }); } :
            function () { return MakeDictionary({}); };
    var HashMap;
    (function (HashMap) {
        var downLevel = !supportsCreate && !supportsProto;
        HashMap.has = downLevel
            ? function (map, key) { return hasOwn.call(map, key); }
            : function (map, key) { return key in map; };
        HashMap.get = downLevel
            ? function (map, key) { return hasOwn.call(map, key) ? map[key] : undefined; }
            : function (map, key) { return map[key]; };
    })(HashMap || (HashMap = {}));
    // Load global or shim versions of Map, Set, and WeakMap
    var functionPrototype = Object.getPrototypeOf(Function);
    var _Map = typeof Map === "function" && typeof Map.prototype.entries === "function" ? Map : CreateMapPolyfill();
    var _Set = typeof Set === "function" && typeof Set.prototype.entries === "function" ? Set : CreateSetPolyfill();
    var _WeakMap = typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
    // [[Metadata]] internal slot
    var Metadata = new _WeakMap();
    /**
      * Applies a set of decorators to a property of a target object.
      * @param decorators An array of decorators.
      * @param target The target object.
      * @param targetKey (Optional) The property key to decorate.
      * @param targetDescriptor (Optional) The property descriptor for the target key
      * @remarks Decorators are applied in reverse order.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     Example = Reflect.decorate(decoratorsArray, Example);
      *
      *     // property (on constructor)
      *     Reflect.decorate(decoratorsArray, Example, "staticProperty");
      *
      *     // property (on prototype)
      *     Reflect.decorate(decoratorsArray, Example.prototype, "property");
      *
      *     // method (on constructor)
      *     Object.defineProperty(Example, "staticMethod",
      *         Reflect.decorate(decoratorsArray, Example, "staticMethod",
      *             Object.getOwnPropertyDescriptor(Example, "staticMethod")));
      *
      *     // method (on prototype)
      *     Object.defineProperty(Example.prototype, "method",
      *         Reflect.decorate(decoratorsArray, Example.prototype, "method",
      *             Object.getOwnPropertyDescriptor(Example.prototype, "method")));
      *
      */
    function decorate(decorators, target, targetKey, targetDescriptor) {
        if (!IsUndefined(targetKey)) {
            if (!IsArray(decorators))
                throw new TypeError();
            if (!IsObject(target))
                throw new TypeError();
            if (!IsObject(targetDescriptor) && !IsUndefined(targetDescriptor) && !IsNull(targetDescriptor))
                throw new TypeError();
            if (IsNull(targetDescriptor))
                targetDescriptor = undefined;
            targetKey = ToPropertyKey(targetKey);
            return DecorateProperty(decorators, target, targetKey, targetDescriptor);
        }
        else {
            if (!IsArray(decorators))
                throw new TypeError();
            if (!IsConstructor(target))
                throw new TypeError();
            return DecorateConstructor(decorators, target);
        }
    }
    Reflect.decorate = decorate;
    /**
      * A default metadata decorator factory that can be used on a class, class member, or parameter.
      * @param metadataKey The key for the metadata entry.
      * @param metadataValue The value for the metadata entry.
      * @returns A decorator function.
      * @remarks
      * If `metadataKey` is already defined for the target and target key, the
      * metadataValue for that key will be overwritten.
      * @example
      *
      *     // constructor
      *     @Reflect.metadata(key, value)
      *     class Example {
      *     }
      *
      *     // property (on constructor, TypeScript only)
      *     class Example {
      *         @Reflect.metadata(key, value)
      *         static staticProperty;
      *     }
      *
      *     // property (on prototype, TypeScript only)
      *     class Example {
      *         @Reflect.metadata(key, value)
      *         property;
      *     }
      *
      *     // method (on constructor)
      *     class Example {
      *         @Reflect.metadata(key, value)
      *         static staticMethod() { }
      *     }
      *
      *     // method (on prototype)
      *     class Example {
      *         @Reflect.metadata(key, value)
      *         method() { }
      *     }
      *
      */
    function metadata(metadataKey, metadataValue) {
        function decorator(target, targetKey) {
            if (!IsUndefined(targetKey)) {
                if (!IsObject(target))
                    throw new TypeError();
                targetKey = ToPropertyKey(targetKey);
                OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, targetKey);
            }
            else {
                if (!IsConstructor(target))
                    throw new TypeError();
                OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, /*targetKey*/ undefined);
            }
        }
        return decorator;
    }
    Reflect.metadata = metadata;
    /**
      * Define a unique metadata entry on the target.
      * @param metadataKey A key used to store and retrieve metadata.
      * @param metadataValue A value that contains attached metadata.
      * @param target The target object on which to define metadata.
      * @param targetKey (Optional) The property key for the target.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     Reflect.defineMetadata("custom:annotation", options, Example);
      *
      *     // property (on constructor)
      *     Reflect.defineMetadata("custom:annotation", options, Example, "staticProperty");
      *
      *     // property (on prototype)
      *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "property");
      *
      *     // method (on constructor)
      *     Reflect.defineMetadata("custom:annotation", options, Example, "staticMethod");
      *
      *     // method (on prototype)
      *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "method");
      *
      *     // decorator factory as metadata-producing annotation.
      *     function MyAnnotation(options): Decorator {
      *         return (target, key?) => Reflect.defineMetadata("custom:annotation", options, target, key);
      *     }
      *
      */
    function defineMetadata(metadataKey, metadataValue, target, targetKey) {
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(targetKey))
            targetKey = ToPropertyKey(targetKey);
        return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, targetKey);
    }
    Reflect.defineMetadata = defineMetadata;
    /**
      * Gets a value indicating whether the target object or its prototype chain has the provided metadata key defined.
      * @param metadataKey A key used to store and retrieve metadata.
      * @param target The target object on which the metadata is defined.
      * @param targetKey (Optional) The property key for the target.
      * @returns `true` if the metadata key was defined on the target object or its prototype chain; otherwise, `false`.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     result = Reflect.hasMetadata("custom:annotation", Example);
      *
      *     // property (on constructor)
      *     result = Reflect.hasMetadata("custom:annotation", Example, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.hasMetadata("custom:annotation", Example, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "method");
      *
      */
    function hasMetadata(metadataKey, target, targetKey) {
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(targetKey))
            targetKey = ToPropertyKey(targetKey);
        return OrdinaryHasMetadata(metadataKey, target, targetKey);
    }
    Reflect.hasMetadata = hasMetadata;
    /**
      * Gets a value indicating whether the target object has the provided metadata key defined.
      * @param metadataKey A key used to store and retrieve metadata.
      * @param target The target object on which the metadata is defined.
      * @param targetKey (Optional) The property key for the target.
      * @returns `true` if the metadata key was defined on the target object; otherwise, `false`.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     result = Reflect.hasOwnMetadata("custom:annotation", Example);
      *
      *     // property (on constructor)
      *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "method");
      *
      */
    function hasOwnMetadata(metadataKey, target, targetKey) {
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(targetKey))
            targetKey = ToPropertyKey(targetKey);
        return OrdinaryHasOwnMetadata(metadataKey, target, targetKey);
    }
    Reflect.hasOwnMetadata = hasOwnMetadata;
    /**
      * Gets the metadata value for the provided metadata key on the target object or its prototype chain.
      * @param metadataKey A key used to store and retrieve metadata.
      * @param target The target object on which the metadata is defined.
      * @param targetKey (Optional) The property key for the target.
      * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     result = Reflect.getMetadata("custom:annotation", Example);
      *
      *     // property (on constructor)
      *     result = Reflect.getMetadata("custom:annotation", Example, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.getMetadata("custom:annotation", Example, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "method");
      *
      */
    function getMetadata(metadataKey, target, targetKey) {
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(targetKey))
            targetKey = ToPropertyKey(targetKey);
        return OrdinaryGetMetadata(metadataKey, target, targetKey);
    }
    Reflect.getMetadata = getMetadata;
    /**
      * Gets the metadata value for the provided metadata key on the target object.
      * @param metadataKey A key used to store and retrieve metadata.
      * @param target The target object on which the metadata is defined.
      * @param targetKey (Optional) The property key for the target.
      * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     result = Reflect.getOwnMetadata("custom:annotation", Example);
      *
      *     // property (on constructor)
      *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "method");
      *
      */
    function getOwnMetadata(metadataKey, target, targetKey) {
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(targetKey))
            targetKey = ToPropertyKey(targetKey);
        return OrdinaryGetOwnMetadata(metadataKey, target, targetKey);
    }
    Reflect.getOwnMetadata = getOwnMetadata;
    /**
      * Gets the metadata keys defined on the target object or its prototype chain.
      * @param target The target object on which the metadata is defined.
      * @param targetKey (Optional) The property key for the target.
      * @returns An array of unique metadata keys.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     result = Reflect.getMetadataKeys(Example);
      *
      *     // property (on constructor)
      *     result = Reflect.getMetadataKeys(Example, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.getMetadataKeys(Example.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.getMetadataKeys(Example, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.getMetadataKeys(Example.prototype, "method");
      *
      */
    function getMetadataKeys(target, targetKey) {
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(targetKey))
            targetKey = ToPropertyKey(targetKey);
        return OrdinaryMetadataKeys(target, targetKey);
    }
    Reflect.getMetadataKeys = getMetadataKeys;
    /**
      * Gets the unique metadata keys defined on the target object.
      * @param target The target object on which the metadata is defined.
      * @param targetKey (Optional) The property key for the target.
      * @returns An array of unique metadata keys.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     result = Reflect.getOwnMetadataKeys(Example);
      *
      *     // property (on constructor)
      *     result = Reflect.getOwnMetadataKeys(Example, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.getOwnMetadataKeys(Example.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.getOwnMetadataKeys(Example, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.getOwnMetadataKeys(Example.prototype, "method");
      *
      */
    function getOwnMetadataKeys(target, targetKey) {
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(targetKey))
            targetKey = ToPropertyKey(targetKey);
        return OrdinaryOwnMetadataKeys(target, targetKey);
    }
    Reflect.getOwnMetadataKeys = getOwnMetadataKeys;
    /**
      * Deletes the metadata entry from the target object with the provided key.
      * @param metadataKey A key used to store and retrieve metadata.
      * @param target The target object on which the metadata is defined.
      * @param targetKey (Optional) The property key for the target.
      * @returns `true` if the metadata entry was found and deleted; otherwise, false.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     result = Reflect.deleteMetadata("custom:annotation", Example);
      *
      *     // property (on constructor)
      *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "method");
      *
      */
    function deleteMetadata(metadataKey, target, targetKey) {
        // https://github.com/rbuckton/ReflectDecorators/blob/master/spec/metadata.md#deletemetadata-metadatakey-p-
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(targetKey))
            targetKey = ToPropertyKey(targetKey);
        var metadataMap = GetOrCreateMetadataMap(target, targetKey, /*create*/ false);
        if (IsUndefined(metadataMap))
            return false;
        if (!metadataMap.delete(metadataKey))
            return false;
        if (metadataMap.size > 0)
            return true;
        var targetMetadata = Metadata.get(target);
        targetMetadata.delete(targetKey);
        if (targetMetadata.size > 0)
            return true;
        Metadata.delete(target);
        return true;
    }
    Reflect.deleteMetadata = deleteMetadata;
    function DecorateConstructor(decorators, target) {
        for (var i = decorators.length - 1; i >= 0; --i) {
            var decorator = decorators[i];
            var decorated = decorator(target);
            if (!IsUndefined(decorated) && !IsNull(decorated)) {
                if (!IsConstructor(decorated))
                    throw new TypeError();
                target = decorated;
            }
        }
        return target;
    }
    function DecorateProperty(decorators, target, propertyKey, descriptor) {
        for (var i = decorators.length - 1; i >= 0; --i) {
            var decorator = decorators[i];
            var decorated = decorator(target, propertyKey, descriptor);
            if (!IsUndefined(decorated) && !IsNull(decorated)) {
                if (!IsObject(decorated))
                    throw new TypeError();
                descriptor = decorated;
            }
        }
        return descriptor;
    }
    function GetOrCreateMetadataMap(O, P, Create) {
        var targetMetadata = Metadata.get(O);
        if (IsUndefined(targetMetadata)) {
            if (!Create)
                return undefined;
            targetMetadata = new _Map();
            Metadata.set(O, targetMetadata);
        }
        var metadataMap = targetMetadata.get(P);
        if (IsUndefined(metadataMap)) {
            if (!Create)
                return undefined;
            metadataMap = new _Map();
            targetMetadata.set(P, metadataMap);
        }
        return metadataMap;
    }
    // Ordinary Object Internal Methods and Internal Slots
    // https://github.com/rbuckton/ReflectDecorators/blob/master/spec/metadata.md#ordinary-object-internal-methods-and-internal-slots
    // OrdinaryHasMetadata(MetadataKey, O, P)
    // https://github.com/rbuckton/ReflectDecorators/blob/master/spec/metadata.md#ordinaryhasmetadata--metadatakey-o-p-
    function OrdinaryHasMetadata(MetadataKey, O, P) {
        var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
        if (hasOwn)
            return true;
        var parent = OrdinaryGetPrototypeOf(O);
        if (!IsNull(parent))
            return OrdinaryHasMetadata(MetadataKey, parent, P);
        return false;
    }
    // OrdinaryHasOwnMetadata(MetadataKey, O, P)
    // https://github.com/rbuckton/ReflectDecorators/blob/master/spec/metadata.md#ordinaryhasownmetadata--metadatakey-o-p-
    function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
        var metadataMap = GetOrCreateMetadataMap(O, P, /*create*/ false);
        if (IsUndefined(metadataMap))
            return false;
        return ToBoolean(metadataMap.has(MetadataKey));
    }
    // OrdinaryGetMetadata(MetadataKey, O, P)
    // https://github.com/rbuckton/ReflectDecorators/blob/master/spec/metadata.md#ordinarygetmetadata--metadatakey-o-p-
    function OrdinaryGetMetadata(MetadataKey, O, P) {
        var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
        if (hasOwn)
            return OrdinaryGetOwnMetadata(MetadataKey, O, P);
        var parent = OrdinaryGetPrototypeOf(O);
        if (!IsNull(parent))
            return OrdinaryGetMetadata(MetadataKey, parent, P);
        return undefined;
    }
    // OrdinaryGetOwnMetadata(MetadataKey, O, P)
    // https://github.com/rbuckton/ReflectDecorators/blob/master/spec/metadata.md#ordinarygetownmetadata--metadatakey-o-p-
    function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
        var metadataMap = GetOrCreateMetadataMap(O, P, /*create*/ false);
        if (IsUndefined(metadataMap))
            return undefined;
        return metadataMap.get(MetadataKey);
    }
    // OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P)
    // https://github.com/rbuckton/ReflectDecorators/blob/master/spec/metadata.md#ordinarydefineownmetadata--metadatakey-metadatavalue-o-p-
    function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
        var metadataMap = GetOrCreateMetadataMap(O, P, /*create*/ true);
        metadataMap.set(MetadataKey, MetadataValue);
    }
    // OrdinaryMetadataKeys(O, P)
    // https://github.com/rbuckton/ReflectDecorators/blob/master/spec/metadata.md#ordinarymetadatakeys--o-p-
    function OrdinaryMetadataKeys(O, P) {
        var ownKeys = OrdinaryOwnMetadataKeys(O, P);
        var parent = OrdinaryGetPrototypeOf(O);
        if (parent === null)
            return ownKeys;
        var parentKeys = OrdinaryMetadataKeys(parent, P);
        if (parentKeys.length <= 0)
            return ownKeys;
        if (ownKeys.length <= 0)
            return parentKeys;
        var set = new _Set();
        var keys = [];
        for (var _i = 0, ownKeys_1 = ownKeys; _i < ownKeys_1.length; _i++) {
            var key = ownKeys_1[_i];
            var hasKey = set.has(key);
            if (!hasKey) {
                set.add(key);
                keys.push(key);
            }
        }
        for (var _a = 0, parentKeys_1 = parentKeys; _a < parentKeys_1.length; _a++) {
            var key = parentKeys_1[_a];
            var hasKey = set.has(key);
            if (!hasKey) {
                set.add(key);
                keys.push(key);
            }
        }
        return keys;
    }
    // OrdinaryOwnMetadataKeys(O, P)
    // https://github.com/rbuckton/ReflectDecorators/blob/master/spec/metadata.md#ordinaryownmetadatakeys--o-p-
    function OrdinaryOwnMetadataKeys(O, P) {
        var metadataMap = GetOrCreateMetadataMap(O, P, /*create*/ false);
        var keys = [];
        if (IsUndefined(metadataMap))
            return keys;
        var keysObj = metadataMap.keys();
        var iterator = GetIterator(keysObj);
        while (true) {
            var next = IteratorStep(iterator);
            try {
                if (!next)
                    return keys;
                var nextValue = IteratorValue(next);
                keys.push(nextValue);
            }
            catch (e) {
                try {
                    if (next) {
                        next = false;
                        IteratorClose(iterator);
                    }
                }
                finally {
                    throw e;
                }
            }
            finally {
                if (next)
                    IteratorClose(iterator);
            }
        }
    }
    // ECMAScript Specification
    // https://tc39.github.io/ecma262/
    // 6 ECMAScript Data Typ0es and Values
    // https://tc39.github.io/ecma262/#sec-ecmascript-data-types-and-values
    function Type(x) {
        if (x === null)
            return 1 /* Null */;
        switch (typeof x) {
            case "undefined": return 0 /* Undefined */;
            case "boolean": return 2 /* Boolean */;
            case "string": return 3 /* String */;
            case "symbol": return 4 /* Symbol */;
            case "number": return 5 /* Number */;
            case "object": return x === null ? 1 /* Null */ : 6 /* Object */;
            default: return 6 /* Object */;
        }
    }
    // 6.1.1 The Undefined Type
    // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-undefined-type
    function IsUndefined(x) {
        return x === undefined;
    }
    // 6.1.2 The Null Type
    // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-null-type
    function IsNull(x) {
        return x === null;
    }
    // 6.1.5 The Symbol Type
    // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-symbol-type
    function IsSymbol(x) {
        return typeof x === "symbol";
    }
    // 6.1.7 The Object Type
    // https://tc39.github.io/ecma262/#sec-object-type
    function IsObject(x) {
        return typeof x === "object" ? x !== null : typeof x === "function";
    }
    // 7.1 Type Conversion
    // https://tc39.github.io/ecma262/#sec-type-conversion
    // 7.1.1 ToPrimitive(input [, PreferredType])
    // https://tc39.github.io/ecma262/#sec-toprimitive
    function ToPrimitive(input, PreferredType) {
        switch (Type(input)) {
            case 0 /* Undefined */: return input;
            case 1 /* Null */: return input;
            case 2 /* Boolean */: return input;
            case 3 /* String */: return input;
            case 4 /* Symbol */: return input;
            case 5 /* Number */: return input;
        }
        var hint = PreferredType === 3 /* String */ ? "string" : PreferredType === 5 /* Number */ ? "number" : "default";
        var exoticToPrim = GetMethod(input, toPrimitiveSymbol);
        if (exoticToPrim !== undefined) {
            var result = exoticToPrim.call(input, hint);
            if (IsObject(result))
                throw new TypeError();
            return result;
        }
        return OrdinaryToPrimitive(input, hint === "default" ? "number" : hint);
    }
    // 7.1.1.1 OrdinaryToPrimitive(O, hint)
    // https://tc39.github.io/ecma262/#sec-ordinarytoprimitive
    function OrdinaryToPrimitive(O, hint) {
        if (hint === "string") {
            var toString_1 = O.toString;
            if (IsCallable(toString_1)) {
                var result = toString_1.call(O);
                if (!IsObject(result))
                    return result;
            }
            var valueOf = O.valueOf;
            if (IsCallable(valueOf)) {
                var result = valueOf.call(O);
                if (!IsObject(result))
                    return result;
            }
        }
        else {
            var valueOf = O.valueOf;
            if (IsCallable(valueOf)) {
                var result = valueOf.call(O);
                if (!IsObject(result))
                    return result;
            }
            var toString_2 = O.toString;
            if (IsCallable(toString_2)) {
                var result = toString_2.call(O);
                if (!IsObject(result))
                    return result;
            }
        }
        throw new TypeError();
    }
    // 7.1.2 ToBoolean(argument)
    // https://tc39.github.io/ecma262/2016/#sec-toboolean
    function ToBoolean(argument) {
        return !!argument;
    }
    // 7.1.12 ToString(argument)
    // https://tc39.github.io/ecma262/#sec-tostring
    function ToString(argument) {
        return "" + argument;
    }
    // 7.1.14 ToPropertyKey(argument)
    // https://tc39.github.io/ecma262/#sec-topropertykey
    function ToPropertyKey(argument) {
        var key = ToPrimitive(argument, 3 /* String */);
        if (IsSymbol(key))
            return key;
        return ToString(key);
    }
    // 7.2 Testing and Comparison Operations
    // https://tc39.github.io/ecma262/#sec-testing-and-comparison-operations
    // 7.2.2 IsArray(argument)
    // https://tc39.github.io/ecma262/#sec-isarray
    function IsArray(argument) {
        return Array.isArray
            ? Array.isArray(argument)
            : argument instanceof Object
                ? argument instanceof Array
                : Object.prototype.toString.call(argument) === "[object Array]";
    }
    // 7.2.3 IsCallable(argument)
    // https://tc39.github.io/ecma262/#sec-iscallable
    function IsCallable(argument) {
        // NOTE: This is an approximation as we cannot check for [[Call]] internal method.
        return typeof argument === "function";
    }
    // 7.2.4 IsConstructor(argument)
    // https://tc39.github.io/ecma262/#sec-isconstructor
    function IsConstructor(argument) {
        // NOTE: This is an approximation as we cannot check for [[Construct]] internal method.
        return typeof argument === "function";
    }
    // 7.3 Operations on Objects
    // https://tc39.github.io/ecma262/#sec-operations-on-objects
    // 7.3.9 GetMethod(V, P)
    // https://tc39.github.io/ecma262/#sec-getmethod
    function GetMethod(V, P) {
        var func = V[P];
        if (func === undefined || func === null)
            return undefined;
        if (!IsCallable(func))
            throw new TypeError();
        return func;
    }
    // 7.4 Operations on Iterator Objects
    // https://tc39.github.io/ecma262/#sec-operations-on-iterator-objects
    function GetIterator(obj) {
        var method = GetMethod(obj, iteratorSymbol);
        if (!IsCallable(method))
            throw new TypeError(); // from Call
        var iterator = method.call(obj);
        if (!IsObject(iterator))
            throw new TypeError();
        return iterator;
    }
    // 7.4.4 IteratorValue(iterResult)
    // https://tc39.github.io/ecma262/2016/#sec-iteratorvalue
    function IteratorValue(iterResult) {
        return iterResult.value;
    }
    // 7.4.5 IteratorStep(iterator)
    // https://tc39.github.io/ecma262/#sec-iteratorstep
    function IteratorStep(iterator) {
        var result = iterator.next();
        return result.done ? false : result;
    }
    // 7.4.6 IteratorClose(iterator, completion)
    // https://tc39.github.io/ecma262/#sec-iteratorclose
    function IteratorClose(iterator) {
        var f = iterator["return"];
        if (f)
            f.call(iterator);
    }
    // 9.1 Ordinary Object Internal Methods and Internal Slots
    // https://tc39.github.io/ecma262/#sec-ordinary-object-internal-methods-and-internal-slots
    // 9.1.1.1 OrdinaryGetPrototypeOf(O)
    // https://tc39.github.io/ecma262/#sec-ordinarygetprototypeof
    function OrdinaryGetPrototypeOf(O) {
        var proto = Object.getPrototypeOf(O);
        if (typeof O !== "function" || O === functionPrototype)
            return proto;
        // TypeScript doesn't set __proto__ in ES5, as it's non-standard.
        // Try to determine the superclass constructor. Compatible implementations
        // must either set __proto__ on a subclass constructor to the superclass constructor,
        // or ensure each class has a valid `constructor` property on its prototype that
        // points back to the constructor.
        // If this is not the same as Function.[[Prototype]], then this is definately inherited.
        // This is the case when in ES6 or when using __proto__ in a compatible browser.
        if (proto !== functionPrototype)
            return proto;
        // If the super prototype is Object.prototype, null, or undefined, then we cannot determine the heritage.
        var prototype = O.prototype;
        var prototypeProto = prototype && Object.getPrototypeOf(prototype);
        if (prototypeProto == null || prototypeProto === Object.prototype)
            return proto;
        // If the constructor was not a function, then we cannot determine the heritage.
        var constructor = prototypeProto.constructor;
        if (typeof constructor !== "function")
            return proto;
        // If we have some kind of self-reference, then we cannot determine the heritage.
        if (constructor === O)
            return proto;
        // we have a pretty good guess at the heritage.
        return constructor;
    }
    // naive Map shim
    function CreateMapPolyfill() {
        var cacheSentinel = {};
        var arraySentinel = [];
        var MapIterator = (function () {
            function MapIterator(keys, values, selector) {
                this._index = 0;
                this._keys = keys;
                this._values = values;
                this._selector = selector;
            }
            MapIterator.prototype["@@iterator"] = function () { return this; };
            MapIterator.prototype[iteratorSymbol] = function () { return this; };
            MapIterator.prototype.next = function () {
                var index = this._index;
                if (index >= 0 && index < this._keys.length) {
                    var result = this._selector(this._keys[index], this._values[index]);
                    if (index + 1 >= this._keys.length) {
                        this._index = -1;
                        this._keys = arraySentinel;
                        this._values = arraySentinel;
                    }
                    else {
                        this._index++;
                    }
                    return { value: result, done: false };
                }
                return { value: undefined, done: true };
            };
            MapIterator.prototype.throw = function (error) {
                if (this._index >= 0) {
                    this._index = -1;
                    this._keys = arraySentinel;
                    this._values = arraySentinel;
                }
                throw error;
            };
            MapIterator.prototype.return = function (value) {
                if (this._index >= 0) {
                    this._index = -1;
                    this._keys = arraySentinel;
                    this._values = arraySentinel;
                }
                return { value: value, done: true };
            };
            return MapIterator;
        }());
        return (function () {
            function Map() {
                this._keys = [];
                this._values = [];
                this._cacheKey = cacheSentinel;
                this._cacheIndex = -2;
            }
            Object.defineProperty(Map.prototype, "size", {
                get: function () { return this._keys.length; },
                enumerable: true,
                configurable: true
            });
            Map.prototype.has = function (key) { return this._find(key, /*insert*/ false) >= 0; };
            Map.prototype.get = function (key) {
                var index = this._find(key, /*insert*/ false);
                return index >= 0 ? this._values[index] : undefined;
            };
            Map.prototype.set = function (key, value) {
                var index = this._find(key, /*insert*/ true);
                this._values[index] = value;
                return this;
            };
            Map.prototype.delete = function (key) {
                var index = this._find(key, /*insert*/ false);
                if (index >= 0) {
                    var size = this._keys.length;
                    for (var i = index + 1; i < size; i++) {
                        this._keys[i - 1] = this._keys[i];
                        this._values[i - 1] = this._values[i];
                    }
                    this._keys.length--;
                    this._values.length--;
                    if (key === this._cacheKey) {
                        this._cacheKey = cacheSentinel;
                        this._cacheIndex = -2;
                    }
                    return true;
                }
                return false;
            };
            Map.prototype.clear = function () {
                this._keys.length = 0;
                this._values.length = 0;
                this._cacheKey = cacheSentinel;
                this._cacheIndex = -2;
            };
            Map.prototype.keys = function () { return new MapIterator(this._keys, this._values, getKey); };
            Map.prototype.values = function () { return new MapIterator(this._keys, this._values, getValue); };
            Map.prototype.entries = function () { return new MapIterator(this._keys, this._values, getEntry); };
            Map.prototype["@@iterator"] = function () { return this.entries(); };
            Map.prototype[iteratorSymbol] = function () { return this.entries(); };
            Map.prototype._find = function (key, insert) {
                if (this._cacheKey === key)
                    return this._cacheIndex;
                var index = this._keys.indexOf(key);
                if (index < 0 && insert) {
                    index = this._keys.length;
                    this._keys.push(key);
                    this._values.push(undefined);
                }
                return this._cacheKey = key, this._cacheIndex = index;
            };
            return Map;
        }());
        function getKey(key, _) {
            return key;
        }
        function getValue(_, value) {
            return value;
        }
        function getEntry(key, value) {
            return [key, value];
        }
    }
    // naive Set shim
    function CreateSetPolyfill() {
        return (function () {
            function Set() {
                this._map = new _Map();
            }
            Object.defineProperty(Set.prototype, "size", {
                get: function () { return this._map.size; },
                enumerable: true,
                configurable: true
            });
            Set.prototype.has = function (value) { return this._map.has(value); };
            Set.prototype.add = function (value) { return this._map.set(value, value), this; };
            Set.prototype.delete = function (value) { return this._map.delete(value); };
            Set.prototype.clear = function () { this._map.clear(); };
            Set.prototype.keys = function () { return this._map.keys(); };
            Set.prototype.values = function () { return this._map.values(); };
            Set.prototype.entries = function () { return this._map.entries(); };
            Set.prototype["@@iterator"] = function () { return this.keys(); };
            Set.prototype[iteratorSymbol] = function () { return this.keys(); };
            return Set;
        }());
    }
    // naive WeakMap shim
    function CreateWeakMapPolyfill() {
        var UUID_SIZE = 16;
        var keys = createDictionary();
        var rootKey = CreateUniqueKey();
        return (function () {
            function WeakMap() {
                this._key = CreateUniqueKey();
            }
            WeakMap.prototype.has = function (target) {
                var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                return table !== undefined ? HashMap.has(table, this._key) : false;
            };
            WeakMap.prototype.get = function (target) {
                var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                return table !== undefined ? HashMap.get(table, this._key) : undefined;
            };
            WeakMap.prototype.set = function (target, value) {
                var table = GetOrCreateWeakMapTable(target, /*create*/ true);
                table[this._key] = value;
                return this;
            };
            WeakMap.prototype.delete = function (target) {
                var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                return table !== undefined ? delete table[this._key] : false;
            };
            WeakMap.prototype.clear = function () {
                // NOTE: not a real clear, just makes the previous data unreachable
                this._key = CreateUniqueKey();
            };
            return WeakMap;
        }());
        function CreateUniqueKey() {
            var key;
            do
                key = "@@WeakMap@@" + CreateUUID();
            while (HashMap.has(keys, key));
            keys[key] = true;
            return key;
        }
        function GetOrCreateWeakMapTable(target, create) {
            if (!hasOwn.call(target, rootKey)) {
                if (!create)
                    return undefined;
                Object.defineProperty(target, rootKey, { value: createDictionary() });
            }
            return target[rootKey];
        }
        function FillRandomBytes(buffer, size) {
            for (var i = 0; i < size; ++i)
                buffer[i] = Math.random() * 0xff | 0;
            return buffer;
        }
        function GenRandomBytes(size) {
            if (typeof Uint8Array === "function") {
                if (typeof crypto !== "undefined")
                    return crypto.getRandomValues(new Uint8Array(size));
                if (typeof msCrypto !== "undefined")
                    return msCrypto.getRandomValues(new Uint8Array(size));
                return FillRandomBytes(new Uint8Array(size), size);
            }
            return FillRandomBytes(new Array(size), size);
        }
        function CreateUUID() {
            var data = GenRandomBytes(UUID_SIZE);
            // mark as random - RFC 4122 § 4.4
            data[6] = data[6] & 0x4f | 0x40;
            data[8] = data[8] & 0xbf | 0x80;
            var result = "";
            for (var offset = 0; offset < UUID_SIZE; ++offset) {
                var byte = data[offset];
                if (offset === 4 || offset === 6 || offset === 8)
                    result += "-";
                if (byte < 16)
                    result += "0";
                result += byte.toString(16).toLowerCase();
            }
            return result;
        }
    }
    // uses a heuristic used by v8 and chakra to force an object into dictionary mode.
    function MakeDictionary(obj) {
        obj.__ = undefined;
        delete obj.__;
        return obj;
    }
    // patch global Reflect
    (function (__global) {
        if (typeof __global.Reflect !== "undefined") {
            if (__global.Reflect !== Reflect) {
                for (var p in Reflect) {
                    if (hasOwn.call(Reflect, p)) {
                        __global.Reflect[p] = Reflect[p];
                    }
                }
            }
        }
        else {
            __global.Reflect = Reflect;
        }
    })(typeof global !== "undefined" ? global :
        typeof self !== "undefined" ? self :
            Function("return this;")());
})(Reflect || (Reflect = {}));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],28:[function(require,module,exports){
"use strict";
var root_1 = require('./util/root');
var toSubscriber_1 = require('./util/toSubscriber');
var observable_1 = require('./symbol/observable');
/**
 * A representation of any set of values over any amount of time. This the most basic building block
 * of RxJS.
 *
 * @class Observable<T>
 */
var Observable = (function () {
    /**
     * @constructor
     * @param {Function} subscribe the function that is  called when the Observable is
     * initially subscribed to. This function is given a Subscriber, to which new values
     * can be `next`ed, or an `error` method can be called to raise an error, or
     * `complete` can be called to notify of a successful completion.
     */
    function Observable(subscribe) {
        this._isScalar = false;
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    /**
     * Creates a new Observable, with this Observable as the source, and the passed
     * operator defined as the new observable's operator.
     * @method lift
     * @param {Operator} operator the operator defining the operation to take on the observable
     * @return {Observable} a new observable with the Operator applied
     */
    Observable.prototype.lift = function (operator) {
        var observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
    };
    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var operator = this.operator;
        var sink = toSubscriber_1.toSubscriber(observerOrNext, error, complete);
        if (operator) {
            operator.call(sink, this.source);
        }
        else {
            sink.add(this._subscribe(sink));
        }
        if (sink.syncErrorThrowable) {
            sink.syncErrorThrowable = false;
            if (sink.syncErrorThrown) {
                throw sink.syncErrorValue;
            }
        }
        return sink;
    };
    /**
     * @method forEach
     * @param {Function} next a handler for each value emitted by the observable
     * @param {PromiseConstructor} [PromiseCtor] a constructor function used to instantiate the Promise
     * @return {Promise} a promise that either resolves on observable completion or
     *  rejects with the handled error
     */
    Observable.prototype.forEach = function (next, PromiseCtor) {
        var _this = this;
        if (!PromiseCtor) {
            if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
                PromiseCtor = root_1.root.Rx.config.Promise;
            }
            else if (root_1.root.Promise) {
                PromiseCtor = root_1.root.Promise;
            }
        }
        if (!PromiseCtor) {
            throw new Error('no Promise impl found');
        }
        return new PromiseCtor(function (resolve, reject) {
            var subscription = _this.subscribe(function (value) {
                if (subscription) {
                    // if there is a subscription, then we can surmise
                    // the next handling is asynchronous. Any errors thrown
                    // need to be rejected explicitly and unsubscribe must be
                    // called manually
                    try {
                        next(value);
                    }
                    catch (err) {
                        reject(err);
                        subscription.unsubscribe();
                    }
                }
                else {
                    // if there is NO subscription, then we're getting a nexted
                    // value synchronously during subscription. We can just call it.
                    // If it errors, Observable's `subscribe` will ensure the
                    // unsubscription logic is called, then synchronously rethrow the error.
                    // After that, Promise will trap the error and send it
                    // down the rejection path.
                    next(value);
                }
            }, reject, resolve);
        });
    };
    Observable.prototype._subscribe = function (subscriber) {
        return this.source.subscribe(subscriber);
    };
    /**
     * An interop point defined by the es7-observable spec https://github.com/zenparsing/es-observable
     * @method Symbol.observable
     * @return {Observable} this instance of the observable
     */
    Observable.prototype[observable_1.$$observable] = function () {
        return this;
    };
    // HACK: Since TypeScript inherits static properties too, we have to
    // fight against TypeScript here so Subject can have a different static create signature
    /**
     * Creates a new cold Observable by calling the Observable constructor
     * @static true
     * @owner Observable
     * @method create
     * @param {Function} subscribe? the subscriber function to be passed to the Observable constructor
     * @return {Observable} a new cold observable
     */
    Observable.create = function (subscribe) {
        return new Observable(subscribe);
    };
    return Observable;
}());
exports.Observable = Observable;

},{"./symbol/observable":34,"./util/root":42,"./util/toSubscriber":43}],29:[function(require,module,exports){
"use strict";
exports.empty = {
    closed: true,
    next: function (value) { },
    error: function (err) { throw err; },
    complete: function () { }
};

},{}],30:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = require('./Observable');
var Subscriber_1 = require('./Subscriber');
var Subscription_1 = require('./Subscription');
var ObjectUnsubscribedError_1 = require('./util/ObjectUnsubscribedError');
var SubjectSubscription_1 = require('./SubjectSubscription');
var rxSubscriber_1 = require('./symbol/rxSubscriber');
/**
 * @class SubjectSubscriber<T>
 */
var SubjectSubscriber = (function (_super) {
    __extends(SubjectSubscriber, _super);
    function SubjectSubscriber(destination) {
        _super.call(this, destination);
        this.destination = destination;
    }
    return SubjectSubscriber;
}(Subscriber_1.Subscriber));
exports.SubjectSubscriber = SubjectSubscriber;
/**
 * @class Subject<T>
 */
var Subject = (function (_super) {
    __extends(Subject, _super);
    function Subject() {
        _super.call(this);
        this.observers = [];
        this.closed = false;
        this.isStopped = false;
        this.hasError = false;
        this.thrownError = null;
    }
    Subject.prototype[rxSubscriber_1.$$rxSubscriber] = function () {
        return new SubjectSubscriber(this);
    };
    Subject.prototype.lift = function (operator) {
        var subject = new AnonymousSubject(this, this);
        subject.operator = operator;
        return subject;
    };
    Subject.prototype.next = function (value) {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        if (!this.isStopped) {
            var observers = this.observers;
            var len = observers.length;
            var copy = observers.slice();
            for (var i = 0; i < len; i++) {
                copy[i].next(value);
            }
        }
    };
    Subject.prototype.error = function (err) {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        this.hasError = true;
        this.thrownError = err;
        this.isStopped = true;
        var observers = this.observers;
        var len = observers.length;
        var copy = observers.slice();
        for (var i = 0; i < len; i++) {
            copy[i].error(err);
        }
        this.observers.length = 0;
    };
    Subject.prototype.complete = function () {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        this.isStopped = true;
        var observers = this.observers;
        var len = observers.length;
        var copy = observers.slice();
        for (var i = 0; i < len; i++) {
            copy[i].complete();
        }
        this.observers.length = 0;
    };
    Subject.prototype.unsubscribe = function () {
        this.isStopped = true;
        this.closed = true;
        this.observers = null;
    };
    Subject.prototype._subscribe = function (subscriber) {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        else if (this.hasError) {
            subscriber.error(this.thrownError);
            return Subscription_1.Subscription.EMPTY;
        }
        else if (this.isStopped) {
            subscriber.complete();
            return Subscription_1.Subscription.EMPTY;
        }
        else {
            this.observers.push(subscriber);
            return new SubjectSubscription_1.SubjectSubscription(this, subscriber);
        }
    };
    Subject.prototype.asObservable = function () {
        var observable = new Observable_1.Observable();
        observable.source = this;
        return observable;
    };
    Subject.create = function (destination, source) {
        return new AnonymousSubject(destination, source);
    };
    return Subject;
}(Observable_1.Observable));
exports.Subject = Subject;
/**
 * @class AnonymousSubject<T>
 */
var AnonymousSubject = (function (_super) {
    __extends(AnonymousSubject, _super);
    function AnonymousSubject(destination, source) {
        _super.call(this);
        this.destination = destination;
        this.source = source;
    }
    AnonymousSubject.prototype.next = function (value) {
        var destination = this.destination;
        if (destination && destination.next) {
            destination.next(value);
        }
    };
    AnonymousSubject.prototype.error = function (err) {
        var destination = this.destination;
        if (destination && destination.error) {
            this.destination.error(err);
        }
    };
    AnonymousSubject.prototype.complete = function () {
        var destination = this.destination;
        if (destination && destination.complete) {
            this.destination.complete();
        }
    };
    AnonymousSubject.prototype._subscribe = function (subscriber) {
        var source = this.source;
        if (source) {
            return this.source.subscribe(subscriber);
        }
        else {
            return Subscription_1.Subscription.EMPTY;
        }
    };
    return AnonymousSubject;
}(Subject));
exports.AnonymousSubject = AnonymousSubject;

},{"./Observable":28,"./SubjectSubscription":31,"./Subscriber":32,"./Subscription":33,"./symbol/rxSubscriber":35,"./util/ObjectUnsubscribedError":36}],31:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscription_1 = require('./Subscription');
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SubjectSubscription = (function (_super) {
    __extends(SubjectSubscription, _super);
    function SubjectSubscription(subject, subscriber) {
        _super.call(this);
        this.subject = subject;
        this.subscriber = subscriber;
        this.closed = false;
    }
    SubjectSubscription.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.closed = true;
        var subject = this.subject;
        var observers = subject.observers;
        this.subject = null;
        if (!observers || observers.length === 0 || subject.isStopped || subject.closed) {
            return;
        }
        var subscriberIndex = observers.indexOf(this.subscriber);
        if (subscriberIndex !== -1) {
            observers.splice(subscriberIndex, 1);
        }
    };
    return SubjectSubscription;
}(Subscription_1.Subscription));
exports.SubjectSubscription = SubjectSubscription;

},{"./Subscription":33}],32:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var isFunction_1 = require('./util/isFunction');
var Subscription_1 = require('./Subscription');
var Observer_1 = require('./Observer');
var rxSubscriber_1 = require('./symbol/rxSubscriber');
/**
 * Implements the {@link Observer} interface and extends the
 * {@link Subscription} class. While the {@link Observer} is the public API for
 * consuming the values of an {@link Observable}, all Observers get converted to
 * a Subscriber, in order to provide Subscription-like capabilities such as
 * `unsubscribe`. Subscriber is a common type in RxJS, and crucial for
 * implementing operators, but it is rarely used as a public API.
 *
 * @class Subscriber<T>
 */
var Subscriber = (function (_super) {
    __extends(Subscriber, _super);
    /**
     * @param {Observer|function(value: T): void} [destinationOrNext] A partially
     * defined Observer or a `next` callback function.
     * @param {function(e: ?any): void} [error] The `error` callback of an
     * Observer.
     * @param {function(): void} [complete] The `complete` callback of an
     * Observer.
     */
    function Subscriber(destinationOrNext, error, complete) {
        _super.call(this);
        this.syncErrorValue = null;
        this.syncErrorThrown = false;
        this.syncErrorThrowable = false;
        this.isStopped = false;
        switch (arguments.length) {
            case 0:
                this.destination = Observer_1.empty;
                break;
            case 1:
                if (!destinationOrNext) {
                    this.destination = Observer_1.empty;
                    break;
                }
                if (typeof destinationOrNext === 'object') {
                    if (destinationOrNext instanceof Subscriber) {
                        this.destination = destinationOrNext;
                        this.destination.add(this);
                    }
                    else {
                        this.syncErrorThrowable = true;
                        this.destination = new SafeSubscriber(this, destinationOrNext);
                    }
                    break;
                }
            default:
                this.syncErrorThrowable = true;
                this.destination = new SafeSubscriber(this, destinationOrNext, error, complete);
                break;
        }
    }
    Subscriber.prototype[rxSubscriber_1.$$rxSubscriber] = function () { return this; };
    /**
     * A static factory for a Subscriber, given a (potentially partial) definition
     * of an Observer.
     * @param {function(x: ?T): void} [next] The `next` callback of an Observer.
     * @param {function(e: ?any): void} [error] The `error` callback of an
     * Observer.
     * @param {function(): void} [complete] The `complete` callback of an
     * Observer.
     * @return {Subscriber<T>} A Subscriber wrapping the (partially defined)
     * Observer represented by the given arguments.
     */
    Subscriber.create = function (next, error, complete) {
        var subscriber = new Subscriber(next, error, complete);
        subscriber.syncErrorThrowable = false;
        return subscriber;
    };
    /**
     * The {@link Observer} callback to receive notifications of type `next` from
     * the Observable, with a value. The Observable may call this method 0 or more
     * times.
     * @param {T} [value] The `next` value.
     * @return {void}
     */
    Subscriber.prototype.next = function (value) {
        if (!this.isStopped) {
            this._next(value);
        }
    };
    /**
     * The {@link Observer} callback to receive notifications of type `error` from
     * the Observable, with an attached {@link Error}. Notifies the Observer that
     * the Observable has experienced an error condition.
     * @param {any} [err] The `error` exception.
     * @return {void}
     */
    Subscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            this.isStopped = true;
            this._error(err);
        }
    };
    /**
     * The {@link Observer} callback to receive a valueless notification of type
     * `complete` from the Observable. Notifies the Observer that the Observable
     * has finished sending push-based notifications.
     * @return {void}
     */
    Subscriber.prototype.complete = function () {
        if (!this.isStopped) {
            this.isStopped = true;
            this._complete();
        }
    };
    Subscriber.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.isStopped = true;
        _super.prototype.unsubscribe.call(this);
    };
    Subscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    Subscriber.prototype._error = function (err) {
        this.destination.error(err);
        this.unsubscribe();
    };
    Subscriber.prototype._complete = function () {
        this.destination.complete();
        this.unsubscribe();
    };
    return Subscriber;
}(Subscription_1.Subscription));
exports.Subscriber = Subscriber;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SafeSubscriber = (function (_super) {
    __extends(SafeSubscriber, _super);
    function SafeSubscriber(_parent, observerOrNext, error, complete) {
        _super.call(this);
        this._parent = _parent;
        var next;
        var context = this;
        if (isFunction_1.isFunction(observerOrNext)) {
            next = observerOrNext;
        }
        else if (observerOrNext) {
            context = observerOrNext;
            next = observerOrNext.next;
            error = observerOrNext.error;
            complete = observerOrNext.complete;
            if (isFunction_1.isFunction(context.unsubscribe)) {
                this.add(context.unsubscribe.bind(context));
            }
            context.unsubscribe = this.unsubscribe.bind(this);
        }
        this._context = context;
        this._next = next;
        this._error = error;
        this._complete = complete;
    }
    SafeSubscriber.prototype.next = function (value) {
        if (!this.isStopped && this._next) {
            var _parent = this._parent;
            if (!_parent.syncErrorThrowable) {
                this.__tryOrUnsub(this._next, value);
            }
            else if (this.__tryOrSetError(_parent, this._next, value)) {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            var _parent = this._parent;
            if (this._error) {
                if (!_parent.syncErrorThrowable) {
                    this.__tryOrUnsub(this._error, err);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parent, this._error, err);
                    this.unsubscribe();
                }
            }
            else if (!_parent.syncErrorThrowable) {
                this.unsubscribe();
                throw err;
            }
            else {
                _parent.syncErrorValue = err;
                _parent.syncErrorThrown = true;
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.complete = function () {
        if (!this.isStopped) {
            var _parent = this._parent;
            if (this._complete) {
                if (!_parent.syncErrorThrowable) {
                    this.__tryOrUnsub(this._complete);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parent, this._complete);
                    this.unsubscribe();
                }
            }
            else {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            this.unsubscribe();
            throw err;
        }
    };
    SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            parent.syncErrorValue = err;
            parent.syncErrorThrown = true;
            return true;
        }
        return false;
    };
    SafeSubscriber.prototype._unsubscribe = function () {
        var _parent = this._parent;
        this._context = null;
        this._parent = null;
        _parent.unsubscribe();
    };
    return SafeSubscriber;
}(Subscriber));

},{"./Observer":29,"./Subscription":33,"./symbol/rxSubscriber":35,"./util/isFunction":40}],33:[function(require,module,exports){
"use strict";
var isArray_1 = require('./util/isArray');
var isObject_1 = require('./util/isObject');
var isFunction_1 = require('./util/isFunction');
var tryCatch_1 = require('./util/tryCatch');
var errorObject_1 = require('./util/errorObject');
var UnsubscriptionError_1 = require('./util/UnsubscriptionError');
/**
 * Represents a disposable resource, such as the execution of an Observable. A
 * Subscription has one important method, `unsubscribe`, that takes no argument
 * and just disposes the resource held by the subscription.
 *
 * Additionally, subscriptions may be grouped together through the `add()`
 * method, which will attach a child Subscription to the current Subscription.
 * When a Subscription is unsubscribed, all its children (and its grandchildren)
 * will be unsubscribed as well.
 *
 * @class Subscription
 */
var Subscription = (function () {
    /**
     * @param {function(): void} [unsubscribe] A function describing how to
     * perform the disposal of resources when the `unsubscribe` method is called.
     */
    function Subscription(unsubscribe) {
        /**
         * A flag to indicate whether this Subscription has already been unsubscribed.
         * @type {boolean}
         */
        this.closed = false;
        if (unsubscribe) {
            this._unsubscribe = unsubscribe;
        }
    }
    /**
     * Disposes the resources held by the subscription. May, for instance, cancel
     * an ongoing Observable execution or cancel any other type of work that
     * started when the Subscription was created.
     * @return {void}
     */
    Subscription.prototype.unsubscribe = function () {
        var hasErrors = false;
        var errors;
        if (this.closed) {
            return;
        }
        this.closed = true;
        var _a = this, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
        this._subscriptions = null;
        if (isFunction_1.isFunction(_unsubscribe)) {
            var trial = tryCatch_1.tryCatch(_unsubscribe).call(this);
            if (trial === errorObject_1.errorObject) {
                hasErrors = true;
                (errors = errors || []).push(errorObject_1.errorObject.e);
            }
        }
        if (isArray_1.isArray(_subscriptions)) {
            var index = -1;
            var len = _subscriptions.length;
            while (++index < len) {
                var sub = _subscriptions[index];
                if (isObject_1.isObject(sub)) {
                    var trial = tryCatch_1.tryCatch(sub.unsubscribe).call(sub);
                    if (trial === errorObject_1.errorObject) {
                        hasErrors = true;
                        errors = errors || [];
                        var err = errorObject_1.errorObject.e;
                        if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {
                            errors = errors.concat(err.errors);
                        }
                        else {
                            errors.push(err);
                        }
                    }
                }
            }
        }
        if (hasErrors) {
            throw new UnsubscriptionError_1.UnsubscriptionError(errors);
        }
    };
    /**
     * Adds a tear down to be called during the unsubscribe() of this
     * Subscription.
     *
     * If the tear down being added is a subscription that is already
     * unsubscribed, is the same reference `add` is being called on, or is
     * `Subscription.EMPTY`, it will not be added.
     *
     * If this subscription is already in an `closed` state, the passed
     * tear down logic will be executed immediately.
     *
     * @param {TeardownLogic} teardown The additional logic to execute on
     * teardown.
     * @return {Subscription} Returns the Subscription used or created to be
     * added to the inner subscriptions list. This Subscription can be used with
     * `remove()` to remove the passed teardown logic from the inner subscriptions
     * list.
     */
    Subscription.prototype.add = function (teardown) {
        if (!teardown || (teardown === Subscription.EMPTY)) {
            return Subscription.EMPTY;
        }
        if (teardown === this) {
            return this;
        }
        var sub = teardown;
        switch (typeof teardown) {
            case 'function':
                sub = new Subscription(teardown);
            case 'object':
                if (sub.closed || typeof sub.unsubscribe !== 'function') {
                    break;
                }
                else if (this.closed) {
                    sub.unsubscribe();
                }
                else {
                    (this._subscriptions || (this._subscriptions = [])).push(sub);
                }
                break;
            default:
                throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
        }
        return sub;
    };
    /**
     * Removes a Subscription from the internal list of subscriptions that will
     * unsubscribe during the unsubscribe process of this Subscription.
     * @param {Subscription} subscription The subscription to remove.
     * @return {void}
     */
    Subscription.prototype.remove = function (subscription) {
        // HACK: This might be redundant because of the logic in `add()`
        if (subscription == null || (subscription === this) || (subscription === Subscription.EMPTY)) {
            return;
        }
        var subscriptions = this._subscriptions;
        if (subscriptions) {
            var subscriptionIndex = subscriptions.indexOf(subscription);
            if (subscriptionIndex !== -1) {
                subscriptions.splice(subscriptionIndex, 1);
            }
        }
    };
    Subscription.EMPTY = (function (empty) {
        empty.closed = true;
        return empty;
    }(new Subscription()));
    return Subscription;
}());
exports.Subscription = Subscription;

},{"./util/UnsubscriptionError":37,"./util/errorObject":38,"./util/isArray":39,"./util/isFunction":40,"./util/isObject":41,"./util/tryCatch":44}],34:[function(require,module,exports){
"use strict";
var root_1 = require('../util/root');
function getSymbolObservable(context) {
    var $$observable;
    var Symbol = context.Symbol;
    if (typeof Symbol === 'function') {
        if (Symbol.observable) {
            $$observable = Symbol.observable;
        }
        else {
            $$observable = Symbol('observable');
            Symbol.observable = $$observable;
        }
    }
    else {
        $$observable = '@@observable';
    }
    return $$observable;
}
exports.getSymbolObservable = getSymbolObservable;
exports.$$observable = getSymbolObservable(root_1.root);

},{"../util/root":42}],35:[function(require,module,exports){
"use strict";
var root_1 = require('../util/root');
var Symbol = root_1.root.Symbol;
exports.$$rxSubscriber = (typeof Symbol === 'function' && typeof Symbol.for === 'function') ?
    Symbol.for('rxSubscriber') : '@@rxSubscriber';

},{"../util/root":42}],36:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * An error thrown when an action is invalid because the object has been
 * unsubscribed.
 *
 * @see {@link Subject}
 * @see {@link BehaviorSubject}
 *
 * @class ObjectUnsubscribedError
 */
var ObjectUnsubscribedError = (function (_super) {
    __extends(ObjectUnsubscribedError, _super);
    function ObjectUnsubscribedError() {
        var err = _super.call(this, 'object unsubscribed');
        this.name = err.name = 'ObjectUnsubscribedError';
        this.stack = err.stack;
        this.message = err.message;
    }
    return ObjectUnsubscribedError;
}(Error));
exports.ObjectUnsubscribedError = ObjectUnsubscribedError;

},{}],37:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * An error thrown when one or more errors have occurred during the
 * `unsubscribe` of a {@link Subscription}.
 */
var UnsubscriptionError = (function (_super) {
    __extends(UnsubscriptionError, _super);
    function UnsubscriptionError(errors) {
        _super.call(this);
        this.errors = errors;
        var err = Error.call(this, errors ?
            errors.length + " errors occurred during unsubscription:\n  " + errors.map(function (err, i) { return ((i + 1) + ") " + err.toString()); }).join('\n  ') : '');
        this.name = err.name = 'UnsubscriptionError';
        this.stack = err.stack;
        this.message = err.message;
    }
    return UnsubscriptionError;
}(Error));
exports.UnsubscriptionError = UnsubscriptionError;

},{}],38:[function(require,module,exports){
"use strict";
// typeof any so that it we don't have to cast when comparing a result to the error object
exports.errorObject = { e: {} };

},{}],39:[function(require,module,exports){
"use strict";
exports.isArray = Array.isArray || (function (x) { return x && typeof x.length === 'number'; });

},{}],40:[function(require,module,exports){
"use strict";
function isFunction(x) {
    return typeof x === 'function';
}
exports.isFunction = isFunction;

},{}],41:[function(require,module,exports){
"use strict";
function isObject(x) {
    return x != null && typeof x === 'object';
}
exports.isObject = isObject;

},{}],42:[function(require,module,exports){
(function (global){
"use strict";
/**
 * window: browser in DOM main thread
 * self: browser in WebWorker
 * global: Node.js/other
 */
exports.root = (typeof window == 'object' && window.window === window && window
    || typeof self == 'object' && self.self === self && self
    || typeof global == 'object' && global.global === global && global);
if (!exports.root) {
    throw new Error('RxJS could not find any global context (window, self, global)');
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],43:[function(require,module,exports){
"use strict";
var Subscriber_1 = require('../Subscriber');
var rxSubscriber_1 = require('../symbol/rxSubscriber');
var Observer_1 = require('../Observer');
function toSubscriber(nextOrObserver, error, complete) {
    if (nextOrObserver) {
        if (nextOrObserver instanceof Subscriber_1.Subscriber) {
            return nextOrObserver;
        }
        if (nextOrObserver[rxSubscriber_1.$$rxSubscriber]) {
            return nextOrObserver[rxSubscriber_1.$$rxSubscriber]();
        }
    }
    if (!nextOrObserver && !error && !complete) {
        return new Subscriber_1.Subscriber(Observer_1.empty);
    }
    return new Subscriber_1.Subscriber(nextOrObserver, error, complete);
}
exports.toSubscriber = toSubscriber;

},{"../Observer":29,"../Subscriber":32,"../symbol/rxSubscriber":35}],44:[function(require,module,exports){
"use strict";
var errorObject_1 = require('./errorObject');
var tryCatchTarget;
function tryCatcher() {
    try {
        return tryCatchTarget.apply(this, arguments);
    }
    catch (e) {
        errorObject_1.errorObject.e = e;
        return errorObject_1.errorObject;
    }
}
function tryCatch(fn) {
    tryCatchTarget = fn;
    return tryCatcher;
}
exports.tryCatch = tryCatch;
;

},{"./errorObject":38}],45:[function(require,module,exports){
(function (process,global){
/**
* @license
* Copyright Google Inc. All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://angular.io/license
*/
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

var Zone$1 = (function (global) {
    if (global['Zone']) {
        throw new Error('Zone already loaded.');
    }
    var NO_ZONE = { name: 'NO ZONE' };
    var notScheduled = 'notScheduled', scheduling = 'scheduling', scheduled = 'scheduled', running = 'running', canceling = 'canceling';
    var microTask = 'microTask', macroTask = 'macroTask', eventTask = 'eventTask';
    var Zone = (function () {
        function Zone(parent, zoneSpec) {
            this._properties = null;
            this._parent = parent;
            this._name = zoneSpec ? zoneSpec.name || 'unnamed' : '<root>';
            this._properties = zoneSpec && zoneSpec.properties || {};
            this._zoneDelegate =
                new ZoneDelegate(this, this._parent && this._parent._zoneDelegate, zoneSpec);
        }
        Zone.assertZonePatched = function () {
            if (global.Promise !== ZoneAwarePromise) {
                throw new Error('Zone.js has detected that ZoneAwarePromise `(window|global).Promise` ' +
                    'has been overwritten.\n' +
                    'Most likely cause is that a Promise polyfill has been loaded ' +
                    'after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. ' +
                    'If you must load one, do so before loading zone.js.)');
            }
        };
        Object.defineProperty(Zone, "root", {
            get: function () {
                var zone = Zone.current;
                while (zone.parent) {
                    zone = zone.parent;
                }
                return zone;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Zone, "current", {
            get: function () {
                return _currentZoneFrame.zone;
            },
            enumerable: true,
            configurable: true
        });
        
        Object.defineProperty(Zone, "currentTask", {
            get: function () {
                return _currentTask;
            },
            enumerable: true,
            configurable: true
        });
        
        Object.defineProperty(Zone.prototype, "parent", {
            get: function () {
                return this._parent;
            },
            enumerable: true,
            configurable: true
        });
        
        Object.defineProperty(Zone.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        
        Zone.prototype.get = function (key) {
            var zone = this.getZoneWith(key);
            if (zone)
                return zone._properties[key];
        };
        Zone.prototype.getZoneWith = function (key) {
            var current = this;
            while (current) {
                if (current._properties.hasOwnProperty(key)) {
                    return current;
                }
                current = current._parent;
            }
            return null;
        };
        Zone.prototype.fork = function (zoneSpec) {
            if (!zoneSpec)
                throw new Error('ZoneSpec required!');
            return this._zoneDelegate.fork(this, zoneSpec);
        };
        Zone.prototype.wrap = function (callback, source) {
            if (typeof callback !== 'function') {
                throw new Error('Expecting function got: ' + callback);
            }
            var _callback = this._zoneDelegate.intercept(this, callback, source);
            var zone = this;
            return function () {
                return zone.runGuarded(_callback, this, arguments, source);
            };
        };
        Zone.prototype.run = function (callback, applyThis, applyArgs, source) {
            if (applyThis === void 0) { applyThis = undefined; }
            if (applyArgs === void 0) { applyArgs = null; }
            if (source === void 0) { source = null; }
            _currentZoneFrame = new ZoneFrame(_currentZoneFrame, this);
            try {
                return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
            }
            finally {
                _currentZoneFrame = _currentZoneFrame.parent;
            }
        };
        Zone.prototype.runGuarded = function (callback, applyThis, applyArgs, source) {
            if (applyThis === void 0) { applyThis = null; }
            if (applyArgs === void 0) { applyArgs = null; }
            if (source === void 0) { source = null; }
            _currentZoneFrame = new ZoneFrame(_currentZoneFrame, this);
            try {
                try {
                    return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
                }
                catch (error) {
                    if (this._zoneDelegate.handleError(this, error)) {
                        throw error;
                    }
                }
            }
            finally {
                _currentZoneFrame = _currentZoneFrame.parent;
            }
        };
        Zone.prototype.runTask = function (task, applyThis, applyArgs) {
            if (task.zone != this)
                throw new Error('A task can only be run in the zone of creation! (Creation: ' +
                    (task.zone || NO_ZONE).name + '; Execution: ' + this.name + ')');
            var reEntryGuard = task.state != running;
            reEntryGuard && task._transitionTo(running, scheduled);
            task.runCount++;
            var previousTask = _currentTask;
            _currentTask = task;
            _currentZoneFrame = new ZoneFrame(_currentZoneFrame, this);
            try {
                if (task.type == macroTask && task.data && !task.data.isPeriodic) {
                    task.cancelFn = null;
                }
                try {
                    return this._zoneDelegate.invokeTask(this, task, applyThis, applyArgs);
                }
                catch (error) {
                    if (this._zoneDelegate.handleError(this, error)) {
                        throw error;
                    }
                }
            }
            finally {
                if (task.type == eventTask || (task.data && task.data.isPeriodic)) {
                    // if the task's state is notScheduled, then it has already been cancelled
                    // we should not reset the state to scheduled
                    if (task.state !== notScheduled) {
                        reEntryGuard && task._transitionTo(scheduled, running);
                    }
                }
                else {
                    task.runCount = 0;
                    this._updateTaskCount(task, -1);
                    reEntryGuard && task._transitionTo(notScheduled, running, notScheduled);
                }
                _currentZoneFrame = _currentZoneFrame.parent;
                _currentTask = previousTask;
            }
        };
        Zone.prototype.scheduleTask = function (task) {
            task._transitionTo(scheduling, notScheduled);
            var zoneDelegates = [];
            task._zoneDelegates = zoneDelegates;
            task.zone = this;
            task = this._zoneDelegate.scheduleTask(this, task);
            if (task._zoneDelegates === zoneDelegates) {
                // we have to check because internally the delegate can reschedule the task.
                this._updateTaskCount(task, 1);
            }
            if (task.state == scheduling) {
                task._transitionTo(scheduled, scheduling);
            }
            return task;
        };
        Zone.prototype.scheduleMicroTask = function (source, callback, data, customSchedule) {
            return this.scheduleTask(new ZoneTask(microTask, source, callback, data, customSchedule, null));
        };
        Zone.prototype.scheduleMacroTask = function (source, callback, data, customSchedule, customCancel) {
            return this.scheduleTask(new ZoneTask(macroTask, source, callback, data, customSchedule, customCancel));
        };
        Zone.prototype.scheduleEventTask = function (source, callback, data, customSchedule, customCancel) {
            return this.scheduleTask(new ZoneTask(eventTask, source, callback, data, customSchedule, customCancel));
        };
        Zone.prototype.cancelTask = function (task) {
            task._transitionTo(canceling, scheduled, running);
            this._zoneDelegate.cancelTask(this, task);
            this._updateTaskCount(task, -1);
            task._transitionTo(notScheduled, canceling);
            task.runCount = 0;
            return task;
        };
        Zone.prototype._updateTaskCount = function (task, count) {
            var zoneDelegates = task._zoneDelegates;
            if (count == -1) {
                task._zoneDelegates = null;
            }
            for (var i = 0; i < zoneDelegates.length; i++) {
                zoneDelegates[i]._updateTaskCount(task.type, count);
            }
        };
        Zone.__symbol__ = __symbol__;
        return Zone;
    }());
    var DELEGATE_ZS = {
        name: '',
        onHasTask: function (delegate, _, target, hasTaskState) {
            return delegate.hasTask(target, hasTaskState);
        },
        onScheduleTask: function (delegate, _, target, task) {
            return delegate.scheduleTask(target, task);
        },
        onInvokeTask: function (delegate, _, target, task, applyThis, applyArgs) {
            return delegate.invokeTask(target, task, applyThis, applyArgs);
        },
        onCancelTask: function (delegate, _, target, task) {
            return delegate.cancelTask(target, task);
        }
    };
    var ZoneDelegate = (function () {
        function ZoneDelegate(zone, parentDelegate, zoneSpec) {
            this._taskCounts = { microTask: 0, macroTask: 0, eventTask: 0 };
            this.zone = zone;
            this._parentDelegate = parentDelegate;
            this._forkZS = zoneSpec && (zoneSpec && zoneSpec.onFork ? zoneSpec : parentDelegate._forkZS);
            this._forkDlgt = zoneSpec && (zoneSpec.onFork ? parentDelegate : parentDelegate._forkDlgt);
            this._forkCurrZone = zoneSpec && (zoneSpec.onFork ? this.zone : parentDelegate.zone);
            this._interceptZS =
                zoneSpec && (zoneSpec.onIntercept ? zoneSpec : parentDelegate._interceptZS);
            this._interceptDlgt =
                zoneSpec && (zoneSpec.onIntercept ? parentDelegate : parentDelegate._interceptDlgt);
            this._interceptCurrZone =
                zoneSpec && (zoneSpec.onIntercept ? this.zone : parentDelegate.zone);
            this._invokeZS = zoneSpec && (zoneSpec.onInvoke ? zoneSpec : parentDelegate._invokeZS);
            this._invokeDlgt =
                zoneSpec && (zoneSpec.onInvoke ? parentDelegate : parentDelegate._invokeDlgt);
            this._invokeCurrZone = zoneSpec && (zoneSpec.onInvoke ? this.zone : parentDelegate.zone);
            this._handleErrorZS =
                zoneSpec && (zoneSpec.onHandleError ? zoneSpec : parentDelegate._handleErrorZS);
            this._handleErrorDlgt =
                zoneSpec && (zoneSpec.onHandleError ? parentDelegate : parentDelegate._handleErrorDlgt);
            this._handleErrorCurrZone =
                zoneSpec && (zoneSpec.onHandleError ? this.zone : parentDelegate.zone);
            this._scheduleTaskZS =
                zoneSpec && (zoneSpec.onScheduleTask ? zoneSpec : parentDelegate._scheduleTaskZS);
            this._scheduleTaskDlgt =
                zoneSpec && (zoneSpec.onScheduleTask ? parentDelegate : parentDelegate._scheduleTaskDlgt);
            this._scheduleTaskCurrZone =
                zoneSpec && (zoneSpec.onScheduleTask ? this.zone : parentDelegate.zone);
            this._invokeTaskZS =
                zoneSpec && (zoneSpec.onInvokeTask ? zoneSpec : parentDelegate._invokeTaskZS);
            this._invokeTaskDlgt =
                zoneSpec && (zoneSpec.onInvokeTask ? parentDelegate : parentDelegate._invokeTaskDlgt);
            this._invokeTaskCurrZone =
                zoneSpec && (zoneSpec.onInvokeTask ? this.zone : parentDelegate.zone);
            this._cancelTaskZS =
                zoneSpec && (zoneSpec.onCancelTask ? zoneSpec : parentDelegate._cancelTaskZS);
            this._cancelTaskDlgt =
                zoneSpec && (zoneSpec.onCancelTask ? parentDelegate : parentDelegate._cancelTaskDlgt);
            this._cancelTaskCurrZone =
                zoneSpec && (zoneSpec.onCancelTask ? this.zone : parentDelegate.zone);
            this._hasTaskZS = null;
            this._hasTaskDlgt = null;
            this._hasTaskDlgtOwner = null;
            this._hasTaskCurrZone = null;
            var zoneSpecHasTask = zoneSpec && zoneSpec.onHasTask;
            var parentHasTask = parentDelegate && parentDelegate._hasTaskZS;
            if (zoneSpecHasTask || parentHasTask) {
                // If we need to report hasTask, than this ZS needs to do ref counting on tasks. In such
                // a case all task related interceptors must go through this ZD. We can't short circuit it.
                this._hasTaskZS = zoneSpecHasTask ? zoneSpec : DELEGATE_ZS;
                this._hasTaskDlgt = parentDelegate;
                this._hasTaskDlgtOwner = this;
                this._hasTaskCurrZone = zone;
                if (!zoneSpec.onScheduleTask) {
                    this._scheduleTaskZS = DELEGATE_ZS;
                    this._scheduleTaskDlgt = parentDelegate;
                    this._scheduleTaskCurrZone = this.zone;
                }
                if (!zoneSpec.onInvokeTask) {
                    this._invokeTaskZS = DELEGATE_ZS;
                    this._invokeTaskDlgt = parentDelegate;
                    this._invokeTaskCurrZone = this.zone;
                }
                if (!zoneSpec.onCancelTask) {
                    this._cancelTaskZS = DELEGATE_ZS;
                    this._cancelTaskDlgt = parentDelegate;
                    this._cancelTaskCurrZone = this.zone;
                }
            }
        }
        ZoneDelegate.prototype.fork = function (targetZone, zoneSpec) {
            return this._forkZS ? this._forkZS.onFork(this._forkDlgt, this.zone, targetZone, zoneSpec) :
                new Zone(targetZone, zoneSpec);
        };
        ZoneDelegate.prototype.intercept = function (targetZone, callback, source) {
            return this._interceptZS ?
                this._interceptZS.onIntercept(this._interceptDlgt, this._interceptCurrZone, targetZone, callback, source) :
                callback;
        };
        ZoneDelegate.prototype.invoke = function (targetZone, callback, applyThis, applyArgs, source) {
            return this._invokeZS ?
                this._invokeZS.onInvoke(this._invokeDlgt, this._invokeCurrZone, targetZone, callback, applyThis, applyArgs, source) :
                callback.apply(applyThis, applyArgs);
        };
        ZoneDelegate.prototype.handleError = function (targetZone, error) {
            return this._handleErrorZS ?
                this._handleErrorZS.onHandleError(this._handleErrorDlgt, this._handleErrorCurrZone, targetZone, error) :
                true;
        };
        ZoneDelegate.prototype.scheduleTask = function (targetZone, task) {
            var returnTask = task;
            if (this._scheduleTaskZS) {
                if (this._hasTaskZS) {
                    returnTask._zoneDelegates.push(this._hasTaskDlgtOwner);
                }
                returnTask = this._scheduleTaskZS.onScheduleTask(this._scheduleTaskDlgt, this._scheduleTaskCurrZone, targetZone, task);
                if (!returnTask)
                    returnTask = task;
            }
            else {
                if (task.scheduleFn) {
                    task.scheduleFn(task);
                }
                else if (task.type == microTask) {
                    scheduleMicroTask(task);
                }
                else {
                    throw new Error('Task is missing scheduleFn.');
                }
            }
            return returnTask;
        };
        ZoneDelegate.prototype.invokeTask = function (targetZone, task, applyThis, applyArgs) {
            return this._invokeTaskZS ?
                this._invokeTaskZS.onInvokeTask(this._invokeTaskDlgt, this._invokeTaskCurrZone, targetZone, task, applyThis, applyArgs) :
                task.callback.apply(applyThis, applyArgs);
        };
        ZoneDelegate.prototype.cancelTask = function (targetZone, task) {
            var value;
            if (this._cancelTaskZS) {
                value = this._cancelTaskZS.onCancelTask(this._cancelTaskDlgt, this._cancelTaskCurrZone, targetZone, task);
            }
            else {
                value = task.cancelFn(task);
            }
            return value;
        };
        ZoneDelegate.prototype.hasTask = function (targetZone, isEmpty) {
            return this._hasTaskZS &&
                this._hasTaskZS.onHasTask(this._hasTaskDlgt, this._hasTaskCurrZone, targetZone, isEmpty);
        };
        ZoneDelegate.prototype._updateTaskCount = function (type, count) {
            var counts = this._taskCounts;
            var prev = counts[type];
            var next = counts[type] = prev + count;
            if (next < 0) {
                throw new Error('More tasks executed then were scheduled.');
            }
            if (prev == 0 || next == 0) {
                var isEmpty = {
                    microTask: counts.microTask > 0,
                    macroTask: counts.macroTask > 0,
                    eventTask: counts.eventTask > 0,
                    change: type
                };
                // TODO(misko): what should happen if it throws?
                this.hasTask(this.zone, isEmpty);
            }
        };
        return ZoneDelegate;
    }());
    var ZoneTask = (function () {
        function ZoneTask(type, source, callback, options, scheduleFn, cancelFn) {
            this.zone = null;
            this.runCount = 0;
            this._zoneDelegates = null;
            this._state = 'notScheduled';
            this.type = type;
            this.source = source;
            this.data = options;
            this.scheduleFn = scheduleFn;
            this.cancelFn = cancelFn;
            this.callback = callback;
            var self = this;
            this.invoke = function () {
                _numberOfNestedTaskFrames++;
                try {
                    self.runCount++;
                    return self.zone.runTask(self, this, arguments);
                }
                finally {
                    if (_numberOfNestedTaskFrames == 1) {
                        drainMicroTaskQueue();
                    }
                    _numberOfNestedTaskFrames--;
                }
            };
        }
        Object.defineProperty(ZoneTask.prototype, "state", {
            get: function () {
                return this._state;
            },
            enumerable: true,
            configurable: true
        });
        ZoneTask.prototype.cancelScheduleRequest = function () {
            this._transitionTo(notScheduled, scheduling);
        };
        ZoneTask.prototype._transitionTo = function (toState, fromState1, fromState2) {
            if (this._state === fromState1 || this._state === fromState2) {
                this._state = toState;
                if (toState == notScheduled) {
                    this._zoneDelegates = null;
                }
            }
            else {
                throw new Error(this.type + " '" + this.source + "': can not transition to '" + toState + "', expecting state '" + fromState1 + "'" + (fromState2 ?
                    ' or \'' + fromState2 + '\'' :
                    '') + ", was '" + this._state + "'.");
            }
        };
        ZoneTask.prototype.toString = function () {
            if (this.data && typeof this.data.handleId !== 'undefined') {
                return this.data.handleId;
            }
            else {
                return Object.prototype.toString.call(this);
            }
        };
        // add toJSON method to prevent cyclic error when
        // call JSON.stringify(zoneTask)
        ZoneTask.prototype.toJSON = function () {
            return {
                type: this.type,
                state: this.state,
                source: this.source,
                data: this.data,
                zone: this.zone.name,
                invoke: this.invoke,
                scheduleFn: this.scheduleFn,
                cancelFn: this.cancelFn,
                runCount: this.runCount,
                callback: this.callback
            };
        };
        return ZoneTask;
    }());
    var ZoneFrame = (function () {
        function ZoneFrame(parent, zone) {
            this.parent = parent;
            this.zone = zone;
        }
        return ZoneFrame;
    }());
    function __symbol__(name) {
        return '__zone_symbol__' + name;
    }
    
    var symbolSetTimeout = __symbol__('setTimeout');
    var symbolPromise = __symbol__('Promise');
    var symbolThen = __symbol__('then');
    var _currentZoneFrame = new ZoneFrame(null, new Zone(null, null));
    var _currentTask = null;
    var _microTaskQueue = [];
    var _isDrainingMicrotaskQueue = false;
    var _uncaughtPromiseErrors = [];
    var _numberOfNestedTaskFrames = 0;
    function scheduleQueueDrain() {
        // if we are not running in any task, and there has not been anything scheduled
        // we must bootstrap the initial task creation by manually scheduling the drain
        if (_numberOfNestedTaskFrames === 0 && _microTaskQueue.length === 0) {
            // We are not running in Task, so we need to kickstart the microtask queue.
            if (global[symbolPromise]) {
                global[symbolPromise].resolve(0)[symbolThen](drainMicroTaskQueue);
            }
            else {
                global[symbolSetTimeout](drainMicroTaskQueue, 0);
            }
        }
    }
    function scheduleMicroTask(task) {
        scheduleQueueDrain();
        _microTaskQueue.push(task);
    }
    function consoleError(e) {
        if (Zone[__symbol__('ignoreConsoleErrorUncaughtError')]) {
            return;
        }
        var rejection = e && e.rejection;
        if (rejection) {
            console.error('Unhandled Promise rejection:', rejection instanceof Error ? rejection.message : rejection, '; Zone:', e.zone.name, '; Task:', e.task && e.task.source, '; Value:', rejection, rejection instanceof Error ? rejection.stack : undefined);
        }
        console.error(e);
    }
    function handleUnhandledRejection(e) {
        consoleError(e);
        try {
            var handler = Zone[__symbol__('unhandledPromiseRejectionHandler')];
            if (handler && typeof handler === 'function') {
                handler.apply(this, [e]);
            }
        }
        catch (err) {
        }
    }
    function drainMicroTaskQueue() {
        if (!_isDrainingMicrotaskQueue) {
            _isDrainingMicrotaskQueue = true;
            while (_microTaskQueue.length) {
                var queue = _microTaskQueue;
                _microTaskQueue = [];
                for (var i = 0; i < queue.length; i++) {
                    var task = queue[i];
                    try {
                        task.zone.runTask(task, null, null);
                    }
                    catch (error) {
                        consoleError(error);
                    }
                }
            }
            while (_uncaughtPromiseErrors.length) {
                var _loop_1 = function() {
                    var uncaughtPromiseError = _uncaughtPromiseErrors.shift();
                    try {
                        uncaughtPromiseError.zone.runGuarded(function () {
                            throw uncaughtPromiseError;
                        });
                    }
                    catch (error) {
                        handleUnhandledRejection(error);
                    }
                };
                while (_uncaughtPromiseErrors.length) {
                    _loop_1();
                }
            }
            _isDrainingMicrotaskQueue = false;
        }
    }
    function isThenable(value) {
        return value && value.then;
    }
    function forwardResolution(value) {
        return value;
    }
    function forwardRejection(rejection) {
        return ZoneAwarePromise.reject(rejection);
    }
    var symbolState = __symbol__('state');
    var symbolValue = __symbol__('value');
    var source = 'Promise.then';
    var UNRESOLVED = null;
    var RESOLVED = true;
    var REJECTED = false;
    var REJECTED_NO_CATCH = 0;
    function makeResolver(promise, state) {
        return function (v) {
            try {
                resolvePromise(promise, state, v);
            }
            catch (err) {
                resolvePromise(promise, false, err);
            }
            // Do not return value or you will break the Promise spec.
        };
    }
    var once = function () {
        var wasCalled = false;
        return function wrapper(wrappedFunction) {
            return function () {
                if (wasCalled) {
                    return;
                }
                wasCalled = true;
                wrappedFunction.apply(null, arguments);
            };
        };
    };
    // Promise Resolution
    function resolvePromise(promise, state, value) {
        var onceWrapper = once();
        if (promise === value) {
            throw new TypeError('Promise resolved with itself');
        }
        if (promise[symbolState] === UNRESOLVED) {
            // should only get value.then once based on promise spec.
            var then = null;
            try {
                if (typeof value === 'object' || typeof value === 'function') {
                    then = value && value.then;
                }
            }
            catch (err) {
                onceWrapper(function () {
                    resolvePromise(promise, false, err);
                })();
                return promise;
            }
            // if (value instanceof ZoneAwarePromise) {
            if (state !== REJECTED && value instanceof ZoneAwarePromise &&
                value.hasOwnProperty(symbolState) && value.hasOwnProperty(symbolValue) &&
                value[symbolState] !== UNRESOLVED) {
                clearRejectedNoCatch(value);
                resolvePromise(promise, value[symbolState], value[symbolValue]);
            }
            else if (state !== REJECTED && typeof then === 'function') {
                try {
                    then.apply(value, [
                        onceWrapper(makeResolver(promise, state)), onceWrapper(makeResolver(promise, false))
                    ]);
                }
                catch (err) {
                    onceWrapper(function () {
                        resolvePromise(promise, false, err);
                    })();
                }
            }
            else {
                promise[symbolState] = state;
                var queue = promise[symbolValue];
                promise[symbolValue] = value;
                // record task information in value when error occurs, so we can
                // do some additional work such as render longStackTrace
                if (state === REJECTED && value instanceof Error) {
                    value[__symbol__('currentTask')] = Zone.currentTask;
                }
                for (var i = 0; i < queue.length;) {
                    scheduleResolveOrReject(promise, queue[i++], queue[i++], queue[i++], queue[i++]);
                }
                if (queue.length == 0 && state == REJECTED) {
                    promise[symbolState] = REJECTED_NO_CATCH;
                    try {
                        throw new Error('Uncaught (in promise): ' + value +
                            (value && value.stack ? '\n' + value.stack : ''));
                    }
                    catch (err) {
                        var error_1 = err;
                        error_1.rejection = value;
                        error_1.promise = promise;
                        error_1.zone = Zone.current;
                        error_1.task = Zone.currentTask;
                        _uncaughtPromiseErrors.push(error_1);
                        scheduleQueueDrain();
                    }
                }
            }
        }
        // Resolving an already resolved promise is a noop.
        return promise;
    }
    function clearRejectedNoCatch(promise) {
        if (promise[symbolState] === REJECTED_NO_CATCH) {
            // if the promise is rejected no catch status
            // and queue.length > 0, means there is a error handler
            // here to handle the rejected promise, we should trigger
            // windows.rejectionhandled eventHandler or nodejs rejectionHandled
            // eventHandler
            try {
                var handler = Zone[__symbol__('rejectionHandledHandler')];
                if (handler && typeof handler === 'function') {
                    handler.apply(this, [{ rejection: promise[symbolValue], promise: promise }]);
                }
            }
            catch (err) {
            }
            promise[symbolState] = REJECTED;
            for (var i = 0; i < _uncaughtPromiseErrors.length; i++) {
                if (promise === _uncaughtPromiseErrors[i].promise) {
                    _uncaughtPromiseErrors.splice(i, 1);
                }
            }
        }
    }
    function scheduleResolveOrReject(promise, zone, chainPromise, onFulfilled, onRejected) {
        clearRejectedNoCatch(promise);
        var delegate = promise[symbolState] ?
            (typeof onFulfilled === 'function') ? onFulfilled : forwardResolution :
            (typeof onRejected === 'function') ? onRejected : forwardRejection;
        zone.scheduleMicroTask(source, function () {
            try {
                resolvePromise(chainPromise, true, zone.run(delegate, undefined, [promise[symbolValue]]));
            }
            catch (error) {
                resolvePromise(chainPromise, false, error);
            }
        });
    }
    var ZoneAwarePromise = (function () {
        function ZoneAwarePromise(executor) {
            var promise = this;
            if (!(promise instanceof ZoneAwarePromise)) {
                throw new Error('Must be an instanceof Promise.');
            }
            promise[symbolState] = UNRESOLVED;
            promise[symbolValue] = []; // queue;
            try {
                executor && executor(makeResolver(promise, RESOLVED), makeResolver(promise, REJECTED));
            }
            catch (error) {
                resolvePromise(promise, false, error);
            }
        }
        ZoneAwarePromise.toString = function () {
            return 'function ZoneAwarePromise() { [native code] }';
        };
        ZoneAwarePromise.resolve = function (value) {
            return resolvePromise(new this(null), RESOLVED, value);
        };
        ZoneAwarePromise.reject = function (error) {
            return resolvePromise(new this(null), REJECTED, error);
        };
        ZoneAwarePromise.race = function (values) {
            var resolve;
            var reject;
            var promise = new this(function (res, rej) {
                _a = [res, rej], resolve = _a[0], reject = _a[1];
                var _a;
            });
            function onResolve(value) {
                promise && (promise = null || resolve(value));
            }
            function onReject(error) {
                promise && (promise = null || reject(error));
            }
            for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
                var value = values_1[_i];
                if (!isThenable(value)) {
                    value = this.resolve(value);
                }
                value.then(onResolve, onReject);
            }
            return promise;
        };
        ZoneAwarePromise.all = function (values) {
            var resolve;
            var reject;
            var promise = new this(function (res, rej) {
                resolve = res;
                reject = rej;
            });
            var count = 0;
            var resolvedValues = [];
            for (var _i = 0, values_2 = values; _i < values_2.length; _i++) {
                var value = values_2[_i];
                if (!isThenable(value)) {
                    value = this.resolve(value);
                }
                value.then((function (index) { return function (value) {
                    resolvedValues[index] = value;
                    count--;
                    if (!count) {
                        resolve(resolvedValues);
                    }
                }; })(count), reject);
                count++;
            }
            if (!count)
                resolve(resolvedValues);
            return promise;
        };
        ZoneAwarePromise.prototype.then = function (onFulfilled, onRejected) {
            var chainPromise = new this.constructor(null);
            var zone = Zone.current;
            if (this[symbolState] == UNRESOLVED) {
                this[symbolValue].push(zone, chainPromise, onFulfilled, onRejected);
            }
            else {
                scheduleResolveOrReject(this, zone, chainPromise, onFulfilled, onRejected);
            }
            return chainPromise;
        };
        ZoneAwarePromise.prototype.catch = function (onRejected) {
            return this.then(null, onRejected);
        };
        return ZoneAwarePromise;
    }());
    // Protect against aggressive optimizers dropping seemingly unused properties.
    // E.g. Closure Compiler in advanced mode.
    ZoneAwarePromise['resolve'] = ZoneAwarePromise.resolve;
    ZoneAwarePromise['reject'] = ZoneAwarePromise.reject;
    ZoneAwarePromise['race'] = ZoneAwarePromise.race;
    ZoneAwarePromise['all'] = ZoneAwarePromise.all;
    var NativePromise = global[symbolPromise] = global['Promise'];
    global['Promise'] = ZoneAwarePromise;
    var symbolThenPatched = __symbol__('thenPatched');
    function patchThen(Ctor) {
        var proto = Ctor.prototype;
        var originalThen = proto.then;
        // Keep a reference to the original method.
        proto[symbolThen] = originalThen;
        Ctor.prototype.then = function (onResolve, onReject) {
            var _this = this;
            var wrapped = new ZoneAwarePromise(function (resolve, reject) {
                originalThen.call(_this, resolve, reject);
            });
            return wrapped.then(onResolve, onReject);
        };
        Ctor[symbolThenPatched] = true;
    }
    function zoneify(fn) {
        return function () {
            var resultPromise = fn.apply(this, arguments);
            if (resultPromise instanceof ZoneAwarePromise) {
                return resultPromise;
            }
            var Ctor = resultPromise.constructor;
            if (!Ctor[symbolThenPatched]) {
                patchThen(Ctor);
            }
            return resultPromise;
        };
    }
    if (NativePromise) {
        patchThen(NativePromise);
        var fetch = global['fetch'];
        if (typeof fetch == 'function') {
            global['fetch'] = zoneify(fetch);
        }
    }
    // This is not part of public API, but it is usefull for tests, so we expose it.
    Promise[Zone.__symbol__('uncaughtPromiseErrors')] = _uncaughtPromiseErrors;
    /*
     * This code patches Error so that:
     *   - It ignores un-needed stack frames.
     *   - It Shows the associated Zone for reach frame.
     */
    var FrameType;
    (function (FrameType) {
        /// Skip this frame when printing out stack
        FrameType[FrameType["blackList"] = 0] = "blackList";
        /// This frame marks zone transition
        FrameType[FrameType["transition"] = 1] = "transition";
    })(FrameType || (FrameType = {}));
    var NativeError = global[__symbol__('Error')] = global.Error;
    // Store the frames which should be removed from the stack frames
    var blackListedStackFrames = {};
    // We must find the frame where Error was created, otherwise we assume we don't understand stack
    var zoneAwareFrame;
    global.Error = ZoneAwareError;
    // How should the stack frames be parsed.
    var frameParserStrategy = null;
    var stackRewrite = 'stackRewrite';
    // fix #595, create property descriptor
    // for error properties
    var createProperty = function (props, key) {
        // if property is already defined, skip it.
        if (props[key]) {
            return;
        }
        // define a local property
        // in case error property is not settable
        var name = __symbol__(key);
        props[key] = {
            configurable: true,
            enumerable: true,
            get: function () {
                // if local property has no value
                // use internal error's property value
                if (!this[name]) {
                    var error_2 = this[__symbol__('error')];
                    if (error_2) {
                        this[name] = error_2[key];
                    }
                }
                return this[name];
            },
            set: function (value) {
                // setter will set value to local property value
                this[name] = value;
            }
        };
    };
    // fix #595, create property descriptor
    // for error method properties
    var createMethodProperty = function (props, key) {
        if (props[key]) {
            return;
        }
        props[key] = {
            configurable: true,
            enumerable: true,
            writable: true,
            value: function () {
                var error = this[__symbol__('error')];
                var errorMethod = (error && error[key]) || this[key];
                if (errorMethod) {
                    return errorMethod.apply(error, arguments);
                }
            }
        };
    };
    var createErrorProperties = function () {
        var props = Object.create(null);
        var error = new NativeError();
        var keys = Object.getOwnPropertyNames(error);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(error, key)) {
                createProperty(props, key);
            }
        }
        var proto = NativeError.prototype;
        if (proto) {
            var pKeys = Object.getOwnPropertyNames(proto);
            for (var i = 0; i < pKeys.length; i++) {
                var key = pKeys[i];
                // skip constructor
                if (key !== 'constructor' && key !== 'toString' && key !== 'toSource') {
                    createProperty(props, key);
                }
            }
        }
        // some other properties are not
        // in NativeError
        createProperty(props, 'originalStack');
        createProperty(props, 'zoneAwareStack');
        // define toString, toSource as method property
        createMethodProperty(props, 'toString');
        createMethodProperty(props, 'toSource');
        return props;
    };
    var errorProperties = createErrorProperties();
    // for derived Error class which extends ZoneAwareError
    // we should not override the derived class's property
    // so we create a new props object only copy the properties
    // from errorProperties which not exist in derived Error's prototype
    var getErrorPropertiesForPrototype = function (prototype) {
        // if the prototype is ZoneAwareError.prototype
        // we just return the prebuilt errorProperties.
        if (prototype === ZoneAwareError.prototype) {
            return errorProperties;
        }
        var newProps = Object.create(null);
        var cKeys = Object.getOwnPropertyNames(errorProperties);
        var keys = Object.getOwnPropertyNames(prototype);
        cKeys.forEach(function (cKey) {
            if (keys.filter(function (key) {
                return key === cKey;
            })
                .length === 0) {
                newProps[cKey] = errorProperties[cKey];
            }
        });
        return newProps;
    };
    /**
     * This is ZoneAwareError which processes the stack frame and cleans up extra frames as well as
     * adds zone information to it.
     */
    function ZoneAwareError() {
        // make sure we have a valid this
        // if this is undefined(call Error without new) or this is global
        // or this is some other objects, we should force to create a
        // valid ZoneAwareError by call Object.create()
        if (!(this instanceof ZoneAwareError)) {
            return ZoneAwareError.apply(Object.create(ZoneAwareError.prototype), arguments);
        }
        // Create an Error.
        var error = NativeError.apply(this, arguments);
        this[__symbol__('error')] = error;
        // Save original stack trace
        error.originalStack = error.stack;
        // Process the stack trace and rewrite the frames.
        if (ZoneAwareError[stackRewrite] && error.originalStack) {
            var frames_1 = error.originalStack.split('\n');
            var zoneFrame = _currentZoneFrame;
            var i = 0;
            // Find the first frame
            while (frames_1[i] !== zoneAwareFrame && i < frames_1.length) {
                i++;
            }
            for (; i < frames_1.length && zoneFrame; i++) {
                var frame = frames_1[i];
                if (frame.trim()) {
                    var frameType = blackListedStackFrames.hasOwnProperty(frame) && blackListedStackFrames[frame];
                    if (frameType === FrameType.blackList) {
                        frames_1.splice(i, 1);
                        i--;
                    }
                    else if (frameType === FrameType.transition) {
                        if (zoneFrame.parent) {
                            // This is the special frame where zone changed. Print and process it accordingly
                            frames_1[i] += " [" + zoneFrame.parent.zone.name + " => " + zoneFrame.zone.name + "]";
                            zoneFrame = zoneFrame.parent;
                        }
                        else {
                            zoneFrame = null;
                        }
                    }
                    else {
                        frames_1[i] += " [" + zoneFrame.zone.name + "]";
                    }
                }
            }
            error.stack = error.zoneAwareStack = frames_1.join('\n');
        }
        // use defineProperties here instead of copy property value
        // because of issue #595 which will break angular2.
        Object.defineProperties(this, getErrorPropertiesForPrototype(Object.getPrototypeOf(this)));
        return this;
    }
    // Copy the prototype so that instanceof operator works as expected
    ZoneAwareError.prototype = NativeError.prototype;
    ZoneAwareError[Zone.__symbol__('blacklistedStackFrames')] = blackListedStackFrames;
    ZoneAwareError[stackRewrite] = false;
    // those properties need special handling
    var specialPropertyNames = ['stackTraceLimit', 'captureStackTrace', 'prepareStackTrace'];
    // those properties of NativeError should be set to ZoneAwareError
    var nativeErrorProperties = Object.keys(NativeError);
    if (nativeErrorProperties) {
        nativeErrorProperties.forEach(function (prop) {
            if (specialPropertyNames.filter(function (sp) { return sp === prop; }).length === 0) {
                Object.defineProperty(ZoneAwareError, prop, {
                    get: function () {
                        return NativeError[prop];
                    },
                    set: function (value) {
                        NativeError[prop] = value;
                    }
                });
            }
        });
    }
    if (NativeError.hasOwnProperty('stackTraceLimit')) {
        // Extend default stack limit as we will be removing few frames.
        NativeError.stackTraceLimit = Math.max(NativeError.stackTraceLimit, 15);
        // make sure that ZoneAwareError has the same property which forwards to NativeError.
        Object.defineProperty(ZoneAwareError, 'stackTraceLimit', {
            get: function () {
                return NativeError.stackTraceLimit;
            },
            set: function (value) {
                return NativeError.stackTraceLimit = value;
            }
        });
    }
    if (NativeError.hasOwnProperty('captureStackTrace')) {
        Object.defineProperty(ZoneAwareError, 'captureStackTrace', {
            // add named function here because we need to remove this
            // stack frame when prepareStackTrace below
            value: function zoneCaptureStackTrace(targetObject, constructorOpt) {
                NativeError.captureStackTrace(targetObject, constructorOpt);
            }
        });
    }
    Object.defineProperty(ZoneAwareError, 'prepareStackTrace', {
        get: function () {
            return NativeError.prepareStackTrace;
        },
        set: function (value) {
            if (!value || typeof value !== 'function') {
                return NativeError.prepareStackTrace = value;
            }
            return NativeError.prepareStackTrace = function (error, structuredStackTrace) {
                // remove additional stack information from ZoneAwareError.captureStackTrace
                if (structuredStackTrace) {
                    for (var i = 0; i < structuredStackTrace.length; i++) {
                        var st = structuredStackTrace[i];
                        // remove the first function which name is zoneCaptureStackTrace
                        if (st.getFunctionName() === 'zoneCaptureStackTrace') {
                            structuredStackTrace.splice(i, 1);
                            break;
                        }
                    }
                }
                return value.apply(this, [error, structuredStackTrace]);
            };
        }
    });
    // Now we need to populet the `blacklistedStackFrames` as well as find the
    // run/runGuraded/runTask frames. This is done by creating a detect zone and then threading
    // the execution through all of the above methods so that we can look at the stack trace and
    // find the frames of interest.
    var detectZone = Zone.current.fork({
        name: 'detect',
        onInvoke: function (parentZoneDelegate, currentZone, targetZone, delegate, applyThis, applyArgs, source) {
            // Here only so that it will show up in the stack frame so that it can be black listed.
            return parentZoneDelegate.invoke(targetZone, delegate, applyThis, applyArgs, source);
        },
        onHandleError: function (parentZD, current, target, error) {
            if (error.originalStack && Error === ZoneAwareError) {
                var frames_2 = error.originalStack.split(/\n/);
                var runFrame = false, runGuardedFrame = false, runTaskFrame = false;
                while (frames_2.length) {
                    var frame = frames_2.shift();
                    // On safari it is possible to have stack frame with no line number.
                    // This check makes sure that we don't filter frames on name only (must have
                    // linenumber)
                    if (/:\d+:\d+/.test(frame)) {
                        // Get rid of the path so that we don't accidintely find function name in path.
                        // In chrome the seperator is `(` and `@` in FF and safari
                        // Chrome: at Zone.run (zone.js:100)
                        // Chrome: at Zone.run (http://localhost:9876/base/build/lib/zone.js:100:24)
                        // FireFox: Zone.prototype.run@http://localhost:9876/base/build/lib/zone.js:101:24
                        // Safari: run@http://localhost:9876/base/build/lib/zone.js:101:24
                        var fnName = frame.split('(')[0].split('@')[0];
                        var frameType = FrameType.transition;
                        if (fnName.indexOf('ZoneAwareError') !== -1) {
                            zoneAwareFrame = frame;
                        }
                        if (fnName.indexOf('runGuarded') !== -1) {
                            runGuardedFrame = true;
                        }
                        else if (fnName.indexOf('runTask') !== -1) {
                            runTaskFrame = true;
                        }
                        else if (fnName.indexOf('run') !== -1) {
                            runFrame = true;
                        }
                        else {
                            frameType = FrameType.blackList;
                        }
                        blackListedStackFrames[frame] = frameType;
                        // Once we find all of the frames we can stop looking.
                        if (runFrame && runGuardedFrame && runTaskFrame) {
                            ZoneAwareError[stackRewrite] = true;
                            break;
                        }
                    }
                }
            }
            return false;
        }
    });
    // carefully constructor a stack frame which contains all of the frames of interest which
    // need to be detected and blacklisted.
    var detectRunFn = function () {
        detectZone.run(function () {
            detectZone.runGuarded(function () {
                throw new Error('blacklistStackFrames');
            });
        });
    };
    // Cause the error to extract the stack frames.
    detectZone.runTask(detectZone.scheduleMacroTask('detect', detectRunFn, null, function () { return null; }, null));
    return global['Zone'] = Zone;
})(typeof window === 'object' && window || typeof self === 'object' && self || global);

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Suppress closure compiler errors about unknown 'Zone' variable
 * @fileoverview
 * @suppress {undefinedVars,globalThis}
 */
var zoneSymbol = function (n) { return ("__zone_symbol__" + n); };
var _global$1 = typeof window === 'object' && window || typeof self === 'object' && self || global;
function bindArguments(args, source) {
    for (var i = args.length - 1; i >= 0; i--) {
        if (typeof args[i] === 'function') {
            args[i] = Zone.current.wrap(args[i], source + '_' + i);
        }
    }
    return args;
}
function patchPrototype(prototype, fnNames) {
    var source = prototype.constructor['name'];
    var _loop_1 = function(i) {
        var name_1 = fnNames[i];
        var delegate = prototype[name_1];
        if (delegate) {
            prototype[name_1] = (function (delegate) {
                return function () {
                    return delegate.apply(this, bindArguments(arguments, source + '.' + name_1));
                };
            })(delegate);
        }
    };
    for (var i = 0; i < fnNames.length; i++) {
        _loop_1(i);
    }
}
var isWebWorker = (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope);
var isNode = (!('nw' in _global$1) && typeof process !== 'undefined' &&
    {}.toString.call(process) === '[object process]');
var isBrowser = !isNode && !isWebWorker && !!(typeof window !== 'undefined' && window['HTMLElement']);
// we are in electron of nw, so we are both browser and nodejs
var isMix = typeof process !== 'undefined' &&
    {}.toString.call(process) === '[object process]' && !isWebWorker &&
    !!(typeof window !== 'undefined' && window['HTMLElement']);
function patchProperty(obj, prop) {
    var desc = Object.getOwnPropertyDescriptor(obj, prop) || { enumerable: true, configurable: true };
    var originalDesc = Object.getOwnPropertyDescriptor(obj, 'original' + prop);
    if (!originalDesc && desc.get) {
        Object.defineProperty(obj, 'original' + prop, { enumerable: false, configurable: true, get: desc.get });
    }
    // A property descriptor cannot have getter/setter and be writable
    // deleting the writable and value properties avoids this error:
    //
    // TypeError: property descriptors must not specify a value or be writable when a
    // getter or setter has been specified
    delete desc.writable;
    delete desc.value;
    // substr(2) cuz 'onclick' -> 'click', etc
    var eventName = prop.substr(2);
    var _prop = zoneSymbol('_' + prop);
    desc.set = function (fn) {
        if (this[_prop]) {
            this.removeEventListener(eventName, this[_prop]);
        }
        if (typeof fn === 'function') {
            var wrapFn = function (event) {
                var result;
                result = fn.apply(this, arguments);
                if (result != undefined && !result)
                    event.preventDefault();
            };
            this[_prop] = wrapFn;
            this.addEventListener(eventName, wrapFn, false);
        }
        else {
            this[_prop] = null;
        }
    };
    // The getter would return undefined for unassigned properties but the default value of an
    // unassigned property is null
    desc.get = function () {
        var r = this[_prop] || null;
        // result will be null when use inline event attribute,
        // such as <button onclick="func();">OK</button>
        // because the onclick function is internal raw uncompiled handler
        // the onclick will be evaluated when first time event was triggered or
        // the property is accessed, https://github.com/angular/zone.js/issues/525
        // so we should use original native get to retrieve the handler
        if (r === null) {
            if (originalDesc && originalDesc.get) {
                r = originalDesc.get.apply(this, arguments);
                if (r) {
                    desc.set.apply(this, [r]);
                    if (typeof this['removeAttribute'] === 'function') {
                        this.removeAttribute(prop);
                    }
                }
            }
        }
        return this[_prop] || null;
    };
    Object.defineProperty(obj, prop, desc);
}

function patchOnProperties(obj, properties) {
    var onProperties = [];
    for (var prop in obj) {
        if (prop.substr(0, 2) == 'on') {
            onProperties.push(prop);
        }
    }
    for (var j = 0; j < onProperties.length; j++) {
        patchProperty(obj, onProperties[j]);
    }
    if (properties) {
        for (var i = 0; i < properties.length; i++) {
            patchProperty(obj, 'on' + properties[i]);
        }
    }
}

var EVENT_TASKS = zoneSymbol('eventTasks');
// For EventTarget
var ADD_EVENT_LISTENER = 'addEventListener';
var REMOVE_EVENT_LISTENER = 'removeEventListener';
function findExistingRegisteredTask(target, handler, name, capture, remove) {
    var eventTasks = target[EVENT_TASKS];
    if (eventTasks) {
        for (var i = 0; i < eventTasks.length; i++) {
            var eventTask = eventTasks[i];
            var data = eventTask.data;
            var listener = data.handler;
            if ((data.handler === handler || listener.listener === handler) &&
                data.useCapturing === capture && data.eventName === name) {
                if (remove) {
                    eventTasks.splice(i, 1);
                }
                return eventTask;
            }
        }
    }
    return null;
}
function attachRegisteredEvent(target, eventTask, isPrepend) {
    var eventTasks = target[EVENT_TASKS];
    if (!eventTasks) {
        eventTasks = target[EVENT_TASKS] = [];
    }
    if (isPrepend) {
        eventTasks.unshift(eventTask);
    }
    else {
        eventTasks.push(eventTask);
    }
}
var defaultListenerMetaCreator = function (self, args) {
    return {
        useCapturing: args[2],
        eventName: args[0],
        handler: args[1],
        target: self || _global$1,
        name: args[0],
        invokeAddFunc: function (addFnSymbol, delegate) {
            if (delegate && delegate.invoke) {
                return this.target[addFnSymbol](this.eventName, delegate.invoke, this.useCapturing);
            }
            else {
                return this.target[addFnSymbol](this.eventName, delegate, this.useCapturing);
            }
        },
        invokeRemoveFunc: function (removeFnSymbol, delegate) {
            if (delegate && delegate.invoke) {
                return this.target[removeFnSymbol](this.eventName, delegate.invoke, this.useCapturing);
            }
            else {
                return this.target[removeFnSymbol](this.eventName, delegate, this.useCapturing);
            }
        }
    };
};
function makeZoneAwareAddListener(addFnName, removeFnName, useCapturingParam, allowDuplicates, isPrepend, metaCreator) {
    if (useCapturingParam === void 0) { useCapturingParam = true; }
    if (allowDuplicates === void 0) { allowDuplicates = false; }
    if (isPrepend === void 0) { isPrepend = false; }
    if (metaCreator === void 0) { metaCreator = defaultListenerMetaCreator; }
    var addFnSymbol = zoneSymbol(addFnName);
    var removeFnSymbol = zoneSymbol(removeFnName);
    var defaultUseCapturing = useCapturingParam ? false : undefined;
    function scheduleEventListener(eventTask) {
        var meta = eventTask.data;
        attachRegisteredEvent(meta.target, eventTask, isPrepend);
        return meta.invokeAddFunc(addFnSymbol, eventTask);
    }
    function cancelEventListener(eventTask) {
        var meta = eventTask.data;
        findExistingRegisteredTask(meta.target, eventTask.invoke, meta.eventName, meta.useCapturing, true);
        return meta.invokeRemoveFunc(removeFnSymbol, eventTask);
    }
    return function zoneAwareAddListener(self, args) {
        var data = metaCreator(self, args);
        data.useCapturing = data.useCapturing || defaultUseCapturing;
        // - Inside a Web Worker, `this` is undefined, the context is `global`
        // - When `addEventListener` is called on the global context in strict mode, `this` is undefined
        // see https://github.com/angular/zone.js/issues/190
        var delegate = null;
        if (typeof data.handler == 'function') {
            delegate = data.handler;
        }
        else if (data.handler && data.handler.handleEvent) {
            delegate = function (event) { return data.handler.handleEvent(event); };
        }
        var validZoneHandler = false;
        try {
            // In cross site contexts (such as WebDriver frameworks like Selenium),
            // accessing the handler object here will cause an exception to be thrown which
            // will fail tests prematurely.
            validZoneHandler = data.handler && data.handler.toString() === '[object FunctionWrapper]';
        }
        catch (error) {
            // Returning nothing here is fine, because objects in a cross-site context are unusable
            return;
        }
        // Ignore special listeners of IE11 & Edge dev tools, see
        // https://github.com/angular/zone.js/issues/150
        if (!delegate || validZoneHandler) {
            return data.invokeAddFunc(addFnSymbol, data.handler);
        }
        if (!allowDuplicates) {
            var eventTask = findExistingRegisteredTask(data.target, data.handler, data.eventName, data.useCapturing, false);
            if (eventTask) {
                // we already registered, so this will have noop.
                return data.invokeAddFunc(addFnSymbol, eventTask);
            }
        }
        var zone = Zone.current;
        var source = data.target.constructor['name'] + '.' + addFnName + ':' + data.eventName;
        zone.scheduleEventTask(source, delegate, data, scheduleEventListener, cancelEventListener);
    };
}
function makeZoneAwareRemoveListener(fnName, useCapturingParam, metaCreator) {
    if (useCapturingParam === void 0) { useCapturingParam = true; }
    if (metaCreator === void 0) { metaCreator = defaultListenerMetaCreator; }
    var symbol = zoneSymbol(fnName);
    var defaultUseCapturing = useCapturingParam ? false : undefined;
    return function zoneAwareRemoveListener(self, args) {
        var data = metaCreator(self, args);
        data.useCapturing = data.useCapturing || defaultUseCapturing;
        // - Inside a Web Worker, `this` is undefined, the context is `global`
        // - When `addEventListener` is called on the global context in strict mode, `this` is undefined
        // see https://github.com/angular/zone.js/issues/190
        var eventTask = findExistingRegisteredTask(data.target, data.handler, data.eventName, data.useCapturing, true);
        if (eventTask) {
            eventTask.zone.cancelTask(eventTask);
        }
        else {
            data.invokeRemoveFunc(symbol, data.handler);
        }
    };
}


var zoneAwareAddEventListener = makeZoneAwareAddListener(ADD_EVENT_LISTENER, REMOVE_EVENT_LISTENER);
var zoneAwareRemoveEventListener = makeZoneAwareRemoveListener(REMOVE_EVENT_LISTENER);
function patchEventTargetMethods(obj, addFnName, removeFnName, metaCreator) {
    if (addFnName === void 0) { addFnName = ADD_EVENT_LISTENER; }
    if (removeFnName === void 0) { removeFnName = REMOVE_EVENT_LISTENER; }
    if (metaCreator === void 0) { metaCreator = defaultListenerMetaCreator; }
    if (obj && obj[addFnName]) {
        patchMethod(obj, addFnName, function () { return makeZoneAwareAddListener(addFnName, removeFnName, true, false, false, metaCreator); });
        patchMethod(obj, removeFnName, function () { return makeZoneAwareRemoveListener(removeFnName, true, metaCreator); });
        return true;
    }
    else {
        return false;
    }
}
var originalInstanceKey = zoneSymbol('originalInstance');
// wrap some native API on `window`
function patchClass(className) {
    var OriginalClass = _global$1[className];
    if (!OriginalClass)
        return;
    _global$1[className] = function () {
        var a = bindArguments(arguments, className);
        switch (a.length) {
            case 0:
                this[originalInstanceKey] = new OriginalClass();
                break;
            case 1:
                this[originalInstanceKey] = new OriginalClass(a[0]);
                break;
            case 2:
                this[originalInstanceKey] = new OriginalClass(a[0], a[1]);
                break;
            case 3:
                this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2]);
                break;
            case 4:
                this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2], a[3]);
                break;
            default:
                throw new Error('Arg list too long.');
        }
    };
    var instance = new OriginalClass(function () { });
    var prop;
    for (prop in instance) {
        // https://bugs.webkit.org/show_bug.cgi?id=44721
        if (className === 'XMLHttpRequest' && prop === 'responseBlob')
            continue;
        (function (prop) {
            if (typeof instance[prop] === 'function') {
                _global$1[className].prototype[prop] = function () {
                    return this[originalInstanceKey][prop].apply(this[originalInstanceKey], arguments);
                };
            }
            else {
                Object.defineProperty(_global$1[className].prototype, prop, {
                    set: function (fn) {
                        if (typeof fn === 'function') {
                            this[originalInstanceKey][prop] = Zone.current.wrap(fn, className + '.' + prop);
                        }
                        else {
                            this[originalInstanceKey][prop] = fn;
                        }
                    },
                    get: function () {
                        return this[originalInstanceKey][prop];
                    }
                });
            }
        }(prop));
    }
    for (prop in OriginalClass) {
        if (prop !== 'prototype' && OriginalClass.hasOwnProperty(prop)) {
            _global$1[className][prop] = OriginalClass[prop];
        }
    }
}

function createNamedFn(name, delegate) {
    try {
        return (Function('f', "return function " + name + "(){return f(this, arguments)}"))(delegate);
    }
    catch (error) {
        // if we fail, we must be CSP, just return delegate.
        return function () {
            return delegate(this, arguments);
        };
    }
}
function patchMethod(target, name, patchFn) {
    var proto = target;
    while (proto && Object.getOwnPropertyNames(proto).indexOf(name) === -1) {
        proto = Object.getPrototypeOf(proto);
    }
    if (!proto && target[name]) {
        // somehow we did not find it, but we can see it. This happens on IE for Window properties.
        proto = target;
    }
    var delegateName = zoneSymbol(name);
    var delegate;
    if (proto && !(delegate = proto[delegateName])) {
        delegate = proto[delegateName] = proto[name];
        proto[name] = createNamedFn(name, patchFn(delegate, delegateName, name));
    }
    return delegate;
}
// TODO: @JiaLiPassion, support cancel task later if necessary


function findEventTask(target, evtName) {
    var eventTasks = target[zoneSymbol('eventTasks')];
    var result = [];
    if (eventTasks) {
        for (var i = 0; i < eventTasks.length; i++) {
            var eventTask = eventTasks[i];
            var data = eventTask.data;
            var eventName = data && data.eventName;
            if (eventName === evtName) {
                result.push(eventTask);
            }
        }
    }
    return result;
}
Zone[zoneSymbol('patchEventTargetMethods')] = patchEventTargetMethods;
Zone[zoneSymbol('patchOnProperties')] = patchOnProperties;

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function patchTimer(window, setName, cancelName, nameSuffix) {
    var setNative = null;
    var clearNative = null;
    setName += nameSuffix;
    cancelName += nameSuffix;
    var tasksByHandleId = {};
    function scheduleTask(task) {
        var data = task.data;
        data.args[0] = function () {
            try {
                task.invoke.apply(this, arguments);
            }
            finally {
                delete tasksByHandleId[data.handleId];
            }
        };
        data.handleId = setNative.apply(window, data.args);
        tasksByHandleId[data.handleId] = task;
        return task;
    }
    function clearTask(task) {
        delete tasksByHandleId[task.data.handleId];
        return clearNative(task.data.handleId);
    }
    setNative =
        patchMethod(window, setName, function (delegate) { return function (self, args) {
            if (typeof args[0] === 'function') {
                var zone = Zone.current;
                var options = {
                    handleId: null,
                    isPeriodic: nameSuffix === 'Interval',
                    delay: (nameSuffix === 'Timeout' || nameSuffix === 'Interval') ? args[1] || 0 : null,
                    args: args
                };
                var task = zone.scheduleMacroTask(setName, args[0], options, scheduleTask, clearTask);
                if (!task) {
                    return task;
                }
                // Node.js must additionally support the ref and unref functions.
                var handle = task.data.handleId;
                // check whether handle is null, because some polyfill or browser
                // may return undefined from setTimeout/setInterval/setImmediate/requestAnimationFrame
                if (handle && handle.ref && handle.unref && typeof handle.ref === 'function' &&
                    typeof handle.unref === 'function') {
                    task.ref = handle.ref.bind(handle);
                    task.unref = handle.unref.bind(handle);
                }
                return task;
            }
            else {
                // cause an error by calling it directly.
                return delegate.apply(window, args);
            }
        }; });
    clearNative =
        patchMethod(window, cancelName, function (delegate) { return function (self, args) {
            var task = typeof args[0] === 'number' ? tasksByHandleId[args[0]] : args[0];
            if (task && typeof task.type === 'string') {
                if (task.state !== 'notScheduled' &&
                    (task.cancelFn && task.data.isPeriodic || task.runCount === 0)) {
                    // Do not cancel already canceled functions
                    task.zone.cancelTask(task);
                }
            }
            else {
                // cause an error by calling it directly.
                delegate.apply(window, args);
            }
        }; });
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/*
 * This is necessary for Chrome and Chrome mobile, to enable
 * things like redefining `createdCallback` on an element.
 */
var _defineProperty = Object[zoneSymbol('defineProperty')] = Object.defineProperty;
var _getOwnPropertyDescriptor = Object[zoneSymbol('getOwnPropertyDescriptor')] =
    Object.getOwnPropertyDescriptor;
var _create = Object.create;
var unconfigurablesKey = zoneSymbol('unconfigurables');
function propertyPatch() {
    Object.defineProperty = function (obj, prop, desc) {
        if (isUnconfigurable(obj, prop)) {
            throw new TypeError('Cannot assign to read only property \'' + prop + '\' of ' + obj);
        }
        var originalConfigurableFlag = desc.configurable;
        if (prop !== 'prototype') {
            desc = rewriteDescriptor(obj, prop, desc);
        }
        return _tryDefineProperty(obj, prop, desc, originalConfigurableFlag);
    };
    Object.defineProperties = function (obj, props) {
        Object.keys(props).forEach(function (prop) {
            Object.defineProperty(obj, prop, props[prop]);
        });
        return obj;
    };
    Object.create = function (obj, proto) {
        if (typeof proto === 'object' && !Object.isFrozen(proto)) {
            Object.keys(proto).forEach(function (prop) {
                proto[prop] = rewriteDescriptor(obj, prop, proto[prop]);
            });
        }
        return _create(obj, proto);
    };
    Object.getOwnPropertyDescriptor = function (obj, prop) {
        var desc = _getOwnPropertyDescriptor(obj, prop);
        if (isUnconfigurable(obj, prop)) {
            desc.configurable = false;
        }
        return desc;
    };
}

function _redefineProperty(obj, prop, desc) {
    var originalConfigurableFlag = desc.configurable;
    desc = rewriteDescriptor(obj, prop, desc);
    return _tryDefineProperty(obj, prop, desc, originalConfigurableFlag);
}

function isUnconfigurable(obj, prop) {
    return obj && obj[unconfigurablesKey] && obj[unconfigurablesKey][prop];
}
function rewriteDescriptor(obj, prop, desc) {
    desc.configurable = true;
    if (!desc.configurable) {
        if (!obj[unconfigurablesKey]) {
            _defineProperty(obj, unconfigurablesKey, { writable: true, value: {} });
        }
        obj[unconfigurablesKey][prop] = true;
    }
    return desc;
}
function _tryDefineProperty(obj, prop, desc, originalConfigurableFlag) {
    try {
        return _defineProperty(obj, prop, desc);
    }
    catch (error) {
        if (desc.configurable) {
            // In case of errors, when the configurable flag was likely set by rewriteDescriptor(), let's
            // retry with the original flag value
            if (typeof originalConfigurableFlag == 'undefined') {
                delete desc.configurable;
            }
            else {
                desc.configurable = originalConfigurableFlag;
            }
            try {
                return _defineProperty(obj, prop, desc);
            }
            catch (error) {
                var descJson = null;
                try {
                    descJson = JSON.stringify(desc);
                }
                catch (error) {
                    descJson = descJson.toString();
                }
                console.log("Attempting to configure '" + prop + "' with descriptor '" + descJson + "' on object '" + obj + "' and got error, giving up: " + error);
            }
        }
        else {
            throw error;
        }
    }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var WTF_ISSUE_555 = 'Anchor,Area,Audio,BR,Base,BaseFont,Body,Button,Canvas,Content,DList,Directory,Div,Embed,FieldSet,Font,Form,Frame,FrameSet,HR,Head,Heading,Html,IFrame,Image,Input,Keygen,LI,Label,Legend,Link,Map,Marquee,Media,Menu,Meta,Meter,Mod,OList,Object,OptGroup,Option,Output,Paragraph,Pre,Progress,Quote,Script,Select,Source,Span,Style,TableCaption,TableCell,TableCol,Table,TableRow,TableSection,TextArea,Title,Track,UList,Unknown,Video';
var NO_EVENT_TARGET = 'ApplicationCache,EventSource,FileReader,InputMethodContext,MediaController,MessagePort,Node,Performance,SVGElementInstance,SharedWorker,TextTrack,TextTrackCue,TextTrackList,WebKitNamedFlow,Window,Worker,WorkerGlobalScope,XMLHttpRequest,XMLHttpRequestEventTarget,XMLHttpRequestUpload,IDBRequest,IDBOpenDBRequest,IDBDatabase,IDBTransaction,IDBCursor,DBIndex,WebSocket'
    .split(',');
var EVENT_TARGET = 'EventTarget';
function eventTargetPatch(_global) {
    var apis = [];
    var isWtf = _global['wtf'];
    if (isWtf) {
        // Workaround for: https://github.com/google/tracing-framework/issues/555
        apis = WTF_ISSUE_555.split(',').map(function (v) { return 'HTML' + v + 'Element'; }).concat(NO_EVENT_TARGET);
    }
    else if (_global[EVENT_TARGET]) {
        apis.push(EVENT_TARGET);
    }
    else {
        // Note: EventTarget is not available in all browsers,
        // if it's not available, we instead patch the APIs in the IDL that inherit from EventTarget
        apis = NO_EVENT_TARGET;
    }
    for (var i = 0; i < apis.length; i++) {
        var type = _global[apis[i]];
        patchEventTargetMethods(type && type.prototype);
    }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// we have to patch the instance since the proto is non-configurable
function apply(_global) {
    var WS = _global.WebSocket;
    // On Safari window.EventTarget doesn't exist so need to patch WS add/removeEventListener
    // On older Chrome, no need since EventTarget was already patched
    if (!_global.EventTarget) {
        patchEventTargetMethods(WS.prototype);
    }
    _global.WebSocket = function (a, b) {
        var socket = arguments.length > 1 ? new WS(a, b) : new WS(a);
        var proxySocket;
        // Safari 7.0 has non-configurable own 'onmessage' and friends properties on the socket instance
        var onmessageDesc = Object.getOwnPropertyDescriptor(socket, 'onmessage');
        if (onmessageDesc && onmessageDesc.configurable === false) {
            proxySocket = Object.create(socket);
            ['addEventListener', 'removeEventListener', 'send', 'close'].forEach(function (propName) {
                proxySocket[propName] = function () {
                    return socket[propName].apply(socket, arguments);
                };
            });
        }
        else {
            // we can patch the real socket
            proxySocket = socket;
        }
        patchOnProperties(proxySocket, ['close', 'error', 'message', 'open']);
        return proxySocket;
    };
    for (var prop in WS) {
        _global.WebSocket[prop] = WS[prop];
    }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var eventNames = 'copy cut paste abort blur focus canplay canplaythrough change click contextmenu dblclick drag dragend dragenter dragleave dragover dragstart drop durationchange emptied ended input invalid keydown keypress keyup load loadeddata loadedmetadata loadstart message mousedown mouseenter mouseleave mousemove mouseout mouseover mouseup pause play playing progress ratechange reset scroll seeked seeking select show stalled submit suspend timeupdate volumechange waiting mozfullscreenchange mozfullscreenerror mozpointerlockchange mozpointerlockerror error webglcontextrestored webglcontextlost webglcontextcreationerror'
    .split(' ');
function propertyDescriptorPatch(_global) {
    if (isNode && !isMix) {
        return;
    }
    var supportsWebSocket = typeof WebSocket !== 'undefined';
    if (canPatchViaPropertyDescriptor()) {
        // for browsers that we can patch the descriptor:  Chrome & Firefox
        if (isBrowser) {
            patchOnProperties(HTMLElement.prototype, eventNames);
        }
        patchOnProperties(XMLHttpRequest.prototype, null);
        if (typeof IDBIndex !== 'undefined') {
            patchOnProperties(IDBIndex.prototype, null);
            patchOnProperties(IDBRequest.prototype, null);
            patchOnProperties(IDBOpenDBRequest.prototype, null);
            patchOnProperties(IDBDatabase.prototype, null);
            patchOnProperties(IDBTransaction.prototype, null);
            patchOnProperties(IDBCursor.prototype, null);
        }
        if (supportsWebSocket) {
            patchOnProperties(WebSocket.prototype, null);
        }
    }
    else {
        // Safari, Android browsers (Jelly Bean)
        patchViaCapturingAllTheEvents();
        patchClass('XMLHttpRequest');
        if (supportsWebSocket) {
            apply(_global);
        }
    }
}
function canPatchViaPropertyDescriptor() {
    if ((isBrowser || isMix) && !Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'onclick') &&
        typeof Element !== 'undefined') {
        // WebKit https://bugs.webkit.org/show_bug.cgi?id=134364
        // IDL interface attributes are not configurable
        var desc = Object.getOwnPropertyDescriptor(Element.prototype, 'onclick');
        if (desc && !desc.configurable)
            return false;
    }
    var xhrDesc = Object.getOwnPropertyDescriptor(XMLHttpRequest.prototype, 'onreadystatechange');
    // add enumerable and configurable here because in opera
    // by default XMLHttpRequest.prototype.onreadystatechange is undefined
    // without adding enumerable and configurable will cause onreadystatechange
    // non-configurable
    Object.defineProperty(XMLHttpRequest.prototype, 'onreadystatechange', {
        enumerable: true,
        configurable: true,
        get: function () {
            return true;
        }
    });
    var req = new XMLHttpRequest();
    var result = !!req.onreadystatechange;
    // restore original desc
    Object.defineProperty(XMLHttpRequest.prototype, 'onreadystatechange', xhrDesc || {});
    return result;
}

var unboundKey = zoneSymbol('unbound');
// Whenever any eventListener fires, we check the eventListener target and all parents
// for `onwhatever` properties and replace them with zone-bound functions
// - Chrome (for now)
function patchViaCapturingAllTheEvents() {
    var _loop_1 = function(i) {
        var property = eventNames[i];
        var onproperty = 'on' + property;
        self.addEventListener(property, function (event) {
            var elt = event.target, bound, source;
            if (elt) {
                source = elt.constructor['name'] + '.' + onproperty;
            }
            else {
                source = 'unknown.' + onproperty;
            }
            while (elt) {
                if (elt[onproperty] && !elt[onproperty][unboundKey]) {
                    bound = Zone.current.wrap(elt[onproperty], source);
                    bound[unboundKey] = elt[onproperty];
                    elt[onproperty] = bound;
                }
                elt = elt.parentElement;
            }
        }, true);
    };
    for (var i = 0; i < eventNames.length; i++) {
        _loop_1(i);
    }
    
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function registerElementPatch(_global) {
    if ((!isBrowser && !isMix) || !('registerElement' in _global.document)) {
        return;
    }
    var _registerElement = document.registerElement;
    var callbacks = ['createdCallback', 'attachedCallback', 'detachedCallback', 'attributeChangedCallback'];
    document.registerElement = function (name, opts) {
        if (opts && opts.prototype) {
            callbacks.forEach(function (callback) {
                var source = 'Document.registerElement::' + callback;
                if (opts.prototype.hasOwnProperty(callback)) {
                    var descriptor = Object.getOwnPropertyDescriptor(opts.prototype, callback);
                    if (descriptor && descriptor.value) {
                        descriptor.value = Zone.current.wrap(descriptor.value, source);
                        _redefineProperty(opts.prototype, callback, descriptor);
                    }
                    else {
                        opts.prototype[callback] = Zone.current.wrap(opts.prototype[callback], source);
                    }
                }
                else if (opts.prototype[callback]) {
                    opts.prototype[callback] = Zone.current.wrap(opts.prototype[callback], source);
                }
            });
        }
        return _registerElement.apply(document, [name, opts]);
    };
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var set = 'set';
var clear = 'clear';
var blockingMethods = ['alert', 'prompt', 'confirm'];
var _global = typeof window === 'object' && window || typeof self === 'object' && self || global;
patchTimer(_global, set, clear, 'Timeout');
patchTimer(_global, set, clear, 'Interval');
patchTimer(_global, set, clear, 'Immediate');
patchTimer(_global, 'request', 'cancel', 'AnimationFrame');
patchTimer(_global, 'mozRequest', 'mozCancel', 'AnimationFrame');
patchTimer(_global, 'webkitRequest', 'webkitCancel', 'AnimationFrame');
for (var i = 0; i < blockingMethods.length; i++) {
    var name_1 = blockingMethods[i];
    patchMethod(_global, name_1, function (delegate, symbol, name) {
        return function (s, args) {
            return Zone.current.run(delegate, _global, args, name);
        };
    });
}
eventTargetPatch(_global);
propertyDescriptorPatch(_global);
patchClass('MutationObserver');
patchClass('WebKitMutationObserver');
patchClass('FileReader');
propertyPatch();
registerElementPatch(_global);
// Treat XMLHTTPRequest as a macrotask.
patchXHR(_global);
var XHR_TASK = zoneSymbol('xhrTask');
var XHR_SYNC = zoneSymbol('xhrSync');
var XHR_LISTENER = zoneSymbol('xhrListener');
var XHR_SCHEDULED = zoneSymbol('xhrScheduled');
function patchXHR(window) {
    function findPendingTask(target) {
        var pendingTask = target[XHR_TASK];
        return pendingTask;
    }
    function scheduleTask(task) {
        self[XHR_SCHEDULED] = false;
        var data = task.data;
        // remove existing event listener
        var listener = data.target[XHR_LISTENER];
        if (listener) {
            data.target.removeEventListener('readystatechange', listener);
        }
        var newListener = data.target[XHR_LISTENER] = function () {
            if (data.target.readyState === data.target.DONE) {
                // sometimes on some browsers XMLHttpRequest will fire onreadystatechange with
                // readyState=4 multiple times, so we need to check task state here
                if (!data.aborted && self[XHR_SCHEDULED] && task.state === 'scheduled') {
                    task.invoke();
                }
            }
        };
        data.target.addEventListener('readystatechange', newListener);
        var storedTask = data.target[XHR_TASK];
        if (!storedTask) {
            data.target[XHR_TASK] = task;
        }
        sendNative.apply(data.target, data.args);
        self[XHR_SCHEDULED] = true;
        return task;
    }
    function placeholderCallback() { }
    function clearTask(task) {
        var data = task.data;
        // Note - ideally, we would call data.target.removeEventListener here, but it's too late
        // to prevent it from firing. So instead, we store info for the event listener.
        data.aborted = true;
        return abortNative.apply(data.target, data.args);
    }
    var openNative = patchMethod(window.XMLHttpRequest.prototype, 'open', function () { return function (self, args) {
        self[XHR_SYNC] = args[2] == false;
        return openNative.apply(self, args);
    }; });
    var sendNative = patchMethod(window.XMLHttpRequest.prototype, 'send', function () { return function (self, args) {
        var zone = Zone.current;
        if (self[XHR_SYNC]) {
            // if the XHR is sync there is no task to schedule, just execute the code.
            return sendNative.apply(self, args);
        }
        else {
            var options = { target: self, isPeriodic: false, delay: null, args: args, aborted: false };
            return zone.scheduleMacroTask('XMLHttpRequest.send', placeholderCallback, options, scheduleTask, clearTask);
        }
    }; });
    var abortNative = patchMethod(window.XMLHttpRequest.prototype, 'abort', function (delegate) { return function (self, args) {
        var task = findPendingTask(self);
        if (task && typeof task.type == 'string') {
            // If the XHR has already completed, do nothing.
            // If the XHR has already been aborted, do nothing.
            // Fix #569, call abort multiple times before done will cause
            // macroTask task count be negative number
            if (task.cancelFn == null || (task.data && task.data.aborted)) {
                return;
            }
            task.zone.cancelTask(task);
        }
        // Otherwise, we are trying to abort an XHR which has not yet been sent, so there is no task
        // to cancel. Do nothing.
    }; });
}
/// GEO_LOCATION
if (_global['navigator'] && _global['navigator'].geolocation) {
    patchPrototype(_global['navigator'].geolocation, ['getCurrentPosition', 'watchPosition']);
}
// handle unhandled promise rejection
function findPromiseRejectionHandler(evtName) {
    return function (e) {
        var eventTasks = findEventTask(_global, evtName);
        eventTasks.forEach(function (eventTask) {
            // windows has added unhandledrejection event listener
            // trigger the event listener
            var PromiseRejectionEvent = _global['PromiseRejectionEvent'];
            if (PromiseRejectionEvent) {
                var evt = new PromiseRejectionEvent(evtName, { promise: e.promise, reason: e.rejection });
                eventTask.invoke(evt);
            }
        });
    };
}
if (_global['PromiseRejectionEvent']) {
    Zone[zoneSymbol('unhandledPromiseRejectionHandler')] =
        findPromiseRejectionHandler('unhandledrejection');
    Zone[zoneSymbol('rejectionHandledHandler')] = findPromiseRejectionHandler('rejectionhandled');
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

})));

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"_process":26}]},{},[25,45,27,12]);
