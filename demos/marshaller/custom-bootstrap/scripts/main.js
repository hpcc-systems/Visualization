"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "src/other/Persist", "src/marshaller/HTML"], factory);
    }
}(this, function (d3, Persist, HTML) {
    var persistStr = { "__class": "marshaller_HTML", "__id": "_pe59", "__version": "1.14.0-dev", "__properties": { "ddlUrl": "[ { \"visualizations\": [ { \"color\": \"YlOrRd\", \"id\": \"statesummary\", \"source\": { \"output\": \"View_statesummary\", \"mappings\": { \"weight\": \"Cnt\", \"state\": \"clean_st\" }, \"id\": \"statesum\" }, \"type\": \"CHORO\", \"title\": \"Count by State\", \"events\": { \"click\": { \"mappings\": { \"clean_st\": \"clean_st\" }, \"updates\": [ { \"visualization\": \"statedetails\", \"instance\": \"Ins001\", \"datasource\": \"details\", \"merge\": false }, { \"visualization\": \"alldetails\", \"instance\": \"Ins001\", \"datasource\": \"details\", \"merge\": false } ] } }, \"onSelect\": { \"mappings\": { \"clean_st\": \"clean_st\" }, \"updates\": [ { \"visualization\": \"statedetails\", \"instance\": \"Ins001\", \"datasource\": \"details\", \"merge\": false }, { \"visualization\": \"alldetails\", \"instance\": \"Ins001\", \"datasource\": \"details\", \"merge\": false } ] } }, { \"id\": \"statedetails\", \"label\": [ \"State\", \"Error\", \"Count\" ], \"source\": { \"output\": \"View_statedetails\", \"mappings\": { \"value\": [ \"clean_st\", \"clean_error\", \"Cnt\" ] }, \"id\": \"details\" }, \"type\": \"TABLE\", \"title\": \"State Error Details\" }, { \"color\": \"YlOrRd\", \"id\": \"errorsummary\", \"source\": { \"output\": \"View_errorsummary\", \"mappings\": { \"weight\": \"Cnt\", \"label\": \"clean_error\" }, \"id\": \"errorsum\" }, \"type\": \"BUBBLE\", \"title\": \"Count by error--aggregated client side\", \"events\": { \"click\": { \"mappings\": { \"clean_error\": \"clean_error\" }, \"updates\": [ { \"visualization\": \"errordetails\", \"instance\": \"Ins001\", \"datasource\": \"details\", \"merge\": false }, { \"visualization\": \"alldetails\", \"instance\": \"Ins001\", \"datasource\": \"details\", \"merge\": false } ] } }, \"onSelect\": { \"mappings\": { \"clean_error\": \"clean_error\" }, \"updates\": [ { \"visualization\": \"errordetails\", \"instance\": \"Ins001\", \"datasource\": \"details\", \"merge\": false }, { \"visualization\": \"alldetails\", \"instance\": \"Ins001\", \"datasource\": \"details\", \"merge\": false } ] } }, { \"id\": \"errordetails\", \"label\": [ \"State\", \"Error\", \"Count\" ], \"source\": { \"output\": \"View_errordetails\", \"mappings\": { \"value\": [ \"clean_st\", \"clean_error\", \"Cnt\" ] }, \"id\": \"details\" }, \"type\": \"TABLE\", \"title\": \"Error Code Details\" }, { \"id\": \"alldetails\", \"label\": [ \"State\", \"Error\", \"Count\" ], \"source\": { \"output\": \"View_alldetails\", \"mappings\": { \"value\": [ \"clean_st\", \"clean_error\", \"Cnt\" ] }, \"id\": \"details\" }, \"type\": \"TABLE\", \"title\": \"Details updated from both count by state and count by error\" } ], \"datasources\": [ { \"outputs\": [ { \"from\": \"View_statesummary\", \"id\": \"View_statesummary\", \"notify\": [ \"statesummary\" ] } ], \"databomb\": true, \"id\": \"statesum\" }, { \"outputs\": [ { \"from\": \"View_errorsummary\", \"id\": \"View_errorsummary\", \"notify\": [ \"errorsummary\" ] } ], \"databomb\": true, \"id\": \"errorsum\" }, { \"filter\": [ \"clean_st\", \"clean_error\" ], \"outputs\": [ { \"from\": \"View_statedetails\", \"id\": \"View_statedetails\", \"notify\": [ \"statedetails\" ] }, { \"from\": \"View_errordetails\", \"id\": \"View_errordetails\", \"notify\": [ \"errordetails\" ] }, { \"from\": \"View_alldetails\", \"id\": \"View_alldetails\", \"notify\": [ \"alldetails\" ] } ], \"databomb\": true, \"id\": \"details\" } ], \"enable\": \"true\", \"id\": \"Ins001_DatabombDashboard\", \"label\": \"DatabombDashboard\", \"title\": \"Databomb Dashboard\", \"primary\": false } ]", "databomb": "{\"errorsum\":[{\"clean_error\":\"E212\",\"Cnt\":\"1\"},{\"clean_error\":\"E214\",\"Cnt\":\"3\"},{\"clean_error\":\"E216\",\"Cnt\":\"1\"},{\"clean_error\":\"E412\",\"Cnt\":\"204\"},{\"clean_error\":\"E421\",\"Cnt\":\"174\"},{\"clean_error\":\"E422\",\"Cnt\":\"43\"},{\"clean_error\":\"E423\",\"Cnt\":\"6\"},{\"clean_error\":\"E427\",\"Cnt\":\"24\"},{\"clean_error\":\"E430\",\"Cnt\":\"1\"},{\"clean_error\":\"E505\",\"Cnt\":\"2\"},{\"clean_error\":\"E600\",\"Cnt\":\"7\"},{\"clean_error\":\"S400\",\"Cnt\":\"3\"},{\"clean_error\":\"S800\",\"Cnt\":\"19370\"},{\"clean_error\":\"S810\",\"Cnt\":\"10\"},{\"clean_error\":\"S820\",\"Cnt\":\"49\"},{\"clean_error\":\"S840\",\"Cnt\":\"2\"},{\"clean_error\":\"S860\",\"Cnt\":\"3\"},{\"clean_error\":\"S880\",\"Cnt\":\"26\"},{\"clean_error\":\"S890\",\"Cnt\":\"9\"},{\"clean_error\":\"S891\",\"Cnt\":\"1\"},{\"clean_error\":\"S8A0\",\"Cnt\":\"3\"},{\"clean_error\":\"S8B0\",\"Cnt\":\"2\"},{\"clean_error\":\"S8C0\",\"Cnt\":\"2\"},{\"clean_error\":\"S900\",\"Cnt\":\"22\"},{\"clean_error\":\"S910\",\"Cnt\":\"4\"},{\"clean_error\":\"S920\",\"Cnt\":\"2\"},{\"clean_error\":\"S980\",\"Cnt\":\"1\"},{\"clean_error\":\"SA00\",\"Cnt\":\"21\"},{\"clean_error\":\"SB00\",\"Cnt\":\"3\"},{\"clean_error\":\"SC10\",\"Cnt\":\"1\"}],\"statesum\":[{\"clean_st\":\"AK\",\"Cnt\":\"57\"},{\"clean_st\":\"AL\",\"Cnt\":\"225\"},{\"clean_st\":\"AR\",\"Cnt\":\"140\"},{\"clean_st\":\"AZ\",\"Cnt\":\"342\"},{\"clean_st\":\"CA\",\"Cnt\":\"2695\"},{\"clean_st\":\"CO\",\"Cnt\":\"459\"},{\"clean_st\":\"CT\",\"Cnt\":\"246\"},{\"clean_st\":\"DC\",\"Cnt\":\"91\"},{\"clean_st\":\"DE\",\"Cnt\":\"33\"},{\"clean_st\":\"FL\",\"Cnt\":\"1924\"},{\"clean_st\":\"GA\",\"Cnt\":\"683\"},{\"clean_st\":\"HI\",\"Cnt\":\"54\"},{\"clean_st\":\"IA\",\"Cnt\":\"163\"},{\"clean_st\":\"ID\",\"Cnt\":\"139\"},{\"clean_st\":\"IL\",\"Cnt\":\"718\"},{\"clean_st\":\"IN\",\"Cnt\":\"318\"},{\"clean_st\":\"KS\",\"Cnt\":\"155\"},{\"clean_st\":\"KY\",\"Cnt\":\"211\"},{\"clean_st\":\"LA\",\"Cnt\":\"279\"},{\"clean_st\":\"MA\",\"Cnt\":\"450\"},{\"clean_st\":\"MD\",\"Cnt\":\"459\"},{\"clean_st\":\"ME\",\"Cnt\":\"57\"},{\"clean_st\":\"MI\",\"Cnt\":\"554\"},{\"clean_st\":\"MN\",\"Cnt\":\"419\"},{\"clean_st\":\"MO\",\"Cnt\":\"297\"},{\"clean_st\":\"MS\",\"Cnt\":\"201\"},{\"clean_st\":\"MT\",\"Cnt\":\"73\"},{\"clean_st\":\"NC\",\"Cnt\":\"433\"},{\"clean_st\":\"ND\",\"Cnt\":\"35\"},{\"clean_st\":\"NE\",\"Cnt\":\"108\"},{\"clean_st\":\"NH\",\"Cnt\":\"97\"},{\"clean_st\":\"NJ\",\"Cnt\":\"505\"},{\"clean_st\":\"NM\",\"Cnt\":\"92\"},{\"clean_st\":\"NV\",\"Cnt\":\"142\"},{\"clean_st\":\"NY\",\"Cnt\":\"1237\"},{\"clean_st\":\"OH\",\"Cnt\":\"652\"},{\"clean_st\":\"OK\",\"Cnt\":\"190\"},{\"clean_st\":\"OR\",\"Cnt\":\"316\"},{\"clean_st\":\"PA\",\"Cnt\":\"678\"},{\"clean_st\":\"PR\",\"Cnt\":\"9\"},{\"clean_st\":\"RI\",\"Cnt\":\"77\"},{\"clean_st\":\"SC\",\"Cnt\":\"209\"},{\"clean_st\":\"SD\",\"Cnt\":\"46\"},{\"clean_st\":\"TN\",\"Cnt\":\"378\"},{\"clean_st\":\"TX\",\"Cnt\":\"1794\"},{\"clean_st\":\"UT\",\"Cnt\":\"189\"},{\"clean_st\":\"VA\",\"Cnt\":\"473\"},{\"clean_st\":\"VI\",\"Cnt\":\"3\"},{\"clean_st\":\"VT\",\"Cnt\":\"43\"},{\"clean_st\":\"WA\",\"Cnt\":\"456\"},{\"clean_st\":\"WI\",\"Cnt\":\"302\"},{\"clean_st\":\"WV\",\"Cnt\":\"61\"},{\"clean_st\":\"WY\",\"Cnt\":\"29\"}],\"details\":[{\"clean_st\":\"LA\",\"clean_error\":\"S900\",\"Cnt\":\"1\"},{\"clean_st\":\"WA\",\"clean_error\":\"E422\",\"Cnt\":\"3\"},{\"clean_st\":\"SC\",\"clean_error\":\"S800\",\"Cnt\":\"203\"},{\"clean_st\":\"NM\",\"clean_error\":\"E427\",\"Cnt\":\"3\"},{\"clean_st\":\"WY\",\"clean_error\":\"S820\",\"Cnt\":\"1\"},{\"clean_st\":\"KS\",\"clean_error\":\"SC10\",\"Cnt\":\"1\"},{\"clean_st\":\"WA\",\"clean_error\":\"E423\",\"Cnt\":\"1\"},{\"clean_st\":\"PR\",\"clean_error\":\"S800\",\"Cnt\":\"8\"},{\"clean_st\":\"NE\",\"clean_error\":\"E412\",\"Cnt\":\"2\"},{\"clean_st\":\"NH\",\"clean_error\":\"S800\",\"Cnt\":\"93\"},{\"clean_st\":\"OR\",\"clean_error\":\"S840\",\"Cnt\":\"1\"},{\"clean_st\":\"TX\",\"clean_error\":\"E421\",\"Cnt\":\"13\"},{\"clean_st\":\"NH\",\"clean_error\":\"E412\",\"Cnt\":\"1\"},{\"clean_st\":\"FL\",\"clean_error\":\"SA00\",\"Cnt\":\"4\"},{\"clean_st\":\"GA\",\"clean_error\":\"E427\",\"Cnt\":\"2\"},{\"clean_st\":\"AZ\",\"clean_error\":\"S900\",\"Cnt\":\"2\"},{\"clean_st\":\"SD\",\"clean_error\":\"E412\",\"Cnt\":\"1\"},{\"clean_st\":\"NC\",\"clean_error\":\"E421\",\"Cnt\":\"2\"},{\"clean_st\":\"MO\",\"clean_error\":\"S880\",\"Cnt\":\"1\"},{\"clean_st\":\"MI\",\"clean_error\":\"SB00\",\"Cnt\":\"1\"},{\"clean_st\":\"IL\",\"clean_error\":\"S920\",\"Cnt\":\"1\"},{\"clean_st\":\"WI\",\"clean_error\":\"E421\",\"Cnt\":\"7\"},{\"clean_st\":\"LA\",\"clean_error\":\"S800\",\"Cnt\":\"270\"},{\"clean_st\":\"GA\",\"clean_error\":\"E412\",\"Cnt\":\"8\"},{\"clean_st\":\"CA\",\"clean_error\":\"E421\",\"Cnt\":\"20\"},{\"clean_st\":\"KY\",\"clean_error\":\"E421\",\"Cnt\":\"1\"},{\"clean_st\":\"MI\",\"clean_error\":\"E412\",\"Cnt\":\"3\"},{\"clean_st\":\"MO\",\"clean_error\":\"S800\",\"Cnt\":\"285\"},{\"clean_st\":\"WI\",\"clean_error\":\"E422\",\"Cnt\":\"2\"},{\"clean_st\":\"PA\",\"clean_error\":\"SA00\",\"Cnt\":\"1\"},{\"clean_st\":\"CA\",\"clean_error\":\"E422\",\"Cnt\":\"2\"},{\"clean_st\":\"FL\",\"clean_error\":\"E422\",\"Cnt\":\"5\"},{\"clean_st\":\"WI\",\"clean_error\":\"S800\",\"Cnt\":\"262\"},{\"clean_st\":\"CO\",\"clean_error\":\"S820\",\"Cnt\":\"1\"},{\"clean_st\":\"NY\",\"clean_error\":\"S900\",\"Cnt\":\"1\"},{\"clean_st\":\"TX\",\"clean_error\":\"SA00\",\"Cnt\":\"6\"},{\"clean_st\":\"WA\",\"clean_error\":\"E412\",\"Cnt\":\"1\"},{\"clean_st\":\"CA\",\"clean_error\":\"E423\",\"Cnt\":\"1\"},{\"clean_st\":\"CO\",\"clean_error\":\"S900\",\"Cnt\":\"2\"},{\"clean_st\":\"NC\",\"clean_error\":\"E422\",\"Cnt\":\"3\"},{\"clean_st\":\"\",\"clean_error\":\"E214\",\"Cnt\":\"2\"},{\"clean_st\":\"RI\",\"clean_error\":\"S800\",\"Cnt\":\"77\"},{\"clean_st\":\"MN\",\"clean_error\":\"S840\",\"Cnt\":\"1\"},{\"clean_st\":\"TN\",\"clean_error\":\"E422\",\"Cnt\":\"2\"},{\"clean_st\":\"TX\",\"clean_error\":\"E505\",\"Cnt\":\"1\"},{\"clean_st\":\"FL\",\"clean_error\":\"E600\",\"Cnt\":\"1\"},{\"clean_st\":\"MO\",\"clean_error\":\"S820\",\"Cnt\":\"1\"},{\"clean_st\":\"WV\",\"clean_error\":\"S810\",\"Cnt\":\"1\"},{\"clean_st\":\"MN\",\"clean_error\":\"E412\",\"Cnt\":\"5\"},{\"clean_st\":\"ND\",\"clean_error\":\"S800\",\"Cnt\":\"29\"},{\"clean_st\":\"WI\",\"clean_error\":\"S820\",\"Cnt\":\"29\"},{\"clean_st\":\"TN\",\"clean_error\":\"E423\",\"Cnt\":\"1\"},{\"clean_st\":\"IA\",\"clean_error\":\"E412\",\"Cnt\":\"5\"},{\"clean_st\":\"NE\",\"clean_error\":\"S800\",\"Cnt\":\"105\"},{\"clean_st\":\"GA\",\"clean_error\":\"S8A0\",\"Cnt\":\"1\"},{\"clean_st\":\"CA\",\"clean_error\":\"S900\",\"Cnt\":\"1\"},{\"clean_st\":\"FL\",\"clean_error\":\"E421\",\"Cnt\":\"12\"},{\"clean_st\":\"AK\",\"clean_error\":\"E412\",\"Cnt\":\"1\"},{\"clean_st\":\"\",\"clean_error\":\"E212\",\"Cnt\":\"1\"},{\"clean_st\":\"TX\",\"clean_error\":\"E427\",\"Cnt\":\"1\"},{\"clean_st\":\"CO\",\"clean_error\":\"S880\",\"Cnt\":\"1\"},{\"clean_st\":\"FL\",\"clean_error\":\"S800\",\"Cnt\":\"1885\"},{\"clean_st\":\"WV\",\"clean_error\":\"E412\",\"Cnt\":\"3\"},{\"clean_st\":\"NV\",\"clean_error\":\"S800\",\"Cnt\":\"138\"},{\"clean_st\":\"WI\",\"clean_error\":\"S900\",\"Cnt\":\"1\"},{\"clean_st\":\"NY\",\"clean_error\":\"S910\",\"Cnt\":\"1\"},{\"clean_st\":\"TX\",\"clean_error\":\"E412\",\"Cnt\":\"14\"},{\"clean_st\":\"TN\",\"clean_error\":\"E421\",\"Cnt\":\"5\"},{\"clean_st\":\"AL\",\"clean_error\":\"S800\",\"Cnt\":\"219\"},{\"clean_st\":\"NC\",\"clean_error\":\"S800\",\"Cnt\":\"422\"},{\"clean_st\":\"OH\",\"clean_error\":\"S880\",\"Cnt\":\"1\"},{\"clean_st\":\"ND\",\"clean_error\":\"E421\",\"Cnt\":\"1\"},{\"clean_st\":\"FL\",\"clean_error\":\"E427\",\"Cnt\":\"3\"},{\"clean_st\":\"DE\",\"clean_error\":\"S800\",\"Cnt\":\"32\"},{\"clean_st\":\"AR\",\"clean_error\":\"E421\",\"Cnt\":\"3\"},{\"clean_st\":\"MN\",\"clean_error\":\"E421\",\"Cnt\":\"5\"},{\"clean_st\":\"PA\",\"clean_error\":\"S810\",\"Cnt\":\"1\"},{\"clean_st\":\"ID\",\"clean_error\":\"E412\",\"Cnt\":\"6\"},{\"clean_st\":\"AK\",\"clean_error\":\"S800\",\"Cnt\":\"55\"},{\"clean_st\":\"NM\",\"clean_error\":\"E412\",\"Cnt\":\"5\"},{\"clean_st\":\"OR\",\"clean_error\":\"E423\",\"Cnt\":\"1\"},{\"clean_st\":\"MS\",\"clean_error\":\"S800\",\"Cnt\":\"192\"},{\"clean_st\":\"CO\",\"clean_error\":\"E422\",\"Cnt\":\"1\"},{\"clean_st\":\"AZ\",\"clean_error\":\"S800\",\"Cnt\":\"329\"},{\"clean_st\":\"ID\",\"clean_error\":\"S820\",\"Cnt\":\"4\"},{\"clean_st\":\"WY\",\"clean_error\":\"S810\",\"Cnt\":\"1\"},{\"clean_st\":\"ND\",\"clean_error\":\"E427\",\"Cnt\":\"2\"},{\"clean_st\":\"PR\",\"clean_error\":\"E412\",\"Cnt\":\"1\"},{\"clean_st\":\"NY\",\"clean_error\":\"SB00\",\"Cnt\":\"1\"},{\"clean_st\":\"KS\",\"clean_error\":\"E422\",\"Cnt\":\"1\"},{\"clean_st\":\"MI\",\"clean_error\":\"S800\",\"Cnt\":\"541\"},{\"clean_st\":\"MA\",\"clean_error\":\"S880\",\"Cnt\":\"1\"},{\"clean_st\":\"WV\",\"clean_error\":\"S900\",\"Cnt\":\"1\"},{\"clean_st\":\"AZ\",\"clean_error\":\"E421\",\"Cnt\":\"7\"},{\"clean_st\":\"OK\",\"clean_error\":\"S820\",\"Cnt\":\"1\"},{\"clean_st\":\"LA\",\"clean_error\":\"E412\",\"Cnt\":\"3\"},{\"clean_st\":\"OR\",\"clean_error\":\"E421\",\"Cnt\":\"2\"},{\"clean_st\":\"NE\",\"clean_error\":\"E422\",\"Cnt\":\"1\"},{\"clean_st\":\"MN\",\"clean_error\":\"E422\",\"Cnt\":\"1\"},{\"clean_st\":\"AR\",\"clean_error\":\"E422\",\"Cnt\":\"1\"},{\"clean_st\":\"PA\",\"clean_error\":\"E505\",\"Cnt\":\"1\"},{\"clean_st\":\"MD\",\"clean_error\":\"S880\",\"Cnt\":\"2\"},{\"clean_st\":\"SC\",\"clean_error\":\"E421\",\"Cnt\":\"1\"},{\"clean_st\":\"LA\",\"clean_error\":\"S910\",\"Cnt\":\"1\"},{\"clean_st\":\"UT\",\"clean_error\":\"SB00\",\"Cnt\":\"1\"},{\"clean_st\":\"CO\",\"clean_error\":\"E421\",\"Cnt\":\"3\"},{\"clean_st\":\"HI\",\"clean_error\":\"E421\",\"Cnt\":\"1\"},{\"clean_st\":\"DE\",\"clean_error\":\"E412\",\"Cnt\":\"1\"},{\"clean_st\":\"ME\",\"clean_error\":\"S800\",\"Cnt\":\"54\"},{\"clean_st\":\"NY\",\"clean_error\":\"E412\",\"Cnt\":\"10\"},{\"clean_st\":\"KY\",\"clean_error\":\"S800\",\"Cnt\":\"209\"},{\"clean_st\":\"OK\",\"clean_error\":\"S800\",\"Cnt\":\"180\"},{\"clean_st\":\"IN\",\"clean_error\":\"E412\",\"Cnt\":\"4\"},{\"clean_st\":\"KS\",\"clean_error\":\"E421\",\"Cnt\":\"1\"},{\"clean_st\":\"GA\",\"clean_error\":\"S900\",\"Cnt\":\"1\"},{\"clean_st\":\"AZ\",\"clean_error\":\"E422\",\"Cnt\":\"4\"},{\"clean_st\":\"SC\",\"clean_error\":\"E427\",\"Cnt\":\"2\"},{\"clean_st\":\"LA\",\"clean_error\":\"E421\",\"Cnt\":\"2\"},{\"clean_st\":\"OR\",\"clean_error\":\"E412\",\"Cnt\":\"1\"},{\"clean_st\":\"CT\",\"clean_error\":\"E412\",\"Cnt\":\"6\"},{\"clean_st\":\"WA\",\"clean_error\":\"S800\",\"Cnt\":\"445\"},{\"clean_st\":\"MN\",\"clean_error\":\"E427\",\"Cnt\":\"5\"},{\"clean_st\":\"FL\",\"clean_error\":\"E412\",\"Cnt\":\"7\"},{\"clean_st\":\"CA\",\"clean_error\":\"SA00\",\"Cnt\":\"1\"},{\"clean_st\":\"MT\",\"clean_error\":\"E412\",\"Cnt\":\"2\"},{\"clean_st\":\"AL\",\"clean_error\":\"SA00\",\"Cnt\":\"1\"},{\"clean_st\":\"IN\",\"clean_error\":\"E421\",\"Cnt\":\"1\"},{\"clean_st\":\"CA\",\"clean_error\":\"S880\",\"Cnt\":\"4\"},{\"clean_st\":\"UT\",\"clean_error\":\"S900\",\"Cnt\":\"2\"},{\"clean_st\":\"CT\",\"clean_error\":\"S890\",\"Cnt\":\"1\"},{\"clean_st\":\"AK\",\"clean_error\":\"S900\",\"Cnt\":\"1\"},{\"clean_st\":\"OK\",\"clean_error\":\"S810\",\"Cnt\":\"2\"},{\"clean_st\":\"ND\",\"clean_error\":\"E412\",\"Cnt\":\"2\"},{\"clean_st\":\"NJ\",\"clean_error\":\"E421\",\"Cnt\":\"2\"},{\"clean_st\":\"NM\",\"clean_error\":\"S800\",\"Cnt\":\"84\"},{\"clean_st\":\"UT\",\"clean_error\":\"S820\",\"Cnt\":\"5\"},{\"clean_st\":\"VA\",\"clean_error\":\"S8B0\",\"Cnt\":\"1\"},{\"clean_st\":\"CA\",\"clean_error\":\"S910\",\"Cnt\":\"1\"},{\"clean_st\":\"VA\",\"clean_error\":\"E412\",\"Cnt\":\"3\"},{\"clean_st\":\"NJ\",\"clean_error\":\"E422\",\"Cnt\":\"1\"},{\"clean_st\":\"IN\",\"clean_error\":\"E422\",\"Cnt\":\"1\"},{\"clean_st\":\"TX\",\"clean_error\":\"S900\",\"Cnt\":\"1\"},{\"clean_st\":\"WY\",\"clean_error\":\"E412\",\"Cnt\":\"4\"},{\"clean_st\":\"WV\",\"clean_error\":\"S800\",\"Cnt\":\"54\"},{\"clean_st\":\"MI\",\"clean_error\":\"S900\",\"Cnt\":\"2\"},{\"clean_st\":\"NV\",\"clean_error\":\"E412\",\"Cnt\":\"3\"},{\"clean_st\":\"NY\",\"clean_error\":\"E427\",\"Cnt\":\"1\"},{\"clean_st\":\"IL\",\"clean_error\":\"S900\",\"Cnt\":\"1\"},{\"clean_st\":\"IL\",\"clean_error\":\"E412\",\"Cnt\":\"13\"},{\"clean_st\":\"NJ\",\"clean_error\":\"SA00\",\"Cnt\":\"1\"},{\"clean_st\":\"WA\",\"clean_error\":\"S8A0\",\"Cnt\":\"1\"},{\"clean_st\":\"CA\",\"clean_error\":\"S8C0\",\"Cnt\":\"1\"},{\"clean_st\":\"CO\",\"clean_error\":\"E412\",\"Cnt\":\"7\"},{\"clean_st\":\"DC\",\"clean_error\":\"E412\",\"Cnt\":\"1\"},{\"clean_st\":\"GA\",\"clean_error\":\"S800\",\"Cnt\":\"660\"},{\"clean_st\":\"IA\",\"clean_error\":\"S800\",\"Cnt\":\"151\"},{\"clean_st\":\"WY\",\"clean_error\":\"S800\",\"Cnt\":\"23\"},{\"clean_st\":\"TN\",\"clean_error\":\"E600\",\"Cnt\":\"1\"},{\"clean_st\":\"MD\",\"clean_error\":\"S800\",\"Cnt\":\"445\"},{\"clean_st\":\"PA\",\"clean_error\":\"E600\",\"Cnt\":\"1\"},{\"clean_st\":\"NY\",\"clean_error\":\"S8B0\",\"Cnt\":\"1\"},{\"clean_st\":\"NJ\",\"clean_error\":\"E427\",\"Cnt\":\"1\"},{\"clean_st\":\"TX\",\"clean_error\":\"S800\",\"Cnt\":\"1751\"},{\"clean_st\":\"CT\",\"clean_error\":\"E423\",\"Cnt\":\"1\"},{\"clean_st\":\"OH\",\"clean_error\":\"E412\",\"Cnt\":\"5\"},{\"clean_st\":\"KS\",\"clean_error\":\"S820\",\"Cnt\":\"1\"},{\"clean_st\":\"NY\",\"clean_error\":\"E600\",\"Cnt\":\"1\"},{\"clean_st\":\"NJ\",\"clean_error\":\"E412\",\"Cnt\":\"5\"},{\"clean_st\":\"NY\",\"clean_error\":\"E422\",\"Cnt\":\"1\"},{\"clean_st\":\"OK\",\"clean_error\":\"E412\",\"Cnt\":\"2\"},{\"clean_st\":\"MA\",\"clean_error\":\"E421\",\"Cnt\":\"1\"},{\"clean_st\":\"AR\",\"clean_error\":\"S820\",\"Cnt\":\"1\"},{\"clean_st\":\"PA\",\"clean_error\":\"S820\",\"Cnt\":\"2\"},{\"clean_st\":\"MA\",\"clean_error\":\"S910\",\"Cnt\":\"1\"},{\"clean_st\":\"NY\",\"clean_error\":\"E421\",\"Cnt\":\"8\"},{\"clean_st\":\"UT\",\"clean_error\":\"E412\",\"Cnt\":\"9\"},{\"clean_st\":\"NY\",\"clean_error\":\"S890\",\"Cnt\":\"2\"},{\"clean_st\":\"CO\",\"clean_error\":\"S800\",\"Cnt\":\"443\"},{\"clean_st\":\"MN\",\"clean_error\":\"S800\",\"Cnt\":\"401\"},{\"clean_st\":\"FL\",\"clean_error\":\"E214\",\"Cnt\":\"1\"},{\"clean_st\":\"UT\",\"clean_error\":\"S880\",\"Cnt\":\"1\"},{\"clean_st\":\"OH\",\"clean_error\":\"E421\",\"Cnt\":\"7\"},{\"clean_st\":\"IN\",\"clean_error\":\"S810\",\"Cnt\":\"1\"},{\"clean_st\":\"CA\",\"clean_error\":\"S800\",\"Cnt\":\"2645\"},{\"clean_st\":\"OR\",\"clean_error\":\"S800\",\"Cnt\":\"311\"},{\"clean_st\":\"WA\",\"clean_error\":\"S810\",\"Cnt\":\"1\"},{\"clean_st\":\"FL\",\"clean_error\":\"E216\",\"Cnt\":\"1\"},{\"clean_st\":\"VT\",\"clean_error\":\"E430\",\"Cnt\":\"1\"},{\"clean_st\":\"NY\",\"clean_error\":\"S800\",\"Cnt\":\"1206\"},{\"clean_st\":\"IL\",\"clean_error\":\"S800\",\"Cnt\":\"696\"},{\"clean_st\":\"MS\",\"clean_error\":\"E412\",\"Cnt\":\"4\"},{\"clean_st\":\"NV\",\"clean_error\":\"E422\",\"Cnt\":\"1\"},{\"clean_st\":\"NC\",\"clean_error\":\"SA00\",\"Cnt\":\"1\"},{\"clean_st\":\"MA\",\"clean_error\":\"S800\",\"Cnt\":\"441\"},{\"clean_st\":\"MI\",\"clean_error\":\"S880\",\"Cnt\":\"1\"},{\"clean_st\":\"GA\",\"clean_error\":\"E600\",\"Cnt\":\"2\"},{\"clean_st\":\"TX\",\"clean_error\":\"S891\",\"Cnt\":\"1\"},{\"clean_st\":\"OH\",\"clean_error\":\"E422\",\"Cnt\":\"1\"},{\"clean_st\":\"IA\",\"clean_error\":\"S8C0\",\"Cnt\":\"1\"},{\"clean_st\":\"KS\",\"clean_error\":\"S810\",\"Cnt\":\"1\"},{\"clean_st\":\"CA\",\"clean_error\":\"S890\",\"Cnt\":\"3\"},{\"clean_st\":\"WI\",\"clean_error\":\"S880\",\"Cnt\":\"1\"},{\"clean_st\":\"VT\",\"clean_error\":\"S800\",\"Cnt\":\"37\"},{\"clean_st\":\"FL\",\"clean_error\":\"S820\",\"Cnt\":\"1\"},{\"clean_st\":\"VA\",\"clean_error\":\"E421\",\"Cnt\":\"4\"},{\"clean_st\":\"VA\",\"clean_error\":\"S890\",\"Cnt\":\"2\"},{\"clean_st\":\"PA\",\"clean_error\":\"S900\",\"Cnt\":\"1\"},{\"clean_st\":\"ME\",\"clean_error\":\"E412\",\"Cnt\":\"3\"},{\"clean_st\":\"MO\",\"clean_error\":\"E421\",\"Cnt\":\"4\"},{\"clean_st\":\"IL\",\"clean_error\":\"E422\",\"Cnt\":\"2\"},{\"clean_st\":\"CT\",\"clean_error\":\"S800\",\"Cnt\":\"238\"},{\"clean_st\":\"UT\",\"clean_error\":\"E427\",\"Cnt\":\"1\"},{\"clean_st\":\"MI\",\"clean_error\":\"E422\",\"Cnt\":\"1\"},{\"clean_st\":\"ND\",\"clean_error\":\"S880\",\"Cnt\":\"1\"},{\"clean_st\":\"TN\",\"clean_error\":\"S800\",\"Cnt\":\"369\"},{\"clean_st\":\"IL\",\"clean_error\":\"E421\",\"Cnt\":\"3\"},{\"clean_st\":\"MO\",\"clean_error\":\"E422\",\"Cnt\":\"3\"},{\"clean_st\":\"MT\",\"clean_error\":\"E421\",\"Cnt\":\"1\"},{\"clean_st\":\"VI\",\"clean_error\":\"E421\",\"Cnt\":\"2\"},{\"clean_st\":\"ID\",\"clean_error\":\"S800\",\"Cnt\":\"126\"},{\"clean_st\":\"MA\",\"clean_error\":\"E412\",\"Cnt\":\"6\"},{\"clean_st\":\"MS\",\"clean_error\":\"S900\",\"Cnt\":\"1\"},{\"clean_st\":\"VA\",\"clean_error\":\"S800\",\"Cnt\":\"461\"},{\"clean_st\":\"LA\",\"clean_error\":\"S880\",\"Cnt\":\"2\"},{\"clean_st\":\"SD\",\"clean_error\":\"S800\",\"Cnt\":\"43\"},{\"clean_st\":\"VT\",\"clean_error\":\"E412\",\"Cnt\":\"3\"},{\"clean_st\":\"FL\",\"clean_error\":\"S880\",\"Cnt\":\"2\"},{\"clean_st\":\"NC\",\"clean_error\":\"S980\",\"Cnt\":\"1\"},{\"clean_st\":\"TX\",\"clean_error\":\"E600\",\"Cnt\":\"1\"},{\"clean_st\":\"MD\",\"clean_error\":\"SA00\",\"Cnt\":\"1\"},{\"clean_st\":\"AL\",\"clean_error\":\"E422\",\"Cnt\":\"1\"},{\"clean_st\":\"MI\",\"clean_error\":\"E421\",\"Cnt\":\"4\"},{\"clean_st\":\"HI\",\"clean_error\":\"S800\",\"Cnt\":\"53\"},{\"clean_st\":\"IA\",\"clean_error\":\"S920\",\"Cnt\":\"1\"},{\"clean_st\":\"VI\",\"clean_error\":\"E412\",\"Cnt\":\"1\"},{\"clean_st\":\"OH\",\"clean_error\":\"SA00\",\"Cnt\":\"1\"},{\"clean_st\":\"AL\",\"clean_error\":\"E421\",\"Cnt\":\"2\"},{\"clean_st\":\"MD\",\"clean_error\":\"E421\",\"Cnt\":\"5\"},{\"clean_st\":\"PA\",\"clean_error\":\"E412\",\"Cnt\":\"11\"},{\"clean_st\":\"IA\",\"clean_error\":\"E427\",\"Cnt\":\"1\"},{\"clean_st\":\"FL\",\"clean_error\":\"S900\",\"Cnt\":\"2\"},{\"clean_st\":\"MS\",\"clean_error\":\"E421\",\"Cnt\":\"4\"},{\"clean_st\":\"UT\",\"clean_error\":\"E422\",\"Cnt\":\"3\"},{\"clean_st\":\"NH\",\"clean_error\":\"E421\",\"Cnt\":\"3\"},{\"clean_st\":\"AL\",\"clean_error\":\"E427\",\"Cnt\":\"2\"},{\"clean_st\":\"UT\",\"clean_error\":\"E421\",\"Cnt\":\"2\"},{\"clean_st\":\"VA\",\"clean_error\":\"SA00\",\"Cnt\":\"2\"},{\"clean_st\":\"SD\",\"clean_error\":\"E421\",\"Cnt\":\"2\"},{\"clean_st\":\"AR\",\"clean_error\":\"S900\",\"Cnt\":\"1\"},{\"clean_st\":\"OK\",\"clean_error\":\"E422\",\"Cnt\":\"1\"},{\"clean_st\":\"MI\",\"clean_error\":\"S820\",\"Cnt\":\"1\"},{\"clean_st\":\"KY\",\"clean_error\":\"E412\",\"Cnt\":\"1\"},{\"clean_st\":\"NY\",\"clean_error\":\"S880\",\"Cnt\":\"2\"},{\"clean_st\":\"MO\",\"clean_error\":\"E412\",\"Cnt\":\"3\"},{\"clean_st\":\"WV\",\"clean_error\":\"E422\",\"Cnt\":\"1\"},{\"clean_st\":\"MT\",\"clean_error\":\"S860\",\"Cnt\":\"1\"},{\"clean_st\":\"OK\",\"clean_error\":\"E423\",\"Cnt\":\"1\"},{\"clean_st\":\"CA\",\"clean_error\":\"E412\",\"Cnt\":\"16\"},{\"clean_st\":\"MD\",\"clean_error\":\"E412\",\"Cnt\":\"6\"},{\"clean_st\":\"NJ\",\"clean_error\":\"S800\",\"Cnt\":\"495\"},{\"clean_st\":\"NC\",\"clean_error\":\"E412\",\"Cnt\":\"4\"},{\"clean_st\":\"TX\",\"clean_error\":\"S860\",\"Cnt\":\"2\"},{\"clean_st\":\"PA\",\"clean_error\":\"E421\",\"Cnt\":\"11\"},{\"clean_st\":\"IA\",\"clean_error\":\"E422\",\"Cnt\":\"1\"},{\"clean_st\":\"NY\",\"clean_error\":\"SA00\",\"Cnt\":\"2\"},{\"clean_st\":\"IL\",\"clean_error\":\"S8A0\",\"Cnt\":\"1\"},{\"clean_st\":\"GA\",\"clean_error\":\"S880\",\"Cnt\":\"1\"},{\"clean_st\":\"WV\",\"clean_error\":\"E421\",\"Cnt\":\"1\"},{\"clean_st\":\"IL\",\"clean_error\":\"S810\",\"Cnt\":\"1\"},{\"clean_st\":\"IA\",\"clean_error\":\"S880\",\"Cnt\":\"2\"},{\"clean_st\":\"MT\",\"clean_error\":\"S800\",\"Cnt\":\"69\"},{\"clean_st\":\"VT\",\"clean_error\":\"E421\",\"Cnt\":\"2\"},{\"clean_st\":\"SC\",\"clean_error\":\"E412\",\"Cnt\":\"2\"},{\"clean_st\":\"IN\",\"clean_error\":\"S800\",\"Cnt\":\"311\"},{\"clean_st\":\"UT\",\"clean_error\":\"S800\",\"Cnt\":\"165\"},{\"clean_st\":\"GA\",\"clean_error\":\"E421\",\"Cnt\":\"8\"},{\"clean_st\":\"CO\",\"clean_error\":\"S890\",\"Cnt\":\"1\"},{\"clean_st\":\"OK\",\"clean_error\":\"E421\",\"Cnt\":\"3\"},{\"clean_st\":\"ID\",\"clean_error\":\"E421\",\"Cnt\":\"3\"},{\"clean_st\":\"KS\",\"clean_error\":\"S800\",\"Cnt\":\"150\"},{\"clean_st\":\"SC\",\"clean_error\":\"S820\",\"Cnt\":\"1\"},{\"clean_st\":\"TX\",\"clean_error\":\"S880\",\"Cnt\":\"3\"},{\"clean_st\":\"MN\",\"clean_error\":\"S810\",\"Cnt\":\"1\"},{\"clean_st\":\"OH\",\"clean_error\":\"S800\",\"Cnt\":\"637\"},{\"clean_st\":\"AR\",\"clean_error\":\"S800\",\"Cnt\":\"134\"},{\"clean_st\":\"PA\",\"clean_error\":\"S800\",\"Cnt\":\"647\"},{\"clean_st\":\"IA\",\"clean_error\":\"E421\",\"Cnt\":\"1\"},{\"clean_st\":\"PA\",\"clean_error\":\"E422\",\"Cnt\":\"2\"},{\"clean_st\":\"WA\",\"clean_error\":\"E421\",\"Cnt\":\"4\"},{\"clean_st\":\"DC\",\"clean_error\":\"S800\",\"Cnt\":\"90\"}]}", "designMode": false, "surfacePadding": "0", "content": [], "fields": [] } };
    var ddlUrl = "http://10.173.147.1:8010/WsWorkunits/WUResult.json?Wuid=W20151102-091253&ResultName=leeddx_issue_986_formddl_Comp_Ins002_DDL";
    var marshaller = null;
    var stack = [];
    var stackFinger = -1;
    var mainDiv = d3.select("#main").insert("div", "hr")
        .style("opacity", 0)
    ;
    if (persistStr) {
        Persist.create(persistStr, function (marshaller) {
            setMarshaller(marshaller);
        });
    } else if (ddlUrl) {
        marshaller = new HTML()
            .ddlUrl(ddlUrl)
        ;
        setMarshaller(marshaller);
    }

    function setMarshaller(_marshaller) {
        marshaller = _marshaller;
        marshaller
            .on("vizEvent", function (widget, eventID, row, col, selected) {
                switch (eventID) {
                    case "post_click":
                        updateHistory();
                        break;
                }
            })
        ;
        populateContent();
    }

    function populateContent() {
        var origPopulateContent = marshaller.populateContent;
        marshaller.populateContent = function () {
            var retVal = origPopulateContent.apply(this, arguments);

            var dim = marshaller.getDimensions();
            var prevRow = -1;
            var divRow;
            this.sortedContent().forEach(function (cell) {
                if (prevRow !== cell.gridRow()) {
                    prevRow = cell.gridRow();
                    divRow = mainDiv.append("div")
                        .attr("class", "row")
                    ;
                }
                var cellDiv = divRow.append("div")
                    .attr("class", "col-md-" + Math.floor(cell.gridColSpan() * 12 / dim.width))
                    .append("div")
                        .attr("style", "width:100%; height:480px")
                ;
                var cellWidget = cell.widget();
                if (cellWidget.title) {
                    var origTitleMethod = cellWidget.title;
                    cellWidget.title = function(_){
                        var retVal = origTitleMethod.apply(this, arguments);
                        if (arguments.length) {
                            console.log(this.id() + " - title changed:  " + _);
                        }
                        return retVal;
                    }
                }
                cell
                    .target(cellDiv.node())
                ;
            });

            return retVal;
        };

        marshaller
            .render(function () {
                mainDiv.transition()
                    .style("opacity", 1)
                ;
                marshaller.renderContent(function () {
                    updateHistory();
                });
            })
        ;
    }

    var previous = d3.select("#previous")
        .on("click", function () {
            stackFinger--;
            refreshNavButtons();
            marshaller.primeData(stack[stackFinger]).then(function () {
                marshaller.renderContent();
            });
        })
    ;
    var next = d3.select("#next")
        .on("click", function () {
            stackFinger++;
            refreshNavButtons();
            marshaller.primeData(stack[stackFinger]).then(function () {
                marshaller.renderContent();
            });
        })
    ;
    var reset = d3.select("#reset")
        .on("click", function () {
            marshaller.primeData().then(function () {
                marshaller.renderContent(function () {
                    updateHistory();
                });
            });
        });
    ;
    var fetch = d3.select("#fetch")
        .on("click", function () {
            marshaller.primeData({
                "statesummary": {
                    clean_st: "CO"
                },
                "errorsummary": {
                    clean_error: "E412"
                }
            }).then(function () {
                updateHistory();
            });
        });
    ;

    function updateHistory() {
        stack.length = stackFinger + 1;
        stack.push(marshaller.serializeRequests());
        stackFinger = stack.length - 1;
        refreshNavButtons();
    }

    function refreshNavButtons() {
        previous
            .attr("disabled", stack.length && stackFinger > 0 ? null : true)
        ;
        next
            .attr("disabled", stack.length && stackFinger < stack.length - 1 ? null : true)
        ;
    }

    return function () {
        if (marshaller) {
            marshaller
                .resizeContent()
                .renderContent()
            ;
        }
    };
}));