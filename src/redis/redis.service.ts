import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import {DEFAULT_REDIS_NAMESPACE, InjectRedis} from "@liaoliaots/nestjs-redis";

@Injectable()
export class RedisService {
    constructor(@InjectRedis(DEFAULT_REDIS_NAMESPACE) private readonly redis: Redis) {}

    async set(key: string, value: string, ttl?: number): Promise<string> {
        return this.redis.set(key, value, "EX", ttl ?? 300 );
    }

    async get(key: string): Promise<string | null> {
        return this.redis.get(key);
    }

    async reset(): Promise<void> {
        await this.redis.flushall();
    }

    async delete(key: string): Promise<number> {
        return this.redis.del(key);
    }
}
