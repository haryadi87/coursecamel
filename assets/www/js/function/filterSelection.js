/*
 * Created by Haryadi H
 * Function that relate with the filter search
 * */

/* Selection of parameter: interest, prerequisite, location, atar, qualification, education, part time, csp, international 
 * from database: interest, prerequisite, location, qualification, education
 * Others: texted manually in code
 * */

function selectInterest() {
	var db=window.sqlitePlugin.openDatabase({name:"coursecamel"});
	db.transaction(selectInterestDB,errorCB);
}

function selectPrerequisite() {
	var db=window.sqlitePlugin.openDatabase({name:"coursecamel"});
	db.transaction(selectPrerequisiteDB,errorCB);
}

function selectLocation() {
	var db=window.sqlitePlugin.openDatabase({name:"coursecamel"});
	db.transaction(selectLocationDB,errorCB);
}

function selectAtar() {
	var choices=["below 51", "51 to 60", "61 to 70", "71 to 80", "81 to 90", "91 to 99.95"];
	var htmlid= document.getElementById("atar");
	cordova.exec(
			function(listitem) {
				htmlid.value="";
				console.log("select: " +choices[listitem]);
				htmlid.value += choices[listitem];
			}, 
			function(error) {
				alert("Error Occured");
			}, "PluginList", "radiolist", choices );
}

function selectLength() {
	var choices=["Less than 1 year", "1 year", "2 years", "3 years", "4 years", "5 years", "6 years"];
	var htmlid= document.getElementById("length");
	cordova.exec(
			function(listitem) {
				htmlid.value="";
				console.log("select: " +choices[listitem]);
				htmlid.value += choices[listitem];
			}, 
			function(error) {
				alert("Error Occured");
			}, "PluginList", "radiolist", choices );
}

function selectQualification() {
	var db=window.sqlitePlugin.openDatabase({name:"coursecamel"});
	db.transaction(selectQualificationDB,errorCB);
}

function selectEducation() {
	var db=window.sqlitePlugin.openDatabase({name:"coursecamel"});
	db.transaction(selectEducationDB,errorCB);
}

function selectPartTime() {
	var choices=["Yes","No"];
	var htmlid= document.getElementById("parttime");
	cordova.exec(
			function(listitem) {
				htmlid.value="";
				console.log("select: " +choices[listitem]);
				htmlid.value += choices[listitem];
			}, 
			function(error) {
				alert("Error Occured");
			}, "PluginList", "radiolist", choices );
}

function selectCSP() {
	var choices=["Yes","No"];
	var htmlid= document.getElementById("csp");
	cordova.exec(
			function(listitem) {
				htmlid.value="";
				console.log("select: " +choices[listitem]);
				htmlid.value += choices[listitem];
			}, 
			function(error) {
				alert("Error Occured");
			}, "PluginList", "radiolist", choices );
}

function selectInternational() {
	var choices=["Yes","No"];
	var htmlid= document.getElementById("international");
	cordova.exec(
			function(listitem) {
				htmlid.value="";
				console.log("select: " +choices[listitem]);
				htmlid.value += choices[listitem];
			}, 
			function(error) {
				alert("Error Occured");
			}, "PluginList", "radiolist", choices );
}

/*
 * -------------------------------------------------------------------------------------------------------------DB--
 * */

function selectInterestDB(tx){
	tx.executeSql('SELECT * FROM Interest', [], querySuccessSelectInterests, errorCB);
}

function selectEducationDB(tx) {
	tx.executeSql('Select * FROM Institution',[], querySuccessSelectInstitutions, errorCB);
}

function selectLocationDB(tx) {
	tx.executeSql('Select * FROM Locations',[],querySuccessSelectLocations,errorCB);
}

function selectPrerequisiteDB(tx) {
	tx.executeSql('Select * FROM Prerequisites',[],querySuccessSelectPrerequisites,errorCB);
}

function selectQualificationDB(tx) {
	tx.executeSql('Select * FROM Qualifications',[],querySuccessSelectQualifications,errorCB);
}
/*
 * --------------------------------------------------------------------------------------------------query success--
 * */

