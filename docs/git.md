### 1. git commit之后发现message写错，修改办法
如果还没有push到服务器，只是本地进行了commit，并且没有进行新的commit，只需要git commit --amend;如果进行了新的commit，只需要git reset --soft xxx （xxx有问题那次提交的commit id），然后在进行git commit就行

      git reset --soft 
