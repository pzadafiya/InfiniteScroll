# Infinite Scroll (Jquery Plugin)

 ### How to implement it ###
 <pre>
	$("#table").iScroll({
		url: '/data url'
	});
	
	It appends the data into &lt;tbody> element of the table.
</pre>
 #### More options ####	
<pre>
	$(element).iScroll({
		url: '/data url'
		type: 'POST',
		contentType: "application/json; charset=utf-8",
		async: false,
		appendEle: '',   // Element where you want to append response data instead of the &lt;tbody> ex. "#div #subdiv"
		callback: function (appendEle, data) {  // Define the callback function on getting 
				      appendEle.append(data);
            },
		// add more paramters request to server 
		data: {
                      searchText : searchText,  // search text to implement search 
                      sortName: sortColName,    //  To manage onclick sorting on column name 
                      sortOrder: sortOrder      //  To manage onclick sorting on column name 
                    }
		pagination: {
			pageId: 1,
			pageSize: 20
		}
	});
</pre>
