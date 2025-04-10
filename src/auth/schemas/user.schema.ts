import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({
    timestamps: true
})
export class User {
    @Prop()
    username: string;

    @Prop({ unique: [true, 'Duplicate email entred !'] })
    email: string;

    @Prop()
    password: string;
}

export const userSchema = SchemaFactory.createForClass(User);