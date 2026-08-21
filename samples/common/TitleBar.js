import { TitleBar, SelectionButton, Spacer } from "@hpcc-js/common";

new TitleBar()
    .buttons([
        new SelectionButton().faChar("fa-bug"),
        new SelectionButton().faChar("fa-map"),
        new Spacer(),
        new SelectionButton().faChar("fa-user-circle-o"),
        new SelectionButton().faChar("fa-gear"),
    ])
    .target("target")
    .titleIcon("")
    .titleIconFont("FontAwesome")
    .titleIconFontSize(28)
    .title("TitleBar title")
    .titleFont("Arial")
    .titleFontSize(30)
    .description("TitleBar description")
    .descriptionFont("Arial")
    .descriptionFontSize(12)
    .render()
    ;
