redis = Redis.new(:host => REDIS_CONFIG['host'], :port => REDIS_CONFIG['port'])
Redis.current = Redis::Namespace.new(REDIS_CONFIG['namespace'], redis: redis)
