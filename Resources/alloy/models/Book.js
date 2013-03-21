exports.definition = {
    config: {
        columns: {
            title: "TEXT",
            id: "INTEGER PRIMARY KEY AUTOINCREMENT"
        },
        adapter: {
            type: "sql",
            collection_name: "title",
            idAttribute: "id",
            db_name: "wikiDb"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {});
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {
            deleteAll: function() {
                var collection = this, sql = "DELETE FROM " + collection.config.adapter.collection_name;
                db = Ti.Database.open(collection.config.adapter.db_name);
                db.execute(sql);
                db.close();
                collection.trigger("sync");
            },
            deleteRow: function() {
                var collection = this, sql = "DELETE FROM " + collection.config.adapter.collection_name + " where id=" + Titanium.App.Properties.getInt("clicked_row_id");
                db = Ti.Database.open(collection.config.adapter.db_name);
                db.execute(sql);
                db.close();
                collection.trigger("sync");
            }
        });
        return Collection;
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("Book", exports.definition, []);

collection = Alloy.C("Book", exports.definition, model);

exports.Model = model;

exports.Collection = collection;