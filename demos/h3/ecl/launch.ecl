import $.rawData;
import $.^ as root;

canada := root.h3Helper('~gjs::canada', lat, lon);
cities := root.h3Helper('~gjs::cities', latitude, longitude);

tmp := MODULE
    EXPORT createLF := rawData.create;

    //  City  ---

    EXPORT cityIndex() := FUNCTION
        RETURN PARALLEL(#workunit('name', 'City_BuildIndex'), cities.buildAllIndex);
    END;

    EXPORT cityRegionQuery() := FUNCTION
        RETURN PARALLEL(#workunit('name', 'City_Region'), cities.regionQuery);
    END;

    EXPORT citySummaryQuery() := FUNCTION
        RETURN PARALLEL(#workunit('name', 'City_Summary'), cities.summaryQuery);
    END;

    EXPORT cityH3Query() := FUNCTION
        RETURN PARALLEL(#workunit('name', 'City_H3'), canada.h3Query);
    END;

    //  Canada  ---

    EXPORT canadaIndex() := FUNCTION
        RETURN PARALLEL(#workunit('name', 'Canada_BuildIndex'), canada.buildAllIndex);
    END;

    EXPORT canadaRegionQuery() := FUNCTION
        RETURN PARALLEL(#workunit('name', 'Canada_Region'), canada.regionQuery);
    END;

    EXPORT canadaSummaryQuery() := FUNCTION
        RETURN PARALLEL(#workunit('name', 'Canada_Summary'), canada.summaryQuery);
    END;

    EXPORT canadaH3Query() := FUNCTION
        RETURN PARALLEL(#workunit('name', 'Canada_H3'), canada.h3Query);
    END;

END;

//def.create;

//tmp.cityIndex();
//tmp.cityRegionQuery();
//tmp.citySummaryQuery();
tmp.cityH3Query();

//tmp.canadaIndex();
//tmp.canadaRegionQuery();
//tmp.canadaSummaryQuery();
//tmp.canadaH3Query();

//tmp.boundaries();
