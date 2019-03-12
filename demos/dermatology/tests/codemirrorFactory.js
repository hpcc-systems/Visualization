"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.test_otherFactory = factory();
    }
}(this, function (DataFactory, HeatMap, WordCloud, Table) {
    return {
        ECL: {
            simple: function (callback) {
                legacyRequire(["src/codemirror/ECLEditor"], function (ECLEditor) {
                    const code = `MySample := SAMPLE(Person,10,1) // get every 10th record

                    SomeFile := DATASET([{'A'},{'B'},{'C'},{'D'},{'E'},
                                         {'F'},{'G'},{'H'},{'I'},{'J'},
                                         {'K'},{'L'},{'M'},{'N'},{'O'},
                                         {'P'},{'Q'},{'R'},{'S'},{'T'},
                                         {'U'},{'V'},{'W'},{'X'},{'Y'}],
                                         {STRING1 Letter});
                    Set1 := SAMPLE(SomeFile,5,1); // returns A, F, K, P, U`;

                    callback(new ECLEditor()
                        .text(code)
                    );
                });
            }
        }
    };
}));
