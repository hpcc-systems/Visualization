import { InputGroup } from "@hpcc-js/form";

new InputGroup()
    .target("target")
    .data([
        ["TextInput",{placeholder: "Package", value: "composite"}],
        ["TextInput",{placeholder: "Widget Name", value: "InputGroup"}],
        ["TextInput",{placeholder: "Extended Widget", value: "HTMLWidget"}],
        ["TextInput",{placeholder: "Extended Package", value: "common"}],
        ["TextInput",{placeholder: "Parameter Base Widget", value: "FlexGrid"}],
        ["TextInput",{placeholder: "Parameter Base Package", value: "layout"}],
    ])
    .render()
    ;