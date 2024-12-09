######################
## Config

Set Padding 4
Set Width 800
Set Height 500
Source config.tape
Env PS1 "\n\033[1;32m\][g@ku ~]$\033[0m\] "

######################
## Actions

Type "pipelight run deploy_test"
Enter
Sleep 0.5s
Type "pipelight logs"
Enter
Screenshot images/logs.png
Sleep 5s

Output gifs/logs.gif