function querySuccessSelectInterests(tx,results) {
	var len = results.rows.length;
	var interestResultName=[];
	var selectedResult=[];
	var htmlid= document.getElementById("interests");
	for(var i=0; i < len;i++) {
		interestResultName.push(results.rows.item(i).InterestName);
	}
	console.log(len);
	console.log(interestResultName);

	cordova.exec(
			function(listitem) {
				htmlid.value="";
				console.log("select: " +interestResultName[listitem]);
				if (include(selectedResult,interestResultName[listitem])) {

					var index = selectedResult.indexOf(interestResultName[listitem]);
					selectedResult.splice(index,1);
				}
				else {
					selectedResult.push(interestResultName[listitem]);
				}
				console.log("get result" + selectedResult);
				htmlid.value += selectedResult ; //","
			}, 
			function(error) {
				alert("Error Occured");
			}, "PluginList", "checkboxlist", interestResultName );
}

function querySuccessSelectLocations(tx,results) {
	var len = results.rows.length;
	var locationResultName=[];
	var selectedResult=[];
	var htmlid= document.getElementById("location");

	for(var i=0; i < len;i++) {
		locationResultName.push(results.rows.item(i).Name);
	}
	console.log(len);
	console.log(locationResultName);

	cordova.exec(
			function(listitem) {
				htmlid.value="";
				console.log("select: " +locationResultName[listitem]);
				if (include(selectedResult,locationResultName[listitem])) {

					var index = selectedResult.indexOf(locationResultName[listitem]);
					selectedResult.splice(index,1);
				}
				else {
					selectedResult.push(locationResultName[listitem]);
				}
				console.log("get result" + selectedResult);
				htmlid.value += selectedResult;
			}, 
			function(error) {
				alert("Error Occured");
			}, "PluginList", "checkboxlist", locationResultName );

}

function querySuccessSelectInstitutions(tx,results) {
	var len = results.rows.length;
	var institutionResultName=[];
	var selectedResult=[];
	var htmlid= document.getElementById("education");
	for(var i=0; i < len;i++) {
		institutionResultName.push(results.rows.item(i).Name);
	}
	console.log(len);
	console.log(institutionResultName);

	cordova.exec(
			function(listitem) {
				htmlid.value="";
				console.log("select: " +institutionResultName[listitem]);
				if (include(selectedResult,institutionResultName[listitem])) {

					var index = selectedResult.indexOf(institutionResultName[listitem]);
					selectedResult.splice(index,1);
				}
				else {
					selectedResult.push(institutionResultName[listitem]);
				}
				console.log("get result" + selectedResult);
				htmlid.value += selectedResult;
			}, 
			function(error) {
				alert("Error Occured");
			}, "PluginList", "checkboxlist", institutionResultName );
}

function querySuccessSelectPrerequisites(tx,results) {
	var len = results.rows.length;
	var prerequisiteResultName=[];
	var selectedResult=[];
	var htmlid= document.getElementById("prereqs");
	for(var i=0; i < len;i++) {
		prerequisiteResultName.push(results.rows.item(i).Name);
	}
	console.log(len);
	console.log(prerequisiteResultName);

	cordova.exec(
			function(listitem) {
				htmlid.value="";
				console.log("select: " +prerequisiteResultName[listitem]);
				if (include(selectedResult,prerequisiteResultName[listitem])) {

					var index = selectedResult.indexOf(prerequisiteResultName[listitem]);
					selectedResult.splice(index,1);
				}
				else {
					selectedResult.push(prerequisiteResultName[listitem]);
				}
				console.log("get result" + selectedResult);
				htmlid.value += selectedResult;
			}, 
			function(error) {
				alert("Error Occured");
			}, "PluginList", "checkboxlist", prerequisiteResultName );
}

function querySuccessSelectQualifications(tx,results){
	var len = results.rows.length;
	var qualificationResultName=[];
	var selectedResult=[];
	var htmlid= document.getElementById("qualifications");
	for(var i=0; i < len;i++) {
		qualificationResultName.push(results.rows.item(i).Name);
	}
	console.log(len);
	console.log(qualificationResultName);

	cordova.exec(
			function(listitem) {
				htmlid.value="";
				console.log("select: " +qualificationResultName[listitem]);
				if (include(selectedResult,qualificationResultName[listitem])) {

					var index = selectedResult.indexOf(qualificationResultName[listitem]);
					selectedResult.splice(index,1);
				}
				else {
					selectedResult.push(qualificationResultName[listitem]);
				}
				console.log("get result" + selectedResult);
				htmlid.value += selectedResult;
			}, 
			function(error) {
				alert("Error Occured");
			}, "PluginList", "checkboxlist", qualificationResultName );
}

