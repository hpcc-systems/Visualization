EXPORT rawData := MODULE

    EXPORT Cities := MODULE

        SHARED raw_rec := RECORD
            STRING geonameid;
            STRING name;
            STRING asciiname;
            STRING alternatenames;
            STRING latitude;
            STRING longitude;
            STRING feature_class;
            STRING feature_code;
            STRING country_code;
            STRING cc2;
            STRING admin1_code;
            STRING admin2_code;
            STRING admin3_code;
            STRING admin4_code;
            STRING population;
            STRING elevation;
            STRING dem;
            STRING timezone;
            STRING modification_date;
        END;

        raw := DATASET('~file::localhost::var::lib::^H^P^C^C^Systems::mydropzone::cities15000.csv', raw_rec, CSV);
        //raw := DATASET('~gjs::cities_raw', raw_rec, CSV);
        SHARED cleaned_raw := raw(geonameid!='geonameid' AND longitude != 'GB');

        EXPORT analyse := FUNCTION
            // IMPORT DataPatterns;
            // recordDefinition := DataPatterns.BestRecordStructure(d3, , TRUE, TRUE);
            // recDef := OUTPUT(recordDefinition, NAMED('recordDefinition'), ALL);
            recDef := 'unsupported';
            RETURN PARALLEL(recDef);
        END;

        EXPORT Layout := RECORD
            UNSIGNED4 geonameid;
            REAL8 latitude;
            REAL8 longitude;
            STRING49 asciiname;
            UNSIGNED4 population;
            INTEGER2 elevation;
            STRING49 name;
            STRING1 feature_class;
            STRING5 feature_code;
            STRING2 country_code;
            STRING5 cc2;
            STRING8 admin1_code;
            STRING30 admin2_code;
            STRING10 admin3_code;
            STRING11 admin4_code;
            INTEGER3 dem;
            STRING30 timezone;
            STRING8 modification_date;
        END;

        Layout MakeNewLayout(raw_rec r) := TRANSFORM
            SELF.geonameid := (UNSIGNED4)r.geonameid;
            SELF.latitude := (REAL8)r.latitude;
            SELF.longitude := (REAL8)r.longitude;
            SELF.population := (UNSIGNED4)r.population;
            SELF.elevation := (INTEGER2)r.elevation;
            SELF.dem := (INTEGER3)r.dem;
            SELF := r;
        END;
        cleaned := PROJECT(cleaned_raw, MakeNewLayout(LEFT));
        EXPORT create := OUTPUT(cleaned, , '~gjs::cities', OVERWRITE);

        EXPORT path := '~gjs::cities';
        EXPORT ds := DATASET(path, Layout, FLAT);
    END;

    EXPORT Canada := MODULE

        SHARED raw_rec := RECORD
            STRING LON;
            STRING LAT;
            STRING NUMBER;
            STRING STREET;
            STRING UNIT;
            STRING CITY;
            STRING DISTRICT;
            STRING REGION;
            STRING POSTCODE;
            STRING ID;
            STRING HASH
        END;

        raw := DATASET('~file::localhost::var::lib::^H^P^C^C^Systems::mydropzone::canada.csv', raw_rec, CSV);
        //raw := DATASET('~gjs::canada_raw', raw_rec, CSV);
        SHARED cleaned_raw := raw(LON!='LON');

        EXPORT analyse := FUNCTION
            // IMPORT DataPatterns;
            // recordDefinition := DataPatterns.BestRecordStructure(d3, , TRUE, TRUE);
            // recDef := OUTPUT(recordDefinition, NAMED('recordDefinition'), ALL);
            recDef := 'unsupported';
            RETURN PARALLEL(recDef);
        END;

        EXPORT Layout := RECORD
            REAL8 lon;
            REAL8 lat;
            STRING18 number;
            STRING street;
            STRING24 unit;
            STRING30 city;
            STRING17 district;
            STRING7 region;
            STRING10 postcode;
            STRING24 id;
            STRING16 hash;
        END;

        Layout MakeNewLayout(raw_rec r) := TRANSFORM
            SELF.lon := (REAL8)r.lon;
            SELF.lat := (REAL8)r.lat;
            SELF := r;
        END;
        cleaned := PROJECT(cleaned_raw, MakeNewLayout(LEFT));
        EXPORT create := OUTPUT(cleaned, , '~gjs::canada', OVERWRITE);

        EXPORT path := '~gjs::canada';
        EXPORT ds := DATASET(path, Layout, FLAT);
    END;

    EXPORT create := FUNCTION
        RETURN PARALLEL(Cities.create, Canada.create);
    END;

    EXPORT main := FUNCTION
        cities := OUTPUT(cities.ds);
        canada := OUTPUT(canada.ds);
        RETURN PARALLEL(cities, canada);
    END;
END;
