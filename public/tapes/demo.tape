######################
## Config

Set Padding 4
Set FontSize 16
Set Width 1000
Set Height 1000

Source config.tape
Env PS1 "\n\033[1;32m\][g@ku ~]$\033[0m\] "

######################
## Actions

Type "Manually run pipelines"
Ctrl+C
Type "pipelight run"
Enter
Sleep 1s
Down
Sleep 1s
Enter
Sleep 1s

Type "Get project global health"
Ctrl+C
Type "pipelight ls -vv"
Enter
Sleep 2s

Type "Display logs"
Ctrl+C
Type "pipelight logs"
Enter
Sleep 5s

Ctrl+L
Type "Display detailed logs"
Ctrl+C
Type "pipelight logs -vvv"
Sleep 1s
Enter
Sleep 5s

Output gifs/demo.gif
