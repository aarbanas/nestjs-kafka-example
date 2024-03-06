import { Injectable, OnApplicationShutdown } from "@nestjs/common";
import {
  Consumer,
  ConsumerConfig,
  ConsumerRunConfig,
  ConsumerSubscribeTopics,
  Kafka,
} from "kafkajs";
import { KafkaInstance } from "../kafka.instance";

@Injectable()
export class ConsumerService implements OnApplicationShutdown {
  constructor(private kafka: KafkaInstance) {}

  private readonly consumers: Consumer[] = [];

  async consume(
    topic: ConsumerSubscribeTopics,
    config: ConsumerRunConfig,
    groupId = "nestjs-kafka",
  ) {
    const consumer = this.kafka.get().consumer({ groupId });

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
