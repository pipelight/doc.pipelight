######################
## Config

Set Width 1200
Set Height 1200
Source config.tape
Env PS1 "\n\033[1;32m\][g@ku:~]$\033[0m\] "

######################
## Actions

Type "pipelight logs -vv"
Enter
Screenshot images/logs_vv.png
Sleep 5s

Output gifs/logs_vv.gif
