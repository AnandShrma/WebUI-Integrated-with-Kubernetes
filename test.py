#!/usr/bin/python3

print("content-type: text/html")
print()

import cgi
import subprocess



f = cgi.FieldStorage()
cmd = f.getvalue("cmd")

if "kubectl" in cmd:
   output = subprocess.getoutput("sudo " + cmd + " --kubeconfig admin.conf")
   print(output)


else:
   output = subprocess.getoutput("sudo " + cmd)
   print(output)