function parseXML(xmlStr) {
    console.log("xmlStr === ", xmlStr);
    const defaultIcon = "fa-leaf";
    const iconMap = {
        "boat": "ves",
        "house": "fa-home",
        "organ": "fa-building",
        "gun": "",
        "anon": "fa-user",
        "Entity": "fa-user",
        "offndr": "fa-fingerprint",
        "jet": "fa-fighter-jet",
        "car": "fa-car",
        "corp": "fa-building",
    };
    const linkTypeMap = {
        "assoc": {
            "label": "Person",
            "icon": "fa-user",
        },
        "addr": {
            "label": "Addresses",
            "icon": "fa-home",
        },
        "corp": {
            "label": "Businesses",
            "icon": "fa-building",
        },
        "veh": {
            "label": "Vehicles",
            "icon": "fa-car",
        },
        "ves": {
            "label": "Vessels",
            "icon": "fa-ship",
        },
        "rel": {
            "label": "Relatives",
            "icon": "fa-users",
        },
        "air": {
            "label": "Aircraft",
            "icon": "fa-fighter-jet",
        },
        "prop": {
            "label": "Property",
            "icon": "fa-home",
        },
    };

    const xmlDoc = new DOMParser().parseFromString(xmlStr, "text/xml");
    console.log("xmlDoc === ", xmlDoc);
    const idMap = {};
    const categoriesMap = {};
    const categoryIconTypeMap = {};
    const vertices = [];
    const edges = [];
    [...xmlDoc.querySelectorAll("LinkType")].forEach(n => {
        const name = n.getAttribute("Name");
        const color = "#" + (Number(n.getAttribute("Colour")).toString(16));
        if (!linkTypeMap[name]) linkTypeMap[name] = {};
        linkTypeMap[name].color = color;
    });
    const entityIconMap = [...xmlDoc.querySelectorAll("EntityType")].reduce((r, n, i) => {
        const name = n.getAttribute("Name");
        const icon = n.getAttribute("IconFile");
        r[name] = icon;
        return r;
    }, {});
    entityIconMap.Entity = "anon";
    console.log("entityIconMap === ", entityIconMap);

    [...xmlDoc.querySelectorAll("ChartItem")].forEach((chartItemNode, id) => {
        const label = chartItemNode.getAttribute("Label");
        if (label) {
            const data = chartItemNode.querySelectorAll("*");
            const endNode = chartItemNode.querySelector("End");
            const x = Number(endNode.getAttribute("X"));
            const y = Number(endNode.getAttribute("Y"));
            const entityNode = chartItemNode.querySelector("Entity");
            const iconStyleNode = chartItemNode.querySelector("IconStyle");
            const iconType = iconStyleNode.getAttribute("Type");
            const entityId = entityNode.getAttribute("EntityId");
            const identity = entityNode.getAttribute("Identity");
            const isCentroid = iconType === "Entity";
            if (!categoriesMap[iconType]) {
                categoriesMap[iconType] = {
                    id: Object.keys(categoriesMap).length,
                    shape: "circle",
                    stroke: "#FFFFFF",
                    // fill: isCentroid ? linkTypeMap[iconType]?.color ?? "#2ecc71" : "transparent",
                    height: 64, // icon size
                    padding: 64, // icon padding
                    // imageCharFill: "#FFFFFF",
                    fill: "transparent"
                };
                categoryIconTypeMap[categoriesMap[iconType].id] = iconType;
            }
            idMap[entityId] = id;
            vertexPositionMap[id] = {x, y};

            const icon = iconMap[entityIconMap[iconType]] || defaultIcon;
            vertices.push({
                categoryID: categoriesMap[iconType].id,
                id,
                entityId,
                text: "   "+label+"   ",
                centroid: isCentroid,
                icon: {
                    imageChar: icon,
                    imageCharFill: linkTypeMap[iconType]?.color ?? "#2ecc71",
                    strokeWidth: 0,
                    height: 50,
                },
                textFill: "#000000",
                textboxFill: "#F9F9F9",
                textFontFamily: "Segoe UI",
                textPadding: 3,
                cornerRadius: 5,
                x,
                y,
                fx: x,
                fy: y,
                metaData: {
                    icon,
                    iconType
                }
            });
        } else {
            const link = chartItemNode.querySelector("Link");
            const end1Id = link.getAttribute("End1Id");
            const end2Id = link.getAttribute("End2Id");
            const source = vertices[idMap[end1Id]];
            const target = vertices[idMap[end2Id]];
            const iconType = categoryIconTypeMap[target.categoryID];
            const color = linkTypeMap[iconType]?.color;
            edges.push({
                id: edges.length,
                hidden: Math.random() > 0.9 ? 1 : 0,
                color,
                source,
                type: iconType,
                target
            });
        }
    });
    console.log("categoryMap === ", categoriesMap);
    console.log("vertices === ", vertices);
    console.log("edges === ", edges);
    return {
        categories: Object.keys(categoriesMap).map(k => categoriesMap[k]),
        vertices,
        edges
    };
}

