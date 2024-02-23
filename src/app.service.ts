import { Injectable } from '@nestjs/common';
import { ProducerService } from './kafka/producer.service'

@Injectable()
export class AppService {

  constructor (private producerService: ProducerService) {
  }
  async getHello() {
    await this.producerService.produce({
      topic: 'test',
      messages: [{
        value: 'Hello World!'
      }]
    })
    
    return 'Hello World!';
  }
}
