function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    Alloy.Collections.instance("book");
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "index"
    });
    $.addTopLevelView($.__views.index);
    $.__views.titles = Ti.UI.createTableView({
        id: "titles"
    });
    $.__views.index.add($.__views.titles);
    var __alloyId6 = function(e) {
        var models = Alloy.Collections.book.models, len = models.length, rows = [];
        for (var i = 0; i < len; i++) {
            var __alloyId4 = models[i];
            __alloyId4.__transform = {};
            var __alloyId5 = Ti.UI.createTableViewRow({
                title: typeof __alloyId4.__transform.title != "undefined" ? __alloyId4.__transform.title : __alloyId4.get("title"),
                id: typeof __alloyId4.__transform.id != "undefined" ? __alloyId4.__transform.id : __alloyId4.get("id")
            });
            rows.push(__alloyId5);
        }
        $.__views.titles.setData(rows);
    };
    Alloy.Collections.book.on("fetch destroy change add remove reset", __alloyId6);
    $.__views.deletebtn = Ti.UI.createButton({
        id: "deletebtn",
        text: "delete",
        width: "50"
    });
    $.__views.index.add($.__views.deletebtn);
    exports.destroy = function() {
        Alloy.Collections.book.off("fetch destroy change add remove reset", __alloyId6);
    };
    _.extend($, $.__views);
    $.index.open();
    var library = Alloy.Collections.book;
    library.fetch();
    $.index.addEventListener("close", function() {
        $.destroy();
    });
    $.deletebtn.addEventListener("click", function() {
        Alloy.Collections.book.deleteAll();
        library.fetch();
    });
    $.titles.addEventListener("click", function(e) {
        Titanium.App.Properties.setInt("clicked_row_id", e.rowData.id);
        var toast = Ti.UI.createNotification({
            message: "Profile saved successfully!!" + Titanium.App.Properties.getInt("clicked_row_id"),
            duration: Ti.UI.NOTIFICATION_DURATION_LONG
        });
        toast.show();
        Alloy.Collections.book.deleteRow();
        library.fetch();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;