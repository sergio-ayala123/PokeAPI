import { Box } from "@mui/material";

interface cardProps {
    image: string,
    avgSellPrice: string,
    setName: string,
    setLogo: string,
    buyLink: string,
    children: React.ReactNode
}

const Card: React.FC<cardProps> = (props: cardProps) => {
    return (
        <Box sx={{ padding: '4em' }}>

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <img src={props.image} alt="small"></img>
            </Box>

            <div style={{ display: 'inline', justifyContent: 'center', textAlign: 'center' }}>
                <h3>Average Sell Price: ${props.avgSellPrice}</h3>
                <h3>Set Name: {props.setName}</h3>
                <Box>
                    <img src={props.setLogo} style={{ height: '10%', width: '10%' }} alt="logo"></img>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <a href={props.buyLink} className="btn btn-dark" target="_blank" rel="noreferrer" style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', width: '20%' }}>Buy Here</a>
                </Box>
            </div>
        </Box>
    );
}

export default Card;