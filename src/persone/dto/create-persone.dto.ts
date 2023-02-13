import { IsNotEmpty, IsString } from "class-validator";


export class CreatePersoneDto {

    @IsString()
    id: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    email: string;
}
