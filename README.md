# DockerCommandQuiz

This is an app that quizzes you on Docker commands.
We have prepared a Docker command quiz with a total of 20 questions.

# install

```
npm install -g docker_quiz_app
```

# supported language

・Japanese

# Usage

Execute the following command to start the Docker command quiz

```
docker_quiz_start
```

There are 20 questions in the Docker command quiz, and you select the number of questions you want to ask first.

```
? Dockerコマンドクイズ!! 出題問題数を選択してください …
❯ 5問出題
  10問出題
  15問出題
  20問出題
```

A Docker command quiz will be asked, so please select the command that will serve as your answer.

```
※ sample
? Docker コンテナをネットワークに接続するには、どのようなコマンドを実行しますか？ …
❯ docker network join
  docker network create
  docker network connect
```

After selecting a Docker command, judge whether it is correct or incorrect.
In addition, a sample command that is the correct answer and an explanation of the command will be displayed.

```
[SampleCode]
docker network connect NETWORK CONTAINER

[解説]
NETWORK には、接続するネットワークの名前を指定します。
CONTAINER には、接続するコンテナの名前または ID を指定します。
```

When all the problems are solved, the number of correct answers will be output and the game will end.
I hope this helps you remember Docker commands.

# License
This software is released under the MIT License.

# DockerCommandQuiz

これは Docker コマンドに関するクイズを出題するアプリケーションです。合計 20 の質問が用意されています。

# インストール

```
npm install -g docker_quiz_app
```

# サポートされる言語

・日本語

# 使用方法

以下のコマンドを実行して Docker コマンドのクイズを開始します。

```
docker_quiz_start
```

Docker コマンドクイズには合計 20 の質問があり、最初に出題する問題数を選択します。

```
? Dockerコマンドクイズ!! 出題問題数を選択してください …
❯ 5問出題
  10問出題
  15問出題
  20問出題
```

Docker コマンドクイズが出題されるので、回答として使用するコマンドを選択してください。

```
※ sample
? Docker コンテナをネットワークに接続するには、どのようなコマンドを実行しますか？ …
❯ docker network join
  docker network create
  docker network connect
```

Docker コマンドを選択した後、それが正解かどうかを判定します。
また、正解のサンプルコマンドとコマンドの説明が表示されます。

```
[SampleCode]
docker network connect NETWORK CONTAINER

[解説]
NETWORK には、接続するネットワークの名前を指定します。
CONTAINER には、接続するコンテナの名前または ID を指定します。
```

すべての問題が解決されたら、正解の数が出力され、ゲームが終了します。
これが Docker コマンドを覚えるのに役立つことを願っています

# ライセンス
このソフトウェアは MIT ライセンスに基づいてリリースされています。
