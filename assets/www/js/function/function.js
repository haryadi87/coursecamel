/*
 * Created by Harydi H
 * General function that is used many times
 * */

/* Add/remove subject as a favorite */

function editFavorite(number) {
	var becomeFavorite;
	var db=window.sqlitePlugin.openDatabase({name:"coursecamel"});
	var query= 'SELECT Favorite FROM Course WHERE Id='+number+' ';
	db.transaction(function(tx) {
		tx.executeSql(query,[], function(tx,resultSet) {
			if(resultSet.rows.item(0).Favorite == 0) {
				console.log("Make it to favorite");
				makeFavorite(number);
			}
			else {
				console.log("Unfavorite it");
				makeUnFavorite(number);
			}
		});
	},errorCB);
}

/* Retrieve the list of selected courses in free search */

function getCourseDetail(number) {
	var db=window.sqlitePlugin.openDatabase({name: "coursecamel"});
	var query = 'SELECT Course.Id, Title, Institution.Name, Length, Unit, EntryScore, Prerequisites, Favorite FROM Course INNER JOIN Institution ON Course.Institution_Id = Institution.Id WHERE Course.Id = '+number+'';
	db.transaction(
		function(tx){
			tx.executeSql(query,[],function(tx,resultSet){
				var len = resultSet.rows.length;
				document.getElementById("favorite-table-id").innerHTML = "";
				var newHTML = "";
				var result = document.getElementById("favorite-result-count-id");
				var contentResult= "COURSE RESULTS("+len+")";

				result.innerHTML="";
				result.innerHTML +=contentResult;
				var row = resultSet.rows.item(0);
				if(row['Favorite']) {
					newHTML += "<tr> <td> <table> <tr> <td width=1% style='white-space:nowrap;font-weight:bold;font-size: 20px;' align='left' onClick='extendCourse("+row['Id']+");'>" +row['Title']+"-"+row['Name'] +
					"</td> <td align='right' style='vertical-align:middle;font-size: 18px;' rowspan=2 onClick='editFavorite("+row['Id']+");'> " +
					"<span class='glyphicon glyphicon-star' id='glyphicon["+row['Id']+"]'></span></a> </td></tr> <tr> <td width=1% style='white-space:nowrap'>" +
					"Length:"+row['Length']+ " "+row['Unit']+"  ATAR:"+row['EntryScore']+ "  Prereq:"+row['Prerequisites']+ 
					"</td> </tr> </table> </td> </tr>";
				}
				else {
					newHTML += "<tr> <td> <table> <tr> <td width=1% style='white-space:nowrap;font-weight:bold;font-size: 20px;' align='left' onClick='extendCourse("+row['Id']+");'>" +row['Title']+"-"+row['Name'] +
					"</td> <td align='right' style='vertical-align:middle;font-size: 18px;' rowspan=2 onClick='editFavorite("+row['Id']+");'> " +
					"<span class='glyphicon glyphicon-star-empty' id='glyphicon["+row['Id']+"]'></span></a> </td></tr> <tr> <td width=1% style='white-space:nowrap'>" +
					"Length:"+row['Length']+ " "+row['Unit']+"  ATAR:"+row['EntryScore']+ "  Prereq:"+row['Prerequisites']+ 
					"</td> </tr> </table> </td> </tr>";
				}
				document.getElementById("favorite-table-id").innerHTML+= newHTML;
			});
		},errorCB);
}

/*Get course that relevant with the selected job in freeSearch - continue to jobDetailResult */

function getJobDetail(number) {
	var db=window.sqlitePlugin.openDatabase({name: "coursecamel"});
	var query = 'SELECT * FROM Job WHERE Id = '+number+'';
	db.transaction(
		function(tx){
			tx.executeSql(query,[],jobDetailResult,errorCB);
		},errorCB);
}

