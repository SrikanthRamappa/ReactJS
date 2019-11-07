import sys 
import json
import csv


# get the system time in python 
from datetime import datetime
#
x = datetime.now()
day = x.strftime("%A")
#
now = datetime.now()
current_time = day +'_'+ now.strftime("%H_%M_%S")
#

directorypath = "./lib/UploadedFileList/"
FileName = 'PythonGenfile_'+current_time
# reference for writing csv file: https://www.youtube.com/watch?v=s1XiCh-mGCA

with open (directorypath + FileName +'.csv', mode='w') as  csvfile:
  coloumnnames = ['Name','job','pets']
  thewriter = csv.DictWriter(csvfile, fieldnames=coloumnnames)
  
  thewriter.writeheader()
  thewriter.writerow({'Name':sys.argv[1],'job':sys.argv[2],'pets': sys.argv[3]})


# send the message back to the nodejs from python script
# refer: https://codewithhugo.com/integrate-python-ruby-php-shell-with-node-js/

send_message_back = {
     'arguments': sys.argv[1:],
      'message': """Hello,
      This is my message from Python Script and it is created the CSV file

      and you can dowload this file in the react js screen, please click FileListDownload button"""
      }

print(json.dumps(send_message_back)) 


# save the script as hello.py