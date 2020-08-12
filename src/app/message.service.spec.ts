import { MessageService } from "./message.service"

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    service = new MessageService();
  });

  it('Should have no message to start', () => {
    expect(service.messages.length).toBe(0);
  });

  it('should have a message when message is add', () => {
    service.add('message 1');

    expect(service.messages.length).toBe(1);
  });

  it('should remove allmessages when clear', () => {
    service.add('message 1');

    service.clear();

    expect(service.messages.length).toBe(0);
  });


});
