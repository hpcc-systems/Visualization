
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('src/map/IChoropleth',["../common/Palette"], factory);
    } else {
        root.map_IChoropleth = factory(root.common_Palette, root.usStates, root.usCounties);
    }
}(this, function (Palette, usStates, usCounties) {
    function IChoropleth() {
    }
    IChoropleth.prototype._palette = Palette.rainbow("default");
    
    //  Events  ---
    IChoropleth.prototype.click = function (row, column, selected) {
        console.log("Click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
    };


    return IChoropleth;
}));


define('css!src/map/Choropleth',[],function(){});

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('src/map/Choropleth',["d3", "../common/SVGWidget", "./IChoropleth", "../common/Utility", "../api/ITooltip", "css!./Choropleth"], factory);
    } else {
        root.map_Choropleth = factory(root.d3, root.common_SVGWidget, root.map_IChoropleth, root.common_Utility, root.api_ITooltip);
    }
}(this, function (d3, SVGWidget, IChoropleth, Utility, ITooltip) {
    function Choropleth() {
        SVGWidget.call(this);
        IChoropleth.call(this);
        ITooltip.call(this);

        this._dataMap = {};
        this._dataMinWeight = 0;
        this._dataMaxWeight = 0;

        this._prevTranslate = [0, 0];
        this._prevScale = 1.0;
    }
    Choropleth.prototype = Object.create(SVGWidget.prototype);
    Choropleth.prototype.constructor = Choropleth;
    Choropleth.prototype._class += " map_Choropleth";
    Choropleth.prototype.implements(IChoropleth.prototype);
    Choropleth.prototype.implements(ITooltip.prototype);

    Choropleth.prototype.publish("paletteID", "YlOrRd", "set", "Palette ID", Choropleth.prototype._palette.switch(),{tags:["Basic","Shared"]});
    Choropleth.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette",null,{tags:["Intermediate","Shared"]});
    Choropleth.prototype.publish("projection", null, "set", "Map projection type",["albersUsaPr","orthographic","mercator"],{tags:["Intermediate","Shared"]});

    Choropleth.prototype.data = function (_) {
        var retVal = SVGWidget.prototype.data.apply(this, arguments);
        if (arguments.length) {
            this._dataMap = {};
            this._dataMinWeight = null;
            this._dataMaxWeight = null;

            var context = this;
            this.data().forEach(function (item) {
                context._dataMap[item[0]] = item;
                if (!context._dataMinWeight || item[1] < context._dataMinWeight) {
                    context._dataMinWeight = item[1];
                }
                if (!context._dataMaxWeight || item[1] > context._dataMaxWeight) {
                    context._dataMaxWeight = item[1];
                }
            });
        }
        return retVal;
    };

    Choropleth.prototype.size = function (_) {
        var retVal = SVGWidget.prototype.size.apply(this, arguments);
        if (arguments.length) {
            if (this._svgZoom) {
                this._svgZoom
                    .attr("x", -this._size.width / 2)
                    .attr("y", -this._size.height / 2)
                    .attr("width", this._size.width)
                    .attr("height", this._size.height)
                ;
            }
        }
        return retVal;
    };

    Choropleth.prototype.projection_orig = Choropleth.prototype.projection;
    Choropleth.prototype.projection = function (_) {
        var retVal = Choropleth.prototype.projection_orig.apply(this, arguments);
        if (arguments.length) {
            switch (_) {
                case "albersUsaPr":
                    this.d3Projection = this.albersUsaPr();
                    break;
                case "orthographic":
                    this.d3Projection = d3.geo.orthographic()
                        .clipAngle(90)
                    ;
                    break;
                case "mercator":
                    this.d3Projection = d3.geo.mercator();
                    break;
            }
            this.d3Path = d3.geo.path()
                .projection(this.d3Projection)
            ;
        }
        return retVal;
    };

    Choropleth.prototype.render = function () {
        SVGWidget.prototype.render.apply(this, arguments);
        if (this._renderCount === 1) {
            this.zoomToFit();
        }
        return this;
    };

    Choropleth.prototype.enter = function (domNode, element) {
        //  Zoom  ---
        var context = this;
        this._svgZoom = element.append("rect")
            .attr("class", "zoom")
            .attr("x", -this._size.width / 2)
            .attr("y", -this._size.height / 2)
            .attr("width", this._size.width)
            .attr("height", this._size.height)
            .on("dblclick", function (d) {
                d3.event.stopPropagation();
                context.zoomToFit(null, 750);
            })
        ;

        var defs = this._parentElement.insert("defs", ":first-child");
        var g = defs.append("pattern")
            .attr("id", "hash")
            .attr("patternUnits", "userSpaceOnUse")
            .attr("width", "10")
            .attr("height", "10")
            .attr("x", 0).attr("y", 0)
            .append("g");
        g.append("rect")
            .attr("class", "noFill")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", 5)
            .attr("height", 5)
        ;
        g.append("rect")
            .attr("class", "noFill")
            .attr("x", 5)
            .attr("y", 5)
            .attr("width", 5)
            .attr("height", 5)
        ;

        this._svg = element.append("g");
        this._selection = new Utility.SimpleSelection(this._svg);
    };

    Choropleth.prototype.update = function (domNode, element) {
        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }
    };

    Choropleth.prototype.exit = function (domNode, element) {
        SVGWidget.prototype.enter.apply(this, arguments);
        delete this._selection;
    };

    // A modified d3.geo.albersUsa to include Puerto Rico.
    Choropleth.prototype.albersUsaPr = function () {
        var ε = 1e-6;

        var lower48 = d3.geo.albers();

        // EPSG:3338
        var alaska = d3.geo.conicEqualArea()
            .rotate([154, 0])
            .center([-2, 58.5])
            .parallels([55, 65]);

        // ESRI:102007
        var hawaii = d3.geo.conicEqualArea()
            .rotate([157, 0])
            .center([-3, 19.9])
            .parallels([8, 18]);

        // XXX? You should check that this is a standard PR projection!
        var puertoRico = d3.geo.conicEqualArea()
            .rotate([66, 0])
            .center([0, 18])
            .parallels([8, 18]);

        var point,
            pointStream = { point: function (x, y) { point = [x, y]; } },
            lower48Point,
            alaskaPoint,
            hawaiiPoint,
            puertoRicoPoint;

        function albersUsa(coordinates) {
            var x = coordinates[0], y = coordinates[1];
            point = null;
            (lower48Point(x, y), point) ||
            (alaskaPoint(x, y), point) ||
            (hawaiiPoint(x, y), point) ||
            (puertoRicoPoint(x, y), point); // jshint ignore:line
            return point;
        }

        albersUsa.invert = function (coordinates) {
            var k = lower48.scale(),
                t = lower48.translate(),
                x = (coordinates[0] - t[0]) / k,
                y = (coordinates[1] - t[1]) / k;
            return (y >= 0.120 && y < 0.234 && x >= -0.425 && x < -0.214 ? alaska
                : y >= 0.166 && y < 0.234 && x >= -0.214 && x < -0.115 ? hawaii
                : y >= 0.204 && y < 0.234 && x >= 0.320 && x < 0.380 ? puertoRico
                : lower48).invert(coordinates);
        };

        // A naïve multi-projection stream.
        // The projections must have mutually exclusive clip regions on the sphere,
        // as this will avoid emitting interleaving lines and polygons.
        albersUsa.stream = function (stream) {
            var lower48Stream = lower48.stream(stream),
                alaskaStream = alaska.stream(stream),
                hawaiiStream = hawaii.stream(stream),
                puertoRicoStream = puertoRico.stream(stream);
            return {
                point: function (x, y) {
                    lower48Stream.point(x, y);
                    alaskaStream.point(x, y);
                    hawaiiStream.point(x, y);
                    puertoRicoStream.point(x, y);
                },
                sphere: function () {
                    lower48Stream.sphere();
                    alaskaStream.sphere();
                    hawaiiStream.sphere();
                    puertoRicoStream.sphere();
                },
                lineStart: function () {
                    lower48Stream.lineStart();
                    alaskaStream.lineStart();
                    hawaiiStream.lineStart();
                    puertoRicoStream.lineStart();
                },
                lineEnd: function () {
                    lower48Stream.lineEnd();
                    alaskaStream.lineEnd();
                    hawaiiStream.lineEnd();
                    puertoRicoStream.lineEnd();
                },
                polygonStart: function () {
                    lower48Stream.polygonStart();
                    alaskaStream.polygonStart();
                    hawaiiStream.polygonStart();
                    puertoRicoStream.polygonStart();
                },
                polygonEnd: function () {
                    lower48Stream.polygonEnd();
                    alaskaStream.polygonEnd();
                    hawaiiStream.polygonEnd();
                    puertoRicoStream.polygonEnd();
                }
            };
        };

        albersUsa.precision = function (_) {
            if (!arguments.length) return lower48.precision();
            lower48.precision(_);
            alaska.precision(_);
            hawaii.precision(_);
            puertoRico.precision(_);
            return albersUsa;
        };

        albersUsa.scale = function (_) {
            if (!arguments.length) return lower48.scale();
            lower48.scale(_);
            alaska.scale(_ * 0.35);
            hawaii.scale(_);
            puertoRico.scale(_);
            return albersUsa.translate(lower48.translate());
        };

        albersUsa.translate = function (_) {
            if (!arguments.length) return lower48.translate();
            var k = lower48.scale(), x = +_[0], y = +_[1];

            lower48Point = lower48
                .translate(_)
                .clipExtent([[x - 0.455 * k, y - 0.238 * k], [x + 0.455 * k, y + 0.238 * k]])
                .stream(pointStream).point;

            alaskaPoint = alaska
                .translate([x - 0.307 * k, y + 0.201 * k])
                .clipExtent([[x - 0.425 * k + ε, y + 0.120 * k + ε], [x - 0.214 * k - ε, y + 0.234 * k - ε]])
                .stream(pointStream).point;

            hawaiiPoint = hawaii
                .translate([x - 0.205 * k, y + 0.212 * k])
                .clipExtent([[x - 0.214 * k + ε, y + 0.166 * k + ε], [x - 0.115 * k - ε, y + 0.234 * k - ε]])
                .stream(pointStream).point;

            puertoRicoPoint = puertoRico
                .translate([x + 0.350 * k, y + 0.224 * k])
                .clipExtent([[x + 0.320 * k, y + 0.204 * k], [x + 0.380 * k, y + 0.234 * k]])
                .stream(pointStream).point;

            return albersUsa;
        };

        return albersUsa.scale(1070);
    };

    Choropleth.prototype.project = function (lat, long) {
        var pos = this.d3Projection([long, lat]);

        var offsetX = this.x() + this._prevTranslate[0];
        var offsetY = this.y() + this._prevTranslate[1];

        pos[0] *= this._prevScale;
        pos[1] *= this._prevScale;
        pos[0] += offsetX;
        pos[1] += offsetY;
        return pos;
    };

    Choropleth.prototype.zoomToFit = function (node, transitionDuration, scaleFactor) {
        scaleFactor = scaleFactor || 0.9;

        var bbox = node ? node.getBBox() : this._svg.node().getBBox();
        var x = bbox.x + bbox.width / 2;
        var y = bbox.y + bbox.height / 2;
        var scale = scaleFactor / Math.max(bbox.width / this.width(), bbox.height / this.height());
        var translate = [-scale * x, -scale * y];

        this._prevTranslate = translate;
        this._prevScale = scale;
        (transitionDuration ? this._svg.transition().duration(transitionDuration) : this._svg)
            .attr("transform", "translate(" + translate + ")scale(" + scale + ")")
        ;
    };

    return Choropleth;
}));

