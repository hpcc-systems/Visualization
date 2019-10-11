
EXPORT h3Helper(__path__, __lat__, __lng__, __CSV__ = FALSE) := FUNCTIONMACRO

    RETURN MODULE
        IMPORT lib_h3;

        //  ---
        SHARED filePath := __path__;
        SHARED indexPath := filePath + '::h3::index';
        SHARED summaryPath := filePath + '::summary';
        SHARED __layout__ := RECORDOF(filePath, {h3_degrees_t __lat__, h3_degrees_t __lng__}, LOOKUP);

        dsCSV := DATASET(filePath, {__layout__, UNSIGNED8 RecPos{VIRTUAL(fileposition)}}, CSV);
        dsFlat := DATASET(filePath, {__layout__, UNSIGNED8 RecPos{VIRTUAL(fileposition)}}, FLAT);
        SHARED ds := IF(__CSV__, dsCsv, dsFlat);

        SHARED Index15 := INDEX(ds, {
                eclIndex := h3.ECLIndex(__lat__, __lng__, 15),
            },{
                RecPos
            }, indexPath);

        EXPORT buildIndex15 := BUILDINDEX(Index15, OVERWRITE);

        SHARED EmptyPolyDS := DATASET([], h3_point_t);
        
        SHARED H3IndexRecord := RECORD
            h3_index_t h3Index;
        END;

        //  Region  ---

        SHARED RegionLayout := RECORD
            h3_degrees_t latitude;
            h3_degrees_t longitude;
            __layout__ payload;
        END;

        SHARED RegionLayout toLayout(ds L):= TRANSFORM
            SELF.latitude := L.__lat__;
            SELF.longitude := L.__lng__;
            SELF.payload := L;
        END;

        EXPORT regionQuery := FUNCTION
            DATASET(h3_point_t) polygon := EmptyPolyDS : stored('polygon');
            UNSIGNED1 resolution := 3 : stored('resolution');
            UNSIGNED4 threshold := 5000 : stored('threshold');

            h3IndexSet := DATASET(h3.compact(h3.polyfill(polygon, resolution)), H3IndexRecord);
            eclIndexSet := TABLE(h3IndexSet, { eclIndex := h3.toECLIndex(h3Index), eclIndexLen := h3.resolution(h3Index) + 1; });

            joinedIndex := JOIN(eclIndexSet, Index15, 
                LEFT.eclIndex = RIGHT.eclIndex[1..LEFT.eclIndexLen],
                LIMIT(threshold + 1, SKIP));

            joinedIndexCount := COUNT(joinedIndex);
            retValCount := OUTPUT(joinedIndexCount, NAMED('count'));

            emptyOutDS := DATASET([], RegionLayout);
            outDS := FETCH(ds, joinedIndex, RIGHT.RecPos, toLayout(LEFT));
            retValData :=  OUTPUT(IF(joinedIndexCount <= threshold, outDS, emptyOutDS), ALL, NAMED('data'));

            RETURN PARALLEL(retValcount, retValData);
        END;

        //  Summary  ---

        SHARED SummaryTable(res) := TABLE(Index15, {
                STRING16 summaryEclIndex{XPATH('eclIndex')} := eclIndex[1..res], 
                summaryRowCount{XPATH('rowCount')} := COUNT(GROUP)
            }, eclIndex[1..res]);

        SHARED SummaryIndex := INDEX(
                SummaryTable(1) + 
                SummaryTable(2) + 
                SummaryTable(3) + 
                SummaryTable(4) + 
                SummaryTable(5) + 
                SummaryTable(6) + 
                SummaryTable(7) + 
                SummaryTable(8) + 
                SummaryTable(9) + 
                SummaryTable(10) + 
                SummaryTable(11) + 
                SummaryTable(12) + 
                SummaryTable(13) + 
                SummaryTable(14) + 
                SummaryTable(15) + 
                SummaryTable(16), {
                summaryEclIndex
            },{
                summaryRowCount
            }, summaryPath);            

        EXPORT buildSummaryIndex := BUILDINDEX(SummaryIndex, OVERWRITE);

        EXPORT buildAllIndex := PARALLEL(buildIndex15, buildSummaryIndex);

        EXPORT summaryQuery := FUNCTION
            DATASET(h3_point_t) polygon := EmptyPolyDS : stored('polygon');
            UNSIGNED1 resolution := 3 : stored('resolution');
            UNSIGNED4 threshold := 5000 : stored('threshold');

            h3IndexSet := DATASET(h3.polyfill(polygon, resolution), H3IndexRecord);
            eclIndexSet := TABLE(h3IndexSet, { h3Index, eclIndex := h3.toECLIndex(h3Index), eclIndexLen := h3.resolution(h3Index) + 1; });

            joinedRecord := RECORD
                h3_point_t center;
                DATASET(h3_point_t) boundary;
                UNSIGNED8 rowCount;
            END;

            joinedRecord doJoin(eclIndexSet l, SummaryIndex r) := TRANSFORM
                SELF.center := h3.center(l.h3Index)[1];
                SELF.boundary := h3.boundary(l.h3Index);
                SELF.rowCount := r.summaryRowCount;
            END;

            joinedIndex := JOIN(eclIndexSet, SummaryIndex, 
                LEFT.eclIndex = RIGHT.summaryEclIndex,
                doJoin(LEFT, RIGHT), LIMIT(threshold + 1, SKIP));

            retValData :=  OUTPUT(joinedIndex, ALL, NAMED('data'));

            retValCount := OUTPUT(SUM(joinedIndex, joinedIndex.rowCount), ALL, NAMED('count'));

            RETURN PARALLEL(retValData, retValCount);
        END;

        EXPORT h3Query := FUNCTION
            DATASET(h3_point_t) polygon := EmptyPolyDS : stored('polygon');
            UNSIGNED1 resolution := 3 : stored('resolution');
            UNSIGNED4 threshold := 5000 : stored('threshold');

            h3IndexSet := DATASET(h3.polyfill(polygon, resolution), H3IndexRecord);
            eclIndexSet := TABLE(h3IndexSet, { h3Index, eclIndex := h3.toECLIndex(h3Index), eclIndexLen := h3.resolution(h3Index) + 1; });

            joinedRecord := RECORD
                h3_point_t center;
                DATASET(h3_point_t) boundary;
                UNSIGNED8 rowCount;
            END;

            joinedRecord doJoin(eclIndexSet l, SummaryIndex r) := TRANSFORM
                SELF.center := h3.center(l.h3Index)[1];
                SELF.boundary := h3.boundary(l.h3Index);
                SELF.rowCount := r.summaryRowCount;
            END;

            joinedIndex := JOIN(eclIndexSet, SummaryIndex, 
                LEFT.eclIndex = RIGHT.summaryEclIndex,
                doJoin(LEFT, RIGHT), LIMIT(threshold + 1, SKIP));

            retValSummary :=  OUTPUT(joinedIndex, ALL, NAMED('summary'));

            total := SUM(joinedIndex, joinedIndex.rowCount);

            retValTotal := OUTPUT(total, ALL, NAMED('total'));

            regionJoinedIndex := JOIN(eclIndexSet, Index15, 
                LEFT.eclIndex = RIGHT.eclIndex[1..LEFT.eclIndexLen],
                LIMIT(threshold + 1, SKIP));

            emptyOutDS := DATASET([], RegionLayout);
            outDS := FETCH(ds, regionJoinedIndex, RIGHT.RecPos, toLayout(LEFT));
            retValData := OUTPUT(IF(total <= threshold, outDS, emptyOutDS), ALL, NAMED('data'));

            RETURN PARALLEL(retValSummary, retValTotal, retValData);
        END;
    END;
ENDMACRO;

//  Dummy code to force syntax errors  ---
dummy := h3Helper('dummy::file::ignore::any::warnings', lat, lng);
