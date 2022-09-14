import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PresidenteDocument = Presidente & Document;

@Schema()
export class Presidente {
  @Prop()
  nome: string;

  @Prop()
  numero: string;

  @Prop()
  partido: string;
}

export const PresidenteSchema = SchemaFactory.createForClass(Presidente);