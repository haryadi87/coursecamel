/*
 * Created by Haryadi H.
 * Get a free search and display it on the autocomplete field
 * */

function getFreeName(){
	var value = document.getElementById("freeSearch").value;
	var db=window.sqlitePlugin.openDatabase({name: "coursecamel"});
	document.getElementById("autocompleteResultCourse").innerHTML="";
	document.getElementById("autocompleteResultJobs").innerHTML="";
	if(value.length>2) {
		var query = 'SELECT Id, Title, PartTime FROM Course WHERE Title LIKE "%'+value+'%" UNION ALL SELECT Id, JobName, CourseId FROM Job WHERE JobName LIKE "%'+value+'%"';
		db.transaction(
			function(tx){
				tx.executeSql(query,[],function(tx,resultSet) {
					var len=resultSet.rows.length;
					if(len>0) {
						var newHTMLCourse = "";
						var newHTMLJob = "";
						var resultCourse = document.getElementById("autocompleteResultCourse");
						var resultJob = document.getElementById("autocompleteResultJobs");
						resultCourse.innerHTML="";
						resultJob.innerHTML="";
						for(var i = 0; i < len ; i++) {
							var row = resultSet.rows.item(i);
							var check = parseInt(row['PartTime']);
							console.log(check);
							if(check < 2) {
								newHTMLCourse += "<tr style='border-bottom: 1px solid #ddd'><td width=1% style='white-space:nowrap;font-weight:bold;font-size: 20px;' align='left' onClick='getCourseDetail("+row['Id']+");' > <a href=\"#tab3\" data-toggle=\"tab\"> &nbsp;&nbsp;" +row['Title']+"</a> </td></tr>";	
							}
							else {
								newHTMLJob += "<tr style='border-bottom: 1px solid #ddd'><td width=1% style='white-space:nowrap;font-weight:bold;font-size: 20px;' align='left' onClick='getJobDetail("+row['Id']+");' > <a href=\"#tab3\" data-toggle=\"tab\"> &nbsp;&nbsp;"  +row['Title']+"</a> </td></tr>";
							}
						}
						resultCourse.innerHTML += newHTMLCourse;
						resultJob.innerHTML += newHTMLJob;
					}	
				});
			}, errorCB);
	}
}