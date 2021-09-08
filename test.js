// Kubernetes Command
function kubecmd() {

	//Check if the enter key is pressed
	//if (e.keyCode == 13) {

     
		document.getElementById('injected2').innerHTML = "";
		var i = document.getElementById("txtBox2").value
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "http://10.0.2.15/cgi-bin/test.py?cmd=" + i, false)
		xhr.send();
		var output = xhr.responseText;
		document.getElementById("injected2").innerHTML = output;
		     
		//Clear input text box
		document.getElementById('txtBox2').value = "";
	//}
}



// Kubernetes List
function kubelist() {
                //if (e.keyCode == 13) {
                document.getElementById('injected1').innerHTML = "";
                var i = document.getElementById("txtBox1").value
                var idd = "0"
                var final = ""
                // CREATE DEPLOYMENT
                if (((i.includes("deployments")) || (i.includes("deploy")) || (i.includes("deployment"))) && ((i.includes("create")) || (i.includes("generate")) || (i.includes("build")))) {
                var image = prompt("Enter image name: ")
                var deployment_name = prompt("Enter Deployment name: ")
                var idd = "1"
                var final = idd + " " + image + " " + deployment_name 
                
                }
                // CREATE POD
                else if (((i.includes("pods")) || (i.includes("pod"))) && ((i.includes("create")) || (i.includes("generate")) || (i.includes("build")))) {
                var image = prompt("Enter image name: ")
                var pod_name = prompt("Enter pod name: ")
                var idd = "2"
                var final = idd + " " + image + " " + pod_name
                
                }
                // DELETE POD
                else if (((i.includes("pods")) || (i.includes("pod"))) && ((i.includes("delete")) || (i.includes("remove")) || (i.includes("detach")))) {
                var pod_name = prompt("Enter pod name: ")
                var idd = "3"
                var final = idd + " " + pod_name
                
                }
                // DELETE DEPLOYMENTS
                else if (((i.includes("deployments")) || (i.includes("deploy")) || (i.includes("deployment"))) && ((i.includes("delete")) || (i.includes("remove")) || (i.includes("detach")))) {
                var deployment_name = prompt("Enter Deployment name: ")
                var idd = "4"
                var final = idd + " " + deployment_name
                
                }
                // EXPOSE DEPLOYMENT
                else if (((i.includes("deployments")) || (i.includes("deploy")) || (i.includes("deployment"))) && ((i.includes("expose"))  || (i.includes("display")))) {
                var deployment_name = prompt("Enter Deployment name: ")
                var port_no = prompt("Enter port no on which you want yo export your deployment: ")
                var expose_type = prompt(" 1. NodePort \n 2. ClusterIP \n 3.External \n Enter the type which you want to export ")
                var idd = "5"
                var final = idd + " " + deployment_name + " " + port_no + " " + expose_type
                
                }
                // SCALE DEPLOYMENT
                else if (((i.includes("deployments")) || (i.includes("deploy")) || (i.includes("deployment"))) && ((i.includes("scale")) || (i.includes("increase")) || (i.includes("decrease")) || (i.includes("scale up")) || (i.includes("scale down")))) {
                var deployment_name = prompt("Enter Deployment name: ")
                var replica = prompt("Enter no. of replicas you need : ")
                var idd = "6"
                var final = idd + " " + deployment_name + " " + replica
                
                }
                // SHOW PODS
                else if (((i.includes("pods")) || (i.includes("pod"))) && ((i.includes("show")) || (i.includes("get")) || (i.includes("list")))) {
                var idd = "7"
                var final = idd 
                
                }
                // SHOW DEPLOYMENTS
                else if (((i.includes("deployments"))|| (i.includes("deployment")) || (i.includes("deploy"))) && ((i.includes("show")) || (i.includes("get")) || (i.includes("list")))) {
                var idd = "8"
                var final = idd 
                
                }
                // SHOW SVC
                else if (((i.includes("services")) || (i.includes("services")) || (i.includes("svc"))) && ((i.includes("show")) || (i.includes("get")) || (i.includes("list")))) {
                var idd = "9"
                var final = idd 
                
                }
                // DELETE EVERYTHING IN CURRENT NAMESPACE
                else if (((i.includes("all")) || (i.includes("everything"))) && ((i.includes("delete")) || (i.includes("remove")) || (i.includes("destroy")))) {
                var idd = "10"
                var final = idd 
                
                }
                // NOT AVAILABLE
                else {
                var idd = "404"
                var final = idd 
                
                }

		var xhr = new XMLHttpRequest();
		xhr.open("GET", "http://10.0.2.15/cgi-bin/kubecmd.py?x=" + final, false)
		xhr.send();
		var output = xhr.responseText;
		document.getElementById("injected1").innerHTML = output;
		     
		//Clear input text box
		document.getElementById('txtBox1').value = "";
              
            }




// Kubernetes Voice
var pod_name;
var image_name;
var dep_name;
var rep_no;
var port_no;
var type_name;
var d_name;
var command;

function voiceFun(){

  
    (async()=>{
      speak("How can I help you");
      await sleep(100)
      runSpeechRecognition()
      await sleep(100)
      render()
     })() 
}
// Speech to Text
function runSpeechRecognition() {


      var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
      var recognition = new SpeechRecognition();
  
      // This runs when the speech recognition service starts
      recognition.onstart = function() {
          console.log("<small>listening, please speak...</small>")
          document.getElementById("txtBox3").value="Listning..."
      };
      
      recognition.onspeechend = function() {
          console.log("<small>stopped listening, hope you are done...</small>")
          recognition.stop();
      }
    
      // This runs when the speech recognition service returns result
      recognition.onresult = function(event) {
          var transcript = event.results[0][0].transcript;
          var confidence = event.results[0][0].confidence;
          console.log( "<b>Text:</b> " + transcript + "<br/> <b>Confidence:</b> " + confidence*100+"%");
          document.getElementById("txtBox3").value=transcript;
	  render();
          //exchange("kube_voice");
	  
	  
      };
    
       // start recognition
       recognition.start();
}


function speak(msg){

  const speech = new SpeechSynthesisUtterance();
  speech.text = msg;
  speech.volume = 60;
  speech.rate = 1;
  speech.pitch = 1;
  window.speechSynthesis.speak(speech);
}

const DEF_DELAY = 1000;
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms || DEF_DELAY));
}
       
function render() {
		cmd = document.getElementById("txtBox3").value;
          	url = "http://10.0.2.15/cgi-bin/kubevoice.py?cmd="+cmd;
          	console.log(url);
  		var xhr = new XMLHttpRequest();
		xhr.open("GET", url, false);
		xhr.send();
		var output = xhr.responseText;
		document.getElementById("injected3").innerHTML = output;
		     
		//Clear input text box
		//document.getElementById('txtBox3').value = "";
}
