#!/usr/bin/python3

print("content-type:text/plain")
print()

import cgi
import random
import subprocess as s

i = cgi.FieldStorage()

command = i.getvalue("cmd")
command = command.lower()

rand = str(random.randint(1,999))
pod_name = "pod"+rand
dep_name = "poddep"+rand
image_name = "vimal13/apache-webserver-php"

if ("pod" in command) and ("new" in command):
  image_name = command.split(" ")[-2]
  status = s.getoutput("sudo kubectl run "+pod_name+" --image="+image_name+" --kubeconfig admin.conf")
  print(status)

elif ("deployment" in command) and ("create" in command):
  image_name = command.split(" ")[-2]
  status = s.getoutput("sudo kubectl create deployment "+dep_name+" --image="+image_name+" --kubeconfig admin.conf")
  print(status)

elif "show" in command and "deployment" in command:
  status = s.getoutput("sudo kubectl get deployment --kubeconfig=admin.conf")
  print(status)

elif "show" in command and "pod" in command:
  status = s.getoutput("sudo kubectl get pods --kubeconfig=admin.conf")
  print(status)
  
else:
  print("Please try again!!!...")
© 2021 GitHub, Inc.