fluid.defaults("adam.grid", {
    gradeNames: "fluid.modelComponent",
    model: {
        rows: 8,
        columns: 8,
        grid: [], 
        regions: [],
        selectedcell: null, 
        selectedregion: null,
        allowoverlap: false, 
    },

    events: {
        gridchanged: null
    },

    invokers: {
        addregion: {
            funcName: "adam.grid.addRegion",
            args: ["{that}", "{arguments}.0"]
        },

        removeregion: {
            funcName: "adam.grid.removeRegion",
            args: ["{that}", "{arguments}.0"]
        },

        selectregion: {
            funcName: "adam.grid.selectRegion",
            args: ["{that}", "{arguments}.0"]
        },

    },

    listeners: {
        onCreate: {
            funcName: "adam.grid.onCreate",
            args: ["{that}"]
        },
    }
});


adam.grid.onCreate = function (that) {
    for (var i = 0; i < that.model.rows * that.model.columns; i++) {
        that.model.grid[i] = undefined;
    }
};

adam.grid.addRegion = function(that, region){
    if (that.model.allowoverlap){
        // todo make a way to have multiple regions in a grid location
        that.model.regions.push(region);
    }else{
        // todo checkoverlap
        that.model.regions.push(region);
    }
    for (step of region.model.steps){
        // todo cell step to grid size? 
        that.model.grid[step.model.x*8+step.model.y] = region; 
    }
    that.events.gridchanged.fire();
};

adam.grid.removeRegion = function(that, region){
    for (var i = 0; i < that.model.regions; i++){
        if ( that.model.regions[i].equals(region) ){
            that.model.regions.splice(i, 1);
            return;
        }
    }
};

adam.grid.selectRegion = function(that, region){
    that.model.selectedregion = region;
};

adam.grid.checkOverlap = function(that, region){
    for (let r of that.model.regions ){
        r.checkOverlap(region);
    }
};



/// old idea, still ok?
//------------------------------------------
// grid model
//------------------------------------------
/*
fluid.defaults("adam.testgrid", {
   gradeNames:  "fluid.modelComponent",
   numPads: 64,
   model: {
   pads: "@expand:adam.grid.initEmptyGrid({that}.options.numPads)"
//                 pads: {
//                     "0": true,
//                     "1": false,
//                     "2": true
//                }
},
modelListeners: {
"pads.*": {
    namespace: "sendMIDIPadState",
    funcName: "adam.padStateChange", // connect this to adam.push?
    args: ["{change}.path.0", "{change}.value"]
    }
    }
});

adam.grid.initEmptyGrid = function (numPads) {
    var pads = [];
    for (var i = 0; i < numPads; i++) {
    pads[i] = false;
    }
    // return pads;  // ??
};

adam.grid.padStateChange = function (padIdx, value) {
    adam.push.sendMidiForStateChange(padIdx, value);
};
*/



/*-------------------
// old function

        addcell: { // todo fix to grid size?
            func: function(that, cell, ref = true){
                that.model.grid[cell.model.x*8 + cell.model.y] = ref;
            },
            args: ["{that}", "{arguments}.0", "{arguments}.1"]
        },

        // old
        getcell: {
            func: function(that, cell){
                if(cell === undefined){ // todo: maybe not?
                    return that.model.grid[ that.model.selectedcell.row * that.options.columns + that.model.selectedcell.column];
                }else{
                    return that.model.grid[cell.row * that.options.columns  + cell.column];
                }
            },
            args: ["{that}", "{arguments}.0"]
        },

        selectcell: {
            func: function(that, cell){
                that.model.selectedcell = cell;
            },
            args: ["{that}", "{arguments}.0"]
        },


        // old
       checkzoneoverlap:{ 
           func: function(that, stepz){
               for ( key of Object.keys( stepz )){
                   if( Array.isArray( stepz[key] )){
                       for (subkey of Object.keys(stepz[key])){
                           if ( that.checkcelloverlap( stepz[key][subkey].location )){
                               console.log('zone overlap');
                               return true;
                           }
                       }
                   }else{
                       if ( that.checkcelloverlap( stepz[key].location )){
                           console.log('zone overlap');
                           return true;
                       }
                   }
               }
               console.log ('no zone overlap');
               return false;
           },
           args: ["{that}", "{arguments}.0"]
       },

       checkcelloverlap: {
            func: function(that, cell){
                if( that.model.grid[cell.row*that.options.columns + cell.column] === undefined ){ 
                    return false;
                }else{
                    return true;
                }
            },
            args: ["{that}", "{arguments}.0"]
        },

        getoverlap: {
            func: function(that, cellz){
                let foundcells = [];
                for ( key of Object.keys( cellz ) ){
                    if (Array.isArray( cellz[key] ) ){
                        for ( subkey of Object.keys( cells[key] ) ){
                            
                        }
                    }else{

                    }
                }
                return foundcells;
            },
            args: ["{that}", "{arguments}.0"]
        },

        // old
        // TODO also remove from region?
        removecell: {
            func: function(that, cell){
                that.model.grid[cell.row*that.options.columns + cell.column] = undefined;
            },
            args: ["{that}", "{arguments}.0"]
        }



----------------- */