import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import {DEFAULT_REDIS_NAMESPACE, InjectRedis} from "@liaoliaots/nestjs-redis";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class RedisService {
    constructor(
        @InjectRedis(DEFAULT_REDIS_NAMESPACE) private readonly redis: Redis,
        private readonly configService : ConfigService
    ) {}

    async set(key: string, value: string, ttl?: number): Promise<string> {
        const redisTTL = this.configService.get<number>('redis.ttl');
        return this.redis.set(key, value, "EX", ttl ?? redisTTL );
    }

    async get(key: string): Promise<string | null> {
        return this.redis.get(key);
    }

    async reset(): Promise<void> {
        await this.redis.flushall();
    }

    async push(key:string,value: any,ttl?: number) : Promise<string|null> {
        const prev = await this.get(key)
        if(prev){

            const getRedisValue = JSON.parse(prev);
            getRedisValue.push(value)
            return await this.set(key,JSON.stringify(getRedisValue),ttl)

        }
        return null
    }

    async delete(key: string): Promise<number> {
        return this.redis.del(key);
    }
}