/*
 * -------------------------------------------------------------------------------------------------------function--
 * */

function include(arr,obj) {
	var arrlength = arr.length;
	while (arrlength--) {
		if (arr[arrlength] == obj) {
			return true;
		}
	}
	return false;
}

function removeDuplicates(arr) {
    var i, j, cur, found;
    for (i = arr.length - 1; i >= 0; i--) {
        cur = arr[i];
        found = false;
        for (j = i - 1; !found && j >= 0; j--) {
            if (cur === arr[j]) {
                if (i !== j) {
                    arr.splice(i, 1);
                }
                found = true;
            }
        }
    }
    return arr;
};

function getDouble(array) {
	var newArray=[];
	for(k=0;k<array.length-1;k++) {
		if (array[k + 1] == array[k]) {
			newArray.push(array[k]);
		}
	}
	return newArray;
}

function putInBufferCourse(sql){
	var db=window.sqlitePlugin.openDatabase({name:"coursecamel"});
	var clearSql = sql.slice(0,-10);
	console.log(clearSql);
	db.transaction(function(tx) {
		tx.executeSql(clearSql, [], function(tx,results) {
			var len = results.rows.length;
			var arrayCourseId= new Array;
			for(i=0;i<len;i++) {
				if(i>0) {
					var buffer = new Array;
					buffer= results.rows.item(i).CourseId.split(",");
					for(j=0;j<buffer.length;j++){
						arrayCourseId.push(buffer[j]);
					}
					arrayCourseId.sort(function(a,b){return a-b;});
					arrayCourseId= getDouble(arrayCourseId);
				}
				else if(i==0) {
					arrayCourseId= results.rows.item(i).CourseId.split(",");
				}
			}
			displayResultSelectCourse(arrayCourseId);			
		}, errorCB);
	}, errorCB);
}

function putInBufferJob(sql){
	var db=window.sqlitePlugin.openDatabase({name:"coursecamel"});
	var clearSql = sql.slice(0,-10);
	console.log(clearSql);
	db.transaction(function(tx) {
		tx.executeSql(clearSql, [], function(tx,results) {
			var len = results.rows.length;
			var arrayCourseId= new Array;
			for(i=0;i<len;i++) {
				if(i>0) {
					var buffer = new Array;
					buffer= results.rows.item(i).CourseId.split(",");
					for(j=0;j<buffer.length;j++){
						arrayCourseId.push(buffer[j]);
					}
					arrayCourseId.sort(function(a,b){return a-b;});
					arrayCourseId= getDouble(arrayCourseId);
				}
				else if(i==0) {
					arrayCourseId= results.rows.item(i).CourseId.split(",");
				}
			}
			displayResultSelectJob(arrayCourseId);			
		}, errorCB);
	}, errorCB);
}
/*
 * ----------------------------------------------------------------------------------------------------------click--
 * */

function reset(){
	var interests = document.getElementById("interests");
	interests.value="";
	var prereqs = document.getElementById("prereqs");
	prereqs.value="";
	var location = document.getElementById("location");
	location.value="";
	var atar = document.getElementById("atar");
	atar.value="";
	var csp = document.getElementById("csp");
	csp.value="";
	var length = document.getElementById("length");
	length.value="";
	var qualification = document.getElementById("qualifications");
	qualification.value="";
	var parttime = document.getElementById("parttime");
	parttime.value="";
	var education = document.getElementById("education");
	education.value="";
	var international = document.getElementById("international");
	international.value="";
	//var putInBuffer = document.getElementById("Buffer");
	//putInBuffer.value="";
}

function searchFilterJobs() {
	var db=window.sqlitePlugin.openDatabase({name:"coursecamel"});
	db.transaction(selectJobsDB,errorCB);
}