function jobDetailResult(tx,resultSet) {
	var db=window.sqlitePlugin.openDatabase({name: "coursecamel"});
	var len = resultSet.rows.length;
	var result = document.getElementById("favorite-result-count-id");
	var row = resultSet.rows.item(0);
	var contentResult= ""+row['JobName'];

	result.innerHTML="";
	result.innerHTML +=contentResult;
	
	var arrayCourse = row['CourseId'].split(",");
	var query = 'SELECT Course.Id, Title, Institution.Name, Length, Unit, EntryScore, Prerequisites, Favorite FROM Course INNER JOIN Institution ON Course.Institution_Id = Institution.Id WHERE Course.Id IN ('+arrayCourse+')';
	
	db.transaction(
			function (tx) {
				tx.executeSql(query, [], function (tx, result) {
					var len = result.rows.length;
					document.getElementById("favorite-table-id").innerHTML = "";
					document.getElementById("favorite-result-count-id").innerHTML += " - COURSE RESULTS("+len+")";
					if (len > 0) {
						var newHTML = "";
						for (var i = 0; i < len; i++) {
							var value = result.rows.item(i);
							if(value['Favorite']) {
								newHTML += "<tr> <td> <table> <tr> <td width=1% style='white-space:nowrap;font-weight:bold;font-size: 20px;' align='left' onClick='extendCourse("+value['Id']+");'>" +value['Title']+"-"+value['Name'] +
								"</td> <td align='right' style='vertical-align:middle;font-size: 18px;' rowspan=2 onClick='editFavorite("+value['Id']+");'> " +
								"<span class='glyphicon glyphicon-star' id='glyphicon["+value['Id']+"]'></span></a> </td></tr> <tr> <td width=1% style='white-space:nowrap'>" +
								"Length:"+value['Length']+ " "+value['Unit']+"  ATAR:"+value['EntryScore']+ "  Prereq:"+value['Prerequisites']+ 
								"</td> </tr> </table> </td> </tr>";
							}
							else {
								newHTML += "<tr> <td> <table> <tr> <td width=1% style='white-space:nowrap;font-weight:bold;font-size: 20px;' align='left' onClick='extendCourse("+value['Id']+");'>" +value['Title']+"-"+value['Name'] +
								"</td> <td align='right' style='vertical-align:middle;font-size: 18px;' rowspan=2 onClick='editFavorite("+value['Id']+");'> " +
								"<span class='glyphicon glyphicon-star-empty' id='glyphicon["+value['Id']+"]'></span></a> </td></tr> <tr> <td width=1% style='white-space:nowrap'>" +
								"Length:"+value['Length']+ " "+value['Unit']+"  ATAR:"+value['EntryScore']+ "  Prereq:"+value['Prerequisites']+ 
								"</td> </tr> </table> </td> </tr>";
							}
						}
						document.getElementById("favorite-table-id").innerHTML+= newHTML;
					}
				});
			}, errorCB);
}

/* retrieve the complete information of course */

function extendCourse(number) {
	addJavascript('js/vendor/jquery-1.10.2.js','head');
	addJavascript('js/vendor/bootstrap-modal.js','head');
	var db=window.sqlitePlugin.openDatabase({name: "coursecamel"});
	var query = 'SELECT Course.Id,Course.Name AS Subject, Title, Institution.Name, Length, Unit,PartTime,Csp,InternationalPlace, EntryScore, Prerequisites, Campus, Type FROM Course INNER JOIN Institution ON Course.Institution_Id = Institution.Id WHERE Course.Id='+number+' ';
	db.transaction(
		function(tx) {
			tx.executeSql(query,[],function(tx,resultSet){
				var len = resultSet.rows.length;
				if(len > 0) {
					var title = document.getElementById("modal-title");
					title.innerHTML= "";
					var body = document.getElementById("modal-body");
					body.innerHTML = "";
					for(var i = 0; i < len; i++) {
						var row = resultSet.rows.item(i);
						switch(row['Csp']) {
							case 0:
							row['Csp'] = "No";
							break;
							case 1:
							row['Csp'] = "Yes";
							break; 
						}
						switch(row['PartTime']) {
							case 0:
							row['PartTime'] = "No";
							break;
							case 1:
							row['PartTime'] = "Yes";
							break; 
						}
						switch(row['InternationalPlace']) {
							case 0:
							row['InternationalPlace'] = "No";
							break;
							case 1:
							row['InternationalPlace'] = "Yes";
							break; 
						}
						title.innerHTML += row['Subject'];
						body.innerHTML += "&nbsp;&nbsp;Institution: " +row['Name']+
						"<br />&nbsp;&nbsp;Campus: " +row['Campus']+
						"<br />&nbsp;&nbsp;Qualification: " +row['Type']+
						"<br />&nbsp;&nbsp;Atar: " +row['EntryScore']+
						"<br />&nbsp;&nbsp;Prerequisites: " +row['Prerequisites']+
						"<br />&nbsp;&nbsp;Length: " +row['Length']+" "+row['Unit']+
						"<br />&nbsp;&nbsp;Part time availability: " +row['PartTime']+
						"<br />&nbsp;&nbsp;CSP: " +row['Csp']+ 
						"<br />&nbsp;&nbsp;International placement: "+row['InternationalPlace'];	
					}
				
					$('#myAnotherModal').modal({
	                    show: true
	                });
				}
			});
		},errorCB);	
}

/* add course as favorite */

function makeFavorite(number) {
	var db=window.sqlitePlugin.openDatabase({name:"coursecamel"});
	db.transaction(function(tx){
		tx.executeSql('UPDATE Course SET Favorite=1 WHERE Id='+number+' ');
	},errorCB,function(){
		shortToast("Subject add as favorite");
		//document.getElementById("glyphicon["+number+"]").class="glyphicon glyphicon-star";
	});
}

/* remove course as favorite */

function makeUnFavorite(number) {
	var db=window.sqlitePlugin.openDatabase({name:"coursecamel"});
	db.transaction(function(tx){
		tx.executeSql('UPDATE Course SET Favorite=0 WHERE Id='+number+' ');
	},errorCB,function(){
		shortToast("Subject remove from favorite");
		//document.getElementById("glyphicon["+number+"]").class="glyphicon glyphicon-star-empty";
	});
}

/* side function if sql transaction result in failure */

function errorCB(err) {
	console.log("Error message: " + err.message);
}