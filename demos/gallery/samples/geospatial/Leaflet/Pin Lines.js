import { Leaflet, topoJsonFolder } from "@hpcc-js/map";

topoJsonFolder("https://unpkg.com/@hpcc-js/map@2.0.0/TopoJSON");

const lines = new Leaflet.Lines()
    .columns(columns())
    .data(data())
    .latitudeColumn("orgin_lat")
    .longtitudeColumn("orgin_long")
    .latitude2Column("dest_lat")
    .longtitude2Column("dest_long")
    ;

const fromPins = new Leaflet.Pins()
    .columns(columns())
    .data(data().filter((d, i) => i === 0))
    .latitudeColumn("orgin_lat")
    .longtitudeColumn("orgin_long")
    .tooltipColumn("orgin_iata")
    .popupColumn("orgin_airport")
    .fillColor("darkgreen")
    .faChar("fa-plane")
    ;

const toPins = new Leaflet.Pins()
    .columns(columns())
    .data(data())
    .latitudeColumn("dest_lat")
    .longtitudeColumn("dest_long")
    .tooltipColumn("dest_iata")
    .popupColumn("dest_airport")
    .fillColor("darkred")
    .faChar("fa-plane")
    ;

new Leaflet.Leaflet()
    .target("target")
    .layers([
        lines,
        fromPins,
        toPins
    ])
    .render()
    ;

