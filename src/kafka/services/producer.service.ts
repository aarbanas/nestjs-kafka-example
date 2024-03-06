import {
  Injectable,
  OnApplicationShutdown,
  OnModuleDestroy,
  OnModuleInit,
} from "@nestjs/common";
import { Kafka, Producer, ProducerRecord } from "kafkajs";
import { KafkaInstance } from "../kafka.instance";

@Injectable()
export class ProducerService implements OnModuleInit, OnApplicationShutdown {
  constructor(private kafka: KafkaInstance) {}

  private readonly producer: Producer = this.kafka.get().producer();

  async onModuleInit() {
    await this.producer.connect();
  }

  async produce(record: ProducerRecord) {
    await this.producer.send(record);
  }

  async onApplicationShutdown() {
    await this.producer.disconnect();
  }
}
