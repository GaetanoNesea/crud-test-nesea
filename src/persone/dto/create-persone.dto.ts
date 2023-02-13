import {IsEmpty, IsNotEmpty, IsString,} from "class-validator";


export class CreatePersoneDto {


    @IsEmpty()
    id: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    email: string;
}