function selectJobsDB(tx) {
	var interests = document.getElementById("interests").value;
	var prereqs = document.getElementById("prereqs").value;
	var location = document.getElementById("location").value;
	var qualification = document.getElementById("qualifications").value;
	var education = document.getElementById("education").value;
	var arrayResultInterests = new Array;
	var arrayResultPrerequisites = new Array;
	var arrayResultLocations = new Array;
	var arrayResultEducations = new Array;
	var arrayResultQualifications = new Array;
	var sql="";
	var arrayInterests = interests.split(",");
	var arrayPrerequisites = prereqs.split(",");
	var arrayLocations = location.split(",");
	var arrayEducations = education.split(",");
	var arrayQualifications = qualification.split(",");
	
	if (interests != ""){
		for(l = 0; l < arrayInterests.length; l++) {
			arrayInterests[l]="\""+arrayInterests[l]+"\"";
		}
		sql += 'SELECT * FROM Interest WHERE InterestName IN ('+arrayInterests+') UNION ALL ';
		}
	if (prereqs != ""){
			for(l = 0; l < arrayPrerequisites.length; l++) {
				arrayPrerequisites[l]="\""+arrayPrerequisites[l]+"\"";
			}
			sql += 'SELECT * FROM Prerequisites WHERE Name IN ('+arrayPrerequisites+') UNION ALL ';
		}
	if (location !="" ){
			for(l = 0; l < arrayLocations.length; l++) {
				arrayLocations[l]="\""+arrayLocations[l]+"\"";
			}
			sql += 'SELECT * FROM Locations WHERE Name IN ('+arrayLocations+') UNION ALL ';
		}
	if (education != ""){
			for(l = 0; l < arrayEducations.length; l++) {
				arrayEducations[l]="\""+arrayEducations[l]+"\"";
			}
			sql += 'SELECT * FROM Institution_map_course WHERE Name IN ('+arrayEducations+') UNION ALL ';
		}
	if (qualification != ""){
			for(l = 0; l < arrayQualifications.length; l++) {
				arrayQualifications[l]="\""+arrayQualifications[l]+"\"";
			}
			sql += 'SELECT * FROM Qualifications WHERE Name IN ('+arrayQualifications+') UNION ALL ';
		}
	
	putInBufferJob(sql);
}

function searchFilterCourses() {
	var db=window.sqlitePlugin.openDatabase({name:"coursecamel"});
	db.transaction(selectCourseDB,errorCB);
}

function selectCourseDB(tx) {
	var interests = document.getElementById("interests").value;
	var prereqs = document.getElementById("prereqs").value;
	var location = document.getElementById("location").value;
	var qualification = document.getElementById("qualifications").value;
	var education = document.getElementById("education").value;
	var arrayResultInterests = new Array;
	var arrayResultPrerequisites = new Array;
	var arrayResultLocations = new Array;
	var arrayResultEducations = new Array;
	var arrayResultQualifications = new Array;
	var sql="";
	var arrayInterests = interests.split(",");
	var arrayPrerequisites = prereqs.split(",");
	var arrayLocations = location.split(",");
	var arrayEducations = education.split(",");
	var arrayQualifications = qualification.split(",");
	
	if (interests != ""){
		for(l = 0; l < arrayInterests.length; l++) {
			arrayInterests[l]="\""+arrayInterests[l]+"\"";
		}
		sql += 'SELECT * FROM Interest WHERE InterestName IN ('+arrayInterests+') UNION ALL ';
		}
	if (prereqs != ""){
			for(l = 0; l < arrayPrerequisites.length; l++) {
				arrayPrerequisites[l]="\""+arrayPrerequisites[l]+"\"";
			}
			sql += 'SELECT * FROM Prerequisites WHERE Name IN ('+arrayPrerequisites+') UNION ALL ';
		}
	if (location !="" ){
			for(l = 0; l < arrayLocations.length; l++) {
				arrayLocations[l]="\""+arrayLocations[l]+"\"";
			}
			sql += 'SELECT * FROM Locations WHERE Name IN ('+arrayLocations+') UNION ALL ';
		}
	if (education != ""){
			for(l = 0; l < arrayEducations.length; l++) {
				arrayEducations[l]="\""+arrayEducations[l]+"\"";
			}
			sql += 'SELECT * FROM Institution_map_course WHERE Name IN ('+arrayEducations+') UNION ALL ';
		}
	if (qualification != ""){
			for(l = 0; l < arrayQualifications.length; l++) {
				arrayQualifications[l]="\""+arrayQualifications[l]+"\"";
			}
			sql += 'SELECT * FROM Qualifications WHERE Name IN ('+arrayQualifications+') UNION ALL ';
		}
	
	putInBufferCourse(sql);
}

