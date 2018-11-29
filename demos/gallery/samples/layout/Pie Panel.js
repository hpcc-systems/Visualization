import { Pie } from "@hpcc-js/chart";
import { ChartPanel } from "@hpcc-js/layout";

const pie = new Pie();
new ChartPanel()
    .widget(pie)
    .columns(["Subject", "Students"])
    .data([
        ["Structured Computer Architecture", 390],
        ["Intro to Microprocessor Systems", 450],
        ["CAD-Based Computer Design", 350],
        ["Computer Operating Systems", 200],
        ["Design & Analysis of Algorithms", 200],
        ["Stochastic Models for Computer Science", 190],
        ["Data Structures & Algorithm Analysis", 40],
        ["Calculus with Analytic Geometry I", 39],
        ["Calculus with Analytic Geometry II", 37],
        ["Theory and Philosophy of Computation", 38],
        ["Analysis of Algorithms", 32],
        ["Theory and Philosophy of Computation", 35],
        ["Randomized Algorithms", 41],
        ["Queueing Theory", 42],
    ])
    .target("target")
    .title("MSCS Course Enrollment")
    .legendVisible(true)
    .render()
    ;
setInterval(function () {
    pie.startAngle(pie.startAngle() + 0.1).render();
}, 1000);
