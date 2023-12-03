import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export enum EventMessage {
  NOTIFY = 'event.notify',
  MATCH = 'event.match',
  SOLICITATION = 'event.solicitation',
}

export class EventMessageDto {
  @IsEnum(Event)
  @IsNotEmpty()
  event: `${EventMessage}`;

  @IsOptional()
  message?: string | string[];
}