function displayResultSelectCourse(arrayCourseId){
	var db=window.sqlitePlugin.openDatabase({name:"coursecamel"});
	var atar = document.getElementById("atar").value;
	switch (atar) {
		case'below 51':
		var start=0;
		var end=50;
		break;
		case'51 to 60':
		var start=51;
		var end=60;
		break;
		case'61 to 70':
		var start=61;
		var end=70;
		break;
		case'71 to 80':
		var start=71;
		var end=80;
		break;
		case'81 to 90':
		var start=81;
		var end=90;
		break;
		case'91 to 99.95':
		var start=91;
		var end=99.95;
		break;
		case '':
		var start=0;
		var end=99.95;
		break;
	}
	var length = document.getElementById("length").value;
	switch(length) {
		case '1 year':
		var number="1";
		var unit="Year";
		break;
		case '2 years':
		var number="2";
		var unit="Years";
		break;
		case '3 years':
		var number="3";
		var unit="Years";
		break;
		case '4 years':
		var number="4";
		var unit="Years";
		break;
		case '5 years':
		var number="5";
		var unit="Years";
		break;
		case '6 years':
		var number="6";
		var unit="Years";
		break;
		case '':
		var number= "%";
		var unit= "%";
		break;
	}
	var csp = document.getElementById("csp").value;
	switch(csp) {
		case 'Yes':
		var csp = "=1";
		break;
		case 'No':
		var csp = "=0";
		break;
		case '':
		var csp = ">=0";
		break;
	}
	var parttime = document.getElementById("parttime").value;
	switch(parttime) {
		case 'Yes':
		var parttime = "=1";
		break;
		case 'No':
		var parttime = "=0";
		break;
		case '':
		var parttime = ">=0";
		break;
	}
	var international = document.getElementById("international").value;
	switch(international) {
		case 'Yes':
		var international = "=1";
		break;
		case 'No':
		var international = "=0";
		break;
		case '':
		var international = ">=0";
		break;
	}

	var displayArrayResult = new Array();
	document.getElementById("favorite-table-id").innerHTML="";
	for(i = 0; i < arrayCourseId.length; i++) {
		arrayCourseId[i]="\""+arrayCourseId[i]+"\"";
		displayArrayResult.push(arrayCourseId[i]);
		console.log("displayArrayResult pushed " +i);
	}
	if(length!= 'Less than 1 year') {
		var query = 'SELECT Course.Id, Title, Institution.Name, Length, Unit, EntryScore, Prerequisites, Favorite FROM Course INNER JOIN Institution ON Course.Institution_Id = Institution.Id WHERE Course.Id IN ('+displayArrayResult+') ';
		query += ' AND Csp'+csp+' AND InternationalPlace'+international+' AND PartTime'+parttime+' AND EntryScore BETWEEN '+start+' AND '+end+' ';
		query += ' AND Length LIKE "'+number+'" AND Unit LIKE "'+unit+'" ';
	}
	else {
		var query = 'SELECT Course.Id, Title, Institution.Name, Length, Unit, EntryScore, Prerequisites, Favorite FROM Course INNER JOIN Institution ON Course.Institution_Id = Institution.Id WHERE Course.Id IN ('+displayArrayResult+') ';
		query += ' AND Csp'+csp+' AND InternationalPlace'+international+' AND PartTime'+parttime+' AND EntryScore BETWEEN '+start+' AND '+end+' ';
		query += ' AND Length LIKE "'+number+'" AND Unit NOT LIKE "%Year%" ';
	}
	console.log(query);
	db.transaction(
			function (tx) {
				tx.executeSql(query, [], function (tx, resultSet) {
					var len = resultSet.rows.length;
					if (len > 0) {
						var newHTML = "";
						var result = document.getElementById("favorite-result-count-id");
						var contentResult= "COURSE RESULTS("+len+")";

						result.innerHTML="";
						result.innerHTML +=contentResult;
						for (var i = 0; i < len; i++) {
							var row = resultSet.rows.item(i);
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
						}
						document.getElementById("favorite-table-id").innerHTML+= newHTML;
					}
				});
			}, errorCB);
}

