var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone, db = Ti.Database.open("wikiDb");

try {
    rows = db.execute("select * from user_settings");
    if (rows.rowCount == 0) {
        Alloy.Globals.newUser = !0;
        rows.isValidRow() && (Alloy.Globals.FONT_SIZE = rows.fieldByName("font_size"));
    } else {
        Alloy.Globals.newUser = !1;
        Alloy.Globals.FONT_SIZE = 18;
    }
    rows.close();
} catch (err) {
    Alloy.Globals.newUser = !0;
}

db.execute("Create TABLE IF NOT EXISTS title (id INTEGER PRIMARY KEY, title TEXT)");

db.execute("Create TABLE IF NOT EXISTS new (id INTEGER PRIMARY KEY, val INTEGER)");

db.execute("Delete from title");

db.execute("Delete from new");

rows = db.execute("Select * from new");

if (rows.rowCount == 0) {
    var f = Titanium.Filesystem.getFile("web/titles.txt");
    if (f.exists()) {
        var contents = f.read(), sp = contents.text.split("\n");
        for (i = 0; i < sp.length; i++) if (sp[i] != "") {
            var n = sp[i].search("ID"), s = n - 1, title = sp[i].substring(6, n);
            n += 3;
            var id = sp[i].substring(n);
            db.execute("insert into title values(" + id + ", \"" + title + "\")");
        }
        db.execute("insert into new values(0, 1)");
    } else alert("file structure does not exist");
}

Alloy.createController("index");