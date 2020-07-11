---
title: Git常用操作指南
tags: 
	- Git
	- Git教程
	- Git常用命令
	- Git常用操作
date: 2019-7-21 15:17:08
permalink: Git-tutorial
categories: Git
---

## 前言
因为工作需求，最近又重新温习了一下Git操作，遂总结了一篇Git常用操作指南，方便日后学习查阅，本博客精简提炼了在开发过程中Git经常用到的核心命令，主要参考了《[廖雪峰老师的Git教程](https://www.liaoxuefeng.com/wiki/896043488029600)》，希望对大家学习使用Git能带来帮助。

## Git简介

Git是Linux之父Linus的第二个伟大的作品，它最早是在Linux上开发的，被用来管理Linux核心的源代码。后来慢慢地有人将其移植到了Unix、Windows、Max OS等操作系统中。

Git是一个分布式的版本控制系统，与集中式的版本控制系统不同的是，每个人都工作在通过克隆建立的本地版本库中。也就是说每个人都拥有一个完整的版本库，查看提交日志、提交、创建里程碑和分支、合并分支、回退等所有操作都直接在本地完成而不需要网络连接。

对于Git仓库来说，每个人都有一个独立完整的仓库，所谓的远程仓库或是服务器仓库其实也是一个仓库，只不过这台主机24小时运行，它是一个稳定的仓库，供他人克隆、推送，也从服务器仓库中拉取别人的提交。

Git是目前世界上最先进的分布式版本控制系统。

## 安装之后第一步
安装完成后，还需要最后一步设置，在命令行输入：

```powershell
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"
```


因为Git是分布式版本控制系统，所以，每个机器都必须配置用户信息：你的名字和Email地址。

注意`git config`命令的`--global`参数，用了这个参数，表示你这台机器上所有的Git仓库都会使用这个配置，当然也可以对某个仓库指定不同的用户名和Email地址。

## 创建版本库

### 本地仓库

版本库又名仓库，英文名**repository**，你可以简单理解成一个目录，这个目录里面的所有文件都可以被Git管理起来，每个文件的修改、删除，Git都能跟踪，以便任何时刻都可以追踪历史，或者在将来某个时刻可以“还原”。

所以，创建一个版本库非常简单，首先，选择一个合适的地方，创建一个空目录：

```powershell
$ mkdir learngit
$ cd learngit
$ pwd
Path
----
D:\Blog\tmp\learngit
```

第二步，通过`git init`命令把这个目录变成Git可以管理的仓库：

```powershell
$ git init
Initialized empty Git repository in D:/Blog/tmp/learngit/.git/
```

### 远程仓库

#### 创建SSH Key

Git支持多种协议，包括`https`，但通过`ssh`支持的原生`git`协议速度最快。由于本地Git仓库和GitHub仓库之间的传输是通过SSH加密的，所以，需要在关联远程仓库前需要配置`SSH Key`至Github设置中，这样远程仓库才允许本机对远程仓库的拉去/推送操作。

打开`Shell`，进入到"`~/.ssh`"目录下，运行"`ls`"命令看看这个目录下有没有`id_rsa`和`id_rsa.pub`这两个文件，如果已经有了，可直接跳到下一步。

如果没有，则执行：

```powershell
$ ssh-keygen -t rsa -C "youremail@example.com"
```

一路回车即可。执行命令后，我们再进入到"`~/.ssh`"目录下，运行"`ls`"命令，可以看到里面有`id_rsa`和`id_rsa.pub`两个文件，这两个就是SSH Key的秘钥对，`id_rsa`是私钥，不能泄露出去，`id_rsa.pub`是公钥，可以放心地告诉任何人。

![](http://pic.guoyaohua.com/image/git/1563105584864.png)

打开“Account settings”，“SSH Keys”页面，然后，点“New SSH Key”，填上任意Title，在Key文本框里粘贴`id_rsa.pub`文件的内容（Win 10 下可使用"`type ~/.ssh/id_rsa.pub`"命令查看公钥文件内容）：

![](http://pic.guoyaohua.com/image/git/1563105973152.png)

点击“Add SSH Key”之后，就可以看到你的公钥已经加入到了你的Github仓库配置中。

![](http://pic.guoyaohua.com/image/git/1563106045201.png)

#### 添加远程库

首先，登陆GitHub，然后，在右上角找到“Create a new repo”按钮，创建一个新的仓库：

![](http://pic.guoyaohua.com/image/git/1563103995786.png)

在Repository name填入`learngit`，其他保持默认设置，点击“Create repository”按钮，就成功地创建了一个新的Git仓库：

![](http://pic.guoyaohua.com/image/git/1563104100618.png)

这样就成功创建了一个空白的远程仓库，那么如何将这个远程仓库与本地仓库进行关联呢？

我们根据Git所给出的提示可知，可以在本地创建一个新仓库对远程仓库进行关联，也可以对本地已有仓库进行关联。

##### 关联新仓库

```powershell
echo "# learngit" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin git@github.com:guoyaohua/learngit.git
git push -u origin master
```

##### 关联已有仓库

```powershell
git remote add origin git@github.com:guoyaohua/learngit.git
git push -u origin master
```

我们可以使用上文在本地初始化的“learngit”仓库。**（注意：本地仓库和远程仓库可以不同名，本文只是为了写教程设置为相同名称。）**

![](http://pic.guoyaohua.com/image/git/1563104810075.png)

我们再刷新下`Github Code`界面，发现新加入的`README.md`文件已经推送到了远程仓库中。

![](http://pic.guoyaohua.com/image/git/1563106284174.png)

## 版本控制

### 工作区和暂存区

#### 工作区（Working Directory）

就是你在电脑里能看到的目录，比如我们刚刚创建的`learngit`文件夹就是一个工作区：

![](http://pic.guoyaohua.com/image/git/1563106681604.png)

#### 版本库（Repository）

工作区有一个隐藏目录`.git`，这个不算工作区，而是Git的版本库。

Git的版本库里存了很多东西，其中最重要的就是称为**Stage**（或者叫**Index**）的**暂存区**，还有Git为我们自动创建的第一个分支`master`，以及指向`master`的一个指针叫`HEAD`。

![Repository](http://pic.guoyaohua.com/image/git/Repository.jpg)

分支和`HEAD`的概念本文后面再详细说明。

我们把文件往Git版本库里添加的时候，是分两步执行的：

第一步是用`git add`把文件添加进去，实际上就是把文件修改添加到**暂存区**；

第二步是用`git commit`提交更改，实际上就是把暂存区的所有内容提交到当前分支。

因为我们创建Git版本库时，Git自动为我们创建了唯一一个`master`分支，所以现在，`git commit`就是往`master`分支上提交更改。

你可以简单理解为，需要提交的文件修改通通放到暂存区，然后，一次性提交暂存区的所有修改。

使用`git status`命令可以查看当前仓库的状态。

### 版本回退

Git版本控制可以理解为，我们再编写代码的过程中，会对code进行多次修改，每当你觉得文件修改到一定程度的时候，就可以“保存一个快照”，这个快照在Git中被称为`commit`。一旦你把文件改乱了，或者误删了文件，还可以从最近的一个`commit`恢复，然后继续工作，而不是把几个月的工作成果全部丢失。

在实际工作中，我们用`git log`命令查看我们提交的历史记录：

```powershell
$ git log
commit 1094adb7b9b3807259d8cb349e7df1d4d6477073 (HEAD -> master)
Author: Yaohua Guo <guo.yaohua@foxmail.com>
Date:   Fri May 18 21:06:15 2018 +0800

    append GPL

commit e475afc93c209a690c39c13a46716e8fa000c366
Author: Yaohua Guo <guo.yaohua@foxmail.com>
Date:   Fri May 18 21:03:36 2018 +0800

    add distributed

commit eaadf4e385e865d25c48e7ca9c8395c3f7dfaef0
Author: Yaohua Guo <guo.yaohua@foxmail.com>
Date:   Fri May 18 20:59:18 2018 +0800

    wrote a readme file
```

Git中，commit id是一个使用SHA1计算出来的一个非常大的数字，用十六进制表示，commit后面的那一串十六进制数字就是每一次提交的版本号，我们可以通过`git log`命令看到每次提交的版本号、用户名、日期以及版本描述等信息。

我们可以使用`git reset`命令进行版本回退操作。

```powershell
$ git reset --hard HEAD^
```

在Git中，用HEAD表示当前版本，上一个版本就是HEAD^ ，上上一个版本就是HEAD^^ ，以此类推，如果需要回退几十个版本，写几十个^容易数不过来，所以可以写，例如回退30个版本为：HEAD~30。

如果回退完版本又后悔了，想恢复，也是可以的，使用如下即可：

```powershell
$ git reset --hard commit_id 
```

不过当我们执行`git reset`进行版本回退之后，之前最新的版本号无法通过`git log`查询到，此时需要使用`git reflog`命令查询Git的操作记录，我们可以从该记录中找到之前的commit id信息。

```powershell
$ git reflog
e475afc HEAD@{1}: reset: moving to HEAD^
1094adb (HEAD -> master) HEAD@{2}: commit: append GPL
e475afc HEAD@{3}: commit: add distributed
eaadf4e HEAD@{4}: commit (initial): wrote a readme file
```

在Git中，版本回退速度非常快，因为Git在内部有个指向当前版本的HEAD指针，当你回退版本的时候，Git仅仅是把HEAD从指向回退的版本，然后顺便刷新工作区文件。

#### 重置命令

重置命令的作用是将当前的分支重设（reset）到指定的`<commit>`或者`HEAD`（默认是HEAD，即最新的一次提交），并且根据[mode]有可能更新Index和Working directory（默认是mixed）。

```powershell
$ git reset [--hard|soft|mixed|merge|keep] [commit|HEAD]
```

1. –hard：**重设“暂存区”和“工作区”**，从`<commit>`以来在工作区中的任何改变都被丢弃，并把HEAD指向`<commit>`。**（彻底回退到某个版本，本地的源码也会变为上一个版本的内容。）**
2. –soft：**“工作区”中的内容不作任何改变，HEAD指向`<commit>`，自从`<commit>`以来的所有改变都会回退到“暂存区”中，显示在`git status`的*“Changes to be committed”*中。（回退到某个版本，只回退了commit的信息。如果还要提交，直接commit即可。）** 
3. –mixed：**仅重设“暂存区”，并把HEAD指向`<commit>`，但是不重设“工作区”，本地文件修改不受影响。**这个模式是默认模式，即当不显示告知`git reset`模式时，会使用mixed模式。这个模式的效果是，工作区中文件的修改都会被保留，不会丢弃，但是也不会被标记成“*Changes to be committed*”，但是会提示文件未被更新。**（回退到某个版本，只保留源码，回退commit和index信息）** 

##### 文件粒度操作

需要注意的是在`mixed`模式下进行`reset`操作时可以是全局性重置，也可以是文件粒度重置，区别在于二者作用域不同，文件粒度只会使对应文件的暂存区状态变为指定commit时该文件的暂存区状态，并且不会改变版本库状态，即HEAD指针不会改变，我们看一下效果。

首先我们新建两个文件进行两次提交，可以看到目前HEAD指向最新一次提交“text2”。

![](http://pic.guoyaohua.com/image/git/1563611168654.png)

我们对“file1.txt”进行reset操作，令其重置为“text1”状态。

![](http://pic.guoyaohua.com/image/git/1563611993505.png)

并且我们通过git log命令可发现，此时HEAD指针并没有改变，还是指向最新一次提交“Text 2”，可知文件粒度的`reset --mixed`不改变版本库HEAD指针状态。

![](http://pic.guoyaohua.com/image/git/1563612094551.png)

对于soft和hard模式则无法进行文件粒度操作。

![](http://pic.guoyaohua.com/image/git/1563609363728.png)

#### Reset 常用示例

- 回退add操作

```powershell
$ git add test
$ git reset HEAD test  
# HEAD指的是当前指向的版本号，可以将HEAD还成任意想回退的版本号
```
可以将test从“已暂存”状态（Index区）回滚到指定Commit时暂存区的状态。

- 回退最后一次提交

```powershell
$ git add test
$ git commit -m "Add test"
$ git reset --soft HEAD^
```
可以将test从“已提交”状态变为“已暂存”状态。 

- 回退最近几次提交，并把这几次提交放到新分支上

```powershell
$ git branch topic # 已当前分支为基础，新建分支topic
$ git reset --hard HEAD~2 # 在当前分支上回滚提交
$ git checkout topic
```
通过临时分支来保留提交，然后在当前分支上做硬回滚。 

- 将本地的状态回退到和远程一样

```powershell
$ git reset --hard origin/devlop
```

- 回退到某个版本提交

```powershell
$ git reset 497e350
```
当前HEAD会指向“497e350”，暂存区中的状态会恢复到提交“497e350”时暂存区的状态。 

### 撤销修改

当我们因为一些原因想要丢弃工作区某些文件修改时，可以使用“`git checkout -- <file>`”命令，该命令仅会恢复工作区文件状态，不会对版本库有任何改动。

![](http://pic.guoyaohua.com/image/git/1563613938574.png)

命令`git checkout -- file1.txt`意思就是，把`file1.txt`文件在工作区的修改全部撤销，这里有两种情况：

- 一种是`file1.txt`自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；
- 一种是`file1.txt`已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。

总之，就是让这个文件回到最近一次`git commit`或`git add`时的状态。

### 删除文件

在Git中，删除也是一个修改操作，我们实战一下，先添加一个新文件`test.txt`到Git并且提交：

一般情况下，你通常直接在文件管理器中把没用的文件删了，或者用`rm`命令删了：

```powershell
$ rm test.txt
```

这个时候，Git知道你删除了文件，因此，工作区和版本库就不一致了，`git status`命令会立刻告诉你哪些文件被删除了：

```powershell
$ git status
On branch master
Changes not staged for commit:
  (use "git add/rm <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	deleted:    test.txt

no changes added to commit (use "git add" and/or "git commit -a")
```

现在你有两个选择，一是确实要从版本库中删除该文件，那就用命令`git rm`删掉，并且`git commit`：

```powershell
$ git rm test.txt
rm 'test.txt'

$ git commit -m "remove test.txt"
[master d46f35e] remove test.txt
 1 file changed, 1 deletion(-)
 delete mode 100644 test.txt
```

现在，文件就从版本库中被删除了。

> 提示：先手动删除文件，然后使用`git rm <file>`和`git add <file>`效果是一样的。

另一种情况是删错了，因为版本库里还有呢，所以可以很轻松地把误删的文件恢复到最新版本：

```powershell
$ git checkout -- test.txt
```

`git checkout`其实是用版本库里的版本替换工作区的版本，无论工作区是修改还是删除，都可以“一键还原”。

> 注意：从来没有被添加到版本库就被删除的文件，是无法恢复的！
>

## 分支管理

### 创建与合并分支

在上文“版本回退”里，我们已经知道，每次提交，Git都把它们串成一条时间线，这条时间线就是一个分支。截止到目前，只有一条时间线，在Git里，这个分支叫主分支，即`master`分支。`HEAD`严格来说不是指向提交，而是指向`master`，`master`才是指向提交的，所以，`HEAD`指向的就是当前分支。

一开始的时候，`master`分支是一条线，Git用`master`指向最新的提交，再用`HEAD`指向`master`，就能确定当前分支，以及当前分支的提交点：

![](http://pic.guoyaohua.com/image/git/0.png)

每次提交，`master`分支都会向前移动一步，这样，随着你不断提交，`master`分支的线也越来越长。

当我们创建新的分支，例如`dev`时，Git新建了一个指针叫`dev`，指向`master`相同的提交，再把`HEAD`指向`dev`，就表示当前分支在`dev`上：

![](http://pic.guoyaohua.com/image/git/1.png)

Git创建一个分支很快，因为除了增加一个`dev`指针，改改`HEAD`的指向，工作区的文件都没有任何变化。

不过，从现在开始，对工作区的修改和提交就是针对`dev`分支了，比如新提交一次后，`dev`指针往前移动一步，而`master`指针不变：

![](http://pic.guoyaohua.com/image/git/2.png)

假如我们在`dev`上的工作完成了，就可以把`dev`合并到`master`上。Git怎么合并呢？最简单的方法，就是直接把`master`指向`dev`的当前提交，就完成了合并：

![](http://pic.guoyaohua.com/image/git/3.png)

所以Git合并分支也很快！就改改指针，工作区内容也不变！

合并完分支后，甚至可以删除`dev`分支。删除`dev`分支就是把`dev`指针给删掉，删掉后，我们就剩下了一条`master`分支：

![](http://pic.guoyaohua.com/image/git/4.png)

下面开始实战。

首先，我们创建`dev`分支，然后切换到`dev`分支：

``` powershell
$ git checkout -b dev
Switched to a new branch 'dev'
```

`git checkout`命令加上`-b`参数表示创建并切换，相当于以下两条命令：

```powershell
$ git branch dev # 创建dev分支
$ git checkout dev # 切换到dev分支
Switched to branch 'dev'
```

然后，用`git branch`命令查看当前分支：

```powershell
$ git branch
* dev
  master
```

`git branch`命令会列出所有分支，当前分支前面会标一个`*`号。

然后，我们就可以在`dev`分支上正常提交，比如对`readme.txt`做个修改，加上一行：

```powershell
Creating a new branch is quick.
```

然后提交：

```powershell
$ git add readme.txt 
$ git commit -m "branch test"
[dev b17d20e] branch test
 1 file changed, 1 insertion(+)
```

现在，`dev`分支的工作完成，我们就可以切换回`master`分支：

```powershell
$ git checkout master
Switched to branch 'master'
```

切换回`master`分支后，再查看一个`readme.txt`文件，刚才添加的内容不见了！因为那个提交是在`dev`分支上，而`master`分支此刻的提交点并没有变：

![](http://pic.guoyaohua.com/image/git/5.png)

现在，我们把`dev`分支的工作成果合并到`master`分支上：

```powershell
$ git merge dev
Updating d46f35e..b17d20e
Fast-forward
 readme.txt | 1 +
 1 file changed, 1 insertion(+)
```

`git merge`命令用于合并指定分支到当前分支。合并后，再查看`readme.txt`的内容，就可以看到，和`dev`分支的最新提交是完全一样的。

注意到上面的`Fast-forward`信息，Git告诉我们，这次合并是“快进模式”，也就是直接把`master`指向`dev`的当前提交，所以合并速度非常快。

当然，也不是每次合并都能`Fast-forward`，我们后面会讲其他方式的合并。

合并完成后，就可以放心地删除`dev`分支了：

```powershell
$ git branch -d dev
Deleted branch dev (was b17d20e).
```

删除后，查看`branch`，就只剩下`master`分支了：

```powershell
$ git branch
* master
```

因为创建、合并和删除分支非常快，所以Git鼓励你使用分支完成某个任务，合并后再删掉分支，这和直接在`master`分支上工作效果是一样的，但过程更安全。

### 解决冲突

在真正开发过程中，合并分支经常会遇到分支冲突的情况，无法直接合并，我们来模拟一下这个场景。

准备新的`feature1`分支，继续我们的新分支开发：

```powershell
$ git checkout -b feature1
Switched to a new branch 'feature1'
```

修改`readme.txt`最后一行，改为：

```powershell
Creating a new branch is quick AND simple.
```

在`feature1`分支上提交：

```powershell
$ git add readme.txt

$ git commit -m "AND simple"
[feature1 14096d0] AND simple
 1 file changed, 1 insertion(+), 1 deletion(-)
```

切换到`master`分支：

```powershell
$ git checkout master
Switched to branch 'master'
Your branch is ahead of 'origin/master' by 1 commit.
  (use "git push" to publish your local commits)
```

Git还会自动提示我们当前`master`分支比远程的`master`分支要超前1个提交。

在`master`分支上把`readme.txt`文件的最后一行改为：

```powershell
Creating a new branch is quick & simple.
```

提交：

```powershell
$ git add readme.txt 
$ git commit -m "& simple"
[master 5dc6824] & simple
 1 file changed, 1 insertion(+), 1 deletion(-)
```

现在，`master`分支和`feature1`分支各自都分别有新的提交，变成了这样：

![](http://pic.guoyaohua.com/image/git/6.png)

这种情况下，Git无法执行“快速合并(Fast-forward)”，只能试图把各自的修改合并起来，但这种合并就可能会有冲突，我们试试看：

```powershell
$ git merge feature1
Auto-merging readme.txt
CONFLICT (content): Merge conflict in readme.txt
Automatic merge failed; fix conflicts and then commit the result.
```

Git告诉我们，`readme.txt`文件存在冲突，必须手动解决冲突后再提交。`git status`也可以告诉我们冲突的文件：

```powershell
$ git status
On branch master
Your branch is ahead of 'origin/master' by 2 commits.
  (use "git push" to publish your local commits)

You have unmerged paths.
  (fix conflicts and run "git commit")
  (use "git merge --abort" to abort the merge)

Unmerged paths:
  (use "git add <file>..." to mark resolution)

	both modified:   readme.txt

no changes added to commit (use "git add" and/or "git commit -a")
```

我们可以直接查看readme.txt的内容：

```powershell
Git is a distributed version control system.
Git is free software distributed under the GPL.
Git has a mutable index called stage.
Git tracks changes of files.
<<<<<<< HEAD
Creating a new branch is quick & simple.
=======
Creating a new branch is quick AND simple.
>>>>>>> feature1
```

Git用`<<<<<<<`，`=======`，`>>>>>>>`标记出不同分支的内容，我们修改如下后保存：

```powershell
Creating a new branch is quick and simple.
```

再提交：

```powershell
$ git add readme.txt 
$ git commit -m "conflict fixed"
[master cf810e4] conflict fixed
```

现在，`master`分支和`feature1`分支变成了下图所示：

![](http://pic.guoyaohua.com/image/git/7.png)

用带参数的`git log`也可以看到分支的合并情况：

```powershell
$ git log --graph --pretty=oneline --abbrev-commit
*   cf810e4 (HEAD -> master) conflict fixed
|\  
| * 14096d0 (feature1) AND simple
* | 5dc6824 & simple
|/  
* b17d20e branch test
* d46f35e (origin/master) remove test.txt
* b84166e add test.txt
* 519219b git tracks changes
* e43a48b understand how stage works
* 1094adb append GPL
* e475afc add distributed
* eaadf4e wrote a readme file
```

最后，删除`feature1`分支：

```powershell
$ git branch -d feature1
Deleted branch feature1 (was 14096d0).
```

工作完成。

### 分支管理策略

通常，合并分支时，如果可能，Git会用`Fast forward`模式，但这种模式下，删除分支后，会丢掉分支信息。

如果要强制禁用`Fast forward`模式，Git就会在merge时生成一个新的commit，这样，从分支历史上就可以看出分支信息。

下面我们实战一下`--no-ff`方式的`git merge`：

首先，仍然创建并切换`dev`分支：

```powershell
$ git checkout -b dev
Switched to a new branch 'dev'
```

修改readme.txt文件，并提交一个新的commit：

```powershell
$ git add readme.txt 
$ git commit -m "add merge"
[dev f52c633] add merge
 1 file changed, 1 insertion(+)
```

现在，我们切换回`master`：

```powershell
$ git checkout master
Switched to branch 'master'
```

准备合并`dev`分支，请注意`--no-ff`参数，表示禁用`Fast forward`：

```powershell
$ git merge --no-ff -m "merge with no-ff" dev
Merge made by the 'recursive' strategy.
 readme.txt | 1 +
 1 file changed, 1 insertion(+)
```

因为本次合并要创建一个新的commit，所以加上`-m`参数，把commit描述写进去。

合并后，我们用`git log`看看分支历史：

```powershell
$ git log --graph --pretty=oneline --abbrev-commit
*   e1e9c68 (HEAD -> master) merge with no-ff
|\  
| * f52c633 (dev) add merge
|/  
*   cf810e4 conflict fixed
...
```

可以看到，不使用`Fast forward`模式，merge后就像这样：

![](http://pic.guoyaohua.com/image/git/8.png)

#### 分支策略

在实际开发中，我们应该按照几个基本原则进行分支管理：

首先，`master`分支应该是非常稳定的，也就是仅用来发布新版本，平时不能在上面干活；

那在哪干活呢？干活都在`dev`分支上，也就是说，`dev`分支是不稳定的，到某个时候，比如1.0版本发布时，再把`dev`分支合并到`master`上，在`master`分支发布1.0版本；

你和团队同事每个人都在`dev`分支上干活，每个人都有自己的分支，时不时地往`dev`分支上合并就可以了。

所以，团队合作的分支看起来就像这样：

![](http://pic.guoyaohua.com/image/git/9.png)

### 状态存储

当我们在开发过程中，经常遇到这样的情况，我们需要暂时放下手中的工作，切换到其他分支进行开发，例如当我们在dev分支进行程序2.0版本开发时，发现1.0版本的程序出现了bug，必须立刻进行修复，但是在目前的dev分支我们可能已经做了很多修改，暂存区可能有了暂存状态，甚至可能在开发过程中在dev分支进行了多次commit，这时如果我们想切换回master分支，进行bug修复，这时就需要使用到`git stash`命令存储原分支当前的状态。

在讲解`git stash`之前，我们先考虑两种场景：

第一种就是我们未在dev分支进行任何提交，此时HEAD指针指向dev，dev和master指向同一次commit，如下图：

![](http://pic.guoyaohua.com/image/git/1563631355797.png)

我们可能在dev的工作区做了很多修改，也将部分修改状态加入了暂存区（即进行了`git add`操作），这时我们尝试一下直接使用`git checkout`命令切换分支。

此时，Git状态如下：

![](http://pic.guoyaohua.com/image/git/1563631585919.png)

我们修改“file1.txt”和“file2.txt”的内容，并将“file1.txt”的改动加入暂存区。

![](http://pic.guoyaohua.com/image/git/1563631787056.png)

此时可看出工作区和暂存区就都有改变，但HEAD指针指向的dev与master为同一个commit节点。

这时我们执行`git checkout master`命令尝试切换分支。

![](http://pic.guoyaohua.com/image/git/1563631937563.png)

可以看出，成功切换到了master分支上，而且工作区和暂存区的状态依旧保留。

我们再考虑一个场景，在dev分支开发时，进行了一次提交，此时HEAD指向dev分支，dev分支超前master分支一次commit，具体见下图：

![](http://pic.guoyaohua.com/image/git/1563632158366.png)

如果此时我们工作区或暂存区有未提交更改时，就无法进行分支切换操作（如果没有未提交修改的话当然可以进行分支切换操作）。 

![](http://pic.guoyaohua.com/image/git/1563632645976.png)

我想这时大家就会有一个疑问，为什么两种状态下我们都修改了暂存区和工作区的状态，但是一个可以切换分支并且保留工作区、暂存区状态，而另一种状态就无法切换分支呢？

我起初在遇到这个问题的时候也是很诧异，在网上搜索了好多资料，依旧没有查到有价值的信息。

这时我们就应该从Git的原理来进行分析了，**Git在进行版本控制时，记录的并不是文件本身的信息，而是文件的修改状态**，例如我们再一个10000行代码的文件中，新加入了一行代码进行，Git并不是将最新的10001行代码作为备份，而是仅仅记录了新旧文件之间的差异，即在哪个位置修改了什么内容（修改包括：增加、删除、修改等）。

我们来分析一下上问题到的第一种场景：我们未在dev分支进行任何提交，此时HEAD指针指向dev，dev和master指向同一次commit。

虽然我们再dev分支的工作区和暂存区做了修改，这些修改都是基于dev指向的commit而言的，而且此时dev和master指向同一个commit，所以，该场景下，dev分支工作区和暂存区的修改依旧适用于master分支，所以可以成功切换分支。

而第二种场景：在dev分支开发时，进行了一次提交，此时HEAD指向dev分支，dev分支超前master分支一次commit。

这时，dev工作区和暂存区的状态是基于最新的dev指向的commit而言的，已经不能应用于master指向的commit了，所以在进行切换分支时，提示报错。

#### 应用实例

软件开发中，bug就像家常便饭一样。有了bug就需要修复，在Git中，由于分支是如此的强大，所以，每个bug都可以通过一个新的临时分支来修复，修复后，合并分支，然后将临时分支删除。

当你接到一个修复一个代号101的bug的任务时，很自然地，你想创建一个分支`issue-101`来修复它，但是，当前正在`dev`上进行的工作还没有提交：

```powershell
$ git status
On branch dev
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	new file:   hello.py

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   readme.txt
```

并不是你不想提交，而是工作只进行到一半，还没法提交，预计完成还需1天时间。但是，必须在两个小时内修复该bug，怎么办？

幸好，Git还提供了一个`stash`功能，可以把当前工作现场“储藏”起来，等以后恢复现场后继续工作：

```powershell
$ git stash
Saved working directory and index state WIP on dev: f52c633 add merge
```

现在，用`git status`查看工作区，就是干净的（除非有没有被Git管理的文件），因此可以放心地创建分支来修复bug。

首先确定要在哪个分支上修复bug，假定需要在`master`分支上修复，就从`master`创建临时分支：

```powershell
$ git checkout master
Switched to branch 'master'
Your branch is ahead of 'origin/master' by 6 commits.
  (use "git push" to publish your local commits)

$ git checkout -b issue-101
Switched to a new branch 'issue-101'
```

现在修复bug，需要把“Git is free software ...”改为“Git is a free software ...”，然后提交：

```powershell
$ git add readme.txt 
$ git commit -m "fix bug 101"
[issue-101 4c805e2] fix bug 101
 1 file changed, 1 insertion(+), 1 deletion(-)
```

修复完成后，切换到`master`分支，并完成合并，最后删除`issue-101`分支：

```powershell
$ git checkout master
Switched to branch 'master'
Your branch is ahead of 'origin/master' by 6 commits.
  (use "git push" to publish your local commits)

$ git merge --no-ff -m "merged bug fix 101" issue-101
Merge made by the 'recursive' strategy.
 readme.txt | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
```

修复好BUG之后，就可以返回原分支继续之前的工作了。

```powershell
$ git checkout dev
Switched to branch 'dev'

$ git status
On branch dev
nothing to commit, working tree clean
```

工作区是干净的，刚才的工作现场存到哪去了？用`git stash list`命令看看：

```powershell
$ git stash list
stash@{0}: WIP on dev: f52c633 add merge
```

工作现场还在，Git把stash内容存在某个地方了，但是需要恢复一下，有两个办法：

一是用`git stash apply`恢复，但是恢复后，stash内容并不删除，你需要用`git stash drop`来删除；

另一种方式是用`git stash pop`，恢复的同时把stash内容也删了：

```powershell
$ git stash pop
On branch dev
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	new file:   hello.py

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   readme.txt

Dropped refs/stash@{0} (5d677e2ee266f39ea296182fb2354265b91b3b2a)
```

再用`git stash list`查看，就看不到任何stash内容了：

```powershell
$ git stash list
```

你可以多次stash，恢复的时候，先用`git stash list`查看，然后恢复指定的stash，用命令：

```powershell
$ git stash apply stash@{0}
```

### 多人协作

当你从远程仓库克隆时，实际上Git自动把本地的`master`分支和远程的`master`分支对应起来了，并且，远程仓库的默认名称是`origin`。

用`git remote -v`查看远程库的详细信息：

```powershell
$ git remote -v
origin  git@github.com:guoyaohua/learngit.git (fetch)
origin  git@github.com:guoyaohua/learngit.git (push)
```

上面显示了可以抓取和推送的`origin`的地址。如果没有推送权限，就看不到push的地址。

#### 推送分支

推送分支，就是把该分支上的所有本地提交推送到远程库。推送时，要指定本地分支，这样，Git就会把该分支推送到远程库对应的远程分支上：

```powershell
$ git push origin master
```

如果要推送其他分支，比如`dev`，就改成：

```powershell
$ git push origin dev
```

但是，并不是一定要把本地分支往远程推送，那么，哪些分支需要推送，哪些不需要呢？

- `master`分支是主分支，因此要时刻与远程同步；
- `dev`分支是开发分支，团队所有成员都需要在上面工作，所以也需要与远程同步；
- bug分支只用于在本地修复bug，就没必要推到远程了，除非老板要看看你每周到底修复了几个bug；
- feature分支是否推到远程，取决于你是否和你的小伙伴合作在上面开发。

总之，就是在Git中，分支完全可以在本地自己藏着玩，是否推送，视你的心情而定！

#### 抓取分支

多人协作时，大家都会往`master`和`dev`分支上推送各自的修改。

现在，模拟一个你的同事，可以在另一台电脑（注意要把SSH Key添加到GitHub）或者同一台电脑的另一个目录下克隆：

```powershell
$ git clone git@github.com:guoyaohua/learngit.git
Cloning into 'learngit'...
remote: Counting objects: 40, done.
remote: Compressing objects: 100% (21/21), done.
remote: Total 40 (delta 14), reused 40 (delta 14), pack-reused 0
Receiving objects: 100% (40/40), done.
Resolving deltas: 100% (14/14), done.
```

当你的同事从远程库clone时，默认情况下，你的同事只能看到本地的`master`分支。不信可以用`git branch`命令看看：

```powershell
$ git branch
* master
```

现在，你的同事要在`dev`分支上开发，就必须创建远程`origin`的`dev`分支到本地，于是他用这个命令创建本地`dev`分支：

```powershell
$ git checkout -b dev origin/dev
```

现在，他就可以在`dev`上继续修改，然后，时不时地把`dev`分支`push`到远程：

```powershell
$ git add env.txt

$ git commit -m "add env"
[dev 7a5e5dd] add env
 1 file changed, 1 insertion(+)
 create mode 100644 env.txt

$ git push origin dev
Counting objects: 3, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (2/2), done.
Writing objects: 100% (3/3), 308 bytes | 308.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0)
To github.com:michaelliao/learngit.git
   f52c633..7a5e5dd  dev -> dev
```

你的同事已经向`origin/dev`分支推送了他的提交，而碰巧你也对同样的文件作了修改，并试图推送：

```powershell
$ type env.txt
env

$ git add env.txt

$ git commit -m "add new env"
[dev 7bd91f1] add new env
 1 file changed, 1 insertion(+)
 create mode 100644 env.txt

$ git push origin dev
To github.com:michaelliao/learngit.git
 ! [rejected]        dev -> dev (non-fast-forward)
error: failed to push some refs to 'git@github.com:guoyaohua/learngit.git'
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Integrate the remote changes (e.g.
hint: 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```

推送失败，因为你的同事的最新提交和你试图推送的提交有冲突，解决办法也很简单，Git已经提示我们，先用`git pull`把最新的提交从`origin/dev`抓下来，然后，在本地合并，解决冲突，再推送：

```powershell
$ git pull
There is no tracking information for the current branch.
Please specify which branch you want to merge with.
See git-pull(1) for details.

    git pull <remote> <branch>

If you wish to set tracking information for this branch you can do so with:

    git branch --set-upstream-to=origin/<branch> dev
```

`git pull`也失败了，原因是没有指定本地`dev`分支与远程`origin/dev`分支的链接，根据提示，设置`dev`和`origin/dev`的链接：

```powershell
$ git branch --set-upstream-to=origin/dev dev
Branch 'dev' set up to track remote branch 'dev' from 'origin'.
```

再pull：

```powershell
$ git pull
Auto-merging env.txt
CONFLICT (add/add): Merge conflict in env.txt
Automatic merge failed; fix conflicts and then commit the result.
```

这回`git pull`成功，但是合并有冲突，需要手动解决，解决的方法和分支管理中的解决冲突完全一样。解决后，提交，再push：

```powershell
$ git commit -m "fix env conflict"
[dev 57c53ab] fix env conflict

$ git push origin dev
Counting objects: 6, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (4/4), done.
Writing objects: 100% (6/6), 621 bytes | 621.00 KiB/s, done.
Total 6 (delta 0), reused 0 (delta 0)
To git@github.com:guoyaohua/learngit.git
   7a5e5dd..57c53ab  dev -> dev
```

因此，多人协作的工作模式通常是这样：

1. 首先，可以试图用`git push origin <branch-name>`推送自己的修改；
2. 如果推送失败，则因为远程分支比你的本地更新，需要先用`git pull`试图合并；
3. 如果合并有冲突，则解决冲突，并在本地提交；
4. 没有冲突或者解决掉冲突后，再用`git push origin <branch-name>`推送就能成功！

如果`git pull`提示`no tracking information`，则说明本地分支和远程分支的链接关系没有创建，用命令`git branch --set-upstream-to <branch-name> origin/<branch-name>`。

这就是多人协作的工作模式，一旦熟悉了，就非常简单。

### Rebase

`git rebase`和`git merge`做的事其实是一样的。它们都被设计来将一个分支的更改并入另一个分支，只不过方式有些不同。

`git rebase`用于把一个分支的修改合并到当前分支。

假设你现在基于远程分支"origin"，创建一个叫"mywork"的分支。

```powershell
$ git checkout -b mywork origin
```

假设远程分支"origin"已经有了2个提交，如图：

![](http://pic.guoyaohua.com/image/git/rebase0.png)

现在我们在这个分支做一些修改，然后生成两个提交(commit)。

但是与此同时，有些人也在"origin"分支上做了一些修改并且做了提交了. 这就意味着"origin"和"mywork"这两个分支各自"前进"了，它们之间"分叉"了。

![](http://pic.guoyaohua.com/image/git/rebase1.png)

在这里，你可以用“pull"命令把“origin”分支上的修改拉下来并且和你的修改合并； 结果看起来就像一个新的"合并的提交"(merge commit):

![](http://pic.guoyaohua.com/image/git/rebase2.png)

但是，如果你想让“mywork”分支历史看起来像没有经过任何合并一样，你也许可以用 `git rebase`：

```powershell
$ git checkout mywork
$ git rebase origin
```

这些命令会把你的"mywork"分支里的每个提交(commit)取消掉，并且把它们临时保存为补丁(patch)(这些补丁放到".git/rebase"目录中)，然后把"mywork"分支更新为最新的"origin"分支，最后把保存的这些补丁应用到"mywork"分支上。

![](http://pic.guoyaohua.com/image/git/rebase3.png)

当"mywork"分支更新之后，它会指向这些新创建的提交(commit)，而那些老的提交会被丢弃。 如果运行垃圾收集命令(pruning garbage collection)，这些被丢弃的提交就会删除。

![](http://pic.guoyaohua.com/image/git/rebase4.png)

现在我们可以看一下用merge和用rebase所产生的历史的区别：

![](http://pic.guoyaohua.com/image/git/1563677573806.png)

![](http://pic.guoyaohua.com/image/git/rebase2.png)

当我们使用`git log`来参看commit时，其commit的顺序也有所不同。

假设C3提交于`9:00AM`，C5提交于`10:00AM`，C4提交于`11:00AM`，C6提交于`12:00AM`，

对于使用`git merge`来合并所看到的commit的顺序（从新到旧）是：

C7，C6，C4，C5，C3，C2，C1

对于使用git rebase来合并所看到的commit的顺序（从新到旧）是：

C7，C6'，C5'，C4，C3，C2，C1

 因为C6'提交只是C6提交的克隆，C5'提交只是C5提交的克隆，

从用户的角度看使用`git rebase`来合并后所看到的commit的顺序（从新到旧）是：

C7，C6，C5，C4，C3，C2，C1

另外，我们在使用`git pull`命令的时候，可以使用`--rebase`参数，即`git pull --rebase`，这里Git会把你的本地当前分支里的每个提交(commit)取消掉，并且把它们临时保存为补丁(patch)(这些补丁放到".git/rebase"目录中),然后把分支更新 为最新的"origin"分支，最后把保存的这些补丁应用到分支上。

#### 解决冲突

在rebase的过程中，也许会出现冲突(conflict)。在这种情况，Git会停止rebase并会让你去解决冲突。rebase和merge的另一个区别是rebase的冲突是一个一个解决，如果有十个冲突，在解决完第一个冲突后，用"`git add`"命令去更新这些内容的索引(index)，然后，你无需执行 git-commit，只要执行：

```powershell
$ git add -u 
$ git rebase --continue
```

继续后才会出现第二个冲突，直到所有冲突解决完，而merge是所有的冲突都会显示出来。 

在任何时候，你可以用`--abort`参数来终止rebase的行动，并且"mywork" 分支会回到rebase开始前的状态。

```powershell
$ git rebase --abort
```

所以rebase的工作流就是

```powershell
git rebase 
while(存在冲突) {
    git status
    # 找到当前冲突文件，编辑解决冲突
    git add -u
    git rebase --continue
    if( git rebase --abort )
        break; 
}
```

最后冲突全部解决，rebase成功。

## 标签管理

发布一个版本时，我们通常先在版本库中打一个标签（tag），这样，就唯一确定了打标签时刻的版本。将来无论什么时候，取某个标签的版本，就是把那个打标签的时刻的历史版本取出来。所以，标签也是版本库的一个快照。

Git的标签虽然是版本库的快照，但其实它就是指向某个commit的指针（跟分支很像，但是分支可以移动，标签不能移动），所以，创建和删除标签都是瞬间完成的。

Git有commit，为什么还要引入tag？

“请把上周一的那个版本打包发布，commit号是6a5819e...”

“一串乱七八糟的数字不好找！”

如果换一个办法：

“请把上周一的那个版本打包发布，版本号是v1.2”

“好的，按照tag v1.2查找commit就行！”

所以，tag就是一个让人容易记住的有意义的名字，它跟某个commit绑在一起。

### 创建标签

在Git中打标签非常简单，首先，切换到需要打标签的分支上：

```powershell
$ git branch
* dev
  master
$ git checkout master
Switched to branch 'master'
```

然后，敲命令`git tag <name>`就可以打一个新标签：

```powershell
$ git tag v1.0
```

可以用命令`git tag`查看所有标签：

```powershell
$ git tag
v1.0
```

默认标签是打在最新提交的commit上的。有时候，如果忘了打标签，比如，现在已经是周五了，但应该在周一打的标签没有打，怎么办？

方法是找到历史提交的commit id，然后打上就可以了：

```powershell
$ git log --pretty=oneline --abbrev-commit
12a631b (HEAD -> master, tag: v1.0, origin/master) merged bug fix 101
4c805e2 fix bug 101
e1e9c68 merge with no-ff
f52c633 add merge
cf810e4 conflict fixed
5dc6824 & simple
14096d0 AND simple
b17d20e branch test
d46f35e remove test.txt
b84166e add test.txt
519219b git tracks changes
e43a48b understand how stage works
1094adb append GPL
e475afc add distributed
eaadf4e wrote a readme file
```

比方说要对`add merge`这次提交打标签，它对应的commit id是`f52c633`，敲入命令：

```powershell
$ git tag v0.9 f52c633
```

再用命令`git tag`查看标签：

```powershell
$ git tag
v0.9
v1.0
```

注意，标签不是按时间顺序列出，而是按字母排序的。可以用`git show <tagname>`查看标签信息：

```powershell
$ git show v0.9
commit f52c63349bc3c1593499807e5c8e972b82c8f286 (tag: v0.9)
Author: Yaohua Guo <guo.yaohua@foxmail.com>
Date:   Fri May 18 21:56:54 2018 +0800

    add merge

diff --git a/readme.txt b/readme.txt
...
```

可以看到，`v0.9`确实打在`add merge`这次提交上。

还可以创建带有说明的标签，用`-a`指定标签名，`-m`指定说明文字：

```powershell
$ git tag -a v0.1 -m "version 0.1 released" 1094adb
```

用命令`git show <tagname>`可以看到说明文字：

```powershell
$ git show v0.1
tag v0.1
Tagger: Yaohua Guo <guo.yaohua@foxmail.com>
Date:   Fri May 18 22:48:43 2018 +0800

version 0.1 released

commit 1094adb7b9b3807259d8cb349e7df1d4d6477073 (tag: v0.1)
Author: Yaohua Guo <guo.yaohua@foxmail.com>
Date:   Fri May 18 21:06:15 2018 +0800

    append GPL

diff --git a/readme.txt b/readme.txt
...
```

### 操作标签

如果标签打错了，也可以删除：

```powershell
$ git tag -d v0.1
Deleted tag 'v0.1' (was f15b0dd)
```

因为创建的标签都只存储在本地，不会自动推送到远程。所以，打错的标签可以在本地安全删除。

如果要推送某个标签到远程，使用命令`git push origin <tagname>`：

```powershell
$ git push origin v1.0
Total 0 (delta 0), reused 0 (delta 0)
To git@github.com:guoyaohua/learngit.git
 * [new tag]         v1.0 -> v1.0
```

或者，一次性推送全部尚未推送到远程的本地标签：

```powershell
$ git push origin --tags
Total 0 (delta 0), reused 0 (delta 0)
To git@github.com:guoyaohua/learngit.git
 * [new tag]         v0.9 -> v0.9
```

如果标签已经推送到远程，要删除远程标签就麻烦一点，先从本地删除：

```powershell
$ git tag -d v0.9
Deleted tag 'v0.9' (was f52c633)
```

然后，从远程删除。删除命令也是push，但是格式如下：

```powershell
$ git push origin :refs/tags/v0.9
To git@github.com:guoyaohua/learngit.git
 - [deleted]         v0.9
```
要看看是否真的从远程库删除了标签，可以登陆GitHub查看。


## 自定义Git

### 忽略特殊文件

有些时候，你必须把某些文件放到Git工作目录中，但又不能提交它们，比如保存了数据库密码的配置文件啦，等等，每次`git status`都会显示`Untracked files ...`，有强迫症的朋友心里肯定不爽。

好在Git考虑到了大家的感受，这个问题解决起来也很简单，在Git工作区的根目录下创建一个特殊的`.gitignore`文件，然后把要忽略的文件名填进去，Git就会自动忽略这些文件。

不需要从头写`.gitignore`文件，GitHub已经为我们准备了各种配置文件，只需要组合一下就可以使用了。所有配置文件可以直接在线浏览：https://github.com/github/gitignore

忽略文件的原则是：

1. 忽略操作系统自动生成的文件，比如缩略图等；
2. 忽略编译生成的中间文件、可执行文件等，也就是如果一个文件是通过另一个文件自动生成的，那自动生成的文件就没必要放进版本库，比如Java编译产生的`.class`文件；
3. 忽略你自己的带有敏感信息的配置文件，比如存放口令的配置文件。

举个例子：

假设你在Windows下进行Python开发，Windows会自动在有图片的目录下生成隐藏的缩略图文件，如果有自定义目录，目录下就会有`Desktop.ini`文件，因此你需要忽略Windows自动生成的垃圾文件：

```
# Windows:
Thumbs.db
ehthumbs.db
Desktop.ini
```

然后，继续忽略Python编译产生的`.pyc`、`.pyo`、`dist`等文件或目录：

```
# Python:
*.py[cod]
*.so
*.egg
*.egg-info
dist
build
```

加上你自己定义的文件，最终得到一个完整的`.gitignore`文件，内容如下：

```
# Windows:
Thumbs.db
ehthumbs.db
Desktop.ini

# Python:
*.py[cod]
*.so
*.egg
*.egg-info
dist
build

# My configurations:
db.ini
deploy_key_rsa
```

最后一步就是把`.gitignore`也提交到Git，就完成了！当然检验`.gitignore`的标准是`git status`命令是不是说`working directory clean`。

使用Windows的朋友注意了，如果你在资源管理器里新建一个`.gitignore`文件，它会非常弱智地提示你必须输入文件名，但是在文本编辑器里“保存”或者“另存为”就可以把文件保存为`.gitignore`了。

有些时候，你想添加一个文件到Git，但发现添加不了，原因是这个文件被`.gitignore`忽略了：

```powershell
$ git add App.class
The following paths are ignored by one of your .gitignore files:
App.class
Use -f if you really want to add them.
```

如果你确实想添加该文件，可以用`-f`强制添加到Git：

```powershell
$ git add -f App.class
```

或者你发现，可能是`.gitignore`写得有问题，需要找出来到底哪个规则写错了，可以用`git check-ignore`命令检查：

```powershell
$ git check-ignore -v App.class
.gitignore:3:*.class	App.class
```

Git会告诉我们，`.gitignore`的第3行规则忽略了该文件，于是我们就可以知道应该修订哪个规则。

### 配置别名

有没有经常敲错命令？比如`git status`？`status`这个单词真心不好记。

如果敲`git st`就表示`git status`那就简单多了，当然这种偷懒的办法我们是极力赞成的。

我们只需要敲一行命令，告诉Git，以后`st`就表示`status`：

```powershell
$ git config --global alias.st status
```

好了，现在敲`git st`看看效果。

当然还有别的命令可以简写，很多人都用`co`表示`checkout`，`ci`表示`commit`，`br`表示`branch`：

```powershell
$ git config --global alias.co checkout
$ git config --global alias.ci commit
$ git config --global alias.br branch
```

以后提交就可以简写成：

```powershell
$ git ci -m "bala bala bala..."
```

`--global`参数是全局参数，也就是这些命令在这台电脑的所有Git仓库下都有用。

在撤销修改一节中，我们知道，命令`git reset HEAD file`可以把暂存区的修改撤销掉（unstage），重新放回工作区。既然是一个unstage操作，就可以配置一个`unstage`别名：

```powershell
$ git config --global alias.unstage 'reset HEAD'
```

当你敲入命令：

```powershell
$ git unstage test.py
```

实际上Git执行的是：

```powershell
$ git reset HEAD test.py
```

配置一个`git last`，让其显示最后一次提交信息：

```powershell
$ git config --global alias.last 'log -1'
```

这样，用`git last`就能显示最近一次的提交：

```powershell
$ git last
commit adca45d317e6d8a4b23f9811c3d7b7f0f180bfe2
Merge: bd6ae48 291bea8
Author: Yaohua Guo <Guo.Yaohua@foxmail.com>
Date:   Thu Aug 22 22:49:22 2013 +0800

    merge & fix hello.py
```

甚至可以进一步美化把`lg`配置成：

```powershell
$ git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
```

来看看`git lg`的效果：

![](http://pic.guoyaohua.com/image/git/10.png)

### 配置文件

配置Git的时候，加上`--global`是针对当前用户起作用的，如果不加，那只针对当前的仓库起作用。

配置文件放哪了？每个仓库的Git配置文件都放在`.git/config`文件中：

```powershell
$ type .git/config 
[core]
    repositoryformatversion = 0
    filemode = true
    bare = false
    logallrefupdates = true
    ignorecase = true
    precomposeunicode = true
[remote "origin"]
    url = git@github.com:michaelliao/learngit.git
    fetch = +refs/heads/*:refs/remotes/origin/*
[branch "master"]
    remote = origin
    merge = refs/heads/master
[alias]
    last = log -1
```

别名就在`[alias]`后面，要删除别名，直接把对应的行删掉即可。

而当前用户的Git配置文件放在用户主目录下的一个隐藏文件`.gitconfig`中：

```powershell
$ type .gitconfig
[alias]
    co = checkout
    ci = commit
    br = branch
    st = status
[user]
    name = Your Name
    email = your@email.com
```

配置别名也可以直接修改这个文件，如果改错了，可以删掉文件重新通过命令配置。

## 总结

1. Git记录的是文件的修改状态，而不是文件本身。
2. 初始化一个Git仓库，使用`git init`命令。
3. 添加文件到Git仓库，分两步：
   - 使用命令`git add <file>`，注意，可反复多次使用，添加多个文件；
   - 使用命令`git commit -m <message>`，完成。
4. 每次修改，如果不用`git add`到暂存区，那就不会加入到`commit`中。
5. 提交后，可用`git diff HEAD -- <file_name>`命令可以查看工作区和版本库里面最新版本的区别。
6. 要关联一个远程库，使用命令`git remote add origin git@server-name:path/repo-name.git`，使用命令`git push -u origin master`第一次推送master分支的所有内容，此后，每次本地提交后，只要有必要，就可以使用命令`git push origin master`推送最新修改。
7. 要克隆一个仓库，首先必须知道仓库的地址，然后使用`git clone`命令克隆。Git支持多种协议，包括`https`，但通过`ssh`支持的原生`git`协议速度最快。
8. HEAD`指向的版本就是当前版本，因此，Git允许我们在版本的历史之间穿梭，使用命令`git reset --hard commit_id`。
9. 穿梭前，用`git log`可以查看提交历史，以便确定要回退到哪个版本。
10. 要重返未来，用`git reflog`查看命令历史，以便确定要回到未来的哪个版本。
11. 当你改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，用命令`git checkout -- file`。
12. 当你不但改乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改，分两步，第一步用命令`git reset HEAD <file>`，第二步按上一条操作。
13. 已经提交了不合适的修改到版本库时，想要撤销本次提交，参考版本回退，不过前提是没有推送到远程库。
14. 命令`git rm`用于删除一个文件。如果一个文件已经被提交到版本库，那么你永远不用担心误删，但是要小心，你只能恢复文件到最新版本，你会丢失**最近一次提交后你修改的内容**。
15. Git鼓励大量使用分支：
    - 查看分支：`git branch`
    - 创建分支：`git branch <name>`
    - 切换分支：`git checkout <name>`
    - 创建+切换分支：`git checkout -b <name>`
    - 合并某分支到当前分支：`git merge <name>`
    - 删除分支：`git branch -d <name>`
16. 当Git无法自动合并分支时，就必须首先解决冲突。解决冲突后，再提交，合并完成。解决冲突就是把Git合并失败的文件手动编辑为我们希望的内容，再提交。
17. 用`git log --graph`命令可以看到分支合并图。
18. 合并分支时，加上`--no-ff`参数就可以用普通模式合并，合并后的历史有分支，能看出来曾经做过合并，而`fast forward`合并就看不出来曾经做过合并。
19. 切换分支使用`git checkout <master>` ，HEAD指向master，工作区也恢复到master的状态。 
20. 开发一个新feature，最好新建一个分支。
21. 如果要丢弃一个没有被合并过的分支，可以通过`git branch -D <name>`强行删除。
22. 查看远程库信息，使用`git remote -v`。
23. 本地新建的分支如果不推送到远程，对其他人就是不可见的。
24. 从本地推送分支，使用`git push origin branch-name`，如果推送失败，先用`git pull`抓取远程的新提交。
25. 在本地创建和远程分支对应的分支，使用`git checkout -b branch-name origin/branch-name`，本地和远程分支的名称最好一致。
26. 建立本地分支和远程分支的关联，使用`git branch --set-upstream branch-name origin/branch-name`。
27. 从远程抓取分支，使用`git pull`，如果有冲突，要先处理冲突。
28. 命令`git tag <tagname>`用于新建一个标签，默认为`HEAD`，也可以指定一个commit id。
29. 命令`git tag -a <tagname> -m "blablabla..."`可以指定标签信息。
30. 命令`git tag`可以查看所有标签。
31. 忽略某些文件时，需要编写`.gitignore`。
32. `.gitignore`文件本身要放到版本库里，并且可以对`.gitignore`做版本管理。
