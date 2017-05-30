#!/bin/bash
SOURCE=${1-./EGM_8-0SHP_20151028}
TARGET=${2-./EuroGlobalMap}
function createTopoJSON {
	COUNTRY=$1
	rm $TARGET/$COUNTRY.json;
	ogr2ogr -f GeoJSON $TARGET/PolbndA.geojson $SOURCE/DATA/Countries/$COUNTRY/PolbndA.shp;
	topojson -o $TARGET/$COUNTRY.json -- $TARGET/PolbndA.geojson;
	rm $TARGET/PolbndA.geojson;
}

function processAll {
	for d in $SOURCE/DATA/Countries/*/ ; do
		#createTopoJSON `basename "$d"`
		(node geodecode ./EuroGlobalMap/`basename "$d"`.json > ./EuroGlobalMap/`basename "$d"`_idx.json )
	done
}

#processAll;
(node geodecode ../src/map/TopoJSON/ND.json > ../src/map/TopoJSON/ND_idx.json )
(node geodecode ../src/map/TopoJSON/GB.json > ../src/map/TopoJSON/GB_idx.json )
(node geodecode  ../src/map/TopoJSON/IE.json > ../src/map/TopoJSON/IE_idx.json )

