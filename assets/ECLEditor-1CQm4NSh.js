import{r as e}from"./dist-BxMYJsJZ.js";new e().ecl(`MySample := SAMPLE(Person,10,1) // get every 10th record
SomeFile := DATASET([{'A'},{'B'},{'C'},{'D'},{'E'},
                     {'F'},{'G'},{'H'},{'I'},{'J'},
                     {'K'},{'L'},{'M'},{'N'},{'O'},
                     {'P'},{'Q'},{'R'},{'S'},{'T'},
                     {'U'},{'V'},{'W'},{'X'},{'Y'}],
                     {STRING1 Letter});
Set1 := SAMPLE(SomeFile,5,1); // returns A, F, K, P, U`).target(`target`).render(e=>{e.highlightInfo(0,8).highlightError(12,18).highlightWarning(78,95)});
//# sourceMappingURL=ECLEditor-1CQm4NSh.js.map