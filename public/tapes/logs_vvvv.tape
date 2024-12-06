######################
## Config

Set FontSize 14
Set Padding 4
Set Width 1000
Set Height 1800
Source config.tape
Env PS1 "\n\033[1;32m\][g@ku:~]$\033[0m\] "

######################
## Actions

Type "pipelight logs -vvvv"
Enter
Sleep 5s
Screenshot images/logs_vvvv.png

Output gifs/logs_vvvv.gif
