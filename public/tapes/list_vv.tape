######################
## Config

Set Width 1200
Set Height 400
Source config.tape
Env PS1 "\n\033[1;32m\][g@ku:~]$\033[0m\] "

######################
## Actions

Type "pipelight ls -vv"
Enter
Screenshot images/list_vv.png
Sleep 5s

Output gifs/list_vv.gif
