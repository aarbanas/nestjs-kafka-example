import { Kafka } from "kafkajs";
import { Injectable } from "@nestjs/common";

@Injectable()
export class KafkaSingleton {
  private readonly kafka = new Kafka({
    clientId: "my-app",
    brokers: [process.env.KAFKA_URL],
  });

  get() {
    return this.kafka;
  }
}
