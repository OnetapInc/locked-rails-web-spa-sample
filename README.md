# Lockedを活用したSPAデモアプリ（Nuxt + Rails）
一般的なNuxt.jsのSPAに対してAPIでRailsを活用しているWEBアプリの一例になります。

### 動作確認
```
cd client
npm i && yarn
npm run dev
# => localhost:4000
```

```
cd server
bundle install --path vendor/bundle
```

```
mysql -u root -p
mysql> CREATE USER 'satounextuser'@'localhost' IDENTIFIED BY 'satounextpass';
mysql> GRANT ALL ON *.* TO 'satounextuser'@'localhost';
```

```
bundle exec rake db:create
bundle exec rake db:migrate
bundle exec rails s -b 0.0.0.0
# => localhost:3000
```


※登録時にメールがこなかったら
```
bundle exec rails c
pry> SignUpRequest.last.token
=> "aea7e684-679c-4c6e-8c05-906b76e0dbd6"

# localhost:4000/signup/confirm/aea7e684-679c-4c6e-8c05-906b76e0dbd6
```
