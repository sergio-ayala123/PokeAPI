import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import { PokeService } from "../services/PokeService";



const CardSetPage = () => {
    const { id } = useParams();
    const [cards, setCards] = useState<any[]>()
    useEffect(() => {
        const getCards = async () => {
            const res = await PokeService.GetAllPokemonCards(' ')
            setCards(res!.data)
        }
        getCards()
        console.log(cards)

    }, [])
 
    return (
        <>
        <h1>asdf</h1>
            {/* <Grid container spacing={3} sx={{ backgroundColor: 'transparent', justifyContent: 'center', paddingTop: '9em' }}>

                {cards!.filter((i:any) => i.id === id).map((j: any) =>
                    <Grid item xs={12} md={4}>
                        <Card image={j.images?.small}
                            avgSellPrice={j.cardmarket?.prices?.averageSellPrice}
                            setName={j.set?.name}
                            setLogo={j.set?.images.logo}
                            buyLink={j.tcgplayer?.url}>
                        </Card>
                    </Grid>)}
            </Grid> */}
        </>
    );
}

export default CardSetPage;