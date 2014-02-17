/*
 * Created by Haryadi H.
 * Retrieve favorite from the embedded sqlite database and display it to the phone screen
 * */

function getData() {
	var db=window.sqlitePlugin.openDatabase({name:"coursecamel"});
	db.transaction(selectFavoriteDB,errorCB);
}

function selectFavoriteDB(tx) {
	var query='SELECT Course.Id,Title,Institution.Name,Length,Unit,EntryScore,Prerequisites,Favorite FROM Course INNER JOIN Institution ON Course.Institution_Id=Institution.Id WHERE Favorite=1';
	console.log(query);
	tx.executeSql(query, [], querySuccessFavorite, errorCB);
}

/*Retrieve the result of favorite*/

function querySuccessFavorite(tx, results) {
	var db=window.sqlitePlugin.openDatabase({name:"coursecamel"});
	document.getElementById("favorite-table-id").innerHTML="";
	var result = document.getElementById("favorite-result-count-id");
	var courseIdResult=results.rows.length;
	var contentResult= "COURSE RESULTS("+courseIdResult+")";

	result.innerHTML="";
	result.innerHTML +=contentResult;
	console.log(courseIdResult);

	if (courseIdResult > 0) {
		var newHTML = "";
		for (var i = 0; i < courseIdResult; i++) {
			var row = results.rows.item(i);
			newHTML += "<tr> <td> <table> <tr> <a href='#'> <td width=1% style='white-space:nowrap;font-weight:bold;font-size: 20px;' align='left' onClick='extendCourse("+row['Id']+");'>" +row['Title']+"-"+row['Name'] +
			"</td> <td align='right' style='vertical-align:middle;font-size: 18px;' rowspan=2 onClick='editFavorite("+row['Id']+");'> " +
			"<span class='glyphicon glyphicon-star' id='glyphicon["+row['Id']+"]'></span></a> </td> </a> </tr> <tr> <td width=1% style='white-space:nowrap'>" +
			"Length:"+row['Length']+ " "+row['Unit']+"  ATAR:"+row['EntryScore']+ "  Prereq:"+row['Prerequisites']+ 
			"</td> </tr> </table> </td> </tr>";
		}
		document.getElementById("favorite-table-id").innerHTML+= newHTML;
	}
}




