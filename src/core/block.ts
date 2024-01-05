import EventBus from "./event-bus";

interface IMeta {
    tagName: string;
    props: Record<string, unknown>;
}

export default class Block {
    private props: Record<string, unknown>;
    private _meta: IMeta;
    private eventBus: EventBus;
    private _element: HTMLElement | null = null;

    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render",
    };

    constructor(tagName = "div", props = {}) {
        this._meta = {
            tagName,
            props,
        };
        this.props = this._makePropsProxy(props);
        this.eventBus = new EventBus();

        this._registerEvents(this.eventBus);
        this.eventBus.emit(Block.EVENTS.INIT);
    }

    _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    }

    _createResources() {
        const { tagName } = this._meta;
        this._element = this._createDocumentElement(tagName);
    }

    init() {
        this._createResources();
        this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }

    _componentDidMount() {
        this.componentDidMount();
    }

    // Может переопределять пользователь, необязательно трогать
    componentDidMount() {}

    dispatchComponentDidMount() {
        this.eventBus.emit(Block.EVENTS.FLOW_CDM);
    }

    _componentDidUpdate(oldProps: unknown, newProps: unknown) {
        if (
            oldProps &&
            newProps &&
            typeof oldProps === "object" &&
            typeof newProps === "object"
        ) {
            const response = this.componentDidUpdate(oldProps, newProps);
            if (!response) {
                return;
            }
            this._render();
        }
    }

    // Может переопределять пользователь, необязательно трогать
    componentDidUpdate(oldProps: object, newProps: object) {
        if (oldProps !== newProps) {
            return true;
        }
        return false;
    }

    setProps = (nextProps: object) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    get element() {
        return this._element;
    }

    _render() {
        const block = this.render();
        // Этот небезопасный метод для упрощения логики
        // Используйте шаблонизатор из npm или напишите свой безопасный
        // Нужно не в строку компилировать (или делать это правильно),
        // либо сразу в DOM-элементы возвращать из compile DOM-ноду
        this._element!.innerHTML = "block";
    }

    // Может переопределять пользователь, необязательно трогать
    render() {}

    getContent() {
        return this.element;
    }

    _makePropsProxy(props: Record<string, unknown>) {
        // Можно и так передать this
        // Такой способ больше не применяется с приходом ES6+
        const self = this;

        return new Proxy(props, {
            get(target, prop: string) {
                const value = target[prop];
                return typeof value === "function" ? value.bind(target) : value;
            },
            set(target, prop: string, value: unknown) {
                const oldValue = { ...target };
                target[prop] = value;
                self.eventBus.emit(Block.EVENTS.FLOW_CDU, oldValue, target);
                return true;
            },
            deleteProperty() {
                throw new Error("Нет доступа");
            },
        });
    }

    _createDocumentElement(tagName: string) {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        return document.createElement(tagName);
    }

    show() {
        const content = this.getContent();
        content && content.style.display;
        // content && content.style.display = "block";
    }

    hide() {
        const content = this.getContent();
        content && content.style.display;
        // content && content.style.display = "none";
    }
}
