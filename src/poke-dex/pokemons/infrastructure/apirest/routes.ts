/* eslint-disable @typescript-eslint/no-explicit-any */
import { Application, Request, Response } from "express";
import GetPokemonTypesUseCase from "../../application/use-cases/get-pokemon-types.use-case";
import RestPokemonRepository from "../repositories/rest-pokemon.repository";
import PokemonNotFoundException from "../../domain/exceptions/pokemon-not-found.exception";
import GetPokemonDetailsUseCase from "../../application/use-cases/get-pokemon-details.use-case";
import InMemoryPokemonFavsRepository from "../repositories/in-memory.pokemon-favs.repository";

export const registerPokemonRoutes = (app: Application): void => {
	app.get("/type", (req: Request, res: Response) => {
		const pokemonName = req?.query?.pokemon_name as string
		const getPokemonTypesUseCase = new GetPokemonTypesUseCase(new RestPokemonRepository())

		getPokemonTypesUseCase.execute(pokemonName).then((pokemon) => {
			return res.status(200).send(pokemon.getTypes());
		}).catch((error: any) => {
			if (error instanceof PokemonNotFoundException) {
				return res.status(404).send('Pokemon not found');
			}
			return res.status(502).send('No connection');
		});
	});

	app.get("/pokemon/:pokemonId", (req: Request, res: Response) => {
		const pokemonId = Number(req.params.pokemonId);
		const getPokemonDetailsUseCase = new GetPokemonDetailsUseCase(new RestPokemonRepository(), new InMemoryPokemonFavsRepository());
		getPokemonDetailsUseCase.execute(pokemonId).then((pokemon) => {
			const jsonResponse = {
				id: pokemon.getId().value,
				name: pokemon.getName().value,
				weight: pokemon.getWeight().value,
				height: pokemon.getHeight().value,
				favouriteNums: pokemon.getFavouriteNums().value
			};
			return res.status(200).send(jsonResponse);
		}).catch((error: any) => {
			if (error instanceof PokemonNotFoundException) {
				return res.status(404).send('Pokemon not found');
			}
			return res.status(502).send('No connection');
		});
	});
};
