
var myVar = setInterval(myTimer, 200);
var counter = 0;


function myTimer() {
  console.log(window.lpTag );
  if (lpTag != undefined) {
  	console.log('inside lptag');
  	if (lpTag.taglets != undefined) {
  		console.log('inside taglets');
		if (lpTag.taglets.rendererStub != undefined) {
			console.log('inside renderer stub');
			myStopFunction();
		}
	}
  }
  counter++;
  if (counter == 100) {
  	myStopFunction();
  }
}

function myStopFunction() {
  	clearInterval(myVar);
  	setTimeout(function(){
	   	var le_engagement_id = 234392514;
  		var le_engagement_info = lpTag.taglets.rendererStub.getEngagementState( 234392514 );
  		var le_engagement_clicked = lpTag.taglets.rendererStub.click( le_engagement_id ); 
	}, 1000);
  	
}