function columns() {
    return ["orgin_state", "orgin_airport", "orgin_iata", "orgin_lat", "orgin_long", "dest_state", "dest_iata", "dest_airport", "dest_lat", "dest_long", "AVE(distance)"];
}
function data() {
    return [
        ["NY", "LaGuardia", "LGA", "40.77724306", "-73.87260917", "GA", "ATL", "William B Hartsfield-Atlanta Intl", "33.64044444", "-84.42694444", "761"],
        ["NY", "LaGuardia", "LGA", "40.77724306", "-73.87260917", "OH", "CMH", "Port Columbus Intl", "39.99798528", "-82.89188278", "478"],
        ["NY", "LaGuardia", "LGA", "40.77724306", "-73.87260917", "TX", "DFW", "Dallas-Fort Worth International", "32.89595056", "-97.0372", "1389"],
        ["NY", "LaGuardia", "LGA", "40.77724306", "-73.87260917", "FL", "FLL", "Fort Lauderdale-Hollywood Int'l", "26.07258333", "-80.15275", "1076"],
        ["NY", "LaGuardia", "LGA", "40.77724306", "-73.87260917", "SC", "GSP", "Greenville-Spartanburg", "34.89566722", "-82.21885833", "610"],
        ["NY", "LaGuardia", "LGA", "40.77724306", "-73.87260917", "VA", "IAD", "Washington Dulles International", "38.94453194", "-77.45580972", "229"],
        ["NY", "LaGuardia", "LGA", "40.77724306", "-73.87260917", "TN", "MEM", "Memphis International", "35.04241667", "-89.97666667", "963"],
        ["NY", "LaGuardia", "LGA", "40.77724306", "-73.87260917", "VA", "ORF", "Norfolk International", "36.89461111", "-76.20122222", "296"],
        ["NY", "LaGuardia", "LGA", "40.77724306", "-73.87260917", "PA", "PHL", "Philadelphia Intl", "39.87195278", "-75.24114083", "96"],
        ["NY", "LaGuardia", "LGA", "40.77724306", "-73.87260917", "KY", "SDF", "Louisville International-Standiford", "38.17438889", "-85.736", "658"],
        ["NY", "LaGuardia", "LGA", "40.77724306", "-73.87260917", "TN", "BNA", "Nashville International", "36.12447667", "-86.67818222", "764"],
        ["NY", "LaGuardia", "LGA", "40.77724306", "-73.87260917", "MA", "BOS", "Gen Edw L Logan Intl", "42.3643475", "-71.00517917", "185"],
        ["NY", "LaGuardia", "LGA", "40.77724306", "-73.87260917", "NY", "BUF", "Buffalo Niagara Intl", "42.94052472", "-78.73216667", "292"],
        ["NY", "LaGuardia", "LGA", "40.77724306", "-73.87260917", "MD", "BWI", "Baltimore-Washington International", "39.17540167", "-76.66819833", "185"],
        ["NY", "LaGuardia", "LGA", "40.77724306", "-73.87260917", "VA", "DCA", "Ronald Reagan Washington National", "38.85208333", "-77.03772222", "214"],
        ["NY", "LaGuardia", "LGA", "40.77724306", "-73.87260917", "FL", "MIA", "Miami International", "25.79325", "-80.29055556", "1097"],
        ["NY", "LaGuardia", "LGA", "40.77724306", "-73.87260917", "IL", "ORD", "Chicago O'Hare International", "41.979595", "-87.90446417", "733"],
        ["NY", "LaGuardia", "LGA", "40.77724306", "-73.87260917", "FL", "PBI", "Palm Beach International", "26.68316194", "-80.09559417", "1035"],
        ["NY", "LaGuardia", "LGA", "40.77724306", "-73.87260917", "NY", "ROC", "Greater Rochester Int'l", "43.11886611", "-77.67238389", "254"],
        ["NY", "LaGuardia", "LGA", "40.77724306", "-73.87260917", "FL", "RSW", "Southwest Florida International", "26.53616667", "-81.75516667", "1080"],
        ["NY", "LaGuardia", "LGA", "40.77724306", "-73.87260917", "MO", "STL", "Lambert-St Louis International", "38.74768694", "-90.35998972", "887"],
        ["NY", "LaGuardia", "LGA", "40.77724306", "-73.87260917", "NC", "CLT", "Charlotte/Douglas International", "35.21401111", "-80.94312583", "544"],
        ["NY", "LaGuardia", "LGA", "40.77724306", "-73.87260917", "KY", "CVG", "Cincinnati Northern Kentucky Intl", "39.04614278", "-84.6621725", "585"],
        ["NY", "LaGuardia", "LGA", "40.77724306", "-73.87260917", "CO", "DEN", "Denver Intl", "39.85840806", "-104.6670019", "1619"],
        ["NY", "LaGuardia", "LGA", "40.77724306", "-73.87260917", "TX", "HOU", "William P Hobby", "29.64541861", "-95.27888889", "1428"],
        ["NY", "LaGuardia", "LGA", "40.77724306", "-73.87260917", "IN", "IND", "Indianapolis International", "39.71732917", "-86.29438417", "659"],
        ["NY", "LaGuardia", "LGA", "40.77724306", "-73.87260917", "WV", "LWB", "Greenbrier Valley", "37.85830556", "-80.39947222", "403"],
        ["NY", "LaGuardia", "LGA", "40.77724306", "-73.87260917", "LA", "MSY", "New Orleans International", "29.99338889", "-90.25802778", "1183"],
        ["NY", "LaGuardia", "LGA", "40.77724306", "-73.87260917", "OH", "CLE", "Cleveland-Hopkins Intl", "41.41089417", "-81.84939667", "418"],
        ["NY", "LaGuardia", "LGA", "40.77724306", "-73.87260917", "CO", "EGE", "Eagle County Regional", "39.64256778", "-106.9176953", "1739"],
        ["NY", "LaGuardia", "LGA", "40.77724306", "-73.87260917", "FL", "JAX", "Jacksonville International", "30.49405556", "-81.68786111", "834"],
        ["NY", "LaGuardia", "LGA", "40.77724306", "-73.87260917", "FL", "MCO", "Orlando International", "28.42888889", "-81.31602778", "950"],
        ["NY", "LaGuardia", "LGA", "40.77724306", "-73.87260917", "PA", "PIT", "Pittsburgh International", "40.49146583", "-80.23287083", "335"],
        ["NY", "LaGuardia", "LGA", "40.77724306", "-73.87260917", "NC", "RDU", "Raleigh-Durham International", "35.87763889", "-78.78747222", "431"],
        ["NY", "LaGuardia", "LGA", "40.77724306", "-73.87260917", "VA", "RIC", "Richmond International", "37.50516667", "-77.31966667", "292"],
        ["NY", "LaGuardia", "LGA", "40.77724306", "-73.87260917", "FL", "TPA", "Tampa International", "27.97547222", "-82.53325", "1011"],
        ["NY", "LaGuardia", "LGA", "40.77724306", "-73.87260917", "MI", "DTW", "Detroit Metropolitan-Wayne County", "42.21205889", "-83.34883583", "501"],
        ["NY", "LaGuardia", "LGA", "40.77724306", "-73.87260917", "NC", "GSO", "Piedmont Triad International", "36.09774694", "-79.9372975", "461"],
        ["NY", "LaGuardia", "LGA", "40.77724306", "-73.87260917", "TX", "IAH", "George Bush Intercontinental", "29.98047222", "-95.33972222", "1416"],
        ["NY", "LaGuardia", "LGA", "40.77724306", "-73.87260917", "MN", "MSP", "Minneapolis-St Paul Intl", "44.88054694", "-93.2169225", "1020"]
    ];
}