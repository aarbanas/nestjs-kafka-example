import { Kafka, logLevel } from "kafkajs";
import { Injectable } from "@nestjs/common";

@Injectable()
export class KafkaInstance {
  private readonly kafka = new Kafka({
    brokers: [process.env.KAFKA_BROKER],
    ssl: true,
    sasl: {
      mechanism: "scram-sha-256",
      username: process.env.KAFKA_USERNAME,
      password: process.env.KAFKA_PASSWORD,
    },
    logLevel: logLevel.ERROR,
  });

  get() {
    return this.kafka;
  }
}
