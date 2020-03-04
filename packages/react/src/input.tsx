import { IPublishExt, PublishTypes } from "@hpcc-js/common";
import * as React from "@hpcc-js/preact-shim";

export interface IInput {
    className?: string;
    callbacks?: any;
    property: IPublishedProperty;
}

export const RangeInput: React.FunctionComponent<IInput> = ({
    callbacks,
    className,
    property
}) => {
    return <input
        {...callbacks}
        type="range"
        min={property.ext.min}
        max={property.ext.max}
        step={property.ext.step}
        value={property.value}
        className={className}
    />;
};
export const NumberInput: React.FunctionComponent<IInput> = ({
    callbacks,
    className,
    property
}) => {
    return <input
        {...callbacks}
        type="number"
        min={property.ext.min}
        max={property.ext.max}
        step={property.ext.step}
        value={property.value}
        className={className}
    />;
};
export const BooleanInput: React.FunctionComponent<IInput> = ({
    callbacks,
    className,
    property
}) => {
    return <input
        {...callbacks}
        type="checkbox"
        checked={property.value ? "checked" : false}
        className={className}
    />;
};
export const StringInput: React.FunctionComponent<IInput> = ({
    callbacks,
    className,
    property
}) => {
    return <input
        {...callbacks}
        type="text"
        value={property.value}
        className={className}
    />;
};
export const SetInput: React.FunctionComponent<IInput> = ({
    callbacks,
    className,
    property
}) => {
    const options = [];
    if (property.set) {
        console.log("property.set === ", property.set);
        (typeof property.set === "function" ? property.set() : property.set)
            .forEach(option => {
                options.push(<option key={option} value={option}>{option}</option>);
            })
            ;
    }
    return <select
        {...callbacks}
        type="text"
        value={property.value}
        className={className}
    >
        {options}
    </select>
    ;
};
export const ArrayInput: React.FunctionComponent<IInput> = ({
    callbacks,
    className,
    property
}) => {
    return <StringInput
        callbacks={callbacks}
        property={property}
        className={className}
    />
    ;
};
export const ObjectInput: React.FunctionComponent<IInput> = ({
    callbacks,
    className,
    property
}) => {
    return <StringInput
        callbacks={callbacks}
        property={property}
        className={className}
    />
    ;
};
export const WidgetInput: React.FunctionComponent<IInput> = ({
    callbacks,
    className,
    property
}) => {
    return <StringInput
        callbacks={callbacks}
        property={property}
        className={className}
    />
    ;
};
export const WidgetArrayInput: React.FunctionComponent<IInput> = ({
    callbacks,
    className,
    property
}) => {
    return <StringInput
        callbacks={callbacks}
        property={property}
        className={className}
    />
    ;
};
export const PropertyArrayInput: React.FunctionComponent<IInput> = ({
    callbacks,
    className,
    property
}) => {
    return <StringInput
        callbacks={callbacks}
        property={property}
        className={className}
    />
    ;
};
export const ColorInput: React.FunctionComponent<IInput> = ({
    callbacks,
    className,
    property
}) => {
    return <input
        type="color"
        {...callbacks}
        value={property.value}
        className={className}
    />
    ;
};

export interface IPropertyInput {
    widget: any;
    property: IPublishedProperty;
}

export const PropertyInput: React.FunctionComponent<IPropertyInput> = ({
    widget,
    property
}) => {
    const changeFunc = ev => {
        widget[property.id](ev.target.value).lazyRender();
    };
    const changeCheckboxFunc = ev => {
        widget[property.id](ev.target.checked).lazyRender();
    };
    const changeJsonFunc = ev => {
        widget[property.id](JSON.parse(ev.target.value)).lazyRender();
    };
    const callbacks: any = {
        onchange: changeFunc
    };
    property.value = widget[property.id]();
    if (property.ext && property.ext.range) {
        callbacks.oninput = changeFunc;
        return <RangeInput callbacks={callbacks} property={property}/>;
    } else if (property.type === "number") {
        callbacks.oninput = changeFunc;
        return <NumberInput callbacks={callbacks} property={property}/>;
    } else if (property.type === "boolean") {
        callbacks.onchange = changeCheckboxFunc;
        return <BooleanInput callbacks={callbacks} property={property}/>;
    } else if (property.type === "string") {
        callbacks.onkeyup = changeFunc;
        return <StringInput callbacks={callbacks} property={property}/>;
    } else if (property.type === "set") {
        return <SetInput callbacks={callbacks} property={property}/>;
    } else if (property.type === "array") {
        callbacks.onchange = changeJsonFunc;
        callbacks.onkeyup = changeJsonFunc;
        return <ArrayInput callbacks={callbacks} property={property}/>;
    } else if (property.type === "object") {
        callbacks.onchange = changeJsonFunc;
        callbacks.onkeyup = changeJsonFunc;
        return <ObjectInput callbacks={callbacks} property={property}/>;
    } else if (property.type === "widget") {
        return <WidgetInput callbacks={callbacks} property={property}/>;
    } else if (property.type === "widgetArray") {
        return <WidgetArrayInput callbacks={callbacks} property={property}/>;
    } else if (property.type === "propertyArray") {
        return <PropertyArrayInput callbacks={callbacks} property={property}/>;
    } else if (property.type === "html-color") {
        return <ColorInput callbacks={callbacks} property={property}/>;
    }
    console.error(`Property type ${property.type} not supported in PropertyInput component`, property);
};

export interface IPublishedProperty {
    widget: any;
    id: string;
    type: PublishTypes;
    ext?: IPublishExt;
    set?: (() => string[]) | string[];
    value?: any;
}

export interface IPropertyInputGroup {
    widget: any;
    publishedProperties: IPublishedProperty[];
}

export const PropertyInputGroup: React.FunctionComponent<IPropertyInputGroup> = ({
    widget,
    publishedProperties = []
}) => {
    const items = [];
    publishedProperties.forEach(property => {
        items.push(
            <div key={property.id}>
                <label>{property.id}</label>
                <PropertyInput
                    widget={widget}
                    property={property}
                />
            </div>
        );
    });
    const divStyle = "display:flex;flex-direction:column;";
    return <div style={divStyle}>
        {items}
    </div>;
};
