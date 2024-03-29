import { useQuery } from 'react-query'
import axios from 'axios'
import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { Alert, AlertTitle, CircularProgress, Grid} from '@mui/material'
import Card from '../components/Card'
import { motion } from 'framer-motion'
import { PokeService } from '../services/PokeService'
import { Link, useNavigate } from 'react-router-dom'

const Form = () => {
    type pok = {
        name: string,
        url: string
    }
    type set = {
        id: string,
        name: string,
        series: string,
        printedTotal: number,
        total: number,
        legalities: {
            unlimited: string,
            standard: string,
            expanded: string
        },
        ptcgoCode: string,
        releaseDate: string,
        updatedAt: string,
        images: {
            symbol: string,
            logo: string
        }
    }
    const [searchPk, setSearchPokemon] = useState('')
    const [hideForm, setHideForm] = useState(false)
    const [possiblePokemon, setPossiblePokemon] = useState('')
    const [possibleSet, setPossibleSet] = useState('')
    const [showPossiblePokemons, setShowPossiblePokemons] = useState(false)
    const [showPossibleSets, setShowPossibleSets] = useState(false)
    const [pokemonList, setPokemonList] = useState<pok[]>()
    const [setList, setSetList] = useState<set[]>()
    const [cards, setCards] = useState<any[]>()
    const navigate = useNavigate();

    useEffect(() => {
        const getNames = async () => {
            const res = await PokeService.GetAllPokemonList();
            setPokemonList(res!.results)
            console.log(res!.results)
        }
        const getSets = async () => {
            const res = await PokeService.GetAllSets();
            setSetList(res!.data)
            console.log(res!.data)
        }
        getSets()
        getNames()
    }, [])





    const pokemon = useRef<HTMLInputElement>(null)
    const setName = useRef<HTMLInputElement>(null)




    const submissionHandler = async (event: FormEvent) => {
        event.preventDefault()
        const res = await PokeService.GetAllPokemonCards(pokemon.current!.value)
        setCards(res.data)
        setSearchPokemon(pokemon.current!.value)
        setHideForm(true)
    }

    const onChangePokemon = () => {

        setShowPossiblePokemons(true)
        setPossiblePokemon(pokemon.current!.value)
        if (pokemon.current!.value === '') {
            setShowPossiblePokemons(false)
        }
    }
    const onChangeSet = () => {
        setShowPossibleSets(true)
        setPossibleSet(setName.current!.value)
        console.log(setName.current!.value)
        console.log(setList)
        if (setName.current!.value === '') {
            setShowPossibleSets(false)
        }
    }

    const getPokemon = (selected: string) => {
        pokemon.current!.value = selected
    }

   

    //  var pokemonNames = data!.data.results;
    // console.log(cards)

    return (
        <div>
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>

                <form onSubmit={submissionHandler} hidden={hideForm} style={{ position: 'relative', display: 'flex', justifyContent: 'center', border: 'solid', borderRadius: '30px', width: '300px', height: '300px' }}>
                    <fieldset>
                        <div className="form-group">
                            <label className="form-label mt-4">Pokemon Name</label>
                            <input className="form-control" placeholder="Enter Pokemon name" ref={pokemon} onChange={onChangePokemon} />
                            {showPossiblePokemons ?
                                <>

                                    {pokemonList?.filter((j: any) => (j.name).startsWith(possiblePokemon)).map((i: any) =>

                                        <motion.button whileHover={{ scale: 1.25 }} onMouseDown={() => getPokemon(i.name)}
                                            style={{ display: 'flex', textAlign: 'center', justifyContent: 'center', backgroundColor: 'grey', width: '250px', fontSize: '20px' }}>

                                            {i.name}
                                        </motion.button>

                                    )}

                                </>
                                : <></>}
                            <label className="form-label mt-4">Set Name</label>
                            <input className="form-control" placeholder="Enter Set Name" ref={setName} onChange={onChangeSet} />
                            {showPossibleSets ?
                                <>

                                    {setList?.filter((j: any) => (j.name).startsWith(possibleSet)).map((i: any) =>
                                        <motion.button whileHover={{ scale: 1.25 }} onMouseDown={() => getPokemon(i.name)}
                                            style={{ display: 'flex', textAlign: 'center', justifyContent: 'center', backgroundColor: 'grey', width: '250px', fontSize: '20px' }}>

                                            {i.name}
                                        </motion.button>

                                    )}

                                </>
                                : <></>}
                            <input type="submit" value="submit" />
                        </div>
                    </fieldset>
                </form>
                <div style={{ display: 'flex', justifyContent: 'center', position: 'absolute', bottom: 0 }}>
                </div>
            </div>


            {hideForm ?
                <div>


                    <Grid container spacing={3} sx={{ backgroundColor: 'transparent', justifyContent: 'center', paddingTop: '9em' }}>

                        {cards!.map((j: any) =>
                            <Grid item xs={12} md={4}>
                                <Card image={j.images?.small}
                                    avgSellPrice={j.cardmarket?.prices?.averageSellPrice}
                                    setName={j.set?.name}
                                    setLogo={j.set?.images.logo}
                                    buyLink={j.tcgplayer?.url}>
                                </Card>
                            </Grid>)}
                    </Grid>
                </div> : <></>
            }


            <div>
                <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                    {setList?.map((j: any) =>

                        <Grid item xs={12} md={4} >
                            <Link to ={"/PokeAPI/set/" + j.id} style = {{textDecoration:'none', color:'white'}} >
                                <motion.div  whileHover={{ scale: 1.025 }} whileTap={{ scale: 1 }} style={{ border: 'solid', borderRadius: '1em' }}>

                                    <h3 style={{ textAlign: 'center' }}>{j.name}</h3>
                                    <div style={{ textAlign: 'center' }}>
                                        <img src={j.images.logo} width="180px" height="80px" alt="setLogo" />
                                    </div>
                                </motion.div>
                            </Link>
                        </Grid>

                    )}
                </Grid>
            </div>


        </div >
    );

}
export default Form;


