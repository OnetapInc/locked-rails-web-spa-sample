# Lockedのを活用したSPAデモアプリ（Nuxt+Rails）
これは[fishpercolator](https://github.com/fishpercolator)さんによって作成されたNuxt及びRailsの[サンプルアプリ](https://github.com/fishpercolator/autheg)にLockedを導入したものになります。実装例として参考にしてください。

# 動作確認方法

    docker-compose build
    docker-compose run -u root backend bundle
    docker-compose run frontend yarn
    docker-compose run backend rails db:create
    docker-compose run backend rails db:migrate
    docker-compose up

# ユーザー登録できないので、作成

    docker exec -ti autheg_backend_1 bash
    bundle exec rails c
    User.create!(email: "test@example.com", password: "password")
