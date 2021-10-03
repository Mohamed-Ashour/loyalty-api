import { Transform } from "class-transformer";
import { IsPositive, IsString, IsOptional } from "class-validator";
import { User } from "src/users/entities/user.entity";

export class CreateTransactionDto {
    @IsOptional()
    @IsPositive()
    from_user: User;
    
    @IsPositive()
    to_user: User;
    
    @IsPositive()
    points: number;
}