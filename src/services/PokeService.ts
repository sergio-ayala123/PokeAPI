import axios from "axios";



export const PokeService = {






    GetAllPokemonList: async (): Promise<any> => {
        let url = `https://pokeapi.co/api/v2/pokemon/${'?offset=0&limit=1154'}`
        
        const res = await axios.get(url);
        return res.data
    },
    GetAllSets: async (): Promise<any> => {
        let url = 'https://api.pokemontcg.io/v2/sets'
        const res = await axios.get(url);
        return res.data
    },
    
    GetAllPokemonCards: async(pokemon?:string): Promise<any> => {
        let url = ''
        if(pokemon?.trim().length ===0){
            url = 'https://api.pokemontcg.io/v2/cards'
        }
        else {
            url = `https://api.pokemontcg.io/v2/cards?q=name:${pokemon}`
        }
        const res = await axios.get(url)
        return res.data
    }
    
};