import { Injectable, OnApplicationShutdown } from "@nestjs/common";
import {
  Consumer,
  ConsumerConfig,
  ConsumerRunConfig,
  ConsumerSubscribeTopics,
  Kafka,
} from "kafkajs";
import { KafkaSingleton } from "./kafka.singleton";

@Injectable()
export class ConsumerService implements OnApplicationShutdown {
  constructor(private kafka: KafkaSingleton) {}

  private readonly consumers: Consumer[] = [];

  async consume(topic: ConsumerSubscribeTopics, config: ConsumerRunConfig) {
    const consumer = this.kafka.get().consumer({ groupId: "nestjs-kafka" });

    await consumer.connect();
    await consumer.subscribe(topic);
    await consumer.run(config);

    this.consumers.push(consumer);
  }

  async onApplicationShutdown() {
    for (const consumer of this.consumers) {
      await consumer.disconnect();
    }
  }
}