
var Earthquakes_onclick;
var WorldCities_onclick;
var Chinaprovince_onclick;
var url2012_onclick;
var url2013_onclick;
var url2014_onclick;
var url2015_onclick;
var rate_onclick;
var FeatureLayerurl_onchange;
var _text;
var str;
var basemap_layer;
var removeOption1;
var removeOption2;
var removeOption3;
var removeOption4;
var removeOption5;
var removeOption6;
var removeOption7;
var removeOption2012;
var removeOption2013;
var removeOption2014;
var removeOption2015;
var removeOptionrate;
var x ;
require([
        "esri/config",
        "esri/Map",
        "esri/views/MapView",
        "esri/layers/FeatureLayer",
        "esri/widgets/Locate",
        "esri/widgets/Track",
        "esri/Graphic",
        "esri/widgets/Search",
        "esri/tasks/Locator"

    ],
    function (esriconfig, Map, MapView, Feature_Layer ,Locate,Track,Graphic,Search,Locator) {
        esriconfig.apiKey = "AAPK56e3ac027f044c4089d8ceec232fc05dYaOuzVRzm8tMRqvzOvDvIEevbqJ85yppn9PacU6cy4duurJrVK9wo_8BcWO8i8bi";
        basemap_layer = new Map({
            basemap: "arcgis-navigation"
        });

        document.getElementById("arcgis-topographic").addEventListener("click", function () {
            basemap_layer.basemap = "arcgis-topographic";
           });
        removeOption1 = function (){
            x=document.getElementById("remove_arcgis-topographic");
            x.remove(x.selectedIndex);
            basemap_layer.basemap = "arcgis-navigation";
        }
        document.getElementById("streets").addEventListener("click", function () {
            basemap_layer.basemap = "streets-vector";
           });
        removeOption2 = function (){
            x=document.getElementById("remove_gray");
            x.remove(x.selectedIndex);
            basemap_layer.basemap = "arcgis-navigation";
        }
        document.getElementById("gray").addEventListener("click", function () {
            basemap_layer.basemap = "gray-vector";
           });
        removeOption3 = function (){
            x=document.getElementById("remove_streets");
            x.remove(x.selectedIndex);
            basemap_layer.basemap = "arcgis-navigation";
        }
        document.getElementById("hybrid").addEventListener("click", function () {
            basemap_layer.basemap = "arcgis-imagery-standard";
           });
        removeOption4 = function (){
            x=document.getElementById("remove_hybrid");
            x.remove(x.selectedIndex);
            basemap_layer.basemap = "arcgis-navigation";
        }
        var view = new MapView({
            map: basemap_layer,
            center: [116.5, 39],
            zoom: 7,
            container: "viewDiv"
        });

        const search = new Search({
            view: view
        });
        view.ui.add(search, "top-right");

        const places = ["Choose a place type...", "Parks and Outdoors", "Coffee shop", "Gas station", "Food", "Hotel"];

        const select = document.createElement("select","");
        select.setAttribute("class", "esri-widget esri-select");
        select.setAttribute("style", "width: 175px; font-family: 'Avenir Next W00'; font-size: 1em");

        places.forEach(function(p){
            const option = document.createElement("option");
            option.value = p;
            option.innerHTML = p;
            select.appendChild(option);
        });

        view.ui.add(select, "top-right");

        const locator = new Locator({
            url: "http://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer"
        });

        // Find places and add them to the map
        function findPlaces(category, pt) {
            locator.addressToLocations({
                location: pt,
                categories: [category],
                maxLocations: 25,
                outFields: ["Place_addr", "PlaceName"]
            })

                .then(function(results) {
                    view.popup.close();
                    view.graphics.removeAll();

                    results.forEach(function(result){
                        view.graphics.add(
                            new Graphic({
                                attributes: result.attributes,  // Data attributes returned
                                geometry: result.location, // Point returned
                                symbol: {
                                    type: "simple-marker",
                                    color: "#000000",
                                    size: "12px",
                                    outline: {
                                        color: "#ffffff",
                                        width: "2px"
                                    }
                                },

                                popupTemplate: {
                                    title: "{PlaceName}", // Data attribute names
                                    content: "{Place_addr}"
                                }
                            }));
                    });

                });

        }

        // Search for places in center of map
        view.watch("stationary", function(val) {
            if (val) {
                findPlaces(select.value, view.center);
            }
        });

        // Listen for category changes and find places
        select.addEventListener('change', function (event) {
            findPlaces(event.target.value, view.center);
        });


        const locate = new Locate({
            view: view,
            useHeadingEnabled: false,
            goToOverride: function(view, options) {
                options.target.scale = 1500;
                return view.goTo(options.target);
            }
        });
        view.ui.add(locate,"top-right");

        const track = new Track({
            view: view,
            graphic: new Graphic({
                symbol: {
                    type: "simple-marker",
                    size: "12px",
                    color: "green",
                    outline: {
                        color: "#efefef",
                        width: "1.5px"
                    }
                }
            }),
            useHeadingEnabled: false
        });
        view.ui.add(track,"top-right");
        Earthquakes_onclick = function (checkbox) {
            if (checkbox.checked == true) {
                Ear_Layer = new Feature_Layer({

                    portalItem:{id:"419dbdec6f514621a80a375d7897520f"}
                });
                basemap_layer.add(Ear_Layer);
            }
            else {
                view.map.remove(Ear_Layer);
            }
        }

        removeOption5 = function (){
            x=document.getElementById("remove_e");
            x.remove(x.selectedIndex);
            view.map.remove(Ear_Layer);
        }

        url2012_onclick = function (checkbox) {
            if (checkbox.checked == true) {
                url2012_Layer = new Feature_Layer({

                    portalItem:{id:"3d463637f860455ea87e9c4a0e52d1dd"}
                });
                basemap_layer.add(url2012_Layer);
            }
            else {
                view.map.remove(url2012_Layer);

            }
        }
        removeOption2012 = function (){
            x=document.getElementById("remove_2012");
            x.remove(x.selectedIndex);
            view.map.remove(url2012_Layer);
        }

        url2013_onclick = function (checkbox) {
            if (checkbox.checked == true) {
                url2013_Layer = new Feature_Layer({

                    portalItem:{id:"af5b3dc6cf3b4072a9dfa4bd38da67bc"}
                });
                basemap_layer.add(url2013_Layer);
            }
            else {
                view.map.remove(url2013_Layer);

            }
        }
        removeOption2013 = function (){
            x=document.getElementById("remove_2013");
            x.remove(x.selectedIndex);
            view.map.remove(url2013_Layer);
        }

        rate_onclick = function (checkbox) {
            if (checkbox.checked == true) {
                rate_Layer = new Feature_Layer({

                    portalItem:{id:"f71d2e3a903a482db67604a45a38ee4c"}
                });
                basemap_layer.add(rate_Layer);
            }
            else {
                view.map.remove(rate_Layer);

            }
        }
        removeOptionrate = function (){
            x=document.getElementById("remove_rate");
            x.remove(x.selectedIndex);
            view.map.remove(rate_Layer);
        }

        url2014_onclick = function (checkbox) {
            if (checkbox.checked == true) {
                url2014_Layer = new Feature_Layer({

                    portalItem:{id:"3f6b8a74e0994ec588fe2ea5c18200ac"}
                });
                basemap_layer.add(url2014_Layer);
            }
            else {
                view.map.remove(url2014_Layer);

            }
        }
        removeOption2014 = function (){
            x=document.getElementById("remove_2014");
            x.remove(x.selectedIndex);
            view.map.remove(url2014_Layer);
        }

        url2015_onclick = function (checkbox) {
            if (checkbox.checked == true) {
                url2015_Layer = new Feature_Layer({

                    portalItem:{id:"d6277e860cd54b248974a984d99fe429"}
                });
                basemap_layer.add(url2015_Layer);
            }
            else {
                view.map.remove(url2015_Layer);

            }
        }
        removeOption2015 = function (){
            x=document.getElementById("remove_2015");
            x.remove(x.selectedIndex);
            view.map.remove(url2015_Layer);
        }

        WorldCities_onclick = function (checkbox) {
            if (checkbox.checked == true) {
                City_Layer = new Feature_Layer({

                    portalItem:{id:"539dfcdebd9b4b37947bb12929468e0e"}
                });
                basemap_layer.add(City_Layer);
            }
            else {
                    view.map.remove(City_Layer);

            }
        }

        removeOption6 = function (){
            x=document.getElementById("remove_w");
            x.remove(x.selectedIndex);
            view.map.remove(City_Layer);
        }

        prov_Layer = new Feature_Layer({
            portalItem:{id:"459f0fa8ad094db18a1e0ea60e5cc1c4"}
        });
        Chinaprovince_onclick = function (checkbox) {
            if (checkbox.checked == true) {
                basemap_layer.add(prov_Layer);
            }
            else {
                view.map.remove(prov_Layer);
            }
        }
        removeOption7 = function (){
            x=document.getElementById("remove_c");
            x.remove(x.selectedIndex);
            view.map.remove(prov_Layer);
        }

        var view2;
        var basemap_layer2 = new Map({
            basemap: "arcgis-imagery-standard"
        });
        view2 = new MapView({
            map: basemap_layer2,
            center: view.center,
            zoom: view.zoom,
            container: "viewDiv2"
        });
        function showCoordinates(pt) {
            var coords = "?????????" + pt.latitude.toFixed(3) + " "+ "????????????" + pt.longitude.toFixed(3) + "   ???????????????" + Math.round(view.scale * 1) / 1 + "   ?????????????????? " + parseInt(view.zoom);
            document.getElementById("coordinates").innerHTML = coords;
            view2.center = view.center;
            view2.zoom = view.zoom;
        }

        view.watch(["stationary"], function () {
            showCoordinates(view.center);
        });

        view.on(["pointer-down", "pointer-move"], function (evt) {
            showCoordinates(view.toMap({ x: evt.x, y: evt.y }));
        });
        // ------------------------------------------------------------------------
        var layer_array = new Array();

        layer_function = function (checkbox, value) {
            if (checkbox.checked == true) {
                basemap_layer.add(layer_array[value]);
            }
            else {
                view.map.remove(layer_array[value]);
            }
        }
        var value = 0;
        FeatureLayerurl_onchange = function () {
            _text = document.getElementById("_url").value;
            str = _text.split("/")
            str.reverse();
            if (str[0] == "MapServer" || str[0] == "FeatureServer") {
                _name = new Feature_Layer({
                    url: _text
                });
                layer_array.push(_name);
                var muiDiv = document.getElementById('LayerList_Div');
                createInput(str[1], value, muiDiv);
                value = value + 1;
            } else if (str[1] == "MapServer" || str[1] == "FeatureServer") {
                _name = new Feature_Layer({
                    url: _text
                });
                layer_array.push(_name);
                var muiDiv = document.getElementById('LayerList_Div');
                createInput(str[2], value, muiDiv);
                value = value + 1;
            }
        }

        var dom = document.getElementById("echarts");
        var myChart = echarts.init(dom);

        var option;
        option = {
            legend: {
                data: ['2011','2012','2013','2014','2015'],
                selected: {
                    '2013':false,'2014':false,'2015':false,
                },
            },
            title: {text: '2011???-2015???????????????????????????????????????\n(??????:??????)',bottom:'bottom',left:"center"},
            tooltip: {},
            dataset: {
                source: [
                    [  '??????',    '2011','2012','2013','2014','2015'],
                    [  '?????????',3289.53,3316.6,3336.6,3350.9,3366.8],
                    [ '??????',2322.5,2331.6,2337.4,2343.4,2349.2],
                    [ '?????????',1406.51,1415.8,1423.2,14299.6,1435.5],
                    ['?????????',1251.81,12.67,1287.7,1306.9,1324.9],
                    ['?????????',1144.35,1156.2,1168.3,1180.7,119.4],
                    [ '????????????',953.29,993.2,1001,1004.2,1020.1],
                    [ '?????????',982.35,990.7,994.8,998.6,1010.3],
                    [   '????????????',991.81,992.6,993.4,994.4,991.3],
                    [  '?????????',800.38,810.4,818.4,827.3,837.4],
                    [   '?????????',836.14,832,824.5,821.9,824.7],
                    [  '?????????',782.2,787.3,793.9,801.5,811.1],
                    [  '?????????',738,752.4,762.8,775.1,780.2],
                    [ '?????????',757.7,760.3,759.3,754.8,753.6],
                    [  '??????',707.2,715.5,718.8,724.2,730.6],
                    [ '?????????',718.08,721.2,723.7,726,729],
                    ['?????????',702.63,709.4,712.5,719,727],
                    [ '?????????',439.19,705.6,708.3,711,712.2],
                    [ '?????????',686.25,692.4,698.1,703.6,711.2],
                    [ '?????????',641.91,647.7,652.3,655.4,670.2],
                    [ '?????????',652,653.4,658.6,661.7,667.1],
                    [ '?????????',631.1,634.4,637.4,640.8,645.9],
                    [ '?????????',603.68,605.4,607.9,611.2,617.4],
                    ['?????????',579.56,540.2,543.8,545.1,548.7],
                    ['?????????',499.79,503.6,511,509,513.9],
                    ['?????????',370.12,374.6,375.3,376.8,381],
                    ['?????????',365.31,365.3,365.4,366.7,368.6],
                    ['?????????',323.56,323.4,322.4,321.5,321.5],
                    ['???????????????',242.11,246.2,253.6,260.4,264.9],
                    ['???????????????',228.47,230.9,229.1,232.1,236],
                    ['?????????',220.69,221.8,197.3,225.8,201.5],
                    [ '?????????',157.18,160.5,164.7,169.9,174.3],
                    ['?????????',159.34,161.4,162,162.4,164.3],
                    ['??????',55,56.8,59.2,62.2,64.3],
                    ['?????????',40,49,57.9,59,61.4],

                ]
            },
            yAxis: {type: 'category',},
            xAxis: {},

            series: [
                {type: 'bar'},
                {type: 'bar'},
                {type: 'bar'},
                {type: 'bar'},
                {type: 'bar'}
            ]
        };

        option && myChart.setOption(option);



        var dom2 = document.getElementById("echarts2");
        var myChart2 = echarts.init(dom2);
        var option;



        option = {
            title: {
                text: '?????????2015???/2011???',
                left: 'center',
                bottom: 20,
                textStyle: {
                    color: '#ccc'
                }
            },

            tooltip: {
                trigger: 'item'
            },

            visualMap: {
                show: false,
                min: 0,
                max: 2,
                inRange: {
                    colorLightness: [0, 1]
                }
            },
            series: [
                {
                    name: '?????????2015/2011???',
                    type: 'pie',
                    radius: '100%',
                    center: ['50%', '50%'],
                    data: [

                        {value: 1.02, name: '?????????'},
                        {value: 1.01, name: '??????'},
                        {value: 1.02, name: '?????????'},
                        {value: 1.06, name: '?????????'},
                        {value: 0.10, name: '?????????'},
                        {value: 1.07, name: '????????????'},
                        {value: 1.03, name: '?????????'},
                        {value: 1.00, name: '????????????'},
                        {value: 1.05, name: '?????????'},
                        {value: 0.99, name: '?????????'},
                        {value: 1.04, name: '?????????'},
                        {value: 1.06, name: '?????????'},
                        {value: 0.99, name: '?????????'},
                        {value: 1.03, name: '??????'},
                        {value: 1.02, name: '?????????'},
                        {value: 1.03, name: '?????????'},
                        {value: 1.62, name: '?????????'},
                        {value: 1.04, name: '?????????'},
                        {value: 1.04, name: '?????????'},
                        {value: 1.02, name: '?????????'},
                        {value: 1.02, name: '?????????'},
                        {value: 1.02, name: '?????????'},
                        {value: 0.95, name: '?????????'},
                        {value: 1.03, name: '?????????'},
                        {value: 1.03, name: '?????????'},
                        {value: 1.01, name: '?????????'},
                        {value: 0.99, name: '?????????'},
                        {value: 1.09, name: '???????????????'},
                        {value: 1.03, name: '???????????????'},
                        {value: 0.91, name: '?????????'},
                        {value: 1.11, name: '?????????'},
                        {
                            value: 1.03, name: '?????????'},
                        {value: 1.17, name: '??????'},
                        {value: 1.54, name: '?????????'}


                    ].sort(function (a, b) { return a.value - b.value; }),
                    roseType: 'radius',
                    label: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    },
                    labelLine: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.3)'
                        },
                        smooth: 0.2,
                        length: 10,
                        length2: 20
                    },
                    itemStyle: {
                        color: '#c23531',
                        shadowBlur: 200,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    },

                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                        return Math.random() * 200;
                    }
                }
            ]
        };

        option && myChart2.setOption(option);

});

function createInput(inputName, inputValue,aDiv) {
    aDiv.appendChild(document.createTextNode(inputName));
    var input = document.createElement("input");
    input.type = "checkbox";
    input.setAttribute("name", inputName);
    input.checked = false;
    input.value = inputValue;
    input.onclick = function(){
        layer_function(this, this.value);
    };

    aDiv.appendChild(input);
}


$('.downTips').css({ position:"absolute" , top:+9999, left:+9999});
$('.downTips').css("position","static");