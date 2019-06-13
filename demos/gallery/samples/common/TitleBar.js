import { TitleBar, SelectionButton, Spacer } from "@hpcc-js/common";

new TitleBar()
    .target("target")
    .titleIcon("")
    .titleIconFont("FontAwesome")
    .title("TitleBar title")
    .titleFont("Arial")
    .description("TitleBar description")
    .descriptionFont("Arial")
    .buttons([
        new SelectionButton().faChar("fa-bug"),
        new SelectionButton().faChar("fa-map"),
        new Spacer(),
        new SelectionButton().faChar("fa-user-circle-o"),
        new SelectionButton().faChar("fa-gear"),
    ])
    .render()
    ;
