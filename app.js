//this is a comment!
//so is this!
//impressed?

function getMetaData(sample) {
    var metaURL= '/metadata/${sample}';
    d3.json(metaURL).then(function(sample){
        var sampleMetaData=d3.select("#sample-metadata");

        sampleMetaData.html("");
    
    Object.defineProperties(sample).foreach(function ([key, value]){
        var row=sampleMetaData;
        row.text('${key}: ${value}');

    })
    })
};

function createChart(sample) {
    var chartData='/samples/${sample}';
    d3.json(plotData).then(function (data) {
        var xVal=data.otu_ids;
        var yVal=data.sample_values;
        var tVal=data.otu_labels;
        var mSize=data.sample_values;
        var mColor=data.otu_ids;

    var Bubble= {
        x: xVal,
        y: yVal,
        text: tVal,
        mode: 'markers',
        marker: {
            size: mSize,
            color: mColor
        }
    };
    var data=[Bubble];
    var layout={
        xaxis: {title: "OTU ID"},
        title: "Your Belly Button Bacteria and You"
    };
    Plotly.newPlot('bubble', data, layout);
    d3.json(chartData).then(function(data) {
        var pieval=data.sample_values.slice(0,10);
        var pieLabel=data.otu_ids.slice(0,10);
        var pieHover=data.otu_labels.slice(0,10);
    var data=[{
        values:pieval,
        labels:pieLabel,
        hovertext: pieHover,
        type:'pie'
    }];
    Plotly.newPlot('pie', data)
    });
    });
};

function init() {
    console.log('is this thing on?')
    var selectData=d3.select('#selDataset');
    d3.json("samples.json").then((sampleNames) => {
        sampleNames.forEach((sample) => {
            selectData
                .append("option")
                .text(sample)
                .property("value", sample);
        });
        const firstSample=sampleNames[0];
        createChart(firstSample);
        getMetaData(firstSample);
    });
}

function optionChanged(newSample) {
    createChart(newSample);
    getMetaData(newSample);
}

init();