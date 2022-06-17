String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        FastClick.attach(document.body);        

        //var walletCollection = [];            

        var faContainer     = $("#faContainer"),
            faTable         = $("#faTable"),
            spContainer     = $("#spContainer"),
            spTable         = $("#spTable"),
            iiContainer     = $("#iiContainer"),
            iiTable         = $("#iiTable"),
            startButton     = $("#start");                        

        var FA              = "fa",
            SP              = "sp",
            II              = "ii";

        var version         = "1.0",
            storage         = window.localStorage,
            currentVersion  = storage.getItem("version");

        if (currentVersion != version) {
            //clear local storage
            storage.setItem("version", version);                        
        } else {
            //scores  = JSON.parse(storage.getItem("scores"));            
        }

        var initialize = function() {
                       
        }

        var start = function() {
            var faCollection = [],
                spCollection = [],
                iiCollection = [];

            $.each(FONTS, function(i, font) {
                if (font["library"]         == FA) {
                    faCollection.push(font);
                } else if (font["library"]  == SP) {
                    spCollection.push(font);
                } else if (font["library"]  == II) {
                    iiCollection.push(font);
                }
            });

            buildTableOfFonts(faCollection, faTable);
            buildTableOfFonts(spCollection, spTable);
            buildTableOfFonts(iiCollection, iiTable);
        }

        startButton.click(function() {
            start();
        });

        var toCamelCase = function(str) {
          // Lower cases the string
          return str.toLowerCase()
            // Replaces any - or _ characters with a space 
            .replace( /[-_]+/g, ' ')
            // Removes any non alphanumeric characters 
            .replace( /[^\w\s]/g, '')
            // Uppercases the first character in each group immediately following a space 
            // (delimited by spaces) 
            .replace( / (.)/g, function($1) { return $1.toUpperCase(); })
            // Removes spaces 
            //.replace( / /g, '' );
        }

        var toTitleCase = function(str)
        {
            return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        }               

        var buildTableOfFonts = function(fonts, targetTable, fontSize) {
            var html = '<thead><tr><th>Name</th><th>Icon</th><th>Font</th><th>Content</th><th>Size</th><th>Location</th>';

            html += '</tr></thead><tbody>';

            $.each(fonts, function(i, font) {
                html += '<tr><td>' + font.name + '</td><td><span class="fa ' + font.size + ' ' + font.font + '"></span></td><td>' + font.font + '</td><td>' 
                    + font.content + '</td><td>' + font.size + '</td><td><ul class="noBullet">';
                var locations = font.location;
                for (var x=0; x<locations.length; x++) {
                    html += '<li>' + locations[x] + '</li>';
                }
                html += '</ul></td></tr>';
            })

            html += '</tbody>';

            targetTable.html(html);
        }

        //initialize();        
    }
};

//app.initialize();
app.receivedEvent();