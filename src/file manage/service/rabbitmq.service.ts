// src/services/rabbitmq.service.ts
import amqp from 'amqplib/callback_api';

class RabbitMQService {
  private static instance: RabbitMQService;
  private connection?: amqp.Connection;
  private channel?: amqp.Channel;

  private constructor() {}

  public static getInstance(): RabbitMQService {
    if (!RabbitMQService.instance) {
      RabbitMQService.instance = new RabbitMQService();
    }
    return RabbitMQService.instance;
  }

  public connect(url: string = 'amqp://localhost'): Promise<void> {
    return new Promise((resolve, reject) => {
      amqp.connect(url, (err, conn) => {
        if (err) return reject(err);
        this.connection = conn;
        conn.createChannel((err2, ch) => {
          if (err2) return reject(err2);
          this.channel = ch;
          console.log('✅ RabbitMQ conectado!');
          resolve();
        });
      });
    });
  }

  public sendToQueue(queue: string, message: object): void {
    if (!this.channel) throw new Error('Canal RabbitMQ não está criado');
    this.channel.assertQueue(queue, { durable: true });
    this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
      persistent: true,
    });
    console.log(`📤 Mensagem enviada para fila "${queue}"`);
  }

  public consumeQueue(queue: string, callback: (msg: amqp.Message) => void): void {
    if (!this.channel) throw new Error('Canal RabbitMQ não está criado');
    this.channel.assertQueue(queue, { durable: true });
    this.channel.consume(queue, (msg) => {
      if (msg) {
        callback(msg);
        this.channel?.ack(msg);
      }
    });
  }

  public close(): void {
    this.channel?.close((err) => {
      if (err) {
        console.error('Erro ao fechar o canal RabbitMQ:', err);
      }
      this.connection?.close();
      console.log('❌ RabbitMQ desconectado!');
    });
  }
}

export const rabbitMQService = RabbitMQService.getInstance();