function createFakeXML(nodeCount = 10, linkCount = 15) {
    const _types = [
        "veh",
        "did",
        "corp",
        "addr",
        "Entity"
    ];
    const types = [];
    [...Array(30)].forEach(()=>types.push(_types[0]));
    [...Array(20)].forEach(()=>types.push(_types[1]));
    [...Array(20)].forEach(()=>types.push(_types[2]));
    [...Array(30)].forEach(()=>types.push(_types[3]));
    [...Array(50)].forEach(()=>types.push(_types[4]));

    const nodeCache = {};
    let nodes = [...Array(nodeCount)].map(createNodeStr);
    let links = [...Array(linkCount)].map((n) => {
        const nodeIds = Object.keys(nodeCache);
        const sourceId = nodeIds[Math.floor(Math.random() * nodeIds.length)];
        const targetId = nodeIds[Math.floor(Math.random() * nodeIds.length)];
        return createLinkStr(sourceId, targetId);
    });
    let xml = `\
<?xml version="1.0" encoding="UTF-16" standalone="no"?>
<Chart IdReferenceLinking="false" Rigorous="true">
    <EntityTypeCollection>
        <EntityType Name="ves" IconFile="boat"/>
        <EntityType Name="addr" IconFile="house"/>
        <EntityType Name="corp" IconFile="organ"/>
        <EntityType Name="ccw" IconFile="gun"/>
        <EntityType Name="did" IconFile="anon"/>
        <EntityType Name="corp" IconFile="organ"/>
        <EntityType Name="srce" IconFile="offndr"/>
        <EntityType Name="air" IconFile="jet"/>
        <EntityType Name="veh" IconFile="car"/>
    </EntityTypeCollection>
    <LinkTypeCollection>
        <LinkType Name="assoc" Colour="16757706"/>
        <LinkType Name="ves" Colour="3381657"/>
        <LinkType Name="addr" Colour="12698049"/>
        <LinkType Name="corp" Colour="11655308"/>
        <LinkType Name="rel" Colour="14794387"/>
        <LinkType Name="air" Colour="16777062"/>
        <LinkType Name="prop" Colour="15129473"/>
        <LinkType Name="veh" Colour="13031916"/>
    </LinkTypeCollection>
    <ChartItemCollection>
        ${nodes.join("\n    ")}
        ${links.join("\n    ")}
    </ChartItemCollection>
</Chart>
`;
    return xml;

    function createNodeStr() {
        const id = faker.random.alphaNumeric(10);
        const typeObj = createTypeObj();
        const x = Math.floor(Math.random() * 1000) - 500;
        const y = Math.floor(Math.random() * 1000) - 500;
        nodeCache[id] = {typeObj, x, y};
        return `<ChartItem Label="${typeObj.label}">
        <End X="${x}" Y="${y}">
            <Entity EntityId="${id}" Identity="${id}">
                <Icon>
                    <IconStyle Type="${typeObj.type}"/>
                </Icon>
                <CardCollection/>
            </Entity>
        </End>
    </ChartItem>`;
    }

    function createLinkStr(id1, id2) {
        return `<ChartItem>
        <Link End1Id="${id1}" End2Id="${id2}">
            <Entity Type="0" ArrowStyle="ArrowOnHead"/>
        </Link>
    </ChartItem>`;
    }
    function createTypeObj() {
        
        const type = types[Math.floor(Math.random() * types.length)];
        return {
            type,
            label: getLabel(type)
        };

        function getLabel(type) {
            switch (type) {
                case "veh":
                    return `2017 ${faker.vehicle.vehicle()}`;
                case "corp":
                    return faker.company.companyName(0).toUpperCase();
                case "addr":
                    return faker.address.streetAddress().toUpperCase();
                case "Entity":
                case "did":
                    return faker.name.findName().toUpperCase();
            }
            return;
        }
    }
}