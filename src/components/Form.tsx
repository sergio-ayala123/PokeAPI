import { useQuery } from 'react-query'
import axios from 'axios'
import React, {FormEvent, useRef, useState } from 'react'
import { Alert, AlertTitle, CircularProgress } from '@mui/material'
import { Box } from '@mui/system'

const Form = () => {
    const [searchPk, setSearchPokemon] = useState('')
    const [hideForm, setHideForm] = useState(false)

    const { data, isLoading: dataLoading, isError: dataError } = useQuery(["pokemon", searchPk], () => {
        let url = `https://pokeapi.co/api/v2/pokemon/${searchPk ? searchPk : 'mudkip'}`
        return axios.get(url)
    })


    const { data: cards, isLoading, isError } = useQuery(["cards", searchPk], () => {
        let cardUrl = `https://api.pokemontcg.io/v2/cards?q=name:${searchPk ? searchPk : 'gyarados'}`
        return axios.get(cardUrl)
    })


    const pokemon = useRef<HTMLInputElement>(null)
    const types = data?.data.types

    if (isLoading) {
        return <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
        </div>
    }

    if (isError) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Alert severity="error" style={{ width: '800px' }}>
                    <AlertTitle>Error</AlertTitle>
                    This Pokemon does not exist
                </Alert>
            </div>)
    }
    if (dataLoading) {
        return <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
        </div>
    }

    if (dataError) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Alert severity="error" style={{ width: '800px' }}>
                    <AlertTitle>Error</AlertTitle>
                    This Pokemon does not exist
                </Alert>
            </div>)
    }



    const submissionHandler = (event: FormEvent) => {
        event.preventDefault()
        setSearchPokemon(pokemon.current!.value)
        console.log(cards!.data)
        setHideForm(true)
    }

    return (
        <div>

            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>

                <form onSubmit={submissionHandler} hidden={hideForm} style={{ position: 'relative', display: 'flex', justifyContent: 'center', border: 'solid', borderRadius: '30px', width: '300px', height: '300px' }}>
                    <fieldset>

                        <div className="form-group">
                            <label className="form-label mt-4">Pokemon Name</label>
                            <input className="form-control" placeholder="Enter Pokemon name" ref={pokemon} />
                        </div>
                    </fieldset>
                </form>
                <div style={{ display: 'flex', justifyContent: 'center', position: 'absolute', bottom: 0 }}>

                </div>
            </div>
            {hideForm ?
                <div>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <img height='200px' src={data?.data.sprites.front_default} alt = "sprite" />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>

                        {types.length === 1 ? <h1>Type: {types[0].type.name}</h1> : <h1> Type: {types[0].type.name}/{types[1].type.name} </h1>}
                    </Box>

                    {cards!.data!.data.map((j: any) => <Box sx={{ padding: '4em' }}>

                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <img src={j.images.small} alt = "small-image"></img>
                        </Box>

                        <div style={{ display: 'inline', justifyContent: 'center', textAlign: 'center' }}>
                            <h3>Average Sell Price: ${j.cardmarket?.prices?.averageSellPrice}</h3>
                            <h3>Set Name: {j.set.name}</h3>
                            <Box>
                                <img src={j.set.images.logo} style={{ height: '10%', width: '10%' }} alt = "logo"></img>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>

                                <a href={j.tcgplayer?.url} className="btn btn-dark" target="_blank" rel = "noreferrer" style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', width: '20%' }}>Buy Here</a>
                            </Box>

                        </div>

                    </Box>)}


                </div> : <></>}
        </div>
    );

}
export default Form;