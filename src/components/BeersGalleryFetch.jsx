import { useEffect, useState } from "react";

export const BeersGalleryFetch = () => {

    const [beers, setBeers] = useState([]);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('');


    const fetchData = async () => {
        try {
            const response = await fetch('https://api.sampleapis.com/beers/stouts');

            // Convertimos la respuesta a JSON
            const data = await response.json();

            // Setear la variable de estado de las cervezas a través de su método setBeers con los datos recibidos de la API
            setBeers(data);
        } catch (error) {
            console.log('Error al realizar la solicitud', error);
            setError('Error al realizar la solicitud');
        }
    };

    // useEffect ejecuta el método fetchData la primera vez que se monta el componente, hace la petición a la API.
    useEffect(() => {
        fetchData();
    }, []);

    // Si hay error, que muestre el mensaje
    if (error) {
        return(
            <div className="alert alert-danger text-center" role='alert'>
                {error}
            </div>
        );
    }
    const filteredBeers = beers.filter(beer =>
        beer.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="container mt-5">
            <h2 className="text-center text-white mb-4">Cave of Beers</h2>
            <div className="mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar por nombre de cerveza:"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
            </div>
            <div className="row overflow-auto vh-80" style={{ maxHeight: '80vh', overflowY: 'scroll' }}>
                {filteredBeers.map((beer, index) => (
                    <div className="col-md-4 mb-4" key={beer.id}>
                        <div className="card">
                            <div className="card-beer">
                                <img src={beer.image} className="card-img-top object-fit-cover image" alt={beer.name} />
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Beer Name: {beer.name} {index + 1}</h5>
                                <p className="card-text">Price: {beer.price}</p>
                                <p className="card-text">Average Rating: {beer.rating.average}</p>
                                <p className="card-text">Reviews: {beer.rating.reviews}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
