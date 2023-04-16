/* eslint-disable @typescript-eslint/no-explicit-any */
import { Application, Request, Response } from "express";
import CreateUserDTO from "../../application/dtos/create-user.dto";
import CreateUserUseCase from "../../application/use-cases/create-user.use-case";
import AddPokemonToUserFavouritesUseCase from "../../application/use-cases/add-pokemon-to-user-favourites.use-case";
import InMemoryUserRepository from "../repository/in-memory-user.repository";
import { UserAlreadyExistsException } from "../../domain/exceptions/user-already-exists.exception";
import { UserPokemonAlreadyInFavouritesException } from "../../domain/exceptions/user-pokemon-already-in-favourites.exception";
import RabbitMqEventPublisher from "../events/rabbitMqEventPublisher";


export const registerUserRoutes = (app: Application): void => {
  app.post("/user", (req: Request, res: Response) => {
    try {
      const userDto = new CreateUserDTO();
      userDto.id = req.body.id;
      userDto.name = req.body.name;

      const createUserUseCase = new CreateUserUseCase(new InMemoryUserRepository());
      createUserUseCase.execute(userDto);

      return res.status(201).send('User created');
    } catch (error: any) {
      if (error instanceof UserAlreadyExistsException) {
        return res.status(409).send('User already exists');
      }
      return res.status(500).send('Internal server error');
    }
  });

  app.patch("/user/:userId/favourites", (req: Request, res: Response) => {
    try {
      const userId = Number(req.params.userId);
      const pokemonId = Number(req.body.pokemon_id);
      const addPokemonToUserFavouritesUseCase = new AddPokemonToUserFavouritesUseCase(new InMemoryUserRepository(), new RabbitMqEventPublisher());
      addPokemonToUserFavouritesUseCase.execute(userId, pokemonId);

      return res.status(200).send('Pokemon added to favourites');
    } catch (error: any) {
      if (error instanceof UserPokemonAlreadyInFavouritesException) {
        return res.status(409).send('Pokemon already in favourites');
      }
      return res.status(500).send('Internal server error');
    }
  });
};
