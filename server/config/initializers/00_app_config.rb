redis_file = Rails.root.join('config', 'redis.yml')
REDIS_CONFIG = YAML.load(File.read(redis_file))[Rails.env]
