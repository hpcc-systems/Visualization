import { Bar } from "@hpcc-js/chart";

new Bar()
    .target("target")
    .columns(["Category","Value"])
    .data([
        ["A", 3],
        ["B", 5],
        ["C", 8]
    ])
    .render()
    ;
// import { BooleanInput, FieldsetForm, NumberInput, SetInput, StringInput } from "@hpcc-js/html";

// const firstname = new StringInput()
//     .label("First Name")
//     .fixedWidth(180)
//     ;
// const mi = new StringInput()
//     .label("MI")
//     .fixedWidth(60)
//     ;
// const lastname = new StringInput()
//     .label("Last Name")
//     .fixedWidth(180)
//     .required(true)
//     ;
// const minage = new NumberInput()
//     .label("Min Age")
//     .linebreak(true)
//     ;
// const maxage = new NumberInput()
//     .label("Max Age")
//     ;
// const similar = new BooleanInput()
//     .label("Include Similar Sounding Names")
//     .linebreak(true)
//     .helpText("Names that sound similar to the searched name will also appear in the results.")
//     ;
// const address = new StringInput()
//     .label("Street Address")
//     .widthPercentage(100)
//     ;
// const reporttype = new SetInput()
//     .label("Report Type")
//     .linebreak(true)
//     .options([
//         "Vehicle/Asset",
//         "Location History",
//         "Comprehensive",
//         "Relational"
//     ])
//     .minWidth(300)
//     .columnCount(2)
//     .selectedOption("Vehicle/Asset")
//     ;
// new FieldsetForm()
//     .label("Basic Fieldset Form")
//     .target("target")
//     .widgets([
//         firstname,
//         mi,
//         lastname,
//         minage,
//         maxage,
//         address,
//         similar,
//         reporttype
//     ])
//     .render()
//     ;