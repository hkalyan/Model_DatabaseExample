// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};
var db = Ti.Database.open('wikiDb');
/*
 * This section of the code checks if there is a record in the user_settings tables. It is assumed that 
 * if there is atleast one row returned then the user profile has been set up otherwise user should be 
 * taken to profile setup screen. If the database has been cleared explicitly by the user then an exception
 * is thrown and it is handled by a try-catch block, if there is an exception then the user is taken back to 
 * profile setup screen. 
 * 
 */

try{
	rows= db.execute('select * from user_settings');
			if(rows.rowCount == 0)
		{
			Alloy.Globals.newUser = true;	
			if(rows.isValidRow())
			{
				Alloy.Globals.FONT_SIZE = rows.fieldByName('font_size');
			}
		}
		else
		{
			Alloy.Globals.newUser = false;	
			Alloy.Globals.FONT_SIZE = 18;
		}
		rows.close();
}
catch(err){
	Alloy.Globals.newUser = true;	
}

if (OS_IOS)
	db.file.setRemoteBackup(false);

db.execute('Create TABLE IF NOT EXISTS title (id INTEGER PRIMARY KEY, title TEXT)');
db.execute('Create TABLE IF NOT EXISTS new (id INTEGER PRIMARY KEY, val INTEGER)');
db.execute('Delete from title');
db.execute('Delete from new');
rows= db.execute('Select * from new');
if(rows.rowCount == 0)
{
	var f = Titanium.Filesystem.getFile('web/titles.txt');	
	if(f.exists())
	{
		var contents = f.read();
		var sp = contents.text.split('\n');
		for(i=0; i<sp.length;i++)
		{
			if(sp[i] != '')
			{
				var n = sp[i].search("ID");
				var s = n-1;	
				var title = sp[i].substring(6, n);					
				n=n+3;
				var id = sp[i].substring(n);					
			    db.execute('insert into title values('+id+', "'+title+'")');
		    }  
		}
		db.execute('insert into new values(0, 1)');
	}
	else
	{
		alert('file structure does not exist');
	}
}