!function() {
  var topojson = {
    version: "1.6.20",
    mesh: function(topology) { return object(topology, meshArcs.apply(this, arguments)); },
    meshArcs: meshArcs,
    merge: function(topology) { return object(topology, mergeArcs.apply(this, arguments)); },
    mergeArcs: mergeArcs,
    feature: featureOrCollection,
    neighbors: neighbors,
    presimplify: presimplify
  };

  function stitchArcs(topology, arcs) {
    var stitchedArcs = {},
        fragmentByStart = {},
        fragmentByEnd = {},
        fragments = [],
        emptyIndex = -1;

    // Stitch empty arcs first, since they may be subsumed by other arcs.
    arcs.forEach(function(i, j) {
      var arc = topology.arcs[i < 0 ? ~i : i], t;
      if (arc.length < 3 && !arc[1][0] && !arc[1][1]) {
        t = arcs[++emptyIndex], arcs[emptyIndex] = i, arcs[j] = t;
      }
    });

    arcs.forEach(function(i) {
      var e = ends(i),
          start = e[0],
          end = e[1],
          f, g;

      if (f = fragmentByEnd[start]) {
        delete fragmentByEnd[f.end];
        f.push(i);
        f.end = end;
        if (g = fragmentByStart[end]) {
          delete fragmentByStart[g.start];
          var fg = g === f ? f : f.concat(g);
          fragmentByStart[fg.start = f.start] = fragmentByEnd[fg.end = g.end] = fg;
        } else {
          fragmentByStart[f.start] = fragmentByEnd[f.end] = f;
        }
      } else if (f = fragmentByStart[end]) {
        delete fragmentByStart[f.start];
        f.unshift(i);
        f.start = start;
        if (g = fragmentByEnd[start]) {
          delete fragmentByEnd[g.end];
          var gf = g === f ? f : g.concat(f);
          fragmentByStart[gf.start = g.start] = fragmentByEnd[gf.end = f.end] = gf;
        } else {
          fragmentByStart[f.start] = fragmentByEnd[f.end] = f;
        }
      } else {
        f = [i];
        fragmentByStart[f.start = start] = fragmentByEnd[f.end = end] = f;
      }
    });

    function ends(i) {
      var arc = topology.arcs[i < 0 ? ~i : i], p0 = arc[0], p1;
      if (topology.transform) p1 = [0, 0], arc.forEach(function(dp) { p1[0] += dp[0], p1[1] += dp[1]; });
      else p1 = arc[arc.length - 1];
      return i < 0 ? [p1, p0] : [p0, p1];
    }

    function flush(fragmentByEnd, fragmentByStart) {
      for (var k in fragmentByEnd) {
        var f = fragmentByEnd[k];
        delete fragmentByStart[f.start];
        delete f.start;
        delete f.end;
        f.forEach(function(i) { stitchedArcs[i < 0 ? ~i : i] = 1; });
        fragments.push(f);
      }
    }

    flush(fragmentByEnd, fragmentByStart);
    flush(fragmentByStart, fragmentByEnd);
    arcs.forEach(function(i) { if (!stitchedArcs[i < 0 ? ~i : i]) fragments.push([i]); });

    return fragments;
  }

  function meshArcs(topology, o, filter) {
    var arcs = [];

    if (arguments.length > 1) {
      var geomsByArc = [],
          geom;

      function arc(i) {
        var j = i < 0 ? ~i : i;
        (geomsByArc[j] || (geomsByArc[j] = [])).push({i: i, g: geom});
      }

      function line(arcs) {
        arcs.forEach(arc);
      }

      function polygon(arcs) {
        arcs.forEach(line);
      }

      function geometry(o) {
        if (o.type === "GeometryCollection") o.geometries.forEach(geometry);
        else if (o.type in geometryType) geom = o, geometryType[o.type](o.arcs);
      }

      var geometryType = {
        LineString: line,
        MultiLineString: polygon,
        Polygon: polygon,
        MultiPolygon: function(arcs) { arcs.forEach(polygon); }
      };

      geometry(o);

      geomsByArc.forEach(arguments.length < 3
          ? function(geoms) { arcs.push(geoms[0].i); }
          : function(geoms) { if (filter(geoms[0].g, geoms[geoms.length - 1].g)) arcs.push(geoms[0].i); });
    } else {
      for (var i = 0, n = topology.arcs.length; i < n; ++i) arcs.push(i);
    }

    return {type: "MultiLineString", arcs: stitchArcs(topology, arcs)};
  }

  function mergeArcs(topology, objects) {
    var polygonsByArc = {},
        polygons = [],
        components = [];

    objects.forEach(function(o) {
      if (o.type === "Polygon") register(o.arcs);
      else if (o.type === "MultiPolygon") o.arcs.forEach(register);
    });

    function register(polygon) {
      polygon.forEach(function(ring) {
        ring.forEach(function(arc) {
          (polygonsByArc[arc = arc < 0 ? ~arc : arc] || (polygonsByArc[arc] = [])).push(polygon);
        });
      });
      polygons.push(polygon);
    }

    function exterior(ring) {
      return cartesianRingArea(object(topology, {type: "Polygon", arcs: [ring]}).coordinates[0]) > 0; // TODO allow spherical?
    }

    polygons.forEach(function(polygon) {
      if (!polygon._) {
        var component = [],
            neighbors = [polygon];
        polygon._ = 1;
        components.push(component);
        while (polygon = neighbors.pop()) {
          component.push(polygon);
          polygon.forEach(function(ring) {
            ring.forEach(function(arc) {
              polygonsByArc[arc < 0 ? ~arc : arc].forEach(function(polygon) {
                if (!polygon._) {
                  polygon._ = 1;
                  neighbors.push(polygon);
                }
              });
            });
          });
        }
      }
    });

    polygons.forEach(function(polygon) {
      delete polygon._;
    });

    return {
      type: "MultiPolygon",
      arcs: components.map(function(polygons) {
        var arcs = [], n;

        // Extract the exterior (unique) arcs.
        polygons.forEach(function(polygon) {
          polygon.forEach(function(ring) {
            ring.forEach(function(arc) {
              if (polygonsByArc[arc < 0 ? ~arc : arc].length < 2) {
                arcs.push(arc);
              }
            });
          });
        });

        // Stitch the arcs into one or more rings.
        arcs = stitchArcs(topology, arcs);

        // If more than one ring is returned,
        // at most one of these rings can be the exterior;
        // this exterior ring has the same winding order
        // as any exterior ring in the original polygons.
        if ((n = arcs.length) > 1) {
          var sgn = exterior(polygons[0][0]);
          for (var i = 0, t; i < n; ++i) {
            if (sgn === exterior(arcs[i])) {
              t = arcs[0], arcs[0] = arcs[i], arcs[i] = t;
              break;
            }
          }
        }

        return arcs;
      })
    };
  }

  function featureOrCollection(topology, o) {
    return o.type === "GeometryCollection" ? {
      type: "FeatureCollection",
      features: o.geometries.map(function(o) { return feature(topology, o); })
    } : feature(topology, o);
  }

  function feature(topology, o) {
    var f = {
      type: "Feature",
      id: o.id,
      properties: o.properties || {},
      geometry: object(topology, o)
    };
    if (o.id == null) delete f.id;
    return f;
  }

  function object(topology, o) {
    var absolute = transformAbsolute(topology.transform),
        arcs = topology.arcs;

    function arc(i, points) {
      if (points.length) points.pop();
      for (var a = arcs[i < 0 ? ~i : i], k = 0, n = a.length, p; k < n; ++k) {
        points.push(p = a[k].slice());
        absolute(p, k);
      }
      if (i < 0) reverse(points, n);
    }

    function point(p) {
      p = p.slice();
      absolute(p, 0);
      return p;
    }

    function line(arcs) {
      var points = [];
      for (var i = 0, n = arcs.length; i < n; ++i) arc(arcs[i], points);
      if (points.length < 2) points.push(points[0].slice());
      return points;
    }

    function ring(arcs) {
      var points = line(arcs);
      while (points.length < 4) points.push(points[0].slice());
      return points;
    }

    function polygon(arcs) {
      return arcs.map(ring);
    }

    function geometry(o) {
      var t = o.type;
      return t === "GeometryCollection" ? {type: t, geometries: o.geometries.map(geometry)}
          : t in geometryType ? {type: t, coordinates: geometryType[t](o)}
          : null;
    }

    var geometryType = {
      Point: function(o) { return point(o.coordinates); },
      MultiPoint: function(o) { return o.coordinates.map(point); },
      LineString: function(o) { return line(o.arcs); },
      MultiLineString: function(o) { return o.arcs.map(line); },
      Polygon: function(o) { return polygon(o.arcs); },
      MultiPolygon: function(o) { return o.arcs.map(polygon); }
    };

    return geometry(o);
  }

  function reverse(array, n) {
    var t, j = array.length, i = j - n; while (i < --j) t = array[i], array[i++] = array[j], array[j] = t;
  }

  function bisect(a, x) {
    var lo = 0, hi = a.length;
    while (lo < hi) {
      var mid = lo + hi >>> 1;
      if (a[mid] < x) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  }

  function neighbors(objects) {
    var indexesByArc = {}, // arc index -> array of object indexes
        neighbors = objects.map(function() { return []; });

    function line(arcs, i) {
      arcs.forEach(function(a) {
        if (a < 0) a = ~a;
        var o = indexesByArc[a];
        if (o) o.push(i);
        else indexesByArc[a] = [i];
      });
    }

    function polygon(arcs, i) {
      arcs.forEach(function(arc) { line(arc, i); });
    }

    function geometry(o, i) {
      if (o.type === "GeometryCollection") o.geometries.forEach(function(o) { geometry(o, i); });
      else if (o.type in geometryType) geometryType[o.type](o.arcs, i);
    }

    var geometryType = {
      LineString: line,
      MultiLineString: polygon,
      Polygon: polygon,
      MultiPolygon: function(arcs, i) { arcs.forEach(function(arc) { polygon(arc, i); }); }
    };

    objects.forEach(geometry);

    for (var i in indexesByArc) {
      for (var indexes = indexesByArc[i], m = indexes.length, j = 0; j < m; ++j) {
        for (var k = j + 1; k < m; ++k) {
          var ij = indexes[j], ik = indexes[k], n;
          if ((n = neighbors[ij])[i = bisect(n, ik)] !== ik) n.splice(i, 0, ik);
          if ((n = neighbors[ik])[i = bisect(n, ij)] !== ij) n.splice(i, 0, ij);
        }
      }
    }

    return neighbors;
  }

  function presimplify(topology, triangleArea) {
    var absolute = transformAbsolute(topology.transform),
        relative = transformRelative(topology.transform),
        heap = minAreaHeap();

    if (!triangleArea) triangleArea = cartesianTriangleArea;

    topology.arcs.forEach(function(arc) {
      var triangles = [],
          maxArea = 0,
          triangle;

      // To store each point’s effective area, we create a new array rather than
      // extending the passed-in point to workaround a Chrome/V8 bug (getting
      // stuck in smi mode). For midpoints, the initial effective area of
      // Infinity will be computed in the next step.
      for (var i = 0, n = arc.length, p; i < n; ++i) {
        p = arc[i];
        absolute(arc[i] = [p[0], p[1], Infinity], i);
      }

      for (var i = 1, n = arc.length - 1; i < n; ++i) {
        triangle = arc.slice(i - 1, i + 2);
        triangle[1][2] = triangleArea(triangle);
        triangles.push(triangle);
        heap.push(triangle);
      }

      for (var i = 0, n = triangles.length; i < n; ++i) {
        triangle = triangles[i];
        triangle.previous = triangles[i - 1];
        triangle.next = triangles[i + 1];
      }

      while (triangle = heap.pop()) {
        var previous = triangle.previous,
            next = triangle.next;

        // If the area of the current point is less than that of the previous point
        // to be eliminated, use the latter's area instead. This ensures that the
        // current point cannot be eliminated without eliminating previously-
        // eliminated points.
        if (triangle[1][2] < maxArea) triangle[1][2] = maxArea;
        else maxArea = triangle[1][2];

        if (previous) {
          previous.next = next;
          previous[2] = triangle[2];
          update(previous);
        }

        if (next) {
          next.previous = previous;
          next[0] = triangle[0];
          update(next);
        }
      }

      arc.forEach(relative);
    });

    function update(triangle) {
      heap.remove(triangle);
      triangle[1][2] = triangleArea(triangle);
      heap.push(triangle);
    }

    return topology;
  }

  function cartesianRingArea(ring) {
    var i = -1,
        n = ring.length,
        a,
        b = ring[n - 1],
        area = 0;

    while (++i < n) {
      a = b;
      b = ring[i];
      area += a[0] * b[1] - a[1] * b[0];
    }

    return area / 2;
  }

  function cartesianTriangleArea(triangle) {
    var a = triangle[0], b = triangle[1], c = triangle[2];
    return Math.abs((a[0] - c[0]) * (b[1] - a[1]) - (a[0] - b[0]) * (c[1] - a[1]));
  }

  function compareArea(a, b) {
    return a[1][2] - b[1][2];
  }

  function minAreaHeap() {
    var heap = {},
        array = [],
        size = 0;

    heap.push = function(object) {
      up(array[object._ = size] = object, size++);
      return size;
    };

    heap.pop = function() {
      if (size <= 0) return;
      var removed = array[0], object;
      if (--size > 0) object = array[size], down(array[object._ = 0] = object, 0);
      return removed;
    };

    heap.remove = function(removed) {
      var i = removed._, object;
      if (array[i] !== removed) return; // invalid request
      if (i !== --size) object = array[size], (compareArea(object, removed) < 0 ? up : down)(array[object._ = i] = object, i);
      return i;
    };

    function up(object, i) {
      while (i > 0) {
        var j = ((i + 1) >> 1) - 1,
            parent = array[j];
        if (compareArea(object, parent) >= 0) break;
        array[parent._ = i] = parent;
        array[object._ = i = j] = object;
      }
    }

    function down(object, i) {
      while (true) {
        var r = (i + 1) << 1,
            l = r - 1,
            j = i,
            child = array[j];
        if (l < size && compareArea(array[l], child) < 0) child = array[j = l];
        if (r < size && compareArea(array[r], child) < 0) child = array[j = r];
        if (j === i) break;
        array[child._ = i] = child;
        array[object._ = i = j] = object;
      }
    }

    return heap;
  }

  function transformAbsolute(transform) {
    if (!transform) return noop;
    var x0,
        y0,
        kx = transform.scale[0],
        ky = transform.scale[1],
        dx = transform.translate[0],
        dy = transform.translate[1];
    return function(point, i) {
      if (!i) x0 = y0 = 0;
      point[0] = (x0 += point[0]) * kx + dx;
      point[1] = (y0 += point[1]) * ky + dy;
    };
  }

  function transformRelative(transform) {
    if (!transform) return noop;
    var x0,
        y0,
        kx = transform.scale[0],
        ky = transform.scale[1],
        dx = transform.translate[0],
        dy = transform.translate[1];
    return function(point, i) {
      if (!i) x0 = y0 = 0;
      var x1 = (point[0] - dx) / kx | 0,
          y1 = (point[1] - dy) / ky | 0;
      point[0] = x1 - x0;
      point[1] = y1 - y0;
      x0 = x1;
      y0 = y1;
    };
  }

  function noop() {}

  if (typeof define === "function" && define.amd) define('topojson',topojson);
  else if (typeof module === "object" && module.exports) module.exports = topojson;
  else this.topojson = topojson;
}();


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('src/map/ChoroplethCounties',["d3", "./Choropleth", "topojson", "./us-counties"], factory);
    } else {
        root.map_ChoroplethCounties = factory(root.d3, root.map_Choropleth, root.topojson, root.map_usCounties);
    }
}(this, function (d3, Choropleth, topojson, usCounties) {
    function ChoroplethCounties() {
        Choropleth.call(this);

        this.projection("albersUsaPr");
    }
    ChoroplethCounties.prototype = Object.create(Choropleth.prototype);
    ChoroplethCounties.prototype.constructor = ChoroplethCounties;
    ChoroplethCounties.prototype._class += " map_ChoroplethCounties";

    ChoroplethCounties.prototype.enter = function (domNode, element) {
        Choropleth.prototype.enter.apply(this, arguments);
        element.classed("map_Choropleth", true);

        var choroPaths = this._svg.selectAll("path").data(topojson.feature(usCounties.topology, usCounties.topology.objects.counties).features);

        //  Enter  ---
        var context = this;
        this.choroPaths = choroPaths.enter().append("path")
            .call(this._selection.enter.bind(this._selection))
            .on("click", function (d) {
                if (context._dataMap[d.id]) {
                    context.click(context.rowToObj(context._dataMap[d.id]), "weight", context._selection.selected(this));
                }
            })
            .on("dblclick", function (d) {
                d3.event.stopPropagation();
                context.zoomToFit(context.active === this ? null : this, 750);
                context.active = this;
            })
            .on("mouseover.tooltip", function (d) {
                context.tooltipShow([usCounties.countyNames[d.id], context._dataMap[d.id] ? context._dataMap[d.id][1] : "N/A"], context.columns(), 1);
            })
            .on("mouseout.tooltip", function (d) {
                context.tooltipShow();
            })
            .on("mousemove.tooltip", function (d) {
                context.tooltipShow([usCounties.countyNames[d.id], context._dataMap[d.id] ? context._dataMap[d.id][1] : "N/A"], context.columns(), 1);
            })
        ;
    };

    ChoroplethCounties.prototype.update = function (domNode, element) {
        Choropleth.prototype.update.apply(this, arguments);

        //console.time("ChoroplethCounties.prototype.update");
        var context = this;
        //  Update  ---
        this.choroPaths
            .attr("d", this.d3Path)
            .style("fill", function (d) {
                var weight = context._dataMap[d.id] ? context._dataMap[d.id][1] : undefined;
                return weight === undefined ? "url(#hash)" : context._palette(weight, context._dataMinWeight, context._dataMaxWeight);
            })
        ;
        //console.timeEnd("ChoroplethCounties.prototype.update");
    };

    return ChoroplethCounties;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('src/map/ChoroplethCountries',["d3", "./Choropleth", "topojson", "./countries"], factory);
    } else {
        root.map_ChoroplethCountries = factory(root.d3, root.map_Choropleth, root.topojson, root.map_countries);
    }
}(this, function (d3, Choropleth, topojson, countries) {
    function ChoroplethCountries() {
        Choropleth.call(this);

        this._dataMap = {};
        this._dataMaxWeight = 0;
        this._dataMinWeight = 0;
        this.projection(this.worldProjection());
    }
    ChoroplethCountries.prototype = Object.create(Choropleth.prototype);
    ChoroplethCountries.prototype.constructor = ChoroplethCountries;
    ChoroplethCountries.prototype._class += " map_ChoroplethCountries";

    ChoroplethCountries.prototype.publish("worldProjection", "mercator", "set", "Map Projection", ["mercator", "orthographic"],{tags:["Private"]});

    ChoroplethCountries.prototype.data = function (_) {
        var retVal = Choropleth.prototype.data.apply(this, arguments);
        if (arguments.length) {
            this._dataMap = {};
            this._dataMinWeight = null;
            this._dataMaxWeight = null;

            var context = this;
            this.data().forEach(function (item) {
                context._dataMap[item.country] = item.weight;
                if (!context._dataMinWeight || item.weight < context._dataMinWeight) {
                    context._dataMinWeight = item.weight;
                }
                if (!context._dataMaxWeight || item.weight > context._dataMaxWeight) {
                    context._dataMaxWeight = item.weight;
                }
            });
        }

        return retVal;
    };

    ChoroplethCountries.prototype.enter = function (domNode, element) {
        Choropleth.prototype.enter.apply(this, arguments);
        element.classed("map_Choropleth", true);

        this.projection(this.worldProjection());

        var context = this;
        this.lookup = {};
        var countryArray = topojson.feature(countries.topology, countries.topology.objects.countries).features.map(function (item) {
            item.category = "Country";
            if (countries.countryNames[item.id]) {
                item.name = countries.countryNames[item.id].name;
                context.lookup[item.name] = item;
            }
            return item;
        });
        var choroPaths = this._svg.selectAll("path").data(countryArray);

        //  Enter  ---
        this.choroPaths = choroPaths.enter().append("path")
            .attr("d", this.d3Path)
            .call(this._selection.enter.bind(this._selection))
            .on("click", function (d) {
                if (context._dataMap[d.id]) {
                    var obj = [d.id, context._dataMap[d.id], d.name];
                    context.click(context.rowToObj(obj), "weight", context._selection.selected(this));
                }
            })
            .on("dblclick", function (d) {
                d3.event.stopPropagation();
                context.zoomToFit(context.active === this ? null : this, 750);
                context.active = this;
            })
            .on("mouseover.tooltip", function (d) {
                if (context._dataMap[d.id]) {
                    context.tooltipShow([d.name, context._dataMap[d.id]], context.columns(), 1);
                }
            })
            .on("mouseout.tooltip", function (d) {
                context.tooltipShow();
            })
            .on("mousemove.tooltip", function (d) {
                if (context._dataMap[d.id]) {
                    context.tooltipShow([d.name, context._dataMap[d.id]], context.columns(), 1);
                }
            })
            .attr("id", function (d) {
                return d.id;
            })
        ;
    };

    ChoroplethCountries.prototype.update = function (domNode, element) {
        Choropleth.prototype.update.apply(this, arguments);
        this.projection(this.worldProjection());

        var context = this;

        //  Update  ---
        this.transition.apply(this.choroPaths)
            .style("fill", function (d) {
                var code = d.id;
                var weight = context._dataMap[code];
                if (weight === undefined) {
                    return "url(#hash)";
                }
                return context._palette(weight, context._dataMinWeight, context._dataMaxWeight);
            })
        ;
    };

    return ChoroplethCountries;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('src/map/ChoroplethStates',["d3", "./Choropleth", "topojson", "./us-states"], factory);
    } else {
        root.map_ChoroplethStates = factory(root.d3, root.map_Choropleth, root.topojson, root.map_usStates);
    }
}(this, function (d3, Choropleth, topojson, usStates) {
    function ChoroplethStates() {
        Choropleth.call(this);

        this.projection("albersUsaPr");
    }
    ChoroplethStates.prototype = Object.create(Choropleth.prototype);
    ChoroplethStates.prototype.constructor = ChoroplethStates;
    ChoroplethStates.prototype._class += " map_ChoroplethStates";

    ChoroplethStates.prototype.enter = function (domNode, element) {
        Choropleth.prototype.enter.apply(this, arguments);
        element.classed("map_Choropleth", true);

        var choroPaths = this._svg.selectAll("path").data(topojson.feature(usStates.topology, usStates.topology.objects.states).features);

        //  Enter  ---
        var context = this;
        this.choroPaths = choroPaths.enter().append("path")
            .call(this._selection.enter.bind(this._selection))
            .on("click", function (d) {
                var code = usStates.stateNames[d.id].code;
                if (context._dataMap[code]) {
                    context.click(context.rowToObj(context._dataMap[code]), "weight", context._selection.selected(this));
                }
            })
            .on("dblclick", function (d) {
                d3.event.stopPropagation();
                context.zoomToFit(context.active === this ? null : this, 750);
                context.active = this;
            })
            .on("mouseover.tooltip", function (d) {
                var code = usStates.stateNames[d.id].code;
                context.tooltipShow([usStates.stateNames[d.id].name, context._dataMap[code] ? context._dataMap[code][1] : "N/A"], context.columns(), 1);
            })
            .on("mouseout.tooltip", function (d) {
                context.tooltipShow();
            })
            .on("mousemove.tooltip", function (d) {
                var code = usStates.stateNames[d.id].code;
                context.tooltipShow([usStates.stateNames[d.id].name, context._dataMap[code] ? context._dataMap[code][1] : "N/A"], context.columns(), 1);
            })
        ;
    };

    ChoroplethStates.prototype.update = function (domNode, element) {
        Choropleth.prototype.update.apply(this, arguments);
        //console.time("ChoroplethStates.prototype.update");
        var context = this;
        //  Update  ---
        this.choroPaths
            .attr("d", this.d3Path)
            .style("fill", function (d) {
                var code = usStates.stateNames[d.id].code;
                var weight = context._dataMap[code] ? context._dataMap[code][1] : undefined;
                return weight === undefined ? "url(#hash)" : context._palette(weight, context._dataMinWeight, context._dataMaxWeight);
            })
        ;
        //console.timeEnd("ChoroplethStates.prototype.update");
    };

    return ChoroplethStates;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('src/map/ChoroplethStatesHeat',["../layout/Layered"], factory);
    } else {
        root.map_ChoroplethStatesHeat = factory(root.layout_Layered);
    }
}(this, function (Layered) {
    function ChoroplethStatesHeat(target) {
        Layered.call(this);
    }
    ChoroplethStatesHeat.prototype = Object.create(Layered.prototype);
    ChoroplethStatesHeat.prototype.constructor = ChoroplethStatesHeat;
    ChoroplethStatesHeat.prototype._class += " map_ChoroplethStatesHeat";

    return ChoroplethStatesHeat;
}));


