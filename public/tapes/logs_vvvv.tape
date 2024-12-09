######################
## Config

Set Padding 1
Set FontSize 15
Set Width 900
Set Height 1800
Source config.tape
Env PS1 "\n\033[1;32m\][g@ku ~]$\033[0m\] "

######################
## Actions

Type "pipelight run deploy_test"
Enter
Sleep 20s
Type "pipelight logs -vvvv"
Enter
Sleep 2s
Screenshot images/logs_vvvv.png

Output gifs/logs_vvvv.gif
