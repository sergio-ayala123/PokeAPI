import { useLocation, Route, Routes} from "react-router-dom";
import App from "../App";
import CardSetPage from "../pages/CardSetPage";


const Paths = () => {
    const location = useLocation()
    return (
        <>
        <Routes location = {location} key = {location.pathname}>
            <Route path = 'PokeAPI/set/:id' element = {<CardSetPage/>}/>
            <Route path = 'PokeAPI/' element ={<App/>}/>

        </Routes>
            
            </>
    );
}

export default Paths;