define('css!src/map/GMap',[],function(){});

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        var protocol = window.location.protocol !== "https" ? "http://" : "https://";
        define('src/map/GMap',["d3", "../common/HTMLWidget", "../layout/AbsoluteSurface", "async!" + protocol + "maps.google.com/maps/api/js", "css!./GMap"], factory);
    } else {
        root.map_GMap = factory(root.d3, root.common_HTMLWidget, root.layout_AbsoluteSurface);
    }
}(this, function (d3, HTMLWidget, AbsoluteSurface) {

    function Overlay(map, worldSurface, viewportSurface) {
        google.maps.OverlayView.call(this);
        this._div = null;

        this._worldSurface = worldSurface;
        this._viewportSurface = viewportSurface;

        this._map = map;
        this.setMap(map);

        var context = this;
        google.maps.event.addListener(map, "bounds_changed", function () {
            context.draw();
        });
        google.maps.event.addListener(map, "projection_changed", function () {
            context.draw();
        });

        this._prevWorldMin = { x: 0, y: 0 };
        this._prevWorldMax = { x: 0, y: 0 };
        this._prevMin = { x: 0, y: 0 };
        this._prevMax = { x: 0, y: 0 };
    }
    Overlay.prototype = google.maps.OverlayView.prototype;

    Overlay.prototype.onAdd = function () {
        this.div = document.createElement("div");

        this._viewportSurface
            .target(this.div)
            .units("pixels")
        ;

        var panes = this.getPanes();
        panes.overlayLayer.appendChild(this.div);
    };

    Overlay.prototype.draw = function () {
        var projection = this.getProjection();
        if (!projection)
            return;

        var bounds = this._map.getBounds();
        var center = projection.fromLatLngToDivPixel(bounds.getCenter());
        var sw = projection.fromLatLngToDivPixel(bounds.getSouthWest());
        var ne = projection.fromLatLngToDivPixel(bounds.getNorthEast());

        var min = {
            x: sw.x,
            y: ne.y
        };
        var max = {
            x: ne.x,
            y: sw.y
        };

        var worldWidth = projection.getWorldWidth();
        while (max.x < min.x + 100) {  //  Ignoe dateline from being the rect.
            max.x += worldWidth;
        }
        while (min.x > center.x) {
            min.x -= worldWidth;
            max.x -= worldWidth;
        }

        if (min.x !== this._prevMin.x || min.y !== this._prevMin.y || max.x !== this._prevMax.x || max.y !== this._prevMax.y) {
            this._viewportSurface
                .widgetX(min.x)
                .widgetY(min.y)
                .widgetWidth(max.x - min.x)
                .widgetHeight(max.y - min.y)
                .render()
            ;
            this._prevMin = min;
            this._prevMax = max;
        }

        var worldMin = projection.fromLatLngToDivPixel(new google.maps.LatLng(85, -179.9));
        var worldMax = projection.fromLatLngToDivPixel(new google.maps.LatLng(-85, 179.9));
        while (worldMax.x < worldMin.x + 100) {  //  Ignoe dateline from being the rect.
            worldMax.x += worldWidth;
        }
        while (worldMin.x > center.x) {
            worldMin.x -= worldWidth;
            worldMax.x -= worldWidth;
        }
        if (worldMin.x !== this._prevWorldMin.x || worldMin.y !== this._prevWorldMin.y || worldMax.x !== this._prevWorldMax.x || worldMax.y !== this._prevWorldMax.y) {
            this._worldSurface
                .widgetX(worldMin.x)
                .widgetY(worldMin.y)
                .widgetWidth(worldMax.x - worldMin.x)
                .widgetHeight(worldMax.y - worldMin.y)
                .render()
            ;
            this._prevWorldMin = worldMax;
            this._prevWorldMax = worldMax;
        }
    };

    Overlay.prototype.onRemove = function () {
        this._viewportSurface.target(null);
        this._div.parentNode.removeChild(this._div);
        this._div = null;
    };

    function GMap() {
        HTMLWidget.call(this);

        this._tag = "div";

        var context = this;
        this._worldSurface = new AbsoluteSurface();
        this._worldSurface.project = function (lat, long) {
            var projection = context._overlay.getProjection();
            var retVal = projection.fromLatLngToDivPixel(new google.maps.LatLng(lat, long));
            retVal.x -= this.widgetX();
            retVal.y -= this.widgetY();
            return retVal;
        };

        this._viewportSurface = new AbsoluteSurface();
        this._viewportSurface.project = function (lat, long) {
            var projection = context._overlay.getProjection();
            var retVal = projection.fromLatLngToDivPixel(new google.maps.LatLng(lat, long));
            retVal.x -= this.widgetX();
            retVal.y -= this.widgetY();
            return retVal;
        };
    }
    GMap.prototype = Object.create(HTMLWidget.prototype);
    GMap.prototype.constructor = GMap;
    GMap.prototype._class += " map_GMap";

    GMap.prototype.publish("type", "road", "set", "Map Type", ["terrain", "road", "satellite", "hybrid"], { tags: ["Basic"] });
    GMap.prototype.publish("centerLat", 42.877742, "number", "Center Latitude", null, { tags: ["Basic"] });
    GMap.prototype.publish("centerLong", -97.380979, "number", "Center Longtitude", null, { tags: ["Basic"] });
    GMap.prototype.publish("zoom", 4, "number", "Zoom Level", null, { tags: ["Basic"] });

    GMap.prototype.publish("panControl", true, "boolean", "Pan Controls", null, { tags: ["Basic"] });
    GMap.prototype.publish("zoomControl", true, "boolean", "Pan Controls", null, { tags: ["Basic"] });
    GMap.prototype.publish("mapTypeControl", false, "boolean", "Pan Controls", null, { tags: ["Basic"] });
    GMap.prototype.publish("scaleControl", true, "boolean", "Pan Controls", null, { tags: ["Basic"] });
    GMap.prototype.publish("streetViewControl", false, "boolean", "Pan Controls", null, { tags: ["Basic"] });
    GMap.prototype.publish("overviewMapControl", false, "boolean", "Pan Controls", null, { tags: ["Basic"] });

    GMap.prototype.data = function (_) {
        var retVal = HTMLWidget.prototype.data.apply(this, arguments);
        return retVal;
    };

    GMap.prototype.getMapType = function () {
        switch (this.type()) {
            case "terrain":
                return google.maps.MapTypeId.TERRAIN;
            case "road":
                return google.maps.MapTypeId.ROADMAP;
            case "satellite":
                return google.maps.MapTypeId.SATELLITE;
            case "hybrid":
                return google.maps.MapTypeId.HYBRID;
            default:
                return google.maps.MapTypeId.ROADMAP;
        }
    };

    GMap.prototype.getMapOptions = function () {
        return {
            panControl: this.panControl(),
            zoomControl: this.zoomControl(),
            mapTypeControl: this.mapTypeControl(),
            scaleControl: this.scaleControl(),
            streetViewControl: this.streetViewControl(),
            overviewMapControl: this.overviewMapControl(),
            overviewMapControlOptions: { opened: true }
        };
    };

    GMap.prototype.size = function (_) {
        var retVal = HTMLWidget.prototype.size.apply(this, arguments);
        if (arguments.length && this._googleMapNode) {
            this._googleMapNode.style({
                width: _.width + "px",
                height: _.height + "px",
            });
            google.maps.event.trigger(this._googleMap, "resize");
        }
        return retVal;
    };

    GMap.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        this._googleMapNode = element.append("div")
            .style({
                width: this.width() + "px",
                height: this.height() + "px"
            })
        ;
        this._googleMap = new google.maps.Map(this._googleMapNode.node(), {
            zoom: this.zoom(),
            center: new google.maps.LatLng(this.centerLat(), this.centerLong()),
            mapTypeId: this.getMapType(),
            disableDefaultUI: true
        });
        this._overlay = new Overlay(this._googleMap, this._worldSurface, this._viewportSurface);

        this._circleMap = d3.map([]);
        this._pinMap = d3.map([]);

        this._prevCenterLat = this.centerLat();
        this._prevCenterLong = this.centerLong();
        this._prevZoom = this.zoom();
    };

    GMap.prototype.update = function (domNode, element) {
        this._googleMap.setMapTypeId(this.getMapType());
        this._googleMap.setOptions(this.getMapOptions());

        if (this._prevCenterLat !== this.centerLat() || this._prevCenterLong !== this.centerLong()) {
            this._googleMap.setCenter(new google.maps.LatLng(this.centerLat(), this.centerLong()));

            this._prevCenterLat = this.centerLat();
            this._prevCenterLong = this.centerLong();
        }
        if (this._prevZoom !== this.zoom()) {
            this._googleMap.setZoom(this.zoom());

            this._prevZoom = this.zoom();
        }
        this.updateCircles();
        this.updatePins();
    };

    GMap.prototype.updateCircles = function () {
        function rowID(row) {
            return row[0] + "_" + row[1];
        }

        var circle_enter = [];
        var circle_update = [];
        var circle_exit = d3.map(this._circleMap.keys(), function (d) { return d; });
        this.data().forEach(function (row) {
            circle_exit.remove(rowID(row));
            if (row[3] && !this._circleMap.has(rowID(row))) {
                circle_enter.push(row);
            } else if (row[3] && this._circleMap.has(rowID(row))) {
                circle_update.push(row);
            } else if (!row[3] && this._circleMap.has(rowID(row))) {
                circle_exit.set(rowID(row), true);
            }
        }, this);

        circle_enter.forEach(function (row) {
            var marker = this.createCircle(row[0], row[1], row[3], "");
            this._circleMap.set(rowID(row), marker);
        }, this);

        circle_update.forEach(function (row) {
            //this._pinMap.get(rowID(row)).setIcon(this.createIcon(row[3]));
        }, this);

        var context = this;
        circle_exit.forEach(function (row) {
            context._circleMap.get(row).setMap(null);
            context._circleMap.remove(row);
        });
    };

    GMap.prototype.updatePins = function () {
        function rowID(row) {
            return row[0] + "_" + row[1];
        }

        var pin_enter = [];
        var pin_update = [];
        var pin_exit = d3.map(this._pinMap.keys(), function (d) { return d; });
        this.data().forEach(function (row) {
            pin_exit.remove(rowID(row));
            if (row[2] && !this._pinMap.has(rowID(row))) {
                pin_enter.push(row);
            } else if (row[2] && this._pinMap.has(rowID(row))) {
                pin_update.push(row);
            } else if (!row[2] && this._pinMap.has(rowID(row))) {
                pin_exit.set(rowID(row), true);
            }
        }, this);

        pin_enter.forEach(function (row) {
            var marker = this.createMarker(row[0], row[1], row[2], "");
            this._pinMap.set(rowID(row), marker);
        }, this);

        pin_update.forEach(function (row) {
            this._pinMap.get(rowID(row)).setIcon(this.createIcon(row[2]));
        }, this);

        var context = this;
        pin_exit.forEach(function (row) {
            context._pinMap.get(row).setMap(null);
            context._pinMap.remove(row);
        });
    };

    GMap.prototype.createIcon = function (pinObj) {
        return {
            path: "M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30", // a 2,2 0 1,1 4,0 2,2 0 1,1",
            fillColor: pinObj.fillColor,
            fillOpacity: pinObj.fillOpacity || 0.8,
            scale: 0.5,
            strokeColor: pinObj.strokeColor || "black",
            strokeWeight: 0.25
        };
    };

    GMap.prototype.createMarker = function (lat, lng, pinObj) {
        return new google.maps.Marker({
            position: new google.maps.LatLng(lat, lng),
            animation: google.maps.Animation.DROP,
            title: pinObj.title || "",
            icon: this.createIcon(pinObj),
            map: this._googleMap,
        });
    };

    GMap.prototype.createCircle = function (lat, lng, circleObj) {
        return new google.maps.Circle({
            center: new google.maps.LatLng(lat, lng),
            radius: 16093 * circleObj.radius / 10,    // 16093 === 10 miles in metres
            fillColor: circleObj.fillColor || "red",
            strokeColor: circleObj.strokeColor || circleObj.fillColor || "black",
            strokeWeight: 0.5,
            map: this._googleMap
        });
    };

    GMap.prototype.zoomTo = function (selection) {
        var foundCount = 0;
        var latlngbounds = new google.maps.LatLngBounds();
        selection.forEach(function (item) {
            var gLatLong = new google.maps.LatLng(item[0], item[1]);
            latlngbounds.extend(gLatLong);
            ++foundCount;
        });
        if (foundCount) {
            this._googleMap.setCenter(latlngbounds.getCenter());
            this._googleMap.fitBounds(latlngbounds);
            if (this._googleMap.getZoom() > 12) {
                this._googleMap.setZoom(12);
            }
        }
        return this;
    };

    GMap.prototype.zoomToFit = function () {
        return this.zoomTo(this.data());
    };

    return GMap;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('src/map/GMapGraph',["./GMap", "../graph/Graph", "../graph/Edge", "../common/Shape"], factory);
    } else {
        root.map_GMapGraph = factory(root.map_GMap, root.graph_Graph, root.graph_Edge, root.common_Shape);
    }
}(this, function (GMap, Graph, Edge, Shape) {
    function GMapGraph() {
        GMap.call(this);
    }
    GMapGraph.prototype = Object.create(GMap.prototype);
    GMapGraph.prototype.constructor = GMapGraph;
    GMapGraph.prototype._class += " map_GMapGraph";

    GMapGraph.prototype.enter = function () {
        GMap.prototype.enter.apply(this, arguments);
        var graph = new Graph()
            .layout("None")
        ;

        var origRender = graph.render;
        var context = this;
        graph.render = function () {
            var vertices = [];
            var edges = [];
            var prevAddr = null;
            context.data().forEach(function (row) {
                var pos2 = context._viewportSurface.project(row[0], row[1]);
                var newAddr = new Shape()
                    .shape("circle")
                    .radius(3)
                    .data(row)
                    .pos(pos2)
                ;
                vertices.push(newAddr);
                if (prevAddr) {
                    edges.push(new Edge()
                        .sourceVertex(prevAddr)
                        .targetVertex(newAddr)
                        .targetMarker("arrowHead")
                    );
                }
                prevAddr = newAddr;
            });
            this.data({ vertices: vertices, edges: edges });
            origRender.apply(this, arguments);
            this.graphData.nodeValues().forEach(function (vertex) {
                var pos = context._viewportSurface.project(vertex.data()[0], vertex.data()[1]);
                pos.x -= context.width() / 2;
                pos.y -= context.height() / 2;
                vertex.move(pos);
            });
            this.graphData.edgeValues().forEach(function (edge) {
                edge.points([]);
            });
        };

        this._viewportSurface.widget(graph);
    };

    return GMapGraph;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('src/map/GMapHeat',["./GMap", "../other/HeatMap"], factory);
    } else {
        root.map_GMapHeat = factory(root.map_GMap, root.other_HeatMap);
    }
}(this, function (GMap, HeatMap) {
    function GMapHeat() {
        GMap.call(this);
    }
    GMapHeat.prototype = Object.create(GMap.prototype);
    GMapHeat.prototype.constructor = GMapHeat;
    GMapHeat.prototype._class += " map_GMapHeat";

    GMapHeat.prototype.enter = function () {
        GMap.prototype.enter.apply(this, arguments);
        var heat = new HeatMap();

        var origRender = heat.render;
        var context = this;
        heat.render = function () {
            this.data(context.data().map(function (row) {
                var pos = context._viewportSurface.project(row[0], row[1]);
                return [pos.x, pos.y, row[4]];
            }));
            origRender.apply(this, arguments);
        };

        this._viewportSurface.widget(heat);
    };

    return GMapHeat;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('src/map/TestHeatMap',["../layout/Layered", "../layout/AbsoluteSurface", "./ChoroplethStates", "../other/HeatMap"], factory);
    } else {
        root.map_TestHeatMap = factory(root.layout_Layered, root.layout_AbsoluteSurface, root.map_ChoroplethStates, root.other_HeatMap);
    }
}(this, function (Layered, AbsoluteSurface, ChoroplethStates, HeatMap) {
    function TestHeatMap(target) {
        Layered.call(this);
    }
    TestHeatMap.prototype = Object.create(Layered.prototype);
    TestHeatMap.prototype.constructor = TestHeatMap;
    TestHeatMap.prototype._class += " map_TestHeatMap";

    return TestHeatMap;
}));


(function(c){var d=document,a='appendChild',i='styleSheet',s=d.createElement('style');s.type='text/css';d.getElementsByTagName('head')[0][a](s);s[i]?s[i].cssText=c:s[a](d.createTextNode(c));})
('.noFill{fill:whitesmoke;stroke:none}.map_Choropleth .zoom{stroke:none;fill:none;pointer-events:all}.map_Choropleth path{cursor:pointer;fill:whitesmoke;stroke:#6d6e71;stroke-width:.125px;stroke-linejoin:round;stroke-linecap:round;vector-effect:non-scaling-stroke}.map_Choropleth path.selected{stroke:red;stroke-width:1.5px}.map_Choropleth path.over{stroke:orange;stroke-width:1.5px}.map_GMap .marker{fill:#656565;stroke:none;stroke-width:1px}.map_GMap .zoom{fill:none;pointer-events:all}.gm-style img{max-width:none}.gm-style label{width:auto;display:inline}');

define("hpcc-viz-map", function(){});
