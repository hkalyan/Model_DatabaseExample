/*var book = Alloy.createCollection('book', [{title:'Green Eggs and Ham', author:'Dr. Seuss'}]); 
var title = book.get('title');
var author = book.get('author');
// Label object in the view with id = 'label'
$.label.text = title + ' by ' + author;*/
// Encase the title attribute in square brackets

$.index.open();
// Encase the title attribute in square brackets

// Show only book models by Mark Twain

// Trigger the synchronization
var library = Alloy.Collections.book;
library.fetch();
 
// Free model-view data binding resources when this view-controller closes
$.index.addEventListener('close', function() {
    $.destroy();
});

$.deletebtn.addEventListener('click',function(){
	Alloy.Collections.book.deleteAll();
	library.fetch();
});

$.titles.addEventListener('click', function(e){
	Titanium.App.Properties.setInt('clicked_row_id', e.rowData.id);
	var toast = Ti.UI.createNotification({
    message: "Profile saved successfully!!"+Titanium.App.Properties.getInt('clicked_row_id'),
    duration: Ti.UI.NOTIFICATION_DURATION_LONG
	});
	toast.show();
Alloy.Collections.book.deleteRow();
	library.fetch();
});