function displayResultSelectJob(arrayCourseId){
	var db=window.sqlitePlugin.openDatabase({name:"coursecamel"});
	var atar = document.getElementById("atar").value;
	switch (atar) {
		case'below 51':
		var start=0;
		var end=50;
		break;
		case'51 to 60':
		var start=51;
		var end=60;
		break;
		case'61 to 70':
		var start=61;
		var end=70;
		break;
		case'71 to 80':
		var start=71;
		var end=80;
		break;
		case'81 to 90':
		var start=81;
		var end=90;
		break;
		case'91 to 99.95':
		var start=91;
		var end=99.95;
		break;
		case '':
		var start=0;
		var end=99.95;
		break;
	}
	var length = document.getElementById("length").value;
	switch(length) {
		case '1 year':
		var number="1";
		var unit="Year";
		break;
		case '2 years':
		var number="2";
		var unit="Years";
		break;
		case '3 years':
		var number="3";
		var unit="Years";
		break;
		case '4 years':
		var number="4";
		var unit="Years";
		break;
		case '5 years':
		var number="5";
		var unit="Years";
		break;
		case '6 years':
		var number="6";
		var unit="Years";
		break;
		case '':
		var number= "%";
		var unit= "%";
		break;
	}
	var csp = document.getElementById("csp").value;
	switch(csp) {
		case 'Yes':
		var csp = "=1";
		break;
		case 'No':
		var csp = "=0";
		break;
		case '':
		var csp = ">=0";
		break;
	}
	var parttime = document.getElementById("parttime").value;
	switch(parttime) {
		case 'Yes':
		var parttime = "=1";
		break;
		case 'No':
		var parttime = "=0";
		break;
		case '':
		var parttime = ">=0";
		break;
	}
	var international = document.getElementById("international").value;
	switch(international) {
		case 'Yes':
		var international = "=1";
		break;
		case 'No':
		var international = "=0";
		break;
		case '':
		var international = ">=0";
		break;
	}

	var displayArrayResult = new Array();
	document.getElementById("favorite-table-id").innerHTML="";
	for(i = 0; i < arrayCourseId.length; i++) {
		arrayCourseId[i]="\""+arrayCourseId[i]+"\"";
		displayArrayResult.push(arrayCourseId[i]);
		console.log("displayArrayResult pushed " +i);
	}
	if(length!= 'Less than 1 year') {
		var query = 'SELECT DISTINCT Job.Id, Job.JobName FROM CourseJob INNER JOIN Course ON Course.Id = CourseJob.Course_Id INNER JOIN Job ON CourseJob.Job_Id = Job.Id WHERE Course.Id IN ('+displayArrayResult+') ';
		query += ' AND Course.Csp'+csp+' AND Course.InternationalPlace'+international+' AND Course.PartTime'+parttime+' AND Course.EntryScore BETWEEN '+start+' AND '+end+' ';
		query += ' AND Course.Length LIKE "'+number+'" AND Course.Unit LIKE "'+unit+'" ';
	}
	else {
		var query = 'SELECT DISTINCT Job.Id, Job.JobName FROM CourseJob INNER JOIN Course ON Course.Id = CourseJob.Course_Id INNER JOIN Job ON CourseJob.Job_Id = Job.Id WHERE Course.Id IN ('+displayArrayResult+') ';
		query += ' AND Course.Csp'+csp+' AND Course.InternationalPlace'+international+' AND Course.PartTime'+parttime+' AND Course.EntryScore BETWEEN '+start+' AND '+end+' ';
		query += ' AND Course.Length LIKE "'+number+'" AND Course.Unit NOT LIKE "%Year%" ';
	}
	db.transaction(
			function (tx) {
				tx.executeSql(query, [], function (tx, resultSet) {
					var filterResultSet = removeDuplicates(resultSet); 
					var len = filterResultSet.rows.length;
					if (len > 0) {
						var newHTML = "";
						var result = document.getElementById("favorite-result-count-id");
						var contentResult= "JOBS LIST("+len+")";

						result.innerHTML="";
						result.innerHTML +=contentResult;
						
						for (var i = 0; i < len; i++) {
							var row = filterResultSet.rows.item(i);
							newHTML += "<tr style='border-bottom: 1px solid #ddd'><td width=1% style='white-space:nowrap;font-weight:bold;font-size: 20px;' align='left' onClick='getJobDetail("+row['Id']+");' > <a href=\"#tab3\" data-toggle=\"tab\"> " +row['JobName']+"</a> </td></tr>";
						}
						document.getElementById("favorite-table-id").innerHTML+= newHTML;
					}
				});
			}, errorCB);
}