function _parseRawJson(arr, cols) {
    var ret = [];
    arr.forEach(function(row) {
        var retRow = [];
        cols.forEach(function(col) {
            retRow.push(row[col]);
        });
        ret.push(retRow);
    });
    return ret;
}
var jsonData = {
    'Summary YTD YTG': [
        {
            section: [
//                ["Expense Detail", "YTD", "YTG", "FY", "", "Avg YTD", "Avg YTG", "B/(W)"],
                ["Cost of Sales", 56, 109, 165, "", 9, 18, -9],
                ["Salary / Benefits", 58863, 64376, 123239, "", 9811, 10729, -919],
                ["Contractors", 8768, 14975, 23744, "", 1461, 2496, -1034],
                ["CAPZ", -9543, -17178, -26721, "", -1590, -2863, 1273],
                ["Other labor related", 435, 314, 748, "", 72, 52, 20],
//                ["Labor Expense", 58524, 62487, 121010, "", 9754, 10414, -661],
            ]
        },
        {
            section: [
                ["Marketing", 216, 230, 446, "", 36, 38, -2],
                ["Amortization/Depreciation", 11658, 13725, 25383, "", 1943, 2287, -344],
                ["Hardware/Software", 7830, 9184, 17014, "", 1305, 1531, -226],
                ["Facilities / Office Supplies / Taxes", 3878, 4562, 8440, "", 646, 760, -114],
                ["Consulting", 304, 612, 916, "", 51, 102, -51],
                ["Professional Fees - Legal", 144, 179, 323, "", 24, 30, -6],
                ["Postage and Freight", 10, 11, 21, "", 2, 2, 0],
                ["Travel & Meetings", 889, 1207, 2096, "", 148, 201, -53],
                ["Chargebacks", -1937, -1302, -3238, "", -323, -217, -106],
                ["Other Expenses", 129, 503, 631, "", 21, 84, -62],
                        //["Total Expense", 81701, 91507, 173208, "", 13617, 15251, -1634],
            ]
        },
        {
            section: [
                ["Period End FTE's", 994, 1002, 1002, "", 994, 1002, -7],
            ]
        },
        {
            section: [
                ["CAPX", 6464, 19806, 26270, "", 1077, 3301, -2224],
                ["CAPZ", 9543, 17178, 26721, "", 1590, 2863, -1273],
                        //["Total Capital", 16007, 36984, 52991, "", 2668, 6164, -3496],
            ]
        },
        {
            section: [
                //["", "Jun", "RF2", "RF2", "", "Jun", "RF2", "YTG Avg"],
                //["VP", "YTD", "YTG", "FY", "", "Avg YTD", "Avg YTG", "B/(W)"],
                ["Sheppard", 2145, 2264, 4409, "", 358, 377, -20],
                ["Foglia", 8481, 8769, 17250, "", 1414, 1461, -48],
                ["Villanustre", 1691, 2320, 4011, "", 282, 387, -105],
                ["Sunderman", 7955, 10445, 18400, "", 1326, 1741, -415],
                ["Kurzweil", 6448, 7095, 13543, "", 1075, 1182, -108],
                ["Niemela", 8839, 10144, 18982, "", 1473, 1691, -218],
                ["Barber", 11879, 15236, 27115, "", 1980, 2539, -559],
                ["Executive*", 5302, 10212, 15514, "", 884, 1702, -818],
                ["Ricketts", 15847, 17783, 33631, "", 2641, 2964, -323],
                ["Simmons - Batch", 4280, 5389, 9669, "", 713, 898, -185],
                ["Glowacki - Healthcare", 6718, 5303, 12021, "", 1120, 884, 236],
                //["VP Sub-Total", 79586, 94960, 174546, "", 13264, 15827, -2562],
                ["Depreciation", 9671, 11157, 20828, "", 1612, 1860, -248],
                ["Amortization", 1988, 2568, 4556, "", 331, 428, -97],
                ["CAPZ", -9543, -17178, -26721, "", -1590, -2863, 1273],
                        //["Technology Total", 81701, 91507, 173208, "", 13617, 15251, -1634],
            ]
        }
    ],
    'Monthly Financial Summary': [
        {
            section: [
                //["", "", "Actual", "RF2", "", "B/(W) RF2", "", "", "Actual", "RF2", "", "B/(W) RF2", ""],
                //["", "", "Jun", "Jun", "", "$", "%", "", "Jun YTD", "Jun YTD", "", "$", "%"],
                ["Labor", "", 9429, 9677, "", 248, 2.6, "", 58524, 58771, "", 248, 0.4],
                ["Non-Labor", "", 4041, 4153, "", 112, 2.8, "", 23177, 23289, "", 112, 0.5],
                ["Total OPEX", "", 13469, 13829, "", 360, 2.7, "", 81701, 82061, "", 360, 0.4],
                ["YE Direct FTE's", "", 994, 1013, "", 19, 1.9, "", 994, 1013, "", 19, 1.9],
                ["Capital Equipment (CAPX)", "", 1832, 2980, "", 1148, 62.7, "", 6464, 7612, "", 1148, 17.8],
                ["Capital Dvlpmnt (CAPZ)", "", 2798, 3092, "", 293, 10.5, "", 9543, 9836, "", 293, 3.1],
                ["Total Capital", "", 4630, 6072, "", 1442, 31.1, "", 16007, 17448, "", 1442, 9],
            ]
        }
    ],
    'Headcount Summary': [
        {
            section: [
                //[2015, "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Total Year"],
                ["Backfills", 0, 0, 0, 38, 35, 28, 28, 28, 28, 28, 28, 28, 28],
                ["2015 New Hires", 1, 0, 0, 0, 0, 21, 21, 21, 21, 21, 22, 22, 22],
                ["Integration Rollover", 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 6, 6],
                ["Interns (Jun-Aug)", 0, 0, 0, 0, 0, 6, 6, 0, 0, 0, 0, 0, 0],
                ["Attrition", 0, 0, 0, -34, -34, -34, -34, -34, -34, -34, -34, -34, -34],
                ["Other (Timing)*", 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0],
                ["Total Opens", 1, 0, 0, 4, 1, 20, 21, 21, 21, 21, 22, 22, 22],
            ]
        },
        {
            section: [
                //["Summary", "RF2 Headcount"],
                ["YTD Actuals (Jun)", 994],
                ["Current Backfills", 28],
                ["2015 New Hires", 22],
                ["Integration Rollover", 6],
                ["Attrition", -34],
                ["Less Interns", -14],
                ["Total Tech", 1003],
            ]
        }
    ],
    'CAPx': [
        {
            section: [
                //[2015, "Jan Act", "Feb Act", "Mar act", "Apr Act", "May Act", "Jun Act", "Jul Fcst", "Aug Fcst", "Sep Fcst", "Oct Fcst", "Nov Fcst", "Dec Fcst"],
                ["Business Cases", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                ["UK Data Center Consolidation", 0, 0, 0, 0, 0, 0, 0, 686, 700, 500, 536, 0],
                ["Base CAPX", 125, 290, 781, 2504, 922, 1235, 3021, 2012, 2009, 3806, 1756, 1391],
                ["TBC CAPX", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2000, 0],
                ["Verid", 0, 0, 0, 0, 0, 0, 0, 0, 250, 0, 0, 0],
                ["World Compliance", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                ["Enclarity", 0, 0, 0, 0, 0, 597, 0, 0, 0, 0, 0, 443],
                ["MedAI", 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 597, 0],
                ["EDIWatch", 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 0, 0],
            ]
        },
//        {
//            section: [
//                ["2015 - Acquisition - Tech P&L", "", "", "", "", "", "", "", "", "", "", "", ""],
//                ["Verid", 0, 0, 0, 0, 0, 0, 0, 0, 250, 0, 0, 0],
//                ["World Compliance", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//                ["Enclarity", 0, 0, 0, 0, 0, 597, 0, 0, 0, 0, 0, 443],
//                ["MedAI", 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 597, 0],
//                ["EDIWatch", 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 0, 0],
//            ]
//        },
        {
            section: [
                ["UK Data Center Consolidation", 0, 0, 0, 0, 0, 0, 0, 686, 700, 500, 536, 0, 2421],
                ["Business Cases", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                ["Base CAPX", 125, 290, 781, 2504, 922, 1235, 3021, 2012, 2009, 3806, 1756, 1391, 19851],
                ["TBC CAPX", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2000, 0, 2000],
                //["Total Underlying", 125, 290, 781, 2504, 922, 1235, 3021, 2698, 2709, 4306, 4291, 1391, 24273],
                ["Verid", 0, 0, 0, 0, 0, 0, 0, 0, 250, 0, 0, 0, 250],
                ["World Compliance", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                ["Enclarity", 0, 0, 0, 0, 0, 597, 0, 0, 0, 0, 0, 443, 1040],
                ["MedAI", 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 597, 0, 607],
                ["EDIWatch", 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 0, 0, 100],
                //["Total Acquisition", 0, 11, 0, 0, 0, 597, 0, 0, 250, 100, 597, 443, 1997],
            ]
        },
        {
            section: [
                ["000's", "Act", "Act", "Act", "Act", "Act", "Act", "Fcst", "Fcst", "Fcst", "Fcst", "Fcst", "Fcst", "YTD", "YTG", "Total"],
                ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jun", "Fcst", "FY 2015"],
                ["Total CAPx", 125, 300, 781, 2504, 922, 1832, 3021, 2698, 2959, 4406, 4888, 1834, 6464, 19806, 26270],
            ]
        },
        {
            section: [
                //["CAPX Category", 2014, "2015 Fcst"],
                ["TBC CAPX", 0, 2],
                ["General Purchases", 0.9, 0.3],
                ["UK / International", 2.8, 4.4],
                ["Facilities", 3.9, 2.1],
                ["Helpdesk", 1.4, 1.4],
                ["HPCC", 4.6, 4.4],
                ["Linux", 2.9, 5.7],
                ["Network / Storage", 4.7, 4.2],
                ["Windows", 1.5, 1.8],
            ]
        },
        {
            section: [
                //["", "Act", "Act", "Act", "Act", "RF2", "RF2", "RF2", "RF2", "RF2", "RF2", "RF2", "RF2"],
                //["CAPx", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                ["Actfcst", 125, 300, 781, 2504, 922, 1832, 3021, 2698, 2959, 4406, 4888, 1834],
                ["RF2", 125, 300, 781, 2504, 922, 2980, 4921, 1232, 2132, 4442, 4102, 1828],
                ["Var", 0, 0, 0, 0, 0, -1148, -1900, 1466, 826, -36, 786, 6],
            ]
        }
    ],
}