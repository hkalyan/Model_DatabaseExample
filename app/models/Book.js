exports.definition = {
	config: {
		  "columns": {
            "title": "TEXT",
            "id": "INTEGER PRIMARY KEY AUTOINCREMENT"
        },
        "adapter": {
            "type": "sql",
            "collection_name": "title",
            "idAttribute": "id",
            "db_name": "wikiDb"
        }
	},		
	extendModel: function(Model) {		
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});
		
		return Model;
	},
	extendCollection: function(Collection) {		
		_.extend(Collection.prototype, {
			// extended functions and properties go here
			deleteAll : function() {
 
                var collection = this;
 
                var sql = "DELETE FROM " + collection.config.adapter.collection_name;
                db = Ti.Database.open(collection.config.adapter.db_name);
                db.execute(sql);
                db.close();
 
                collection.trigger('sync');
 
            },
            deleteRow : function() {
 
                var collection = this;
 
                var sql = "DELETE FROM " + collection.config.adapter.collection_name + " where id="+Titanium.App.Properties.getInt('clicked_row_id');
                db = Ti.Database.open(collection.config.adapter.db_name);
                db.execute(sql);
                db.close();
 
                collection.trigger('sync');
 
            },
		});
		
		return Collection;
	}
}

